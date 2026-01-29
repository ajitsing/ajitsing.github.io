---
layout: post
title: "How Slack Built a System That Handles 10+ Billion Messages"
subtitle: "Inside the architecture that powers real-time communication for millions"
date: 2025-09-19
thumbnail-img: /assets/img/posts/slack-system-design/thumbnail.png
share-img: /assets/img/posts/slack-system-design/thumbnail.png
categories: system-design
tags: [system-design]
permalink: /slack-system-design/
description: "Deep dive into Slack's system design and architecture - how they handle millions of users, billions of messages, and maintain real-time communication at scale. Learn from their scaling challenges, database design, and microservices architecture."
keywords: "Slack system design, real-time messaging architecture, WebSocket scaling, workspace sharding, database sharding, microservices architecture, system design interview, distributed systems, message delivery, chat application architecture"
seo: true
social-share: true
comments: true
faq:
  - question: "What database architecture does Slack use for storing messages?"
    answer: "Slack uses MySQL with workspace-based sharding. Messages are stored in tiered storage - hot storage (Redis cache + MySQL) for recent messages (last 30 days), warm storage for older messages (30-365 days), and cold storage (Amazon S3) for messages older than a year. Elasticsearch powers the search layer across all tiers."
  - question: "How does Slack handle millions of users and channels at scale?"
    answer: "Slack shards everything by workspace - each workspace gets its own database shard, RTM server, and search index. This provides linear scaling, fault isolation, and data locality. Users within a workspace share resources, but different workspaces are completely isolated."
  - question: "How does Slack deliver messages in real-time to users?"
    answer: "Slack uses a two-brain architecture: WebApp servers handle message validation, processing, and database writes, while Real-Time Messaging (RTM) servers manage WebSocket connections and message broadcasting. Messages flow through WebApp for storage, then RTM broadcasts to connected users instantly."
  - question: "What is Slack's scalability strategy for handling billions of messages?"
    answer: "Slack's scalability comes from workspace-based sharding, separating read/write concerns (WebApp vs RTM servers), tiered message storage, Redis caching, and solving the thundering herd problem with exponential backoff and jitter during reconnections."
  - question: "How does Slack store and retrieve channel messages efficiently?"
    answer: "Channel messages are stored in sharded MySQL databases partitioned by workspace. Recent messages are cached in Redis for instant access. Lazy-loading fetches message history as users scroll, and Elasticsearch enables fast full-text search across all messages."
  - question: "What technology stack powers Slack's messaging architecture?"
    answer: "Slack uses PHP for WebApp servers, Java for RTM (real-time) servers, MySQL for sharded databases, Redis for caching and connection state, Elasticsearch for search, AWS infrastructure, HAProxy for load balancing, and CloudFront CDN for file delivery."
---

You send a message in Slack, and within milliseconds, it appears on your colleague's screen across the globe. Behind this simple action lies one of the most sophisticated real-time messaging systems ever built.

Slack processes over **10 billion messages** annually, serves **20+ million daily active users**, and maintains **99.99% uptime**. Originally a failed gaming company's internal tool, Slack accidentally solved the massive challenge of **real-time communication at scale**.

The core challenges they solved:
- **Instant delivery** to the right people
- **Perfect ordering** even when networks fail
- **Seamless experience** across all devices
- **Search through years** of history
- **Zero downtime** for millions of users

Let's see how they built a system that never sleeps.

## Slack's Architecture: The 30,000-Foot View

Before diving into the nitty-gritty, here's how Slack's system looks from above:

<pre><code class="language-mermaid">
graph TB
    subgraph "Client Layer"
        Mobile[📱 Mobile Apps]
        Desktop[💻 Desktop Apps]  
        Web[🌐 Web Apps]
    end
    
    subgraph "Load Balancing"
        LB[⚖️ Load Balancer]
    end
    
    subgraph "Application Layer"
        WebApp[🖥️ WebApp Servers]
        RTM[⚡ Real-time Servers]
    end
    
    subgraph "Data Layer"
        MySQL[(🗃️ MySQL Shards)]
        Redis[(💾 Redis Cache)]
        Search[(🔍 Search Service)]
        FileStore[(📁 File Storage)]
    end
    
    subgraph "External"
        Queue[📥 Job Queues]
        CDN[☁️ CDN]
    end
    
    Mobile --> LB
    Desktop --> LB
    Web --> LB
    
    LB --> WebApp
    LB --> RTM
    
    WebApp --> MySQL
    WebApp --> Redis
    WebApp --> Queue
    RTM --> MySQL
    RTM --> Redis
    
    Search --> MySQL
    CDN --> FileStore
</code></pre>

## The Two-Brain Architecture

Slack's key insight: **separate the brain that thinks from the brain that talks**.

