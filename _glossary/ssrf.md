---
title: "Server-Side Request Forgery"
slug: "ssrf"
also-known-as: ["SSRF", "Server side request forgery"]
category: "security"
date: 2026-10-09
definition: "Server-side request forgery is a bug where an attacker picks a URL and your server fetches it. The request comes from the server, so it can reach hosts the attacker cannot reach directly: internal admin panels, cloud metadata, a package registry, or the public internet from inside a network that was supposed to be closed. The impact is whatever that server is allowed to see. A fetch helper with broad network access turns one URL parameter into a tunnel."
key_takeaways:
  - "The danger is the server's network position, not the attacker's. A request from inside the VPC is trusted by things that would ignore the same request from the internet."
  - "Allowlist the hosts a server may fetch. A blocklist of obvious internal names gets bypassed by redirects, DNS tricks, and new hostnames."
  - "Cloud instance metadata and internal admin ports are the usual high value targets. Block them at the network, not only in application code."
  - "Any proxy, webhook preview, file importer, or package cache that fetches a URL you do not fully control is in this class."
how_it_works:
  - "The application accepts a URL, host, or path from a user, a file, or a model and asks an HTTP client to retrieve it."
  - "The client runs with the server's routes and credentials, so the response can include internal data the caller should never see."
  - "Redirects and DNS rebinding can move a request that started on an allowlisted host to somewhere else after the check."
  - "Defenders restrict egress, resolve and pin the destination, and refuse redirects onto addresses the caller could not have opened themselves."
real_world:
  - "Webhook testers, link preview bots, and PDF renderers are common SSRF surfaces because their job is to fetch a URL a user supplied."
  - "Cloud metadata endpoints sit on a link local address. A workload that can fetch that address often receives short lived cloud credentials."
  - "In the [OpenAI Hugging Face incident](/openai-hugging-face-incident/), sandboxed agents could not open the internet directly. They caused a package proxy, which was allowed to fetch packages, to send requests for them. The proxy became the exit."
related_terms: ["least-privilege", "reward-hacking", "rate-limiting"]
related_posts:
  - "/openai-hugging-face-incident/"
  - "/prompt-injection-explained/"
  - "/ddos-attack-and-protection/"
---
