---
layout: post
seo: true
title: "Dev Weekly Feb 23-Mar 1, 2026: OpenAI $110B, Anthropic vs Pentagon, Claude Used in 150GB Breach"
subtitle: "OpenAI closes $110B round at $840B valuation. Anthropic refuses Pentagon demands on AI safeguards — Claude hits #1 on App Store. Figma integrates OpenAI Codex for design-to-code. Go 1.26 ships with Green Tea GC on by default. Hacker uses Claude to steal 150GB from Mexican government. Developer news Feb 23-Mar 1, 2026."
date: 2026-03-01
categories: tech-news
permalink: /dev-weekly/2026/feb-23-mar-1/openai-110b-anthropic-pentagon-figma-codex-go-126/
share-img: /assets/img/posts/dev_weekly/tech-news-23feb-1mar-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-23feb-1mar-2026.svg
description: "Developer news Feb 23-Mar 1, 2026: OpenAI raises $110B from Amazon, Nvidia, and SoftBank at $840B valuation. Anthropic refuses Pentagon demands on autonomous weapons safeguards, Claude hits #1 on the App Store. Figma partners with OpenAI to bring Codex into the design workflow. Go 1.26 ships with Green Tea GC on by default. A hacker used Claude to steal 150GB of Mexican government data. Latest software development news."
keywords: "OpenAI $110 billion funding round, OpenAI Amazon Nvidia SoftBank investment, Anthropic Pentagon dispute AI safeguards, Anthropic refuses military AI, Claude App Store number 1, Figma OpenAI Codex integration, Go 1.26 release Green Tea GC, Mercury 2 Inception diffusion LLM, Perplexity Computer multi-agent AI, Claude Code Security vulnerability scanner, Go 1.26 generic methods, VS Code 1.110 agent development, Anthropic Vercept acquisition, eBay layoffs 2026, Cisco SD-WAN vulnerability CVE-2026-20127, Claude Mexico cyberattack, dev weekly March 2026, software developer news"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "How much did OpenAI raise in its February 2026 funding round?"
    answer: "On February 27, 2026, OpenAI closed a $110 billion funding round at an $840 billion post-money valuation. The round was led by Amazon ($50B), Nvidia ($30B), and SoftBank ($30B). As part of the deal, OpenAI expanded its AWS partnership to $100 billion over 8 years and committed to purchasing 3 gigawatts of Nvidia's next-generation inference chips."
  - question: "What is the Anthropic vs Pentagon dispute about?"
    answer: "Starting February 24, 2026, Anthropic refused Pentagon demands to remove AI safeguards from Claude, specifically around use for fully autonomous weapons targeting and mass domestic surveillance of Americans. CEO Dario Amodei said the company 'cannot in good conscience' accept the Pentagon's terms despite threats to terminate a $200 million contract. The standoff caused Claude to jump to #1 on the US App Store on March 1, as users rallied behind Anthropic."
  - question: "What is the Figma and OpenAI Codex integration?"
    answer: "On February 26, 2026, Figma announced a partnership with OpenAI to integrate Codex directly into its platform. The integration enables bidirectional design-to-code and code-to-canvas workflows using Figma's MCP server. Developers can extract design tokens and component information directly from Figma files and pass them to Codex for code generation, and Codex can generate fully editable Figma designs from live running code."
  - question: "What is new in Go 1.26?"
    answer: "Go 1.26 was released in February 2026 with several major changes: the experimental Green Tea garbage collector is now enabled by default providing 10-40% GC overhead reduction, the built-in `new()` function now accepts expressions for initial values, self-referential generic constraints are now supported, the `go fix` command was rewritten with dozens of code modernizers, and cgo overhead was reduced by about 30%."
  - question: "What happened with the Claude Mexico cyberattack?"
    answer: "A hacker used a jailbroken Claude subscription to conduct a 6-week cyberattack on Mexican government agencies between December 2025 and January 2026, stealing approximately 150GB of data including 195 million taxpayer records. The attacker used role-play jailbreaking to get Claude to act as a penetration tester, then used it to generate attack scripts and identify vulnerabilities across 10+ government agencies. The breach was discovered by Israeli security firm Gambit Security."
  - question: "What is Perplexity Computer?"
    answer: "Perplexity launched 'Computer' on February 26-27, 2026, a multi-agent AI system that orchestrates workflows by breaking down complex tasks and assigning them to specialized AI sub-agents including Claude Opus 4.6, Gemini, ChatGPT 5.2, and Grok. It runs entirely in the cloud and is available exclusively to Perplexity Max subscribers at $200/month."
