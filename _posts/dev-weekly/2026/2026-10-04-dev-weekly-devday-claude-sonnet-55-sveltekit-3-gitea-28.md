---
layout: post
seo: true
title: "Dev Weekly Sep 28-Oct 4, 2026: OpenAI DevDay, Claude Sonnet 5.5, SvelteKit 3, Gitea 28"
subtitle: "OpenAI's DevDay shipped GPT-6.1 Sol at one-fifth of Astra's price and always-on agents called dots, Anthropic shipped Claude Sonnet 5.5 with a breaking migration, SvelteKit 3 moved config into Vite, and Gitea dropped the 1. prefix."
date: 2026-10-04
categories: tech-news
permalink: /dev-weekly/2026/sep-28-oct-4/devday-claude-sonnet-55-sveltekit-3-gitea-28/
share-img: /assets/img/posts/dev_weekly/tech-news-28sep-4oct-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-28sep-4oct-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-28sep-4oct-2026.png
description: "Dev Weekly for September 28 to October 4, 2026: OpenAI DevDay, Claude Sonnet 5.5, SvelteKit 3, and Gitea 28. On September 29 OpenAI's DevDay in San Francisco shipped gpt-6.1-sol at $2 per million input tokens and $10 per million output tokens, one-fifth of GPT-6 Astra, with cached input at $0.10, plus always-on agents called dots, an Ultrafast tier for Astra, Codex in the cloud, and a Decisions API preview. On September 28 Anthropic released Claude Sonnet 5.5 as claude-sonnet-5-5 at the same $2 and $10, with cache reads at $0.20, and said requests that turn thinking off must use between_tools. On October 1 SvelteKit 3.0 moved configuration into vite.config.ts and renamed the $lib alias to #lib. On September 30 Gitea 28.0.0 dropped the 1. version prefix, and GitHub Enterprise Cloud started refusing self-hosted Actions runners below 2.329.0. Also this week: Gemini 4 Argon at an introductory $2 and $10 for vetted cyber defenders only, Next.js 16.3.8 and 15.5.27, a Linux npm worm in nine fake Express and React packages, Chrome 154.0.8037.92, CISA KEV additions for Apple, Cisco, FortiMail, and Zammad, stateless GitHub App tokens about 520 characters long, AMD's $8.2 billion all-stock deal for World Labs, and Disney tech layoffs."
keywords: "dev weekly September 28 October 4 2026, software developer news September 28 to October 4 2026, OpenAI DevDay 2026 September 29 San Francisco GPT-6.1 Sol dots Ultrafast Pro 500 Codex cloud Decisions API, Claude Sonnet 5.5 claude-sonnet-5-5 $2 $10 cache read $0.20 between_tools September 28 2026, SvelteKit 3.0 sv migrate sveltekit-3 vite.config.ts #lib October 1 2026, GPT-6.1 Sol gpt-6.1-sol $2 $10 cached $0.10 272K, Gitea 28.0.0 version prefix RUN_RETENTION_DAYS Git 2.25 September 30 2026, GitHub Actions self-hosted runner 2.329.0 September 29 2026, Gemini 4 Argon Fairwind $2 $10 then $4 $20 1M output tokens September 30 2026, dots GPT-6 Astra cloud computer, Next.js 16.3.8 15.5.27 CVE-2026-94483 GHSA-cjq9-62q9-8jv4, DirtyBlanket npm xeprews express-nodejs react-nodejs supply chain security, Chrome 154.0.8037.92, CISA KEV CVE-2026-86950 CVE-2026-76504 CVE-2026-104286 CVE-2026-102489 CVE-2026-102490, GitHub App installation token ghs_ stateless 520 characters, Copilot computer use /computer on, AMD World Labs $8.2 billion Fei-Fei Li, Disney layoffs tech, cloud security vulnerability management enterprise AI supply chain security observability DevOps agentic coding software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from September 28 to October 4, 2026?"
    answer: "OpenAI held DevDay on September 29 and shipped GPT-6.1 Sol as gpt-6.1-sol at $2 per million input tokens and $10 per million output tokens, one-fifth of GPT-6 Astra, plus always-on agents called dots. The day before, Anthropic released Claude Sonnet 5.5 as claude-sonnet-5-5 at the same $2 and $10, and requests that used to turn thinking off now need between_tools. SvelteKit 3.0 shipped on October 1, and Gitea 28.0.0 dropped the old 1. version prefix."
  - question: "How do I switch to Claude Sonnet 5.5?"
    answer: "Set the model to claude-sonnet-5-5. It is on the Claude API, Amazon Bedrock, Google Cloud, Microsoft Foundry, and the Claude Platform on AWS. List price matches Sonnet 5: $2 input, $10 output, and $0.20 cache reads per million tokens. Cache writes are $2.50. If a request sets thinking to disabled, that call now returns a 400. Use between_tools to keep up-front thinking off. Thinking budgets, sampling parameters, assistant prefill, and forced tool choice also return a 400. In Claude Code you can run /claude-api migrate this project to claude-sonnet-5-5. GitHub Copilot is rolling it out to Pro, Pro+, Max, Business, and Enterprise."
  - question: "What does GPT-6.1 Sol cost, and where can I call it?"
    answer: "The API id is gpt-6.1-sol. Standard price is $2 per million input tokens, $0.10 cached, and $10 output. Cache writes are $2.50. Context is 1,050,000 tokens. Once a prompt passes 272,000 input tokens, the whole request is billed at 2x input and cache rates and 1.5x output. It does not accept a reasoning effort of none. Use low or higher, and use the Responses API for tool calls. It is in the API, ChatGPT Work, and Codex for Plus, Pro, Business, Enterprise, and Edu. Copilot is adding it for Pro+, Max, Business, and Enterprise. It is not in Chat yet."
  - question: "How do I upgrade to SvelteKit 3?"
    answer: "From the app, run npx sv migrate sveltekit-3. The sv CLI hit 1.0 the same day, October 1. Configuration moves from svelte.config.js to vite.config.ts. The $lib alias becomes #lib. New apps start with npx sv create my-new-app. Remote functions are still behind an experimental Async Svelte flag."
  - question: "What should I patch or change after this week's news?"
    answer: "Install next@16.3.8 or next@15.5.27. On GitHub Enterprise Cloud, upgrade self-hosted Actions runners. Runners below 2.329.0 can no longer register, and a higher build is required to run jobs. If a Linux install pulled xeprews, express-javascript, express-nodejs, exprdd, exprrdd, exptrdd, exptred, exptredd, or react-nodejs, treat that host as exposed and rotate SSH keys and npm tokens. Update Chrome to 154.0.8037.92 or later. If you store GitHub App installation tokens, allow about 520 characters. Gitea admins should read the 28.0.0 breaking changes before replacing the binary."
