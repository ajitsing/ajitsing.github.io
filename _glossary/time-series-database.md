---
title: "Time Series Database"
slug: "time-series-database"
also-known-as: ["TSDB", "Time Series DB"]
category: "database"
date: 2026-09-08
definition: "A time series database, or TSDB, is a database built to store and query data that is always stamped with a time: metrics, IoT readings, ticks, and events. Writes are almost always appends of new points, and queries almost always start with a time range. The engine partitions data by time, compresses each series heavily, and drops or downsamples old points so recent windows stay fast."
key_takeaways:
  - "Time is the primary axis. You append new points and query ranges like 'the last hour', not rows by arbitrary primary key."
  - "Compression and time partitioning are the product. Similar timestamps and slowly changing values often shrink to 1 to 2 bytes per sample."
  - "Cardinality (unique metric-plus-tag combinations) is the usual outage. Unbounded labels like user ids blow up the in-memory index."
  - "Retention and downsampling are first-class. A TSDB that never expires data is just a disk that grows."
how_it_works:
  - "New points go into an in-memory buffer and a [write-ahead log](/glossary/write-ahead-log/) for durability."
  - "Completed windows flush as immutable time chunks or blocks, often in a compressed columnar layout."
  - "A query first prunes chunks outside the time range, then uses an inverted index of names and tags to pick series."
  - "A [TTL](/glossary/ttl/) or chunk-drop job removes raw data after a retention window. Rollups keep a coarser copy for longer."
real_world:
  - "Prometheus stores scrape samples in two-hour blocks and is the default metrics store for Kubernetes."
  - "TimescaleDB adds hypertables and compression on top of PostgreSQL so you keep SQL and joins."
  - "InfluxDB and Amazon Timestream ingest IoT and application metrics as a purpose-built or managed TSDB."
related_terms: ["lsm-tree", "columnar-database", "sharding", "ttl", "write-ahead-log", "database-index", "wide-column-store"]
related_posts:
  - "/time-series-databases-explained/"
  - "/columnar-databases-explained/"
  - "/wide-column-stores-explained/"
  - "/how-databases-store-data-internally/"
  - "/opentelemetry-production-guide/"
---
