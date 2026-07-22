---
title: "DDoS Attack"
slug: "ddos-attack"
also-known-as: ["Distributed Denial of Service", "DDoS", "Distributed DoS"]
category: "security"
date: 2026-07-22
definition: "A distributed denial-of-service (DDoS) attack floods a website, server, or network with fake traffic from many machines at once so real users cannot get through. Because the traffic comes from thousands of sources, usually a botnet of hijacked devices, you cannot simply block one IP. Attacks target the network layer with raw bandwidth, or the application layer with expensive requests, and defense relies on absorbing, filtering, and rate limiting the flood before it reaches the origin."
key_takeaways:
  - "DDoS is a denial-of-service attack from many sources at once, so blocking a single IP does not help."
  - "Volumetric and protocol attacks (layers 3 and 4) drown the pipe; application-layer attacks (layer 7) exhaust the app with realistic requests."
  - "Most attacks are powered by a botnet of compromised devices, often IoT gadgets and routers."
  - "Defense mixes overprovisioning, a CDN and scrubbing centers, anycast, rate limiting, and a web application firewall."
how_it_works:
  - "An attacker builds or rents a botnet of thousands of infected machines."
  - "On command, every bot sends traffic to the target at the same time, sometimes amplified through open DNS or NTP servers."
  - "The target's bandwidth, connection table, or application threads fill up with junk, leaving nothing for real users."
  - "Mitigation reroutes traffic through scrubbing infrastructure that drops attack packets and forwards only clean requests."
real_world:
  - "Cloudflare mitigated a record 31.4 Tbps DDoS attack in late 2025, powered by the Aisuru-Kimwolf botnet of infected devices."
  - "The 2016 Mirai botnet took down DNS provider Dyn, knocking Twitter, Reddit, and Netflix offline."
  - "GitHub survived a 1.35 Tbps memcached amplification attack in 2018 by rerouting through Akamai Prolexic."
related_terms: ["botnet", "rate-limiting", "cdn", "load-balancing", "caching", "circuit-breaker"]
related_posts:
  - "/ddos-attack-and-protection/"
  - "/dynamic-rate-limiter-system-design/"
  - "/how-cloudflare-supports-55-million-requests-per-second/"
---
