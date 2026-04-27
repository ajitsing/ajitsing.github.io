---
layout: post
seo: true
title: "Dev Weekly: Anthropic Sues Pentagon, Google Closes $32B Wiz Deal, Atlassian Cuts 1,600"
subtitle: "Anthropic takes the Pentagon to court. Google closes $32B Wiz deal. Atlassian cuts 1,600 jobs. Nvidia drops Nemotron 3 Super. 87% of AI-coded PRs have security flaws."
date: 2026-03-15
categories: tech-news
permalink: /dev-weekly/2026/mar-9-15/anthropic-sues-pentagon-google-wiz-atlassian-layoffs-nemotron/
share-img: /assets/img/posts/dev_weekly/tech-news-9-15mar-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-9-15mar-2026.svg
description: "Anthropic sues Pentagon over supply chain risk label. Google completes $32B Wiz acquisition. Atlassian cuts 1,600 jobs to fund AI. Nvidia launches Nemotron 3 Super open model. Anthropic ships Code Review for Claude Code. DryRun finds 87% of AI-coded PRs have vulnerabilities. Microsoft Patch Tuesday fixes 2 zero-days. March 2026 developer news."
keywords: "Anthropic sues Pentagon supply chain risk March 2026, Google Wiz acquisition $32 billion completed, Atlassian layoffs 1600 jobs AI investment, Nvidia Nemotron 3 Super 120B open model agentic AI, Anthropic Code Review Claude Code launch, OpenAI acquires Promptfoo AI security, DryRun Security AI coding agents vulnerabilities report, GitHub Copilot JetBrains agentic capabilities, Microsoft Patch Tuesday March 2026 zero-day, pac4j CVE-2026-29000 critical Java authentication bypass, Google Pentagon Agent Designer GenAI.mil, Adobe Photoshop AI assistant launch, Garry Tan gstack open source Claude Code, dev weekly March 2026, software developer news"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "Why did Anthropic sue the Pentagon in March 2026?"
    answer: "On March 9, 2026, Anthropic filed two lawsuits against the U.S. Department of Defense after being designated a 'supply chain risk,' a label normally reserved for foreign adversaries. The designation came after Anthropic refused to let Claude be used for autonomous weapons targeting and mass domestic surveillance. Anthropic argues the move violates due process, the First Amendment, and the Administrative Procedures Act. The company also filed an emergency stay request on March 12 in the DC Circuit Court of Appeals, warning the designation could cost it billions in lost revenue."
  - question: "When did Google complete the Wiz acquisition and how much did it cost?"
    answer: "Google completed its acquisition of cybersecurity firm Wiz on March 11, 2026, for $32 billion in cash. It is Google's largest acquisition ever. Wiz will join Google Cloud but keep its own brand and continue supporting all major cloud platforms including AWS, Azure, and Oracle Cloud. Google initially offered $23 billion in 2024, which Wiz declined. They came back with the $32 billion deal in early 2025 after Wiz hit $1 billion in annual recurring revenue."
  - question: "What is Anthropic Code Review and how does it work?"
    answer: "Anthropic launched Code Review on March 9, 2026, as part of Claude Code. It's a multi-agent system that dispatches specialized agents to examine pull requests in parallel. The agents look for logic errors, security vulnerabilities, broken edge cases, and regressions while considering the full codebase context. At Anthropic, it increased the percentage of PRs receiving substantive feedback from 16% to 54%. It costs $15 to $25 per review depending on PR complexity. Available for Claude for Teams and Enterprise customers."
  - question: "What is Nvidia Nemotron 3 Super?"
    answer: "Nvidia released Nemotron 3 Super on March 11, 2026. It's a 120 billion parameter open-source model with only 12 billion active parameters during inference, using a hybrid Mamba-Transformer mixture-of-experts architecture. It delivers up to 5x higher throughput and 2x higher accuracy compared to the previous Nemotron model, with a 1 million token context window. It's designed for agentic AI systems and is available on build.nvidia.com, OpenRouter, and Hugging Face."
  - question: "Why did Atlassian lay off 1,600 employees in March 2026?"
    answer: "On March 11, 2026, Atlassian announced it would cut approximately 1,600 employees, about 10% of its workforce, to fund investment in AI and enterprise sales. CEO Mike Cannon-Brookes said the company needed to change the mix of skills and roles to adapt to AI. The restructuring will cost $225 to $236 million. More than 900 of the affected positions were in software R&D. The company's CTO Rajeev Rajan also stepped down effective March 31."
  - question: "What did the DryRun Security report find about AI coding agents?"
    answer: "DryRun Security published 'The Agentic Coding Security Report' on March 11, 2026, after testing Claude Code, OpenAI Codex, and Google Gemini building real applications. They found that 87% of pull requests (26 out of 30) contained at least one vulnerability, with 143 security issues total across 38 scans. Common problems included broken access control, missing authentication, insecure JWT handling, and OAuth implementation failures. No agent produced a fully secure application. Claude had the most unresolved high-severity vulnerabilities, while Codex had the fewest."
