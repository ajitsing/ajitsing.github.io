---
layout: post
seo: true
title: "Dev Weekly: OpenAI's Massive AMD Deal, App Store Launch & Developer Talent Crisis (Oct 13–19, 2025)"
subtitle: "OpenAI partners with AMD for 6GW of GPUs challenging NVIDIA, launches app ecosystem at $500B valuation, and UK faces developer shortage"
date: 2025-10-19
categories: tech-news
permalink: /dev-weekly-openai-amd-deal-app-store-developer-talent-crisis/
share-img: /assets/img/posts/dev_weekly/tech-news-13-19-oct.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-13-19-oct.png
description: "OpenAI partners with AMD for 6 gigawatts of GPU compute challenging NVIDIA dominance, unveils ChatGPT Apps SDK at DevDay 2025 reaching $500B valuation, SoftBank buys ABB Robotics for $5.4B, UK faces developer shortage with aging workforce, Microsoft Agent Framework, Grafana Assistant, IBM-Anthropic partnership, Gartner predicts 90% AI adoption by 2028"
keywords: "OpenAI AMD partnership, AMD MI450 GPUs, ChatGPT Apps SDK, OpenAI DevDay 2025, SoftBank ABB Robotics acquisition, Microsoft Agent Framework, UK developer shortage, NVIDIA competition, AI infrastructure, Grafana Assistant, IBM Anthropic Claude, Gartner AI predictions, developer news October 2025"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

This week felt like a turning point. OpenAI made two massive moves - a play to become the next App Store and a GPU deal with AMD that challenges NVIDIA's monopoly. Meanwhile, SoftBank dropped $5.4 billion on robotics, and a new study revealed the UK developer workforce is aging with no junior talent coming in. Here's what happened.

---

## 🔥 Top Stories This Week

### OpenAI Launches App Store at DevDay 2025 - [🌐](https://openai.com/index/introducing-apps-in-chatgpt/)

At DevDay 2025, OpenAI made its biggest strategic pivot yet: the **ChatGPT Apps SDK**. This transforms ChatGPT from a chatbot into a full software platform where developers can build and sell commercial mini-apps.

Think about it - OpenAI is now competing directly with Apple's App Store and Google Play. You can build apps that run inside ChatGPT and charge users for them.

**What this means:**
- **New distribution channel** - 200+ million ChatGPT users as your potential market
- **AI-native apps** - Build apps that deeply integrate with ChatGPT's capabilities
- **Revenue sharing** - OpenAI gets a cut, similar to other app stores
- **Commercial deployment** - You can sell B2B or B2C apps on their platform

OpenAI also announced they've hit a **$500 billion valuation**. Not a typo. Half a trillion dollars. That's bigger than most tech companies ever get. The company has moved from research lab to AI infrastructure provider to now platform owner in just three years.

### OpenAI and AMD Strike Massive GPU Deal - [🌐](https://openai.com/index/openai-amd-strategic-partnership/)

In what might be the week's biggest infrastructure deal, **OpenAI and AMD announced a strategic partnership** to deploy **up to 6 gigawatts of AMD GPUs** over multiple years. This is a direct challenge to NVIDIA's dominance in AI hardware.

**The scale is huge:**
- **6 gigawatts** of compute across multiple GPU generations
- **Initial deployment** of 1 gigawatt starting in second half of 2026
- **AMD MI450 Series GPUs** - their next-generation AI accelerators
- **Tens of billions in revenue** expected for AMD over the partnership

**The equity angle:**
AMD issued OpenAI a **warrant for up to 160 million shares** of AMD stock. The shares vest as deployment milestones are hit and AMD's stock price reaches certain targets. This ties OpenAI's success directly to AMD's success.

### SoftBank Buys ABB Robotics for $5.4 Billion - [🌐](https://www.cnbc.com/2025/10/08/softbank-to-buy-abb-robotics-unit-for-5point4-billion-in-ai-push.html)

SoftBank dropped **$5.4 billion** to acquire ABB Robotics, one of the world's leading industrial robotics companies. This is SoftBank's biggest bet yet on "physical AI" - robots that combine AI brains with real-world manipulation.

ABB makes the robots you see in factories building cars, packing products, and handling materials. Now they'll have SoftBank's AI expertise and capital behind them. The deal signals that AI is moving beyond screens into the physical world, with robotics software engineering about to become a much bigger field.