---

OpenAI used DevDay to put GPT-6.1 Sol on sale at one-fifth of Astra's token price, and to launch always-on agents that keep their own computer. The day before, Anthropic put a much stronger Sonnet on that same $2 and $10 price, and some existing API calls will 400 until you change them. Google announced a new frontier model the day after DevDay, and almost nobody can call it yet.

The releases you can install this week are SvelteKit 3 and Gitea 28. GitHub also started blocking old self-hosted Actions runners. Here is the week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### OpenAI DevDay Ships GPT-6.1 Sol, Dots, and Ultrafast - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/devday-2026-recap){:target="_blank"}

On September 29, OpenAI held DevDay in San Francisco and put more than 20 launches on stage. The one you can call today is GPT-6.1 Sol, for coding, computer use, and professional work. The API id is `gpt-6.1-sol`. [Standard price](https://developers.openai.com/api/docs/models/gpt-6.1-sol){:target="_blank"} is $2 per million input tokens, $0.10 cached, and $10 output. Cache writes are $2.50. That is one-fifth of GPT-6 Astra's $10 and $50. Context is 1,050,000 tokens. Knowledge cutoff is April 30, 2026. Past 272,000 input tokens, the whole request bills at 2x input and cache rates and 1.5x output.

It does not accept a reasoning effort of `none`. Start at `low`. Tool calls go through the Responses API. It is in the API, in ChatGPT Work, and in Codex for Plus, Pro, Business, Enterprise, and Edu. It is not in Chat yet. GitHub Copilot is rolling it out to Pro+, Max, Business, and Enterprise. Pro is not on that list. OpenAI did not ship a GPT-6.1 Astra.

The other DevDay pieces change how the agents run, not just which model you pick. Dots are always-on agents on GPT-6 Astra. Each one has its own cloud computer and can connect to plugins. The first dot is included for Pro and Business Premium users in eligible markets. Enterprise, including Edu and Healthcare, is a beta an admin has to turn on. Pro access excludes the European Economic Area, Switzerland, and the UK at launch. For the next month, that usage does not count against plan allowances. Ultrafast is a faster tier for Astra. OpenAI said it runs up to 8 times faster in Codex, at up to 6 times the standard price, and a new Pro 500 plan includes it along with 25 times the usage of Plus. Codex can now run in the cloud as well as on your machine. A Decisions API, in limited preview, uses Luna to pick from a fixed set of answers for routing and classification.

### Claude Sonnet 5.5 Jumps on Coding, and Old Thinking Flags 400 - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/claude-sonnet-5-5){:target="_blank"}

On September 28, [Anthropic released Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5){:target="_blank"}. The API id is `claude-sonnet-5-5`. Input is $2 per million tokens and output is $10, the same list price as Sonnet 5. Cache reads are $0.20. Cache writes are $2.50. Anthropic says it uses fewer tokens, so typical tasks cost up to 30% less, and that output is more than 30% faster. Context is 1 million tokens. Max output is 128,000.

On Terminal-Bench 4.0, Anthropic reports 70.6% for Sonnet 5.5 against 10.3% for Sonnet 5. Opus 5.5 is still the model they want for open-ended work. Higher-risk cybersecurity tasks fall back to Sonnet 5. Routine bug fixing stays on 5.5. Biology safeguards match Sonnet 5. Haiku 5.5 is promised in the coming weeks.

Calls that set thinking to `disabled` now return a 400. So do thinking budgets, sampling parameters, assistant prefill, and forced tool choice. To keep up-front thinking off, set thinking to `between_tools`. In Claude Code, `/claude-api migrate this project to claude-sonnet-5-5` applies the model swap and asks before it edits files. Default effort is Medium in Claude Code and the apps, and High on the Claude Platform. [GitHub Copilot](https://github.blog/changelog/2026-09-28-claude-sonnet-5-5-in-github-copilot/){:target="_blank"} is rolling it out to Pro, Pro+, Max, Business, and Enterprise at list price.

### SvelteKit 3 Moves Config into Vite - [<i class="fas fa-external-link-alt"></i>](https://svelte.dev/blog/sveltekit-3-is-here){:target="_blank"}

On October 1, [SvelteKit 3.0 shipped](https://svelte.dev/blog/sveltekit-3-is-here){:target="_blank"}. Configuration now lives in `vite.config.ts` instead of `svelte.config.js`. The `$lib` alias is now `#lib`, using standard subpath imports. Environment variables, service workers, and error handling also changed.

Upgrade with `npx sv migrate sveltekit-3`. The same day, [the sv CLI hit 1.0](https://svelte.dev/blog/whats-new-in-svelte-october-2026){:target="_blank"}, and the community add-on API is official. New apps start with `npx sv create my-new-app`. Remote functions, the type-safe client-server helpers, still need Async Svelte, which is behind an experimental flag.

### Gitea 28 Drops the 1. and Deletes Old Action Runs - [<i class="fas fa-external-link-alt"></i>](https://blog.gitea.com/release-of-28.0.0/){:target="_blank"}

On September 30, [Gitea released 28.0.0](https://blog.gitea.com/release-of-28.0.0/){:target="_blank"}. The project dropped the historical `1.` prefix, so this is 28.0.0, not 1.28.0. Highlights include audit logging, bot accounts, HTTPS deploy tokens, admin user impersonation, code-owner approval rules, and an Actions queue view. Security fixes are in the build. Gitea said the details will be added to the post in about a week.

Read the breaking changes before you replace the binary. Completed Actions runs are deleted after 400 days by default, including jobs, logs, and artifacts. Set `RUN_RETENTION_DAYS = 0` under `[actions]` to keep them. Gitea refuses to start on Git older than 2.25.0. Self-registration is off unless you set `[service] DISABLE_REGISTRATION = false`. `[server] DOMAIN` is ignored. The instance domain now comes from `ROOT_URL`. Migrations and mirrors go through a new egress proxy, and the `external` preset is gone. Release binaries no longer include 32-bit x86 or `gogit` builds.

### GitHub Enterprise Cloud Blocks Old Self-Hosted Runners - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-28-self-hosted-runner-version-enforcement-date-has-moved/){:target="_blank"}

On September 29, [GitHub started enforcing a minimum Actions runner version](https://github.blog/changelog/2026-09-28-self-hosted-runner-version-enforcement-date-has-moved/){:target="_blank"} on GitHub Enterprise Cloud. Self-hosted runners below `2.329.0` cannot register or reregister. Existing runners below the higher version required to run jobs stop taking work, even if they registered earlier. GitHub Enterprise Server is not affected. Enforcement for Enterprise Cloud with data residency already began on July 31.

Upgrade the runner fleet before the next job. GitHub's REST API for runner version deprecations can report the registration and runtime dates for a given build.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Data-Residency GitHub Stops Accepting X25519-Only TLS - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-30-x25519-only-tls-ends-for-ghe-com-on-september-15/){:target="_blank"}

On September 30, GitHub said that on October 7 GitHub Enterprise Cloud with data residency will refuse TLS clients that offer only X25519 for key agreement. Browsers, current GitHub CLI builds, and common TLS libraries already offer P-256, so most clients are fine. If a proxy or library is pinned to X25519 only, enable `secp256r1` before October 7. SSH is not affected. github.com is not affected.

### GitHub App Installation Tokens Are Now About 520 Characters - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-02-stateless-github-app-installation-tokens-rolled-out/){:target="_blank"}

On October 2, [GitHub finished the rollout of stateless installation tokens](https://github.blog/changelog/2026-10-02-stateless-github-app-installation-tokens-rolled-out/){:target="_blank"}. New GitHub App installation tokens use the `ghs_APPID_JWT` form. They still start with `ghs_`, and they are about 520 characters instead of 40. Permissions, repository scope, the one-hour expiry, and the REST endpoint are unchanged. Tokens minted before the change keep working until they expire.

Anything that assumes a 40-character token will break. Check database columns, secret stores, proxies that trim `Authorization` headers, and log redaction that only matches the short pattern. The temporary `X-GitHub-Stateless-S2S-Token` header stops working on November 30, 2026.

---

## <i class="fas fa-robot"></i> AI & Models

### Gemini 4 Argon Is Announced, and Almost Nobody Can Call It - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/){:target="_blank"}

On September 30, [Google announced Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/){:target="_blank"}. It is rolling out first to trusted cyber defenders in the Fairwind program, while Google is in the U.S. government's voluntary pre-release review. Paid API customers and Google AI Ultra subscribers are next. Google has not published a date or an API model id.

The introductory price is $2 per million input tokens and $10 per million output tokens. Cached input is 95% off the input price. After that introductory period, the price is $4 and $20. The output limit is 1 million tokens, up from 64,000. Google has not published the input context window.

### Copilot Can Drive Desktop Apps - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-01-github-copilot-can-now-interact-with-desktop-apps/){:target="_blank"}

On October 1, computer use reached public preview in Copilot CLI and the Copilot app on macOS and Windows. Copilot can read a window, click, type, and move between apps. Turn it on with `/computer on`. It asks before it controls an app. Organization settings can disable it.

The same day, [dynamic workflows](https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app/){:target="_blank"} landed in the CLI, the Copilot app, and the Copilot SDK. An extension can script the steps around one or more agents. In the CLI, enable them with `/experimental on`.

---

## <i class="fas fa-shield-alt"></i> Security

### Next.js 16.3.8 and 15.5.27 Patch Image SSRF and Cache Poisoning - [<i class="fas fa-external-link-alt"></i>](https://nextjs.org/blog/september-2026-security-release){:target="_blank"}

On September 30, [Vercel shipped the delayed September security release](https://nextjs.org/blog/september-2026-security-release){:target="_blank"}. Install `next@16.3.8` on the 16.3 line or `next@15.5.27` on 15.5.

The high bug is CVE-2026-94483, GHSA-cjq9-62q9-8jv4. If `images.remotePatterns` is set, an attacker-controlled URL on that allow list can make Image Optimization request a private address. Apps with no remote patterns are not affected. CVE-2026-94543 can poison the cache of self-hosted Pages Router SSG and ISR pages so one route serves another route's content until revalidation. Vercel-hosted apps are not affected by that one. The release also covers Draft Mode leaking into cached pages, metadata image routes ignoring `dynamicParams` on webpack builds, and a low-severity leak on the `next dev` MCP endpoint. Production servers do not expose that endpoint.

### Nine npm Packages Tried to Spread a Linux Worm - [<i class="fas fa-external-link-alt"></i>](https://www.ossprey.com/blog/new-worm-targets-npm-and-aur){:target="_blank"}

On September 29, the npm account `dirtyblanket` published nine packages in 33 minutes. Eight copy Express 5.2.1: `xeprews`, `express-javascript`, `express-nodejs`, `exprdd`, `exprrdd`, `exptrdd`, `exptred`, and `exptredd`. One copies React as `react-nodejs` 19.3.0. Each adds a `preinstall` hook. On Linux, the hook installs a Tor-backed backdoor as a fake systemd font service, then tries to spread with SSH keys, npm tokens, and Arch AUR package files. macOS and Windows installs do not run that payload. The registry unpublished all nine the same day.

Search lockfiles, CI caches, and base images for those names. A hit on a Linux host means rotate the SSH keys and npm tokens that were on it. The worm can republish the victim's own packages, so a familiar name is not a clean one if the `preinstall` script changed.

### Chrome 154.0.8037.92, and Four Days of Exploited Bugs - [<i class="fas fa-external-link-alt"></i>](https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_01807488085.html){:target="_blank"}

On September 29, [Chrome stable moved to 154.0.8037.92](https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_01807488085.html){:target="_blank"} for Linux, and 154.0.8037.92 or .93 for Windows and Mac. This is another security batch on top of last week's 154.0.8037.57. Extended Stable for Windows and Mac moved to 152.0.7977.149 the same day. Open Help, About Google Chrome, and relaunch.

[CISA added exploited bugs through the week](https://www.cisa.gov/news-events/alerts/2026/10/01/cisa-adds-one-known-exploited-vulnerability-catalog){:target="_blank"}. September 29: CVE-2026-86950, an out-of-bounds write in Apple CoreGraphics on iOS, macOS, and iPadOS. September 30: CVE-2026-76504, a hex-encoding bug in Cisco Catalyst SD-WAN Manager. October 1: CVE-2026-104286, path traversal in Fortinet FortiMail that can let an unauthenticated attacker write files. The Canadian Centre for Cyber Security lists fixes in FortiMail 8.0.2, 7.6.7, and 7.4.9, and says 7.2 should move to 7.4 or newer. October 2: CVE-2026-102489 and CVE-2026-102490, session fixation and privilege management in Zammad. The FortiMail catalog due date is October 4.

### Laravel AI 1.0.1 Closes an SSRF in File URLs - [<i class="fas fa-external-link-alt"></i>](https://laravel-news.com/laravel-ai-mcp-security-advisories){:target="_blank"}

On September 30, [Laravel published fixes for two official packages](https://laravel-news.com/laravel-ai-mcp-security-advisories){:target="_blank"}. `laravel/ai` 1.0.0 can be talked into fetching a client-supplied file URL, including a cloud metadata address, when the Vercel or AG-UI adapter is exposed. Install `1.0.1`. `laravel/mcp` below `0.9.6`, and `1.0.0`, had a weak OAuth redirect check. Install `0.9.6` or `1.0.1`.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### AMD Agrees to Buy World Labs for $8.2 Billion - [<i class="fas fa-external-link-alt"></i>](https://newsroom.amd.com/news/amd-acquire-world-labs/){:target="_blank"}

On September 28, [AMD agreed to acquire World Labs](https://newsroom.amd.com/news/amd-acquire-world-labs/){:target="_blank"} for about $8.2 billion in stock. World Labs, led by Fei-Fei Li, builds models that generate and simulate 3D environments. After close, she joins AMD as executive vice president and chief scientist, reporting to Lisa Su. AMD expects the deal to close by the end of 2026 if regulators approve.

### Layoffs: Disney Cuts Tech Staff Again

*   **Disney:** On September 29, [Business Insider reported a third round](https://www.businessinsider.com/disney-layoffs-tech-september-round-ceo-josh-damaro-2026-9){:target="_blank"} under CEO Josh D'Amaro. A person familiar with the move said several hundred people were cut, including tech and HR. Deadline reported it first.
*   **Klaviyo:** On October 1, the [Boston Business Journal reported cuts](https://www.bizjournals.com/boston/news/2026/10/01/klaviyo-cuts-roles-in-design-product.html){:target="_blank"} in product and design at the marketing software company. The story did not give a headcount. The last reported round, about a year ago, was under 100 people in R&D.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$2 / $10** Claude Sonnet 5.5 and GPT-6.1 Sol input and output, per million tokens
- **$0.20** Sonnet 5.5 cache reads. **$0.10** GPT-6.1 Sol cached input
- **70.6%** Sonnet 5.5 on Terminal-Bench 4.0, against **10.3%** for Sonnet 5, Anthropic's figures
- **272,000** input tokens, the point where GPT-6.1 Sol bills the whole request at long-context rates
- **3.0** SvelteKit. Config moves to `vite.config.ts`. `$lib` becomes `#lib`
- **28.0.0** Gitea, with the `1.` prefix gone. Actions runs expire after **400** days unless you set retention to 0
- **2.329.0** the GitHub Actions runner build that can no longer register on Enterprise Cloud
- **520** approximate character length of a new GitHub App installation token
- **16.3.8** and **15.5.27** the Next.js builds for the September security release
- **154.0.8037.92** Chrome stable build from September 29
- **$2 / $10** Gemini 4 Argon introductory price, then **$4 / $20**. Output limit **1 million** tokens
- **$8.2 Billion** AMD's all-stock deal for World Labs

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Claude Sonnet 5.5** - September 28. `claude-sonnet-5-5` at $2, $10, and $0.20 cache reads. `between_tools` replaces thinking off.
*   **Copilot Sonnet 5.5** - September 28. Pro, Pro+, Max, Business, and Enterprise.
*   **AMD and World Labs** - September 28. About $8.2 billion, all stock. Close targeted for the end of 2026.
*   **Actions runner minimum** - September 28. Enforcement began September 29 on Enterprise Cloud. Registration floor is `2.329.0`.
*   **OpenAI DevDay** - September 29. `gpt-6.1-sol` at $2, $0.10 cached, and $10. Dots on Astra. Ultrafast for Astra. No GPT-6.1 Astra.
*   **DirtyBlanket npm packages** - September 29. Nine names, unpublished the same day. Linux `preinstall` worm.
*   **Chrome 154.0.8037.92** - September 29. Security update on top of last week's 154 build.
*   **CISA, Apple** - September 29. CVE-2026-86950 in CoreGraphics.
*   **Disney cuts** - September 29. Several hundred, including tech and HR.
*   **Gitea 28.0.0** - September 30. No more `1.` prefix. Git 2.25 required. Actions retention defaults to 400 days.
*   **Gemini 4 Argon** - September 30. Introductory $2 and $10. Fairwind defenders first. No public model id.
*   **Next.js 16.3.8** - September 30. `15.5.27` on the 15.5 line. Image SSRF and cache poisoning.
*   **Laravel AI and MCP** - September 30. `laravel/ai` `1.0.1`. `laravel/mcp` `0.9.6` or `1.0.1`.
*   **CISA, Cisco SD-WAN** - September 30. CVE-2026-76504.
*   **GHE.com TLS** - September 30. On October 7, data-residency hosts stop accepting clients that offer only X25519.
*   **SvelteKit 3** - October 1. `npx sv migrate sveltekit-3`. `sv` 1.0 the same day.
*   **Copilot computer use** - October 1. `/computer on` in the CLI and the Copilot app. macOS and Windows.
*   **CISA, FortiMail** - October 1. CVE-2026-104286. Catalog due date October 4.
*   **Klaviyo** - October 1. Product and design cuts. No headcount in the report.
*   **GitHub App tokens** - October 2. New installation tokens are about 520 characters.
*   **CISA, Zammad** - October 2. CVE-2026-102489 and CVE-2026-102490.

---

DevDay put GPT-6.1 Sol on the same $2 and $10 as Sonnet 5.5, and neither id is a drop-in copy of last week's models. SvelteKit apps move config into Vite before the new alias works. Gitea 28 will start deleting old Actions runs unless you set retention to 0, and Enterprise Cloud has already stopped old self-hosted runners. Next week, watch whether Google publishes an Argon model id, and whether Claude Haiku 5.5 shows up. See you then.
