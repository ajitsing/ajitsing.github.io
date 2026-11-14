---
title: "robots.txt"
slug: "robots-txt"
also-known-as: ["Robots Exclusion Protocol", "REP"]
category: "system-design"
date: 2026-11-14
definition: "robots.txt is a file at the root of a host that tells crawlers which URL paths they may fetch. A crawler downloads it, matches its own product token to a User-agent group, and applies the Allow and Disallow rules, with the longest matching path winning. The format is standardized in RFC 9309. A missing file (HTTP 4xx) means crawling is allowed. A server or network error means the crawler should assume nothing is allowed until it can read a fresh copy."
key_takeaways:
  - "robots.txt gates fetches. It is not a privacy control, and it does not remove a page from an index by itself."
  - "crawl-delay is not part of RFC 9309. Googlebot does not honor it. A polite crawler still keeps its own per host gap."
  - "Cache the file for about a day, and cache failures too, or a broken robots.txt becomes a request storm."
  - "The Sitemap line is widely supported, including by Google, and it is also outside the RFC."
how_it_works:
  - "The crawler requests /robots.txt on the host before it fetches other URLs there."
  - "It selects the group whose User-agent matches its product token, or the * group if nothing matches."
  - "For each candidate URL, the longest matching Allow or Disallow path wins."
  - "On a 5xx or a network error the crawler treats the host as disallowed and retries the file on a bounded schedule."
real_world:
  - "Googlebot caches robots.txt for up to about 24 hours, and on a 5xx it pauses, then falls back to the last good copy."
  - "Sites use Disallow to keep crawlers out of infinite filter URLs and other duplicate spaces that waste crawl budget."
  - "RFC 9309 expects the crawler's product token to appear in its HTTP User-Agent header."
related_terms: ["web-crawler", "url-frontier", "rate-limiting", "ttl", "caching"]
related_posts:
  - "/web-crawler-system-design/"
  - "/dynamic-rate-limiter-system-design/"
  - "/caching-strategies-explained/"
---
