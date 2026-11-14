---
layout: post
seo: true
title: "Dev Weekly Nov 9-15, 2026: .NET 11, Rust 1.100, GraphQL over HTTP, Nitro Sandboxes"
subtitle: ".NET 11 and C# 15 are out, Rust 1.100 stabilizes the never type, GraphQL publishes HTTP rules, AWS isolates pods in Nitro Sandboxes, and Gemini Decision 1 scores a thousand questions in one call."
date: 2026-11-15
categories: tech-news
permalink: /dev-weekly/2026/nov-9-15/dotnet-11-rust-1-100-graphql-http-nitro-gemini-decisions/
share-img: /assets/img/posts/dev_weekly/tech-news-9-15nov-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-9-15nov-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-9-15nov-2026.png
description: "Dev Weekly for November 9 to 15, 2026: .NET 11, Rust 1.100, GraphQL over HTTP, AWS Nitro Sandboxes, and Gemini Decision 1. On November 10 Microsoft released .NET 11, a Standard Term Support release with two years of support, C# 15 union types, and OpenAPI 3.2 as the ASP.NET Core default. Support for .NET 8 and .NET 9 ended the same day. On November 12 Rust 1.100.0 stabilized the never type and the Allocator trait for Box and Vec, and it changed never-type fallback to ! in editions before 2024. Cargo also gained an opt-in minimum publish age. On November 12 the GraphQL over HTTP specification shipped, with the response type application/graphql-response+json, and on November 13 the September 2026 GraphQL spec allowed empty selection sets. On November 9 AWS Nitro Sandboxes became available for EKS, ECS, and EC2 at no extra charge. Set runtimeClassName to isolated-sandbox. On November 11 Google launched the Gemini Decisions API and gemini-decision-1, at $0.10 per million input tokens and $0 for output, scoring up to 1,000 yes/no, choice, or rubric questions per call. On November 10 Gemini 4 Carbon, gemini-4-carbon, became generally available at $2 and $10 per million tokens through November 30. On November 12 Gemini 4 Hydrogen, gemini-4-hydrogen, followed at $1.50 and $7.50. On November 9 Anthropic released Claude Fable 5.2 as claude-fable-5-2 at $8 and $40 per million tokens. Also this week: AWS Emulator on 127.0.0.1:9297, ClickHouse Managed Postgres generally available and the Xata acquisition, withdrawal of Java primitive patterns from JDK 28, TPU 8tx and TPU 8i Max, PostgreSQL 18.7 and 14 end of life, Node.js 26.13.1, 24.22.3, and 22.23.5, Microsoft's 1,094 November patches including the exploited Outlook bug CVE-2026-124194, OpenSSH CVE-2026-123158 added to CISA's known-exploited list, LangChain's $300 million Series C at a $3 billion valuation, and layoffs at Axonius."
keywords: "dev weekly November 9 to 15 2026, software developer news November 9-15 2026, .NET 11 C# 15 union types net11.0 STS OpenAPI 3.2 .NET 8 .NET 9 end of support, Rust 1.100 never type Allocator DropGuard cargo global-min-publish-age rustup update stable, GraphQL over HTTP specification September 2026 application/graphql-response+json empty selection sets, AWS Nitro Sandboxes isolated-sandbox EKS ECS EC2 runtimeClassName, Gemini Decisions API gemini-decision-1 noul choice score $0.10 per million input tokens v1beta, Gemini 4 Carbon gemini-4-carbon $2 $10 $4 $20 GitHub Copilot, Gemini 4 Hydrogen gemini-4-hydrogen $1.50 $7.50, Claude Fable 5.2 claude-fable-5-2 Mythos 5.2 $8 $40, AWS Emulator port 9297 CC0, ClickHouse Managed Postgres GA Xata acquisition, Java primitive patterns withdrawn JDK 28, TPU 8tx TPU 8i Max Cloud Pathways GKE dynamic slicing, PostgreSQL 18.7 17.12 16.16 15.20 14.25 end of life 19 RC 2, Node.js 26.13.1 24.22.3 22.23.5 CVE-2026-123864 CVE-2026-123863, Microsoft Patch Tuesday November 2026 1094 CVEs CVE-2026-124194 Outlook, OpenSSH CVE-2026-123158 10.6p2 CISA KEV, LangChain $300 million Series C $3 billion CapitalG, Axonius layoffs, vulnerability management supply chain security cloud security enterprise AI DevOps software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from November 9 to 15, 2026?"
    answer: ".NET 11 shipped on November 10 with C# 15, and Rust 1.100.0 shipped on November 12 with a stable never type. The same week the GraphQL over HTTP specification was released, AWS opened Nitro Sandboxes for pods and tasks, and Google launched the Gemini Decisions API. PostgreSQL and Node.js also published large security updates."
  - question: "How do you start a .NET 11 app, and what happened to .NET 8 and .NET 9?"
    answer: "Install the .NET 11 SDK and create a project with dotnet new console -n HelloDotnet11 -f net11.0. C# 15 is the default language for net11.0, including union types. .NET 11 is a Standard Term Support release with two years of support. .NET 10 remains the long-term support option. Support for .NET 8 and .NET 9 ended on November 10, 2026."
  - question: "What can break when you update to Rust 1.100?"
    answer: "Run rustup update stable. Rust 1.100 lets you name the never type, spelled !, in more places, and Infallible is now an alias of that type. In the 2015, 2018, and 2021 editions, the compiler's never-type fallback changes from () to !, which can surface new errors in a few crates. Cargo's minimum publish age is opt-in. Set global-min-publish-age under [registry] in .cargo/config.toml."
  - question: "What does the GraphQL over HTTP specification change about status codes?"
    answer: "The September 2026 edition is at http-spec.graphql.org. Responses should use the media type application/graphql-response+json. A response that includes data uses a 2xx status. A response that contains only errors uses a 4xx or 5xx status. The notes suggest 294 Partial Success when both data and errors are present. The QUERY method is planned for a later revision and is not in this edition."
  - question: "What is the API name and price for Gemini Decision 1?"
    answer: "The model id is gemini-decision-1. It is called through client.decisions.create on API version v1beta, which needs Google Gen AI SDK 3.2 or later. A request can score up to 1,000 yes/no, multiple-choice, or rubric questions over one shared input. Price is $0.10 per million input tokens and $0 for output tokens. The yes/no question type is named noul."