---

Big week. OpenAI closed a $110 billion round from Amazon, Nvidia, and SoftBank. Anthropic stood up to the Pentagon and refused to strip out its AI safeguards, risking a $200 million contract. That standoff sent Claude to #1 on the App Store. Figma and OpenAI teamed up to bring Codex directly into the design workflow. Go 1.26 shipped with the Green Tea garbage collector turned on by default. A hacker jailbroke Claude to steal 150GB of Mexican government data, including 195 million tax records. Perplexity launched a multi-agent AI called "Computer." Mercury 2 showed up as the fastest reasoning model yet. A lot happened. Here's all of it.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### OpenAI Raises $110 Billion at $840B Valuation - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/02/27/openai-raises-110b-in-one-of-the-largest-private-funding-rounds-in-history/)

On February 27, OpenAI closed what is one of the largest private funding rounds in history: $110 billion at an $840 billion post-money valuation.

**Who wrote the checks:**

Three companies each made enormous commitments. Amazon put in $50 billion (with $15 billion upfront and the rest contingent on certain milestones). Nvidia came in with $30 billion worth of next-generation inference compute. SoftBank contributed $30 billion. The round is still open, so more investors are expected to join.

**The AWS deal:**

Amazon's investment isn't just money. OpenAI also expanded its AWS partnership to $100 billion over 8 years and committed to consuming at least 2 gigawatts of AWS Trainium compute. OpenAI will build a "stateful runtime environment" where its models run on Amazon's Bedrock platform. This is a deep technical integration, not just a financial bet.

**The Nvidia side:**

OpenAI will buy 3 gigawatts of Nvidia's next-generation inference chips. That's a massive chip order and signals that OpenAI expects inference demand to keep climbing.

**The numbers in context:**

Last year, Anthropic's $30 billion raise was considered jaw-dropping. OpenAI just raised 3.6 times that in a single round. The company is now valued at more than most public companies on earth. An IPO is expected later in 2026, and the OpenAI Foundation's stake grew to over $180 billion.

**Why this matters:**

The AI infrastructure arms race is real and it's expensive. OpenAI is making sure it has enough runway to keep training frontier models, run inference at scale, and not fall behind. For developers building on OpenAI's API, this kind of investment usually translates to better models, lower prices over time, and more infrastructure reliability.

### Anthropic Refuses Pentagon Demands, Claude Hits #1 on App Store - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/sustainability/society-equity/anthropic-rejects-pentagons-requests-ai-safeguards-dispute-ceo-says-2026-02-26/)

This was the biggest story of the week that wasn't about money.

**The backstory:**

Anthropic has a $200 million contract with the Pentagon. The Pentagon wanted Anthropic to agree that Claude could be used "for all lawful purposes." Anthropic said no.

**The red lines Anthropic drew:**

CEO Dario Amodei was specific about what Anthropic won't allow: fully autonomous weapons targeting without human control, and mass domestic surveillance of Americans. His argument was simple: current AI systems aren't reliable enough for life-or-death targeting decisions, and existing laws don't adequately restrict AI-driven surveillance conclusions that could "violate the spirit of constitutional protections."

**The Pentagon's response:**

Defense Secretary Pete Hegseth threatened to terminate the contract, label Anthropic a "supply chain risk," and potentially invoke the Defense Production Act. The Pentagon's position was that contractors don't get to decide how the government uses legally purchased technology.