---

The Anthropic vs Pentagon situation escalated this week. Anthropic filed two lawsuits challenging its supply chain risk designation, and within hours, more than 30 employees from OpenAI and Google backed the case with an amicus brief. Google completed its $32 billion Wiz acquisition, the biggest deal in Google's history. Anthropic shipped Code Review for Claude Code. Nvidia dropped Nemotron 3 Super, a 120B open model built for agentic AI. Atlassian cut 1,600 jobs to fund its AI push. A DryRun Security report found that 87% of pull requests written by AI coding agents contain security vulnerabilities. Microsoft patched 79 flaws including two zero-days. A lot happened. Here's all of it.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Anthropic Sues Pentagon Over Supply Chain Risk Label, OpenAI and Google Employees Back the Case - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/09/anthropic-sues-defense-department-over-supply-chain-risk-designation/)

On March 9, Anthropic took legal action against the U.S. Department of Defense. The company filed two lawsuits, one in California federal court and one in the DC Circuit Court of Appeals, challenging its designation as a "supply chain risk."

**What happened:**

This is the next chapter of the Anthropic vs Pentagon story that's been building for weeks. After Anthropic refused to let Claude be used for autonomous weapons targeting and mass surveillance, Defense Secretary Pete Hegseth designated the company a supply chain risk and barred the Pentagon and its contractors from using Anthropic's products. President Trump then ordered all federal agencies to drop Anthropic.

The supply chain risk label is significant because it's typically reserved for foreign adversaries. It has never been used against an American company before. Anthropic's lawyers argue the designation violates due process, the First Amendment, and the Administrative Procedures Act. They say it came from a social media post, not from any formal agency process.

**The amicus brief:**

Hours after the lawsuit was filed, more than 30 employees from OpenAI and Google filed an amicus brief supporting Anthropic. Jeff Dean, Google DeepMind's chief scientist, was among the signatories. The brief called the designation "improper and arbitrary" and warned that this kind of retaliation would "chill open deliberation" in AI development across the industry.

Sam Altman publicly criticized the Pentagon's decision on X, calling it "a very bad decision" and admitting that OpenAI's timing in signing its own Pentagon deal looked "opportunistic and sloppy."

**The emergency stay:**

On March 12, Anthropic filed an emergency request with the appeals court seeking to pause the designation. The company said it could cost "hundreds of millions, or even multiple billions of dollars" in 2026 revenue. More than 100 enterprise customers had already expressed concerns about continuing to work with the company.

**Legal experts weigh in:**

Reuters reported that legal experts believe Anthropic has a strong case. The statute the Pentagon used was designed for foreign infiltration threats, not for punishing domestic companies over policy disagreements.

**Why it matters:**

This is the first time a major AI company has gone to court over the right to set limits on how its technology is used. The outcome will set precedent for whether AI companies can maintain safety policies when a government customer disagrees with them. If Anthropic loses, every AI company will face pressure to remove safeguards whenever a government buyer demands it.

### Google Completes $32 Billion Wiz Acquisition - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/11/google-completes-32b-acquisition-of-wiz/)

On March 11, Google officially closed its acquisition of Israeli cybersecurity firm Wiz for $32 billion in cash. This is the largest acquisition in Google's history.

**The backstory:**

Google first approached Wiz with a $23 billion offer in 2024. Wiz turned it down. CEO Assaf Rappaport believed the company could grow larger on its own. He was right. Wiz hit $1 billion in annual recurring revenue in 2025, and when Google came back with $32 billion, the deal made sense for both sides.

**What Wiz does:**

Wiz provides cloud security across multi-cloud environments. It helps organizations prevent and respond to threats across Google Cloud, AWS, Azure, and Oracle Cloud. As companies increasingly run workloads across multiple clouds and add generative AI to their stack, the attack surface gets wider. That's the problem Wiz solves.

