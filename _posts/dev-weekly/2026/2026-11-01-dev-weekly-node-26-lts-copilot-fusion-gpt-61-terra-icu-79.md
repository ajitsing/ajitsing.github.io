---
layout: post
seo: true
title: "Dev Weekly Oct 26-Nov 1, 2026: Node.js 26 Enters LTS, Gemini 4 Carbon, Copilot Fusion, GPT-6.1 Terra"
subtitle: "Node.js 26 enters long-term support, Google announces Gemini 4 Carbon, GitHub turns on Copilot Fusion, OpenAI launches GPT-6.1 Terra, and a Google TPU in orbit answers its first prompt."
date: 2026-11-01
categories: tech-news
permalink: /dev-weekly/2026/oct-26-nov-1/node-26-lts-copilot-fusion-gpt-61-terra-icu-79/
share-img: /assets/img/posts/dev_weekly/tech-news-26oct-1nov-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-26oct-1nov-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-26oct-1nov-2026.png
description: "Dev Weekly for October 26 to November 1, 2026: Node.js 26 enters LTS, Google announces Gemini 4 Carbon, and OpenAI launches GPT-6.1 Terra. GitHub also shipped Copilot Fusion. On October 28 Node.js 26.13.0 became the Lithium long-term support release, supported through April 2029, with no code changes from 26.12.1. On October 29 the first Node.js 27 alpha, 27.0.0-alpha.0.0.0, changed the default heap limit and shipped V8 15.6. On October 28 GitHub Copilot Fusion became generally available in VS Code, the Copilot app, Copilot CLI, and JetBrains, with Standard, High, and Max effort. GitHub Enterprise Cloud customers working with a sales team can now include Copilot for every licensed user and pay for AI credits. On October 26 OpenAI released GPT-6.1 Terra as gpt-6.1-terra at $1 per million input tokens, $0.05 cached, and $5 output, in ChatGPT Work, Codex, and Amazon Bedrock. On October 27 ICU 79.1 shipped Unicode 18 and CLDR 49. On October 26 AWS KMS added ML-KEM-512, ML-KEM-768, and ML-KEM-1024. On October 28 Google announced Gemini 4 Carbon, limited at first to selected cyber defenders, with an introductory price of $2 per million input tokens and $10 per million output tokens. On October 30 a Project Suncatcher satellite returned the first AI response from a data-center-class TPU in orbit, running Gemma 4. Also this week: a self-managed VMware stack on Google Cloud, JDK 28 value classes in preview, Safari 27.2 renaming fit-tolerance, EKS Auto Mode Gateway API support, Google Cloud spend caps generally available, Python 3.15.2 and related certificate releases, PHP Windows builds for CVE-2026-111497, Redis and Valkey cluster pub/sub fixes, GitLab CVE-2026-97229 added to CISA's known-exploited list, Intel's agreement to acquire Classiq, Upwind's $400 million Series C, Dropbox cutting about 9%, and a Microsoft voluntary exit offer."
keywords: "dev weekly October 26 November 1 2026, software developer news October 26 to November 1 2026, Gemini 4 Carbon October 28 2026 Fairwind Program $2 $10 per million tokens Artificial Analysis Intelligence Index 59, Project Suncatcher TPU orbit Gemma 4 October 30 2026, Node.js 26.13.0 Lithium LTS April 2029, Node.js 27.0.0-alpha.0.0.0 V8 15.6 max-old-space-size OpenSSL 4.1 npm 12.1.0, GitHub Universe 2026 Copilot Fusion Standard High Max 30 percent discount, GitHub Enterprise includes Copilot Copilot Standalone $10, GPT-6.1 Terra gpt-6.1-terra $1 $0.05 $5 Terminal-Bench 4.0 Amazon Bedrock, ICU 79.1 Unicode 18 CLDR 49 icu4j Maven, AWS KMS ML-KEM FIPS 203 ML-KEM-512 ML-KEM-768 ML-KEM-1024 Encapsulate Decapsulate post-quantum cloud security, VMware solution on Google Cloud VCF 9 self-managed Z3 bare metal, JDK 28 JEP 401 value classes preview, Safari 27.2 fit-tolerance flow-tolerance field-content, Amazon EKS Auto Mode Kubernetes Gateway API, Google Cloud spend caps API generally available, Python 3.15.2 3.14.10 3.13.18 3.12.16 3.11.18 CVE-2026-115557 eMudhra, PHP Windows 8.5.12-1 8.4.27-1 8.3.36-1 8.2.35-1 CVE-2026-111497 Brotli, Redis 8.8.4 Valkey 9.1.3 GHSA-f4q9-j22m-xqq9, GitLab CVE-2026-97229 CISA KEV 19.4.2, Intel Classiq acquisition, Upwind $400 million Series C $3.8 billion, Dropbox layoffs 9 percent 200 Ali Dasdan, Microsoft voluntary exit offer, GPT-6 Rosalind gpt-6-rosalind, vulnerability management supply chain security DevOps observability enterprise AI software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from October 26 to November 1, 2026?"
    answer: "Node.js 26.13.0 entered long-term support on October 28 as the Lithium release, with the same code as 26.12.1 and updates planned through April 2029. The same week GitHub made Copilot Fusion generally available, OpenAI launched GPT-6.1 Terra, and ICU 79 shipped with Unicode 18 and CLDR 49."
  - question: "Should I upgrade to Node.js 26.13.0 or try the Node.js 27 alpha?"
    answer: "Use Node.js 26.13.0 for production. It is the Lithium long-term support release and does not change behavior from 26.12.1. Linux hosts moving up from Node.js 22 or 24 may need the libatomic package because official Linux binaries have been linked against it since Node.js 25. The October 29 build, 27.0.0-alpha.0.0.0, is for testing only. If an app depended on the old default heap, set --max-old-space-size explicitly. The alpha also counts Buffer and ArrayBuffer memory toward that limit, and its v8.serialize, structuredClone, and postMessage output cannot be read by older Node.js versions."
  - question: "How do I turn on GitHub Copilot Fusion?"
    answer: "Update VS Code, the GitHub Copilot app, Copilot CLI, or a JetBrains IDE, then choose Copilot Fusion in the model picker and pick Standard, High, or Max. Fusion chooses one or more enabled models for the task. You are billed at each model's normal rate. Paid Copilot plans get a limited-time 30% discount on those model costs. Administrators can limit which models Fusion is allowed to use and can set Fusion as the default."
  - question: "What is the API name and price for GPT-6.1 Terra?"
    answer: "The API id is gpt-6.1-terra. Standard prices are $1 per million input tokens, $0.05 per million cached input tokens, and $5 per million output tokens. It is available in ChatGPT Work and Codex for Plus, Pro, Enterprise, and Edu, and it is generally available on Amazon Bedrock. It is not in the regular Chat tab. OpenAI says the API price is 50% lower than GPT-5.6 Terra and GPT-6.1 Sol."
  - question: "How do I use ML-KEM keys in AWS KMS?"
    answer: "Create an ML-KEM key with spec ML-KEM-512, ML-KEM-768, or ML-KEM-1024. Encapsulate uses the public key and returns a 32-byte shared secret plus ciphertext. Decapsulate recovers that secret from the ciphertext with the private key, which stays in KMS hardware security modules. GetPublicKey exports the public key so OpenSSL, AWS-LC, or Bouncy Castle can encapsulate locally. ML-KEM is available in KMS regions except the Middle East (UAE), Middle East (Bahrain), and China Regions."
