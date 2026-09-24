---
layout: post
seo: true
title: "Dev Weekly Sep 7-13, 2026: OpenAI Agents API, Cursor Projects, React 19.3, Record Patch Tuesday"
subtitle: "OpenAI shipped the Agents API, Cursor launched Projects for long-running work, React 19.3 made View Transitions stable, Microsoft published a record Patch Tuesday, and Anthropic's CEO asked labs to pace the frontier."
date: 2026-09-13
categories: tech-news
permalink: /dev-weekly/2026/sep-7-13/openai-agents-api-cursor-projects-react-19-3/
share-img: /assets/img/posts/dev_weekly/tech-news-7-13sep-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-7-13sep-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-7-13sep-2026.png
description: "Dev Weekly for September 7 to 13, 2026: OpenAI ships the Agents API, Cursor launches Projects, React 19.3 lands View Transitions, and Microsoft's Patch Tuesday hits a record. On September 10 OpenAI put the Codex harness behind client.beta.agents.sessions.create, with no extra API fee beyond tokens and tools, and Cursor launched Projects so a coordinator agent can run cloud work for months. On September 9 React 19.3 made View Transitions and Fragment Refs stable, GitHub Copilot Business and Enterprise got managed agent permissions, and Google shipped ADK for Kotlin 1.0. On September 8 Microsoft published 974 of its own CVEs, including two exploited Windows bugs, Chrome 153 patched an in-the-wild V8 write, and Cognition raised $2 billion at a $48 billion valuation. Also this week: Adobe's Magento StyleSmuggler hotfix, four npm packages with the Shai-Hulud payload, CISA KEVs for N-able, Citrix, Cisco, Fortinet, and MikroTik, Dario Amodei's pacing essay, Bending Spoons buying Miro for $1.36 billion, Salesforce closing Fin, and Oracle adding $700 million to its layoff plan."
keywords: "dev weekly September 7 13 2026, software developer news September 7 to 13 2026, OpenAI Agents API public beta gpt-6-astra client.beta.agents.sessions.create OpenAI-Beta agents=v1 September 10 2026, Cursor Projects coordinator agent beta September 10 2026, React 19.3 View Transitions Fragment Refs browser() Trusted Types npm react@19.3.0 September 9 2026, Microsoft Patch Tuesday September 8 2026 974 CVEs CVE-2026-85880 ALPC CVE-2026-81963 Windows Update Stack, Adobe Commerce Magento StyleSmuggler CVE-2026-75650 APSB26-146 VULN-39341 September 7 2026, Shai-Hulud npm feishu-docx-mcp bmc-i18n-extract-cli blueai-cli bmc-translate-utils September 7 2026, Chrome 153 CVE-2026-87491 V8 153.0.8010.36, CISA KEV N-able CVE-2026-86218 Citrix CVE-2026-19490 Cisco FMC CVE-2026-20079 Fortinet CVE-2025-25249 MikroTik RouterOS, GitHub Copilot enterprise managed permissions cache-mode, ADK for Kotlin 1.0 google-adk-kotlin-core, Cognition $2 billion Series E $48 billion valuation Devin, Bending Spoons Miro $1.36 billion, Salesforce Fin Intercom acquisition, Dario Amodei We Must Pace the Frontier, Oracle $700 million 2026 Restructuring Plan $2.8 billion, cloud security vulnerability management enterprise AI supply chain security observability DevOps agentic coding software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from September 7 to 13, 2026?"
    answer: "OpenAI released the Agents API in public beta on September 10. It is the same Codex harness, now as client.beta.agents.sessions.create, with hosted sandboxes or your own machines. The same day, Cursor launched Projects, a coordinator that keeps context for months and farms work out to subagents. React 19.3 also shipped on September 9 with stable View Transitions. Microsoft's Patch Tuesday on September 8 was the largest CVE dump Rapid7 has counted from Microsoft in a single day, and two of those Windows bugs were already exploited."
  - question: "How do I start using the OpenAI Agents API?"
    answer: "Call client.beta.agents.sessions.create. Set agent.model to gpt-6-astra. For a first run, set environment to { type: \"openai_hosted\" }. REST callers need the header OpenAI-Beta: agents=v1 on POST /v1/agents/sessions. There is no extra Agents API fee. You pay the usual token and tool prices. During the public beta, OpenAI says it will change the API from feedback before general availability."
  - question: "How do I try Cursor Projects?"
    answer: "Projects is in beta and rolling out to all Cursor users as of September 10. Open the left-hand nav, start a Project, and describe a body of work that should outlive one chat, such as a feature with several pull requests or a migration. A coordinator agent plans and delegates. It does not write the code itself. The Project runs on a cloud machine, so closing your laptop does not stop it. You can also tell the coordinator to watch Slack, a schedule, or your pull requests."
  - question: "How do I upgrade to React 19.3?"
    answer: "Install react@19.3.0 and react-dom@19.3.0 from npm. View Transitions and Fragment Refs are stable. Wrap UI in the ViewTransition component and update it inside startTransition if you want an animation. use(browser()) skips server rendering for a subtree. React also now keeps Trusted Types objects intact, so a Content-Security-Policy that requires them can work. Try it on a branch first. Some animation behavior only runs for updates marked as transitions."
  - question: "What should I patch after this week's security news?"
    answer: "Install this month's Windows updates for CVE-2026-85880 and CVE-2026-81963. Update Chrome to 153.0.8010.36 or later for CVE-2026-87491. If you run Adobe Commerce or Magento, apply hotfix VULN-39341 from APSB26-146, confirm it with vendor/bin/magento-patches -n status, then rotate the encryption key and anything it wrapped. If your lockfile pulled feishu-docx-mcp@0.3.2, bmc-i18n-extract-cli@1.1.1, blueai-cli@0.7.0, or bmc-translate-utils@1.1.1 on September 7, treat the machine as compromised and rotate tokens. N-able N-central on-prem needs build 2026.3.1.14."
