---
layout: post
seo: true
title: "Dev Weekly: TeamPCP Supply Chain Attack Grows, Arm Ships First Chip, Codex Gets Plugins, EU Commission Hacked"
subtitle: "TeamPCP supply chain campaign compromises LiteLLM and Telnyx on PyPI. Arm releases its first in-house chip in 35 years. OpenAI adds plugins to Codex. JetBrains launches Central for agentic development. European Commission confirms AWS breach with 350GB stolen. Microsoft and Nvidia partner on AI for nuclear. Google drops TurboQuant for 6x LLM memory savings. VS Code 1.113 ships with AI reasoning controls. Amazon acquires Fauna Robotics. Meta cuts 700 jobs. Claude subscriptions double."
date: 2026-03-29
categories: tech-news
permalink: /dev-weekly/2026/mar-23-29/teampcp-supply-chain-arm-agi-cpu-codex-plugins-jetbrains-central/
share-img: /assets/img/posts/dev_weekly/tech-news-23-29mar-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-23-29mar-2026.svg
description: "TeamPCP supply chain attack hits LiteLLM and Telnyx on PyPI, stealing credentials from hundreds of thousands of systems. Arm ships its first in-house chip in 35 years with Meta as lead customer. OpenAI adds plugin system to Codex with 20+ integrations. JetBrains launches Central platform for agentic software development. European Commission confirms AWS account breach with 350GB of data stolen. Microsoft and Nvidia partner to use AI for accelerating nuclear reactor deployment. Google unveils TurboQuant to cut AI memory usage by 6x with zero accuracy loss. VS Code 1.113 adds AI reasoning controls and nested subagents. GitHub expands security coverage with AI-powered detections. Amazon acquires Fauna Robotics and the Sprout humanoid robot. Chroma releases Context-1, a 20B parameter model for agentic search. CISA adds Langflow and Trivy to Known Exploited Vulnerabilities catalog. China releases first embodied AI industry standard. Kandou AI raises $225M for copper interconnect technology. Databricks acquires two startups and launches Lakewatch SIEM. Isara raises $94M backed by OpenAI to build AI agent swarms. Black Duck launches Signal for agentic security of AI-generated code. Cloudflare Agents SDK v0.8.0 ships. Google launches Search Live globally. Meta lays off 700 employees. Claude paid subscriptions more than double. March 2026 developer news."
keywords: "TeamPCP supply chain attack LiteLLM Telnyx PyPI compromised March 2026, Arm AGI CPU first in-house chip Meta OpenAI Cloudflare, Microsoft Nvidia AI nuclear power plant reactor deployment, OpenAI Codex plugins system Slack Figma Notion enterprise, JetBrains Central agentic software development platform, Amazon Fauna Robotics Sprout humanoid robot acquisition, Google TurboQuant AI memory compression 6x ICLR 2026, China embodied AI industry standard humanoid robot, Kandou AI $225M copper interconnect Chord signaling AI infrastructure, VS Code 1.113 AI reasoning controls nested subagents weekly release, GitHub AI security detections CodeQL hybrid model, Meta layoffs 700 employees March 2026 Reality Labs, Anthropic Claude subscriptions doubled $19 billion ARR, EU AGILE €115 million defense innovation quantum drones, Meta AI prescription glasses Ray-Ban, Chroma Context-1 20B agentic search model, Databricks Lakewatch Antimatter SiftD acquisition, CISA Langflow Trivy KEV catalog exploited, European Commission AWS hack 350GB data breach, Isara $94M funding OpenAI AI agent swarms, Accel Prosus India deeptech startups Atoms X, dev weekly March 2026, software developer news"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the TeamPCP supply chain attack campaign in March 2026?"
    answer: "TeamPCP is a threat group that launched a cascading supply chain attack starting with the Trivy compromise on March 19. Using stolen credentials, they compromised LiteLLM on PyPI on March 24 (versions 1.82.7 and 1.82.8) and Telnyx Python SDK on March 27 (versions 4.87.1 and 4.87.2). The malware stole API keys, cloud credentials, SSH keys, and environment variables. LiteLLM has 3.6 million daily downloads. Telnyx has over 3.75 million total downloads. CISA added the Trivy vulnerability to its Known Exploited Vulnerabilities catalog on March 27."
  - question: "What is Arm's AGI CPU and why is it significant?"
    answer: "On March 24, 2026, Arm released the AGI CPU, its first in-house chip in 35 years. Arm has always licensed chip designs to other companies. This is the first time it is selling its own silicon. The chip has 136 Neoverse V3 cores on TSMC 3nm, runs at 3.7 GHz, and draws 300 watts. It is designed for AI inference in data centers. Meta is the lead customer and co-developer. OpenAI, Cerebras, and Cloudflare are launch partners. Arm expects the chip to generate $15 billion in annual revenue within five years."
  - question: "What are OpenAI Codex plugins and when were they launched?"
    answer: "On March 27, 2026, OpenAI launched a plugin system for Codex that lets enterprises package coding workflows, app integrations, and tool configurations into versioned bundles. Over 20 plugins shipped at launch with integrations for Slack, Figma, Notion, Gmail, Google Drive, and GitHub. The system includes governance features for IT administrators. OpenAI also announced plans for a plugin marketplace and self-serve publishing tools."
  - question: "What is JetBrains Central?"
    answer: "JetBrains Central was announced on March 24, 2026. It is a platform for managing AI coding agents across software development teams. It provides governance and policy enforcement, cloud agent runtimes, and shared semantic context across repositories. It works with agents from JetBrains, Claude, Codex, Gemini, or custom solutions. According to JetBrains' January 2026 survey, 90% of developers use AI at work and 22% already use AI coding agents. Early access starts Q2 2026."
  - question: "What is Google TurboQuant and how does it reduce AI memory usage?"
    answer: "Google announced TurboQuant on March 25, 2026. It is a compression algorithm that reduces LLM key-value cache memory by 6x and delivers up to 8x speedup on Nvidia H100 GPUs with zero accuracy loss. It uses two techniques: PolarQuant for high-quality compression using polar coordinates, and Quantized Johnson-Lindenstrauss (QJL) for 1-bit error correction. The algorithm is data-oblivious, meaning it requires no dataset-specific tuning. Google presented it at ICLR 2026."
  - question: "How many employees did Meta lay off in March 2026?"
    answer: "On March 25, 2026, Meta laid off approximately 700 employees across Reality Labs, recruiting, social media, and sales divisions. This was the second round of cuts in 2026 following around 1,000 Reality Labs layoffs in January. The cuts are part of Meta's shift toward AI investment, with total expenses projected between $162 and $169 billion for 2026."
