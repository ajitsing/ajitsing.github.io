---
title: "Modular Monolith"
slug: "modular-monolith"
also-known-as: ["Modulith"]
category: "system-design"
date: 2026-06-04
definition: "A modular monolith is a single deployable application split into well-defined modules that talk to each other only through explicit interfaces, never by reaching into each other's internals. It keeps the simplicity of a monolith (one deploy, in-process calls, no network hops) while borrowing the clear boundaries and team autonomy of microservices. Because the seams are clean, individual modules can later be extracted into services if they really need to be."
key_takeaways:
  - "It is one deployable unit with strong internal module boundaries enforced through explicit interfaces."
  - "You get monolith simplicity, single deploy and in-process calls, with microservice-style separation of concerns."
  - "It avoids the operational tax of microservices: no network latency, distributed transactions, or service mesh on day one."
  - "Clean boundaries make it straightforward to extract a module into its own service later when scale demands it."
how_it_works:
  - "The codebase is divided into modules, each owning its data and exposing a narrow public interface."
  - "Modules call each other only through those interfaces, not by touching internal classes or tables."
  - "Everything is built and deployed together as a single artifact."
  - "When a module needs independent scaling or ownership, its clean interface lets it be split out into a service."
real_world:
  - "Shopify and GitHub run large modular monoliths rather than sprawling microservices."
  - "Frameworks like Spring Modulith and .NET's module conventions help enforce boundaries."
  - "It is a common, pragmatic middle ground between a big ball of mud and premature microservices."
related_terms: ["cqrs", "message-queue", "saga-pattern"]
related_posts:
  - "/modular-monolith-architecture/"
---
