---
layout: post
seo: true
title: "Dev Weekly Sep 14-20, 2026: Claude Code Projects, Plugin4Shell, Gemini 3.8 Live"
subtitle: "Anthropic rebuilt Claude Code Projects around a coordinator and parallel threads, Air disclosed Plugin4Shell across four coding agents, Google shipped Gemini 3.8 Live, Copilot auto got cost tiers, and Temporal raised $550 million."
date: 2026-09-20
categories: tech-news
permalink: /dev-weekly/2026/sep-14-20/claude-code-projects-plugin4shell-gemini-38-live/
share-img: /assets/img/posts/dev_weekly/tech-news-14-20sep-2026.png
thumbnail-img: /assets/img/posts/dev_weekly/tech-news-14-20sep-2026.png
discover-img: /assets/img/posts/dev_weekly/tech-news-14-20sep-2026.png
description: "Dev Weekly for September 14 to 20, 2026: Anthropic rebuilds Claude Code Projects, Air discloses Plugin4Shell, Google ships Gemini 3.8 Live, and Temporal raises $550 million. On September 17 Anthropic put a coordinator and parallel cloud threads into Claude Code Projects for select Pro and Max users, and Air showed a zero-click plugin SHA pin bypass in Claude Code, Codex, Copilot, and Gemini CLI. On September 16 Anthropic merged Cowork into one Claude with Docs and Slides in beta. On September 15 Google launched gemini-3.8-live and gemini-3.8-live-extended-thinking, Factory raised $200 million at $5 billion, and GitHub turned off SHA-1 in HTTPS. On September 14 Copilot auto gained efficiency, balance, and intelligence tiers, Redis Open Source 8.10 shipped compact hashes and HIMPORT, Python 3.14t landed on RHEL, and Temporal closed a $550 million Series E at $12.55 billion. Also this week: CISA added Pixel CVE-2026-58704, Chrome 153.0.8010.52 patched two critical bugs, S&P agreed to buy OpenZeppelin, Raindrop hit $50 million, and Oracle filed a 378-person California WARN."
keywords: "dev weekly September 14 20 2026, software developer news September 14 to 20 2026, Claude Code Projects coordinator threads cloud sessions September 17 2026, Plugin4Shell Air Security Claude Code 2.1.179 Codex 0.146.0 Copilot Gemini CLI Antigravity, Gemini 3.8 Live gemini-3.8-live gemini-3.8-live-extended-thinking Live API September 15 2026, one Claude Cowork Docs Slides Design beta September 16 2026, GitHub Copilot auto model selection efficiency balance intelligence September 14 2026, Redis 8.10 compact hash HIMPORT JSONPath incremental backup, Python 3.14 free-threaded python3.14-freethreading python3.14t RHEL 9.8 10.2, Temporal Series E $550 million $12.55 billion Lightspeed, Factory $200 million $5 billion valuation, Raindrop Series A $50 million Simulations, S&P Global OpenZeppelin acquisition, GitHub SHA-1 HTTPS sunset September 15 2026, CISA KEV CVE-2026-58704 Pixel modem 2026-09-05, Chrome 153.0.8010.52 CVE-2026-93374 Dawn CVE-2026-93372 WebGL, GitHub Advanced Security enforce organization owners, Oracle California WARN 378 November 13 2026, cloud security vulnerability management enterprise AI supply chain security observability DevOps agentic coding software developer news weekly roundup"
comments: true
tags: ["dev-weekly", "tech-news", "software-development-news"]
faq:
  - question: "What is the biggest software developer news from September 14 to 20, 2026?"
    answer: "Anthropic rebuilt Claude Code Projects on September 17 so a coordinator can run parallel cloud threads against a shared goal. The same day, Air disclosed Plugin4Shell, a zero-click way to swap a pinned plugin for malicious code in Claude Code, Codex, Copilot, and Gemini CLI. Google also shipped Gemini 3.8 Live on September 15 for voice agents, Copilot auto gained cost and quality tiers on September 14, and Temporal raised $550 million at a $12.55 billion valuation."
  - question: "How do I try the new Claude Code Projects?"
    answer: "Updated projects are in beta for select Claude Pro and Max subscribers who already use Claude Code cloud sessions and do not have existing projects on web or desktop. Start a project, pick a goal and a repo, then let the coordinator open threads. Each thread is a cloud session on its own branch. If you are on Pro or Max and do not have it yet, join the waitlist. Anthropic says local threads are coming soon. Parallel threads burn usage faster, so check project-specific usage."
  - question: "How do I patch Plugin4Shell?"
    answer: "Update Claude Code to 2.1.179 or later. Update Codex to 0.146.0 or later. GitHub Copilot had no fix at disclosure. Air says the risk is plugins from hosts that allow hash-shaped branch names, such as Bitbucket or self-hosted git, not GitHub.com itself. Google will not patch Gemini CLI. Move those installs to Antigravity. Auto-update of marketplace plugins is what makes the bug zero-click, so treat an unpatched agent with plugins as exposed."
  - question: "How do I use Gemini 3.8 Live?"
    answer: "In the Gemini API and Google AI Studio, set the Live session model to gemini-3.8-live for low-latency voice, or gemini-3.8-live-extended-thinking for harder multi-step work. If you are on gemini-3.1-flash-live-preview, change the model string and drop thinking_level from session setup. Async function calling with behavior NON_BLOCKING is now the default. Audio is the supported response modality."
  - question: "What should I patch after this week's security news?"
    answer: "On a Pixel, install the September update and confirm security patch level 2026-09-05 or later for CVE-2026-58704. Update Chrome to 153.0.8010.52 or later (153.0.8010.52/.53 on Windows and Mac) for CVE-2026-93374 and CVE-2026-93372. Update Claude Code and Codex for Plugin4Shell. If anything still talks SHA-1 HTTPS to github.com, it broke on September 15. GitHub Enterprise Server is unchanged."
