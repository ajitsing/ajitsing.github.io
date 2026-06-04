---
title: "Caching"
slug: "caching"
also-known-as: ["Cache", "Caching Strategies"]
category: "system-design"
date: 2026-06-04
definition: "Caching keeps a copy of expensive-to-fetch data in a fast store so most reads avoid the slow source. The main strategies differ in who fills the cache and when: cache-aside (the app loads on a miss), read-through (the cache loads on a miss), write-through (write to cache and store together), write-behind (write to cache, flush to store later), and write-around (write straight to the store). The hard parts are eviction and invalidation, keeping the cache fresh enough without serving stale data."
key_takeaways:
  - "Cache-aside is the most common pattern: the application reads the cache, falls back to the database on a miss, and populates the cache."
  - "Write-through keeps cache and store in sync on every write; write-behind is faster but risks losing buffered writes."
  - "Eviction (usually LRU) bounds memory; invalidation keeps entries from going stale, and getting it wrong is a classic bug."
  - "An expiring hot key can trigger a [thundering herd](/glossary/thundering-herd/), so add jitter or request coalescing."
how_it_works:
  - "On a read, check the cache first; a hit returns immediately from fast memory."
  - "On a miss, load from the source, return it, and store it in the cache with a TTL."
  - "On a write, update or invalidate the cached entry according to the chosen strategy."
  - "Evict entries with a policy like LRU when the cache is full."
real_world:
  - "Redis and Memcached are the default in-memory caches for web backends."
  - "CDNs cache static assets and responses close to users at the edge."
  - "Read replicas and materialised views are database-level caching of query results."
related_terms: ["thundering-herd", "consistent-hashing", "eventual-consistency", "cqrs"]
related_posts:
  - "/caching-strategies-explained/"
  - "/meta-cache-consistency/"
---
