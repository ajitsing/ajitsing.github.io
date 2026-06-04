---
title: "Multi-Version Concurrency Control"
slug: "mvcc"
also-known-as: ["MVCC", "Snapshot Isolation"]
category: "database"
date: 2026-06-04
definition: "Multi-Version Concurrency Control, or MVCC, lets many transactions read and write the same data at once without blocking each other. Instead of overwriting a row in place, the database writes a new version of the row and keeps the old one around until no running transaction can still see it. Readers get a consistent snapshot from a point in time, writers add new versions, so readers never block writers and writers never block readers."
key_takeaways:
  - "MVCC trades storage for concurrency. Every UPDATE or DELETE leaves an old row version behind instead of overwriting it."
  - "Those old versions are dead tuples. They pile up as table bloat and must be reclaimed by [autovacuum](/glossary/autovacuum/)."
  - "Readers see a snapshot, so they never block writers. This is how MVCC gives you isolation without heavy [locking](/glossary/database-lock/)."
  - "MVCC is the engine behind snapshot isolation, one of the most common [ACID](/glossary/acid/) isolation levels."
how_it_works:
  - "Each row version is stamped with the transaction ids that created and deleted it."
  - "A transaction reads only the versions visible to its snapshot, ignoring newer or already-dead ones."
  - "An UPDATE writes a brand new version and marks the previous one as dead rather than editing in place."
  - "Once no active transaction can see a dead version, vacuum reclaims its space for reuse."
real_world:
  - "PostgreSQL keeps every row version inline and relies on autovacuum to clean dead tuples."
  - "MySQL InnoDB stores old versions in the undo log and purges them in the background."
  - "Oracle uses undo segments for the same read-consistent snapshots."
related_terms: ["autovacuum", "database-lock", "acid", "write-ahead-log"]
related_posts:
  - "/postgresql-mvcc-autovacuum/"
  - "/postgresql-internals-how-queries-execute/"
  - "/database-locks-explained/"
---
