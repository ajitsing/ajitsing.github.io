---
title: "Head-of-Line Blocking"
slug: "head-of-line-blocking"
also-known-as: ["HOL Blocking", "Line Blocking"]
category: "system-design"
date: 2026-07-07
definition: "Head-of-line blocking happens when the first item in a queue or ordered stream is stuck, so everything behind it must wait, even if those later items are ready. It shows up when responses on a connection must be returned in the order requests were sent: one slow request stalls all the fast ones queued behind it. It is the classic reason naive [HTTP pipelining](/distributed-systems/request-pipeline/) disappoints, and chasing it out of the stack is what drove HTTP/2 and HTTP/3."
key_takeaways:
  - "One stuck item at the front of an ordered queue blocks all the ready items behind it."
  - "It is why HTTP/1.1 pipelining failed: a slow response held up every response queued after it."
  - "HTTP/2 fixes the application layer by multiplexing independent streams over one connection."
  - "A lost packet still stalls all HTTP/2 streams at the TCP layer; HTTP/3 over [QUIC](/glossary/quic/) removes that by giving each stream independent delivery."
how_it_works:
  - "Requests share one ordered channel and responses must come back in request order."
  - "If the first request is slow, its response is not ready, so it sits at the head of the line."
  - "Later responses that finished quickly cannot be delivered until the head clears."
  - "Removing the ordering constraint (correlation IDs, independent streams) lets ready responses pass."
real_world:
  - "HTTP/1.1 pipelining shipped disabled in browsers because of head-of-line blocking."
  - "HTTP/2 multiplexes streams so one slow response no longer blocks the rest at the app layer."
  - "HTTP/3 over QUIC removes transport-layer head-of-line blocking caused by TCP packet loss."
related_terms: ["quic", "request-coalescing", "message-queue", "load-balancing"]
related_posts:
  - "/distributed-systems/request-pipeline/"
  - "/how-webtransport-works/"
  - "/rest-vs-graphql-vs-grpc/"
---