---

.NET 11 is out, and so is the Rust release that finally lets you name the never type. GraphQL wrote down the HTTP rules servers have been improvising since 2015. AWS started putting a pod or a task in its own Nitro virtual machine.

Google opened an API that scores closed questions, and it made Gemini 4 Carbon available to paying developers. PostgreSQL and Node.js both shipped security updates worth putting on the calendar.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### .NET 11 Ships With C# 15 Unions, and .NET 8 and 9 Leave Support - [<i class="fas fa-external-link-alt"></i>](https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/){:target="_blank"}

On November 10, [Microsoft released .NET 11](https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/){:target="_blank"}. It is a Standard Term Support release, which means two years of the same servicing policy as a long-term release, on a shorter clock. .NET 10 stays the long-term option. Support for .NET 8 and .NET 9 ended the same day, so those apps need a supported target if they still want fixes.

C# 15 is the default language on `net11.0`. The addition most code will notice is a union: a value that is one of a declared set of types, with the compiler checking that a switch handles each case. A product lookup can return a `Product` or a `ProductNotFound` without stuffing both into `object`.

```csharp
public union ProductLookup(Product, ProductNotFound);
```

Closed hierarchies are the other half of that idea. A `closed` class can only be subclassed in the assembly that declares it, so the compiler can check patterns over that hierarchy. ASP.NET Core understands unions in JSON bodies for minimal APIs and MVC, and generated OpenAPI documents describe the cases with `anyOf`. OpenAPI 3.2 is now the default for those documents. Route, query, header, and form binding do not get the same union support.

Install the .NET 11 SDK, then create a console app with `dotnet new console -n HelloDotnet11 -f net11.0`. Installing the SDK does not retarget an existing app. Change the target framework, update packages, and read the breaking changes, including a higher minimum CPU. NuGet can also skip package versions published more recently than an age you choose. Keep the vulnerability checks you already run. Runtime Async, which moves async suspension into the runtime so debuggers can show the real methods, is still a preview. On a `net11.0` project, turn it on with `<Features>runtime-async=on</Features>`.

### Rust 1.100 Stabilizes the Never Type, and Cargo Can Wait Out Fresh Crates - [<i class="fas fa-external-link-alt"></i>](https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/){:target="_blank"}

On November 12, [Rust 1.100.0](https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/){:target="_blank"} stabilized the never type after ten years and five failed attempts. The type is spelled `!`. It is the type of code that never produces a value, such as `return`, `break`, and `std::process::exit`. You could already see that behavior, and you could already write `-> !` on a function. This release lets you name `!` in other positions, such as `Result<T, !>`. `Infallible` is now an alias of `!`, so older APIs that used `Infallible` line up with the never type.

