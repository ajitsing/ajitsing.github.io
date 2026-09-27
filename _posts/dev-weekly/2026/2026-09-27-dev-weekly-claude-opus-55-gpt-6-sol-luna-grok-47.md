---
layout: post
seo: true
title: "Dev Weekly Sep 21-27, 2026: Claude Opus 5.5, GPT-6 Sol and Luna, Grok 4.7, Next.js RCE"
subtitle: "Anthropic shipped Claude Opus 5.5 at $4 per million input tokens, OpenAI halved GPT-6 Sol and Luna prices, xAI released Grok 4.7, Next.js patched a critical image bug, and GitHub Actions dropped Node 20."
date: 2026-09-27
categories: tech-news
permalink: /dev-weekly/2026/sep-21-27/claude-opus-55-gpt-6-sol-luna-grok-47/
share-img: /assets/img/posts/dev_weekly/tech-news-21-27sep-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-21-27sep-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-21-27sep-2026.png
description: "Dev Weekly for September 21 to 27, 2026: Claude Opus 5.5, GPT-6 Sol and Luna, Grok 4.7, and a critical Next.js image bug. On September 22 Anthropic released Claude Opus 5.5 as claude-opus-5-5 at $4 per million input tokens and $20 per million output tokens, with cache reads at $0.20, about 40% less than Opus 5 on typical workloads. The same day OpenAI shipped gpt-6-sol at $2 and $10 and gpt-6-luna at $0.10 and $0.50, both with a 1.05 million token context, and Vercel patched CVE-2026-94545 in Next.js 16.3.6. On September 21 xAI released Grok 4.7 at $2 and $6 per million tokens in Cursor, Grok Build, the Grok API, and GitHub Copilot. On September 23 Cursor launched Rollouts and Security Review for Teams and Enterprise, GitHub Actions removed Node 20, Google shipped gemini-3.8-flash-tts, and MemTensor npm and PyPI packages were caught shipping a credential stealer. Also this week: Chrome 154.0.8037.57 with 108 security fixes, CISA KEV additions for Check Point, Arista, F5, WSO2, and Adobe Commerce, PgBouncer 1.26.0, Node.js 22.23.3, Snorkel AI's $350 million round at $3.5 billion, and a leaked count of 546 Oracle Cloud Infrastructure cuts."
keywords: "dev weekly September 21 27 2026, software developer news September 21 to 27 2026, Claude Opus 5.5 claude-opus-5-5 $4 $20 cache read $0.20 September 22 2026, GPT-6 Sol gpt-6-sol GPT-6 Luna gpt-6-luna $2 $10 $0.10 $0.50 272K context pricing, Grok 4.7 $2 $6 Cursor Grok Build GitHub Copilot September 21 2026, Next.js 16.3.6 CVE-2026-94545 GHSA-vcvr-r3jv-pc5j ImageResponse next/og, Cursor Rollouts Security Review Teams Enterprise September 23 2026, GitHub Actions Node 20 removed node24 September 23 2026, Gemini 3.8 Flash TTS gemini-3.8-flash-tts gemini-3.8-flash-lite-tts, MemTensor memos-cloud-openclaw-plugin 0.1.21 0.1.23 0.1.25 MemoryOS 2.0.34 supply chain security, Chrome 154.0.8037.57 108 security fixes, CISA KEV CVE-2026-85102 CVE-2026-93616 CVE-2026-93952 CVE-2026-94127 CVE-2026-5430 CVE-2026-71362, PgBouncer 1.26.0 CVE-2026-19888 CVE-2026-6668 CVE-2026-6669, Node.js 22.23.3 HTTP/2 use-after-free, Copilot local sandbox proof of presence Entra ID, Snorkel AI $350 million $3.5 billion, Enveda $311 million Series E, Oracle Cloud Infrastructure 546 layoffs, cloud security vulnerability management enterprise AI supply chain security observability DevOps agentic coding software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from September 21 to 27, 2026?"
    answer: "Anthropic released Claude Opus 5.5 on September 22. The API id is claude-opus-5-5, at $4 per million input tokens and $20 per million output tokens, with cache reads at $0.20. The same day OpenAI shipped GPT-6 Sol and GPT-6 Luna at half the GPT-5.6 promotional prices, and xAI had shipped Grok 4.7 the day before at $2 and $6. Next.js 16.3.6 patched a critical bug in next/og, and GitHub Actions stopped running JavaScript actions on Node 20."
  - question: "How do I switch to Claude Opus 5.5?"
    answer: "On the Claude Platform, set the model to claude-opus-5-5. It is also on Amazon Web Services, Google Cloud, and Microsoft Azure. In GitHub Copilot it is rolling out to Pro+, Max, Business, and Enterprise. List price is $4 input and $20 output per million tokens. Cache reads are $0.20. Fast mode in Claude Code and the Claude Platform is $8 and $40 and is up to 2.5 times faster. Most cybersecurity tasks are routed to Opus 4.8. API accounts created on or after August 31, 2026 also get preserved thinking, so you cannot edit Claude's prior reasoning in the thread."
  - question: "What do GPT-6 Sol and GPT-6 Luna cost?"
    answer: "Use gpt-6-sol for coding and agent work, and gpt-6-luna for high-volume tasks. Sol is $2 per million input tokens, $0.20 cached, and $10 output. Luna is $0.10, $0.01, and $0.50. Both have a 1.05 million token context window and 128,000 max output. If the prompt is over 272,000 input tokens, the whole request is billed at 2x input and cache rates and 1.5x output. They are in the API, ChatGPT Work, and Codex for paid plans. Luna is also in the desktop app for Free and Go."
  - question: "How do I patch the Next.js ImageResponse bug?"
    answer: "Install next@16.3.6. CVE-2026-94545 affects Next.js 16.2.0 through 16.3.5 when the Node.js ImageResponse from next/og puts attacker-controlled values into SVG content, attributes, or styles. There is no patched 16.2 release, so those apps move to 16.3.6. The Edge ImageResponse is not affected, and Next.js 15 is not affected by this bug. Next.js 15.5.26 is extra hardening on that line. If you cannot upgrade yet, stop passing request data into those SVG fields."
  - question: "What should I patch after this week's security news?"
    answer: "Move Next.js 16.2 and 16.3 apps to 16.3.6. Update Chrome to 154.0.8037.57 or later. Upgrade PgBouncer to 1.26.0. On Node 22, install 22.23.3. If a lockfile has @memtensor/memos-cloud-openclaw-plugin 0.1.21, 0.1.23, or 0.1.25, or MemoryOS 2.0.34, treat that machine as exposed and rotate registry, git, cloud, and SSH credentials. Set JavaScript GitHub Actions to node24. Node 20 on Actions runners is already gone."
