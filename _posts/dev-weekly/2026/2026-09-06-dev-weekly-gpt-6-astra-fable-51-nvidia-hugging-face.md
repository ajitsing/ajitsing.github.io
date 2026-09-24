---
layout: post
seo: true
title: "Dev Weekly Aug 31-Sep 6, 2026: GPT-6 Astra Ships, Claude Fable 5.1, Nvidia Buys Hugging Face"
subtitle: "OpenAI shipped GPT-6 Astra, Anthropic shipped Claude Fable 5.1 with cheaper cache reads, Nvidia agreed to buy Hugging Face for $12.93 billion, and VS Code 1.136 can send an agent after a pull request."
date: 2026-09-06
categories: tech-news
permalink: /dev-weekly/2026/aug-31-sep-6/gpt-6-astra-fable-51-nvidia-hugging-face/
share-img: /assets/img/posts/dev_weekly/tech-news-31aug-6sep-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-31aug-6sep-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-31aug-6sep-2026.png
description: "Dev Weekly for August 31 to September 6, 2026: OpenAI ships GPT-6 Astra, Anthropic launches Claude Fable 5.1, Nvidia buys Hugging Face for $12.93 billion, and VS Code 1.136 previews Agent Merge. On September 3 OpenAI released GPT-6 Astra, its first model at the Critical cybersecurity tier, on ChatGPT, the API as gpt-6-astra, Azure, and Bedrock at $10 per million input tokens and $50 per million output. On September 1 Anthropic shipped Claude Fable 5.1 and Mythos 5.1, cutting cache reads 75% to $0.25 per million tokens, and GitHub Copilot added Fable 5.1 the same day. On September 3 Nvidia signed to acquire Hugging Face for $12.93 billion, with close targeted for the first half of 2027. On September 2 Google launched Gemini 3.8 Flash at $0.75/$3.75 introductory pricing and VS Code 1.136 added Agent Merge. Also this week: Python 3.15.0rc2, Copilot can approve pull requests, CISA added PaperCut and seven more KEVs including Starlette and LiteLLM, Anthropic signed a reported $35 billion Lambda cloud deal, AIR raised $50 million, Lyte raised $165 million, and layoffs hit Uber and The Trade Desk."
keywords: "dev weekly August 31 September 6 2026, software developer news August 31 to September 6 2026, GPT-6 Astra OpenAI gpt-6-astra Critical cybersecurity Preparedness Framework September 3 2026, Claude Fable 5.1 Mythos 5.1 claude-fable-5-1 cache reads $0.25 September 1 2026, Nvidia Hugging Face $12.93 billion acquisition 8-K September 3 2026, VS Code 1.136 Agent Merge chat.agentMerge.enabled September 2 2026, Gemini 3.8 Flash gemini-3.8-flash $0.75 $3.75 Fairwind Cyber September 2 2026, GitHub Copilot Fable 5.1 GPT-6 Astra pull request approval, Python 3.15.0rc2 October 1 2026 PEP 810 lazy imports, CISA KEV PaperCut CVE-2026-81578 Starlette CVE-2026-48710 LiteLLM CVE-2026-59822, Anthropic Lambda $35 billion Hut 8 Texas Nvidia lease, AIR $50 million Sequoia Greenoaks, Lyte $165 million Series C $1.6 billion, Uber 3300 10 percent layoffs, The Trade Desk 15 percent workforce cut, Rust 1.98.1 vtable miscompilation, cloud security vulnerability management enterprise AI supply chain security observability DevOps agentic coding software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from August 31 to September 6, 2026?"
    answer: "OpenAI released GPT-6 Astra on September 3. It is the first model OpenAI has put in its highest cybersecurity risk class. It is rolling out on ChatGPT Plus and above, and on the API as gpt-6-astra, plus Azure and AWS Bedrock. Two days earlier Anthropic shipped Claude Fable 5.1. Cache reads on that model dropped 75% to $0.25 per million tokens. Nvidia signed a $12.93 billion deal to buy Hugging Face, with close expected in the first half of 2027 if regulators approve. VS Code 1.136 also previewed Agent Merge, which can work a pull request until it is ready to merge."
  - question: "How do I start using GPT-6 Astra as a developer?"
    answer: "The API id is gpt-6-astra. Price is $10 per million input tokens and $50 per million output. Fast mode costs twice as much and is up to twice as fast. It is coming to ChatGPT Plus, Pro, Business, and Enterprise. On Enterprise it is off until an admin turns it on. GitHub Copilot added it on September 4 for Pro+, Max, Business, and Enterprise. OpenAI already said Astra will not go to Cursor. If you use Cursor, stay on Claude, Grok, or another editor for new OpenAI models."
  - question: "Should I switch from Claude Fable 5 or Opus 5 to Fable 5.1?"
    answer: "The API id is claude-fable-5-1. Input and output prices are still $10 and $50 per million tokens, same as Fable 5. Cache reads fell from $1 to $0.25 per million. Anthropic says that makes typical jobs about 25% cheaper, and long agent jobs up to about 45% cheaper. Opus 5 is still cheaper if you are not reusing a big cache. On Copilot, an admin has to turn Fable 5.1 on. Anthropic keeps prompts by default on this model unless your company qualifies for zero data retention."
  - question: "Does Nvidia buying Hugging Face change how I download models?"
    answer: "Not this week. Nvidia says Hugging Face stays an open platform. You can still pick models, frameworks, clouds, and chips, and you do not have to use NVIDIA hardware. The deal is about $11.9 billion to shareholders plus up to $1 billion in stock for employees who stay. Close is aimed at the first half of 2027, after regulators review it. Keep using the Hub as you do now."
  - question: "How do I try Agent Merge in VS Code 1.136?"
    answer: "Update VS Code (Help, then Check for Updates). Turn on chat.agentMerge.enabled. In the Agents window, run Enable Agent Merge for Active Session, or click the Agent Merge button. The agent tries to fix review comments, failed checks, and merge conflicts, then reruns CI until the pull request is ready. Review the result yourself before you merge. Copilot can also approve PRs now, but that setting is off by default."
