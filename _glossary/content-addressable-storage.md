---
title: "Content-Addressable Storage"
slug: "content-addressable-storage"
also-known-as: ["CAS", "Content-Addressed Storage", "Content Addressing"]
category: "system-design"
date: 2026-08-20
definition: "Content-addressable storage names each piece of data by a hash of its contents instead of by a location or path. To store a block you hash its bytes and use that hash as the key; to fetch it you look it up by the same hash. Because the name is derived from the data, identical data always gets the same key, which makes deduplication automatic and turns the address into a built-in integrity check."
key_takeaways:
  - "The address of a block is the hash of its contents, so the same bytes always map to the same key."
  - "This gives automatic [deduplication](/glossary/data-deduplication/): duplicate data resolves to one key and is stored once."
  - "The hash doubles as an integrity check. Re-hash on read and compare to detect corruption."
  - "Content-addressed blocks are immutable, which makes them safe to cache and replicate indefinitely."
how_it_works:
  - "Hash a block's bytes with a strong function such as SHA-256 to produce its key."
  - "Store the block under that key; if the key already exists, there is nothing to write."
  - "Readers request a block by its hash and can verify the returned bytes by re-hashing them."
  - "Because a given key always maps to the same bytes, the data is effectively immutable."
real_world:
  - "Git names every blob, tree, and commit by the hash of its contents."
  - "Dropbox stores file chunks keyed by their content hash to deduplicate across files and versions."
  - "Container registries and IPFS address image layers and files by content hash."
related_terms: ["data-deduplication", "delta-sync", "caching", "cdn"]
related_posts:
  - "/dropbox-system-design/"
  - "/how-git-stores-data-internally/"
  - "/how-amazon-s3-works/"
---
