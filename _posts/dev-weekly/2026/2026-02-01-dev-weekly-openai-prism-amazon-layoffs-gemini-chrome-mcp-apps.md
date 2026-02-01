---
layout: post
seo: true
title: "Dev Weekly: OpenAI Prism, Amazon Layoffs, Gemini Auto-Browse, MCP Apps Go Live"
subtitle: "OpenAI launches Prism for scientific research. Amazon cuts thousands of jobs. Google adds auto-browse to Chrome with Gemini. MCP Apps becomes official. OpenAI retires older models. Weekly developer news Jan 26 - Feb 1, 2026."
date: 2026-02-01
categories: tech-news
permalink: /dev-weekly/2026/jan-26-feb-1/openai-prism-amazon-layoffs-gemini-chrome-mcp-apps/
share-img: /assets/img/posts/dev_weekly/tech-news-26jan-1feb-2026.svg
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-26jan-1feb-2026.svg
description: "OpenAI launches Prism, a free GPT-5.2 powered workspace for scientists. Amazon cuts thousands of corporate jobs. Google adds auto-browse to Chrome with Gemini 3. MCP Apps becomes official extension. OpenAI retires GPT-4o. Developer news Jan 26 - Feb 1, 2026."
keywords: "OpenAI Prism GPT-5.2 scientific writing, Amazon layoffs January 2026, Google Gemini auto-browse Chrome, MCP Apps Model Context Protocol, GPT-4o retirement ChatGPT, OpenAI data agent, dev weekly January 2026, software developer news"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is OpenAI Prism?"
    answer: "OpenAI Prism is a free AI-powered workspace for scientists launched on January 27, 2026. Built on GPT-5.2, it helps researchers write papers, manage citations, collaborate in real-time with unlimited co-authors, and includes features like literature search integration, equation support, and voice-based editing."
  - question: "What are MCP Apps?"
    answer: "MCP Apps is an official extension for Model Context Protocol announced on January 26, 2026. It allows AI tools to return interactive UI components like dashboards, forms, visualizations, and multi-step workflows directly in conversations. It's supported by ChatGPT, Claude, Goose, and Visual Studio Code."
  - question: "What is Gemini auto-browse in Chrome?"
    answer: "Gemini auto-browse is a new feature Google added to Chrome on January 28, 2026. It allows Gemini to perform multi-step browsing tasks automatically, such as researching hotel and flight prices, filling out forms, scheduling appointments, and managing subscriptions. It's available to Google AI Pro and Ultra subscribers in the US."
  - question: "Which OpenAI models are being retired?"
    answer: "OpenAI announced on January 29, 2026 that it is retiring GPT-4o, GPT-4.1, GPT-4.1 mini, and o4-mini from ChatGPT on February 13, 2026. The company claims only 0.1% of users still use GPT-4o daily."
---


Big week for AI tooling. OpenAI dropped Prism, a free research workspace for scientists. Amazon announced more corporate layoffs. Google added auto-browse to Chrome with Gemini. MCP Apps went official, bringing interactive UIs to AI conversations. And OpenAI is retiring older models including GPT-4o. Here's what happened.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### OpenAI Launches Prism for Scientific Research - [<i class="fas fa-external-link-alt"></i>](https://timesofindia.indiatimes.com/technology/tech-news/openai-launches-prism-a-free-ai-tool-for-writing-and-collaboration-in-science/articleshow/127673567.cms)

On January 27, OpenAI released Prism, a free cloud-based workspace built for scientists to write and collaborate on research.

**What is Prism?**

Prism is an AI-native LaTeX workspace powered by GPT-5.2. It's designed to fix the fragmented tooling problem researchers face. Instead of switching between writing tools, citation managers, and collaboration platforms, everything lives in one place.

**Key features:**

- **Paper drafting** - Write full papers with equations and citations
- **Unlimited collaboration** - Real-time editing with as many co-authors as you need
- **Literature integration** - Search and cite papers without leaving the editor
- **Voice editing** - Dictate changes and edits
- **Smart validation** - Automatic structure checking and error detection

