---
title: "Stream Processing"
slug: "stream-processing"
also-known-as: ["Event Stream Processing", "Real-Time Stream Processing", "Streaming Computation"]
category: "distributed-systems"
date: 2026-09-17
definition: "Stream processing is a long-running computation over an unbounded sequence of events. Instead of waiting for a file or a table to be complete, the job transforms, joins, and aggregates records as they arrive and emits updated results continuously. Time is part of the input: windows, watermarks, and [event time](/glossary/event-time/) decide when a result is ready. The events usually live in a log such as Kafka. The processor is a separate layer such as Kafka Streams, Apache Flink, or Spark Structured Streaming."
key_takeaways:
  - "A stream never ends, so you cannot scan 'all the rows'. You window, keep keyed state, and update results incrementally."
  - "The log (Kafka, Kinesis) stores and replays events. Stream processing is the computation on top of that log."
  - "Correct windows use event time and watermarks, not the wall clock of the worker."
  - "Restarts replay data. Treat duplicates as normal and make sinks [idempotent](/glossary/idempotent-receiver/), or use a transactional sink if you truly need end-to-end exactly-once."
how_it_works:
  - "Producers append events to a durable log. Each event carries a payload and usually an event-time timestamp."
  - "A processor reads the log, partitions work by key, and applies filters, maps, joins, and windowed aggregations."
  - "Stateful operators checkpoint state and offsets so a crash can rewind and continue."
  - "Results go to another topic, a database, a search index, or an alert system as soon as windows close."
real_world:
  - "Fraud scoring and inventory checks that must decide before a checkout completes."
  - "Live product metrics, sessionization, and personalization features built from clickstreams."
  - "CDC pipelines that keep search indexes and caches in sync with an OLTP database."
related_terms: ["event-time", "message-queue", "pub-sub", "write-ahead-log", "idempotent-receiver", "ttl", "two-phase-commit", "cqrs"]
related_posts:
  - "/stream-processing/"
  - "/distributed-systems/how-kafka-works/"
  - "/kafka-vs-rabbitmq-vs-sqs/"
  - "/role-of-queues-in-system-design/"
  - "/transactional-outbox-pattern/"
---