That alias required a breaking change. In the 2015, 2018, and 2021 editions, never-type fallback changes from `()` to `!`, matching what edition 2024 already did. Most code will not notice. Code that ignores the result of a function returning a generic parameter can. The compiler may also treat more code as unreachable. Rust says it warned ahead of time and shipped fixes for public crates that broke. If a dependency fails, update it before assuming the bug is yours. Update with `rustup update stable`.

Two library pieces landed beside the type. The core of `allocator_api` is stable, so a custom allocator can back `Vec` and `Box` through the `Allocator` trait. More collections are still to come. `core::mem::DropGuard` runs a closure when a value drops, and `DropGuard::dismiss` returns the value without running that closure, which is a small way to roll back a function that failed halfway. Cargo can also refuse crates that were published moments ago. In `.cargo/config.toml`:

```toml
[registry]
global-min-publish-age = "3 days"
```

`cargo update` then skips versions newer than that window and tells you what it held back. `cargo install` ignores the setting. A one-off override is `CARGO_RESOLVER_INCOMPATIBLE_PUBLISH_AGE=allow`. Versions with no publish time in the index are never held back. Cargo also warns about unused dependencies when you build every target that could use them.

### GraphQL Finally Specifies HTTP, Including Real Status Codes - [<i class="fas fa-external-link-alt"></i>](https://graphql.org/blog/2026-11-12-announcing-the-graphql-over-http-spec/){:target="_blank"}

