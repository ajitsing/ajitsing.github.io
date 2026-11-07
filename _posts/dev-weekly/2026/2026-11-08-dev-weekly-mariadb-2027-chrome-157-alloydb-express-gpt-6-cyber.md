---
layout: post
seo: true
title: "Dev Weekly Nov 2-8, 2026: MariaDB Platform 2027, Chrome 157, AlloyDB Express, GPT-6 Cyber"
subtitle: "MariaDB ships Enterprise Platform 2027, Chrome 157 tightens Background Fetch and adds HTML-in-canvas, AlloyDB Express starts a Postgres in seconds, and OpenAI releases GPT-6 Cyber for approved security research."
date: 2026-11-08
categories: tech-news
permalink: /dev-weekly/2026/nov-2-8/mariadb-2027-chrome-157-alloydb-express-gpt-6-cyber/
share-img: /assets/img/posts/dev_weekly/tech-news-2-8nov-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-2-8nov-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-2-8nov-2026.png
description: "Dev Weekly for November 2 to 8, 2026: MariaDB Platform 2027, Chrome 157, AlloyDB Express, and GPT-6 Cyber. On November 4 MariaDB made Enterprise Platform 2027 generally available, including Enterprise Server 12.3, with AI Retrieval still to come in public preview. On November 3 Chrome 157.0.8103.38 reached the stable channel with HTML-in-canvas, a CSS corner shorthand, custom text-overflow strings, and CORS enforcement for Background Fetch, plus 213 security fixes. On November 4 Google Cloud previewed AlloyDB Express, a scale-to-zero PostgreSQL that can be created in under two seconds at $0.115 per Compute Unit hour. On November 7 RFC 10073 defined composite ML-DSA signatures for X.509, pairing ML-DSA with RSA, ECDSA, or EdDSA. On November 7 GraphiQL 6 shipped as graphiql@6, with a query builder and a transport that prefers the HTTP QUERY method. On November 5 OpenAI released GPT-6 Cyber as gpt-6-cyber for approved Daybreak Red customers, at $20 per million input tokens and $100 per million output tokens. Also this week: Safari 27.3 beta Adaptive Dark Mode, kpt 1.0.0, NuGet-packaged agent skills, Gemini Omni 1.2 Flash at $0.07 per second of 720p video, Copilot in Xcode 27.3 beta and @GitHub in Slack and Teams, Rails 8.1.4.1 and 8.0.5.2, Next.js 16.4.5 and 15.5.29, Django 6.1.3, a removed npm loader in the @adminide-stack scopes, psqlODBC 18.00.0006, WordPress CVE-2026-119977 added to CISA's known-exploited list, a Node.js security release set for November 11, Marvell's $115 billion agreement to buy Lumentum, and layoffs at SUSE and Squarespace."
keywords: "dev weekly November 2 to 8 2026, software developer news November 2-8 2026, MariaDB Enterprise Platform 2027 Enterprise Server 12.3 AI Retrieval public preview, Chrome 157 HTML-in-canvas CSS corner shorthand text-overflow Background Fetch CORS 157.0.8103.38, AlloyDB Express preview scale-to-zero PostgreSQL $0.115 CU-hour gcloud, RFC 10073 composite ML-DSA X.509 post-quantum RSASSA-PSS ECDSA Ed25519, GraphiQL 6 graphiql@6 HTTP QUERY transport, GPT-6 Cyber gpt-6-cyber Daybreak Red $20 $2 $100 ExploitGym 48.5 percent, Safari 27.3 beta Adaptive Dark Mode color-scheme light only, kpt 1.0.0 Porch, NuGet SKILL.md dotnet-inspect dotnet-package-skills, Gemini Omni 1.2 Flash $0.07 per second 720p, GitHub Copilot Xcode 27.3 beta @GitHub Slack Teams, Rails 8.1.4.1 8.0.5.2 Active Storage GHSA-v924-7rp8-4mxh security support ends November 7, Next.js 16.4.5 15.5.29 use cache GHSA-mfr8-8qww-v76h, Django 6.1.3 6.0.10 5.2.19 CVE-2026-111362 GeoJSON, npm supply chain @adminide-stack @cdmbase @pubngo-stack, psqlODBC 18.00.0006 CVE-2026-120057, WordPress CVE-2026-119977 7.1.4 CISA KEV, Node.js November 11 2026 security release, Marvell Lumentum $115 billion all-stock, SUSE layoffs 10 percent, Squarespace layoffs 19 percent 300, vulnerability management supply chain security cloud security enterprise AI DevOps software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from November 2 to 8, 2026?"
    answer: "MariaDB made Enterprise Platform 2027 generally available on November 4, with Enterprise Server 12.3 as the transactional core. The same week Chrome 157 reached stable, Google Cloud previewed AlloyDB Express, and RFC 10073 defined composite ML-DSA signatures for X.509 certificates. OpenAI also released GPT-6 Cyber for a limited set of approved security customers."
  - question: "What is in MariaDB Enterprise Platform 2027, and does the community server get it?"
    answer: "The generally available bundle is MariaDB Enterprise Server 12.3, MariaDB Exa, MariaDB GridGain, MariaDB MaxScale, MariaDB Enterprise Manager, and the MariaDB Enterprise Kubernetes Operator. It runs on premises, in a cloud you operate, or as MariaDB Cloud. MariaDB AI Retrieval is not in that bundle yet. MariaDB says it follows in public preview on MariaDB Cloud later in November. Community MariaDB packages stay on their own release line."
  - question: "What can break when Chrome 157 rolls out?"
    answer: "Background Fetch now enforces CORS, including local-network checks, so a site can no longer use Background Fetch to skip the rules that apply to ordinary fetch. The CSS names anchors-valid and anchors-visible are now anchor-valid and anchor-visible, and the old names remain as aliases. The stable build is 157.0.8103.38 on Linux, and 157.0.8103.38 or 157.0.8103.39 on Windows and Mac."
  - question: "What is the API name and price for GPT-6 Cyber, and who can call it?"
    answer: "The API id is gpt-6-cyber. Standard short-context prices are $20 per million input tokens, $2 per million cached input tokens, and $100 per million output tokens. The context window is 1,050,000 tokens, with a maximum of 922,000 input tokens and 128,000 output tokens. An organization needs Daybreak Red access and a separate approval. OpenAI is starting with a select group of those customers, in the API and in Codex, and says it will widen access to all Daybreak Red customers."
  - question: "Which framework security updates shipped this week?"
    answer: "Rails 8.1.4.1 and 8.0.5.2, released November 4, fix 21 issues, including arbitrary file read and possible remote code execution in Active Storage image and video processing. Security support for Rails 8.0 ends November 7, 2026. Next.js 16.4.5 and 15.5.29, released November 3, fix cache leaks and header bugs. Install them with npm install next@16.4.5 or npm install next@15.5.29. Django 6.1.3, 6.0.10, and 5.2.19, also November 3, stop GeoJSON and spatial reference input from making the server fetch a URL or read a file."
