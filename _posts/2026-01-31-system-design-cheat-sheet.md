---
layout: post
seo: true
title: "System Design Cheat Sheet: Concepts Every Developer Should Know"
subtitle: "The practical reference guide for building scalable, reliable systems"
date: 2026-01-31
categories: system-design
permalink: /system-design-cheat-sheet/
share-img: /assets/img/posts/system-design/system-design-cheat-sheet.png
thumbnail-img: /assets/img/posts/system-design/system-design-cheat-sheet.png
description: "A practical system design cheat sheet covering scalability, load balancing, caching, database sharding, CAP theorem, and distributed systems patterns. Essential concepts for building systems that scale and preparing for system design interviews."
keywords: "system design cheat sheet, system design interview, distributed systems, scalability, load balancing, database sharding, caching strategies, CAP theorem, microservices architecture, horizontal scaling, vertical scaling, message queues, API design, high availability, fault tolerance, system design basics, system design concepts"
tags: ["system-design", "architecture"]
comments: true
popular: true

quick-answer: "Key concepts: **Horizontal scaling** > vertical. **CAP theorem** = pick 2 of consistency/availability/partition-tolerance. **Caching** with Cache-Aside pattern. **SQL** for transactions, **NoSQL** for scale. **Load balancer** distributes traffic. **Sharding** splits data across DBs. Design for 3-5x expected peak. Always start with requirements."

key-takeaways:
  - "Start every design with requirements. Functional requirements define what the system does, non-functional requirements define how well it does it"
  - "Horizontal scaling beats vertical scaling for most production systems. Add more machines instead of bigger machines"
  - "Caching is not optional at scale. Know your cache patterns and when to use each one"
  - "Database choice matters. SQL for transactions and complex queries, NoSQL for scale and flexibility"
  - "Design for failure. Every component will fail eventually. Build redundancy and graceful degradation into your system"

faq:
  - question: "What is system design and why is it important?"
    answer: "System design is the process of defining the architecture, components, and data flow of a system to meet specific requirements. It matters because poorly designed systems fail under load, cost too much to run, and become impossible to maintain. Good system design ensures your application scales with users, stays reliable, and remains easy to evolve."
  - question: "What is the difference between horizontal and vertical scaling?"
    answer: "Vertical scaling means adding more power to existing machines (more CPU, RAM, storage). Horizontal scaling means adding more machines. Vertical scaling is simpler but has limits and creates single points of failure. Horizontal scaling is more complex but provides better fault tolerance and theoretically unlimited capacity. Most production systems use horizontal scaling."
  - question: "What is the CAP theorem?"
    answer: "The CAP theorem states that a distributed system can only guarantee two of three properties: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition Tolerance (system works despite network failures). Since network partitions are inevitable, you must choose between consistency and availability during failures."
  - question: "When should I use SQL vs NoSQL databases?"
    answer: "Use SQL databases when you need ACID transactions, complex joins, or data integrity is critical (financial systems, inventory). Use NoSQL when you need horizontal scaling, flexible schemas, or high write throughput (user sessions, social feeds, logs). Many systems use both: SQL for transactions, NoSQL for caching and analytics."
  - question: "What is database sharding and when should I use it?"
    answer: "Sharding splits your database across multiple servers, with each shard holding a portion of the data. Use sharding when a single database cannot handle your read or write load, your data exceeds single server storage, or you need geographic distribution. Common sharding strategies include hash-based, range-based, and geographic sharding."
  - question: "What is a load balancer and how does it work?"
    answer: "A load balancer distributes incoming traffic across multiple servers to prevent any single server from being overwhelmed. It improves availability (if one server fails, traffic goes to others) and enables horizontal scaling. Common algorithms include round-robin, least connections, and IP hash. Popular options include Nginx, HAProxy, and cloud load balancers."
  - question: "What caching strategies should I know for system design?"
    answer: "The main caching strategies are: Cache-Aside (application manages cache, most common), Read-Through (cache fetches from database on miss), Write-Through (writes go to cache and database synchronously), Write-Behind (writes go to cache first, database later), and Write-Around (writes bypass cache). Choose based on your read/write patterns and consistency requirements."
  - question: "How do I estimate capacity for system design?"
    answer: "Start with user estimates: daily active users, requests per user, data per request. Calculate reads/writes per second, storage needs, and bandwidth. Use round numbers and powers of 10. For example: 10 million users, 10 requests/day each = 100 million requests/day = about 1,200 requests/second. Always design for 3-5x your expected peak load."
