---
layout: post
seo: true
title: "Dev Weekly: GitHub Goes Dark, Python Breaks Free, and Azure Hits 1M Pods"
subtitle: "Weekly Software Development News: July 21-27, 2025"
date: 2025-07-29
categories: tech-news
permalink: /dev-weekly-github-goes-dark-python-breaks-free-azure-hits-1m-pods/
share-img: /assets/img/posts/dev_weekly/dev-weekly-cover.png
thumbnail-img: /assets/img/posts/dev_weekly/dev-weekly-cover.png
description: "Weekly roundup: GitHub outage, Python 3.14 RC1, Azure pod scaling, security news, and more for software developers."
keywords: "GitHub outage, Python 3.14, Azure, Kubernetes, DevOps, AI, software development news, dev weekly"
tags: ["dev-weekly", "tech-news", "software-development-news"]
---

It was an action-packed week for software development! GitHub’s longest outage in recent memory brought global dev work to a halt. Meanwhile, Python 3.14 RC1 smashed through the GIL bottleneck, Azure pushed pod scaling to a million, and critical security incidents kept cybersecurity teams on edge. Dive in for the week’s biggest stories, tool launches, cloud news, and what they mean for devs and tech leaders alike.

---

## 🚨 Quick Headlines

- **[GitHub Global Outage](https://www.githubstatus.com/incidents/61btx2g21zc6):** 8-hour service disruption affects millions worldwide
- **[Python 3.14 RC1 Released](https://discuss.python.org/t/python-3-14-0rc1-is-now-available/46478):** GIL-free threading and experimental JIT compiler
- **[Azure CNI Breakthrough](https://techcommunity.microsoft.com/blog/azurenetworkingblog/provide-a-flat-network-scaling-solution-to-aks---azure-cni-pod-subnet---static-b/4435572):** Static block allocation scales AKS clusters up to 1 million pods
- **[TypeScript 5.9 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9-rc/):** Debuts deferred imports and modern config
- **[Critical FortiWeb Vulnerability](https://www.fortiguard.com/psirt/FG-IR-25-089):** CVE-2025-25257 enables unauthenticated RCE
- **[GitLab 18 AI](https://about.gitlab.com/releases/2025/05/15/gitlab-18-0-released/):** Duo AI tools now free for Premium & Ultimate users

---

## 🛠️ Developer Tools & Platforms
### GitHub Outage: When the Heartbeat Stopped [🌐](https://www.githubstatus.com/incidents/61btx2g21zc6)

On July 28–29, GitHub experienced an unprecedented 8-hour outage. Core developer workflows—Git push/pull, pull requests, API integrations—were down worldwide. Root cause: networking issues that triggered bottlenecks and required emergency capacity scaling. With millions blocked from CI/CD and repo access, the week highlighted our critical reliance on centralized dev tooling.

**Impact:**  
- CI/CD and deployments delayed  
- Pull requests and code reviews paused  
- DevOps and automation scripts failed  
- Tech teams faced delivery setbacks  

### GitLab 18: Full-Stack AI Becomes Default [🌐](https://about.gitlab.com/releases/2025/05/15/gitlab-18-0-released/)

GitLab rolled out v18 with AI-powered features like Duo Code Suggestions and Chat now included for Premium/Ultimate plans—no extra fee. The upgrade aims to reduce “non-coding” friction, helping devs focus on value while Duo Reviews boost code accuracy and security.

**Highlights:**  
- Context-aware code suggestions  
- Automated vulnerability detection  
- One-click regulatory compliance templates  
- Multi-factor FIDO support built-in  

---

## ☁️ Cloud & Infrastructure


{% include ads/in-article.html %}


### Azure: Pod Scaling Breaks the Ceiling [🌐](https://techcommunity.microsoft.com/blog/azurenetworkingblog/provide-a-flat-network-scaling-solution-to-aks---azure-cni-pod-subnet---static-b/4435572)

Azure CNI Pod Subnet Static Block Allocation became generally available, shooting cluster limits from 65,000 to a staggering 1 million pods! Nodes now receive pre-assigned CIDR blocks for flat, VM-like network scalability with enhanced security and cost-efficiency for enterprises running monster-sized Kubernetes workloads.

**TL;DR:**  
- Pre-allocated CIDR blocks boost large cluster scale  
- VNet-routed IPs, pod/node subnet separation  
- Works with Azure CNI Powered by Cilium  
- Massive improvement for AKS power users  

### Amazon Corretto & Linux Updates [🌐](https://aws.amazon.com/corretto/)

AWS shipped Corretto quarterly security updates for all major Long Term Support JDKs. [Regular Amazon Linux 2 package improvements](https://aws.amazon.com/amazon-linux-2/faqs/) and [Kubernetes (EKS) lifecycle tooling](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html) enhanced platform security across the board.

---

## 🛡️ Security & Vulnerabilities

### FortiWeb Zero-Day: CVE-2025-25257 Widely Exploited [🌐](https://socprime.com/blog/cve-2025-25257-sql-injection-vulnerability/)

A critical unauthenticated SQL injection in FortiWeb was found being actively exploited (CVSS: 9.6). Attackers can execute arbitrary code via crafted HTTP requests against `/api/fabric/device/status`. Over 5,000 exposed FortiWeb interfaces are at risk, with [rapid weaponization](https://socprime.com/blog/cve-2025-25257-sql-injection-vulnerability/) observed in the wild.

**Versions Affected:**  
- FortiWeb 7.6.0–7.6.3  
- FortiWeb 7.4.0–7.4.7  
- FortiWeb 7.2.0–7.2.10  
- FortiWeb 7.0.0–7.0.10

**Observed Threats:**  
- SSL key exfiltration  
- Remote access tool (RAT) deployment  

### Citrix NetScaler (CitrixBleed 2): CVE-2025-5777 [🌐](https://support.citrix.com/support-home/kbsearch/article?articleNumber=CTX693420)

Citrix NetScaler's Gateway/AAA virtual servers hit session hijacking issues due to an out-of-bounds read—exploited in the wild before public disclosure. Multi-factor bypass and session theft are possible if unpatched.

---

## 🤖 AI & Machine Learning

### Huawei CloudMatrix 384: A Homegrown AI Supercomputer [🌐](https://www.thehindu.com/sci-tech/technology/huawei-shows-off-ai-computing-system-to-rival-nvidias-top-product/article69863931.ece)

Unveiled at World AI Conference, Huawei’s CloudMatrix 384 links 384 Ascend 910C chips in a single “supernode”—reportedly outpacing top global AI systems. Now active in Huawei cloud, it showcases China's progress in sovereign AI infrastructure.

**Fun Fact:**  
Leverages high-speed interconnect and is targeted at next-gen domestic AI workloads.

---

## 💻 Languages & Frameworks


{% include ads/display.html %}


### Python 3.14 RC1: GIL-Free at Last! [🌐](https://www.python.org/downloads/release/python-3140rc1/)

The Python team dropped 3.14.0rc1, kicking off a new era: GIL (Global Interpreter Lock) can be removed for real multi-core threading, and there’s an experimental JIT compiler for crazy speed-ups on macOS/Windows.

**Key Features:**  
- Free-threaded mode: parallel Python on multi-cores  
- Experimental JIT on major platforms  
- f-string inspired template literals (`t-strings`)  
- Enhanced multi-interpreter support  

Release is scheduled for October 7, 2025. Early benchmarks: JIT = faster, free-threaded mode = 5–10% slower for single-threaded workloads (but worth it for concurrency).

### TypeScript 5.9 RC: Deferred Imports Arrive [🌐](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9-rc/)

TypeScript 5.9 RC launched with `import defer` (delayed module evaluation), making web apps much snappier. Also:  
- Streamlined `tsc --init` config  
- Full support for Node.js 20  
- Richer tooltips in editors  

---

## 🚀 Performance & Scaling

### **DevOps Platforms Race Ahead**

Major players now boast E2E AI integration, replacing fragmented toolchains. Forrester's DevOps Wave declared that the future is “security-first by automation,” with AI-powered code analysis and incident prevention going mainstream.

**Trends:**  
- End-to-end DevOps suites > best-of-breed toolchains  
- Automated vulnerability reviews  
- Surge in DevSecOps adoption


## 🌍 Community Spotlight

### Noteworthy Releases

- [TIOBE Index: Ada](https://www.tiobe.com/tiobe-index/) — Surprisingly jumps in ranking  
- [Next.js 15.4](https://nextjs.org/blog/next-15-4) — TurboPack readies for v16  
- [Kubernetes 1.34](https://github.com/kubernetes/kubernetes/releases/) — Release process continues with new security layers

---

## 👉 Stay Updated

Like this report?  
**Share** with your team.  
*For more, follow us on X, LinkedIn*

---