**What changes:**

Wiz will join Google Cloud but keep its brand and continue supporting all major cloud platforms. Google says the combined offering will provide unified threat detection, prevention, and response across hybrid and multi-cloud setups. Wiz products will keep working with other clouds and partner security tools.

**Why it matters:**

$32 billion for a cybersecurity company is a big statement. Google is clearly betting that cloud security is going to be the thing that determines which cloud provider wins enterprise customers. And they're betting Wiz's multi-cloud approach is the right one, which is interesting given that Wiz will keep supporting AWS and Azure even under Google's ownership.

### Anthropic Launches Code Review for Claude Code - [<i class="fas fa-external-link-alt"></i>](https://claude.com/blog/code-review)

On March 9, Anthropic released Code Review, a new feature built into Claude Code that automates pull request reviews.

**The problem it solves:**

AI coding tools have dramatically increased code output. More code gets written faster. But code review hasn't kept up. At Anthropic, only 16% of pull requests were getting substantive feedback before this tool launched. The rest were getting rubber-stamped or ignored.

**How it works:**

Code Review uses a multi-agent system. When you submit a pull request, it dispatches multiple specialized agents that examine the code in parallel. Each agent looks at the PR from a different angle: logic errors, security vulnerabilities, edge cases, regressions. The agents consider the full codebase context, not just the diff. They rank findings by severity and post them as both an overview comment and inline annotations on specific lines.

**The numbers from internal use at Anthropic:**

After deploying Code Review internally, 54% of PRs received substantive feedback, up from 16%. The average review takes about 20 minutes. On large PRs with 1,000+ lines, 84% receive findings, averaging 7.5 issues per review. On small PRs under 50 lines, 31% get findings. Less than 1% of findings were marked incorrect by developers.

**The cost:**

$15 to $25 per review, depending on the complexity of the PR. That's not cheap. But compared to the cost of an engineer spending time on a review that might catch fewer issues, it's a reasonable trade-off for teams where code velocity has outpaced review capacity.

**Who gets access:**

Claude for Teams and Claude for Enterprise customers. It's in research preview.

**Why it matters:**

The bottleneck in modern development is shifting from writing code to reviewing it. If your team ships 3x more code because of AI coding tools but your review process stays the same, quality drops. Code Review is a direct response to that. The numbers from Anthropic's internal testing suggest it actually works.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms


{% include ads/in-article.html %}


### Nvidia Releases Nemotron 3 Super: 120B Open Model for Agentic AI - [<i class="fas fa-external-link-alt"></i>](https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai)

On March 11, Nvidia released Nemotron 3 Super, an open-source model built specifically for complex agentic AI workloads.

**The architecture:**

Nemotron 3 Super has 120 billion parameters total, but only 12 billion are active during inference. It uses a hybrid Mamba-Transformer mixture-of-experts (MoE) design. The result is a model that performs like a much larger model but runs with the efficiency of a much smaller one. It supports a 1 million token context window.

**Performance:**

Up to 5x higher throughput and up to 2x higher accuracy compared to the previous Nemotron model. On Nvidia's Blackwell platform, it runs in NVFP4 precision and achieves up to 4x faster inference than FP8 on Hopper with no accuracy loss.

**Why agentic AI specifically:**

Nvidia designed this model around two problems that make agentic workflows expensive. The first is context explosion: multi-agent systems generate roughly 15x more tokens than regular chat because agents pass context back and forth. The second is the "thinking tax": reasoning at every step in a chain is expensive. Nemotron 3 Super is optimized to handle both efficiently.

**Who's using it:**

Perplexity, CodeRabbit, Factory, Greptile, Palantir, and Cadence Design Systems have already started integrating it for search, development, and enterprise automation. The model is available on build.nvidia.com, OpenRouter, and Hugging Face under the Nvidia Nemotron Open Model License.

### OpenAI Acquires Promptfoo to Secure AI Agents - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/09/openai-acquires-promptfoo-to-secure-its-ai-agents)

On March 9, OpenAI announced it's acquiring Promptfoo, an AI security testing platform founded in 2024.

**What Promptfoo does:**

Promptfoo helps developers test and secure AI applications through automated red-teaming and evaluation. It detects prompt injections, jailbreaks, data leaks, and tool misuse. Over 25% of Fortune 500 companies use it, with 130,000 active monthly users. The company had raised $23 million and was valued at $86 million as of July 2025.

