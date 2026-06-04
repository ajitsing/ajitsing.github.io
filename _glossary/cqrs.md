---
title: "CQRS"
slug: "cqrs"
also-known-as: ["Command Query Responsibility Segregation"]
category: "system-design"
date: 2026-06-04
definition: "CQRS, Command Query Responsibility Segregation, uses separate models for writing and reading. Commands change state and run against a normalised write model; queries read from a denormalised read model tuned for fast lookups. Splitting the two lets you scale and optimise reads and writes independently, at the cost of keeping the read side in sync, which is usually [eventually consistent](/glossary/eventual-consistency/)."
key_takeaways:
  - "CQRS separates the write model (commands) from the read model (queries) so each can be optimised on its own."
  - "Read models are denormalised for fast queries; write models stay normalised for correctness."
  - "The read side is kept in sync via events, so it is typically eventually consistent with the write side."
  - "Start with a logical split in one database and add physical separation only when the load actually justifies it."
how_it_works:
  - "A command validates and applies a change to the write model."
  - "The write side publishes an event describing what changed."
  - "A projection consumes the event and updates one or more read models shaped for specific queries."
  - "Queries hit the read models directly and never touch the write model."
real_world:
  - "CQRS is often paired with event sourcing, though neither requires the other."
  - "It fits read-heavy systems like dashboards, feeds, and reporting where read and write shapes differ a lot."
  - "Events flow reliably from write to read side using the [transactional outbox](/glossary/transactional-outbox/) and a [message queue](/glossary/message-queue/)."
related_terms: ["transactional-outbox", "message-queue", "eventual-consistency", "saga-pattern"]
related_posts:
  - "/cqrs-pattern-guide/"
  - "/transactional-outbox-pattern/"
---
