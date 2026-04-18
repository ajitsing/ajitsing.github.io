---
layout: post
seo: true
title: "When to Use PostgreSQL vs MongoDB vs DynamoDB (2026 Guide)"
subtitle: "ACID vs eventual consistency, horizontal scaling, cost at scale, and how to avoid picking the wrong one"
date: 2026-03-04
categories: database
thumbnail-img: /assets/img/posts/database/postgresql-vs-mongodb-dynamodb.png
share-img: /assets/img/posts/database/postgresql-vs-mongodb-dynamodb.png
permalink: /postgresql-vs-mongodb-vs-dynamodb/
description: "Learn exactly when to use PostgreSQL, MongoDB, or DynamoDB. Covers ACID vs eventual consistency, horizontal scaling, cost at scale, real-world company choices, and common mistakes developers make when picking a database."
keywords: "PostgreSQL vs MongoDB, PostgreSQL vs DynamoDB, MongoDB vs DynamoDB, which database to use 2026, NoSQL vs SQL database, relational database vs document database, database comparison 2026, best database for startups, when to use PostgreSQL, when to use MongoDB, when to use DynamoDB, ACID transactions database, DynamoDB single table design, MongoDB document model, PostgreSQL performance, database selection guide, best database for web app, serverless database AWS, MongoDB Atlas vs PostgreSQL, DynamoDB pricing, database scaling guide, NoSQL database comparison, relational vs NoSQL 2026, PostgreSQL JSONB, DynamoDB GSI, MongoDB aggregation pipeline, database for SaaS, database for microservices, database for e-commerce"
comments: true
social-share: true
tags: [database, system-design, software-engineering]

quick-answer: "**PostgreSQL** if you have relational data, need complex queries, or want ACID guarantees (finance, SaaS, e-commerce). **MongoDB** if your data is document-shaped and your schema changes often (catalogs, CMS, user profiles). **DynamoDB** if you are on AWS, need massive serverless scale, and know your access patterns upfront (IoT, session stores, high-traffic APIs)."

key-takeaways:
  - "PostgreSQL is a safe default for most applications. Battle-tested, flexible, and scales further than most people think"
  - "MongoDB shines when your data has variable shape and you do not want to run schema migrations every week"
  - "DynamoDB requires you to know your access patterns before you design the schema. Get this wrong and you will regret it"
  - "All three can handle large scale. The difference is in how much operational effort it takes to get there"
  - "Cost at scale is not obvious. DynamoDB looks cheap until you add Global Secondary Indexes and on-demand mode"
  - "You can use more than one database in the same system. Most large applications do"

