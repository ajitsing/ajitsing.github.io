---
title: "Publish-Subscribe (Pub/Sub)"
slug: "pub-sub"
also-known-as: ["Pub/Sub", "Publish Subscribe", "Fan-out Messaging"]
category: "system-design"
date: 2026-07-03
definition: "Publish-subscribe is a messaging pattern where publishers send messages to a topic instead of to specific receivers, and any number of subscribers to that topic get a copy. Publishers and subscribers never know about each other, which decouples them and lets you add or remove consumers without touching the sender."
key_takeaways:
  - "Publishers write to a topic, not to a consumer. This decoupling is the whole point: senders and receivers scale and change independently."
  - "Unlike a point-to-point [message queue](/glossary/message-queue/) where one consumer gets each message, pub/sub fans one message out to many subscribers."
  - "It is the backbone of event-driven systems and pairs naturally with [CQRS](/glossary/cqrs/) and the [transactional outbox](/glossary/transactional-outbox/)."
  - "You still have to decide delivery guarantees. At-least-once delivery means consumers must be idempotent to handle duplicates."
how_it_works:
  - "A publisher sends a message to a named topic on a broker."
  - "The broker keeps a list of subscribers for that topic."
  - "Each subscriber receives its own copy, either pushed to it or pulled from its own cursor in the log."
  - "Subscribers process independently, so a slow one does not block the others."
real_world:
  - "Apache Kafka, Google Pub/Sub, AWS SNS, and Redis Pub/Sub are common implementations."
  - "Notification systems fan one event out to email, SMS, and push subscribers at once."
  - "Slack and other real-time apps use pub/sub to route a message to every server holding a relevant [WebSocket](/glossary/websocket/)."
related_terms: ["message-queue", "transactional-outbox", "idempotent-receiver", "cqrs", "websocket"]
related_posts:
  - "/role-of-queues-in-system-design/"
  - "/kafka-vs-rabbitmq-vs-sqs/"
  - "/notification-system-design/"
---