---

OpenAI and Cursor both shipped ways to run long agent jobs this week, and React finally made View Transitions a stable API. Microsoft also published more CVEs in one Patch Tuesday than it ever has, including two Windows bugs already in use.

Adobe had to hotfix Magento after a live remote code execution campaign. Four npm packages briefly shipped a known worm payload. Here is the week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### OpenAI Opens the Codex Harness as the Agents API - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/introducing-the-agents-api/){:target="_blank"}

On September 10, [OpenAI put the Codex harness on an API](https://openai.com/index/introducing-the-agents-api/){:target="_blank"} in public beta. You create a session, pick a model, tools, and a place for the agent to run, and OpenAI keeps the loop going: context compaction, tool search, parallel tool calls, and subagents. The [quickstart](https://developers.openai.com/api/docs/guides/agents-api/quickstart){:target="_blank"} uses `client.beta.agents.sessions.create`. Set `agent.model` to `gpt-6-astra`. For a first run, set `environment` to `{ type: "openai_hosted" }`. REST callers send `OpenAI-Beta: agents=v1` on `POST /v1/agents/sessions`.

There is no extra Agents API fee. You pay the usual token and tool prices. You can run in OpenAI's hosted sandbox, on your own machines, or with partners listed in the post (Blaxel, Cloudflare, Daytona, DigitalOcean, E2B, Modal, Oracle, Runloop, and Vercel). The harness is the open-source Codex one. OpenAI operates it. You can still read the public repo.

This is the product Astra needed if you want Codex-style jobs outside the Codex app. Keep it on a test project while the beta moves.

### Cursor Launches Projects for Work That Outlives a Chat - [<i class="fas fa-external-link-alt"></i>](https://cursor.com/blog/projects){:target="_blank"}

On September 10, [Cursor launched Projects](https://cursor.com/blog/projects){:target="_blank"} in beta, rolling out to all users. You start one from the left-hand nav. You talk to a coordinator agent. That coordinator does not write code. It plans, farms work out to subagents, and brings results back for you to check. Cursor says new users merge 30% more PRs, and people who mostly use Projects merge six times as many.

A Project runs on its own cloud machine, so closing your laptop does not stop it. Shared files follow the agents, so later runs keep the test notes and preferences from earlier ones. You can also subscribe the coordinator to Slack, a schedule, or your pull requests, including failed CI. Cursor has used this internally for migrations that spanned a few hundred PRs.

Use it for a feature with several PRs, a migration, or chores that never really end. Do not use it as a replacement for a one-off chat.

### React 19.3 Makes View Transitions Stable - [<i class="fas fa-external-link-alt"></i>](https://react.dev/blog/2026/09/09/react-19-3){:target="_blank"}

On September 9, [React 19.3 landed on npm](https://react.dev/blog/2026/09/09/react-19-3){:target="_blank"}. View Transitions and Fragment Refs, both experimental last year, are stable. Wrap UI in `ViewTransition` and change it inside `startTransition` (or a Suspense reveal, or `useDeferredValue`) if you want the browser View Transition API to animate enter, exit, update, or a shared element. Urgent updates outside a transition still snap.

Install `react@19.3.0` and `react-dom@19.3.0`. Fragment Refs give you a small set of DOM methods on a fragment without changing the markup a child already emits. `use(browser())` skips server rendering for a subtree and shows the nearest Suspense fallback in the HTML. React also stopped stringifying Trusted Types objects, so a CSP with `require-trusted-types-for 'script'` can work.

Try it on a branch. The animation only runs when the update is marked as a transition, which is easy to miss on the first pass.

### Microsoft's Biggest Patch Tuesday Includes Two Exploited Windows Bugs - [<i class="fas fa-external-link-alt"></i>](https://www.rapid7.com/blog/post/em-patch-tuesday-september-2026/){:target="_blank"}

On September 8, [Rapid7 counted 974 Microsoft-product CVEs](https://www.rapid7.com/blog/post/em-patch-tuesday-september-2026/){:target="_blank"} on Patch Tuesday, plus 25 non-Microsoft CVEs, 999 in all. Rapid7 called it the most Microsoft has published in a single day. Two were already exploited: [CVE-2026-85880](https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2026-85880){:target="_blank"}, a heap overflow in Windows ALPC that can take a low-privilege process to SYSTEM, and CVE-2026-81963, a Windows Update Stack link-following bug that also leads to SYSTEM. [CISA added both](https://www.cisa.gov/news-events/alerts/2026/09/08/cisa-adds-four-known-exploited-vulnerabilities-catalog){:target="_blank"} the same day.

Install this month's Windows updates. ALPC is the broader fleet problem. The Update Stack bug is narrower (Windows 11 and Server 2025 in several writeups) but still exploited. Do not wait for a quiet week. This dump is the opposite of that.

### GitHub Lets Enterprises Lock What Copilot Agents May Do - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-09-enterprise-managed-permissions-for-github-copilot-agent-operations/){:target="_blank"}

On September 9, [Copilot Business and Enterprise admins got managed permissions](https://github.blog/changelog/2026-09-09-enterprise-managed-permissions-for-github-copilot-agent-operations/){:target="_blank"} for agent operations. You can block a class of action, require a human click, or allow it. The controls cover shell commands, file reads and edits, and network domains. Users, workspace settings, auto-approval, and old saved approvals cannot weaken them. The feature is generally available in the Copilot app, Copilot CLI, and VS Code sessions that use Agent Host.

If you already let agents run in those products, set the policy this week before a team turns auto-approval on.

### Anthropic's CEO Asks Labs to Slow the Frontier - [<i class="fas fa-external-link-alt"></i>](https://darioamodei.com/post/we-must-pace-the-frontier){:target="_blank"}

On September 12, [Dario Amodei published "We Must Pace the Frontier"](https://darioamodei.com/post/we-must-pace-the-frontier){:target="_blank"}. He wants companies to slow how fast they raise model capability, not stop training. Anthropic will, on its own, give third-party evaluators (he names METR) employee-like access: badges, laptops, and the right to publish findings with only narrow redactions. Step two is coordination among labs in democracies. Step three is governments. [The Guardian](https://www.theguardian.com/technology/2026/sep/12/we-must-slow-the-pace-ceo-of-anthropic-calls-for-an-ai-slowdown){:target="_blank"} reported Sam Altman saying OpenAI will do the same on evaluators, and Elon Musk agreeing in public.

Nothing in the essay changes Claude or GPT APIs this week. It is a policy fight sitting on top of the Hugging Face agent incident from the summer.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Google Ships ADK for Kotlin 1.0 - [<i class="fas fa-external-link-alt"></i>](https://developers.googleblog.com/en/announcing-adk-for-kotlin-10-building-production-ready-ai-agents-in-kotlin-android-and-beyond/){:target="_blank"}

On September 9, [Google released Agent Development Kit for Kotlin 1.0](https://developers.googleblog.com/en/announcing-adk-for-kotlin-10-building-production-ready-ai-agents-in-kotlin-android-and-beyond/){:target="_blank"}. It matches ADK Python and Java on multi-agent patterns, and it adds Android pieces (Room sessions, AppSearch memory, Firebase AI, on-device LiteRT-LM). Add `com.google.adk:google-adk-kotlin-core:1.0.0` and the KSP processor `com.google.adk:google-adk-kotlin-processor:1.0.0`. Mark tools with `@Tool` and `@Param`. The sample agent in the post uses `gemini-3.8-flash`.

This is for Kotlin and Android teams who want the same ADK shape they already have on the server, not a new chat app.

### Copilot Code Review Starts Closing Its Own Comments - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-11-auto-resolution-and-analysis-updates-in-copilot-code-review/){:target="_blank"}

On September 11, [Copilot code review began resolving its own comments](https://github.blog/changelog/2026-09-11-auto-resolution-and-analysis-updates-in-copilot-code-review/){:target="_blank"} when a later commit addresses them. Applying a Copilot suggestion now also gets a generated commit message. Reviews can use the Copilot SDK shell tools behind the agent firewall (builds, tests, scripts). Lite reviews now run several agents and merge the findings. GitHub said that mix raised addressed high-severity comments by 47% in tests and cut review cost about 8%.

No new setting to flip. You get this on the next review.

### Copilot for JetBrains Gets Enterprise Sandbox Policies - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-08-enterprise-managed-sandbox-in-copilot-for-jetbrains/){:target="_blank"}

On September 8, [Copilot in JetBrains IDEs added managed sandbox policies](https://github.blog/changelog/2026-09-08-enterprise-managed-sandbox-in-copilot-for-jetbrains/){:target="_blank"} in public preview. Admins can set sandbox on or off, filesystem and network access, proxy, developer-tool access, and macOS Keychain access. Managed values lock in the IDE. The same release adds `/ide` in Copilot CLI (preview) to pull JetBrains context into a terminal session.

### GitHub Actions Cache Access Is Now a First-Class Setting - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-10-control-github-actions-cache-access-with-cache-mode/){:target="_blank"}

On September 10, [`cache-mode` became generally available](https://github.blog/changelog/2026-09-10-control-github-actions-cache-access-with-cache-mode/){:target="_blank"} on all GitHub plans. Set it on a workflow or job to `read`, `write`, `write-only`, or `none`. Job settings win. A called reusable workflow cannot get more cache access than its caller. `pull_request_target` still defaults to read-only. If you set `write` on a low-trust event, Actions warns you, because that is how cache poisoning starts.

---

## <i class="fas fa-shield-alt"></i> Security

### Adobe Hotfixes a Magento Remote Code Execution Bug Already in Use - [<i class="fas fa-external-link-alt"></i>](https://helpx.adobe.com/security/products/magento/apsb26-146.html){:target="_blank"}

On September 7, [Adobe published APSB26-146](https://helpx.adobe.com/security/products/magento/apsb26-146.html){:target="_blank"} for CVE-2026-75650, a CVSS 10.0 template-injection bug in Adobe Commerce 2.4.4 through 2.4.9 and Magento Open Source 2.4.6 through 2.4.9. Adobe says it is being exploited. [Sansec](https://sansec.io/research/stylesmuggler-0day){:target="_blank"} named the campaign StyleSmuggler and saw attacks from September 4. The fix is composer hotfix `VULN-39341`, not a full platform release. [Adobe's Commerce note](https://experienceleague.adobe.com/en/docs/commerce-knowledge-base/kb/announcements/commerce-apsb26-146){:target="_blank"} says to apply the patch, confirm it with `vendor/bin/magento-patches -n status`, then rotate the encryption key and every credential it protected. The hotfix does not clean an already owned store. CISA added the CVE on September 8, with a federal due date of September 11.

### The Shai-Hulud npm Payload Comes Back in Four Packages - [<i class="fas fa-external-link-alt"></i>](https://corgea.com/research/shai-hulud-npm-resurfaced-four-packages-september-2026){:target="_blank"}

On September 7, [malicious versions of four npm packages](https://corgea.com/research/shai-hulud-npm-resurfaced-four-packages-september-2026){:target="_blank"} were live for a few hours: `feishu-docx-mcp@0.3.2`, `bmc-i18n-extract-cli@1.1.1`, `blueai-cli@0.7.0`, and `bmc-translate-utils@1.1.1`. Researchers tied them to the same Shai-Hulud payload hash from the May AntV wave. Install ran `bun run index.js`. npm replaced the versions with `0.0.1-security` the same afternoon, and GitHub published malware advisories minutes later. If a CI job or laptop installed any of those versions, treat the host as compromised. Rotate npm, GitHub, and cloud tokens from that environment.

### Chrome 153 Patches an In-the-Wild V8 Bug, and CISA Adds a Perimeter Batch - [<i class="fas fa-external-link-alt"></i>](https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_0808145027.html){:target="_blank"}

On September 8, [Chrome 153 hit stable](https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_0808145027.html){:target="_blank"}. Google is aware of an exploit for CVE-2026-87491, an out-of-bounds write in V8. Fixed builds are 153.0.8010.36 (Linux) and 153.0.8010.36/.37 (Windows and macOS). Open Help, then About Google Chrome, and relaunch. [CISA added the Chrome bug](https://www.cisa.gov/news-events/alerts/2026/09/09/cisa-adds-four-known-exploited-vulnerabilities-catalog){:target="_blank"} on September 9, along with Fortinet CVE-2025-25249, Citrix NetScaler CVE-2026-19490, and Cisco Firewall Management Center CVE-2026-20079. On September 8 it had already added N-able N-central CVE-2026-86218 (on-prem fix is build `2026.3.1.14`) next to the Magento and Windows KEVs. On September 10 it added two MikroTik RouterOS bugs, [CVE-2026-67277 and CVE-2026-86060](https://www.cisa.gov/news-events/alerts/2026/09/10/cisa-adds-two-known-exploited-vulnerabilities-catalog){:target="_blank"}.

If you run NetScaler, Cisco FMC, FortiOS, N-central, or a MikroTik edge box, patch those before you file the Chrome ticket as done.

### Anthropic Says Stolen API Keys Are Now the Prize - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/threat-intelligence-report-september-2026){:target="_blank"}

On September 10, [Anthropic published its September 2026 threat report](https://www.anthropic.com/threat-intelligence-report-september-2026){:target="_blank"}. It covers misuse it disrupted from December 2025 through August 2026. The cases ran on Haiku, Sonnet, and Opus. Anthropic says it did not see this pattern on Fable or Mythos, except one distillation case. The developer-facing point is the supply chain: actors stole customer API keys from sandboxes, LiteLLM wrappers, and leaked repos, then used those keys to hit other AI companies. One tracked group attacked about 30 AI firms in about four days. Anthropic says its own systems were not breached.

Do not put production keys in an eval sandbox an agent can be talked into reading. Pin LiteLLM. Scan for keys in apps and git history.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### Cognition Raises $2B at a $48B Valuation - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/09/08/cognition-hits-48b-valuation-signaling-investors-believe-ai-coding-is-far-from-a-winner-take-all-market/){:target="_blank"}

On September 8, [TechCrunch reported](https://techcrunch.com/2026/09/08/cognition-hits-48b-valuation-signaling-investors-believe-ai-coding-is-far-from-a-winner-take-all-market/){:target="_blank"} that Cognition, the company behind Devin, raised $2 billion at a $48 billion valuation. [Reuters](https://www.reuters.com/technology/cognition-ai-raises-2-billion-48-billion-valuation-2026-09-08/){:target="_blank"} had the same figures. The round was led by Andreessen Horowitz, Accel, Founders Fund, General Catalyst, and Avenir. Cognition said annualized run-rate revenue went from $492 million at the May round to about $900 million. The May round was $1 billion at $26 billion. This does not change Devin's product this week. It does say investors still see room for more than one AI coding company after Cursor sold to SpaceX.

### Bending Spoons Buys Miro for $1.36B - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/09/10/bending-spoons-to-buy-collaboration-tools-maker-miro-for-1-36b-90-less-than-its-2022-valuation/){:target="_blank"}

On September 10, [Bending Spoons agreed to buy Miro](https://techcrunch.com/2026/09/10/bending-spoons-to-buy-collaboration-tools-maker-miro-for-1-36b-90-less-than-its-2022-valuation/){:target="_blank"} for $1.36 billion in cash (equity value $1.79 billion). Miro was valued at $17.5 billion in late 2021. TechCrunch said Miro now has more than 4 million paying users, 100 million total users, about $600 million in annual recurring revenue, and about $435 million in net cash. This is the same buyer that took Airtable last month.

### Salesforce Closes Its Purchase of Fin - [<i class="fas fa-external-link-alt"></i>](https://www.salesforce.com/in/news/press-releases/2026/09/12/salesforce-completes-acquisition-of-fin/){:target="_blank"}

On September 10, [Salesforce said it had completed the acquisition of Fin](https://www.salesforce.com/in/news/press-releases/2026/09/12/salesforce-completes-acquisition-of-fin/){:target="_blank"} (formerly Intercom). Fin stays a customer-service agent product under Salesforce AI Labs, next to Agentforce. Salesforce put Fin's customer count above 30,000 and said Fin's agents resolve 76% of queries on average. If you are an Intercom or Fin customer, the brand is now inside Salesforce. The press note does not list a close price.

### Lightfield Raises $47M, Cymphony Launches With $25M - [<i class="fas fa-external-link-alt"></i>](https://www.prnewswire.com/news-releases/lightfield-raises-47-million-series-a-to-build-the-crm-for-companies-that-run-on-agents-302874024.html){:target="_blank"}

On September 9, [Lightfield raised a $47 million Series A](https://www.prnewswire.com/news-releases/lightfield-raises-47-million-series-a-to-build-the-crm-for-companies-that-run-on-agents-302874024.html){:target="_blank"} led by Andreessen Horowitz. It is a CRM built so agents and people share the same customer record. The company said more than 5,000 companies have signed up since November. The same day, [Cymphony launched](https://techcrunch.com/2026/09/09/sequoia-doubles-down-on-cymphony-as-ai-agents-create-new-enterprise-security-risks/){:target="_blank"} with a $25 million Series A co-led by Sequoia and SMBC Fin Atlas Beyond Fund, on top of a Sequoia seed, $30 million in total. Cymphony maps what employees and agents can reach inside company systems.

### Layoffs: Oracle Adds $700M to Its Cut Plan

*   **Oracle:** On September 11, [Oracle said](https://www.channelnewsasia.com/business/oracle-spend-700-million-more-restructuring-costs-it-ramps-up-ai-spending-6378456){:target="_blank"} it would add about $700 million to its fiscal 2026 restructuring plan, taking the expected cost to about $2.8 billion. The company had already booked about $2.1 billion. [Bloomberg](https://www.bloomberg.com/news/articles/2026-09-11/oracle-boosts-layoffs-plan-by-700-million){:target="_blank"} described the extra money as more job cuts while Oracle funds AI data centers. The disclosure was in the quarterly filing after the August 31 quarter. Oracle did not publish a new headcount for this increment.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **974** Microsoft-product CVEs Rapid7 counted on September 8 Patch Tuesday
- **$2 Billion** Cognition Series E, at a **$48 Billion** valuation
- **$1.36 Billion** cash Bending Spoons is paying for Miro
- **$700 Million** added to Oracle's 2026 restructuring plan, now about **$2.8 Billion**
- **$47 Million** Lightfield Series A
- **$25 Million** Cymphony Series A ($30 million total disclosed)
- **153.0.8010.36** Chrome build that patches CVE-2026-87491
- **2026.3.1.14** N-able N-central build that patches CVE-2026-86218
- **September 11, 2026** CISA due date for Magento CVE-2026-75650 and N-able CVE-2026-86218

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Adobe Magento hotfix** - September 7. APSB26-146. CVE-2026-75650. Apply `VULN-39341`, then rotate keys.
*   **Shai-Hulud npm** - September 7. Four packages, hours on the registry, then `0.0.1-security`.
*   **Patch Tuesday** - September 8. 974 Microsoft CVEs. CVE-2026-85880 and CVE-2026-81963 exploited.
*   **Chrome 153** - September 8. CVE-2026-87491 in V8. Update to 153.0.8010.36 or later.
*   **Cognition $2B** - September 8. Devin maker at $48 billion. a16z and Accel in the lead set.
*   **Copilot JetBrains sandbox** - September 8. Enterprise-managed policies in public preview. `/ide` in Copilot CLI.
*   **CISA four KEVs** - September 8. Magento, two Windows bugs, N-able N-central.
*   **Nx Plugin for AWS 1.0** - September 8. Generators for APIs, sites, databases, and Bedrock AgentCore.
*   **React 19.3** - September 9. `react@19.3.0`. View Transitions and Fragment Refs are stable.
*   **ADK for Kotlin 1.0** - September 9. `google-adk-kotlin-core:1.0.0`.
*   **Copilot managed permissions** - September 9. Business and Enterprise. Shell, files, network domains.
*   **CISA four more KEVs** - September 9. Fortinet, Citrix NetScaler, Chrome V8, Cisco FMC.
*   **Lightfield $47M** - September 9. a16z-led Series A for an agent CRM.
*   **Cymphony $25M** - September 9. Sequoia and SMBC. Agent and employee access mapping.
*   **OpenAI Agents API** - September 10. `client.beta.agents.sessions.create`. Header `agents=v1`.
*   **Cursor Projects** - September 10. Coordinator agent. Cloud by default. Beta for all users.
*   **GitHub Actions `cache-mode`** - September 10. GA on all plans. `read`, `write`, `write-only`, `none`.
*   **Anthropic threat report** - September 10. Stolen API keys and agent frameworks, Dec 2025 to Aug 2026.
*   **Miro / Bending Spoons** - September 10. $1.36 billion cash. Down from a $17.5 billion 2021 valuation.
*   **Salesforce / Fin** - September 10. Intercom successor now inside Salesforce.
*   **CISA MikroTik** - September 10. CVE-2026-67277 and CVE-2026-86060.
*   **Copilot review auto-resolve** - September 11. Comments close when a later commit addresses them.
*   **Google / Mechanize** - September 11. [Business Insider](https://www.businessinsider.com/google-completes-deal-for-ai-agents-startup-mechanize-2026-9){:target="_blank"} said Google completed a talent deal previously reported above $1.5 billion. Terms were not disclosed.
*   **Oracle restructuring** - September 11. Extra $700 million. Plan now about $2.8 billion.
*   **Amodei pacing essay** - September 12. Embedded evaluators first. Altman said OpenAI will match that piece.

---

The week was two new ways to run long agent jobs, a React release you can actually animate with, and a Patch Tuesday that will eat the rest of the month. The Agents API and Cursor Projects are both in beta if your account has them. Magento, Chrome, Windows, and those four npm packages are the patch list. Next week, watch whether the Agents API picks up a stable version pin, and whether Adobe follows the Magento hotfix with a full Commerce release. See you then.