---

The TeamPCP supply chain campaign kept growing this week. After hitting Trivy earlier in the month, the group compromised LiteLLM and Telnyx on PyPI, stealing credentials from hundreds of thousands of developer systems. On the hardware side, Arm made history by shipping its first in-house chip after 35 years of only licensing designs. Microsoft and Nvidia teamed up to use AI for building nuclear power plants. OpenAI added a plugin system to Codex. JetBrains launched Central, a platform for managing AI coding agents across teams. Amazon acquired Fauna Robotics. Google published TurboQuant, a compression algorithm that cuts AI memory usage by 6x. China released its first industry standard for embodied AI. Kandou AI raised $225 million for copper interconnect tech. VS Code 1.113 shipped with AI reasoning controls. Meta cut 700 jobs. And Anthropic reported that Claude paid subscriptions have more than doubled this year. Here's the full breakdown.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### TeamPCP Supply Chain Campaign Hits LiteLLM and Telnyx on PyPI - [<i class="fas fa-external-link-alt"></i>](https://www.helpnetsecurity.com/2026/03/25/teampcp-supply-chain-attacks/)

The TeamPCP supply chain campaign that started with the Trivy compromise on March 19 kept expanding this week. Two major Python packages were hit: LiteLLM on March 24 and Telnyx on March 27.

**LiteLLM (March 24):**

