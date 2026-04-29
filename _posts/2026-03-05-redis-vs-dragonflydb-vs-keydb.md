---
layout: post
seo: true
title: "Redis vs DragonflyDB vs KeyDB: Best Redis Alternative in 2026?"
subtitle: "Performance benchmarks, licensing changes, and architecture differences to help you pick the right one"
date: 2026-03-05
categories: database
thumbnail-img: /assets/img/posts/database/redis-vs-dragonflydb-keydb.png
share-img: /assets/img/posts/database/redis-vs-dragonflydb-keydb.png
permalink: /redis-vs-dragonflydb-vs-keydb/
description: "Redis, DragonflyDB, or KeyDB? Compare architecture, real performance benchmarks, licensing, and when each one is the right choice for your stack in 2026."
keywords: "redis vs dragonfly, redis vs keydb, dragonfly vs redis, keydb vs redis, redis alternatives 2026, best redis alternative, dragonflydb vs redis, in-memory database comparison, redis license change 2024, redis SSPL license, dragonfly db benchmark, keydb multithreaded, redis single threaded limitation, redis cluster alternative, in-memory cache 2026, redis data structures, redis use cases, dragonfly memory efficiency, keydb active replication, valkey redis fork, redis vs valkey, redis performance, redis cache comparison, distributed cache comparison, in-memory database, redis session store, redis rate limiting, keydb flash storage, dragonfly shared nothing architecture, redis single core bottleneck"
comments: true
social-share: true
tags: [database, system-design, software-engineering]

quick-answer: "**Redis** if you need maximum ecosystem compatibility, Redis Modules (Search, JSON, TimeSeries), or your team is already running Redis. **DragonflyDB** if you want to eliminate Redis Cluster, reduce memory costs, and get 10-25x higher throughput on the same hardware. **KeyDB** if you want a conservative multithreaded upgrade from Redis with active replication and an open-source license."

key-takeaways:
  - "Redis changed its license in 2024 from BSD to SSPL/RSALv2, then added AGPLv3 with Redis 8 in May 2025. AGPLv3 is open-source but has strong copyleft implications. Valkey remains the BSD-licensed alternative"
  - "DragonflyDB uses a shared-nothing multi-threaded architecture and can replace a Redis Cluster with a single node"
  - "KeyDB is a multithreaded Redis fork maintained by Snapchat. It is BSD-licensed and fully protocol-compatible with Redis"
  - "All three support the RESP protocol, so your existing Redis client code works with all of them without changes"
  - "DragonflyDB has gaps in Redis Module support (Search, JSON, TimeSeries) and Lua scripting edge cases. Check compatibility before migrating"
  - "For most teams already running Redis, the lowest-risk migration path is Valkey, not DragonflyDB or KeyDB"

