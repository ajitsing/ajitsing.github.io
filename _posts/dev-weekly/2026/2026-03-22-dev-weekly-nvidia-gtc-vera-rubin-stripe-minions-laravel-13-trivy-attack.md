---
layout: post
seo: true
title: "Dev Weekly: Nvidia GTC Drops Vera Rubin, Stripe Ships 1,300 PRs/Week with AI, Laravel 13 Arrives"
subtitle: "Nvidia unveils Vera Rubin at GTC 2026. Stripe's Minions agents ship 1,300+ pull requests weekly. Microsoft restructures Copilot leadership. OpenAI signs AWS deal for government AI. Java 26 ships with HTTP/3 and Vector API. Laravel 13 and Next.js 16.2 drop. Trivy compromised again. GlassWorm malware hits 72 Open VSX extensions."
date: 2026-03-22
categories: tech-news
permalink: /dev-weekly/2026/mar-16-22/nvidia-gtc-vera-rubin-stripe-minions-laravel-13-trivy-attack/
share-img: /assets/img/posts/dev_weekly/tech-news-16-22mar-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-16-22mar-2026.svg
description: "Nvidia unveils Vera Rubin platform and DLSS 5 at GTC 2026. Stripe Minions AI agents produce 1,300+ pull requests per week. Microsoft restructures Copilot under new leadership. OpenAI signs AWS deal for US government AI. Java 26 released with HTTP/3 support, Vector API, and ahead-of-time object caching. Laravel 13 ships with AI SDK. Next.js 16.2 delivers 400% faster dev startup. Trivy GitHub Actions compromised in second supply chain attack. GlassWorm malware infects 72 Open VSX extensions. GitLab 18.10 adds passkeys and AI security. March 2026 developer news."
keywords: "Nvidia GTC 2026 Vera Rubin GPU Groq 3 LPU, Nvidia DLSS 5 neural rendering announcement, Stripe Minions autonomous coding agents 1300 PRs per week, Microsoft Copilot leadership Mustafa Suleyman superintelligence, OpenAI AWS government deal classified unclassified, Java 26 JDK 26 release HTTP/3 Vector API ahead-of-time caching, Laravel 13 release PHP 8.3 AI SDK attributes, Next.js 16.2 release Turbopack faster dev startup, Trivy GitHub Actions supply chain attack CI/CD secrets, GlassWorm malware Open VSX extensions Solana, GitLab 18.10 passkeys AI SAST security, Mistral Forge enterprise custom AI models GTC, Anthropic Claude B2B marketplace launch, Dell layoffs 11000 AI pivot, Linux Foundation open source security $12.5 million, Dependabot npm malware detection, Nvidia Agent Toolkit OpenShell, Checkmarx agentic security platform, dev weekly March 2026, software developer news"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What did Nvidia announce at GTC 2026?"
    answer: "Nvidia held GTC 2026 from March 16-19 in San Jose. Jensen Huang unveiled the Vera Rubin platform with seven new chips including the Rubin GPU (336 billion transistors, 288GB HBM4, 50 petaFLOPS), the Groq 3 LPU for low-latency inference, and DLSS 5 which uses generative AI to render photorealistic lighting in games. Nvidia also launched the Agent Toolkit with OpenShell runtime for building and running secure enterprise AI agents, with 17 partners including Adobe, Salesforce, SAP, and ServiceNow."
  - question: "What are Stripe Minions and how many pull requests do they produce?"
    answer: "Stripe Minions are autonomous coding agents that produce over 1,300 pull requests per week with zero human-written code. Engineers invoke them through Slack, CLI, or a web interface with a task description, and the agents run in isolated devboxes, write code, tests, and documentation, then submit PRs for human review. They evolved from an internal fork of Goose, an open-source coding agent developed by Block. All code is reviewed by humans before merging. The system supports over $1 trillion in annual payment volume at Stripe."
  - question: "What is Nvidia DLSS 5?"
    answer: "DLSS 5 was announced at Nvidia GTC 2026 on March 16. Unlike previous DLSS versions that focused on upscaling resolution or generating frames, DLSS 5 uses a real-time neural rendering model to generate photorealistic lighting and materials. It analyzes scene semantics including characters, hair, fabric, and environmental conditions, then reconstructs lighting effects at up to 4K resolution. Jensen Huang called it the 'GPT moment for graphics.' It's expected to launch in autumn 2026 with support from Bethesda, Capcom, Ubisoft, and others."
  - question: "Why did Microsoft restructure its Copilot leadership in March 2026?"
    answer: "On March 17, 2026, Microsoft announced a major reorganization of its Copilot division. Jacob Andreou was appointed Executive Vice President of Copilot, unifying commercial and consumer Copilot into one organization. Mustafa Suleyman, previously leading Microsoft AI, shifted focus to lead the company's superintelligence efforts, concentrating on building frontier AI models. The restructuring addresses the fact that consumer and commercial Copilot versions had looked very different and lacked shared features."
  - question: "What happened with the Trivy supply chain attack in March 2026?"
    answer: "On March 19, 2026, attackers compromised Aqua Security's Trivy vulnerability scanner in a supply chain attack targeting CI/CD pipelines. Using stolen credentials from a previous March 1 breach, they force-pushed malicious code to 75 of 76 trivy-action version tags. The malware ran alongside legitimate Trivy scans, harvesting GitHub tokens, cloud credentials, SSH keys, and Kubernetes tokens from runner process memory. The exposure window lasted about 12 hours. Only version 0.35.0 remained safe. Organizations running affected versions should rotate all pipeline secrets immediately."
  - question: "What's new in Java 26 (JDK 26)?"
    answer: "Java 26 was released on March 17, 2026, with 10 JEPs. The finalized features include HTTP/3 support for the HTTP Client API (JEP 517), G1 garbage collector throughput improvements (JEP 522), ahead-of-time object caching with any GC (JEP 516), and removal of the Applet API (JEP 504). Preview and incubator features include the Vector API for SIMD-based AI/ML computations (eleventh incubator), Structured Concurrency (sixth preview), primitive types in patterns (fourth preview), PEM encodings for cryptographic objects (second preview), and Lazy Constants (second preview)."
  - question: "What's new in Laravel 13?"
    answer: "Laravel 13 was released on March 17, 2026. It requires PHP 8.3 as the minimum version and introduces first-class support for PHP Attributes across the framework, a first-party Laravel AI SDK for text generation, tool-calling agents, embeddings, and vector search, native JSON:API resource support, queue routing by class, and passkey authentication via WebAuthn. Taylor Otwell called it the smoothest upgrade in Laravel's history with zero breaking changes. Bug fixes are supported through Q3 2027."
