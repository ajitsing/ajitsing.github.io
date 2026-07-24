---
title: "Correlation ID"
slug: "correlation-id"
also-known-as: ["Request ID", "Message ID", "Trace ID"]
category: "distributed-systems"
date: 2026-07-24
definition: "A correlation id is a unique value attached to a request so its response can be matched back to it later, even when many requests are in flight and replies arrive out of order. The sender keeps a map of correlation id to pending request, and when a response echoes the same id, the sender knows exactly which request it belongs to. It is what makes asynchronous messaging, pipelining, and a [request waiting list](/distributed-systems/request-waiting-list/) work."
key_takeaways:
  - "It ties an asynchronous response back to the request that caused it, without relying on arrival order."
  - "Every response must echo the same id the request carried, so the receiver can look it up."
  - "It is the key that a pending-requests map or [request waiting list](/distributed-systems/request-waiting-list/) is indexed on."
  - "The same id, propagated across services, becomes a trace id that lets you follow one request through a whole system."
how_it_works:
  - "The sender generates a unique id and stamps it on the outgoing request."
  - "It stores the id in a map that points to the waiting caller, future, or callback."
  - "The receiver copies the id onto its response."
  - "When the response arrives, the sender reads the id, finds the matching entry, and completes it."
real_world:
  - "gRPC and HTTP/2 use per-stream ids so multiplexed responses can arrive in any order."
  - "Message brokers and RPC frameworks stamp a correlation id on each message for request-reply."
  - "Distributed tracing tools like OpenTelemetry propagate a trace id, a correlation id spanning many services."
related_terms: ["request-waiting-list", "idempotent-receiver", "message-queue", "pub-sub", "heartbeat"]
related_posts:
  - "/distributed-systems/request-pipeline/"
  - "/distributed-systems/request-waiting-list/"
  - "/distributed-systems/idempotent-receiver/"
---
