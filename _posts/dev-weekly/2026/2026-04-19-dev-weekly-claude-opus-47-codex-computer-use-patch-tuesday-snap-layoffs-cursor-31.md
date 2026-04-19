---
layout: post
seo: true
title: "Dev Weekly Apr 13-19, 2026: Claude Opus 4.7, Codex Computer Use, Patch Tuesday Zero-Day, Snap Layoffs"
subtitle: "Claude Opus 4.7 retakes the coding lead, OpenAI Codex desktop gets Computer Use, Microsoft patches an actively exploited SharePoint zero-day, and Snap cuts 1,000 jobs citing AI."
date: 2026-04-19
categories: tech-news
permalink: /dev-weekly/2026/apr-13-19/claude-opus-47-codex-computer-use-patch-tuesday-snap-layoffs-cursor-31/
share-img: /assets/img/posts/dev_weekly/tech-news-13-19apr-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-13-19apr-2026.svg
description: "Dev Weekly roundup for April 13 to 19, 2026 covering the biggest software developer news, AI model releases, layoffs, security patches, and funding. Anthropic released Claude Opus 4.7 on April 16 with a 64.3 percent SWE-Bench Pro score, vision up to 2,576 pixels, and a Cyber Verification Program. OpenAI updated Codex desktop the same day with Computer Use across Mac and Windows apps, a built-in Chromium browser, gpt-image-1.5 image generation, and 111 new plugins. Microsoft April 2026 Patch Tuesday on April 14 fixed 167 vulnerabilities including actively exploited SharePoint zero-day CVE-2026-32201, a Defender privilege escalation CVE-2026-33825, and a 9.8 CVSS Windows IKE remote code execution flaw. Snap cut 16 percent of staff (1,000 employees) on April 15 and cited rapid AI advances. Cursor 3.1 shipped tiled multi-agent layouts on April 13. Cloudflare expanded Agent Cloud, made Sandboxes generally available, and rebuilt Wrangler CLI around AI agents. OpenAI launched GPT-5.4-Cyber for vetted security professionals. Google DeepMind released Gemini Robotics-ER 1.6 with multi-view spatial reasoning. Nvidia open-sourced Ising for quantum error correction with 2.5x speed and 3x accuracy gains. AWS announced Agent Registry, Interconnect multicloud GA, and Claude Mythos preview on Bedrock. Anthropic debuted Claude Design powered by Opus 4.7. OpenAI shipped a new Agents SDK with a sandbox harness. GitHub added Claude and Codex model selection on github.com. Slash raised $100M, Sygaldry $139M, Helical $10M. Researchers found Anthropic, Google, and Microsoft AI coding agents can leak GitHub credentials through prompt injection. OpenAI confirmed limited exposure from the Axios npm supply chain attack."
keywords: "dev weekly April 2026, software developer news April 13 19 2026, Claude Opus 4.7 release benchmarks coding vision Cyber Verification Program, OpenAI Codex desktop computer use browser image generation 111 plugins, Microsoft April 2026 Patch Tuesday 167 CVEs SharePoint zero-day CVE-2026-32201 Defender CVE-2026-33825, Snap layoffs 16 percent 1000 employees AI Evan Spiegel, Cursor 3.1 tiled layout multi-agent voice input, Cloudflare Agent Cloud Wrangler CLI rebuild Sandboxes Dynamic Workers Artifacts, OpenAI GPT-5.4-Cyber vetted security professionals binary reverse engineering Trusted Access Cyber, DeepMind Gemini Robotics ER 1.6 multi view spatial reasoning Boston Dynamics Spot, Nvidia Ising quantum error correction calibration AI 2.5x speed 3x accuracy, AWS Agent Registry Bedrock AgentCore Interconnect multicloud Claude Mythos preview, Anthropic Claude Design Opus 4.7 prototypes pitch decks, OpenAI Agents SDK sandbox harness MCP, GitHub Copilot model selection Claude Codex, Slash Financial 100 million Series C 1.4 billion valuation, Sygaldry 139 million quantum AI servers, Helical 10 million AI pharma virtual lab, AI coding agents GitHub credential theft prompt injection Anthropic Google Microsoft, Axios npm supply chain attack OpenAI exposure macOS code signing, CPython use after free CVE-2026-6100, software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is new in Claude Opus 4.7?"
    answer: "Anthropic released Claude Opus 4.7 on April 16, 2026. It scores 64.3 percent on SWE-Bench Pro, almost 10 points above Opus 4.6, and leads on agentic coding, scaled tool use, agentic computer use, and financial analysis benchmarks. It can process images up to 2,576 pixels on the longest edge, more than three times the previous limit. Pricing stays the same at 5 dollars per million input tokens and 25 dollars per million output tokens. Anthropic also opened a Cyber Verification Program so security researchers can use it for vulnerability research and pen testing."
  - question: "What did OpenAI add to the Codex desktop app on April 16, 2026?"
    answer: "OpenAI shipped a major Codex desktop update on April 16. The headline feature is Computer Use, which lets Codex see, click, and type across other apps on Mac and Windows. On macOS it runs in the background with a separate cursor so you can keep working while agents do their thing. The app also gets a Chromium based in-app browser built on the Atlas engine, image generation through gpt-image-1.5, 111 new plugins including CircleCI and GitLab, multiple terminal tabs, SSH remote devboxes, and scheduled tasks that resume across days."
  - question: "What was in Microsoft April 2026 Patch Tuesday?"
    answer: "Microsoft fixed 167 vulnerabilities on April 14, 2026, one of the biggest Patch Tuesdays in company history. Two were zero-days. CVE-2026-32201 is a SharePoint Server spoofing flaw that was already being exploited before the fix shipped, with CISA setting an April 28 deadline. CVE-2026-33825 is a publicly disclosed privilege escalation in Microsoft Defender that grants SYSTEM access. The highest CVSS score went to CVE-2026-33824, a 9.8 unauthenticated remote code execution bug in the Windows Internet Key Exchange service. Eight bugs were rated critical."
  - question: "Why did Snap lay off 1,000 employees?"
    answer: "Snap announced on April 15, 2026 that it was cutting 16 percent of its workforce, about 1,000 people, and closing more than 300 open roles. CEO Evan Spiegel cited rapid AI advances and said 65 percent of new code at the company is already AI-generated. The cuts are projected to save more than 500 million dollars annually by the second half of 2026 and follow pressure from activist investor Irenic Capital. U.S. employees will get four months severance, healthcare, equity vesting, and career transition support. Total layoff costs are estimated at 95 to 130 million dollars."
  - question: "What is Cursor 3.1 and what changed?"
    answer: "Cursor 3.1 shipped on April 13, 2026. The big addition is a tiled layout in the Agents Window so you can split the editor into panes, run multiple agents in parallel, drag agents between tiles, and persist layouts across restarts. Voice input got an upgrade with batch speech to text behind Ctrl+M. The empty state now lets you pick a branch before launching cloud agents to avoid running on the wrong one. You can jump straight from diffs to specific file lines. Large edits stream 87 percent faster and chat is now near instant."
  - question: "What is OpenAI GPT-5.4-Cyber?"
    answer: "OpenAI launched GPT-5.4-Cyber on April 14, 2026, a variant of GPT-5.4 tuned for defensive cybersecurity. It is described as cyber-permissive, meaning it has lower refusal rates on dual-use security tasks that the consumer model would block. New capabilities include binary reverse engineering on compiled software without source access and tighter integration with Codex Security for agentic patching. Access is gated through the Trusted Access for Cyber program, with individual verification at chatgpt.com/cyber and tiered enterprise access. The launch came one week after Anthropic announced Claude Mythos."
