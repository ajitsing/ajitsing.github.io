---
layout: post
seo: true
title: "Dev Weekly Apr 6-12, 2026: Anthropic Mythos Finds Decades-Old Zero-Days, Intel Joins $25B Terafab, Copilot Rubber Duck, Chrome Vertical Tabs"
subtitle: "Anthropic launches Project Glasswing with Claude Mythos, a model that found thousands of zero-day vulnerabilities missed by decades of human review. Intel signs on as foundry partner for Elon Musk's $25 billion Terafab AI chip factory. GitHub Copilot CLI adds Rubber Duck cross-model review. Chrome 147 ships vertical tabs. VS Code 1.115 introduces the Agents app. Anthropic revenue hits $30 billion run rate. AWS launches S3 Files. Dependabot alerts can now be assigned to AI agents. Docker authorization bypass affects 92% of enterprise deployments. Fortinet FortiClientEMS zero-day under active exploitation. Red Hat shuts down China engineering and lays off hundreds. Pendo cuts 10%. Oracle upgrades AI Database. NeuBird AI raises $19.3M. Bolt lays off 30% of staff."
date: 2026-04-12
categories: tech-news
permalink: /dev-weekly/2026/apr-6-12/anthropic-mythos-glasswing-intel-terafab-copilot-rubber-duck-chrome-vertical-tabs/
share-img: /assets/img/posts/dev_weekly/tech-news-6-12apr-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-6-12apr-2026.svg
description: "Developer news for April 6 to 12, 2026. Anthropic Claude Mythos finds thousands of zero-day vulnerabilities in major operating systems and browsers through Project Glasswing, a restricted cybersecurity initiative with Amazon, Apple, Microsoft, Google, and Nvidia. Intel joins Elon Musk's $25 billion Terafab AI chip factory in Austin as foundry partner, contributing its 18A process node for Tesla and SpaceX chips. GitHub Copilot CLI adds Rubber Duck cross-model review using GPT-5.4 to review Claude Sonnet's work, closing 74.7% of the Sonnet-to-Opus performance gap. Chrome 147 ships vertical tabs. VS Code 1.115 launches the Agents app for running multiple agent sessions in parallel. Anthropic revenue run rate passes $30 billion, tripling from $9 billion at end of 2025, and expands Google Cloud TPU capacity by 3.5 gigawatts through Broadcom deal. AWS launches S3 Files for native file system access to S3 buckets. GitHub Dependabot alerts can now be assigned to AI coding agents for automated fix generation. Oracle upgrades AI Database with sub-3-second disaster failover. Docker authorization bypass CVE-2026-34040 silently disables security plugins via oversized requests, affecting 92% of enterprise deployments. Fortinet FortiClientEMS CVE-2026-35616 under active zero-day exploitation. Red Hat shuts down China engineering team and lays off hundreds. Pendo cuts 10% of workforce citing AI. NeuBird AI raises $19.3M. Bolt lays off 30% of staff."
keywords: "dev weekly April 2026, software developer news April 6 12 2026, Anthropic Claude Mythos Project Glasswing zero-day vulnerabilities cybersecurity, Intel Terafab Elon Musk AI chip factory Austin $25 billion Tesla SpaceX, GitHub Copilot CLI Rubber Duck cross-model review GPT-5.4, Chrome 147 vertical tabs reading mode release, VS Code 1.115 Agents app parallel agent sessions, Anthropic revenue $30 billion run rate Google Cloud TPU Broadcom 3.5 gigawatts, AWS S3 Files native file system object storage, GitHub Dependabot AI agents automated remediation, Docker CVE-2026-34040 authorization bypass enterprise container security, Fortinet FortiClientEMS CVE-2026-35616 zero-day exploitation CISA, Oracle AI Database Diamond tier failover under three seconds, NeuBird AI $19.3M funding SRE DevOps, Bolt layoffs 30 percent AI pivot, Red Hat layoffs China engineering team India relocation, Pendo layoffs 10 percent workforce AI, GitHub secret scanning code scanning batch apply, developer tools news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is Anthropic's Project Glasswing and Claude Mythos?"
    answer: "On April 7, 2026, Anthropic launched Project Glasswing, a restricted cybersecurity initiative built around Claude Mythos Preview, its most powerful frontier model. Mythos autonomously discovered thousands of zero-day vulnerabilities across every major operating system and web browser, including a 27-year-old flaw in OpenBSD, a 16-year-old bug in FFmpeg, and a 17-year-old remote code execution vulnerability in FreeBSD. Twelve major companies joined the program including Amazon, Apple, Microsoft, Google, Nvidia, Cisco, CrowdStrike, and the Linux Foundation. Anthropic committed $100 million in usage credits and $4 million in direct donations to open-source security organizations. Mythos will not be released publicly due to concerns about its autonomous exploit development capabilities."
  - question: "What is Intel's role in Elon Musk's Terafab project?"
    answer: "In April 2026, Intel announced it would join Terafab as a foundry partner. Terafab is a $25 billion semiconductor project led by Elon Musk to build a vertically integrated AI chip factory in Austin, Texas. Intel is contributing its 18A process node (1.8-nanometer technology), packaging expertise, and manufacturing capability. The pilot facility targets 100,000 wafer starts per month using 2-nanometer process technology. Tesla's fifth-generation AI chip (AI5) is among the first products, with volume production expected in 2027. Two separate facilities are planned: one for automotive and robotics chips, another for AI data center and space-based deployments."
  - question: "What is GitHub Copilot CLI Rubber Duck and how does it improve code quality?"
    answer: "Rubber Duck is a cross-model review feature released for GitHub Copilot CLI on April 6, 2026. When Claude Sonnet serves as the primary coding agent, Rubber Duck runs GPT-5.4 as an independent reviewer to catch errors the primary model might miss. Testing on SWE-Bench Pro showed it closed 74.7% of the performance gap between Sonnet and Opus models. It can be triggered automatically at three checkpoints (after drafting a plan, after complex implementations, and after writing tests) or manually on demand. In testing, it caught bugs like async schedulers that would exit without running jobs and loops silently overwriting dictionary keys."
  - question: "What happened with Anthropic's revenue and Google Cloud TPU deal in April 2026?"
    answer: "On April 7, 2026, Anthropic revealed that its annual revenue run rate has surpassed $30 billion, up from roughly $9 billion at the end of 2025. Over 1,000 enterprise customers now spend more than $1 million annually. Alongside this, Anthropic expanded its partnership with Google Cloud and Broadcom, securing 3.5 gigawatts of TPU-based AI compute capacity expected to come online starting in 2027. The deal extends through 2031 and builds on 1 gigawatt already coming online in 2026."
  - question: "What is the Docker CVE-2026-34040 vulnerability and how does it work?"
    answer: "CVE-2026-34040 is a critical authorization bypass vulnerability in Docker Engine with a CVSS score of 8.8. When an HTTP request body exceeds 1 MB, Docker's middleware silently drops the body before it reaches authorization plugins. The plugin sees nothing, approves the request, and the Docker daemon processes the full body normally. This lets attackers create privileged containers with root access to host systems. It affects all AuthZ plugins including OPA, Prisma Cloud, and Casbin, and impacts an estimated 92% of enterprise container deployments. Docker Engine 29.3.1 and Docker Desktop 4.66.1 contain the fix."
  - question: "When did Chrome get vertical tabs and how do they work?"
    answer: "Chrome 147 shipped vertical tabs on April 7, 2026. Users can enable them by right-clicking any Chrome window and selecting Show Tabs Vertically. Tabs move from the horizontal strip at the top to a sidebar on the left side. Full page titles remain visible even with many open tabs, tab groups are easier to organize, and the sidebar can be minimized to show just favicons. Chrome also shipped a full-page reading mode in the same release."
