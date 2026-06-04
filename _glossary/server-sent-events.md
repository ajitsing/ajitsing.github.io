---
title: "Server-Sent Events"
slug: "server-sent-events"
also-known-as: ["SSE", "EventSource"]
category: "system-design"
date: 2026-06-04
definition: "Server-Sent Events (SSE) stream data one way, server to client, over a single long-lived HTTP connection using the `text/event-stream` content type. The browser's EventSource API handles the connection, auto-reconnects when it drops, and sends a Last-Event-ID header so the server can resume from where it left off. SSE is simpler than WebSockets when you only need server-to-client updates, not full duplex."
key_takeaways:
  - "SSE is one-way streaming from server to client over ordinary HTTP, no special protocol upgrade needed."
  - "The EventSource API auto-reconnects (default about 3 seconds) and replays from Last-Event-ID."
  - "It is simpler than WebSockets when you do not need the client to stream back."
  - "Because it is HTTP, it works with standard infrastructure, though some proxies buffer the stream."
how_it_works:
  - "The client opens an EventSource to a URL that responds with Content-Type text/event-stream."
  - "The server keeps the connection open and writes events as they happen, each as a small text frame."
  - "The client receives events through onmessage handlers as they arrive."
  - "If the connection drops, EventSource reconnects and sends Last-Event-ID so the server can resume."
real_world:
  - "Live dashboards, notification feeds, and sports scores commonly use SSE."
  - "Many LLM chat UIs stream tokens to the browser over SSE."
  - "When the client also needs to send a steady stream, teams reach for WebSockets instead."
related_terms: ["long-polling", "message-queue", "heartbeat"]
related_posts:
  - "/server-sent-events-explained/"
  - "/long-polling-explained/"
---