---

I spent years reading system design books and articles, watching conference talks, and building actual systems. This cheat sheet is everything I wish I had when I started. It covers the concepts that actually matter when building systems that scale.

Use this as a reference when designing systems, preparing for interviews, or reviewing architecture decisions.

## Table of Contents

- [The System Design Process](#the-system-design-process)
- [Scalability Fundamentals](#scalability-fundamentals)
- [Load Balancing](#load-balancing)
- [Caching](#caching)
- [Databases](#databases)
- [Message Queues](#message-queues)
- [API Design](#api-design)
- [Distributed Systems Concepts](#distributed-systems-concepts)
- [Common Architecture Patterns](#common-architecture-patterns)
- [Monitoring and Observability](#monitoring-and-observability)
- [Capacity Estimation](#capacity-estimation)
- [Quick Reference Tables](#quick-reference-tables)

---

## The System Design Process

Before diving into components, understand the process. Every good design starts with requirements.

### Step 1: Clarify Requirements

Never start designing without understanding what you are building.

**Functional Requirements** (what the system does):
- What features does the system need?
- Who are the users?
- What are the core use cases?

**Non-Functional Requirements** (how well it does it):
- Scale: How many users? How much data?
- Performance: What latency is acceptable?
- Availability: How much downtime is tolerable?
- Consistency: Is eventual consistency acceptable?

### Step 2: Estimate Scale

Back-of-envelope calculations set the foundation. Get the order of magnitude right.

| Metric | Question to Ask |
|--------|-----------------|
| Users | Daily active users? Peak concurrent users? |
| Storage | How much data per user? How long do we keep it? |
| Bandwidth | Average request size? Uploads vs downloads? |
| Throughput | Requests per second? Read-heavy or write-heavy? |

### Step 3: Define High-Level Design

Draw the main components and how data flows between them.

```mermaid
flowchart LR
    C[Clients] --> LB[Load Balancer]
    LB --> S1[Server 1]
    LB --> S2[Server 2]
    LB --> S3[Server 3]
    S1 --> Cache[(Cache)]
    S2 --> Cache
    S3 --> Cache
    Cache --> DB[(Database)]
    S1 --> Q[Message Queue]
    S2 --> Q
    S3 --> Q
    Q --> W[Workers]
    
    style LB fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style Cache fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style DB fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style Q fill:#234e52,stroke:#319795,color:#b2f5ea
```

### Step 4: Deep Dive into Components

Pick the most critical or complex components and design them in detail. This includes database schemas, API contracts, and algorithms.

### Step 5: Address Bottlenecks and Trade-offs

Every design has trade-offs. Identify potential bottlenecks and explain how you would handle them.

---

## Scalability Fundamentals

Scalability is the ability to handle increased load. There are two approaches.

### Vertical Scaling (Scale Up)

Add more resources to existing machines.

| Pros | Cons |
|------|------|
| Simple to implement | Hardware limits (you cannot buy a bigger server indefinitely) |
| No code changes needed | Single point of failure |
| Easier to manage | Expensive at high end |
| No distributed complexity | Downtime during upgrades |

### Horizontal Scaling (Scale Out)

Add more machines to distribute the load.

| Pros | Cons |
|------|------|
| Near unlimited scaling | More complex architecture |
| Better fault tolerance | Requires distributed systems knowledge |
| Cost effective (commodity hardware) | Data consistency challenges |
| No single point of failure | Network overhead |

```mermaid
flowchart TB
    subgraph Vertical["Vertical Scaling"]
        direction TB
        V1[Small Server] --> V2[Medium Server]
        V2 --> V3[Large Server]
    end
    
    subgraph Horizontal["Horizontal Scaling"]
        direction LR
        H1[Server] 
        H2[Server]
        H3[Server]
        H4[Server]
    end
    
    style V1 fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style V2 fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style V3 fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style H1 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style H2 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style H3 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style H4 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
```

**Rule of thumb**: Start simple with vertical scaling, move to horizontal when you hit limits or need fault tolerance.

---

## Load Balancing

A load balancer distributes traffic across multiple servers.

### Why Use Load Balancers?

- **Availability**: If one server dies, traffic goes to healthy servers
- **Scalability**: Add servers behind the load balancer as traffic grows
- **Performance**: Prevent any single server from being overwhelmed

### Load Balancing Algorithms

| Algorithm | How It Works | Best For |
|-----------|--------------|----------|
| **Round Robin** | Requests go to servers in rotation | Equal-capacity servers, stateless apps |
| **Weighted Round Robin** | Higher-weight servers get more traffic | Mixed-capacity server fleet |
| **Least Connections** | New requests go to server with fewest active connections | Long-running requests, varying request times |
| **IP Hash** | Client IP determines server (sticky sessions) | Stateful applications, session affinity |
| **Least Response Time** | Fastest responding server gets next request | Performance-critical applications |

### Layer 4 vs Layer 7 Load Balancing

**Layer 4 (Transport Layer)** routes based on IP address and port. Fast but cannot inspect content.

```mermaid
flowchart LR
    C[Client] --> LB[Load Balancer]
    LB --> S1[Server 1]
    LB --> S2[Server 2]
    LB --> S3[Server 3]
    
    style LB fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style S1 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style S2 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style S3 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
```

**Layer 7 (Application Layer)** routes based on URL, headers, cookies. Smarter but more processing overhead.

```mermaid
flowchart LR
    C[Client] --> LB[Load Balancer]
    LB -->|/api/*| API[API Servers]
    LB -->|/static/*| Static[Static Servers]
    LB -->|/images/*| Images[Image Servers]
    
    style LB fill:#234e52,stroke:#319795,color:#b2f5ea
    style API fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style Static fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style Images fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
```

| Layer 4 | Layer 7 |
|---------|---------|
| Faster (less processing) | Smarter routing (URL, headers, cookies) |
| Cannot inspect content | Can cache, compress, SSL terminate |
| Simple configuration | Content-based routing |
| TCP/UDP level | HTTP/HTTPS level |

### Popular Load Balancers

- **Nginx**: Fast, widely used, great for HTTP
- **HAProxy**: High performance, TCP and HTTP
- **AWS ELB/ALB**: Managed, integrates with AWS
- **Cloudflare**: Edge load balancing with CDN

---

## Caching

Caching stores frequently accessed data in fast storage to reduce latency and database load.

### Where to Cache

```mermaid
flowchart LR
    C[Client] --> CDN[CDN Cache]
    CDN --> LB[Load Balancer]
    LB --> App[Application]
    App --> AppCache[App Cache]
    AppCache --> DistCache[Distributed Cache]
    DistCache --> DB[(Database)]
    
    style CDN fill:#234e52,stroke:#319795,color:#b2f5ea
    style AppCache fill:#234e52,stroke:#319795,color:#b2f5ea
    style DistCache fill:#234e52,stroke:#319795,color:#b2f5ea
```

| Cache Layer | What It Caches | Tools |
|-------------|---------------|-------|
| **Browser** | Static assets, API responses | HTTP headers (Cache-Control) |
| **CDN** | Static files, media, edge content | Cloudflare, CloudFront, Fastly |
| **Application** | Computed values, session data | In-memory (Guava, Caffeine) |
| **Distributed** | Shared data across servers | Redis, Memcached |
| **Database** | Query results, frequently accessed rows | MySQL query cache, PostgreSQL |

### Caching Strategies

I covered these in depth in [Caching Strategies Explained](/caching-strategies-explained/). Here is the summary:

| Strategy | How It Works | Best For |
|----------|--------------|----------|
| **Cache-Aside** | App checks cache, fetches from DB on miss, populates cache | General purpose, most control |
| **Read-Through** | Cache fetches from DB automatically on miss | Read-heavy, simpler code |
| **Write-Through** | Writes go to cache and DB synchronously | Consistency critical |
| **Write-Behind** | Writes go to cache, async to DB later | High write throughput |
| **Write-Around** | Writes bypass cache, go to DB only | Write-once data |

### Cache Eviction Policies

When cache is full, what gets removed?

| Policy | Removes | Best For |
|--------|---------|----------|
| **LRU** | Least Recently Used items | General purpose, most common |
| **LFU** | Least Frequently Used items | Stable access patterns |
| **FIFO** | Oldest items | Simple use cases |
| **TTL** | Expired items | Time-sensitive data |

### Cache Invalidation

The hardest problem in caching. Options include:

- **TTL-based**: Expire after fixed time (simple, allows staleness window)
- **Event-based**: Invalidate on data change (immediate, complex to track)
- **Version-based**: Include version in cache key (no stale data, more misses)

---

## Databases

Database choice is one of the most important architectural decisions.

### SQL vs NoSQL

| SQL (Relational) | NoSQL |
|------------------|-------|
| Structured data, fixed schema | Flexible or schema-less |
| ACID transactions | Eventual consistency (often) |
| Complex queries and joins | Simple queries, denormalized data |
| Vertical scaling primarily | Horizontal scaling built-in |
| PostgreSQL, MySQL, Oracle | MongoDB, Cassandra, DynamoDB |

### When to Use SQL

<i class="fas fa-check-circle" style="color: #28a745;"></i> Complex relationships between data (joins)

<i class="fas fa-check-circle" style="color: #28a745;"></i> Transactions are critical (financial systems)

<i class="fas fa-check-circle" style="color: #28a745;"></i> Data integrity and constraints matter

<i class="fas fa-check-circle" style="color: #28a745;"></i> Ad-hoc queries and reporting

### When to Use NoSQL

<i class="fas fa-check-circle" style="color: #28a745;"></i> Massive scale (petabytes of data)

<i class="fas fa-check-circle" style="color: #28a745;"></i> Flexible or evolving schema

<i class="fas fa-check-circle" style="color: #28a745;"></i> High write throughput

<i class="fas fa-check-circle" style="color: #28a745;"></i> Geographic distribution

### NoSQL Types

| Type | Data Model | Examples | Use Case |
|------|------------|----------|----------|
| **Document** | JSON documents | MongoDB, CouchDB | Content management, catalogs |
| **Key-Value** | Simple key to value | Redis, DynamoDB | Caching, sessions |
| **Column-Family** | Wide columns | Cassandra, HBase | Time series, analytics |
| **Graph** | Nodes and edges | Neo4j, Amazon Neptune | Social networks, recommendations |

### Database Scaling Patterns

#### Replication

Copies of data across multiple servers.

```mermaid
flowchart LR
    App[Application] --> Primary[(Primary)]
    Primary --> R1[(Replica 1)]
    Primary --> R2[(Replica 2)]
    Primary --> R3[(Replica 3)]
    App -.->|Reads| R1
    App -.->|Reads| R2
    App -.->|Reads| R3
    
    style Primary fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style R1 fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style R2 fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style R3 fill:#2d3748,stroke:#4a5568,color:#e2e8f0
```

- **Leader-Follower**: One primary handles writes, replicas handle reads
- **Leader-Leader**: Multiple primaries, complex conflict resolution
- **Benefit**: Read scalability, fault tolerance

#### Sharding (Partitioning)

Split data across multiple databases.

```mermaid
flowchart TB
    App[Application] --> Router[Shard Router]
    Router --> S1[(Shard 1: Users A-M)]
    Router --> S2[(Shard 2: Users N-Z)]
    Router --> S3[(Shard 3: Premium Users)]
    
    style Router fill:#234e52,stroke:#319795,color:#b2f5ea
    style S1 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style S2 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style S3 fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
```

| Sharding Strategy | How It Works | Pros | Cons |
|-------------------|--------------|------|------|
| **Hash-based** | Hash of key determines shard | Even distribution | Resharding is painful |
| **Range-based** | Key ranges determine shard | Range queries work | Hot spots possible |
| **Geographic** | Location determines shard | Low latency | Complex for global users |
| **Directory-based** | Lookup table maps keys to shards | Flexible | Lookup is bottleneck |

See how [Slack uses workspace-based sharding](/slack-system-design/) and [Shopify shards by shop_id](/shopify-system-design/) in their production systems.

---

## Message Queues

Message queues decouple services and enable asynchronous processing.

### Why Use Queues?

```mermaid
sequenceDiagram
    participant User
    participant API
    participant Queue
    participant Worker
    participant Email
    
    User->>API: Place Order
    API->>Queue: OrderCreated event
    API->>User: Success (200ms)
    
    Note over Queue,Email: Async Processing
    Queue->>Worker: Process order
    Worker->>Email: Send confirmation
```

- **Decoupling**: Services don't need to know about each other
- **Resilience**: Failed consumers don't crash producers
- **Buffering**: Absorb traffic spikes
- **Scalability**: Add consumers as needed

For a deep dive, see [Role of Queues in System Design](/role-of-queues-in-system-design/).

### Queue Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Point-to-Point** | One producer, one consumer per message | Task distribution |
| **Pub/Sub** | One producer, many consumers get same message | Event notifications |
| **Work Queue** | Multiple consumers compete for messages | Parallel processing |
| **Dead Letter Queue** | Failed messages go here after retries | Error handling |

### Popular Message Queues

| Tool | Best For | Throughput |
|------|----------|------------|
| **Kafka** | Event streaming, log aggregation, replay | Millions/sec |
| **RabbitMQ** | Complex routing, traditional messaging | Thousands/sec |
| **SQS** | Simple AWS-native queuing | Thousands/sec |
| **Redis Streams** | Lightweight streaming | Hundreds of thousands/sec |

See [How Kafka Works](/distributed-systems/how-kafka-works/) for a complete breakdown.

---

## API Design

APIs are contracts between services. Design them carefully.

### REST vs GraphQL vs gRPC

| Aspect | REST | GraphQL | gRPC |
|--------|------|---------|------|
| Data Format | JSON | JSON | Protocol Buffers |
| Contract | Implicit (conventions) | Schema-defined | Protocol definition |
| Over-fetching | Common | Solved (request what you need) | N/A |
| Learning Curve | Low | Medium | Higher |
| Best For | Public APIs, CRUD | Flexible frontends | Internal microservices |

### REST Best Practices

```
# Good URL design
GET    /users              # List users
GET    /users/123          # Get user 123
POST   /users              # Create user
PUT    /users/123          # Update user 123
DELETE /users/123          # Delete user 123

# Bad URL design
GET    /getUsers
POST   /createUser
GET    /users/delete/123
```

### API Versioning

| Strategy | Example | Pros | Cons |
|----------|---------|------|------|
| URL Path | `/v1/users` | Clear, easy caching | URL changes |
| Query Param | `/users?version=1` | Single endpoint | Easy to miss |
| Header | `Accept: application/vnd.api.v1+json` | Clean URLs | Hidden versioning |

### Rate Limiting

Protect your API from abuse and overload.

| Algorithm | How It Works | Best For |
|-----------|--------------|----------|
| **Token Bucket** | Tokens added at fixed rate, requests consume tokens | Burst-friendly, most common |
| **Sliding Window** | Count requests in rolling time window | Smooth rate limiting |
| **Fixed Window** | Count requests in fixed intervals | Simple to implement |

For implementation details, see [Dynamic Rate Limiter System Design](/dynamic-rate-limiter-system-design/).

---

## Distributed Systems Concepts

When you scale beyond a single machine, you enter distributed systems territory.

### CAP Theorem

In a distributed system, during a network partition, you must choose between:

```mermaid
flowchart TB
    CAP[CAP Theorem]
    CAP --> C[Consistency]
    CAP --> A[Availability]
    CAP --> P[Partition Tolerance]
    
    C --- Note1[All nodes see same data]
    A --- Note2[Every request gets response]
    P --- Note3[System works despite network failures]
    
    style C fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style A fill:#234e52,stroke:#319795,color:#b2f5ea
    style P fill:#2d3748,stroke:#4a5568,color:#e2e8f0
```

- **CP System**: Consistency + Partition Tolerance (blocks during partition)
  - Example: ZooKeeper, etcd, traditional banking
- **AP System**: Availability + Partition Tolerance (may serve stale data)
  - Example: Cassandra, DynamoDB, DNS

**Reality**: Network partitions are inevitable. You're always choosing between C and A.

### Consistency Models

| Model | Guarantee | Example |
|-------|-----------|---------|
| **Strong** | Read always returns latest write | Bank balance |
| **Eventual** | Reads will eventually see latest write | Social media likes |
| **Causal** | Related events appear in order | Chat messages |
| **Read-your-writes** | You see your own writes immediately | Shopping cart |

### Consensus Algorithms

How do distributed nodes agree on a value?

| Algorithm | Used In | Complexity |
|-----------|---------|------------|
| **Paxos** | Chubby, Spanner | Notoriously complex |
| **Raft** | etcd, Consul | Easier to understand |
| **ZAB** | ZooKeeper | Similar to Paxos |

See [Paxos Distributed Consensus](/distributed-systems/paxos/) for details.

### Distributed Transactions

When a transaction spans multiple services:

| Pattern | How It Works | Consistency |
|---------|--------------|-------------|
| **Two-Phase Commit** | Coordinator asks all nodes, then commits | Strong (but slow) |
| **Saga** | Chain of local transactions with compensations | Eventual |
| **Outbox Pattern** | Write to DB and outbox table atomically | Eventual |

See [Two-Phase Commit](/distributed-systems/two-phase-commit/) for implementation details.

---

## Common Architecture Patterns

### Monolith vs Microservices

```mermaid
flowchart TB
    subgraph Monolith["Monolith"]
        direction TB
        M1[User Module]
        M2[Order Module]
        M3[Payment Module]
        M1 --- M2
        M2 --- M3
    end
    
    subgraph Microservices["Microservices"]
        direction TB
        U[User Service]
        O[Order Service]
        P[Payment Service]
        U <-->|API| O
        O <-->|API| P
    end
    
    style M1 fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style M2 fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style M3 fill:#2d3748,stroke:#4a5568,color:#e2e8f0
    style U fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style O fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style P fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
```

| Monolith | Microservices |
|----------|---------------|
| Simple deployment | Independent deployments |
| Easy debugging | Distributed debugging |
| Shared database | Database per service |
| Tight coupling | Network overhead |
| Team coordination needed | Team autonomy |

**Most teams should start with a monolith** and extract services when needed. See [Modular Monolith Architecture](/modular-monolith-architecture/) for a middle ground.

### Event-Driven Architecture

Services communicate through events instead of direct calls.

```mermaid
flowchart LR
    OS[Order Service] -->|OrderCreated| EB[Event Bus]
    EB --> IS[Inventory Service]
    EB --> NS[Notification Service]
    EB --> AS[Analytics Service]
    
    style EB fill:#234e52,stroke:#319795,color:#b2f5ea
```

**Benefits**:
- Loose coupling between services
- Services can be added/removed without affecting others
- Natural audit log of events

**Challenges**:
- Eventual consistency
- Debugging across services
- Event ordering

### CQRS (Command Query Responsibility Segregation)

Separate read and write models.

```mermaid
flowchart LR
    App[Application]
    App -->|Commands| WM[Write Model]
    App -->|Queries| RM[Read Model]
    WM --> WDB[(Write DB)]
    WDB -.->|Sync| RDB[(Read DB)]
    RM --> RDB
    
    style WM fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style RM fill:#234e52,stroke:#319795,color:#b2f5ea
```

Use when read and write patterns are very different. See [CQRS Pattern Guide](/cqrs-pattern-guide/) for details.

---

## Monitoring and Observability

You cannot fix what you cannot see.

### The Three Pillars

| Pillar | What It Shows | Tools |
|--------|---------------|-------|
| **Metrics** | Numerical measurements over time | Prometheus, Datadog, CloudWatch |
| **Logs** | Discrete events with details | ELK Stack, Splunk, Loki |
| **Traces** | Request path across services | Jaeger, Zipkin, X-Ray |

### Key Metrics to Monitor

| Metric | What It Measures | Alert When |
|--------|------------------|------------|
| **Request Rate** | Requests per second | Sudden drop or spike |
| **Error Rate** | Percentage of errors | Above threshold (e.g., > 1%) |
| **Latency (p50, p95, p99)** | Response time distribution | p99 exceeds SLA |
| **Saturation** | Resource utilization | CPU, memory, disk > 80% |

### SLI, SLO, SLA

| Term | Definition | Example |
|------|------------|---------|
| **SLI** (Service Level Indicator) | Measurement of service | Request latency, error rate |
| **SLO** (Service Level Objective) | Target for the SLI | 99.9% requests under 200ms |
| **SLA** (Service Level Agreement) | Contract with customers | 99.5% uptime or refund |

For more details, see [SLI, SLO, SLA Explained](/explainer/sli-slo-sla-explained/).

---

## Capacity Estimation

Back-of-envelope calculations help validate designs.

### Common Numbers to Know

| Resource | Value |
|----------|-------|
| L1 cache reference | 0.5 ns |
| RAM reference | 100 ns |
| SSD read | 100 μs |
| Network round trip (same datacenter) | 500 μs |
| Network round trip (cross-country) | 150 ms |
| Disk seek | 10 ms |

### Storage Calculations

```
Users: 100 million
Data per user: 1 KB profile + 10 KB posts = 11 KB
Total: 100M × 11 KB = 1.1 TB

With 3x replication: 3.3 TB
Growth over 3 years (2x): 6.6 TB
```

### Throughput Calculations

```
Daily active users: 10 million
Requests per user per day: 20
Daily requests: 200 million
Requests per second: 200M / 86,400 = ~2,300 RPS

Peak (3x average): ~7,000 RPS
Design for: 10,000 RPS (headroom)
```

### Bandwidth Calculations

```
Requests per second: 10,000
Average response size: 10 KB
Bandwidth: 10,000 × 10 KB = 100 MB/s = 800 Mbps
```

---

## Quick Reference Tables

### Database Decision Matrix

| Need | Choose |
|------|--------|
| ACID transactions | PostgreSQL, MySQL |
| Flexible schema | MongoDB, DynamoDB |
| Time series data | InfluxDB, TimescaleDB |
| Graph relationships | Neo4j |
| High write throughput | Cassandra |
| Caching/sessions | Redis |

### Communication Protocol Decision

| Need | Choose |
|------|--------|
| Public API, broad compatibility | REST |
| Flexible queries, multiple clients | GraphQL |
| Internal services, high performance | gRPC |
| Real-time bidirectional | WebSocket |
| One-way server push | Server-Sent Events |

For real-time options, see [WebSockets Explained](/explainer/websockets-explained/), [Server-Sent Events](/server-sent-events-explained/), and [Long Polling](/long-polling-explained/).

### Scaling Decision Matrix

| Problem | Solution |
|---------|----------|
| Database reads too slow | Add read replicas, caching |
| Database writes too slow | Sharding, write-behind cache |
| Single server overloaded | Horizontal scaling with load balancer |
| Too much traffic for one region | CDN, geographic distribution |
| Service calls too slow | Message queues, async processing |

### Common System Design Numbers

| System | Scale |
|--------|-------|
| Twitter (X) | 500 million tweets/day |
| Google | 8.5 billion searches/day |
| Netflix | 15% of global internet traffic |
| WhatsApp | 100 billion messages/day |
| Uber | 1 million matches/minute peak |

---

## Putting It All Together

Here is a typical architecture for a scalable web application:

```mermaid
flowchart TB
    Users[Users] --> CDN[CDN]
    CDN --> LB[Load Balancer]
    LB --> API1[API Server]
    LB --> API2[API Server]
    LB --> API3[API Server]
    
    API1 --> Cache[(Redis Cache)]
    API2 --> Cache
    API3 --> Cache
    
    Cache --> DB[(Primary DB)]
    DB --> R1[(Replica)]
    DB --> R2[(Replica)]
    
    API1 --> Queue[Message Queue]
    API2 --> Queue
    API3 --> Queue
    
    Queue --> W1[Worker]
    Queue --> W2[Worker]
    
    W1 --> S3[(Object Storage)]
    W2 --> Search[(Search Index)]
    
    style LB fill:#234e52,stroke:#319795,color:#b2f5ea
    style Cache fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style DB fill:#1a365d,stroke:#2b6cb0,color:#bee3f8
    style Queue fill:#2d3748,stroke:#4a5568,color:#e2e8f0
```

Components:
1. **CDN**: Serves static assets close to users
2. **Load Balancer**: Distributes traffic, provides failover
3. **API Servers**: Handle business logic, stateless for easy scaling
4. **Cache**: Reduce database load, improve latency
5. **Database**: Primary for writes, replicas for reads
6. **Message Queue**: Decouple services, handle async work
7. **Workers**: Process background jobs
8. **Object Storage**: Store files, media
9. **Search Index**: Full-text search capabilities

---

## Further Reading

These posts go deeper into specific topics:

**Caching and Performance**:
- [Caching Strategies Explained](/caching-strategies-explained/)
- [How Meta Achieves Cache Consistency](/meta-cache-consistency/)

**Database and Storage**:
- [Write-Ahead Log in Distributed Systems](/distributed-systems/write-ahead-log/)
- [How Amazon S3 Works](/how-amazon-s3-works/)

**Scaling Case Studies**:
- [How Netflix Video Processing Pipeline Works](/netflix-video-processing-pipeline/)
- [How OpenAI Scales PostgreSQL to 800M Users](/how-openai-scales-postgresql/)
- [How Uber Finds Nearby Drivers at 1M RPS](/how-uber-finds-nearby-drivers-1-million-requests-per-second/)
- [Slack System Design Architecture](/slack-system-design/)
- [How Stripe Prevents Double Payment](/how-stripe-prevents-double-payment/)
- [How WhatsApp Scales](/whatsapp-scaling-secrets/)

**Distributed Systems**:
- [Role of Queues in System Design](/role-of-queues-in-system-design/)
- [Two-Phase Commit](/distributed-systems/two-phase-commit/)
- [Distributed Counter Architecture](/distributed-counter-architecture-guide/)

**Operations and Deployment**:
- [Feature Flags: How to Deploy Code Without Releasing Features](/feature-flags-guide/)
- [Kubernetes Cheat Sheet](/kubernetes-cheat-sheet/)
- [Kubernetes Architecture](/devops/kubernetes-architecture/)
- [Linux Commands Cheat Sheet](/linux-commands-cheat-sheet/)

---

**External Resources**:

- [System Design Primer (GitHub)](https://github.com/donnemartin/system-design-primer)
- [Designing Data-Intensive Applications (Book)](https://dataintensive.net/)
- [High Scalability Blog](http://highscalability.com/)
- [Martin Fowler's Architecture Posts](https://martinfowler.com/architecture/)
