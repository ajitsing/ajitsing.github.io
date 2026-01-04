---
layout: post
seo: true
title: "Dev Weekly: Cloudflare Outage, Jeff Bezos' $6.2B AI Startup, X Encrypted Chat (Nov 17–23, 2025)"
subtitle: "Cloudflare takes down ChatGPT and X for 6 hours. Jeff Bezos launches Project Prometheus with $6.2B funding. X rolls out encrypted DMs. AMD targets Nvidia's AI dominance. Google drops AI-powered IDE."
date: 2025-11-23
categories: tech-news
permalink: /dev-weekly-cloudflare-outage-google-antigravity-nov-17-23/
share-img: /assets/img/posts/dev_weekly/tech-news-17-23nov.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-17-23nov.png
description: "Cloudflare outage disrupts millions for 6 hours. Jeff Bezos launches Project Prometheus AI startup with $6.2B. X introduces encrypted chat. AMD challenges Nvidia AI dominance. Google Antigravity IDE launch. Developer news November 17-23, 2025"
keywords: "Cloudflare outage November 2025, Jeff Bezos Project Prometheus, X encrypted chat, AMD Nvidia AI, Google Antigravity IDE, ChatGPT down, infrastructure failure, developer news November 2025"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

Cloudflare's 6-hour outage took down ChatGPT, X, and millions of sites. Jeff Bezos came out of retirement to launch an AI startup with $6.2 billion in funding. X rolled out encrypted DMs. AMD is challenging Nvidia's AI dominance. And Google dropped an AI IDE that codes for you. Wild week.

---

## <i class="fas fa-fire"></i> Top Story: Cloudflare's 6-Hour Global Outage

### When One Database Permission Change Broke the Internet - [<i class="fas fa-external-link-alt"></i>](https://blog.cloudflare.com/18-november-2025-outage/)

On November 18, Cloudflare went down globally for 6 hours. ChatGPT, X, Spotify, Dropbox, Discord, Shopify stores, and millions of other sites returned HTTP 500 errors.

**The root cause:** Someone changed database permissions. That triggered duplicate entries in Cloudflare's bot management feature file. The file doubled in size, exceeded a hard limit, and crashed traffic routing software across all 330+ data centers worldwide.

**Impact:** 20% of all websites offline. Cloudflare stock dropped 2.76%. CTO Dane Knecht: "We failed our customers and the broader internet."

**Why it matters:** When you [handle 55 million requests per second](/how-cloudflare-supports-55-million-requests-per-second) and go down globally, there's no regional failover. You're just down everywhere.

I wrote a detailed technical breakdown with lessons for developers here: [Cloudflare Global Outage: How a Database Permission Change Broke the Internet](/cloudflare-outage-november-2025/)

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Jeff Bezos Launches AI Startup with $6.2 Billion - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/legal/legalindustry/jeff-bezos-co-lead-ai-startup-first-operational-role-since-amazon-nyt-reports-2025-11-17/)

Jeff Bezos came out of retirement on November 17 to co-CEO a new AI startup called **Project Prometheus**. This is his first operational role since leaving Amazon.

**The details:**
- **$6.2 billion** in funding secured
- Focused on AI-driven engineering for computers, automobiles, and spacecraft
- Already recruited ~100 employees from OpenAI, DeepMind, and Meta
- Co-CEO: Vik Bajaj (former Google X physicist/chemist)

**What they're building:**

AI for engineering and manufacturing. Not chatbots or code completion. They're targeting physical systems - building better cars, spacecraft, and computer hardware using AI.

**Why this is big:**

Bezos doesn't do small projects. When he came back to Amazon briefly, it was for major strategic decisions. Project Prometheus getting $6.2B and pulling talent from the top AI labs means he's serious about this.

The focus on physical engineering (not just software) is interesting. Most AI companies are chasing AGI or enterprise software. Bezos is applying AI to building actual things.

### X Rolls Out Encrypted Direct Messages - [<i class="fas fa-external-link-alt"></i>](https://help.x.com/en/using-x/encrypted-direct-messages)

X (formerly Twitter) launched end-to-end encryption for direct messages this week.

**How it works:**
- Messages encrypted on sender's device
- Only recipient can decrypt
- X cannot read the messages
- Uses public-private key cryptography
- Currently in beta for registered users

**Why this matters:**

Twitter DMs have historically been a security nightmare. Employees had access to DMs. Hackers who compromised accounts could read everything. Governments could subpoena message history.

