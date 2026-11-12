---
title: "Anycast"
slug: "anycast"
also-known-as: ["Anycast Routing", "Anycast IP"]
category: "system-design"
date: 2026-11-10
definition: "Anycast gives one IP address to many machines in many places. Each site announces that same prefix with BGP, and routers deliver each packet to the closest announcement by their routing metrics. It is how CDNs and public DNS spread users across cities without asking the client to pick a server. Anycast chooses a location. A normal load balancer inside that location still chooses a machine."
key_takeaways:
  - "Anycast announces the same IP prefix from many sites. BGP, not DNS, picks which site receives the packet."
  - "Failover is a route withdrawal. Stop announcing from a bad site and new packets flow to the next closest one."
  - "It is an ingress technique. A reply to a connection opened from an anycast address can land at the wrong site."
  - "Anycast balances cities. You still need [load balancing](/glossary/load-balancing/) inside the site to balance servers."
how_it_works:
  - "Each site announces the same IP prefix to its upstream providers with BGP."
  - "Internet routers forward a packet along the preferred path, usually toward the nearest announcement."
  - "If a site withdraws the prefix, routers converge on the next-best announcement."
  - "Inside the chosen site, a local balancer spreads traffic across servers."
real_world:
  - "Cloudflare answers user traffic on anycast ranges, and uses ordinary unicast addresses when its servers open connections out to the internet."
  - "Public DNS has used anycast for years, because a short UDP query has little session to pin to one machine."
  - "A [CDN](/glossary/cdn/) uses anycast to land a user on a nearby edge, then a local balancer and cache take over. The same spread helps absorb a [DDoS attack](/glossary/ddos-attack/)."
related_terms: ["load-balancing", "cdn", "ddos-attack", "consistent-hashing"]
related_posts:
  - "/load-balancing-explained/"
  - "/cdn-system-design/"
  - "/ddos-attack-and-protection/"
  - "/how-cloudflare-supports-55-million-requests-per-second/"
---
