---
title: "Eventual Consistency"
slug: "eventual-consistency"
also-known-as: ["Optimistic Replication"]
category: "distributed-systems"
date: 2026-05-22
definition: "Eventual consistency is a promise that, if no new writes happen, all replicas will converge on the same value given enough time. Reads in between can return stale or out of order data. The system promises that updates will reach every replica eventually through gossip, anti entropy, or read repair."
key_takeaways:
  - "Eventual consistency trades immediate global agreement for high availability and low latency, especially across regions."
  - "Stale reads, lost updates, and out of order observations are normal. The application has to handle them."
  - "You need a way to resolve conflicts. Common options are last writer wins, vector clocks, CRDTs, or app specific merge logic."
  - "Despite the name, well tuned systems usually converge in milliseconds. The term describes the worst case, not normal latency."
how_it_works:
  - "A write goes to one replica and is acknowledged right away."
  - "Background work like gossip, anti entropy, or read repair pushes the update to other replicas."
  - "Conflicting writes are detected with timestamps, vector clocks, or version vectors."
  - "Replicas merge concurrent writes with a fixed rule so every node ends up with the same final value."
real_world:
  - "DynamoDB defaults to eventual consistency. Strongly consistent reads cost extra."
  - "Cassandra has tunable consistency, with eventual being the cheapest and most available setting."
  - "DNS, S3 in its early years, and Git itself are all eventually consistent in real life."
related_terms: ["cap-theorem", "gossip-protocol", "consensus", "quorum", "caching", "cqrs"]
related_posts:
  - "/distributed-systems/majority-quorum/"
---
