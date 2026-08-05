---
title: "Columnar Database"
slug: "columnar-database"
also-known-as: ["Column-Oriented Database", "Column Store"]
category: "database"
date: 2026-08-01
definition: "A columnar database stores the values of each column together on disk instead of storing whole rows together. Because an analytical query usually reads only a few columns from a wide table, this layout cuts I/O sharply and compresses each column heavily, since similar values sit next to each other. It makes OLAP queries (scans and aggregations over many rows) 10 to 100 times faster than a row store, at the cost of slow single-row lookups and updates. It is not the same as a [wide column store](/wide-column-stores-explained/)."
key_takeaways:
  - "Columnar is a physical storage layout for analytics (OLAP), not a NoSQL data model. Do not confuse it with a wide column store."
  - "Column pruning, heavy compression, and vectorized execution combine to make analytical scans very fast."
  - "Data skipping uses per-block metadata like min/max and bloom filters to avoid reading blocks that cannot match a filter."
  - "Writes favour large batches. Point lookups and frequent updates are slow, so columnar stores sit next to a row store, not instead of it."
how_it_works:
  - "Each column is stored in its own contiguous, compressed blocks on disk."
  - "A query reads only the columns it references and skips blocks whose metadata cannot match the filter."
  - "Surviving blocks are decompressed and processed in dense batches using CPU SIMD instructions."
  - "New data is loaded in batches as immutable sorted blocks that the engine merges in the background."
real_world:
  - "ClickHouse and DuckDB are open-source columnar engines for real-time and embedded analytics."
  - "Google BigQuery, Amazon Redshift, and Snowflake are columnar cloud data warehouses."
  - "Apache Parquet, ORC, and Arrow apply the same columnar idea as portable file and in-memory formats."
related_terms: ["wide-column-store", "database-index", "query-planner", "cqrs", "lsm-tree", "sharding"]
related_posts:
  - "/columnar-databases-explained/"
  - "/wide-column-stores-explained/"
  - "/how-databases-store-data-internally/"
  - "/postgresql-vs-mongodb-vs-dynamodb/"
---