### UK Faces Developer Talent Crisis - [🌐](https://www.itpro.com/software/development/the-uks-aging-developer-workforce-needs-a-steady-pipeline-of-talent-to-meet-future-demand-but-ais-impact-on-entry-level-jobs-and-changing-skills-requirements-mean-it-could-be-fighting-an-uphill-battle)

A new study from Stack Overflow reveals a problem that's quietly building: the **UK developer workforce is aging**, and there aren't enough junior developers coming in to replace them.

**The numbers:**
- **Average age: 39 years old**
- **74% have over 10 years experience**
- **Entry-level jobs disappearing** as AI tools take over junior tasks
- **Skills gap widening** between what's taught and what's needed

This creates a weird situation. Companies complain they can't find developers, but they're also using AI tools to replace the entry-level work that used to train new developers. Junior roles that taught fundamentals are vanishing.

**What's changing:**
- **AI literacy** is now expected alongside coding skills
- **Critical thinking** matters more than memorizing syntax
- **Security awareness** required from day one
- **Real-world experience** harder to get without entry-level jobs

Industry leaders are calling for better collaboration between universities, bootcamps, and companies. Apprenticeships and open source contributions are becoming more important as traditional junior roles disappear.

This is happening everywhere, not just the UK. If you're a junior developer, focus on skills AI can't easily replace: system design, debugging complex issues, understanding business context, and reviewing AI-generated code critically.

### SonicWall Breach Exposes Cloud Firewall Configs - [🌐](https://www.sonicwall.com/support/knowledge-base/mysonicwall-cloud-backup-file-incident/250915160910330)

A major security breach at **SonicWall** exposed firewall configurations for all their cloud backup users. This is bad.

Firewall configs contain network topology, security rules, internal IP addresses, and VPN settings - basically a blueprint of your network defenses. Attackers having this information makes breaching those networks much easier.

Details are still emerging, but it appears to be a vulnerability in how SonicWall's cloud backup system handled access controls. All customer configs were accessible when they should have been isolated. For developers building SaaS or cloud services, this is a reminder to test multi-tenant isolation carefully.

---

## 🛠 Developer Tools & Releases

### Microsoft Releases Agent Framework - [🌐](https://azure.microsoft.com/en-us/blog/introducing-microsoft-agent-framework/)

Microsoft launched the **Agent Framework**, an open-source toolkit for building AI agents in .NET and Python.

**What it does:**
- **Multi-agent workflows** - Create systems where multiple AI agents work together
- **Graph-based coordination** - Define how agents interact and pass information
- **Built-in templates** - Start with common patterns for coding, testing, deployment
- **Language agnostic** - Works with any LLM that has an API

This is Microsoft's answer to LangChain and similar tools, but with Microsoft's enterprise polish and integration with their ecosystem.

The interesting part is the graph-based workflow design. Instead of linear "do this then that" automation, you can build systems where agents collaborate, make decisions, and handle complex processes.

**Use cases:**
- Automated code review where one agent checks functionality, another checks security, another checks performance
- Documentation systems that generate, review, and update docs automatically  
- Testing pipelines where agents write tests, run them, analyze failures, and suggest fixes

Worth checking out if you're building AI-assisted development tools. The framework handles a lot of the coordination complexity.

### Google Expands Opal for No-Code Development - [🌐](https://blog.google/technology/google-labs/opal-expansion/)

Google released **Opal**, a no-code platform for building web applications. Unlike other no-code tools, Opal is backed by Google's infrastructure and AI capabilities.

**Features:**
- **AI-powered design** - Describe your app, Opal generates it
- **Automatic backend** - Database and APIs created automatically
- **Google Cloud integration** - Deploy directly to Google's infrastructure
- **Collaboration tools** - Multiple people can work on the same app

This continues the trend of lowering barriers to app development. The question developers always ask: does this replace us?

Not really. No-code tools are great for simple apps and prototypes, but they hit limits fast. Complex business logic, performance optimization, security requirements, and custom integrations still need actual code.

What it does do is reduce demand for simple CRUD apps and internal tools. If you've been making a living building basic forms and database interfaces, you might need to level up your skills.

### Grafana Assistant Now Generally Available - [🌐](https://grafana.com/whats-new/2025-10-08-grafana-assistant-is-now-generally-available/)

