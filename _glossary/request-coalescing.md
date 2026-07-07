---
title: "Request Coalescing"
slug: "request-coalescing"
also-known-as: ["Request Collapsing", "Singleflight", "In-flight Deduplication"]
category: "system-design"
date: 2026-07-07
definition: "Request coalescing collapses many identical in-flight requests into a single backend call, then shares that one result with all the waiters. When several requests ask for the same thing at the same moment, only the first does the real work while the rest wait for its answer. It is a core defence against the [thundering herd](/glossary/thundering-herd/) problem, keeping a hot [cache](/glossary/caching/) miss or popular key from turning into a flood of duplicate database queries."
key_takeaways:
  - "Duplicate concurrent requests for the same key are merged into one backend call whose result is shared."
  - "It directly tames the thundering herd that follows a hot cache key expiring for everyone at once."
  - "Only the first caller does the work; the rest block briefly and receive the same computed value."
  - "It differs from caching: coalescing dedupes work that is happening right now, while caching reuses a value already computed."
how_it_works:
  - "A request arrives for a key and the system checks whether a call for that key is already in flight."
  - "If none exists, it starts the work and registers the in-flight call."
  - "Any further requests for the same key attach to the existing call instead of starting their own."
  - "When the call finishes, its result is handed to every waiter and the in-flight entry is cleared."
real_world:
  - "Go's singleflight package coalesces duplicate concurrent calls for the same key."
  - "CDNs use request collapsing so one origin fetch serves many waiting clients during a cache miss."
  - "Cache layers pair coalescing with [TTL](/glossary/ttl/) jitter to smooth load after popular keys expire."
related_terms: ["thundering-herd", "caching", "cdn", "rate-limiting"]
related_posts:
  - "/thundering-herd-problem/"
  - "/caching-strategies-explained/"
  - "/cdn-system-design/"
---
