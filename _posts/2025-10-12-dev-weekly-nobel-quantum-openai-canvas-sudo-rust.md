---
layout: post
seo: true
title: "Dev Weekly: Windows 10 Dies, Sora 2 Sparks Deepfake Fears, Nobel Goes to Quantum (Oct 6–12, 2025)"
subtitle: "Microsoft kills Windows 10, OpenAI's Sora 2 launches amid controversy, Nobel Prize honors quantum pioneers, Ubuntu replaces sudo with Rust"
date: 2025-10-12
categories: tech-news
permalink: /dev-weekly-windows-10-dies-sora-2-deepfakes-nobel-quantum/
share-img: /assets/img/posts/dev_weekly/tech-news-6-12-oct.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-6-12-oct.png
description: "Windows 10 reaches end of support October 14, OpenAI releases controversial Sora 2 video generator, OpenAI partners with AMD for 6 gigawatts of GPUs challenging NVIDIA, Nobel Prize in Physics honors quantum computing pioneers, Ubuntu replaces sudo with Rust, Microsoft patches critical zero-day, and 400 million PCs face retirement."
keywords: "Windows 10 end of support 2025, Sora 2 release deepfake, OpenAI AMD partnership GPU deal, Nobel Prize Physics quantum computing, Ubuntu sudo-rs Rust, Microsoft Patch Tuesday zero-day, NVIDIA competition, AMD MI450 GPUs, developer news October 2025, AI video generation"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

This week was wild. Microsoft announced the death of Windows 10, OpenAI dropped a controversial video generator and signed a massive GPU deal with AMD, the Nobel Prize honored quantum computing pioneers, and 400 million PCs are about to become e-waste. Here's what happened this week in tech.

---

## 🔥 Top Stories This Week

### Windows 10 Support Ends October 14 - [🌐](https://learn.microsoft.com/en-us/lifecycle/announcements/windows-10-end-of-support)

Microsoft made it official this week: **Windows 10 support ends on October 14, 2025**. After that date, no more security updates, no bug fixes, no technical support.

This affects **400 million PCs** worldwide that are still running Windows 10. That's not a typo - 400 million devices are about to lose security updates.

**What happens after October 14:**
- **No security patches** - New vulnerabilities won't be fixed
- **No tech support** - Microsoft won't help with issues
- **Compliance problems** - Many regulations require supported operating systems
- **Increased risk** - Hackers specifically target unsupported systems

