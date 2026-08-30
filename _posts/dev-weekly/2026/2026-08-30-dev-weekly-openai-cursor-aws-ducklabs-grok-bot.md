---
layout: post
seo: true
title: "Dev Weekly Aug 24-30, 2026: OpenAI Cuts Off Cursor, AWS Buys DuckLabs, Grok Bot on Pro"
subtitle: "OpenAI will pull GPT-family models from SpaceX-owned Cursor by November 12, Grok Bot lands on Cursor Pro, AWS agrees to buy DuckLabs, and Next.js ships two RCE patches."
date: 2026-08-30
categories: tech-news
permalink: /dev-weekly/2026/aug-24-30/openai-cursor-aws-ducklabs-grok-bot/
share-img: /assets/img/posts/dev_weekly/tech-news-24-30aug-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-24-30aug-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-24-30aug-2026.png
description: "Dev Weekly for August 24 to 30, 2026: OpenAI cuts models from Cursor, Grok Bot expands to Cursor Pro, AWS buys DuckLabs, and Next.js patches two unauthenticated RCEs. On August 28 OpenAI said it will wind down OpenAI models in Cursor by November 12 after SpaceX closed the Anysphere acquisition. On August 26 SpaceXAI included Grok Bot with SuperGrok, Cursor Pro, and all Cursor Teams plans, with Bot usage on a separate quota. On August 26 Amazon signed to acquire DuckLabs, the Amsterdam company behind DuckDB, while the DuckDB Foundation keeps the MIT-licensed project. On August 25 Vercel published Next.js 16.3.3 and 15.5.24 for an Image Optimization AVIF RCE and CVE-2026-75604 on Windows-hosted servers. On August 25 AWS Lambda opened public preview managed runtimes for Node.js 26 and Python 3.15. Also this week: GitHub Copilot's Customize tab went GA and Copilot CLI moved to a native Rust runtime, The Information reported Nvidia agreed to buy Hugging Face for $12.9 billion, Z.ai open-sourced GLM-5.3-Flash, Qwen shipped Qwen3.8-Flash-Next, IBM released Granite 4.2, Tencent open-sourced Hy4 preview, CISA added Citrix NetScaler and SQL Server bugs to KEV, PHP 8.4.25 landed, Instinct raised a $250 million Series B at $2.5 billion, a16z launched a $1.1 billion Machine Age Fund, and layoffs hit Apple, PagerDuty, and Kneat."
keywords: "dev weekly August 24 30 2026, software developer news August 24 to 30 2026, OpenAI Cursor SpaceX November 12 2026 change of control Astra, Grok Bot Cursor Pro SuperGrok Cursor Teams August 26 2026 SpaceXAI separate usage quota, AWS DuckLabs DuckDB DuckLake Quack MIT DuckDB Foundation August 26 2026, Next.js 16.3.3 15.5.24 GHSA-2xp9-vwfh-vxw4 CVE-2026-75604 AVIF Image Optimization unauthenticated RCE August 25 2026, AWS Lambda nodejs26.x python3.15 public preview August 25 2026, GitHub Copilot Customize tab GA Copilot CLI Rust runtime VS Code 1.135 August 24 2026, Nvidia Hugging Face $12.9 billion The Information August 26 2026, GLM-5.3-Flash zai-org 320B 18B MIT August 26 2026, Qwen3.8-Flash-Next Qwen4 architecture 125B 6B active August 26 2026, IBM Granite 4.2 Apache 2.0 3B 8B 30B August 25 2026, Tencent Hy4 preview 770B 49B August 28 2026, CISA KEV CVE-2026-8452 Citrix NetScaler CVE-2019-1068 SQL Server August 26 2026, PHP 8.4.25 August 27 2026, Instinct $250 million Series B $2.5 billion Index Benchmark, a16z Machine Age Fund $1.1 billion August 28 2026, Apple 147 Bay Area WARN Vision Pro Siri, PagerDuty 15 percent layoffs August 27 2026, Kneat 10 percent Thoma Bravo, cloud security vulnerability management enterprise AI supply chain security observability DevOps agentic coding software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from August 24 to 30, 2026?"
    answer: "OpenAI told SpaceX it will pull GPT-family models out of Cursor. On August 28 it posted a wind-down notice with a proposed shutoff of November 12, the latest date in the change-of-control window after SpaceX closed the Anysphere acquisition. Two days earlier, SpaceXAI included Grok Bot with Cursor Pro, SuperGrok, and all Cursor Teams plans. On August 26 AWS agreed to acquire DuckLabs, the company behind DuckDB, while the open-source project stays MIT-licensed under the DuckDB Foundation. Next.js also shipped 16.3.3 and 15.5.24 for two unauthenticated RCEs. Self-hosted apps should patch. Vercel-hosted apps are already covered."
  - question: "What happens to OpenAI models in Cursor after the SpaceX deal?"
    answer: "On August 28, 2026, OpenAI posted that it notified SpaceX it will wind down the contract that supplies OpenAI models to Cursor, proposing November 12, 2026 as the shutoff. OpenAI said it cannot be confident SpaceX will stay inside its terms of service, citing past contract issues with Musk companies including X and xAI. Future models, including Astra, will not go to Cursor. Reuters reported that Anthropic said it will increase compute for Claude in Cursor. Cursor co-founder Michael Truell said the company is talking with OpenAI. If you rely on GPT-family models inside Cursor, plan a fallback in Claude, Grok, or another IDE before November."
  - question: "Who gets Grok Bot after the August 26 expansion?"
    answer: "Grok Bot is now included with SuperGrok, SuperGrok Plus, SuperGrok Heavy, Cursor Pro, Cursor Pro+, Cursor Ultra, and Cursor Teams Standard and Premium. At the August 11 beta it was limited to SuperGrok Heavy, Cursor Ultra, and Cursor Teams Premium. Bot usage is a separate quota, so handing work to a Bot does not spend your existing Grok or Cursor allowance. SpaceXAI's product page lists Cursor Pro at $20 a month. Enterprise stays on a waitlist. Download Grok Bot, sign in with an eligible plan, and try one low-stakes job before you give a Bot production credentials."
  - question: "Is DuckDB still open source after AWS buys DuckLabs?"
    answer: "Yes, according to both AWS and the DuckDB project. On August 26, Amazon signed a definitive agreement to acquire DuckLabs, expected to close in early September. AWS is not buying the DuckDB open-source project. DuckDB, DuckLake, Quack, and the rest of the Duck Stack stay MIT-licensed under the nonprofit DuckDB Foundation. Hannes Mühleisen and Mark Raasveldt stay in Amsterdam and keep technical direction. The Foundation will add a stakeholder advisory board, and DuckLabs plans to open the extension stack so third-party signed extensions can run. Nothing you already ship against DuckDB has to change this week."
  - question: "How do I patch the Next.js August 2026 RCE bugs?"
    answer: "Self-hosted apps should upgrade. On Next.js 16.x run npm install next@16.3.3. On 15.x run npm install next@15.5.24. The AVIF issue (GHSA-2xp9-vwfh-vxw4) can hit any version from 10.0.0 up that still optimizes AVIF through sharp and libheif; patched builds serve AVIF as-is until libheif is fixed. CVE-2026-75604 is Windows-only. Linux and macOS are not affected, and there is no workaround on Windows. Apps hosted on Vercel are already protected: Vercel disabled AVIF optimization on its managed Image Optimization service, and its Next.js runtime is Linux."
