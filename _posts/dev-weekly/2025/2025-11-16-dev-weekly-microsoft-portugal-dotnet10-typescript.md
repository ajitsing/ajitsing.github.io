---
layout: post
seo: true
title: "Dev Weekly: Microsoft's $10B Portugal AI Hub, .NET 10 LTS, TypeScript Takes #1 Spot (Nov 10–16, 2025)"
subtitle: "Microsoft invests $10 billion in Portugal AI infrastructure, .NET 10 LTS drops with major performance gains, TypeScript becomes GitHub's most-used language, and React Native security flaw hits 2 million projects"
date: 2025-11-16
categories: tech-news
permalink: /dev-weekly-microsoft-portugal-dotnet10-typescript-nov-10-16/
share-img: /assets/img/posts/dev_weekly/tech-news-10-16nov.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-10-16nov.png
description: "Microsoft announces $10B AI hub in Portugal. .NET 10 LTS released with 30% faster startup times. TypeScript overtakes Python as GitHub's top language. Meta signs $3B cloud deal. React Native critical vulnerability affects 2M projects. Python 3.14 drops with free-threaded execution. Developer news November 10-16, 2025"
keywords: "Microsoft Portugal AI investment 10 billion, .NET 10 LTS release, TypeScript GitHub most used language, React Native CVE-2025-11953, Python 3.14 free-threaded, Meta Nebius 3 billion, developer tools November 2025, TypeScript compiler rewrite Go"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

Microsoft just committed $10 billion to build an AI megahub in Portugal. .NET 10 LTS is here with serious performance boosts. TypeScript officially became GitHub's most-used language, beating Python and JavaScript. And there's a critical React Native vulnerability you need to patch right now. Here's what went down this week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Microsoft Drops $10 Billion on Portugal AI Hub - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/business/microsoft-plans-invest-10-billion-portugal-ai-data-hub-bloomberg-news-reports-2025-11-11/)

Microsoft announced on November 11 that they're investing **$10 billion** to build a massive AI data center in Sines, Portugal. This is one of the biggest AI infrastructure investments in Europe.

**What they're building:**
- Massive AI-focused data center complex
- Major compute capacity for AI workloads
- Cloud infrastructure expansion in Europe
- Positioning Portugal as an AI compute hub

This comes right after their $9.7 billion deal with Australia and $7.9 billion investment in the UAE. Microsoft is clearly building out global AI infrastructure at an insane scale.

### Meta Signs $3 Billion Cloud Deal with Nebius - [<i class="fas fa-external-link-alt"></i>](https://www.bloomberg.com/news/articles/2025-11-11/nebius-sales-soar-as-neocloud-provider-inks-ai-deal-with-meta)

Meta entered a **five-year, $3 billion agreement** with Amsterdam-based Nebius Group this week for AI computing and cloud infrastructure services.

**What it covers:**
- AI compute capacity for Meta's products
- Data center infrastructure
- Cloud services to scale AI operations
- Long-term partnership through 2030

**Why this is interesting:**
- Shows the massive demand for data center capacity
- Companies are locking in compute years in advance
- AI infrastructure is becoming a bottleneck
- Cloud providers can't build fast enough

Between this and Microsoft's moves, there's clearly a rush to secure AI compute capacity. The infrastructure is becoming the limiting factor for AI development.

### .NET 10 LTS Released - [<i class="fas fa-external-link-alt"></i>](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-10/overview)

Microsoft wrapped up the .NET Conference 2025 with the release of **.NET 10 LTS** (Long-Term Support). This is a big one.

**Performance improvements:**
- **30% faster startup times** for ASP.NET Core apps
- **40% reduction in memory usage** for containerized deployments
- Native ahead-of-time (AOT) compilation support
- Better performance across the board

**C# 14 new features:**
- Primary constructors for all types
- Inline arrays
- Enhanced pattern matching
- Better integration with AI coding tools

**Support timeline:**
- LTS release with support until **November 2028**
- Perfect for enterprise production deployments
- Three years of patches and updates

This is the release companies will standardize on for the next few years. The performance gains alone make it worth upgrading, especially if you're running containerized workloads.

The 40% memory reduction in containers is huge for cloud costs. If you're running hundreds of microservices, that adds up fast.

### TypeScript Becomes GitHub's Most-Used Language - [<i class="fas fa-external-link-alt"></i>](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)

Big news for TypeScript. It's now officially the **most-used language on GitHub**, overtaking Python and JavaScript.

**The numbers:**
- Over **1 million new developers** started using TypeScript in 2025
- **66% year-over-year growth**
- Now the default for major frameworks: Next.js, Astro, SvelteKit, Angular, Remix
- Clear momentum toward typed languages

**Microsoft's compiler rewrite:**
- Complete rewrite of the TypeScript compiler **in Go**
- **10x performance improvement**
- Full backward compatibility maintained
- Faster builds, faster type checking

This is wild. Rewriting your compiler in a different language and getting 10x performance while keeping full compatibility is not easy. But the results speak for themselves.

**Why TypeScript is winning:**
- Static typing catches bugs early
- Better tooling and autocomplete
- AI coding tools work better with types
- Easier to maintain large codebases
- Modern frameworks default to it

---

