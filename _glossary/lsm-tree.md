---
title: "LSM Tree"
slug: "lsm-tree"
also-known-as: ["Log-Structured Merge Tree", "LSM"]
category: "database"
date: 2026-06-04
definition: "A log-structured merge tree, or LSM tree, is a storage structure built for write-heavy workloads. New writes go into an in-memory table (the memtable) and an append-only log, then get flushed to disk as immutable sorted files (SSTables). Background compaction merges those files and drops deleted or superseded keys. By turning random writes into fast sequential ones, LSM trees beat the [B-tree index](/glossary/database-index/) on write throughput, at the cost of slower and more variable reads."
key_takeaways:
  - "LSM trees optimise for writes by buffering in memory and writing immutable sorted files sequentially to disk."
  - "Reads may have to check the memtable plus several SSTables, so they use bloom filters and compaction to stay fast."
  - "Compaction is the background merge that reclaims space and keeps read amplification in check; it is also the main source of LSM write amplification."
  - "B-trees favour reads and in-place updates; LSM trees favour high write throughput. Many modern stores pick LSM for that reason."
how_it_works:
  - "A write lands in the in-memory memtable and is appended to a [write-ahead log](/glossary/write-ahead-log/) for durability."
  - "When the memtable fills, it is flushed to disk as an immutable sorted file called an SSTable."
  - "Reads check the memtable first, then SSTables newest to oldest, using bloom filters to skip files that cannot contain the key."
  - "Compaction periodically merges SSTables, discarding overwritten and deleted keys to bound read cost and reclaim space."
real_world:
  - "RocksDB and LevelDB are the canonical LSM engines, embedded in many larger systems."
  - "Cassandra and ScyllaDB store data as memtables plus SSTables with compaction."
  - "Bigtable, HBase, and the storage layer under CockroachDB and TiKV are LSM based."
related_terms: ["database-index", "write-ahead-log", "query-planner"]
related_posts:
  - "/how-databases-store-data-internally/"
  - "/database-indexing-explained/"
---
