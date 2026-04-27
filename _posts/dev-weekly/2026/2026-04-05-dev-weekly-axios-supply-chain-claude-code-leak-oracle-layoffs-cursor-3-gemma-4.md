---
layout: post
seo: true
title: "Dev Weekly: Axios npm Supply Chain Attack, Claude Code Source Code Leak, Oracle Lays Off 30,000, Cursor 3, Gemma 4"
subtitle: "North Korean hackers hijack axios on npm deploying RAT to millions. Anthropic accidentally leaks 512K lines of Claude Code source via npm. Oracle fires up to 30,000 in its largest restructuring ever. Cursor 3 ships with agent-first interface. Google releases Gemma 4 under Apache 2.0. GitHub Copilot SDK enters public preview. Microsoft open sources Agent Governance Toolkit. Coder raises $90M. Qodo raises $70M. Chrome zero-day patched. Docker Offload goes GA."
date: 2026-04-05
categories: tech-news
permalink: /dev-weekly/2026/mar-30-apr-5/axios-supply-chain-claude-code-leak-oracle-layoffs-cursor-3-gemma-4/
share-img: /assets/img/posts/dev_weekly/tech-news-30mar-5apr-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-30mar-5apr-2026.svg
description: "Software developer news for the week of March 30 to April 5, 2026. North Korean state actor Sapphire Sleet hijacks axios on npm, pushing a cross-platform RAT through malicious versions 1.14.1 and 0.30.4 that reached millions of developers. Anthropic accidentally leaks all 512,000 lines of Claude Code source code through an npm source map file, exposing unreleased features including Kairos and Undercover Mode. Oracle lays off up to 30,000 employees in its largest restructuring ever to fund a $50 billion AI data center buildout. Cursor 3 ships with a new agent-first Agents Window, Design Mode, and cloud agent handoff. Google releases Gemma 4 open source models under Apache 2.0. GitHub Copilot SDK enters public preview in five languages. Microsoft open sources an Agent Governance Toolkit covering all 10 OWASP agentic AI risks. Google ADK for Java hits 1.0. JetBrains Rider 2026.1 ships. Docker Offload goes GA. Coder raises $90M. Qodo raises $70M. Depthfirst raises $80M. DigitalOcean acquires Katanemo Labs. Chrome zero-day CVE-2026-5281 patched. Citrix NetScaler critical RCE exploited in the wild."
keywords: "axios npm supply chain attack Sapphire Sleet North Korea March 2026, Claude Code source code leak npm 512000 lines TypeScript Kairos Anthropic, Oracle layoffs 30000 employees AI data center restructuring March 2026, Cursor 3 Agents Window Design Mode cloud agents Anysphere April 2026, Google Gemma 4 open source Apache 2.0 31B model April 2026, GitHub Copilot SDK public preview five languages April 2026, Microsoft Agent Governance Toolkit open source OWASP agentic AI, Google ADK Java 1.0 Agent Development Kit March 2026, JetBrains Rider 2026.1 AI integration ACP registry, Docker Offload general availability cloud container engine, Coder 90M Series C KKR enterprise AI development, Qodo 70M Series B code verification AI coding, Depthfirst 80M AI security platform dfs-mini1, DigitalOcean Katanemo Labs acquisition agentic inference, Chrome zero-day CVE-2026-5281 WebGPU Dawn exploit, Citrix CVE-2026-3055 NetScaler critical RCE SAML, GitHub Copilot cloud agent research plan code, dev weekly April 2026, software developer news"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What happened with the axios npm supply chain attack in March 2026?"
    answer: "On March 31, 2026, North Korean state actor Sapphire Sleet hijacked the npm account of axios lead maintainer Jason Saayman and published malicious versions 1.14.1 and 0.30.4. The poisoned versions included a hidden dependency called plain-crypto-js that installed a cross-platform Remote Access Trojan supporting remote shell execution, binary injection, and system reconnaissance. Axios gets 80 to 100 million weekly downloads. The malicious versions were live for about 2 to 3 hours before npm removed them. Microsoft attributed the attack to Sapphire Sleet."
  - question: "How did the Claude Code source code leak happen?"
    answer: "On March 31, 2026, a 59.8 MB source map file was accidentally included in Claude Code v2.1.88 published to npm. The source map pointed to a ZIP archive on Anthropic's Cloudflare R2 storage bucket that anyone could download. The leak exposed 512,000 lines of TypeScript across 1,900 files, including unreleased features like Kairos (an always-on autonomous agent daemon), Buddy (a Tamagotchi-style AI pet), and Undercover Mode. Anthropic called it human error and said no customer data was exposed."
  - question: "How many employees did Oracle lay off in March 2026?"
    answer: "On March 31, 2026, Oracle laid off an estimated 20,000 to 30,000 employees, roughly 18% of its 162,000 person workforce. India was hit hardest with about 12,000 job cuts. The layoffs fund Oracle's $50 billion AI data center investment for fiscal 2026. The restructuring carries a $2.1 billion charge and is the largest in Oracle's 49-year history."
  - question: "What is new in Cursor 3?"
    answer: "Cursor 3, released on April 2, 2026, replaces the previous VS Code-derived interface with an Agents Window designed for running multiple AI coding agents in parallel. It adds Design Mode for annotating UI elements in a built-in browser, seamless handoff between local and cloud agents, native best-of-n comparison across multiple models, and Composer 2, Anysphere's own frontier coding model. According to the company, 35% of Cursor pull requests now come from agents running on their own VMs."
  - question: "What is Google Gemma 4 and when was it released?"
    answer: "Google released Gemma 4 on April 2, 2026. It is a family of open source AI models built on the same research as Gemini 3, released under the Apache 2.0 license. It comes in four sizes: 31B Dense (ranked third on Arena AI text leaderboard), 26B Mixture of Experts, and two edge variants (E4B and E2B) that run on Android devices and Raspberry Pi. Gemma 4 supports advanced reasoning, agentic workflows, function calling, and native processing of video, images, and audio across 140 languages."
  - question: "What is the GitHub Copilot SDK?"
    answer: "The GitHub Copilot SDK entered public preview on April 2, 2026. It provides building blocks for developers to embed Copilot's agentic capabilities into their own applications. The SDK is available in five languages: Node.js/TypeScript, Python, Go, .NET, and Java. Features include custom tools, system prompt customization, streaming responses, OpenTelemetry tracing, permission frameworks, and Bring Your Own Key support for OpenAI, Azure AI Foundry, or Anthropic."