**Pricing:**

Free for anyone with a ChatGPT account. OpenAI says organization plans for ChatGPT Business, Enterprise, and Education are coming soon.

**Why this matters:**

Scientific writing is slow. Between drafting, formatting, managing citations, and coordinating with co-authors, the actual research often takes less time than the paper. Prism is OpenAI's bet that AI can fix this. If it works, it could change how academic research is published.

### Amazon Announces Thousands More Job Cuts - [<i class="fas fa-external-link-alt"></i>](https://www.indiatoday.in/technology/features/story/amazon-lays-off-16000-employees-hundreds-in-india-impacted-story-in-5-points-2859938-2026-01-30)

Amazon is cutting thousands of corporate jobs in another round of layoffs.

**The numbers:**

This follows previous rounds that already cut 14,000 positions. The company is focusing on corporate roles, with teams across communications and other divisions affected.

**Why it's happening:**

Amazon, like other tech giants, is restructuring for an AI-driven economy. The focus is on efficiency and automation, which means fewer roles in certain areas even as the company invests heavily in AI infrastructure.

**What this means for developers:**

Tech layoffs aren't slowing down. If you're in a corporate tech role, it's worth thinking about how AI might affect your position. The companies investing most in AI are also cutting the most jobs. That's not a coincidence.

### Google Adds Auto-Browse to Chrome with Gemini - [<i class="fas fa-external-link-alt"></i>](https://blog.google/products-and-platforms/products/chrome/gemini-3-auto-browse/)

On January 28, Google rolled out major Gemini updates to Chrome, including a new auto-browse feature.

**What is auto-browse?**

It lets Gemini perform multi-step browsing tasks automatically. Instead of you clicking through websites, Gemini can:

- Research hotel and flight prices
- Fill out online forms
- Schedule appointments
- Manage subscriptions
- Compare products across sites

**Availability:**

Currently available to Google AI Pro and Ultra subscribers in the US. Works on macOS, Windows, and Chromebook Plus.

**Other Gemini Chrome updates:**

- **Side panel** - Multitask without leaving your current tab
- **Nano Banana** - Transform images directly in the browser
- **Connected Apps** - Deeper integration with Gmail, Calendar, YouTube, Maps, and Google Flights

**Why this matters:**

This is agentic AI coming to the browser. Google is positioning Chrome as a platform where AI can take actions, not just answer questions. If you're building web apps, think about how they'll work when users have AI agents navigating them.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms

### MCP Apps Go Live as Official Extension - [<i class="fas fa-external-link-alt"></i>](http://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)

On January 26, the Model Context Protocol announced that MCP Apps is now an official extension ready for production.

**What are MCP Apps?**

MCP Apps let tools return interactive UI components instead of plain text. Before this, AI tool responses were limited to text and maybe some structured data. Now tools can render:

- Dashboards with charts and visualizations
- Forms and configuration wizards
- Multi-step workflows
- Real-time monitoring interfaces
- Interactive data explorers

**How it works:**

Tools return a payload with `ui` metadata pointing to a resource. Clients render that resource in a sandboxed iframe. This keeps the interaction secure while enabling rich experiences.

**Current support:**

- ChatGPT
- Claude
- Goose
- Visual Studio Code

More clients coming soon.

**Why developers should care:**

If you're building MCP tools, you can now create much better user experiences. Instead of dumping JSON or markdown tables, you can build actual interfaces. This is a significant upgrade for tool usability.

### GitHub Agents Tab in Repositories - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-01-26-introducing-the-agents-tab-in-your-repository)

On January 26, GitHub shipped a redesigned Agents tab directly in repositories.

**What changed:**

Copilot coding agent sessions now live alongside your code, pull requests, and issues. You can:

- View session logs with grouped tool calls
- See inline previews and diffs
- Resume sessions directly in the Copilot CLI
- Track agent activity per repository

**Why it matters:**

GitHub is treating AI agents as first-class citizens in the development workflow. As more developers use Copilot for coding tasks, having visibility into what the agent did becomes important. This is infrastructure for a future where agents do more of the work.

