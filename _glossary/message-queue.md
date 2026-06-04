---
title: "Message Queue"
slug: "message-queue"
also-known-as: ["Message Broker", "Queue"]
category: "system-design"
date: 2026-06-04
definition: "A message queue is middleware that lets services talk asynchronously by passing messages through a broker instead of calling each other directly. It decouples producers from consumers, absorbs traffic spikes by buffering, and enables background processing. Delivery is usually at-least-once, so consumers need to be [idempotent](/glossary/idempotent-receiver/), and failed messages are parked in a dead letter queue for later inspection."
key_takeaways:
  - "Queues decouple producers and consumers, smooth out spikes, and let slow work happen asynchronously."
  - "Point-to-point delivers a message to one consumer; pub/sub broadcasts it to every subscriber."
  - "Most brokers are at-least-once, so duplicates happen and consumers must be idempotent."
  - "Dead letter queues capture messages that repeatedly fail so they do not block the main flow."
how_it_works:
  - "A producer publishes a message to a queue or topic on the broker."
  - "The broker stores the message durably until a consumer is ready."
  - "A consumer pulls the message, processes it, and acknowledges it so the broker can drop it."
  - "If processing fails or is not acknowledged in time, the broker redelivers, and after repeated failures routes it to a dead letter queue."
real_world:
  - "Kafka is high-throughput streaming with replayable logs; RabbitMQ does rich routing and request-reply; SQS is simple and AWS-native."
  - "Events from the [transactional outbox](/glossary/transactional-outbox/) flow to consumers through a queue."
  - "Background jobs, email sending, and CQRS projections are all common queue consumers."
related_terms: ["transactional-outbox", "idempotent-receiver", "cqrs", "saga-pattern"]
related_posts:
  - "/role-of-queues-in-system-design/"
  - "/kafka-vs-rabbitmq-vs-sqs/"
---
