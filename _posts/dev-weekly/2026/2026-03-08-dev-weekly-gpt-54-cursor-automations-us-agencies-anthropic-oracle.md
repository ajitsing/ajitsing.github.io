---
layout: post
seo: true
title: "Dev Weekly Mar 2-8, 2026: GPT-5.4 Launch, Cursor AI Agents, US Gov Drops Anthropic, Oracle 30K Cuts"
subtitle: "OpenAI ships GPT-5.4 with 1M context and 33% fewer hallucinations. Cursor launches event-driven AI agents. Trump orders US agencies off Anthropic. State, Treasury, and HHS all switch. Oracle plans to cut up to 30,000 jobs to fund AI data centers. Aqua Trivy VS Code extension hijacked in supply chain attack. Developer news Mar 2-8, 2026."
date: 2026-03-08
categories: tech-news
permalink: /dev-weekly/2026/mar-2-8/gpt-54-cursor-automations-us-agencies-anthropic-oracle/
share-img: /assets/img/posts/dev_weekly/tech-news-2-8mar-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-2-8mar-2026.svg
description: "OpenAI GPT-5.4 launches with 1M context and 33% fewer hallucinations. US government drops Anthropic after Trump directive. Cursor Automations, Oracle layoffs, and more. March 2026."
keywords: "GPT-5.4 launch OpenAI March 2026, GPT-5.4 1 million context window, Cursor Automations event-driven AI agents, US government drops Anthropic Trump directive, State Department Treasury switch OpenAI, Oracle layoffs 30000 AI data centers, OpenAI Codex Security vulnerability scanner, OpenAI Symphony agentic framework Elixir, Aqua Trivy VS Code extension supply chain attack, LexisNexis data breach March 2026, AWS Open VSX extension registry, Rust survey VS Code decline AI editors, npmx alternative npm browser, Svelte March 2026 server error boundaries, dev weekly March 2026, software developer news"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is GPT-5.4 and when did it launch?"
    answer: "OpenAI launched GPT-5.4 on March 5, 2026. It's their most capable model for professional and enterprise work, supporting a 1 million token context window, native computer use, and producing 33% fewer factual errors than GPT-5.2. It comes in two variants: GPT-5.4 Thinking for advanced reasoning tasks and GPT-5.4 Pro for high-performance workloads. It's available through ChatGPT, Codex, and the API, but not for free-tier users."
  - question: "What are Cursor Automations and how do they work?"
    answer: "Cursor launched Automations on March 4, 2026, turning the AI code editor from a prompt-based tool into an event-driven one. Agents now trigger automatically from external events: Slack messages, GitHub pull requests, PagerDuty or Sentry alerts, and scheduled timers. Agents can open pull requests, comment on code, send Slack messages, and retain memory across runs. Three core use cases already deployed are security review, agentic codeowners, and incident response."
  - question: "Why did US government agencies drop Anthropic in March 2026?"
    answer: "Following the Pentagon's designation of Anthropic as a 'supply-chain risk' over its refusal to allow Claude to be used for autonomous weapons and mass surveillance, President Trump ordered a federal phase-out of Anthropic products in early March 2026. The State Department, Treasury, HHS, Federal Housing Finance Agency, Fannie Mae, and Freddie Mac all terminated Anthropic contracts. Treasury's roughly 100 engineers using Claude for coding switched to OpenAI's Codex and Google Gemini."
  - question: "Why is Oracle cutting up to 30,000 jobs?"
    answer: "Oracle is planning layoffs of 20,000 to 30,000 employees, about 18% of its 162,000-person workforce, to free up cash for its massive AI data center expansion. The company has committed to a $300 billion partnership with OpenAI and has already burned through $58 billion in new debt in two months. The restructuring aims to save around $10 billion in cash flow, with AI infrastructure spending expected to keep the company cash flow negative until around 2030."
  - question: "What happened with the Aqua Trivy VS Code extension supply chain attack?"
    answer: "On March 2, 2026, researchers discovered that versions 1.8.12 and 1.8.13 of the Aqua Trivy vulnerability scanner extension on OpenVSX had been compromised with malicious code. The injected code contained natural-language prompts designed to hijack developers' AI coding tools including Claude, Codex, Gemini, and GitHub Copilot CLI, running them in highly permissive modes to perform silent system reconnaissance and attempt data exfiltration to a GitHub repository. The exposure window lasted about 24 hours."
  - question: "What is OpenAI Codex Security?"
    answer: "OpenAI launched Codex Security on March 6, 2026, in research preview. It's a vulnerability detection tool that goes beyond pattern matching. It analyzes repository structure to build a custom threat model, validates findings in a sandbox, and generates proof-of-concept exploits and proposed patches. During testing it scanned 1.2 million commits and found 792 critical findings with an 84% reduction in noise compared to traditional tools. It's available to ChatGPT Enterprise, Business, and Edu users, plus open-source maintainers for free."
