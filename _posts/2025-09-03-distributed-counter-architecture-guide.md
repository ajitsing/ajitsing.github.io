---
layout: post
title: "Distributed Counter System Design"
subtitle: "From simple incrementers to battle-tested architectures that handle millions of operations"
date: 2025-09-03
last-modified-date: 2026-01-03
categories: system-design
thumbnail-img: /assets/img/posts/distributed-counter/counter-thumbnail.png
share-img: /assets/img/posts/distributed-counter/counter-thumbnail.png
permalink: /distributed-counter-architecture-guide/
description: "How to design a distributed counter for high-traffic systems. Complete system design guide covering sharded counters, sharded counter architecture, local aggregation, CRDTs, and production patterns with code examples."
keywords: "distributed counter, distributed counter system design, sharded counters, sharded counter system design, design a distributed counter, counter architecture, CRDT, local aggregation, scalability, Java, system design, high availability, eventual consistency"
tags: [system-design]
seo: true
comments: true
popular: true
faq:
  - question: "What is a distributed counter?"
    answer: "A distributed counter is a data structure that tracks counts across multiple servers or nodes in a distributed system. Unlike a simple counter that runs on one machine, distributed counters handle concurrent increments from many sources while maintaining consistency, fault tolerance, and high availability."
  - question: "How do you design a distributed counter?"
    answer: "To design a distributed counter, you can use techniques like sharded counters (splitting the count across multiple shards), local aggregation (batch updates locally before syncing), or CRDTs (Conflict-free Replicated Data Types). The choice depends on your consistency requirements, traffic volume, and acceptable read latency."
  - question: "What are sharded counters?"
    answer: "Sharded counters split a single logical counter into multiple physical shards. Each shard handles a portion of the increment traffic independently. To get the total count, you sum all shards. This approach eliminates single-point bottlenecks and allows horizontal scaling for high-traffic scenarios like social media likes or view counts."
  - question: "When should you use sharded counters vs a single counter?"
    answer: "Use sharded counters when you have high write throughput (thousands of increments per second), need to avoid hotspots, or require horizontal scalability. A single counter works fine for low-traffic scenarios or when strong consistency on every read is critical."
---

You've probably implemented counters dozens of times. A simple `count++` here, a database increment there. But what happens when your humble counter needs to handle millions of increments per second across multiple data centers? Welcome to the fascinating world of distributed counters.

Whether you're building the next social media platform, tracking inventory for an e-commerce giant, or implementing rate limiting for your API, understanding distributed counters is essential. Let's dive deep into the patterns, pitfalls, and practical solutions.

## The Deceptively Simple Problem

At first glance, counting seems trivial:

```java
// Easy, right?
int counter = 0;
counter++;
```

But in a distributed system, this becomes a nightmare. Imagine you have 100 servers, each handling user likes on a viral video. How do you keep an accurate count without:

- Creating a bottleneck
- Losing increments during network failures
- Double-counting during retries
- Blocking other operations

This is where things get interesting.

## Real-World Battle Stories

Before we dive into solutions, let's look at some real scenarios where distributed counters make or break systems:

### X/Twitter's Like Counter
When a tweet goes viral, thousands of users might like it simultaneously. Twitter can't afford to:
- Block users while updating a single counter
- Show inconsistent like counts across the globe
- Lose likes during server failures

### Reddit's Upvote System
Reddit's voting system needs to:
- Handle massive traffic spikes during breaking news
- Prevent vote manipulation
- Show consistent scores across regions
- Remain responsive under load

## The Fundamental Challenges

### 1. The Hot Spot Problem

<div style="background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%); padding: 20px; border-radius: 10px; color: #2d3436; margin: 20px 0; border-left: 4px solid #e17055;">
<h4 style="color: #2d3436; margin-top: 0;">Hot Spot Alert</h4>
<p>When all servers try to update the same database row, you get contention. Think of it like 100 people trying to write on the same piece of paper simultaneously.</p>
</div>

```sql
-- This becomes a bottleneck quickly
UPDATE counters SET value = value + 1 WHERE id = 'viral_video_likes';
```

### 2. The Split-Brain Scenario

What happens when your servers can't communicate with each other? You might end up with:
- Server A thinks the count is 1000
- Server B thinks it's 1500
- The truth? Nobody knows.

