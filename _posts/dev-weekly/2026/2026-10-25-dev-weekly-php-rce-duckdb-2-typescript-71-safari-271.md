---
layout: post
seo: true
title: "Dev Weekly Oct 19-25, 2026: PHP Critical RCE, DuckDB 2.0, TypeScript 7.1, Safari 27.1"
subtitle: "PHP patches two critical remote code execution bugs, DuckDB 2.0 ships a new file format, TypeScript 7.1 beta types import attributes, Safari 27.1 arrives with iPhone Duo, and Google Cloud adds OpenAI models."
date: 2026-10-25
categories: tech-news
permalink: /dev-weekly/2026/oct-19-25/php-rce-duckdb-2-typescript-71-safari-271/
share-img: /assets/img/posts/dev_weekly/tech-news-19-25oct-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-19-25oct-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-19-25oct-2026.png
description: "Dev Weekly for October 19 to 25, 2026: PHP patches critical remote code execution bugs, DuckDB 2.0 ships, and TypeScript 7.1 beta adds import attributes. On October 21 PHP released 8.5.12, 8.4.27, 8.3.36, and 8.2.35 for CVE-2026-109618 and CVE-2026-109619, which CISA calls php2shell. On October 21 DuckDB 2.0.0 LTS, codenamed Cinnamon Teal, added CONNECT over the Quack protocol, a new storage format, triggers, and a PEG parser. On October 20 TypeScript 7.1 beta shipped, installed with npm install -D typescript@beta, with import attributes on ambient modules, source imports, target es2026, and content mappers. On October 23 Safari 27.1 arrived with iPhone Duo, and the Device Posture and Viewport Segments APIs sit behind feature flags. On October 21 Google Cloud put GPT-6 Astra, GPT-6.1 Sol, and GPT-6 Luna into Model Garden in private preview. Also this week: llm-d 1.0, Unicode CLDR 49 in ICU 79, Terraform 1.17.0 with Policy generally available, Node.js 26.12.1, 24.22.1, and 22.23.4, Python 3.15.1 with pip 26.2.2, Ruby 4.0.9, Chrome 156 with 353 security fixes, an OpenAI acquisition of Orchestra Bio, an Anthropic first-half loss above $80 billion, and layoffs at eBay and Automattic."
keywords: "dev weekly October 19 25 2026, software developer news October 19 to 25 2026, PHP CVE-2026-109618 CVE-2026-109619 php2shell PHP 8.5.12 8.4.27 8.3.36 8.2.35 GHSA-w8hw-w9fx-j79w GHSA-6wmf-4rv5-p3rp session.upload_progress.enabled CVE-2026-115560, DuckDB 2.0.0 Cinnamon Teal Quack CONNECT duckdb -serve October 21 2026 LTS file format, TypeScript 7.1 beta typescript@beta import attributes content mappers --runExternalCode target es2026 October 20 2026, Safari 27.1 iPhone Duo Device Posture API Viewport Segments October 23 2026 Xcode 27.1, llm-d 1.0 Kubernetes vLLM GKE Inference Gateway October 20 2026, Unicode CLDR 49 ICU 79 ICU4X 2.4 October 22 2026, Google Cloud OpenAI GPT-6 Astra GPT-6.1 Sol GPT-6 Luna Model Garden October 21 2026 enterprise AI, Terraform 1.17.0 Policy GA -minimal-refresh CVE-2026-111943, Node.js 26.12.1 24.22.1 22.23.4 CVE-2026-105482 CVE-2026-111497 October 21 2026 vulnerability management, Python 3.15.1 3.14.9 3.13.17 pip 26.2.2 certifi 2026.10.19 eMudhra, Ruby 4.0.9 3.4.12 3.3.13 Regexp Onigmo GitLab CVE-2026-110264, Chrome 156 156.0.8078.47 353 security fixes, OpenTofu 1.12.9 compromised certificates, GitHub Apps enterprise installations GA, Spring Boot 4.2.0-RC1, Claude Duet Opus 5.5, GitHub Copilot Teams, OpenAI Orchestra Bio, Anthropic 80 billion loss, eBay layoffs 9 percent 1000, Automattic layoffs WordPress, cloud security supply chain security DevOps observability software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from October 19 to 25, 2026?"
    answer: "PHP released 8.5.12, 8.4.27, 8.3.36, and 8.2.35 on October 21 to fix two critical unauthenticated remote code execution bugs, CVE-2026-109618 and CVE-2026-109619. The same week DuckDB 2.0.0 shipped as a long-term support release, TypeScript 7.1 entered beta, and Safari 27.1 arrived with iPhone Duo."
  - question: "Which PHP versions fix the October 21 remote code execution bugs?"
    answer: "Install PHP 8.5.12, 8.4.27, 8.3.36, or 8.2.35. PHP 8.6.0 RC4 also contains the fixes and is not for production. PHP 8.1 and older are outside the normal update stream. The project published minimal source backports for 7.4, 8.0, and 8.1. PHP says updating is the only safe choice. memory_limit=-1 and session.upload_progress.enabled=0 reduce some paths and do not make a server safe. PHP 8.2 reaches end of life on December 31, 2026."
  - question: "What should I check before upgrading to DuckDB 2.0?"
    answer: "Install from duckdb.org/install. DuckDB 2.0 can read and write database files you already have, and those files stay readable by older versions. Files created by 2.0 cannot be opened by DuckDB before 2.0. Test on a copy. The first patch, 2.0.1, is planned for November 18. Support for 2.0 runs until at least October 2027. DuckDB 1.4 is supported until November 17, 2026, and 1.5 until March 1, 2027. The single-arrow lambda is off by default. SET lambda_syntax = 'enable_single_arrow' turns it back on until DuckDB 2.1 removes it. SET enable_legacy_parser = true switches back to the old SQL parser."
  - question: "How do I install the TypeScript 7.1 beta?"
    answer: "Run npm install -D typescript@beta. Ambient modules can require import attributes, for example declare module \"*\" with { type: \"css\" }. Source imports need --module set to esnext, nodenext, or preserve, plus an esnext lib or target. --target es2026 and --lib es2026 are stable. Content mappers are listed under contentMappers in tsconfig.json, and tsc --runExternalCode is required to run them. Stricter checks on distributive type parameters can produce new errors in code that typechecked on 7.0. A release candidate is planned about a month after the October 20 beta."
  - question: "What does Safari 27.1 change for websites on iPhone Duo?"
    answer: "Sites built with responsive layout work on iPhone Duo without a device check. In Safari 27.1 the viewport width runs from 382 to 951 CSS pixels, and the height from 368 to 902. Test with the iPhone Duo simulator in Xcode 27.1 Device Hub. The Device Posture API and the Viewport Segments API are off unless you enable both under Settings, Apps, Safari, Advanced, Feature Flags. A partly folded phone shows a web PDF as two pages."
