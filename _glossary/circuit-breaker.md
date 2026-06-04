---
title: "Circuit Breaker"
slug: "circuit-breaker"
also-known-as: ["Circuit Breaker Pattern"]
category: "system-design"
date: 2026-06-04
definition: "The circuit breaker pattern stops cascading failures by wrapping calls to a flaky dependency. It has three states: closed (calls pass through), open (calls fail fast without touching the service), and half-open (a few trial calls test recovery). When failures cross a threshold the breaker trips open, giving the struggling service room to recover instead of being buried under more requests and retries."
key_takeaways:
  - "A circuit breaker fails fast when a dependency is unhealthy, so callers do not pile on and turn one slow service into a system-wide outage."
  - "Three states: closed (normal), open (reject immediately), half-open (probe to see if it recovered)."
  - "It pairs naturally with timeouts, retries with backoff, bulkheads, and fallbacks for full fault tolerance."
  - "Without it, a single slow downstream can exhaust threads and connections upstream, the classic cascading failure."
how_it_works:
  - "The breaker counts failures and timeouts on calls to a dependency."
  - "When the failure rate crosses a threshold, it trips to open and short-circuits further calls for a cooldown period."
  - "After the cooldown it moves to half-open and lets a few trial requests through."
  - "If the trials succeed it closes again; if they fail it reopens and waits longer."
real_world:
  - "Netflix Hystrix popularised the pattern; Resilience4j is the common modern Java implementation."
  - "Service meshes like Istio and Envoy provide circuit breaking at the network layer."
  - "It is a staple of microservice resilience alongside [retries and rate limiting](/glossary/rate-limiting/)."
related_terms: ["thundering-herd", "rate-limiting", "heartbeat", "saga-pattern"]
related_posts:
  - "/circuit-breaker-pattern/"
  - "/thundering-herd-problem/"
---
