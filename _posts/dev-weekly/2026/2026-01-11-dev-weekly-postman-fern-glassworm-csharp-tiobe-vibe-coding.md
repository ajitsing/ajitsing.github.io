---
layout: post
seo: true
title: "Dev Weekly: GlassWorm Malware Steals macOS Dev Credentials, C# Wins Language of 2025, Postman Buys Fern"
subtitle: "VS Code extensions stealing developer credentials. C# crowned TIOBE Language of the Year. Postman acquires Fern for API docs. Developer salaries hit $235K as shortage worsens 40%. Red Hat and Nvidia partner on enterprise AI."
date: 2026-01-11
categories: tech-news
permalink: /dev-weekly/2026/jan-5-11/postman-fern-glassworm-csharp-tiobe-vibe-coding/
share-img: /assets/img/posts/dev_weekly/tech-news-5-11jan-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-5-11jan-2026.png
description: "GlassWorm malware targets macOS developers via malicious VS Code extensions. C# named TIOBE Language of the Year 2025. Postman acquires Fern. Senior dev salaries hit $235K as shortage worsens 40%. Weekly developer news Jan 5-11, 2026."
keywords: "GlassWorm malware VS Code extensions, macOS developer security threat 2026, C# TIOBE language of year 2025, Postman acquires Fern API documentation, developer shortage 2026 salaries, senior JavaScript developer salary $235K, vibe coding mainstream, Red Hat Nvidia AI partnership, Keeper Security JetBrains secrets, KubeCon Europe 2026 Amsterdam, dev weekly January 2026"
comments: true
featured: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is Fern and why did Postman acquire it?"
    answer: "Fern is a company that helps developers create polished API documentation and production-ready SDKs. Postman acquired Fern on January 8, 2026 to enhance its API development platform with better documentation and SDK generation capabilities."
  - question: "What is the GlassWorm malware and how does it target developers?"
    answer: "GlassWorm is a malware campaign targeting macOS developers through malicious Visual Studio Code extensions. These extensions are hosted on OpenVSX and the Microsoft Visual Studio Marketplace. Once installed, they steal credentials, browser data, and cryptocurrency wallet information."
  - question: "Why was C# named TIOBE's Programming Language of the Year 2025?"
    answer: "TIOBE's Language of the Year goes to the language with the biggest percentage point gain, not the highest rank. C# grew by 2.94 percentage points in 2025 (from 4.45% to 7.39%), the largest increase of any language. This growth is driven by Unity game development, .NET cross-platform capabilities, and enterprise adoption."
  - question: "What is vibe coding and why has it gone mainstream?"
    answer: "Vibe coding is a development style where developers describe what they want at a high level and let AI handle implementation details. The trend started in 2025 and has now gone mainstream, with over 80% of developers using or planning to use AI tools. Senior developers particularly embrace it for handling repetitive tasks while focusing on architecture."
  - question: "How bad is the developer shortage in 2026?"
    answer: "The developer shortage has worsened by 40% in 2026. Job openings grew by 25% year-over-year while qualified candidates only increased by 7%. This has pushed senior JavaScript developer salaries to $235,000 in major cities, and the average time to hire for senior positions has extended to 95 days."
  - question: "What is the Red Hat and Nvidia collaboration about?"
    answer: "On January 6, 2026, Red Hat expanded its partnership with Nvidia to align enterprise open-source technologies with AI advancements. The collaboration focuses on rack-scale AI solutions and making AI workloads easier to deploy on enterprise infrastructure."
---

First full week of 2026, and things moved fast. Postman acquired Fern to beef up their API documentation game. A nasty malware campaign called GlassWorm is targeting macOS developers through VS Code extensions. C# was crowned TIOBE's Programming Language of the Year for 2025. The developer shortage got worse - way worse. And vibe coding? It's no longer a buzzword - it's becoming standard practice. Here's everything that happened.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Postman Acquires Fern - [<i class="fas fa-external-link-alt"></i>](https://blog.postman.com/postman-acquires-fern/)