**Where it's going:**

Promptfoo's technology will be integrated into OpenAI Frontier, the company's platform for building and operating enterprise AI agents. This adds automated security testing, oversight reporting, and compliance documentation directly into the agent platform.

**What stays the same:**

Promptfoo will remain open source and will continue supporting models from other providers, not just OpenAI. The team says existing customers and users won't see disruptions.

**The pattern:**

This is the second security-focused acquisition OpenAI has made in recent months. As AI agents get more capable and more autonomous, securing them becomes a bigger deal. OpenAI is clearly investing in making sure its enterprise customers can trust their agents to behave correctly.

### GitHub Copilot Gets Major Agentic Capabilities in JetBrains IDEs - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-03-11-major-agentic-capabilities-improvements-in-github-copilot-for-jetbrains-ides)

On March 11, GitHub announced that major agentic capabilities for Copilot in JetBrains IDEs are now generally available.

**What's new:**

Custom agents, sub-agents, and plan agents moved from preview to GA across all Copilot plans. You can now build specialized AI assistants for specific workflows and break complex problems into step-by-step execution plans. This was previously limited to VS Code.

**Agent hooks:**

A new feature in public preview. Hooks let you run custom commands at specific points during agent sessions: when a user submits a prompt, before or after tool use, and when errors happen. You define them in a `hooks.json` file inside `.github/hooks/`. This is useful for enforcing policies, running validators, or connecting external tools to the agent workflow.

**Instruction file support:**

Copilot in JetBrains now picks up `AGENTS.md` and `CLAUDE.md` files automatically during agent sessions. A new `/memory` slash command lets you manage these preferences quickly.

**Auto model selection:**

Copilot now picks models automatically based on real-time availability and performance. A thinking panel for extended-reasoning models shows the model's reasoning process. Both are generally available for all Copilot plans.

### Garry Tan Open Sources gstack: 10K Lines of Code Per Week with Claude Code - [<i class="fas fa-external-link-alt"></i>](https://github.com/garrytan/gstack)

On March 14, Y Combinator president Garry Tan released gstack, an open-source toolkit that turns Claude Code into a structured engineering team.

**What it is:**

gstack is a set of 10 custom slash commands that give Claude Code specific roles for different parts of the software development process. Instead of using Claude Code as a general assistant, each command puts it into a focused mode: `/plan-ceo-review` for product-level thinking, `/plan-eng-review` for architecture and edge cases, `/review` for code review, `/ship` for release management, `/qa` for testing, and `/browse` for visual QA with a 200ms response time.

**The numbers:**

Tan says he averaged 10,000 lines of code and 100 pull requests per week over 50 days using this setup. The `/browse` command, which uses Bun and Playwright, runs 20x faster than the Chrome MCP tool with less context bloat.

**Community response:**

The repo picked up 17,000+ GitHub stars quickly. Developers are treating it as a template for how to get more reliable output from AI coding tools by imposing explicit role boundaries.

**Why it's useful:**

The core idea is that AI coding tools produce better results when they're given a specific role rather than acting as a general purpose assistant. gstack is a concrete implementation of that idea with clear results to back it up.

### GitHub Ships 28 New Secret Scanning Detectors - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-03-10-secret-scanning-pattern-updates-march-2026/)

On March 10, GitHub added 28 new secret detectors from 15 providers including Vercel, Snowflake, Supabase, Lark, and Figma.

39 existing detectors now have push protection enabled by default, meaning GitHub will block commits containing those secrets rather than just alerting after the fact. New validity checks were added for Airtable, DeepSeek, npm, Pinecone, and Sentry tokens, where GitHub verifies with the provider whether a detected secret is still active.

These updates apply automatically to repositories with secret scanning enabled. Worth checking your settings if you haven't reviewed them recently.

---

## <i class="fas fa-building"></i> Industry News


{% include ads/display.html %}


### Atlassian Cuts 1,600 Jobs to Fund AI and Enterprise Sales - [<i class="fas fa-external-link-alt"></i>](https://www.theregister.com/2026/03/11/atlassian_layoffs/)

On March 11, Atlassian announced it's laying off approximately 1,600 employees, about 10% of its global workforce.

**The stated reason:**

CEO Mike Cannon-Brookes said the cuts are needed to "self-fund further investment in AI and enterprise sales." He acknowledged that while "AI doesn't replace people," it "changes the mix of skills we need or the number of roles required in certain areas." More than 900 of the affected positions are in software R&D.

