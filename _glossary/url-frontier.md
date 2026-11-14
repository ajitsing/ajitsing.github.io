---
title: "URL Frontier"
slug: "url-frontier"
also-known-as: ["Crawl frontier", "URL queue"]
category: "system-design"
date: 2026-11-14
definition: "The URL frontier is the set of URLs a web crawler has discovered and not yet fetched, including URLs waiting for a later recrawl. It has to do two jobs that fight each other: fetch important pages first, and avoid sending many requests to the same host at once. The standard design uses front queues bucketed by priority and back queues bucketed by host, with a clock that says when each host may be contacted again."
key_takeaways:
  - "A single FIFO queue visits URLs in discovery order and will pile onto whichever host you happen to find first."
  - "Front queues express priority. Back queues express politeness. A router moves URLs from one to the other."
  - "One back queue per host, owned by one worker, makes the delay a local variable instead of a distributed lock."
  - "Most of the frontier lives on disk. Only the heads of the queues need to sit in memory."
how_it_works:
  - "A discovered URL is scored and appended to the front queue for its priority."
  - "A router drains front queues, preferring higher priorities, and appends each URL to the back queue for its host."
  - "The scheduler pops a URL only from a back queue whose next-allowed time has arrived."
  - "After the fetch, that host's next-allowed time moves forward by the politeness delay."
real_world:
  - "Mercator gave each worker thread one FIFO subqueue and placed URLs by canonical hostname, so one thread at most talked to a given server."
  - "A disk frontier with in-memory buffers is how crawlers hold hundreds of millions of pending URLs without a RAM-sized queue."
  - "Recrawl is the same frontier: a URL re-enters a front queue when its next fetch time arrives."
related_terms: ["web-crawler", "robots-txt", "rate-limiting", "message-queue", "consistent-hashing"]
related_posts:
  - "/web-crawler-system-design/"
  - "/role-of-queues-in-system-design/"
  - "/dynamic-rate-limiter-system-design/"
---
