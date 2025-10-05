---
layout: post
seo: true
title: "Dev Weekly: California Regulates AI Hiring, Claude Gets Developer Tools & EA's $55B Exit (Sep 29–Oct 5, 2025)"
subtitle: "California enforces AI hiring law, Anthropic launches Claude developer tools, GitHub brings AI to terminal, and EA sells for $55 billion"
date: 2025-10-05
categories: tech-news
permalink: /dev-weekly-california-ai-law-claude-developer-tools-ea-acquisition/
share-img: /assets/img/posts/dev_weekly/dev-weekly-cover.png
thumbnail-img: /assets/img/posts/dev_weekly/dev-weekly-cover.png
description: "California enforces first major AI employment regulations, Anthropic releases Claude Sonnet 4.5 with developer tools, GitHub Copilot CLI enters public preview, Electronic Arts sells for $55 billion, AOL ends dial-up after 30 years, JUnit 6 released, plus major funding rounds and Google's Gemini for Home announcement."
keywords: "California AI employment law, Claude Sonnet 4.5 release, GitHub Copilot CLI, Electronic Arts acquisition, AOL dial-up shutdown, JUnit 6 release, developer news October 2025, AI regulations, software development tools, tech acquisitions"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

The first week of October brought some real shake-ups to the tech world. From California becoming the first state to actually enforce AI hiring rules to the biggest leveraged buyout in history, here's what happened while you were coding.

---

## 🔥 Top Stories This Week

### California Actually Regulates AI in Hiring - [🌐](https://etcjournal.com/2025/09/29/this-week-on-planet-earth-sep-29-oct-5-2025/)

On October 1st, California became the first state to enforce serious regulations on AI in hiring. The new **Fair Employment and Housing Act (FEHA)** rules now require companies to:

- **Run bias audits** on any AI or automated decision systems used in hiring
- **Keep records for 4 years** of all AI-related employment data
- **Take responsibility** for third-party AI tools they use

This isn't just talk - companies can face penalties for violations.

What this means for developers:
- If you're building HR tech or recruitment tools, **compliance is now mandatory**
- Companies using AI for hiring need to prove it's not discriminatory
- This will likely spread to other states quickly

For those working on AI systems that touch employment decisions, you'll need to build in audit trails and bias testing from day one. California just set the standard everyone else will follow.

### Anthropic Goes All-In on Developer Tools - [🌐](https://www.anthropic.com/news/claude-sonnet-4-5)

Anthropic released **Claude Sonnet 4.5**, and this time they're clearly targeting developers. The release includes two new tools:

**Claude Code:**
- Command-line coding assistant
- Works directly in your terminal
- Competes head-to-head with GitHub Copilot

**Claude Agent SDK:**
- The same SDK Anthropic uses internally
- Build custom coding agents
- Integrate Claude into development workflows

This is Anthropic's play to move beyond chatbot territory and become part of your daily development stack. They're betting developers want AI that lives in the tools they already use.

Early reports suggest Claude Code is particularly good at understanding larger codebases and maintaining context across multiple files. Worth trying if you've been frustrated with other AI coding tools losing track of what you're building.

### GitHub Brings AI to the Terminal - [🌐](https://github.blog/changelog/2025-09-25-github-copilot-cli-is-now-in-public-preview/)

GitHub released **Copilot CLI** in public preview on September 25th. Now you can get AI assistance without leaving your terminal.

Key features:
- **Natural language commands** - describe what you want, it figures out the command
- **Code actions from terminal** - build, edit, debug, refactor using plain English
- **GitHub integration** - directly connected to your repos and workflow
- **Agentic mode** - can chain multiple actions together

Example: Instead of googling "how to find files modified in last 24 hours," just ask Copilot CLI and it suggests the exact command.

This is part of a bigger trend - AI tools moving closer to where developers actually work. No more switching between your editor, browser, and terminal. Everything's becoming AI-aware.

### Electronic Arts Sells for $55 Billion - [🌐](https://www.bbc.com/news/articles/cn4w3jzx807o)

On September 29th, **Electronic Arts agreed to be acquired** for $55 billion by a group led by private equity firm Silver Lake, Saudi Arabia's Public Investment Fund, and Affinity Partners.

This is being called the **largest leveraged buyout in history**. The deal is expected to close in Q1 2027.

The gaming industry has been in consolidation mode, but this is the biggest deal yet. For developers at EA or working with EA technologies, expect changes in the next year as new ownership takes over.

---

## 🛠 Developer Tools & Releases

### AWS Launches Browser Automation Tool

AWS released **Nova Act**, an open-source IDE extension for building browser automation agents.

What it does:
- **Describe workflows in plain English** - the tool converts them to automation scripts
- **Test locally** in your IDE before deployment
- **Customize generated scripts** - not locked into what AI produces
- **Works with existing AWS services** for deployment

This is useful if you're building web scraping tools, testing automation, or any workflow that needs to interact with web pages. The local testing in your IDE is a nice touch - no need to deploy just to see if it works.

### Google Drops Gemini in Your Smart Home

Google announced **Gemini for Home** on October 1st, bringing its AI model to Nest Cam, speakers, and other smart home devices.

This is Google's play to embed AI everywhere in your house. For developers, it means:
- New APIs for smart home integration with Gemini
- Voice and visual AI processing at the edge
- Potential for building third-party smart home apps with AI capabilities

---