On January 8, Postman announced they're acquiring Fern.

**What is Fern?**

Fern helps developers create polished API documentation and production-ready SDKs. If you've ever struggled with auto-generated SDK code that feels clunky, Fern aims to fix that. They focus on making API integrations smoother for developers consuming your APIs.

**Why Postman wants them:**

Postman already dominates API testing and collaboration. But the full API lifecycle includes documentation and client libraries. By adding Fern, Postman can offer end-to-end API tooling - from design to testing to documentation to SDKs.

**What this means for developers:**

If you use Postman, expect better documentation and SDK generation features in the future. For Fern users, the tool should continue working but with more resources behind it. This is Postman building a complete platform, not just a testing tool.

### GlassWorm Malware Targets macOS Developers Through VS Code Extensions - [<i class="fas fa-external-link-alt"></i>](https://www.secureblink.com/cyber-security-news/mac-malware-glass-worm-hijacks-crypto-wallets-via-vs-code-extensions)

A new wave of the GlassWorm campaign is going after macOS developers. This one's serious.

**How it works:**

The attackers are distributing malicious Visual Studio Code extensions through OpenVSX and the Microsoft Visual Studio Marketplace. Once installed, these extensions steal:

- Developer credentials
- Browser data
- Cryptocurrency wallet information
- SSH keys and tokens

**Why it's effective:**

Developers trust their IDE extensions. You install them without thinking much about it. That trust makes this attack vector dangerous. The extensions look legitimate enough to pass initial review.

**What you should do right now:**

1. **Audit your VS Code extensions** - Remove anything you don't recognize or actively use
2. **Check installation sources** - Stick to extensions from verified publishers
3. **Rotate your credentials** - If you've installed suspicious extensions, change passwords immediately
4. **Check for unusual activity** - Review your GitHub, npm, and cloud provider access logs
5. **Enable 2FA everywhere** - If you haven't already, do it now

**The bigger picture:**

This is the third major supply chain attack targeting developer tools in recent months. IDE extensions, npm packages, VS Code plugins - attackers are going where developers are. Your development environment is a target. Treat it like one.

### C# Named TIOBE Programming Language of the Year 2025 - [<i class="fas fa-external-link-alt"></i>](https://www.techrepublic.com/article/news-tiobe-commentary-jan-2026/)

The January 2026 TIOBE Index is out, and C# took the top honor.

**The standings:**

| Rank | Language | Share | Change |
|------|----------|-------|--------|
| 1 | Python | 23.27% | +2.14% |
| 2 | C | 10.99% | +1.86% |
| 3 | Java | 8.71% | -1.12% |
| 4 | C++ | 8.67% | -1.32% |
| 5 | C# | 7.39% | +2.94% |
| 6 | JavaScript | 4.01% | +0.54% |

**Why C# won Language of the Year:**

It's not about being number one. TIOBE's award goes to the language with the biggest growth. C# jumped from 4.45% to 7.39% - a **2.94 percentage point gain**, the largest of any language in 2025. That's why a #5 ranked language wins the award.

**What's driving C# growth:**

- **Unity** - Game development keeps bringing new developers to C#
- **.NET 8 and 9** - Cross-platform capabilities are mature now
- **Enterprise adoption** - Companies are choosing C# for cloud services
- **Blazor** - WebAssembly support is expanding C#'s web presence

**Other notable shifts:**

- **C is climbing** - Up to 10.99%, which is huge. Embedded systems and IoT are driving this.
- **Java dropped to third** - First time in years C++ nearly caught it.
- **TypeScript missing from top 10** - Still not tracked separately by TIOBE, which uses its own methodology.

### Developer Shortage Gets 40% Worse in 2026 - [<i class="fas fa-external-link-alt"></i>](https://jsgurujobs.com/blog/the-developer-shortage-gets-40-worse-in-2026-200k-opportunities-from-hiring-crisis)

