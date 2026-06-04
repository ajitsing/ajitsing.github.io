---
title: "Thundering Herd"
slug: "thundering-herd"
also-known-as: ["Cache Stampede", "Dogpile Effect"]
category: "system-design"
date: 2026-06-04
definition: "The thundering herd problem happens when many requests hit the same backend resource at the same instant, typically right after a popular [cache](/glossary/caching/) key expires. Every request sees the miss, every one queries the database together, and the sudden spike can take the database down. Fixes spread or collapse that simultaneous load rather than letting it all land at once."
key_takeaways:
  - "It is the spike that follows a synchronised event, classically a hot cache key expiring for everyone at the same moment."
  - "Adding random jitter to TTLs stops many keys from expiring together."
  - "Request coalescing (singleflight) lets one request rebuild the value while the rest wait for it."
  - "Distributed locks with stale-data fallback or probabilistic early recomputation also tame the herd."
how_it_works:
  - "A widely-read cache entry expires, so the next wave of requests all miss at once."
  - "Without protection, every missed request independently hits the database to recompute the value."
  - "The database sees a sudden burst far above its steady load and can stall or crash."
  - "Mitigations either spread the misses out (jitter) or collapse them into a single recompute (coalescing, locks)."
real_world:
  - "Go's singleflight package coalesces duplicate in-flight calls for the same key."
  - "CDNs use request collapsing so one origin fetch serves many waiting clients."
  - "Pairing a [circuit breaker](/glossary/circuit-breaker/) and [rate limiting](/glossary/rate-limiting/) protects the backend during a stampede."
related_terms: ["caching", "circuit-breaker", "rate-limiting", "lease"]
related_posts:
  - "/thundering-herd-problem/"
  - "/caching-strategies-explained/"
---