---

Three labs shipped new models in two days, and the list prices went down or stayed put. Claude Opus 5.5 is the model Anthropic wants in place of Opus 5. OpenAI shipped cheaper Sol and Luna the same day. xAI had already put Grok 4.7 in Cursor the day before.

The patch that cannot wait is in Next.js. A social-preview image route can run code on the server if it prints request data into the picture. GitHub also turned off Node 20 for Actions. Here is the week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Claude Opus 5.5 Matches Fable-Class Work at an Opus Price - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/claude-opus-5-5){:target="_blank"}

On September 22, [Anthropic released Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5){:target="_blank"}, the first model in a 5.5 family. The API id is `claude-opus-5-5`. Input is $4 per million tokens and output is $20, which is 20% under Opus 5. Cache reads are $0.20, down from $0.50. Cache writes are $5. Anthropic says that at default settings the mix of cheaper tokens and fewer tokens comes out to about 40% less than Opus 5 on typical workloads, and that output is more than 30% faster. Fast mode, in Claude Code and the Claude Platform, is up to 2.5 times faster at $8 and $40 per million tokens.

It is on Amazon Web Services, Google Cloud, and Microsoft Azure, and on the Claude Platform. [GitHub Copilot](https://github.blog/changelog/2026-09-22-claude-opus-5-5-is-now-available-in-github-copilot/){:target="_blank"} is rolling it out to Pro+, Max, Business, and Enterprise. Pro is not on that list. Five-hour limits go up on Pro, Max, and Team, and those plans get a rate-limit reset you can save and spend later. Sonnet 5.5 and Haiku 5.5 are promised in the coming weeks.

Most cybersecurity tasks are sent to Opus 4.8. Ordinary bug fixing still runs on Opus 5.5. Biology work uses the same class of safeguards as Fable 5.1. API accounts created on or after August 31, 2026 also get preserved thinking, which blocks edits to Claude's earlier reasoning in the thread. Text output is watermarked. Thinking cannot be switched off.

### OpenAI Ships GPT-6 Sol and Luna at Half the Old Price - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/09/22/openai-launches-gpt-6-sol-and-luna/){:target="_blank"}

On September 22, [OpenAI released GPT-6 Sol and GPT-6 Luna](https://techcrunch.com/2026/09/22/openai-launches-gpt-6-sol-and-luna/){:target="_blank"}. Sol is the coding and agent model. Luna is the cheap one for high-volume work such as summaries and extraction. The API ids are `gpt-6-sol` and `gpt-6-luna`. Both take text and images, return text, and support reasoning effort from `none` through `max`, with `medium` as the default. Context is 1,050,000 tokens. Max output is 128,000.

[Sol](https://developers.openai.com/api/docs/models/gpt-6-sol){:target="_blank"} is $2 per million input tokens, $0.20 cached, and $10 output. Cache writes are $2.50. [Luna](https://developers.openai.com/api/docs/models/gpt-6-luna){:target="_blank"} is $0.10, $0.01, and $0.50, with cache writes at $0.125. OpenAI told developers this is 50% under GPT-5.6 promotional prices, and that the cut is permanent. Once a prompt passes 272,000 input tokens, the whole request is billed at 2x input and cache rates and 1.5x output. Batch and Flex are half of standard. Fast mode is 2x.

They are in the API, in ChatGPT Work, and in Codex for Plus, Pro, Business, Enterprise, and Edu. Free and Go users can try Luna in the desktop app. Copilot is adding Sol for Pro+, Max, Business, and Enterprise, and Luna for those plans plus Pro. Knowledge cutoffs are April 20, 2026 for Sol and May 18, 2026 for Luna.

### Grok 4.7 Lands in Cursor at the Same Price as 4.6 - [<i class="fas fa-external-link-alt"></i>](https://x.ai/news/grok-4-7){:target="_blank"}

On September 21, [xAI released Grok 4.7](https://x.ai/news/grok-4-7){:target="_blank"} for coding and longer knowledge work. List price starts at $2 per million input tokens and $6 per million output tokens, the same as Grok 4.6. A fast variant does twice the output speed at twice the price. It is in Cursor and Grok Build, on the Grok API, and on other coding harnesses and routers. [GitHub Copilot](https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot/){:target="_blank"} is rolling it out to Pro, Pro+, Max, Business, and Enterprise at provider list price.

xAI's own table puts Grok 4.7 at 46.3% on CursorBench 4.0, against 40.4% for Grok 4.6, 41.7% for GPT-5.6 Sol, and 51.8% for Fable 5.1. On Terminal-Bench 4.0 it is at 37.6%, in line with GPT-5.6 Sol and well under Fable 5.1 at 57.9%. The pitch is price, not a new top score.

### Next.js 16.3.6 Patches a Critical ImageResponse Bug - [<i class="fas fa-external-link-alt"></i>](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j){:target="_blank"}

On September 22, [Vercel published GHSA-vcvr-r3jv-pc5j](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j){:target="_blank"}, CVE-2026-94545, a critical bug in the Node.js `ImageResponse` from `next/og`. CVSS 4.0 is 9.5. Affected versions are `>= 16.2.0 < 16.3.6`. The route is exposed when attacker-controlled values reach SVG content, attributes, or styles while the image is built. Vercel says that can lead to remote code execution. The Edge implementation of `ImageResponse` is not affected. Next.js 15 is not in the affected range.

Install `next@16.3.6`. There is no fixed 16.2 build, so apps on 16.2 move up to 16.3.6. Next.js 15.5.26 shipped the same day as extra hardening for `next/og` on the 15 line. If you cannot upgrade yet, stop passing request data into those SVG fields on the Node runtime.

### Cursor Adds Rollouts and a Security Review Bot - [<i class="fas fa-external-link-alt"></i>](https://cursor.com/blog/rollouts-and-security-reviewer){:target="_blank"}

On September 23, [Cursor shipped two bots](https://cursor.com/blog/rollouts-and-security-reviewer){:target="_blank"} for Teams and Enterprise. Turn them on from the automations tab.

Rollouts follows a change from the pull request into production. You connect source control, the deploy system, and telemetry such as Datadog, Grafana, or Honeycomb. Before merge it writes a monitoring plan from the diff. After deploy it compares those signals with the pre-deploy baseline. On a regression it can ping the author, pause a progressive rollout, or open a revert pull request for approval. Feature flags and deploy freezes are listed as coming soon.

Security Review reads each pull request against the rest of the repo and reports injection, broken auth, committed secrets, unsafe deserialization, unvalidated redirects, known-bad dependency bumps, and insecure config. Each finding has a severity, an attack path, and a proposed fix. The same day, [Cursor said harness changes](https://cursor.com/blog/improved-token-efficiency){:target="_blank"} cut token costs about 7% on longer agent runs without a quality drop.

### GitHub Actions Stops Running Node 20 - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/){:target="_blank"}

On September 23, [GitHub removed Node 20 from Actions runners](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/){:target="_blank"}. Runners now use Node 24 for JavaScript actions. The escape hatch `ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION` no longer works. This applies to github.com and GitHub Enterprise Cloud with data residency.

If you maintain a JavaScript action, set `runs.using` to `node24` and publish a new release. If you only consume actions, move workflows to versions that already declare Node 24. Node 24 does not support macOS 13.4 and earlier, or ARM32. Self-hosted runners on those systems are no longer supported.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Google Ships Gemini 3.8 Text-to-Speech - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/){:target="_blank"}

On September 23, [Google launched two speech models](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/){:target="_blank"}. The creative one is `gemini-3.8-flash-tts`. The high-volume one is `gemini-3.8-flash-lite-tts`. Both are rolling out in the Gemini API and Google AI Studio. [Google's model card](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts){:target="_blank"} lists Flash TTS for studio narration and multi-speaker dialogue across 130 languages, and Flash-Lite TTS as the replacement for `gemini-3.1-flash-tts-preview`, with 101 languages. Input limit is 8,192 tokens. Output limit is 16,384. Enterprise API access is described as coming soon. Flash-Lite TTS is also headed to Google Vids.

### Copilot App Sandbox, and a Presence Check for Enterprise Cloud - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-23-local-sandboxing-in-the-github-copilot-app/){:target="_blank"}

On September 23, [the Copilot app gained a local sandbox](https://github.blog/changelog/2026-09-23-local-sandboxing-in-the-github-copilot-app/){:target="_blank"} in public preview. It is off by default. In app settings, pick the project and turn on Sandbox new sessions. That covers new local repository and working-tree sessions, not ones already running, and not cloud or remote sessions. You can also type `/sandbox on` in an active local session. Filesystem, network, and git or GitHub CLI credential rules are per project. If the OS cannot enforce the policy, the shell errors instead of running unsandboxed. Copilot CLI sandbox settings stay separate.

On September 24, [Enterprise Cloud can require proof of presence](https://github.blog/changelog/2026-09-24-require-proof-of-presence-for-high-impact-actions/){:target="_blank"} before high-impact actions. A member must sign in again or pass a multi-factor challenge. The public preview is only for managed-user enterprises on github.com and GitHub Enterprise Cloud with data residency that use Microsoft Entra ID, through SAML or OIDC.

---

## <i class="fas fa-shield-alt"></i> Security

### MemTensor Packages on npm and PyPI Shipped a Credential Stealer - [<i class="fas fa-external-link-alt"></i>](https://socket.dev/blog/memtensor-compromise){:target="_blank"}

On September 23, [Socket reported malicious releases](https://socket.dev/blog/memtensor-compromise){:target="_blank"} of MemTensor's MemOS packages. On npm, `@memtensor/memos-cloud-openclaw-plugin` versions `0.1.21`, `0.1.23`, and `0.1.25` are bad. `0.1.20`, `0.1.22`, and `0.1.24` are the clean ones, and the registry latest tag later pointed at `0.1.24`. On PyPI, `MemoryOS` `2.0.34` is the bad release. `2.0.33` is clean, and the `2.0.34` files were pulled. The payload is a Go binary named `sckit` that starts when the plugin loads or the Python module is imported, then looks for npm, PyPI, GitHub, GitLab, AWS, Vault, and SSH secrets. Reports tie the traffic to `skyleen.fr`.

If any environment loaded those versions, treat the host as compromised, including CI that only ran tests. Pin the clean versions, kill leftover `sckit` processes, and rotate credentials that were on that machine.

### Chrome 154 Fixes 108 Bugs - [<i class="fas fa-external-link-alt"></i>](https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_0856730748.html){:target="_blank"}

On September 22, [Chrome stable moved to 154](https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_0856730748.html){:target="_blank"}. Linux is `154.0.8037.57`. Windows and Mac are `154.0.8037.57` or `.58`. Google listed 108 security fixes. [SecurityWeek counted 11 as critical](https://www.securityweek.com/chrome-154-patches-108-vulnerabilities/){:target="_blank"}, including buffer overflows in ANGLE and WebGL and an out-of-bounds write in the GPU, plus 25 high-severity bugs. Google did not say any of these were exploited in the wild. Open Help, About Google Chrome, and relaunch.

### CISA Adds Exploited Bugs in Check Point, Arista, F5, WSO2, and Adobe Commerce - [<i class="fas fa-external-link-alt"></i>](https://www.cisa.gov/news-events/alerts/2026/09/22/cisa-adds-four-known-exploited-vulnerabilities-catalog){:target="_blank"}

On September 22, [CISA added four vulnerabilities](https://www.cisa.gov/news-events/alerts/2026/09/22/cisa-adds-four-known-exploited-vulnerabilities-catalog){:target="_blank"} to the known-exploited list. CVE-2026-85102 is improper certificate validation in multiple Check Point products. CVE-2026-93616 is path traversal in multiple Check Point products. CVE-2026-93952 is improper input validation in Arista VeloCloud Orchestrator. CVE-2026-94127 is a heap-based buffer overflow in F5 BIG-IP APM.

On September 24, [CISA added two more](https://www.cisa.gov/news-events/alerts/2026/09/24/cisa-adds-two-known-exploited-vulnerabilities-catalog){:target="_blank"}. CVE-2026-5430 is path traversal in multiple WSO2 products. CVE-2026-71362 is incorrect authorization in Adobe Commerce and Magento. Patch from the vendor advisories for the products you actually run. Federal agencies are on the clock under the current operational directive.

### PgBouncer 1.26.0 and Node 22.23.3 Close Crash Bugs - [<i class="fas fa-external-link-alt"></i>](https://www.postgresql.org/about/news/pgbouncer-1260-released-fixes-three-cves-3385/){:target="_blank"}

On September 23, [PgBouncer 1.26.0](https://www.postgresql.org/about/news/pgbouncer-1260-released-fixes-three-cves-3385/){:target="_blank"} fixed three denial-of-service bugs. CVE-2026-19888 lets an unauthenticated client crash the process with a SCRAM message that has no nonce. CVE-2026-6668 is an integer overflow that can stick packet-buffer growth in a loop, and an unauthenticated client can reach it. CVE-2026-6669 lets a hostile Postgres server stall login with an unbounded SCRAM iteration count. Upgrade to `1.26.0`. The release also removes the deprecated online restart flag, `-R`.

The same day, [Node.js 22.23.3](https://nodejs.org/en/blog/release/v22.23.3){:target="_blank"} landed on the 22 LTS line. The notes include a use-after-free fix in HTTP/2 when a reset races with data still being received. Newer Node lines already had that fix. If you are still on 22, install `22.23.3`.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### Snorkel Raises $350M at $3.5B - [<i class="fas fa-external-link-alt"></i>](https://snorkel.ai/blog/data-2-0-and-the-research-era-of-ai-data/){:target="_blank"}

On September 22, [Snorkel AI raised a $350 million Series E at a $3.5 billion valuation](https://snorkel.ai/blog/data-2-0-and-the-research-era-of-ai-data/){:target="_blank"}. Insight and S32 led. Third Point, March, Blumberg, Allegis, Standard VC, and Frontline joined. Addition, Lightspeed, Greylock, GV, and Factory were already investors. Snorkel sells the datasets, evals, and environments behind frontier and enterprise agents, and said the round funds a lab for that data work.

On September 23, [Enveda raised a $311 million Series E at a $2 billion valuation](https://techcrunch.com/2026/09/23/enveda-secures-311m-to-bring-more-nature-derived-ai-drugs-into-clinical-trials/){:target="_blank"}. Catalio Capital Management led. Iconiq participated. The company uses AI to look for drugs in plants and microbes, and said the round doubles last year's valuation.

### Layoffs: Oracle Cloud Infrastructure Cut List Leaks

*   **Oracle:** On September 22, [Business Insider reported a leaked list](https://www.businessinsider.com/oracle-cloud-layoffs-america-roles-hit-hardest-leaked-doc-2026-9){:target="_blank"} of 546 people cut from Oracle's America Cloud Infrastructure organization, about 7.6% of the 7,185 employees on that list. Managers, engineers, software developers, and data-center staff were among the hardest hit. This is detail on the round that started last week, the same one behind the 378-person California WARN.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$4 / $20** Claude Opus 5.5 input and output, per million tokens. Cache reads are **$0.20**
- **40%** less than Opus 5 on typical workloads, Anthropic's figure at default settings
- **$2 / $10** GPT-6 Sol. **$0.10 / $0.50** GPT-6 Luna
- **272,000** input tokens, the point where Sol and Luna bill the whole request at long-context rates
- **$2 / $6** Grok 4.7 starting price, same as Grok 4.6
- **16.3.6** Next.js build that patches CVE-2026-94545
- **9.5** CVSS score Vercel assigned that Next.js bug
- **154.0.8037.57** Chrome build with 108 security fixes
- **1.26.0** PgBouncer release that fixes three denial-of-service CVEs
- **22.23.3** Node.js 22 LTS build with the HTTP/2 use-after-free fix
- **node24** the only JavaScript runtime left on GitHub Actions
- **$350 Million** Snorkel round, at a **$3.5 Billion** valuation
- **$311 Million** Enveda Series E, at a **$2 Billion** valuation
- **546** Oracle America Cloud Infrastructure roles on the leaked cut list

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Grok 4.7** - September 21. $2 and $6 per million tokens. Cursor, Grok Build, the Grok API, and Copilot.
*   **Claude Opus 5.5** - September 22. `claude-opus-5-5` at $4, $20, and $0.20 cache reads.
*   **GPT-6 Sol and Luna** - September 22. `gpt-6-sol` and `gpt-6-luna`. Half of GPT-5.6 promotional prices.
*   **Next.js 16.3.6** - September 22. CVE-2026-94545 in Node.js `ImageResponse`. 16.2 apps move up.
*   **Chrome 154** - September 22. `154.0.8037.57`. 108 security fixes.
*   **CISA, four products** - September 22. Check Point, Arista VeloCloud, F5 BIG-IP APM.
*   **Snorkel $350M** - September 22. Series E at $3.5 billion. Insight and S32 led.
*   **Oracle cloud cut list** - September 22. Business Insider: 546 roles in America Cloud Infrastructure.
*   **Cursor Rollouts** - September 23. Security Review too. Teams and Enterprise.
*   **Cursor token costs** - September 23. Harness changes cut costs about 7%.
*   **GitHub Actions Node 20** - September 23. Gone. Set actions to `node24`.
*   **Copilot local sandbox** - September 23. Public preview. Off until you enable it. `/sandbox on`.
*   **Gemini 3.8 TTS** - September 23. `gemini-3.8-flash-tts` and `gemini-3.8-flash-lite-tts`.
*   **PgBouncer 1.26.0** - September 23. Three denial-of-service CVEs. `-R` is gone.
*   **Node.js 22.23.3** - September 23. HTTP/2 use-after-free fix on the 22 LTS line.
*   **MemTensor packages** - September 23. Bad npm `0.1.21`, `0.1.23`, `0.1.25`. Bad PyPI `MemoryOS` `2.0.34`.
*   **Enveda $311M** - September 23. Series E at $2 billion. Catalio led.
*   **CISA, WSO2 and Adobe** - September 24. CVE-2026-5430 and CVE-2026-71362.
*   **GitHub proof of presence** - September 24. Re-auth for high-impact actions. Entra ID enterprises only.

---

Four models showed up in two days, and the bill on an agent run depends on which id you put in the request. The breakages are already live: Next.js image routes on 16.2 and 16.3.5, PgBouncer before 1.26.0, and any JavaScript action that still says Node 20. Next week, watch for Claude Sonnet 5.5 and whether the new Copilot model pickers finish rolling out. See you then.