### 3. The Retry Dilemma

Networks fail. When they do, should you retry the increment? But what if the first attempt actually succeeded? Now you've double-counted.

## Architecture Pattern #1: Sharded Counters

The most popular solution is to split your counter into multiple shards.

<div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
<div style="display: inline-block; text-align: left;">

<div style="text-align: center; margin-bottom: 20px;">
  <div style="background: #007bff; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; font-weight: 500;">
    Client Requests
  </div>
</div>

<div style="text-align: center; margin: 20px 0;">
  <div style="background: #6c757d; color: white; padding: 8px 16px; border-radius: 5px; display: inline-block; font-weight: 500;">
    Load Balancer
  </div>
</div>

<div style="display: flex; justify-content: center; gap: 15px; margin: 20px 0; flex-wrap: wrap;">
  <div style="background: #e1f5fe; padding: 15px; border-radius: 8px; text-align: center; min-width: 120px;">
    <strong>Shard 0</strong><br/>count=245
  </div>
  <div style="background: #e1f5fe; padding: 15px; border-radius: 8px; text-align: center; min-width: 120px;">
    <strong>Shard 1</strong><br/>count=189
  </div>
  <div style="background: #e1f5fe; padding: 15px; border-radius: 8px; text-align: center; min-width: 120px;">
    <strong>Shard 2</strong><br/>count=203
  </div>
  <div style="background: #e1f5fe; padding: 15px; border-radius: 8px; text-align: center; min-width: 120px;">
    <strong>Shard 3</strong><br/>count=167
  </div>
</div>

<div style="text-align: center; margin: 20px 0;">
  <div style="background: #28a745; color: white; padding: 8px 16px; border-radius: 5px; display: inline-block; font-weight: 500;">
    Aggregator
  </div>
</div>

<div style="text-align: center;">
  <div style="background: #c8e6c9; padding: 15px 30px; border-radius: 8px; display: inline-block; font-size: 18px; font-weight: bold; border: 2px solid #4caf50;">
    Total: 804
  </div>
</div>

</div>
</div>

### How It Works

1. **Split the counter** into N independent shards (usually 10-100)
2. **Randomly distribute** increments across shards
3. **Sum all shards** when you need the total count

```java
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import redis.clients.jedis.Jedis;

public class ShardedCounter {
    private final String name;
    private final int numShards;
    private final Jedis jedis;
    private final Random random;
    
    public ShardedCounter(String name, int numShards) {
        this.name = name;
        this.numShards = numShards;
        this.jedis = new Jedis("localhost");
        this.random = new Random();
    }
    
    public long increment(int amount) {
        // Pick a random shard to avoid hot spots
        int shardId = random.nextInt(numShards);
        String shardKey = String.format("%s:shard:%d", name, shardId);
        
        return jedis.incrBy(shardKey, amount);
    }
    
    public long increment() {
        return increment(1);
    }
    
    public long getCount() {
        // Sum all shards
        long total = 0;
        for (int i = 0; i < numShards; i++) {
            String shardKey = String.format("%s:shard:%d", name, i);
            String count = jedis.get(shardKey);
            total += count != null ? Long.parseLong(count) : 0;
        }
        return total;
    }
}

// Usage
ShardedCounter likesCounter = new ShardedCounter("video_123_likes", 20);
likesCounter.increment();  // Fast write
long totalLikes = likesCounter.getCount();  // Slightly slower read
```

### Pros and Cons

**Pros:**
- Scales writes horizontally
- No single point of contention
- Works with existing databases

**Cons:**
- Reads are more expensive (must sum all shards)
- Eventually consistent (temporary inconsistencies)
- More complex than single counter

### When to Use Sharded Counters

Perfect for:
- Social media likes/views
- Website analytics
- Non-critical metrics

## Architecture Pattern #2: Local Aggregation with Batch Updates

Instead of immediately updating a central counter, each server keeps local counts and periodically syncs.

<div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
<div style="display: inline-block; text-align: left;">