faq:
  - question: "What is the difference between Redis and DragonflyDB?"
    answer: "Redis uses a single-threaded event loop for command execution and requires Redis Cluster for horizontal scaling. DragonflyDB uses a multi-threaded shared-nothing architecture that scales across all CPU cores on a single machine. DragonflyDB reports 10-25x higher throughput than Redis on the same hardware and 2-4x better memory efficiency. DragonflyDB is API-compatible with Redis but does not support all Redis Modules or every Lua scripting edge case."
  - question: "Is DragonflyDB production ready in 2026?"
    answer: "DragonflyDB reached general availability in late 2023 and has been adopted by engineering teams as a Redis replacement. It is not as battle-tested as Redis, which has been in production since 2009. Teams with mission-critical workloads should benchmark DragonflyDB on their specific use case and access patterns before replacing Redis in production."
  - question: "What is KeyDB and who maintains it?"
    answer: "KeyDB is a multithreaded fork of Redis originally developed by EQ Alpha Technology. Snapchat acquired KeyDB in May 2022. It runs under the BSD-3-Clause license and is actively maintained on GitHub. KeyDB offers multi-master active replication, FLASH (SSD) storage support, and MVCC for non-blocking concurrent reads."
  - question: "Why did Redis change its license in 2024?"
    answer: "Redis Ltd changed Redis from a BSD license to a dual SSPL/RSALv2 license in March 2024. The stated reason was that large cloud providers were offering managed Redis services without contributing back to the project. This triggered the creation of Valkey, a BSD-licensed community fork backed by AWS, Google Cloud, Oracle, and the Linux Foundation. Redis later added AGPLv3 as a third license option with Redis 8 in May 2025, returning it to OSI-approved open-source status, though the AGPLv3 copyleft terms remain a consideration for commercial products."
  - question: "Should I migrate from Redis to Valkey?"
    answer: "If you are running open-source Redis and want to stay on a truly open-source codebase, Valkey is the most conservative migration. Valkey is a drop-in replacement with 100% API compatibility, maintained by the Linux Foundation with backing from AWS and Google Cloud. Most managed Redis offerings from AWS and Google have already switched to Valkey under the hood."
  - question: "Can DragonflyDB replace Redis Cluster?"
    answer: "For many workloads, yes. DragonflyDB scales to 1TB on a single node and handles millions of operations per second, which would otherwise require a multi-node Redis Cluster. Eliminating the cluster removes hash slot restrictions, simplifies multi-key operations, and lowers infrastructure cost. However, DragonflyDB does not implement the Redis Cluster protocol, so test your client configuration before migrating."
  - question: "Which is faster: Redis or DragonflyDB?"
    answer: "DragonflyDB is significantly faster on multi-core hardware. On a 32-core server, DragonflyDB achieves 2-4 million operations per second compared to Redis's 150-200K. Redis command execution is limited to one CPU core regardless of hardware. DragonflyDB reports p99 latency of 0.15ms versus Redis's 0.3ms. On single-core hardware, the gap is much smaller."
  - question: "Is KeyDB faster than Redis?"
    answer: "Yes. KeyDB achieves over 1 million operations per second on a single node by using multithreaded command execution instead of Redis's single-threaded model. This is roughly 5-7x faster than Redis on multi-core hardware. KeyDB is generally slower than DragonflyDB, which was built from scratch rather than forked from Redis."
  - question: "What is the Redis SSPL license?"
    answer: "SSPL (Server Side Public License) was created by MongoDB Inc and requires that any service offering SSPL-licensed software as a network service must also release the source code of the entire service, including infrastructure code. Redis moved to SSPL/RSALv2 in March 2024, which effectively prevented cloud providers from offering Redis as a managed service. Redis 8 (May 2025) added AGPLv3 as a third option, so users can now choose between AGPLv3 (OSI open-source, strong copyleft), RSALv2, or SSPLv1."
---

In March 2024, Redis changed its license. After fifteen years under the permissive BSD license, Redis Ltd moved to a dual SSPL and RSALv2 license. The short version: cloud providers can no longer offer Redis as a managed service without a commercial agreement.