## <i class="fas fa-shield-alt"></i> Security Alert: Critical React Native Flaw

### React Native Vulnerability Affects 2 Million Projects

This one is urgent. A critical vulnerability (**CVE-2025-11953**) was discovered in the `@react-native-community/cli` NPM package.

**The problem:**
- Affects approximately **2 million weekly downloads**
- Remote attackers can execute arbitrary OS commands
- Targets machines running the React Native development server
- No authentication required

**What you need to do:**
- Update to the latest patched version **immediately**
- Check all your React Native projects
- Update CI/CD pipelines
- Verify your dependencies

This is one of those "drop everything and patch" vulnerabilities. If you're running React Native dev servers, especially in any environment that's accessible beyond localhost, you need to update now.

---

## <i class="fas fa-tools"></i> Developer Tools & Releases

### Python 3.14.0 Ships with Free-Threaded Execution

Python 3.14.0 was officially released this week with some major changes.

**Big new features:**
- **Free-threaded execution** - true parallelism without GIL constraints
- **Experimental JIT compiler** for better performance
- Official Android binary releases
- Better performance for multi-threaded workloads

**What free-threaded execution means:**
- Python can now use multiple CPU cores effectively
- No more Global Interpreter Lock (GIL) limitations
- Better performance for CPU-bound tasks
- Brings Python closer to languages like Go and Rust for concurrency

This has been requested for years. The GIL has been a pain point forever, especially for data science and ML workloads that need real parallelism.

The JIT compiler is still experimental, but early benchmarks show promising speed improvements. This could make Python competitive with compiled languages for certain workloads.

### Helm v4 Released

The Cloud Native Computing Foundation announced **Helm v4** this week, coinciding with Helm's **10th anniversary**.

**What's new:**
- Better security features
- Improved dependency management
- Enhanced chart validation
- Performance improvements
- Better Kubernetes integration

If you're managing Kubernetes deployments, Helm v4 brings some nice quality-of-life improvements. The security enhancements alone make it worth upgrading.


### JFrog's Shadow AI Detection

JFrog launched **Shadow AI Detection** for their Software Supply Chain Platform.

**What it does:**
- Detects unauthorized AI tool usage
- Monitors AI-generated code in your supply chain
- Governance for AI in software development
- Helps manage AI security risks

**Why this matters:**
- 40% of enterprise code is now AI-generated
- Companies need visibility into AI usage
- Security teams can't keep up manually
- Compliance and governance are becoming critical

This is addressing a real problem. Teams are using AI coding tools everywhere, but security and compliance teams often have no idea what's happening. Shadow AI detection gives you visibility.

---

## <i class="fas fa-exclamation-triangle"></i> Other Security News

### OWASP Top 10 Updated for 2025

OWASP updated their Top 10 application security risks for 2025.

**Still at the top:**
- Broken Access Control
- Injection vulnerabilities
- Security misconfigurations

**New entries:**
- Software Supply Chain Failures
- Insecure Design
- AI-specific vulnerabilities

The inclusion of supply chain security and AI risks shows how the threat landscape is evolving. These aren't theoretical anymore, they're real attack vectors being exploited.

---

## <i class="fas fa-brain"></i> AI Impact on Developers

### 65% of Developers Expect AI to Redefine Their Roles - [<i class="fas fa-external-link-alt"></i>](https://www.globenewswire.com/news-release/2025/11/12/3186147/0/en/65-of-Developers-Expect-Their-Roles-To-Be-Redefined-by-AI-in-2026.html)

BairesDev released a survey this week with some interesting data on how developers see AI changing their work.

**Key findings:**
- **65%** of senior developers expect role changes by 2026
- **74%** predict shift from coding to solution design
- **61%** will integrate AI-generated code into workflows
- **50%** expect more focus on strategy and architecture
- **58%** think automation will reduce entry-level tasks

**The positive side:**
- **74%** say AI enhanced their technical skills
- **50%** report better work-life balance in 2025
- AI is handling repetitive tasks
- More time for creative problem-solving

**What this means:**
- Junior roles are changing the fastest
- Focus shifting toward architecture and design
- Writing code is becoming less of the job
- Review and integration skills are more valuable

This lines up with what we're seeing in the industry. The skill that matters is knowing what to build and how systems should work together, not writing every line of code yourself.

---

## <i class="fas fa-chart-line"></i> The Numbers That Matter

- **$10 billion** - Microsoft's AI data hub investment in Portugal
- **$3 billion** - Meta's 5-year cloud infrastructure deal with Nebius
- **30%** - Faster startup times in .NET 10 LTS for ASP.NET Core
- **40%** - Memory reduction in .NET 10 containerized deployments
- **10x** - Performance improvement in rewritten TypeScript compiler
- **66%** - Year-over-year growth in TypeScript developers on GitHub
- **1 million+** - New TypeScript developers in 2025
- **2 million** - Projects affected by React Native vulnerability (weekly downloads)
- **65%** - Developers expecting AI to redefine their roles by 2026
- **74%** - Developers who enhanced skills through AI
- **November 2028** - .NET 10 LTS support ends (3 years)
- **7 days** - Default expiration for new npm granular tokens

---

*Got news we should cover? Let us know. We're tracking what matters to developers.*

