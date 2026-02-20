---
layout: post
title: "How to Run Your Own AI Agent with Cloudflare Moltworker"
subtitle: "OpenClaw setup, gateway architecture, and serverless deployment for developers"
date: 2026-02-05
thumbnail-img: /assets/img/posts/artificial-intelligence/openclaw-moltworker-thumb.png
share-img: /assets/img/posts/artificial-intelligence/openclaw-moltworker-thumb.png
categories: ai
tags: [AI]
permalink: /moltworker-self-hosted-ai-agent/
description: "Complete Moltworker and OpenClaw guide for developers. Learn to deploy self-hosted AI agents on Cloudflare Workers without hardware. Covers gateway architecture, WhatsApp and Slack integration, and Markdown memory systems."
keywords: "Moltworker, Moltworker guide, OpenClaw, OpenClaw setup, Moltbot, self-hosted AI agent, personal AI assistant, Cloudflare Workers AI, run AI agent without hardware, AI agent architecture, local-first AI, gateway architecture, WhatsApp AI bot, Slack AI integration, Telegram bot AI, serverless AI deployment, AI agent tutorial, autonomous AI agent, Cloudflare AI"
seo: true
social-share: true
comments: true

quick-answer: "Moltworker lets you run OpenClaw (formerly Moltbot) on Cloudflare Workers. It is a self-hosted AI agent that connects to **10+ messaging apps** (WhatsApp, Telegram, Slack, Discord) through a **Gateway** running on port 18789. Memory is stored as **plain Markdown files**, making it debuggable and auditable. Deploy locally with Docker or serverlessly with Cloudflare Workers."

faq:
  - question: "What is Cloudflare Moltworker?"
    answer: "Moltworker is Cloudflare's solution for running OpenClaw (formerly Moltbot) on Cloudflare Workers. Instead of buying dedicated hardware like Mac minis, developers can deploy a self-hosted AI agent using Cloudflare's serverless platform, taking advantage of the Workers Runtime and Developer Platform APIs."
  - question: "What is OpenClaw and why was Moltbot renamed?"
    answer: "OpenClaw is a self-hosted, open-source AI agent that runs on your own devices. It was originally called Clawdbot, then renamed to Moltbot in January 2026 after a trademark request from Anthropic (makers of Claude), and finally renamed to OpenClaw on January 30, 2026. The functionality remains the same across all names."
  - question: "How does the OpenClaw Gateway architecture work?"
    answer: "The Gateway is a local daemon that runs on port 18789. It hosts the Web UI dashboard, manages WebSocket and HTTP connections, handles session routing, and coordinates tools. All messaging channels connect to this central Gateway, which routes messages to the appropriate AI agent sessions."
  - question: "What messaging platforms does OpenClaw support?"
    answer: "OpenClaw integrates with over 10 messaging platforms including WhatsApp, Telegram, Slack, Discord, Microsoft Teams, Signal, iMessage, and Google Chat. A single Gateway can manage connections to all these platforms simultaneously."
  - question: "How does memory work in OpenClaw?"
    answer: "Unlike cloud AI assistants, OpenClaw stores memory as plain Markdown files in the agent workspace. This local-first approach makes memory debuggable, portable, and auditable. You can read, edit, and version control your agent's memory using standard text tools."
  - question: "Can I run OpenClaw without dedicated hardware?"
    answer: "Yes. Cloudflare Moltworker allows you to run OpenClaw on Cloudflare Workers without buying Mac minis or dedicated servers. It uses the Workers Runtime with improved Node.js compatibility, including Playwright for browser automation."
  - question: "Is OpenClaw open source?"
    answer: "Yes, OpenClaw is fully open source with over 30,000 GitHub stars and 130+ contributors. You can self-host it, modify it, and contribute to the project. Moltworker (the Cloudflare adaptation) is also available on GitHub."
  - question: "What are the security considerations for self-hosted AI agents?"
    answer: "With local-first architecture, your disk becomes part of the security boundary. Memory files, session data, and tool access all run on your device. You need to secure the Gateway port, manage file permissions, and consider what tools you grant the agent access to."
---

Everyone wants their own AI assistant. Not one that lives on someone else's servers, but one that runs on your machine, connects to your apps, and remembers what you tell it. OpenClaw (formerly Moltbot) makes this possible, and Cloudflare's Moltworker takes it further by letting you run it serverlessly.

This guide walks through what OpenClaw is, how its architecture works, and what you can learn from building self-hosted AI agents. Whether you want to run it locally or deploy on Cloudflare Workers, understanding the design decisions will help you build better AI systems.

