---
title: "Serverless"
slug: "serverless"
also-known-as: ["Serverless Computing", "FaaS", "Functions as a Service"]
category: "system-design"
date: 2026-09-13
definition: "Serverless is a cloud execution model where you deploy code and the provider runs it on demand, starting and stopping capacity for you and billing only for the time your code actually runs. Servers still exist, you just never provision, patch, or scale them. The most common form is Functions as a Service, where a short-lived function is triggered by an HTTP request, a queue message, a file upload, or a schedule. AWS Lambda, Google Cloud Run functions, Azure Functions, and Cloudflare Workers are the best known platforms."
key_takeaways:
  - "You pay per request and per GB-second of execution, so idle capacity costs nothing. That is the single biggest difference from running containers."
  - "Scaling is per invocation. A thousand concurrent events become a thousand execution environments without an autoscaler in the loop."
  - "Every function is stateless between invocations. Anything you need to keep goes in a database, an object store, or a [message queue](/glossary/message-queue/)."
  - "The main costs are [cold starts](/glossary/cold-start/), a hard execution timeout, and connection pressure on downstream databases."
  - "Serverless wins on spiky, event-driven, idle-heavy workloads. Containers usually win above roughly 60 percent sustained utilization."
how_it_works:
  - "An event source such as an API gateway, queue, or storage bucket invokes the function through the platform's API."
  - "The platform finds a warm execution environment, or creates a new one by downloading the code and starting the runtime."
  - "Initialisation code outside the handler runs once per environment, then the handler runs for this specific event."
  - "After the response, the environment is frozen and kept for a while so the next event can reuse it, then eventually torn down."
real_world:
  - "AWS Lambda runs each concurrent execution inside a Firecracker microVM for hardware-level tenant isolation."
  - "Cloudflare Workers and Deno Deploy use V8 isolates instead of VMs, which is why their cold starts are sub-millisecond."
  - "Meta's XFaaS platform runs trillions of serverless function calls a day across its own fleet."
related_terms: ["cold-start", "microservices", "message-queue", "pub-sub", "rate-limiting"]
related_posts:
  - "/serverless-computing-explained/"
  - "/meta-xfaas-serverless-at-scale/"
  - "/modular-monolith-architecture/"
  - "/role-of-queues-in-system-design/"
---