faq:
  - question: "PostgreSQL vs MongoDB: which is better in 2026?"
    answer: "Neither is objectively better. PostgreSQL is better for structured relational data, complex queries, and ACID transactions. MongoDB is better for document-shaped data with variable schema. PostgreSQL has become much more flexible with JSONB support, so many use cases that previously needed MongoDB can now be handled by PostgreSQL. If you are unsure, start with PostgreSQL."
  - question: "When should I use DynamoDB instead of PostgreSQL?"
    answer: "Use DynamoDB when you are fully committed to AWS, need serverless auto-scaling with zero operational overhead, and your access patterns are simple and predictable. DynamoDB handles unpredictable traffic spikes better than PostgreSQL out of the box. However, it requires careful upfront data modeling and becomes painful if you need ad hoc queries or complex joins."
  - question: "Is MongoDB faster than PostgreSQL?"
    answer: "It depends on the workload. MongoDB can be faster for simple document reads when data is stored denormalized and no joins are needed. PostgreSQL is faster for complex queries with multiple joins and aggregations. For write-heavy workloads, PostgreSQL 17 handles around 19,000 inserts per second under concurrent load. Real-world performance depends heavily on schema design, indexes, and query patterns."
  - question: "Can DynamoDB replace PostgreSQL?"
    answer: "For most traditional applications, no. DynamoDB does not support joins, ad hoc queries, or complex aggregations. It is designed for specific high-scale access patterns. If your app relies on complex reporting, cross-entity queries, or evolving business logic, DynamoDB will frustrate you. It is excellent at what it does, but what it does is narrow."
  - question: "How much does DynamoDB cost compared to PostgreSQL?"
    answer: "DynamoDB cost depends on read/write capacity units and storage. At low throughput it can be very cheap. At scale, costs can become unpredictable, especially in on-demand mode. Managed PostgreSQL (RDS, Aurora, Supabase, Neon) has predictable monthly pricing. MongoDB Atlas charges per cluster size or serverless compute units. Always model your expected workload before choosing based on cost."
  - question: "What is DynamoDB single-table design?"
    answer: "Single-table design is a DynamoDB pattern where multiple entity types (users, orders, products) are stored in a single table using composite partition and sort keys. You pre-compute relationships at write time instead of joining at query time. This enables fast, predictable reads but requires knowing your access patterns upfront. It is the recommended pattern for most DynamoDB applications."
  - question: "Can I use PostgreSQL as a document database?"
    answer: "Yes. PostgreSQL has excellent JSONB support with indexing, querying, and aggregation on JSON fields. For many use cases that previously required MongoDB, PostgreSQL JSONB is a practical alternative. You get the flexibility of documents without sacrificing ACID guarantees or the ability to mix relational and document data in the same database."
  - question: "Which database is easiest to scale horizontally?"
    answer: "DynamoDB scales horizontally automatically with no configuration. MongoDB has built-in sharding but requires planning. PostgreSQL horizontal scaling requires tools like Citus or Vitess, or sharding at the application level. For most applications, PostgreSQL with read replicas handles enormous traffic without horizontal sharding."
---

When you are starting a new project, someone will ask: are we using PostgreSQL, MongoDB, or DynamoDB?

It sounds like a simple question. It is not.

Each database has a philosophy behind it. PostgreSQL says: structure your data and enforce relationships. MongoDB says: store data the way your application sees it. DynamoDB says: figure out exactly how you will read the data before you write a single row.

Pick the wrong one and you will spend months fighting the database instead of building your product. Pick the right one and you will barely notice it is there.

This guide breaks down all three. Not with bullet points and marketing copy, but with the actual trade-offs a developer runs into in production.

> **TL;DR**: Start with PostgreSQL if you are not sure. Switch to MongoDB if your schema changes too often. Choose DynamoDB if you need AWS-native serverless scale and know your access patterns upfront. At scale, most systems use more than one of these.

---

## Quick Comparison

| | PostgreSQL | MongoDB | DynamoDB |
|---|---|---|---|
| **Type** | Relational (SQL) | Document (NoSQL) | Key-value / Document (NoSQL) |
| **Schema** | Strict, enforced | Flexible, per-document | Strict key structure, flexible values |
| **Transactions** | Full ACID | Multi-document ACID (since 4.0) | ACID within a single table |
| **Joins** | Native SQL joins | No native joins (lookups only) | No joins |
| **Scaling** | Vertical + read replicas | Horizontal sharding built-in | Auto-scales serverlessly |
| **Query language** | SQL | MQL (MongoDB Query Language) | PartiQL or DynamoDB API |
| **Managed options** | RDS, Aurora, Supabase, Neon | MongoDB Atlas | AWS DynamoDB (fully managed) |
| **Best for** | Relational data, transactional finance, moderate reporting | Documents, CMS, catalogs, profiles | IoT, sessions, high-traffic APIs |
| **Worst for** | Schema-less variable data | Complex multi-entity queries | Ad hoc queries, complex reporting |

---

## How Each Database Thinks About Data

Before comparing performance and cost, you need to understand how each database wants you to model your data. This is the most important thing and the part developers skip.