---

Anthropic dropped the biggest story of the week by announcing Claude Mythos, a frontier model that found thousands of zero-day vulnerabilities across every major operating system and web browser. Some of these bugs had survived 27 years of human review. Instead of releasing the model publicly, Anthropic restricted access through Project Glasswing, a consortium of 12 major tech companies. Intel signed on to help build Elon Musk's $25 billion Terafab AI chip factory in Austin. GitHub added a "Rubber Duck" feature to Copilot CLI that uses a second AI model to review the first one's work. Chrome finally shipped vertical tabs. VS Code 1.115 launched the Agents app. Anthropic's revenue tripled to a $30 billion run rate. AWS made S3 buckets work as file systems. And on the security side, a Docker authorization bypass that hid in plain sight for a decade hit the spotlight, while a Fortinet zero-day was already being exploited in the wild. Here's everything that happened.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Anthropic Launches Project Glasswing with Claude Mythos - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/glasswing){:target="_blank"}

On April 7, Anthropic announced Project Glasswing, a restricted cybersecurity program built around Claude Mythos Preview, the company's most powerful frontier model.

**What Mythos found:**

During internal testing, Mythos [autonomously discovered thousands of zero-day vulnerabilities](https://cybersecuritywaala.com/news/anthropic-mythos-finds-thousands-of-zero-day-vulnerabilities/){:target="_blank"} across critical software infrastructure. The list includes a 27-year-old vulnerability in OpenBSD that could crash remote connections, a 16-year-old flaw in FFmpeg that automated tools had scanned past millions of times, a 17-year-old remote code execution bug in FreeBSD's NFS implementation, and privilege escalation vulnerabilities in the Linux kernel. In many cases, the model developed working exploits without any human help.

**Why it's restricted:**

Anthropic decided not to release Mythos publicly. The model [significantly outperforms earlier versions](https://siliconangle.com/2026/04/07/anthropic-debuts-project-glasswing-initiative-will-leverage-powerful-mythos-model-reinforce-software-security/){:target="_blank"} like Claude Opus 4.6 at autonomous exploit development. It can chain multiple vulnerabilities together to build browser exploits and develop privilege escalation attacks on various operating systems. Making that available to everyone would hand the same capabilities to attackers.

**Who gets access:**

[Twelve major companies](https://fortune.com/2026/04/07/anthropic-claude-mythos-model-project-glasswing-cybersecurity/){:target="_blank"} signed on as founding partners: Amazon, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, the Linux Foundation, Microsoft, Nvidia, and Palo Alto Networks. Over 40 additional organizations that build or maintain critical software infrastructure also got access. Anthropic is committing up to $100 million in usage credits for Mythos Preview and $4 million in direct donations to open-source security organizations.

**Why it matters:**

This is the first time a major AI lab has built a frontier model specifically for security research and then decided the risks of public release were too high. Mythos finding vulnerabilities that survived decades of human review is a strong argument for AI-powered security auditing. But the fact that the same model can autonomously develop complex exploits is exactly why Anthropic kept it behind a gate. The dual-use problem is no longer theoretical.

### Intel Joins Musk's $25 Billion Terafab AI Chip Factory - [<i class="fas fa-external-link-alt"></i>](https://www.forbes.com/sites/jonmarkman/2026/04/10/intel-joins-terafab-to-build-elon-musks-25b-ai-chip-project/){:target="_blank"}

Intel announced it will join Terafab as a foundry partner in a $25 billion semiconductor project led by Elon Musk alongside Tesla, SpaceX, and xAI.

**What Terafab is:**

Terafab is a [vertically integrated semiconductor facility](https://thenextweb.com/news/intel-terafab-elon-musk-foundry-partnership){:target="_blank"} planned for Austin, Texas that puts chip design, fabrication, memory production, advanced packaging, and testing under one roof. The goal is to produce one terawatt of AI compute per year, which is roughly 70% of TSMC's current global output from a single location.

**The specs:**

The pilot facility targets 100,000 wafer starts per month using 2-nanometer process technology. Long-term plans call for one million wafer starts monthly and 100 to 200 billion custom AI and memory chips per year at full scale. Tesla's fifth-generation AI chip (AI5) is among the first products targeted, with small-batch production expected this year and volume production in 2027.

**Intel's contribution:**

Intel is bringing its [18A process node](https://www.cnet.com/tech/services-and-software/elon-musks-25-billion-terafab-project-gets-a-helping-hand-from-intel/){:target="_blank"} (1.8-nanometer logic technology), packaging expertise, and high-volume manufacturing capability. CEO Lip-Bu Tan called the partnership "exactly what is needed in semiconductor manufacturing today."

**The two facilities:**

Two separate buildings are planned on the Giga Texas campus. One handles automotive and humanoid robotics chips for Tesla's Full Self-Driving, Cybercab, and Optimus robots. The other covers high-performance AI data center infrastructure and space-based deployments. Musk said 80% of compute output will serve SpaceX's orbital AI satellites, with 20% for ground applications.

**The cost question:**

The pilot facility is budgeted at $20 to $25 billion. Bernstein analysts estimate the full-scale build could cost approximately $5 trillion. That number is worth keeping in mind.

### Anthropic Revenue Hits $30 Billion Run Rate, Expands Google Cloud TPU Deal - [<i class="fas fa-external-link-alt"></i>](https://sherwood.news/tech/anthropics-revenue-run-rate-just-topped-usd30-billion-thats-ahead-of-openai/){:target="_blank"}

On April 7, Anthropic revealed that its annual revenue run rate has passed $30 billion, up from roughly $9 billion at the end of 2025. That is more than a 3x increase in about three months.

**What's driving it:**

Enterprise adoption is accelerating fast. Over 1,000 business customers now spend more than [$1 million annually](https://sherwood.news/markets/anthropic-revenue-run-rate-30-billion-google-broadcom-partnership/){:target="_blank"} on Anthropic's services, more than doubling from approximately 500 customers in February. At this run rate, Anthropic is ahead of OpenAI, which reported roughly $24 billion in annual revenue run rate at the end of March.

**The compute deal:**

To support this growth, Anthropic expanded its partnership with Google Cloud and Broadcom. The new deal [adds 3.5 gigawatts of TPU-based AI compute capacity](https://www.tomshardware.com/tech-industry/broadcom-expands-anthropic-deal-to-3-5gw-of-google-tpu-capacity-from-2027){:target="_blank"} expected to come online starting in 2027. This builds on 1 gigawatt already coming online in 2026 under a previous agreement. The deal extends through 2031.

**A note on the numbers:**

The revenue comparison with OpenAI comes with a caveat. Anthropic records the full amount customers pay as revenue and counts cloud provider fees as expenses. OpenAI records revenue after cloud providers take their cut. The actual gap may be narrower than the headline numbers suggest.

### GitHub Copilot CLI Adds Rubber Duck Cross-Model Review - [<i class="fas fa-external-link-alt"></i>](https://github.blog/ai-and-ml/github-copilot/github-copilot-cli-combines-model-families-for-a-second-opinion/){:target="_blank"}

On April 6, GitHub released Rubber Duck, a feature that uses a second AI model from a different family to review the primary coding agent's work in Copilot CLI.

**How it works:**

When Claude Sonnet serves as the primary orchestrator, Rubber Duck runs GPT-5.4 as an independent reviewer. Different model families have different training biases, so the reviewer [catches errors the primary model tends to miss](https://www.helpnetsecurity.com/2026/04/07/github-copilot-rubber-duck-cross-model-review/){:target="_blank"}. It can trigger automatically at three checkpoints (after drafting a plan, after complex implementations, and after writing tests) or manually on demand.

**The results:**

Testing on SWE-Bench Pro showed that Claude Sonnet 4.6 paired with Rubber Duck closed 74.7% of the performance gap between Sonnet and Opus models. The gains were strongest on complex problems spanning 3 or more files requiring 70 or more steps, showing 3.8% improvement over baseline Sonnet and 4.8% on the hardest problems.

**What it caught:**

In testing, Rubber Duck flagged real bugs including an async scheduler that would exit immediately without running any jobs, a loop silently overwriting dictionary keys causing data loss, and cross-file conflicts where code stopped writing to a Redis key that other files were still reading from.

**How to access:**

Rubber Duck is available in experimental mode through the `/experimental` slash command in Copilot CLI.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms

### VS Code 1.115 Launches the Agents App - [<i class="fas fa-external-link-alt"></i>](https://www.infoworld.com/article/4156169/visual-studio-code-1-115-introduces-vs-code-agents-app-2.html){:target="_blank"}

On April 8, VS Code 1.115 shipped with a new companion application called the Agents app.

**What the Agents app does:**

It is a separate application optimized for agent-native development. Developers can run multiple agent sessions in parallel across multiple repositories, track session progress, view diffs inline, leave feedback for agents, and create pull requests without leaving the app. It works with custom instructions, prompt files, MCP servers, hooks, and plugins.

**Terminal improvements:**

A new `send_to_terminal` tool lets agents interact with background terminals. Previously, background terminals were read-only for agents. Now agents can send input when needed, like completing SSH connections that require passwords. A new experimental setting automatically notifies agents when background terminal commands finish or need input, so agents don't have to keep checking.

**Browser tool updates:**

When agents invoke the browser tool, calls now display more descriptive labels and direct links to target browser tabs. The Run Playwright Code tool also improved support for long-running scripts that take more than five seconds.

### Chrome 147 Ships Vertical Tabs - [<i class="fas fa-external-link-alt"></i>](https://blog.google/products-and-platforms/products/chrome/new-chrome-productivity-features/){:target="_blank"}

On April 7, Chrome 147 hit stable with the feature people have been asking for since forever: vertical tabs.

**How to use them:**

Right-click any Chrome window and select "Show Tabs Vertically." Tabs move from the horizontal strip at the top to a sidebar on the left. Full page titles stay visible even with dozens of open tabs. Tab groups work the same way. The sidebar can be minimized to show just favicons if you want the screen space back.

**What else shipped in Chrome 147:**

A [full-page reading mode](https://9to5google.com/2026/04/07/google-chrome-vertical-tabs/){:target="_blank"} that strips visual distractions and turns pages into a clean reading experience. For developers, Chrome 147 added [element-scoped view transitions](https://developer.chrome.com/blog/new-in-chrome-147?hl=en){:target="_blank"}, a CSS `contrast-color()` function for accessibility, and a `border-shape` property for non-rectangular borders. DevTools got automatic context selection for AI assistance and full code generation in the Console and Sources panels.

### AWS Launches S3 Files - [<i class="fas fa-external-link-alt"></i>](https://aws.amazon.com/blogs/aws/launching-s3-files-making-s3-buckets-accessible-as-file-systems/){:target="_blank"}

On April 7, Amazon launched S3 Files, making S3 buckets accessible as native file systems. It is generally available in 34 AWS regions.

**What it does:**

S3 Files provides full NFS v4.1+ file system semantics on top of S3. You can create, read, update, and delete files just like a normal file system. Active data gets cached on high-performance storage with about 1 millisecond latencies. Larger files are served directly from S3 for maximum throughput.

**Why it matters:**

Data stays in S3 without duplication. Thousands of compute resources can access the same S3 file system simultaneously. It works with EC2, Lambda, ECS, and EKS. For anyone who has been writing glue code to bridge object storage and file-based processing, especially for AI agents and ML workloads, this eliminates that problem. Built on Amazon EFS technology, it delivers multiple terabytes per second of aggregate read throughput.

### Dependabot Alerts Are Now Assignable to AI Agents - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-04-07-dependabot-alerts-are-now-assignable-to-ai-agents-for-remediation){:target="_blank"}

On April 7, GitHub announced that Dependabot alerts can now be assigned to AI coding agents for automated remediation.

From the Dependabot alert detail page, you can select "Assign to Agent" and choose from Copilot, Claude, or Codex. The assigned agent analyzes the alert, opens a draft pull request with a proposed fix, and attempts to resolve any test failures. You can assign multiple agents to the same alert, with each working independently and opening separate draft PRs for comparison.

This is designed for the complex cases that go beyond simple version bumps, like major version upgrades with breaking API changes, package downgrades when compromised versions have no patch, and multi-file dependency refactors. Requires GitHub Code Security and a Copilot plan with coding agent access.

### Oracle Upgrades AI Database with Sub-3-Second Failover - [<i class="fas fa-external-link-alt"></i>](https://www.oracle.com/news/announcement/oracle-ai-database-raises-the-bar-for-availability-and-security-across-mission-critical-workloads-2026-04-09/){:target="_blank"}

On April 9, Oracle announced major upgrades to Oracle AI Database at the Oracle AI World Tour in New York.

The new Platinum tier brings disaster failover times under 30 seconds, up to 4x faster than Oracle Database 19c, available on Oracle AI Database 26ai and Exadata with no application changes needed. A new Diamond tier pushes that to under three seconds using logical replication across data centers for active-active distributed clusters. Oracle also added security features targeting quantum computing and AI-driven breach risks. The Platinum tier is available at no additional charge through software upgrades.

---

## <i class="fas fa-building"></i> Industry News

### NeuBird AI Raises $19.3M for Autonomous Production Operations - [<i class="fas fa-external-link-alt"></i>](https://siliconangle.com/2026/04/07/agentic-ai-startup-neubird-raises-19-3m-help-human-site-reliability-engineers-rise-ashes-alert-fatigue/){:target="_blank"}

On April 7, NeuBird AI closed a $19.3 million funding round led by Xora Innovation, with participation from Mayfield, StepStone Group, Prosperity7 Ventures, and Microsoft's M12 venture fund.

NeuBird builds an autonomous production operations agent for enterprise DevOps and SRE teams. The platform analyzes telemetry data, identifies issues, performs root cause analysis, and automates remediation without human intervention. Alongside the funding, the company announced NeuBird AI Falcon, a next-generation engine for predictive risk detection and proactive problem prevention. The company cites research showing engineers spend about 40% of their time managing incidents instead of building new features, and nearly 80% of companies report on-call burnout.

### Bolt Lays Off 30% of Staff Citing AI - [<i class="fas fa-external-link-alt"></i>](https://www.bankingdive.com/news/bolt-layoffs-ai-30-percent-breslow-valuation-drop/816995/){:target="_blank"}

On April 8, Bolt Financial laid off approximately 30% of its workforce as part of a pivot toward AI and leaner operations. CEO Ryan Breslow said the company would operate as ["a much leaner organization and leveraging AI at our core."](https://www.americanbanker.com/news/bolt-lays-off-a-third-of-its-employees-citing-ai){:target="_blank"}

This is the fourth round of layoffs since 2022. Bolt was valued at $11 billion in January 2022 but has since dropped to as low as $300 million during secondary stock sales. The company is not alone in blaming AI for cuts. Block CEO Jack Dorsey announced a 40% reduction of 4,000 jobs in February citing similar reasons. But an American Banker survey found only 3% of financial services respondents reported actual workforce reductions tied to AI.

### Red Hat Lays Off Hundreds of Engineers, Shuts Down China Operations - [<i class="fas fa-external-link-alt"></i>](https://www.theregister.com/2026/04/10/red_hat_ends_china_engineering/){:target="_blank"}

Red Hat laid off hundreds of engineers this week and shut down its entire Chinese engineering team of approximately 419 people. The company is relocating most of those roles to India, where parent company IBM maintains a larger workforce than in the United States.

Red Hat framed it as a ["location strategy"](https://www.phoronix.com/news/Red-Hat-Layoffs){:target="_blank"} rather than headcount reduction, with CTO Chris Wright saying it would not result in a net reduction. Affected employees in China will be terminated on July 31 with severance packages of N+3 to N+6 months. The move is likely driven in part by national security concerns. Red Hat supplies products to multiple U.S. military branches and secured an $848 million Department of Defense deal in 2024. This follows Microsoft's 2025 exit from China after exposing Defense Department Azure systems to security risks.

### Pendo Cuts 10% of Workforce Citing AI Shift - [<i class="fas fa-external-link-alt"></i>](https://www.newsobserver.com/news/business/article315329510.html){:target="_blank"}

On April 7, Raleigh-based software company Pendo [laid off 90 employees](https://www.axios.com/local/raleigh/2026/04/07/raleigh-software-unicorn-pendo-layoffs-jobs){:target="_blank"}, about 10% of its workforce, with roughly 30 positions at its Raleigh headquarters. CEO Todd Olson said the company had been "refounding" itself over the past six months as clients increasingly adopted AI tools. Pendo launched an autonomous agent called Novus in March and partnered with Anthropic's Claude in December 2025. The company was valued at $2.6 billion in 2021.

---

## <i class="fas fa-shield-alt"></i> Security

### Docker Authorization Bypass Affects 92% of Enterprise Deployments - [<i class="fas fa-external-link-alt"></i>](https://www.cyera.com/blog/cyera-research-discovers-docker-authorization-bypass-that-silently-disables-security-policies){:target="_blank"}

CVE-2026-34040 is a critical authorization bypass in Docker Engine with a CVSS score of 8.8. Cyera Research discovered that when an HTTP request body exceeds 1 MB, Docker's middleware [silently drops the body](https://thehackernews.com/2026/04/docker-cve-2026-34040-lets-attackers.html){:target="_blank"} before it reaches authorization plugins. The plugin sees nothing and approves the request. The Docker daemon still processes the full body and creates the requested container.

**What that means:**

An attacker can create privileged containers with root access to host systems, exposing AWS credentials, SSH keys, and Kubernetes configs. It affects all AuthZ plugins including OPA, Prisma Cloud, and Casbin.

**The backstory:**

This vulnerability is actually an incomplete fix for CVE-2024-41110, a zero-length body bypass from July 2024. The underlying bug class (CWE-863) has [existed in Docker for roughly a decade](https://novvista.com/docker-cve-2026-34040-the-authorization-bypass-that-hid-in-plain-sight-for-a-decade/){:target="_blank"}. Cyera estimates it affects 92% of enterprise container deployments.

**What to do:**

Update to Docker Engine 29.3.1 or Docker Desktop 4.66.1 immediately.

### Fortinet FortiClientEMS Zero-Day Under Active Exploitation - [<i class="fas fa-external-link-alt"></i>](https://securityaffairs.com/190392/hacking/cve-2026-35616-fortinet-fixes-actively-exploited-high-severity-flaw.html){:target="_blank"}

CVE-2026-35616 is a critical improper access control vulnerability in Fortinet FortiClientEMS with a CVSS score of 9.1. It allows unauthenticated remote attackers to [bypass API authentication](https://securityboulevard.com/2026/04/cve-2026-35616-fortinet-forticlientems-improper-access-control-vulnerability-exploited-in-the-wild/){:target="_blank"} and execute arbitrary code or commands without credentials.

**Timeline:**

Active zero-day exploitation was observed [starting March 31](https://threatprotect.qualys.com/2026/04/06/fortinet-forticlientems-vulnerability-exploited-in-the-wild-cve-2026-35616/){:target="_blank"}. Fortinet released emergency hotfixes on April 4. CISA added it to the Known Exploited Vulnerabilities catalog on April 6 with a federal patching deadline of April 9. The permanent fix is in FortiClientEMS version 7.4.7. This is the second critical unauthenticated vulnerability in FortiClientEMS in recent weeks, following CVE-2026-21643 with the same 9.1 CVSS score.

### GitHub Expands Secret Scanning and Code Security - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-04-08-secret-scanning-improvements-to-alert-apis-webhooks-and-delegated-workflows/){:target="_blank"}

On April 8, GitHub shipped several security improvements. Secret scanning now includes new API filters for excluding specific secret types, richer webhook payloads with direct links to alert locations, and improved delegated workflows with expiry deadline notifications. Code scanning alerts on pull requests [can now be batch-applied](https://github.blog/changelog/2026-04-07-code-scanning-batch-apply-security-alert-suggestions-on-pull-requests/){:target="_blank"} for fixes, letting developers remediate multiple alerts in a single commit.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$30 billion** — Anthropic's annual revenue run rate, up from $9 billion at end of 2025
- **$100 million** — Usage credits Anthropic committed for Project Glasswing security testing
- **$25 billion** — Budget for the pilot Terafab AI chip factory in Austin
- **3.5 GW** — TPU compute capacity Anthropic secured from Google Cloud and Broadcom
- **74.7%** — Performance gap between Sonnet and Opus closed by Copilot CLI's Rubber Duck feature
- **27 years** — Age of the oldest vulnerability Claude Mythos found in OpenBSD
- **92%** — Enterprise container deployments affected by Docker CVE-2026-34040
- **1,000+** — Enterprise customers spending over $1 million annually on Anthropic services
- **100,000** — Wafer starts per month targeted by Terafab's pilot facility
- **~419** — Red Hat engineers in China laid off as the company shuts down its entire Chinese engineering operation
- **90** — Pendo employees cut on April 7, roughly 10% of workforce
- **34** — AWS regions where S3 Files is generally available
- **3%** — Financial services companies that actually reported workforce reductions from AI, per American Banker survey

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**Anthropic Mythos / Project Glasswing** — Launched April 7. Frontier model found thousands of zero-days across every major OS and browser. 27-year-old OpenBSD bug. 16-year-old FFmpeg flaw. Restricted access to 12 major companies plus 40+ infrastructure orgs. $100M in usage credits committed.

**Intel joins Terafab** — Musk's $25B AI chip factory in Austin. Intel contributing 18A process node. Pilot at 100K wafer starts/month. Tesla AI5 chip as first product. 80% of output for SpaceX orbital AI satellites. Bernstein estimates full build at $5 trillion.

**Anthropic $30B run rate** — Revenue tripled from $9B in three months. 1,000+ enterprise customers at $1M+ annually. Now ahead of OpenAI on run rate, though accounting methods differ.

**Copilot CLI Rubber Duck** — Released April 6. Cross-model review using GPT-5.4 to check Claude Sonnet's work. Closes 74.7% of Sonnet-to-Opus performance gap. Catches bugs at three automated checkpoints. Available via /experimental.

**VS Code 1.115 Agents app** — Released April 8. Companion app for multi-session agent development. Agents can now interact with background terminals. Auto-notification when commands finish. Better browser tool labels.

**Chrome 147 vertical tabs** — Shipped April 7. Tabs move to sidebar. Full page titles visible. Tab groups supported. Minimizable to favicons. Also shipped full-page reading mode, CSS contrast-color(), and border-shape.

**AWS S3 Files** — GA April 7 in 34 regions. S3 buckets as NFS file systems. 1ms latency for active data. No data duplication. Works with EC2, Lambda, ECS, EKS.

**Dependabot to AI agents** — April 7. Assign Dependabot alerts to Copilot, Claude, or Codex. Agents analyze, open draft PRs, fix tests. Multiple agents can work the same alert independently.

**Oracle AI Database** — April 9. Platinum tier: failover under 30 seconds. Diamond tier: under 3 seconds. Quantum-safe security features. No app changes required for Platinum.

**NeuBird AI raises $19.3M** — April 7. Led by Xora Innovation. Autonomous production ops agent. Falcon engine for predictive risk detection. M12 and Mayfield participating.

**Bolt lays off 30%** — April 8. Fourth round since 2022. Valuation crashed from $11B to ~$300M. CEO cites AI as reason.

**Red Hat lays off hundreds** — Shut down entire China engineering team of ~419 people. Relocating roles to India. National security concerns likely a factor. $848M DoD deal in 2024. Severance N+3 to N+6 months. Terminations effective July 31.

**Pendo cuts 10%** — April 7. 90 employees affected. CEO says company is "refounding" around AI. Launched Novus autonomous agent in March. Valued at $2.6B in 2021.

**Docker CVE-2026-34040** — Authorization bypass via oversized HTTP requests. CVSS 8.8. Silently disables AuthZ plugins. Affects 92% of enterprise deployments. Incomplete fix for 2024 bug. Patch: Engine 29.3.1 or Desktop 4.66.1.

**Fortinet CVE-2026-35616** — FortiClientEMS zero-day. CVSS 9.1. Pre-auth API bypass. Active exploitation since March 31. CISA deadline April 9. Fix in version 7.4.7.

**GitHub secret scanning** — April 8. New API filters, richer webhooks, delegated workflow improvements. Code scanning batch-apply for PR fixes.

---

*The Mythos announcement is the one that will echo for a while. An AI model finding vulnerabilities that human security researchers missed for 27 years is not a minor improvement in tooling. It is a different category of capability. And Anthropic's decision to keep it restricted tells you everything about where the dual-use risk conversation is heading. A model that can find a decades-old bug can also exploit it. The 12-company consortium model is interesting but imperfect. It gives the biggest players access to the best security tools while everyone else waits. The Intel-Terafab deal is a different kind of signal. When Intel shows up as a foundry partner for Musk's AI chip factory, it tells you two things: Intel needs the business, and the demand for custom AI silicon has gotten so intense that even the biggest chipmaker in the world is taking contract work from a company that wants to produce chips for orbital satellites. Anthropic tripling its revenue in three months from $9 billion to $30 billion is the kind of growth that rewrites competitive dynamics. They are now arguably the revenue leader in the AI model business, though the accounting differences make the comparison messy. GitHub's Rubber Duck feature is a small release with a big idea behind it. Using different model families as cross-checks for each other is a practical solution to a real problem: every model has blind spots, and using a model from a different family to review the work catches things the first model consistently misses. Closing 74.7% of the Sonnet-to-Opus gap for essentially the cost of a second API call is a good trade. The Docker authorization bypass is the kind of vulnerability that makes security teams lose sleep. A bug class that has existed for a decade, an incomplete fix from 2024, and a bypass that works by simply making a request too large for the middleware to handle. 92% of enterprise container deployments affected. If you run Docker with AuthZ plugins, patch today, not tomorrow.*

*See you next week.*