The numbers are stark. Finding developers just got a lot harder.

**The data:**

- Developer job openings: **+25%** year-over-year
- Qualified candidates: **+7%** year-over-year
- Senior JavaScript developer median salary (major metros): **$235,000**
- Salary increase over 18 months: **+42%**
- Average time to hire for senior roles: **95 days**

**What's happening:**

Demand for developers is growing three times faster than supply. Companies are fighting over the same candidates. That's pushing salaries up and extending hiring timelines.

**Where it hurts most:**

- Senior roles - 95 days to fill on average
- AI/ML specialists - Premium on top of already high base
- Full-stack developers with cloud experience - Everyone wants them

**What this means for developers:**

Leverage. If you're experienced, you have options. If you're looking to level up, the market rewards skills. The gap between junior and senior compensation keeps widening.

**What this means for companies:**

Budget for higher salaries or longer hiring timelines. Or both. The days of lowballing offers and expecting top talent are over.

---

## <i class="fas fa-robot"></i> AI News

### Vibe Coding Goes Mainstream - [<i class="fas fa-external-link-alt"></i>](https://www.itpro.com/software/development/ai-software-development-2026-vibe-coding-security)

A new report on AI in software development shows that **vibe coding** - the trend that took off in 2025 - is now mainstream.

**What is vibe coding?**

It's a style of development where you describe what you want at a high level and let AI handle the implementation details. Less typing code, more directing AI. Less syntax, more intent.

**Who's doing it:**

Mostly senior developers. They know enough about code to spot when AI gets it wrong. They use AI for the boring parts and focus their attention on architecture, edge cases, and the stuff that actually requires human judgment.

**The numbers:**

- **80%+** of developers now use or plan to use AI tools regularly
- AI assists with coding, testing, security, and quality control
- Early adopters report significant productivity gains

**The concerns:**

The same report raised alarms about:

- **More bugs** - AI-generated code still needs review
- **Security vulnerabilities** - AI doesn't always think about attack vectors
- **Job displacement** - Particularly affecting junior developers
- **Governance gaps** - Many teams lack policies for AI tool usage

**The takeaway:**

AI is changing how we write code. But it's not replacing the need to understand code. If anything, it's making review skills more important. Someone has to verify what the AI produces.

---

## <i class="fas fa-code"></i> Developer Tools

### Keeper Security Launches JetBrains Extension - [<i class="fas fa-external-link-alt"></i>](https://www.prnewswire.com/news-releases/keeper-security-launches-jetbrains-extension-embedding-zero-trust-secrets-management-directly-into-developer-workflows-302654731.html)

On January 7, Keeper Security released an extension for JetBrains IDEs.

**What it does:**

Secure secrets management directly in your IDE. Instead of hardcoding API keys or copying them from a password manager, you can access secrets from Keeper's vault without leaving your editor.

**Supported IDEs:**

- IntelliJ IDEA
- PyCharm
- WebStorm
- Other JetBrains products

**Why it matters:**

Secrets in code is still a huge problem. Every week there's another story about API keys committed to GitHub. Having secrets management built into the development workflow makes the secure path the easy path.

### Red Hat Expands NVIDIA Collaboration for Enterprise AI - [<i class="fas fa-external-link-alt"></i>](https://www.redhat.com/en/about/press-releases/red-hat-nvidia-pair-enterprise-open-source-rack-scale-ai-faster-production-ready-innovation)

On January 6, Red Hat announced an expanded partnership with NVIDIA.

**The focus:**

Aligning enterprise open-source technologies with AI infrastructure. Think rack-scale AI deployments running on Red Hat Enterprise Linux and OpenShift, powered by NVIDIA hardware.

**What they're building:**

- Better integration between NVIDIA AI software stack and Red Hat platforms
- Optimized containers for AI workloads
- Enterprise support for AI deployments

**Why it matters:**