> **TL;DR**: OpenClaw is a self-hosted AI agent with a Gateway architecture. It connects to 10+ messaging apps, stores memory as Markdown files, and can run locally or on Cloudflare Workers via Moltworker. Key components: Gateway (control plane), Channels (messaging integrations), Tools (browser, filesystem, etc.), and Sessions (conversation management).

## What is OpenClaw?

OpenClaw is an open source, self-hosted AI agent. Unlike ChatGPT or Claude that run on company servers, OpenClaw runs on your own hardware. You control the data, the integrations, and the compute.

The core idea is simple: a local daemon (the Gateway) connects to your messaging apps and routes conversations to AI agents. Think of it as your personal AI inbox that works across WhatsApp, Telegram, Slack, Discord, and more.

| Feature | Cloud AI (ChatGPT, Claude) | OpenClaw |
|---------|---------------------------|----------|
| Where it runs | Company servers | Your device or Cloudflare Workers |
| Data ownership | Theirs | Yours |
| Messaging integrations | Limited | 10+ platforms |
| Memory storage | Proprietary | Plain Markdown files |
| Customization | Limited | Full control |
| Cost | Subscription | Self-hosted (your compute) |

The project has over 30,000 stars on GitHub and 130+ contributors, making it one of the most popular open source AI agent projects.

### The Name Changes

The project has gone through a few rebrands:
- **Clawdbot**: Original name
- **Moltbot**: Renamed January 27, 2026 after a trademark request from Anthropic (the Claude AI company)
- **OpenClaw**: Current name as of January 30, 2026

All three names refer to the same project. You will see documentation and discussions using different names depending on when they were written.

## The Gateway Architecture

The heart of OpenClaw is the Gateway. This is a local daemon (background service) that runs on your machine and acts as the control plane for everything.

<pre><code class="language-mermaid">
flowchart TD
    subgraph Channels["fa:fa-comments  MESSAGING CHANNELS"]
        direction LR
        WA["fa:fa-comment  WhatsApp"] ~~~ TG["fa:fa-paper-plane  Telegram"] ~~~ SL["fa:fa-hashtag  Slack"] ~~~ DC["fa:fa-headset  Discord"] ~~~ TM["fa:fa-users  Teams"] ~~~ SG["fa:fa-lock  Signal"]
    end

    subgraph Gateway["fa:fa-server  GATEWAY  :18789"]
        direction LR
        WS["fa:fa-plug  WebSocket"] ~~~ HTTP["fa:fa-globe  HTTP API"] ~~~ UI["fa:fa-desktop  Dashboard"]
    end

    Router["fa:fa-random  SESSION ROUTER"]

    subgraph Sessions["fa:fa-robot  AI SESSIONS"]
        direction LR
        S1["Session 1"] ~~~ S2["Session 2"] ~~~ S3["Session 3"]
    end

    subgraph Storage["fa:fa-folder-open  LOCAL STORAGE"]
        direction LR
        Mem["fa:fa-file-alt  memory.md"] ~~~ Log["fa:fa-list-alt  logs/"] ~~~ Cfg["fa:fa-cog  config.yml"]
    end

    Channels --> Gateway
    Gateway --> Router
    Router --> Sessions
    Sessions --> Storage

    style Channels fill:#fff8e1,stroke:#ff8f00,stroke-width:2px
    style Gateway fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Router fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style Sessions fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style Storage fill:#fce4ec,stroke:#c2185b,stroke-width:2px
</code></pre>

### What the Gateway Does

The Gateway runs on port 18789 by default and provides:

1. **Web Dashboard**: A UI to manage agents, view sessions, and configure settings
2. **WebSocket Server**: Real-time bidirectional communication with messaging channels
3. **HTTP API**: REST endpoints for control and automation
4. **Session Router**: Routes incoming messages to the right AI agent session

This separation of concerns is a pattern worth learning. The Gateway handles all the connection management and routing, while the AI processing happens in isolated sessions. If one session crashes, the others keep running.

### Channels: Your AI Inbox

Channels are the integrations that connect your messaging apps to the Gateway. Currently supported:

- WhatsApp
- Telegram
- Slack
- Discord
- Microsoft Teams
- Signal
- iMessage
- Google Chat
- And more

Each channel maintains its own connection to the Gateway. When you send a message on WhatsApp, it flows through the WhatsApp channel to the Gateway, which routes it to the appropriate session.