**Where the cuts fall:**

North America: about 640 employees (40%). Australia: about 480 (30%). India: about 250 (16%). The rest is spread across Europe, the Middle East, Japan, and the Philippines.

**The cost:**

The restructuring will cost $225 to $236 million and is expected to be done by end of Q4 2026. CTO Rajeev Rajan will step down effective March 31.

**The financial context:**

Atlassian's stock has lost more than half its value in 2026. The company went from a $112 billion market cap in 2021 to around $20 billion. Despite decent numbers, cloud revenue growth above 25% and 40% growth in remaining performance obligations, investors are worried about AI disruption to the developer tools market.

**The pattern:**

This follows the same playbook as Block (40%), Oracle (18%), and others: cut headcount, redirect savings to AI, and tell investors the company can do more with fewer people. Whether that actually works remains an open question.

### Google Rolls Out AI Agents for Pentagon on GenAI.mil - [<i class="fas fa-external-link-alt"></i>](https://defensescoop.com/2026/03/10/dod-genai-agent-designer-custom-ai-assistants-google-gemini/)

On March 10, the Pentagon announced Agent Designer, a new tool built with Google's Gemini that lets Department of Defense employees create custom AI agents.

**How it works:**

Agent Designer is a no-code/low-code platform available through GenAI.mil, the Pentagon's enterprise AI portal. The DOD's 3 million civilian and military employees can use it to build AI agents using plain language, no coding required. Eight pre-built agents are also ready to use immediately.

**What the agents can do:**

Administrative work: drafting meeting notes, creating action items, breaking projects into plans, generating reports, and analyzing financial data. This is about reducing paperwork, not battlefield applications.

**The bigger picture:**

Right now, Agent Designer only works on unclassified networks. But Pentagon technology chief Emil Michael said he has "high confidence" Google will be "a great partner on all networks," meaning classified and top-secret environments are next. GenAI.mil has passed one million unique users since its December 2025 launch.

**The timing:**

Google expanding its Pentagon AI work right as Anthropic sues the Pentagon is not a coincidence. The void Anthropic left is being filled quickly. Google, OpenAI, and xAI are all on the Pentagon's approved contractor list now.

### Adobe Launches AI Assistant for Photoshop - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/03/10/adobe-is-debuting-an-ai-assistant-for-photoshop/)

On March 10, Adobe launched an AI assistant for Photoshop in public beta across web and mobile.

**What it does:**

You describe what you want to change in natural language, and the AI does it. Remove objects, change backgrounds, adjust lighting, fix colors. On mobile, it supports voice commands for hands-free editing. A new feature called AI Markup lets you draw on images and add prompts to control where changes happen.

You can choose whether the AI applies edits automatically or walks you through each step so you learn the process.

**The pricing:**

Paid Photoshop users get unlimited AI generations through April 9. Free users get 20 generations to start. Desktop is not included in this initial beta.

**Firefly updates:**

Adobe also expanded Firefly with Generative Fill, Generative Remove, Generative Expand, Generative Upscale, and one-click background removal. Firefly now supports over 25 third-party AI models including Google's Nano Banana 2, OpenAI's image generation, and Black Forest Labs' Flux.2 Pro.

---

## <i class="fas fa-shield-alt"></i> Security


{% include ads/in-article.html %}


### DryRun Report: 87% of AI-Coded Pull Requests Have Security Vulnerabilities - [<i class="fas fa-external-link-alt"></i>](https://www.helpnetsecurity.com/2026/03/13/claude-code-openai-codex-google-gemini-ai-coding-agent-security/)

On March 11, DryRun Security published "The Agentic Coding Security Report" after testing how Claude Code, OpenAI Codex, and Google Gemini handle security when building real applications.

**The setup:**

Each agent built two complete applications through sequential pull requests. DryRun then ran security scans on every PR.

**The results:**

87% of pull requests contained at least one vulnerability. That's 26 out of 30 PRs. Across 38 security scans, they found 143 security issues. No agent produced a fully secure application.

**The failure patterns:**

The agents kept making the same mistakes developers have known about for a decade. Broken access control showed up across all three agents and both applications. JWT verification was insecure. WebSocket authentication was missing even when REST authentication was implemented correctly. OAuth state parameters were left out. Rate limiting middleware was defined but never actually connected. Business logic accepted client-side validation without checking on the server.

