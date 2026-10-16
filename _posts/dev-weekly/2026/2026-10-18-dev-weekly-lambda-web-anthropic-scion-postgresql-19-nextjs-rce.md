---
layout: post
seo: true
title: "Dev Weekly Oct 12-18, 2026: Lambda Web Functions, Anthropic Scion, PostgreSQL 19, Next.js RCE"
subtitle: "Anthropic replaces git with Scion after merges pass 30,000 a day, Lambda Web Functions run a normal Node.js server, PostgreSQL 19 RC 1 targets November 19, and Next.js patches two critical remote code execution bugs."
date: 2026-10-18
categories: tech-news
permalink: /dev-weekly/2026/oct-12-18/lambda-web-anthropic-scion-postgresql-19-nextjs-rce/
share-img: /assets/img/posts/dev_weekly/tech-news-12-18oct-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-12-18oct-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-12-18oct-2026.png
description: "Dev Weekly for October 12 to 18, 2026: Lambda Web Functions, Anthropic Scion, PostgreSQL 19 RC 1, and Next.js remote code execution patches. On October 13 Anthropic said it migrated its monorepo from git to Scion, an in-house version control system, in five months, after merges rose from about 2,500 a day in May to over 30,000 a day in September. On October 12 AWS launched Lambda Web Functions, a Node.js 24 HTTP server on Arm64 that listens on AWS_LAMBDA_HTTP_ENDPOINT and deploys with aws lambda-web deploy. On October 15 PostgreSQL 19 RC 1 shipped, with general availability planned for November 19. On October 13 Google released Gemini 4 Argon as gemini-4-argon at $2 and $10 per million tokens through November 30, then $4 and $20. On October 14 Next.js 16.4.1 and 15.5.28 patched two critical unauthenticated remote code execution bugs. Also this week: GitHub Actions workflow lockfiles, .NET 11 Release Candidate 2, Ruby 4.1.0-preview1, Firefox Enterprise, Microsoft's October Patch Tuesday of 1,415 CVEs including exploited CVE-2026-96951, PgBouncer 1.26.1, a Docker Hub token advisory, a Meta GitHub breach, Netflix layoffs of about 1,000 people, and Character.AI's Chapter 11 filing with a $20 million Disney license bid."
keywords: "dev weekly October 12 18 2026, software developer news October 12 to 18 2026, Anthropic Scion in-house source control October 13 2026 Antique git monorepo 30000 merges scn scion-daemon, AWS Lambda Web Functions October 12 2026 nodejs24.x AWS_LAMBDA_HTTP_ENDPOINT aws lambda-web deploy active CPU $0.30 per million requests, PostgreSQL 19 RC 1 October 15 2026 GA November 19 REPACK CONCURRENTLY pg_plan_advice wal_level replica, GitHub Actions workflow lockfiles actions.lock gh actions-lock October 14 2026 supply chain security, .NET 11 RC 2 go-live October 13 2026 min-publish-age-hours NuGet, Gemini 4 Argon gemini-4-argon $2 $10 November 30 2026 $4 $20 GitHub Copilot, Next.js 16.4.1 15.5.28 GHSA-673q-mjm6-r5xr GHSA-2464-fhr4-w9xw CVE-2026-96889 React 19.3.1, Ruby 4.1.0-preview1 Ractor local GC YJIT Windows, Firefox Enterprise Gecko October 12 2026, Microsoft Patch Tuesday October 13 2026 1415 CVEs CVE-2026-96951 CVE-2026-108398 vulnerability management, PgBouncer 1.26.1 CVE-2026-107350, Docker Hub CVE-2026-105445, Meta GitHub breach 1500, Node.js security releases October 21 2026, Netflix layoffs 1000, Character.AI Chapter 11 Disney $20 million, Airtable Bending Spoons layoffs, cloud security enterprise AI observability DevOps software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from October 12 to 18, 2026?"
    answer: "AWS launched Lambda Web Functions on October 12, so a normal Node.js HTTP server can run on Lambda without an adapter. The same week Anthropic said it replaced git with Scion, an in-house version control system, after monorepo merges passed 30,000 a day. PostgreSQL 19 RC 1 shipped on October 15, with general availability planned for November 19. Next.js 16.4.1 and 15.5.28, out October 14, patch two critical remote code execution bugs."
  - question: "How do I deploy a Lambda Web Function?"
    answer: "Your server listens on the host and port in AWS_LAMBDA_HTTP_ENDPOINT. The launch runtime is nodejs24.x on Arm64, with 2 vCPUs, 2 GB of memory, and up to 128 concurrent requests in one environment. A starter deploy is aws lambda-web deploy --name hello-world --hello-world. For your own app, aws lambda-web deploy --name my-web-app --code ./my-app. It is in US East (N. Virginia), US East (Ohio), US West (Oregon), Asia Pacific (Tokyo), and Europe (Ireland). In N. Virginia on Arm, requests are $0.30 per million, active CPU is $0.0000276944 per vCPU-second, and memory is $0.0000036667 per GB-second for as long as the environment runs."
  - question: "When does PostgreSQL 19 ship, and what should I test?"
    answer: "RC 1 is out now. RC 2 is planned for November 12, 2026, and general availability for November 19, 2026. A move from an older major version uses pg_upgrade, or pg_dump and pg_restore. The release candidate includes REPACK, including REPACK (CONCURRENTLY), the pg_plan_advice and pg_stash_advice extensions, and logical replication that can turn on without a restart when wal_level is replica."
  - question: "What is Anthropic's Scion source control system?"
    answer: "On October 13 Anthropic said a team of seven migrated its monorepo from git to Scion in five months. Merges went from about 2,500 a day in May 2026 to over 30,000 a day in September. The server creates commits, merges, and answers history. The client is scn. Anthropic is not releasing Scion. They say it fits enormous monorepos, and they plan to share the ideas with GitHub, GitLab, and the git community."
  - question: "Which Next.js and React versions fix the October 14 remote code execution bugs?"
    answer: "Install next@16.4.1 on the 16.4 line or next@15.5.28 on the 15.5 line. The critical cache bug, GHSA-673q-mjm6-r5xr, affects Next.js 16.0.0 through 16.4.0 when a use cache function returns multiple typed arrays, and Vercel says to upgrade even if your app has no function like that. The image bug, CVE-2026-96889, also covers 10.0.0 through 15.5.27. On the React side, upgrade react-server-dom-webpack, react-server-dom-parcel, and react-server-dom-turbopack to 19.0.9, 19.1.10, 19.2.9, or 19.3.1."
