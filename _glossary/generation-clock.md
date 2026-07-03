---
title: "Generation Clock"
slug: "generation-clock"
also-known-as: ["Term", "Epoch", "Leader Epoch"]
category: "distributed-systems"
date: 2026-07-03
definition: "A generation clock is a monotonically increasing number that goes up by one every time a cluster elects a new leader. Raft calls it a term, Kafka and ZooKeeper call it an epoch. The leader stamps every message and log entry with its current generation, and every node rejects anything stamped with an older number. This is what stops a revived old leader from corrupting state after a failover."
key_takeaways:
  - "It is the fix for zombie leaders. A leader that was partitioned away comes back carrying an old generation, and its writes are rejected."
  - "It is a [Lamport style logical clock](/glossary/lamport-clock/) scoped to leadership changes, not to every operation."
  - "One vote per generation is what stops two leaders from being elected at the same time and causing [split brain](/glossary/split-brain/)."
  - "A homegrown [leader election](/glossary/leader-election/) without a generation clock is a split brain bug waiting to happen."
how_it_works:
  - "Every node stores the highest generation it has ever seen."
  - "When a node starts an election it increments the generation, votes for itself, and asks others for votes."
  - "A node grants at most one vote per generation, so only one leader can win a given generation."
  - "The new leader tags all messages with the new generation. Receivers reject anything with a lower one, fencing out the old leader."
real_world:
  - "Raft uses the term number in etcd, Consul, and CockroachDB to order elections and reject stale leaders."
  - "Kafka uses the leader epoch per partition to fence out a broker that was leader before a failover."
  - "ZooKeeper's ZAB protocol uses an epoch number that increases with each new leader."
related_terms: ["leader-election", "fencing-token", "split-brain", "lease", "replicated-log", "lamport-clock"]
related_posts:
  - "/distributed-systems/leader-follower/"
  - "/distributed-systems/consistent-core/"
---