<pre><code class="language-mermaid">
flowchart TB
    subgraph PG["fa:fa-table PostgreSQL: Relational"]
        direction LR
        U1["users\n────────\nid | name | email"]
        O1["orders\n────────\nid | user_id | total"]
        P1["products\n────────\nid | name | price"]
        U1 -->|"1:N"| O1
        O1 -->|"N:M"| P1
    end

    subgraph MG["fa:fa-file-alt MongoDB: Document"]
        direction LR
        DOC["users collection\n────────────────────\n{\n  _id: ObjectId,\n  name: 'Alice',\n  orders: [\n    { total: 42, items: [...] }\n  ]\n}"]
    end

    subgraph DDB["fa:fa-bolt DynamoDB: Key-Value"]
        direction LR
        KV["Single table\n──────────────────────────\nPK: USER#123  SK: ORDER#456\nPK: USER#123  SK: PROFILE\nPK: PROD#789  SK: META"]
    end

    PG ~~~ MG
    MG ~~~ DDB

    style PG fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style MG fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style DDB fill:#fff4e0,stroke:#e07b00,color:#0d2137
</code></pre>

PostgreSQL wants you to split data into normalized tables connected by foreign keys. MongoDB wants you to embed related data inside a single document. DynamoDB wants you to put everything in one table and use composite keys to represent relationships.

These are genuinely different philosophies. The model you choose shapes every query you will ever write.

---

## <i class="fas fa-database"></i> PostgreSQL

PostgreSQL has been around since 1996. It is the most feature-rich open-source relational database, and in 2026, it is the default choice for most new applications.

### What it does well

**Relational data with clear relationships.** If you have users, orders, products, and invoices that reference each other, PostgreSQL is built for this. Foreign keys, joins, constraints, and cascades all come free.

**Complex queries.** Ad hoc queries, multi-table joins, window functions, CTEs, full-text search, geospatial queries with PostGIS. PostgreSQL handles all of it in a single query language you already know.

**ACID transactions.** Every write is durable. Commit means it is written. Crash means nothing is corrupted. This matters enormously for financial data, inventory, and any system where you cannot afford to lose or double-count records.

**JSON support.** PostgreSQL's `JSONB` column type lets you store and query JSON documents with full indexing. Many use cases that once required MongoDB can be handled by a `JSONB` column in a PostgreSQL table.

```sql
-- Store flexible product attributes as JSONB
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  attributes JSONB
);

-- Query inside JSON with full index support
CREATE INDEX idx_products_category ON products USING GIN (attributes);

SELECT * FROM products
WHERE attributes->>'category' = 'electronics'
  AND (attributes->>'price')::numeric < 500;
```

**Horizontal scaling with the right setup.** By itself, PostgreSQL scales vertically. But with [read replicas](/how-openai-scales-postgresql/), [connection pooling via PgBouncer](/how-openai-scales-postgresql/), and tools like Citus for sharding, it scales further than most applications will ever need. OpenAI runs ChatGPT for 800 million users on PostgreSQL.

### Where it struggles

**Flexible schema changes.** Adding a column to a 100 million row table requires a migration. In production, that can mean downtime or a carefully orchestrated online migration. MongoDB and DynamoDB do not have this problem.

**Horizontal write scaling.** Out of the box, all writes go to one primary node. Horizontal write scaling requires external sharding or managed services like Aurora with write scaling, which adds complexity.

**Connection overhead.** PostgreSQL creates a process per connection. At thousands of concurrent connections, this becomes a problem. You almost always need PgBouncer in front of PostgreSQL at scale. See [how databases store data internally](/how-databases-store-data-internally/) for the underlying reason.

### When to choose PostgreSQL

- You have relational data (orders, users, inventory, financial records)
- You need complex reporting queries across relational data (for heavy analytics at scale, you will eventually want a dedicated column store like ClickHouse or BigQuery alongside it)
- You want ACID guarantees across multiple tables
- You are starting a new project and are not sure what you need
- Your team knows SQL

For setup guidance, see [Django + PostgreSQL from zero to production](/django-postgresql-setup-from-zero-to-production/) or the [PostgreSQL Cheat Sheet](/postgresql-cheat-sheet/) for the commands you will use daily.

---

## <i class="fas fa-leaf"></i> MongoDB

MongoDB launched in 2009 and popularized document databases. The pitch was compelling: store data as JSON documents, skip migrations, and scale horizontally. In 2026, MongoDB is mature, has multi-document ACID transactions, and is a solid choice for the right workload.

### What it does well

**Variable schema.** Different documents in the same collection can have different fields. A `products` collection can have electronics with `{ voltage, wattage }` and clothing with `{ size, material }` without any schema changes.

