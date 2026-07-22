---
title: "Load Balancing"
slug: "load-balancing"
also-known-as: ["Load Balancer", "Traffic Distribution"]
category: "system-design"
date: 2026-07-03
definition: "Load balancing spreads incoming requests across a pool of servers so no single machine gets overwhelmed. A load balancer sits in front of the servers, checks which ones are healthy, and routes each request to one of them. This is how a service scales horizontally and stays available when a server dies."
key_takeaways:
  - "A load balancer turns many servers into one address. Clients talk to it, and it decides which backend actually handles the request."
  - "Layer 4 balancing routes by IP and port and is fast. Layer 7 balancing reads the request and can route by URL, header, or cookie."
  - "Health checks and [heartbeats](/glossary/heartbeat/) let the balancer stop sending traffic to a dead or slow server."
  - "Common algorithms are round robin, least connections, and hashing. Hashing with [consistent hashing](/glossary/consistent-hashing/) keeps a client on the same server for sticky sessions."
how_it_works:
  - "Clients send requests to the load balancer's address instead of any single server."
  - "The balancer keeps a list of healthy backends, updated by periodic health checks."
  - "For each request it picks a backend using an algorithm like round robin or least connections."
  - "If a backend fails a health check, it is dropped from the pool until it recovers, so users never hit it."
real_world:
  - "AWS Elastic Load Balancing, Google Cloud Load Balancing, and Azure Load Balancer run this at cloud scale."
  - "NGINX and HAProxy are widely used software load balancers, often paired with [rate limiting](/glossary/rate-limiting/)."
  - "Cloudflare and other CDNs balance traffic across data centers using anycast and DNS."
related_terms: ["rate-limiting", "consistent-hashing", "circuit-breaker", "microservices", "heartbeat", "cdn", "ddos-attack"]
related_posts:
  - "/how-cloudflare-supports-55-million-requests-per-second/"
  - "/how-uber-finds-nearby-drivers-1-million-requests-per-second/"
  - "/system-design-cheat-sheet/"
---
