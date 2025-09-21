---
layout: post
seo: true
title: "Dev Weekly: Meta Connect Fails, Java 25 LTS, NPM Attack (Sep 15–21, 2025)"
subtitle: "Meta demo failures, Java 25 LTS release, and the ongoing NPM supply chain attack"
date: 2025-09-21
categories: tech-news
permalink: /dev-weekly-meta-connect-fails-java-25-lts-npm-attack/
share-img: /assets/img/posts/dev_weekly/dev-weekly-cover.png
thumbnail-img: /assets/img/posts/dev_weekly/dev-weekly-cover.png
description: "This week's top developer news: Meta's Connect 2025 live demo failures, Java 25 LTS goes live, new details on the NPM supply chain attack, plus Copilot and AWS updates, Kubernetes 1.34 rollouts, React 19 momentum, and more."
keywords: "Meta Connect 2025, Meta demo failure, Java 25 LTS, NPM supply chain attack, Shai-Hulud, GitHub Copilot update, AWS Bedrock Qwen 3, DeepSeek-V3.1, Kubernetes 1.34, React 19, Docker Desktop bi-weekly, developer news September 2025"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

The third week of September 2025 delivered some of the biggest developer news stories of the year. From embarrassing live demo failures at major conferences to significant security incidents and exciting product launches, here's everything that happened in the developer world this week.

---

## 🔥 Top Stories This Week

### Meta's Epic Demo Disasters at Connect 2025 - [🌐](https://www.uploadvr.com/meta-explains-why-connect-2025-keynote-live-demos-failed/)
Meta Connect 2025 (September 17–18) gave us a masterclass in why live demos are hard. Mark Zuckerberg's on‑stage demos failed in front of a packed room and a global stream.

What went wrong:

- **Ray‑Ban Meta Live AI demo** - When chef Jack Mancuso said “Hey Meta, start Live AI” on stage, it triggered every Ray‑Ban Meta glasses in the building
- **Self‑inflicted DDoS** - Live AI traffic had been routed to development servers that got overwhelmed by hundreds of glasses activating at once
- **WhatsApp video call failure** - Zuckerberg couldn't answer incoming calls four times in a row due to a race condition bug

Meta CTO Andrew Bosworth later explained the technical details in an Instagram AMA, calling it “a terrible, terrible place for that bug to show up”. Despite the failures, the tech - including the new Ray‑Ban Display glasses with neural band control - worked as intended during private demos.

### Java 25 LTS Released - [🌐](https://www.infoq.com/news/2025/09/java25-released/)
Oracle officially released **Java 25 LTS** on September 15th, the first long‑term support release since Java 21. It ships **18 JEPs** with significant performance work.

Key features:

- **Compact Object Headers** - reduces memory usage and improves cache performance
- **Ahead‑of‑Time Method Profiling** - faster startup using data from previous runs
- **Scoped Values** - new thread‑local model designed for virtual threads
- **Module Import Declarations** - makes Java easier for beginners

With 8+ years of support guaranteed, Java 25 is already landing in major IDEs. JetBrains announced IntelliJ IDEA support on September 16th.

### NPM Supply Chain Attack Continues - [🌐](https://www.armorcode.com/blog/inside-the-september-2025-npm-supply-chain-attack)
The sophisticated NPM supply chain attack that began September 8th reached new heights this week. Researchers published more about the **“Shai‑Hulud”** worm that compromised 200+ packages.

Attack details:

- **Phishing** via a fake `npmjs.help` domain registered September 5th
- **200+ packages** compromised, including popular ones like `debug` and `chalk`
- **Cryptocurrency‑theft malware** targeted at browser environments specifically
- **Self‑propagating worm** designed to spread across package dependencies

Multiple security agencies issued advisories this week, with Singapore's CSA publishing alert AD‑2025‑019 on September 17th.

---

## 🚀 Major Releases & Updates

### GitHub Copilot - September Updates - [🌐](https://github.blog/changelog/2025-09-12-github-copilot-in-vs-code-august-release-v1-104/)
GitHub rolled out meaningful Copilot improvements:

- **Auto model selection in Copilot Chat** for better performance
- **Sensitive file confirmation** - explicit approval required for certain file types
- **Enhanced agent workflows** with collapsed file lists and contextual prompts
- **AGENTS.md support** so teams can document best practices for agents
- Better terminal auto‑approve settings and collaboration features for the coding agent