---

This was a rough week for supply chain security. North Korean hackers hijacked axios on npm, pushing out a remote access trojan to one of the most downloaded packages in the JavaScript ecosystem. The same day, Anthropic accidentally leaked the entire Claude Code source code through an npm package, exposing 512,000 lines of TypeScript and a bunch of unreleased features. Oracle dropped the axe on up to 30,000 employees to fund its AI data center buildout. On the product side, Cursor 3 launched with an agent-first interface, Google released Gemma 4 as open source under Apache 2.0, and GitHub put the Copilot SDK into public preview. Microsoft open sourced an Agent Governance Toolkit. JetBrains shipped Rider 2026.1. Docker Offload went GA. And the funding rounds kept rolling: Coder raised $90 million, Qodo raised $70 million, and Depthfirst raised $80 million. Here's everything that happened.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Axios Hijacked on npm by North Korean Hackers - [<i class="fas fa-external-link-alt"></i>](https://www.wiz.io/blog/axios-npm-compromised-in-supply-chain-attack)

On March 31, attackers hijacked the npm account of axios lead maintainer Jason Saayman and published two malicious versions of the library: axios@1.14.1 and axios@0.30.4.

**What happened:**

The attacker compromised Saayman's account through a targeted social engineering campaign and deployed malware on his machine to steal npm credentials. The malicious versions included a hidden dependency called `plain-crypto-js@4.2.1` that silently installed a cross-platform Remote Access Trojan during `npm install`. The RAT supported remote shell execution, binary injection, directory browsing, process listing, and system reconnaissance across Windows, macOS, and Linux. The poisoned versions were live for about 2 to 3 hours before npm pulled them.

**The scale:**