<div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;">
  <div style="background: #fff3e0; border: 2px solid #ff9800; padding: 20px; border-radius: 10px; text-align: center; min-width: 140px;">
    <div style="font-weight: bold; color: #f57c00; font-size: 16px;">Server 1</div>
    <div style="margin: 10px 0; font-size: 18px;">Local: 45</div>
    <div style="background: #ffcc02; color: black; padding: 5px; border-radius: 5px; font-size: 12px; font-weight: 500;">
      Every 30s<br/>Batch Sync
    </div>
  </div>
  
  <div style="background: #fff3e0; border: 2px solid #ff9800; padding: 20px; border-radius: 10px; text-align: center; min-width: 140px;">
    <div style="font-weight: bold; color: #f57c00; font-size: 16px;">Server 2</div>
    <div style="margin: 10px 0; font-size: 18px;">Local: 67</div>
    <div style="background: #ffcc02; color: black; padding: 5px; border-radius: 5px; font-size: 12px; font-weight: 500;">
      Every 30s<br/>Batch Sync
    </div>
  </div>
  
  <div style="background: #fff3e0; border: 2px solid #ff9800; padding: 20px; border-radius: 10px; text-align: center; min-width: 140px;">
    <div style="font-weight: bold; color: #f57c00; font-size: 16px;">Server 3</div>
    <div style="margin: 10px 0; font-size: 18px;">Local: 44</div>
    <div style="background: #ffcc02; color: black; padding: 5px; border-radius: 5px; font-size: 12px; font-weight: 500;">
      Every 30s<br/>Batch Sync
    </div>
  </div>
</div>

<div style="text-align: center; margin: 20px 0;">
  <div style="font-size: 24px; color: #666;">↓ ↓ ↓</div>
  <div style="color: #666; font-style: italic; margin-top: 5px;">Periodic Batch Updates</div>
</div>

<div style="text-align: center;">
  <div style="background: #c8e6c9; border: 2px solid #4caf50; padding: 25px; border-radius: 15px; display: inline-block;">
    <div style="font-weight: bold; color: #2e7d32; font-size: 18px;">Central Store</div>
    <div style="font-size: 24px; margin: 10px 0; color: #1b5e20;">Total: 156</div>
    <div style="font-size: 14px; color: #388e3c;">Durable & Consistent</div>
  </div>
</div>

</div>
</div>

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

public class LocalAggregatedCounter {
    private final ConcurrentHashMap<String, AtomicLong> localCounters;
    private final int syncIntervalSeconds;
    private final ScheduledExecutorService scheduler;
    
    public LocalAggregatedCounter(int syncIntervalSeconds) {
        this.localCounters = new ConcurrentHashMap<>();
        this.syncIntervalSeconds = syncIntervalSeconds;
        this.scheduler = Executors.newScheduledThreadPool(1);
        
        // Start background sync
        scheduler.scheduleAtFixedRate(
            this::syncToCentralStore, 
            syncIntervalSeconds, 
            syncIntervalSeconds, 
            TimeUnit.SECONDS
        );
    }
    
    public void increment(String counterName, long amount) {
        // Lightning fast - just update local memory
        localCounters.computeIfAbsent(counterName, k -> new AtomicLong(0))
                    .addAndGet(amount);
    }
    
    public void increment(String counterName) {
        increment(counterName, 1);
    }
    
    private void syncToCentralStore() {
        localCounters.forEach((name, counter) -> {
            long count = counter.getAndSet(0);
            if (count > 0) {
                updateCentralCounter(name, count);
            }
        });
    }
    
    private void updateCentralCounter(String name, long amount) {
        // This could be Redis, MongoDB, PostgreSQL, etc.
        System.out.printf("Syncing %s: +%d%n", name, amount);
        // jedis.incrBy(name, amount);
    }
    
    public void shutdown() {
        scheduler.shutdown();
    }
}
```

### The Write-Ahead Log Pattern

For critical counters, you can add durability:

```java
import java.io.FileWriter;
import java.io.IOException;
import java.time.Instant;

public class DurableLocalCounter extends LocalAggregatedCounter {
    private final String walFile;
    
    public DurableLocalCounter(String walFile, int syncIntervalSeconds) {
        super(syncIntervalSeconds);
        this.walFile = walFile;
    }
    
    @Override
    public void increment(String counterName, long amount) {
        // Write to WAL first
        writeToWAL(counterName, amount);
        super.increment(counterName, amount);
    }
    