AWS, Google Cloud, and Oracle responded by backing a community fork called Valkey under the Linux Foundation. [A Percona survey found that roughly 70% of Redis users started considering alternatives](https://www.theregister.com/2024/09/20/redis_users_considering_alternatives/) after the change.

Two options that had been building quietly for years, DragonflyDB and KeyDB, suddenly got a lot more attention. Both are Redis-compatible, both are faster than Redis in most benchmarks, and both have licenses that are less restrictive. But they take very different approaches to the same problem.

This guide covers all three so you know what you are actually choosing between.

> **TL;DR**: Redis has the best ecosystem but a controversial license. DragonflyDB is the fastest option with the most dramatic performance gains. KeyDB is the safest Snapchat-backed multithreaded upgrade with an open-source license. For most teams already running Redis without scaling problems, Valkey (not covered here but worth knowing about) is the lowest-risk migration.

---

## Quick Comparison

| | Redis | DragonflyDB | KeyDB |
|---|---|---|---|
| **Architecture** | Single-threaded event loop | Multi-threaded, shared-nothing | Multi-threaded Redis fork |
| **Throughput (32-core)** | ~150-200K ops/sec | ~2-4M ops/sec | ~1M+ ops/sec |
| **P99 Latency** | ~0.3ms | ~0.15ms | Between Redis and Dragonfly |
| **Memory efficiency** | Baseline | 2-4x better than Redis | Similar to Redis |
| **Scaling strategy** | Redis Cluster (horizontal, built-in control plane) | Vertical first; multi-node cluster supported (no built-in control plane) | Active multi-master replication (horizontal) |
| **License** | AGPLv3 / RSALv2 / SSPLv1 (tri-license since Redis 8) | BSL 1.1 (Apache 2.0 in 2029) | BSD-3-Clause (open-source) |
| **Redis compatibility** | N/A | ~99%, some module gaps | Full drop-in replacement |
| **Persistence** | RDB + AOF (fork-based) | Forkless snapshots | In-process snapshots |
| **Lua scripting** | Full | Mostly supported, some gaps | Full |
| **Maintained by** | Redis Ltd | DragonflyDB Inc | Snapchat |

---

## How Each One Handles Concurrency

The most important architectural difference between these three is how they handle multiple requests at the same time. This is what determines performance and scaling limits more than anything else.

<pre><code class="language-mermaid">
flowchart TB
    subgraph R["fa:fa-bolt Redis: Single Event Loop"]
        direction LR
        RC["Client connections\n(thousands)"] --> REL["Event Loop\n1 thread · 1 CPU core"]
        REL --> RDS["Full dataset\nin memory"]
    end

    subgraph D["fa:fa-layer-group DragonflyDB: Shared-Nothing"]
        direction LR
        DC["Client connections\n(thousands)"] --> DIO["I/O threads\n(io_uring)"]
        DIO --> DS1["Shard 1\nThread 1"]
        DIO --> DS2["Shard 2\nThread 2"]
        DIO --> DS3["Shard N\nThread N"]
    end

    subgraph K["fa:fa-code-branch KeyDB: Multi-Threaded Fork"]
        direction LR
        KC["Client connections\n(thousands)"] --> KMT["Multi-threaded executor\n(MVCC, no global lock)"]
        KMT --> KDS["Shared dataset\nwith per-key locking"]
    end

    R ~~~ D
    D ~~~ K

    style R fill:#fdecea,stroke:#c0392b,color:#3d0a07
    style D fill:#dcfce7,stroke:#15803d,color:#052e16
    style K fill:#dbeafe,stroke:#1d4ed8,color:#1e3a5f
</code></pre>

**Redis** runs all command execution on a single thread. One CPU core handles every read and write. Redis added I/O threading in version 6.0 to handle network reads in parallel, but command execution stayed single-threaded. On a 64-core server, Redis leaves 63 cores unused for actual work.

This is not an oversight. The single-threaded model makes Redis simple to reason about. Every command is atomic by default. There is no lock contention. For the scale most applications operate at, it is not a problem.

**DragonflyDB** was built from scratch with a different model. The dataset is divided into shards. The number of shards matches the number of CPU cores. Each shard is owned by one dedicated thread and no other thread touches it. There are no global locks.

Each thread runs lightweight fibers (similar to goroutines) that allow concurrent handling of thousands of connections without blocking. For commands that span multiple shards, DragonflyDB coordinates between shard threads internally. The application sees none of this.

This is why [DragonflyDB reaches 4 million ops/sec on a 32-core machine while Redis tops out around 200K](https://dragonflydb.io/blog/scaling-performance-redis-vs-dragonfly). DragonflyDB uses all 32 cores. Redis uses one.

**KeyDB** took a more pragmatic approach: fork Redis and add multithreading to the existing codebase. Command execution uses a per-thread model with MVCC (Multi-Version Concurrency Control) for non-blocking reads. Global locks are replaced with per-key locking. This gets KeyDB to over 1 million ops/sec without rewriting the whole database.

KeyDB also introduces active replication, which means multiple nodes can accept writes simultaneously. More on that in the KeyDB section.

---

## <i class="fas fa-bolt" style="color: #c0392b;"></i> Redis

Redis launched in 2009. It is the most widely deployed in-memory data store in the world, running in production at Twitter, GitHub, Instagram, Shopify, Stack Overflow, and hundreds of thousands of other companies.

### Data Structures

Most developers use Redis as a key-value cache and stop there. Redis has ten data types, each built for different problems.

**Strings** are the basic type. They also support atomic operations, which is what makes Redis useful for rate limiting and counters.

```redis
SET user:123:visits 0
INCR user:123:visits       # atomic, no race conditions
EXPIRE user:123:visits 86400
```

**Hashes** store structured objects as field-value pairs. More memory-efficient than storing serialized JSON strings.

```redis
HSET user:123 name "Alice" email "alice@example.com" plan "pro"
HGET user:123 email
```

**Sorted Sets** are the most underused structure in Redis. Every member has a numeric score and the set is always sorted by score. Perfect for leaderboards, priority queues, and sliding window rate limiters.

```redis
ZADD leaderboard 9400 "alice"
ZADD leaderboard 8700 "bob"
ZREVRANGE leaderboard 0 9 WITHSCORES   # top 10 players, in order
```

**Streams** are an append-only log with consumer group support. Think lightweight Kafka for simpler cases: message acknowledgment, backpressure, and at-least-once delivery without standing up a Kafka cluster. If you are unsure whether you need Streams or a proper message broker, see [how Kafka works](/distributed-systems/how-kafka-works/).

```redis
XADD events * type "purchase" user_id "123" amount "49.99"
XREADGROUP GROUP workers consumer1 COUNT 10 STREAMS events >
```

**HyperLogLog** counts unique items using [approximately 12KB of memory regardless of how many items you have tracked, with an error rate of roughly 0.81%](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/). Use it for unique visitor counts or distinct search queries where exact precision is not required. See [HyperLogLog Explained](/data-structures/hyperloglog/) for how it works under the hood.

```redis
PFADD page_visitors user:123 user:456 user:789
PFCOUNT page_visitors   # approximate unique count
```

**Lists**, **Sets**, and **Bitmaps** round out the data types. Bitmaps are particularly useful for tracking boolean state per user: active days, [feature flag](/feature-flags-guide/) states, or daily login streaks using a single bit per user per day.

### Production Use Cases

**Session storage**: Store user sessions with a TTL. Any server behind a load balancer reads any session. No sticky sessions needed, and sessions expire automatically.

**Rate limiting**: `INCR` plus `EXPIRE` counts requests per user per window. Atomic by design, no race conditions. For sliding window rate limiting, sorted sets work better. See [Dynamic Rate Limiter System Design](/dynamic-rate-limiter-system-design/) for a full implementation.

```python
def is_rate_limited(user_id: str, limit: int = 100) -> bool:
    key = f"rate:{user_id}:{int(time.time() // 60)}"
    count = redis.incr(key)
    if count == 1:
        redis.expire(key, 60)
    return count > limit
```


{% include ads/in-article.html %}


**Distributed locks**: `SET key value NX PX timeout` acquires a lock atomically. Used to prevent double-processing in distributed systems where two workers might race on the same job.

**Pub/Sub**: Publish messages to channels and fan out to all subscribers. Works well for real-time notifications, cache invalidation signals, and simple event broadcasting between services.

**Caching**: The most common use case. For a full breakdown of cache-aside, write-through, and write-behind patterns built on top of Redis, see [Caching Strategies Explained](/caching-strategies-explained/).

### Where Redis Struggles

**Single-core ceiling**: No matter how much hardware you buy, Redis uses one CPU core for command execution. On a $2,000/month server with 32 cores, Redis runs on one.

**Memory spikes during snapshots**: Redis uses `fork()` to create a background process for RDB snapshots. Copy-on-write (COW) means every write during the snapshot creates a copy of the modified memory page. Under heavy write load, a snapshot can temporarily double memory usage. Teams running Redis at high write volume often provision 2x the memory they actually need just to survive snapshot windows.

**Redis Cluster complexity**: Scaling beyond a single machine requires Redis Cluster, which shards data using hash slots (0-16383 slots distributed across nodes). Multi-key commands like `MGET`, `MSET`, and transactions only work when all keys hash to the same slot. Workarounds like hash tags (`{user:123}:sessions`) help, but they add complexity and can create hot partitions if not used carefully.

**The license**: Redis has had a complicated few years on licensing. In March 2024, Redis dropped its BSD license for SSPL/RSALv2, which triggered the Valkey fork. Then in May 2025, Redis 8 added AGPLv3 as a third option, making it technically open-source again. AGPLv3 is an OSI-approved license, but it is strongly copyleft: if you offer a networked service built on AGPLv3 software, you must publish your source code. For many commercial products, that is a real constraint. If your organization needs a permissive open-source license with no copyleft obligations, Valkey (BSD) remains the cleaner option.

---

## <i class="fas fa-layer-group" style="color: #15803d;"></i> DragonflyDB

DragonflyDB launched in 2022 and was written from scratch in C++. It is not a Redis fork. The goal from the beginning was to get the maximum possible performance out of modern server hardware while staying API-compatible with Redis.

### The Shared-Nothing Architecture

DragonflyDB divides the dataset into shards. The number of shards matches the number of CPU cores on the machine. Each shard belongs to exactly one thread. Threads never share ownership of keys. There is no global lock.

<pre><code class="language-mermaid">
flowchart TB
    subgraph Client["Client Layer"]
        direction LR
        C1["App Server 1"]
        C2["App Server 2"]
        C3["App Server N"]
    end

    subgraph IO["I/O Layer (io_uring)"]
        IOT["Async I/O Threads\nNetwork read/write"]
    end

    subgraph Shards["Shard Layer (one thread per core)"]
        direction LR
        S1["Shard 1\nKeys: a-d\nThread 1"]
        S2["Shard 2\nKeys: e-k\nThread 2"]
        S3["Shard 3\nKeys: l-r\nThread 3"]
        S4["Shard 4\nKeys: s-z\nThread 4"]
    end

    C1 & C2 & C3 --> IOT
    IOT --> S1
    IOT --> S2
    IOT --> S3
    IOT --> S4

    S1 <-->|"Cross-shard coordination"| S2
    S2 <-->|"Cross-shard coordination"| S3
    S3 <-->|"Cross-shard coordination"| S4

    style Client fill:#f8f9fa,stroke:#6c757d,color:#212529
    style IO fill:#fef9c3,stroke:#ca8a04,color:#422006
    style Shards fill:#dcfce7,stroke:#15803d,color:#052e16
</code></pre>

Each shard thread runs fibers (lightweight coroutines) so it handles thousands of concurrent connections without blocking. For multi-key commands that touch keys across multiple shards, DragonflyDB coordinates between shard threads using an internal protocol. The application does not need to know about this.

**Forkless snapshots**: Redis forks a child process for RDB snapshots, which causes the COW memory pressure described above. DragonflyDB does not fork. Each shard thread serializes its own data independently. The snapshot is taken as a virtual cut across all shards. No memory spikes, no need to over-provision hardware.

**Linear scaling**: Add more CPU cores and get proportionally more throughput. Redis throughput is fixed regardless of core count. This is the fundamental reason DragonflyDB can replace Redis Cluster with a single machine for many workloads.

### Performance Numbers

These numbers are drawn from [DragonflyDB's own published benchmarks](https://dragonflydb.io/blog/scaling-performance-redis-vs-dragonfly) and a [third-party comparison by OneUptime](https://oneuptime.com/blog/post/2026-01-21-redis-vs-dragonfly/view), both run on a 32-core server with 64GB RAM against standard RESP workloads. Take them with appropriate skepticism: DragonflyDB published their own results, so the conditions favour them. Run your own benchmarks against your actual workload before making a decision.

| Operation | Redis | DragonflyDB | Speedup |
|-----------|-------|-------------|---------|
| SET | ~150K ops/sec | ~2M ops/sec | 13x |
| GET | ~180K ops/sec | ~3M ops/sec | 17x |
| ZADD | ~120K ops/sec | ~1.5M ops/sec | 12x |
| LPUSH | ~140K ops/sec | ~1.8M ops/sec | 13x |
| Pipelined (10 ops) | ~800K ops/sec | ~4M ops/sec | 5x |
| P50 latency | 0.1ms | 0.05ms | 2x better |
| P99 latency | 0.3ms | 0.15ms | 2x better |
| P99.9 latency | 1ms | 0.3ms | 3x better |


{% include ads/display.html %}


Memory efficiency: DragonflyDB uses a custom allocator and compressed data structures, resulting in [2-4x better memory utilization than Redis](https://dragonflydb.io/blog/redis-and-dragonfly-architecture-comparison) for most workloads. On a 64GB machine, you can fit roughly 2-4x as much useful data as you could in Redis.

### What DragonflyDB Does Not Support

DragonflyDB supports the RESP protocol, so your existing Redis client works without code changes. But there are gaps to know about before migrating.

**Redis Modules**: RedisSearch, RedisJSON, RedisTimeSeries, and RedisGraph are not supported. If your application uses `FT.SEARCH`, `JSON.GET`, or `TS.ADD`, DragonflyDB is not a drop-in replacement. DragonflyDB has native JSON support as an alternative to RedisJSON, but the commands differ.

**Lua scripting edge cases**: Basic Lua scripting with `EVAL` works. However, calling Redis Module commands (like `FT.SEARCH`) from within Lua scripts does not work in DragonflyDB. If you have complex Lua scripts that use module commands, test carefully before migrating.

**Redis Cluster protocol**: DragonflyDB supports a multi-node cluster mode with 16,384 hash slots (same as Redis Cluster), so Redis cluster-aware clients work. However, [DragonflyDB does not ship a built-in control plane](https://www.dragonflydb.io/docs/managing-dragonfly/cluster-mode). Automatic failover and slot rebalancing across nodes requires Dragonfly Cloud or the Kubernetes operator. The open-source server handles the data plane only.

**Sentinel**: Not supported. DragonflyDB handles high availability differently.

### License

DragonflyDB uses BSL 1.1 (Business Source License). The source code is readable and you can run it yourself, but you cannot offer DragonflyDB as a managed service without a commercial agreement. BSL 1.1 converts to Apache 2.0 automatically in 2029. HashiCorp used the same license for Terraform before the OpenTofu fork.

### When to Choose DragonflyDB

- You are running Redis Cluster and want to simplify to fewer, larger nodes (or a single node for many workloads)
- You are hitting the single-core ceiling and need more throughput without more nodes
- You are seeing memory spikes during Redis snapshots and need to reduce over-provisioning
- You want to cut cloud infrastructure costs on your caching layer
- You do not depend on Redis Modules (Search, JSON, TimeSeries)

---

## <i class="fas fa-code-branch" style="color: #1d4ed8;"></i> KeyDB

KeyDB started as an open-source project by EQ Alpha Technology. Snapchat acquired it in May 2022. When Snapchat acquired KeyDB, they also open-sourced the previously closed Enterprise version, folding advanced performance features into the main codebase under the BSD-3-Clause license.

Unlike DragonflyDB, KeyDB is a direct fork of Redis. It modifies the existing Redis codebase to add multithreading rather than starting from scratch.

### Multi-Threaded Command Execution

Redis added I/O threading in v6.0 but kept command execution single-threaded. KeyDB went further. Command execution is also multithreaded, with per-connection thread affinity and MVCC (Multi-Version Concurrency Control) to allow concurrent reads without blocking writes.

In practice, [KeyDB achieves over 1 million operations per second on a single node](https://docs.keydb.dev/), compared to Redis's 150-200K. For most scaling problems, this removes the need for Redis Cluster entirely.

Because KeyDB is a fork of Redis, everything that works in Redis works in KeyDB. Lua scripting, Redis Modules (where compatible), Sentinel, replication: all carry over. This is the key advantage over DragonflyDB for teams that depend on Redis-specific features.

### Active Replication

This is KeyDB's most distinctive feature and the thing that sets it apart from both Redis and DragonflyDB.

In standard Redis, one primary node accepts all writes. Replica nodes accept reads only. Failover means promoting a replica to primary via Sentinel or Redis Cluster, which involves a brief window of unavailability.

KeyDB supports active-active replication: multiple nodes accept writes simultaneously. Conflict resolution uses last-write-wins. Writes replicate to all other masters asynchronously.

<pre><code class="language-mermaid">
flowchart LR
    subgraph RedisModel["Standard Redis Replication"]
        direction TB
        RP["Primary\n(writes + reads)"]
        RR1["Replica 1\n(reads only)"]
        RR2["Replica 2\n(reads only)"]
        RP -->|"async replication"| RR1
        RP -->|"async replication"| RR2
    end

    subgraph KeyDBModel["KeyDB Active Replication"]
        direction TB
        KM1["Master 1\n(writes + reads)"]
        KM2["Master 2\n(writes + reads)"]
        KM3["Master 3\n(writes + reads)"]
        KM1 <-->|"bidirectional sync"| KM2
        KM2 <-->|"bidirectional sync"| KM3
        KM1 <-->|"bidirectional sync"| KM3
    end

    RedisModel ~~~ KeyDBModel

    style RedisModel fill:#fdecea,stroke:#c0392b,color:#3d0a07
    style KeyDBModel fill:#dbeafe,stroke:#1d4ed8,color:#1e3a5f
</code></pre>

This makes KeyDB useful for:

- Multi-region setups where writes need to happen close to users
- High availability without relying on Sentinel or Redis Cluster
- Deployments where eliminating write single-points-of-failure matters

### FLASH Storage

KeyDB can store data on NVMe SSDs instead of RAM. [On a 190GB dataset, KeyDB FLASH achieves throughput comparable to RAM-based storage](https://docs.keydb.dev/blog/2020/01/05/blog-post/) at a fraction of the hardware cost. For large datasets where not everything needs to be in memory at once, this changes the cost math significantly.

Redis has a similar feature called RDB-on-Flash, but it is Enterprise-only (paid). KeyDB's FLASH storage is open-source.

### Practical Setup

Since KeyDB is a Redis fork with the same protocol, switching is a configuration change, not a code change. Your existing Redis client connects to KeyDB the same way.

```bash
# KeyDB active replication config (keydb.conf)

activerehashing yes
server-threads 8           # use 8 threads on an 8-core machine
active-replica yes         # enable active replication
replica-read-only no       # allow writes on replica nodes

# Connect your replica to a master
replicaof 10.0.0.1 6379
```

{% include ads/in-article.html %}

```python
# Your application code does not change at all
import redis
r = redis.Redis(host="keydb-node-1", port=6379)
r.set("user:123", "alice")
r.get("user:123")
```

### License

KeyDB is BSD-3-Clause. Fully open-source, no commercial restrictions. You can run it, fork it, and build managed services on top of it.

### When to Choose KeyDB

- You want multithreaded Redis without changing your data model, Lua scripts, or Redis Modules
- You need multi-master active replication without Redis Cluster complexity
- You have large datasets that would benefit from FLASH (SSD) storage to reduce hardware costs
- You want a BSD-licensed open-source option (unlike Redis or DragonflyDB)
- Your team is not ready to validate compatibility with a completely new system like DragonflyDB

---

## Performance Comparison

Marketing benchmarks show the best case for whoever published them. Here is a more grounded picture across different workload types.

| Workload | <i class="fas fa-bolt" style="color:#c0392b;"></i> Redis | <i class="fas fa-layer-group" style="color:#15803d;"></i> DragonflyDB | <i class="fas fa-code-branch" style="color:#1d4ed8;"></i> KeyDB |
|---|---|---|---|
| **Simple GET/SET** | Good. 150-200K ops/sec, limited to 1 core | Excellent. 2-4M ops/sec, all cores used | Good. 1M+ ops/sec, multi-threaded |
| **High-throughput concurrent ops** | Bottlenecked. Needs clustering for more throughput | Excellent. Scales linearly with core count | Good. Better than Redis, fewer nodes needed |
| **Large datasets (>100GB)** | Needs more RAM. No open-source SSD option | Good. 2-4x memory efficiency vs Redis | Excellent. FLASH (SSD) storage supported |
| **Multi-region writes** | Not supported. Single primary only | Not supported natively. Single-node design | Excellent. Active-active multi-master built in |
| **Lua scripting and Modules** | Excellent. Full support | Partial. Gaps in modules and some Lua edge cases | Excellent. Full Redis compatibility |

For most applications, Redis throughput is not the bottleneck. A single Redis node handles 150-200K operations per second. If your application does 10-20K operations per second, Redis is not your problem.

Where DragonflyDB's performance differences actually matter:

- Very high-traffic applications (hundreds of thousands of cache requests per second per node)
- Applications that would otherwise need Redis Cluster
- Applications where memory cost is a significant line item

For p99 latency, all three achieve sub-millisecond responses under normal load. The difference between DragonflyDB's 0.15ms and Redis's 0.3ms does not meaningfully affect user experience in most applications. It matters when you are stacking many serial cache calls in a single request handler.

---

## What Real Teams Are Doing

**Redis** still dominates adoption. It is in production at nearly every major tech company. The license change has not caused mass migration yet, but engineering teams at larger organizations are tracking it. Cloud providers (AWS, Google Cloud) have already migrated their managed offerings to Valkey under the hood.

**DragonflyDB** [case studies](https://www.dragonflydb.io/blog) show teams replacing 20-node Redis Clusters with 2-node DragonflyDB setups. The driver is almost always cost and operational complexity, not raw performance numbers. If you are paying $30,000/month for a Redis Cluster and DragonflyDB can handle the same workload on 2 nodes, the math is compelling.

**KeyDB** runs in production at Snapchat at scale. Snapchat acquired it precisely because they needed something faster than Redis and more operationally stable than a brand-new database. Teams that want to reduce Redis overhead without betting on a newer system find KeyDB to be the most conservative upgrade.

One thing to notice across all three: none of these are used in isolation. They sit alongside relational databases, not instead of them. Shopify runs PostgreSQL for core transactional data and Redis for caching. If you are thinking about where in-memory storage fits in a broader system, see [PostgreSQL vs MongoDB vs DynamoDB](/postgresql-vs-mongodb-vs-dynamodb/) for the primary database decision.

---

## Common Mistakes


{% include ads/display.html %}


### <i class="fas fa-exclamation-triangle"></i> Migrating to DragonflyDB without testing compatibility

DragonflyDB claims ~99% Redis compatibility. That remaining 1% can be the exact feature your application depends on. Before migrating, run your application's test suite against DragonflyDB in a staging environment. Pay special attention to Lua scripts that call module commands and any code that expects Redis Cluster protocol behavior.

### <i class="fas fa-exclamation-triangle"></i> Choosing DragonflyDB or KeyDB because Redis is slow without measuring first

Redis handles 150-200K operations per second on a single node. Most applications are not close to this limit. Profile your actual Redis CPU and memory usage before deciding you need a Redis alternative. The answer is often better use of Redis data structures, smarter caching strategies, or connection pooling, not a different database.

### <i class="fas fa-exclamation-triangle"></i> Using Redis (or any in-memory store) as your primary database

Redis persistence (RDB and AOF) exists, but Redis is not a database replacement. It is a cache and a fast data structure server. If you are storing data in Redis that you cannot afford to lose, you have a reliability risk. Pair Redis with a durable primary database. See [Caching Strategies Explained](/caching-strategies-explained/) for how the layers fit together.

### <i class="fas fa-exclamation-triangle"></i> Setting up Redis without a maxmemory policy

By default, Redis will use all available memory. When it runs out, it returns an out-of-memory error to clients. Set `maxmemory` and choose an eviction policy (`allkeys-lru` for caches, `noeviction` for session stores where losing data is not acceptable).

```redis
CONFIG SET maxmemory 4gb
CONFIG SET maxmemory-policy allkeys-lru
```

### <i class="fas fa-exclamation-triangle"></i> Ignoring the KeyDB active replication conflict model

KeyDB's active-active replication uses last-write-wins for conflict resolution. If two nodes accept a write to the same key within the replication window, the later write wins. This is fine for session data and caches. It is not fine for anything that requires strict consistency, like distributed counters or inventory levels.

### <i class="fas fa-exclamation-triangle"></i> Over-indexing on benchmark numbers

DragonflyDB's 25x throughput numbers are measured on high core-count servers under sustained concurrent load. Your environment likely has fewer cores and lower concurrency. The real-world improvement will be meaningful, but probably closer to 5-10x than 25x. Run your own benchmarks against your actual workload before committing.

---

## The Valkey Question

No comparison of Redis alternatives in 2026 is complete without mentioning Valkey. Valkey is the BSD-licensed fork of Redis created in March 2024 by former Redis core contributors, backed by the Linux Foundation, AWS, Google Cloud, and Oracle.

Valkey is not covered in detail here because it is essentially Redis at the technical level: same architecture, same data structures, same trade-offs. It exists to solve the license problem, not the performance problem. But it is worth knowing about because:

- AWS ElastiCache for Redis now runs Valkey under the hood
- Google Cloud Memorystore for Redis is migrating to Valkey
- [Valkey 8.0 introduced some performance improvements over Redis 7 (2-3x throughput on multi-core systems in some benchmarks)](https://devtoolswatch.com/en/redis-vs-valkey-vs-dragonfly-2026)
- It is the lowest-risk migration if you are running open-source Redis and want to stay open-source

If you are on a cloud provider's managed Redis service, you may already be on Valkey without knowing it.

---

## Related Reading

- [Caching Strategies Explained](/caching-strategies-explained/) - cache-aside, write-through, write-behind, and how to layer caching on top of any primary database
- [PostgreSQL vs MongoDB vs DynamoDB](/postgresql-vs-mongodb-vs-dynamodb/) - picking the right primary database before you add a caching layer
- [How Kafka Works](/distributed-systems/how-kafka-works/) - when Redis Streams is not enough and you need a proper message broker
- [Database Indexing Explained](/database-indexing-explained/) - reducing the load on your cache by optimizing the database queries that miss
- [System Design Cheat Sheet](/system-design-cheat-sheet/) - how caching and in-memory storage fit into the bigger picture
