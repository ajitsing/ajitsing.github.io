---
title: "Follower Reads"
slug: "follower-reads"
also-known-as: ["Read from Replica", "Replica Reads", "Stale Reads"]
category: "distributed-systems"
date: 2026-09-23
definition: "Follower reads send read only queries to a replica that is not the leader, so the leader is not on the path for every query and clients can read a nearby copy. Writes still go to the leader and flow out through the replicated log. The follower is usually a little behind, so the read is either allowed to be stale, bounded to a maximum age, or held until the follower has caught up to a log index or timestamp the client cares about."
key_takeaways:
  - "Follower reads scale reads and cut cross region latency. They do not take writes off the leader."
  - "A follower can lag. Plain follower reads are eventually consistent unless you add a staleness bound or a session token."
  - "Only serve data at or below the high watermark, so a client never observes a log entry failover might discard."
  - "Nearest replica routing and the freshness rule are separate knobs. You usually need both."
how_it_works:
  - "The leader appends writes to a replicated log and ships them to followers."
  - "A router sends a read only request to a follower, often the one in the same zone or region."
  - "The follower answers from its local state, and only up to the commit index it has been told is safe."
  - "Stricter modes wait until the follower's applied index passes the client's last write, or they ask the leader for the latest commit index before reading locally."
real_world:
  - "CockroachDB serves stale follower reads at a closed timestamp with AS OF SYSTEM TIME follower_read_timestamp() or with_max_staleness()."
  - "TiDB follower read uses Raft ReadIndex so a local replica can serve a fresh read after checking the leader's commit index."
  - "PostgreSQL hot standbys, Amazon Aurora readers, MongoDB secondaries, and Kafka follower fetch are all versions of the same split."
related_terms: ["high-watermark", "eventual-consistency", "linearizability", "hybrid-logical-clock", "replicated-log", "leader-election"]
related_posts:
  - "/distributed-systems/follower-reads/"
  - "/distributed-systems/leader-follower/"
  - "/distributed-systems/high-watermark/"
  - "/distributed-systems/hybrid-clock/"
  - "/distributed-systems/replicated-log/"
---