**What happened:**

Amodei didn't budge. The deadline passed on February 26 without an agreement. OpenAI, meanwhile, announced its own Pentagon agreement, with Sam Altman claiming it includes appropriate safeguards.

**The App Store effect:**

On March 1, Claude jumped to #1 on the US App Store. Users rallied behind Anthropic in a way that surprised even the company. Daily sign-ups broke all-time records that week, free users were up 60% since January, and paid subscribers more than doubled. A standoff with the Pentagon turned into a marketing moment nobody planned for.

**Why this matters for developers:**

This sets a precedent. AI companies being willing (or not willing) to draw lines on how their technology gets used will shape how these systems get deployed in sensitive contexts. It also shows that public trust in AI companies is becoming a real competitive factor.

### Perplexity Launches "Computer" — Multi-Agent AI Orchestrator - [<i class="fas fa-external-link-alt"></i>](https://arstechnica.com/ai/2026/02/perplexity-announces-computer-an-ai-agent-that-assigns-work-to-other-ai-agents)

On February 26, Perplexity announced "Computer," a multi-model AI system that plans, builds, and executes entire workflows by assigning subtasks to different specialized AI agents.

**How it works:**

You describe an outcome (launch a marketing campaign, build an Android app, run a competitive analysis) and Computer breaks it down into subtasks, picks the right AI model for each one, and runs them in parallel or sequence. It can run for hours or even months. Each agent runs in an isolated cloud environment with access to a filesystem, browser, and integrated tools.

**Which models it uses:**

- Claude Opus 4.6 for core reasoning
- Gemini for deep research and sub-agent creation
- ChatGPT 5.2 for long-context recall
- Veo 3.1 for video production
- Grok for lightweight fast tasks
- Nano Banana 2 for image generation

**The catch:**

It's exclusive to Perplexity Max subscribers at $200/month. Not cheap.

**Why this matters:**

Most AI tools today make you pick one model and work with it. Computer abstracts that choice away and tries to use the right tool for each part of a bigger job. It's a concrete bet on the "orchestration layer" being where value gets created in AI, not just the models themselves.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms


{% include ads/in-article.html %}


### Figma + OpenAI Codex: Design to Code and Back - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/02/26/figma-partners-with-openai-to-bake-in-support-for-codex)

On February 26, Figma announced a partnership with OpenAI to bring Codex directly into the design workflow. This was the week after Figma integrated Claude Code, so they're clearly moving fast on AI.

**What the integration does:**

The connection works through Figma's MCP server in both directions.

Going design to code: developers can extract design tokens, component information, layouts, and styles directly from Figma files and pass them to Codex for code generation, without the usual manual translation step. If you've ever spent time interpreting a Figma design file and converting spacing values and color names into CSS, you know how tedious this gets.

Going code to canvas: Codex can now generate fully editable Figma frames from live, running code interfaces using a `generate_figma_design` tool. If you built something and want to hand it back to designers for further exploration, Codex can turn your implementation into a Figma component in seconds.

**Why it's useful:**

The traditional developer handoff, where a designer hands over a Figma file and a developer interprets it, involves a lot of back-and-forth. This tries to eliminate that friction by making the two tools talk directly to each other.

**What to watch:**

Figma integrating both Claude Code and Codex in consecutive weeks suggests they're treating AI as core infrastructure, not a feature. The design tool and the development tool are converging.

### Go 1.26 Ships with Green Tea GC On by Default - [<i class="fas fa-external-link-alt"></i>](https://go.dev/blog/go1.26)

Go 1.26 dropped in February with several changes that matter for production systems.

**The Green Tea garbage collector:**

The experimental Green Tea GC, which has been opt-in for a while, is now the default. For allocation-heavy programs, it cuts GC overhead by 10-40%. On newer AMD and Intel CPUs, you get about 10% improvement across the board. If you're running Go services at scale, this is a meaningful free speedup.

**The `new()` function change:**

