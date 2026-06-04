---
title: "Transactional Outbox"
slug: "transactional-outbox"
also-known-as: ["Outbox Pattern", "Application Outbox"]
category: "system-design"
date: 2026-06-04
definition: "The transactional outbox pattern solves the dual-write problem: updating your database and publishing an event must either both happen or neither. It writes the event into an outbox table inside the same database transaction as the business change. A separate relay process then reads the outbox and publishes to the message broker, so an event is published if and only if the transaction committed, without needing [two-phase commit](/glossary/two-phase-commit/)."
key_takeaways:
  - "It fixes the dual-write problem where a crash between the DB commit and the publish leaves the two out of sync."
  - "The event is inserted in the same local transaction as the data, so they commit atomically."
  - "A relay (polling or change data capture) publishes outbox rows to the broker after commit."
  - "Delivery is at-least-once, so consumers must be [idempotent receivers](/glossary/idempotent-receiver/)."
how_it_works:
  - "Within one transaction, write the business change and insert a row into the outbox table."
  - "Commit the transaction so both succeed or both roll back."
  - "A relay reads unpublished outbox rows, either by polling or by tailing the [write-ahead log](/glossary/write-ahead-log/) with CDC."
  - "It publishes each event to the broker and marks the outbox row as sent."
real_world:
  - "Debezium reads the Postgres or MySQL WAL to publish outbox events into Kafka."
  - "It is the standard way to emit reliable events from a [saga](/glossary/saga-pattern/) step."
  - "Many microservice stacks use it instead of distributed transactions to integrate a database with a broker."
related_terms: ["saga-pattern", "message-queue", "idempotent-receiver", "cqrs"]
related_posts:
  - "/transactional-outbox-pattern/"
  - "/debezium-outbox-postgres-database-impact/"
  - "/saga-pattern-distributed-transactions/"
---