AI is moving from experiments to production. Enterprises need supported, certified stacks. This partnership is about making AI infrastructure as predictable and supportable as traditional enterprise workloads.

### KubeCon + CloudNativeCon Europe 2026 Schedule Announced - [<i class="fas fa-external-link-alt"></i>](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/)

On January 5, CNCF announced the schedule for KubeCon + CloudNativeCon Europe 2026.

**The details:**

- **Dates:** March 23-26, 2026
- **Location:** Amsterdam
- **Focus:** Cloud-native technologies, Kubernetes, observability, security

If you're working with containers, orchestration, or cloud-native architectures, mark your calendar.

---

## <i class="fas fa-apple-alt"></i> Apple Developer Updates - [<i class="fas fa-external-link-alt"></i>](https://developer.apple.com/news/?id=zni5qkkl)

Apple's "Hello Developer: January 2026" update dropped on January 6.

**What's new:**

- **SwiftUI Activity** - Special event in Cupertino for SwiftUI developers
- **Liquid Glass** - New ways to connect with Apple about this framework
- **Design Resources** - Video recap of Apple's design guidelines and tools
- **Develop in Swift Tutorials** - Fresh tutorials for Swift development
- **Foundation Models** - Article on leveraging Apple's on-device AI capabilities

**The Liquid Glass piece is interesting:**

Apple's been teasing Liquid Glass as a design framework. If you're building iOS or macOS apps, this is worth following. Apple doesn't usually create connection opportunities for frameworks unless something big is coming.

---

## <i class="fas fa-exclamation-triangle"></i> What This Week Teaches Us

**Supply chain attacks are getting worse:** GlassWorm targeting VS Code extensions is the latest in a pattern. Your development environment is an attack surface. Treat it that way.

**Developer tools keep consolidating:** Postman acquiring Fern follows the pattern we saw with Cursor buying Graphite. The platforms want to own the entire workflow.

**AI is changing the job, not eliminating it:** Vibe coding sounds futuristic, but it still requires developers who understand what good code looks like. AI generates; humans verify.

**C# is quietly winning:** While everyone debates JavaScript frameworks, C# keeps growing. Enterprise, gaming, web via Blazor - it's everywhere.

**The talent war is real:** 40% worse shortage. $235K median for senior JS devs. 95 days to hire. If you're hiring, budget accordingly. If you're job hunting, you have leverage.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$235,000** - Median salary for senior JavaScript developers in major metros
- **95 days** - Average time to hire for senior developer positions
- **42%** - Salary increase for senior JS devs over 18 months
- **25%** - Year-over-year growth in developer job openings
- **7%** - Year-over-year growth in qualified developer candidates
- **80%+** - Developers using or planning to use AI tools
- **10.99%** - C's share in TIOBE Index
- **+2.94%** - C#'s growth (biggest gain = Language of the Year)

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**Postman acquires Fern** - Better API docs and SDKs coming to Postman. The platform play continues.

**GlassWorm hits macOS devs** - Malicious VS Code extensions stealing credentials. Audit your extensions now.

**C# is Language of the Year** - TIOBE gave C# the crown for 2025. Unity, .NET, Blazor driving growth.

**Developer shortage at 40%** - Openings up 25%, candidates up 7%. Senior devs commanding $235K.

**Vibe coding goes mainstream** - 80%+ devs now use AI tools. What started in 2025 is now standard practice.

**Red Hat + NVIDIA** - Enterprise AI infrastructure partnership expanded. Production AI needs supported stacks.

**Keeper + JetBrains** - Secrets management in your IDE. Making security the easy path.

**KubeCon Europe announced** - March 23-26 in Amsterdam. Cloud-native community's big event.

---

*First week of 2026 set the tone. Security threats targeting developers. Consolidation in the tools space. AI changing how we work but not eliminating the need to understand code. And a talent market that heavily favors skilled developers. The themes from 2025 are accelerating. Stay sharp, audit your extensions, and if you're looking for a job - this is your market.*

*See you next week.*