On November 12, the GraphQL technical steering committee [released the GraphQL over HTTP specification](https://graphql.org/blog/2026-11-12-announcing-the-graphql-over-http-spec/){:target="_blank"}. The main GraphQL spec has always refused to pick a transport. That was fine for odd cases, and awkward for the common one, because every server invented its own HTTP habits. This document is a separate spec. The [September 2026 edition](https://http-spec.graphql.org/September2026/){:target="_blank"} says a server must accept `POST`, and it may accept `GET`. Subscriptions are out of scope.

The change you can see in logs is the response type `application/graphql-response+json`. A lot of servers answered with `application/json`. A proxy error page can use that same type, so a client could not tell a GraphQL body from an error page. The workaround was HTTP 200 on every GraphQL result, success or failure. If the status was 200, the body was safe to parse. Monitoring was the loser: every failure looked successful. If the body is `application/graphql-response+json`, the client can trust the shape whatever the status is. The rule is simple. Data means a `2xx`. Only errors means a `4xx` or `5xx`. The notes suggest `294 Partial Success` when both `data` and `errors` are present. A mutation over `GET` is a `405`. The spec does not cover the HTTP `QUERY` method yet. The working group says that belongs in the next revision.

On November 13, the same group [released the September 2026 edition of the GraphQL spec itself](https://graphql.org/blog/2026-11-13-september-2026-graphql-spec/){:target="_blank"}, aiming for a yearly cadence after a four-year gap. Empty selection sets are now valid. That matters when a client removes the last server field from a selection because the field only exists in the client. On a server that implements this edition, the smallest query that is valid everywhere is `{}`, where it used to be `{__typename}`. You can also put `@deprecated` on a directive definition, using the `DIRECTIVE_DEFINITION` location. And `@oneOf` input objects can no longer describe a value that is impossible to construct, such as a one-of that only contains itself. The spec text is [the September 2026 edition](https://spec.graphql.org/September2026/){:target="_blank"}.

### Nitro Sandboxes Give Each Pod Its Own Virtual Machine - [<i class="fas fa-external-link-alt"></i>](https://aws.amazon.com/about-aws/whats-new/2026/11/nitro-sandboxes-eks-ecs-ec2/){:target="_blank"}

On November 9, [AWS made Nitro Sandboxes available](https://aws.amazon.com/about-aws/whats-new/2026/11/nitro-sandboxes-eks-ecs-ec2/){:target="_blank"} for an EKS pod, an ECS task, or a small virtual machine on EC2. Each one runs in a lightweight VM on the Nitro hypervisor, with the isolation of a Nitro instance, on hardware you are already paying for. There is no extra charge. AWS says they run on most Nitro instance types, in all commercial regions, at close to normal EC2 speed. The pitch is untrusted code, including code a model just wrote, sharing a machine without sharing a kernel.

On EKS Auto Mode the opt-in is one field, `runtimeClassName: isolated-sandbox`. The cluster needs Kubernetes 1.36 or later. Auto Mode already has the runtime class and will start a capable node. `confidential-sandbox` is the variant that treats the node operator as untrusted. The annotation `sandbox.amazonaws.com/network-isolated: "true"` boots the VM with no network beyond loopback. Put the runtime class and any `sandbox.amazonaws.com/` annotation on the pod template, not on the Deployment's own metadata, or Kubernetes will ignore them. Self-managed node groups need a sandbox AMI and Nitro Enclaves enabled on the instance. Pod Identity, the VPC CNI, EBS, EFS, S3, and CloudWatch still work. The [EKS write-up](https://aws.amazon.com/blogs/containers/aws-nitro-sandboxes-hardware-enforced-workload-isolation-on-amazon-eks/){:target="_blank"} walks through the first pod.

### Gemini Decision 1 Scores the Answer Instead of Writing It - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/){:target="_blank"}

On November 11, [Google launched the Gemini Decisions API](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/){:target="_blank"}, backed by a new model, Gemini Decision 1. A normal model writes text, and your code then parses a yes or a category out of that text. This one does not write the answer. You send one shared input and a map of questions. It returns a probability and a confidence for each question. Google says a call finishes in about 150 to 250 milliseconds.

The model id is `gemini-decision-1`. Calls use `client.decisions.create` on API version `v1beta`. That needs the Google Gen AI SDK 3.2 or later, from `pip install -U google-genai` or `npm install @google/genai@latest`. One request can hold up to 1,000 questions. The shared input can be text, an image, audio, video, or a PDF, up to 262,144 tokens, and it is billed once no matter how many questions you attach. Each question still adds its own instruction tokens. There are three question types. Yes/no is `noul`, and it returns a probability from 0.01 to 0.99. `choice` picks one of 2 to 255 options and returns a probability for each. `score` grades an ordered rubric and returns a weighted score. Price is $0.10 per million input tokens and $0 for output tokens. Google says that, on its own benchmark suite, this is nearly 5 times cheaper than asking Gemini 3.5 Flash-Lite to make the same decisions through the Interactions API. There is a no-cost tier in Google AI Studio for trying it. Support in Gemini on Google Cloud is still on the way.

The shape fits routing, policy checks, and picking a tool, where the legal answers are already a list. Google says its Stitch design tool uses the API to draft a product flow from a prompt in seconds. A call that needs a written paragraph still belongs on Carbon or Hydrogen.

### Gemini 4 Carbon Is Now Open to Paying Developers - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/){:target="_blank"}

On November 10, [Gemini 4 Carbon became generally available](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/){:target="_blank"}. Google calls it the frontier model for long jobs: multi-step coding, debugging, and research where the model spends more tokens checking itself. Gemini 4 Argon stays the model Google points most software work at. Carbon had been in a cybersecurity preview, the Fairwind Program, for two weeks. Paying developers can now call it from Google AI Studio and Gemini for business. Google AI Ultra subscribers also get it in the Gemini app, Antigravity, and AI Mode in Search.

The API id is `gemini-4-carbon`. The introductory price matches Argon, $2 per million input tokens and $10 per million output tokens, through November 30. After that the price is $4 and $20. The same day, [GitHub Copilot added Carbon](https://github.blog/changelog/2026-11-10-gemini-4-carbon-in-github-copilot){:target="_blank"} for complex coding and agent tasks. Google also says a research effort called AlphaProof Code used Carbon, along with other models, to produce Lean proofs of security properties in the code of the Signal protocol. Google says that took weeks, and that a specialist team would usually need years. That is Google's account of its own project. Carbon for the more offensive cybersecurity tier remains inside the Fairwind application, separate from the public API model.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### AWS Emulator Answers SDK Calls on Your Laptop - [<i class="fas fa-external-link-alt"></i>](https://aws.amazon.com/about-aws/whats-new/2026/11/aws-emulator-now-available/){:target="_blank"}

On November 11, [AWS released AWS Emulator](https://aws.amazon.com/about-aws/whats-new/2026/11/aws-emulator-now-available/){:target="_blank"} for local and CI runs. SDK and CLI calls hit the emulator and return in milliseconds, with no AWS account. Supported operations return the same success or the same error AWS would. Anything not filled in yet returns `501 Not Implemented`. State lives in memory until the process stops. Each process gets its own port, keys, and state, so two test runs do not see each other's tables.

The local process listens on `https://127.0.0.1:9297`. The [getting started guide](https://docs.aws.amazon.com/emulator/latest/userguide/getting-started.html){:target="_blank"} covers a Linux package, a Docker image for macOS and Windows, and an embedded mode for Rust tests. Point the SDK at it with `AWS_ENDPOINT_URL=https://127.0.0.1:9297` and the credential files the emulator writes under `~/.aws/emulator/9297/`. A check that actually reached the emulator is `aws sts get-caller-identity`, which should show account `000000000000`. If you see your real account, the call went to AWS. The source is public under CC0. There is no service fee. You pay only for the resources you later create in AWS.

### ClickHouse Managed Postgres Is Generally Available, and Xata Joins It - [<i class="fas fa-external-link-alt"></i>](https://clickhouse.com/blog/managed-postgres-ga-xata-acquisition){:target="_blank"}

On November 9, [ClickHouse made Managed Postgres generally available](https://clickhouse.com/blog/managed-postgres-ga-xata-acquisition){:target="_blank"} in ClickHouse Cloud, and it acquired Xata. The Postgres service is the production piece: local NVMe, already in use by what ClickHouse calls hundreds of production customers, with change data capture into ClickHouse. ClickHouse says it will fold Xata's branching, cloning, and scale-to-zero storage into Managed Postgres over the coming months, including a tier meant for agents that need a throwaway database. What you can provision today is the managed Postgres.

### Java Drops Primitive Patterns Before JDK 28 - [<i class="fas fa-external-link-alt"></i>](https://mail.openjdk.org/archives/list/amber-spec-experts@openjdk.org/message/UYEK3PGOHN6R56AHJTSLPGAY363K666S/){:target="_blank"}

On November 9, the Amber team [withdrew primitive types in patterns, instanceof, and switch](https://mail.openjdk.org/archives/list/amber-spec-experts@openjdk.org/message/UYEK3PGOHN6R56AHJTSLPGAY363K666S/){:target="_blank"}. The feature has been in preview since JDK 23, and a sixth preview was drafted for JDK 28. It will be removed instead. JDK 28 will reject those constructs even with `--enable-preview`.

The reason is Project Valhalla. The preview defined which numeric conversions are exact, meaning they do not lose information. Valhalla is still designing user-defined numeric types, and those types need the same idea of an exact conversion. The Amber leads, Angelos Bimpoudis and Gavin Bierman, say finalizing the current rules would be premature. Record patterns whose primitive bindings already match the component type stay. A different feature, constant patterns, is planned to carry some of the `switch` work forward. They say a draft JEP is coming. Code that adopted the preview has to change before it will compile on JDK 28.

### Google Adds Two More Eighth-Generation TPU Systems - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/){:target="_blank"}

On November 9, [Google introduced TPU 8tx and TPU 8i Max](https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/){:target="_blank"}. Google calls them systems: new packaging, networking, and security around the eighth-generation chips it announced in April. TPU 8t was the trainer and TPU 8i was the low-latency reasoner. 8tx uses the same silicon as 8t, paired with 5th Generation AMD EPYC hosts, and keeps data and weights protected while they are in use. Google says that cuts latency by up to 2x versus 8t, and that the same machine can fine-tune on private data without moving it to a separate training cluster. 8i Max puts two 8i chips in one package, which Google says doubles compute, on-chip memory, and high-bandwidth memory compared with a single 8i, in the same rack space.

The software notes in the same post are easier to try than the new racks. Cloud Pathways, the single-controller runtime DeepMind uses for Gemini, is generally available on Google Kubernetes Engine. GKE dynamic slicing is also generally available, so a job can be reassembled onto a larger or smaller TPU topology without rebuilding a node pool. Google says that cuts startup time by up to 5x. A PyTorch path, TorchTPU, was open sourced last month. This announcement does not add a public order form for 8tx or 8i Max.

### GitHub Actions Drops ARM32, and Copilot Names Models Leaving in December - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-11-12-actions-for-arm32-linux-windows-retirement){:target="_blank"}

On November 12, [GitHub said hosted Actions runners will stop running ARM32 jobs](https://github.blog/changelog/2026-11-12-actions-for-arm32-linux-windows-retirement){:target="_blank"} on Linux and Windows by December 8, 2026. The reason is Node. Hosted runners are moving off Node 20, and Node 24 does not support ARM32. Native 32-bit ARM user space on those hosted runners goes with it.

On November 13, [Copilot listed models it will remove on December 14](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december){:target="_blank"} across chat, edits, agent mode, and completions. Claude Fable 5 gives way to Fable 5.2, Gemini 3.8 Flash to Gemini 4 Hydrogen, Gemini 4 Argon to Gemini 4 Carbon, and Grok 4.6 to Grok 4.7. Claude Haiku 4.5 moves to Haiku 5.5, except for individual subscribers on annual plans, who keep Haiku 4.5. Kimi K3 is on the list with no replacement named yet. Enterprise and Business tenants that still use the default model policy get the replacements enabled. Tenants that turned that default off have to enable the new models themselves.

---

## <i class="fas fa-robot"></i> AI & Models

### Gemini 4 Hydrogen Is the Fast Gemini 4 Model, Including in Search - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/){:target="_blank"}

On November 12, [Google released Gemini 4 Hydrogen](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/){:target="_blank"}. Carbon and Argon are the models for the long, expensive tasks. Hydrogen is the one Google wants in the everyday loop: coding, tool use, and short agent runs. It is available on the free and paid Gemini API, in AI Studio, in Gemini for business, in the Gemini app, and in Google Search for all users. Free app users get it when automatic model selection picks it. Paid Google AI Pro and Ultra subscribers can use it in Antigravity.

The API id is `gemini-4-hydrogen`. The context window is 1 million tokens, with the same price the whole way: $1.50 per million input tokens and $7.50 per million output tokens. Cached input is $0.075 per million. Thinking levels are `low`, `medium`, `high` (the default), and a new `xhigh`. [Copilot added Hydrogen](https://github.blog/changelog/2026-11-13-gemini-4-hydrogen-in-github-copilot){:target="_blank"} on November 13. Google's migration note treats it as the replacement for Gemini 3.8 Flash.

### Claude Fable 5.2 Cuts the Price of Anthropic's Heavy Model - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/claude-fable-and-mythos-5-2){:target="_blank"}

On November 9, [Anthropic released Claude Fable 5.2 and Claude Mythos 5.2](https://www.anthropic.com/claude-fable-and-mythos-5-2){:target="_blank"}. They are the same model with two access rules. Fable keeps the cybersecurity and biology safeguards and is open to every customer. Mythos drops those safeguards and is limited to organizations in Anthropic's cyber and life-sciences verification programs. Anthropic says output is up to 30% faster than Fable 5.1, and that the safeguards block fewer ordinary requests.

The API id is `claude-fable-5-2`. Price is $8 per million input tokens and $40 per million output tokens, down from $10 and $50. Cache reads are $0.20 per million. An optional fast mode, up to 2.5 times quicker, is $16 and $80, on the Claude API, Claude Code, Google Cloud, and Microsoft Foundry. Fable 5.2 is also on AWS. Anthropic still points most day-to-day coding at Claude Opus 5.5, and treats Fable as the model for the open-ended technical work.

---

## <i class="fas fa-shield-alt"></i> Security

### PostgreSQL Patches 52 Security Bugs, and Version 14 Is Finished - [<i class="fas fa-external-link-alt"></i>](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/){:target="_blank"}

On November 12, [PostgreSQL released 18.7, 17.12, 16.16, 15.20, and 14.25](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/){:target="_blank"}, plus PostgreSQL 19 release candidate 2. The update fixes 52 security vulnerabilities and more than 140 other bugs. Many of the security bugs are rated 8.8 and can run code inside the database process. One example is type confusion after `ALTER ... SET DATA TYPE`, CVE-2026-6460. This is also the last release of PostgreSQL 14. That version is end of life and will not get further fixes.

Some of the other bugs corrupt data or return the wrong rows, so the package update has a follow-up. GIN indexes can miss rows or return unrelated ones. If you suspect that, `REINDEX` the index. GiST indexes that use `pg_trgm` need a reindex too. B-tree indexes on `bpchar` columns declared without a length can return wrong rows from an index-only scan, and those need a reindex. Columns declared as `char(n)` are fine. Incremental backups taken before this update should be retired. Take a new full backup and base later incrementals on that. A parallel `pg_dump` against a standby could corrupt both the dump and the standby. Stop the server and replace the binaries.

PostgreSQL 19 is still a release candidate. The project plans the final release for November 19, unless another candidate is required. RC 2 includes this round of fixes. If you created expression indexes, generated columns, or partition keys on RC 1 using `JSON_ARRAY()` or `JSON_OBJECT()` over arrays, composite types, or ranges, drop or redefine them before `pg_upgrade`. Those indexes can go stale, and the upgrade tools will refuse to recreate them.

### Node.js Security Builds Fix HTTP/2 Crashes and an HTTPS Memory Leak - [<i class="fas fa-external-link-alt"></i>](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases){:target="_blank"}

On November 11, [Node.js published the security releases](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases){:target="_blank"} it had scheduled for that day. The versions are 26.13.1, 24.22.3, and 22.23.5. Every active line has at least one high-severity fix. End-of-life lines do not get builds.

The HTTPS bug to understand first is CVE-2026-123864, on 22, 24, and 26. An unauthenticated client can make the server copy memory from other connections, including TLS private keys and other people's requests, into a request body. Plain HTTP is not affected. A separate high-severity bug, CVE-2026-123863, lets any client abort an HTTP/2 process during session teardown. That one is on 24 and 26. The advisory is long. It also covers a TLS 1.2 renegotiation that can carry a client certificate to a hostname it was not issued for, crashes in `respondWithFile()`, and a permission-model bug that treats a wildcard path as a grant on the file without the wildcard. If you run 22, 24, or 26, install the version above.

### Microsoft's November Patches Include an Exploited Outlook Bug - [<i class="fas fa-external-link-alt"></i>](https://msrc.microsoft.com/update-guide/releaseNote/2026-Nov){:target="_blank"}

On November 10, [Microsoft's monthly security release](https://msrc.microsoft.com/update-guide/releaseNote/2026-Nov){:target="_blank"} covered 1,094 CVEs in Microsoft products. The release notes call out one exploited bug, CVE-2026-124194, an Outlook spoofing flaw. Opening a crafted message file can make Outlook connect to an attacker-controlled server and disclose NTLM authentication material, without the usual warning about external content. The person has to open the file, and the machine has to be able to reach the network. [CISA added it to the known-exploited list the same day](https://www.cisa.gov/news-events/alerts/2026/11/10/cisa-adds-six-known-exploited-vulnerabilities-catalog){:target="_blank"}, along with five other bugs, including a Chromium use-after-free in the XML parser, CVE-2026-125350. Windows, Office, Exchange, SharePoint, SQL Server, and .NET are all in the month's update set. Chrome's own stable channel moved the same week, to 157.0.8103.78 on November 11, with an early rollout of 158 starting November 12.

On November 9, [CISA also added four exploited vulnerabilities](https://www.cisa.gov/news-events/alerts/2026/11/09/cisa-adds-four-known-exploited-vulnerabilities-catalog){:target="_blank"}, including OpenSSH CVE-2026-123158. The workaround shipped earlier, in OpenSSH 10.6p2 on November 5. It affects Linux builds that use musl and do not use PAM. Alpine's default OpenSSH package is the usual example. On some account setups, a password between 256 and 1,024 characters is accepted. glibc systems that authenticate through PAM are outside that bug. After you install the fixed package, restart `sshd`. Replacing the files does not replace the daemon that is already running.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### LangChain Raises $300 Million at a $3 Billion Valuation - [<i class="fas fa-external-link-alt"></i>](https://www.langchain.com/blog/series-c){:target="_blank"}

On November 13, [LangChain announced a $300 million Series C](https://www.langchain.com/blog/series-c){:target="_blank"} at a $3 billion valuation. CapitalG led the round. GIC, DFJ Growth, IVP, and Sapphire Ventures participated. LangChain says the money goes to LangSmith, its platform for running and reviewing agents, and that more than 7,000 organizations use it. The company started as the open-source library people used to bolt tools onto earlier models. The pitch now is the layer around the agent: traces, evals, and a place to run it that is not tied to one model vendor.

### Layoffs: Axonius Cuts About 9% of Staff, Mostly Engineering in Israel

*   **Axonius:** On November 9, [Calcalist reported](https://www.calcalistech.com/ctechnews/article/9upwifo24){:target="_blank"} that the security-asset company is cutting 66 jobs, about 9% of a workforce it put at 722. Forty-six of those jobs are at the Israeli development center, about 22% of the 207 people there. Employees can take a mutual separation agreement or ask for a hearing. CEO Joe Diamond told the news outlet the engineering organization is being reshaped around an AI-driven way of building software. It is the company's third cut in a year.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **1,000** questions in one `gemini-decision-1` request, at **$0.10** per million input tokens and **$0** for output
- **$2 and $10** per million input and output tokens for `gemini-4-carbon` through November 30, then **$4 and $20**
- **$1.50 and $7.50** per million input and output tokens for `gemini-4-hydrogen` across its 1 million token window
- **$8 and $40** per million input and output tokens for `claude-fable-5-2`, down from **$10 and $50**
- **1,094** Microsoft CVEs in the November patches, **1** of them already exploited
- **52** security vulnerabilities fixed in PostgreSQL 18.7, 17.12, 16.16, 15.20, and 14.25
- **$300 million** in LangChain's Series C, at a **$3 billion** valuation
- **2 years** of support for .NET 11, which is a Standard Term Support release

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **TPU 8tx and TPU 8i Max** - November 9. New systems around the existing eighth-generation chips. Cloud Pathways and GKE dynamic slicing are generally available.
*   **Axonius** - November 9. About 66 jobs, 46 of them in the Israeli engineering center.
*   **ClickHouse** - November 9. Managed Postgres is generally available. Xata is acquired. Branching comes later.
*   **Claude Fable 5.2** - November 9. API id `claude-fable-5-2`. $8 and $40 per million tokens. Mythos 5.2 is the verified-access build of the same model.
*   **Nitro Sandboxes** - November 9. `runtimeClassName: isolated-sandbox` on EKS Auto Mode. No extra charge.
*   **Java primitive patterns** - November 9. Withdrawn. JDK 28 drops them even with `--enable-preview`.
*   **.NET 11** - November 10. C# 15 unions. `dotnet new console -f net11.0`. .NET 8 and .NET 9 support ended.
*   **Gemini 4 Carbon** - November 10. `gemini-4-carbon`. $2 and $10 per million tokens until November 30.
*   **Gemini Robotics 2.5** - November 10. A new robot model for partners. Google says Apptronik's Apollo 2 packed parts on Mercedes-Benz lines with a 96% success rate in a proof of concept.
*   **Patch Tuesday** - November 10. 1,094 Microsoft CVEs. Exploited Outlook bug CVE-2026-124194.
*   **CloudNativePG** - November 10. The Kubernetes operator for PostgreSQL became a CNCF incubating project.
*   **Spring for Apache Pulsar** - November 10. Spring says the project has a new home at the Apache Software Foundation.
*   **OpenSSH CVE-2026-123158** - November 9 on the known-exploited list. Workaround is OpenSSH 10.6p2 from November 5. musl, no PAM. Restart `sshd`.
*   **Node.js** - November 11. 26.13.1, 24.22.3, and 22.23.5. High-severity HTTP/2 and HTTPS fixes.
*   **AWS Emulator** - November 11. Local SDK endpoint on port 9297. Account `000000000000` means you hit the emulator.
*   **Gemini Decision 1** - November 11. `gemini-decision-1`. Up to 1,000 questions. $0.10 per million input tokens.
*   **AlphaGenome 2** - November 11. A research model for how DNA variants affect specific cell types. Non-commercial API. Not for clinical use.
*   **GitHub issue fields** - November 11. Issue types and custom fields are generally available on personal-account repositories.
*   **Chrome 157** - November 11. Stable build 157.0.8103.78. An early stable of 158 started November 12.
*   **Rust 1.100** - November 12. `rustup update stable`. Never type is stable. Fallback changes to `!` before edition 2024.
*   **GraphQL over HTTP** - November 12. Response type `application/graphql-response+json`. Errors can finally use a 4xx or 5xx.
*   **GraphQL spec** - November 13. September 2026 edition. `{}` is a valid query on servers that implement it.
*   **PostgreSQL** - November 12. 18.7 and the matching older versions. PostgreSQL 14 is done. 19 is still RC 2, aimed at November 19.
*   **Gemini 4 Hydrogen** - November 12. `gemini-4-hydrogen`. $1.50 and $7.50 per million tokens. Also in Search.
*   **Cognito** - November 12. User pools can exchange tokens under OAuth 2.0 token exchange, RFC 8693.
*   **GitHub Actions** - November 12. ARM32 hosted runners on Linux and Windows end December 8.
*   **Intelligent eyewear** - November 12. Android XR glasses from Warby Parker and Gentle Monster opened for pre-order, from $395. In stores December 10. US and South Korea accounts.
*   **LangChain** - November 13. $300 million Series C at a $3 billion valuation, led by CapitalG.
*   **Copilot models** - November 13. Fable 5, Gemini 3.8 Flash, Gemini 4 Argon, Grok 4.6, and Kimi K3 leave Copilot on December 14.

The releases you can type this week are .NET 11, Rust 1.100, Node 26.13.1, and PostgreSQL 18.7. GraphQL's HTTP spec changes the status code on a failed query. Gemini Decision 1 changes the shape of a call that only has to pick from a list. Carbon and Hydrogen are the models now behind the open-ended calls in Google's API and in Copilot.
