---
layout: post
seo: true
title: "Stream Processing Explained: Kafka, Flink, and Real-Time Data Pipelines"
subtitle: "How unbounded events get transformed as they arrive, why event time matters more than the wall clock, and how to pick between Kafka Streams, Flink, and a plain consumer"
date: 2026-09-17
categories: distributed-systems
permalink: /stream-processing/
thumbnail-img: /assets/img/posts/distributed-systems/stream-processing-thumb.png
share-img: /assets/img/posts/distributed-systems/stream-processing-thumb.png
description: "A practical guide to stream processing for software developers. Learn how real-time data pipelines work, event time vs processing time, watermarks and windows, exactly-once semantics, and when to use Apache Kafka, Kafka Streams, Apache Flink, or Spark Structured Streaming."
keywords: "stream processing, what is stream processing, stream processing vs batch processing, real-time data pipeline, event streaming, Apache Kafka, Apache Flink, Kafka Streams, ksqlDB, Spark Structured Streaming, streaming ETL, exactly-once processing, event time vs processing time, watermark stream processing, windowed aggregation, tumbling window, sliding window, session window, real-time analytics, Confluent Cloud, Amazon Kinesis, Amazon MSK, managed Kafka, CDC, change data capture, Debezium, data pipeline architecture, enterprise data platform, cloud data warehouse, Databricks, RisingWave, Materialize, backpressure, stateful stream processing, checkpointing"
tags: ["distributed-systems", "kafka", "flink", "data-pipelines", "system-design"]
social-share: true
comments: true

quick-answer: "**Stream processing** is computation over an unbounded sequence of events, one record or one small window at a time, instead of waiting for a file or a table to finish. A typical real-time data pipeline looks like this: producers write events into an event streaming log such as Apache Kafka, a processor (Kafka Streams, Apache Flink, Spark Structured Streaming, or a streaming SQL engine) transforms, joins, and aggregates them using **event time** and **watermarks**, then writes results to another topic, a database, a search index, or a dashboard. Use a plain consumer when you only need per-message side effects. Use Kafka Streams or ksqlDB when the work stays inside Kafka. Use Flink when you need large state, event-time windows, CDC, or many source types. Batch still wins for cheap historical reports that can wait hours."

key-takeaways:
  - "A stream is unbounded. You never get a 'last row', so you scope work with windows, watermarks, and state, not with a full table scan."
  - "Event time is when the event happened. Processing time is when your job saw it. Windows on processing time are simpler and wrong the moment events arrive late or you replay a Kafka topic."
  - "A watermark is a guess that no more events older than time T will arrive. It is how the job closes a window. It is not the same thing as Kafka's high watermark."
  - "Exactly-once is usually 'exactly-once state plus at-least-once output, made unique by idempotent writes or transactional sinks'. End-to-end exactly-once needs a source and sink that both support it, and it adds latency because commits wait on checkpoints."
  - "Kafka is the log. Stream processing is the computation on top of the log. Mixing those two jobs in your head is how teams overbuy a cluster they did not need."
  - "Unbounded state is the number one production killer. Every join and aggregation needs a time bound or a TTL, plus lag, backpressure, and checkpoint monitoring from day one."