---

Lambda can now run the HTTP server you already wrote. PostgreSQL 19 has a release candidate, and the final release is set for November 19.

GitHub Actions can pin workflow dependencies to the commits you reviewed. Anthropic moved its monorepo off git and onto Scion after merges passed 30,000 a day. Google put Gemini 4 Argon on the API at an introductory $2 and $10. If you ship Next.js, install the October 14 security build. Here is the week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Lambda Web Functions Run a Normal Node.js Server - [<i class="fas fa-external-link-alt"></i>](https://aws.amazon.com/blogs/aws/announcing-aws-lambda-web-functions-for-fast-consistent-web-app-performance-anywhere/){:target="_blank"}

On October 12, [AWS launched Lambda Web Functions](https://aws.amazon.com/blogs/aws/announcing-aws-lambda-web-functions-for-fast-consistent-web-app-performance-anywhere/){:target="_blank"}. Your code listens on a port and handles HTTP the way Express, Hono, Fastify, or a standalone Next.js server already does. There is no event adapter. Lambda sets `AWS_LAMBDA_HTTP_ENDPOINT` to the host and port. Locally, set it yourself, for example `AWS_LAMBDA_HTTP_ENDPOINT=127.0.0.1:3000 node index.js`.

The launch runtime is `nodejs24.x` on Arm64. Each environment has 2 vCPUs and 2 GB of memory, and it can serve up to 128 requests at once. A warm environment stays up and takes the next request, which is how AWS says cold starts drop. You pay for requests, for CPU time the code actually uses, and for memory for as long as that environment is alive, including the gaps between requests. In US East (N. Virginia) on Arm, [requests are $0.30 per million](https://aws.amazon.com/lambda/pricing/){:target="_blank"}, active CPU is $0.0000276944 per vCPU-second, and memory is $0.0000036667 per GB-second. Compute is billed at 1 ms.

Deploy with `aws lambda-web deploy --name hello-world --hello-world`, or point `--code` at your app. Add `--regions us-east-1,eu-west-1,ap-northeast-1` and Lambda replicates the function and routes each request toward the closest region on a `lambda-web.global.on.aws` hostname. It is available in US East (N. Virginia), US East (Ohio), US West (Oregon), Asia Pacific (Tokyo), and Europe (Ireland). CloudFront can use a Web Function endpoint as an origin. Existing Lambda functions are now called Lambda Event Functions. That rename does not require a redeploy.

### PostgreSQL 19 RC 1 Is Out, and the Final Release Is November 19 - [<i class="fas fa-external-link-alt"></i>](https://www.postgresql.org/about/news/postgresql-19-rc-1-released-3409/){:target="_blank"}

On October 15, [PostgreSQL 19 RC 1 shipped](https://www.postgresql.org/about/news/postgresql-19-rc-1-released-3409/){:target="_blank"}. The release team held the general availability date so this version can include the large November 12 update batch first. RC 2 is planned for November 12. Unless something forces another delay, PostgreSQL 19 becomes generally available on November 19. A jump from an older major version uses `pg_upgrade`, or `pg_dump` and `pg_restore`. Amazon RDS has the same RC in its Database Preview Environment.

[The 19 release notes](https://www.postgresql.org/docs/19/release-19.html){:target="_blank"} are what you are testing. `REPACK` replaces `VACUUM FULL` and `CLUSTER`. `REPACK (CONCURRENTLY)` rebuilds a table while reads and writes continue, then takes a short exclusive lock to swap the files. That form needs a primary key or an index-based replica identity, and it does not apply to partitioned tables, unlogged tables, or catalogs. `pg_plan_advice` lets you pin planner choices. `pg_stash_advice` applies that advice by query id. When `wal_level` is `replica`, logical replication can turn on without a restart. `effective_wal_level` reports the level actually in effect. Sequence values can replicate too.

### GitHub Actions Can Lock Workflow Dependencies to a Commit - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-14-github-actions-workflow-lockfiles-in-public-preview){:target="_blank"}

On October 14, [GitHub Actions workflow lockfiles entered public preview](https://github.blog/changelog/2026-10-14-github-actions-workflow-lockfiles-in-public-preview){:target="_blank"}. A tag or branch can move after you review a workflow, so a later run can execute different code. The lockfile keeps the tag in the workflow and runs the commit you recorded.

Install the `gh actions-lock` extension and commit `.github/workflows/actions.lock`. You can onboard one workflow at a time. Once a workflow is in, every dependency, including transitive actions and reusable workflows, must have a lockfile entry, and Actions runs those commits even if the tag moves. Dependabot, when it opens an update for an onboarded action, regenerates the matching lock entry in the same pull request. Enterprise, organization, and repository admins can require lockfiles. The preview covers GitHub Enterprise Cloud, Enterprise Cloud with data residency, Team, and Free.

### Anthropic Replaces Git with an In-House System Called Scion - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/engineering/redesigning-source-control){:target="_blank"}

On October 13, [Anthropic said it finished moving its monorepo off git and onto Scion](https://www.anthropic.com/engineering/redesigning-source-control){:target="_blank"}, a version control system it built in house. The migration took five months. In May the company averaged about 2,500 changes merged per day. By September that was over 30,000. The history of main is almost 100 GB, and a compressed working copy is over 25 GB. CI checks out code about 25 million times a day. Anthropic says fetching those as full git clones would be over 600 PB of traffic a day. At the peak they ran several hundred internal git mirrors.

Scion assumes the client is online. The server creates commits, merges, rebases, and answers blame and history. A changeset is a write-ahead log entry: the files that changed against the first parent, plus content-addressed pointers to the file bytes. There is no full copy of the repository, including on the server. The client is `scn`. A node-local `scion-daemon` caches objects, `scion-cache` serves a region, and `scion-servers` read from Spanner or cloud storage. Anthropic says the new footprint uses 200 times less CPU and memory than the git mirrors, checkouts that took minutes now take seconds, and CI recovered 25% of its CPU capacity. Each cache tier stays above a 99% hit rate.

A team of seven built Scion and Antique, the code review tool, plus code search and directory-level access control, while the merge rate climbed 10 times. An early internal Claude Mythos Preview rewrote the git-to-Scion ingestion pipeline to use 20 times less memory and run 4 times faster. There is no public release. Anthropic says Scion fits enormous monorepos with heavy agent traffic, and it plans to share the ideas with GitHub, GitLab, and the git community.

### .NET 11 Release Candidate 2 Has a Go-Live License - [<i class="fas fa-external-link-alt"></i>](https://devblogs.microsoft.com/dotnet/dotnet-11-rc-2/){:target="_blank"}

On October 13, [Microsoft shipped .NET 11 Release Candidate 2](https://devblogs.microsoft.com/dotnet/dotnet-11-rc-2/){:target="_blank"} with a go-live license, so this build is supported in production. It runs in Visual Studio 2026 Insiders and in Visual Studio Code with the C# Dev Kit. Install the .NET 11 SDK.

The supply-chain knob is on the CLI. `dotnet nuget add source` and `dotnet nuget update source` take `--min-publish-age-hours`, which writes `minPublishAgeHours` for that source. `dotnet package add` and `dotnet package update` then skip versions younger than that age. If a floating version has nothing old enough, restore fails with `NU1020`. Elsewhere in the candidate, composite ML-KEM and HPKE APIs are experimental, F# gets runtime async, `QuickGrid` virtualization leaves experimental, and a new MAUI app can start from C# UI with `dotnet new maui-multiproject`.

### Gemini 4 Argon Costs $2 and $10 Until November 30 - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/){:target="_blank"}

On October 13, [Google released Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/){:target="_blank"}. The API id is `gemini-4-argon`. Through November 30, input is $2 per million tokens and output, including thinking tokens, is $10. Implicit cache reads are 95% off, so $0.10. From December 1 the prices are $4, $20, and $0.20. Explicit caching is not supported. The model is not on the free tier or the Google AI Pro plan.

The context window is 1,048,576 tokens, shared by input and output. Default max output is 65,536. Long decode can go up to the full window. Thinking defaults to `medium`, and you can set `low` or `high`. Google says Argon ranks first on the Vals Index. The same day it reached [GitHub Copilot](https://github.blog/changelog/2026-10-13-gemini-4-argon-in-github-copilot){:target="_blank"} for Pro+, Max, Business, and Enterprise, billed at list price, with a gradual rollout. Business and Enterprise admins control it in the model policy. It is also on the paid Gemini API in AI Studio, in Android Studio, and for Google AI Ultra subscribers in Google Antigravity.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Ruby 4.1.0-preview1 Gives Each Ractor Its Own Garbage Collector - [<i class="fas fa-external-link-alt"></i>](https://www.ruby-lang.org/en/news/2026/10/12/ruby-4-1-0-preview1-released/){:target="_blank"}

On October 12, [Ruby 4.1.0-preview1 shipped](https://www.ruby-lang.org/en/news/2026/10/12/ruby-4-1-0-preview1-released/){:target="_blank"}. It is a preview, so do not put it in production. The garbage collector now runs per Ractor: each one collects its own heap on its own thread, and a stop-the-world collection happens only when it has to. `GC.start(global: false)` forces a local collection while other Ractors are running. `Ractor#value` returns its value once. A second call raises `Ractor::Error`. YJIT now runs on Windows. `autoload_relative` is new. `alias` warns when the original method is found only through `Object`, or when it lives in a prepended module. Both of those lookups are scheduled to change in Ruby 4.3.

### Firefox Enterprise Puts Browser Policy on Your Own Servers - [<i class="fas fa-external-link-alt"></i>](https://blog.mozilla.org/en/firefox/introducing-firefox-enterprise/){:target="_blank"}

On October 12, [Mozilla introduced Firefox Enterprise](https://blog.mozilla.org/en/firefox/introducing-firefox-enterprise/){:target="_blank"}. It pairs Firefox, on the Gecko engine, with a management console an organization can run on its own infrastructure. From that console, IT can set browser policy, control access, govern how data moves, and set rules for AI features inside the browser. It is meant to sit next to the identity provider, SIEM, and MDM you already use. Sales start in France, Germany, Austria, and Switzerland. Thunderbird Enterprise, for mail, is in development.

### dotnetup Installs .NET SDKs in Your Home Directory - [<i class="fas fa-external-link-alt"></i>](https://devblogs.microsoft.com/dotnet/introducing-dotnetup/){:target="_blank"}

On October 15, [Microsoft published a preview of `dotnetup`](https://devblogs.microsoft.com/dotnet/introducing-dotnetup/){:target="_blank"}, a user-local toolchain manager for macOS and Linux. It does not need admin rights. The bootstrap is `curl -fsSL https://aka.ms/dotnetup/get-dotnetup.sh` piped to `zsh` or `bash`, then `dotnetup init`. `dotnetup update` refreshes the channels you track. `dotnetup sdk install preview` and `dotnetup sdk install daily` put prerelease builds next to stable ones. `global.json` pins still win. Windows system-wide installs are planned for later.

### GitHub Apps Can Create Repos Without Admin Rights - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-13-github-app-improvements-for-least-privilege-and-management){:target="_blank"}

On October 13, [GitHub added two repository permissions](https://github.blog/changelog/2026-10-13-github-app-improvements-for-least-privilege-and-management){:target="_blank"}. `repository_creation:write` lets an app or a fine-grained personal access token create a repository without `repository_administration:write`, which also allows delete and transfer. `installation_repositories:write` lets automation add or remove a repository from a GitHub App installation. Repository admins can also attach an app that an org owner has already approved, without another owner approval. Apps can request `offline_access` so they can move back to expiring user tokens one user at a time. That scope is in GitHub Enterprise Server 3.23. The rest of these changes land in GHES 3.24.

---

## <i class="fas fa-robot"></i> AI & Models

### Copilot Drops Opus 4.8, Opus 5, and GPT-5.6 Terra on November 16 - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november){:target="_blank"}

On October 15, [GitHub set November 16 as the removal date](https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november){:target="_blank"} for Claude Opus 4.8, Claude Opus 5, and GPT-5.6 Terra across Copilot Chat, inline edits, ask mode, agent mode, and completions. The replacements are Claude Opus 5.5, and GPT-6.1 Sol or GPT-6 Luna. Opus 4.8 stays for individual subscribers on annual plans. Business and Enterprise customers who left the global default on already have the replacements enabled. If an admin turned that default off, they enable the new models in the model policy.

### Copilot Can Open a Pull Request for a Code Scanning Alert - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-15-agentic-autofix-for-code-scanning-alerts-general-availability){:target="_blank"}

On October 15, [agentic autofix for code scanning alerts reached general availability](https://github.blog/changelog/2026-10-15-agentic-autofix-for-code-scanning-alerts-general-availability){:target="_blank"} for GitHub Code Security and GitHub Advanced Security customers on Enterprise Cloud. Assign an alert to Copilot, or set `assignees` to `["copilot-swe-agent[bot]"]` on the code scanning alert API. Copilot reads the repo, proposes a fix, reruns CodeQL, and opens a draft pull request. You can batch up to 25 alerts from the default branch into one pull request. An enterprise admin turns on the Agentic autofix policy first. It spends AI credits from the Code Security budget, plus Actions minutes. The same day, [AI Scan for pull requests](https://github.blog/changelog/2026-10-15-ai-scan-for-pull-requests-generally-available){:target="_blank"} also reached general availability. It checks pull request changes in languages CodeQL does not cover, including PHP, shell, Terraform, and Dockerfiles. Findings are advisory: they do not fail the code scanning check. Public repositories can use it. Private and internal organization repos need GitHub Code Security or Advanced Security. It spends Code Security AI credits and does not need a Copilot license.

---

## <i class="fas fa-shield-alt"></i> Security

### Next.js 16.4.1 and 15.5.28 Patch Two Critical Remote Code Bugs - [<i class="fas fa-external-link-alt"></i>](https://nextjs.org/blog/nextjs-security-update-october-14-2026){:target="_blank"}

On October 14, [Vercel published the out-of-band Next.js update](https://nextjs.org/blog/nextjs-security-update-october-14-2026){:target="_blank"} it had scheduled the week before. Install `next@16.4.1` on the active LTS line or `next@15.5.28` on the 15.5 maintenance line. A 16.4.2 build followed on October 15.

The critical cache bug is GHSA-673q-mjm6-r5xr. On Next.js 16.0.0 through 16.4.0, an unauthenticated request can reach remote code execution when App Router Cache Components are on and a `'use cache'` function returns multiple typed arrays. Vercel says there is no workaround, and to upgrade even if your app has no function like that. The matching React advisory is [GHSA-xqc2-xf4c-x3h3](https://github.com/facebook/react/security/advisories/GHSA-xqc2-xf4c-x3h3){:target="_blank"}. It covers `react-server-dom-webpack`, `react-server-dom-parcel`, and `react-server-dom-turbopack` from 19.0.0 through 19.0.8, 19.1.0 through 19.1.9, 19.2.0 through 19.2.8, and 19.3.0. The patched builds are 19.0.9, 19.1.10, 19.2.9, and 19.3.1. React says the payload has to transport multiple typed arrays and include an attacker-controlled value. Apps that do not run a server, or do not use React Server Components, are outside this bug.

The second critical issue is CVE-2026-96889, GHSA-2464-fhr4-w9xw. Image Optimization can hit remote code execution on glibc-based Linux when SVG files are in play. Affected ranges are 10.0.0 through 15.5.27 and 16.0.0 through 16.4.0. A workaround is `sharp` at 0.35.5 or later. The patched Next.js releases pull that `sharp` in for you. A high-severity denial of service, GHSA-p3m5-59mp-jv5r, lets a crafted request burn CPU in an App Router process that has at least one Server Action. Pages Router apps, and apps with no Server Actions, are outside that one.

### October Patch Tuesday Fixes 1,415 Microsoft CVEs, One Already Exploited - [<i class="fas fa-external-link-alt"></i>](https://www.zerodayinitiative.com/blog/2026/10/13/the-october-2026-security-update-review){:target="_blank"}

On October 13, [Microsoft's monthly security release](https://www.zerodayinitiative.com/blog/2026/10/13/the-october-2026-security-update-review){:target="_blank"} set a new record. The Zero Day Initiative counted 1,415 new Microsoft CVEs, the first four-digit month it has recorded, covering Windows, Office, .NET, SharePoint, SQL Server, Exchange, and Azure. One is under active attack: CVE-2026-96951, a Windows Shell security-feature bypass rated Important at CVSS 8.8. CISA added it to the known exploited list the same day, with a federal deadline of October 16. Two more were public before the patch. CVE-2026-108398 is a .NET Framework bypass of Windows Defender Application Control. CVE-2026-92707 is a denial of service in MessagePack-CSharp. Adobe published 11 bulletins covering 174 CVEs the same day, including ColdFusion and Commerce issues rated 10.0. .NET and .NET Framework servicing builds for the month were posted on October 12.

### PgBouncer 1.26.1 Fixes an Authentication Bypass - [<i class="fas fa-external-link-alt"></i>](https://www.postgresql.org/about/news/pgbouncer-1261-released-fixes-three-cves-3403/){:target="_blank"}

On October 14, [PgBouncer 1.26.1 fixed three CVEs](https://www.postgresql.org/about/news/pgbouncer-1261-released-fixes-three-cves-3403/){:target="_blank"}. CVE-2026-107350 lets a client that knows one SCRAM user's password log in as any other SCRAM user, including an admin or a backend superuser. It happens when a second startup message is processed during SCRAM authentication while the client asks for a database that does not exist. CVE-2026-107349 and CVE-2026-107348 are denial-of-service loops an unauthenticated client can trigger. The first needs an empty option name in the startup `options` parameter when `ignore_startup_parameters` is set and does not include `options`. The second is an integer overflow in packet-buffer growth, and only when `max_packet_size` is above its default. Upgrade the pooler. The release also makes `ignore_startup_parameters = search_path` ignore `search_path` again, which is the 1.25 behavior. The same day, [psqlODBC 18.00.0005](https://www.postgresql.org/about/news/psqlodbc-18000005-released-with-security-fix-for-cve-2026-109448-3404/){:target="_blank"} fixed CVE-2026-109448, and [OpenTofu 1.12.8](https://github.com/opentofu/opentofu/releases/tag/v1.12.8){:target="_blank"} fixed excessive CPU use when `tofu init` installs dependencies from an attacker-controlled HTTP/2 server.

### Docker Hub Says Account Conversion Could Hand Over a Token - [<i class="fas fa-external-link-alt"></i>](https://www.docker.com/blog/docker-hub-security-advisory-cve-2026-105445/){:target="_blank"}

On October 12, [Docker published CVE-2026-105445](https://www.docker.com/blog/docker-hub-security-advisory-cve-2026-105445/){:target="_blank"}. From August 26, 2024, until a fix on September 30, 2026, converting a personal Docker Hub account into an organization reassigned that account's personal access tokens to the user named as the new owner, without rotating the secret or asking that user. The old holder of the secret could then pull, push, or delete images as the target. Docker says a review of about 304,000 pushes made with transferred tokens found no evidence of exploitation. On October 8 it deactivated the transferred tokens, except where an owner asked to keep one. If you did not get the October 2 email titled "Docker Hub Vulnerability Identified & Resolved", Docker says your account was not in the exposed set. Conversion no longer moves tokens. Use an organization access token for automation.

### Meta Says Stolen Credentials Reached GitHub Repos and 1,500 People - [<i class="fas fa-external-link-alt"></i>](https://www.securityweek.com/meta-says-hackers-took-code-personal-data-of-1500-in-github-breach/){:target="_blank"}

On October 13, [Meta told SecurityWeek](https://www.securityweek.com/meta-says-hackers-took-code-personal-data-of-1500-in-github-breach/){:target="_blank"} it is notifying about 1,500 people, most of them employees in the US, after an outside group used a stolen employee credential to reach some GitHub repositories. Meta said 99% of what was taken was product source code, and the remaining 1% was personal data that should not have been in those repos. The company said it rotated secrets it found there, cut off the access, and is adding scans so user data does not land in GitHub again. It said this was not a flaw in a Meta product.

Node.js will ship security releases for 26.x, 24.x, and 22.x on or shortly after October 21. The project says the highest severity in each of those lines is high. End-of-life lines are affected too.

CISA added seven vulnerabilities to the known exploited list from October 13 to 15. Besides the Windows Shell bug, they are CVE-2026-104935 in Ivanti Connect Secure, CVE-2026-0322 in Palo Alto PAN-OS, CVE-2026-105133 and CVE-2026-105134 in AhsayCBS, CVE-2026-76519 in Cisco Secure Email Gateway, and CVE-2026-21589, a file-access bug in Atlassian Data Center products including Bitbucket, Confluence, Jira, Bamboo, and Crowd.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### Character.AI Files for Chapter 11, with Disney Bidding $20 Million for a License - [<i class="fas fa-external-link-alt"></i>](https://blog.character.ai/an-update-on-character-ai/){:target="_blank"}

On October 12, [Character.AI said it filed for Chapter 11](https://blog.character.ai/an-update-on-character-ai/){:target="_blank"} so a court can sell the company. The company hopes a buyer keeps the platform running. If no usable bid shows up, the platform shuts down. It expects the sale to finish by the end of November or early December. [CNBC reported](https://www.cnbc.com/2026/10/13/character-ai-chapter-11-disney-bid.html){:target="_blank"} that Disney is the stalking-horse bidder, offering $20 million to license some of the intellectual property, and that Disney has hired former Character.AI employees to provide transition services.

### Layoffs: Airtable's New Owner Cuts a Large Part of the Team, and Netflix Cuts About 1,000 Roles

*   **Airtable:** On October 12, [Bending Spoons told Business Insider](https://www.businessinsider.com/airtable-layoffs-job-cuts-bending-spoons-2026-10){:target="_blank"} it is laying off a "large part" of Airtable and reshaping the company around smaller teams and AI features. The company would not give a headcount. Bending Spoons agreed in August to buy Airtable for $1.28 billion.
*   **Netflix:** On October 14, [Netflix confirmed to TechCrunch](https://techcrunch.com/2026/10/14/netflix-to-lay-off-1000-staff-amid-intensifying-competition-for-user-attention/){:target="_blank"} that it is cutting about 1,000 people, close to 6% of staff. Most of the cuts are in product, tech, legal, and human resources. Netflix said it is still on track for its full-year forecast.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$0.30** per million requests for Lambda Web Functions in US East (N. Virginia) on Arm
- **128** concurrent requests in one Web Functions environment, on **2** vCPUs and **2 GB**
- **30,000** changes Anthropic merged per day in September, up from about **2,500** in May. Scion's footprint is **200x** smaller than the old git mirrors
- **November 19** the planned general availability date for PostgreSQL 19. RC 2 is **November 12**
- **$2 / $10** Gemini 4 Argon input and output per million tokens through November 30. Then **$4 / $20**
- **1,048,576** tokens in the Argon context window
- **16.4.1** and **15.5.28** the patched Next.js releases. React server DOM packages: **19.0.9**, **19.1.10**, **19.2.9**, **19.3.1**
- **1,415** Microsoft CVEs in the October 13 Patch Tuesday, per the Zero Day Initiative. **1** exploited: CVE-2026-96951
- **174** Adobe CVEs across 11 October bulletins
- **304,000** pushes Docker reviewed while checking transferred Hub tokens
- **1,500** people Meta is notifying after the GitHub repository intrusion
- **1,000** Netflix roles cut, about **6%**
- **$20 million** Disney's stalking-horse bid for a Character.AI technology license
- **October 21** the date Node.js plans high-severity security releases for 26.x, 24.x, and 22.x

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Lambda Web Functions** - October 12. `nodejs24.x` on Arm64. Listen on `AWS_LAMBDA_HTTP_ENDPOINT`. `aws lambda-web deploy`.
*   **Docker Hub CVE-2026-105445** - October 12. Account conversion could reassign a personal access token. Docker says it found no exploitation.
*   **Ruby 4.1.0-preview1** - October 12. Per-Ractor garbage collection. YJIT on Windows. `autoload_relative`.
*   **Firefox Enterprise** - October 12. Gecko plus a management console you can run yourself. First sales in France, Germany, Austria, and Switzerland.
*   **Character.AI** - October 12. Chapter 11. Disney's stalking-horse bid is $20 million for a license.
*   **Airtable** - October 12. Bending Spoons is cutting a large part of the team.
*   **Gemini 4 Argon** - October 13. `gemini-4-argon` at $2 and $10 through November 30.
*   **Copilot Argon** - October 13. Pro+, Max, Business, and Enterprise, at list price.
*   **.NET 11 RC 2** - October 13. Go-live license. `--min-publish-age-hours` on `dotnet nuget add source`.
*   **GitHub Apps** - October 13. `repository_creation:write` creates a repo without admin permission.
*   **Anthropic Scion** - October 13. In-house version control. The client is `scn`. No public release. Merges passed 30,000 a day.
*   **Patch Tuesday** - October 13. 1,415 Microsoft CVEs. CVE-2026-96951 is exploited.
*   **Meta GitHub intrusion** - October 13. About 1,500 people notified. Stolen employee credentials.
*   **GitHub Actions lockfiles** - October 14. Public preview. `gh actions-lock` writes `.github/workflows/actions.lock`.
*   **Next.js security** - October 14. `next@16.4.1` and `next@15.5.28`. Two critical remote code execution fixes.
*   **React server packages** - October 14. 19.0.9, 19.1.10, 19.2.9, and 19.3.1.
*   **PgBouncer 1.26.1** - October 14. SCRAM authentication bypass, plus two denial-of-service loops.
*   **psqlODBC 18.00.0005** - October 14. Security fix for CVE-2026-109448.
*   **OpenTofu 1.12.8** - October 14. Installer CPU bug when the HTTP/2 server is hostile.
*   **RFC 10055** - October 14. How to read and set ECN on UDP sockets on Apple, Linux, and Windows. Informational.
*   **Node.js notice** - October 14. High-severity releases for 26.x, 24.x, and 22.x on October 21.
*   **Netflix cuts** - October 14. About 1,000 people, close to 6%, mostly product, tech, legal, and HR.
*   **PostgreSQL 19 RC 1** - October 15. General availability planned for November 19.
*   **dotnetup** - October 15. Preview toolchain manager. `dotnetup init` on macOS and Linux.
*   **Copilot model removals** - October 15. Opus 4.8, Opus 5, and GPT-5.6 Terra leave on November 16.
*   **Agentic autofix** - October 15. Generally available for code scanning alerts on Enterprise Cloud.
*   **GitHub push emails** - October 15. Email notifications for repository push events are no longer sent.

---

Lambda Web Functions are the new way to put a Node.js HTTP server on Lambda, and PostgreSQL 19 is close enough to test. Anthropic's monorepo now lands on Scion, and there is no public release. Gemini 4 Argon is `gemini-4-argon` at $2 and $10 until November 30. If you run Next.js 15 or 16, or React Server Components, install this week's patched builds before you do anything else. Next week, the Node.js security releases land on October 21. See you then.