---

Anthropic spent the week collapsing product walls. Claude Code Projects now run as a coordinator plus parallel cloud threads. Cowork is no longer a separate mode. Google put two new Live models on the Gemini API the day before that.

The security story is the plugin pin your agent already trusted. Air showed that a marketplace SHA is not enough if git checks out a branch with the same name. Here is the week.

---

## <i class="fas fa-fire"></i> Top Stories This Week

### Claude Code Projects Become a Coordinator for Parallel Cloud Threads - [<i class="fas fa-external-link-alt"></i>](https://claude.com/blog/projects-redesigned){:target="_blank"}

On September 17, [Anthropic rebuilt Projects inside Claude Code](https://claude.com/blog/projects-redesigned){:target="_blank"}. You pick a goal and a repo. A coordinator scopes the work, opens threads, reviews the output, and keeps going after you close the laptop. Each thread is a Claude Code cloud session on its own branch and copy of the repo. Overlap lands as a normal merge conflict. Threads can still spawn subagents and workflows.

The beta is for select Pro and Max users who already use cloud sessions and do not have existing projects on web or desktop. Access expands to more people on those plans this week, then to Team, Enterprise, chat, and Cowork. Join the waitlist if you do not have it. Threads run in the cloud today. Local machines are listed as coming soon. Several threads at once each count as a full session, so usage limits arrive faster. Set the model and effort on the coordinator and on the workers, and watch project-specific usage.

This is the same shape Cursor shipped last week. The difference is who gets it and where it runs.

### Plugin4Shell Bypasses SHA Pins on Four Coding Agents - [<i class="fas fa-external-link-alt"></i>](https://www.air.security/blog-posts/plugin4shell){:target="_blank"}

On September 17, [Air published Plugin4Shell](https://www.air.security/blog-posts/plugin4shell){:target="_blank"}. The agent clones a marketplace plugin, checks out the pinned commit, and never confirms that `HEAD` is that commit. Git will treat a 40-hex branch name as a ref before it treats it as an object. If the attacker controls the plugin repo, they can make auto-update install different code while the pin still looks honored. [The Register](https://www.theregister.com/security/2026/09/17/ai-coding-agents-0-click-rce-flaw-could-hand-attackers-keys-to-the-kingdom/5297335){:target="_blank"} and [The Hacker News](https://thehackernews.com/2026/09/plugin4shell-lets-repository-owners.html){:target="_blank"} matched Air's vendor status.

Update Claude Code to `2.1.179` or later. Update Codex to `0.146.0` or later. Air says Copilot is still open because it can install plugins from hosts that allow hash-shaped branch names. GitHub told The Register that github.com rejects those names, which does not cover Bitbucket or self-hosted git. Google will not patch Gemini CLI. Move those installs to Antigravity. Auto-update is on by default in Claude Code and Codex, which is why Air calls it zero-click. If you cannot patch, stop marketplace auto-update and drop plugins from hosts that accept SHA-shaped refs.

{% include ads/in-article.html %}

### Google Ships Gemini 3.8 Live for Voice Agents - [<i class="fas fa-external-link-alt"></i>](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/){:target="_blank"}

On September 15, [Google launched Gemini 3.8 Live and 3.8 Live Extended Thinking](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/){:target="_blank"}. Both are on the Gemini API and Google AI Studio. The cheap, low-latency model is `gemini-3.8-live`. The harder one is `gemini-3.8-live-extended-thinking`. Input limit is 131,072 tokens. Output limit is 65,536. If you still pass `gemini-3.1-flash-live-preview`, change the model string and drop `thinking_level` from session setup. Async tools with `behavior: NON_BLOCKING` are now the default. Audio is the response modality.

Extended Thinking is the one for multi-step tool work while the voice keeps going. Set `thinking_level` to `low`, `medium`, or `high` on that model only. Enterprise access is private preview in Gemini Enterprise. Search Live, Gemini Live, and some Workspace surfaces got the consumer roll-out the same day.

### Anthropic Merges Cowork Into One Claude and Adds Docs and Slides - [<i class="fas fa-external-link-alt"></i>](https://claude.com/blog/cowork-is-now-claude){:target="_blank"}

On September 16, [Anthropic folded Cowork into ordinary Claude chats](https://claude.com/blog/cowork-is-now-claude){:target="_blank"}. Claude picks how much autonomy a request needs. Design now runs inside the same conversation. Docs and Slides launched in beta on paid plans. You can edit in place, present from Claude, or export Word, Google Docs, PowerPoint, or PDF. Enterprise admins choose when those betas turn on. The merge is rolling out to Pro and Max on web, desktop, and mobile over the next few weeks. There is nothing to flip. Team and Free follow later. Claude Code stays a separate product.

If you already live in Cowork, the chat you open next week is the same agent with a different door.

### Copilot Auto Lets You Pick Cost Versus Quality - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection/){:target="_blank"}

On September 14, [Copilot auto model selection gained three tiers](https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection/){:target="_blank"}: efficiency, balance, and intelligence. The model pool is the same. Auto still picks per prompt. A docstring can land on a small model even on intelligence. The feature is rolling out in VS Code, Copilot CLI, and the Copilot app. You pay for the model it actually used. Paid subscribers still get the 10% auto discount.

Set the tier to match the work, not the brand of the model.

{% include ads/display.html %}

### Redis 8.10 Cuts Hash Memory and Adds Incremental Backups - [<i class="fas fa-external-link-alt"></i>](https://redis.io/blog/announcing-redis-810-compact-hash-jsonpath-extensions-performance-improvements-and-more/){:target="_blank"}

On September 14, [Redis Open Source 8.10 went GA](https://redis.io/blog/announcing-redis-810-compact-hash-jsonpath-extensions-performance-improvements-and-more/){:target="_blank"}. Hashes that share a field set can use a template encoding, which Redis says can cut memory by up to 50%. Bulk load with `HIMPORT PREPARE` then `HIMPORT SET` so you send values without repeating field names. Operators get incremental cluster backups through the new `BACKUP` commands, with staggered snapshots instead of every shard forking at once.

There are also `SUNIONCARD` and `SDIFFCARD`, `LMOVEM` for moving several list items atomically, `MAXCOUNT`/`MAXSIZE` on `XREAD`, and more JSONPath functions. Download 8.10 and try `HIMPORT` on a profile or session keyspace before you change the rest of the app.

---

## <i class="fas fa-code"></i> Developer Tools & Platforms

### RHEL Ships Supported Free-Threaded Python 3.14 - [<i class="fas fa-external-link-alt"></i>](https://developers.redhat.com/articles/2026/09/14/python-314-free-threaded-build-now-available-rhel){:target="_blank"}

On September 14, [Red Hat put a free-threaded Python 3.14 build](https://developers.redhat.com/articles/2026/09/14/python-314-free-threaded-build-now-available-rhel){:target="_blank"} in CodeReady Linux Builder for RHEL 9.8 and 10.2. Enable the repo, then `sudo dnf install python3.14-freethreading` and run `python3.14t`. It sits next to the regular interpreter. Upstream 3.14 is the first release where this build is supported, not experimental. The GIL-on interpreter stays the default.

Run your suite on `python3.14t`. Check `sys._is_gil_enabled()` after you import C extensions. A package that is not ready can turn the GIL back on for the process. Overhead on single-thread work is still about 5% to 10%.

### GitHub Turns Off SHA-1 HTTPS, and Enterprises Can Lock GHAS - [<i class="fas fa-external-link-alt"></i>](https://github.blog/changelog/2026-09-15-sha-1-in-https-on-github-sunset/){:target="_blank"}

On September 15, [GitHub disabled SHA-1 in HTTPS](https://github.blog/changelog/2026-09-15-sha-1-in-https-on-github-sunset/){:target="_blank"} for github.com and partner CDNs, including GitHub Enterprise Cloud and Data Residency. GitHub Enterprise Server is not in this cut. Anything that still negotiates SHA-1 to github.com fails as of that day.

The same day, [enterprise admins could enforce Advanced Security configurations](https://github.blog/changelog/2026-09-15-enforce-github-advanced-security-configurations/){:target="_blank"} so org owners cannot weaken them. The Enforcement dropdown is Don't enforce, Enforce for repository owners, or Enforce for repository and organization owners. On September 16, [Enterprise Cloud also got bulk SSO authorization](https://github.blog/changelog/2026-09-16-automate-sso-authorization-for-classic-pats-and-ssh-keys/){:target="_blank"} for classic PATs and SSH keys through a GitHub App with `enterprise_credentials:write`, up to 50 orgs per request.

{% include ads/in-article.html %}

---

## <i class="fas fa-shield-alt"></i> Security

### CISA Adds an Exploited Pixel Modem Bug - [<i class="fas fa-external-link-alt"></i>](https://www.cisa.gov/news-events/alerts/2026/09/16/cisa-adds-one-known-exploited-vulnerability-catalog){:target="_blank"}

On September 15, [Google's Pixel bulletin](https://source.android.com/docs/security/bulletin/pixel/2026/2026-09-01){:target="_blank"} said there are indications that CVE-2026-58704 is under limited, targeted exploitation. It is a high-severity elevation of privilege in the cellular modem. No extra privileges and no user tap. On September 16, [CISA added it to KEV](https://www.cisa.gov/news-events/alerts/2026/09/16/cisa-adds-one-known-exploited-vulnerability-catalog){:target="_blank"} with a federal due date of September 19. Install the September Pixel update and confirm security patch level `2026-09-05` or later. That patch level also covers the rest of the September Android bulletin for supported Pixels.

### Chrome 153 Gets Two Critical Fixes - [<i class="fas fa-external-link-alt"></i>](https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_0194356994.html){:target="_blank"}

On September 17, [Chrome stable moved to 153.0.8010.52/.53](https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_0194356994.html){:target="_blank"} on Windows and Mac, and 153.0.8010.52 on Linux. Google listed 16 security fixes. Two are critical: CVE-2026-93374, a use after free in Dawn, and CVE-2026-93372, a buffer overflow in WebGL. Google did not say these were in the wild. Open Help, About Google Chrome, and relaunch. Last week's in-the-wild V8 bug still wants 153.0.8010.36 or later. Take the newer build.

---

## <i class="fas fa-coins"></i> Funding & Industry Deals

### Temporal Raises $550M at $12.55B - [<i class="fas fa-external-link-alt"></i>](https://temporal.io/blog/temporal-raises-usd550m-series-e-at-usd12-55b-valuation-ai){:target="_blank"}

On September 14, [Temporal announced a $550 million Series E](https://temporal.io/blog/temporal-raises-usd550m-series-e-at-usd12-55b-valuation-ai){:target="_blank"} at a $12.55 billion valuation. Lightspeed led. Wellington, Goldman Sachs Alternatives, and Tiger Global co-led. [Reuters](https://www.reuters.com/business/temporals-valuation-spikes-126-billion-lightspeed-led-funding-round-2026-09-14/){:target="_blank"} had the same figures. The February Series D was $300 million at $5 billion. Temporal said annualized revenue recently passed $250 million, net dollar retention has been above 200% since February, August had more than 1.9 trillion billable actions, and headcount is 570. Durable execution is the product. Long agent jobs are why the round exists.

### Factory Hits $5B, Raindrop Hits $50M - [<i class="fas fa-external-link-alt"></i>](https://factory.ai/news/5-billion-valuation){:target="_blank"}

On September 15, [Factory raised $200 million at a $5 billion valuation](https://factory.ai/news/5-billion-valuation){:target="_blank"}. Blackstone, Khosla, Sequoia, Insight, Evantic, Sound Ventures, NEA, Mantis, and Clearlake are on the post. Total funding is over $400 million. April's Series C was $150 million at $1.5 billion. Factory sells an enterprise software factory, not a chat pane, and says Nvidia, Adobe, and Palo Alto Networks are customers.

On September 17, [Raindrop said a CRV-led Series A](https://www.raindrop.ai/blog/series-a/){:target="_blank"} takes total funding to $50 million. The round size itself was not disclosed. The company watches live agent traffic for silent failures and launched Simulations in research preview, which replays production traffic against a proposed change.

### S&P Global Agrees to Buy OpenZeppelin - [<i class="fas fa-external-link-alt"></i>](https://www.openzeppelin.com/news/spglobal-enters-agreement-to-acquire-openzeppelin){:target="_blank"}

On September 17, [S&P Global agreed to acquire OpenZeppelin](https://www.openzeppelin.com/news/spglobal-enters-agreement-to-acquire-openzeppelin){:target="_blank"}. Terms were not disclosed. OpenZeppelin stays a separate unit under CEO Demian Brener. The company said OpenZeppelin Contracts have moved more than $37 trillion and that it has done more than 900 security engagements. If you depend on those libraries, the maintainer is now a ratings firm. The contracts stay open source in the announcement. Closing still has conditions.

### Layoffs: Oracle Files a 378-Person California WARN

*   **Oracle:** On September 14, [Oracle America filed a California WARN](https://layoffiq.com/layoffs/oracle-america-inc/ca-2026-09-ce1430){:target="_blank"} covering 378 employees at two sites, with an effective date of November 13. That follows last week's disclosure that Oracle would add about $700 million to its fiscal 2026 restructuring plan. Oracle did not publish a new company-wide headcount with this filing.

{% include ads/in-article.html %}

---

## <i class="fas fa-chart-bar"></i> The Numbers That Matter

- **$550 Million** Temporal Series E, at a **$12.55 Billion** valuation
- **$200 Million** Factory round, at a **$5 Billion** valuation
- **$50 Million** Raindrop total funding after its Series A
- **378** Oracle California WARN seats, effective November 13
- **2.1.179** Claude Code build that Air says closes Plugin4Shell
- **0.146.0** Codex build that Air says closes Plugin4Shell
- **153.0.8010.52** Chrome build that patches CVE-2026-93374 and CVE-2026-93372
- **2026-09-05** Pixel patch level for CVE-2026-58704
- **September 19, 2026** CISA due date for the Pixel KEV
- **50%** hash memory cut Redis claims for template-encoded hashes in 8.10

---

## <i class="fas fa-calendar-alt"></i> Quick Hits

*   **Copilot auto tiers** - September 14. Efficiency, balance, or intelligence. VS Code, CLI, and the Copilot app.
*   **Redis 8.10** - September 14. Compact hashes, `HIMPORT`, incremental `BACKUP`.
*   **Python 3.14t on RHEL** - September 14. `python3.14-freethreading` on 9.8 and 10.2.
*   **Temporal $550M** - September 14. Series E at $12.55 billion. Lightspeed led.
*   **Oracle California WARN** - September 14. 378 people. Effective November 13.
*   **Gemini 3.8 Live** - September 15. `gemini-3.8-live` and `gemini-3.8-live-extended-thinking`.
*   **Factory $200M** - September 15. $5 billion valuation. Over $400 million raised in total.
*   **GitHub SHA-1 HTTPS** - September 15. Off on github.com and GHEC. GHES untouched.
*   **GitHub GHAS enforce** - September 15. Enterprise configs can bind org owners too.
*   **Pixel bulletin** - September 15. CVE-2026-58704 in the modem. Patch level `2026-09-05`.
*   **One Claude** - September 16. Cowork merges into chat. Docs and Slides in beta.
*   **GitHub SSO PAT API** - September 16. Bulk-authorize classic PATs and SSH keys, 50 orgs at a time.
*   **CISA Pixel KEV** - September 16. Due September 19.
*   **Claude Code Projects** - September 17. Coordinator plus cloud threads. Select Pro and Max.
*   **Plugin4Shell** - September 17. Update Claude Code and Codex. Copilot and Gemini CLI still open.
*   **Chrome 153.0.8010.52** - September 17. Two critical CVEs in Dawn and WebGL.
*   **Raindrop $50M** - September 17. CRV Series A. Simulations in preview.
*   **OpenZeppelin / S&P** - September 17. Terms undisclosed. Unit stays under Brener.
*   **Copilot code review** - September 18. [Clearer overview comments](https://github.blog/changelog/2026-09-18-copilot-code-review-an-improved-review-experience/){:target="_blank"} and smarter auto-resolve. Generally available.

---

The week was a coordinator for Claude Code, a plugin pin that was not a pin, and two Live models you can point a voice agent at. Update Claude Code and Codex, take the Pixel and Chrome builds, and set Copilot auto to the tier you actually want to pay for. Next week, watch whether Copilot ships a Plugin4Shell fix and whether Claude Code Projects leave the waitlist. See you then.