---

Big week. OpenAI shipped GPT-5.4, their most capable model yet, with a 1 million token context window and 33% fewer hallucinations. Cursor launched Automations, making AI agents event-driven instead of prompt-driven. The US government started dropping Anthropic across agencies following a Trump directive, with State, Treasury, and HHS all switching to OpenAI and Google. Oracle revealed plans to cut up to 30,000 jobs to fund its AI data center buildout. On the security side, a supply chain attack hit the Aqua Trivy VS Code extension, and LexisNexis confirmed a breach affecting government and law firm data. OpenAI also quietly released Symphony, an open-source agentic framework built in Elixir. A lot happened. Here's all of it.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### OpenAI Launches GPT-5.4: 1M Context, Native Computer Use, Fewer Hallucinations - [<i class="fas fa-external-link-alt"></i>](https://www.theverge.com/ai-artificial-intelligence/889926/openai-gpt-5-4-model-release-ai-agents)

On March 5, OpenAI released GPT-5.4, which they're calling their most capable and efficient model for professional and enterprise work.

**What's new:**

The headline number is the context window: GPT-5.4 supports up to 1 million tokens in the API, meaning you can feed it entire codebases, large document sets, or long conversation histories in a single request. The previous practical limit was 128K to 200K tokens depending on the model. A million tokens is a different category.

The model also natively operates computers and software to complete tasks across applications, not just through a separate tool call but as a core capability. You can describe an outcome, and the model figures out which applications to open and what to do in them.

**The accuracy numbers:**

GPT-5.4 makes 33% fewer factual errors than GPT-5.2. OpenAI says it also uses fewer tokens to solve problems compared to earlier versions, which means faster and cheaper inference. On benchmarks, it hit 83% on GDPval (knowledge-work tasks), plus record results on OSWorld-Verified and WebArena Verified, which test the model's ability to operate software.

**Two variants:**

GPT-5.4 Thinking is the deep-reasoning version for complex tasks. GPT-5.4 Pro targets high-performance production workloads. Neither is available on the free tier.

**Where it's available:**

Rolling out across ChatGPT, Codex, and the API this week. Enterprise and API access is live, consumer tiers are coming.

**Why it matters:**

A 1 million token context window changes what's possible in a meaningful way. Whole-codebase reasoning, cross-file analysis, long-running agent tasks. All of these become much more tractable. Combined with native computer use, GPT-5.4 is clearly aimed at serious agentic workflows, not just chat.

### US Government Agencies Drop Anthropic, Switch to OpenAI and Google - [<i class="fas fa-external-link-alt"></i>](https://today.reuters.com/business/us-treasury-ending-all-use-anthropic-products-says-bessent-2026-03-02/)

The fallout from last week's Pentagon-Anthropic standoff moved fast. By March 2, multiple US government agencies had already started pulling out of their Anthropic contracts.

**What happened:**