---

Nvidia dominated this week with GTC 2026. Jensen Huang unveiled the Vera Rubin platform, DLSS 5, and a full stack for enterprise AI agents. Stripe pulled back the curtain on Minions, their autonomous coding agents that ship over 1,300 pull requests per week without a single line of human-written code. Microsoft restructured its Copilot leadership to let Mustafa Suleyman focus on superintelligence. OpenAI signed an AWS deal to sell AI to the US government. On the frameworks and languages side, Java 26 shipped with HTTP/3 and the Vector API, Laravel 13 landed with a first-party AI SDK, and Next.js 16.2 delivered a 400% faster dev startup. And on security, Trivy got compromised for the second time in three weeks, this time targeting CI/CD pipelines directly. Here's everything.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Nvidia GTC 2026: Vera Rubin Platform, DLSS 5, and the Agent Toolkit - [<i class="fas fa-external-link-alt"></i>](https://blogs.nvidia.com/blog/gtc-2026-news)

Nvidia held GTC 2026 from March 16 to 19 in San Jose. Jensen Huang's keynote was packed. Here are the announcements that matter for developers.

**Vera Rubin platform:**

The headline hardware announcement. Vera Rubin is a full platform with seven new co-designed chips: the Rubin GPU, Vera CPU, Groq 3 LPU, NVLink 6 Switch, ConnectX-9 SuperNIC, BlueField-4 DPU, and Spectrum-6 Ethernet switch. The Rubin GPU has 336 billion transistors, 288GB of HBM4 memory, 22 TB/s memory bandwidth, and delivers 50 petaFLOPS of inference performance per chip. A full NVL72 rack with 72 Rubin GPUs hits 3,600 petaFLOPS. Huang projected $1 trillion in purchase orders for Blackwell and Vera Rubin systems through 2027, double the previous estimate.

**Groq 3 LPU:**