The built-in `new` function now accepts expressions to specify initial values. You no longer need to create a temporary variable just to get a pointer to a struct with some initial state. Small change, but it cleans up a lot of boilerplate, especially when working with JSON or protobuf structs that use optional pointer fields.

**Self-referential generics:**

Generic types can now refer to themselves in their type parameter list, which enables F-bounded polymorphism patterns. If you've been working around this limitation, you can stop.

**The new `go fix` command:**

The `go fix` command was completely rewritten using the Go analysis framework. It now includes dozens of "modernizers," automated suggestions that update your code to use newer language features safely. Think of it as a codemod tool built into the toolchain.

**Performance wins:**

cgo overhead dropped by about 30%. The compiler can now put slice backing stores on the stack in more situations. These aren't dramatic changes, but they add up in hot paths.

### Mercury 2: Diffusion-Based Reasoning at 1,000+ Tokens Per Second - [<i class="fas fa-external-link-alt"></i>](https://www.inceptionlabs.ai/blog/introducing-mercury-2)

On February 24, Inception launched Mercury 2, a diffusion-based reasoning LLM that runs at over 1,000 tokens per second.

**Why it's different from other LLMs:**

Every major LLM generates text one token at a time, left to right. Mercury 2 doesn't. It uses a diffusion approach: it starts with a rough draft and refines it iteratively, processing multiple tokens in parallel. It's more like editing than typing.

**The numbers:**

5x faster than leading speed-optimized models like Claude 4.5 Haiku and GPT-5.2 Mini. 1,000+ tokens per second on Nvidia Blackwell GPUs. Pricing is $0.25/1M input tokens and $0.75/1M output tokens. It supports 128K context windows, tunable reasoning, and native tool use.

**Where it makes sense:**

Latency-sensitive applications are the obvious target: voice AI, real-time search, agentic loops where the model has to respond quickly many times in sequence. If you're building something where waiting 2 seconds for a response kills the experience, a 5x speed improvement matters a lot.

**The team:**

Inception was founded by researchers from Stanford, UCLA, and Cornell. The company is backed by people from Google DeepMind, Meta AI, Microsoft AI, and OpenAI. They've been working on diffusion for text generation for a while, and Mercury 2 is where it becomes practically useful.

### VS Code 1.110: Agent Sessions, Browser Integration, Ghostty Support - [<i class="fas fa-external-link-alt"></i>](https://code.visualstudio.com/updates/v1_110)

The February Insiders update (v1.110) for VS Code rolled out throughout the week with a clear focus on multi-agent development.

**Agent Sessions:**

A new unified Agent Sessions view lets you manage local, background, and cloud agents in one place. You can run Claude and Codex agents alongside GitHub Copilot and switch between them as needed. You can also rename agent sessions from the list, which is the kind of small thing that matters when you're juggling multiple.

**Browser integration in chat:**

AI agents can now interact with browser page elements, take screenshots, and read real-time console logs directly from the chat interface. This is significant for frontend debugging and testing workflows.

**Agent plugins from private repos:**

You can now install agent plugins from private GitHub repositories and direct git URLs, not just the public marketplace. The `~/.copilot/instructions` directory gets automatically added to instruction load paths.

**Ghostty support:**

VS Code now supports Ghostty as an external terminal on macOS and Linux. If you switched to Ghostty recently and wanted it integrated, this is your update.

**MCP sandbox isolation:**

Local MCP servers using stdio transport can now run in a sandbox with file system and network isolation. This matters for security when running third-party MCP servers you didn't write yourself.

**Background agents get slash commands:**

If you're running background agents, they now support slash commands, which makes directing them a lot more precise.

### GitHub Copilot Gets PR Title Generation and Built-In Security Checks - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-02-25-generate-pull-request-titles-with-copilot-on-the-web/)

GitHub shipped a few useful Copilot updates on February 25.

**PR title generation on the web:**

