---
title: "Fixed Partitions"
slug: "fixed-partitions"
also-known-as: ["Logical Partitions", "Fixed Partitioning", "Hash Slots"]
category: "distributed-systems"
date: 2026-08-31
definition: "Fixed Partitions is a data partitioning pattern that keeps the number of partitions constant for the life of the cluster. Keys map to a fixed set of logical partitions with a hash, and those partitions are then assigned to physical nodes through a separate mapping. When nodes join or leave, whole partitions move between nodes but keys never rehash, so cluster resizing moves only a small slice of data instead of almost everything."
key_takeaways:
  - "Mapping keys straight to nodes with hash(key) % nodeCount remaps almost all data whenever the node count changes."
  - "Fixed Partitions adds a stable middle layer: keys map to a fixed number of partitions, and partitions map to nodes."
  - "Because the partition count never changes, only whole partitions move on a resize, not individual keys."
  - "Pick a partition count much larger than your expected node count up front, because changing it later is expensive."
how_it_works:
  - "At cluster creation, fix the number of partitions (for example 1024 or Redis Cluster's 16384 slots)."
  - "Locate a key with partition = hash(key) % partitionCount, a mapping that never changes."
  - "Keep a separate partition-to-node assignment table, usually in a [consistent core](/glossary/consistent-core/) like ZooKeeper or etcd."
  - "When a node is added or removed, reassign some partitions to it and move only those partitions' data."
related_terms: ["sharding", "consistent-hashing", "consistent-core", "replicated-log", "quorum"]
related_posts:
  - "/distributed-systems/fixed-partitions/"
  - "/consistent-hashing-explained/"
  - "/distributed-systems/consistent-core/"
  - "/distributed-systems/how-kafka-works/"
---