---

MariaDB shipped a new enterprise platform this week, and Chrome put a batch of CSS and canvas changes into the stable browser. Google Cloud also opened a Postgres aimed at short-lived work, including the databases a coding agent creates and then forgets.

OpenAI released a cybersecurity model that most developers cannot call yet. A new internet standard spells out how to put a post-quantum signature and a classical one in the same certificate. GraphiQL, the tool many people use the first time they try a GraphQL API, jumped to version 6. The patch list is long. Rails, Next.js, Django, and the PostgreSQL ODBC driver all shipped security releases.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### MariaDB Enterprise Platform 2027 Puts Transactions, Analytics, and Agent State on One Server - [<i class="fas fa-external-link-alt"></i>](https://mariadb.com/newsroom/press-releases/mariadb-launches-into-the-agentic-era-with-an-agent-ready-platform-and-a-bold-new-brand/){:target="_blank"}

On November 4, [MariaDB made Enterprise Platform 2027 generally available](https://mariadb.com/newsroom/press-releases/mariadb-launches-into-the-agentic-era-with-an-agent-ready-platform-and-a-bold-new-brand/){:target="_blank"}. The idea is to stop splitting live application data, analytics, and the memory an AI agent needs across separate systems. The bundle includes MariaDB Enterprise Server 12.3, MariaDB Exa for analytics on that live data, MariaDB GridGain for in-memory storage, MariaDB MaxScale, MariaDB Enterprise Manager, and the MariaDB Enterprise Kubernetes Operator. It runs on premises, in a cloud the customer operates, or as a managed service on MariaDB Cloud.

The agent features are not all in that bundle yet. Agent Memory is a durable in-memory store meant to outlive one prompt. Semantic Cache is supposed to answer a repeated question, even when the wording changes, without calling the model again. MariaDB AI Retrieval, which turns a natural-language question into read-only SQL across documents and operational data, comes later. MariaDB says that service enters public preview on MariaDB Cloud later this month. Plugins for coding agents, including an MCP server, ship with the enterprise platform.

MariaDB says third-party testing showed 56% higher peak throughput than its previous major release, and that native vector search handles up to 30% more queries per second than that release. Raft clustering and conflict detection let a second region take writes. This is an enterprise build with a vendor behind the packages. Community MariaDB packages stay on their own release line.

### Chrome 157 Ships HTML-in-Canvas, and Background Fetch Now Obeys CORS - [<i class="fas fa-external-link-alt"></i>](https://chromestatus.com/release-notes/157){:target="_blank"}

On November 3, [Chrome 157 reached the stable channel](https://chromereleases.googleblog.com/2026/11/stable-channel-update-for-desktop.html){:target="_blank"} for Windows, Mac, and Linux. The change most likely to break an existing site is Background Fetch. It now enforces cross-origin rules, including local-network checks, the same way a normal fetch does. A site that used Background Fetch to reach a resource ordinary fetch would refuse will stop working that way.

The platform additions are for pages that draw their own interface. HTML-in-canvas lets a page render HTML with canvas primitives while keeping the DOM and the canvas in sync, both for drawing and for geometry. CSS gains a `corner` shorthand that sets `border-radius` and `corner-shape` for a corner in one declaration. `text-overflow` can take a custom string, such as a word instead of an ellipsis. `text-decoration-inset` controls how far an underline starts and ends from the text.

HTML insertion also gets a cleaner set of methods. Positional calls take markup directly, in place of `insertAdjacentHTML`, and streaming calls return a WritableStream. The CSS Working Group names `anchor-valid` and `anchor-visible` replace `anchors-valid` and `anchors-visible`. The plural names still work as aliases. Chrome for Android also exposes the Language Detector API, so a page can detect language on the device. The desktop build is 157.0.8103.38 on Linux, and 157.0.8103.38 or 157.0.8103.39 on Windows and Mac. The update includes 213 security fixes.

### AlloyDB Express Is a Postgres That Pauses When Idle - [<i class="fas fa-external-link-alt"></i>](https://cloud.google.com/blog/products/databases/introducing-alloydb-express-for-rapid-testing-and-prototyping/){:target="_blank"}

On November 4, [Google Cloud previewed AlloyDB Express](https://cloud.google.com/blog/products/databases/introducing-alloydb-express-for-rapid-testing-and-prototyping/){:target="_blank"}, a PostgreSQL aimed at prototypes, tests, and coding agents that need a database immediately. Google says a database can be ready in under two seconds from `gcloud`, the REST API, MCP, Terraform, or the console. After 15 minutes with no activity it pauses, and compute cost drops to zero until the next query wakes it.

Active compute is $0.115 per Compute Unit hour, billed by the second. Storage is $0.30 per GB-month for the space the data uses. A free tier includes 50 Compute Units a month. When an app outgrows the preview shape, Google says a one-click move to full AlloyDB keeps the data, schemas, users, and connection strings, and adds high availability, read replicas, and disaster recovery.

The defaults are closed. Public DNS endpoints hide the address and block inbound traffic until someone allows it. Private Service Connect and private DNS cover internal workloads. IAM, VPC Service Controls, and ordinary PostgreSQL roles still apply, including to an agent. Vector search is built in, with pgvector HNSW and Google's ScaNN index. SQL can also call `ai.if`, `ai.rank`, and `ai.generate` against Gemini. The preview runs beside the existing AlloyDB production service.

### RFC 10073 Puts a Post-Quantum Signature and a Classical One in the Same Certificate - [<i class="fas fa-external-link-alt"></i>](https://www.rfc-editor.org/info/rfc10073/){:target="_blank"}

On November 7, the IETF published [RFC 10073](https://www.rfc-editor.org/info/rfc10073/){:target="_blank"}, a Proposed Standard for composite ML-DSA signatures in X.509 certificates. ML-DSA is the NIST post-quantum signature algorithm. Many protocols have one slot for a public key and one slot for a signature. A composite algorithm fills that slot with both ML-DSA and a traditional algorithm, so a verifier still sees a single signature scheme.

The traditional half can be RSASSA-PKCS1-v1_5, RSASSA-PSS, ECDSA, Ed25519, or Ed448. The reason to carry both is practical. Implementers do not yet know whether a new post-quantum library will have a serious bug, and some regulators want ML-DSA deployed only beside an algorithm they already trust. Breaking the composite means breaking both halves. The RFC is explicit that this is not, by itself, a way for a new certificate to keep working with software that has never heard of ML-DSA.

The same week, [CISA, the NSA, and Australia's cyber agency published questions to ask vendors](https://www.cisa.gov/resources-tools/resources/post-quantum-questions-ask-your-vendors){:target="_blank"} about post-quantum plans. RFC 10073 is the wire format. The questionnaire is the procurement checklist. Neither one upgrades TLS for an existing API on its own.

### GraphiQL 6 Adds a Query Builder and Prefers the HTTP QUERY Method - [<i class="fas fa-external-link-alt"></i>](https://graphql.org/blog/2026-11-07-introducing-graphiql-6/){:target="_blank"}

On November 7, [GraphiQL 6 shipped](https://graphql.org/blog/2026-11-07-introducing-graphiql-6/){:target="_blank"}. Version 5 had already moved the editors to Monaco. This release rebuilds the workspace around them. A query builder selects fields from the schema and writes the operation in the editor, including lists of input objects and fields that return an interface or a union. Collections save named operations in the browser, or in a storage backend an embedded GraphiQL can supply. Results can be viewed as JSON, a tree, or a table.

The part that can change a request is the new `transport` API, which replaces the `fetcher` prop. Existing `fetcher` integrations still work. By default the transport sends `OPTIONS`, reads the `Allow` header, and for queries prefers the HTTP `QUERY` method, then `POST`, then `GET`. If the server does not advertise a method, it falls back to `POST`. Mutations stay on `POST`. The response header can show the method, status, elapsed time, and size. React apps install it as `graphiql@6`.

### OpenAI Releases GPT-6 Cyber for Approved Security Work - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/introducing-gpt-6-cyber){:target="_blank"}

On November 5, [OpenAI released GPT-6 Cyber](https://openai.com/index/introducing-gpt-6-cyber){:target="_blank"}, a model trained to find vulnerabilities, build exploits in an authorized setting, and stay inside the scope a researcher set. It is not a general chat model. Access starts with a select group of Daybreak Red customers, in the API and in Codex, and OpenAI says it will extend that to every Daybreak Red customer. Daybreak Blue remains the tier for checking a vulnerability and a fix with fewer refusals. GPT-5.6 Cyber is now open to all Daybreak Red customers as well.

The API id is `gpt-6-cyber`. Standard short-context prices are $20 per million input tokens, $2 per million cached input tokens, and $100 per million output tokens. The context window is 1,050,000 tokens. A request can take up to 922,000 input tokens and return up to 128,000 output tokens. OpenAI classifies the model as Critical for cybersecurity under its Preparedness Framework, up from High for GPT-5.6 Cyber.

On ExploitGym, which asks a model to exploit a known bug in a remote target, OpenAI reports 48.5% for GPT-6 Cyber and 32.1% for GPT-5.6 Cyber. On a separate test of known bugs in GitLab, PostgreSQL, and Jenkins, OpenAI says GPT-6 Cyber completed 95% of the tasks, while GPT-6 Astra on Daybreak Blue refused all of them. OpenAI also says the model helped find 81 high-severity Firefox bugs that Mozilla has started patching, and built working exploits for 948 Linux kernel bugs in the company's own research harness. Those numbers are OpenAI's. Calling the model this week still depends on a Daybreak Red approval.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### Safari 27.3 Beta Can Recolor a Light Site, Unless the Site Opts Out - [<i class="fas fa-external-link-alt"></i>](https://webkit.org/blog/18541/introducing-adaptive-dark-mode/){:target="_blank"}

On November 3, [WebKit announced Adaptive Dark Mode in Safari 27.3 beta](https://webkit.org/blog/18541/introducing-adaptive-dark-mode/){:target="_blank"}. If the system appearance is dark and the user accepts the preview, Safari recolors sites that only have a light design. WebKit's own count is that almost 40% of page loads are from people in dark mode, and about 10% of page loads actually support it. Sites that already declare `color-scheme: light dark`, or the matching HTML meta tag, are left alone so their own dark styles win.

The opt-out is `color-scheme: light only`, on the page or on one element. WebKit says the `only` keyword is not supported in Safari 27.3 beta 1, so that escape hatch is not reliable in this first beta. JavaScript that reads computed colors still sees the colors the author wrote, and canvas content is not transformed. WebKit does that so a site cannot detect the feature and add it to a fingerprint. Simple black-and-white logos may be inverted. Most photographs are not.

### kpt 1.0.0 Marks the Kubernetes Package Tool as Stable - [<i class="fas fa-external-link-alt"></i>](https://www.cncf.io/blog/2026/11/05/kpt-v1-0-0-is-released/){:target="_blank"}

On November 5, [the kpt project released v1.0.0](https://www.cncf.io/blog/2026/11/05/kpt-v1-0-0-is-released/){:target="_blank"}, its first stable toolchain after years of pre-release builds. kpt treats Kubernetes configuration as data, using KRM resources, instead of rendering templates. A package describes how to edit and check those resources for a specific site. The 1.0 work stabilized the APIs, removed unused features, and brought Porch, the package orchestration service, back under the kpt organization so the GitOps workflow and the command-line tool share one home.

### NuGet Packages Can Carry Agent Skills Beside the Library - [<i class="fas fa-external-link-alt"></i>](https://devblogs.microsoft.com/dotnet/delivering-skills-in-nuget-packages/){:target="_blank"}

On November 3, [.NET showed how a NuGet package can ship agent skills](https://devblogs.microsoft.com/dotnet/delivering-skills-in-nuget-packages/){:target="_blank"} as `SKILL.md` files next to the library. The point is timing. A package published today is not in a model's training data, and a README buried in the global package cache is an expensive thing for an agent to rediscover. A skill file can tell the agent how this version of the library is meant to be used.

`dotnet restore` already downloads the files. `dotnet-inspect package markout -S Skills` lists the skills in a package, and `dotnet-inspect project` does the same for a project file. `dotnet-package-skills install` copies them into `.agents/skills` so they can be committed. .NET says the NuGet MCP server does not surface skills yet, and that a follow-up will show agents loading them. The files use the same skill format as a git-based skill pack. .NET's other warning is about cost: a skill that helps a smaller model can still make a frontier model spend more, so package authors are being told to test on the models their users actually run.

---

## <i class="fas fa-robot"></i> AI & Models

### Gemini Omni 1.2 Flash Generates 15-Second Clips at a Lower Price - [<i class="fas fa-external-link-alt"></i>](https://cloud.google.com/blog/products/ai-machine-learning/gemini-omni-1-2-flash-generally-available/){:target="_blank"}

On November 5, [Gemini Omni 1.2 Flash became generally available on Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/gemini-omni-1-2-flash-generally-available/){:target="_blank"}. It is a video model for short product clips, ads, and edits, available in Gemini for business, Google Vids, and the API. A second of 720p video costs $0.07, which Google says is 30% less than Omni 1.1 Flash. Clips can run 15 seconds, up from 10. Drafts can be made at 360p or 720p and then upscaled to 1080p or 4K. Audio reference inputs stay behind an allowlist. Outputs carry a SynthID watermark.

### Copilot Enters Xcode's Assistant, and @GitHub Leaves Preview in Slack and Teams - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-11-06-github-copilot-in-slack-and-teams-is-generally-available){:target="_blank"}

On November 4, [GitHub Copilot entered public preview inside Xcode's own coding assistant](https://github.blog/changelog/2026-11-04-github-copilot-is-now-available-in-xcodes-coding-assistant){:target="_blank"}. This is separate from the existing Copilot for Xcode extension. It needs Xcode 27.3 beta on macOS Tahoe 26.6 or later. Setup is under Xcode, Settings, Intelligence. Every Copilot plan is supported.

On November 6, [`@GitHub` in Slack and Microsoft Teams became generally available](https://github.blog/changelog/2026-11-06-github-copilot-in-slack-and-teams-is-generally-available){:target="_blank"}. Mentioning it in a thread can investigate a bug, open an issue, or open a pull request without leaving the chat. Teams adds a Canvas for reviewing the plan and the diff beside the conversation. The bot tries to pick the repository from the message. Issues and pull requests it creates now say they came from a Slack or Teams conversation, including the person's username.

---

## <i class="fas fa-shield-alt"></i> Security

### Rails Patches Active Storage Processing, and 8.0 Security Support Ends - [<i class="fas fa-external-link-alt"></i>](https://rubyonrails.org/2026/11/4/Rails-8.0.5.2-and-8.1.4.1-have-been-released){:target="_blank"}

On November 4, [Rails released 8.0.5.2 and 8.1.4.1](https://rubyonrails.org/2026/11/4/Rails-8.0.5.2-and-8.1.4.1-have-been-released){:target="_blank"} for 21 security issues. The one to understand first is in Active Storage. A blob was written to a temp file that kept the uploaded filename's extension, then handed to FFmpeg or ImageMagick. Those tools can choose a decoder from the extension. [The advisory](https://github.com/rails/rails/security/advisories/GHSA-v924-7rp8-4mxh){:target="_blank"} says an FFmpeg build with AviSynth support can then read files the app can read, or load a native library the attacker also uploaded. Common Linux and Homebrew FFmpeg builds do not enable AviSynth. The GPL builds from ffmpeg.org do. The fix keeps the extension only when it matches the recorded content type.

The same releases cover a Strong Parameters bypass in `Parameters#each_key`, XSS in Action View, session-cookie problems, cache poisoning through content negotiation, and, in 8.1 only, IP spoofing through the `Forwarded` header. Rails says applications that already met the AviSynth conditions should treat secrets the process could read as exposed, including `secret_key_base`. Security support for the 8.0 series ends November 7, 2026. Older Rails lines are already unsupported. The fixed gems are `8.1.4.1` and `8.0.5.2`.

### Next.js Patches Cache Leaks Across Tenants and Users - [<i class="fas fa-external-link-alt"></i>](https://nextjs.org/blog/november-2026-security-release){:target="_blank"}

On November 3, [Next.js published security fixes in 16.4.5 and 15.5.29](https://nextjs.org/blog/november-2026-security-release){:target="_blank"}. Several of them are about `'use cache'`. A cached function that reads a root parameter, such as a tenant or a locale, could return another caller's result when it was also invoked through `unstable_cache`, or when nested cache functions recorded their dependencies too late. Binary arguments such as a `Blob` could collapse to the same cache key and mix two users. Self-hosted apps on `next start` can also poison a shared fallback shell, forward a fetched response in a way that injects another client's data, or expose an HttpOnly cookie through an internal header on an Edge route.

Install `next@16.4.5` on the 16 line, or `next@15.5.29` on the 15 line. The 15.5.29 release covers the self-hosted response bug, the SVG image-optimizer bypass, and the Edge cookie header. The cache-component leaks are in the 16.4.5 line.

### Django Stops GeoJSON and Spatial References from Fetching URLs - [<i class="fas fa-external-link-alt"></i>](https://www.djangoproject.com/weblog/2026/nov/03/security-releases/){:target="_blank"}

On November 3, [Django released 6.1.3, 6.0.10, and 5.2.19](https://www.djangoproject.com/weblog/2026/nov/03/security-releases/){:target="_blank"}. The moderate issue is CVE-2026-111362. Older GeoJSON allowed a coordinate reference system to be named by URL. GDAL still fetches those URLs, so a geometry built from user input could make the Django process request a network address or read a file. Lookups, `GeometryField`, and `GEOSGeometry` now reject external CRS references. `DataSource` and `LayerMapping` still accept them, because those paths are for data the operator trusts.

A second bug, CVE-2026-114582, passed `SpatialReference` strings to GDAL with network and file access left on. On GDAL 3.9 and later, string parsing now turns that access off, and file paths and URLs are no longer accepted. Integer SRIDs are the safer input. Django 6.1.3 also adds compatibility with Python 3.15. The other fixes cover base64 multipart uploads that ignored the memory limit, geometry values written raw into logs, and a cache key that treated a missing `Vary` header the same as an empty one.

### Hijacked npm Packages Used an Ethereum Transaction as a Loader Address - [<i class="fas fa-external-link-alt"></i>](https://blog.greenflagged.dev/posts/2026-11-03-adminide-stack-eth-dead-drop/){:target="_blank"}

On November 3 and 4, [twelve new versions across ten packages shipped a hidden loader](https://blog.greenflagged.dev/posts/2026-11-03-adminide-stack-eth-dead-drop/){:target="_blank"}. The set includes `@adminide-stack/utils`, `cdeops`, and `server-hemera-mongo`, plus packages under `@cdmbase` and `@pubngo-stack`. The loader runs when the package is imported, not from an install script. It reads a server address out of an Ethereum transaction, so the operator can point the next stage somewhere else without publishing another tarball. Some of the versions were published only under the `next` dist-tag. Others moved `latest`, so a normal install could resolve to them.

The second stage, which the researchers fetched from that server, installs a Node remote-access tool and tries to persist by patching npm's own `cli.js` and the startup files of VS Code, Cursor, Antigravity, Discord, and GitHub Desktop. npm removed all twelve versions on November 4. The packages are small. cdeops was the busiest, at 933 weekly downloads, and the rest were much smaller. A lockfile that still pins one of them is still worth finding, because loading the package was enough to start that persistence step. Removing the dependency afterward does not undo a file that was already patched.

### psqlODBC 18.00.0006 Fixes a Stack of Driver Bugs - [<i class="fas fa-external-link-alt"></i>](https://odbc.postgresql.org/changelog/){:target="_blank"}

On November 2, the PostgreSQL ODBC project [released psqlODBC 18.00.0006](https://www.postgresql.org/about/news/security-release-for-psqlodbc-3431/){:target="_blank"}. The [changelog](https://odbc.postgresql.org/changelog/){:target="_blank"} lists 11 vulnerabilities in every release before it. Several are high-severity buffer overflows: a large-object read that writes past the application's buffer (CVE-2026-120057), a row cache that overflows when a later fetch changes the column count (CVE-2026-120058), and an ODBC escape parser that overflows a fixed stack array (CVE-2026-120061). CVE-2026-120062 is SQL injection through table and schema names passed to `SQLSpecialColumns`, and it applies from 17.00.0006 through 18.00.0005.

Applications that pass untrusted SQL to the driver, or that talk to a server they do not fully trust, are the ones that should move first. The fixed version is 18.00.0006.

### WordPress Upgrade Bug Is on the Known-Exploited List, and Node.js Warns of November 11 Builds - [<i class="fas fa-external-link-alt"></i>](https://www.cisa.gov/news-events/alerts/2026/11/03/cisa-adds-one-known-exploited-vulnerability-catalog){:target="_blank"}

On November 3, [CISA added CVE-2026-119977](https://www.cisa.gov/news-events/alerts/2026/11/03/cisa-adds-one-known-exploited-vulnerability-catalog){:target="_blank"} to the known-exploited vulnerabilities catalog. It is a race in WordPress core. During a full package upgrade, WordPress unpacks the new files, including the installer, into a folder under `wp-content/upgrade` that the web server can reach. An unauthenticated attacker who wins that short window can run code. [Wordfence says](https://www.wordfence.com/blog/2026/11/attackers-actively-probing-for-upgrade-window-rce-vulnerability-in-wordpress-core/){:target="_blank"} the fix shipped on October 28 in WordPress 7.1.4, with matching releases back through the 4.7 line, including 7.0.8, 6.9.11, and 6.8.12. Wordfence also says its firewall has blocked more than 240,000 exploit attempts. The awkward part is that the update which installs the fix still uses the old unpacker once. Wordfence's advice is to block web access to `wp-content/upgrade` and then update, rather than wait.

On November 3, [Node.js said security releases for the 26, 24, and 22 lines](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases){:target="_blank"} will land on or shortly after Wednesday, November 11. Each line's highest issue is rated high. There are no CVE numbers yet. End-of-life lines do not get those builds. CISA also listed a SonicWall SSL VPN bug, CVE-2026-19868, on November 6, and an older Apple authentication bug, CVE-2024-27834, on November 4.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### Marvell Agrees to Buy Lumentum for $115 Billion in Stock - [<i class="fas fa-external-link-alt"></i>](https://investor.marvell.com/news-events/press-releases/detail/1040/marvell-and-lumentum-to-combine-creating-a-category-leader-in-ai-connectivity){:target="_blank"}

On November 2, [Marvell announced an all-stock agreement to acquire Lumentum](https://investor.marvell.com/news-events/press-releases/detail/1040/marvell-and-lumentum-to-combine-creating-a-category-leader-in-ai-connectivity){:target="_blank"}. Lumentum stockholders would receive 4.500 Marvell shares for each Lumentum share. Marvell puts the implied enterprise value at $115 billion, about $1,132 a share, a 23.9% premium to the October 28 close. After closing, Marvell stockholders would own about 67% of the combined company and Lumentum stockholders about 33%.

The product reason is the cabling and optics inside AI clusters. Marvell brings switching and interconnect chips. Lumentum brings optical components and the factories that build them. Matt Murphy stays chairman and CEO. Three Lumentum directors, including CEO Michael Hurlston, would join Marvell's board. The companies expect to close in the first half of 2028, if shareholders and regulators agree. They keep operating separately until then. Marvell's filing dates the merger agreement to November 1. The public announcement was November 2.

### Layoffs: SUSE Cuts About 10%, and Squarespace Cuts About 19%

*   **SUSE:** On November 2, [The Register reported](https://www.theregister.com/software/2026/11/02/suse-to-cut-one-in-ten-employees-because-of-ai/5306950){:target="_blank"} an internal email from CEO Dirk-Peter van Leeuwen cutting about 10% of SUSE's workforce. The Register put that workforce at about 1,900 people. The note attributes the cut to automation and AI changing how the company builds and supports its Linux and open-source products. Affected employees were to be told by November 4. The report is based on that email. The rest of the company is due to hear the fiscal 2027 plan on November 16.
*   **Squarespace:** On November 2, Squarespace [confirmed to TechCrunch](https://techcrunch.com/2026/11/02/web-host-squarespace-lays-off-19-of-its-employees/){:target="_blank"} that it is cutting about 19% of staff, around 300 people. The company said the cut is meant to simplify how it operates. TechCrunch tied the move to AI website builders taking work that hosted-site products used to own. Squarespace went private in 2024 in a deal valued at about $7 billion.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$115 billion** implied enterprise value in Marvell's all-stock agreement to buy Lumentum, at 4.500 Marvell shares per Lumentum share
- **56%** higher peak throughput MariaDB reports for Enterprise Platform 2027 versus its previous major release, in third-party testing
- **48.5%** of ExploitGym tasks solved by GPT-6 Cyber, versus **32.1%** for GPT-5.6 Cyber, in OpenAI's evaluation
- **$20, $2, and $100** per million input, cached input, and output tokens for `gpt-6-cyber`
- **213** security fixes in Chrome 157
- **21** security issues fixed in Rails 8.0.5.2 and 8.1.4.1
- **$0.115** per Compute Unit hour for AlloyDB Express while it is awake, then **$0** after 15 minutes idle
- **240,000** WordPress upgrade-race attempts Wordfence says its firewall has blocked since the October 28 patch

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Marvell and Lumentum** - November 2. All-stock deal. Implied enterprise value $115 billion. Close aimed at the first half of 2028.
*   **Squarespace** - November 2. About 19% of staff, around 300 people.
*   **SUSE** - November 2. About 10% of a workforce The Register put at about 1,900. Internal email, reported rather than a company release.
*   **psqlODBC** - November 2. Version 18.00.0006. Eleven vulnerabilities, including CVE-2026-120057 and CVE-2026-120062.
*   **EC2 image scanning** - November 2. Amazon Inspector can scan an AMI for vulnerabilities without launching the instance.
*   **Chrome 157** - November 3. Stable. Background Fetch enforces CORS. Build 157.0.8103.38.
*   **Django** - November 3. 6.1.3, 6.0.10, and 5.2.19. CVE-2026-111362. Django 6.1.3 also runs on Python 3.15.
*   **Next.js** - November 3. 16.4.5 and 15.5.29. Cache and header fixes.
*   **WordPress on the KEV list** - November 3. CVE-2026-119977. Patched October 28 in 7.1.4 and older-branch security releases.
*   **Node.js warning** - November 3. High-severity fixes for 26, 24, and 22, on or after November 11. No CVE numbers yet.
*   **NuGet skills** - November 3. `SKILL.md` inside a package. `dotnet-package-skills install` copies them into `.agents/skills`.
*   **Safari Adaptive Dark Mode** - November 3. Safari 27.3 beta. `color-scheme: light dark` keeps your own dark styles. The `only` keyword is not in beta 1.
*   **MariaDB Enterprise Platform 2027** - November 4. Generally available. Enterprise Server 12.3. AI Retrieval preview comes later this month.
*   **AlloyDB Express** - November 4. Preview. Create in under two seconds. Pauses after 15 idle minutes.
*   **Rails** - November 4. 8.1.4.1 and 8.0.5.2. Active Storage processing. Rails 8.0 security support ends November 7.
*   **Copilot in Xcode** - November 4. Public preview in Xcode 27.3 beta. Settings, then Intelligence.
*   **npm loader** - November 4. npm removes twelve malicious versions across ten packages, including `cdeops` and `@adminide-stack/utils`.
*   **Hive to Iceberg** - November 4. S3 Tables offers a managed migration from Apache Hive tables to Apache Iceberg.
*   **GPT-6 Cyber** - November 5. API id `gpt-6-cyber`. Daybreak Red approval. $20 and $100 per million input and output tokens.
*   **Gemini Omni 1.2 Flash** - November 5. Generally available. $0.07 per second of 720p. Clips up to 15 seconds.
*   **kpt 1.0.0** - November 5. First stable release. Porch is back in the kpt project.
*   **Post-quantum vendor questions** - November 5. CISA, the NSA, and Australia's cyber agency publish a question list for suppliers.
*   **DynamoDB bulk put** - November 5. Generally available. Loads items from Amazon S3 into an existing table.
*   **@GitHub in Slack and Teams** - November 6. Generally available. Opens issues and pull requests from the conversation.
*   **Z4M machines** - November 6. Google Cloud's storage-optimized Z4M series is generally available.
*   **Security Hub SBOM** - November 6. AWS Security Hub keeps an organization-wide software bill of materials for compute.
*   **SonicWall on the KEV list** - November 6. CVE-2026-19868. SSL VPN single-factor bypass.
*   **Kimi K3.1 Pro** - November 6. Available on Amazon Bedrock.
*   **GraphiQL 6** - November 7. Package `graphiql@6`. Queries prefer the HTTP `QUERY` method when the server allows it.
*   **RFC 10073** - November 7. Composite ML-DSA for X.509, combined with RSA, ECDSA, or EdDSA.

---

MariaDB Enterprise Platform 2027 and AlloyDB Express are the two new places to put a database this week, one as a shipped enterprise bundle and one as a Google Cloud preview that pauses when it is idle. Chrome 157 changes Background Fetch, and `anchors-valid` becomes `anchor-valid`, with the old name kept as an alias. GraphiQL 6 may send queries as HTTP `QUERY`. Rails 8.1.4.1, Next.js 16.4.5, Django 6.1.3, and psqlODBC 18.00.0006 are the security releases with a version to install. Node.js has the next runtime fixes scheduled for November 11, the same week .NET Conf is set to launch .NET 11. See you next week.