```javascript
// Electronics product
{
  _id: ObjectId("..."),
  name: "MacBook Pro",
  category: "electronics",
  voltage: 20,
  wattage: 140,
  specs: { ram: "32GB", storage: "1TB" }
}

// Clothing product, different shape entirely
{
  _id: ObjectId("..."),
  name: "Running Shoes",
  category: "clothing",
  size: ["US8", "US9", "US10"],
  material: "mesh",
  colors: ["black", "white"]
}
```

**Embedded documents.** Related data can live inside a single document. A blog post with its comments, a user with their address book. One query, one round trip.

```javascript
// All order data in one document, no joins needed
{
  _id: ObjectId("..."),
  userId: "user123",
  status: "shipped",
  items: [
    { productId: "prod456", name: "Keyboard", qty: 1, price: 129 },
    { productId: "prod789", name: "Mouse", qty: 1, price: 59 }
  ],
  shippingAddress: {
    street: "123 Main St",
    city: "San Francisco",
    zip: "94105"
  }
}
```

**Aggregation pipeline.** MongoDB's aggregation framework handles complex transformations, grouping, and analytics on documents. It is not as expressive as SQL, but it is powerful for document-shaped data.

**Built-in horizontal sharding.** MongoDB Atlas or a self-hosted cluster supports automatic sharding across nodes. You configure a shard key and MongoDB distributes data automatically.

**Change streams.** Real-time event streaming from your database. Build event-driven architectures without Kafka for simpler use cases.

### Where it struggles

**Joins are awkward.** MongoDB has `$lookup` for joining collections, but it is not a native join. Cross-collection queries are slow and verbose compared to SQL joins. If you find yourself writing many `$lookup` stages, you are fighting the database.

**Multi-document transactions add overhead.** MongoDB added ACID multi-document transactions in version 4.0, but they are slower than single-document operations and add coordination overhead. If you need lots of cross-document transactions, you are fighting the data model.

**Memory-hungry aggregations.** Complex aggregation pipelines can consume large amounts of RAM. On modest hardware, they hit 100MB memory limits and spill to disk.

**Schema drift.** The flexibility is also a trap. Without validation rules, your documents will diverge over time. By the time you need to query across all documents, you discover that half of them are missing fields. Apply schema validation from day one.

### When to choose MongoDB

- Your data is genuinely document-shaped and hierarchical
- Your schema evolves frequently (early-stage product, content management)
- You build catalogs, profiles, or CMS systems where each record has different attributes
- You want embedded documents to avoid joins on frequently accessed data
- Your team is already comfortable with JSON and JavaScript

For the commands you will use daily with MongoDB, see the [MongoDB Cheat Sheet](/mongodb-cheat-sheet/).

---

## <i class="fab fa-aws"></i> DynamoDB

DynamoDB is Amazon's fully managed NoSQL database. It has been running at AWS scale since 2012 and powers some of the most high-traffic systems in the world. But it is genuinely different from PostgreSQL and MongoDB, and choosing it without understanding that difference will cause real pain.

### What it does well

**Predictable single-digit millisecond latency at any scale.** DynamoDB is designed around a key-value model. Get an item by primary key and you get it back fast, whether you have 1,000 items or 1 trillion.

**Serverless auto-scaling.** In on-demand mode, DynamoDB scales from zero to tens of millions of requests per second automatically. No provisioning, no cluster management, no connection pooling. You pay for what you use.

**Zero operational overhead.** No database server to manage. No backups to configure (point-in-time recovery is built in). No patches to apply. This is a real advantage for small teams and serverless architectures.

**AWS ecosystem integration.** DynamoDB integrates natively with Lambda, API Gateway, Kinesis, S3, and the rest of AWS. If you are building serverless on AWS, DynamoDB feels natural.

**Global tables.** Multi-region active-active replication built in. Your data is replicated globally and writes are accepted in any region.

### The design constraint you must understand

DynamoDB does not have a query optimizer. You cannot run arbitrary queries. Every query must use the partition key (and optionally the sort key). If you want to query by a different attribute, you need a Global Secondary Index (GSI) defined upfront.