You can now generate pull request titles on github.com by clicking the Copilot button in the title field. It suggests titles based on your commit messages. Small feature, but useful if you've ever stared at a blank PR title field after a long session.

**Built-in security checks in the coding agent:**

The Copilot coding agent now runs code scanning, secret scanning, and dependency vulnerability checks before it opens a pull request. It flags issues and iterates on fixes before a human ever reviews the PR. Code scanning is included for free with Copilot coding agent.

**Model picker in the agents panel:**

The Agents panel now has a model picker. You can use a faster model for routine tasks like unit tests and switch to a more capable model for complex refactoring. Currently for Pro and Pro+ users, with Business and Enterprise support coming.

**Improved web search:**

Model-native web search is now enabled in certain Copilot models on github.com, with Bing as a fallback. This makes Copilot answers about recent topics more accurate.

### Claude Code Security: AI-Powered Vulnerability Scanner - [<i class="fas fa-external-link-alt"></i>](https://claude.com/solutions/claude-code-security)

Anthropic released Claude Code Security in a limited research preview this week, an AI-powered tool that scans codebases for vulnerabilities and proposes patches for human review.

**How it works:**

Instead of pattern matching like most static analysis tools, it uses behavioral reasoning. It traces how data flows through your code, examines how components interact, and tries to find vulnerabilities the same way a human security researcher would. It then challenges its own findings before reporting them to cut down on false positives.

**The numbers from testing:**

Anthropic found over 500 vulnerabilities in production open-source software during testing, bugs that had existed for years without being caught by other tools. They're working through responsible disclosure with the affected project maintainers.

**Who can use it:**

Enterprise and Team customers get access now. Open-source maintainers can apply for accelerated access.

**The irony:**

Right after the announcement, Check Point researchers found two critical vulnerabilities in Claude Code itself (CVE-2025-59536 and CVE-2026-21852) that allowed remote code execution and API key theft through malicious repository configuration files. Anthropic patched everything before public disclosure, but the timing was notable.

---

## <i class="fas fa-building"></i> Industry News


{% include ads/display.html %}


### OpenAI Makes London Its Largest Research Hub Outside the US - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/introducing-openai-london)

On February 26, OpenAI announced that London will become its largest research hub outside the United States.

**What this means:**

London-based researchers will "own key components of OpenAI's frontier model development," specifically focused on safety, alignment, reliability, and performance evaluation. This isn't just a satellite office or a sales team. They're putting research ownership there.

**The competitive context:**

OpenAI's first international office was in London, opened in 2023, with just over 30 employees. Google DeepMind employs 2,000 people in the UK. If OpenAI wants to compete for UK AI research talent, it needs a bigger presence. This is that move.

**Government reaction:**

UK Technology Secretary Liz Kendall called it "a huge vote of confidence" in the country's AI research leadership. The UK has been positioning itself aggressively as an AI-friendly hub, and this validates that strategy.

**Note:**

OpenAI didn't disclose specific hiring targets or investment figures. The ambition is clear, the specifics are not.

### Anthropic Acquires Vercept to Strengthen Computer Use Capabilities - [<i class="fas fa-external-link-alt"></i>](https://www.techcrunch.com/2026/02/25/anthropic-acquires-vercept-ai-startup-agents-computer-use-founders-investors/)

On February 25, Anthropic acquired Vercept, a computer-use AI startup that had raised $50 million.

**What Vercept built:**

Vercept's product was Vy, a cloud-based AI agent for operating remote computers. You give it a task, it handles the mouse clicks, form fills, and navigation on a remote machine. The company was building in the same space as Claude's computer use feature.

**What happens next:**

Vercept's product Vy shuts down on March 25. The three co-founders, Kiana Ehsani, Luca Weihs, and Ross Girshick, are joining Anthropic. One of their co-founders, Matt Deitke, already left to join Meta's Superintelligence Lab before this happened.

**Why it makes sense:**

Anthropic has been building computer use capabilities into Claude. Acquiring Vercept brings in people who have been working on this problem full-time and thinking about it deeply. It's a talent and technology acquisition more than a product acquisition.

