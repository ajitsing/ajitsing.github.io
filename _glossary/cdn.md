---
title: "Content Delivery Network (CDN)"
slug: "cdn"
also-known-as: ["CDN", "Edge Network", "Content Distribution Network"]
category: "system-design"
date: 2026-07-03
definition: "A content delivery network is a global fleet of edge servers that cache content close to users. When someone requests a file, the CDN serves it from a nearby edge instead of the far away origin, which cuts latency, absorbs traffic spikes, and shields the origin from load. CDNs handle static assets, and increasingly dynamic content and APIs too."
key_takeaways:
  - "A CDN moves content near the user. Shorter distance means lower latency and fewer round trips."
  - "It offloads the origin. Most requests are served from the edge [cache](/glossary/caching/), so the origin sees only misses."
  - "Cache invalidation and TTLs are the hard part. Stale content at the edge is the most common CDN bug."
  - "CDNs route users to the nearest edge with anycast and DNS, which is a form of geographic [load balancing](/glossary/load-balancing/)."
how_it_works:
  - "Content is replicated to edge locations, or pulled and cached on the first request (pull CDN)."
  - "A user's request is routed to the nearest edge using anycast routing or DNS."
  - "On a cache hit the edge serves the content directly. On a miss it fetches from the origin, caches it, then serves it."
  - "TTLs and purge APIs control how long content lives at the edge before it is refreshed."
real_world:
  - "Akamai, Cloudflare, Amazon CloudFront, and Fastly are the major CDN providers."
  - "The original [consistent hashing](/glossary/consistent-hashing/) work at MIT was motivated by CDN caching for Akamai."
  - "Netflix runs its own CDN, Open Connect, placing appliances inside ISP networks to stream video."
related_terms: ["caching", "load-balancing", "consistent-hashing", "eventual-consistency", "thundering-herd"]
related_posts:
  - "/cdn-system-design/"
  - "/caching-strategies-explained/"
  - "/how-cloudflare-supports-55-million-requests-per-second/"
---
