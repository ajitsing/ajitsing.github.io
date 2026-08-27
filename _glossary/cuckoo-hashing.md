---
title: "Cuckoo Hashing"
slug: "cuckoo-hashing"
also-known-as: ["Cuckoo Hash Table"]
category: "data-structures"
date: 2026-08-27
definition: "Cuckoo hashing is an open-addressing hash table scheme that gives every item two possible buckets chosen by two hash functions. On insertion, if both buckets are full, the item evicts an existing entry and takes its place, and the evicted entry is relocated to its own alternate bucket, repeating until a slot is free or a retry limit is hit. This keeps lookups to a constant two-bucket check while allowing very high table occupancy."
key_takeaways:
  - "Each item has two candidate buckets, so a lookup only ever checks two places."
  - "Inserts can trigger a chain of evictions and relocations, named after how a cuckoo bird displaces other eggs."
  - "Tables can be packed above 90% full, giving strong space efficiency."
  - "It is the foundation of the [cuckoo filter](/glossary/cuckoo-filter/), which stores fingerprints instead of full items."
how_it_works:
  - "Compute two candidate buckets for an item using two hash functions."
  - "If either bucket has a free slot, place the item there."
  - "If both are full, evict an existing entry, insert the new item, and move the evicted entry to its alternate bucket."
  - "Continue relocating along the chain until a slot opens or a maximum number of kicks is reached, signaling the table should grow."
real_world:
  - "Cuckoo filters use partial-key cuckoo hashing to relocate fingerprints without the original keys."
  - "Some in-memory hash tables and network data planes use cuckoo hashing for predictable lookup cost."
  - "Concurrent variants like MemC3 and libcuckoo power high-throughput caches."
related_terms: ["cuckoo-filter", "database-index"]
related_posts:
  - "/data-structures/cuckoo-filter/"
  - "/data-structures/hashtable-collisions/"
  - "/data-structures/bloom-filter/"
---
