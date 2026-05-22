---
title: "Gossip Protocol"
slug: "gossip-protocol"
also-known-as: ["Epidemic Protocol", "Gossip Dissemination"]
category: "distributed-systems"
date: 2026-05-22
definition: "A gossip protocol is a way to spread information through a cluster by having each node talk to a few random peers. Updates spread like a rumor and reach every node in a few rounds. There is no central server, so the protocol keeps working even when nodes fail or the network gets messy."
key_takeaways:
  - "Gossip scales to thousands of nodes because each node only talks to a handful of peers per round."
  - "It is fast in practice. An update usually reaches the whole cluster in O(log N) rounds."
  - "Gossip is good for membership, failure detection, and metadata. It is not good for data that needs strong consistency."
  - "It survives partitions and uneven failures better than a central control plane because there is no single point of failure."
how_it_works:
  - "On each gossip tick, every node picks one or a few random peers."
  - "It sends them a summary of its current view, like membership, version vectors, and heartbeat counters."
  - "The peer compares its own state, takes anything newer, and sends back anything the sender is missing."
  - "Both nodes end up with the same view of that subset, and the cycle repeats."
real_world:
  - "Cassandra uses gossip to spread cluster membership, schema versions, and load info."
  - "DynamoDB and Riak use gossip style protocols and Phi accrual failure detection for membership and anti entropy."
  - "Consul, Serf, and Memberlist use SWIM, a gossip based failure detector, for service health checks."
related_terms: ["heartbeat", "consensus", "quorum"]
related_posts:
  - "/distributed-systems/heartbeat/"
---
