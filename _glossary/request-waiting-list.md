---
title: "Request Waiting List"
slug: "request-waiting-list"
also-known-as: ["Pending Requests Map", "Waiting List", "Callback Registry"]
category: "distributed-systems"
date: 2026-07-24
definition: "A request waiting list is a structure a cluster node keeps to hold client requests that cannot be answered yet because they are waiting on responses from other nodes. Each entry maps a key, such as a correlation id or a log index, to a callback that decides when the request is ready to complete. As responses arrive asynchronously, the node looks up the matching entry and fires the callback once its condition, often a majority [quorum](/glossary/quorum/), is met."
key_takeaways:
  - "It exists because replication is asynchronous. A node must reply to other nodes and collect enough responses before it can answer the client, so the client request has to wait somewhere."
  - "Each entry is a key mapped to a callback. The key is chosen to match the arriving responses, and the callback holds the logic for when the request is done."
  - "The key is usually a correlation id for point-to-point messages, or the [high watermark](/glossary/high-watermark/) log index when waiting for a replicated entry to commit."
  - "The callback fires only when its criteria are satisfied, most often when a majority quorum of acknowledgements has arrived."
  - "Entries need expiry. A timeout sweeps stale requests and fails them so a lost response does not leak memory or hang a client forever."
how_it_works:
  - "A node receives a client request that needs agreement from other nodes before it can respond."
  - "It sends the work to the other nodes asynchronously and adds an entry to the waiting list, keyed on a correlation id or a log index, with a callback."
  - "Responses from other nodes come back out of order and the node looks up the matching entry by key."
  - "The callback counts responses and, once a quorum is reached, completes the client request and removes the entry."
  - "A background timeout expires entries that never gather enough responses, failing those requests cleanly."
real_world:
  - "Raft and etcd hold client proposals until the log entry they created is committed by a majority, then answer the caller."
  - "The Kafka producer keeps produce requests pending until the required acks arrive from the in-sync replicas."
  - "A Cassandra or Dynamo-style coordinator waits for a read or write [quorum](/glossary/quorum/) of replica responses before replying to the client."
related_terms: ["quorum", "high-watermark", "replicated-log", "consensus", "idempotent-receiver", "correlation-id", "heartbeat"]
related_posts:
  - "/distributed-systems/request-waiting-list/"
  - "/distributed-systems/request-pipeline/"
  - "/distributed-systems/replicated-log/"
  - "/distributed-systems/majority-quorum/"
---
