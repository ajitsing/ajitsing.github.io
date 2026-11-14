---
title: "Web Crawler"
slug: "web-crawler"
also-known-as: ["Crawler", "Web spider", "Search engine crawler"]
category: "system-design"
date: 2026-11-14
definition: "A web crawler discovers URLs and downloads the documents behind them, starting from seeds and from the links it finds along the way. Its job is a fresh, polite, deduplicated corpus of pages, not search results. Ranking and querying happen later, in a separate index. At any serious size, the design is dominated by the URL frontier, per host politeness, and duplicate detection rather than by the HTTP fetch itself."
key_takeaways:
  - "A crawler builds a corpus. A scraper extracts fields. A search index answers queries. They are three different systems."
  - "Politeness is a correctness rule. One host must not receive a burst of fetches just because you added workers."
  - "Shard by hostname so robots.txt, the delay, and the queue for a host all live on one machine."
  - "Seen URLs and stored pages have to survive restarts, or the next deploy recrawls the world."
how_it_works:
  - "Seed URLs and sitemaps enter a frontier that orders work by priority and by host."
  - "A fetcher downloads a URL only when robots.txt allows it and the host's delay has elapsed."
  - "The parser extracts links, canonicalizes them, and drops ones the seen set already contains."
  - "Page bodies go to object storage. A queue notifies the indexer. The URL is scheduled again if it should stay fresh."
real_world:
  - "Googlebot crawls the public web under a crawl budget per hostname, and publishes how it reads robots.txt."
  - "Common Crawl stores fetches as WARC files that anyone can process later."
  - "Mercator, the classic research crawler, separated priority from per host politeness inside the URL frontier."
related_terms: ["url-frontier", "robots-txt", "rate-limiting", "consistent-hashing", "data-deduplication", "caching", "message-queue", "ssrf"]
related_posts:
  - "/web-crawler-system-design/"
  - "/data-structures/bloom-filter/"
  - "/consistent-hashing-explained/"
  - "/dynamic-rate-limiter-system-design/"
  - "/role-of-queues-in-system-design/"
---
