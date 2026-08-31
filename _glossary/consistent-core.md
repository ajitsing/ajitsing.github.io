---
title: "Consistent Core"
slug: "consistent-core"
also-known-as: ["Coordination Service", "Metadata Quorum", "Control Plane Store"]
category: "distributed-systems"
date: 2026-07-03
definition: "A consistent core is a small cluster, usually 3 to 5 nodes, that provides [linearizable](/glossary/linearizability/) consistency and fault tolerance using a [consensus](/glossary/consensus/) protocol. A much larger data cluster offloads the decisions that must be exactly right, like [leader election](/glossary/leader-election/), group membership, configuration, and [locks and leases](/glossary/lease/), to this core, so the data cluster can scale without running expensive quorum algorithms on every request."
key_takeaways:
  - "It solves the problem that [consensus](/glossary/consensus/) throughput drops as a cluster grows. Keep consensus on a small fixed group and let everything else scale."
  - "The core stores metadata, not data. Leaders, membership, config, locks, and leases live there. Bulk application data does not."
  - "Clients use it through sessions with [heartbeats](/glossary/heartbeat/), ephemeral keys that vanish when a session dies, and watches that push change notifications."
  - "This is the control plane versus data plane split. The core is the control plane, the large cluster is the data plane."
how_it_works:
  - "The core runs [Raft](/glossary/raft/), [Paxos](/glossary/paxos/), or ZAB over a [replicated log](/glossary/replicated-log/) on a small odd number of nodes."
  - "One leader accepts writes and commits them only after a majority [quorum](/glossary/quorum/) stores them, which keeps the metadata linearizable."
  - "Data nodes open sessions and read or write small pieces of metadata, such as which node owns a partition."
  - "Correctness at the edge still needs a [fencing token](/glossary/fencing-token/) so a paused old leader cannot act on stale authority."
real_world:
  - "ZooKeeper and etcd are consistent cores. Kafka, HBase, and Solr have used ZooKeeper for coordination."
  - "Kubernetes stores all cluster state in etcd while worker nodes scale independently as the data plane."
  - "TiKV and CockroachDB keep range metadata in a Raft based core while data ranges scale out."
related_terms: ["consensus", "quorum", "leader-election", "lease", "replicated-log", "linearizability", "emergent-leader", "fixed-partitions"]
related_posts:
  - "/distributed-systems/consistent-core/"
  - "/distributed-systems/lease/"
  - "/distributed-systems/leader-follower/"
  - "/distributed-systems/emergent-leader/"
---