---

This was a busy release week, but one update matters more than the rest. PHP fixed two critical bugs that can let an attacker run code on a web server, in some cases before the application itself starts. Anyone running PHP should patch first and read the rest later.

Elsewhere, DuckDB reached version 2.0, TypeScript 7.1 entered beta, and Safari gained its first APIs for a folding iPhone. Google Cloud also made the unusual move of adding OpenAI models to its own AI platform. Here is what changed and why it matters.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### DuckDB 2.0 Adds a Server Mode and a New File Format - [<i class="fas fa-external-link-alt"></i>](https://duckdb.org/2026/10/21/announcing-duckdb-200.html){:target="_blank"}

On October 21, [DuckDB 2.0.0 shipped](https://duckdb.org/2026/10/21/announcing-duckdb-200.html){:target="_blank"} as a long-term support release. This is the largest DuckDB release so far, built from almost 20,000 commits since version 1.5. Install it from [duckdb.org/install](https://duckdb.org/install){:target="_blank"}. Support runs until at least October 2027, although the team suggests that critical production systems may want to wait for the first patch on November 18.

The headline feature is that DuckDB can now act like a server. It still works as the small database embedded inside an application, but one DuckDB process can also accept queries from another. Run `duckdb -serve` on the server and `duckdb -connect` on the client. The new `CONNECT` statement can also point a session at PostgreSQL or MySQL, with supported queries executed by the remote database instead of pulling all the data into DuckDB.

There is plenty more in the release: faster reads from cloud storage, triggers, better support for JSON-shaped data, and a new SQL parser. The command-line tool also notices when a coding agent is using it and switches to shorter output that costs fewer tokens.

The main upgrade warning is the database file itself. DuckDB 2.0 can open your existing files without locking you in, but a new file created by 2.0 cannot be opened by an older DuckDB release. Test the upgrade on a copy before production. Also check old lambda expressions: `x -> x + 1` is disabled by default and should become `lambda x: x + 1`.

### TypeScript 7.1 Beta Can Type Import Attributes - [<i class="fas fa-external-link-alt"></i>](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/){:target="_blank"}

On October 20, [TypeScript 7.1 entered beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/){:target="_blank"}. Try it with `npm install -D typescript@beta`. The release candidate is expected in about a month.

The most practical change is better typing for imports that carry extra instructions. A browser can import a CSS file as a `CSSStyleSheet`, for example, but only when the import includes `with { type: "css" }`. TypeScript can now describe that rule in an ambient module declaration. If someone forgets the attribute, the import no longer quietly receives the wrong type. The same mechanism works for text and raw bytes.

Version 7.1 also makes the new Go-based compiler easier to build on. Content mappers give frameworks such as Vue, Svelte, Astro, and MDX a standard way to show TypeScript the code embedded inside their component files. Projects register a mapper in `tsconfig.json`; command-line use requires `tsc --runExternalCode` because the mapper executes third-party code.

There are two reasons to test before upgrading. Conditional types get stricter and may reveal errors that TypeScript 7.0 accepted. The payoff is another round of speed and memory improvements. In Microsoft's test of the mui-docs codebase, checking time fell from 22.2 seconds to 11.9, while memory use was almost cut in half.

### Safari 27.1 Ships on iPhone Duo - [<i class="fas fa-external-link-alt"></i>](https://webkit.org/blog/18486/webkit-features-for-safari-27-1/){:target="_blank"}

On October 23, [Safari 27.1 arrived with iPhone Duo](https://webkit.org/blog/18486/webkit-features-for-safari-27-1/){:target="_blank"}. The reassuring news is that developers do not need a special iPhone Duo version of their website. A responsive layout should adapt as the phone moves between its outer screen, full inner screen, and two-window mode. Xcode 27.1 includes a simulator, so a physical phone is not required for testing.

Safari does have two experimental APIs for layouts that want to use the fold. The Device Posture API says whether the screen is folded. The Viewport Segments API describes the areas on each side. Both are behind feature flags, which means normal visitors will not have them yet. Treat them as an optional enhancement, not as the foundation of the page.

There is one user-facing touch in the release: a PDF shown on a partly folded phone opens as two facing pages, then returns to one page when the screen is flat or closed.

### llm-d 1.0 Routes Agent Traffic Across a GPU Cluster - [<i class="fas fa-external-link-alt"></i>](https://cloud.google.com/blog/topics/ai-infrastructure/llm-d-1-0-an-open-source-stack-for-distributed-inference/){:target="_blank"}

On October 20, [Google released llm-d 1.0](https://cloud.google.com/blog/topics/ai-infrastructure/llm-d-1-0-an-open-source-stack-for-distributed-inference/){:target="_blank"}, an open-source project for teams that run large models on Kubernetes. Google started it with Red Hat, IBM, and others, and more than 500 people have contributed.

The problem it solves is easy to recognize. AI agents send several related requests, often with the same long context. A normal load balancer may send each request to a different machine, forcing every machine to rebuild the same cache. llm-d remembers where that context already lives and routes the next request there. It can also give interactive users priority over large background jobs and update the serving cluster without dropping active sessions.

Google reports an 85% improvement in median time to first token on one coding-agent test, along with 2.4 times the throughput of a plain Kubernetes Service. Those are vendor benchmarks, but production users are reporting similar gains in cache reuse. Teams on Google Cloud can run the router through GKE Inference Gateway; everyone else can adopt only the open components they need.

### Unicode CLDR 49 Is in ICU 79 - [<i class="fas fa-external-link-alt"></i>](https://blog.unicode.org/2026/10/unicode-cldr-49-released.html){:target="_blank"}

On October 22, [Unicode released CLDR 49](https://blog.unicode.org/2026/10/unicode-cldr-49-released.html){:target="_blank"}. CLDR is the quiet layer of locale data that helps operating systems, browsers, and programming languages format dates, numbers, currencies, and plurals correctly. Version 49 is already included in ICU 79 and ICU4X 2.4.

The release updates locale data for Unicode 18 and adds useful date rules, including ordinal days such as “September 3rd” and better formatting for time zones that change offset during the year. It also deprecates Japanese era data from before Meiji. If an application updates to ICU 79, the CLDR migration notes are worth checking for formatting changes that could affect tests or stored output.

### Google Cloud Puts GPT-6 Astra, Sol, and Luna in Model Garden - [<i class="fas fa-external-link-alt"></i>](https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers){:target="_blank"}

On October 21, [Google Cloud added OpenAI models to Model Garden](https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers){:target="_blank"}. GPT-6 Astra, GPT-6.1 Sol, and GPT-6 Luna are rolling out in private preview. A local Codex CLI or desktop app can also use Google Cloud for inference.

This is less about a new model and more about enterprise buying. A company already committed to Google Cloud can pay for OpenAI usage through the same marketplace contract, bill, identity controls, and audit logs it uses for Gemini and Claude. Google says customer prompts and outputs remain inside the customer's data perimeter and are not used for model training. Zero Data Retention and Confidential Compute are promised later, so they should not be treated as available today.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Terraform 1.17 Lets Provider Requirements Use Variables - [<i class="fas fa-external-link-alt"></i>](https://github.com/hashicorp/terraform/releases/tag/v1.17.0){:target="_blank"}

On October 21, [Terraform 1.17.0](https://github.com/hashicorp/terraform/releases/tag/v1.17.0){:target="_blank"} added variables and locals to provider requirements. This removes some of the repetition from configurations that choose providers dynamically.

Terraform Policy is also generally available. The `plan`, `apply`, and `query` commands can evaluate policies with `-policies`, without enabling experimental features. A new `-minimal-refresh` option speeds up planning by refreshing only resources that are expected to change. The build also removes trust for the compromised eMudhra certificates involved in CVE-2026-111943.

### GitHub Apps Can Install on the Enterprise - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-23-enterprise-installations-for-github-apps-generally-available){:target="_blank"}

On October 23, [enterprise installations for GitHub Apps reached general availability](https://github.blog/changelog/2026-10-23-enterprise-installations-for-github-apps-generally-available){:target="_blank"}. Enterprise automation can now manage repository policies, rulesets, two-factor requirements, verified domains, IP allow lists, and member settings through a GitHub App.

The practical benefit is smaller credentials. Teams can replace broad classic personal access tokens with an app that receives only the permissions its workflow needs. The same API coverage is coming to GitHub Enterprise Server 3.24.

### Spring Boot 4.2.0-RC1 Changes the Default Buildpack - [<i class="fas fa-external-link-alt"></i>](https://spring.io/blog/2026/10/23/spring-boot-4-2-0-RC1-available-now){:target="_blank"}

On October 23, [Spring Boot 4.2.0-RC1](https://spring.io/blog/2026/10/23/spring-boot-4-2-0-RC1-available-now){:target="_blank"} reached Maven Central. The default Buildpacks image now uses Ubuntu 26.04, startup inside executable jars is faster, and `spring-boot-properties-migrator` can fail the application when it finds a migration warning. It is still a release candidate, so this is a build for testing an upgrade rather than quietly changing a production pipeline.

### CSS Animation Triggers Get a First Public Draft - [<i class="fas fa-external-link-alt"></i>](https://www.w3.org/news/2026/first-public-working-draft-animation-triggers/){:target="_blank"}

On October 20, the W3C published the [first public working draft of CSS Animation Triggers](https://www.w3.org/news/2026/first-public-working-draft-animation-triggers/){:target="_blank"}. The proposal would let CSS start, pause, or control an animation when a DOM event happens or an element enters a defined range. Today that coordination usually needs JavaScript. This is an early draft, so the syntax is still likely to change.

### PostgreSQL Retires RPM Repos for Old RHEL and SLES - [<i class="fas fa-external-link-alt"></i>](https://www.postgresql.org/about/news/rhel-100-and-96-repositories-are-being-retired-3411/){:target="_blank"}

On October 20, the PostgreSQL project moved its [RHEL 10.0 and RHEL 9.6 packages](https://www.postgresql.org/about/news/rhel-100-and-96-repositories-are-being-retired-3411/){:target="_blank"} out of the main repository and into the archive. [SLES 15.6 packages](https://www.postgresql.org/about/news/sles-156-repositories-are-being-retired-3415/){:target="_blank"} moved as well. Existing databases keep running, but package installation and updates will fail until old hosts point to the archive or move to a supported operating system.

---

## <i class="fas fa-robot"></i> AI & Models

### Claude Duet Is a Proactive Agent on Opus 5.5 - [<i class="fas fa-external-link-alt"></i>](https://claude.com/resources/articles/claude-duet){:target="_blank"}

On October 21, [Anthropic opened a research preview of Claude Duet](https://claude.com/resources/articles/claude-duet){:target="_blank"}. Unlike a normal chatbot, Duet checks connected apps in the background. It sends a morning brief, alerts the user when something needs attention, and keeps working on assigned tasks after the user leaves. It asks for approval before actions such as sending a message, making a payment, signing a document, or deleting something.

Duet runs on Claude Opus 5.5 in a separate iOS, Android, and web app. The preview is available by waitlist to US Pro and Max subscribers, and its background work counts against the same usage limits as ordinary Claude conversations. Team and Enterprise plans are not included yet.

Anthropic is unusually direct about the rough edges. Duet can misread a thread, get the urgency wrong, and cannot show users the browser in which it works. This is an early look at proactive agents, not an assistant to trust without review.

### The GitHub App in Teams Can Turn a Notification into Code - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-23-turn-notifications-into-code-with-github-copilot-in-teams){:target="_blank"}

On October 23, [GitHub connected Copilot to its Microsoft Teams app](https://github.blog/changelog/2026-10-23-turn-notifications-into-code-with-github-copilot-in-teams){:target="_blank"}. A developer can receive a GitHub notification in Teams and ask Copilot to investigate or turn it into a code change without switching to the IDE.

---

## <i class="fas fa-shield-alt"></i> Security

### PHP 8.5.12, 8.4.27, 8.3.36, and 8.2.35 Patch Two Critical Remote Code Bugs - [<i class="fas fa-external-link-alt"></i>](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/){:target="_blank"}

On October 21, [PHP shipped emergency builds](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/){:target="_blank"} for two critical bugs that can lead to remote code execution without a login. The fixed versions are PHP 8.5.12, 8.4.27, 8.3.36, and 8.2.35. [CISA calls the pair php2shell](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching){:target="_blank"} and is urging immediate patching of internet-facing systems.

This is not limited to one web server or framework. PHP-FPM, Apache with mod_php, php-cgi, FrankenPHP, and LiteSpeed are all affected. Apache with mod_php is the most dangerous setup because researchers demonstrated an attack that reaches the flaw before application code runs.

The first bug, CVE-2026-109618, can corrupt memory when a request hits PHP's memory limit at the wrong moment. The second, CVE-2026-109619, can leave one request pointing at memory that has already been freed, then expose that stale state to a later request on the same worker. Both sit deep inside PHP's request handling, which is why a WordPress, Laravel, or custom application's own validation cannot reliably block them.

PHP says updating is the only complete fix. If patching has to wait, setting `memory_limit=-1` and disabling `session.upload_progress.enabled` can close known attack paths, but neither makes the server safe. PHP 8.1 and older are outside normal support, although some operating-system vendors have backports and the PHP team published minimal source patches for 7.4 through 8.1.

A smaller follow-up issue appeared on October 23. CVE-2026-115560 affects an unusual application setup that changes the session serializer at runtime. It will be fixed in the next regular release. Most applications do not do this, but disabling `session.upload_progress.enabled` also blocks that path.

### Node.js Patches High-Severity DNS, TLS, and Brotli Bugs - [<i class="fas fa-external-link-alt"></i>](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases){:target="_blank"}

On October 21, [Node.js published security updates](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases){:target="_blank"} for every supported line. Install 26.12.1, 24.22.1, or 22.23.4. End-of-life releases are affected but will not receive fixes.

The most interesting bug is CVE-2026-105482. An application could validate one hostname, pass it to `dns.resolve()`, and have Node resolve a different hostname because a hidden NUL byte cut the string short. That matters for services that use domain allow lists to control outbound requests. The release also fixes high-severity TLS and Brotli issues, updates root certificates, and refreshes bundled network libraries.

### Python, OpenTofu, and Terraform Drop a Compromised Certificate Authority - [<i class="fas fa-external-link-alt"></i>](https://blog.python.org/2026/10/python-3151-3149-31317/){:target="_blank"}

On October 21, [Python shipped 3.15.1, 3.14.9, and 3.13.17](https://blog.python.org/2026/10/python-3151-3149-31317/){:target="_blank"} after the eMudhra and emSign certificate incident. Each release includes pip 26.2.2 and an updated certifi bundle that no longer trusts the compromised certificate chain.

Installing the new Python version does not update old virtual environments. Upgrade pip to 26.2.2 inside each one, and update uv if the project uses it. [OpenTofu 1.12.9](https://github.com/opentofu/opentofu/releases/tag/v1.12.9){:target="_blank"} and Terraform 1.17 made the same trust change in their own stacks.

### Ruby 4.0.9, 3.4.12, and 3.3.13 Fix Regex Bugs Behind GitLab RCEs - [<i class="fas fa-external-link-alt"></i>](https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/){:target="_blank"}

On October 23, [Ruby released 4.0.9, 3.4.12, and 3.3.13](https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/){:target="_blank"}. The releases fix memory bugs in Ruby's regular-expression engine that GitLab researchers turned into remote code execution.

Most Ruby applications are not directly exposed. The dangerous pattern is an application that takes text from a user and compiles it with `Regexp.new`, `Regexp.union`, `Regexp.compile`, or interpolation inside a regular expression. `Regexp.timeout` does not protect this compilation step, and limiting the pattern length is not enough. Applications that build regular expressions from user input should upgrade to one of the three fixed versions.

### Chrome 156 Fixes 353 Security Bugs - [<i class="fas fa-external-link-alt"></i>](https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop_02018666648.html){:target="_blank"}

On October 20, [Chrome 156 reached the stable channel](https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop_02018666648.html){:target="_blank"} with 353 security fixes. Six are critical and affect areas including graphics, accessibility, CSS, painting, and WebRTC. Google has not linked any of them to attacks in the wild. The fixed desktop version is 156.0.8078.47 or later; relaunch Chrome to finish the update.

Two critical reports came from AI-assisted security work. An Anthropic researcher used Claude to help find an accessibility bug, while OpenAI Codex Security reported a WebRTC memory-corruption issue. That does not make the browser safer on its own, but it is a concrete example of AI tools finding difficult low-level flaws.

CISA added eight bugs to its known-exploited list during the week. The most relevant to a common web stack is CVE-2026-110447, a command-injection flaw in Collabora Online when used with Nextcloud. Four Plex Media Server issues also joined the list.

GitHub and AWS both added security tools. [GitHub public monitoring](https://github.blog/changelog/2026-10-23-public-monitoring-adds-triage-validity-api-and-webhooks){:target="_blank"} can now check whether a leaked secret is still valid and send findings through an API or webhook. [AWS Continuum](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-continuum-for-code-vulnerabilities-is-now-generally-available){:target="_blank"} reached general availability for finding, validating, and fixing code vulnerabilities.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### OpenAI Acquires Orchestra Bio - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/openai-to-acquire-orchestra-bio/){:target="_blank"}

On October 20, [OpenAI acquired Orchestra Bio](https://openai.com/index/openai-to-acquire-orchestra-bio/){:target="_blank"}, a platform that coordinates the many teams and outside partners involved in drug development. Orchestra's team and product will join Rosalind, OpenAI's set of models and tools for life-sciences research. The price was not disclosed.

### Anthropic's Draft IPO Filing Shows an $80 Billion First-Half Loss - [<i class="fas fa-external-link-alt"></i>](https://www.aljazeera.com/news/2026/10/21/anthropic-posts-80bn-loss-in-first-half-of-2026-wsj){:target="_blank"}

On October 21, [Al Jazeera reported, citing the Wall Street Journal](https://www.aljazeera.com/news/2026/10/21/anthropic-posts-80bn-loss-in-first-half-of-2026-wsj){:target="_blank"}, that Anthropic's draft IPO prospectus shows a first-half loss above $80 billion. That number sounds like operating cash disappearing, but roughly $72 billion came from accounting changes tied to convertible notes and other financing instruments.

The filing still shows the extraordinary cost of the AI race. Anthropic says it may commit as much as $750 billion to computing capacity over the coming years, including deals that are still being negotiated.

### Layoffs: eBay Cuts About 9%, and Automattic Starts Cuts at WordPress.com

*   **eBay:** On October 20, eBay told employees it would cut about 9% of its workforce, or roughly 1,000 jobs. The [SEC filing](https://www.sec.gov/Archives/edgar/data/1065088/000106508826000205/ebay-20261020.htm){:target="_blank"} estimates $130 million to $150 million in costs, mostly for severance. This is eBay's second large round of cuts in 2026, after about 800 jobs disappeared in February.
*   **Automattic:** On October 21, [TechCrunch reported](https://techcrunch.com/2026/10/21/automattic-begins-layoffs-following-board-upheaval-and-executive-departures/){:target="_blank"} that cuts had reached communications, social media, WordPress.com, and the VIP enterprise business. Automattic did not disclose a total. The company says it is spreading the changes over time so it can offer more severance and spend more time with each affected employee.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **8.5.12, 8.4.27, 8.3.36, and 8.2.35** the PHP builds that fix CVE-2026-109618 and CVE-2026-109619
- **59%** less CLI text from DuckDB 2.0 agent mode in DuckDB's TPC-H test
- **22.2s to 11.9s** TypeScript check time on mui-docs, from 7.0 to the 7.1 beta, and **8,093 MiB to 4,079 MiB**
- **85%** lower median time to first token in Google's llm-d test on Ironwood, and **2.4x** throughput, versus a plain Kubernetes Service
- **353** security fixes in Chrome 156, **6** of them critical
- **$80 billion** Anthropic's reported first-half 2026 net loss, about **$72 billion** of it accounting charges, per the Wall Street Journal via Al Jazeera
- **9%** eBay's workforce cut, about **1,000** jobs, with a **$130 million to $150 million** pretax charge

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **CSS Animation Triggers** - October 20. First public working draft. Playback tied to DOM events and ranges.
*   **Chrome 156** - October 20. 156.0.8078.47. 353 security fixes, six critical.
*   **PostgreSQL RPM repos** - October 20. RHEL 10.0, RHEL 9.6, and SLES 15.6 move to the archive.
*   **eBay cuts** - October 20. About 9%, about 1,000 jobs. Charge of $130 million to $150 million.
*   **Orchestra Bio** - October 20. OpenAI acquisition. Price not disclosed. Team joins Rosalind.
*   **llm-d 1.0** - October 20. Kubernetes-native inference. Prefix-aware routing, v1 APIs.
*   **TypeScript 7.1 beta** - October 20. `npm install -D typescript@beta`. Import attributes, `es2026`, content mappers.
*   **DuckDB 2.0** - October 21. Long-term support. `CONNECT` and `duckdb -serve`. New files need 2.0.
*   **PHP security** - October 21. 8.5.12, 8.4.27, 8.3.36, 8.2.35. CVE-2026-109618 and CVE-2026-109619.
*   **PHP 8.6.0 RC4** - October 21. Contains the same fixes. Test build. RC5 is November 5.
*   **Node.js security** - October 21. 26.12.1, 24.22.1, and 22.23.4. High severity on each line.
*   **Python certificates** - October 21. 3.15.1, 3.14.9, 3.13.17. Bundled pip 26.2.2. Upgrade pip inside existing virtual environments.
*   **Terraform 1.17.0** - October 21. Variables in provider requirements. `-policies` is generally available.
*   **OpenTofu 1.12.9** - October 21. Filters compromised intermediate certificates. 1.13.2 fixes installer CPU on a hostile HTTP/2 server.
*   **OpenAI on Google Cloud** - October 21. GPT-6 Astra, GPT-6.1 Sol, and GPT-6 Luna. Private preview in Model Garden.
*   **Claude Duet** - October 21. Research preview on Opus 5.5. US Pro and Max, by waitlist.
*   **Automattic layoffs** - October 21. WordPress.com and VIP among the teams. No headcount.
*   **Anthropic first-half loss** - October 21. More than $80 billion, per the Wall Street Journal. About $72 billion is accounting charges.
*   **Unicode CLDR 49** - October 22. In ICU 79 and ICU4X 2.4. Updated for Unicode 18.
*   **AWS Continuum** - October 22. Generally available. Finds and remediates code vulnerabilities.
*   **GitHub secret monitoring** - October 22. Public monitoring preview for Enterprise Cloud with data residency. Validity checks, an API, and webhooks followed on October 23.
*   **Safari 27.1** - October 23. iPhone Duo. Fold APIs are behind feature flags. Simulator is in Xcode 27.1.
*   **Ruby regex fixes** - October 23. 4.0.9, 3.4.12, and 3.3.13. Matters when you compile a pattern from user input.
*   **PHP session note** - October 23. Set `session.upload_progress.enabled=0` until the next bugfix release. CVE-2026-115560.
*   **Spring Boot 4.2.0-RC1** - October 23. Default buildpack is `paketobuildpacks/ubuntu-resolute-builder` on Ubuntu 26.04.
*   **GitHub Apps** - October 23. Enterprise installations are generally available. Lands in GHES 3.24.
*   **Copilot in Teams** - October 23. The GitHub app can turn a notification into a code change.
*   **Enterprise Managed Users** - October 23. GitHub says some SCIM deprovisioned accounts were deleted, instead of suspended, between June 1 and June 13.

---

The PHP release is the clear priority this week: update to 8.5.12, 8.4.27, 8.3.36, or 8.2.35. DuckDB 2.0 deserves a test run, especially if server mode or cloud storage is useful, but try it on a copy of the data first. TypeScript 7.1 and Safari's fold APIs are previews worth exploring without rushing into production. Node.js, Ruby, Chrome, and Python's certificate bundle round out an unusually security-heavy week. See you next week.
