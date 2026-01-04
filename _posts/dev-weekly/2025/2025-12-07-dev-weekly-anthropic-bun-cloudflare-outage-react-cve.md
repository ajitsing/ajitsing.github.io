---
layout: post
seo: true
title: "Dev Weekly: Anthropic Acquires Bun, Cloudflare Goes Down Again, Cursor Hits $2.3B (Dec 1–7, 2025)"
subtitle: "Anthropic buys Bun as Claude Code hits $1B. Cloudflare's second outage in 17 days. Critical React Server Components CVE. Cursor valued at $2.3B. OpenAI-Accenture $3B deal. AWS and Google team up."
date: 2025-12-07
categories: tech-news
permalink: /dev-weekly-anthropic-bun-cloudflare-react-cve-dec-1-7/
share-img: /assets/img/posts/dev_weekly/tech-news-1-7dec.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-1-7dec.png
description: "Anthropic acquires Bun. Cloudflare outage hits 28% of traffic. React2Shell CVE-2025-55182. Cursor valued at $2.3B. OpenAI-Accenture $3B deal. Developer news Dec 1-7, 2025."
keywords: "Anthropic Bun acquisition, Bun JavaScript runtime, Claude Code AI, Jarred Sumner, Cloudflare outage December 2025, React Server Components vulnerability, React2Shell, CVE-2025-55182, Next.js security, Cursor AI editor, Cursor $2.3 billion valuation, OpenAI Accenture partnership GPT-5, AWS Google multicloud, AWS re:Invent 2025, Amazon Bedrock, developer news December 2025, software development news"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

Anthropic bought Bun. Cloudflare went down again. A critical React vulnerability got disclosed. Cursor hit a $2.3B valuation. OpenAI and Accenture announced a $3B deal. AWS and Google are working together. Busy week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Anthropic Acquires Bun as Claude Code Hits $1 Billion Revenue - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/business/media-telecom/anthropic-acquires-developer-tool-startup-bun-scale-ai-coding-2025-12-02/)

On December 2, Anthropic announced they're acquiring Bun, the JavaScript runtime that's been giving Node.js a run for its money.

**What is Bun?**

If you haven't used it, Bun is an all-in-one JavaScript toolkit. It's a runtime, package manager, bundler, and test runner - all in one. It's known for being ridiculously fast. Like 3x faster than Node.js for many operations.

**Why Anthropic wants it:**

Claude Code, Anthropic's AI coding assistant, has been on a tear. It hit **$1 billion in annualized revenue** within six months of its public launch in May 2025. Big names like Netflix, Spotify, and Salesforce are already using it.

The Bun acquisition is about making Claude Code faster and more stable. When you're generating code at scale, the underlying runtime matters a lot.

**What this means for Bun users:**

Bun creator Jarred Sumner is joining Anthropic, along with the core team. They say Bun will remain open source and the project will continue. But acquisitions change things. The priorities might shift toward what helps Claude Code rather than what the broader community needs.

We'll see how this plays out. For now, it's a validation of Bun's technology. If Anthropic is betting $1B+ revenue product on it, the tech must be solid.

### Cloudflare's Second Major Outage in 17 Days - [<i class="fas fa-external-link-alt"></i>](https://blog.cloudflare.com/5-december-2025-outage/)

On December 5, Cloudflare went down again. This time for 25 minutes, affecting about 28% of all HTTP traffic they serve.

**What went wrong:**

Cloudflare was trying to protect customers from a React Server Components vulnerability (more on that below). They needed to increase their WAF buffer size from 128KB to 1MB.

During the rollout, they discovered their internal testing tool wasn't compatible with the new buffer size. They decided to turn it off. The problem? They used their global config system to do it - the same system that caused the November 18 outage.

A nil value bug that had been hiding in their codebase for years finally got triggered. HTTP 500 errors everywhere.

**Who got hit:**

- Coinbase
- Anthropic's Claude AI
- About 28% of Cloudflare's HTTP traffic
- Only customers on the older FL1 proxy with Managed Ruleset enabled

**The pattern:**

This is the second time in 17 days that Cloudflare's global config system caused a major outage. Both times, an instant propagation without health checks turned a single bug into a global incident.

I wrote a detailed breakdown of the technical root cause here: [Cloudflare Outage December 2025: A Nil Value Exception That Lurked for Years](/cloudflare-outage-december-2025/)