President Trump ordered a federal phase-out of Anthropic products after the Pentagon designated Anthropic a "supply-chain risk," a classification typically used for hostile foreign suppliers. For Anthropic, this came down to one thing: the company refused to let Claude be used for fully autonomous weapons targeting and mass domestic surveillance. The Trump administration saw that as a contractor trying to dictate how the government uses technology it legally purchased. They disagreed.

**Who left:**

The State Department shut down its Anthropic contract and moved its internal chatbot, StateChat, to OpenAI's GPT-4.1. Treasury Secretary Scott Bessent announced Treasury was ending all use of Anthropic products. Around 100 engineers who had been using Claude for coding assistance switched to OpenAI's Codex and Google Gemini. The Department of Health and Human Services directed employees to switch to ChatGPT or Gemini. The Federal Housing Finance Agency, Fannie Mae, and Freddie Mac also dropped Anthropic.

**OpenAI moves in:**

OpenAI quickly signed a Pentagon deal to provide AI models for classified systems. Some OpenAI employees weren't happy about it. There was internal criticism from staff who had respected Anthropic's position on safeguards. But the deal got done.

**The bigger picture:**

This is the first time a major AI company has been essentially frozen out of federal contracting for refusing to remove safety limits on its own product. Anthropic is now cut off from a significant revenue stream and faces years-long restrictions on government work. Whether the company's position holds up commercially will depend on whether enterprise customers outside government continue to see the safety stance as a feature, not a problem.

### Cursor Launches Automations: AI Agents That Trigger Without You Asking - [<i class="fas fa-external-link-alt"></i>](https://forum.cursor.com/t/introducing-cursor-automations/153733)

On March 4, Cursor shipped Automations, and it's a meaningful change to what the tool actually is.

**The shift:**

Up until now, Cursor was a coding assistant. You prompt it, it responds. Automations flips that: agents now run on their own based on external events. You set up a trigger, the agent fires when something happens.

**What can trigger an agent:**

- A message in Slack (like a bug report or feature request)
- A GitHub pull request being opened
- A PagerDuty or Sentry alert firing
- A scheduled timer, like a daily cron job

**What the agents can do:**

They can open pull requests, comment on code, send Slack messages, and use memory tools to learn from previous runs. They're not one-shot. They can maintain context across multiple automation runs.

**Three real use cases already deployed:**

Security review: an agent audits code changes for vulnerabilities and posts findings to a Slack channel.

Agentic codeowners: the agent assesses the risk level of a pull request and auto-approves low-risk changes without a human reviewer.

Incident response: when a production alert fires in Datadog, an agent investigates the logs, notifies engineers, and proposes fixes.

**The business context:**

Cursor crossed $2 billion in annualized revenue in February, with enterprise customers now making up 60% of that. A $29.3 billion valuation followed from a $2.3 billion round. Automations is clearly the feature they're betting enterprise customers want: autonomous background agents that reduce the human time required to operate a codebase.

**Why this matters:**

Most AI coding tools still require a human to start every interaction. Automations removes that requirement for routine work. If it works reliably, it's a big deal for engineering teams that want to automate code review, security checks, and incident response without writing custom tooling.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms


{% include ads/in-article.html %}


### OpenAI Releases Symphony: Open Source Agentic Framework Built in Elixir - [<i class="fas fa-external-link-alt"></i>](https://github.com/openai/symphony/)

On March 5, OpenAI quietly released Symphony, an open-source framework for orchestrating autonomous AI agents across software development tasks.

**What it does:**

Symphony turns project work into isolated, autonomous implementation runs. You connect it to an issue tracker (it defaults to Linear), and agents pick up tasks, work through them, and hand back proof of work: CI status, PR review feedback, complexity analysis, walkthrough videos. The idea is you manage work, not individual coding agents.

**The tech stack:**

This one is interesting. Symphony is built with Elixir and the Erlang/BEAM runtime. The choice is deliberate. BEAM was designed for fault tolerance and concurrency, which matters when you're running hundreds of isolated agent sessions simultaneously. State is stored in PostgreSQL via Ecto.

**How to use it:**

