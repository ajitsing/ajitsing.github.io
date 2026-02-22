---
layout: post
seo: true
title: "Dev Weekly Feb 16-22, 2026: India AI Summit $250B, TypeScript 7 Compiler, npm Security Attack"
subtitle: "India secures $250 billion in AI investments at New Delhi summit. TypeScript 7 ships native compiler for faster builds. Big Tech cuts buybacks to fund AI infrastructure. New npm worm steals dev secrets. Ireland investigates X's Grok. Developer news Feb 16-22, 2026."
date: 2026-02-22
categories: tech-news
permalink: /dev-weekly/2026/feb-16-22/india-ai-summit-typescript-7-npm-worm-grok-investigation/
share-img: /assets/img/posts/dev_weekly/tech-news-16-22feb-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-16-22feb-2026.svg
description: "Developer news Feb 16-22, 2026: India secures $250B AI investments at New Delhi summit. TypeScript 7 native compiler ships with faster builds. Big Tech cuts buybacks for $500B+ AI infrastructure spending. Critical npm worm attack steals dev secrets. Ireland investigates X Grok AI safety. Latest software development news."
keywords: "India AI Impact Summit 2026, $250 billion AI investment India, TypeScript 7 native compiler, npm worm supply chain attack, Big Tech AI spending, Anthropic Bengaluru office, Infosys Anthropic partnership, Tata OpenAI data center, Java AI production MCP SDK, Android 17 Beta Canary, Ireland Grok investigation, dev weekly February 2026, software developer news"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What happened at the India AI Impact Summit 2026?"
    answer: "The India AI Impact Summit took place in New Delhi from February 16-19, 2026. India secured over $250 billion in AI infrastructure investments, with Reliance committing $109.8 billion and Adani Group pledging $100 billion. Three sovereign AI models were unveiled, and major partnerships were announced including Anthropic opening a Bengaluru office and partnering with Infosys."
  - question: "What is TypeScript 7's native compiler?"
    answer: "TypeScript 7 released a new native compiler port on February 18, 2026, that significantly reduces build times for large-scale projects. This is a major performance improvement for developers working with complex TypeScript codebases, especially in monorepos and enterprise applications."
  - question: "What is the npm worm attack?"
    answer: "A new supply chain attack discovered on February 19, 2026, involves a Shai-Hulud-like npm worm affecting 19+ packages with 2 aliases. The worm steals developer and CI secrets, injects malicious GitHub workflows, poisons AI toolchains, and harvests LLM API keys. Developers should audit their dependencies and rotate credentials immediately."
  - question: "Why is Ireland investigating X's Grok?"
    answer: "Ireland's Data Protection Commission opened a formal investigation on February 20, 2026, into X's AI chatbot Grok over concerns about personal data processing and its potential to produce harmful sexualized images and video, including of children. This is the first major regulatory action against an AI chatbot for content safety."
  - question: "What is the Infosys Anthropic partnership?"
    answer: "On February 17, 2026, Anthropic announced a strategic partnership with Infosys to deploy Claude AI models across Indian enterprises, starting with the telecommunications sector. This comes alongside Anthropic opening its first office in Bengaluru, making India Anthropic's second largest market after the US."
---

Big week. India hosted its first AI Impact Summit and walked away with $250 billion in investment commitments. TypeScript 7 shipped a native compiler that makes builds way faster. Big Tech companies cut stock buybacks to their lowest since 2019, redirecting billions into AI infrastructure. A nasty npm worm started stealing dev secrets and poisoning AI toolchains. Ireland opened an investigation into X's Grok chatbot. Java is having a moment for AI production work. Android 17 got continuous Canary updates. Here's what happened.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### India Secures $250 Billion in AI Investments at New Delhi Summit - [<i class="fas fa-external-link-alt"></i>](https://techcrunch.com/2026/02/16/all-the-important-news-from-the-ongoing-india-ai-summit)

