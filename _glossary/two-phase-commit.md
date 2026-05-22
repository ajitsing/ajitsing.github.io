---
title: "Two Phase Commit"
slug: "two-phase-commit"
also-known-as: ["2PC", "XA Transactions"]
category: "distributed-systems"
date: 2026-05-22
definition: "Two phase commit, or 2PC, is a protocol for committing a transaction across many resources at once. A coordinator first asks every participant if they can commit. If they all say yes, it tells them to commit. If any one says no, it tells them all to abort. 2PC keeps things atomic but can block if the coordinator fails in the middle."
key_takeaways:
  - "2PC keeps a transaction atomic across many systems. Either everyone commits or no one does."
  - "If the coordinator crashes after participants vote yes but before they hear the decision, the participants are stuck waiting."
  - "2PC handles crashes but not network splits. That is why modern systems prefer [consensus](/glossary/consensus/) algorithms or sagas for distributed transactions."
  - "It is still in use inside XA databases, message brokers, and the JTA stack on the JVM."
how_it_works:
  - "Phase 1, prepare. The coordinator asks every participant to prepare and write a record saying it can commit."
  - "Each participant replies yes or no. Yes means it has flushed its redo records and is ready."
  - "Phase 2, commit or abort. If all votes were yes, the coordinator writes a commit decision and tells everyone to commit. Otherwise it tells them to abort."
  - "Participants apply the decision, log the outcome, and acknowledge the coordinator."
real_world:
  - "PostgreSQL supports 2PC through PREPARE TRANSACTION and COMMIT PREPARED for distributed transactions."
  - "The XA standard and JTA use 2PC to coordinate transactions across databases and message brokers in Java EE."
  - "Many microservice systems replace 2PC with the saga pattern to avoid the blocking case."
related_terms: ["consensus", "write-ahead-log", "replicated-log", "quorum"]
related_posts:
  - "/distributed-systems/two-phase-commit/"
  - "/saga-pattern-distributed-transactions/"
---