Axios gets [80 to 100 million weekly downloads](https://socradar.io/blog/axios-npm-supply-chain-attack-2026-ciso-guide/) and is present in roughly 80% of cloud and code environments. According to Wiz, the malicious payload executed in approximately 3% of affected environments.

**Who did it:**

Microsoft Threat Intelligence [attributed the attack to Sapphire Sleet](https://www.microsoft.com/en-us/security/blog/2026/04/01/mitigating-the-axios-npm-supply-chain-compromise/), a North Korean state actor. The command and control infrastructure connected to sfrclak.com:8000.

**What to do:**

Check your lockfiles for axios 1.14.1 or 0.30.4. If you have either, downgrade to 1.14.0 or 0.30.3 immediately. Rotate all credentials and secrets on any system that installed the malicious versions. Monitor for connections to the C2 server. The [axios team published a full post mortem on GitHub](https://github.com/axios/axios/issues/10636).

### Anthropic Accidentally Leaks Claude Code's Entire Source Code - [<i class="fas fa-external-link-alt"></i>](https://venturebeat.com/ai/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know)

On March 31, security researcher Chaofan Shou discovered that Claude Code v2.1.88 on npm contained a 59.8 MB source map file pointing to a ZIP archive on Anthropic's Cloudflare R2 storage bucket. Anyone could download it.

**What leaked:**

The source contained approximately 512,000 lines of TypeScript across 1,900 files. A [GitHub repository mirroring the code](https://www.afterdawn.com/news/article.cfm/2026/03/31/source-code-of-claude-code-has-leaked) accumulated thousands of stars within hours. The leak happened because a source map file was not excluded from the npm package. One missing line in `.npmignore` or the `files` field in `package.json`.

**What people found inside:**

The code revealed several unreleased features. [Kairos](https://danilchenko.dev/posts/2026-04-01-claude-code-source-code-leak-kairos-npm/) is an always-on autonomous agent daemon designed to run continuously in the background. Buddy is a Tamagotchi-style AI pet that lives in the terminal. Undercover Mode is a system that strips all traces of Anthropic from employee contributions to open source projects. Researchers also found multiple unreleased AI model codenames, a three-layer memory architecture for agent context management, and over 44 compile-time feature flags for unreleased capabilities.

**Anthropic's response:**

Anthropic confirmed the leak, called it "human error, not a security breach," and said no customer data or credentials were exposed. The company pulled the npm package and issued DMCA takedowns. This was Anthropic's second leak in five days, following a CMS configuration error on March 26 that exposed unreleased model details.

### Oracle Cuts Up to 30,000 Jobs in Its Largest Restructuring Ever - [<i class="fas fa-external-link-alt"></i>](https://www.theregister.com/2026/03/31/oracle_cuts_jobs/)

On March 31, Oracle laid off an estimated 20,000 to 30,000 employees, roughly 18% of its 162,000 person workforce. It is the largest restructuring in the company's 49-year history.

**How it happened:**

Employees received termination emails at approximately 6:00 a.m. local time with immediate effect. The cuts hit sales, engineering, security, and other divisions across the globe. [India was hit hardest](https://www.fortuneindia.com/business-news/oracles-ai-pivot-drives-global-layoffs-job-cuts-seen-scaling-up-to-30000-india-hit-hard/131768) with about 12,000 jobs cut out of roughly 30,000 Oracle employees in the country. In the US, 491 Seattle-area and remote employees were affected with terminations effective June 1.

**Why:**

The layoffs are tied to Oracle's massive bet on AI data center infrastructure. The company is spending $50 billion on capital expenditure in fiscal 2026 and has $156 billion in infrastructure commitments. Oracle raised approximately $50 billion in debt to fund the buildout. The restructuring carries a $2.1 billion charge.

**Why it matters:**

This is not a small trim. Cutting nearly one in five employees to redirect capital toward AI infrastructure is a signal of how aggressively the big enterprise players are betting on AI. Oracle is essentially rebuilding itself around cloud and AI services, and the legacy workforce is bearing the cost.

### Cursor 3 Launches with Agent-First Interface - [<i class="fas fa-external-link-alt"></i>](https://cursor.com/blog/cursor-3)

On April 2, Anysphere released Cursor 3, a major overhaul of the AI coding platform.

**What changed:**

The biggest change is the [Agents Window](https://cursor.com/changelog/3-0), which replaces the previous VS Code-derived interface with a purpose-built workspace for running multiple coding agents in parallel. Agents can run on local machines, cloud VMs, remote SSH, or worktrees. There is a seamless handoff system that lets developers push sessions to the cloud or pull them back locally.

**New features:**

Design Mode (Cmd+Shift+D) lets developers annotate UI elements directly in a built-in browser. Native best-of-n comparison runs the same task across multiple models simultaneously in isolated worktrees so you can pick the best result. Composer 2 is Anysphere's own frontier coding model with high usage limits. There is also a plugin marketplace with MCP integrations, skills, and subagents. Agents can be launched from Slack, GitHub, Linear, or mobile.

**The numbers:**

According to the company, [35% of Cursor pull requests now come from agents](https://siliconangle.com/2026/04/02/cursor-refreshes-vibe-coding-platform-focus-ai-agents/) running on their own VMs. Cursor's annual revenue reportedly exceeded $2 billion, with the company in talks for a roughly $50 billion valuation.

**Why it matters:**

Cursor 3 is a clear statement that the IDE of the future is not a text editor with an AI sidebar. It is an agent management system that happens to have an editor. The shift from "AI-assisted coding" to "agent-first coding" is now a product reality, not just a pitch deck talking point.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms


{% include ads/in-article.html %}


### Google Releases Gemma 4 Under Apache 2.0 - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)

On April 2, Google released Gemma 4, its most capable open source model family. Built on the same research and technology as Gemini 3, it ships under the Apache 2.0 license.

**The models:**

Gemma 4 comes in [four sizes](https://9to5google.com/2026/04/02/google-gemma-4/). The 31B Dense model ranked third on Arena AI's text leaderboard. The 26B Mixture of Experts model ranked sixth. The two edge variants (E4B and E2B) run on Android devices, Raspberry Pi, and Jetson Nano with near-zero latency.

**What it can do:**

Advanced reasoning with multi-step planning, native agentic workflows with function calling and structured JSON output, offline code generation, and native processing of video, images, and audio. It supports over 140 languages and context windows up to 256K tokens for the larger models. Model weights are available on Hugging Face, Kaggle, and Ollama.

**Why it matters:**

An open source model ranking third on Arena AI with full Apache 2.0 licensing is significant. Developers get complete control over their data and infrastructure with no usage restrictions. For anyone building agentic applications who does not want to depend on API providers, Gemma 4 is now one of the strongest options available.

### GitHub Copilot SDK Enters Public Preview - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-04-02-copilot-sdk-in-public-preview)

On April 2, GitHub released the Copilot SDK in public preview. It exposes the same agent runtime that powers GitHub Copilot CLI and lets developers embed Copilot's agentic capabilities into their own applications.

**What's in the SDK:**

Custom tools and agents with domain-specific handlers, fine-grained system prompt customization, token-by-token streaming, blob attachments for images and screenshots, built-in OpenTelemetry distributed tracing, a permission framework with approval handlers, and Bring Your Own Key support for OpenAI, Azure AI Foundry, or Anthropic.

**Languages:**

The SDK is available in [five languages](https://github.com/github/copilot-sdk): Node.js/TypeScript, Python, Go, .NET, and Java.

**Also this week:**

On March 31, GitHub also announced expanded capabilities for the [Copilot cloud agent](https://github.blog/changelog/2026-03-31-research-plan-and-code-with-copilot-cloud-agent). Copilot can now conduct deep research sessions to answer questions about your codebase, generate implementation plans before writing code, and generate code on a branch without automatically opening a pull request. This gives developers more control over the workflow instead of going straight from prompt to PR.

### Microsoft Open Sources Agent Governance Toolkit - [<i class="fas fa-external-link-alt"></i>](https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/)

On April 2, Microsoft released the Agent Governance Toolkit under the MIT license. It is a seven-package system designed to provide runtime security governance for autonomous AI agents.

**What it covers:**

The toolkit addresses [all 10 OWASP agentic AI risks](https://www.helpnetsecurity.com/2026/04/03/microsoft-ai-agent-governance-toolkit/) with deterministic, sub-millisecond policy enforcement. Key components include Agent OS (a stateless policy engine that intercepts every agent action before execution), Agent Mesh (cryptographic identity and inter-agent communication), Agent Runtime (execution rings modeled on CPU privilege levels with emergency termination), Agent Compliance (automated governance mapped to EU AI Act, HIPAA, SOC2), and Agent Marketplace (plugin lifecycle management with signing and trust gating).

**How it works:**

The toolkit is available in Python, TypeScript, Rust, Go, and .NET. It integrates with existing frameworks like LangChain, CrewAI, AutoGen, and Azure AI Foundry without requiring rewrites. It ships with over 9,500 tests and continuous fuzzing. Microsoft plans to move the project to a foundation for community governance.

### Google ADK for Java Hits 1.0 - [<i class="fas fa-external-link-alt"></i>](https://developers.googleblog.com/announcing-adk-for-java-100-building-the-future-of-ai-agents-in-java/)

On March 30, Google released version 1.0.0 of the Agent Development Kit for Java, expanding the ADK framework from Python into a multi-language ecosystem covering Java, Python, Go, and TypeScript.

The release adds Google Maps grounding through `GoogleMapsTool`, web content fetching via `UrlContextTool`, container-based code execution, a centralized plugin architecture, human-in-the-loop support for pausing agents for approval, and native Agent2Agent (A2A) protocol support for cross-framework collaboration. Requires Java 17 or later and Maven 3.9 or later.

### JetBrains Rider 2026.1 Released - [<i class="fas fa-external-link-alt"></i>](https://blog.jetbrains.com/dotnet/2026/03/30/rider-2026-1-released/)

On March 30, JetBrains shipped Rider 2026.1 with a focus on AI integration and .NET tooling.

The new ACP Registry allows one-click discovery and installation of AI agents including Junie, Claude Agent, Codex, GitHub Copilot, and Cursor. .NET developers get file-based C# programs that run without a project file, a NuGet Package Manager Console preview, and a new ASM Viewer for inspecting .NET disassemblies. C# 15 preview features are supported. Game developers get improved Unreal Engine project support and enhanced Unity Profiler integration.

### Docker Offload Reaches General Availability - [<i class="fas fa-external-link-alt"></i>](https://www.docker.com/blog/docker-offload-now-generally-available-the-full-power-of-docker-for-every-developer-everywhere)

On April 2, Docker Offload went GA. The feature moves the container engine to Docker's secure cloud, letting developers run Docker from VDI platforms, locked-down laptops, and other resource-constrained environments without changing their existing workflows.

All connections run over encrypted tunnels on SOC 2 certified infrastructure. Sessions are temporary, isolated, and destroyed after use. Offload detects constrained environments automatically and activates without developer configuration. For enterprise teams stuck on managed desktops that cannot run Docker Desktop natively, this is a practical solution.

---

## <i class="fas fa-building"></i> Industry News


{% include ads/display.html %}


### Coder Raises $90M Series C Led by KKR - [<i class="fas fa-external-link-alt"></i>](https://coder.com/blog/90m-series-c-led-by-kkr-to-advance-secure-enterprise-ai-development)

On April 1, Coder secured a $90 million Series C funding round led by KKR, with participation from Qube Research and Technologies, Uncork Capital, and existing investors.

Coder provides centralized, secure cloud development environments where both human developers and AI coding tools operate within the same governed infrastructure. The interesting part: both KKR and QRT are major Coder customers. KKR runs the platform across more than 500 engineers. QRT deploys to over 1,000 users. Bookings are up [300% year over year](https://coder.com/blog/coders-customers-led-our-series-c-what-that-tells-me-about-ai) with a net dollar retention rate of 184%. The funding will support platform innovation around enterprise AI workflows and geographic expansion.

### Qodo Raises $70M for AI Code Verification - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/30/qodo-bets-on-code-verification-as-ai-coding-scales-raises-70m/)

On March 30, Qodo (formerly CodiumAI) closed a $70 million Series B led by Qumra Capital, bringing total funding to $120 million.

Qodo's pitch is straightforward: AI coding tools are generating billions of lines of code monthly, but [95% of developers distrust AI-generated code](https://www.globenewswire.com/news-release/2026/03/30/3264740/0/en/Qodo-Raises-70M-to-Accelerate-Fight-Against-Software-Slop-From-OpenClaw-and-Claude-Code.html) and only about half consistently review it before committing. Unlike standard code review tools that focus on what changed, Qodo evaluates how changes impact the entire system, incorporating organizational standards, codebase history, and risk tolerance. Enterprise adoption grew 11x in the past year, with customers including Walmart, Nvidia, Red Hat, Intuit, and Ford.

### Depthfirst Raises $80M for AI Security Platform - [<i class="fas fa-external-link-alt"></i>](https://siliconangle.com/2026/03/31/depthfirst-raises-80m-expand-ai-native-security-platform-train-domain-specific-models/)

On March 31, Depthfirst raised $80 million in Series B funding led by Meritech Capital, bringing total capital to $120 million. This came less than 90 days after the company emerged from stealth with a $40 million Series A.

Depthfirst builds an AI-native security platform using custom agents to analyze codebases, infrastructure, and workflows. Alongside the funding, the company introduced [dfs-mini1](https://www.businesswire.com/news/home/20260331071577/en/Applied-AI-Lab-depthfirst-Announces-%2480-Million-in-Series-B-Funding), its first in-house security model focused on smart contract security. Built on an open source model and post-trained through reinforcement learning, dfs-mini1 outperformed frontier models at 10 to 30 times lower cost. Customers include ClickUp, Lovable, Supabase, and incident.io.

### DigitalOcean Acquires Katanemo Labs - [<i class="fas fa-external-link-alt"></i>](https://www.digitalocean.com/blog/digitalocean-acquires-katanemo-labs-inc)

On April 2, DigitalOcean acquired Katanemo Labs to extend its platform into the operational layer of agentic AI systems. Katanemo brings Plano, an open source data plane for building agentic systems, along with small action models and observability research for identifying agent behavior in production. Katanemo co-founder Salman Paracha [joined DigitalOcean as SVP of AI](https://www.businesswire.com/news/home/20260402272982/en/DigitalOcean-Acquires-Katanemo-Labs-to-Accelerate-the-Inference-Cloud-for-the-Agentic-Era). According to the company, 61% of developers identify closing the prototype-to-production gap as their greatest challenge, and this acquisition targets that problem directly.

---

## <i class="fas fa-shield-alt"></i> Security

### Chrome Zero-Day CVE-2026-5281 Patched After Active Exploitation - [<i class="fas fa-external-link-alt"></i>](https://thehackernews.com/2026/04/new-chrome-zero-day-cve-2026-5281-under.html)

On April 1, Google released an emergency patch for CVE-2026-5281, a use-after-free vulnerability in Chrome's Dawn WebGPU implementation with a CVSS score of 8.8.

The flaw allows remote attackers who have compromised the renderer process to execute arbitrary code via a crafted HTML page. It affects Chrome versions before 146.0.7680.177 on Linux and 146.0.7680.178 on Windows and macOS. Other Chromium-based browsers including Edge, Opera, and Brave are also affected. This is the [fourth Chrome zero-day patched in 2026](https://techonpurpose.net/chrome-zero-day-patch-2026-04/). CISA added it to the Known Exploited Vulnerabilities catalog on April 1 with a federal patching deadline of April 15.

### Citrix NetScaler Critical RCE Under Active Exploitation - [<i class="fas fa-external-link-alt"></i>](https://undercodenews.com/critical-citrix-netscaler-vulnerability-cve-2026-3055-triggers-urgent-security-concerns-across-enterprise-networks/)

CVE-2026-3055 is a critical memory overread vulnerability with a CVSS score of 9.8 affecting Citrix NetScaler ADC and Gateway appliances configured as SAML identity providers. Exploitation began on or before March 27. The flaw lets attackers extract authenticated administrative session IDs from appliance memory, potentially leading to full system compromise. It affects versions prior to 14.1-60.58, 13.1-62.23, and 13.1-37.262. If you run NetScaler with SAML, patch now.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter


{% include ads/in-article.html %}


- **80-100 million** — Weekly downloads of axios on npm before the supply chain compromise
- **512,000** — Lines of TypeScript in the leaked Claude Code source code
- **30,000** — Estimated Oracle employees laid off on March 31, roughly 18% of workforce
- **$50 billion** — Oracle's capital expenditure for AI data centers in fiscal 2026
- **35%** — Cursor pull requests that now come from agents running on VMs
- **$240 million** — Combined funding raised by Coder ($90M), Depthfirst ($80M), and Qodo ($70M) in a single week
- **4** — Chrome zero-days patched so far in 2026

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**Axios npm hijacked** — Malicious versions 1.14.1 and 0.30.4 published March 31. North Korean state actor Sapphire Sleet. Cross-platform RAT deployed. Live for 2-3 hours. 80-100 million weekly downloads.

**Claude Code source leaked** — 512K lines of TypeScript exposed via npm source map on March 31. Unreleased features including Kairos daemon and Undercover Mode revealed. Anthropic calls it human error. Second leak in five days.

**Oracle lays off up to 30,000** — Largest restructuring in company history on March 31. 18% of workforce. India hardest hit. $50B AI data center investment. $2.1B restructuring charge.

**Cursor 3 launches** — Agent-first interface released April 2. Agents Window, Design Mode, cloud handoff. Composer 2 frontier model. Plugin marketplace. 35% of PRs from agents. $2B annual revenue.

**Google Gemma 4** — Open source models released April 2 under Apache 2.0. 31B model ranks third on Arena AI. Runs on Android and Raspberry Pi at smaller sizes. 140+ languages. 256K context.

**GitHub Copilot SDK** — Public preview April 2. Five languages. Custom tools, streaming, BYOK, OpenTelemetry tracing. Available to all Copilot and non-Copilot subscribers.

**Copilot cloud agent expanded** — Research, plan, and code capabilities added March 31. Deep codebase research. Implementation planning. Branch-based code generation without auto-creating PRs.

**Microsoft Agent Governance Toolkit** — Open sourced April 2 under MIT license. Seven packages. All 10 OWASP agentic AI risks. Sub-millisecond policy enforcement. Python, TypeScript, Rust, Go, .NET.

**Google ADK Java 1.0** — Released March 30. Google Maps grounding, web content fetching, container code execution, A2A protocol support, human-in-the-loop workflows.

**JetBrains Rider 2026.1** — Released March 30. ACP Registry for AI agent discovery. File-based C# programs. NuGet Package Manager Console. C# 15 preview. Improved Unreal and Unity support.

**Docker Offload GA** — Generally available April 2. Container engine in the cloud. Works on VDI and locked-down laptops. SOC 2 certified. Encrypted tunnels. Auto-detection of constrained environments.

**Coder raises $90M** — Series C led by KKR on April 1. Both KKR and QRT are customers. 300% YoY bookings growth. 184% net dollar retention. Enterprise AI development infrastructure.

**Qodo raises $70M** — Series B on March 30. AI code verification. 95% of devs distrust AI-generated code. 11x enterprise adoption growth. Walmart, Nvidia, Red Hat as customers.

**Depthfirst raises $80M** — Series B on March 31. AI-native security platform. dfs-mini1 security model for smart contracts. 10-30x cheaper than frontier models. $120M total raised.

**DigitalOcean acquires Katanemo** — April 2 acquisition. Agentic AI infrastructure. Plano open source data plane. CEO joins as SVP of AI.

**Chrome zero-day patched** — CVE-2026-5281 on April 1. Use-after-free in WebGPU Dawn. CVSS 8.8. Fourth Chrome zero-day of 2026. CISA deadline April 15.

**Citrix NetScaler RCE** — CVE-2026-3055 actively exploited. CVSS 9.8. Session ID extraction via SAML. Patch immediately.

---

*The axios compromise is the one that should keep you up at night. When a North Korean state actor can social-engineer their way into a maintainer account for a package with 80 million weekly downloads, push a RAT, and have it execute in 3% of environments before anyone catches it, the supply chain problem is not theoretical anymore. And it happened the same day Anthropic leaked half a million lines of Claude Code through a missing npmignore entry. Two completely different failure modes, same ecosystem, same day. The Oracle layoffs tell a different story but point in the same direction. Cutting 30,000 people to fund AI data centers is the kind of move that makes the strategic bet perfectly clear. The developer tools space moved fast this week too. Cursor 3 shipping an agent-first interface, Gemma 4 going fully open source, and the Copilot SDK opening up are all signs that the "AI-assisted editor" phase is ending and the "agent-managed development" phase is starting. The funding numbers reflect this. Coder, Qodo, and Depthfirst all raised significant rounds in the same week, all focused on the infrastructure and trust layers that agent-driven development needs to work at scale. If you use axios, check your lockfiles. If you build npm packages, check your npmignore. And if you work at a company that has not figured out its agent governance story yet, this was the week that made it harder to keep ignoring that.*

*See you next week.*