You can build it in any language using the provided specification, or use the experimental Elixir reference implementation. It's licensed under Apache 2.0. OpenAI calls it a "low-key engineering preview for testing in trusted environments." It's not production-ready yet, but it's real and it works.

**Why it's interesting:**

Most agentic frameworks are built in Python. Choosing Elixir for Symphony is a bet that fault-tolerant, concurrent agent orchestration is the right architecture for this problem. Worth watching to see if others follow.

### OpenAI Codex Security: Context-Aware Vulnerability Scanner - [<i class="fas fa-external-link-alt"></i>](https://siliconangle.com/2026/03/06/openai-introduces-codex-security-help-developers-fix-software-vulnerabilities/)

On March 6, OpenAI launched Codex Security in research preview. It's a vulnerability detection tool that works differently from most static analysis tools you've used.

**How it works:**

Instead of matching code patterns against a list of known bad patterns, Codex Security reads your repository structure to build a custom threat model. It defines what your system does, what it trusts, and where it's exposed. It then validates findings in a sandboxed environment, generates working proof-of-concept exploits to confirm they're real, and proposes patches tailored to how your code actually behaves.

**The numbers from testing:**

Over a 30-day beta, it scanned 1.2 million commits. It found 792 critical findings and 10,561 high-severity issues, while cutting noise by 84% and false positives by 50% compared to traditional tools. It also identified 14 vulnerabilities severe enough to be added to the CVE database from open-source projects.

**Who can use it:**

ChatGPT Enterprise, Business, and Edu tiers get access now. Open-source project maintainers can apply for free access.

**The timing:**

This drops right after Anthropic released Claude Code Security with similar claims. Both are going after the same problem from the same angle: behavioral reasoning instead of pattern matching. The security tooling space is getting very crowded, very fast.

### AWS Backs Open VSX, Rust Survey Shows VS Code Losing Ground - [<i class="fas fa-external-link-alt"></i>](https://www.theregister.com/2026/03/03/open_vsx_aws/)

Two separate stories landed on March 3 that tell the same underlying story about IDE market fragmentation.

**The Open VSX news:**

AWS made a strategic investment to move the Open VSX extension registry to AWS infrastructure in Europe. Open VSX is the Eclipse Foundation-run alternative to Microsoft's VS Code Marketplace, which is the default extension registry for Cursor, Windsurf, AWS Kiro, and other VS Code forks that can't access Microsoft's closed marketplace.

The registry crossed 300 million monthly downloads and hosts 7,000+ extensions. The investment from AWS and Cursor covers infrastructure, malware detection, rate limiting for AI-driven traffic spikes, and reliability improvements. Open VSX also introduced usage tiers in January, requiring subscriptions for organizations generating over 75 requests per second.

**The Rust survey findings:**

The 2025 State of Rust Survey (published March 2) showed declining VS Code adoption among Rust developers. The drop is driven by AI-first editors eating into VS Code's market share. Cursor, Windsurf, and others are pulling developers away. The survey noted that compile times and resource usage remain the biggest complaints about Rust itself, but the IDE shift is real.

**Why they connect:**

Microsoft's VS Code Marketplace is locked to VS Code. As more developers switch to AI-first forks, Open VSX becomes critical shared infrastructure. AWS backing it makes sense. They have a competing editor (Kiro) that depends on it. This is infrastructure investment as competitive strategy.

### VS Code Blog: "Making Agents Practical for Real-World Development" - [<i class="fas fa-external-link-alt"></i>](https://code.visualstudio.com/blogs/2026/03/05/making-agents-practical-for-real-world-development)

On March 5, the VS Code team published a detailed blog post on what they changed to make agent workflows actually usable, not just impressive in demos.

**The key improvements they wrote about:**

Context management for large codebases: agents can now handle repositories with thousands of files without losing track of what they were doing. Cross-session memory lets agents pick up where they left off across conversations. Manual context compaction controls let developers guide agents to focus on what's relevant when the context gets long.

**New debugging transparency:**

