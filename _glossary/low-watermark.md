---
title: "Low Watermark"
slug: "low-watermark"
also-known-as: ["Low Water Mark", "Log Start Offset"]
category: "distributed-systems"
date: 2026-06-04
definition: "The low watermark is the index in a [write-ahead log](/glossary/write-ahead-log/) that marks the point below which entries can be safely discarded. It is the counterpart to the [high watermark](/glossary/high-watermark/): the high watermark controls how far forward readers can go (visibility), while the low watermark controls how far back the system must keep data (cleanup). It advances once every consumer has applied an entry, or once a snapshot makes old entries redundant, which keeps the log from growing without bound."
key_takeaways:
  - "The low watermark marks the oldest log entry the system must still keep. Everything below it can be deleted, compacted, or replaced by a snapshot."
  - "Without it, write-ahead logs grow forever and eventually fill the disk, taking the whole system down."
  - "It is the minimum across all consumers of the log: the slowest replica, the oldest backup cursor, and any active replication slot."
  - "Advance it too aggressively and slow followers can no longer catch up by replay. Advance it too slowly and you run out of disk."
how_it_works:
  - "The system tracks how far each consumer, follower, and backup has read or applied the log."
  - "The low watermark is set to the minimum of those positions, the oldest entry anyone still needs."
  - "Entries below the low watermark are deleted, compacted, or rolled into a snapshot."
  - "A follower that asks for an entry below the low watermark must catch up from a snapshot instead of the log."
real_world:
  - "Kafka calls it the Log Start Offset. It moves forward as time or size retention deletes old segments, or as log compaction removes superseded keys."
  - "[Raft](/glossary/raft/) systems like etcd advance it after a snapshot, discarding every log entry before the snapshot index."
  - "PostgreSQL uses checkpoints and replication slots to decide which WAL files are safe to remove."
related_terms: ["high-watermark", "write-ahead-log", "replicated-log", "consensus", "raft"]
related_posts:
  - "/distributed-systems/low-watermark/"
  - "/distributed-systems/high-watermark/"
  - "/distributed-systems/write-ahead-log/"
---