**Which agent did best:**

Codex finished with the fewest unresolved vulnerabilities and showed better remediation behavior. Claude had the most unresolved high-severity issues. But the key finding is that none of them wrote secure code by default.

**What this means for teams:**

If you're using AI coding agents to ship faster, you need a security review step in your pipeline. The agents are not thinking about security unless you tell them to. Relying on them to produce secure code without explicit guidance is a risk.

### Microsoft March Patch Tuesday: 79 Flaws, 2 Zero-Days - [<i class="fas fa-external-link-alt"></i>](https://www.bleepingcomputer.com/news/microsoft/microsoft-march-2026-patch-tuesday-fixes-2-zero-days-79-flaws/)

On March 11, Microsoft's Patch Tuesday addressed 79 security vulnerabilities, including two publicly disclosed zero-days.

**The zero-days:**

CVE-2026-21262 is a SQL Server elevation of privilege flaw that lets authorized attackers gain SQLAdmin privileges. CVE-2026-26127 is a .NET denial of service vulnerability caused by an out-of-bounds read that can be triggered without authentication. Neither has been exploited in the wild yet.

**The critical flaws:**

CVE-2026-26110 and CVE-2026-26113 are remote code execution bugs in Microsoft Office that can be triggered through the preview pane. CVE-2026-26144 is an Excel information disclosure vulnerability that could let attackers steal data through Microsoft Copilot in a zero-click attack.

**The numbers:**

18 remote code execution vulnerabilities, 46 elevation of privilege flaws, and 10 information disclosure bugs. Six vulnerabilities were flagged as "more likely" to be exploited, mostly involving Windows privilege escalation.

**.NET security updates:**

Microsoft also released .NET 10.0.4, 9.0.14, and 8.0.25 on March 12, fixing three security feature bypass vulnerabilities (CVE-2026-26130, CVE-2026-26127, CVE-2026-26131). Update your .NET runtimes.

### pac4j Critical Authentication Bypass: CVSS 10.0 - [<i class="fas fa-external-link-alt"></i>](https://www.sonatype.com/blog/pac4j-cve-2026-29000-sonatype-finds-19-additional-packages)

CVE-2026-29000 was disclosed on March 11, a critical authentication bypass in pac4j-jwt with the maximum possible CVSS score of 10.0.

**What went wrong:**

When pac4j decrypts a JWE-wrapped token that contains a PlainJWT (with `alg: none`), it skips signature verification entirely. An attacker with access to the server's RSA public key can craft a token with any identity claims they want, including admin roles, and pac4j will accept it as valid. Full authentication bypass and user impersonation.

**How bad is this:**

pac4j is in the top 2% most downloaded components on Maven Central. Sonatype found 18 additional packages affected by the same flaw. A public proof-of-concept exists and exploitation is trivial. Over 30,000 vulnerable downloads happened in the week after disclosure.

**Affected versions:**

4.x before 4.5.9, 5.x before 5.7.9, 6.x before 6.3.3. The vulnerability was actually introduced in version 1.9.2, earlier than initially reported.

**What to do:**

Update immediately. If you're running any version of pac4j-jwt below the patched versions listed above, you're exposed to a trivially exploitable authentication bypass. Don't wait.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter


{% include ads/display.html %}


- **$32 billion** — Price Google paid for Wiz, Google's largest acquisition ever
- **$1 billion** — Wiz's annual recurring revenue that made Google come back with a higher offer
- **30+** — OpenAI and Google employees who filed an amicus brief supporting Anthropic
- **100+** — Enterprise customers expressing concerns about working with Anthropic after the Pentagon designation
- **54%** — Share of PRs receiving substantive feedback with Anthropic's Code Review, up from 16%
- **$15-$25** — Cost per code review using Claude Code Review
- **120 billion** — Total parameters in Nvidia Nemotron 3 Super
- **12 billion** — Active parameters during Nemotron 3 Super inference
- **5x** — Throughput improvement in Nemotron 3 Super over the previous Nemotron model
- **1,600** — Number of Atlassian employees affected by layoffs
- **10%** — Percentage of Atlassian's global workforce being cut
- **$225-$236 million** — Restructuring cost for Atlassian
- **87%** — Share of AI-coded pull requests containing at least one security vulnerability
- **143** — Total security issues found across 38 scans of AI-generated code
- **10.0** — CVSS score of the pac4j-jwt authentication bypass (CVE-2026-29000)
- **30,000** — Vulnerable pac4j downloads in the week after CVE-2026-29000 disclosure
- **79** — Security vulnerabilities fixed in Microsoft's March 2026 Patch Tuesday
- **28** — New secret scanning detectors added by GitHub
- **17,000+** — GitHub stars on Garry Tan's gstack repository
- **10,000** — Lines of code per week Garry Tan says he averaged using gstack with Claude Code
- **1 million** — Unique users on the Pentagon's GenAI.mil since December 2025

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**Anthropic sues the Pentagon** — Filed two lawsuits on March 9 challenging its supply chain risk designation. Also filed emergency stay request on March 12. Legal experts say the case is strong.

