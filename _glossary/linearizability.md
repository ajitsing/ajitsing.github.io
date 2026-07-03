---
title: "Linearizability"
slug: "linearizability"
also-known-as: ["Strong Consistency", "Atomic Consistency", "External Consistency"]
category: "distributed-systems"
date: 2026-07-03
definition: "Linearizability is the strongest single object consistency guarantee. Every operation appears to take effect instantly at some single point between when it was called and when it returned. Once a write completes, every later read sees that value or a newer one, and everyone agrees on the same order of events, so the system behaves as if there is just one copy of the data."
key_takeaways:
  - "Linearizability makes a distributed system behave like a single machine. There is one order of operations that everyone agrees on."
  - "A read is guaranteed to see the most recent completed write. There is no window where a client reads stale data."
  - "It is not free. Reads and writes usually go through a leader and a [quorum](/glossary/quorum/), which costs latency and caps throughput."
  - "It is stronger than [eventual consistency](/glossary/eventual-consistency/), which only promises replicas converge later. Use linearizability for metadata and coordination, eventual consistency for scale."
how_it_works:
  - "Writes go through a [consensus](/glossary/consensus/) protocol so a majority [quorum](/glossary/quorum/) agrees on the order before a write is committed."
  - "Reads are served in a way that reflects all committed writes, for example by routing through the current leader."
  - "To stay correct, the leader confirms it is still the leader, using a lease or a quorum check, before answering a read so a stale leader cannot serve old data."
  - "The result is that the whole cluster looks like one register that applies operations one at a time in real time order."
real_world:
  - "etcd serves linearizable reads by default so Kubernetes always sees the latest cluster state."
  - "A [consistent core](/glossary/consistent-core/) like ZooKeeper provides linearizable operations that larger data clusters rely on for coordination."
  - "Google Spanner offers external consistency, a form of linearizability across the globe, using TrueTime and Paxos."
related_terms: ["consensus", "quorum", "replicated-log", "eventual-consistency", "cap-theorem", "consistent-core"]
related_posts:
  - "/distributed-systems/consistent-core/"
  - "/distributed-systems/majority-quorum/"
  - "/distributed-systems/replicated-log/"
---
