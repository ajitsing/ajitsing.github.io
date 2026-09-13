---
title: "Cold Start"
slug: "cold-start"
also-known-as: ["Cold Boot", "INIT Phase"]
category: "system-design"
date: 2026-09-13
definition: "A cold start is the extra latency a [serverless](/glossary/serverless/) platform adds when it has to build a fresh execution environment before running your code. The platform downloads the deployment package, boots the sandbox, starts the language runtime, and runs your initialization code, all before the handler sees the event. A warm start skips all of that because an existing environment is reused."
key_takeaways:
  - "Cold starts hit a small slice of traffic, typically under one percent of invocations on a busy production function."
  - "Duration ranges from under 100 ms to well over a second, driven mostly by runtime choice and package size."
  - "Interpreted runtimes like Node.js and Python start fastest. JVM and .NET functions with large dependency trees are the slowest."
  - "AWS bills the INIT phase for all function configurations since August 2025, so a slow cold start now costs money as well as latency."
  - "Provisioned concurrency, SnapStart, smaller bundles, and lazy client creation are the four levers that actually move the number."
how_it_works:
  - "A request arrives and no idle execution environment exists for that function version."
  - "The platform creates a sandbox, a Firecracker microVM on AWS Lambda, and downloads the code package into it."
  - "The runtime boots and the module-level initialization code outside the handler runs once."
  - "The handler finally runs. The environment is then kept warm for a while so later requests skip every step above."
real_world:
  - "AWS Lambda SnapStart restores a pre-initialized memory snapshot instead of running INIT, cutting Java cold starts to single-digit milliseconds."
  - "Cloudflare Workers avoid the problem structurally by using V8 isolates that start in well under a millisecond."
  - "Deploying a new function version invalidates every warm environment, so cold starts spike right after a release."
related_terms: ["serverless", "thundering-herd", "caching", "load-balancing"]
related_posts:
  - "/serverless-computing-explained/"
  - "/meta-xfaas-serverless-at-scale/"
  - "/thundering-herd-problem/"
---
