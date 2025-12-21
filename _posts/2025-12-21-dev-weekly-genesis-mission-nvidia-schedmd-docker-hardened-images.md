---
layout: post
seo: true
title: "Dev Weekly: Cursor Acquires Graphite, Coursera Merges with Udemy, Privacy Extensions Caught Selling AI Chats (Dec 15–21, 2025)"
subtitle: "Cursor buys Graphite. Coursera and Udemy merge in $2.5B deal. Privacy extensions caught selling 8M users' AI conversations. GitHub walks back self-hosted runner fees. Let's Encrypt shortens cert lifetimes. US launches Genesis Mission."
date: 2025-12-21
categories: tech-news
permalink: /dev-weekly-cursor-graphite-coursera-udemy-dec-15-21/
share-img: /assets/img/posts/dev_weekly/tech-news-15-21dec.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-15-21dec.png
description: "Cursor acquires Graphite. Coursera and Udemy merge in $2.5B deal. Privacy extensions caught selling 8M users AI conversations. GitHub reverses self-hosted runner fees. Let's Encrypt shortens certificate lifetimes. US Genesis Mission with 24 tech companies. Google Gemini 3 Flash. OpenAI GPT-5.2 Codex. Developer news Dec 15-21, 2025."
keywords: "Cursor Graphite acquisition, Coursera Udemy merger, Urban VPN AI data selling, GitHub self-hosted runners reversal, Let's Encrypt certificate changes, Genesis Mission AI, Google Gemini 3 Flash, OpenAI GPT-5.2 Codex, Nvidia SchedMD acquisition, Docker Hardened Images, NVIDIA Nemotron 3, developer news December 2025"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

Cursor bought Graphite. Coursera and Udemy announced a $2.5 billion merger. Privacy extensions were caught selling 8 million users' AI conversations. GitHub reversed its plan to charge for self-hosted runners. Let's Encrypt announced shorter certificate lifetimes. The US government launched the biggest AI project since the Manhattan Project. Packed week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Cursor Acquires Graphite - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2025/12/19/cursor-continues-acquisition-spree-with-graphite-deal/)

On December 19, Cursor announced the acquisition of Graphite, the code review startup.

**What is Graphite?**

Graphite is known for its "stacked pull requests" feature. Instead of waiting for one PR to be reviewed before creating the next, Graphite lets developers stack multiple dependent PRs and manage them together. It's popular with teams that move fast.

Graphite was last valued at $290 million. Reports say Cursor paid significantly more than that.

**Why this matters:**

AI is getting really good at writing code. But code review is still a bottleneck. Cursor generates code fast. Graphite reviews code fast. Together, they can speed up the entire development loop.

This is Cursor building an end-to-end AI coding platform. First the editor, now the review process. They're not just making AI that writes code - they're building the whole workflow around it.

**What's next:**

Graphite will continue operating as an independent product for now. Deeper integration with Cursor is coming. If you're a Graphite user, nothing changes immediately. If you're a Cursor user, expect better code review features soon.

### Coursera and Udemy Announce $2.5 Billion Merger - [<i class="fas fa-external-link-alt"></i>](https://investors.udemy.com/news-releases/news-release-details/coursera-combine-udemy-empower-global-workforce-skills-ai-era)

On December 17, the two biggest EdTech platforms announced they're merging.

**The deal:**

- **$2.5 billion** all-stock transaction
- Udemy shareholders get **0.8 shares** of Coursera for each Udemy share
- Coursera shareholders will own **59%**, Udemy shareholders **41%**
- Combined revenue of **$1.5 billion+**
- Expected **$115 million** in annual cost synergies
- Expected to close in **mid-2026**

**Why they're doing it:**

The pitch is AI reskilling. They're betting that AI will change every job, and millions of people will need to learn new skills. By combining Coursera's university partnerships and degree programs with Udemy's instructor-led marketplace, they're creating a one-stop shop for learning.

**What this means for learners:**

More content, more options. Coursera's structured degree programs plus Udemy's on-demand courses under one roof. The combined company will keep operating under the Coursera name.

**For the industry:**

This is massive consolidation in EdTech. The two biggest players are now one. Smaller platforms just got a lot smaller by comparison.

### 8 Million Users' AI Conversations Sold by "Privacy" Extensions - [<i class="fas fa-external-link-alt"></i>](https://www.koi.ai/blog/urban-vpn-browser-extension-ai-conversations-data-collection)

Security researchers discovered that browser extensions marketed as privacy tools were actually collecting and selling user data - including AI conversations.

**What happened:**

Extensions like Urban VPN, which promise privacy and anonymity, were caught collecting user data and selling it. The data included conversations with AI chatbots like ChatGPT, Claude, and Gemini.

**The numbers:**

- **8 million** users affected
- AI conversation data sold for profit
- Extensions marketed specifically as "privacy" tools

**Why it matters:**

This is a massive breach of trust. Users installed these extensions specifically for privacy. Instead, their most sensitive conversations - including AI chats where people often share personal information - were being harvested and sold.

