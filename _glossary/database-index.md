---
title: "Database Index"
slug: "database-index"
also-known-as: ["Index", "B-tree Index"]
category: "database"
date: 2026-06-04
definition: "A database index is a separate data structure, usually a B-tree, that lets the database find rows by a column value without scanning the whole table. Like the index at the back of a book, it keeps keys in sorted order and points to the matching rows, turning an O(n) full scan into an O(log n) lookup. Indexes make reads fast at the cost of extra storage and slower writes, since every insert and update must also maintain the index."
key_takeaways:
  - "An index trades write speed and disk for read speed. Each one you add slows down INSERT, UPDATE, and DELETE."
  - "A clustered index sets the physical row order (one per table). Non-clustered indexes are separate trees of pointers (many per table)."
  - "Composite indexes follow the leftmost prefix rule: an index on (A, B, C) helps queries on A, or A and B, but not B alone."
  - "Index high-cardinality columns used in WHERE, JOIN, and ORDER BY. Skip small tables, low-cardinality columns, and write-heavy paths."
how_it_works:
  - "The index stores the key values in a balanced B-tree kept in sorted order."
  - "A lookup walks from the root down a few levels to the leaf holding the key, typically 3 to 4 disk reads even for a billion rows."
  - "The leaf points at the actual row, or contains it directly in the case of a clustered index."
  - "Run EXPLAIN or EXPLAIN ANALYZE to confirm the planner is choosing an index scan instead of a sequential scan."
real_world:
  - "PostgreSQL supports B-tree, hash, GIN, GiST, BRIN, partial, and covering (INCLUDE) indexes."
  - "MySQL InnoDB always makes the primary key the clustered index, with secondary indexes pointing back to it."
  - "Covering indexes answer a query entirely from the index, skipping the table lookup."
related_terms: ["lsm-tree", "query-planner", "write-ahead-log", "sharding"]
related_posts:
  - "/database-indexing-explained/"
  - "/how-databases-store-data-internally/"
  - "/postgresql-internals-how-queries-execute/"
---