    private void writeToWAL(String name, long amount) {
        // Simple write-ahead log
        try (FileWriter writer = new FileWriter(walFile, true)) {
            writer.write(String.format("%d,%s,%d%n", 
                Instant.now().getEpochSecond(), name, amount));
        } catch (IOException e) {
            System.err.println("Failed to write to WAL: " + e.getMessage());
        }
    }
}
```

## Architecture Pattern #3: CRDTs (Conflict-Free Replicated Data Types)

CRDTs are mathematical structures that automatically resolve conflicts. They're perfect for distributed counters that need to work during network partitions.

<div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
<div style="display: inline-block; text-align: left;">

<div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
  <div style="background: #f3e5f5; border: 2px solid #9c27b0; padding: 15px; border-radius: 10px; text-align: center; min-width: 150px;">
    <div style="font-weight: bold; color: #7b1fa2; font-size: 16px;">Node A</div>
    <div style="margin: 5px 0; font-size: 12px; font-family: monospace;">A:5, B:3, C:2</div>
  </div>
  
  <div style="background: #f3e5f5; border: 2px solid #9c27b0; padding: 15px; border-radius: 10px; text-align: center; min-width: 150px;">
    <div style="font-weight: bold; color: #7b1fa2; font-size: 16px;">Node B</div>
    <div style="margin: 5px 0; font-size: 12px; font-family: monospace;">A:4, B:4, C:2</div>
  </div>
  
  <div style="background: #f3e5f5; border: 2px solid #9c27b0; padding: 15px; border-radius: 10px; text-align: center; min-width: 150px;">
    <div style="font-weight: bold; color: #7b1fa2; font-size: 16px;">Node C</div>
    <div style="margin: 5px 0; font-size: 12px; font-family: monospace;">A:4, B:3, C:3</div>
  </div>
</div>

<div style="text-align: center; margin: 15px 0;">
  <div style="font-size: 14px; color: #666;">↔ Continuous Replication ↔</div>
</div>

<div style="text-align: center; margin: 20px 0;">
  <div style="background: #fff3e0; border: 2px dashed #ff9800; padding: 15px; border-radius: 10px; display: inline-block;">
    <div style="font-weight: bold; color: #f57c00;">Conflict Resolution</div>
    <div style="margin: 5px 0; font-size: 14px; font-family: monospace;">Max of each: A:5, B:4, C:3</div>
  </div>
</div>

<div style="text-align: center; margin: 20px 0;">
  <div style="font-size: 20px; color: #666;">↓</div>
</div>

<div style="text-align: center;">
  <div style="background: #c8e6c9; border: 2px solid #4caf50; padding: 20px; border-radius: 12px; display: inline-block;">
    <div style="font-weight: bold; color: #2e7d32; font-size: 18px;">Converged Result</div>
    <div style="font-size: 24px; margin: 10px 0; color: #1b5e20;">Final Count: 12</div>
    <div style="font-size: 12px; color: #388e3c;">Eventually Consistent Across All Nodes</div>
  </div>
</div>

</div>
</div>

### G-Counter (Grow-Only Counter)

Each node maintains a vector of counts for all nodes:

```java
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class GCounter {
    private final String nodeId;
    private final Set<String> nodes;
    private final ConcurrentHashMap<String, Long> counts;
    
    public GCounter(String nodeId, Set<String> nodes) {
        this.nodeId = nodeId;
        this.nodes = new HashSet<>(nodes);
        this.counts = new ConcurrentHashMap<>();
        
        // Initialize counts for all nodes
        for (String node : nodes) {
            counts.put(node, 0L);
        }
    }
    
    public void increment(long amount) {
        // Only increment your own counter
        counts.compute(nodeId, (key, val) -> (val == null ? 0 : val) + amount);
    }
    
    public void increment() {
        increment(1);
    }
    
    public long value() {
        // Sum all node counts
        return counts.values().stream().mapToLong(Long::longValue).sum();
    }
    
    public void merge(GCounter other) {
        // Take the maximum for each node
        for (String node : nodes) {
            long otherCount = other.counts.getOrDefault(node, 0L);
            counts.compute(node, (key, val) -> 
                Math.max(val == null ? 0 : val, otherCount));
        }
    }
    
    public boolean compare(GCounter other) {
        // Vector clock comparison
        return nodes.stream().allMatch(node -> 
            counts.getOrDefault(node, 0L) >= other.counts.getOrDefault(node, 0L));
    }
    
    public Map<String, Long> getCounts() {
        return new HashMap<>(counts);
    }
}

