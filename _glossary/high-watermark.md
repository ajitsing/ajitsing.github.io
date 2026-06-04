---
title: "High Watermark"
slug: "high-watermark"
also-known-as: ["HWM", "Commit Index"]
category: "distributed-systems"
date: 2026-05-22
definition: "The high watermark is the largest log offset that has been copied to a [quorum](/glossary/quorum/) of replicas. Anything at or below this point is committed and safe to read. Anything above it is still in flight and may be lost if the leader dies. It is the line between data that readers can trust and data that is still being replicated."
key_takeaways:
  - "The high watermark is the boundary between data that is safe to read and data that is still being copied."
  - "Leaders move the watermark forward only after a majority quorum has stored the entry."
  - "Followers learn the watermark from the leader and use it to control their own reads or local applies."
  - "Pair the high watermark with a low watermark to mark the range of log entries that must still be kept for replication or recovery."
how_it_works:
  - "The leader appends new entries to its log and sends them to followers."
  - "Each follower acknowledges the highest entry it has stored so far."
  - "Once an entry is acknowledged by a majority quorum, the leader moves the high watermark to that entry."
  - "Readers stay at or below the watermark and only see entries that are durable."
real_world:
  - "Kafka's high watermark is the largest offset consumers can read. Anything above it is still inside the in sync replica set's flight."
  - "Raft calls the same idea the commit index. The leader marks entries committed once a majority has stored them."
  - "Pulsar, BookKeeper, and HDFS all use a watermark style boundary between durable and in flight data."
related_terms: ["low-watermark", "replicated-log", "consensus", "raft", "quorum", "write-ahead-log"]
related_posts:
  - "/distributed-systems/high-watermark/"
  - "/distributed-systems/low-watermark/"
  - "/distributed-systems/replicated-log/"
---