---

The big AI labs spent the week trying to outdo each other again. Anthropic shipped Claude Opus 4.7 and took back the top spot on most coding benchmarks. OpenAI gave its Codex desktop app the ability to control your computer and ride a built-in browser. Microsoft pushed one of its largest Patch Tuesdays ever, with an actively exploited SharePoint zero-day in the mix. Snap cut 1,000 jobs and pointed at AI as the reason. Cursor 3.1 added tiled panes for running parallel agents. Cloudflare rebuilt Wrangler from scratch because AI agents are now its biggest API customer. Nvidia open-sourced AI models for quantum error correction. AWS launched a registry for AI agents and put Claude Mythos preview on Bedrock. Researchers found that the major coding agents can be tricked into leaking GitHub tokens. Here is everything that happened.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Anthropic Releases Claude Opus 4.7 - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/news/claude-opus-4-7){:target="_blank"}

On April 16, Anthropic shipped Claude Opus 4.7 across the Claude apps, the API, Amazon Bedrock, Vertex AI, and Microsoft Foundry. It [narrowly took back the lead](https://venturebeat.com/technology/anthropic-releases-claude-opus-4-7-narrowly-retaking-lead-for-most-powerful-generally-available-llm){:target="_blank"} for the most powerful generally available LLM.

**The benchmark numbers:**

Opus 4.7 hit 64.3 percent on SWE-Bench Pro, nearly 10 points above Opus 4.6, and [topped the charts on agentic coding, scaled tool use, agentic computer use, and financial analysis](https://siliconangle.com/2026/04/16/anthropic-launches-claude-opus-4-7-coding-visual-reasoning-improvements/){:target="_blank"}. It also improved on Terminal-Bench 2.0 and posted an Elo of 1753 on the GDPVal-AA knowledge work eval.

**Vision and instruction following:**

The model can now look at images up to 2,576 pixels on the longest edge, more than 3x the previous limit. Anthropic says it follows instructions more literally than 4.6, which means prompts may need a tune before you migrate. It also handles file system memory better for long, multi-session work.

**The cybersecurity angle:**

Opus 4.7 ships with [automated safeguards](https://www.helpnetsecurity.com/2026/04/16/claude-opus-4-7-released/){:target="_blank"} that detect and block prohibited cybersecurity uses. To make sure legitimate researchers are not locked out, Anthropic opened a Cyber Verification Program for security pros doing vulnerability research, pen testing, and red teaming.

**Pricing and tokens:**

Pricing stays at 5 dollars per million input tokens and 25 dollars per million output tokens. The new tokenizer can [bump usage by 1.0x to 1.35x](https://cmotech.in/story/anthropic-launches-claude-opus-4-7-with-stronger-coding){:target="_blank"} depending on content type, so the effective bill may go up. A new "xhigh" effort level on the API offers a different cost-performance tradeoff. Claude Code also got an `ultrareview` slash command that scans for bugs.

**GitHub picks it up the same day:**

GitHub started [rolling Opus 4.7 into Copilot](https://world.infonasional.com/github-deploys-claude-opus-copilot){:target="_blank"} for Pro+ subscribers, gradually replacing 4.5 and 4.6 in the picker. A 7.5x premium request multiplier is in place through April 30.

### OpenAI Gives Codex Desktop Computer Use, a Browser, and Image Generation - [<i class="fas fa-external-link-alt"></i>](https://venturebeat.com/technology/openai-drastically-updates-codex-desktop-app-to-use-all-other-apps-on-your-computer-generate-images-preview-webpages){:target="_blank"}

Also on April 16, OpenAI dropped a big update to the Codex desktop app on Mac and Windows.

**Computer Use:**

The headline feature lets Codex [see, click, and type across other apps](https://9to5mac.com/2026/04/16/openais-codex-app-adds-three-key-features-for-expanding-beyond-agentic-coding/){:target="_blank"} on your machine. On macOS it runs with a separate cursor in the background, so you can keep working in the foreground while agents do their thing. Multiple agents can run in parallel.

**Built-in browser:**

Codex now ships with a Chromium browser built on OpenAI's Atlas engine. You can [annotate pages with natural language](https://www.zdnet.com/article/openai-codex-desktop-update/){:target="_blank"} and preview front-end work directly. Initial access is limited to localhost web apps, with the open web rolling out in waves.

**Image generation, plugins, and dev tools:**

Codex gets gpt-image-1.5 baked in for generating images without flipping over to ChatGPT. OpenAI also released 111 new plugins covering tools like CircleCI, GitLab, and Microsoft 365. New developer features include GitHub review comment support, multiple terminal tabs, SSH connections to remote devboxes, and scheduled tasks that can resume across days or weeks.

**Adoption number:**

Codex now has 3 million weekly developers. OpenAI says 80 percent of its own staff use it.

### Microsoft April Patch Tuesday Fixes 167 Flaws Including Active SharePoint Zero-Day - [<i class="fas fa-external-link-alt"></i>](https://www.bleepingcomputer.com/news/microsoft/microsoft-april-2026-patch-tuesday-fixes-167-flaws-2-zero-days/){:target="_blank"}

Microsoft pushed its April Patch Tuesday on April 14, fixing between 161 and 167 CVEs depending on how you count. The Register called it [one of the biggest Patch Tuesdays in company history](https://www.theregister.com/2026/04/14/microsofts_massive_patch_tuesday/){:target="_blank"}.

**The two zero-days:**

[CVE-2026-32201](https://securityaffairs.com/190831/security/microsoft-patch-tuesday-for-april-2026-fixed-actively-exploited-sharepoint-zero-day.html){:target="_blank"} is a SharePoint Server spoofing bug that was already being exploited in the wild before the patch landed. CVSS 6.5. CISA assigned a federal patching deadline of April 28. CVE-2026-33825 is a publicly disclosed privilege escalation in Microsoft Defender that gets you to SYSTEM.

**The headline severity number:**

CVE-2026-33824 in the Windows Internet Key Exchange service got a [CVSS score of 9.8](https://www.csoonline.com/article/4158706/april-patch-tuesday-roundup-zero-day-vulnerabilities-and-critical-bugs.html){:target="_blank"}. Unauthenticated remote code execution with low attack complexity. Eight bugs were rated critical.

**The shape of the release:**

93 elevation of privilege bugs, 20 RCEs, 21 information disclosures, 13 security feature bypasses, 10 denial of service, and 9 spoofing. Office (Word and Excel) had multiple critical bugs that fire from the preview pane.

If you run internet-facing SharePoint, patch first. Everything else can wait a beat, but not long.

### Snap Lays Off 1,000 Employees and Blames AI - [<i class="fas fa-external-link-alt"></i>](https://www.theverge.com/tech/912314/snap-layoffs-1000-staffers-ai-profitability){:target="_blank"}

On April 15, Snap announced it was [cutting 16 percent of its global workforce](https://apnews.com/article/snap-snapchat-social-media-layoffs-employment-9c02bea848378179f5e0c3cb894de67c){:target="_blank"}, around 1,000 people, plus closing 300+ open roles.

**The CEO's line:**

Evan Spiegel said in a memo that "rapid advancements in artificial intelligence enable our teams to reduce repetitive work, increase velocity, and better support our community, partners, and advertisers." The company says [65 percent of new code is now AI generated](https://timesofindia.indiatimes.com/technology/tech-news/snap-to-lay-off-1000-employees-ceo-evan-spiegels-memo-puts-it-on-ai-says-rapid-advancements-in-ai-enable-our-teams-to-/articleshow/130283505.cms){:target="_blank"}.

**The financial side:**

The cuts are projected to save more than 500 million dollars per year by H2 2026 and put Snap on a path to GAAP net income profitability. Layoff charges are expected at 95 to 130 million dollars, mostly severance. U.S. workers get four months pay, healthcare, continued equity vesting, and career transition support.

**The investor angle:**

The cuts came after pressure from [activist investor Irenic Capital Management](https://finance.yahoo.com/markets/stocks/articles/snap-lay-off-16-staff-101450564.html){:target="_blank"}, which holds about 2.5 percent of Snap and pushed for cost cuts and a portfolio rethink, including the Specs AR glasses unit. Snap had 5,261 full-timers at the end of 2025.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Cursor 3.1 Adds Tiled Multi-Agent Layouts - [<i class="fas fa-external-link-alt"></i>](https://cursor.com/changelog/3-1){:target="_blank"}

Cursor 3.1 shipped on April 13. The Agents Window now supports a tiled layout so you can split the editor into panes and run multiple agents in parallel. You can drag agents between tiles, expand panes to focus on a specific chat, and your layout persists across restarts.

Voice input got an upgrade. Press and hold Ctrl+M to record a clip, then batch speech-to-text gives more accurate transcription with a waveform display and timer. The empty state now has branch search and selection, so you do not accidentally launch a cloud agent on `main`. Diffs now jump straight to file lines for manual edits. Under the hood, [large edits stream 87 percent faster](https://www.creativeainews.com/blog/cursor-3-1-tiled-agents-voice-input/){:target="_blank"} and chat went from a one second hang to instant.

### Cloudflare Expands Agent Cloud and Rebuilds Wrangler - [<i class="fas fa-external-link-alt"></i>](https://www.cloudflare.com/en-gb/press/press-releases/2026/cloudflare-expands-its-agent-cloud-to-power-the-next-generation-of-agents/){:target="_blank"}

On April 13, Cloudflare announced a major expansion of its Agent Cloud platform along with a complete rewrite of the Wrangler CLI. The reason: AI agents are now Cloudflare's primary API customer, and the existing CLI was built for humans.

The new tooling includes [Dynamic Workers, an isolate-based runtime for executing AI-generated code](https://www.theregister.com/2026/04/13/cloudflare_expanding_wrangler_cli_functionality/){:target="_blank"}, and Artifacts, a Git-compatible storage primitive for agent-generated code. [Sandboxes are now generally available](https://blog.cloudflare.com/sandbox-ga/){:target="_blank"} with credential injection, PTY support, and persistent interpreters. The new Wrangler is in technical preview via `npx cf` and includes a Local Explorer for inspecting Workers and bindings during development.

### OpenAI Updates Agents SDK with Sandbox Harness - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/the-next-evolution-of-the-agents-sdk/){:target="_blank"}

On April 15, OpenAI shipped the next iteration of its Agents SDK. The big change is a model-native [harness with a native sandbox](https://www.helpnetsecurity.com/2026/04/16/openai-agents-sdk-harness-and-sandbox-update/){:target="_blank"} so agents can inspect files, run commands, and edit code in a controlled environment. It comes with configurable memory, sandbox-aware orchestration, filesystem tools matching Codex, MCP support, progressive skill disclosure, custom instructions via AGENTS.md, shell tool execution, and apply_patch for file edits. Python first, TypeScript later. Code mode and subagents are coming next.

### GitHub Adds Model Selection for Claude and Codex Agents - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-04-14-model-selection-for-claude-and-codex-agents-on-github-com){:target="_blank"}

On April 14, GitHub added a model picker for the Claude and Codex agents on github.com. You can now pick between Claude Sonnet 4.6, Opus 4.6, Sonnet 4.5, and Opus 4.5, plus GPT-5.2-Codex, GPT-5.3-Codex, and GPT-5.4 when kicking off a task. Access is included in existing Copilot subscriptions.

### AWS Launches Agent Registry, Interconnect Multicloud, and Mythos on Bedrock - [<i class="fas fa-external-link-alt"></i>](https://aws.amazon.com/blogs/aws/aws-weekly-roundup-claude-mythos-preview-in-amazon-bedrock-aws-agent-registry-and-more-april-13-2026/){:target="_blank"}

AWS had a busy week. On April 13, [Claude Mythos Preview landed on Amazon Bedrock](https://aws.amazon.com/blogs/aws/aws-weekly-roundup-claude-mythos-preview-in-amazon-bedrock-aws-agent-registry-and-more-april-13-2026/){:target="_blank"} as a gated research preview tied to Project Glasswing, with allowlisted access for internet-critical companies and OSS maintainers.

[AWS Agent Registry launched in preview](https://dataconomy.com/2026/04/14/aws-launches-agent-registry-to-centralize-ai-agent-governance/){:target="_blank"} through Amazon Bedrock AgentCore in five compute regions. It is a private catalog for discovering and managing AI agents, tools, skills, and custom resources, with semantic and keyword search, approval workflows, and CloudTrail audit trails.

[AWS Interconnect went GA on April 14](https://aws.amazon.com/blogs/aws/aws-interconnect-is-now-generally-available-with-a-new-option-to-simplify-last-mile-connectivity/){:target="_blank"} for private high-speed connections between AWS and other clouds. Google Cloud is the launch partner, with Azure and OCI later in 2026. MACsec encryption is built in. A Last Mile option simplifies connectivity from branches and DCs through existing network providers. AWS Transform also became available in Kiro and VS Code.

### Anthropic Debuts Claude Design - [<i class="fas fa-external-link-alt"></i>](https://startupnews.fyi/2026/04/18/anthropic-debuts-claude-design-for-creating-prototypes-pitch-decks-and-mockups/){:target="_blank"}

On April 18, Anthropic launched Claude Design, an experimental tool for creating prototypes, pitch decks, presentations, one-pagers, and mockups from text prompts. It is [powered by Claude Opus 4.7](https://www.unite.ai/anthropic-launches-claude-design-for-visual-prototyping-and-presentations/){:target="_blank"} and can pull in DOCX, PPTX, and XLSX files, point at a codebase to learn brand guidelines, or grab elements from any website with a web capture tool. You can refine designs through inline comments, direct text edits, or sliders for spacing, color, and layout. Export to PDF, PPTX, standalone HTML, Canva, or shareable internal URLs. Available in research preview for Pro, Max, Team, and Enterprise plans.

### DeepMind Launches Gemini Robotics-ER 1.6 - [<i class="fas fa-external-link-alt"></i>](https://deepmind.google/blog/gemini-robotics-er-1-6/){:target="_blank"}

On April 15, Google DeepMind released Gemini Robotics-ER 1.6, a foundation model for robots with stronger spatial reasoning. It can [process multiple camera streams at once](https://siliconangle.com/2026/04/15/deepmind-launches-gemini-robotics-er-1-6-meet-precise-physical-ai-demands/){:target="_blank"} (overhead and wrist-mounted), do precise object detection, work with relational logic, map trajectories, and detect task success. A new capability lets it read complex gauges, sight glasses, and digital readouts, which is a big deal for industrial sites like refineries and plants. The model acts as a high-level reasoning layer that connects to vision-language-action models, Google Search, and custom third-party tools. Boston Dynamics' Spot is using it for autonomous inspection. Available through the Gemini API and Google AI Studio.

### Nvidia Open-Sources Ising for Quantum AI - [<i class="fas fa-external-link-alt"></i>](https://nvidianews.nvidia.com/news/nvidia-launches-ising-the-worlds-first-open-ai-models-to-accelerate-the-path-to-useful-quantum-computers){:target="_blank"}

Nvidia announced Ising on April 14, billed as the first open AI models for quantum computing. The family ships with two models. Ising Decoding does real-time quantum error correction with [up to 2.5x more speed and 3x more accuracy](https://siliconangle.com/2026/04/14/nvidia-unveils-ising-ai-models-quantum-error-correction-calibration/){:target="_blank"} than pyMatching, the open-source baseline. Ising Calibration is a vision-language model that interprets readings from quantum processors and automates calibration, cutting the work from days to hours. Atom Computing, Academia Sinica, Fermilab, Harvard, IQM, Lawrence Berkeley, and the UK National Physical Laboratory are early adopters.

---

## <i class="fas fa-shield-alt"></i> Security

### OpenAI Launches GPT-5.4-Cyber for Vetted Security Pros - [<i class="fas fa-external-link-alt"></i>](https://siliconangle.com/2026/04/14/openai-launches-gpt-5-4-cyber-model-vetted-security-professionals/){:target="_blank"}

On April 14, OpenAI introduced GPT-5.4-Cyber, a variant of its flagship model tuned for defensive security work. It is described as "cyber-permissive," meaning it has lower refusal rates on dual-use security tasks that the consumer GPT-5.4 would block.

New capabilities include [binary reverse engineering on compiled software](https://9to5mac.com/2026/04/14/openai-unveils-gpt-5-4-cyber-an-ai-model-for-defensive-cybersecurity/){:target="_blank"} without source access and tighter integration with Codex Security for agentic patching. Codex Security has already contributed fixes for over 3,000 critical and high-severity vulnerabilities.

Access is gated through OpenAI's Trusted Access for Cyber program. Individuals can verify at chatgpt.com/cyber. Enterprises go through OpenAI reps. The launch came one week after Anthropic announced Claude Mythos, which makes the timing not subtle.

### AI Coding Agents Found Leaking GitHub Credentials - [<i class="fas fa-external-link-alt"></i>](https://winbuzzer.com/2026/04/16/ai-agents-anthropic-google-microsoft-steal-github-credentials-xcxwbn/){:target="_blank"}

Researchers disclosed on April 16 that AI coding agents from Anthropic, Google, and Microsoft can be hijacked through "comment and control" prompt injection attacks to steal GitHub credentials. Hostile instructions hidden in code comments or issue text get the agent to run commands that exfiltrate tokens from the dev environment. All three vendors paid bug bounties, but issued quiet patches without public advisories or CVEs. Worth keeping in mind if you let agents touch repos with sensitive credentials.

### OpenAI Confirms Limited Exposure From Axios Supply Chain Attack - [<i class="fas fa-external-link-alt"></i>](https://dataconomy.com/2026/04/13/openai-confirms-limited-exposure-tied-to-axios-npm-breach/){:target="_blank"}

The Axios npm breach from late March keeps generating fallout. On April 13, OpenAI confirmed the malicious axios v1.14.1 ran inside a GitHub Actions workflow that handled code-signing certificates for its macOS apps. OpenAI rotated all macOS code-signing certificates and is requiring users to update their apps by May 8. No evidence of user data compromise. A reminder to pin your dependency versions and audit what runs in CI.

### CPython Use-After-Free in Decompressors - [<i class="fas fa-external-link-alt"></i>](http://www.openwall.com/lists/oss-security/2026/04/13/10){:target="_blank"}

[CVE-2026-6100](http://www.openwall.com/lists/oss-security/2026/04/13/10){:target="_blank"} was disclosed on April 13. It is a use-after-free in `lzma.LZMADecompressor`, `bz2.BZ2Decompressor`, and `gzip.GzipFile` that triggers when memory allocation fails and decompressor instances get re-used under memory pressure. One-shot decompression functions are not affected. Patches are in the linked GitHub PR for CPython.

---

## <i class="fas fa-building"></i> Industry News

### Slash Raises $100M at $1.4B Valuation - [<i class="fas fa-external-link-alt"></i>](https://siliconangle.com/2026/04/16/slash-raises-100m-1-4b-valuation-expand-ai-powered-banking-platform-online-businesses/){:target="_blank"}

On April 16, Slash Financial closed a $100 million Series C at a $1.4 billion valuation. The round was led by Ribbit Capital, Khosla Ventures, and Goodwater Capital. Slash is building an AI-powered banking platform for SMBs and pitching itself as an autonomous finance function for online businesses.

### Sygaldry Raises $139M for Quantum AI Servers - [<i class="fas fa-external-link-alt"></i>](https://www.globenewswire.com/news-release/2026/04/14/3273436/0/en/Sygaldry-raises-139M-to-build-quantum-computers-for-AI.html){:target="_blank"}

On April 14, Sygaldry raised $139 million across a $105M Series A led by Breakthrough Energy Ventures and a $34M seed led by Initialized Capital. The company wants to build quantum-accelerated AI servers that speed up training and inference while cutting energy use.

### Helical Raises $10M for AI Pharma Lab - [<i class="fas fa-external-link-alt"></i>](https://www.globenewswire.com/news-release/2026/04/14/3273431/0/en/Helical-raises-10M-for-virtual-AI-lab-that-operates-at-pharma-scale-to-make-in-silico-discovery-reproducible.html){:target="_blank"}

On April 14, Helical raised $10 million in seed funding led by redalpine. The company turns biological foundation models into reproducible in-silico discovery workflows for pharma. Notable angels include Aidan Gomez (Cohere CEO) and Clement Delangue (HuggingFace CEO).

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **64.3%** — Claude Opus 4.7 SWE-Bench Pro score, almost 10 points above Opus 4.6
- **167** — Vulnerabilities Microsoft fixed in April Patch Tuesday, one of its biggest ever
- **1,000** — Snap employees laid off, 16 percent of the global workforce
- **65%** — Snap's new code that is already AI-generated
- **3 million** — Weekly developers using OpenAI Codex
- **2.5x** — Speed gain Nvidia Ising delivers over pyMatching for quantum error correction
- **$139M** — Sygaldry's funding round for quantum AI servers, the week's largest

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**Claude Opus 4.7** — Released April 16. SWE-Bench Pro 64.3 percent. Leads on agentic coding, scaled tool use, agentic computer use, financial analysis. Vision up to 2,576 px. Pricing unchanged at $5/$25 per million tokens. New tokenizer can use 1.0x-1.35x more tokens. Cyber Verification Program for security pros. Already in Copilot via 7.5x premium multiplier through April 30.

**OpenAI Codex Desktop major update** — April 16. Computer Use across other apps on Mac and Windows. Built-in Atlas-based browser. gpt-image-1.5 image generation. 111 new plugins. Multiple terminal tabs. SSH remote devboxes. Scheduled tasks. 3M weekly devs.

**Microsoft Patch Tuesday** — April 14. 167 CVEs. SharePoint zero-day CVE-2026-32201 actively exploited. Defender priv-esc CVE-2026-33825 publicly disclosed. Windows IKE RCE CVE-2026-33824 at CVSS 9.8. Eight critical bugs total.

**Snap layoffs** — April 15. 16 percent cut, 1,000 employees, 300+ open roles closed. Spiegel cited AI. 65 percent of new code is AI-generated. Saves $500M+/year. Severance of 4 months pay plus benefits in U.S.

**Cursor 3.1** — April 13. Tiled layout for parallel agents. Upgraded voice input behind Ctrl+M. Branch search before launching cloud agents. Diff to file navigation. Large edits stream 87 percent faster.

**Cloudflare Agent Cloud** — April 13. Wrangler CLI rebuilt around AI agents (preview via `npx cf`). Dynamic Workers isolate runtime. Artifacts Git-compatible storage. Sandboxes GA. Local Explorer for inspecting Workers.

**OpenAI Agents SDK** — April 15. Native sandbox harness. Agents can inspect files, run commands, edit code. Configurable memory. Filesystem tools like Codex. MCP support. Python first.

**GitHub model selection** — April 14. Pick between Claude (Sonnet/Opus 4.5/4.6) and Codex (GPT-5.2/5.3/5.4) for github.com agent tasks. Included in existing Copilot plans.

**AWS Agent Registry + Interconnect + Mythos** — April 13-14. Claude Mythos preview on Bedrock through Glasswing. Agent Registry preview in 5 regions for managing AI agents. Interconnect multicloud GA with Google Cloud as launch partner, MACsec encryption built in.

**Anthropic Claude Design** — April 18. Text-to-prototype/deck/mockup tool powered by Opus 4.7. Imports DOCX/PPTX/XLSX. Reads codebase for brand guidelines. Web capture for grabbing elements. Exports to PDF, PPTX, HTML, Canva. Research preview for Pro/Max/Team/Enterprise.

**Gemini Robotics-ER 1.6** — April 15. Multi-camera spatial reasoning. Reads gauges and instruments. Connects to VLA models, Search, custom tools. Boston Dynamics Spot is using it. Available via Gemini API and AI Studio.

**Nvidia Ising** — April 14. Open AI models for quantum computing. 2.5x speed and 3x accuracy on error correction decoding. Calibration cuts from days to hours. Used by Atom Computing, Harvard, Fermilab, IQM, Lawrence Berkeley, UK NPL.

**OpenAI GPT-5.4-Cyber** — April 14. Cyber-permissive variant. Binary reverse engineering. Codex Security agentic patching. Trusted Access for Cyber gating. Verify at chatgpt.com/cyber.

**Coding agents leak GitHub creds** — April 16. Anthropic, Google, and Microsoft agents vulnerable to "comment and control" prompt injection that exfiltrates tokens. Patched quietly without CVEs.

**Axios npm fallout** — April 13. OpenAI confirms malicious axios ran in macOS code-signing GitHub Actions workflow. All certs rotated. Users must update by May 8.

**CPython CVE-2026-6100** — April 13. Use-after-free in `lzma`, `bz2`, `gzip` decompressors when re-used under memory pressure.

**Slash $100M Series C** — April 16. $1.4B valuation. Ribbit, Khosla, Goodwater. AI banking for online SMBs.

**Sygaldry $139M** — April 14. $105M Series A + $34M seed. Quantum-accelerated AI servers.

**Helical $10M** — April 14. AI pharma lab. Aidan Gomez and Clement Delangue among angels.

---

*Two threads worth pulling on. The first is that Anthropic and OpenAI are now trading the lead on the same day. Opus 4.7 takes back coding and agentic benchmarks on April 16. Codex desktop ships Computer Use the same day. There is no longer a stable "best model" you can plan around for a quarter. If you are picking a default for your codebase, the answer changes weekly, and the tooling around model selection (GitHub's picker, Cursor's tiled panes, Copilot CLI's Rubber Duck from last week) is starting to matter more than which model is on top this Tuesday. The second is that the AI-blamed layoff template has hardened. Spiegel's memo at Snap reads almost identically to Block's in February and Bolt's last week. Cite rapid AI advances, point at percent of new code that is AI generated, project savings, talk about velocity. The American Banker survey from last week showed only 3 percent of financial services firms have actually reduced headcount because of AI. So either the rest of the industry is about to follow, or the AI line is the convenient story for a cut leadership wanted to make anyway. Probably some of both. Microsoft's 167-CVE Patch Tuesday is a different kind of signal. Two zero-days, one of which was being actively exploited before the patch, plus a 9.8 in IKE that nobody is going to talk about because SharePoint is the headline. If you run anything internet-facing on Windows this week, it is patch first, breakfast second. And the GitHub credential theft via prompt injection is the kind of bug that keeps growing. Three vendors patched quietly without CVEs. There will be more of these.*

*See you next week.*
