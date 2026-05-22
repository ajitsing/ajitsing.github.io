---
title: "Leader Election"
slug: "leader-election"
also-known-as: ["Master Election", "Coordinator Election"]
category: "distributed-systems"
date: 2026-05-22
definition: "Leader election is how a group of nodes picks one node to coordinate writes, order operations, or own a shard. The winner stays leader for some time. If it dies or stops sending [heartbeats](/glossary/heartbeat/), the rest of the group runs another election to pick a new one."
key_takeaways:
  - "A single leader makes coordination simple. Clients have one place to send writes and ordering happens in one place."
  - "Most leader elections are built on top of [consensus](/glossary/consensus/) like [Paxos](/glossary/paxos/) or [Raft](/glossary/raft/), or on [leases](/glossary/lease/) backed by a strongly consistent store."
  - "Without [fencing tokens](/glossary/fencing-token/), an old leader that wakes up after a pause can keep writing. That is one cause of [split brain](/glossary/split-brain/)."
  - "Failover time is set by the lease TTL or election timeout, not by how fast the new leader can boot."
how_it_works:
  - "Each candidate tries to claim the leader slot in some shared place, like a Raft term vote, a ZooKeeper ephemeral znode, or an etcd lease key."
  - "The shared place makes sure only one candidate can hold the slot at a time."
  - "The winner publishes itself as leader, takes a fencing token, and starts sending heartbeats to keep the lease alive."
  - "If heartbeats stop or the lease expires, the other nodes start a new election with a higher token."
real_world:
  - "Kubernetes uses a Lease object to elect the active controller manager and scheduler."
  - "Kafka's controller is elected through ZooKeeper or KRaft and decides who owns each partition."
  - "etcd, Consul, and Vault all expose a leader election helper that wraps lease and watch primitives."
related_terms: ["consensus", "raft", "lease", "fencing-token", "split-brain"]
related_posts:
  - "/distributed-systems/replicated-log/"
  - "/distributed-systems/lease/"
  - "/distributed-systems/heartbeat/"
---