**Your options:**
1. **Upgrade to Windows 11** - If your hardware supports it (many older machines don't)
2. **Buy new hardware** - Windows 11 requires TPM 2.0, newer CPUs, and more RAM
3. **Extended Security Updates (ESU)** - Microsoft offers paid extended support, but it's expensive and mainly for enterprises
4. **Switch to Linux** - Free, supported, and runs on older hardware

The environmental impact is huge too. Research shows these 400 million retired PCs contain **billions of dollars worth of gold, silver, and copper** - [🌐](https://www.techradar.com/pro/theres-gold-in-them-thar-pcs-old-windows-10-devices-could-be-holding-billions-of-dollars-worth-of-gold). Proper recycling matters.

Microsoft is pushing everyone to Windows 11, but many machines physically can't run it. This forced upgrade cycle is creating massive e-waste and forcing hardware purchases. Not great for the environment or people's wallets.

### OpenAI Releases Sora 2 Amid Deepfake Concerns - [🌐](https://theweek.com/tech/sora-2-openai-the-fear-of-an-ai-video-future)

OpenAI launched **Sora 2** this week - an AI tool that generates **hyper-realistic videos from text descriptions**. The quality is impressive and terrifying at the same time.

**What Sora 2 can do:**
- Generate photorealistic video from simple text prompts
- Create people, places, and events that never happened
- Make videos that are nearly impossible to distinguish from real footage
- Outperforms competitors like Grok Imagine in realism tests - [🌐](https://www.tomsguide.com/ai/ai-image-video/i-tested-sora-2-vs-grok-imagine-with-7-challenging-prompts-and-theres-a-clear-winner)

**Why people are worried:**
- **Deepfakes** - Create fake videos of anyone saying anything
- **Misinformation** - Generate "proof" of events that never happened
- **Political manipulation** - Fake videos of politicians, leaders, anyone
- **Revenge content** - Non-consensual fake videos of real people

The launch got messy quickly. OpenAI's initial copyright policy allowed using **any copyrighted content unless rightsholders opted out**. After backlash (including an AI-generated video of Sam Altman surrounded by Pokémon saying "I hope Nintendo doesn't sue us"), they **reversed course and switched to opt-in only** - [🌐](https://www.pcgamer.com/software/ai/openai-hastily-retreats-from-gung-ho-copyright-policy-after-embarrassing-sora-video-output-like-ai-sam-altman-surrounded-by-pokemon-saying-i-hope-nintendo-doesnt-sue-us/).

**For developers, this raises hard questions:**
- Should there be required watermarks on AI-generated video?
- How do platforms detect and label AI content?
- What responsibility do developers have to prevent misuse?
- Are current safeguards enough?

The technology is out there now. You can't un-invent it. The question is how we build systems that use it responsibly. OpenAI says they have safeguards, but the Pokémon incident shows those guardrails are easy to bypass.

If you're building tools that work with video or content verification, Sora 2 just made your job much harder. Detecting AI-generated video is becoming nearly impossible.

### Nobel Prize in Physics Goes to Quantum Circuit Pioneers - [🌐](https://www.nobelprize.org/prizes/physics/2025/press-release/)

On October 7th, the **Nobel Prize in Physics** was awarded to **John Clarke, John M. Martinis, and Michel Devoret** for their work on macroscopic quantum mechanical tunneling and energy quantization in electric circuits.

This is a big deal for developers working in quantum computing. These three researchers figured out how to make quantum effects work in circuits you can actually build - not just in theory but in practice. Their work is the foundation for:

- **Quantum computers** - The qubits in today's quantum computers use their discoveries
- **Superconducting circuits** - Modern quantum processors are built on this research
- **Quantum sensors** - Ultra-precise measurement devices

Why it matters now: Companies like IBM, Google, and Amazon are all betting on quantum computing. The tools and frameworks for quantum development are getting better every year. If you're curious about quantum, this is the time to start learning - the field is moving from research labs into actual products.

The Nobel Committee basically said "quantum computing is real and important enough" to award the field's foundational work. That's a signal.

### Chemistry Nobel Recognizes Metal-Organic Frameworks - [🌐](https://www.nobelprize.org/prizes/chemistry/2025/press-release/)

The **Nobel Prize in Chemistry** went to **Omar M. Yaghi, Richard Robson, and Susumu Kitagawa** for developing metal-organic frameworks (MOFs) - basically programmable sponges at the molecular level.

For software folks, think of MOFs like this: you can design materials with specific properties by writing the "code" for their molecular structure. Want to capture CO2? Design a MOF for it. Need hydrogen storage? There's a MOF structure for that.

This matters for tech because:
- **Data center cooling** - More efficient materials mean less energy
- **Battery tech** - Better energy storage for devices
- **Clean tech** - Carbon capture and air filtration

These awards show where science is heading - quantum computing and programmable materials are becoming real engineering disciplines, not just lab experiments.

### OpenAI Raises $6.6 Billion and Launches Canvas - [🌐](https://techcrunch.com/2024/10/02/openai-raises-6-6b-and-is-now-valued-at-157b/)

OpenAI closed a **$6.6 billion funding round** this week, one of the largest AI deals ever. But more interesting for developers is what they launched: **Canvas**.

**Canvas** is a new interface for ChatGPT that's designed for collaboration:
- **Side-by-side workspace** - Chat on one side, code or document on the other
- **Inline editing** - Make changes directly, not through copy-paste
- **Version tracking** - See what changed as you iterate
- **Project context** - Maintains understanding across your whole project

This is OpenAI's answer to GitHub Copilot and Cursor - they're building for how developers actually work, not just Q&A.

Early users say Canvas feels less like talking to a chatbot and more like pair programming. The AI can suggest edits, you can accept or modify them, and it remembers what you're building across the session.

Worth trying if you're using ChatGPT for coding. The interface makes a bigger difference than you'd think.

### South Korean Data Breaches Highlight Security Failures - [🌐](https://coaio.com/news/2025/10/ai-driven-revolution-in-software-development-key-updates-from-october-2025/)

Multiple **data breaches in South Korea** made headlines this week, exposing personal information of millions of users across several major companies.

The breaches happened across:
- Financial services companies
- Healthcare providers  
- E-commerce platforms

What went wrong (based on initial reports):
- **Outdated dependencies** - Some companies were running vulnerable versions of common libraries
- **Weak access controls** - Internal systems had insufficient permission checks
- **Delayed patching** - Known vulnerabilities weren't patched fast enough

For developers, this is a reminder to:
- **Keep dependencies updated** - Those CVEs in your security scanner aren't theoretical
- **Don't skip security PRs** - If Dependabot or Renovate opens a security update, review it
- **Test your access controls** - Can users really only access what they should?

The investigation is ongoing, but early signs point to preventable security issues that just weren't prioritized. It's easy to delay security work when features are urgent, but these breaches show the real cost.

### California Grants Gig Workers Right to Unionize - [🌐](https://www.callaborlaw.com/blog/new-california-law-allows-for-unionization-of-certain-gig-independent-contractors#:~:text=New%20California%20Law%20Allows%20for%20Unionization%20of%20Certain%20Gig%20Independent%20Contractors,-By%3A%20Mark%20S&text=Earlier%20this%20month%2C%20on%20October,Relations%20Act%20(the%20Act).)

California passed legislation allowing **Uber and Lyft drivers to unionize as independent contractors** - a first in the US.

This affects developers working on gig economy platforms because the apps will need updates:

**Features you'll probably need to add:**
- **Dispute resolution tools** - Built-in ways to handle worker grievances
- **Transparent pay calculations** - Show exactly how pay is calculated
- **Data access for workers** - Let drivers see their full work history and data
- **Communication channels** - Ways for drivers to connect with union representatives

This could spread beyond ride-sharing to other gig platforms - food delivery, freelance marketplaces, etc. If you're building platform economy apps, start thinking about how you'd support worker organizing.

The law is California-only for now, but other states are watching. Platform companies that operate nationwide will probably build these features once rather than maintaining separate versions.

---

## 🛠 Developer Tools & Releases

### Ubuntu Plans to Replace sudo with Rust Version - [🌐](https://discourse.ubuntu.com/t/adopting-sudo-rs-by-default-in-ubuntu-25-10/60583)

Big news for Linux developers: **Ubuntu 25.10** (coming later this year) plans to replace the traditional `sudo` command with **sudo-rs**, a Rust-based rewrite.

Why rewrite sudo?
- **Memory safety** - Rust eliminates whole classes of security bugs
- **Better security** - sudo is one of the most critical system utilities - it runs with root access
- **Fewer vulnerabilities** - The C version has had numerous CVEs over the years

What this means:
- **For most users** - Nothing changes, the command works the same
- **For system admins** - Same interface, but potentially fewer security patches needed
- **For the ecosystem** - Another signal that Rust is becoming the standard for system tools

This follows a trend of rewriting critical system utilities in Rust:
- **coreutils** - GNU core utilities being rewritten
- **findutils** - find, xargs, etc. getting Rust versions
- **systemd components** - Some parts moving to Rust

If you're a systems programmer and haven't learned Rust yet, this is another reason to start. The Linux ecosystem is clearly betting on it for security-critical components.

### AMD Launches Developer Cloud for AI Projects - [🌐](https://www.amd.com/en/blogs/2025/100k-hours-free-developer-cloud-access.html)

AMD released the **AMD Developer Cloud**, giving developers cloud access to their **Instinct MI300X GPUs** for AI and machine learning work.

What it offers:
- **Direct GPU access** - Use AMD's latest AI accelerators without buying hardware
- **Open ecosystem** - Works with PyTorch, TensorFlow, JAX
- **No lock-in** - Not tied to AMD's proprietary frameworks
- **Developer-friendly pricing** - Competitive with NVIDIA cloud options

This matters because it breaks NVIDIA's near-monopoly on AI development hardware. If you've been frustrated with NVIDIA GPU costs or availability, AMD is offering an alternative.

Worth trying if you're:
- Training large models and want cheaper compute
- Building AI products and want to avoid vendor lock-in
- Experimenting with AI and need powerful hardware

AMD's betting that developers want open standards and competitive pricing more than they want NVIDIA's ecosystem lock-in. Time will tell if that's the right bet.

### OpenAI Partners with AMD in Massive GPU Deal - [🌐](https://openai.com/index/openai-amd-strategic-partnership/)

In what might be the week's biggest business move, **OpenAI and AMD announced a strategic partnership** to deploy **up to 6 gigawatts of AMD GPUs** over multiple years.

**The scale is massive:**
- **6 gigawatts** of compute across multiple GPU generations
- **Initial deployment** of 1 gigawatt starting in second half of 2026
- **AMD MI450 Series GPUs** - their next-generation AI accelerators
- **Tens of billions in revenue** expected for AMD

**The equity angle:**
AMD issued OpenAI a **warrant for up to 160 million shares** of AMD stock. The shares vest as deployment milestones are hit and AMD's stock price reaches certain targets. This ties OpenAI's success directly to AMD's success.

**Why this matters:**
- **Breaks NVIDIA's monopoly** - OpenAI is diversifying away from relying only on NVIDIA
- **Validates AMD in AI** - If OpenAI trusts AMD for their infrastructure, others will follow
- **Changes pricing dynamics** - Competition means better deals for everyone
- **Risk diversification** - OpenAI won't be held hostage by a single GPU supplier

This partnership could reshape the AI hardware market. If AMD delivers, NVIDIA's dominance is over. If AMD stumbles, it reinforces NVIDIA's position. Either way, the next 12-18 months will be interesting.

---

## 📊 The Numbers That Matter

- **400 million** - PCs running Windows 10 losing support on October 14, 2025
- **6 gigawatts** - AMD GPU compute OpenAI will deploy over multiple years
- **$6.6 billion** - OpenAI's latest funding round at $157B valuation
- **160 million shares** - AMD stock warrant issued to OpenAI
- **Tens of billions** - Expected revenue for AMD from OpenAI partnership
- **1 gigawatt** - Initial AMD GPU deployment starting in second half of 2026
- **Billions of dollars** - Worth of precious metals in retired Windows 10 PCs
- **3 researchers** - Each for Nobel Prize in Physics and Chemistry
- **Ubuntu 25.10** - Version that will replace sudo with Rust-based sudo-rs

---

*Got a story we missed? Let us know - we're always looking to improve our coverage of what matters to developers.*

