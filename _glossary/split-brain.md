---
title: "Split Brain"
slug: "split-brain"
also-known-as: ["Dual Leadership", "Cluster Partition"]
category: "distributed-systems"
date: 2026-05-22
definition: "Split brain is a failure where two or more nodes both think they are the leader, usually because a network partition has cut the cluster in half. Each side keeps accepting writes and the data starts to diverge. Without something to stop one side from making changes, the shared state ends up corrupted."
key_takeaways:
  - "Split brain happens when liveness, the desire that someone has to lead, is put ahead of safety, the rule that only one can lead."
  - "A correct system uses a [quorum](/glossary/quorum/) and [fencing tokens](/glossary/fencing-token/) so the minority side cannot commit changes."
  - "With N replicas, only one partition can have a majority. That side keeps serving writes. The other side has to step down or refuse."
  - "Detection alone is not enough. The system has to actively kill the other node, often called STONITH, or invalidate its writes through fencing."
how_it_works:
  - "A network failure cuts off some replicas from the rest of the cluster."
  - "Each side runs failure detection, misses heartbeats, and starts a leader election."
  - "Without a quorum rule, both sides can elect their own leader and start taking writes."
  - "When the partition heals, the two sides have conflicting state and someone has to reconcile or roll back, often by hand."
real_world:
  - "MongoDB, Redis Sentinel, and Kafka all use quorum based leader election to make split brain unlikely or bounded."
  - "Galera Cluster and PostgreSQL clusters used to suffer from split brain when partitions outpaced quorum logic."
  - "VMware vSphere uses STONITH to forcibly kill a partitioned host before it can write."
related_terms: ["leader-election", "fencing-token", "quorum", "consensus", "cap-theorem"]
related_posts:
  - "/distributed-systems/lease/"
---