This is the single biggest difference between DynamoDB and every other database on this list. **You design your schema around your access patterns, not around your entities.**

<pre><code class="language-mermaid">
flowchart TB
    subgraph Traditional["Traditional Database Approach"]
        direction LR
        T1["Define entities\n(users, orders, products)"] --> T2["Normalize schema"] --> T3["Query whatever\nyou need at runtime"]
    end

    subgraph DDB["DynamoDB Approach"]
        direction LR
        D1["List every access\npattern upfront"] --> D2["Design keys and GSIs\naround those patterns"] --> D3["Query only what\nyou modeled for"]
    end

    Traditional ~~~ DDB

    style Traditional fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style DDB fill:#fff4e0,stroke:#e07b00,color:#0d2137
</code></pre>

Here is what single-table design looks like in practice:

```python
# All entities in one table with composite keys
# PK = partition key, SK = sort key

# Get a user profile
table.get_item(Key={"PK": "USER#123", "SK": "PROFILE"})

# Get all orders for a user
table.query(
    KeyConditionExpression=Key("PK").eq("USER#123") &
                           Key("SK").begins_with("ORDER#")
)

# Get a specific order
table.get_item(Key={"PK": "USER#123", "SK": "ORDER#456"})

# Get all items in an order (accessed via GSI)
table.query(
    IndexName="GSI1",
    KeyConditionExpression=Key("GSI1PK").eq("ORDER#456")
)
```

### Where it struggles

**Ad hoc queries are not supported.** You cannot query by arbitrary fields without defining a GSI upfront. If you realize three months in that you need to query orders by status, you need to add a GSI. If no GSI exists, you do a full table scan, which is both slow and expensive.

**No joins.** None. All related data must either be in the same item, in the same table with smart keys, or fetched in multiple round trips.

**Learning curve.** Single-table design is genuinely hard to learn if you come from SQL. It requires a mental shift that takes time. NoSQL data modeling resources for DynamoDB are sparse compared to SQL resources.

**Cost unpredictability.** On-demand pricing is convenient but can surprise you. GSIs double your write costs (each write to the main table is also written to the GSI). Scan operations are expensive. Hot partitions can throttle you even with reserved capacity.

**Migrating schema is painful.** If you got your key structure wrong, you cannot just `ALTER TABLE`. You write a migration job to read and rewrite every item with the new structure.

### When to choose DynamoDB

- You are committed to the AWS ecosystem
- You need massive scale with zero ops (serverless Lambda functions, IoT ingestion, gaming leaderboards)
- Your access patterns are simple and known upfront (session stores, user activity logs, shopping carts)
- You need predictable low-latency at scale
- You have a team that has used DynamoDB before

---

## Performance: What the Numbers Actually Show

Marketing pages show benchmarks in the best case. Here is a more honest picture.

<pre><code class="language-mermaid">
flowchart LR
    subgraph Reads["Read Performance"]
        direction TB
        R1["Simple primary key lookup"]
        R2["Complex multi-table query"]
        R3["Full-text search"]
        R4["Aggregation over millions of rows"]
    end

    subgraph PG2["PostgreSQL"]
        direction TB
        PG_R1["Good: indexed lookup O(log n)"]
        PG_R2["Excellent: native SQL joins"]
        PG_R3["Good: tsvector + GIN index"]
        PG_R4["OK: parallel query helps, but\ncol stores (ClickHouse, BigQuery)\nare far faster at this"]
    end

    subgraph MG2["MongoDB"]
        direction TB
        MG_R1["Good: indexed _id lookup"]
        MG_R2["Poor: $lookup is slow at scale"]
        MG_R3["Good: Atlas Search (Lucene)"]
        MG_R4["OK: aggregation pipeline, memory-bound"]
    end

    subgraph DDB2["DynamoDB"]
        direction TB
        DDB_R1["Excellent: single-digit ms guaranteed"]
        DDB_R2["Not supported"]
        DDB_R3["Not supported natively"]
        DDB_R4["Not supported (full scan only)"]
    end

    R1 --- PG_R1
    R1 --- MG_R1
    R1 --- DDB_R1
    R2 --- PG_R2
    R2 --- MG_R2
    R2 --- DDB_R2
    R3 --- PG_R3
    R3 --- MG_R3
    R3 --- DDB_R3
    R4 --- PG_R4
    R4 --- MG_R4
    R4 --- DDB_R4

    classDef row1 fill:#dbeafe,stroke:#3b82f6,color:#1e3a5f
    classDef row2 fill:#dcfce7,stroke:#16a34a,color:#14532d
    classDef row3 fill:#ffedd5,stroke:#ea580c,color:#7c2d12
    classDef row4 fill:#fce7f3,stroke:#db2777,color:#831843

    class R1,PG_R1,MG_R1,DDB_R1 row1
    class R2,PG_R2,MG_R2,DDB_R2 row2
    class R3,PG_R3,MG_R3,DDB_R3 row3
    class R4,PG_R4,MG_R4,DDB_R4 row4

    style PG2 fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style MG2 fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style DDB2 fill:#fff4e0,stroke:#e07b00,color:#0d2137