**What to do:**

1. **Audit your browser extensions** - Remove anything you don't actively use
2. **Check permissions** - Does that extension really need to read all your data?
3. **Stick to reputable extensions** - Popular doesn't mean safe, but unknown definitely doesn't mean safe
4. **Assume AI conversations could leak** - Don't share anything with AI that you wouldn't want exposed

**The bigger picture:**

Browser extensions run with elevated permissions. They can see everything you do online. This isn't the first time "privacy" extensions have been caught doing the opposite of what they promise. It won't be the last.

### GitHub Walks Back Plan to Charge for Self-Hosted Runners - [<i class="fas fa-external-link-alt"></i>](https://www.theregister.com/2025/12/17/github_charge_dev_own_hardware/)

GitHub reversed course on a planned pricing change after pushback from the developer community.

**What happened:**

GitHub had announced plans to charge developers for using their own hardware to run GitHub Actions (self-hosted runners). The community was not happy. After The Register covered the story, GitHub walked back the plan.

**Why developers were upset:**

Self-hosted runners are exactly what they sound like - you provide the hardware, you pay for the electricity, you maintain the machines. GitHub's original plan would have charged users for the privilege of using their own infrastructure.

**The reversal:**

GitHub confirmed they're not going forward with the pricing change. Self-hosted runners will remain free.

**The lesson:**

Community pushback works. When pricing changes don't make sense, vocal feedback can reverse them. This is also a reminder to pay attention to pricing announcements from tools you depend on.

### Let's Encrypt Announces Major Certificate Changes - [<i class="fas fa-external-link-alt"></i>](https://community.letsencrypt.org/t/upcoming-changes-to-let-s-encrypt-certificates/243873)

On December 15, Let's Encrypt announced several big changes coming to their certificates.

**Shorter certificate lifetimes:**

Certificates are going from 90 days to 45 days. This is happening in phases:

- **May 13, 2026**: 45-day certs available in new "tlsserver" profile for early adopters
- **February 10, 2027**: Default certs drop to 64 days
- **February 16, 2028**: Default certs drop to 45 days

**Why shorter is better:**

If a private key gets compromised, shorter certificate lifetimes limit how long an attacker can use it. It also makes the entire certificate ecosystem more agile.

**New certificate chains:**

Let's Encrypt is introducing "Generation Y" - new root and intermediate certificates. The transition happens May 13, 2026.

**TLS Client Authentication going away:**

Starting February 11, 2026, Let's Encrypt will remove the TLS Client Authentication Extended Key Usage from default certificates. If you use Let's Encrypt certs for client authentication, you'll need to migrate.

**What to do:**

If you're using Let's Encrypt (and millions of sites are), make sure your automation can handle 45-day renewals. Most ACME clients already can, but check your setup.

### US Government Launches Genesis Mission - The Biggest AI Project Since Manhattan Project

On December 17, the US government announced the Genesis Mission.

**What is it?**

A massive national AI infrastructure project. 24 tech companies - including Nvidia, OpenAI, Microsoft, and Google - are building AI supercomputers across Department of Energy national laboratories.

**Why it matters:**

The government is calling this the largest national AI project since the Manhattan Project. This is serious investment in AI infrastructure at a scale we haven't seen before.

**What this means:**

AI is now a national priority, not just a corporate one. More compute means more AI research. More research means better models and tools for everyone.

---

## <i class="fas fa-robot"></i> AI News

### Google Releases Gemini 3 Flash - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2025/12/17/google-launches-gemini-3-flash-makes-it-the-default-model-in-the-gemini-app/)

On December 17, Google released Gemini 3 Flash and made it the default in the Gemini app.

**The numbers:**

- **33.7%** on Humanity's Last Exam (without tools)
- **81.2%** on MMMU-Pro
- **$0.50** per million input tokens
- **$3.00** per million output tokens

**Who's already using it:**

JetBrains, Cursor, and Figma have all integrated Gemini 3 Flash. That's a strong signal the model is production-ready.

### OpenAI Releases GPT-5.2 Codex - [<i class="fas fa-external-link-alt"></i>](https://www.everydev.ai/p/news-ai-dev-news-digest-december-19th-2025)

On December 16, OpenAI released GPT-5.2 Codex, their latest model for coding and cybersecurity.

**What's new:**

- Context compaction for handling million-token tasks
- Improved code refactoring capabilities
- Enhanced security features for finding vulnerabilities
- Available to paid ChatGPT users now, API coming soon

Researchers have already used GPT-5.2 Codex to find vulnerabilities in React Server Components.

### OpenAI Launches GPT Image 1.5

OpenAI released GPT Image 1.5, their updated image generation model.

- **4x faster** image generation
- Improved editing controls
- Better consistency in lighting and facial features

Available to all ChatGPT users and through the API.

### ChatGPT App Store Opens for Developer Submissions

Developers can now submit apps to the ChatGPT App Store. If you've built something on top of ChatGPT, this is your chance to get it in front of millions of users.