The India AI Impact Summit kicked off in New Delhi on February 16, and the numbers were staggering. Over 250,000 people showed up to hear from OpenAI's Sam Altman, Google's Sundar Pichai, Anthropic's Dario Amodei, and other tech leaders.

**The big numbers:**

India secured over $250 billion in AI infrastructure investments. Reliance Industries and Jio committed $109.8 billion over seven years for AI and data infrastructure. Adani Group pledged $100 billion for renewable energy powered AI data centers by 2035. Microsoft announced it's on track to invest $50 billion globally in the "Global South" by 2030, with a big chunk going to India.

**What got unveiled:**

Three sovereign AI models were launched at the summit. These are India's homegrown AI systems, built to reduce dependence on foreign models. The government wants India to be a major AI hub, but focused on applications and deployment rather than competing with OpenAI or Google on frontier models.

**Why this matters:**

India already has 72 million daily ChatGPT users, making it OpenAI's largest market by volume. The country is positioning itself as the place where AI gets deployed at scale, not where it gets invented. For developers, this means more infrastructure, more jobs, and easier access to compute resources.

**The partnerships:**

Anthropic opened its first office in Bengaluru on February 17. They're partnering with Infosys to deploy Claude models across Indian enterprises, starting with telecom. Tata Consultancy Services signed OpenAI as a major customer for its new data center business. AMD teamed up with TCS to build rack scale AI infrastructure.

**The bigger picture:**

India's government is offering tax breaks for export oriented cloud services and launching a ₹100 billion venture fund for AI startups. They want to attract over $200 billion in AI infrastructure investment by 2028. This isn't just talk. The money is real, and the commitments are massive.

### Big Tech Cuts Buybacks to Fund AI Infrastructure - [<i class="fas fa-external-link-alt"></i>](https://www.bloomberg.com/news/articles/2026-02-18/big-tech-trims-buybacks-for-ai-splurge)

Alphabet, Microsoft, Amazon, and Meta hit their lowest combined share repurchases since 2019. They're redirecting billions that would have gone to buybacks straight into AI infrastructure instead.

**The numbers:**

Amazon is planning $200 billion in capital expenditures for 2026. Google is spending $185 billion. Microsoft is around $120 billion. These are record highs. The hyperscaler capex war is real, and it's expensive.

**Why this matters:**

When companies stop buying back their own stock, it's because they see better uses for that cash. Right now, that's AI infrastructure. Data centers, chips, energy - it all costs money. These companies are betting everything on AI, and they're putting their money where their mouth is.

**What investors think:**

Some investors are nervous. Spending this much on infrastructure is risky. Will it pay off? Nobody knows. But these companies don't have a choice. If they don't invest, they fall behind. The AI race is winner take all, and nobody wants to lose.

### OpenAI Revenue Could Hit $280 Billion by 2030

Internal projections at OpenAI suggest the company's revenue could top $280 billion by 2030. That's a massive number, and it shows how big the AI market could get.

**Why this matters:**

If OpenAI is right, the AI market is way bigger than most people think. This isn't just about chatbots - it's about AI becoming the foundation of how software works. Every company will need AI, and OpenAI wants to be the one providing it.

**The context:**

OpenAI is already one of the most valuable private companies in the world. If they hit $280 billion in revenue by 2030, they'll be in the same league as the biggest tech companies. The question is whether they can execute on that vision.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms

### TypeScript 7 Native Compiler Released

On February 18, Microsoft shipped TypeScript 7 with a new native compiler that significantly reduces build times for large-scale projects.

**What changed:**

The native compiler is a complete rewrite of TypeScript's compilation engine. Instead of running in JavaScript, it runs as native code. This means it's faster, especially for large projects with thousands of files.

**Why developers care:**

If you're working on a monorepo or large codebase, build times matter. Waiting minutes for TypeScript to compile gets old fast. The native compiler cuts that time down substantially. For some projects, builds that took 5 minutes now take under 2 minutes.