**The lesson:**

Configuration changes need the same careful rollout as code changes. Instant global propagation is dangerous.

### React Server Components Critical Vulnerability (CVE-2025-55182) - [<i class="fas fa-external-link-alt"></i>](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)

A critical vulnerability called "React2Shell" was disclosed in React Server Components this week. It affects React versions 19.0 through 19.2.0.

**The problem:**

The vulnerability allows unauthenticated attackers to execute arbitrary code on servers running affected React Server Components. That's about as bad as it gets.

**How it works:**

React Server Components process and execute code on the server side. The vulnerability exploits how certain inputs are handled, allowing attackers to inject and execute malicious code without authentication.

**Who's affected:**

- Anyone running React 19.0 to 19.2.0 with Server Components
- Next.js applications using Server Components
- Any framework built on React Server Components

**What to do:**

1. **Update React immediately** - Patched versions are available
2. **Review your Server Components** - Look for any suspicious activity
3. **Check your WAF rules** - Make sure you're blocking exploitation attempts
4. **Audit your dependencies** - See if any libraries you use are vulnerable

This CVE is why Cloudflare was making firewall changes in the first place. The irony? Their attempt to protect customers from the vulnerability caused an outage.

---

## <i class="fas fa-cloud"></i> Cloud News

### AWS and Google Launch Joint Multicloud Networking Service - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/business/retail-consumer/amazon-google-launch-multicloud-service-faster-connectivity-2025-12-01/)

In news nobody expected: Amazon and Google are now working together.

On December 1, AWS and Google Cloud announced a joint multicloud networking service. It lets enterprise customers connect workloads across both platforms in minutes. Previously, this took weeks of manual configuration.

**What it does:**

- Private, high-speed links between AWS and GCP
- Setup in minutes instead of weeks
- Designed for AI workloads that need resources from both clouds
- Improved resilience - if one cloud has issues, failover is easier

**Why this matters:**

AWS and Google are competitors. They don't usually play nice together. But enterprises are demanding multicloud setups. They want options. They want resilience. They don't want to be locked into one vendor.

The AI boom is accelerating this. Some AI workloads need specific hardware or capabilities that one cloud does better than another. Companies want to use the best of both worlds.

This partnership signals that even the biggest competitors recognize the multicloud future.

### AWS re:Invent 2025 Highlights - [<i class="fas fa-external-link-alt"></i>](https://www.techradar.com/pro/live/aws-re-invent-2025-all-the-news-and-updates-as-it-happens)

AWS re:Invent wrapped up this week in Las Vegas. Here are the big announcements:

**AI and Agents:**

- **Amazon Bedrock Agentcore** - A platform for building AI agents
- **Nova Forge** - New AI development tools
- **Frontier Agents** - AWS's own AI agents
- **AWS Security Agent** - AI for security operations
- **AWS DevOps Agent** - AI for development and operations

**New Hardware:**

- **P63 GPU instances** - Powered by Nvidia GB200/GB300
- **Trainium 3 & 4 chips** - AWS's custom AI training silicon
- **AI Factories** - Dedicated infrastructure for training large models

**Developer Tools:**

- **Strands Agent SDK** - Simplify building AI agents
- **AgentCore Memory** - Memory management for agents
- **Amazon Nova 2** - Speech-to-speech AI applications

**CTO Werner Vogels' take:**

Vogels closed the event talking about the "Renaissance Developer" - someone who's curious, communicates well, takes ownership, and thinks in systems. The message? AI is changing development, but the human skills still matter.

The overall theme: agents are the next big thing. AWS is betting big on AI systems that can take actions, not just answer questions.

### SUSE Partners with AWS for Amazon Linux - [<i class="fas fa-external-link-alt"></i>](https://www.suse.com/news/suse-supplementary-packages-amazon-linux-features/)

SUSE and AWS announced a partnership to enhance Amazon Linux with thousands of additional enterprise-grade packages.

**What's new:**

- **Supplementary Packages for Amazon Linux (SPAL)** - SUSE delivers thousands of additional open-source packages
- Enterprise-grade support and maintenance
- Broader toolset for Amazon Linux users

If you're running Amazon Linux in production, you now have access to a much larger ecosystem of tested, enterprise-supported packages.

---

## <i class="fas fa-robot"></i> AI News

