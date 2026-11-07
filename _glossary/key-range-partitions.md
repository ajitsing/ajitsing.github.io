---
title: "Key Range Partitions"
slug: "key-range-partitions"
also-known-as: ["Range Partitioning", "Range Sharding", "Key-Range Partitions"]
category: "distributed-systems"
date: 2026-11-06
definition: "Key range partitions divide a sorted keyspace into contiguous chunks and store each chunk on a node. Keys that sort next to each other live together, so a query for a span of keys contacts only the chunks that overlap that span. The number of chunks changes over time: a chunk splits when it grows too large or too busy, and small neighbors can merge. Sequential keys such as timestamps pile up on the last chunk, which is the pattern's classic hotspot."
key_takeaways:
  - "Neighboring keys share a node, so range scans and prefix scans stay on a few partitions."
  - "A key is found by binary search over a sorted list of range boundaries, then a lookup of which node owns that range."
  - "Ranges split and merge. The partition count is not fixed up front the way it is with [fixed partitions](/glossary/fixed-partitions/)."
  - "A timestamp or auto increment id writes only to the newest range. Splitting that range moves the hotspot. A high cardinality prefix, or a hash of the leading column, spreads it."
how_it_works:
  - "Keep keys in sorted order and cut the line into half open spans such as [a, f), [f, n), and [n, z)."
  - "Store a sorted directory of those boundaries, usually in a [consistent core](/glossary/consistent-core/) or in meta ranges, and cache it on each client."
  - "When a range crosses a size or load limit, pick a split key and replace it with two smaller ranges. Move one of them if the node is still busy."
  - "In CockroachDB, TiKV, and YugabyteDB each range is its own Raft group, so a hot range is a hot leader until it is split and one half moves."
real_world:
  - "Google Bigtable tablets, HBase regions, and Cloud Spanner splits are key ranges of the row or primary key."
  - "CockroachDB ranges default to a split around 512 MiB. TiKV regions are the same idea under TiDB."
  - "YugabyteDB defaults to ranges of a hash, and uses ranges of the raw key only when you ask for ASC or DESC sharding."
related_terms: ["sharding", "fixed-partitions", "consistent-hashing", "lsm-tree", "consistent-core", "lease", "write-ahead-log"]
related_posts:
  - "/distributed-systems/key-range-partitions/"
  - "/distributed-systems/fixed-partitions/"
  - "/consistent-hashing-explained/"
  - "/how-google-ads-scales-with-spanner/"
  - "/wide-column-stores-explained/"
  - "/distributed-systems/consistent-core/"
---