Grafana Labs released **Grafana Assistant** for production use, with a preview of **Grafana Assistant Investigations** for incident management.

**What it does:**
- **Analyzes metrics and logs** to find anomalies
- **Generates hypotheses** about what might be wrong
- **Suggests fixes** based on similar past incidents
- **Creates alerts** automatically based on observed patterns
- **Writes incident reports** - Post-mortems take hours to write, AI can generate 80% of it

For DevOps and SRE teams, this could save serious time during incidents by handling the grunt work of correlating logs, metrics, and traces.

### IBM and Anthropic Partner on Enterprise AI - [🌐](https://newsroom.ibm.com/2025-10-07-2025-ibm-and-anthropic-partner-to-advance-enterprise-software-development-with-proven-security-and-governance)

IBM and Anthropic announced a partnership to integrate **Claude** into IBM's enterprise software stack. This gives enterprise developers access to Claude through:

- **Watsonx** - IBM's AI platform
- **Enterprise consulting** - IBM's consulting services will include Claude
- **Security and compliance** - Built-in governance for regulated industries
- **Hybrid cloud** - Run Claude in your data center or IBM Cloud

For developers at enterprises using IBM tools, this makes Claude accessible with the governance features that matter in finance and healthcare where data can't be sent to public APIs.

---

## 📊 Programming & Development Trends

### Python Holds Strong, C Rebounds

The October 2025 **TIOBE Index** shows interesting shifts in programming language popularity:

- **Python: 24.45%** - Still dominant, especially for AI and data work
- **C: 9.29%** - Jumped back up with the C23 update focusing on speed
- **C++: 8.84%** - Growing with C++26 work for embedded systems
- **Java: 8.35%** - Benefiting from Java 25 release
- **C#: 6.94%** - Steadily gaining ground

Python's dominance isn't surprising given how much AI work is happening, but C's comeback shows that systems languages aren't going anywhere despite higher-level abstractions.

### Gartner: 90% of Devs Will Use AI by 2028

Gartner released predictions for software engineering trends, with one stat standing out: by 2028, **90% of enterprise software engineers will use AI code assistants**, up from less than 14% in early 2024.

That's not a gradual change. That's a massive shift in how software gets built.

**Gartner's other predictions:**
- **AI-native development** - Tools designed from scratch with AI in mind
- **LLM-based applications** - Apps built directly on large language models
- **Human + AI collaboration** - Developers managing AI rather than writing all code
- **Emphasis on oversight** - More focus on reviewing and validating AI output

The report emphasizes that AI won't replace developers, but developers using AI will replace developers who don't. The skill becomes knowing what to build, how to verify it works, and how to maintain systems.

This matches what we're seeing. GitHub Copilot, Cursor, Claude, ChatGPT - these tools are becoming standard parts of developer workflows. In three years, not using AI assistance might seem as odd as not using Stack Overflow.

---

## 🌐 AI & Platform News

### Reddit Expands AI Search to 5 Languages

Reddit rolled out AI-powered search in **French, German, Spanish, Italian, and Portuguese**. Users in Brazil, France, Germany, Spain, Mexico, and Italy can now search using natural language in their native languages.

This is part of Reddit's push to internationalize and make their platform more accessible. The AI can understand context and intent, not just keyword matching.

### Microsoft Brings AI to Washington Schools

Microsoft announced they're providing AI tools and training to **295 school districts** and **34 community colleges** in Washington state. They're also offering **$25,000 grants** to 10 school districts and 10 colleges to create and deploy AI tools.

---

## 📊 The Numbers That Matter

- **$500 billion** - OpenAI's valuation after ChatGPT Apps SDK launch
- **6 gigawatts** - AMD GPU compute OpenAI will deploy over multiple years
- **160 million shares** - AMD stock warrant issued to OpenAI
- **1 gigawatt** - Initial AMD GPU deployment starting second half of 2026
- **$5.4 billion** - SoftBank's acquisition price for ABB Robotics
- **200+ million** - ChatGPT users available as potential app market
- **90%** - Enterprise developers expected to use AI by 2028 (Gartner)
- **39 years** - Average age of UK developers
- **74%** - UK developers with 10+ years experience
- **295** - School districts receiving Microsoft AI tools in Washington
- **24.45%** - Python's share in TIOBE Index

---

*Got a story we missed? Let us know, we're always looking to improve our coverage of what matters to developers.*