</code></pre>

For write throughput, PostgreSQL 17 handles around 19,000 inserts per second with proper constraints. MongoDB 8.0 improved bulk write performance by 56%, though individual document inserts are slower. DynamoDB write performance is a function of provisioned capacity or on-demand auto-scaling, not the database engine itself.

The stat that matters most for most applications is not raw throughput. It is **p99 latency under concurrent load**. PostgreSQL with indexes gets sub-millisecond p99 on simple queries. DynamoDB guarantees single-digit milliseconds. MongoDB falls in between, but performance degrades faster under complex queries.

For a deeper look at how databases get this performance from storage, see [how databases store data internally](/how-databases-store-data-internally/) and [database indexing explained](/database-indexing-explained/).

---

## Cost: The Real Picture

Cost is the wrong reason to pick a database, but it is a real constraint.

**PostgreSQL** is open-source and free. You pay for the server. Managed options:
- **Neon** (serverless PostgreSQL): free tier, then pay per compute second. Excellent for low-traffic apps.
- **Supabase**: free tier, then $25/month for a proper production instance.
- **AWS RDS PostgreSQL**: ~$35/month for a db.t4g.medium. Scales up from there.
- **AWS Aurora PostgreSQL**: more expensive but better at auto-scaling reads.

**MongoDB** is open-source but MongoDB Atlas (the managed cloud version) is how most teams run it.
- **Atlas Serverless**: pay per operation. Great for development, expensive at sustained high load.
- **Atlas Dedicated**: starts around $57/month for a 3-node M10 cluster. Scales up linearly.

**DynamoDB** pricing is the most complex.
- **On-demand**: pay per read/write request unit. $0.25 per million WCUs, $0.05 per million RCUs.
- **Provisioned capacity**: reserve capacity upfront, cheaper if traffic is predictable.
- **GSIs**: each GSI adds ~50% to write costs because writes are propagated to each index.
- **Data transfer**: read costs differ between eventually consistent and strongly consistent reads.

DynamoDB received a significant price cut in late 2024, making it more competitive. But for sustained high-throughput workloads, managed PostgreSQL with read replicas often comes out cheaper than DynamoDB at the same request volume.

Always model your expected read/write volume before committing to DynamoDB pricing. A naive DynamoDB setup with multiple GSIs can cost 3-5x more than expected.

---

## How to Choose: A Decision Guide

