---
title: "Microservices"
slug: "microservices"
also-known-as: ["Microservice Architecture", "Service Oriented Architecture"]
category: "system-design"
date: 2026-07-03
definition: "Microservices is an architecture that splits an application into small, independently deployable services, each owning one business capability and its own data. Services talk over the network through APIs or a [message queue](/glossary/message-queue/), so teams can build, deploy, and scale each one on its own instead of shipping one big monolith."
key_takeaways:
  - "Each service is deployed and scaled on its own. A traffic spike in one area does not force you to scale everything."
  - "The cost is distributed systems complexity: network calls, partial failures, and data spread across many stores."
  - "A transaction across services cannot use one database transaction, so you reach for the [saga pattern](/glossary/saga-pattern/) instead."
  - "Most teams should start with a [modular monolith](/glossary/modular-monolith/) and split out services only when the boundaries and the pain are clear."
how_it_works:
  - "The domain is broken into services along business capabilities, like payments, search, or notifications."
  - "Each service owns its data and exposes an API, often behind a [load balancer](/glossary/load-balancing/) and gateway."
  - "Services communicate synchronously over HTTP or gRPC, or asynchronously through a [message queue](/glossary/message-queue/)."
  - "Cross-service workflows use choreography or orchestration with sagas to keep data eventually consistent."
real_world:
  - "Netflix, Amazon, and Uber run thousands of microservices behind API gateways and service meshes."
  - "Shopify and others keep a large modular core and peel off services only where it pays off."
  - "Kubernetes has become the default platform for deploying and scaling microservices."
related_terms: ["modular-monolith", "message-queue", "saga-pattern", "cqrs", "load-balancing", "circuit-breaker"]
related_posts:
  - "/modular-monolith-architecture/"
  - "/saga-pattern-distributed-transactions/"
  - "/role-of-queues-in-system-design/"
---
