---
title: "Quorum"
slug: "quorum"
also-known-as: ["Majority Quorum", "Voting Quorum"]
category: "distributed-systems"
date: 2026-05-22
definition: "A quorum is the smallest group of nodes that has to agree before a distributed operation counts as done. The most common rule is the majority quorum, N/2 + 1. It works because any two majorities share at least one node, and that shared node is what keeps the system consistent when others fail."
key_takeaways:
  - "Majority quorum guarantees overlap. In a five node cluster, any group of three shares at least one node with any other group of three."
  - "A quorum based system can lose up to N/2 minus 1 nodes at the same time and still stay safe."
  - "Read and write quorums can be different sizes. As long as R plus W is greater than N, every read sees the latest committed write."
  - "Quorum is the budget Paxos, Raft, Dynamo style replication, and ZooKeeper all spend on fault tolerance."
how_it_works:
  - "An operation is sent to all N replicas in a group."
  - "Each replica handles the operation and sends an acknowledgement back."
  - "Once the coordinator collects acknowledgements from a quorum, the operation is committed."
  - "Slow or failed replicas catch up later through repair, log replay, or hinted handoff."
real_world:
  - "Cassandra and DynamoDB let you pick the read and write quorum per query, like ONE, QUORUM, or ALL."
  - "Raft and Paxos commit log entries only after a majority quorum has stored them."
  - "Kafka's in-sync replica set is a quorum that decides which producer writes are safe to commit."
related_terms: ["consensus", "paxos", "raft", "replicated-log", "leader-election"]
related_posts:
  - "/distributed-systems/majority-quorum/"
  - "/distributed-systems/replicated-log/"
  - "/distributed-systems/paxos/"
---