**The catch:**

It's still early. Some edge cases might have issues. But for most projects, it's a solid upgrade. If you're on TypeScript 6, this is worth upgrading for the performance alone.

**What to watch:**

The TypeScript team is already working on more performance improvements. This native compiler is just the start. Expect more speed improvements in future releases.

### Java Surges for Production AI Work

New reports this week show a surge in Java adoption for production AI systems. The Model Context Protocol (MCP) Java SDK and Spring AI are making it easier for Java teams to build AI features.

**What's happening:**

Java developers are using AI in production more than ever. The MCP Java SDK lets Java apps talk to AI models easily. Spring AI provides a framework for building AI features in Spring applications. Together, they make Java a real option for AI work.

**Why this matters:**

Most enterprise software is built in Java. If Java gets good AI tooling, that means more companies can add AI features without rewriting everything. That's a big deal.

**The tools:**

The MCP Java SDK handles communication with AI models. Spring AI provides abstractions for common AI patterns. You can build chatbots, content generators, and other AI features using familiar Spring patterns.

**What to watch:**

Oracle and other Java vendors are investing heavily in AI tooling. Expect more Java AI frameworks and libraries in the coming months. Java might not be the coolest language, but it's getting serious about AI.

### Android 17 Beta Gets Continuous Canary Updates - [<i class="fas fa-external-link-alt"></i>](https://developer.android.com/about/versions/17)

On February 19, Google introduced a continuous Canary update stream for Android 17. Instead of waiting for major beta releases, developers can now test features as they're being developed.

**What this means:**

Canary builds update automatically. You get new features and fixes as soon as they're ready, not on a fixed schedule. This gives developers more time to test and provide feedback before stable releases.

**Why it helps:**

Finding bugs early is better than finding them late. With continuous Canary updates, developers can catch issues months before they hit production. That means better apps and fewer surprises.

**How to use it:**

You can opt into Canary updates through Android Studio or by flashing Canary builds directly. The updates come automatically, so you're always on the latest development version.

**The trade-off:**

Canary builds are unstable. Things break. Features change. Don't use them for production apps. But for testing and development, they're invaluable.

---

## <i class="fas fa-building"></i> Industry News

### Anthropic Opens Bengaluru Office, Partners with Infosys - [<i class="fas fa-external-link-alt"></i>](https://www.anthropic.com/news/bengaluru-office-partnerships-across-india?id=14375)

On February 17, Anthropic opened its first office in India, based in Bengaluru. They also announced a strategic partnership with Infosys to deploy Claude models across Indian enterprises.

**The office:**

Bengaluru is India's tech hub. Anthropic is setting up shop there to be closer to Indian developers and enterprises. India is now Anthropic's second largest market after the US, so this makes sense.

**The partnership:**

Infosys is one of India's biggest IT services companies. They're going to help deploy Claude across Indian enterprises, starting with the telecommunications sector. They're setting up a Center of Excellence to help companies integrate Claude into their workflows.

**Why this matters:**

Anthropic is going after the enterprise market hard. India has a huge enterprise software market, and Infosys knows how to sell to enterprises. This partnership gives Anthropic a way into that market.

**What to watch:**

If this partnership works, expect Anthropic to do similar deals in other countries. They're building a global enterprise sales network, and India is just the start.

### Tata Signs OpenAI as Data Center Customer - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/business/media-telecom/tatas-data-centre-business-signs-up-openai-customer-2026-02-19/)

Tata Consultancy Services signed OpenAI as a major customer for its new data center business. This is a big win for TCS and shows how serious India is about becoming an AI infrastructure hub.

**What happened:**

TCS launched a new data center business unit. OpenAI is their first major customer. The deal involves TCS providing data center infrastructure for OpenAI's operations in India.

**Why this matters:**

