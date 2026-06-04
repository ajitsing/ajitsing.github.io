---
title: "Rate Limiting"
slug: "rate-limiting"
also-known-as: ["Rate Limiter", "Throttling"]
category: "system-design"
date: 2026-06-04
definition: "Rate limiting caps how many requests a client can make in a window of time, protecting a service from overload, abuse, and runaway costs. The common algorithms are the token bucket, which allows short bursts and refills steadily, and the leaky bucket, which enforces a constant output rate. When a client goes over the limit the server returns HTTP 429 with `Retry-After` so a well-behaved client can back off."
key_takeaways:
  - "Rate limiting protects a backend from being swamped by one noisy client, a retry storm, or a denial-of-service attempt."
  - "Token bucket allows bursts and refills steadily; leaky bucket smooths traffic to a constant rate."
  - "In a distributed setup the counter must be shared, usually in Redis with INCR plus a TTL or an atomic Lua script."
  - "Return HTTP 429 with X-RateLimit-* headers and Retry-After so clients can throttle themselves instead of hammering you."
how_it_works:
  - "Choose the limit and window, for example 100 requests per minute per API key."
  - "On each request, atomically increment the client's counter in a shared store and check it against the limit."
  - "If the request is under the limit, allow it; otherwise reject with HTTP 429 and a Retry-After hint."
  - "Counters expire at the end of the window (token bucket refills over time) so the budget resets."
real_world:
  - "Cloudflare, Stripe, and GitHub all expose rate limits with X-RateLimit headers on their APIs."
  - "NGINX and Envoy ship built-in rate limiting at the proxy layer."
  - "Redis is the standard backing store for distributed limiters because INCR and EXPIRE are atomic and fast."
related_terms: ["thundering-herd", "circuit-breaker", "caching", "message-queue"]
related_posts:
  - "/dynamic-rate-limiter-system-design/"
  - "/thundering-herd-problem/"
---