<pre><code class="language-mermaid">
flowchart TD
    Start(["fa:fa-question-circle Start Here"])

    Start --> Q1{"Is your data\nstrictly relational\nwith clear relationships?"}

    Q1 -->|Yes| Q2{"Do you need\ncomplex joins or\nad hoc reporting?"}
    Q1 -->|No| Q3{"Is your data\nhierarchical or\ndocument-shaped?"}

    Q2 -->|Yes| PG1["fa:fa-check PostgreSQL\nBest choice"]
    Q2 -->|No| Q4{"Are you fully\non AWS?"}

    Q3 -->|Yes| Q5{"Does your schema\nchange frequently?"}
    Q3 -->|No| Q6{"Do you need\nkey-value or\nsimple lookups?"}

    Q5 -->|Yes| MG["fa:fa-check MongoDB\nBest choice"]
    Q5 -->|No| PG2["fa:fa-check PostgreSQL\nwith JSONB columns"]

    Q6 -->|Yes| Q4
    Q6 -->|No| PG3["fa:fa-check PostgreSQL\nSafe default"]

    Q4 -->|Yes| Q7{"Do you know all\nyour access patterns\nupfront?"}
    Q4 -->|No| PG4["fa:fa-check PostgreSQL\nor MongoDB"]

    Q7 -->|Yes| DDB["fa:fa-check DynamoDB\nBest choice"]
    Q7 -->|No| PG5["fa:fa-check PostgreSQL\nor MongoDB\nLearn access patterns first"]

    style PG1 fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style PG2 fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style PG3 fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style PG4 fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style PG5 fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style MG fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style DDB fill:#fff4e0,stroke:#e07b00,color:#0d2137
    style Start fill:#f8f9fa,stroke:#6c757d,color:#0d2137
</code></pre>

---

## What Real Companies Use

Knowing the theory is useful. Knowing what production systems actually run helps more.

**PostgreSQL is everywhere.** OpenAI runs ChatGPT on PostgreSQL ([read how they do it](/how-openai-scales-postgresql/)). Notion uses PostgreSQL. Instagram started on PostgreSQL. Shopify, GitHub, and Gitlab all use PostgreSQL as their primary database. It is the workhorse of the internet.

**MongoDB is common in document-heavy products.** Forbes, Adobe, and eBay use MongoDB for product catalogs and content management. It is common in IoT platforms where devices report variable payloads. Many early-stage startups use MongoDB Atlas because the free tier is generous and you can move fast without migrations.

**DynamoDB powers AWS-native systems.** Amazon's own e-commerce systems run on DynamoDB. Lyft, Airbnb, and Comcast use DynamoDB for session storage and event metadata where they need massive scale and predictable latency. Discord uses it for message storage at enormous scale.

One thing to notice: none of these companies use a single database for everything. Shopify uses PostgreSQL for core data and Redis for caching. Discord uses both Cassandra and Scylla alongside relational databases. Large systems use the right tool for each workload. For caching patterns that sit alongside your database, see [caching strategies explained](/caching-strategies-explained/).

---

## Common Mistakes

These are the mistakes teams make most often, and the mistakes that cost the most time to fix.

### <i class="fas fa-exclamation-triangle"></i> Choosing MongoDB because you want to skip migrations

A common reason teams reach for MongoDB is "we do not want to deal with schema migrations." But no schema does not mean no structure. It means your structure is enforced in application code instead of the database. When different versions of your code write different shapes of documents, you end up with a mess that is harder to migrate than an SQL schema.

Add schema validation to MongoDB from day one with `$jsonSchema`. It is opt-in, but skipping it creates a mess you will spend months cleaning up.

### <i class="fas fa-exclamation-triangle"></i> Starting DynamoDB before understanding access patterns

DynamoDB is the only database where getting the schema wrong means rewriting every row in the table. Unlike PostgreSQL where you can add an index or change a query, DynamoDB access patterns are baked into the key structure. Teams that jump into DynamoDB without modeling their access patterns first spend weeks or months in pain.

Before writing a single DynamoDB table, write down every query your application needs to execute. Every one of them. Then design your keys and GSIs around those patterns.

### <i class="fas fa-exclamation-triangle"></i> Assuming PostgreSQL cannot scale

PostgreSQL is not a "small database." With read replicas, connection pooling, and a proper query optimization process (using `EXPLAIN ANALYZE` as described in the [database indexing guide](/database-indexing-explained/)), PostgreSQL handles millions of requests per day on modest hardware. Most teams hit infrastructure problems long before they hit PostgreSQL limits.

### <i class="fas fa-exclamation-triangle"></i> Adding too many MongoDB indexes

MongoDB indexes feel free because they do not require a migration. Teams add them liberally. But every index slows down writes because MongoDB updates all indexes on every write. Audit your indexes regularly with `db.collection.aggregate([{ $indexStats: {} }])`.