// Usage across multiple nodes
Set<String> nodes = Set.of("server1", "server2", "server3");

// On server1
GCounter counter1 = new GCounter("server1", nodes);
counter1.increment(5);

// On server2 
GCounter counter2 = new GCounter("server2", nodes);
counter2.increment(3);

// Merge when nodes communicate
counter1.merge(counter2);
System.out.println(counter1.value());  // 8
```

### PN-Counter (Positive-Negative Counter)

For counters that can decrement:

```java
import java.util.Set;

public class PNCounter {
    private final GCounter positive;
    private final GCounter negative;
    
    public PNCounter(String nodeId, Set<String> nodes) {
        this.positive = new GCounter(nodeId, nodes);
        this.negative = new GCounter(nodeId, nodes);
    }
    
    public void increment(long amount) {
        if (amount >= 0) {
            positive.increment(amount);
        } else {
            negative.increment(-amount);
        }
    }
    
    public void increment() {
        increment(1);
    }
    
    public void decrement(long amount) {
        increment(-amount);
    }
    
    public void decrement() {
        decrement(1);
    }
    
    public long value() {
        return positive.value() - negative.value();
    }
    
    public void merge(PNCounter other) {
        positive.merge(other.positive);
        negative.merge(other.negative);
    }
}
```

## Performance Comparison

Let's look at how these patterns perform under different loads:

<div style="margin: 40px 0; padding: 0 10px;">

<div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 30px 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 30px;">

<!-- Centralized Counter -->
<div style="background: #ffffff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid #e9ecef;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 12px; height: 12px; background: #6c757d; border-radius: 50%; margin-right: 10px;"></div>
    <h4 style="margin: 0; color: #343a40; font-size: 18px; font-weight: 600;">Centralized</h4>
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">1K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">10K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #fff3cd; color: #856404; border-radius: 4px; font-size: 12px; font-weight: 600;">⚠ Caution</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">100K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #f8d7da; color: #721c24; border-radius: 4px; font-size: 12px; font-weight: 600;">✗ Poor</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">1M ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #f8d7da; color: #721c24; border-radius: 4px; font-size: 12px; font-weight: 600;">✗ Poor</div>
    </div>
  </div>
</div>

<!-- Sharded Counter -->
<div style="background: #ffffff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid #e9ecef;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 12px; height: 12px; background: #007bff; border-radius: 50%; margin-right: 10px;"></div>
    <h4 style="margin: 0; color: #343a40; font-size: 18px; font-weight: 600;">Sharded</h4>
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">1K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">10K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">100K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">1M ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #fff3cd; color: #856404; border-radius: 4px; font-size: 12px; font-weight: 600;">⚠ Caution</div>
    </div>
  </div>
</div>

<!-- Local Aggregation -->
<div style="background: #ffffff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid #e9ecef;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 12px; height: 12px; background: #28a745; border-radius: 50%; margin-right: 10px;"></div>
    <h4 style="margin: 0; color: #343a40; font-size: 18px; font-weight: 600;">Local Aggregation</h4>
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">1K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">10K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">100K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">1M ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
  </div>
</div>

<!-- CRDT -->
<div style="background: #ffffff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid #e9ecef;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 12px; height: 12px; background: #9c27b0; border-radius: 50%; margin-right: 10px;"></div>
    <h4 style="margin: 0; color: #343a40; font-size: 18px; font-weight: 600;">CRDT</h4>
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">1K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">10K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">100K ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #fff3cd; color: #856404; border-radius: 4px; font-size: 12px; font-weight: 600;">⚠ Caution</div>
    </div>
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 6px; text-align: center;">
      <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">1M ops/sec</div>
      <div style="display: inline-block; padding: 4px 8px; background: #f8d7da; color: #721c24; border-radius: 4px; font-size: 12px; font-weight: 600;">✗ Poor</div>
    </div>
  </div>
</div>

</div>

<!-- Legend -->
<div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.7); border-radius: 10px; backdrop-filter: blur(5px);">
  <div style="display: inline-flex; align-items: center; gap: 20px; flex-wrap: wrap; justify-content: center;">
    <div style="display: flex; align-items: center; gap: 6px;">
      <div style="display: inline-block; padding: 4px 8px; background: #d4edda; color: #155724; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ Excellent</div>
      <span style="font-size: 14px; color: #6c757d;">Handles load effortlessly</span>
    </div>
    <div style="display: flex; align-items: center; gap: 6px;">
      <div style="display: inline-block; padding: 4px 8px; background: #fff3cd; color: #856404; border-radius: 4px; font-size: 12px; font-weight: 600;">⚠ Caution</div>
      <span style="font-size: 14px; color: #6c757d;">Works with tuning</span>
    </div>
    <div style="display: flex; align-items: center; gap: 6px;">
      <div style="display: inline-block; padding: 4px 8px; background: #f8d7da; color: #721c24; border-radius: 4px; font-size: 12px; font-weight: 600;">✗ Poor</div>
      <span style="font-size: 14px; color: #6c757d;">Not recommended</span>
    </div>
  </div>
</div>

</div>

</div>

## Handling Edge Cases

### The Thundering Herd Problem

When a counter becomes extremely popular, you might get a thundering herd:

```java
import java.util.Random;
import java.util.concurrent.CompletableFuture;

