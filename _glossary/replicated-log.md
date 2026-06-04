---
title: "Replicated Log"
slug: "replicated-log"
also-known-as: ["Distributed Log", "Append Only Log"]
category: "distributed-systems"
date: 2026-05-22
definition: "A replicated log is a list of operations that is kept in the same order on many machines using a [consensus](/glossary/consensus/) protocol. Every node applies the entries in the same order, so all the replicas end up with the same state. This is the main idea behind Raft, Multi Paxos, Kafka, and most fault tolerant systems."
key_takeaways:
  - "If two nodes apply the same log entries in the same order, they end up with the same state."
  - "Consensus algorithms exist mainly to agree on what the next log entry is."
  - "A replicated log is the cleanest way to combine durability, ordering, and replication into one primitive."
  - "Once you have a replicated log, you can build databases, queues, lock services, and event streams on top of it without solving consensus again."
how_it_works:
  - "A leader takes a client command and appends it to its local log."
  - "It copies the entry to followers using a consensus protocol like Raft or Multi Paxos."
  - "Once a majority [quorum](/glossary/quorum/) has stored the entry, the leader marks it committed and moves the [high watermark](/glossary/high-watermark/)."
  - "Each replica applies committed entries in order to its state machine. Same input plus same order gives same state."
real_world:
  - "etcd's raft log is a replicated log. The boltdb store on each node is a state machine that gets built from it."
  - "Kafka exposes its log directly as the API. Every topic partition is a replicated log."
  - "CockroachDB and TiKV run thousands of small Raft groups, each one managing one replicated log per data range."
related_terms: ["consensus", "raft", "paxos", "high-watermark", "quorum", "write-ahead-log", "idempotent-receiver"]
related_posts:
  - "/distributed-systems/replicated-log/"
  - "/distributed-systems/high-watermark/"
  - "/distributed-systems/paxos/"
---
