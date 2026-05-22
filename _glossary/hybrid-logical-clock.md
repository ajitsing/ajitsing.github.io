---
title: "Hybrid Logical Clock"
slug: "hybrid-logical-clock"
also-known-as: ["HLC", "Hybrid Time"]
category: "distributed-systems"
date: 2026-05-22
definition: "A hybrid logical clock, or HLC, is a clock that mixes the wall clock time with a small counter. The result is a 64 bit number that always goes up, stays close to real time, and keeps causal order across nodes even when wall clocks drift or jump backwards."
key_takeaways:
  - "An HLC gives you the causal ordering of a logical clock and the human readable feel of a real timestamp in one value."
  - "Each timestamp is a pair of physical time and a counter. The counter goes up if physical time stalls or moves backwards, so the clock never goes down."
  - "Two events with the same HLC are either truly concurrent or causally ordered correctly, even with bounded clock skew."
  - "HLCs are common in modern databases that want serializable transactions without a TrueTime style hardware setup."
how_it_works:
  - "Each node keeps a local HLC made of a physical time and a counter."
  - "On a local event, set the physical time to the max of the wall clock and the current HLC physical time. If the physical time did not move, bump the counter."
  - "On a message receive, merge the incoming HLC. Take the max of the physical times and bump the counter so the result is bigger than both."
  - "Send the HLC with every outgoing message so causal order travels with normal traffic."
real_world:
  - "CockroachDB uses HLCs as commit timestamps and to drive uncertainty windows for serializable reads."
  - "YugabyteDB and TiDB use HLC based timestamps for cross shard consistency."
  - "MongoDB's clusterTime is an HLC used for causal consistency across replica sets."
related_terms: ["consensus", "replicated-log"]
related_posts:
  - "/distributed-systems/hybrid-clock/"
  - "/distributed-systems/lamport-clock/"
---
