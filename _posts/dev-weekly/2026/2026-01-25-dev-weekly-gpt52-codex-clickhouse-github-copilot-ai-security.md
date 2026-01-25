---
layout: post
seo: true
title: "Dev Weekly: Apple's Siri Chatbot, ClickHouse $15B, Turbopack Deep Dive, Grok Unblocked"
subtitle: "Apple confirms Gemini-powered Siri chatbot for late 2026. ClickHouse reaches $15 billion valuation. Next.js explains Turbopack's speed. Malaysia unblocks Grok AI. Memory chip prices surge. UK court greenlights data center challenge. Weekly developer news Jan 19-25, 2026."
date: 2026-01-25
categories: tech-news
permalink: /dev-weekly/2026/jan-19-25/apple-siri-chatbot-clickhouse-turbopack-grok/
share-img: /assets/img/posts/dev_weekly/tech-news-19-25jan-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-19-25jan-2026.svg
description: "Apple confirms Gemini-powered Siri chatbot coming late 2026. ClickHouse valued at $15 billion. Turbopack incremental computation explained. Malaysia unblocks Grok AI. Google launches Me Meme. Amazon job cuts reported. Developer news Jan 19-25, 2026."
keywords: "Apple Siri AI chatbot 2026, ClickHouse $15 billion funding, Turbopack incremental computation, Grok AI Malaysia unblock, Google Me Meme, Amazon layoffs 2026, Azure Functions MCP, memory chip prices 2026, dev weekly January 2026"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is Apple's new Siri chatbot?"
    answer: "Apple is developing a new AI chatbot codenamed 'Campos' that will replace the current Siri interface. It will be powered by Google's Gemini models through a partnership announced January 12, 2026, and is expected to launch with iOS 27 in late 2026."
  - question: "Why did ClickHouse reach a $15 billion valuation?"
    answer: "ClickHouse, an open-source column-oriented analytics database, reached a $15 billion valuation after a major funding round in January 2026. The company's growth reflects strong demand for real-time analytics on large datasets, with adoption in observability, product analytics, and data warehousing."
  - question: "What is Turbopack and how does it achieve fast builds?"
    answer: "Turbopack is the new default bundler for Next.js. It achieves fast builds through incremental computation - only recomputing changed parts instead of rebuilding entire applications. It uses fine-grained caching and dependency tracking to enable near-instant builds even on large codebases."
  - question: "Why did Malaysia unblock Grok AI?"
    answer: "Malaysia lifted its block on xAI's Grok chatbot on January 23, 2026 after X (formerly Twitter) implemented safety measures. The block had been in place due to concerns about content moderation and safety."
---


