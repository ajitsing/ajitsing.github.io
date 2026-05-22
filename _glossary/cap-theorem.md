---
title: "CAP Theorem"
slug: "cap-theorem"
also-known-as: ["Brewer's Theorem"]
category: "distributed-systems"
date: 2026-05-22
definition: "The CAP theorem says a distributed data store can only give you two out of three of these during a network partition. Consistency means every read sees the latest write. Availability means every request gets a reply. Partition tolerance means the system keeps working when messages are dropped. Real networks always partition at some point, so the real choice is between CP and AP."
key_takeaways:
  - "Partitions are not optional. CAP really forces a choice between consistency and availability while a partition is happening."
  - "CP systems like HBase, etcd, ZooKeeper, and MongoDB with majority writes will refuse writes they cannot safely replicate."
  - "AP systems like Cassandra, Dynamo, and Riak will keep accepting writes that may diverge and reconcile them later."
  - "PACELC adds more detail. When there is no partition, the trade off is between latency and consistency."
how_it_works:
  - "Imagine two replicas split by a network failure. A client writes to replica A. Replica B cannot see the write."
  - "If you want consistency, replica B has to refuse or delay reads. That gives up availability."
  - "If you want availability, replica B has to serve a stale read. That gives up consistency."
  - "There is no way to satisfy both during the partition. CAP is a statement about that one moment in time."
real_world:
  - "DynamoDB and Cassandra default to AP. They favor availability and accept eventual consistency."
  - "Spanner and CockroachDB lean CP. They will refuse to commit during partitions to keep reads consistent."
  - "MongoDB lets you tune per write. Majority writes plus linearizable reads is CP leaning. w:1 with secondaryPreferred reads is AP leaning."
related_terms: ["consensus", "quorum", "eventual-consistency", "split-brain"]
related_posts:
  - "/distributed-systems/majority-quorum/"
---
