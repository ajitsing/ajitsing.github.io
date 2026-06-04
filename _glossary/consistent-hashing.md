---
title: "Consistent Hashing"
slug: "consistent-hashing"
also-known-as: ["Hash Ring", "Ring Hashing"]
category: "system-design"
date: 2026-06-04
definition: "Consistent hashing maps both servers and keys onto a circular hash ring, and each key is owned by the next server clockwise. Its key property is that adding or removing a server moves only about K/N keys (K keys over N servers) instead of remapping everything, which is what plain modulo hashing would do. Virtual nodes place each physical server at many ring positions to even out the distribution."
key_takeaways:
  - "Consistent hashing minimises reshuffling: a node change moves roughly K/N keys, not the whole keyspace."
  - "It is the standard way to spread keys across a dynamic set of cache or [sharding](/glossary/sharding/) nodes."
  - "Virtual nodes give each server multiple ring positions so load stays balanced and no single node gets a hot arc."
  - "It avoids the mass cache invalidation that modulo-based hashing causes whenever the node count changes."
how_it_works:
  - "Hash each server (and its virtual nodes) to positions on a ring from 0 to 2^32-1."
  - "Hash each key to a position on the same ring."
  - "Assign the key to the first server found clockwise from the key's position."
  - "When a server joins or leaves, only the keys in its arc move; the rest stay put."
real_world:
  - "Amazon DynamoDB and Apache Cassandra place data on a consistent hash ring with virtual nodes."
  - "Memcached client libraries and many CDNs use it to route keys to nodes."
  - "Discord and many proxy layers use it for sticky, balanced routing."
related_terms: ["sharding", "quorum", "caching", "gossip-protocol"]
related_posts:
  - "/consistent-hashing-explained/"
---
