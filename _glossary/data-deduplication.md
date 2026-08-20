---
title: "Data Deduplication"
slug: "data-deduplication"
also-known-as: ["Dedup", "Deduplication", "Single-Instance Storage"]
category: "system-design"
date: 2026-08-20
definition: "Data deduplication stores only one physical copy of identical data, no matter how many times it appears. Systems split data into chunks, fingerprint each chunk with a content hash, and before writing a chunk they check whether that hash already exists. If it does, they simply reference the existing block instead of storing it again. This cuts both storage cost and, when done on the client, upload bandwidth."
key_takeaways:
  - "Deduplication stores duplicate data once and references it many times, saving storage and bandwidth."
  - "It falls out naturally from [content-addressable storage](/glossary/content-addressable-storage/), where chunks are keyed by content hash."
  - "Chunk-level dedup beats file-level dedup because files that share parts still share blocks."
  - "Global (cross-user) dedup saves the most but raises privacy and side-channel concerns, so many systems scope it per account."
how_it_works:
  - "Split incoming data into chunks, either fixed-size or content-defined."
  - "Hash each chunk to get a fingerprint that identifies it by content."
  - "Look up the fingerprint; if the chunk already exists, store only a reference to it."
  - "Otherwise store the chunk once and record its fingerprint for future lookups."
real_world:
  - "Dropbox and similar sync services skip uploading chunks they already hold."
  - "Backup systems like restic and Borg dedup chunks across every snapshot."
  - "Storage arrays and filesystems such as ZFS offer inline block-level deduplication."
related_terms: ["content-addressable-storage", "delta-sync", "caching"]
related_posts:
  - "/dropbox-system-design/"
  - "/how-amazon-s3-works/"
---
