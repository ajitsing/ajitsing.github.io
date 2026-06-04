---
title: "Lamport Clock"
slug: "lamport-clock"
also-known-as: ["Lamport Timestamp", "Logical Clock"]
category: "distributed-systems"
date: 2026-06-04
definition: "A Lamport clock is a single integer counter kept on every node to order events without a shared wall clock. Every event bumps the counter by one, every outgoing message carries it, and on receive a node sets its counter to `max(local, received) + 1`. This guarantees that if event A causally happened before event B then `LC(A) < LC(B)`, even when the physical clocks are skewed. It is the building block behind vector clocks, the [hybrid logical clock](/glossary/hybrid-logical-clock/), and most log sequence numbers."
key_takeaways:
  - "A Lamport clock is a per node counter that ticks on every local event, send, and receive, capturing the happens-before relation without synchronized wall clocks."
  - "The receive rule is the whole pattern: `local = max(local, received) + 1`."
  - "Lamport clocks give a partial order. Append the node id and break ties to get a total order."
  - "A Lamport timestamp says nothing about real time, and it cannot tell whether two events are concurrent. Vector clocks are needed for that."
  - "Cassandra last-write-wins timestamps, Kafka producer epochs, Raft terms, and Paxos ballot numbers are all Lamport descendants."
how_it_works:
  - "Each node keeps one integer counter, starting at zero."
  - "Before any local event or sending a message, the node increments its counter by one."
  - "Every outgoing message is stamped with the sender's current counter."
  - "On receiving a message, the node sets its counter to the max of its local value and the received value, then adds one."
  - "To turn the partial order into a total order, compare counters first and break ties with the node id."
real_world:
  - "Cassandra uses Lamport style timestamps for last-write-wins conflict resolution on every column."
  - "Kafka uses a producer epoch number to fence out zombie producers after a restart."
  - "[Raft](/glossary/raft/) term numbers and [Paxos](/glossary/paxos/) ballot ids follow the same monotonic, max-on-receive rule."
related_terms: ["hybrid-logical-clock", "consensus", "replicated-log", "write-ahead-log"]
related_posts:
  - "/distributed-systems/lamport-clock/"
  - "/distributed-systems/hybrid-clock/"
  - "/distributed-systems/replicated-log/"
---