faq:
  - question: "What is stream processing in simple terms?"
    answer: "Stream processing is running code over events as they arrive, without waiting for a batch job to start. Each event is filtered, transformed, joined with other streams or tables, or rolled into a time window, and the result is published immediately. The input never ends, so the job itself is a long-running process rather than a query that returns and exits."
  - question: "What is the difference between stream processing and batch processing?"
    answer: "Batch processing waits until a bounded dataset is complete, then computes over the whole thing: an hourly file, a nightly warehouse load, a Spark job on yesterday's table. Stream processing treats data as unbounded and updates results continuously. The same SQL can often run in both modes, but streaming must handle late events, watermarks, state, and recovery. Batch is cheaper and simpler when waiting is acceptable. Streaming is for latency, not for replacing every ETL job."
  - question: "What is the difference between Apache Kafka and stream processing?"
    answer: "Kafka stores and transports events. It is a distributed commit log with topics, partitions, and consumer groups. Stream processing is the computation layer that reads those events, keeps state, and writes derived streams. Kafka Streams and ksqlDB run that computation as a library next to Kafka. Apache Flink, Spark Structured Streaming, and streaming databases are separate engines that often use Kafka as the source and sink. You can have Kafka without any stream processor, and you can process streams from Kinesis, Pulsar, or a database changelog without Kafka."
  - question: "What is event time vs processing time?"
    answer: "Event time is the timestamp inside the record, usually when the phone, server, or sensor produced the event. Processing time is the wall clock on the machine running the operator. A one-minute event-time window groups events whose timestamps fall in that minute, even if they arrive late or you replay last week's log. A processing-time window groups whatever happens to hit the operator during that minute of wall clock, so replays and lag change the answer."
  - question: "What is a watermark in stream processing?"
    answer: "A watermark is a marker in the stream that says event time has reached T, so the engine can close windows that end at or before T. It is a latency versus completeness trade: a watermark that trails real timestamps by 5 seconds waits for typical out-of-order events; a watermark that trails by 5 minutes is more complete and slower. Events that still arrive after the watermark are late and need an allowed-lateness policy or a side output. This is unrelated to Kafka's high watermark, which is the offset of the last fully replicated record in a partition."
  - question: "Does Kafka Streams replace Apache Flink?"
    answer: "No. Kafka Streams is a Java or Scala library that runs inside your application processes, talks only to Kafka, and is excellent for Kafka-to-Kafka transforms, joins, and modest state. Flink is a cluster engine with its own TaskManagers, first-class event-time watermarks, huge RocksDB state, SQL, CDC, and connectors that are not Kafka. If your job is 'read topic A, write topic B' on a Java team, start with Kafka Streams. If you need complex windows, multi-source jobs, or petabyte-scale state, use Flink."
  - question: "What does exactly-once processing actually guarantee?"
    answer: "Inside the engine it means operator state is restored to a consistent checkpoint after a crash, so a count or join is not double-applied in the job's own state. End-to-end exactly-once means the sink also participates, usually with Kafka transactions or a two-phase commit, so downstream readers do not see duplicates from a retry. Side effects outside that protocol (an HTTP call, an email, a non-transactional database write) are still at-least-once unless you make the receiver idempotent. Many production pipelines choose at-least-once plus idempotent writes because it is faster and easier to operate."
  - question: "When should I not use stream processing?"
    answer: "Skip it when a scheduled batch or a database query already meets the freshness you need, when volume is low enough that a queue and a worker are simpler, when the business question is 'what happened yesterday', or when your team cannot staff checkpointing, lag, schema evolution, and on-call for a 24/7 job. Streaming has a real operational cost. The wrong first pipeline is a Flink cluster that computes something a nightly dbt model already answers."

citations:
  - name: "The world beyond batch: Streaming 101"
    url: "https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/"
    author: "Tyler Akidau"
  - name: "The Dataflow Model"
    url: "https://research.google/pubs/the-dataflow-model-a-practical-approach-to-balancing-correctness-latency-and-cost-in-massive-scale-unbounded-out-of-order-data-processing/"
    author: "Akidau et al., VLDB 2015"
  - name: "Timely Stream Processing (event time and watermarks)"
    url: "https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/"
    author: "Apache Flink Documentation"
  - name: "Flink Applications: stateful stream processing"
    url: "https://flink.apache.org/what-is-flink/flink-applications/"
    author: "Apache Flink"
  - name: "Kafka Streams core concepts"
    url: "https://docs.confluent.io/platform/current/streams/concepts.html"
    author: "Confluent"
  - name: "End-to-end exactly-once processing in Apache Flink"
    url: "https://flink.apache.org/2018/02/28/an-overview-of-end-to-end-exactly-once-processing-in-apache-flink-with-apache-kafka-too/"
    author: "Apache Flink Blog"
  - name: "Apache Kafka documentation"
    url: "https://kafka.apache.org/documentation/"
    author: "Apache Kafka"
  - name: "Spark Structured Streaming Programming Guide"
    url: "https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html"
    author: "Apache Spark"
---

A fraud check that waits for tonight's warehouse load is not a fraud check. By the time the batch finishes, the card is charged, the goods have shipped, and you are writing a post-mortem instead of a decline.

That gap is what **stream processing** is for. You keep a job running all day. Events flow in from clicks, payments, sensors, or database changes. The job updates counts, joins, and alerts as each record arrives, with a lag of seconds rather than hours.

