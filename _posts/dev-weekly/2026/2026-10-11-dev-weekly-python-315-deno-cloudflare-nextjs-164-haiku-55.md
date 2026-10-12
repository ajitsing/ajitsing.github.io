---
layout: post
seo: true
title: "Dev Weekly Oct 5-11, 2026: Python 3.15, Deno Joins Cloudflare, Next.js 16.4, Claude Haiku 5.5"
subtitle: "Python 3.15 adds lazy imports and makes UTF-8 the default text encoding, the Deno team joins Cloudflare and winds the runtime down over a year, Next.js 16.4 turns Cache Components on for new apps, and Claude Haiku 5.5 lands at $0.10 and $0.50."
date: 2026-10-11
categories: tech-news
permalink: /dev-weekly/2026/oct-5-11/python-315-deno-cloudflare-nextjs-164-haiku-55/
share-img: /assets/img/posts/dev_weekly/tech-news-5-11oct-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-5-11oct-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-5-11oct-2026.png
description: "Dev Weekly for October 5 to 11, 2026: Python 3.15, Deno joins Cloudflare, Next.js 16.4, and Claude Haiku 5.5. On October 9 Python 3.15.0 shipped with lazy imports, frozendict, UTF-8 as the default encoding, and an experimental JIT that Python measures at 7-8% faster on x86-64 Linux. The same day the Deno team joined Cloudflare: the runtime gets one more year of fixes, then development stops, and Deno Deploy shuts down in six months. On October 6 Vercel published Next.js 16.4, which turns Cache Components on for new create-next-app projects. On October 7 Anthropic released Claude Haiku 5.5 as claude-haiku-5-5 at $0.10 and $0.50 per million tokens for prompts up to 100,000 tokens, and cut Sonnet 5.5 cache reads from $0.20 to $0.10. Also this week: GitHub Copilot local sandboxing is generally available, Kubernetes said the cgroup v1 fallback is scheduled for removal in 1.38, a fake security-audit.yml workflow hit about 345 GitHub repos, Django 6.1.2, Chrome 155 with 247 security fixes, and HubSpot layoffs of nearly 660 people."
keywords: "dev weekly October 5 11 2026, software developer news October 5 to 11 2026, Python 3.15.0 lazy import frozendict PEP 686 UTF-8 PYTHONUTF8 October 9 2026, Deno joins Cloudflare runtime one year Deno Deploy six months JSR workerd celld October 9 2026, Next.js 16.4 cacheComponents partialPrefetching ensureStatic create-next-app React 19.3 October 6 2026, Claude Haiku 5.5 claude-haiku-5-5 $0.10 $0.50 cache read $0.01 100000 tokens October 7 2026, Sonnet 5.5 cache reads $0.10, GitHub Copilot local sandboxing MXC October 7 2026, Kubernetes cgroup v2 failCgroupV1 removal 1.38 October 6 2026, GhostAction security-audit.yml October 8 2026 supply chain security, Django 6.1.2 6.0.9 5.2.18 CVE-2026-84429 CVE-2026-87975, Chrome 155.0.8059.39 247 security fixes, PostgreSQL JDBC 42.7.14 CVE-2026-107314, HubSpot layoffs 660 7 percent October 6 2026, Gemini agent private preview October 8 2026, cloud security enterprise AI vulnerability management observability DevOps software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from October 5 to 11, 2026?"
    answer: "Python 3.15.0 shipped on October 9 with lazy imports, a frozendict built-in, and UTF-8 as the default text encoding. The same day, the Deno team joined Cloudflare and said the Deno runtime gets one more year of fixes before they stop developing it. Next.js 16.4 turns Cache Components on for new apps, and Anthropic released Claude Haiku 5.5 at $0.10 per million input tokens for short prompts."
  - question: "What changes when I install Python 3.15?"
    answer: "Text files opened without an encoding, such as open('notes.txt'), now use UTF-8. Set PYTHONUTF8=0 or pass -X utf8=0 to keep the old behavior. You can write lazy import json at module scope, or set PYTHON_LAZY_IMPORTS=all. frozendict and sentinel are new builtins. The experimental JIT stays opt-in. On x86-64 Linux, Python reports a 7-8% geometric mean gain for the JIT over the standard interpreter."
  - question: "What happens to Deno after the Cloudflare deal?"
    answer: "The Deno team is joining Cloudflare to merge celld into workerd so the Workers model is easier to self-host. Cloudflare will ship monthly Deno bugfix and security releases for one year, then stop developing the runtime. Deno stays open source. Deno Deploy keeps running for six months, with migration help for paying customers moving to Workers. JSR keeps running, and its infrastructure moves to Cloudflare."
  - question: "How do I upgrade to Next.js 16.4?"
    answer: "Install next@16.4.0. New apps from create-next-app have Cache Components on by default. Existing apps turn the model on with cacheComponents and partialPrefetching set to true in next.config.ts. export const ensureStatic = 'navigation' fails the build if a page still renders at request time. Vercel's agent upgrade command in the release post is npx next@canary upgrade --agent=latest."
  - question: "How much does Claude Haiku 5.5 cost, and where can I call it?"
    answer: "The API id is claude-haiku-5-5. For prompts up to 100,000 tokens, input is $0.10 per million, cache reads are $0.01, cache writes are $0.125, and output is $0.50. Over 100,000 tokens, those prices are $0.50, $0.05, $0.625, and $2.50. Context is 1 million tokens and max output is 128,000. It is on the Claude API, Amazon Bedrock, Google Cloud, Microsoft Foundry, and the Claude Platform on AWS. GitHub Copilot is rolling it out to Pro, Pro+, Max, Business, and Enterprise. Requests that send temperature, top_p, top_k, a thinking budget, or assistant prefill return a 400."