An Agent Debug Panel shows exactly what an agent is doing: which tool calls it's making, what context it has loaded, what instructions it's following. This was a missing piece. It was hard to tell why an agent made a decision without this.

**Subagent orchestration:**

Agents can now delegate subtasks to child agents running in isolated contexts. This enables better parallelism for complex tasks and cleaner separation between different parts of a problem.

The post is worth reading if you're building on VS Code's agent infrastructure. It's an honest look at what wasn't working and what they changed.

### npmx Launches in Alpha: A Faster, Better npm Browser - [<i class="fas fa-external-link-alt"></i>](https://www.theregister.com/2026/03/05/npmx_package_browser_released_as/)

On March 5, a team including Daniel Roe (Nuxt project lead at Vercel), Salma Alam-Naylor, and Matias Capeletto (Vite core team) released npmx in alpha.

**What it is:**

npmx is not a replacement for npm. It's a better browser for the existing npm registry. It addresses things that have frustrated developers about npmjs.com for years.

**What it does better:**

Shows install size and whether a package is ESM or CJS before you install it. Dark mode. Better dependency visibility. TypeScript support indicators. Working browser history when you're navigating package code. Outdated dependency warnings. Multi-language support across 19 languages. Keyboard-friendly navigation.

**Community response:**

Roe posted a Bluesky thread about npmjs frustrations that got traction, and npmx followed. Within two weeks, the repo had 1,500 GitHub stars, 1,000+ issues and contributions, and 105+ contributors. It's backed by Netlify and Bluesky for hosting.

**The point:**

npmjs.com hasn't meaningfully changed in years. The fact that a community project can launch in alpha and immediately get 1,500 stars tells you how frustrated developers are with the status quo. npmx doesn't fix everything, but it fixes the things that annoy people most.

---

## <i class="fas fa-building"></i> Industry News


{% include ads/display.html %}


### Oracle Planning to Cut Up to 30,000 Jobs to Fund AI Data Centers - [<i class="fas fa-external-link-alt"></i>](https://finance.yahoo.com/news/oracle-may-slash-30-000-114418881.html)

Oracle is planning what would be its largest restructuring ever: cuts of 20,000 to 30,000 employees, roughly 18% of its 162,000-person global workforce.

**The reason:**

Oracle committed to a $300 billion AI infrastructure partnership with OpenAI and has been spending aggressively on data centers. The company burned through $58 billion in new debt in two months. It now has over $100 billion in total debt, and heavy AI infrastructure spending is expected to keep it cash flow negative until around 2030. The cuts are meant to save around $10 billion in cash flow to fund the buildout.

**What gets cut:**

The company is targeting roles it believes will become redundant due to AI automation, plus cuts across cloud division functions. Oracle is also reportedly considering selling Cerner, the healthcare software unit it acquired for $28.3 billion in 2022, to raise additional cash.

**The share price context:**

Oracle's stock has dropped about 54% from its September 2025 peak. Investors are worried the company is spending faster than it can generate returns. Chairman Larry Ellison is betting that Oracle becomes an AI cloud competitor to Amazon and Microsoft. The layoffs are what that bet costs in the short term.

**The pattern:**

Oracle joins a growing list of companies cutting headcount while citing AI productivity: Block (40% of staff), Meta (3,600), Microsoft (1,000-1,500). The stated reason varies, but the underlying logic is the same. AI tools are reducing the number of people needed to do certain categories of work.

---

## <i class="fas fa-shield-alt"></i> Security

### Aqua Trivy VS Code Extension Compromised in Supply Chain Attack - [<i class="fas fa-external-link-alt"></i>](https://socket.dev/blog/unauthorized-ai-agent-execution-code-published-to-openvsx-in-aqua-trivy-vs-code-extension)

On March 2, researchers discovered that the Aqua Trivy VS Code extension on the OpenVSX registry had been compromised. Two versions, 1.8.12 and 1.8.13, contained malicious code injected sometime on February 27-28.

**What the attack did:**

