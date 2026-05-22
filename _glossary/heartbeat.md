---
title: "Heartbeat"
slug: "heartbeat"
also-known-as: ["Liveness Probe", "Keep Alive"]
category: "distributed-systems"
date: 2026-05-22
definition: "A heartbeat is a small message a node sends every so often to say it is still alive. If the heartbeats stop, other nodes assume it has failed and react by expiring leases, picking a new leader, or moving traffic away. Heartbeats are the simplest way to turn the idea of liveness into something a system can act on."
key_takeaways:
  - "Heartbeats are the cheapest way to ask if a node is still alive without coordinating with anyone else."
  - "The heartbeat interval and the timeout decide how fast you recover. Shorter is faster but noisier and more error prone on a slow network."
  - "Heartbeats power [lease](/glossary/lease/) renewal, the steady state in [Raft](/glossary/raft/), gossip style failure detection, and load balancer health checks."
  - "Heartbeats can lie. A node can keep sending them while making no real progress. If correctness matters, also check that work is moving forward."
how_it_works:
  - "Each node sends a small message every 100ms to a few seconds to its peers, a coordinator, or a control plane."
  - "Each receiver tracks the last heartbeat time per peer."
  - "If the gap goes over the timeout, usually 3 to 10 times the interval, the peer is marked suspect or dead."
  - "Other things kick in next, like lease expiry, failover, leader election, or rebalancing."
real_world:
  - "Kubernetes kubelets renew node heartbeats through the Lease API to prove the node is alive."
  - "Raft leaders send AppendEntries heartbeats to stop followers from starting new elections."
  - "Cassandra and DynamoDB use gossip heartbeats so every node has an eventually consistent view of who is in the cluster."
related_terms: ["lease", "ttl", "leader-election", "gossip-protocol", "fencing-token"]
related_posts:
  - "/distributed-systems/heartbeat/"
  - "/distributed-systems/lease/"
---