### OpenAI and Accenture Announce $3 Billion Partnership - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/accenture-partnership/)

OpenAI and Accenture announced a massive $3 billion, five-year partnership on December 1 to deploy GPT-5 across Fortune 500 enterprises.

**The deal:**

- **$3 billion** over five years
- Accenture handles implementation and training
- 50,000 consultants will be trained on GPT-5
- Focus on finance, healthcare, and manufacturing first

**Why this matters:**

This is OpenAI's biggest enterprise push yet. Instead of selling API access and letting companies figure it out, they're partnering with Accenture to do the heavy lifting. Accenture brings enterprise relationships and implementation expertise. OpenAI brings the AI.

The 50,000 consultants number is significant. That's an army of people who will be pushing GPT-5 into enterprise workflows.

### Cursor Hits $2.3 Billion Valuation

Cursor, the AI-first code editor, announced a $400 million Series B funding round, bringing its valuation to **$2.3 billion**.

**The numbers:**

- $400 million Series B
- $2.3 billion valuation
- Fastest-growing developer tool of 2025

**What Cursor is:**

Cursor is a fork of VS Code with native AI integration. Instead of bolting AI onto an existing editor, they built it into the core experience. Code completion, chat, and AI-assisted editing are all built in.

**The AI editor wars:**

- GitHub Copilot - integrated into VS Code, JetBrains, etc.
- Cursor - AI-first fork of VS Code
- Google Antigravity - autonomous coding agents
- Windsurf by Codeium - another AI-first approach

Developer tools are in the middle of an AI revolution. The $2.3B valuation shows investors believe AI-native editors are the future, not AI plugins bolted onto existing tools.

---

## <i class="fas fa-exclamation-triangle"></i> What This Week Teaches Us

**AI coding is the biggest investment theme:** Anthropic buying Bun, Cursor at $2.3B, OpenAI-Accenture at $3B - the money flowing into AI coding tools is staggering. This isn't a fad. This is the new normal for developer tools.

**Infrastructure redundancy remains critical:** Cloudflare's second outage in 17 days shows that even the biggest providers can fail. Multi-CDN setups cost more but provide protection against single points of failure.

**Security fixes can cause outages:** The irony of Cloudflare's outage being caused by a security fix isn't lost on anyone. Rushed security patches need the same careful rollout as any other change.

**Competitors will cooperate when customers demand it:** AWS and Google working together on multicloud networking shows that customer pressure can overcome competitive dynamics.

**AI agents are the new battleground:** Every major cloud provider is now betting on AI agents. Not chatbots. Agents that can take actions, make decisions, and complete workflows.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$3 billion** - OpenAI-Accenture partnership value over 5 years
- **$2.3 billion** - Cursor's valuation after Series B
- **$1 billion** - Claude Code's annualized revenue run rate (in 6 months)
- **$400 million** - Cursor's Series B funding round
- **50,000** - Accenture consultants to be trained on GPT-5
- **28%** - Percentage of Cloudflare HTTP traffic affected
- **25 minutes** - Cloudflare outage duration on December 5
- **17 days** - Time between Cloudflare's two major outages
- **4.5%** - Cloudflare stock drop after the December 5 outage

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**AI coding tools are hot** - Between Anthropic's Bun acquisition, Cursor's $2.3B valuation, and OpenAI-Accenture's $3B deal, investors are betting big on AI-powered development. This is the year AI coding went mainstream.

**Netflix, Spotify, Salesforce using Claude Code** - Major enterprises are already building with Anthropic's AI coding assistant. The $1B revenue proves it's not just hype.

**Bun stays open source** - Anthropic says Bun will remain open source after the acquisition. The core team is joining Anthropic but the project continues.

**React Server Components getting hardened** - After CVE-2025-55182, expect more security attention on Server Components. The attack surface for server-side React is real.

**Cloudflare working on fixes** - After the November outage, Cloudflare said they were working on changes to prevent this. They weren't done when the December outage hit. The fixes are still in progress.

---

*Big week for acquisitions, funding, and outages. AI coding tools are getting serious investment - Anthropic buying Bun, Cursor at $2.3B, OpenAI-Accenture at $3B. Cloudflare needs to fix their deployment pipeline before the next outage. And if you're running React Server Components, patch now.*

*Got news we should cover? Let us know. We're tracking what matters to developers.*