The hard part is not the `map` call. The hard part is time, state, and failure. Events arrive late and out of order. Windows never close unless you tell them to. A restart must not double-count a payment. This post is the version of stream processing you need in production: what it actually is, how a real-time data pipeline is layered, why event time beats the wall clock, how windows and watermarks work, what exactly-once really means, which engine to pick, and the mistakes that take these jobs down.

{% include glossary-callout.html terms="stream-processing,event-time,message-queue,pub-sub,write-ahead-log,idempotent-receiver,ttl,two-phase-commit" %}

## <i class="fas fa-question-circle"></i> What Stream Processing Actually Is

Stream processing is a long-running computation over an **unbounded** sequence of events. Unbounded means you never get to the last row. There is always another click, another log line, another `OrderCreated`.

A batch job has a start and a finish. It reads a file, a partition of a table, or yesterday's dump, writes a result, and exits. A stream job is closer to a server. It starts, then it stays up, reading new records forever.

Three properties come with that:

- **Low latency.** Results update as events arrive, often in hundreds of milliseconds to a few seconds, not at the next cron tick.
- **Incremental work.** You do not re-scan the whole history for every new event. You update in-memory or on-disk state: a count, a last-seen timestamp, a join buffer.
- **Time as a first-class input.** Most useful questions are time scoped. Revenue in the last 5 minutes. Sessions that went quiet for 30 minutes. A login from a new country within 10 seconds of a password reset.

Kafka, Amazon Kinesis, and similar systems are **event streaming** logs. They store the events. Stream processing is the layer that *computes* on them. Mixing the two is how a team ends up running a Kafka cluster to do work a queue worker could have done, or writing a consumer loop that quietly becomes an unmaintainable stream processor.

If you want the log itself, start with [How Kafka Works](/distributed-systems/how-kafka-works/){:target="_blank" rel="noopener"}. If you only need to hand work to a worker and delete the message, you want a [message queue](/role-of-queues-in-system-design/){:target="_blank" rel="noopener"}, not a streaming engine.

## <i class="fas fa-layer-group"></i> Stream Processing vs Batch Processing

People frame this as a religious choice. It is a freshness choice.

**Batch processing** is cheaper, easier to retry, and easier to reason about. Spark, dbt, warehouse SQL, overnight ETL: all of these assume a bounded input. You can sort the whole dataset. You can wait for every late file. Cloud data warehouse compute is priced for this shape of work, and it is the right default for reports, backfills, and anything a human looks at the next morning.

**Stream processing** exists because some answers expire. Fraud, inventory, live dashboards, anomaly detection, personalization features, operational alerts. Waiting an hour is the bug.

