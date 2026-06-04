---
title: "Database Lock"
slug: "database-lock"
also-known-as: ["Locking", "Row Lock", "Table Lock"]
category: "database"
date: 2026-06-04
definition: "A database lock is a control that stops concurrent transactions from corrupting each other's data. A shared lock lets many transactions read the same data at once; an exclusive lock gives one transaction sole access to write. Locks vary in granularity from a single row to a whole table, and they are the mechanism behind the Isolation in [ACID](/glossary/acid/). When two transactions wait on locks the other holds, you get a deadlock, which the database resolves by aborting one."
key_takeaways:
  - "Shared locks allow concurrent reads. Exclusive locks allow a single writer and block everyone else."
  - "Row-level locks give the best concurrency; table-level locks are cheaper but block far more work."
  - "Pessimistic locking grabs the lock upfront with SELECT FOR UPDATE; optimistic locking uses a version column and checks for conflicts at commit."
  - "[MVCC](/glossary/mvcc/) lets readers and writers avoid blocking each other, so you reach for explicit locks mainly under real write contention."
how_it_works:
  - "A transaction requests a lock on a row or table in shared or exclusive mode before it reads or writes."
  - "Compatible requests (two shared locks) proceed together; incompatible ones (shared vs exclusive) wait."
  - "The database detects a cycle of waiting transactions as a deadlock and aborts one to let the others continue."
  - "Locks are released at commit or rollback, so short transactions hold them for less time and hurt concurrency less."
real_world:
  - "SELECT ... FOR UPDATE is the standard way to lock rows for inventory and payment flows."
  - "SELECT ... FOR UPDATE SKIP LOCKED turns a plain table into a simple job queue."
  - "PostgreSQL and MySQL InnoDB both combine MVCC for reads with row locks for writes."
related_terms: ["mvcc", "acid", "two-phase-commit", "autovacuum"]
related_posts:
  - "/database-locks-explained/"
  - "/postgresql-mvcc-autovacuum/"
---
