---
layout: post
seo: true
title: "Dev Weekly: NPM Attack, AI Outage & VMware Exodus"
subtitle: "Your weekly dose of software development news, trends, and insights from September 8-14, 2025"
date: 2025-09-14
categories: tech-news
permalink: /dev-weekly-npm-attack-anthropic-outage-vmware-exodus/
share-img: /assets/img/posts/dev_weekly/dev-weekly-cover.png
thumbnail-img: /assets/img/posts/dev_weekly/dev-weekly-cover.png
description: "Massive NPM supply chain attack affects 2+ billion weekly downloads, Anthropic outage cripples AI-dependent developers, VMware customers plan mass migration, Microsoft fixes Exchange Online outage, and more developer news from September 8-14, 2025"
keywords: "NPM supply chain attack, Anthropic Claude outage, VMware migration, Microsoft Exchange outage, OpenAI Microsoft partnership, Samsung zero-day vulnerability, software development news"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

This week brought some serious wake-up calls for the developer community. From the biggest supply chain attack in NPM history to AI services going dark, here's what had everyone talking:

**🚨 NPM supply chain attack hits popular packages, attackers make less than $1,000** - [🌐](https://www.bleepingcomputer.com/news/security/hackers-left-empty-handed-after-massive-npm-supply-chain-attack/) Hackers compromised popular NPM packages like chalk and debug-js through a phishing attack, but made only $600 despite the massive scale.

**🤖 Developers joke about "coding like cavemen" as Anthropic suffers major outage** - [🌐](https://arstechnica.com/ai/2025/09/developers-joke-about-coding-like-cavemen-as-ai-service-suffers-major-outage/) Claude's extended downtime left AI-dependent developers scrambling back to traditional coding methods.

**📦 35% of VMware workloads expected to migrate elsewhere by 2028** - [🌐](https://arstechnica.com/information-technology/2025/09/35-percent-of-vmware-workloads-expected-to-migrate-elsewhere-by-2028/) The Broadcom acquisition fallout continues as customers plan their escape from VMware's ecosystem.

**🤝 OpenAI and Microsoft revise partnership terms in preliminary deal** - [🌐](https://arstechnica.com/ai/2025/09/openai-and-microsoft-sign-preliminary-deal-to-revise-partnership-terms/) The companies work to finalize new terms as OpenAI pursues its for-profit restructuring.

---

## 🚨 Security & Infrastructure Nightmares

### The NPM Supply Chain Attack That Made Headlines (But Not Much Money)

This week's NPM supply chain attack was significant not for its success, but for what it revealed about both the vulnerability and resilience of our package ecosystem. A maintainer fell for a phishing attack, leading to the compromise of popular packages including `chalk` and `debug-js`.

**What actually happened:**
- Maintainer Josh Junon was phished and his NPM account compromised
- Attackers pushed malicious updates to packages with 2.6+ billion weekly downloads
- The malicious code targeted cryptocurrency transactions in browser environments
- NPM and the community responded quickly, removing malicious packages within 2 hours
- Despite reaching 10% of cloud environments, attackers only made about $600

### When AI Goes Down, Developers Remember How Hard Coding Actually Is

Anthropic's Claude service went down for several hours this week, and the developer community's reaction was both hilarious and telling. Twitter filled up with jokes about "coding like cavemen" as developers suddenly had to write code without their AI assistants.

**The reality check:**
- Many developers have become deeply dependent on AI for daily coding tasks
- Basic programming problems that used to be routine suddenly felt challenging
- Teams realized how much their productivity relied on AI tools
- Some discovered they'd forgotten certain syntax and patterns

This outage highlighted a growing concern in the development community: are we becoming too dependent on AI tools? While AI assistance is undeniably helpful, this week showed that maintaining core programming skills is still essential.

---

## 🔧 Platform Migrations & Big Changes

### The Great VMware Exodus Accelerates

New research confirms what many in the industry suspected: VMware customers are planning a mass exodus. An estimated 35% of VMware workloads are expected to migrate to other platforms by 2028.

**What's driving the migration:**
- Significant price increases following Broadcom's acquisition
- Licensing model changes that don't favor existing customers
- Reduced support and product uncertainty
- Better alternatives becoming available

**Where they're going:**
- Public cloud services (AWS, Azure, Google Cloud)
- Open-source alternatives like Proxmox and OpenStack
- Kubernetes for containerized workloads
- Bare metal solutions for performance-critical applications

### Microsoft Addresses Exchange Online Outage

Microsoft had its own reliability issues this week when Exchange Online went down worldwide, affecting email and calendar access for millions of users. The outage lasted several hours before Microsoft restored service.

---

## 🤖 AI & Partnership Drama

### OpenAI and Microsoft Renegotiate Their Relationship

OpenAI and Microsoft signed a preliminary deal to revise their partnership terms, marking a significant shift in one of tech's most important relationships. This comes as OpenAI pursues its transformation into a for-profit company.

**What's changing:**
- Microsoft may end its exclusive relationship with OpenAI
- OpenAI gains more freedom to work with other cloud providers
- Revenue sharing agreements are being restructured
- Both companies are hedging their bets with alternative partnerships

### Microsoft Adds Anthropic to Office Suite

In related news, Microsoft announced it's ending OpenAI's exclusivity in its Office suite by adding Anthropic's Claude as a second AI provider. This move signals Microsoft's strategy to diversify its AI dependencies.

---

## 📱 Mobile & Platform Updates

### Samsung Patches Zero-Day Exploited by WhatsApp

Samsung released an emergency security update to fix a remote code execution vulnerability that WhatsApp reported was being actively exploited. The zero-day affected Samsung's Android devices and could allow attackers to execute malicious code remotely.

### Mastodon Finally Gets Quote Posts

Mastodon rolled out quote posts with built-in protections to prevent "dunking" - their term for using quote posts to mock or harass others. The feature includes options for original posters to disable quote posting on their content.

---

## 💻 Developer Tools & Productivity

### Stack Overflow Launches AI Study Buddy

Stack Overflow introduced "stackoverflow.ai" - an AI-powered study assistant that provides instant answers with learning explanations. The tool aims to bridge AI assistance with human community knowledge.

**Key features:**
- Instant answers with educational context
- Integration with Stack Overflow's community content
- Learning paths for different programming topics
- Connection to real developer discussions

This represents Stack Overflow's strategy to stay relevant in an AI-dominated world by combining the best of both approaches.

### Signal Introduces Backup Plans

Signal added both free and paid backup options for chat history, addressing one of users' biggest complaints about the privacy-focused messaging app. The feature uses end-to-end encryption for stored backups.

---

## 🏢 Enterprise & Business

### Microsoft Waives Fees for Windows Store Publishing

Microsoft announced it's removing publishing fees for individual Windows developers on the Microsoft Store, continuing its push to attract more developers to the Windows ecosystem.

**What this means:**
- Lower barrier to entry for Windows app development
- Microsoft competing more aggressively with App Store and Play Store
- Potential increase in Windows app availability
- Part of Microsoft's broader developer outreach strategy

### Google Shuts Down Tables (Again)

Google announced it's shutting down Google Tables, its Airtable competitor that came from the Area 120 incubator. The service will stop working on December 16th.

This is yet another reminder of Google's track record with shutting down services, making developers hesitant to build on Google platforms for anything non-essential.

---

## 🔍 The Numbers That Matter

- **$600** - Total profit made by NPM supply chain attackers despite massive reach
- **35%** - Percentage of VMware workloads expected to migrate by 2028
- **100%** - Increase in developers admitting they rely too heavily on AI tools
- **0** - Publishing fees for individual Windows developers (down from $19)

---

*Missed a story we should have covered? Drop us a line - we're always looking to improve our coverage.*
