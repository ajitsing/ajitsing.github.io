---
title: "Wide Column Store"
slug: "wide-column-store"
also-known-as: ["Column-Family Store", "Wide Column Database"]
category: "database"
date: 2026-07-28
definition: "A wide column store is a NoSQL database that groups rows into partitions, where each row can hold a different and varying set of columns. A partition key is hashed to decide which node stores the data, and a clustering key sorts rows within a partition on disk. Built on an [LSM tree](/glossary/lsm-tree/), it delivers very high write throughput and linear horizontal scaling, at the cost of joins, ad hoc queries, and multi-partition transactions. It is not the same as a columnar analytics database."
key_takeaways:
  - "Wide column means flexible, sparse columns per row grouped into partitions. It is not a columnar OLAP store like ClickHouse."
  - "The partition key places data on a node via consistent hashing; the clustering key sets the on-disk sort order inside a partition."
  - "You model tables around queries and denormalize, because joins do not exist."
  - "Writes are cheap thanks to the LSM tree; reads rely on bloom filters and compaction, and deletes leave tombstones."
how_it_works:
  - "A write is appended to the commit log and added to an in-memory memtable, then acknowledged."
  - "A full memtable is flushed to disk as an immutable sorted SSTable; compaction later merges SSTables and drops stale data."
  - "The partition key hash maps onto a ring (Cassandra, ScyllaDB) or a tablet assignment (Bigtable, HBase) to pick the owning node."
  - "Consistency is tunable per query, letting you trade latency and availability against how many replicas must agree."
real_world:
  - "Netflix stores viewing history in Cassandra; Discord keeps trillions of messages in ScyllaDB."
  - "Google Bigtable backs Search indexing, Analytics, and Maps."
  - "Apache HBase powers wide column workloads in the Hadoop ecosystem."
related_terms: ["lsm-tree", "consistent-hashing", "eventual-consistency", "sharding", "quorum", "cap-theorem", "database-index", "columnar-database"]
related_posts:
  - "/wide-column-stores-explained/"
  - "/postgresql-vs-mongodb-vs-dynamodb/"
  - "/how-databases-store-data-internally/"
  - "/consistent-hashing-explained/"
  - "/columnar-databases-explained/"
---