---

This week belonged to Cursor. OpenAI told SpaceX it will pull GPT-family models out of the editor Elon Musk just bought, and two days earlier SpaceXAI put Grok Bot on Cursor Pro. AWS signed a deal for the company that builds DuckDB. Next.js shipped two unauthenticated RCEs that matter if you self-host, especially on Windows. Lambda, Copilot, and a pile of open-weight models were the rest of the toolkit news. Here is everything that mattered.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### OpenAI Will Pull Its Models From SpaceX-Owned Cursor - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/){:target="_blank"}

On August 28, [OpenAI said it notified SpaceX](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/){:target="_blank"} that it will wind down the contract that supplies OpenAI models to Cursor, with a proposed shutoff of November 12, 2026, the latest date in the change-of-control window. The reason, in OpenAI's words: it cannot be confident SpaceX will use the technology inside its terms of service, based on experience with Elon Musk's companies violating contracts. The post points at X breaking OpenAI's contract after Musk acquired Twitter, and at Musk admitting under oath that xAI, now also part of SpaceX, violated similar terms. Upcoming models, including Astra, will not go to Cursor.

[Reuters reported](https://www.reuters.com/business/media-telecom/openai-end-partnership-with-spacexs-cursor-2026-08-29/){:target="_blank"} that Anthropic said it will increase compute for Claude in Cursor, and that Cursor co-founder Michael Truell is talking with OpenAI. Musk's public reply was that he could not care less. If GPT models are in your Cursor model picker, you have until mid-November on the current contract. Pick a second default now (Claude, Grok, or another client) and do not wait for Astra to appear in the list.

### Grok Bot Is Now Included With Cursor Pro and SuperGrok - [<i class="fas fa-external-link-alt"></i>](https://x.ai/news/grok-bot-more-plans){:target="_blank"}

On August 26, [SpaceXAI expanded Grok Bot](https://x.ai/news/grok-bot-more-plans){:target="_blank"} to every SuperGrok, Cursor Pro, and Cursor Teams plan. At the August 11 beta, it sat on SuperGrok Heavy, Cursor Ultra, and Cursor Teams Premium. It is now on SuperGrok, SuperGrok Plus, SuperGrok Heavy, Cursor Pro, Cursor Pro+, Cursor Ultra, and both Cursor Teams Standard and Premium. Bot usage is a separate quota, so handing work to a Bot does not spend your existing Grok or Cursor allowance. Enterprise stays on a waitlist.

A Bot is a cloud VM with a browser and a terminal. It signs into the apps you already use, keeps going when you step away, and only pulls you in for a judgment call. SpaceXAI's list of jobs includes inbox cleanup, support refunds inside a policy, a meeting stand-in, and a website builder that buys a domain and deploys. [The product page](https://x.ai/bot){:target="_blank"} lists Cursor Pro at $20 a month, SuperGrok at $30, and Cursor Teams at $40 a seat, with weekly Bot usage included. If you are already on Cursor Pro, download Grok Bot, sign in with that plan, and give it one low-stakes job (a changelog draft, a bug repro, a folder of support mail) before you trust it with production credentials.

{% include ads/in-article.html %}

### AWS Agrees to Buy DuckLabs, the Company Behind DuckDB - [<i class="fas fa-external-link-alt"></i>](https://www.aboutamazon.com/news/company-news/aws-ducklabs){:target="_blank"}

On August 26, [Amazon signed a definitive agreement to acquire DuckLabs](https://www.aboutamazon.com/news/company-news/aws-ducklabs){:target="_blank"}, the Amsterdam company that employs the people who build DuckDB. Close is expected shortly, DuckLabs said early September. AWS is not buying the open-source project. [DuckDB's own post](https://duckdb.org/2026/08/26/ducklabs-to-join-aws.html){:target="_blank"} and [DuckLabs' longer note](https://ducklabs.com/news/2026/08/26/ducklabs-to-join-aws){:target="_blank"} say DuckDB, DuckLake, Quack, and the rest of the Duck Stack stay MIT-licensed under the nonprofit DuckDB Foundation. Hannes Mühleisen and Mark Raasveldt stay in Amsterdam and keep technical direction. DuckLabs said the project sees more than one million downloads a day.

What you do this week: keep using DuckDB. Watch the Foundation's new stakeholder advisory board and the plan to open the extension stack so extensions signed by other vendors can run. If DuckDB sits in a product you ship, the license and governance story is the thing to record for legal, not a rewrite of your queries.

### Next.js 16.3.3 and 15.5.24 Close Two Unauthenticated RCEs - [<i class="fas fa-external-link-alt"></i>](https://nextjs.org/blog/august-2026-security-release){:target="_blank"}

On August 25, [Next.js published 16.3.3 and 15.5.24](https://nextjs.org/blog/august-2026-security-release){:target="_blank"} a day earlier than planned after a second critical bug showed up in an upstream dependency. [GHSA-2xp9-vwfh-vxw4](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4){:target="_blank"} is unauthenticated remote code execution in Image Optimization when a crafted AVIF file hits `sharp`'s `libheif` path. Affected versions start at 10.0.0. The patched releases turn AVIF optimization off until an upstream fix ships. CVE-2026-75604 ([GHSA-p293-qw3h-jr36](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36){:target="_blank"}) is unauthenticated RCE on Windows-hosted servers that use both the Pages Router and App Router without Cache Components. Linux and macOS are not in scope. There is no workaround on Windows.

If you self-host, upgrade: `npm install next@16.3.3` on 16.x, or `npm install next@15.5.24` on 15.x. [Vercel said](https://vercel.com/changelog/nextjs-august-2026-security-release){:target="_blank"} apps on its platform are already covered. It disabled AVIF on managed Image Optimization, and its runtime is Linux. On August 26, [Cloudflare shipped an emergency WAF](https://developers.cloudflare.com/changelog/post/2026-08-26-emergency-waf-release/){:target="_blank"} that blocks the AVIF Image Optimizer path and tightens the existing CVE-2026-75604 rule. Treat the WAF as a seatbelt, not the patch.

### AWS Lambda Opens Preview Runtimes for Node.js 26 and Python 3.15 - [<i class="fas fa-external-link-alt"></i>](https://aws.amazon.com/about-aws/whats-new/2026/08/aws-lambda-node-js-python-public-preview/){:target="_blank"}

On August 25, [Lambda introduced managed runtimes in public preview](https://aws.amazon.com/about-aws/whats-new/2026/08/aws-lambda-node-js-python-public-preview/){:target="_blank"}, starting with Node.js 26 and Python 3.15. Until now, Lambda runtimes shipped as GA, which locked the team out of breaking changes. Preview is how they collect feedback from you, from observability vendors, and from IaC tools while breaking changes are still allowed. Preview is not covered by the Lambda SLA or AWS Support. Do not put production on it.

Create or update a function with runtime `nodejs26.x` or `python3.15` in the console, CLI, CloudFormation, SAM, or CDK. Billing is standard Lambda rates, in commercial, GovCloud, and China Regions. The identifier does not change at GA, so a preview function is meant to graduate without a template edit. [The Compute Blog](https://aws.amazon.com/blogs/compute/introducing-public-preview-runtimes-on-aws-lambda-starting-with-node-js-26-and-python-3-15/){:target="_blank"} says both languages are expected to reach upstream stable in October 2026, with Lambda GA targeted within two months after that. Node.js 26 will not go GA on Lambda until Active LTS.

{% include ads/display.html %}

### GitHub Copilot's Customize Tab Goes GA, CLI Moves to Rust - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-08-28-github-copilot-weekly-releases-august-24/){:target="_blank"}

On August 25, [the Copilot app's Customize tab became generally available](https://github.blog/changelog/2026-08-28-github-copilot-weekly-releases-august-24/){:target="_blank"}, putting MCP servers, plugins, skills, and canvases in one place, including Azure DevOps issues and pull requests as session sources. Copilot CLI now starts sessions with `defaultMode` and `defaultPermissionMode`, restores sessions that did not exit cleanly, and runs on a native Rust runtime while the terminal UI stays TypeScript. JetBrains got enterprise controls for plugins, MCP, telemetry, and agent permission modes. VS Code 1.135 can continue Copilot or Claude agent sessions started in other apps, ask a second model for a second opinion, and show per-model chat usage.

If you live in the Copilot app, open Customize and pin the MCP servers and skills your team actually uses. If you live in the CLI, upgrade so you pick up the Rust runtime and the new `/plugin`, `/mcp`, and `/skills` flows. Treat WSL support in the app as experimental.

### Nvidia Is Reported Near a $12.9 Billion Hugging Face Deal - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/08/26/nvidia-closes-in-on-hugging-face-acquisition/){:target="_blank"}

Late on August 26, [The Information reported Nvidia had agreed to buy Hugging Face for $12.9 billion](https://techcrunch.com/2026/08/26/nvidia-closes-in-on-hugging-face-acquisition/){:target="_blank"}. [TechCrunch](https://techcrunch.com/2026/08/26/nvidia-closes-in-on-hugging-face-acquisition/){:target="_blank"} said Business Insider, which first had Hugging Face in play over the weekend, reported the same night that talks had not produced a signed agreement and could still fall apart. Neither company had commented. The last public round, in 2023, valued Hugging Face at $4.5 billion. The Information put recent annualized revenue around $150 million.

This is still a reported deal, not a close. If it happens, the Hub, datasets, Spaces, and inference sit under the company that already sells most of the GPUs those weights run on. Keep downloading models. Watch licensing, default compute, and whether NVIDIA-first serving becomes the easy path. Do not rewrite your stack on a leak.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Z.ai Open-Sources GLM-5.3-Flash, a 320B MoE at Flash Price - [<i class="fas fa-external-link-alt"></i>](https://z.ai/blog/glm-5.3-flash){:target="_blank"}

On August 26, [Z.ai released GLM-5.3-Flash](https://z.ai/blog/glm-5.3-flash){:target="_blank"}, the first natively multimodal model in the GLM-5 line: 320 billion total parameters, 18 billion active, a 1,048,576-token context, and image and video in. Weights are MIT on [Hugging Face](https://huggingface.co/zai-org/GLM-5.3-Flash){:target="_blank"}. It spent the prior week on OpenRouter and OpenCode as the unnamed Ox Alpha. Z.ai says it beats GLM-5.2 at about one-tenth the price and approaches Claude Opus 4.8 on coding and agent benches. Local serving is documented on SGLang, vLLM, and TokenSpeed. The API id is `glm-5.3-flash`.

If you were already routing Ox Alpha, switch the id to `glm-5.3-flash` and pin the MIT weights if you self-host. Budget the published list rate, not the promo, for anything that has to last past early September.

### Qwen3.8-Flash-Next Previews the Qwen4 Architecture in Open Weights - [<i class="fas fa-external-link-alt"></i>](https://github.com/QwenLM/Qwen3.8-Flash-Next){:target="_blank"}

On August 26, [Alibaba's Qwen team released Qwen3.8-Flash-Next](https://github.com/QwenLM/Qwen3.8-Flash-Next){:target="_blank"} as an experimental preview of the architecture intended for Qwen4. The [GitHub notes](https://github.com/QwenLM/Qwen3.8-Flash-Next){:target="_blank"} describe a multimodal MoE with a 125 billion parameter main model, 6 billion active per token, plus a 51 billion n-gram embedding table meant to live in host memory. Native context is 262,144 tokens, extendable toward 1 million. Weights are on Hugging Face and ModelScope. This is a try-the-architecture release, not a drop-in replacement for Qwen3.8-Max. Pull the card, run it behind vLLM or SGLang if you have the disk, and do not treat the Qwen Community License as Apache.

### IBM Granite 4.2 Ships Native Reasoning Under Apache 2.0 - [<i class="fas fa-external-link-alt"></i>](https://research.ibm.com/blog/introducing-granite-4-2){:target="_blank"}

On August 25, [IBM released Granite 4.2](https://research.ibm.com/blog/introducing-granite-4-2){:target="_blank"} in 3B, 8B, and 30B dense sizes with a switchable thinking mode, Apache 2.0, and agentic RL on the 8B and 30B models for software engineering, terminal coding, and search. IBM's [Granite page](https://www.ibm.com/granite){:target="_blank"} lists SWE-Bench Verified pass@1 of 47.67 on 8B and 57.00 on 30B. The same drop includes Granite Speech 5.0 Turbo CTC models at 470 million parameters, with no LLM backbone, aimed at edge transcription. Download from Hugging Face, Ollama, or GitHub. If you want an Apache-licensed on-prem coding agent, start with 8B, then spend GPU on 30B only where SWE-Bench-class tasks actually show up.

### Tencent Open-Sources Hy4 Preview, 770B Total, 49B Active - [<i class="fas fa-external-link-alt"></i>](https://www.tencent.com/tencent-releases-and-open-sources-tencent-hy4-preview/){:target="_blank"}

On August 28, [Tencent released Hy4 preview](https://www.tencent.com/tencent-releases-and-open-sources-tencent-hy4-preview/){:target="_blank"}: 770 billion total parameters, 49 billion active, and a context window over 1 million tokens, aimed at coding, office work, and research. [TechNode dated the drop August 28](https://technode.com/2026/08/28/tencent-open-sources-hy4-preview-with-770b-parameters-and-a-1m-token-context/){:target="_blank"}. API access is through Tencent Cloud TokenHub and OpenRouter at $0.834 per million input tokens and $2.501 per million output, with $0.042 for cache hits. WorkBuddy and CodeBuddy have two weeks of free access. If you already route Hunyuan, this is the preview to A/B against Hy3 before you change production ids.

{% include ads/in-article.html %}

---

## <i class="fas fa-shield-alt"></i> Security

### CISA Adds Citrix NetScaler, SQL Server, and Four Older Linux Bugs to KEV - [<i class="fas fa-external-link-alt"></i>](https://www.cisa.gov/news-events/alerts/2026/08/26/cisa-adds-six-known-exploited-vulnerabilities-catalog){:target="_blank"}

On August 26, [CISA added six KEV entries](https://www.cisa.gov/news-events/alerts/2026/08/26/cisa-adds-six-known-exploited-vulnerabilities-catalog){:target="_blank"}: CVE-2026-8452 (Citrix NetScaler ADC and Gateway memory-buffer DoS, actively exploited), CVE-2019-1068 (Microsoft SQL Server RCE as the Database Engine service account), CVE-2021-23758 (Ajax.NET Professional deserialization RCE), CVE-2022-0995 (Linux kernel `watch_queue` out-of-bounds write), plus two 2015 Red Hat bugs in libuser and ABRT. Federal due dates for the Citrix and SQL Server items were August 29. Internet-facing NetScaler Gateway or AAA virtual servers, and any SQL Server still missing the 2019 fix, belong at the front of this week's vulnerability management queue.

### PHP 8.4.25 Ships Memory-Safety and pgsql Fixes - [<i class="fas fa-external-link-alt"></i>](https://www.php.net/ChangeLog-8.php#8.4.25){:target="_blank"}

On August 27, [PHP 8.4.25](https://www.php.net/ChangeLog-8.php#8.4.25){:target="_blank"} landed. php.net framed it as a bug-fix release. The changelog still includes stack overflows on deeply nested arrays and DOM trees, use-after-free in streams and XSL, an out-of-bounds write in `ext/sysvshm`, and related memory bugs in sockets and session. [PHP.Watch](https://php.watch/versions/8.4/releases/8.4.25){:target="_blank"} recorded additional security work in the same tag, including a pgsql SQL injection via an `E'...'` backslash breakout and a libgd patch for CVE-2026-9672. If you are on 8.4, bump to 8.4.25 (`docker pull php:8.4.25-fpm` or your distro package) and restart php-fpm. Do not wait for the next minor if you expose pgsql or image processing.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### Instinct Raises a $250M Series B at a $2.5B Valuation - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/08/26/viral-ai-startup-instinct-has-raised-350-million-at-a-2-5-billion-valuation/){:target="_blank"}

On August 26, [TechCrunch reported](https://techcrunch.com/2026/08/26/viral-ai-startup-instinct-has-raised-350-million-at-a-2-5-billion-valuation/){:target="_blank"} that Instinct, the AI assistant from Spear Street Technology and 23-year-old founder Noah Shinn, told the Wall Street Journal it had raised $250 million in a Series B co-led by Index Ventures and Benchmark, at a $2.5 billion valuation, $350 million total. The product is still in private beta: connect apps and devices, then text or call an agent that books, shops, and cancels subscriptions. Privacy and permission scope were already a public argument. This is a consumer-agent round, not a compiler round, but it is another data point that "chief of staff" agents are raising at unicorn speed.

### a16z Raises $1.1B for a Machine Age Hardware Fund - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/08/28/a16z-creates-a-1-1b-machine-age-fund-to-accelerate-the-physical-buildout-of-ai/){:target="_blank"}

On August 28, [Andreessen Horowitz said it had raised $1.1 billion](https://techcrunch.com/2026/08/28/a16z-creates-a-1-1b-machine-age-fund-to-accelerate-the-physical-buildout-of-ai/){:target="_blank"} for the Machine Age Fund, aimed at chips, memory, networking, storage, data centers, robotics, and home AI appliances. [The firm's post](https://www.a16z.news/p/the-machine-age-fund){:target="_blank"} frames it as a formal hardware motion after hardware startups grew to more than 20% of deal flow. If you build interconnects, memory, or edge boxes, this is a new checkbook. If you buy GPUs, it is more capital chasing the same scarce parts.

### Gamma Acquires Accel-Backed Design Startup Lica - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/08/25/gamma-acquires-accel-backed-design-startup-lica/){:target="_blank"}

On August 25, [TechCrunch reported](https://techcrunch.com/2026/08/25/gamma-acquires-accel-backed-design-startup-lica/){:target="_blank"} that presentation startup Gamma acquired Lica, which Accel had backed, to stand up a design research lab. Terms were not disclosed. Lica's founders will lead the lab. It is a small consolidation in the AI-slides category, after OpenAI bought NextSlide earlier this month.

### Layoffs: Apple, PagerDuty, and Kneat

*   **Apple:** On August 27, [the Los Angeles Times](https://www.latimes.com/business/story/2026-08-27/apple-lays-off-147-employees){:target="_blank"} reported California filings for 147 cuts, mostly at Cupertino with more in Sunnyvale, many in software engineering and machine learning on Vision Pro and Siri. Separations are scheduled around October 19. Bloomberg had the broader Siri and Vision Pro story last week. This week's news is the WARN count.
*   **PagerDuty:** On August 27, [PagerDuty reported Q2 FY2027 results](https://www.pagerduty.com/newsroom/pagerduty-announces-second-quarter-fiscal-2027-financial-results/){:target="_blank"} and a restructuring that cuts about 15% of headcount. An 8-K described the plan as announced August 26, with $5.5 million to $7.5 million of severance-class charges. The company said it protected quota-carrying sales and product teams and concentrated cuts in support work that automation now covers. Revenue was $124.4 million, up 0.8% year over year, with ARR at $501 million.
*   **Kneat:** On August 26, [Silicon Republic reported](https://www.siliconrepublic.com/business/limericks-kneat-lays-off-10pc-of-staff-after-thoma-bravo-acquisition){:target="_blank"} that Limerick-based Kneat cut fewer than 10% of more than 360 staff, about 36 people, two weeks after Thoma Bravo closed its acquisition.

{% include ads/in-article.html %}

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **November 12, 2026** OpenAI's proposed shutoff date for models in Cursor
- **$20** Cursor Pro monthly price that now includes Grok Bot, per SpaceXAI's product page
- **$12.9 Billion** Reported Nvidia price for Hugging Face, per The Information
- **1 Million** Daily DuckDB downloads, per DuckLabs
- **Two** Unauthenticated Next.js RCEs in one security release, one AVIF via libheif, one Windows-only
- **15%** PagerDuty headcount cut alongside a quarter of 0.8% revenue growth
- **$1.1 Billion** a16z Machine Age Fund for chips, memory, data centers, and robots
- **147** Apple Bay Area roles in this week's California WARN filings

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Copilot JetBrains harness** - August 24. Copilot harness generally available in Copilot for JetBrains.
*   **Gamma buys Lica** - August 25. Accel-backed design startup folds into Gamma's research lab.
*   **Next.js 16.3.3 / 15.5.24** - August 25. Two critical unauthenticated RCEs. `npm install next@16.3.3` or `next@15.5.24`.
*   **Copilot Customize tab GA** - August 25. MCP, plugins, skills, and canvases in one Copilot app tab.
*   **Lambda preview runtimes** - August 25. `nodejs26.x` and `python3.15`. Not for production, not on the SLA.
*   **IBM Granite 4.2** - August 25. Apache 2.0 reasoning models plus Speech 5.0 Turbo CTC.
*   **Grok Bot on Cursor Pro** - August 26. Included with SuperGrok, Cursor Pro, and all Cursor Teams plans. Separate Bot quota.
*   **AWS DuckLabs** - August 26. DuckLabs joins AWS. DuckDB stays MIT under the Foundation.
*   **Nvidia / Hugging Face** - August 26. Reported $12.9 billion agreement, unsigned per Business Insider.
*   **GLM-5.3-Flash** - August 26. MIT weights, 320B / 18B active, was Ox Alpha on OpenRouter.
*   **Qwen3.8-Flash-Next** - August 26. Open-weight preview of the Qwen4 architecture.
*   **CISA KEV six-pack** - August 26. Citrix NetScaler, SQL Server, Ajax.NET, and three Linux/Red Hat bugs.
*   **Cloudflare WAF emergency** - August 26. Blocks Next.js AVIF Image Optimizer RCE.
*   **Instinct Series B** - August 26. $250 million at $2.5 billion. Index and Benchmark.
*   **Kneat cuts** - August 26. About 36 roles after the Thoma Bravo take-private.
*   **PHP 8.4.25** - August 27. Memory-safety and pgsql-related fixes. Upgrade 8.4.
*   **Apple WARN** - August 27. 147 Bay Area software and ML roles, Vision Pro and Siri.
*   **PagerDuty 15%** - August 27. Restructuring next to a $124.4 million quarter.
*   **OpenAI / Cursor** - August 28. Wind-down notice, shutoff proposed for November 12.
*   **Tencent Hy4 preview** - August 28. 770B / 49B, 1M context, TokenHub and OpenRouter.
*   **a16z Machine Age Fund** - August 28. $1.1 billion for the physical AI stack.

---

The theme this week was who is allowed to run the models inside your editor, and who employs the people who ship your database. OpenAI's Cursor path now has a calendar date, Grok Bot is on the $20 Cursor Pro plan, and DuckDB's builders have a cloud parent. You can still patch Next.js if you self-host, try Node 26 and Python 3.15 on Lambda in a throwaway function, and download GLM-5.3-Flash or Granite 4.2 without a new vendor contract. If you do only a few things after reading this, decide what you will use in Cursor after November 12, try Grok Bot on a throwaway job if you already pay for Pro, write down that DuckDB's license did not change, and upgrade Next.js if you self-host. Next week, watch whether Nvidia and Hugging Face sign, whether OpenAI and Cursor actually settle, and whether Lambda's preview runtimes take a breaking change before October. See you then.