---

OpenAI, Anthropic, and Google all shipped new models this week, and they showed up in Copilot within a day or two. Nvidia signed the Hugging Face deal that leaked last week. VS Code can now send an agent after a stuck pull request.

Python also locked 3.15 for an October 1 release. CISA added bugs in PaperCut, Starlette, and LiteLLM. Here is the week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### OpenAI Ships GPT-6 Astra - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/gpt-6-astra/){:target="_blank"}

On September 3, [OpenAI released GPT-6 Astra](https://openai.com/index/gpt-6-astra/){:target="_blank"}. It is the company's strongest model so far, and the first one OpenAI has put in its highest cybersecurity risk class. OpenAI says Astra scores 98% on FrontierMath Tier 4, 99.9% on ARC-AGI-3, and 100% on ExploitBench when safety filters are off. On Terminal-Bench 4.0 it reports 57.9%, against 55.8% for Claude Fable 5.1 and 37.3% for GPT-5.6 Sol. Two days earlier, [a safety post](https://openai.com/index/path-to-astra/){:target="_blank"} said Astra can find unknown bugs and write exploits without a person walking it through each step. In testing it found two zero-days on its own. OpenAI says it is telling those vendors.

You can use it in ChatGPT Plus and above as the rollout reaches you. The API id is `gpt-6-astra` on OpenAI, Azure, and Bedrock. Price is $10 per million input tokens and $50 per million output. Fast mode is twice the price and up to twice as fast. On Enterprise, an admin has to turn it on. [GitHub Copilot added Astra](https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot/){:target="_blank"} on September 4 for Pro+, Max, Business, and Enterprise. OpenAI already said Astra will not go to Cursor. If you still pick GPT models in Cursor, that access ends November 12, and Astra is not next. Codex can now keep notes across long chats. That is off by default in `config.toml` for now.

OpenAI also said Astra's written reasoning is harder to follow than GPT-5.6 Sol's. If you review chain-of-thought logs, expect less of that text.

### Claude Fable 5.1 Makes Cached Agent Runs Cheaper - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/claude-fable-and-mythos-5-1){:target="_blank"}

On September 1, [Anthropic released Claude Fable 5.1 and Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1){:target="_blank"}. They are the same model with different safety rules. Fable 5.1 is for everyone. Mythos 5.1 is only for approved cyber and life-science users. Anthropic reports 55.8% on Terminal-Bench 4.0 for Fable 5.1 and 60.9% for Mythos 5.1. On a science terminal bench, Fable 5.1 hit 52.6%, up from 24.7% on Fable 5. Cache reads fell 75% to $0.25 per million tokens. [Pricing](https://platform.claude.com/docs/en/models/fable-5-1/overview){:target="_blank"} for new input and output is still $10 and $50 per million, same as Fable 5. Anthropic says most jobs get about 25% cheaper, and long agent jobs can get about 45% cheaper.

The API id is `claude-fable-5-1`. It is on the Claude API, Bedrock, Google Cloud, and Microsoft Foundry. Claude Code defaults to High effort. [GitHub Copilot added it](https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot/){:target="_blank"} the same day for Pro+, Max, Business, and Enterprise. Business and Enterprise admins have to turn the policy on. Anthropic keeps prompts on this model by default so its safety checks can run. Some companies can keep zero data retention until [a new setup](https://www.anthropic.com/news/enterprise-frontier-safeguards){:target="_blank"} ships this fall. If your agents already cache a big codebase, this is the first Fable release where that pattern is cheap enough to compare with Opus 5.

### Nvidia Agrees to Buy Hugging Face for $12.93 Billion - [<i class="fas fa-external-link-alt"></i>](https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/){:target="_blank"}

On September 3, [Jensen Huang said Nvidia will buy Hugging Face for $12.93 billion](https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/){:target="_blank"}. Last week's leak is now a signed deal. [Nvidia's filing](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000078/nvda-20260902.htm){:target="_blank"} is dated September 2: about $11.9 billion to Hugging Face shareholders, plus up to $1 billion in stock for staff who join Nvidia. Close is aimed at the first half of 2027, after regulators look at it. Huang said the Hub stays open. You can still pick any model, framework, cloud, and chip. You do not have to use NVIDIA hardware. Nvidia says the Hub has more than 18 million users, 3 million models, 500,000 datasets, and 1 million apps.

Nothing you download this week has to change. The deal is not closed yet.

### VS Code 1.136 Can Send an Agent After a Pull Request - [<i class="fas fa-external-link-alt"></i>](https://code.visualstudio.com/updates/v1_136){:target="_blank"}

On September 2, [VS Code 1.136 shipped](https://code.visualstudio.com/updates/v1_136){:target="_blank"} with Agent Merge in preview. Turn on `chat.agentMerge.enabled`, then in the Agents window run Enable Agent Merge for Active Session, or click the Agent Merge button. The agent tries to fix review comments, failed checks, and merge conflicts, then reruns CI until the PR looks ready. Copilot and Claude chats can now span more than one folder in a workspace (still experimental). Agent sessions also run in a separate process, so closing a window does not kill the chat.

Update from Help, then Check for Updates. Try it on a test PR first.

### Google Ships Gemini 3.8 Flash at the Same Price as 3.7 - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/){:target="_blank"}

On September 2, [Google launched Gemini 3.8 Flash and Gemini 3.8 Flash Cyber](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/){:target="_blank"}. 3.8 Flash is the public model. Intro price matches 3.7 Flash: $0.75 per million input tokens and $3.75 per million output through December 31, 2026. On January 1, 2027 that becomes $1.50 and $7.50. Google says it is better at long coding jobs while staying at Flash speed. 3.8 Flash Cyber is only for approved security teams, through a program Google calls Fairwind.

The API id is `gemini-3.8-flash`. It is in the Gemini API, AI Studio, Android Studio, Gemini Enterprise, and Antigravity. [GitHub Copilot added it](https://github.blog/changelog/2026-09-03-gemini-3-8-flash-is-now-available-in-github-copilot/){:target="_blank"} on September 3 for Pro and above. If you already use 3.7 Flash, change the id in a test agent before you change production. For anything that will still be running next year, budget the January price.

### Python 3.15 Hits Its Last Release Candidate - [<i class="fas fa-external-link-alt"></i>](https://blog.python.org/2026/09/python-3150-rc2/){:target="_blank"}

On September 1, [Python 3.15.0rc2](https://blog.python.org/2026/09/python-3150-rc2/){:target="_blank"} shipped. It is the last planned candidate. About 144 fixes landed since rc1. Wheels built on rc2 should work on the final 3.15.0 release. Final is set for October 1. New in 3.15: lazy imports (PEP 810), `frozendict` and `sentinel` builtins, UTF-8 as the default encoding, unpacking in comprehensions, and a JIT that Python says is 8-9% faster on x86-64 Linux.

If you ship a C extension or wheels, build on rc2 now. Get it from [python.org](https://www.python.org/downloads/release/python-3150rc2/){:target="_blank"}. Keep production on a stable release. Put rc2 in CI so October 1 is a version bump.

### Copilot Can Approve Pull Requests - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/){:target="_blank"}

On September 1, [Copilot code review started saying whether a PR looks ready to approve](https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/){:target="_blank"}. Admins can also let Copilot click Approve, and that count can meet a required-review rule. It is off by default. It is in public preview for Pro and above. You can set it at the company, org, or repo, including which file paths Copilot may approve. A new commit drops the approval, same as a human review.

Leave this off unless you really want an AI approval to count. The comment is still useful as a second opinion.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Google Makes Video Analysis Cheaper in Gemini Flash - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/){:target="_blank"}

On September 1, [Google turned on a new video mode](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/){:target="_blank"} on Gemini 3.7 Flash, 3.6 Flash, and 3.5 Flash-Lite. The model can search frames, audio, and captions instead of reading the whole clip at a fixed frame rate. Google says that can cut tokens by up to 88%, cut cost by up to 66%, and raise accuracy by up to 7% versus 1 frame per second. It works on uploads and YouTube links in the Gemini API. Price is the usual token rate. There is no extra fee.

Set `"processing": "agentic"` on the video part of the request. Use it for long talks and "when did X happen" questions.

### Rust 1.98.1 Fixes a Compiler Bug - [<i class="fas fa-external-link-alt"></i>](https://blog.rust-lang.org/2026/09/03/Rust-1.98.1/){:target="_blank"}

On September 3, [Rust 1.98.1](https://blog.rust-lang.org/2026/09/03/Rust-1.98.1/){:target="_blank"} fixed a bug in 1.98.0 that could put a null pointer in a trait object. That can crash, or worse. Run `rustup update stable` and rebuild anything you shipped on 1.98.0 that uses trait objects.

### Kubernetes Can Run the Kubelet as a Normal User - [<i class="fas fa-external-link-alt"></i>](https://kubernetes.io/blog/2026/09/04/kubernetes-v1-37-rootless-beta/){:target="_blank"}

On September 4, [Kubernetes posted](https://kubernetes.io/blog/2026/09/04/kubernetes-v1-37-rootless-beta/){:target="_blank"} that rootless kubelet is beta in 1.37 (that release shipped August 26). The feature flag is on by default, but existing clusters that run as root do not change. To try it, run kind or minikube on rootless Docker or Podman. This is for a laptop cluster, not a production rewrite.

---

## <i class="fas fa-shield-alt"></i> Security

### CISA Says PaperCut Bugs Are Being Exploited - [<i class="fas fa-external-link-alt"></i>](https://www.cisa.gov/news-events/alerts/2026/08/31/cisa-adds-two-known-exploited-vulnerabilities-catalog){:target="_blank"}

On August 31, [CISA added two PaperCut NG/MF bugs](https://www.cisa.gov/news-events/alerts/2026/08/31/cisa-adds-two-known-exploited-vulnerabilities-catalog){:target="_blank"} to its known-exploited list: CVE-2026-81578 and CVE-2026-82078. US federal agencies have until September 14 to patch. Huntress saw the attack in the wild. [PaperCut](https://www.papercut.com/kb/Main/security-bulletin-27-aug-2026-urgent-security-advisory/){:target="_blank"} says the fix is 24.1.10, 25.0.13, or 26.0.5. If a print server is on the internet, patch it and check the logs. Take the admin page off the public web.

### CISA Also Flags Starlette, LiteLLM, Kestra, and Artifactory - [<i class="fas fa-external-link-alt"></i>](https://www.cisa.gov/news-events/alerts/2026/09/02/cisa-adds-seven-known-exploited-vulnerabilities-catalog){:target="_blank"}

On September 2, [CISA added seven more bugs](https://www.cisa.gov/news-events/alerts/2026/09/02/cisa-adds-seven-known-exploited-vulnerabilities-catalog){:target="_blank"}. For app teams, the important ones are Starlette CVE-2026-48710 (fixed in 1.0.1), LiteLLM CVE-2026-59822 (use 1.84.0 or later), Kestra CVE-2026-49869, and JFrog Artifactory CVE-2026-82329. The rest are Sangoma Switchvox and two SonicWall SMA1000 bugs.

If you run FastAPI or anything on Starlette, pin `starlette>=1.0.1` and rebuild. If you run a LiteLLM proxy, pin `litellm>=1.84.0`. Patch Artifactory and Kestra if they face the internet.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### Anthropic Signs a Reported $35B Cloud Deal With Lambda - [<i class="fas fa-external-link-alt"></i>](https://www.wsj.com/tech/ai/anthropic-signs-35-billion-cloud-deal-backed-by-nvidia-f12622f1){:target="_blank"}

On August 31, [the Wall Street Journal reported](https://www.wsj.com/tech/ai/anthropic-signs-35-billion-cloud-deal-backed-by-nvidia-f12622f1){:target="_blank"} that Anthropic signed a $35 billion cloud deal with Lambda. Nvidia holds the lease on a Hut 8 data center in Nueces County, Texas. [Bloomberg](https://news.bloomberglaw.com/tech-and-telecom-law/anthropic-seals-35-billion-cloud-deal-with-nvidia-backed-lambda){:target="_blank"} and [Reuters](https://www.channelnewsasia.com/business/anthropic-signs-us35-billion-cloud-deal-nvidia-backed-lambda-source-says-6353306){:target="_blank"} put the site at about 350 megawatts. None of the companies commented. Anthropic also recently signed a reported $45 billion deal with Nscale. This does not change the Claude API this week.

### AIR Raises $50M to Check What AI Agents Install - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/09/01/air-raises-50m-to-help-companies-vet-the-skills-and-add-ons-ai-agents-use/){:target="_blank"}

On September 1, [TechCrunch reported](https://techcrunch.com/2026/09/01/air-raises-50m-to-help-companies-vet-the-skills-and-add-ons-ai-agents-use/){:target="_blank"} that AIR raised $50 million in two seed rounds. Sequoia led $10 million. Greenoaks led $40 million. The product watches the skills and plugins that agents install.

### Lyte Raises $165M to Help Robots See - [<i class="fas fa-external-link-alt"></i>](https://lyte.ai/news/series-c){:target="_blank"}

On September 2, [Lyte raised a $165 million Series C](https://lyte.ai/news/series-c){:target="_blank"} led by Maverick Silicon. The company is now worth $1.6 billion. Total raised is $272 million. It is based in Sunnyvale and builds sensors for robots.

### Wafer Raises $40M to Tune Inference on the Fly - [<i class="fas fa-external-link-alt"></i>](https://www.wafer.ai/blog/series-a){:target="_blank"}

On September 1, [Wafer raised a $40 million Series A](https://www.wafer.ai/blog/series-a){:target="_blank"} co-led by Marathon and Chemistry. AMD Ventures, Wing, Outset, Fifty Years, and Y Combinator also joined. Wafer says it will keep retuning models and hardware against live traffic, instead of tuning once at deploy time.

### Empirik Launches With $21M to Predict Outages - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/09/01/sequoia-incubated-empirik-launches-with-21m-to-predict-outages-before-they-happen/){:target="_blank"}

On September 1, [Empirik launched](https://techcrunch.com/2026/09/01/sequoia-incubated-empirik-launches-with-21m-to-predict-outages-before-they-happen/){:target="_blank"} as its own company with $21 million from Sequoia, Canapi, and Alumni Ventures. It tries to predict outages before they happen.

### Layoffs: Uber and The Trade Desk

*   **Uber:** On September 2, [TechCrunch](https://techcrunch.com/2026/09/02/uber-is-laying-off-10-of-staff-or-3300-people/){:target="_blank"} reported about 3,300 cuts, about 10% of staff. Bloomberg had it first. CEO Dara Khosrowshahi said Uber will have about 20% fewer managers, will merge engineering, science, and delivery teams, and will end almost all remote jobs. Reuters tied the cuts to robotaxis. Khosrowshahi did not blame AI.
*   **The Trade Desk:** On September 3, [a filing](https://www.stocktitan.net/sec-filings/TTD/8-k-trade-desk-inc-reports-material-event-6e2753cf5a23.html){:target="_blank"} said the ad company will cut about 15% of staff and take $39 million to $51 million in cash charges this quarter. [Business Insider](https://www.businessinsider.com/the-trade-desk-lays-off-15-of-staff-2026-9){:target="_blank"} put that at more than 500 people, based on 3,843 staff at the end of 2025. CEO Jeff Green said the company wants smaller teams.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$12.93 Billion** Nvidia's signed price for Hugging Face
- **$10 / $50** GPT-6 Astra and Claude Fable 5.1 standard API rates per million input and output tokens
- **$0.25** Fable 5.1 cache read price per million tokens, down 75% from Fable 5
- **$0.75 / $3.75** Gemini 3.8 Flash intro price through December 31, 2026
- **3,300** Uber roles cut, about 10% of staff
- **15%** The Trade Desk workforce cut
- **$35 Billion** Reported Anthropic commitment to Lambda
- **October 1, 2026** Python 3.15.0 final. rc2 is the last candidate

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Anthropic / Lambda** - August 31. Reported $35 billion cloud deal. Nvidia holds the Texas lease.
*   **PaperCut KEV** - August 31. CVE-2026-81578 and CVE-2026-82078. Patch 24.1.10, 25.0.13, or 26.0.5. Due September 14.
*   **Claude Fable 5.1** - September 1. `claude-fable-5-1`. Cache reads $0.25 per million tokens.
*   **Copilot Fable 5.1** - September 1. Pro+ and above. Admin policy. Data retention on by default.
*   **Copilot PR approvals** - September 1. Off by default. Can count toward required reviews if enabled.
*   **Python 3.15.0rc2** - September 1. Final RC. ABI frozen. Final due October 1.
*   **Gemini agentic video** - September 1. Set `processing` to `agentic` on Flash video requests.
*   **AIR $50M** - September 1. Sequoia then Greenoaks. Agent plugin supply chain.
*   **Wafer $40M** - September 1. Series A for continuous inference optimization.
*   **Empirik $21M** - September 1. Sequoia-incubated outage prediction.
*   **GPT-6 Astra Path post** - September 1. Critical cyber tier confirmed ahead of the September 3 launch.
*   **Gemini 3.8 Flash** - September 2. `gemini-3.8-flash`. Intro price through year-end.
*   **VS Code 1.136** - September 2. Agent Merge preview. `chat.agentMerge.enabled`.
*   **Uber 10%** - September 2. About 3,300 people. Fewer managers, almost no remote.
*   **Lyte Series C** - September 2. $165 million at $1.6 billion.
*   **CISA seven bugs** - September 2. Starlette, LiteLLM, Kestra, Artifactory, Sangoma, SonicWall.
*   **Nvidia / Hugging Face** - September 3. Signed $12.93 billion. Close targeted H1 2027.
*   **GPT-6 Astra** - September 3. `gpt-6-astra`. $10 / $50. Not coming to Cursor.
*   **Copilot Gemini 3.8** - September 3. Pro and above.
*   **Rust 1.98.1** - September 3. `rustup update stable`. Fixes a compiler crash bug.
*   **Trade Desk 15%** - September 3. $39 million to $51 million in cash charges.
*   **Copilot Astra** - September 4. Pro+, Max, Business, Enterprise.
*   **Kubernetes rootless kubelet** - September 4. Beta in 1.37. Existing root clusters do not change.

---

The week was three new models in Copilot, a signed Nvidia deal for Hugging Face, and a VS Code feature that will try to finish your PR. Astra, Fable 5.1, and Gemini 3.8 Flash are all live if your plan includes them. Hugging Face still works the same until 2027 at the earliest. If you run Starlette, LiteLLM, or PaperCut, patch those. If you ship Python packages, build 3.15 wheels on rc2. Next week, watch whether Astra's extra cyber access opens, and whether Python finds one last 3.15 bug. See you then.
