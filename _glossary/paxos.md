---
title: "Paxos"
slug: "paxos"
also-known-as: ["Lamport's Paxos", "Classic Paxos"]
category: "distributed-systems"
date: 2026-05-22
definition: "Paxos is a family of algorithms by Leslie Lamport that lets a group of nodes agree on a single value, even if some of them crash or messages get lost. It uses two rounds of voting and needs a majority to make a decision. It sits under almost every strongly consistent distributed system."
key_takeaways:
  - "Paxos has a strong proof of correctness. Once a value is chosen, it stays chosen, even after crashes and network splits."
  - "Each round runs in two phases. Prepare locks a ballot number, and Accept commits a value. A majority must vote yes for the round to succeed."
  - "Plain Paxos picks one value. Multi-Paxos chains rounds together so the same leader can commit a long stream of decisions cheaply."
  - "Paxos is hard to implement well. [Raft](/glossary/raft/) was designed later as an easier option that solves the same problem."
how_it_works:
  - "A proposer picks a unique ballot number that is bigger than any it has used before, and sends a Prepare message to the acceptors."
  - "Acceptors promise not to accept any older ballot, and reply with the latest value they have already accepted, if any."
  - "If a majority replies, the proposer sends an Accept message with either its own value or the latest value it heard about."
  - "Acceptors that have not made a higher promise accept the value. Once a majority accepts, the value is decided."
real_world:
  - "Google Chubby and Spanner use Paxos variants to keep their state in sync across machines."
  - "Apache Cassandra runs a Paxos round on top of its storage layer for lightweight transactions."
  - "ZooKeeper's Zab protocol is a Paxos-style atomic broadcast tuned for primary backup replication."
related_terms: ["consensus", "raft", "quorum", "replicated-log", "leader-election"]
related_posts:
  - "/distributed-systems/paxos/"
  - "/distributed-systems/replicated-log/"
  - "/distributed-systems/majority-quorum/"
---