Busy week in tech. Apple confirmed a major Siri overhaul powered by Google's Gemini. ClickHouse closed a $15 billion funding round. Next.js dropped a technical deep dive into Turbopack. Malaysia unblocked Grok after safety measures were added. Memory chip prices are surging and hitting consumer electronics. And a UK court approved a challenge against a large data center project. Here's everything that happened.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Apple Confirms Gemini-Powered Siri Chatbot for Late 2026 - [<i class="fas fa-external-link-alt"></i>](https://www.siliconrepublic.com/machines/siri-set-to-become-apples-first-ai-chatbot-in-late-2026)

On January 22, Bloomberg reported that Apple is building its first AI chatbot to replace the current Siri interface.

**What we know:**

- **Codenamed "Campos"** - Will be embedded deeply into iPhone, iPad, and Mac
- **Powered by Google Gemini** - Apple and Google announced a partnership on January 12
- **Expected with iOS 27** - Separate from the iOS 26.4 Siri update coming earlier
- **Apple also working on AI wearable** - A pin with cameras, speaker, and microphones

**The Apple-Google deal:**

In a joint statement, the companies said Apple's next-generation Foundation Models will be based on Google's Gemini models and cloud technology. Apple determined that "Google's AI technology provides the most capable foundation" after careful evaluation.

**Why this matters:**

Apple has fallen behind OpenAI, Google, and Microsoft in AI. This is their attempt to catch up. Instead of building from scratch, they're leveraging Google's models - a significant strategic shift.

**The competitive pressure:**

OpenAI is expected to launch a physical AI device in H2 2026, developed with former Apple design chief Jony Ive. Apple needs to move fast.

### ClickHouse Valued at $15 Billion - [<i class="fas fa-external-link-alt"></i>](https://devstyler.io/blog/2026/01/19/clickhouse-valued-at-15-billion-after-major-funding-round/)

ClickHouse closed a major funding round that values the company at $15 billion.

**What is ClickHouse?**

A column-oriented database designed for real-time analytics. It's extremely fast at aggregating large datasets - think billions of rows queried in milliseconds. Companies use it for:

- Observability and logging
- Product analytics
- Real-time dashboards
- Data warehousing

**Why this valuation:**

Data infrastructure is in demand. Companies generate massive amounts of data and need tools to analyze it in real time. ClickHouse sits at the intersection of open source and enterprise - free to start, with managed services for scale.

**What this means for developers:**

If you haven't looked at ClickHouse for analytics workloads, now might be the time. With this funding, expect accelerated development, better tooling, and a growing ecosystem.

### Malaysia Unblocks Grok AI After Safety Measures - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/world/asia-pacific/malaysia-lifts-block-grok-ai-after-x-implements-safety-measures-2026-01-23/)

On January 23, Malaysia lifted its block on xAI's Grok chatbot after X implemented safety measures.

**What happened:**

Malaysia had blocked access to Grok due to content moderation and safety concerns. After X made changes to address these issues, the government restored access.

**Why it matters:**

AI regulation is getting real. Countries are willing to block AI services that don't meet their safety standards. For AI companies, this means compliance isn't optional - it affects market access.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Inside Turbopack: How It Builds Fast - [<i class="fas fa-external-link-alt"></i>](https://nextjs.org/blog/turbopack-incremental-computation)

On January 20, Next.js published a detailed explanation of how Turbopack achieves its speed.

**The core idea: incremental computation**

Turbopack doesn't rebuild your whole app when you save a file. It tracks exactly what changed and only recomputes those parts.

**How it works:**

- **Fine-grained dependency tracking** - Every piece of computed data knows exactly what inputs it depends on
- **Change propagation** - When a file changes, the system marks dependent computations as "dirty"
- **Minimal recomputation** - Only the dirty parts get recalculated, everything else stays cached
- **Aggregation trees** - Frequently accessed data uses summarization to avoid walking the entire graph

**Why this matters:**

In webpack, changing one file often triggers rebuilding many unrelated things. Turbopack's approach means your save-to-refresh time stays fast regardless of project size.

**Bottom line:**

Turbopack isn't just "faster webpack." It's a fundamentally different approach to incremental builds. Worth reading if you're curious about build tool internals.

### Azure Functions Adds MCP Support - [<i class="fas fa-external-link-alt"></i>](https://www.infoq.com/news/2026/01/azure-functions-mcp-support/)

On January 19, Microsoft released Model Context Protocol (MCP) server support for Azure Functions.

**What this enables:**

- **AI agents calling your functions** - Build serverless backends that AI can invoke
- **Tool integration** - Connect AI models to your existing Azure infrastructure
- **Agentic workflows** - Create automated pipelines where AI triggers function execution

**Why it matters:**

As AI agents become more capable, they need ways to take actions beyond generating text. MCP support in Azure Functions makes it easy to give agents access to serverless compute.

### Google Debuts "Me Meme" Feature - [<i class="fas fa-external-link-alt"></i>](https://mashable.com/article/google-debuts-me-meme-feature-google-photos-app)

Google launched "Me Meme," an AI tool that creates personalized memes using your photos.

**What it does:**

Uses AI to generate memes featuring you based on your Google Photos library. Part of Google's push to add AI features across its consumer products.

**Developer relevance:**

Shows how AI image generation is being integrated into mainstream apps. If you're building consumer products, AI-powered personalization features are becoming table stakes.

---

## <i class="fas fa-building"></i> Industry News

### Amazon Plans Thousands More Job Cuts - [<i class="fas fa-external-link-alt"></i>](https://www.ndtv.com/world-news/amazon-plans-thousands-more-job-cuts-by-next-week-report-10846246)

Reports indicate Amazon is planning thousands of additional corporate job cuts.

**The context:**

Tech layoffs continue into 2026. After the hiring surge during the pandemic, companies are still right-sizing their workforces. Amazon joins other tech giants in trimming corporate roles.

**What it means:**

The job market for tech workers remains challenging. Companies are prioritizing efficiency and automation over headcount growth.

### Memory Chip Prices Surge, Hitting Consumer Electronics - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/world/asia-pacific/surging-memory-chip-prices-dim-outlook-consumer-electronics-makers-2026-01-22/)

On January 22, Reuters reported that surging memory chip prices are impacting consumer electronics manufacturers.

**What's happening:**

Memory chip prices have increased significantly, squeezing margins for device makers. This affects everything from smartphones to laptops to gaming consoles.

**Why it matters for developers:**

Hardware costs flow through to end users. If device prices rise, adoption of new hardware slows. This affects what you can expect from your users' devices.

### UK Court Greenlights Data Center Challenge - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/world/uk/uk-court-gives-go-ahead-challenge-large-data-centre-2026-01-22/)

On January 22, a UK court approved a legal challenge against a large data center project.

**The issue:**

Data centers face increasing scrutiny over energy consumption and environmental impact. This court decision allows opponents to challenge a major project.

**The trend:**

As AI and cloud computing drive demand for more data centers, expect more regulatory and legal challenges. Infrastructure planning is becoming harder, not easier.

### Anthropic, OpenAI Join SpaceX as Top IPO Candidates - [<i class="fas fa-external-link-alt"></i>](https://finance.yahoo.com/news/anthropic-openai-join-spacex-ipo-181540636.html)

AI companies Anthropic and OpenAI are now being mentioned alongside SpaceX as the most anticipated IPO candidates.

**What this signals:**

The AI boom has created companies valued in the tens of billions. Public market investors are eager for access. When these companies eventually IPO, it will be a major moment for the tech industry.

---

## <i class="fas fa-shield-alt"></i> Security Updates

### AI Library Vulnerabilities Worth Watching

Security researchers continue finding issues in popular AI/ML Python libraries.

**The pattern:**

AI libraries often use pickle-based serialization for model files. Pickle is convenient but inherently unsafe - loading a malicious pickle file can execute arbitrary code.

**What to watch:**

- **NeMo** (Nvidia) - Had RCE vulnerability via model files
- **FlexTok** (Bytedance) - Tokenization library with similar issues
- **Uni2TS** (Salesforce) - Time series library with unsafe deserialization

**What developers should do:**

1. **Update regularly** - Keep AI libraries patched
2. **Audit model sources** - Only load models from trusted sources
3. **Sandbox model loading** - Consider running model loading in isolated environments
4. **Prefer safe formats** - Libraries moving to SafeTensors are more secure

---

## <i class="fas fa-exclamation-triangle"></i> What This Week Teaches Us

**Apple is playing catch-up in AI:** The Gemini partnership shows Apple recognizes it's behind. Instead of building from scratch, they're leveraging Google's technology. This is a pragmatic move, but it's also an admission.

**Build tool performance comes from fundamentals:** Turbopack isn't fast because of one trick. It's fast because of careful architectural decisions about incremental computation.

**AI regulation is getting teeth:** Malaysia blocking and then unblocking Grok shows countries are willing to enforce AI safety requirements. Compliance is becoming a market access issue.

**Data infrastructure funding remains hot:** ClickHouse's $15 billion valuation shows continued enterprise demand for analytics tools.

**Hardware constraints affect everyone:** Memory chip prices flowing through to device costs is a reminder that software ultimately runs on hardware, and hardware economics matter.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$15 billion** - ClickHouse valuation after funding round
- **iOS 27** - Expected release for Apple's new Siri chatbot
- **January 12** - Date of Apple-Google Gemini partnership announcement
- **3** - AI libraries with disclosed RCE vulnerabilities (NeMo, FlexTok, Uni2TS)

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**Apple Siri chatbot** - Codenamed Campos, powered by Google Gemini, coming with iOS 27 in late 2026.

**ClickHouse $15B** - Open-source analytics database closes major funding round.

**Turbopack explained** - Next.js deep dive on incremental computation architecture.

**Malaysia unblocks Grok** - xAI's chatbot restored after safety measures implemented.

**Google Me Meme** - AI-powered personalized meme generator in Google Photos.

**Amazon layoffs** - More corporate job cuts reported.

**Memory chip surge** - Rising prices hitting consumer electronics makers.

**UK data center challenge** - Court approves legal challenge against major project.

**Azure Functions MCP** - Build AI agents that call serverless functions.

---

*Busier week than expected. The Apple-Google partnership for Siri is the big strategic story - Apple admitting it needs help to compete in AI. The Turbopack deep dive is worth your time if you care about build tools. And the Grok situation in Malaysia is a preview of how AI regulation will work: comply with local requirements or lose market access.*

*See you next week.*
