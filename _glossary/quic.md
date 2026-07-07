---
title: "QUIC"
slug: "quic"
also-known-as: ["HTTP/3 Transport", "Quick UDP Internet Connections"]
category: "system-design"
date: 2026-07-07
definition: "QUIC is a transport protocol built on top of UDP that powers HTTP/3. It bundles connection setup and TLS encryption into a single handshake, multiplexes many independent streams over one connection, and gives each stream its own delivery so a lost packet only stalls that one stream. That last property removes the transport-layer [head-of-line blocking](/glossary/head-of-line-blocking/) that limits HTTP/2 over TCP, and connection migration lets a session survive a network change."
key_takeaways:
  - "QUIC runs over UDP and is the transport underneath HTTP/3."
  - "Each stream is delivered independently, so one lost packet does not stall the others (no transport-layer head-of-line blocking)."
  - "It combines the transport and TLS handshakes, cutting connection setup to as little as one round trip, or zero on resumption."
  - "Connection migration keeps a session alive across network changes, such as Wi-Fi to cellular, using a connection ID instead of the IP and port."
how_it_works:
  - "A client opens a QUIC connection over UDP, negotiating transport parameters and TLS 1.3 keys in one handshake."
  - "Application data flows over multiple independent streams identified by stream IDs."
  - "Lost packets are retransmitted per stream, so unaffected streams keep delivering in order."
  - "A stable connection ID lets the connection move to a new IP address without a fresh handshake."
real_world:
  - "HTTP/3 uses QUIC, and major browsers and CDNs like Cloudflare and Google serve traffic over it."
  - "WebTransport is built on HTTP/3 and QUIC to offer low-latency, multiplexed client-server messaging."
  - "Video and real-time apps favour QUIC because a single dropped packet does not freeze every stream."
related_terms: ["head-of-line-blocking", "websocket", "server-sent-events", "cdn"]
related_posts:
  - "/how-webtransport-works/"
  - "/distributed-systems/request-pipeline/"
  - "/what-happens-when-you-type-url-in-browser/"
---
