---
title: "Long Polling"
slug: "long-polling"
also-known-as: ["HTTP Long Polling"]
category: "system-design"
date: 2026-06-04
definition: "Long polling is a way to push updates to a client over plain HTTP. The client sends a request and the server holds the connection open until it has data or hits a timeout, then responds; the client immediately reconnects and waits again. It works everywhere HTTP works, including through restrictive firewalls and proxies, which makes it a solid fallback when WebSockets or [server-sent events](/glossary/server-sent-events/) are not available."
key_takeaways:
  - "The server holds the request open until data is ready, so the client gets updates without constant polling."
  - "It works anywhere HTTP does, even through proxies and firewalls that block WebSockets."
  - "Each cycle is a fresh HTTP request, so it carries more header overhead than a persistent connection."
  - "Best for infrequent updates (less than one per second) or serverless platforms where holding sockets is hard."
how_it_works:
  - "The client sends an HTTP request asking for new data."
  - "The server holds the request open instead of replying immediately."
  - "When data arrives or a timeout is reached, the server responds."
  - "The client processes the response and immediately opens a new request to keep listening."
real_world:
  - "Many chat and notification systems fall back to long polling when WebSockets are blocked."
  - "Older real-time libraries like the early Socket.IO transports used long polling under the hood."
  - "It is common on serverless stacks where long-lived socket connections are impractical."
related_terms: ["server-sent-events", "message-queue", "heartbeat"]
related_posts:
  - "/long-polling-explained/"
  - "/server-sent-events-explained/"
---