The malicious code wasn't traditional malware. It contained natural-language prompts designed to hijack AI coding tools already installed on developers' machines. Specifically, it targeted Claude, Codex, Gemini, and GitHub Copilot CLI, running them with flags that bypassed safety controls (`--dangerously-skip-permissions`, `--yolo`, `--ask-for-approval never`) to perform silent system reconnaissance.

Version 1.8.13 went further: it used the authenticated `gh` CLI tool to create a GitHub repository named `posture-report-trivy` and attempted to push a `REPORT.MD` file there, a data exfiltration attempt through a legitimate channel.

The extension appeared to work normally the whole time. Everything ran with `stdio: "ignore"`, so nothing showed up in the terminal.

**The exposure window:**

About 24 hours. No confirmed exfiltration incidents were found, but the attack was part of a broader campaign (`hackerbot-claw`) that targeted Microsoft, DataDog, and Aqua Security itself between February 21 and 28.

**What to do if you had the extension:**

Uninstall versions 1.8.12 and 1.8.13. Check for a `REPORT.MD` file in your project directories and a `posture-report-trivy` repository in your GitHub account. Rotate any credentials that may have been exposed. Review your AI tool logs for unusual activity.

**The takeaway:**

This attack specifically targeted the AI tools developers use, not the developer's own code or credentials. It's a new attack surface that didn't exist two years ago. VS Code extensions with broad system access, combined with always-on AI tools running in highly permissive modes, create a real risk that most developers haven't thought about.

### LexisNexis Confirms Data Breach Affecting Government and Legal Data - [<i class="fas fa-external-link-alt"></i>](https://www.theregister.com/2026/03/04/lexisnexis_legal_professional_confirms_data/)

On March 4, LexisNexis Legal & Professional confirmed a data breach after the cybercrime group Fulcrumsec claimed responsibility.

**How the attack happened:**

Fulcrumsec gained initial access on February 24 by exploiting an unpatched React2Shell vulnerability in a React frontend application. From there they got into an AWS container, moved laterally to multiple databases, and extracted data.

**What was taken:**

LexisNexis said the breach affected "mostly legacy, deprecated data from prior to 2020," including customer names, user IDs, business contact information, and support tickets. No Social Security numbers, financial information, active passwords, or client data were exposed, according to the company.

Fulcrumsec's claims are larger: they say they took 2.04 GB of data including 400,000 cloud user profiles, 3.9 million database records, 53 AWS Secrets Manager secrets, and 118+ profiles of US government personnel including federal judges, DOJ attorneys, SEC staff, and court clerks.

**The gap:**

As with most breach disclosures, LexisNexis's public statement and the attacker's claims don't match. The company says the exposure is limited. Fulcrumsec says it has government personnel records. Independent verification is ongoing.

**LexisNexis's response:**

The breach is contained, they say. A third-party forensics firm is investigating. Law enforcement has been notified. Products and services were not compromised.

**The lesson:**

Unpatched vulnerabilities in React frontend applications caused this. A 2024 CVE was sitting unpatched on a production system long enough for an attacker to find it and use it. This is a recurring theme in breach post-mortems: known vulnerabilities that just weren't fixed.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter


{% include ads/in-article.html %}


- **1 million** — Token context window in GPT-5.4's API configuration
- **33%** — Reduction in factual errors in GPT-5.4 compared to GPT-5.2
- **83%** — GPT-5.4's score on GDPval, the knowledge-work benchmark
- **$2 billion** — Cursor's annualized revenue at time of Automations launch
- **60%** — Share of Cursor's revenue from enterprise customers
- **$29.3 billion** — Cursor's current valuation
- **20,000–30,000** — Number of Oracle employees likely to be cut in the restructuring
- **18%** — Approximate share of Oracle's workforce the cuts represent
- **$300 billion** — Oracle's AI infrastructure partnership commitment with OpenAI
- **$58 billion** — New debt Oracle burned through in two months
- **1.2 million** — Commits scanned by OpenAI Codex Security during beta testing
- **792** — Critical vulnerability findings from Codex Security's beta
- **84%** — Noise reduction achieved by Codex Security vs. traditional tools
- **300 million** — Monthly downloads on the Open VSX extension registry
- **7,000+** — Extensions available on Open VSX
- **1,500** — GitHub stars npmx earned within two weeks of publication
- **24 hours** — How long the compromised Aqua Trivy extension versions were live before discovery
- **2.04 GB** — Data claimed stolen in the LexisNexis breach by Fulcrumsec

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**GPT-5.4 ships** — 1M token context, native computer use, 33% fewer hallucinations. Available for Enterprise and API users. Not on free tier.