### WebApp Servers (The Thinkers)
- User authentication and authorization
- Message validation and processing
- Database writes and complex queries
- File uploads and integrations

### Real-Time Messaging Servers (The Talkers)
- WebSocket connection management
- Message broadcasting
- Presence updates and typing indicators
- Real-time notifications

**Why split them?** The WebApp servers focus on being thorough. RTM servers focus on speed. Each scales independently.

Here's how a message flows through both systems:

<pre><code class="language-mermaid">
sequenceDiagram
    participant Client1 as 👤 User A
    participant WebApp as 🖥️ WebApp Server
    participant DB as 🗃️ Database
    participant RTM as ⚡ RTM Server
    participant Client2 as 👤 User B
    
    Client1->>WebApp: Send message
    WebApp->>WebApp: Validate & process
    WebApp->>DB: Store message
    WebApp->>RTM: Notify: new message
    RTM->>Client2: Broadcast message
    WebApp->>Client1: Confirm delivery
</code></pre>

## The Workspace Sharding Strategy

Slack's key insight: **workspaces are natural boundaries**. Users in different companies rarely interact, and each workspace has its own isolated data.

So Slack shards **everything** by workspace:

<pre><code class="language-mermaid">
graph LR
    subgraph "Shard 3"
        WS3[Workspace C]
        DB3[(Database 3)]
        RTM3[RTM Server 3]
        Search3[Search Index 3]
    end
    
    subgraph "Shard 2"
        WS2[Workspace B]
        DB2[(Database 2)]
        RTM2[RTM Server 2]
        Search2[Search Index 2]
    end
    
    subgraph "Shard 1"
        WS1[Workspace A]
        DB1[(Database 1)]
        RTM1[RTM Server 1]
        Search1[Search Index 1]
    end
    
    WS1 --> DB1
    WS1 --> RTM1
    WS1 --> Search1
    
    WS2 --> DB2
    WS2 --> RTM2
    WS2 --> Search2
    
    WS3 --> DB3
    WS3 --> RTM3
    WS3 --> Search3
</code></pre>

**Benefits**: Linear scaling, fault isolation, data locality, and simpler queries.

## The Thundering Herd Problem

Imagine 50,000 employees losing internet, then reconnecting **simultaneously**. Each client needs authentication, workspace snapshots, WebSocket connections, and message sync.

This **Thundering Herd Problem** nearly broke Slack's early architecture.

Here's how they solved it:

### 1. Exponential Backoff with Jitter
Instead of everyone reconnecting immediately:

```
reconnect_delay = base_delay * (2 ^ attempt_number) + random_jitter
```

This spreads reconnections over time instead of clustering them.

### 2. Snapshot Optimization
They drastically reduced what gets sent during reconnection:
- Only essential channel metadata (not full history)
- Lazy-load message history as users scroll
- Compress large user lists
- Send presence updates in batches

### 3. Connection Pooling
RTM servers pool WebSocket connections for efficient reuse.

For more on handling traffic spikes and backoff strategies, see [Building a Dynamic Rate Limiter](/dynamic-rate-limiter-system-design/).

## Database Design: MySQL at Scale

Slack chose **MySQL over NoSQL** and made it work through smart sharding.

**Storage challenge**: Recent messages need instant access, old messages need searchability, and everything must handle edits/deletes.

**Solution**: Tiered storage by age.

<pre><code class="language-mermaid">
graph TD
    subgraph "Hot Storage (Last 30 days)"
        MySQL1[(MySQL Primary)]
        Redis1[(Redis Cache)]
    end
    
    subgraph "Warm Storage (30-365 days)"
        MySQL2[(MySQL Secondary)]
        Redis2[(Limited Cache)]
    end
    
    subgraph "Cold Storage (>1 year)"
        S3[(Amazon S3)]
        Archive[(Compressed Archives)]
    end
    
    subgraph "Search Layer"
        ES[(Elasticsearch)]
    end
    
    App[Application] --> Redis1
    Redis1 --> MySQL1
    MySQL1 --> MySQL2
    MySQL2 --> S3
    
    MySQL1 --> ES
    MySQL2 --> ES
    S3 --> ES
    
    App --> ES
</code></pre>

**Key insight**: No foreign keys between shards keeps each workspace completely independent.

## Real-Time Magic: WebSockets Done Right

The real-time experience is where Slack shines. Here's how they make it feel instant. (For WebSocket fundamentals, check out [WebSockets Explained](/explainer/websockets-explained/).)

### Connection State Management

**Problem**: WebSocket connections aren't stateless. Each server needs to know your channels, presence, and read state.

**Solution**: Store connection state in Redis for seamless failover.

