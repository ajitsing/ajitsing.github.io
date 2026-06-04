---
title: "Sharding"
slug: "sharding"
also-known-as: ["Horizontal Partitioning", "Data Partitioning"]
category: "database"
date: 2026-06-04
definition: "Sharding is splitting one logical database across many machines by row, so each shard holds a subset of the data. A shard key decides which shard a row lives on. It lets a dataset and its write load grow past what a single server can hold, but it gives up easy cross-shard joins and single-node transactions, and a bad shard key creates hot spots that defeat the whole point."
key_takeaways:
  - "Sharding is horizontal scaling for data: split rows across nodes instead of buying a bigger server."
  - "The shard key is the most important design choice. A skewed key creates hot shards; a good key spreads load evenly."
  - "Range sharding keeps neighbours together but risks hot ranges; hash sharding spreads load but loses range scans. [Consistent hashing](/consistent-hashing-explained/) limits reshuffling when nodes change."
  - "Cross-shard joins and transactions are hard, which is why a clean shard key that keeps related data together matters so much."
how_it_works:
  - "Pick a shard key and a strategy: by range, by hash of the key, or by an explicit directory."
  - "A router maps each row's shard key to the shard that owns it."
  - "Reads and writes for a key go straight to its shard; queries that span shards must scatter and gather."
  - "Rebalancing moves data between shards as nodes are added or removed, ideally moving as little as possible."
real_world:
  - "MongoDB shards collections by a shard key; DynamoDB partitions by the partition key under the hood."
  - "Vitess shards MySQL behind a routing layer, the approach YouTube and many others use."
  - "Google Spanner splits data into splits across servers for global, horizontally scaled SQL."
related_terms: ["database-index", "quorum", "cap-theorem", "consensus"]
related_posts:
  - "/postgresql-vs-mongodb-vs-dynamodb/"
  - "/consistent-hashing-explained/"
  - "/how-google-ads-scales-with-spanner/"
---