### OpenAI Retires Older Models - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/retiring-gpt-4o-and-older-models/)

On January 29, OpenAI announced it's retiring GPT-4o, GPT-4.1, GPT-4.1 mini, and o4-mini from ChatGPT.

**The details:**

- Retirement date: February 13, 2026
- Only 0.1% of users still use GPT-4o daily
- Users will be moved to newer models automatically

**Community reaction:**

Not everyone is happy. Some Reddit users question the 0.1% figure and threaten to cancel subscriptions. Others are fine with it since newer models are generally better.

**What developers should do:**

If you're building on OpenAI APIs, check your model selections. The retirement applies to ChatGPT, but API availability may change too. Stay on current models to avoid disruption.

---

## <i class="fas fa-building"></i> Industry News

### OpenAI Shares Data Agent Architecture - [<i class="fas fa-external-link-alt"></i>](https://openai.com/index/inside-our-in-house-data-agent/)

On January 29, OpenAI published details about their internal data agent system.

**What they shared:**

- How they built their in-house data agent
- Architecture decisions for handling complex data tasks
- Integration with their internal systems

**Why it matters:**

OpenAI building internal AI agents signals what's coming for everyone. If they're using agents for data work internally, the tools they build for external use will reflect that experience.


### OpenAI Scaling PostgreSQL to 800 Million Users - [<i class="fas fa-external-link-alt"></i>](/how-openai-scales-postgresql/)

OpenAI shared engineering details on how they scale PostgreSQL to support 800 million ChatGPT users.

**Key takeaways:**

This is a deep dive into database architecture at massive scale. Useful reading for anyone dealing with high-traffic systems.

---

## <i class="fas fa-exclamation-triangle"></i> What This Week Teaches Us

**AI is coming for research workflows:** Prism is OpenAI's play for academia. If it works, expect similar tools for legal writing, medical documentation, and other specialized fields.

**Agentic browsing is real:** Google's auto-browse feature is what everyone's been talking about with AI agents. The browser is becoming a platform for AI to take actions, not just a tool for humans.

**Interactive AI tools are the future:** MCP Apps going official means AI conversations can include real interfaces. Plain text responses will feel dated.

**Layoffs continue despite AI investment:** Amazon is cutting jobs while investing billions in AI. This pattern will continue across the industry.

**Model deprecation is normal:** OpenAI retiring GPT-4o shows how fast AI moves. Models that were cutting-edge a year ago are now being phased out.

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **GPT-5.2** - The model powering OpenAI Prism
- **800 million** - ChatGPT users OpenAI is scaling PostgreSQL to support
- **0.1%** - Users still using GPT-4o daily, according to OpenAI
- **14,000+** - Previous Amazon layoffs, with thousands more this week
- **February 13** - Date OpenAI will retire GPT-4o from ChatGPT
- **4** - AI clients now supporting MCP Apps (ChatGPT, Claude, Goose, VS Code)

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

**OpenAI Prism** - Free AI workspace for scientists, powered by GPT-5.2. Real-time collaboration, citations, equations, voice editing.

**Amazon layoffs** - Thousands more corporate jobs cut as company restructures for AI.

**Gemini auto-browse** - Google's Chrome feature lets AI perform multi-step browsing tasks automatically.

**MCP Apps official** - Interactive UI components now work in ChatGPT, Claude, Goose, and VS Code.

**GitHub Agents tab** - Copilot coding agent sessions now visible directly in repositories.

**GPT-4o retiring** - OpenAI phasing out older models on February 13.

**OpenAI data agent** - Engineering details on their internal agent architecture.

**800M user scale** - OpenAI shares how they scale PostgreSQL for ChatGPT.

---

*Busy week. The OpenAI Prism launch is the most interesting story - it shows how AI is moving into specialized professional tools. Google's auto-browse is significant too. The browser becoming an AI-controlled platform changes a lot about how we think about web development. And MCP Apps going official means richer tool experiences are coming fast.*

*See you next week.*