**OpenAI and Google employees back Anthropic** — 30+ employees including Google's Jeff Dean filed an amicus brief hours after the lawsuit, calling the Pentagon's action "improper and arbitrary."

**Google closes $32B Wiz deal** — Largest acquisition in Google's history. Wiz joins Google Cloud, keeps its brand, continues supporting AWS, Azure, and Oracle Cloud.

**Anthropic Code Review** — Multi-agent PR review system for Claude Code. Internal use at Anthropic raised substantive review rate from 16% to 54%. $15-$25 per review. Available for Teams and Enterprise.

**Nvidia Nemotron 3 Super** — 120B open model, 12B active parameters, 5x throughput for agentic AI. Available on build.nvidia.com, OpenRouter, and Hugging Face.

**OpenAI acquires Promptfoo** — AI security testing startup joins OpenAI. Will integrate into OpenAI Frontier for enterprise agent security. Stays open source.

**GitHub Copilot JetBrains upgrade** — Custom agents, sub-agents, plan agent, and agent hooks now GA in JetBrains IDEs. Auto model selection generally available for all Copilot plans.

**Garry Tan releases gstack** — Open source Claude Code setup with 10 slash commands for structured engineering workflows. 17K GitHub stars. Claims 10K LOC and 100 PRs per week.

**GitHub secret scanning** — 28 new detectors from 15 providers. 39 detectors now block commits by default. New validity checks for Airtable, DeepSeek, npm, Pinecone, and Sentry.

**Atlassian cuts 10%** — 1,600 jobs eliminated to fund AI and enterprise sales. $225-$236M restructuring cost. CTO Rajeev Rajan stepping down.

**Google AI agents for Pentagon** — Agent Designer tool on GenAI.mil lets DOD employees build custom Gemini agents. Talks underway for classified networks.

**Adobe Photoshop AI assistant** — Natural language editing in public beta on web and mobile. Voice commands on mobile. Unlimited generations for paid users through April 9.

**DryRun Security report** — 87% of AI-coded PRs have security vulnerabilities. 143 issues across Claude, Codex, and Gemini tests. No agent produced fully secure code.

**Microsoft Patch Tuesday** — 79 flaws including 2 zero-days. Critical Office RCE bugs exploitable via preview pane. Excel vulnerability allows data theft through Copilot.

**pac4j critical CVE** — CVSS 10.0 authentication bypass in pac4j-jwt. Trivially exploitable. Public proof-of-concept exists. Update immediately.

**GitLab security patch** — Versions 18.9.2, 18.8.6, and 18.7.6 released on March 11 fixing 15 vulnerabilities, including a high-severity XSS in markdown processing (CVSS 8.7).

**Zendesk acquires Forethought** — Agentic customer service automation startup joins Zendesk. TechCrunch Battlefield winner in 2018. $115M raised. Over a billion monthly customer interactions.

---

*The Anthropic story is the one that will have consequences beyond this week. An American AI company is in court fighting for the right to set limits on how its technology gets used, and employees at its biggest competitors are publicly backing the case. That's new. Whatever the court decides will shape how every AI company handles government contracts going forward. On the security side, the DryRun report is a reality check. AI coding agents are fast, but they're not thinking about security. 87% of PRs with at least one vulnerability is a problem that gets worse the more teams rely on these tools without adding security gates. The Wiz acquisition closing is good news for anyone who cares about cloud security. Google paying $32 billion for a cybersecurity company sends a clear message about where enterprise value is going. And Nvidia's Nemotron 3 Super is the kind of open model release that matters: efficient, purpose-built for agentic work, and free to use. The tools keep getting better. The questions about how they're used keep getting harder.*

*See you next week.*