OpenAI needs data centers everywhere. India is a huge market, and they need local infrastructure. TCS can provide that. This deal shows that Indian companies can compete for major AI infrastructure contracts.

**The bigger picture:**

India wants to be a major data center hub. Companies like TCS, Reliance, and Adani are all building data center capacity. If they can attract customers like OpenAI, that validates India's strategy.

### Telegram Dismisses Russian Security Claims

On February 20, Telegram dismissed Russian claims that foreign spies could read soldiers' messages. The Russian government had claimed that Telegram's encryption was broken and that foreign intelligence agencies could intercept messages.

**What Telegram said:**

Telegram's founder Pavel Durov said the claims were false. Telegram uses end to end encryption for secret chats, and that encryption hasn't been broken. The Russian government's claims were baseless.

**Why this matters:**

Telegram is used by millions of people, including many in conflict zones. If the encryption was broken, that would be a major security issue. But Telegram says it's not, and security researchers agree.

**The context:**

This isn't the first time governments have made false claims about encryption. It's a common tactic to undermine trust in secure messaging apps. Telegram is pushing back hard.

**What to watch:**

Expect more governments to make similar claims. As encrypted messaging becomes more common, governments will try to undermine it. Telegram and other apps need to keep pushing back.

### Abu Dhabi Finance Summit Data Leak

On February 21, a data leak at the Abu Dhabi finance summit exposed information about global figures. The leak included personal details of attendees, including business leaders and government officials.

**What happened:**

The summit's registration system was breached. Personal information, including names, email addresses, and in some cases passport numbers, was exposed. The leak affected hundreds of attendees.

**Why this matters:**

High-profile events are targets for hackers. When you gather powerful people in one place, that's valuable data. This leak shows that even well-funded events can have security issues.

**The response:**

The summit organizers said they're investigating and have notified affected attendees. They're also working with cybersecurity experts to prevent future breaches.

**The lesson:**

If you're organizing events, security matters. Even registration systems need proper security. One breach can expose sensitive information about hundreds of people.

---

## <i class="fas fa-shield-alt"></i> Security & Open Source

### New npm Worm Steals Dev Secrets and Poisons AI Toolchains - [<i class="fas fa-external-link-alt"></i>](https://www.ox.security/blog/npm-worm-hijacks-ci-workflows-ai-packages/)

On February 19, security researchers discovered a new supply chain attack in the npm ecosystem. A Shai-Hulud-like worm is affecting 19+ packages with 2 aliases, stealing developer secrets and poisoning AI toolchains.

**What the worm does:**

It steals developer and CI secrets. It injects malicious code into GitHub workflows. It poisons AI toolchains by modifying AI related packages. It harvests LLM API keys from environment variables and config files.

**How it spreads:**

The worm infects packages and then spreads to any project that uses those packages. When you install an infected package, it runs malicious code that steals your secrets and infects other packages in your project.

**Why it's dangerous:**

This isn't just stealing API keys. It's also modifying AI toolchains, which means it could be injecting backdoors into AI applications. If you're using AI in production, this is a serious threat.

**What to do:**

Audit your dependencies immediately. Check for any of the 19+ infected packages. Rotate all your API keys and CI secrets. Review your GitHub workflows for any suspicious changes. Consider using tools like npm audit and Snyk to scan for vulnerabilities.

**The bigger picture:**

Supply chain attacks are getting more sophisticated. This worm is specifically targeting AI developers, which shows that attackers are paying attention to what developers are using. As AI becomes more common, expect more attacks targeting AI toolchains.

### Ireland Investigates X's Grok Over Harmful Content - [<i class="fas fa-external-link-alt"></i>](https://www.reuters.com/sustainability/boards-policy-regulation/ireland-opens-probe-into-musks-grok-ai-over-sexualised-images-2026-02-17/)

On February 20, Ireland's Data Protection Commission opened a formal investigation into X's AI chatbot Grok. The investigation is looking into personal data processing and the potential for Grok to produce harmful sexualized images and video, including of children.

