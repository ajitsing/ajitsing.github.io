---
title: "TTL"
slug: "ttl"
also-known-as: ["Time To Live", "Expiry"]
category: "distributed-systems"
date: 2026-05-22
definition: "TTL stands for time to live. It is a length of time after which something like a [lease](/glossary/lease/), a cache entry, a DNS record, or a token is treated as expired and can be removed or refreshed. TTL is how distributed systems answer the question of how long to trust a piece of data without checking with the source on every read."
key_takeaways:
  - "TTL is the difference between fast caching and correct caching. Too long and you serve stale data. Too short and you hammer the source."
  - "In coordination, TTL is the safety net that turns a plain lock into a [lease](/glossary/lease/) that cannot get stuck forever."
  - "DNS TTLs decide how fast DNS changes spread across resolvers. Short TTLs mean quick updates but more traffic to the authoritative servers."
  - "Always measure TTL against a monotonic clock. Wall clocks can jump back and cause expiry bugs."
how_it_works:
  - "When a record is created or refreshed, it gets a stamp of expiration time equal to now plus the TTL."
  - "On a read, the system compares now to the expiration. Anything past it is treated as missing or stale."
  - "For leases and locks, the TTL is renewed by [heartbeats](/glossary/heartbeat/) before it runs out."
  - "Expired records are cleaned up by a background sweeper, on the next read, or by the consistent core itself, like etcd or ZooKeeper."
real_world:
  - "DNS A records carry a TTL that controls how long resolvers cache them."
  - "Redis EXPIRE and SETEX commands set a TTL for cache invalidation."
  - "etcd lease grants take a TTL in seconds and auto delete keys when they are not renewed."
  - "Kubernetes lease objects use leaseDurationSeconds and renewTime to compute the effective expiry."
related_terms: ["lease", "heartbeat", "fencing-token"]
related_posts:
  - "/distributed-systems/lease/"
  - "/distributed-systems/heartbeat/"
---