This is Nvidia's first chip from the Groq acquisition it completed in December for $20 billion. The Groq 3 LPU is a specialized inference chip with 500 MB of SRAM and 150 TB/s bandwidth. A Groq 3 LPX rack with 256 LPUs delivers 35x higher tokens-per-watt compared to Vera Rubin GPUs. It's designed to work alongside Rubin GPUs, with LPUs handling feed-forward network layers while GPUs process attention operations. Ships Q3.

**DLSS 5:**

Huang called this "the GPT moment for graphics." Unlike previous DLSS versions that upscaled resolution or generated extra frames, DLSS 5 uses a real-time neural rendering model to generate photorealistic lighting and materials. The AI analyzes a single frame to understand complex scene elements like characters, hair, fabric, and environmental lighting, then reconstructs the lighting at up to 4K resolution. Bethesda, Capcom, Ubisoft, Tencent, and Warner Bros. have committed support. Expected to launch in autumn 2026.

**Agent Toolkit and OpenShell:**

On the software side, Nvidia launched the Agent Toolkit, an open-source platform for building enterprise AI agents. The toolkit includes OpenShell, a policy-based secure runtime that runs agents in sandboxed environments with declarative YAML policies. Agents can't access unauthorized files, exfiltrate data, or make uncontrolled network calls. 17 enterprise partners are already on board including Adobe, Salesforce, SAP, ServiceNow, Atlassian, CrowdStrike, Cisco, and Palantir. Claude Code, Codex, and OpenAI's agents can run unmodified inside OpenShell with minimal code changes.

**Why it matters:**

Nvidia is not just selling chips anymore. With GTC 2026, the company laid out a full stack: chips for training (Rubin), chips for inference (Groq 3 LPU), software for running agents safely (OpenShell), and open models to power them (Nemotron). For developers building agentic systems, the Agent Toolkit and OpenShell are the announcements worth paying attention to.

### Stripe Reveals Minions: Autonomous Agents Producing 1,300+ Pull Requests Per Week - [<i class="fas fa-external-link-alt"></i>](https://www.infoq.com/news/2026/03/stripe-autonomous-coding-agents/)

Stripe's internal AI coding agents, called Minions, are now producing over 1,300 pull requests per week. Every line of code is written by the agents. Every PR is reviewed by a human.

**How they work:**

Minions are not interactive copilots. They're unattended, one-shot agents. An engineer gives them a task through Slack, CLI, or a web interface, and the agent takes it from there. Each Minion runs in an isolated, pre-warmed devbox that spins up in under 10 seconds. It writes the code, writes the tests, writes the documentation, and submits a pull request ready for review.

**The infrastructure:**

Minions use "blueprints," which are workflows that combine deterministic code paths with flexible agent loops. They have access to over 400 internal tools through an MCP server called Toolshed. The system evolved from an internal fork of Goose, the open-source coding agent originally built by Block.

**The key insight from Stripe's engineering team:**

The agents work because Stripe already had strong infrastructure for human engineers. Their CI/CD pipelines, automated test suites, static analysis tools, and code review processes were all built years before LLMs existed. The agents plug into that same infrastructure. The engineering environment, not the AI model, is what makes reliable output possible.

**Scale:**

The code these agents write and modify supports over $1 trillion in annual payment volume. That's not a side project. These are production changes going through the same quality gates as human-written code.

**Why it matters:**

Stripe is one of the first companies to publicly share concrete numbers on autonomous coding agents in production at this scale. 1,300 PRs per week with zero human-written code is a real data point, not a demo. The lesson is clear: the quality of your engineering infrastructure determines how useful AI coding agents can be for you.

### Microsoft Restructures Copilot Leadership, Suleyman Moves to Superintelligence - [<i class="fas fa-external-link-alt"></i>](https://blogs.microsoft.com/blog/2026/03/17/announcing-copilot-leadership-update/)

On March 17, Microsoft announced a major reorganization of its Copilot division.

**The new structure:**

Jacob Andreou is now Executive Vice President of Copilot, reporting directly to Satya Nadella. He's unifying consumer and commercial Copilot into one organization across four pillars: Copilot experience, Copilot platform, Microsoft 365 apps, and AI models. Andreou previously ran product and growth at Microsoft AI, and before that he was a Senior VP at Snap.