Tyler Akidau's [Streaming 101](https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/){:target="_blank" rel="noopener"} put this cleanly years ago: the data is often the same, the difference is when you are willing to emit a result. Google's [Dataflow Model](https://research.google/pubs/the-dataflow-model-a-practical-approach-to-balancing-correctness-latency-and-cost-in-massive-scale-unbounded-out-of-order-data-processing/){:target="_blank" rel="noopener"} then showed that event time, watermarks, windows, and triggers are the vocabulary you need once you stop pretending the stream is a table that already arrived.

```mermaid
flowchart LR
    subgraph BATCH["Batch"]
        direction TB
        B1["fa:fa-file-alt Bounded input"]
        B2["fa:fa-clock Wait until the window of data is complete"]
        B3["fa:fa-play Job runs, writes, exits"]
    end

    subgraph STREAM["Stream"]
        direction TB
        S1["fa:fa-stream Unbounded events"]
        S2["fa:fa-sync-alt Job never finishes"]
        S3["fa:fa-bolt Results update continuously"]
    end

    BATCH --> BR["fa:fa-database Reports, backfills, cheap historical ETL"]
    STREAM --> SR["fa:fa-shield-alt Fraud, alerts, live features, operational metrics"]

    classDef batch fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef stream fill:#c8e6c9,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef use fill:#e0f2fe,stroke:#0891b2,stroke-width:2px,color:#0f172a

    class B1,B2,B3 batch
    class S1,S2,S3 stream
    class BR,SR use
```

Modern engines blur the line on purpose. Flink and Spark Structured Streaming can run the same logic over a bounded file and an unbounded Kafka topic. That is useful for backfills. It does not make streaming free. You still pay for always-on compute, state storage, and an on-call rotation.

A useful rule: if the product owner is happy with a number that is 15 minutes stale, start with batch or a micro-batch. If they need "this payment, this second," you are in stream processing territory.

## <i class="fas fa-sitemap"></i> Anatomy of a Real-Time Data Pipeline

A production pipeline is four layers. Teams get into trouble when they buy one product and expect it to be all four.

```mermaid
flowchart TB
    subgraph SRC["Sources"]
        direction LR
        APP["fa:fa-mobile-alt Apps and APIs"]
        DB["fa:fa-database OLTP databases"]
        IOT["fa:fa-microchip Logs and sensors"]
    end

    subgraph LOG["Event streaming log"]
        K["fa:fa-stream Kafka / MSK / Kinesis"]
    end

    subgraph PROC["Stream processing"]
        SP["fa:fa-cogs Kafka Streams, Flink, Spark, streaming SQL"]
        ST[("fa:fa-hdd State: counts, joins, sessions")]
        SP --- ST
    end

    subgraph SINK["Sinks"]
        direction LR
        T2["fa:fa-stream Derived topics"]
        OLAP["fa:fa-chart-bar Real-time analytics"]
        DW["fa:fa-warehouse Data warehouse"]
        AL["fa:fa-bell Alerts and features"]
    end

    APP --> K
    DB -->|CDC| K
    IOT --> K
    K --> SP
    SP --> T2
    SP --> OLAP
    SP --> DW
    SP --> AL

    classDef src fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef log fill:#c8e6c9,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef proc fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#0f172a
    classDef sink fill:#e0f2fe,stroke:#0891b2,stroke-width:2px,color:#0f172a

    class APP,DB,IOT src
    class K log
    class SP,ST proc
    class T2,OLAP,DW,AL sink
```

{% include ads/in-article.html %}

**Sources.** User actions, service logs, IoT readings, and change data capture from Postgres or MySQL. CDC is how you turn row changes into a stream without dual writes. The reliable application-level version of that is the [transactional outbox](/transactional-outbox-pattern/){:target="_blank" rel="noopener"} with Debezium reading the [write-ahead log](/distributed-systems/write-ahead-log/){:target="_blank" rel="noopener"}.

**The log.** Almost always Kafka in 2026, or a Kafka-compatible broker, or a cloud native log such as Amazon Kinesis or Azure Event Hubs. This layer is [pub/sub](/glossary/pub-sub/){:target="_blank" rel="noopener"} with retention and replay. Multiple consumer groups can read the same events. That is why Kafka won as the enterprise data platform backbone: analytics, search, and product features all drink from one firehose.

**The processor.** This is the stream processing engine. Stateless jobs filter, map, and fan out. Stateful jobs keep keyed state: running totals, last known user profile, the contents of a window. State lives in memory, spills to RocksDB, and is checkpointed to object storage so a crash does not start from zero.

**Sinks.** Another Kafka topic, a [columnar](/columnar-databases-explained/){:target="_blank" rel="noopener"} store for real-time analytics, a warehouse for the rest of the company, Redis for features, PagerDuty for alerts. The processor should not also be your serving layer unless you picked a streaming database whose whole job is serving.

Managed options sit on this same diagram. Confluent Cloud, Amazon MSK, and Azure Event Hubs cover the log. Confluent Cloud Flink, Amazon Managed Service for Apache Flink, and Databricks cover compute. You still have four layers. Someone else runs two of them.

## <i class="fas fa-clock"></i> Event Time, Processing Time, and Watermarks

This is the concept that separates a toy consumer from a real stream processor.

**Processing time** is the clock on the machine running your operator. A 1-minute processing-time window is "whatever I saw during this minute of wall clock." It is simple. It also changes its answer if the consumer lags, if a partition is paused, or if you replay last Tuesday from Kafka. Replays become a different dataset because the wall clock moved.

**[Event time](/glossary/event-time/){:target="_blank" rel="noopener"}** is a timestamp carried on the record: `occurred_at`, `event_timestamp`, the phone's clock when the tap happened. A 1-minute event-time window is "events whose timestamps fall in that minute," no matter when they arrived. Replaying a topic produces the same windows. Late phones and delayed producers still land in the correct bucket, up to a point.

That point is the **watermark**.

A watermark is a statement flowing with the stream: "I believe there will be no more events with event time `<= T`." When an operator sees `Watermark(T)`, it can close windows that ended at or before `T` and emit their results. [Flink's time docs](https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/){:target="_blank" rel="noopener"} describe it as a trade between latency and completeness. A watermark of `event_time - 5 seconds` emits fast and will miss stragglers. A watermark of `event_time - 5 minutes` waits, then is more complete.

```mermaid
flowchart TB
    E1["fa:fa-clock Event A<br/>event time 10:00:01"]
    E2["fa:fa-clock Event B<br/>event time 10:00:04"]
    E3["fa:fa-exclamation-triangle Event C late<br/>event time 10:00:02"]
    WM["fa:fa-flag Watermark 10:00:05<br/>close the 10:00 window"]
    WIN["fa:fa-th Window 10:00 to 10:01<br/>emits A and B"]
    LATE["fa:fa-inbox C arrives after close<br/>side output or allowed lateness"]

    E1 --> WIN
    E2 --> WIN
    WM --> WIN
    E3 --> LATE

    classDef ok fill:#c8e6c9,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef time fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef warn fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#0f172a

    class E1,E2 time
    class WM,WIN ok
    class E3,LATE warn
```

{% include ads/in-article.html %}

Late events are normal, not a bug. Networks stall. Mobile clients buffer. A producer retries. You pick a policy:

- Drop them.
- Send them to a side output topic for inspection.
- Allow lateness so the window can still update for a while after the watermark.

Do not confuse this watermark with Kafka's [high watermark](/distributed-systems/high-watermark/){:target="_blank" rel="noopener"}. Kafka's high watermark is the offset of the last fully replicated record in a partition. Stream processing watermarks are about event time. Same English word, two different machines.

Assign timestamps on the producer when you can. A server that stamps `now()` at ingest is processing time wearing an event-time field name.

## <i class="fas fa-th"></i> Windows: How You Aggregate an Infinite Stream

You cannot `COUNT(*)` a stream. It never ends. You count *inside a window*.

**Tumbling windows** sit next to each other and do not overlap. Every event belongs to exactly one window. "Count checkouts per minute" is a tumbling window. Simple, cheap, good for dashboards and billing buckets.

**Sliding windows** overlap. A 5-minute window that slides every 1 minute emits a new result each minute, each covering the last five. Good for "rate over the last N minutes" where you want a smooth curve. More state, more emissions.

**Session windows** close after a gap of inactivity. A user browses, goes quiet for 30 minutes, comes back: two sessions. You do not pick the boundaries up front. The data does. This is how product analytics talks about visits.

```mermaid
flowchart TB
    subgraph TUMBLE["Tumbling: 1 minute, no overlap"]
        T1["00:00 to 00:01"]
        T2["00:01 to 00:02"]
        T3["00:02 to 00:03"]
        T1 --- T2 --- T3
    end

    subgraph SLIDE["Sliding: 5 minute window, 1 minute slide"]
        S1["00:00 to 00:05"]
        S2["00:01 to 00:06"]
        S3["00:02 to 00:07"]
        S1 --- S2 --- S3
    end

    subgraph SESS["Session: gap of 30 minutes ends a session"]
        U1["Browse 10:02 to 10:18"]
        GAP["fa:fa-moon Quiet"]
        U2["Browse 10:55 to 11:04"]
        U1 --> GAP --> U2
    end

    classDef a fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef b fill:#c8e6c9,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef c fill:#e0f2fe,stroke:#0891b2,stroke-width:2px,color:#0f172a
    classDef d fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#0f172a

    class T1,T2,T3 a
    class S1,S2,S3 b
    class U1,U2 c
    class GAP d
```

Windows can also be count based (every 100 events) but time-based windows are what most product questions want, and they only make sense on event time.

Joins are windows in disguise. A stream-stream join without a time bound stores the world forever, waiting for a match that may never come. Always give the join an interval. Configure state [TTL](/glossary/ttl/){:target="_blank" rel="noopener"} as a backstop even when you think the window already expires keys.

## <i class="fas fa-hdd"></i> State, Checkpoints, and Exactly-Once

Stateless jobs are easy: read, transform, write. Restart anywhere. Scale by adding consumers.

The jobs people actually want are stateful. Fraud needs "how many cards has this device used in 10 minutes." A unique-user count needs HyperLogLog or a set. A join with a user table needs the latest profile per `user_id`. That state is the product.

Flink keeps it in heap for tiny jobs and in RocksDB for everything real. Kafka Streams does the same with changelog topics so state can rebuild from Kafka. Spark Structured Streaming checkpoints offsets and intermediate state to durable storage.

**Checkpointing** is a consistent snapshot of operator state plus input offsets. On failure the job rewinds to the last successful checkpoint and replays. Replay means **duplicates**, unless you planned for them.

Delivery words, without the marketing:

- **At-most-once:** skip on failure. You lose data. Almost nobody wants this for money or audit trails.
- **At-least-once:** replay on failure. You may process twice. This is the honest default of Kafka consumers, queues, and most sinks.
- **Exactly-once in the engine:** state restores so a count is not applied twice *inside the job*. Flink checkpoints and Kafka Streams `EXACTLY_ONCE_V2` aim here.
- **End-to-end exactly-once:** the sink commits with the checkpoint, typically Kafka transactions or a [two-phase commit](/distributed-systems/two-phase-commit/){:target="_blank" rel="noopener"} between the processor and the output. Downstream sees each record once. [Flink's Kafka exactly-once write-up](https://flink.apache.org/2018/02/28/an-overview-of-end-to-end-exactly-once-processing-in-apache-flink-with-apache-kafka-too/){:target="_blank" rel="noopener"} is still the clearest explanation of that protocol.

The catch: transactional sinks commit when the checkpoint completes, so consumers of the output topic see data in checkpoint-sized batches. You traded latency for uniqueness. For many sinks the better design is at-least-once plus an [idempotent receiver](/distributed-systems/idempotent-receiver/){:target="_blank" rel="noopener"}: a unique event id, a uniqueness constraint, a no-op on retry.

HTTP calls, emails, and payment APIs are never covered by a Flink checkpoint. If the side effect is not idempotent, exactly-once config on the job will not save you.

## <i class="fas fa-cogs"></i> Which Engine Should You Use

Pick by the shape of the job, not by a benchmark screenshot.

```mermaid
flowchart TD
    Q1{"Need more than<br/>per-message side effects?"}
    Q1 -->|No| C["fa:fa-user Consumer or queue worker"]
    Q1 -->|Yes| Q2{"Stay inside Kafka<br/>on a JVM team?"}
    Q2 -->|Yes, simple SQL| KSQL["fa:fa-table ksqlDB"]
    Q2 -->|Yes, app code| KS["fa:fa-coffee Kafka Streams"]
    Q2 -->|No| Q3{"Queryable live views<br/>that look like Postgres?"}
    Q3 -->|Yes| MV["fa:fa-search RisingWave or Materialize"]
    Q3 -->|No| Q4{"Already a Spark shop,<br/>and delay of seconds is fine?"}
    Q4 -->|Yes| SPARK["fa:fa-bolt Spark Structured Streaming"]
    Q4 -->|No| FLINK["fa:fa-industry Apache Flink"]

    classDef q fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef easy fill:#c8e6c9,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef mid fill:#e0f2fe,stroke:#0891b2,stroke-width:2px,color:#0f172a
    classDef hard fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#0f172a

    class Q1,Q2,Q3,Q4 q
    class C,KSQL,KS easy
    class MV,SPARK mid
    class FLINK hard
```

{% include ads/in-article.html %}

**A consumer.** One event in, one side effect out, no windows. This is still the right answer for "send this email" and "write this row." Pair it with a queue or a Kafka consumer group and move on.

**Kafka Streams.** A library inside your Java or Scala service. No separate cluster. State is backed by Kafka changelog topics. Perfect for Kafka-to-Kafka streaming ETL: enrich an order with a user table, filter, re-key, write a new topic. [Confluent's concepts guide](https://docs.confluent.io/platform/current/streams/concepts.html){:target="_blank" rel="noopener"} is the canonical map of streams versus tables. ksqlDB is the SQL version of the same idea.

**Apache Flink.** The default heavy engine in 2026 for event-time windows, large state, CEP, CDC, and jobs that read more than Kafka. SQL and the DataStream API share a runtime. You operate TaskManagers, checkpoint storage, and savepoints for upgrades. Use a managed Flink offering unless you already run this well.

**Spark Structured Streaming.** Micro-batches on the Spark engine you already have. Excellent when the team lives in Databricks and a few seconds of delay is fine. Weaker than Flink at fine-grained event-time and very large keyed state, stronger at unifying the lakehouse batch path with a streaming path.

**Streaming databases** (RisingWave, Materialize, ksqlDB to a degree). You declare a materialized view. The engine keeps it incrementally up to date and you query it like a table. This is the right shape when the product is "this dashboard or API must always reflect the latest events" rather than "write a derived topic."

Cloud logs without Kafka in the name still need a processor. Amazon Kinesis Data Streams plus Managed Flink, Azure Event Hubs plus Stream Analytics or Flink, Google Pub/Sub plus Dataflow. Same four layers, different logos.

For choosing the log itself, the [Kafka vs RabbitMQ vs SQS](/kafka-vs-rabbitmq-vs-sqs/){:target="_blank" rel="noopener"} post is the companion to this one.

## <i class="fas fa-industry"></i> What This Looks Like in Production

A concrete job, the kind that shows up in every commerce stack:

1. Orders land on `orders` from the checkout service (or from Debezium on the orders table).
2. A stream processor keys by `shop_id`, tumbling-window counts GMV per minute on event time with a 10 second watermark.
3. It joins each order with a compact `shops` table (Kafka changelog of shop status) and drops cancelled shops.
4. It writes `gmv_per_shop_1m` for dashboards and a separate `gmv_spike_alerts` topic when a shop exceeds a threshold.
5. A warehouse sink copies the same minute buckets for finance, who still want batch truth in the morning.

That is stream processing plus a batch path, not one or the other. Netflix, Uber, and LinkedIn all run this shape: Kafka as the hub, a processor for the low-latency path, a warehouse for the rest. The [role of queues](/role-of-queues-in-system-design/){:target="_blank" rel="noopener"} does not disappear. Task queues still send the email. The stream job decides *whether* the email should exist.

[CQRS](/cqrs-pattern-guide/){:target="_blank" rel="noopener"} projections are the same pattern with a different name: the write model emits events, the stream processor builds a read model.

Stock brokers pushing prices to millions of sockets are mostly fan-out, but the ticker plant that normalizes and filters the exchange feed is a stream processor. See [how stock brokers handle real-time price updates](/how-stock-brokers-handle-real-time-price-updates/){:target="_blank" rel="noopener"} for that path.

## <i class="fas fa-exclamation-triangle"></i> Production Failures You Can Avoid

These are not theoretical. They are the tickets that page you.

**Unbounded state.** A join without an interval, a session window with no gap, an aggregation keyed by a high-cardinality id with no TTL. RocksDB grows until checkpoints take minutes, then fail, then the job restarts into a larger and larger hole. Bound every stateful operator. Watch state size like you watch heap.

**Processing time used by accident.** The first dashboard looks right in staging because traffic is in order and nobody replays. Production has mobile lag and a three-hour replay after a bug, and the counts disagree with finance. Default to event time. Test by replaying a day of Kafka data and asserting the same windows.

**Ignoring backpressure.** If a sink is slow, a healthy engine slows the source. Fighting that with a bigger in-memory buffer just moves the crash. Persistent backpressure means the sink, the join, or a hot key is the problem. Hot keys (one `user_id` with 20 percent of events) need salting or a different model.

**Schema changes with no contract.** Someone removes a field. Every job that parsed it fails in a tight loop. Use a schema registry, default to backward-compatible adds, and put poison messages on a dead letter topic instead of stalling the partition.

**Lag as a vanity metric.** Consumer lag is how many offsets you are behind, not how late the business result is. A job can have near-zero lag and still emit windows 10 minutes late because the watermark is conservative. Alert on watermark delay, checkpoint duration, failed checkpoints, and sink errors, not only on lag.

**Exactly-once as a checkbox.** Turning on transactional Kafka sinks without measuring the commit interval surprises everyone when downstream "real time" is now your checkpoint interval. Measure. Often at-least-once plus idempotent writes is the better product.

**Streaming a problem that is batch.** If the only consumer is a daily email, you built an always-on cluster to replace a query. That bill shows up in cloud cost reviews, and nobody can explain it.

## <i class="fas fa-balance-scale"></i> When Stream Processing Is the Wrong Tool

Skip the streaming engine when:

- Freshness of minutes to hours is fine. Warehouse SQL and scheduled Spark are simpler.
- Volume is hundreds of events per minute and the work is "call this API." A queue worker is the whole architecture.
- You need request/reply. That is RPC, maybe with [RabbitMQ](/kafka-vs-rabbitmq-vs-sqs/){:target="_blank" rel="noopener"} for routing, not a topology of operators.
- The team cannot own a 24/7 job: schemas, lag, state, deploys with savepoints, and replay drills.
- The output is a human report. People do not stare at a 200 ms-fresh PDF.

Use the streaming engine when:

- A wrong answer 10 minutes later costs real money (fraud, inventory, ads bidding, trading features).
- Multiple teams need the same events transformed differently, and a derived topic is the API.
- You are building live product features: "users active now," "items viewed in this session," "anomaly versus the last hour."
- CDC from OLTP must fan out to search, cache, and analytics without polling the primary database.

Start smaller than your pride wants. Many good pipelines are Kafka Streams in the service that already owns the domain. Promote to Flink when state, time, or sources outgrow that.

## <i class="fas fa-flag-checkered"></i> Wrapping Up

Stream processing is how you compute on data that never stops arriving. The log (usually Kafka) remembers the events. The processor turns them into windows, joins, and alerts. Event time and watermarks make those windows correct when the world is late and messy. Checkpoints make crashes boring. Exactly-once is a protocol with costs, not a slogan.

If you take three things, take these. Put a timestamp on the event when it happens, and window on that. Bound every piece of state. Treat a streaming job like a production service with lag, watermarks, checkpoints, and schemas on the dashboard before you celebrate the first correct count in staging.

Batch is still the right tool for most data in the company. Streaming is the right tool for the slice where waiting is the bug.

---

**Related posts:**

- [How Kafka Works](/distributed-systems/how-kafka-works/){:target="_blank" rel="noopener"} - The log that most stream processors read from and write back to
- [Kafka vs RabbitMQ vs SQS](/kafka-vs-rabbitmq-vs-sqs/){:target="_blank" rel="noopener"} - When you need a streaming log versus a work queue
- [Role of Queues in System Design](/role-of-queues-in-system-design/){:target="_blank" rel="noopener"} - Decoupling and backpressure before you add a processing topology
- [Write-Ahead Log](/distributed-systems/write-ahead-log/){:target="_blank" rel="noopener"} - Why Kafka partitions look like a distributed WAL
- [Transactional Outbox Pattern](/transactional-outbox-pattern/){:target="_blank" rel="noopener"} - How database changes become a reliable event stream
- [Idempotent Receiver](/distributed-systems/idempotent-receiver/){:target="_blank" rel="noopener"} - How at-least-once delivery becomes safe at the sink
- [CQRS Pattern Guide](/cqrs-pattern-guide/){:target="_blank" rel="noopener"} - Read models are often just stream processors with a friendlier name
- [Columnar Databases Explained](/columnar-databases-explained/){:target="_blank" rel="noopener"} - Where streaming aggregations often land for real-time analytics
- [High Watermark](/distributed-systems/high-watermark/){:target="_blank" rel="noopener"} - Kafka's watermark, which is not the event-time watermark in this post

*Further reading: Tyler Akidau's [Streaming 101](https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/){:target="_blank" rel="noopener"} and the [Dataflow Model paper](https://research.google/pubs/the-dataflow-model-a-practical-approach-to-balancing-correctness-latency-and-cost-in-massive-scale-unbounded-out-of-order-data-processing/){:target="_blank" rel="noopener"}, Flink docs on [timely stream processing](https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/){:target="_blank" rel="noopener"} and [applications](https://flink.apache.org/what-is-flink/flink-applications/){:target="_blank" rel="noopener"}, Confluent's [Kafka Streams concepts](https://docs.confluent.io/platform/current/streams/concepts.html){:target="_blank" rel="noopener"}, the Flink blog on [exactly-once with Kafka](https://flink.apache.org/2018/02/28/an-overview-of-end-to-end-exactly-once-processing-in-apache-flink-with-apache-kafka-too/){:target="_blank" rel="noopener"}, the [Apache Kafka documentation](https://kafka.apache.org/documentation/){:target="_blank" rel="noopener"}, and the [Spark Structured Streaming guide](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html){:target="_blank" rel="noopener"}.*
