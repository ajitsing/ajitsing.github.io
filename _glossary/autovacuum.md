---
title: "Autovacuum"
slug: "autovacuum"
also-known-as: ["Vacuum", "Dead Tuple Cleanup"]
category: "database"
date: 2026-06-04
definition: "Autovacuum is the background process in PostgreSQL that cleans up the dead row versions left behind by [MVCC](/glossary/mvcc/). Because Postgres never overwrites a row on UPDATE or DELETE, old versions accumulate as dead tuples and cause table bloat. Autovacuum periodically scans tables, marks dead tuple space as reusable, and updates the statistics the [query planner](/glossary/query-planner/) depends on, all without locking the table."
key_takeaways:
  - "Autovacuum exists because MVCC leaves dead tuples behind. Without it, tables bloat, disk fills, and scans slow down."
  - "Plain VACUUM frees space for reuse inside the table but does not return it to the OS. Only VACUUM FULL does, and it locks the table."
  - "It is triggered by a per-table threshold based on row count, and the defaults are often too lazy for large, write-heavy tables."
  - "Long-running transactions, abandoned replication slots, and stuck prepared transactions block it from reclaiming dead tuples."
how_it_works:
  - "Autovacuum wakes up and checks each table's dead tuple count against a threshold derived from autovacuum_vacuum_scale_factor."
  - "When the threshold is crossed, it scans the table and marks dead tuple space as free for future inserts and updates."
  - "It also runs ANALYZE to refresh the planner statistics in pg_statistic."
  - "Cost-based delays keep it from saturating disk, which is why heavy tables often need tuned cost limits."
real_world:
  - "Tuning autovacuum_vacuum_scale_factor and autovacuum_vacuum_cost_limit per table is standard practice on busy Postgres clusters."
  - "Tools like pg_repack reclaim bloat without the exclusive lock that VACUUM FULL takes."
  - "Monitoring dead tuple counts and last_autovacuum is a common production health check."
related_terms: ["mvcc", "database-lock", "query-planner", "write-ahead-log"]
related_posts:
  - "/postgresql-mvcc-autovacuum/"
  - "/postgresql-internals-how-queries-execute/"
---