### AWS Developer Updates - [🌐](https://future.forem.com/om_shree_0709/major-tech-news-september-18-2025-2bni)
Busy week from AWS (Sep 15–18) with multiple launches:

- **Qwen 3** models now available in **Amazon Bedrock**
- **DeepSeek‑V3.1** model with thinking/non‑thinking modes
- **LocalStack integration in VS Code** for local serverless testing
- **Strands Agents** passed 1M downloads and 3k+ GitHub stars

AWS was also named a **Leader in Gartner's 2025 Magic Quadrant for Cloud‑Native Application Platforms**.

### Microsoft Visual Studio 2026 Preview - [🌐](https://devblogs.microsoft.com/visualstudio/visual-studio-2026-insiders-is-here/)
The **Visual Studio 2026 Insiders** preview (Sep 10) picked up traction this week. Highlights:

- **AI Profiler Agent** runs continuously in the background
- **Paste & Fix** automatically reformats code snippets to your project's conventions
- **Blazing performance** on both x64 and Arm64
- **Deep GitHub Copilot integration** throughout the IDE

Early adopters call it the fastest Visual Studio ever.

---

## ⚠️ Security & Infrastructure

### Major Outages This Week

- **Meta Ads issues (Sep 9)** - Widespread delivery problems reported; status page showed “Medium Disruptions” before resolution at 1:53 PM PDT
- **Cloudflare–AWS incident follow‑up** - Cloudflare published a detailed post‑mortem for the Aug 21 event that congested traffic between Cloudflare and AWS (us‑east‑1)

### Kubernetes 1.34 Production Rollouts - [🌐](https://opensource.googleblog.com/2025/09/kubernetes-134-is-available-on-gke.html)
**Kubernetes 1.34 “Of Wind & Will”** continued rolling into production. Google Kubernetes Engine made it available in the Rapid Channel on Sep 9, just days after the Aug 27 OSS release.

Key improvements:

- **Dynamic Resource Allocation (DRA)** graduated to GA
- Better **GPU/accelerator scheduling** for AI/ML workloads
- **KYAML support** - a safer YAML subset for Kubernetes
- Faster **API server performance** via cache snapshots

---

## 📈 Industry Trends

### AI Development Tools Explosion
Sept 17 brought a wave of funding for AI dev tools:

- **Groq** raised **$750M** at a **$6.9B** valuation for AI chip infrastructure
- **CodeRabbit** secured **$60M** for AI‑powered code reviews
- **Blacksmith** raised **$10M** Series A for next‑gen CI/CD

LogRocket published their **AI dev tool power rankings** for September 2025, showing how fast this market is moving.

### Programming Language Updates

- **TypeScript 5.9** adoption is rising, with `import defer`, better Node.js compatibility, and improved `tsc --init`
- **Python 3.13.3** rollout continues with experimental **free‑threading (no GIL)** — drawing a lot of developer interest

---

## 🔧 Developer Experience

### New Tools & Platforms

- **Gluon programming language** — a new language for fine‑tuned GPU kernel control with direct hardware access
- **Stanford CS231n** — the classic deep learning course added 2025 modules on video, 3D vision, and robot learning

### Framework News

- **React 19** adoption continues to grow; **Server Components** are stable in Next.js 14+ and driving production moves
- **Docker Desktop** bi‑weekly releases are paying off with faster bug fixes and features

---

## 📅 Events & Community

### Upcoming Conferences

- **GitHub Universe 2025** — Oct 28–29 in San Francisco. Theme: **AI‑powered development**. Expanded virtual options available.
- **Git Merge 2025** — Sep 29–30 in San Francisco, celebrating **20 years of Git**. Sessions on SHA‑256 interoperability and large object support.

### Notable Events This Week

- **Huawei Connect 2025 (Sep 18)** - Announced Ascend 950 series chips and SuperPoD architecture, plus a three‑year AI chip roadmap [🌐](https://www.huawei.com/en/news/2025/9/hc-xu-keynote-speech)
- **NVIDIA–Intel collaboration (Sep 18)** - Companies announced joint development of AI infrastructure and PC products [🌐](http://nvidianews.nvidia.com/news/nvidia-and-intel-to-develop-ai-infrastructure-and-personal-computing-products)

---

The pace of innovation in developer tools keeps climbing. **AI is becoming table stakes**, and **security** remains a top concern as supply chain attacks get more sophisticated.