## 📦 Framework & Library Releases

### JUnit 6 Is Here - [🌐](https://docs.junit.org/6.0.0/release-notes/#release-notes-6.0.0)

The Java testing world got a major upgrade with the release of **JUnit 6**. This is the first major version bump in years, and it comes with some important changes.

**Breaking Changes:**
- **Requires Java 17 or later** - if you're still on Java 8 or 11, you can't upgrade yet
- **Removed deprecated APIs** - time to clean up that old test code
- **Unified versioning** - Platform, Jupiter, and Vintage all share the same version number now

**New Features:**
- **Kotlin support** - test methods can now use Kotlin's `suspend` modifier for async testing
- **Better parameterized tests** - consistent display name formatting
- **Simplified dependencies** - no more version mismatches between JUnit components

What this means for Java developers:
- **Migration required** - JUnit 6 isn't a drop-in replacement, you'll need to update your code
- **Time to upgrade Java** - if the Java 17 requirement seems aggressive, remember that Java 11 is getting old
- **Better async testing** - the Kotlin support is a big deal for projects using coroutines

If you're maintaining a Java project, start planning your migration now. The unified versioning alone will save headaches down the road.

### AndroidX Test JUnit Extensions 1.3.0

Android developers got an update to **androidx.test.ext:junit** with version 1.3.0:

- **Minimum SDK now 21** - dropping support for older Android versions
- **Updated to Kotlin 1.9.0** - if you're using Kotlin for tests
- **Bug fixes** - corrected documentation links and Bazel toolchain updates

Nothing groundbreaking, but if you're testing Android apps, you should update to stay current.

---

## 💼 Funding & Business Moves

### AI Infrastructure Startups Clean Up

This week saw huge funding rounds for AI and developer infrastructure companies:

**Modular - $250 Million:**
- AI infrastructure platform
- Series C at **$1.6 billion valuation**
- Led by US Innovative Technology Fund
- Building tools to make AI development faster and more efficient

**AppZen - $180 Million:**
- AI platform for finance teams
- Series D funding
- Agentic AI for expense management and financial workflows

**Distyl AI - $175 Million:**
- Enterprise AI tools
- Valued at **$1.8 billion**
- Focus on making AI practical for everyday business operations

**Filevine - $400 Million:**
- Legal practice management software
- Two undisclosed funding rounds
- Shows enterprise software still getting major investment

**Judi Health - $400 Million:**
- Health benefits software
- Series F led by Wellington Management
- Healthcare tech remains hot

The trend is clear: investors are betting big on AI infrastructure and tools that make AI useful for specific industries. If you're building developer tools or AI infrastructure, funding is available.

### SAP and OpenAI Team Up for Germany

SAP and OpenAI announced **"OpenAI for Germany"** - an initiative to bring AI to German public sector while ensuring data sovereignty and regulatory compliance.

This matters because:
- Shows how AI companies are adapting to strict European data laws
- Creates blueprint for other region-specific AI deployments
- Opens up government tech contracts for developers who understand compliance

---

## 🔒 Security & Open Source

### F-Droid Challenges Google's Sideloading Rules

F-Droid, the free software app store for Android, pushed back against Google's new sideloading restrictions. Google claims the changes improve security, but F-Droid says they threaten alternative app distribution.

This is part of a bigger tension:
- **Platform security** vs. **software freedom**
- Google wants control over what runs on Android
- Open source communities want alternative distribution methods
- Regulators in EU and US are watching closely

For Android developers, this could affect how you distribute apps outside the Play Store. If F-Droid gets blocked or restricted, it removes one of the main alternative distribution channels.

---

## 📊 The Numbers That Matter

- **$55 billion** - Electronic Arts acquisition price (largest leveraged buyout ever)
- **$400 million** - Funding raised by both Judi Health and Filevine
- **$250 million** - Modular's Series C round (at $1.6B valuation)
- **$180 million** - AppZen's Series D funding
- **Java 17** - Minimum version required for JUnit 6
- **4 years** - Data retention requirement under California's new AI hiring law
- **October 1st** - When California's AI employment regulations took effect

---

## 💭 What This Means for Developers

This week showed four major trends worth paying attention to:

**AI regulation is real now**: California's AI hiring law isn't a proposal or guideline - it's enforceable regulation with real penalties. If you're building AI systems, compliance and auditing need to be part of your design from day one. This will spread to other states and countries quickly.

**Developer tools are AI's next battleground**: With both Anthropic and GitHub pushing AI directly into developer workflows, the competition is heating up. We're moving past chatbot interfaces to AI that lives in your terminal, IDE, and development environment. Try the new tools and figure out which ones actually help versus which ones just add noise.

**Consolidation continues**: The EA acquisition is just the latest in ongoing tech industry consolidation. Larger companies are buying up successful players rather than competing. For developers, this means fewer potential employers in some sectors but also more opportunities at larger, well-funded companies.

**Platform control vs. developer freedom**: The F-Droid versus Google situation highlights an ongoing battle. As platforms tighten security (or control, depending on your view), alternative distribution methods face pressure. Developers need to think about how platform policies affect their ability to reach users.

The industry is moving fast right now. AI tools are getting better weekly, regulations are catching up to reality, and the business landscape keeps shifting. The developers who stay on top of these changes and adapt their skills accordingly will have the advantage.

---

*Got a story we missed? Let us know - we're always looking to improve our coverage of what matters to developers.*