<pre><code class="language-mermaid">
sequenceDiagram
    participant User as User (WhatsApp)
    participant Channel as WhatsApp Channel
    participant Gateway as Gateway
    participant Session as AI Session
    participant LLM as LLM Provider

    User->>Channel: Send message
    Channel->>Gateway: Forward via WebSocket
    Gateway->>Gateway: Find/create session
    Gateway->>Session: Route message
    Session->>LLM: Request completion
    LLM-->>Session: Response
    Session->>Gateway: Send reply
    Gateway->>Channel: Route to channel
    Channel->>User: Deliver response
</code></pre>

The benefit of this architecture is that you can message your AI from any platform and pick up the conversation elsewhere. Start a task on Slack, continue it on WhatsApp. The Gateway maintains session continuity.

## Memory: Plain Markdown Files

This is one of OpenClaw's most interesting design decisions. Instead of storing memory in a database, everything is saved as plain Markdown files in your agent workspace.

```
~/.openclaw/
├── memory/
│   ├── conversations/
│   │   ├── session-abc123.md
│   │   └── session-def456.md
│   ├── notes/
│   │   └── user-preferences.md
│   └── facts/
│       └── learned-context.md
├── config.yml
└── logs/
    └── gateway.log
```

### Why Markdown?

**Debuggable**: When something goes wrong, you can open the files and see exactly what the agent remembers. No database queries, no special tools.

**Portable**: Move your agent to a new machine by copying the folder. Version control with Git if you want.

**Auditable**: See exactly what data your AI has access to. No black box.

**Editable**: Made a mistake? Open the file and fix it. The agent will use the corrected information.

This is a significant departure from how most AI systems handle memory. Vector databases and embedding stores are powerful, but they trade transparency for capability. OpenClaw prioritizes the ability to understand and control what your agent knows.

For developers building AI systems, this raises an interesting question: when is database storage worth the complexity? For personal assistants with modest memory requirements, plain files might be the right choice. For large scale RAG systems, you will need something more sophisticated. Understanding this tradeoff is valuable. For more on this, see my post on [Building AI Agents That Actually Work](/building-ai-agents/).

## Tools: What Your Agent Can Do

OpenClaw agents can use tools to interact with the world. These are functions the agent can call to take actions beyond just generating text.

### Built-in Tools

**Browser Automation**: Control a headless browser to visit websites, fill forms, and extract information. Uses Playwright under the hood.

**Filesystem Access**: Read and write files on your system. Useful for note-taking, document processing, and data management.

**Command Execution**: Run shell commands. Powerful but requires careful permission management.

**Web Requests**: Make HTTP calls to APIs and services.

**Hooks and Automations**: Schedule tasks with cron jobs, respond to webhooks, and set up Gmail PubSub integrations.

### The Tool Architecture

<pre><code class="language-mermaid">
flowchart LR
    subgraph Agent["AI Agent Session"]
        LLM["fa:fa-brain LLM Reasoning"]
        TC["fa:fa-tools Tool Controller"]
    end

    subgraph Tools["Available Tools"]
        Browser["fa:fa-globe Browser"]
        FS["fa:fa-folder Filesystem"]
        Exec["fa:fa-terminal Command Exec"]
        Web["fa:fa-cloud Web Requests"]
        Hooks["fa:fa-clock Scheduled Tasks"]
    end

    subgraph External["External Systems"]
        Sites["Websites"]
        APIs["REST APIs"]
        Files["Local Files"]
        Shell["System Shell"]
    end

    LLM --> TC
    TC --> Browser
    TC --> FS
    TC --> Exec
    TC --> Web
    TC --> Hooks

    Browser --> Sites
    Web --> APIs
    FS --> Files
    Exec --> Shell

    style Agent fill:#e3f2fd,stroke:#1565c0
    style Tools fill:#e8f5e9,stroke:#2e7d32
    style External fill:#fff3e0,stroke:#e65100
</code></pre>

Tools are defined with clear descriptions so the LLM knows when to use them. This follows the same function calling pattern used by OpenAI and Anthropic APIs. If you have built agents before, the concepts are familiar.

## Cloudflare Moltworker: Serverless Deployment

Running OpenClaw locally works great, but it means your computer needs to be on. Cloudflare's Moltworker solves this by letting you run the agent on Cloudflare Workers.

### What is Moltworker?

Moltworker is a middleware layer that adapts OpenClaw to run on Cloudflare's serverless platform. It takes advantage of:

- **Workers Runtime**: Cloudflare's V8-based execution environment
- **Node.js Compatibility**: Recent improvements to Workers allow running Node.js code
- **Playwright Integration**: Browser automation works through Cloudflare's browser rendering service
- **Developer Platform APIs**: Access to KV storage, Durable Objects, and other Cloudflare services

### Why Serverless for AI Agents?

| Local Deployment | Cloudflare Workers |
|------------------|-------------------|
| Runs on your hardware | Runs on Cloudflare edge |
| Requires always-on computer | Always available |
| Full control over environment | Managed infrastructure |
| No network latency to agent | Agent runs close to users |
| Free (you own the hardware) | Pay-per-use pricing |

For personal use, local deployment is often better. You get full control and no ongoing costs. But if you want your agent accessible from anywhere without leaving a computer running, Moltworker is the answer.

### How Moltworker Works

<pre><code class="language-mermaid">
flowchart TD
    subgraph Inputs["fa:fa-arrow-down  INPUTS"]
        direction LR
        subgraph Devices["Your Devices"]
            Phone["fa:fa-mobile-alt  Mobile"] ~~~ Laptop["fa:fa-laptop  Laptop"]
        end
        subgraph Messaging["Messaging Platforms"]
            Apps["fa:fa-comments  WhatsApp / Telegram / Slack"]
        end
    end

    subgraph Cloudflare["fa:fa-cloud  CLOUDFLARE EDGE"]
        direction LR
        Worker["fa:fa-bolt  Moltworker"]
    end

    subgraph Services["fa:fa-cubes  CLOUDFLARE SERVICES"]
        direction LR
        KV["fa:fa-database  KV Storage"] ~~~ DO["fa:fa-cube  Durable Objects"] ~~~ Browser["fa:fa-globe  Browser Rendering"]
    end

    subgraph AI["fa:fa-brain  AI PROVIDERS"]
        direction LR
        OpenAI["OpenAI API"] ~~~ Anthropic["Anthropic API"]
    end

    Inputs --> Cloudflare
    Cloudflare --> Services
    Cloudflare --> AI

    style Inputs fill:#fff8e1,stroke:#ff8f00,stroke-width:2px
    style Devices fill:#fffde7,stroke:#fbc02d
    style Messaging fill:#fffde7,stroke:#fbc02d
    style Cloudflare fill:#ff6d00,stroke:#e65100,stroke-width:2px,color:#fff
    style Services fill:#fff3e0,stroke:#ff6d00,stroke-width:2px
    style AI fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
</code></pre>

The key insight is that Moltworker replaces the local Gateway with a distributed version running on Cloudflare's edge network. Memory that would be stored in Markdown files locally gets stored in Cloudflare KV. Session state uses Durable Objects for consistency.

This is a useful pattern for any self-hosted tool: design with clear abstractions, then swap implementations for different deployment targets.

## Setting Up OpenClaw

There are several ways to get started, depending on your preferences.

### Option 1: Docker (Recommended for Most Developers)

```bash
docker run -d \
  --name openclaw \
  -p 18789:18789 \
  -v ~/.openclaw:/data \
  openclaw/gateway:latest
```

This gives you the Gateway running in a container with your data persisted locally. For more Docker commands and best practices, see the [Docker Cheat Sheet](/devops/docker-cheat-sheet/).

### Option 2: macOS App

OpenClaw provides a native macOS app with the Gateway bundled. Download from the releases page and run like any other application.

### Option 3: From Source

```bash
# Requires Node.js 22+ and pnpm
git clone https://github.com/openclaw/gateway.git
cd gateway
pnpm install
pnpm run dev
```

### Option 4: Cloudflare Workers (Moltworker)

```bash
# Clone the Moltworker repository
git clone https://github.com/cloudflare/moltworker.git
cd moltworker

# Install dependencies
npm install

# Configure your Cloudflare account
npx wrangler login

# Deploy
npx wrangler deploy
```

After deployment, you get a Workers URL that acts as your Gateway endpoint.

### Connecting Channels

Once the Gateway is running, connect your messaging apps through the Web Dashboard at `http://localhost:18789`.

Each channel has its own setup process:
- **Telegram**: Create a bot with BotFather, add the token
- **Slack**: Create a Slack app, configure OAuth
- **Discord**: Create a Discord bot, add the token
- **WhatsApp**: Scan QR code to link account

The dashboard walks you through each integration.

## Security Considerations

Self-hosted AI agents introduce security concerns that cloud services handle for you.