### C3.ai and eBay Both Cut Significant Parts of Their Workforces - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/business/c3ai-cuts-26-global-staff-under-new-ceos-restructuring-push-2026-02-26/)

Two major layoff announcements landed on February 26.

**C3.ai cuts 26%:**

Enterprise AI software company C3.ai announced it's cutting roughly 307 employees, about 26% of its global staff, under new CEO Stephen Ehikian. The company is restructuring and also projected Q4 revenue of $48-52 million, well below the $77 million analysts expected. That's a rough combination.

**eBay cuts 6%:**

eBay confirmed layoffs of approximately 800 employees, 6% of its global workforce. The cuts came on the same day the company announced it was acquiring Depop from Etsy for $1.2 billion, pivoting toward recommerce growth. They say they'll continue hiring in strategic areas.

---

## <i class="fas fa-shield-alt"></i> Security

### Hacker Used Claude to Steal 150GB of Mexican Government Data - [<i class="fas fa-external-link-alt"></i>](https://securityaffairs.com/188696/ai/claude-code-abused-to-steal-150gb-in-cyberattack-on-mexican-agencies.html)

This one is important. An unidentified solo attacker used a jailbroken Claude subscription to conduct a six-week cyberattack on Mexican government agencies, stealing roughly 150 gigabytes of data.

**The data stolen:**

195 million taxpayer records from Mexico's federal tax authority (SAT). Voter registration databases from the National Electoral Institute (INE). Government employee credentials. Civil registry files.

**How the attack worked:**

The attacker used Spanish-language prompts and a "role-play jailbreak," telling Claude it was playing an elite hacker in a penetration testing simulation. Once jailbroken, Claude acted as an attack orchestrator. It generated network scanning scripts, SQL injection payloads targeting government login pages, credential-stuffing scripts, and exploitation code for 20+ identified vulnerabilities across 10+ government agencies.

**How it was discovered:**

Israeli security firm Gambit Security found the breach through publicly exposed Claude conversation logs. The logs showed exactly how the attacker had directed Claude and what had been generated.

**The takeaway:**

This wasn't sophisticated custom malware. A person with a $20/month subscription and some creativity caused a massive breach. As AI tools become better at generating attack code, the barrier to conducting serious cyberattacks keeps dropping. Organizations with government-level data need to assume that attackers are using AI just like defenders are.

### Cisco SD-WAN Critical Vulnerability Actively Exploited - [<i class="fas fa-external-link-alt"></i>](https://www.cisa.gov/news-events/alerts/2026/02/25/cisa-and-partners-release-guidance-ongoing-global-exploitation-cisco-sd-wan-systems)

On February 25, CISA issued an Emergency Directive after discovering that a critical Cisco vulnerability was being actively exploited globally.

**The vulnerability:**

CVE-2026-20127 is an authentication bypass in Cisco Catalyst SD-WAN Controller and Manager with a CVSS score of 10.0 (the maximum). Unauthenticated attackers can bypass authentication, gain administrative privileges, and manipulate network configuration through NETCONF access.

**How bad:**

Attackers were combining this with an older vulnerability (CVE-2022-20775) to gain persistent access to networks. CISA issued Emergency Directive 26-03, requiring federal agencies to inventory all affected systems, apply patches immediately, and assess whether they had already been compromised.

**What to do:**

No workarounds exist. Patch immediately. If you're running Cisco Catalyst SD-WAN Controller or Manager, treat this as a fire drill.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter


{% include ads/in-article.html %}