With E2EE, that changes. X can't read your messages even if they wanted to. Even if they get hacked or served a warrant, encrypted messages stay encrypted.

**The catch:**

This is X we're talking about. The same platform that's had multiple security incidents. Trust in the implementation matters just as much as having encryption. Security researchers will be looking closely at how this was implemented.

But it's a step in the right direction. Secure messaging should be the default, not the exception.

### AMD Challenges Nvidia's AI Dominance

At the Advancing AI 2025 event this week, AMD announced its push for an open AI ecosystem to compete with Nvidia's closed platform.

**What AMD announced:**
- **MI350 Series GPUs** - 4x more AI compute, 35x better inference than previous gen
- **MI400 preview** - 10x inference performance boost
- **Helios AI rack** - integrated rack-scale platform
- **ROCm 7 software** - 3.5x performance gains, Windows support added

**The strategy:**

Nvidia owns 80%+ of the AI training market. They use proprietary CUDA software that locks customers in. AMD is going the opposite direction - open ecosystem, broad compatibility, lower prices.

**Why developers should care:**

Competition drives innovation and lower prices. If AMD can provide a viable alternative to Nvidia, it means:
- Cheaper GPU instances on cloud providers
- More options for AI training infrastructure
- Less vendor lock-in
- Better performance per dollar

Nvidia has dominated for years. AMD making a serious push with 35x inference improvements and an open platform could shake things up.

---

## <i class="fas fa-robot"></i> Google's Antigravity: AI IDE That Codes For You

### Google Enters the AI Coding Wars - [<i class="fas fa-external-link-alt"></i>](https://en.wikipedia.org/wiki/Google_Antigravity)

Google launched **Antigravity** on November 18 - an AI-powered IDE built on VS Code that goes beyond autocomplete.

**What it does:**
- You describe features, AI agents write the code
- Powered by Gemini 3 Pro (supports Claude Sonnet 4.5, OpenAI models too)
- Free during public preview
- Available for Windows, macOS, Linux

**How it's different:**

GitHub Copilot autocompletes as you type. Antigravity lets you delegate entire features to AI agents. You describe what you want, it builds it.

The question: does it actually work on real codebases, or just demos?

**The competitive landscape:**
- GitHub Copilot - autocomplete
- Cursor - AI-first editor  
- Antigravity - autonomous coding agents

AI coding tools are evolving fast. We're moving from autocomplete to autonomous feature development.


## <i class="fas fa-exclamation-triangle"></i> Lessons from This Week

**Infrastructure redundancy matters:** Single CDN = single point of failure. Multi-CDN setups cost more but prevent 6-hour global outages.

**Validate config changes:** Database permission changes should go through staging, automated validation, and canary deployments. Not straight to production.

**Set limits with headroom:** If your normal file size can double and crash your system, your limits are too tight. Use 3-5x normal size, not 1.5x.

**Database constraints prevent disasters:** Unique constraints would have prevented the duplicate entries that caused this outage. Don't rely on application logic alone.

---

## <i class="fas fa-tools"></i> Other News This Week

### Python 3.11 Released

Python 3.11 dropped with some serious performance improvements.

**What's new:**
- Up to **25% faster** than Python 3.10
- Better error messages
- Improved debugging capabilities
- New syntax features

If you're running Python in production, this upgrade is worth it just for the performance gains alone.

### Node.js 20 Now Available

The Node.js team released version 20 with some solid updates.

**Highlights:**
- Native ES module support
- Improved diagnostics
- Better performance
- Enhanced developer experience

For anyone building server-side JavaScript, Node 20 brings meaningful improvements.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$6.2 billion** - Project Prometheus funding (Jeff Bezos' AI startup)
- **6 hours** - Cloudflare global outage duration (November 18)
- **20%** - Percentage of all websites behind Cloudflare (all affected)
- **2.76%** - Cloudflare stock drop following outage
- **330+** - Cloudflare data centers affected (every single one)
- **100** - Employees already recruited by Project Prometheus
- **4x** - More AI compute in AMD MI350 vs previous gen
- **35x** - Better inference performance in AMD MI350
- **3.5x** - Performance gains in AMD's ROCm 7 software
- **25%** - Python 3.11 performance improvement over 3.10

---

*Infrastructure failures happen to everyone. Competition in AI is heating up. Security is becoming the default. Build resilient systems and stay adaptable.*

*Got news we should cover? Let us know. We're tracking what matters to developers.*