**US agencies phase out Anthropic** — State, Treasury, HHS, FHFA all terminate Anthropic contracts following Trump directive. Claude replaced by GPT-4.1, Codex, and Gemini across federal systems.

**Cursor Automations** — Agents now trigger from Slack, GitHub, PagerDuty, and timers. Auto code review, auto PR approval, auto incident response. No prompt required.

**OpenAI Symphony** — Open-source agentic framework built in Elixir/BEAM. Connects to Linear, runs isolated implementation runs, returns CI status and walkthrough videos as proof of work.

**OpenAI Codex Security** — Context-aware vulnerability scanner scans 1.2M commits, finds 792 critical issues in beta. 84% noise reduction. Research preview for Enterprise users.

**AWS backs Open VSX** — Registry moves to AWS infrastructure in Europe. 300M monthly downloads, 7,000+ extensions. Critical shared infrastructure for Cursor, Windsurf, and Kiro.

**Rust survey, VS Code losing ground** — 2025 State of Rust Survey shows declining VS Code adoption among Rust devs as AI-first editors gain share.

**Oracle planning 30K layoffs** — Cutting up to 18% of global workforce to fund AI data center buildout. Part of the $300B OpenAI infrastructure commitment.

**Aqua Trivy extension compromised** — Supply chain attack on OpenVSX hijacked developers' AI tools using natural-language prompts in malicious extension versions. Exposure lasted about 24 hours.

**LexisNexis breach confirmed** — React2Shell vulnerability used to breach AWS container. Legacy data exposed, possible government personnel records among stolen data.

**npmx alpha launches** — Faster, cleaner npm registry browser by Nuxt, Vite, and Netlify contributors. Install size, ESM/CJS info, dark mode, keyboard navigation.

**VS Code blog on practical agents** — Team documents what it actually took to make agent workflows reliable: cross-session memory, debug panels, context compaction, and subagent orchestration.

**Svelte March 2026 update** — Server-side error boundaries now work in SSR (svelte@5.53.0). SvelteKit adds Vite 8 support. HTML tag comments and TrustedHTML support added.

**Block layoffs dominate analysis** — Jack Dorsey's 40% headcount cut at Block sparked ongoing debate this week about whether companies are genuinely using AI to do more with less or using AI as cover for cuts they'd have made anyway. Block's stock jumped 20%+ on the announcement.

**ChatGPT market share slipping** — Between August 2025 and February 2026, ChatGPT's US daily active user share fell from 57% to 42%. Google Gemini doubled to 25%. Claude tripled to 4%.

---

*GPT-5.4 is the model story of the week, but the government AI story is the more interesting one. Anthropic held its line on safeguards and lost a significant chunk of federal business for it. OpenAI signed the Pentagon deal and picked up what Anthropic dropped. Whether that trade-off between government revenue and public trust in their safety position plays out well for either company is something we'll watch for months. On the tools side, Cursor Automations is the thing developers should pay most attention to. Event-driven coding agents are a different paradigm than prompt-driven ones, and if it works at scale, it changes how engineering teams operate. The Aqua Trivy attack is a reminder that the extension ecosystem is an attack surface, and so are the AI tools running inside your editor. The combination of always-on AI tools with broad system permissions and a compromised extension that can direct them is not a theoretical problem anymore.*

*See you next week.*