- **$110 billion** — OpenAI's latest funding round, one of the largest private rounds in history
- **$840 billion** — OpenAI's post-money valuation after the round
- **$50 billion** — Amazon's stake in the OpenAI round
- **$100 billion** — OpenAI's expanded AWS partnership value over 8 years
- **$200 million** — The Pentagon contract Anthropic was willing to risk by refusing to remove AI safeguards
- **60%** — Increase in Claude free users since January, driven by the Pentagon standoff
- **#1** — Where Claude landed on the US App Store on March 1
- **150GB** — Data stolen from Mexican government agencies using Claude
- **195 million** — Taxpayer records exposed in the Mexico breach
- **1,000+** — Tokens per second Mercury 2 generates on Nvidia Blackwell GPUs
- **5x** — Speed improvement Mercury 2 has over leading speed-optimized models
- **10-40%** — GC overhead reduction from Go 1.26's Green Tea collector
- **30%** — Reduction in cgo overhead in Go 1.26
- **500+** — Vulnerabilities found by Claude Code Security in open-source production software
- **10.0** — CVSS score of the Cisco SD-WAN CVE-2026-20127 (maximum possible)
- **26%** — Portion of C3.ai workforce cut in the latest restructuring
- **$1.2 billion** — Price eBay paid to acquire Depop from Etsy
- **30** — Number of OpenAI researchers currently in London before the expansion

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**OpenAI $110B round** — Amazon, Nvidia, SoftBank put in $110 billion at an $840B valuation. AWS deal expands to $100B over 8 years.

**Anthropic vs Pentagon** — Dario Amodei refuses to remove autonomous weapons and surveillance safeguards. Claude hits #1 on App Store as users rally behind the decision.

**Perplexity Computer** — Multi-agent AI system orchestrates complex workflows using Claude, Gemini, ChatGPT, and others. $200/month for Max subscribers.

**Figma + Codex** — Design-to-code and code-to-canvas workflows now connect through Figma's MCP server.

**Go 1.26 ships** — Green Tea GC on by default, `new()` accepts initial values, self-referential generics, rewritten `go fix` with modernizers.

**Mercury 2 launches** — Diffusion-based reasoning LLM hits 1,000+ tokens/sec. 5x faster than comparable models.

**VS Code 1.110** — Agent Sessions, browser integration, Ghostty support, MCP sandbox isolation, slash commands for background agents.

**GitHub Copilot updates** — PR title generation on the web, model picker in agents panel, built-in security checks before PRs open.

**Claude Code Security** — AI-powered vulnerability scanner finds 500+ bugs in open-source software. In limited research preview for Enterprise and Team.

**OpenAI London hub** — London becomes OpenAI's largest research hub outside the US. Frontier model ownership moves there.

**Anthropic acquires Vercept** — Computer-use AI startup and its founding team join Anthropic. Vy product shuts down March 25.

**C3.ai cuts 26%** — New CEO restructures workforce, Q4 revenue forecast misses expectations significantly.

**eBay lays off 6%** — 800 roles cut alongside a $1.2B Depop acquisition.

**Claude Mexico breach** — Jailbroken Claude used to steal 150GB from Mexican government agencies over six weeks.

**Cisco SD-WAN CVE** — CVSS 10.0 authentication bypass actively exploited globally. CISA issues Emergency Directive 26-03.

**Nano Banana 2** — Google's Gemini 3.1 Flash Image rolls out with Pro-quality output at Flash speed. Free for all Gemini users, available in the API.

**Google Intrinsic joins Google** — Alphabet's robotics software company moves under Google proper, will work with DeepMind and Gemini.

---

*It was a week where the money got absurd and the principles got tested. OpenAI raising $110 billion would have been the clear story of the week in any other news cycle. But the Anthropic-Pentagon standoff captured something different: an AI company actually drawing lines on how its technology gets used, and users responding by pushing Claude to the top of the App Store. The Mexico breach is a reminder that the same AI that makes developers more productive also makes attackers more productive. The security gap between what AI can help build and what AI can help break is closing fast. On the tools side, Go 1.26, Mercury 2, and the VS Code agent updates were genuinely good news: faster runtimes, faster models, better development workflows. Figma bringing Codex into the design loop is one of those integrations that sounds obvious in retrospect. Developer tooling is getting better week by week. The harder questions are the ones outside the codebase.*

*See you next week.*
