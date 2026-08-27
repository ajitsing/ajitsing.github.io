---
title: "Cuckoo Filter"
slug: "cuckoo-filter"
also-known-as: ["Cuckoo Membership Filter"]
category: "data-structures"
date: 2026-08-27
definition: "A cuckoo filter is a probabilistic data structure for approximate set membership. It stores a short fingerprint of each item, not the item itself, in a compact hash table of buckets built on cuckoo hashing. Like a Bloom filter it has no false negatives and a tunable false positive rate, but unlike a standard Bloom filter it supports deletion, reads only two buckets per lookup, and uses less space when the target false positive rate is below about 3%."
key_takeaways:
  - "A cuckoo filter answers 'is this item in the set?' using short fingerprints instead of storing the items."
  - "It supports native deletion, which a standard [Bloom filter](/data-structures/bloom-filter/) cannot do without counters or a rebuild."
  - "A lookup checks only two candidate buckets, giving fast, cache-friendly reads even at ~95% load."
  - "It beats space-optimized Bloom filters on memory when the target false positive rate is below roughly 3%."
  - "Inserts can fail near full, and you must only delete items you actually inserted."
how_it_works:
  - "Each item gets a short fingerprint and two candidate buckets via partial-key cuckoo hashing (i2 = i1 XOR hash(fingerprint))."
  - "Insert places the fingerprint in a free candidate bucket, or evicts and relocates existing fingerprints along a cuckoo chain."
  - "Lookup reads both candidate buckets and reports 'probably present' if the fingerprint matches, else 'definitely absent'."
  - "Delete removes one matching fingerprint from either candidate bucket, with no counters or tombstones."
real_world:
  - "RedisBloom ships a cuckoo filter type (CF.ADD, CF.EXISTS, CF.DEL)."
  - "LSM-tree storage engines use membership filters to skip disk reads for missing keys."
  - "Deduplication and caching systems use it when entries must be removed as data expires."
related_terms: ["cuckoo-hashing", "lsm-tree", "data-deduplication", "database-index", "caching"]
related_posts:
  - "/data-structures/cuckoo-filter/"
  - "/data-structures/bloom-filter/"
  - "/data-structures/count-min-sketch/"
---