**Suleyman's shift:**

Mustafa Suleyman, who has been leading Microsoft AI, is moving to focus on the company's "superintelligence" efforts. That means building frontier AI models and the compute infrastructure to run them. Microsoft is betting that building its own models over the next five years is important enough to free up its AI chief to work on it full-time.

**Why the change:**

Consumer and commercial Copilot have been running as separate products with different features and different teams. That's created fragmentation. The reorganization puts everything under one roof as Copilot shifts from a question-answering tool to one that can execute multi-step tasks.

**Why it matters:**

Microsoft is clearly moving Copilot from an AI assistant to an agentic platform. Unifying consumer and commercial under one leader signals that they want a single, consistent agent experience across all their products. Suleyman's shift to superintelligence work suggests Microsoft thinks the next model frontier requires dedicated leadership, separate from the product work.

### OpenAI Signs AWS Deal to Sell AI to US Government Agencies - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/17/openai-expands-government-footprint-with-aws-deal/)

On March 17, OpenAI signed a partnership with Amazon Web Services to sell its AI models to US defense and government agencies for both classified and unclassified work.

**What the deal covers:**

OpenAI's models will run on AWS infrastructure, including Amazon's Trainium AI chips. This gives approximately 3 million Defense Department employees access through AWS's existing government contracts. AWS will be the exclusive third-party cloud distributor for OpenAI's Frontier enterprise platform.

**The context:**

This is the latest move in the reshuffling that started when the Pentagon designated Anthropic a supply chain risk. Anthropic refused unrestricted military use of Claude. OpenAI stepped in with a Pentagon contract in late February. This AWS deal expands that footprint beyond the Pentagon to civilian agencies.

**The strategic angle:**

