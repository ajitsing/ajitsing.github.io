---
title: "Prompt Caching"
slug: "prompt-caching"
also-known-as: ["Prefix caching", "Context caching", "Cached input tokens"]
category: "ai"
date: 2026-10-07
definition: "Prompt caching stores a repeated prefix of an LLM request, such as a system prompt, tool list, or rules file, and bills later reads of that prefix at a discount. The provider processes the prefix once, then charges a cache read (often around 10% of the input price) when the next call starts with the same bytes. Only the new tail, like the latest user message or tool result, is processed at the full input rate. If the prefix changes, the cache misses and the next call pays full price again."
key_takeaways:
  - "A cache hit is a discount on input tokens, not a free request. Output tokens are still full price."
  - "The prefix has to be byte-for-byte stable. Editing the top of a rules file, or switching models, starts a new cache."
  - "Providers charge extra to write the cache (about 1.25× input for a 5-minute window, about 2× for an hour) and much less to read it."
  - "Coding agents benefit because every tool turn resends the same rules and tool definitions."
how_it_works:
  - "The API marks a leading portion of the prompt as cacheable, or the coding tool does this for you."
  - "The first request writes that prefix into a short-lived cache and pays a write multiplier."
  - "A later request with the same prefix pays the cache-read rate and refreshes the timer."
  - "When the time-to-live expires, or the prefix bytes change, the next request is a miss and pays to write again."
real_world:
  - "Claude Code caches the main conversation automatically. On a subscription it uses a longer cache window. On an API key the default is five minutes unless you set a longer TTL."
  - "Anthropic lists cache reads at $0.20 per million tokens on Sonnet 5.5 (10% of input) and on Opus 5.5 (5% of input)."
  - "Cursor's Auto Cost mode lists cache reads at $0.25 per million tokens, below its input rate, for the same reason: a stable thread should get cheaper on turn two."
related_terms: ["progressive-disclosure", "agent-skills"]
related_posts:
  - "/how-to-save-cost-on-ai-assisted-coding/"
  - "/context-engineering/"
  - "/how-llms-generate-text/"
  - "/how-to-use-cursor/"
---