public class ThunderingHerdProtection {
    private final Counter baseCounter;
    private final int jitterMs;
    private final Random random;
    
    public ThunderingHerdProtection(Counter baseCounter, int jitterMs) {
        this.baseCounter = baseCounter;
        this.jitterMs = jitterMs;
        this.random = new Random();
    }
    
    public CompletableFuture<Long> incrementWithJitter(long amount) {
        return CompletableFuture.supplyAsync(() -> {
            // Add random delay to spread out requests
            int jitter = random.nextInt(jitterMs);
            try {
                Thread.sleep(jitter);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }
            
            return baseCounter.increment(amount);
        });
    }
}

interface Counter {
    long increment(long amount);
}
```

### Circuit Breaker for Counter Operations

```java
import java.time.Instant;

public enum CircuitState {
    CLOSED, OPEN, HALF_OPEN
}

public class CounterCircuitBreaker {
    private final int failureThreshold;
    private final long timeoutSeconds;
    private int failureCount = 0;
    private long lastFailureTime = 0;
    private CircuitState state = CircuitState.CLOSED;
    
    public CounterCircuitBreaker(int failureThreshold, long timeoutSeconds) {
        this.failureThreshold = failureThreshold;
        this.timeoutSeconds = timeoutSeconds;
    }
    
    public long increment(Counter counter, long amount) throws Exception {
        if (state == CircuitState.OPEN) {
            if (Instant.now().getEpochSecond() - lastFailureTime < timeoutSeconds) {
                // Fail fast
                throw new RuntimeException("Counter circuit breaker is OPEN");
            } else {
                state = CircuitState.HALF_OPEN;
            }
        }
        
        try {
            long result = counter.increment(amount);
            if (state == CircuitState.HALF_OPEN) {
                state = CircuitState.CLOSED;
                failureCount = 0;
            }
            return result;
        } catch (Exception e) {
            failureCount++;
            lastFailureTime = Instant.now().getEpochSecond();
            
            if (failureCount >= failureThreshold) {
                state = CircuitState.OPEN;
            }
            
            throw e;
        }
    }
}
```

## Conclusion

Distributed counters are a perfect example of how "simple" problems become fascinatingly complex at scale. The key is understanding your requirements:

- **Need strong consistency?** Accept lower throughput
- **Need high throughput?** Accept eventual consistency  
- **Need partition tolerance?** Consider CRDTs
- **Need blazing speed?** Use local aggregation

## Further Reading

- [CAP Theorem and Counters](https://en.wikipedia.org/wiki/CAP_theorem)
- [Redis Patterns: Distributed Locks](https://redis.io/topics/distlock)  
- [CRDTs Paper by Marc Shapiro](https://hal.inria.fr/inria-00555588/document)
- [Google's Spanner and TrueTime](https://research.google/pubs/pub39966/)

---

*Have you implemented distributed counters in production? What patterns worked best for your use case? Share your war stories in the comments!*
