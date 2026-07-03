---
title: "WebSocket"
slug: "websocket"
also-known-as: ["WebSockets", "WS Protocol"]
category: "system-design"
date: 2026-07-03
definition: "A WebSocket is a persistent, full-duplex connection between a client and a server over a single TCP connection. After an HTTP handshake upgrades the connection, both sides can send messages at any time without opening new requests. This makes it the standard choice for real-time apps like chat, live dashboards, multiplayer games, and collaborative editors."
key_takeaways:
  - "Unlike normal HTTP, a WebSocket stays open, so the server can push data to the client instantly without polling."
  - "It is full duplex. Client and server can both send at once, which HTTP request-response cannot do."
  - "Compared to [long polling](/glossary/long-polling/) and [server-sent events](/glossary/server-sent-events/), WebSockets add bidirectional messaging at the cost of more connection state to manage."
  - "Millions of open connections need careful capacity planning, sticky routing, and a way to fan messages out across servers."
how_it_works:
  - "The client sends an HTTP request with an Upgrade header asking to switch to the WebSocket protocol."
  - "The server agrees, and the same TCP connection is now a two-way message channel."
  - "Either side sends framed messages until one closes the connection or a heartbeat ping fails."
  - "At scale, a [pub/sub](/glossary/pub-sub/) layer routes a message to whichever server holds the target client's socket."
real_world:
  - "Slack, Discord, and WhatsApp Web keep a WebSocket open for instant message delivery."
  - "Google Docs and Figma use persistent connections to sync edits between collaborators in real time."
  - "Trading and betting platforms push live prices to browsers over WebSockets."
related_terms: ["long-polling", "server-sent-events", "message-queue", "pub-sub"]
related_posts:
  - "/server-sent-events-explained/"
  - "/long-polling-explained/"
  - "/slack-system-design/"
---
