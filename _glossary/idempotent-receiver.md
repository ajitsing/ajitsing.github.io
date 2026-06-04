---
title: "Idempotent Receiver"
slug: "idempotent-receiver"
also-known-as: ["Idempotent Consumer", "Request Deduplication", "Idempotency Key"]
category: "distributed-systems"
date: 2026-06-04
definition: "An idempotent receiver is a server or message consumer that can process the same request many times while changing the system only once. The client tags each request with a stable id and a request number, and the server stores the result of every request it handles. When a retry arrives with a number it has already seen, the server replays the saved response instead of redoing the work. This makes retries safe under at-least-once delivery, where duplicates are guaranteed rather than rare."
key_takeaways:
  - "Duplicates are not a bug, they are a guarantee. The moment a client retries on timeout, the server will eventually see the same request twice."
  - "The pattern has three parts: a stable client id, a per client request number, and a saved response that gets replayed on a duplicate."
  - "Idempotency is about the effect, not the message. Receiving a message twice is fine as long as the charge, insert, or send happens once."
  - "The side effect and the dedup record must commit together, in one transaction or via a [transactional outbox](/transactional-outbox-pattern/), or a crash in between will charge twice."
  - "An at-least-once channel plus an idempotent receiver gives you effectively once processing, which is the practical answer to exactly once delivery."
how_it_works:
  - "Each client registers and gets a stable id, and every request it sends carries a monotonically increasing request number."
  - "The server keeps a small record per client: the highest request number it has processed and the response it produced."
  - "On a new request, the server does the work and records the id plus response as one atomic step, often using a unique constraint on the key."
  - "On a duplicate, the server finds the saved response and returns it without running the logic again."
  - "Old records are dropped using a client acknowledged low water mark, a session [lease](/glossary/lease/), or a [TTL](/glossary/ttl/) so the dedup store stays bounded."
real_world:
  - "Stripe idempotency keys: send an Idempotency-Key header and a retry with the same key returns the first result instead of charging the card twice."
  - "Kafka idempotent producers assign a producer id and a per partition sequence number so the broker drops a retried record it has already written."
  - "[Raft](/glossary/raft/) and other [consensus](/glossary/consensus/) systems use client sessions with serial numbers so a command retried during a leader change is not applied twice."
related_terms: ["replicated-log", "consensus", "raft", "write-ahead-log", "lease", "ttl"]
related_posts:
  - "/distributed-systems/idempotent-receiver/"
  - "/transactional-outbox-pattern/"
  - "/how-stripe-prevents-double-payment/"
related_tools: ["snowflake-decoder"]
---