### NVIDIA Releases Nemotron 3 Model Family

NVIDIA released the Nemotron 3 family of models:

- **Nano** (30B parameters)
- **Super** (100B parameters)
- **Ultra** (500B parameters)

Features: Hybrid mixture-of-experts architecture, 1 million token context, designed for multi-agent systems. Perplexity, Palantir, and CrowdStrike are already using them.

### Google Releases FunctionGemma

Google released FunctionGemma, a specialized version of Gemma 3 270M trained for agentic tasks and tool use. Small model (270M parameters), specifically designed for AI agents that call functions and use tools.

### Meta Introduces Segment Anything Model for Audio

Meta released Segment Anything Model for Audio, extending their segmentation work from images to audio. Useful for speech recognition, audio analysis, and any application that needs to understand audio at a granular level.

### Apple Open Sources SHARP

Apple open sourced SHARP, a tool for instant 2D-to-3D conversion.

- Input a single photo, get a 3D scene in under a second
- Uses Gaussian splatting
- 25-34% better quality than previous methods
- Renders at 100+ fps
- Code and weights on GitHub

---

## <i class="fas fa-code"></i> Developer Tools

### Nvidia Acquires SchedMD, Maker of Slurm - [<i class="fas fa-external-link-alt"></i>](https://techstartups.com/2025/12/16/top-tech-news-today-ai-startup-stories-december-16-2025/)

On December 15, Nvidia acquired SchedMD, the company behind Slurm.

**What is Slurm?**

The open-source workload manager that schedules and optimizes large-scale compute jobs. It's used in most major supercomputers worldwide.

**Why Nvidia wants it:**

Nvidia owns the AI hardware. Now they want to own the software that manages it. Slurm is the standard for scheduling AI workloads.

**Good news:** Nvidia said they'll keep Slurm open source and vendor-neutral.

### Docker Open Sources 1,000+ Hardened Images

On December 17, Docker made their Docker Hardened Images free and open source under Apache 2.0.

- 1,000+ security-focused container images
- Based on Debian and Alpine
- Stripped down and hardened against vulnerabilities
- No catch - just free, secure base images

If you're using base images from public registries, consider switching.

### Serval Hits Unicorn Status with $75M Funding

Serval, the AI-powered IT support automation startup, raised $75 million in Series B from Sequoia Capital. Valued at $1 billion. Their platform can autonomously handle over 50% of IT support tickets.

### GitLab Survey: AI Could Unlock $750B+ in Value

GitLab's C-Suite survey dropped:

- **99%** of developers using or planning to use AI
- **$28,249** average annual savings per developer from AI
- **67%** find compliance harder with AI
- **78%** have had issues with AI-generated code

AI isn't replacing developers - it's changing what they do.

---

## <i class="fas fa-exclamation-triangle"></i> What This Week Teaches Us

**The AI coding stack is consolidating:** Cursor buying Graphite, OpenAI racing with Google. The winners will own the whole workflow.

**EdTech is consolidating too:** Coursera + Udemy is massive. The two biggest players are now one.

**Privacy extensions aren't always private:** 8 million users got burned. Audit your browser extensions.

**Community pushback works:** GitHub reversed their self-hosted runner fees after public criticism. Speak up when pricing changes don't make sense.

**Infrastructure matters:** Genesis Mission, Nvidia buying SchedMD, shorter SSL certs. The plumbing of the internet is getting serious attention.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$2.5 billion** - Coursera + Udemy merger value
- **$290M+** - What Cursor paid for Graphite
- **8 million** - Users whose AI conversations were sold by privacy extensions
- **$750B+** - Potential value from AI-driven software innovation
- **$115 million** - Expected annual synergies from Coursera/Udemy merger
- **45 days** - New Let's Encrypt certificate lifetime by 2028
- **99%** - Developers using or planning to use AI
- **24** - Tech companies in the Genesis Mission

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**Cursor + Graphite** - AI coding meets AI code review. End-to-end automation of the dev loop.

**Coursera + Udemy = EdTech giant** - $2.5B merger creates the dominant online learning platform. Betting on AI reskilling demand.

**Check your browser extensions** - 8 million users' AI chats were sold by "privacy" extensions. If you have extensions you don't use, remove them.

**GitHub backed down** - Self-hosted runners stay free after community pushback.

**SSL certs getting shorter** - 45 days by 2028. Make sure your automation can handle it.

**Genesis Mission is massive** - 24 companies, DOE labs, Manhattan Project comparisons. AI infrastructure is now national priority.

**Gemini 3 Flash vs GPT-5.2 Codex** - Google and OpenAI released new models within 24 hours of each other. Competition is fierce.

---

*Huge week for consolidation. Cursor/Graphite in dev tools. Coursera/Udemy in education. But the privacy extension story is the wake-up call - even tools marketed for security can be selling your data. The Genesis Mission shows where things are headed: AI infrastructure at national scale. And GitHub's reversal proves that developer feedback still matters.*

*Got news we should cover? Let us know. We track what matters to developers.*