LiteLLM is a Python library that lets developers call over 100 LLM APIs through a single interface. It gets 3.6 million downloads per day. On March 24, TeamPCP [compromised the GitHub account of LiteLLM's co-founder](https://www.theregister.com/2026/03/24/trivy_compromise_litellm/) and used it to publish malicious versions 1.82.7 and 1.82.8 to PyPI. The malware harvested API keys, environment variables, SSH keys, cloud credentials, and database passwords from every system that imported the package. The poisoned versions were live for roughly 2 to 6 hours before PyPI pulled them. Given the download volume, a lot of systems were exposed in that window.

**Telnyx (March 27):**

Three days later, TeamPCP [hit the Telnyx Python SDK](https://www.helpnetsecurity.com/2026/03/27/teampcp-telnyx-supply-chain-compromise/), publishing malicious versions 4.87.1 and 4.87.2. Security researchers believe the attack vector was the LiteLLM compromise itself. If any developer or CI pipeline had both LiteLLM installed and access to the Telnyx PyPI publishing token, that token was already in TeamPCP's hands.

The Telnyx payload used a technique researchers hadn't seen from TeamPCP before: WAV file steganography. The malware hid its payloads inside audio files to avoid detection. On Linux and macOS, it harvested credentials. On Kubernetes, it deployed privileged pods across all nodes to install persistence on hosts. PyPI quarantined both versions within about 6 hours.

**The chain so far:**

Trivy (March 19) led to stolen npm and PyPI tokens. Those tokens enabled compromises of Checkmarx GitHub Actions and npm packages (March 23), LiteLLM (March 24), and Telnyx (March 27). Mandiant reported awareness of over 1,000 SaaS environments affected. TeamPCP claims to have exfiltrated data from over 500,000 infected systems and 300GB of credentials. The FBI has warned to expect more breach disclosures, follow-on intrusions, and extortion attempts in the coming weeks.

**What to do:**

If you installed LiteLLM 1.82.7 or 1.82.8, or Telnyx 4.87.1 or 4.87.2, treat all credentials on those systems as compromised. Rotate everything. Pin to LiteLLM 1.82.6 and Telnyx 4.87.0.

### Arm Ships Its First In-House Chip After 35 Years - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/24/arm-is-releasing-its-first-in-house-chip-in-its-35-year-history/)

On March 24, Arm announced the AGI CPU, the first chip the company has ever designed and manufactured itself. For 35 years, Arm only licensed its chip designs to other companies like Apple, Qualcomm, and Samsung. That era is over.

**The chip:**

The AGI CPU has 136 Neoverse V3 cores running at up to 3.7 GHz, built on TSMC's 3nm process with two dies. It's a 300-watt processor with 12 channels of DDR5 memory, 96 lanes of PCIe 6.0, CXL 3.0 support, and 825 GB/s of aggregate memory bandwidth.

**What it's for:**

This is a CPU, not a GPU. It's designed for AI inference workloads in data centers, specifically for running the agentic AI systems that need to manage memory, schedule workloads, and move data across distributed systems. Arm's pitch is that the CPU has become the bottleneck in modern AI infrastructure, and this chip is built to fix that.

**Who's buying:**

Meta co-developed the chip and is the first customer, planning to deploy it at scale later this year. OpenAI, Cerebras, Cloudflare, Rebellions, and SK Telecom are launch partners. Arm expects the AGI CPU to generate roughly [$15 billion in annual revenue within five years](https://today.reuters.com/business/media-telecom/arm-unveils-new-ai-chip-expects-it-add-billions-annual-revenue-2026-03-24/).

**Why it matters:**

Arm designing and selling its own silicon is a big deal. The company is now competing directly with some of its licensees. Intel and AMD are already dealing with CPU shortages, and Arm is positioning itself to fill that gap in AI data centers. The fact that Meta and OpenAI signed on as early customers says a lot about where AI infrastructure demand is heading.

### OpenAI Adds Plugin System to Codex - [<i class="fas fa-external-link-alt"></i>](https://siliconangle.com/2026/03/27/openai-introduces-plugins-codex-programming-assistant/)

On March 27, OpenAI launched a plugin system for Codex that lets enterprises extend the coding assistant with custom workflows, app integrations, and tool configurations.

**How it works:**

Codex plugins are versioned, installable bundles that can include three types of components. Skills are workflows that automate specific tasks using natural language instructions and scripts. MCP server integrations connect Codex to external services. App integrations provide pre-built connectors for services like Slack, Figma, Notion, Gmail, Google Drive, and GitHub.

Over 20 plugins shipped at launch. IT administrators can use the governance features to standardize what plugins are available across their organization.

**The competitive context:**

Anthropic shipped a [similar feature for Claude Code](https://arstechnica.com/ai/2026/03/openai-brings-plugins-to-codex-closing-some-of-the-gap-with-claude-code/) about five months ago. Claude Code has gained more traction among developers than Codex, and this plugin launch is partly about closing that gap. OpenAI also announced that GPT-5.3-Codex now runs 25% faster while using 48% fewer tokens.

**What's next:**

OpenAI plans to add sub-agents as a new plugin component type and open up plugin development to third parties with a marketplace and self-serve publishing tools.

### JetBrains Launches Central for Agentic Software Development - [<i class="fas fa-external-link-alt"></i>](https://blog.jetbrains.com/blog/2026/03/24/introducing-jetbrains-central-an-open-system-for-agentic-software-development/)

On March 24, JetBrains announced JetBrains Central, a platform for managing AI coding agents across development teams.

**The problem it solves:**

AI coding agents are spreading fast. JetBrains' January 2026 survey of 11,000 developers found that 90% use AI at work and 22% already use coding agents. But only 13% use AI across the full development lifecycle. Most organizations have no way to manage agent costs, enforce policies, or share context across agent sessions. JetBrains Central is built to fix that.

**What it does:**

JetBrains Central provides three things. First, governance: policy enforcement, identity management, audit trails, and cost tracking for agent-driven work. Second, execution infrastructure: cloud runtimes where agents can run reliably. Third, context: a shared semantic layer that gives agents access to knowledge across repositories and projects so they can make better decisions.

**The architecture:**

JetBrains Central is not locked to JetBrains tools. It works with JetBrains IDEs, third-party IDEs, CLI tools, and web interfaces. It supports agents from Claude, Codex, Gemini, or custom-built solutions. The idea is that organizations can swap tools and models without rebuilding their infrastructure.

**Availability:**

Early access starts Q2 2026 with a limited group of design partners.

**Why it matters:**

This is one of the first serious attempts to build a control plane for AI coding agents at the organization level. Individual developers have plenty of agent options. Teams and enterprises have almost nothing for managing those agents at scale. JetBrains is betting that governance and context sharing will be the next bottleneck, and they're probably right.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms


{% include ads/in-article.html %}


### Google Unveils TurboQuant: 6x Less Memory for LLMs with Zero Accuracy Loss - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/25/google-turboquant-ai-memory-compression-silicon-valley-pied-piper/)

On March 25, Google announced TurboQuant, a compression algorithm that reduces LLM key-value cache memory by 6x and delivers up to 8x speedup on Nvidia H100 GPUs. The internet immediately started calling it "Pied Piper."

**How it works:**

TurboQuant uses two techniques. [PolarQuant](https://www.marktechpost.com/2026/03/25/google-introduces-turboquant-a-new-compression-algorithm-that-reduces-llm-key-value-cache-memory-by-6x-and-delivers-up-to-8x-speedup-all-with-zero-accuracy-loss/) randomly rotates data vectors and converts them from Cartesian to polar coordinates, separating magnitude and direction. This eliminates the normalization overhead that slows down most quantization methods. Then QJL (Quantized Johnson-Lindenstrauss) applies a 1-bit error correction layer to smooth out residual errors and preserve the vector relationships needed for attention scoring.

**Why it matters for developers:**

The algorithm is data-oblivious, meaning it doesn't require dataset-specific tuning or calibration runs. It compresses from 16-bit to 3-bit precision without measurable accuracy loss. For anyone running inference at scale, this could meaningfully reduce hardware costs. Google presented the work at ICLR 2026.

### VS Code 1.113: AI Reasoning Controls and Nested Subagents - [<i class="fas fa-external-link-alt"></i>](https://code.visualstudio.com/updates/v1_113/)

VS Code 1.113 shipped on March 25 as the third weekly release under Microsoft's new release cadence.

**Key changes:**

A new thinking effort selector lets you control how much reasoning the AI model does per request, with low, medium, and high options. This is useful when you want quick completions for simple tasks without waiting for deep reasoning. Nested subagents can now invoke other subagents for multi-step workflows. MCP servers configured in VS Code are now shared with Copilot CLI and Claude agents. Session forking is available in experimental preview for Copilot CLI and Claude agents.

**Visual updates:**

Two new default themes, VS Code Light and VS Code Dark, replace the old defaults with cleaner visuals and automatic system theme syncing.

### GitHub Expands Security Coverage with AI-Powered Detections - [<i class="fas fa-external-link-alt"></i>](https://github.blog/security/application-security/github-expands-application-security-coverage-with-ai-powered-detections/)

On March 24, GitHub announced a hybrid security detection model that pairs CodeQL's static analysis with AI-powered detections.

**What it covers:**

The AI detections extend coverage to languages and frameworks that are hard to support with traditional static analysis: Shell/Bash, Dockerfiles, Terraform (HCL), and PHP. Internal testing processed over 170,000 findings over 30 days, with 80% positive developer feedback.

**How it integrates:**

Detections show up directly in pull requests. GitHub links them to Copilot Autofix, which resolved over 460,000 security alerts in 2025. Public preview is planned for early Q2 2026.

### Chroma Releases Context-1: A 20B Model for Agentic Search - [<i class="fas fa-external-link-alt"></i>](https://www.trychroma.com/research/context-1)

On March 29, Chroma released Context-1, a 20 billion parameter model designed specifically for multi-hop retrieval in RAG systems.

**What makes it different:**

Context-1 doesn't generate answers. It acts as a retrieval subagent that finds supporting documents for complex queries and hands them to a downstream model. It decomposes questions into targeted subqueries, executes parallel tool calls (averaging 2.56 per turn), and can selectively discard irrelevant results to keep the context window clean.

**Performance:**

It achieves retrieval quality comparable to frontier LLMs while being 10x faster and 25x cheaper. The model is open source under Apache 2.0 and available on Hugging Face.

### Cloudflare Agents SDK v0.8.0 - [<i class="fas fa-external-link-alt"></i>](https://developers.cloudflare.com/changelog/post/2026-03-23-agents-sdk-v080/)

On March 23, Cloudflare shipped Agents SDK v0.8.0 with readable state properties on `useAgent` and `AgentClient`, idempotent `schedule()` to prevent duplicate rows across Durable Object restarts, full TypeScript inference for `AgentClient`, and migration to Zod 4.

---

## <i class="fas fa-building"></i> Industry News

### Meta Cuts Around 700 Jobs Across Multiple Divisions - [<i class="fas fa-external-link-alt"></i>](https://www.theverge.com/tech/900946/meta-layoffs-hundreds-employees)

On March 25, Meta laid off approximately 700 employees across Reality Labs, recruiting, social media, sales, and global operations.

This was the second round of cuts in 2026. Meta let go of about 1,000 Reality Labs employees in January. CEO Mark Zuckerberg has said that AI now lets projects that used to need large teams get done by smaller groups.

The layoffs are part of Meta's pivot toward AI spending. The company's total expenses for 2026 are projected between $162 billion and $169 billion. Meta employed about 79,000 people as of December 2025.

### Anthropic: Claude Paid Subscriptions Have More Than Doubled in 2026 - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/28/anthropics-claude-popularity-with-paying-consumers-is-skyrocketing/)

On March 28, TechCrunch reported that Claude's paid subscriptions have more than doubled this year, based on analysis of credit card transactions from 28 million U.S. consumers.

**What's driving the growth:**

Three things. Claude Code, launched in January, hit a run-rate above $2.5 billion and became one of the fastest-monetizing developer tools ever. Anthropic's Super Bowl campaign pushed Claude from #42 to #7 on the Apple App Store in three days. And the Pentagon dispute, where Anthropic refused to remove safety limits from Claude, drove the app to #1 on both app stores. Daily signups hit 1 million per day for a week straight.

**The numbers:**

Anthropic's annualized revenue has reached approximately $19 billion, up from $1 billion in December 2024. Enterprise still accounts for about 80% of revenue, but consumer growth is accelerating fast.

### Databricks Acquires Two Startups, Launches Lakewatch SIEM - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/24/databricks-buys-two-startups-lakewatch-antimatter-siftd-ai-security/)

On March 24, Databricks announced it acquired Antimatter and SiftD.ai to power Lakewatch, a new AI-driven SIEM platform.

Antimatter built a data control plane for running AI agents while protecting sensitive data. SiftD created an interactive notebook for human-agent collaboration, similar to Jupyter. Its CEO Steve Zhang was previously chief scientist at Splunk where he created the Search Processing Language. Both were small acqui-hires with undisclosed terms.

Lakewatch uses Anthropic's Claude to detect and investigate security threats at scale. Adobe and Dropbox are early customers. Databricks is [positioning Lakewatch ahead of its expected IPO](https://www.cnbc.com/2026/03/24/databricks-cybersecurity-lakewatch-ipo.html).

### Isara Raises $94M to Build AI Agent Swarms - [<i class="fas fa-external-link-alt"></i>](https://techfundingnews.com/openai-backs-isara-ai-agents-94-million-funding/)

Isara, a San Francisco startup founded by two 23-year-old researchers, raised $94 million at a $650 million valuation. OpenAI led the round.

The company builds software to coordinate thousands of AI agents working together on large-scale problems. Founded in June 2025 by Eddie Zhang (former OpenAI AI safety researcher) and Henry Gasztowtt (Oxford computer science), Isara has demonstrated coordinating about 2,000 agents to predict gold prices. Initial targets are investment firms for predictive modeling, with biotech and geopolitical analysis as secondary markets.

### Microsoft and Nvidia Partner to Use AI for Building Nuclear Plants - [<i class="fas fa-external-link-alt"></i>](https://www.theregister.com/2026/03/25/microsoft_nvidia_ai_nuclear/)

On March 24, Microsoft and Nvidia announced a partnership at CERAWeek 2026 to use generative AI to accelerate the design, permitting, and construction of nuclear power plants.

**The problem:**

Building a nuclear plant currently takes over a decade, mostly because of fragmented engineering data, manual regulatory reviews, and highly customized designs. Every reactor ends up being a one-off project. Microsoft and Nvidia want to make the process repeatable and predictable using AI.

**What they built:**

The companies developed a set of AI tools covering the full reactor lifecycle. Generative AI handles document drafting and gap analysis for permitting. Digital twins with 4D and 5D simulations map schedules and costs before construction starts. AI-powered sensors do predictive maintenance during operations. The tools combine Nvidia's Omniverse, CUDA-X, and AI Enterprise with Microsoft's generative AI stack.

**Early results:**

Aalo Atomics reported a [92% reduction in permitting time](https://www.microsoft.com/en-us/industry/blog/energy-and-resources/2026/03/24/ai-for-nuclear-energy-powering-an-intelligent-resilient-future/), saving an estimated $80 million per year. Idaho National Laboratory is using the tools to automate engineering and safety analysis reports. Southern Nuclear is deploying Microsoft Copilot agents for engineering and licensing consistency.

**Why it matters:**

AI companies need massive amounts of power for data centers. Nuclear is the cleanest option for baseload energy. But nuclear projects are notoriously slow and expensive. If AI can cut the timeline significantly, it creates a feedback loop: AI helps build the power plants that power AI. That's the bet Microsoft and Nvidia are making.

### Amazon Acquires Fauna Robotics and the Sprout Humanoid - [<i class="fas fa-external-link-alt"></i>](https://apnews.com/article/amazon-humanoid-robot-fauna-sprout-f51ced4a097b1af56b0b2561cdca8fef)

On March 24, Amazon acquired Fauna Robotics, the startup behind the Sprout humanoid robot. Financial terms were not disclosed.

Sprout is a 3.5-foot-tall, 50-pound robot designed for home and social environments, not warehouse automation. It can walk, grip small objects, hold conversations, and handle light household tasks. Priced at $50,000, it launched in January as a developer-focused platform. Disney and Boston Dynamics are early customers.

Fauna was founded in 2024 by former Meta and Google engineers and had raised about $30 million from Kleiner Perkins, Quiet Capital, and Lux Capital. The team of roughly 50 employees [joined Amazon's Personal Robotics Group](https://www.eweek.com/news/amazon-acquires-fauna-robotics-humanoid-sprout/) and will continue operating as Fauna Robotics, an Amazon company.

### Kandou AI Raises $225M for Copper Interconnects That Challenge Optical - [<i class="fas fa-external-link-alt"></i>](https://siliconangle.com/2026/03/23/chip-interconnect-startup-kandou-ai-raises-225m-funding/)

On March 23, Swiss semiconductor firm Kandou AI raised $225 million in a Series A at a $400 million valuation. Maverick Silicon led the round, with SoftBank, Synopsys, Cadence, and Alchip participating.

Kandou's Chord signaling technology sends correlated signals across multiple wires instead of the traditional two, achieving up to 448 Gbps bandwidth while using half the power of competing technologies. The company has shipped over 20 million silicon units. As AI models scale, data movement between processors and memory has become the bottleneck. Kandou is betting that copper-based interconnects can solve this more cost-effectively than optical, which was previously seen as the only path forward for AI hardware.

### China Releases First Industry Standard for Embodied AI - [<i class="fas fa-external-link-alt"></i>](https://news.cgtn.com/news/2026-03-27/China-releases-first-industry-standard-for-embodied-intelligence-1LQAZmMXmtW/p.html)

On March 26, China officially released its first industry-wide standard for embodied intelligence, covering how AI models interact with physical robot hardware.

The standard was developed by the China Academy of Information and Communications Technology (CAICT) with over 40 organizations. It covers six areas: basic commonality, brain-like computing, limbs and components, complete machines, applications, and safety and ethics. The testing framework includes over 10,000 test tasks across 300 task types spanning industrial, household, retail, and logistics use cases. It takes effect June 1, 2026.

This is China's move to standardize the embodied AI space before any other country does, turning what has been a research free-for-all into a structured industry with defined benchmarks.

### Google Launches Search Live Globally - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/26/google-is-launching-search-live-globally/)

On March 26, Google expanded Search Live to over 200 countries. The feature lets users have back-and-forth voice conversations with Google Search and point their phone camera at objects for real-time help. It's powered by the new Gemini 3.1 Flash Live audio model, which supports over 90 languages. Google also expanded Live Translate on headphones to iOS with support for over 70 languages.

---

## <i class="fas fa-shield-alt"></i> Security


{% include ads/display.html %}


### CISA Adds Langflow and Trivy to Known Exploited Vulnerabilities Catalog - [<i class="fas fa-external-link-alt"></i>](https://www.helpnetsecurity.com/2026/03/27/cve-2026-33017-cve-2026-33634-exploited/)

On March 27, CISA added two vulnerabilities to its Known Exploited Vulnerabilities catalog after confirming active exploitation.

**Langflow (CVE-2026-33017):**

A critical code injection vulnerability in Langflow versions 1.8.2 and earlier. Langflow is an open-source framework for building AI agent workflows. The advisory was published March 17, and within 20 hours, attackers had working exploits and were scanning for vulnerable instances. No public proof-of-concept was available at the time. The stolen keys and credentials could enable database access and further supply chain compromises. Federal agencies must remediate by April 8.

**Trivy (CVE-2026-33634):**

The Trivy GitHub Actions compromise from March 19 was assigned CVE-2026-33634 with a CVSS score of 9.3. Federal agencies must remediate by April 9.

Both entries show how fast the window between vulnerability disclosure and active exploitation is shrinking.

### European Commission Confirms AWS Account Breach, 350GB of Data Stolen - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/27/european-commission-confirms-cyberattack-after-hackers-claim-data-breach/)

On March 24, attackers compromised the European Commission's AWS account hosting Europa.eu websites. They exfiltrated over 350GB of data, including employee information and multiple databases. The Commission [detected the intrusion and contained it within hours](https://cybersecuritynews.com/european-commission-aws-hack/). Internal systems were not affected due to network segmentation.

AWS confirmed no security event on its infrastructure side, meaning the breach likely involved compromised account credentials. The attacker contacted cybersecurity media directly with proof of access and indicated plans to release the data publicly without a ransom demand. This is the second cyberattack on the European Commission in 2026.

### Black Duck Signal: Agentic Security for AI-Generated Code - [<i class="fas fa-external-link-alt"></i>](https://www.helpnetsecurity.com/2026/03/23/black-duck-signal-secures-ai-generated-code-with-agentic-application-security/)

On March 23, Black Duck announced general availability of Black Duck Signal, a security platform designed to keep up with the speed of AI coding agents.

Signal uses specialized AI security agents powered by ContextAI, Black Duck's proprietary security model built on over 20 years of human-curated security data across thousands of codebases. It integrates through MCP and APIs, working directly with AI coding assistants and CI/CD pipelines. It goes beyond pattern matching by using component, signature, and snippet analysis to find vulnerabilities that traditional static analysis tools miss, including business logic errors in languages not covered by AST-based tools.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **500,000+** — Systems TeamPCP claims to have exfiltrated data from across the supply chain campaign
- **300GB** — Credentials and secrets TeamPCP claims to have harvested
- **3.6 million** — Daily downloads of LiteLLM on PyPI before the compromise
- **742,000** — Total downloads of the Telnyx Python SDK on PyPI
- **1,000+** — SaaS environments Mandiant identified as affected by TeamPCP
- **136** — Neoverse V3 cores in Arm's AGI CPU
- **$15 billion** — Annual revenue Arm projects for the AGI CPU within five years
- **20+** — Plugins available at Codex launch
- **25%** — Speed improvement in GPT-5.3-Codex, with 48% fewer tokens
- **90%** — Developers using AI at work according to JetBrains' January 2026 survey
- **22%** — Developers already using AI coding agents
- **6x** — Memory reduction achieved by Google TurboQuant with zero accuracy loss
- **8x** — Attention speedup TurboQuant delivers on Nvidia H100 GPUs
- **92%** — Reduction in nuclear permitting time reported by Aalo Atomics using Microsoft/Nvidia AI tools
- **$225 million** — Kandou AI's Series A for copper interconnect technology at $400M valuation
- **448 Gbps** — Bandwidth achieved by Kandou's Chord signaling technology
- **20 million** — Silicon units shipped using Kandou's Chord technology
- **$50,000** — Price of Fauna Robotics' Sprout humanoid robot, acquired by Amazon
- **10,000** — Test tasks in China's new embodied AI standard across 300 task types
- **€115 million** — EU's AGILE program for defense innovation in quantum and drones
- **~700** — Meta employees laid off on March 25
- **$19 billion** — Anthropic's annualized revenue run rate as of March 2026
- **$2.5 billion** — Claude Code run-rate revenue since January launch
- **$94 million** — Isara's funding round at $650M valuation, backed by OpenAI
- **350GB** — Data stolen in the European Commission AWS breach
- **170,000** — Security findings processed in GitHub's AI detection testing over 30 days
- **10x** — Speed advantage of Chroma's Context-1 over frontier LLMs for retrieval
- **200+** — Countries where Google Search Live is now available

---

## <i class="fas fa-calendar-alt"></i> Quick Hits


{% include ads/in-article.html %}


**TeamPCP hits LiteLLM** — Malicious versions 1.82.7 and 1.82.8 published to PyPI on March 24. Credential stealer harvested API keys, SSH keys, and cloud tokens. Live for 2-6 hours. 3.6 million daily downloads exposed.

**TeamPCP hits Telnyx** — Malicious versions 4.87.1 and 4.87.2 on March 27. Used WAV steganography to hide payloads. Deployed privileged Kubernetes pods for persistence. Likely enabled by credentials stolen from LiteLLM compromise.

**Arm AGI CPU** — First in-house chip in 35 years. 136 cores, 3nm, 300W. Designed for AI inference. Meta is lead customer. OpenAI, Cerebras, Cloudflare as launch partners. Expects $15B annual revenue in five years.

**OpenAI Codex plugins** — Plugin system launched March 27. Skills, MCP integrations, and app connectors for Slack, Figma, Notion, Gmail. 20+ plugins at launch. Governance features for enterprise IT. Marketplace coming.

**JetBrains Central** — Agentic development platform announced March 24. Governance, execution infrastructure, and shared context for AI agents. Works with Claude, Codex, Gemini, and custom agents. Early access Q2 2026.

**Google TurboQuant** — Compression algorithm cuts LLM memory by 6x. Up to 8x speedup on H100s. Zero accuracy loss. Data-oblivious design. Presented at ICLR 2026.

**VS Code 1.113** — Weekly release on March 25. AI reasoning controls (low/medium/high). Nested subagents. MCP server sharing with CLI agents. New default themes.

**GitHub AI security detections** — Hybrid model pairing CodeQL with AI. Covers Shell, Dockerfiles, Terraform, PHP. 80% positive feedback in testing. Public preview early Q2 2026.

**Meta lays off ~700** — Cuts on March 25 across Reality Labs, recruiting, sales. Second round in 2026. Part of AI spending shift. Total 2026 expenses projected $162-$169 billion.

**Claude subscriptions double** — Paid subs more than doubled in 2026. $19B annualized revenue. Claude Code at $2.5B run-rate. Super Bowl ads pushed app to #7. Pentagon dispute pushed it to #1.

**Databricks Lakewatch** — Acquired Antimatter and SiftD.ai on March 24. Launched Lakewatch SIEM using Claude. Adobe and Dropbox as early customers.

**Isara raises $94M** — AI agent swarms startup at $650M valuation. OpenAI-backed. Founded by two 23-year-olds from OpenAI and Oxford. Coordinates thousands of agents for predictive tasks.

**Google Search Live global** — Expanded to 200+ countries on March 26. Voice and camera search. Powered by Gemini 3.1 Flash Live. Over 90 languages.

**CISA KEV updates** — Langflow RCE (CVE-2026-33017) exploited within 20 hours of advisory. Trivy supply chain (CVE-2026-33634, CVSS 9.3) added. Federal remediation deadlines April 8 and 9.

**EU Commission AWS breach** — AWS account compromised March 24. 350GB exfiltrated. Employee data and databases stolen. No ransom demand. Second attack on the Commission in 2026.

**Black Duck Signal** — Agentic security platform for AI-generated code. GA on March 23. Uses 20 years of curated security data. Integrates via MCP and APIs.

**Chroma Context-1** — 20B agentic search model released March 29. Multi-hop retrieval for RAG. 10x faster, 25x cheaper than frontier LLMs. Apache 2.0 on Hugging Face.

**Microsoft & Nvidia for nuclear** — AI partnership announced March 24 at CERAWeek to accelerate nuclear reactor design and permitting. Aalo Atomics reports 92% reduction in permitting time. Digital twins, generative AI for regulatory docs.

**Amazon acquires Fauna Robotics** — Sprout humanoid robot maker acquired March 24. 3.5-foot robot for home tasks. Disney and Boston Dynamics as early customers. Team joins Amazon Personal Robotics Group.

**Kandou AI raises $225M** — Swiss copper interconnect startup at $400M valuation. Chord signaling tech achieves 448 Gbps at half the power. SoftBank, Synopsys, Cadence as investors. 20M silicon units shipped.

**China embodied AI standard** — First industry-wide standard released March 26. Over 10,000 test tasks across 300 types. Covers brain-like computing, limbs, safety, ethics. Takes effect June 1.

**EU AGILE program** — €115M defense innovation fund announced March 25. Targets AI, quantum, and drone tech. Four-month time-to-grant. Focused on SMEs and startups. Technologies expected in the field within 1-3 years.

**Meta AI prescription glasses** — Bloomberg reports Meta preparing two new Ray-Ban AI glasses models for prescription wearers. Codenames "Scriber" and "Blazer." Already passed FCC approval. Over 7M Ray-Ban Meta glasses sold in 2025.

**Accel and Prosus India deeptech** — Inaugural Atoms X LeapTech cohort announced March 24. Six startups in space, climate, cancer detection, and brain-computer interfaces. $500K to $2M per company. Selected from 2,000+ applications.

**IBM on India quantum** — IBM CTO for India says the country is on track to be a top-four global quantum player. Needs deployment-ready workforce. 156-qubit Heron processor deploying at Amaravati Quantum Valley. 168,000 enrolled in free quantum course.

**Cloudflare Agents SDK v0.8.0** — Released March 23. Readable state, idempotent scheduling, TypeScript inference, Zod 4 migration.

---

*The TeamPCP campaign is the story of the week, and it's not over. What started with a Trivy compromise on March 19 has cascaded into LiteLLM, Telnyx, npm packages, and Checkmarx GitHub Actions. The attack chain is textbook: compromise one package, harvest credentials, use those credentials to compromise the next package. Mandiant says over 1,000 SaaS environments are affected. The FBI is warning about follow-on attacks. If your CI/CD pipeline touched any of the compromised packages, assume your secrets are gone and rotate everything now. On the hardware side, Arm making its own chips after 35 years is a genuine shift. When a company whose entire business model was licensing designs to others starts competing with its own customers, the market dynamics change. And the fact that Meta and OpenAI signed on as early customers tells you where the demand is. Microsoft and Nvidia betting on AI to build nuclear plants faster is the kind of infrastructure play that will matter in five years even if nobody's tweeting about it today. The developer tools space is getting interesting too. OpenAI adding plugins to Codex is a clear response to Claude Code's momentum. JetBrains Central is tackling the governance problem that nobody else has really solved yet. And Google's TurboQuant could make inference meaningfully cheaper for anyone running models at scale. China publishing its embodied AI standard before anyone else is a deliberate move to set the global benchmark for how robots and AI interact. The numbers that stuck with me this week: Anthropic at $19 billion annualized revenue, up from $1 billion fifteen months ago. Claude Code alone at a $2.5 billion run-rate. Those aren't incremental growth numbers. That's an explosion.*

*See you next week.*
