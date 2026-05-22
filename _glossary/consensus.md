---
title: "Consensus"
slug: "consensus"
also-known-as: ["Distributed Consensus", "Agreement Protocol"]
category: "distributed-systems"
date: 2026-05-22
definition: "Consensus is a way for a group of computers to agree on the same value, even if some of them are slow, crashed, or cut off from the network. It is the basis for things like leader election, replicated logs, and distributed locks. Without consensus, a cluster cannot behave like one reliable system."
key_takeaways:
  - "Consensus turns a group of unreliable machines into one reliable system."
  - "A correct algorithm has two jobs. It must never let two nodes agree on different values, and it should eventually reach a decision when the network is healthy."
  - "Most systems do not write their own consensus. They use [Paxos](/glossary/paxos/) or [Raft](/glossary/raft/) inside a small store like etcd or ZooKeeper."
  - "Consensus is slow because every decision needs a round trip to a [quorum](/glossary/quorum/). Use it for control plane work, not every write."
how_it_works:
  - "A node proposes a value, like the next entry in a [replicated log](/glossary/replicated-log/) or the name of the new leader."
  - "Other nodes vote on the proposal using the rules of Paxos, Raft, or a similar protocol."
  - "Once a majority quorum agrees, the value is locked in and cannot change."
  - "Slow or failed nodes catch up later by replaying the log of agreed decisions."
real_world:
  - "etcd, Consul, and CockroachDB use Raft to keep their replicas in sync."
  - "Google Chubby and Spanner use Paxos for locking and global transactions."
  - "ZooKeeper uses a Paxos-flavoured protocol called Zab to back HBase, Kafka, and many other systems."
related_terms: ["paxos", "raft", "quorum", "leader-election", "replicated-log"]
related_posts:
  - "/distributed-systems/paxos/"
  - "/distributed-systems/replicated-log/"
  - "/distributed-systems/majority-quorum/"
---