Government contracts serve as credibility signals for enterprise sales. Landing the US government as a customer makes it easier to sell to large corporations. AWS gets to offer OpenAI models through its existing government infrastructure. OpenAI gets distribution. Both companies benefit.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Java 26 Released: HTTP/3, Vector API, and Ahead-of-Time Caching - [<i class="fas fa-external-link-alt"></i>](https://www.oracle.com/news/announcement/oracle-releases-java-26-2026-03-17/)

On March 17, Oracle released Java 26 (JDK 26) with 10 JEPs, five finalized and five in preview or incubation.

**Finalized features:**

HTTP/3 support lands in the HTTP Client API (JEP 517). The G1 garbage collector gets a throughput boost by reducing synchronization between threads (JEP 522). Ahead-of-time object caching now works with any garbage collector, not just the default, improving startup and warmup time (JEP 516). The Applet API, deprecated since JDK 17, is finally removed (JEP 504). And JEP 500 starts warning about deep reflection that mutates final fields, preparing the ground for locking that down in a future release.

**Preview and incubator features:**

The Vector API enters its eleventh incubator round (JEP 529), providing SIMD-based vector computations for AI and ML workloads. Structured Concurrency (JEP 525) continues in its sixth preview with an API for managing concurrent tasks as a unit. Primitive types in patterns, instanceof, and switch (JEP 530) reaches its fourth preview. PEM encodings for cryptographic objects (JEP 524) and Lazy Constants (JEP 526) are both in second preview.

**The takeaway:**

This release is more about infrastructure and performance than flashy new language features. HTTP/3, better GC throughput, and faster startup matter for production workloads. The Vector API continues its slow march toward stabilization, which will matter a lot once AI inference in Java becomes more common.

### Laravel 13 Released: PHP 8.3, Attributes, and a First-Party AI SDK - [<i class="fas fa-external-link-alt"></i>](https://laravel-news.com/laravel-13-released)

On March 17, Laravel 13 shipped. Taylor Otwell called it "the smoothest upgrade in Laravel's history." Zero breaking changes.

**What's new:**

PHP 8.3 is now the minimum version. The biggest addition is first-class support for native PHP Attributes across the framework. You can now define behavior inline on models, jobs, console commands, and more using attributes instead of configuration files. It's fully optional and backward compatible.

**Laravel AI SDK:**

Laravel now ships a first-party AI SDK with a unified API for text generation, tool-calling agents, embeddings, audio, images, and vector-store integrations. Combined with native vector query support and semantic search capabilities using PostgreSQL and pgvector, Laravel is making a clear play for developers building AI-powered applications.

**Other additions:**

JSON:API resource support is now built in. Queue routing by class through `Queue::route(...)` lets you define default queue and connection rules per job class. `Cache::touch()` extends TTLs without re-fetching values. Passkey authentication with WebAuthn (Face ID, fingerprint, hardware keys) is built into starter kits and Fortify. The Reverb database driver now supports horizontal scaling with MySQL or PostgreSQL, removing the Redis requirement.

**Support timeline:**

Bug fixes through Q3 2027. Security updates through Q1 2028.

### Next.js 16.2: 400% Faster Dev Startup - [<i class="fas fa-external-link-alt"></i>](https://nextjs.org/blog/next-16-2)

Next.js 16.2 shipped on March 18 with a focus on performance.

**The numbers:**

`next dev` startup is about 400% faster. Server-side rendering is about 50% faster. Server Component rendering to HTML is 25-60% faster through optimized payload deserialization. Over 200 Turbopack fixes and improvements landed in this release.

**New features:**

Node.js debugger support for production servers with the `--inspect` flag. Redesigned default error page. A Hydration Diff Indicator that makes it easier to debug server/client mismatches. Server Function logging in the terminal during development. Turbopack got Server Fast Refresh for fine-grained server-side hot reloading, Subresource Integrity support, tree shaking of dynamic imports, and `postcss.config.ts` support.

**AI improvements:**

Agent-ready project setup and browser log forwarding are aimed at developers building with AI coding tools.

### GitLab 18.10: AI Security and Passkey Login - [<i class="fas fa-external-link-alt"></i>](https://about.gitlab.com/releases/2026/03/19/gitlab-18-10-released/)

GitLab 18.10 shipped on March 19 with over 60 improvements.

**Security features:**

SAST false positive detection is now generally available. It uses machine learning to analyze findings and assign confidence scores so teams can focus on real vulnerabilities. Agentic SAST vulnerability resolution is in beta, automatically creating merge requests with proposed fixes for verified vulnerabilities. Secret false positive detection is also in beta, flagging test and dummy secrets to reduce review noise.

**Passkeys:**

Passwordless sign-in with passkeys is available for all GitLab editions. It's set as the default login method for accounts with two-factor authentication enabled. The private key stays on the user's device.

### Mistral Forge: Build-Your-Own AI for Enterprises - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/17/mistral-forge-nvidia-gtc-build-your-own-ai-enterprise/)

Mistral announced Forge at Nvidia GTC on March 17. It's a platform that lets enterprises train custom AI models from scratch on their own data.

**How it's different:**

OpenAI and Anthropic let you fine-tune their existing models. Mistral Forge lets you build the model itself. You bring your data, choose between dense and mixture-of-experts architectures, and train the model on-premises for full data sovereignty. Pre-training, post-training, and reinforcement learning are all supported.

**Who's using it:**

ASML, Ericsson, the European Space Agency, and DSO National Laboratories Singapore are early adopters. CEO Arthur Mensch says Mistral is on track to pass $1 billion in annual recurring revenue in 2026.

**Why it matters:**

For organizations in finance, defense, and government that can't send data to a third-party API, Forge offers a way to get custom AI models without giving up control. It's a different bet than what OpenAI and Anthropic are making, and clearly there's demand for it.

### Anthropic Launches Claude B2B Marketplace - [<i class="fas fa-external-link-alt"></i>](https://www.digitalcommerce360.com/2026/03/16/anthropic-launches-claude-b2b-marketplace-enterprise-ai-applications/)

On March 16, Anthropic launched a B2B marketplace for enterprise AI applications built on Claude.

**How it works:**

Enterprises can discover and deploy third-party software that runs on Claude models, and use their existing Anthropic spending commitments to pay for it. No separate procurement cycle needed. The marketplace launched in limited preview with applications from Snowflake, GitLab, Harvey AI, Replit, Rogo, and Lovable.

**The pricing model:**

Anthropic is not taking a commission on transactions. That's different from AWS and Azure marketplaces, which charge 3-15%. Anthropic is treating the marketplace as a distribution channel to grow the Claude ecosystem, not as a revenue source.

### GitHub Copilot: GPT-5.3-Codex Gets Long-Term Support - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-03-18-gpt-5-3-codex-long-term-support-in-github-copilot)

On March 18, GitHub announced that GPT-5.3-Codex now has long-term support (LTS) status in GitHub Copilot. The model will be supported for 12 months, from its February 5, 2026 launch through February 4, 2027, and will become the default base model for Copilot Business and Enterprise plans by May 17, 2026. Copilot's coding agent also got several improvements this week: 50% faster start times, semantic code search, configurable validation tools, and live log monitoring in Raycast.

### Dependabot Now Detects Malware in npm Dependencies - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-03-17-dependabot-now-detects-malware-in-npm-dependencies/)

On March 17, GitHub enabled malware alerting in Dependabot for npm packages. This is a separate category from CVE-based vulnerability alerts. Dependabot now matches your npm dependencies against malware advisories in the GitHub Advisory Database. You can configure rules by malware type, ecosystem, and package patterns. GitHub originally paused malware alerting in 2022 because of false positive noise. This redesigned version includes opt-in controls and auto-triage rules that alert only on malware versions by default.

---

## <i class="fas fa-building"></i> Industry News

### Dell Discloses 11,000 Layoffs in AI Pivot - [<i class="fas fa-external-link-alt"></i>](https://techstartups.com/2026/03/18/dell-lays-off-11000-employees-spends-569m-as-ai-shift-accelerates-job-cuts-filing-shows/)

On March 18, Dell disclosed in a fiscal year filing that it cut approximately 11,000 employees in fiscal 2026, about 10% of its global workforce. Headcount dropped from 108,000 to 97,000. The company spent $569 million on severance.

**Where the money is going:**

Dell's AI server business, which the company expects will double in revenue by fiscal 2027. Roles in traditional areas like personal computers and storage are being reduced. Resources are being moved to AI infrastructure.

**The financial picture:**

Despite the cuts, Dell reported record full-year revenue of $113.5 billion, up 19%, and net income of $5.94 billion, up 30%. The layoffs aren't about financial distress. They're about redirecting headcount toward AI.

**The pattern:**

This is the third consecutive year Dell has cut about 10% of its workforce. Since 2023, the company has reduced headcount by roughly 36,000, a 27% decline. It's the clearest example of a large hardware company systematically replacing traditional roles with AI-focused ones.

### Checkmarx Redesigns Platform for Agentic Development - [<i class="fas fa-external-link-alt"></i>](https://checkmarx.com/checkmarx-redefines-application-security-for-the-age-of-agentic-development/)

On March 16, Checkmarx unveiled a redesigned Checkmarx One platform built for AI-driven development. The platform includes Triage Assist (an autonomous agent that prioritizes vulnerabilities by real-world exploitability), Remediation Assist (generates fixes before code merges), AI SAST (hybrid LLM-powered analysis), DAST for AI (runtime protection), and AI Supply Chain Security (discovers hidden AI assets, models, agents, and datasets). Available as part of Checkmarx One Enterprise Edition.

---

## <i class="fas fa-shield-alt"></i> Security

### Trivy GitHub Actions Compromised in Second Supply Chain Attack in Three Weeks - [<i class="fas fa-external-link-alt"></i>](https://arstechnica.com/security/2026/03/widely-used-trivy-scanner-compromised-in-ongoing-supply-chain-attack/)

On March 19, Aqua Security's Trivy vulnerability scanner was compromised again. This time the attack targeted CI/CD pipelines directly.

**What happened:**

Attackers used stolen credentials to force-push malicious code to 75 of 76 version tags in `aquasecurity/trivy-action`, plus seven `setup-trivy` tags and the Trivy v0.69.4 binary on Docker Hub, GitHub Container Registry, and AWS ECR. The only safe version was @0.35.0.

**What the malware did:**

The malicious code ran a credential stealer in parallel with the legitimate Trivy scan. Pipelines appeared to function normally while the malware quietly harvested GitHub tokens, CI/CD secrets, SSH keys, cloud credentials, Kubernetes tokens, Docker configs, and cryptocurrency wallets from runner process memory. Stolen data was encrypted and sent to a typosquatted domain (scan.aquasecurtiy[.]org).

**The exposure window:**

About 12 hours, from March 19 at 17:43 UTC to March 20 at 05:40 UTC.

**Root cause:**

Incomplete credential rotation following the first Trivy compromise on March 1. The attacker still had valid credentials from that breach.

**What to do:**

If you ran any affected version during the exposure window, treat all pipeline secrets as compromised and rotate them immediately. Pin to trivy v0.69.3, trivy-action v0.35.0, or setup-trivy v0.2.6.

### GlassWorm Sleeper Extensions Activate Across Open VSX - [<i class="fas fa-external-link-alt"></i>](https://socket.dev/blog/glassworm-sleeper-extensions-activated-on-open-vsx)

The GlassWorm supply chain campaign escalated this week. Between March 17 and 18, previously dormant "sleeper" extensions in the Open VSX registry were activated and weaponized.

**The scale:**

At least 72 malicious Open VSX extensions have been identified since January 31, 2026. The broader GlassWorm campaign has compromised over 430 components across npm, VSCode, OpenVSX, and GitHub.

**How it works:**

The attackers publish clean-looking extensions that pass marketplace checks. These extensions list malicious dependencies through `extensionPack` or `extensionDependencies` fields, so the payload gets silently installed when developers install or update the parent extension. The extensions impersonate popular developer tools like linters, formatters, and AI coding assistants.

**What it steals:**

Cryptocurrency wallet data, developer credentials, SSH keys, and access tokens.

**The infrastructure:**

The campaign uses Solana blockchain transactions as dead drops for command-and-control server addresses, making it difficult to take down through traditional means.

**Why it's a problem:**

This is the second major Open VSX security incident this month, following the Aqua Trivy VS Code extension compromise earlier. As more developers move to AI-first editors that depend on Open VSX instead of Microsoft's locked-down Marketplace, the security of that registry becomes critical infrastructure.

### Linux Foundation Announces $12.5 Million for Open Source Security - [<i class="fas fa-external-link-alt"></i>](https://www.prnewswire.com/news-releases/linux-foundation-announces-12-5-million-in-grant-funding-from-leading-organizations-to-advance-open-source-security-302715783.html)

On March 17, the Linux Foundation announced $12.5 million in grant funding from Anthropic, AWS, GitHub, Google, Google DeepMind, Microsoft, and OpenAI to strengthen open source security.

**The problem:**

AI tools are dramatically increasing the speed at which vulnerabilities are discovered in open source software. That sounds like a good thing, and it is, except maintainers don't have the resources to handle the flood of AI-generated security reports. Small teams and solo maintainers are getting overwhelmed.

**Where the money goes:**

The funds will be managed by Alpha-Omega and the Open Source Security Foundation (OpenSSF). They'll go toward integrating AI-driven security tools into maintainer workflows, embedding security expertise directly into projects, and building tools to help maintainers triage the growing volume of vulnerability reports.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$1 trillion** — Purchase orders Nvidia projects for Blackwell and Vera Rubin systems through 2027
- **336 billion** — Transistors in a single Nvidia Rubin GPU
- **50 petaFLOPS** — Inference performance per Rubin GPU chip
- **35x** — Tokens-per-watt improvement of Groq 3 LPX rack over Vera Rubin GPUs
- **1,300+** — Pull requests per week produced by Stripe's Minions AI agents
- **400+** — Internal tools Stripe's Minions access through their MCP server
- **$1 trillion** — Annual payment volume supported by code Stripe Minions manage
- **10** — JEPs delivered in Java 26
- **400%** — Dev startup speed improvement in Next.js 16.2
- **200+** — Turbopack fixes in the Next.js 16.2 release
- **17** — Enterprise partners using Nvidia's Agent Toolkit at launch
- **11,000** — Dell employees cut in fiscal 2026
- **$569 million** — Severance costs from Dell's workforce reduction
- **36,000** — Total Dell headcount reduction since 2023
- **72** — Malicious Open VSX extensions identified in the GlassWorm campaign
- **430+** — Total compromised components across the broader GlassWorm campaign
- **75 of 76** — Trivy-action version tags compromised in the supply chain attack
- **12 hours** — Exposure window for the Trivy GitHub Actions compromise
- **$12.5 million** — Linux Foundation grant funding for open source security
- **60+** — New improvements in GitLab 18.10
- **$1 billion** — Mistral's projected annual recurring revenue for 2026

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**Nvidia GTC 2026** — Vera Rubin platform with Rubin GPU (336B transistors, 288GB HBM4), Groq 3 LPU for 35x inference efficiency, DLSS 5 neural rendering, Agent Toolkit with OpenShell runtime. 17 enterprise partners on board.

**Stripe Minions** — Autonomous coding agents producing 1,300+ PRs per week. Zero human-written code. All human-reviewed. Built on fork of Goose. Runs in isolated devboxes with access to 400+ internal tools.

**Microsoft Copilot restructure** — Jacob Andreou takes over as EVP of Copilot, unifying consumer and commercial. Suleyman shifts to superintelligence work. Four-pillar organization under Nadella.

**OpenAI-AWS government deal** — OpenAI models available to 3 million DOD employees through AWS. Classified and unclassified work. AWS becomes exclusive third-party cloud distributor for OpenAI Frontier.

**Java 26** — Released March 17. HTTP/3 for the HTTP Client API. G1 GC throughput improvement. Ahead-of-time object caching with any GC. Vector API in eleventh incubator. Structured Concurrency in sixth preview. Applet API removed. 10 JEPs total.

**Laravel 13** — PHP 8.3 minimum. PHP Attributes across the framework. First-party AI SDK. Vector search with pgvector. Passkey authentication. Zero breaking changes.

**Next.js 16.2** — 400% faster dev startup. 50% faster SSR. Redesigned error pages. Server Function logging. 200+ Turbopack fixes.

**GitLab 18.10** — AI-powered SAST false positive detection now GA. Agentic vulnerability resolution in beta. Passkey login for all editions.

**Mistral Forge** — Enterprise platform for training custom AI models from scratch on proprietary data. Announced at GTC. ASML, Ericsson, and ESA among early adopters.

**Anthropic Claude Marketplace** — B2B marketplace for enterprise AI apps. Snowflake, GitLab, Harvey AI, Replit among launch partners. No commission on transactions.

**GitHub Copilot updates** — GPT-5.3-Codex gets 12-month LTS. Coding agent starts 50% faster. Semantic code search. Live log monitoring in Raycast.

**Dependabot malware alerts** — Now detects malware in npm dependencies. Separate from CVE alerts. Configurable rules. Redesigned after 2022 pause.

**Dell cuts 11,000** — Third straight year of 10% workforce reduction. $569M in severance. AI server revenue expected to double. Record $113.5B annual revenue despite cuts.

**Trivy compromised again** — Second attack in three weeks. 75 of 76 version tags hit. Credential stealer harvested CI/CD secrets during 12-hour window. Root cause: incomplete credential rotation from first breach.

**GlassWorm escalates** — Sleeper extensions activated on Open VSX March 17-18. 72 malicious extensions identified. 430+ compromised components across platforms. Uses Solana blockchain for C2 infrastructure.

**Linux Foundation security funding** — $12.5M from Anthropic, AWS, GitHub, Google, Microsoft, and OpenAI for open source security. Managed through Alpha-Omega and OpenSSF.

**Checkmarx platform redesign** — New Checkmarx One with AI SAST, agentic triage and remediation, AI supply chain security. Built for agentic development workflows.

**Spring AI releases** — Three versions shipped March 17. Spring AI 2.0.0-M3 with 91 enhancements, Jackson 3 migration, and Anthropic Java SDK integration.

---

*GTC was the main event this week, but the story I keep thinking about is Stripe's. 1,300 pull requests per week with zero human-written code. That's not a research paper or a benchmark score. That's production code managing over a trillion dollars in payment volume. And Stripe's engineers are very clear about why it works: the infrastructure they built for humans is what makes the agents reliable. The CI/CD pipelines, the test suites, the static analysis, the code review process. The agents plugged into all of it. If your engineering infrastructure is sloppy, AI agents won't save you. They'll just produce slop faster. On the security side, the Trivy compromise is the kind of incident that should worry every team running security scanners in CI/CD. Your vulnerability scanner becoming the vulnerability is a bad day. And the root cause was something simple: credentials that weren't fully rotated after the first breach. On the framework side, Laravel 13 shipping with a first-party AI SDK and Next.js 16.2 delivering a 400% dev startup improvement are both worth your time if you work in those ecosystems. The tools keep getting faster. The agents keep getting more autonomous. The security incidents keep getting more creative.*

*See you next week.*