---

Node.js picked a production line this week, and it also showed what the next major will break. Version 26 is now the long-term support release. A first alpha of version 27 landed the next day, with a smaller default memory limit that can change how large services behave.

GitHub used its Universe conference to stop making developers pick a model for every task. OpenAI shipped a cheaper model aimed at computer use, and Google announced a stronger Gemini that almost nobody can call yet. A Google TPU in orbit also sent back its first answer. Here is what changed and why it matters.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Node.js 26 Enters Long-Term Support, and Node 27 Alpha Shrinks the Heap - [<i class="fas fa-external-link-alt"></i>](https://nodejs.org/en/blog/release/v26.13.0){:target="_blank"}

On October 28, [Node.js 26.13.0 became the Lithium long-term support release](https://nodejs.org/en/blog/release/v26.13.0){:target="_blank"}. It will keep receiving updates through the end of April 2029. The build itself is a label change: aside from release metadata such as `process.release`, it matches 26.12.1, the security release from the week before.

Teams moving up from Node.js 22 or 24 should check Linux packaging. Since Node.js 25, the official Linux binaries link against libatomic, and some distributions do not install that library by default. If `node` fails to start after the upgrade, that missing package is the first thing to look for.

On October 29, [Node.js published 27.0.0-alpha.0.0.0](https://nodejs.org/en/blog/release/v27.0.0-alpha.0.0.0){:target="_blank"} so framework and native-addon authors can test the next major early. It is not a production release. The change most likely to surprise an existing app is memory. When `--max-old-space-size` is unset, the default heap cap is half of the machine's physical memory, clamped between 256 MB and 4 GB. Memory held by `Buffer` and `ArrayBuffer` now counts toward that cap. Services that grew large heaps under the old default should set the flag explicitly before they treat a passing alpha test as proof.

The alpha also updates V8 from 14.6 to 15.6 and turns on `Math.sumPrecise()`, `Iterator.zip()`, and a few related iterator helpers. `v8.serialize()`, `structuredClone()`, and `postMessage()` use a new format that older Node.js versions cannot read. OpenSSL engines are gone, the bundled OpenSSL is 4.1, and Intel macOS builds are experimental. npm in this alpha is 12.1.0.

### ICU 79 Ships Unicode 18 and CLDR 49 - [<i class="fas fa-external-link-alt"></i>](https://blog.unicode.org/2026/10/icu-79-released.html){:target="_blank"}

On October 27, [Unicode released ICU 79](https://blog.unicode.org/2026/10/icu-79-released.html){:target="_blank"}. ICU is the library behind a lot of date, number, collation, and locale behavior in operating systems, browsers, Java, and other runtimes. Last week's CLDR 49 announcement described the locale data. This week's release is the library build that applications actually upgrade.

ICU 79 includes Unicode 18, so new characters, emoji, and IDNA changes come along with the locale data. The C++ and Java implementations of MessageFormat 2.0 were updated to match CLDR 49, though some of that API is still a technology preview. Walking backward through line breaks is also faster, which matters for editors and text layout that repeatedly measure the previous break opportunity.

Java projects pick it up as `com.ibm.icu:icu4j:79.1`. One future break is already announced: starting with ICU 80, ICU4J will phase out its promise that serialized objects remain compatible across ICU versions. If an application stores ICU objects with Java serialization, that is the migration to plan before the next major.

### AWS KMS Can Now Wrap Secrets with ML-KEM - [<i class="fas fa-external-link-alt"></i>](https://aws.amazon.com/about-aws/whats-new/2026/10/kms-ml-kem-post-quantum/){:target="_blank"}

On October 26, [AWS Key Management Service added ML-KEM](https://aws.amazon.com/about-aws/whats-new/2026/10/kms-ml-kem-post-quantum/){:target="_blank"}, a post-quantum way for two parties to agree on a shared secret. The worry it addresses is simple. Someone can record today's encrypted key exchange and decrypt it later, once a large quantum computer exists. ML-KEM is the NIST standard meant to replace older Diffie-Hellman and RSA key transport for that job. The spec is FIPS 203.

KMS supports all three sizes: `ML-KEM-512`, `ML-KEM-768`, and `ML-KEM-1024`. `Encapsulate` uses the public key and returns a random 32-byte secret plus a ciphertext. `Decapsulate` turns that ciphertext back into the same secret. The private key stays inside KMS hardware security modules. `GetPublicKey` exports the public half so a partner can run the encapsulate step locally with OpenSSL, AWS-LC, or Bouncy Castle.

The feature is on in every KMS region except the Middle East (UAE), Middle East (Bahrain), and China Regions. It does not by itself upgrade TLS for existing APIs. It is a new key type for applications that want to start exchanging secrets with a post-quantum algorithm.

### Copilot Fusion Picks the Model, and Enterprise Plans Include Copilot - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion){:target="_blank"}

On October 28, at GitHub Universe, [Copilot Fusion became generally available](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion){:target="_blank"}. Instead of choosing Claude, GPT, or another model for each prompt, you choose Fusion and an effort level. Standard favors everyday coding. High spends more on harder tasks. Max goes after the most capable models GitHub is allowed to use.

Fusion may answer with one model, draft with a cheaper model and escalate if the draft looks weak, or have a second model critique the first. GitHub says Fusion Max scored 60 on the Artificial Analysis Coding Agent Index, within two points of Claude Code using Opus 5.5 at Max. In that run it cost about half as much and finished about 40% faster. That is GitHub's reading of a third-party index, not a guarantee for your repository.

It is in VS Code, the GitHub Copilot app, Copilot CLI, and JetBrains IDEs. Update the client, open the model picker, and select Copilot Fusion. You still pay each underlying model's normal rate. Paid Copilot plans get a limited-time 30% discount on those costs. Admins can block individual models inside Fusion without turning those models off for everyone, and they can make Fusion the default.

The same day, [GitHub Enterprise started including Copilot](https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot){:target="_blank"} for customers who buy through a GitHub or Microsoft account team. Every licensed user can use Copilot features, and usage bills against the enterprise AI budget from the first request. There is no monthly pile of included AI credits per seat. Code completion and next edit suggestions keep working when the budget is empty. Chat, code review, and cloud agents stop until budget is available. Self-serve customers are not on this model yet. People in the enterprise who do not have a GitHub Enterprise license can buy Copilot Standalone at $10 per user per month, with the same features and the same lack of included credits.

### OpenAI Launches GPT-6.1 Terra for Computer Use - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/introducing-gpt-6-1-terra){:target="_blank"}

On October 26, [OpenAI released GPT-6.1 Terra](https://openai.com/index/introducing-gpt-6-1-terra){:target="_blank"}, a faster model meant for visual work and for driving software on a screen. The API id is `gpt-6.1-terra`. Standard price is $1 per million input tokens, $0.05 per million cached input tokens, and $5 per million output tokens. OpenAI says that is half the price of GPT-5.6 Terra and GPT-6.1 Sol.

In ChatGPT it shows up in Work and Codex for Plus, Pro, Enterprise, and Edu plans, not in the regular Chat tab. [Amazon Bedrock made the same model generally available](https://aws.amazon.com/about-aws/whats-new/2026/10/openai-gpt-6-1-terra-on-amazon-bedrock/){:target="_blank"} the same day. Select it from the model list once the rollout reaches the account. Plan usage limits do not grow because Terra is cheaper. The allowance simply covers more Terra calls than it did for the older Terra or for Sol.

OpenAI's own coding test is the number worth keeping. On Terminal-Bench 4.0, at maximum reasoning effort, Terra solved 50.3% of command-line tasks, compared with 21.5% published for GPT-5.6 Terra. Sol and GPT-6 Astra are still the models OpenAI points to for the hardest coding work. On an internal set of prompts built to cause factual errors, the low-effort error rate fell from 53.6% to 16.7%. Terra also meets the Critical threshold, OpenAI's highest cybersecurity risk class, under its Preparedness Framework.

### Google Cloud Adds a Self-Managed VMware Option - [<i class="fas fa-external-link-alt"></i>](https://cloud.google.com/blog/products/infrastructure-modernization/vmware-solution-on-google-cloud/){:target="_blank"}

On October 27, [Google Cloud made a self-managed VMware deployment generally available](https://cloud.google.com/blog/products/infrastructure-modernization/vmware-solution-on-google-cloud/){:target="_blank"}. This is separate from Google Cloud VMware Engine, where Google runs the stack. The new option puts VMware Cloud Foundation 9.x on dedicated bare-metal machines and leaves root administration of ESXi, vCenter, and NSX with the customer or a partner.

The point is license and operations, not a new hypervisor. Customers bring existing VMware Cloud Foundation subscriptions and keep their own patch windows. It is available in 22 regions. Each advertised Z3 node has 96 physical cores, 1.5 TB of memory, 72 TB of NVMe, and 200 Gbps networking. Teams that wanted vSphere in Google Cloud without handing lifecycle management to Google can start with their account team or a listed partner.

---

{% include ads/in-article.html %}

## <i class="fas fa-code"></i> Developer Tools & Platforms

### JDK 28 Preview Turns Integer and LocalDate into Value Classes - [<i class="fas fa-external-link-alt"></i>](https://inside.java/2026/10/27/quality-heads-up/){:target="_blank"}

On October 27, the OpenJDK Quality Group [asked projects to test JDK 28 builds](https://inside.java/2026/10/27/quality-heads-up/){:target="_blank"} because JEP 401 adds value classes as a preview. Value classes do not have a separate identity. Two instances with the same fields are the same object as far as `==` is concerned.

With preview features off, which is the default, behavior should stay the same. With them on, 30 JDK classes become value classes even if application code did not change. That list includes `Integer`, `Long`, the other primitive wrappers, `Optional`, and the `java.time` types such as `LocalDate` and `Instant`. Code that uses `==` to tell two equal dates apart can flip from false to true. These objects also cannot be synchronized on, and `WeakHashMap` will reject them with `IdentityException`.

Record constructors compiled with the preview enabled have a tighter rule too. During early construction they may only assign fields. Calling an instance method on `this` before that phase ends becomes a compile error. Early-access testing belongs on both settings: preview off, to catch accidental breakage, and preview on, to see the identity changes. JDK 28 itself is not a shipping release yet.

### Safari 27.2 Renames a Grid Lanes Property - [<i class="fas fa-external-link-alt"></i>](https://webkit.org/blog/18515/webkit-features-for-safari-27-2/){:target="_blank"}

On October 26, [Safari 27.2 shipped](https://webkit.org/blog/18515/webkit-features-for-safari-27-2/){:target="_blank"} with a CSS rename and a styling hook for custom select controls. The CSS Working Group renamed Grid Lanes' `flow-tolerance` property to `fit-tolerance`. Safari now implements the new name. The old name still works as a deprecated alias, and Web Inspector can flag it. The property decides how close two columns must be before the browser treats them as a tie instead of jumping to the slightly shorter one. The default remains `1em`.

Customizable select also picked up `::field-content`, which styles the selected option's text without requiring a `<selectedcontent>` element inside the control. The release includes 20 bug fixes across accessibility, media, and CSS. It is on iOS 27.2, iPadOS 27.2, visionOS 27.2, and macOS 27.2 Golden Gate, plus Safari on macOS Tahoe and Sequoia.

### EKS Auto Mode Speaks the Gateway API - [<i class="fas fa-external-link-alt"></i>](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-eks-auto-mode-kubernetes-gateway-api/){:target="_blank"}

On October 28, [Amazon EKS Auto Mode added the Kubernetes Gateway API](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-eks-auto-mode-kubernetes-gateway-api/){:target="_blank"}. Gateway and HTTPRoute are the newer Kubernetes way to describe how HTTP and gRPC traffic reaches an app, including header matches and weighted splits across versions. Auto Mode creates the AWS load balancers for those objects without a separate controller install.

Existing Ingress objects keep working beside the new resources. TLS certificates can be discovered through AWS Certificate Manager. You pay the usual load balancer charges. Support is in every region where EKS Auto Mode itself is offered.

### Google Cloud Spend Caps Leave Resources in Place - [<i class="fas fa-external-link-alt"></i>](https://cloud.google.com/blog/topics/cost-management/google-cloud-spend-caps-now-generally-available/){:target="_blank"}

On October 30, [spend caps on Google Cloud budgets became generally available](https://cloud.google.com/blog/topics/cost-management/google-cloud-spend-caps-now-generally-available/){:target="_blank"}. A cap pauses pay-as-you-go use for a chosen project and service when the budget is hit. It does not delete the underlying resources. Provisioned Throughput keeps serving. Reserved capacity is outside the pause.

Three updates landed with general availability. The spend caps API, on the existing Cloud Billing Budgets API, can set or lift a cap when automation creates a sandbox project. AI services trip the cap from live cost estimates within minutes, and those estimates show up in Cost Reports. Caps can also reset on their own at the start of the next month, which removes the old requirement to click the cap back open by hand. Billing admins and project owners get alerts at 50%, 80%, and 100% by default.

### A Google TPU in Orbit Sends Its First Answer - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/google-research/project-suncatcher-satellite-response/){:target="_blank"}

On October 30, [Google received the first model response from a TPU in orbit](https://blog.google/innovation-and-ai/models-and-research/google-research/project-suncatcher-satellite-response/){:target="_blank"}. The Project Suncatcher satellite launched on October 1. This week the team finished powering up the TPU trays, ran early tests, and uplinked a prompt to a copy of Gemma 4 during a ground-station pass over Svalbard, Norway. They asked for a haiku about being in space. The satellite sent one back.

[TechCrunch reported](https://techcrunch.com/2026/10/30/googles-first-data-center-satellite-is-online-and-writing-poetry/){:target="_blank"} that the prototype carries four of these chips, generates about 1 kW, and can run only one TPU at a time, for about 20 minutes, because of heat. Google's next planned step is a pair of linked satellites in 2027, after it measures how the chips handle radiation and temperature in orbit. This is a research test of space-based compute, not a cloud region you can deploy to.

---

## <i class="fas fa-robot"></i> AI & Models

### Gemini 4 Carbon Leads a Benchmark, Then Stays Locked Down - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/){:target="_blank"}

On October 28, [Google announced Gemini 4 Carbon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/){:target="_blank"}, the next model after Gemini 4 Argon. Google describes it as stronger at long coding jobs and at defensive security work: finding bugs, checking whether they can be exploited, and writing a patch. On the Artificial Analysis Intelligence Index v5.0, Google says Carbon ranks first with a score of 59. Internal tests showed more than twice Argon's success rate at generating secure code.

You cannot switch a product over to it this week. Google is in the U.S. government's voluntary pre-release testing process. Access starts with a subset of cyber defenders, then other trusted partners in the Fairwind program. A public API name is not available yet. When Google does sell it, the introductory price matches Argon: $2 per million input tokens and $10 per million output tokens, with cached input at 95% off. After that introductory window, the price becomes $4 and $20.

### GPT-6 Rosalind Research Stays Behind an Approval Gate - [<i class="fas fa-external-link-alt"></i>](https://help.openai.com/en/articles/20001193-gpt-rosalind-for-life-sciences-research){:target="_blank"}

On October 30, OpenAI started rolling out [GPT-6 Rosalind Research](https://help.openai.com/en/articles/20001193-gpt-rosalind-for-life-sciences-research){:target="_blank"} to a limited set of approved life-sciences customers. It is for research workflows in Work, Codex, and the API. It is not in the Chat tab, and a Discovery approval does not include it. The API id, for organizations that are separately approved, is `gpt-6-rosalind`.

In Enterprise workspaces the model starts a two-week admin preview turned off. Admins enable it for approved users. OpenAI's [system card addendum](https://deploymentsafety.openai.com/gpt-rosalind-6){:target="_blank"}, published the same day, says this deployment uses the same weights as GPT-6 Astra and is offered only after a review of the lab's research purpose, governance, and access controls. API access is not for customer-facing products.

### ChatGPT Pro and Business Plans Can Fund API Experiments - [<i class="fas fa-external-link-alt"></i>](https://developers.openai.com/api/docs/guides/chatgpt-api-credits){:target="_blank"}

On October 28, [OpenAI let eligible ChatGPT Pro and Business subscribers claim API credits](https://developers.openai.com/api/docs/guides/chatgpt-api-credits){:target="_blank"}. A Pro $100 plan gets $100 a month, Pro $200 gets $200, and Pro $500 gets $500. A Business workspace gets $20 per paid Standard seat or $100 per paid Premium seat, pooled and capped at $500 per workspace per month. The subscription has to be at least seven days old, and the same owner has to link one API organization.

Unused credits expire at the end of the billing cycle. They pay for API usage, including the Responses API and the Agents API. They do not raise ChatGPT or signed-in Codex limits, and they do not cover Codex usage through API keys. Plus, Enterprise, and Edu plans are outside this offer.

---

## <i class="fas fa-shield-alt"></i> Security

### Python Blocks the eMudhra Keys Inside the ssl Module - [<i class="fas fa-external-link-alt"></i>](https://blog.python.org/2026/10/python-3152-31410-31318-31216-31118/){:target="_blank"}

On October 26, [Python shipped another round of security releases](https://blog.python.org/2026/10/python-3152-31410-31318-31216-31118/){:target="_blank"} for the compromised eMudhra intermediate certificates: 3.15.2, 3.14.10, 3.13.18, 3.12.16, and 3.11.18. CVE-2026-115557 makes the `ssl` module reject those keys itself. Ordinary `pip` use, including upgrading pip, is protected even when pip has not been updated yet.

Python 3.15.2 and 3.14.10 have binary installers. The 3.13, 3.12, and 3.11 builds are source only. The same releases also reject links that replace a destination inside `tarfile`'s tar filter (CVE-2026-114583) and reject cookies with a negative version. The older three lines pick up Expat 2.9.0 fixes that 3.15 and 3.14 already had.

### PHP Windows Builds Pick Up the Brotli Patch, and CISA Lists the PHP RCEs - [<i class="fas fa-external-link-alt"></i>](https://www.php.net/#2026-10-26-1){:target="_blank"}

On October 26, PHP published [rebuilt Windows packages](https://www.php.net/#2026-10-26-1){:target="_blank"} numbered 8.5.12-1, 8.4.27-1, 8.3.36-1, and 8.2.35-1. The `-1` suffix means the PHP source is unchanged and the bundled Brotli library moved to 1.2.1. That fixes CVE-2026-111497, an out-of-bounds write in Brotli decompression. On Windows, PHP can reach the decoder through the cURL extension when automatic HTTP decompression is turned on. cURL leaves that off unless an application or HTTP client enables it.

[CISA added CVE-2026-111497 to its known-exploited list](https://www.cisa.gov/news-events/alerts/2026/10/27/cisa-adds-two-known-exploited-vulnerabilities-catalog){:target="_blank"} on October 27. A day earlier it added the two PHP remote code execution bugs patched on October 21, CVE-2026-109618 and CVE-2026-109619. If those October 21 releases are not installed yet, the known-exploited listing is the signal to do it now. Windows hosts need the `-1` packages as well, so the Brotli library is current.

### Redis and Valkey Fix a Cluster Pub/Sub Overflow - [<i class="fas fa-external-link-alt"></i>](https://github.com/valkey-io/valkey/releases/tag/9.1.3){:target="_blank"}

On October 26, Redis and Valkey shipped security releases for a heap overflow while a cluster builds a publish message. [Valkey's advisory GHSA-f4q9-j22m-xqq9](https://github.com/valkey-io/valkey/releases/tag/9.1.3){:target="_blank"} says an authenticated client can potentially run code by publishing an oversized message. The practical case is a cluster, not a single-node cache, and the message has to be larger than 4 GB. That is an unusual payload, and cluster operators should still upgrade.

The fixed Redis Open Source versions are 8.10.3, 8.8.4, 8.6.8, 8.4.8, 8.2.11, 7.4.12, and 7.2.17. Valkey's are 9.1.3, 9.0.7, 8.1.11, 8.0.12, and 7.2.15. Redis 8.12 is not the fix to install. Its first release candidate arrived on October 29 and is explicitly not for production, though it does preview per-member set expiration through `SEXPIRE` and a `BLESS` command that keeps named keys from being evicted.

### GitLab's CI Regex Bug Is on the Known-Exploited List - [<i class="fas fa-external-link-alt"></i>](https://www.cisa.gov/news-events/alerts/2026/10/29/cisa-adds-two-known-exploited-vulnerabilities-catalog){:target="_blank"}

On October 29, [CISA added CVE-2026-97229](https://www.cisa.gov/news-events/alerts/2026/10/29/cisa-adds-two-known-exploited-vulnerabilities-catalog){:target="_blank"} to the known-exploited vulnerabilities catalog. It is an integer overflow in GitLab's CI regular-expression compiler. An unauthenticated attacker can send a crafted CI configuration and run code on a self-managed GitLab server. GitLab rated it critical.

The fix is not new this week. [GitLab patched it on October 12](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/){:target="_blank"} in 19.4.2, 19.3.5, and 19.2.8. GitLab.com was already updated. Self-managed servers that are still behind those versions should move to a current patched release. CISA also listed actively exploited bugs this week in Adobe Commerce and Magento (CVE-2026-48356), the Linux kernel (CVE-2026-46300), VMware ESX (CVE-2026-41709), Cisco Secure Firewall software (CVE-2026-76418), and Ivanti Connect Secure (CVE-2026-111357 and CVE-2026-118527).

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### Intel Agrees to Buy Classiq - [<i class="fas fa-external-link-alt"></i>](https://www.intc.com/news-events/press-releases/detail/1784/intel-to-acquire-classiq-to-create-a-full-stack-quantum){:target="_blank"}

On October 26, [Intel agreed to acquire Classiq](https://www.intc.com/news-events/press-releases/detail/1784/intel-to-acquire-classiq-to-create-a-full-stack-quantum){:target="_blank"}, whose software turns high-level quantum programs into circuits that can run on more than one kind of quantum hardware. Intel wants that layer on top of its own spin-qubit chips. The companies stay separate until closing, which Intel expects in the first half of 2027, subject to regulators.

Intel did not disclose the price. [Bloomberg reported](https://www.bloomberg.com/news/articles/2026-10-26/intel-to-buy-israeli-startup-classiq-in-quantum-computing-push){:target="_blank"} that the deal is about $2.3 billion. Intel says it plans to keep Classiq's existing hardware integrations after the close, so the software is not supposed to become Intel-only.

### Upwind Raises $400 Million for Runtime Cloud Security - [<i class="fas fa-external-link-alt"></i>](https://www.upwind.io/feed/the-next-wave-is-here-upwinds-400m-series-c-to-build-the-cloud-ai-security-platform){:target="_blank"}

On October 28, [Upwind closed a $400 million Series C](https://www.upwind.io/feed/the-next-wave-is-here-upwinds-400m-series-c-to-build-the-cloud-ai-security-platform){:target="_blank"} at a $3.8 billion valuation, led by Bessemer Venture Partners. The company says revenue quadrupled in 2026. Its January Series B, also led by Bessemer, was $250 million at a $1.5 billion valuation.

Upwind's product watches running cloud workloads, APIs, and AI agents, then tries to tell a security team which findings are actually reachable. It runs on AWS, Azure, Google Cloud, and Oracle Cloud. The new round is for product work and a larger sales push, not a new developer tool you install this week.

### Layoffs: Dropbox Cuts About 9%, and Microsoft Offers Buyouts

*   **Dropbox:** On October 28, Dropbox eliminated about 200 roles, roughly 9% of the company, across engineering, product, design, and general and administrative teams. The [company note](https://blog.dropbox.com/topics/company/an-update-on-organizational-changes-2026){:target="_blank"} says most affected employees finished that day. Severance starts at sixteen weeks of pay plus a week per completed year. The [SEC filing](https://www.sec.gov/Archives/edgar/data/1467623/000146762326000052/dbx-20261028.htm){:target="_blank"} estimates $27 million to $33 million in cash costs. CTO Ali Dasdan leaves on November 18.
*   **Microsoft:** On October 26, Microsoft [offered a voluntary exit](https://blogs.microsoft.com/blog/2026/10/26/introducing-a-voluntary-exit-offer/){:target="_blank"} to eligible employees at level 70 and below in participating teams in the United States, Canada, India, and the United Kingdom. This is not a completed layoff. Some organizations are sitting it out. [GeekWire reported](https://www.geekwire.com/2026/microsoft-makes-new-voluntary-exit-offer-to-more-than-a-quarter-of-its-workforce-including-some-execs/){:target="_blank"} that the company put the eligible group at about 60,000 people, roughly a quarter of a workforce counted at 223,000, with a decision due in the first week of December. The package matches standard severance and does not include the longer healthcare from this year's earlier retirement offer.

---

{% include ads/in-article.html %}

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **26.13.0** the Node.js 26 build that marks Lithium long-term support, with the same code as 26.12.1
- **59** Gemini 4 Carbon's score on the Artificial Analysis Intelligence Index v5.0, at an introductory **$2** and **$10** per million input and output tokens
- **50.3%** of Terminal-Bench 4.0 tasks solved by GPT-6.1 Terra at maximum effort, versus **21.5%** published for GPT-5.6 Terra
- **$1, $0.05, and $5** per million input, cached input, and output tokens for `gpt-6.1-terra`
- **60** GitHub's reported Fusion Max score on the Artificial Analysis Coding Agent Index, about half the cost and **40%** less time than Claude Code with Opus 5.5 Max
- **$400 million** Upwind's Series C, at a **$3.8 billion** valuation
- **9%** Dropbox's cut, about **200** roles, with **$27 million to $33 million** in estimated cash costs
- **60,000** Microsoft employees eligible for the voluntary exit, as the company told GeekWire

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Python certificates** - October 26. 3.15.2, 3.14.10, 3.13.18, 3.12.16, and 3.11.18. The `ssl` module blocks the eMudhra intermediates.
*   **PHP Windows Brotli** - October 26. Packages 8.5.12-1, 8.4.27-1, 8.3.36-1, and 8.2.35-1. CVE-2026-111497.
*   **PHP on the KEV list** - October 26. CISA adds CVE-2026-109618 and CVE-2026-109619.
*   **AWS KMS ML-KEM** - October 26. Specs `ML-KEM-512`, `ML-KEM-768`, and `ML-KEM-1024`. `Encapsulate` and `Decapsulate`.
*   **GPT-6.1 Terra** - October 26. API id `gpt-6.1-terra`. Also generally available on Amazon Bedrock.
*   **Redis and Valkey** - October 26. Cluster pub/sub heap overflow. Valkey advisory GHSA-f4q9-j22m-xqq9.
*   **Intel and Classiq** - October 26. Definitive agreement. Price not disclosed. Bloomberg reported about $2.3 billion.
*   **Microsoft exit offer** - October 26. Voluntary. Level 70 and below in participating teams in four countries.
*   **Safari 27.2** - October 26. `flow-tolerance` becomes `fit-tolerance`. The old name still works.
*   **ICU 79** - October 27. Unicode 18 and CLDR 49. Maven `com.ibm.icu:icu4j:79.1`.
*   **JDK 28 value classes** - October 27. Preview only. `Integer` and `LocalDate` lose identity when the preview is on.
*   **VMware on Google Cloud** - October 27. Self-managed VMware Cloud Foundation 9.x. Generally available in 22 regions.
*   **Google TPUs on OCI** - October 27. Oracle becomes the first other hyperscaler planned to offer TPUs. Capacity is scheduled for 2027.
*   **Workload Conformance** - October 27. Kubernetes starts a working group for a shared workload behavior standard.
*   **Brotli and Magento** - October 27. CISA adds CVE-2026-111497 and Adobe Commerce CVE-2026-48356.
*   **Gemini 4 Carbon** - October 28. Announced for selected cyber defenders first. Introductory price is $2 and $10 per million input and output tokens.
*   **Node.js 26 LTS** - October 28. 26.13.0, codename Lithium. No code change from 26.12.1.
*   **Copilot Fusion** - October 28. Generally available. Effort levels Standard, High, and Max.
*   **Copilot in GitHub Enterprise** - October 28. Included for sales-led Enterprise Cloud. Usage bills from the first request.
*   **ChatGPT API credits** - October 28. Up to $500 a month for eligible Pro and Business plans. Credits expire each cycle.
*   **EKS Gateway API** - October 28. EKS Auto Mode provisions load balancers from Gateway and HTTPRoute.
*   **iCalendar tasks** - October 28. RFC 10051, Task Extensions to iCalendar.
*   **Upwind Series C** - October 28. $400 million at a $3.8 billion valuation. Bessemer led.
*   **Dropbox cuts** - October 28. About 200 roles, about 9%. CTO Ali Dasdan leaves November 18.
*   **Node.js 27 alpha** - October 29. 27.0.0-alpha.0.0.0. Default heap is half of RAM, clamped from 256 MB to 4 GB.
*   **Redis 8.12 RC1** - October 29. Not for production. Previews `SEXPIRE` and `BLESS`.
*   **GitLab CVE-2026-97229** - October 29. Added to CISA's known-exploited list. Patched on October 12 in 19.4.2, 19.3.5, and 19.2.8.
*   **Google Cloud spend caps** - October 30. Generally available. Pauses use without deleting resources.
*   **TPU in orbit** - October 30. Project Suncatcher returns the first Gemma 4 response from a TPU in space. The satellite launched October 1.
*   **GPT-6 Rosalind Research** - October 30. API id `gpt-6-rosalind`. Approved research customers only. Off by default during a two-week enterprise preview.

---

Node.js 26.13.0 is the release most production apps can take without a behavior change, as long as Linux hosts have libatomic when they are jumping from an older LTS line. The Node 27 alpha is the one to try in CI if a service is close to its memory ceiling. Copilot Fusion and GPT-6.1 Terra are both usable this week if you want the new routing and the cheaper computer-use model. Python's certificate builds, the PHP Windows Brotli packages, and clustered Redis or Valkey are the patches that should move first. See you next week.