---

Python 3.15 is out. Lazy imports are real syntax now, and opening a text file without an encoding uses UTF-8. The same day, the people who built Deno joined Cloudflare and put an end date on the runtime.

Next.js 16.4 turns Cache Components on for every new app. Anthropic put Claude Haiku 5.5 on sale at a tenth of the old Haiku sticker price for short prompts, and cut what you pay to reread a Sonnet 5.5 cache. Here is the week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Python 3.15 Makes Imports Lazy and Text UTF-8 - [<i class="fas fa-external-link-alt"></i>](https://blog.python.org/2026/10/python-3150-final-is-here/){:target="_blank"}

On October 9, [Python 3.15.0 shipped](https://blog.python.org/2026/10/python-3150-final-is-here/){:target="_blank"}. It is the stable release of the 3.15 series: 5,643 commits from 1,012 contributors. The language changes you will type are `lazy` imports, a `frozendict` built-in, a `sentinel` built-in, and `*` unpacking inside comprehensions.

`lazy import json` does not load the module until you use the name. It is only legal at module scope. A failure shows up at first use, not at the import line. For a whole process, set `PYTHON_LAZY_IMPORTS=all`, or use `-X lazy_imports=all`. `sys.set_lazy_imports_filter()` can keep third-party imports eager. Libraries that still run on older Python can list names in `__lazy_modules__` and keep a normal `import`.

[Text I/O now defaults to UTF-8](https://docs.python.org/3/whatsnew/3.15.html){:target="_blank"}, whatever the machine locale says (PEP 686). `open('notes.txt')` with no encoding uses UTF-8. To keep the old locale encoding, set `PYTHONUTF8=0` or pass `-X utf8=0`. `frozendict` is immutable and hashable when its contents are. It inherits from `object`, so `isinstance(value, dict)` is false.

The experimental JIT is faster, and it stays opt-in. Python's pyperformance numbers are a 7-8% geometric mean gain over the standard interpreter on x86-64 Linux, and an 11-12% gain over the tail-calling interpreter on Apple silicon Macs. The official Windows 64-bit builds now use that tail-calling interpreter. The official macOS installer now includes free-threading support. Frame pointers are on by default, for profilers. `cProfile` remains as an alias of `profiling.tracing`. The new sampling profiler is `profiling.sampling`. The old `profile` module is deprecated and set for removal in 3.17.

### The Deno Team Joins Cloudflare, and the Runtime Gets One Year - [<i class="fas fa-external-link-alt"></i>](https://deno.com/blog/cloudflare){:target="_blank"}

On October 9, [Ryan Dahl said the Deno team is joining Cloudflare](https://deno.com/blog/cloudflare){:target="_blank"}. The goal is to make the Workers programming model easy to run on your own machines, by folding Deno's celld project into Cloudflare's workerd runtime. [Kenton Varda's post](https://blog.cloudflare.com/deno-joins-cloudflare/){:target="_blank"} says Dahl and Bert Belder will lead that self-hosting work. The price was not disclosed.

The dates for current users are concrete. Cloudflare will ship monthly Deno releases with bug fixes and security updates for one year. After that year, the team stops developing the runtime. The code stays open source. Deno Deploy keeps running for six months, then shuts down. Paying customers get help moving to Workers. JSR stays up, and its infrastructure moves to Cloudflare. The team will keep supporting `rusty_v8` and work on bringing it into workerd.

If you ship on Deno, this is a migration clock, not a new runtime to install. A year of patches is the support window. New work goes into self-hosted Workers.

### Next.js 16.4 Turns Cache Components On for New Apps - [<i class="fas fa-external-link-alt"></i>](https://nextjs.org/blog/next-16-4){:target="_blank"}

On October 6, [Vercel published Next.js 16.4](https://nextjs.org/blog/next-16-4){:target="_blank"}. Cache Components, the `'use cache'` model, is what they now recommend for every app. It becomes the default in Next.js 17. As of this release, `create-next-app` turns it on for new projects. The package is `next@16.4.0`, tagged the next day. The release also includes React 19.3.

Existing apps opt in with two flags:

```ts
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};
```

`export const ensureStatic = 'navigation'` fails the build if any dynamic content lands in that page, so a request-time component cannot sneak into a route you wanted fully static. `'prefetch'` and `'shell'` are the looser settings. A layout can set the same export for every page under it.

Vercel also wants agents to do the move. The command in the release post is `npx next@canary upgrade --agent=latest`. Hand upgrades are `npm install next@16.4.0`.

### Claude Haiku 5.5 Costs a Tenth of Haiku 4.5 on Short Prompts - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/claude-haiku-5-5){:target="_blank"}

On October 7, [Anthropic released Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5){:target="_blank"}. The API id is `claude-haiku-5-5`. For prompts up to 100,000 tokens, input is $0.10 per million, cache reads are $0.01, cache writes are $0.125, and output is $0.50. Haiku 4.5 is $1 and $5. Over 100,000 tokens, Haiku 5.5 jumps to $0.50 input and $2.50 output, with cache reads at $0.05. Anthropic says about 90% of Haiku 4.5 requests were in the cheaper band, and that a typical run costs about 75% less after the new tokenizer. The same text counts as about 30% more tokens than on Haiku 4.5.

Context is 1 million tokens. Max output is 128,000, up from 64,000. Adaptive thinking is on by default. You can still set thinking to `disabled` at high effort or below. A thinking budget, `temperature`, `top_p`, `top_k`, and assistant prefill return a 400. The old computer-use tool id `computer_20250124` also 400s. Use `computer_toolset_20260801` on the Claude API and Google Cloud, or `computer_20251124` on Amazon Bedrock. On Terminal-Bench 4.0, Anthropic reports 39.2% for Haiku 5.5, against 0.0% for Haiku 4.5 and 70.6% for Sonnet 5.5.

The same day, Sonnet 5.5 cache reads dropped from $0.20 to $0.10 per million tokens. Anthropic says that is about 20% off most agent work, because cache reads are a large share of the bill. Input and output stay $2 and $10. Max and Team subscribers are also getting monthly Claude Platform credits this week: $100 for Max 5x, $200 for Max 20x, and up to $500 pooled for a Team. [GitHub Copilot](https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/){:target="_blank"} is rolling Haiku 5.5 out to Pro, Pro+, Max, Business, and Enterprise, billed at list price.

### Copilot Local Sandboxing Is Generally Available - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available){:target="_blank"}

On October 7, [local sandboxing reached general availability](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available){:target="_blank"} in Copilot CLI, the Copilot app, and VS Code sessions that use Agent Host. Commands the agent runs can be limited to certain files, networks, and credentials. The sandbox is Microsoft eXecution Container (MXC), which maps one policy onto Windows, macOS, and Linux controls. It applies to tool runs no matter which model you picked. Enterprise settings can require it so a developer cannot loosen the policy. It is included with Copilot at no extra charge.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Kubernetes Sets a Removal Version for cgroup v1 - [<i class="fas fa-external-link-alt"></i>](https://kubernetes.io/blog/2026/10/06/kubernetes-cgroups-v2-shift/){:target="_blank"}

On October 6, [Kubernetes published the migration note](https://kubernetes.io/blog/2026/10/06/kubernetes-cgroups-v2-shift/){:target="_blank"} for the cgroup v1 shutdown. The kubelet default already flipped in 1.35: `failCgroupV1` is `true`, so the kubelet does not start on a cgroup v1 node. Admins can set `failCgroupV1: false` for now. The post says that fallback is scheduled for removal in Kubernetes 1.38. Removal work is tracked in KEP-5573.

cgroup v2 needs a Linux kernel of 5.8 or later (5.9 or later if you use Memory QoS), and a runtime that supports it, such as containerd 1.4 or later or CRI-O 1.20 or later. Anything that reads cgroup files directly, including some Java and Node memory heuristics, needs a build that understands v2. Check nodes before the next upgrade. A leftover v1 node fails kubelet startup under the default.

### JetBrains Drops Swift Editing from the KMP Plugin - [<i class="fas fa-external-link-alt"></i>](https://blog.jetbrains.com/kotlin/2026/10/discontinuing-swift-language-ide-support-in-the-kotlin-multiplatform-plugin/){:target="_blank"}

On October 5, [JetBrains said Swift language features are leaving the Kotlin Multiplatform plugin](https://blog.jetbrains.com/kotlin/2026/10/discontinuing-swift-language-ide-support-in-the-kotlin-multiplatform-plugin/){:target="_blank"}. Starting with IntelliJ IDEA 2026.3 and Android Studio Rabbit 2 (2026.2.2), the plugin no longer edits Swift, highlights it, or jumps between Swift and Kotlin. Running an iOS app and debugging Kotlin on iOS still work. Swift Export and importing Swift packages into Kotlin are unchanged. Older IDE builds keep the Swift features and will not get further updates. JetBrains does not plan a replacement.

### Draft Pull Requests Count Toward GitHub Limits - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-08-draft-pull-requests-count-toward-pull-request-limits){:target="_blank"}

On October 8, [GitHub let repositories count draft pull requests toward pull request limits](https://github.blog/changelog/2026-10-08-draft-pull-requests-count-toward-pull-request-limits){:target="_blank"}. The limit used to ignore drafts. Maintainers who set a cap can now include them. The same day, [users with the triage role or higher](https://github.blog/changelog/2026-10-08-triage-role-users-or-higher-can-now-archive-pull-requests){:target="_blank"} can archive and unarchive pull requests. That used to be administrators only.

### SVG 2 Gets a New Candidate Snapshot, and Roughtime Is an RFC - [<i class="fas fa-external-link-alt"></i>](https://www.w3.org/news/2026/updated-candidate-recommendation-scalable-vector-graphics-svg-2/){:target="_blank"}

On October 6, the [W3C published an updated Candidate Recommendation Snapshot of SVG 2](https://www.w3.org/news/2026/updated-candidate-recommendation-scalable-vector-graphics-svg-2/){:target="_blank"} and asked for implementations. On October 5, [RFC 10049](https://www.rfc-editor.org/info/rfc10049/){:target="_blank"} published Roughtime, a protocol for rough time synchronization.

---

## <i class="fas fa-robot"></i> AI & Models

### Google's Gemini Agent Is in Private Preview - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-at-work/){:target="_blank"}

On October 8, at Gemini at Work, [Google Cloud announced the Gemini agent](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-at-work/){:target="_blank"}. It is a single workplace agent that can take an objective, plan steps, use tools, and write or run code. It is in private preview in the Gemini Enterprise app, in Workspace, and through third-party apps. In Gmail, Docs, Sheets, Slides, and Chat you invoke it with `@Gemini`. Google said wider availability is coming for selected Business and Enterprise Workspace plans. There is no public API model id in the announcement.

### Nova 2.5 Sonic and GLM 5.3 Land on AWS - [<i class="fas fa-external-link-alt"></i>](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-nova-2.5-sonic/){:target="_blank"}

On October 5, [Amazon Nova 2.5 Sonic reached general availability](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-nova-2.5-sonic/){:target="_blank"}. It is a speech-to-speech model for real-time voice agents. The same day, [GLM 5.3 from Z.ai reached general availability on Amazon Bedrock](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-bedrock-glm-5-3/){:target="_blank"} for agentic coding. On October 8, [Ultrafast mode for OpenAI's GPT-6.1 Sol](https://aws.amazon.com/about-aws/whats-new/2026/10/openai-gpt-sol-ultrafast-amazon/){:target="_blank"} also reached Bedrock, for calls where latency matters more than the standard rate.

---

## <i class="fas fa-shield-alt"></i> Security

### A Fake Security Audit Workflow Hit Hundreds of GitHub Repos - [<i class="fas fa-external-link-alt"></i>](https://www.stepsecurity.io/blog/ghostaction-returns){:target="_blank"}

On October 8, the GhostAction campaign used compromised maintainer accounts to commit a workflow named `security-audit.yml`. [StepSecurity counted 345 repositories](https://www.stepsecurity.io/blog/ghostaction-returns){:target="_blank"} in two bursts: 27 from the account of pyxel author Takashi Kitao starting at 13:20 UTC, then 318 from henrywoo, an author of Uber's athenadriver, between 21:10 and 21:26 UTC. [Socket counted 346](https://socket.dev/blog/ghostaction-cloud-credentials){:target="_blank"}, including `kitao/pyxel` and `uber/athenadriver`. The commits landed with the maintainers' own accounts.

The workflow runs on push, checks out full history, and sends GitHub Actions secrets plus credential-shaped strings from the tree and the history to an attacker server. If `security-audit.yml` or `github_actions_security.yml` showed up in a repo you maintain, treat the Actions secrets and any matching keys in git history as exposed. Remove the workflow, revoke the maintainer credentials, and rotate those secrets from a clean machine.

### Django 6.1.2, 6.0.9, and 5.2.18 Patch Header and Formset Bugs - [<i class="fas fa-external-link-alt"></i>](https://www.djangoproject.com/weblog/2026/oct/06/security-releases/){:target="_blank"}

On October 6, [Django shipped 6.1.2, 6.0.9, and 5.2.18](https://www.djangoproject.com/weblog/2026/oct/06/security-releases/){:target="_blank"}. The moderate issues are the ones to read. CVE-2026-84429 is a denial of service in HTTP header parsing: a quoted parameter with many separators can burn CPU, and an unauthenticated request can hit it through `Accept` or `Content-Type`. CVE-2026-87975 lets forged formset POST data delete objects outside the queryset, or create rows in an edit-only formset, when the primary key is editable. A default `BigAutoField` primary key is outside this bug. CVE-2026-87890 changes spatial lookups: raster bytes must now be wrapped in `GDALRaster`, or GDAL can be talked into fetching a remote file. That one is backward incompatible.

On October 8, Django [stopped taking new security reports through HackerOne](https://www.djangoproject.com/weblog/2026/oct/08/django-security-reporting-update/){:target="_blank"}. Email `security@djangoproject.com` instead. Reports already on HackerOne stay open.

### Chrome 155 Ships 247 Security Fixes - [<i class="fas fa-external-link-alt"></i>](https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop_086471744.html){:target="_blank"}

On October 6, [Chrome stable moved to 155.0.8059.39 and .40 for Windows and Mac, and 155.0.8059.39 for Linux](https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop_086471744.html){:target="_blank"}. Google lists 247 security fixes. Four are critical use-after-free bugs: CVE-2026-106382 in Chromecast, CVE-2026-106197 in Browser, CVE-2026-106358 in Navigation, and CVE-2026-106347 in Track. Google does not list any of them as exploited in the wild. Extended Stable for Windows and Mac moved to 152.0.7977.158 the same day. On October 7, an early stable build, 156.0.8078.12 and .13, started for a small share of Windows and Mac users. Open Help, About Google Chrome, and relaunch for the 155 build.

On October 8, CISA added five older bugs to the known exploited list: CVE-2015-3306 in ProFTPD, CVE-2015-5477 in BIND, CVE-2016-3081 in Apache Struts, CVE-2021-3199 in ONLYOFFICE Docs, and CVE-2023-22894 in Strapi. If any of those versions are still in production, they are on the actively exploited list now.

### Next.js Will Patch Three Upstream Bugs on October 14 - [<i class="fas fa-external-link-alt"></i>](https://nextjs.org/blog/upcoming-nextjs-security-update-october-2026){:target="_blank"}

On October 8, [Vercel said an out-of-band Next.js security update is planned for October 14](https://nextjs.org/blog/upcoming-nextjs-security-update-october-2026){:target="_blank"}. It covers three bugs in upstream dependencies: two critical and one high. Two of the fixes were held out of the September release while upstream coordinated. Vercel has not published the affected versions or the patched build yet. Those details come with the October 14 release.

### PostgreSQL JDBC 42.7.14 Fixes a requireAuth Bypass - [<i class="fas fa-external-link-alt"></i>](https://jdbc.postgresql.org/security/){:target="_blank"}

On October 7, the PostgreSQL JDBC driver [released 42.7.14](https://www.postgresql.org/about/news/2026-10-07-postgresql-jdbc-42714-security-update-for-multiple-cves-3399/){:target="_blank"}. CVE-2026-107314 affects 42.7.11 through 42.7.13. If `requireAuth` excludes every method the driver knows, or names no method at all, the setting was ignored and the driver would accept a cleartext password. A positive list such as `requireAuth=scram-sha-256` was already enforced. After the upgrade, a broken exclusion fails the connection with SQLState `08004`. Replace it with the methods your server actually uses. The release also fixes CVE-2026-107315. The bug applies when `requireAuth` is set to an empty value or a value that excludes every method.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### Layoffs: HubSpot Cuts About 7% of Staff

*   **HubSpot:** On October 6, [HubSpot said it is cutting nearly 660 employees](https://www.bostonglobe.com/2026/10/06/business/hubspot-layoffs/){:target="_blank"}, about 7% of the company. CEO Yamini Rangan told staff the company is reorganizing around customer outcomes with AI. She said the layoffs follow that reorganization. A filing puts the restructuring charge at about $65 million to $75 million, mostly severance. HubSpot expects the cuts to be substantially done by the end of the first quarter of fiscal 2027.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **3.15.0** Python, released October 9. **5,643** commits from **1,012** contributors
- **UTF-8** the default text encoding. Turn it off with `PYTHONUTF8=0`
- **7-8%** Python's geometric mean for the experimental JIT on x86-64 Linux
- **1 year** of Deno bugfix and security releases, then development stops. **6 months** until Deno Deploy shuts down
- **16.4.0** Next.js. New `create-next-app` projects enable Cache Components
- **$0.10 / $0.50** Claude Haiku 5.5 input and output, per million tokens, for prompts up to 100,000 tokens
- **$0.01** Haiku 5.5 cache reads in that band. **$0.10** Sonnet 5.5 cache reads, down from $0.20
- **39.2%** Haiku 5.5 on Terminal-Bench 4.0, Anthropic's figure, against **70.6%** for Sonnet 5.5
- **1.38** the Kubernetes version scheduled to remove the cgroup v1 fallback
- **345** repositories StepSecurity tied to the October 8 `security-audit.yml` burst
- **6.1.2**, **6.0.9**, and **5.2.18** the Django security releases
- **247** security fixes in Chrome 155.0.8059.39
- **42.7.14** the PostgreSQL JDBC build for the `requireAuth` bug
- **660** HubSpot roles cut, about **7%**. Restructuring charge **$65 million to $75 million**

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Kotlin Multiplatform** - October 5. Swift editing leaves the plugin in IntelliJ IDEA 2026.3 and Android Studio Rabbit 2.
*   **Roughtime** - October 5. RFC 10049, a protocol for rough time synchronization.
*   **Nova 2.5 Sonic** - October 5. Speech-to-speech model, generally available.
*   **GLM 5.3** - October 5. Generally available on Amazon Bedrock.
*   **Next.js 16.4** - October 6. `next@16.4.0`. Cache Components on for new apps. `cacheComponents` and `partialPrefetching` for existing ones.
*   **Chrome 155** - October 6. 155.0.8059.39. 247 security fixes, four of them critical.
*   **Django security releases** - October 6. 6.1.2, 6.0.9, and 5.2.18.
*   **HubSpot cuts** - October 6. Nearly 660 people, about 7%.
*   **SVG 2** - October 6. Updated Candidate Recommendation Snapshot.
*   **cgroup v1** - October 6. Kubernetes schedules fallback removal for 1.38. The kubelet already refuses v1 by default since 1.35.
*   **Claude Haiku 5.5** - October 7. `claude-haiku-5-5` at $0.10 and $0.50 under 100,000 tokens. Sonnet 5.5 cache reads fall to $0.10.
*   **Copilot Haiku 5.5** - October 7. Pro, Pro+, Max, Business, and Enterprise.
*   **Copilot local sandbox** - October 7. Generally available in the CLI, the Copilot app, and VS Code Agent Host.
*   **PostgreSQL JDBC 42.7.14** - October 7. `requireAuth` that excludes every method was ignored on 42.7.11 through 42.7.13.
*   **GhostAction** - October 8. `security-audit.yml` on about 345 repositories.
*   **Gemini agent** - October 8. Private preview. `@Gemini` in Workspace. No public model id.
*   **GPT-6.1 Sol Ultrafast** - October 8. Available on Amazon Bedrock.
*   **Next.js security notice** - October 8. Patched builds planned for October 14. Two critical, one high, all upstream.
*   **Django reports** - October 8. New reports go to `security@djangoproject.com`, not HackerOne.
*   **GitHub pull request limits** - October 8. Drafts can count. Triage role can archive pull requests.
*   **CISA KEV** - October 8. ProFTPD, BIND, Struts, ONLYOFFICE Docs, and Strapi added.
*   **Python 3.15.0** - October 9. `lazy` imports. `open()` defaults to UTF-8. `PYTHONUTF8=0` opts out.
*   **Deno and Cloudflare** - October 9. One year of runtime fixes. Deno Deploy shuts down in six months.

---

Python 3.15 changes text encoding for every `open()` that does not pass one, and the Deno runtime now has a one-year support clock. New Next.js apps start on Cache Components. Haiku 5.5 is the cheap id for short prompts, and Sonnet 5.5 cache reads are $0.10. Next week, watch the October 14 Next.js security build, and whether Google opens the Gemini agent beyond the private preview. See you then.
