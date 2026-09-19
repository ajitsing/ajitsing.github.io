---
title: "Event Time"
slug: "event-time"
also-known-as: ["Event-Time Processing", "Event Timestamp"]
category: "distributed-systems"
date: 2026-09-17
definition: "Event time is the timestamp of when an event actually happened on the producing device or service, stored on the record itself. [Stream processing](/glossary/stream-processing/) jobs that window on event time group records by that timestamp, so a late or replayed event still lands in the correct minute or session. This is the opposite of processing time, which is the wall clock on the machine that happens to see the record. Watermarks track how far event time has advanced so windows can close without waiting forever."
key_takeaways:
  - "Event time lives on the record. Processing time lives on the worker. Only event time stays stable when you replay a Kafka topic."
  - "A watermark is a guess that no more events older than time T will arrive. It is how windows close. It is not Kafka's [high watermark](/glossary/high-watermark/)."
  - "Late events still happen after the watermark. You drop them, send them to a side output, or allow lateness so the window can update a bit longer."
  - "Stamp the timestamp as close to the source as you can. Stamping `now()` at ingest is processing time with extra steps."
how_it_works:
  - "Each record carries a timestamp such as `occurred_at` from the client, sensor, or originating service."
  - "The processor extracts that field and assigns it as the record's event time."
  - "Watermarks flow with the stream and announce that event time has reached T."
  - "Operators close windows that ended at or before T and emit results, then apply the late-data policy to stragglers."
real_world:
  - "Apache Flink and Kafka Streams windowed aggregations default to this model when you configure a timestamp extractor and watermarks."
  - "Google's Dataflow Model is the paper that named event time, watermarks, windows, and triggers as the core streaming vocabulary."
  - "Replaying a day of payments through the same job produces the same per-minute totals only if the job windows on event time."
related_terms: ["stream-processing", "high-watermark", "ttl", "write-ahead-log", "time-series-database"]
related_posts:
  - "/stream-processing/"
  - "/distributed-systems/high-watermark/"
  - "/time-series-databases-explained/"
---
