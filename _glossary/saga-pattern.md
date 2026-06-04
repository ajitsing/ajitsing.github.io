---
title: "Saga Pattern"
slug: "saga-pattern"
also-known-as: ["Saga", "Distributed Saga"]
category: "system-design"
date: 2026-06-04
definition: "The saga pattern keeps data consistent across services without a distributed lock. It breaks one big transaction into a sequence of local transactions, one per service, each with a compensating transaction that undoes it if a later step fails. There is no [two-phase commit](/glossary/two-phase-commit/); instead you accept eventual consistency and roll forward or compensate. Sagas come in two flavours: choreography (services react to each other's events) and orchestration (a central coordinator drives the steps)."
key_takeaways:
  - "A saga replaces one cross-service transaction with a chain of local transactions plus compensations to undo them."
  - "There is no global lock or 2PC, so you trade strict atomicity for availability and eventual consistency."
  - "Choreography is event-driven and decentralised; orchestration uses a central coordinator and is easier to reason about."
  - "Every step and every compensation must be idempotent, since steps get retried."
how_it_works:
  - "Each service performs its own local transaction and emits an event or returns to a coordinator."
  - "The next step runs only after the previous one succeeds."
  - "If a step fails, previously completed steps are undone by running their compensating transactions in reverse."
  - "The saga completes when all steps succeed or all completed steps have been compensated."
real_world:
  - "Order checkout flows (reserve stock, charge card, ship) are the canonical saga example."
  - "Temporal, Camunda, and AWS Step Functions are common orchestration engines for sagas."
  - "The [transactional outbox](/glossary/transactional-outbox/) is how saga events are published reliably."
related_terms: ["transactional-outbox", "two-phase-commit", "idempotent-receiver", "message-queue"]
related_posts:
  - "/saga-pattern-distributed-transactions/"
  - "/transactional-outbox-pattern/"
---