**What the investigation covers:**

The DPC is concerned about how Grok processes personal data. They're also worried that Grok could generate harmful content, including sexualized images of children. This is a serious allegation, and the DPC is taking it seriously.

**Why this matters:**

This is the first major regulatory investigation into an AI chatbot for content safety. If the DPC finds that Grok is generating harmful content, that could lead to fines and restrictions. Other regulators are watching.

**X's response:**

X said they're cooperating with the investigation and that Grok has safety measures in place. They also said they're committed to preventing harmful content generation.

**What to watch:**

This investigation could set a precedent for how regulators handle AI chatbots. If the DPC finds violations, expect other regulators to follow suit. AI companies need to take content safety seriously, or they'll face regulatory action.

**The bigger picture:**

AI chatbots are under increasing scrutiny. Regulators are worried about privacy, safety, and harmful content. Companies building AI chatbots need to think about these issues from the start, not as an afterthought.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$250 billion** - Total AI infrastructure investments secured by India at the summit
- **$109.8 billion** - Reliance Industries' commitment over seven years
- **$100 billion** - Adani Group's pledge for renewable powered AI data centers
- **$200 billion** - Amazon's planned capital expenditures for 2026
- **$185 billion** - Google's planned capital expenditures for 2026
- **$120 billion** - Microsoft's planned capital expenditures for 2026
- **$280 billion** - OpenAI's projected revenue by 2030
- **19+ packages** - Number of npm packages affected by the Shai-Hulud worm
- **2 aliases** - Number of package aliases used by the npm worm
- **72 million** - Daily ChatGPT users in India, making it OpenAI's largest market
- **250,000+** - Attendees at the India AI Impact Summit
- **3** - Number of sovereign AI models unveiled at the summit
- **₹100 billion** - Size of India's new AI startup venture fund (about $1.1 billion)

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**India AI Summit** - New Delhi hosts first AI Impact Summit, secures $250B in investments. Reliance commits $109.8B, Adani pledges $100B.

**Three sovereign AI models** - India unveils homegrown AI systems to reduce foreign dependence.

**Anthropic Bengaluru office** - Opens first India office, partners with Infosys for enterprise deployments.

**Tata OpenAI deal** - TCS signs OpenAI as major data center customer.

**Big Tech buybacks** - Alphabet, Microsoft, Amazon, Meta hit lowest combined buybacks since 2019, redirecting cash to AI.

**Hyperscaler capex war** - Amazon $200B, Google $185B, Microsoft $120B in 2026 spending forecasts.

**OpenAI revenue forecast** - Internal projections suggest $280B revenue by 2030.

**TypeScript 7 native compiler** - Ships with major build time improvements for large projects.

**Java AI surge** - Production adoption growing with MCP Java SDK and Spring AI support.

**Android 17 Canary** - Google introduces continuous update stream for earlier feature testing.

**npm worm attack** - Shai-Hulud-like worm affects 19+ packages, steals dev secrets, poisons AI toolchains.

**Ireland Grok investigation** - Data Protection Commission opens formal probe into harmful content generation.

**Telegram security** - Dismisses Russian claims about broken encryption.

**Abu Dhabi data leak** - Finance summit registration system breached, exposes information about global figures.

---

*This week was all about India. The AI Impact Summit showed that India is serious about becoming a major AI hub, and the $250 billion in commitments proves it. But it wasn't just India. Big Tech is spending like crazy on AI infrastructure, cutting buybacks to fund the buildout. For developers, TypeScript 7's native compiler is a real win, and Java getting better AI tooling means more options. But the npm worm attack is a reminder that security matters more than ever, especially as AI toolchains become targets. Ireland's investigation into Grok shows regulators are paying attention too. The AI boom is real, but so are the risks. Next week should be interesting.*

*See you next week.*
