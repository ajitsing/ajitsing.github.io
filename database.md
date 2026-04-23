---
layout: hub
title: "Database Engineering"
meta-title: "Database Engineering Patterns: Indexing, Sharding & Internals Guide"
subtitle: "PostgreSQL, MongoDB, Redis, and database internals"
seo: true
description: "Database engineering patterns and internals: PostgreSQL, MongoDB, Redis, DynamoDB, B-tree and LSM indexing, sharding, locking, isolation levels, query optimization and SQL vs NoSQL tradeoffs."
keywords: "database engineering, database design patterns, database internals, database indexing, database sharding, database locks, isolation levels, ACID, BASE, SQL vs NoSQL, PostgreSQL guide, MongoDB tutorial, Redis vs DragonflyDB, how databases store data, B-tree, LSM tree, query optimization, database cheat sheet, PostgreSQL cheat sheet, MongoDB cheat sheet, OLTP vs OLAP, replication, write-ahead log, MVCC, database connection pool, schema design"
thumbnail: /assets/img/ajit-singh-blog-og.png
share-img: /assets/img/ajit-singh-blog-og.png
permalink: /database/
social-share: true
hub-icon: "fas fa-database"
hub-category: "database"
hub-intro: "From B-tree internals to PostgreSQL vs MongoDB comparisons, these guides explain how databases actually work under the hood. Covers indexing strategies, locking mechanisms, storage engines, and practical cheat sheets for the databases you use every day."
hub-topics:
  - "Database Internals"
  - "PostgreSQL"
  - "MongoDB"
  - "Redis"
  - "Database Indexing"
  - "Database Locks"
  - "Query Optimization"
also-known-as:
  - "Database Design Patterns"
  - "Database Engineering Patterns"
  - "Database Internals"
  - "Database Architecture"
definition: "Database engineering is the discipline of choosing, designing and tuning the storage layer of an application: picking SQL or NoSQL, designing schemas, building the right indexes (B-tree, hash, GIN, LSM), tuning isolation levels and locks, sharding for scale, and reasoning about replication, consistency and failover. The same patterns appear in PostgreSQL, MySQL, MongoDB, Redis, Cassandra and DynamoDB."
faq:
  - question: "What is the difference between SQL and NoSQL databases?"
    answer: "SQL databases (PostgreSQL, MySQL) store rows in fixed schemas, support multi-row ACID transactions, and use SQL with joins. NoSQL is an umbrella for document stores (MongoDB), key-value stores (Redis, DynamoDB), wide-column stores (Cassandra), and graph databases (Neo4j). NoSQL trades joins and strict schemas for horizontal scalability, flexible documents, or specialized access patterns."
  - question: "How do database indexes work?"
    answer: "An index is a separate data structure that maps column values to row locations so the database can find rows without scanning the whole table. B-tree indexes (the default) keep keys sorted and support equality and range queries in O(log n). Hash indexes support only equality lookups but in O(1). LSM trees (used by Cassandra, RocksDB) optimize writes by buffering in memory and flushing sorted files to disk."
  - question: "What are database isolation levels?"
    answer: "Isolation levels define what concurrent transactions can see of each other. Read Uncommitted allows dirty reads; Read Committed blocks dirty reads; Repeatable Read blocks non-repeatable reads; Serializable blocks phantom reads and behaves as if transactions ran one at a time. PostgreSQL defaults to Read Committed, MySQL InnoDB defaults to Repeatable Read, and most distributed databases offer Snapshot Isolation."
  - question: "When should I shard a database?"
    answer: "Shard when a single primary node cannot handle the write throughput, when the dataset is too large to fit on one disk, or when you need data residency in specific regions. Before sharding, exhaust simpler options: read replicas, vertical scaling, partitioning within a single node, archiving cold data, and a cache. Sharding adds operational complexity around resharding, cross-shard queries, and distributed transactions."
  - question: "PostgreSQL vs MongoDB: which should I use?"
    answer: "Use PostgreSQL when you need joins, multi-row ACID transactions, a strict schema, rich SQL, and proven OLTP performance. Use MongoDB when your data is naturally hierarchical (documents), the schema evolves often, you need horizontal sharding out of the box, or your access pattern is dominated by single-document reads and writes. Modern PostgreSQL also supports JSONB, narrowing the gap considerably."
  - question: "What is a write-ahead log in a database?"
    answer: "A write-ahead log (WAL) is an append-only log that records every change before it is applied to the data files. On crash, the database replays the WAL to recover committed transactions and roll back incomplete ones. PostgreSQL, MySQL InnoDB (redo log), and SQLite all use WAL, and replication is typically built by streaming the WAL to followers."
definitions:
  - term: "B-tree Index"
    definition: "A self-balancing tree structure that keeps keys sorted on disk pages, providing O(log n) lookups and supporting both equality and range queries; the default index in most relational databases."
  - term: "LSM Tree"
    definition: "Log-Structured Merge tree, a write-optimized index that buffers writes in memory and periodically flushes sorted runs to disk; used by Cassandra, RocksDB, and LevelDB."
  - term: "ACID"
    definition: "Atomicity, Consistency, Isolation, Durability: the four guarantees that classical relational transactions provide."
  - term: "MVCC"
    definition: "Multi-Version Concurrency Control: a technique where writers create new versions of rows so readers never block writers; used by PostgreSQL, Oracle, and MySQL InnoDB."
  - term: "Sharding"
    definition: "Horizontal partitioning of a dataset across multiple database nodes by a shard key (hash, range, or directory based)."
  - term: "Replication"
    definition: "Copying data from a primary node to one or more replicas for read scaling and failover; can be synchronous, semi-synchronous, or asynchronous."
  - term: "Isolation Level"
    definition: "A configurable guarantee about what concurrent transactions can observe; ranges from Read Uncommitted to Serializable."
  - term: "Write-Ahead Log"
    definition: "An append-only log that records every change before it is applied to data files, used for crash recovery and replication."
  - term: "Connection Pool"
    definition: "A cache of pre-established database connections that application threads borrow and return, avoiding the cost of opening a new TCP and TLS handshake per query."
  - term: "OLTP vs OLAP"
    definition: "OLTP is transactional workload (many small reads and writes, low latency); OLAP is analytical workload (few large scans and aggregations over historical data)."
last-modified-date: 2026-04-22
sitemap:
  priority: 0.8
  changefreq: weekly
---
