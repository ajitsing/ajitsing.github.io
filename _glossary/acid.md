---
title: "ACID"
slug: "acid"
also-known-as: ["ACID Transactions", "ACID Properties"]
category: "database"
date: 2026-06-04
definition: "ACID is the set of four guarantees a database makes about a transaction: Atomicity (all of it happens or none of it does), Consistency (it moves the database from one valid state to another), Isolation (concurrent transactions do not step on each other), and Durability (once committed, it survives a crash). Together they let you treat a group of reads and writes as a single, reliable unit even under failures and concurrency."
key_takeaways:
  - "Atomicity is all or nothing. A transaction either commits in full or rolls back so it never half-applies."
  - "Isolation is the hard one. It is implemented with locks or [MVCC](/glossary/mvcc/), and the isolation level you pick trades concurrency against anomalies like dirty or phantom reads."
  - "Durability rests on the [write-ahead log](/glossary/write-ahead-log/): the change is on disk in the log before the commit is acknowledged."
  - "ACID is per database. Spanning a transaction across services needs heavier tools like [two-phase commit](/glossary/two-phase-commit/) or a saga."
how_it_works:
  - "The transaction begins and all its writes are tracked together."
  - "Durability is secured by flushing the change to the write-ahead log before the commit returns."
  - "Isolation is enforced with [locks](/glossary/database-lock/) or multi-version snapshots so concurrent transactions see a consistent view."
  - "On commit, the changes become visible atomically. On failure, the database rolls back so no partial work remains."
real_world:
  - "PostgreSQL, MySQL InnoDB, and SQL Server provide ACID transactions as their default behaviour."
  - "Financial, SaaS, and e-commerce systems pick relational databases mainly for these guarantees."
  - "Many NoSQL stores relax ACID for availability and speed, then add back limited transactions later (DynamoDB transactions, MongoDB multi-document transactions)."
related_terms: ["mvcc", "database-lock", "two-phase-commit", "write-ahead-log"]
related_posts:
  - "/how-databases-store-data-internally/"
  - "/postgresql-mvcc-autovacuum/"
  - "/postgresql-vs-mongodb-vs-dynamodb/"
---