### <i class="fas fa-exclamation-triangle"></i> Using DynamoDB for reporting

DynamoDB is optimized for operational data access (get this user's orders, get this session). It is not built for analytical queries (how many orders were placed by users in California last month). If you need reporting, export your DynamoDB data to S3 and query it with Athena, or use a separate analytics database. Trying to do analytics directly on DynamoDB is painful and expensive.

---

## PostgreSQL with JSONB: The Third Path

Here is something worth knowing. PostgreSQL's JSONB support is genuinely good. If your data is mostly relational but you have a few tables with variable shape, you do not need to bring in MongoDB.

```sql
-- A users table where each user has flexible preferences
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  preferences JSONB DEFAULT '{}'
);

-- GIN index for efficient JSON querying
CREATE INDEX idx_users_preferences ON users USING GIN (preferences);

-- Query users who have dark mode enabled
SELECT id, email
FROM users
WHERE preferences @> '{"theme": "dark"}';

-- Update a specific JSON field without rewriting the whole document
UPDATE users
SET preferences = preferences || '{"notifications": true}'::jsonb
WHERE id = 42;
```

This lets you keep ACID transactions, SQL joins, and a single database while still handling variable-schema data. For many teams that think they need MongoDB, a `JSONB` column in PostgreSQL is enough.

---

## Migrating Between Databases

Sometimes you make the wrong choice. Here is the realistic picture of switching.

**PostgreSQL to MongoDB:** Moderate difficulty. You need to denormalize your relational data into documents. Your SQL queries become MQL aggregation pipelines. Transactions that span multiple tables need redesign. Expect a few months of work for a medium-sized application.

**MongoDB to PostgreSQL:** Also moderate, but often cleaner. You are moving from flexible schema to strict schema, which forces you to clean up data inconsistencies. Many teams find this improves data quality.

**PostgreSQL to DynamoDB:** Hard. You need to model every access pattern from scratch. Your schema changes fundamentally. Expect a significant rewrite. Most teams only do this when the scaling requirement is real and present, not theoretical.

**DynamoDB to PostgreSQL:** Also hard. DynamoDB's single-table pattern does not map to relational tables without a design process. But teams do this more often than the reverse when they realize DynamoDB's access pattern constraints do not fit their evolving product needs.

The key lesson: switching databases at scale is expensive. Choose more carefully upfront than you think you need to.

---

## The Short Answer

If you are building a new application in 2026 and you are not sure which database to use: **start with PostgreSQL**.

It handles relational data, has great JSON support for flexible schema requirements, runs reliably on any cloud, has enormous ecosystem support, and you will never be the engineer who explained to their manager why you chose the obscure database that nobody could hire for.

Use MongoDB when your data is genuinely document-shaped and your schema genuinely changes often. Not because migrations are annoying. Because the document model is a better fit for how you read the data.

Use DynamoDB when you are building serverless on AWS, you have done the access pattern design work, and you need the operational simplicity of a fully managed service that scales without you touching anything.

And when you get to the scale where one database is not enough, you will know. You will not have to guess.

---

## Related Reading

- [How OpenAI Scales PostgreSQL to 800 Million Users](/how-openai-scales-postgresql/) - practical scaling techniques for PostgreSQL
- [Database Indexing Explained](/database-indexing-explained/) - how indexes work under the hood
- [Database Locks Explained](/database-locks-explained/) - how each database handles locking and concurrency control
- [How Databases Store Data Internally](/how-databases-store-data-internally/) - pages, B-trees, and buffer pools
- [PostgreSQL Cheat Sheet](/postgresql-cheat-sheet/) - the commands you will use every day
- [MongoDB Cheat Sheet](/mongodb-cheat-sheet/) - mongosh commands, aggregation, and indexes
- [Caching Strategies Explained](/caching-strategies-explained/) - how to layer caching on top of any database
- [Hybrid Logical Clock](/distributed-systems/hybrid-clock/) - the timestamp scheme MongoDB uses for cluster time and causal consistency
- [System Design Cheat Sheet](/system-design-cheat-sheet/) - the bigger picture of how databases fit into system design