<pre><code class="language-mermaid">
graph TB
    subgraph "RTM Cluster"
        RTM1[RTM Server 1]
        RTM2[RTM Server 2]
        RTM3[RTM Server 3]
    end
    
    subgraph "State Storage"
        Redis[(Redis Cluster)]
    end
    
    subgraph "Clients"
        User1[👤 User A]
        User2[👤 User B]
        User3[👤 User C]
    end
    
    User1 --> RTM1
    User2 --> RTM2
    User3 --> RTM3
    
    RTM1 --> Redis
    RTM2 --> Redis
    RTM3 --> Redis
    
    Redis --> RTM1
    Redis --> RTM2
    Redis --> RTM3
</code></pre>

### Message Delivery Guarantees

**Problem**: Networks are unreliable. Messages can get lost, duplicated, or arrive out of order.

**Solution**: At-least-once delivery with client-side deduplication:
1. Server assigns unique ID to each message
2. Client acknowledges receipt 
3. Server retries if no acknowledgment
4. Client deduplicates using message ID

## Search: Essential for Productivity

With billions of messages, great search transforms user productivity.

<pre><code class="language-mermaid">
graph TB
    subgraph "Search Pipeline"
        Messages[(Messages DB)]
        Indexer[Message Indexer]
        ES[(Elasticsearch)]
        SearchAPI[Search API]
    end
    
    subgraph "User Experience"
        User[👤 User]
        SearchBox[🔍 Search Interface]
        Results[📋 Search Results]
    end
    
    Messages --> Indexer
    Indexer --> ES
    User --> SearchBox
    SearchBox --> SearchAPI
    SearchAPI --> ES
    ES --> Results
    Results --> User
</code></pre>

**Search optimizations**:
- Real-time indexing (seconds)
- Smart autocomplete
- Contextual ranking  
- Aggressive caching

**Query examples**: `from:@john after:2023-01-01`, `in:#general has:link`

## File Sharing at Scale

People share everything from tiny text files to 1GB videos.

<pre><code class="language-mermaid">
graph TB
    subgraph "Upload Flow"
        Client[📱 Client]
        Upload[⬆️ Upload Service]
        Virus[🛡️ Virus Scanner]
        Process[⚙️ File Processor]
        CDN[☁️ CDN]
    end
    
    subgraph "Storage"
        S3[(🗃️ S3 Storage)]
        Thumbs[(🖼️ Thumbnails)]
        Preview[(👁️ Preview Cache)]
    end
    
    Client --> Upload
    Upload --> Virus
    Virus --> Process
    Process --> S3
    Process --> Thumbs
    Process --> Preview
    S3 --> CDN
    Thumbs --> CDN
    Preview --> CDN
</code></pre>

**Key challenges**: Security scanning, performance optimization, compliance, and cost management.

## Monitoring Philosophy

**Key insight**: Alert on user impact, not system metrics.

Instead of CPU alerts, Slack monitors:
- Message delivery time > 2 seconds  
- Search latency > 500ms
- Connection failure rate > 1%

This keeps focus on actual user experience.

## Key Lessons Learned

**1. Workspace Migration**: Large workspaces need dedicated shards. Size distribution is extremely uneven.

**2. Search Optimization**: Tiered indexing - recent messages get full indexing, older messages get compressed indexing.

**3. Mobile Battery**: Intelligent connection management - close connections when backgrounded.

## Technology Stack

**Core**: PHP (WebApp), Java (RTM), MySQL (sharded), Redis (caching), Elasticsearch (search)
**Infrastructure**: AWS, HAProxy, CloudFront CDN
**Mobile**: Swift (iOS), Kotlin (Android)

## Key Takeaways

**1. Sharding Strategy > Technology Choice**: Workspace-based sharding defined Slack's scalability ceiling, not MySQL vs MongoDB.

**2. Separate Read/Write Concerns**: The WebApp/RTM split is brilliant - specialize your services.

**3. Plan for Thundering Herds**: Build exponential backoff into reconnection logic from day one.

**4. Monitor User Experience**: Instrument what users feel, not just CPU metrics.

**5. Real-time is Expected**: Users expect real-time everything in 2024.

**6. Search is a Differentiator**: Great search transforms productivity.

## The Bottom Line

Slack's success comes from **smart trade-offs, not cool technology**:

- **Simplicity over complexity** (MySQL over NoSQL)
- **Specialization over generalization** (separate WebApp/RTM)
- **User experience over system metrics** (alert on latency, not CPU)

The result? A system handling billions of messages that feels instant.

---

*Want to dive deeper into system design? Check out [How Google Docs Works](/how-google-docs-works/) for real-time collaborative editing, [How Stock Brokers Handle Real-Time Price Updates](/how-stock-brokers-handle-real-time-price-updates/) for high-throughput data streaming, and [WebSockets Explained](/explainer/websockets-explained/) for the underlying protocol that powers these systems.*