### Your Disk is the Security Boundary

Memory files, configuration, and logs all live on your filesystem. Anyone with access to your machine can read what your agent knows. This includes:
- Conversation history
- Learned preferences
- Files the agent has processed
- API keys and tokens

**Mitigations**:
- Encrypt your disk
- Use strong user account passwords
- Consider running the Gateway in a restricted user account
- Review memory files periodically

### Tool Permissions

The agent can potentially execute commands, access files, and browse the web. Be thoughtful about what you enable.

**Mitigations**:
- Only enable tools you actually need
- Use filesystem sandboxing where possible
- Monitor agent actions through logs
- Set up alerts for sensitive operations

### Network Exposure

The Gateway listens on a port. If your machine is accessible from the network, so is your agent.

**Mitigations**:
- Bind to localhost only for personal use
- Use a reverse proxy with authentication for remote access
- Set up firewall rules to restrict access

### API Key Management

Your agent needs API keys for LLM providers (OpenAI, Anthropic, etc.). Protect these.

**Mitigations**:
- Use environment variables, not config files
- Rotate keys periodically
- Use provider features like usage limits

For a deeper dive into AI agent security, see the security patterns in [How to Build AI Agents That Actually Work](/building-ai-agents/).

## Lessons for Developers

Building and studying OpenClaw teaches several valuable lessons about AI system design.

### <i class="fas fa-layer-group"></i> Lesson 1: Gateway Pattern for Multi-Channel Systems

The Gateway architecture is a powerful pattern whenever you need to aggregate multiple input sources. Instead of each channel having its own processing logic, everything flows through a central control plane.

This is similar to how [API gateways](/how-cloudflare-supports-55-million-requests-per-second/) work in microservices. The principle transfers directly.

### <i class="fas fa-file-alt"></i> Lesson 2: Sometimes Files Beat Databases

Not everything needs a database. For personal tools with modest data requirements, plain files offer transparency and simplicity that databases cannot match.

Consider the debugging experience: `cat memory/session.md` versus writing SQL queries or using database tools. For the right use case, simplicity wins.

### <i class="fas fa-boxes"></i> Lesson 3: Design for Multiple Deployment Targets

OpenClaw runs locally or on Cloudflare Workers. This flexibility comes from clean abstractions. The core logic does not care where it runs.

If you build tools, think about deployment flexibility from the start. Abstract storage, networking, and environment-specific code behind interfaces.

### <i class="fas fa-plug"></i> Lesson 4: WebSockets for Real-Time Agent Communication

The Gateway uses WebSockets for bidirectional real-time communication. This is the right choice for conversational AI where you need instant message delivery.

Understanding [WebSocket patterns](/explainer/websockets-explained/) is essential for building responsive AI applications.

### <i class="fas fa-shield-alt"></i> Lesson 5: Self-Hosting Changes the Security Model

Cloud services handle security for you. Self-hosting means you own it. This is not necessarily harder, but it requires different thinking.

The tradeoff is control versus responsibility. For developers who value ownership, it is worth learning.

## When to Use OpenClaw

**Good fit**:
- You want a personal AI assistant you fully control
- You need to integrate with multiple messaging platforms
- Privacy is a priority (data stays on your device)
- You want to customize agent behavior deeply
- You are comfortable with self-hosting

**Not a good fit**:
- You need enterprise features and support
- You want zero maintenance
- You need to share the agent across an organization
- You are not comfortable managing infrastructure

For team use cases, commercial AI platforms might be more appropriate. OpenClaw excels as a personal productivity tool for developers who want full control.

## Key Takeaways

**1. Gateway architecture centralizes control**: Multiple messaging channels connect to a single Gateway that handles routing, session management, and tool coordination.

**2. Markdown memory is transparent**: Storing agent memory as plain files makes debugging and auditing simple, at the cost of some querying power.

**3. Moltworker enables serverless deployment**: Cloudflare's adaptation lets you run OpenClaw without dedicated hardware.

**4. Self-hosting requires security awareness**: Your disk, network, and API keys become the security boundary.

**5. The patterns are transferable**: Gateway architecture, WebSocket communication, and clean deployment abstractions apply to many systems beyond AI agents.

---

*Want to learn more about AI agents? Check out [How to Build AI Agents That Actually Work](/building-ai-agents/) for a deep dive into agent architecture, or [How Cloudflare Supports 55 Million Requests Per Second](/how-cloudflare-supports-55-million-requests-per-second/) to understand the infrastructure that powers Moltworker.*
