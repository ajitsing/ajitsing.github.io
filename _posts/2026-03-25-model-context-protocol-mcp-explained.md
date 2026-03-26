---
layout: post
seo: true
title: "Model Context Protocol (MCP) Explained"
subtitle: "How MCP works, why it matters, and how to build your first MCP server"
date: 2026-03-25
categories: ai
permalink: /model-context-protocol-mcp-explained/
share-img: /assets/img/posts/artificial-intelligence/mcp-explained-thumb.png
thumbnail-img: /assets/img/posts/artificial-intelligence/mcp-explained-thumb.png
description: "Learn what MCP (Model Context Protocol) is, how it works, and why it matters for AI development. This guide covers MCP architecture (hosts, clients, servers), tools vs resources vs prompts, transport mechanisms, JSON-RPC message flow, building your first MCP server, security best practices, and real-world use cases with Cursor, Claude, and VS Code."
keywords: "model context protocol, MCP, MCP explained, what is MCP, MCP server, MCP client, MCP host, MCP architecture, MCP vs API, MCP vs REST, anthropic MCP, MCP tools resources prompts, build MCP server, MCP tutorial, MCP JSON-RPC, MCP transport, MCP stdio, MCP HTTP, cursor MCP, claude MCP, VS code MCP, MCP security, MCP protocol AI, AI agent tools, LLM integration, MCP SDK, MCP server example, AI tools protocol, model context protocol tutorial, MCP for developers"
tags: ["AI", "software-engineering"]
comments: true
social-share: true
popular: true

quick-answer: "MCP (Model Context Protocol) is an open standard by Anthropic that gives AI applications a universal way to connect to external tools and data sources. Think of it as **USB-C for AI**: instead of building custom integrations for every tool, you build one MCP server and any MCP-compatible host (Cursor, Claude, VS Code, ChatGPT) can use it. The protocol runs on **JSON-RPC 2.0** and defines three primitives: **Tools** (actions the model can call), **Resources** (data the model can read), and **Prompts** (reusable templates). Communication happens over **stdio** (local) or **Streamable HTTP** (remote)."

key-takeaways:
  - "MCP solves the M x N integration problem. One protocol connects any AI host to any tool server"
  - "The architecture has three layers: Host (the AI app), Client (connection manager), and Server (provides tools and data)"
  - "Tools are model-invoked actions, Resources are read-only data, Prompts are reusable templates. Know when to use each"
  - "MCP uses JSON-RPC 2.0 over stdio (local servers) or Streamable HTTP (remote servers)"
  - "MCP does not replace your APIs. It wraps them to make them discoverable and usable by AI models"
  - "Security is your responsibility. Validate inputs, sandbox tool execution, and always keep a human in the loop for destructive actions"
  - "Start by building a simple MCP server with the official TypeScript or Python SDK before building anything complex"

faq:
  - question: "What is MCP (Model Context Protocol)?"
    answer: "MCP is an open-source protocol created by Anthropic that standardizes how AI applications connect to external tools, data sources, and services. Instead of every AI app building custom integrations for every tool, MCP provides a single protocol that any AI host can use to talk to any MCP server. It uses JSON-RPC 2.0 for communication and defines three core primitives: Tools (actions), Resources (data), and Prompts (templates)."
  - question: "What is the difference between MCP and a REST API?"
    answer: "REST APIs are designed for applications to talk to services. MCP is designed for AI models to discover and use tools. REST requires you to know endpoints, authentication, and request formats in advance. MCP provides automatic discovery through tools/list and resources/list, standardized JSON Schema descriptions so models understand what each tool does, and a consistent invocation pattern. MCP servers often wrap existing REST APIs to make them AI-accessible."
  - question: "What are MCP hosts, clients, and servers?"
    answer: "An MCP Host is the end-user AI application like Cursor, Claude Desktop, or VS Code. An MCP Client is a component inside the host that manages a dedicated connection to one MCP server. An MCP Server is a program that provides tools, resources, and prompts to the client. One host can have multiple clients, each connected to a different server."
  - question: "What is the difference between MCP Tools, Resources, and Prompts?"
    answer: "Tools are functions the AI model can call to perform actions like querying a database, sending an email, or creating a file. Resources are read-only data identified by URIs, like file contents, database records, or API responses that provide context to the model. Prompts are reusable message templates that guide the model through specific workflows, often surfaced as slash commands in the UI."
  - question: "How do I build an MCP server?"
    answer: "Use the official MCP SDK for TypeScript or Python. Create a server instance, define your tools with names, descriptions, and JSON Schema input parameters, implement the handler functions, and choose a transport (stdio for local or Streamable HTTP for remote). The SDK handles JSON-RPC framing, capability negotiation, and lifecycle management."
  - question: "Is MCP secure?"
    answer: "MCP itself is a protocol and does not enforce security. Security depends on your implementation. Best practices include validating all tool inputs, sandboxing tool execution, requiring user consent for destructive actions, binding local servers to 127.0.0.1 only, validating Origin headers for HTTP servers, and using OAuth for remote server authentication. The OWASP MCP Security Cheat Sheet provides detailed guidance."
  - question: "Which AI tools support MCP?"
    answer: "Major AI tools with MCP support include Claude Desktop, Claude Code, Cursor, VS Code (via GitHub Copilot), ChatGPT, Windsurf, and many others. The ecosystem is growing rapidly. Anthropic maintains a list of compatible clients on the official MCP documentation site."
  - question: "Does MCP replace APIs?"
    answer: "No. MCP does not replace your existing APIs. It sits on top of them. MCP provides a standardized layer that makes your APIs discoverable and usable by AI models. Your REST APIs, GraphQL endpoints, and database connections stay the same. The MCP server wraps them with tool definitions, input schemas, and descriptions so AI agents can find and use them."

citations:
  - name: "Model Context Protocol Introduction"
    url: "https://modelcontextprotocol.io/introduction"
    author: "Anthropic"
  - name: "MCP Specification (Latest)"
    url: "https://modelcontextprotocol.io/specification/latest/"
    author: "Anthropic"
  - name: "Introducing the Model Context Protocol"
    url: "https://www.anthropic.com/news/model-context-protocol"
    author: "Anthropic"
  - name: "MCP Architecture"
    url: "https://modelcontextprotocol.io/docs/concepts/architecture"
    author: "Anthropic"
  - name: "OWASP MCP Security Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html"
    author: "OWASP Foundation"
---

Every AI tool you use today is isolated. Claude can write code but cannot read your Jira tickets. ChatGPT can analyze data but cannot pull from your company's database. Cursor can edit files but needs custom configuration for every new tool you want to plug in.

The result? Developers end up building one-off integrations for every combination of AI app and external tool. If you have 5 AI applications and 10 tools, that is 50 custom integrations. Add a new tool, and you are building 5 more.

This is the problem MCP solves.

Model Context Protocol (MCP) is an open standard created by Anthropic that gives AI applications a universal way to connect to tools, data sources, and services. Build one MCP server for your tool, and every MCP-compatible AI app can use it. No more custom integrations for each host.

If you have been [building AI agents](/building-ai-agents/) or working with [LLM applications](/building-your-first-llm-application/), you have already hit this wall. MCP is the industry's answer to it.

> **TL;DR**: MCP is a protocol (not a framework) that standardizes how AI apps talk to external tools. It uses JSON-RPC 2.0, defines three primitives (Tools, Resources, Prompts), and runs over stdio or HTTP. Think of it as USB-C for AI: one port, many devices. Major AI tools like Cursor, Claude, VS Code, and ChatGPT already support it.

## Table of Contents

1. [What is MCP?](#what-is-mcp)
2. [The Problem MCP Solves](#the-problem-mcp-solves)
3. [MCP Architecture: Hosts, Clients, and Servers](#mcp-architecture-hosts-clients-and-servers)
4. [The Three Primitives: Tools, Resources, and Prompts](#the-three-primitives-tools-resources-and-prompts)
5. [How MCP Communicates: JSON-RPC and Transports](#how-mcp-communicates-json-rpc-and-transports)
6. [MCP vs REST APIs: Complementary, Not a Replacement](#mcp-vs-rest-apis-complementary-not-a-replacement)
7. [How a Typical MCP Session Works](#how-a-typical-mcp-session-works)
8. [Build Your First MCP Server](#build-your-first-mcp-server)
9. [Connecting MCP Servers to Real Clients](#connecting-mcp-servers-to-real-clients)
10. [MCP Security: What You Need to Know](#mcp-security-what-you-need-to-know)
11. [The MCP Ecosystem Today](#the-mcp-ecosystem-today)
12. [When to Use MCP (and When Not To)](#when-to-use-mcp-and-when-not-to)
13. [What is Coming Next](#what-is-coming-next)

---

## What is MCP?

MCP stands for Model Context Protocol. It is an open-source protocol that defines how AI applications connect to external data sources, tools, and services.

The official documentation calls it **"USB-C for AI applications."** Just like USB-C gives you one port to connect to monitors, drives, and peripherals, MCP gives AI apps one protocol to connect to databases, APIs, file systems, and any other tool.

Here is what that looks like in practice:

```mermaid
flowchart LR
    subgraph Hosts["AI Applications"]
        H1["fa:fa-terminal Cursor"]
        H2["fa:fa-comment Claude"]
        H3["fa:fa-code VS Code"]
        H4["fa:fa-robot ChatGPT"]
    end

    MCP["fa:fa-plug MCP Protocol"]

    subgraph Servers["MCP Servers"]
        S1["fa:fa-database PostgreSQL"]
        S2["fa:fa-code-branch GitHub"]
        S3["fa:fa-folder File System"]
        S4["fa:fa-slack Slack"]
    end

    H1 --- MCP
    H2 --- MCP
    H3 --- MCP
    H4 --- MCP
    MCP --- S1
    MCP --- S2
    MCP --- S3
    MCP --- S4

    style MCP fill:#dbeafe,stroke:#2563eb,stroke-width:3px
    style Hosts fill:#f0fdf4,stroke:#16a34a,stroke-width:1px
    style Servers fill:#fefce8,stroke:#ca8a04,stroke-width:1px
    style H1 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style H2 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style H3 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style H4 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style S1 fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
    style S2 fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
    style S3 fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
    style S4 fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
```

Without MCP, each connection in this diagram would require its own integration code. With MCP, you write the integration once as an MCP server, and it works with every host that speaks the protocol.

Anthropic released MCP as an open standard in November 2024 and it has since been adopted by nearly every major AI tool. The protocol is now governed by an open specification, and contributions come from across the industry.

---

## The Problem MCP Solves

Before MCP, connecting AI to external tools looked like this:

**The M x N integration problem:**

| | Cursor | Claude | VS Code | ChatGPT |
|---|---|---|---|---|
| **GitHub** | Custom plugin | Custom connector | Custom extension | Custom GPT Action |
| **PostgreSQL** | Custom config | Custom integration | Custom extension | Custom GPT Action |
| **Slack** | N/A | Custom integration | Custom extension | Custom GPT Action |
| **Jira** | Custom plugin | Custom connector | Custom extension | Custom GPT Action |

That is 16 custom integrations for 4 tools and 4 hosts. Add one more tool, you build 4 more. Add one more host, you build 4 more. The complexity grows as M x N.

With MCP, it becomes M + N:

- Build 4 MCP servers (one per tool)
- Each host connects to any server using the same protocol
- Total: 4 servers + 4 hosts = 8 pieces of work instead of 16

This is the same pattern that solved similar problems before. USB-C standardized hardware connections. [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) standardized how code editors talk to language-specific tooling. MCP does the same thing for AI-to-tool connections.

---

## MCP Architecture: Hosts, Clients, and Servers

The MCP architecture has three distinct layers. Understanding each one is important because they have different responsibilities.

```mermaid
flowchart TB
    subgraph Host["fa:fa-window-maximize MCP Host (e.g. Cursor)"]
        LLM["fa:fa-brain LLM"]
        
        subgraph Clients["MCP Clients"]
            C1["fa:fa-plug Client A"]
            C2["fa:fa-plug Client B"]
            C3["fa:fa-plug Client C"]
        end
        
        LLM <-->|"tool calls"| C1
        LLM <-->|"tool calls"| C2
        LLM <-->|"tool calls"| C3
    end

    C1 <-->|"JSON-RPC"| S1["fa:fa-database DB Server"]
    C2 <-->|"JSON-RPC"| S2["fa:fa-code-branch Git Server"]
    C3 <-->|"JSON-RPC"| S3["fa:fa-search Search Server"]

    style Host fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style LLM fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style Clients fill:#ecfdf5,stroke:#059669,stroke-width:1px
    style C1 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style C2 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style C3 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style S1 fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
    style S2 fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
    style S3 fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
```

### <i class="fas fa-window-maximize"></i> MCP Host

The host is the AI application the user interacts with. Cursor, Claude Desktop, VS Code with Copilot, ChatGPT are all hosts. The host is responsible for:

- Running the LLM
- Managing user interactions
- Creating and managing MCP clients
- Deciding which tools the model can access
- Enforcing security policies and user consent

The host is the boss. It controls what the model sees and what it is allowed to do.

### <i class="fas fa-plug"></i> MCP Client

The client is a component **inside** the host. Each client maintains a dedicated, one-to-one connection with a single MCP server. If Cursor connects to three MCP servers (GitHub, PostgreSQL, Slack), it creates three separate client instances.

The client handles:

- Protocol negotiation with the server
- Message routing (JSON-RPC)
- Capability management (what the server supports)
- Connection lifecycle

You do not usually build clients yourself. The host application handles this. But understanding the client layer helps when debugging connection issues.

### <i class="fas fa-server"></i> MCP Server

The server is where the real work happens. It exposes tools, resources, and prompts that AI models can use. A server might:

- Wrap a REST API (GitHub, Jira, Slack)
- Provide database access (PostgreSQL, MongoDB)
- Expose file system operations
- Run specialized computations

Each server is a standalone program. It can be a local subprocess (running on your machine) or a remote service (running in the cloud). The protocol is the same either way.

---

## The Three Primitives: Tools, Resources, and Prompts

MCP defines three types of things a server can provide. Knowing which one to use and when is the difference between building an effective MCP server and a confusing one.

### <i class="fas fa-wrench"></i> Tools: Actions the Model Can Take

Tools are functions the LLM can call. They are the most commonly used primitive and the one you will build first.

**Key characteristics:**
- The **model** decides when to call them (based on tool descriptions)
- They have defined input schemas (JSON Schema)
- They can have side effects (write data, send messages, create files)
- They require user approval for safety-critical operations

```json
{
  "name": "query_database",
  "description": "Run a read-only SQL query against the production database",
  "inputSchema": {
    "type": "object",
    "properties": {
      "sql": {
        "type": "string",
        "description": "The SQL query to execute. Must be a SELECT statement."
      }
    },
    "required": ["sql"]
  }
}
```

When to use: When the model needs to **do something**. Query a database. Create a GitHub issue. Send a Slack message. Anything with an action.

### <i class="fas fa-file-alt"></i> Resources: Data the Model Can Read

Resources are read-only data identified by URIs. They are how you expose context to the model without giving it the ability to modify anything.

**Key characteristics:**
- Identified by URI (e.g., `file:///path/to/doc.md`, `postgres://db/users/123`)
- Read-only (no side effects)
- Can be listed and searched by the client
- Support subscriptions for real-time updates

```json
{
  "uri": "file:///workspace/README.md",
  "name": "Project README",
  "description": "The main README file for the current project",
  "mimeType": "text/markdown"
}
```

When to use: When the model needs **context** to make better decisions. Project documentation, configuration files, database schemas, log entries.

### <i class="fas fa-comment-dots"></i> Prompts: Reusable Templates

Prompts are predefined message templates that guide the model through specific workflows. They are the least understood primitive but very useful for repeatable tasks.

**Key characteristics:**
- User-facing (usually surfaced as slash commands)
- Can accept arguments
- Return structured message sequences
- Help standardize how users interact with specific tools

```json
{
  "name": "review_code",
  "description": "Review code changes for bugs, security issues, and style",
  "arguments": [
    {
      "name": "diff",
      "description": "The code diff to review",
      "required": true
    }
  ]
}
```

When to use: When you want to create **repeatable workflows** that users can trigger. Code review templates, report generation, data analysis patterns.

### When to Use Each Primitive

| Scenario | Primitive | Why |
|----------|-----------|-----|
| Run a database query | Tool | It is an action with parameters |
| Read a config file | Resource | Read-only context, no side effects |
| Review a pull request | Prompt + Tool | Template guides the workflow, tool fetches the diff |
| Send a Slack message | Tool | Action with side effects |
| Load project documentation | Resource | Static context for the model |
| Generate a weekly report | Prompt | Repeatable workflow template |

---

## How MCP Communicates: JSON-RPC and Transports

MCP is built on two layers: a **data layer** (what gets sent) and a **transport layer** (how it gets sent).

### The Data Layer: JSON-RPC 2.0

All MCP messages follow the [JSON-RPC 2.0](https://www.jsonrpc.org/specification) format. If you have worked with LSP (Language Server Protocol) in VS Code extensions, this will feel familiar.

There are three types of messages:

**Requests** (expect a response):
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}
```

**Responses** (answer a request):
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "query_database",
        "description": "Run a SQL query",
        "inputSchema": { "type": "object", "properties": { "sql": { "type": "string" } } }
      }
    ]
  }
}
```

**Notifications** (one-way, no response expected):
```json
{
  "jsonrpc": "2.0",
  "method": "notifications/tools/list_changed"
}
```

### The Transport Layer: How Messages Travel

MCP supports two transport mechanisms. Which one you use depends on where your server runs.

**stdio (Standard I/O)** is for local servers. The host launches the server as a child process and communicates through stdin/stdout. This is what you use when running MCP servers on your own machine with Cursor or Claude Desktop.

```mermaid
flowchart LR
    Host["fa:fa-window-maximize Host Process"] -->|"stdin (JSON-RPC)"| Server["fa:fa-server MCP Server Process"]
    Server -->|"stdout (JSON-RPC)"| Host
    Server -.->|"stderr (logs)"| Logs["fa:fa-file-alt Log Output"]

    style Host fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style Server fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style Logs fill:#f3f4f6,stroke:#6b7280,stroke-width:1px
```

Important rule: if you use stdio, **never** write anything other than valid JSON-RPC messages to stdout. Debug output goes to stderr. Printing to stdout will corrupt the protocol stream.

**Streamable HTTP** is for remote servers. The client sends requests via HTTP POST and the server responds with JSON or opens an SSE (Server-Sent Events) stream for ongoing communication. This is what you use for cloud-hosted MCP servers that multiple users connect to.

| Transport | Use Case | Deployment | Session |
|-----------|----------|------------|---------|
| stdio | Local development, single user | Host spawns process | Process lifetime |
| Streamable HTTP | Remote/shared, multi-user | Cloud service | Session ID header |

The deprecated transport (HTTP+SSE from protocol version 2024-11-05) used separate endpoints for sending and receiving. Streamable HTTP combined them into a single endpoint. If you are building something new, use Streamable HTTP for remote and stdio for local.

---

## MCP vs REST APIs: Complementary, Not a Replacement

This is the most common misconception about MCP. It does not replace your REST APIs. It sits on top of them.

| Aspect | REST API | MCP |
|--------|----------|-----|
| **Designed for** | App-to-service communication | AI-to-tool communication |
| **Discovery** | Manual (read docs, know endpoints) | Automatic (`tools/list`, `resources/list`) |
| **Invocation** | HTTP methods, custom auth, headers | Standardized `tools/call` with JSON Schema |
| **Schema** | OpenAPI/Swagger (optional) | Built-in JSON Schema (required) |
| **Who calls it** | Your application code | The AI model (via the host) |
| **State** | Typically stateless | Stateful session with capability negotiation |

Here is a practical example. Say you have a GitHub REST API. To use it directly from an AI agent, you need to:

1. Know the endpoint (`api.github.com/repos/{owner}/{repo}/issues`)
2. Handle authentication (tokens, headers)
3. Know the request format (JSON body, query params)
4. Parse the response format
5. Handle pagination, rate limits, errors

With an MCP server wrapping that API:

1. The model calls `tools/list` and finds `create_github_issue`
2. The tool description tells the model what parameters it needs
3. The model calls `tools/call` with structured input
4. The server handles auth, request formatting, and error handling internally
5. The model gets back a clean result

The MCP server is a translator. It takes the messy reality of REST APIs and presents a clean, discoverable interface to the AI model. Your [existing API architecture](/building-your-first-llm-application/) stays the same. MCP just adds a layer that AI models understand.

---

## How a Typical MCP Session Works

Let us walk through what actually happens when an AI application uses MCP, from startup to tool execution.

```mermaid
sequenceDiagram
    participant H as Host (Cursor)
    participant C as MCP Client
    participant S as MCP Server

    rect rgba(219, 234, 254, 0.3)
    Note over H,S: 1. Initialization
    H->>C: Create client
    C->>S: initialize (protocolVersion, capabilities)
    S-->>C: initialize result (capabilities, serverInfo)
    C->>S: notifications/initialized
    end

    rect rgba(220, 252, 231, 0.3)
    Note over H,S: 2. Discovery
    C->>S: tools/list
    S-->>C: Available tools with schemas
    C->>S: resources/list
    S-->>C: Available resources
    end

    rect rgba(254, 249, 195, 0.3)
    Note over H,S: 3. Operation
    H->>C: User asks a question
    C->>S: tools/call (query_database, {sql: "SELECT ..."})
    S-->>C: Result (rows of data)
    C->>H: Display result to user
    end

    rect rgba(254, 226, 226, 0.3)
    Note over H,S: 4. Shutdown
    H->>C: Close connection
    C->>S: Close
    end
```

### Step 1: Initialization

When the host starts up (or when you configure a new MCP server), the client connects to the server and they negotiate capabilities. The client says what protocol version it supports and what features it offers (like sampling, where the server can ask the host's LLM for help). The server responds with its own capabilities (tools, resources, prompts).

This is similar to a TLS handshake. Both sides agree on what they can do before exchanging real data.

### Step 2: Discovery

After initialization, the client asks the server what it has available. `tools/list` returns all available tools with their names, descriptions, and input schemas. `resources/list` returns available data sources. `prompts/list` returns available templates.

This is what makes MCP different from raw API calls. The AI model can **discover** what is available without anyone hardcoding tool definitions.

### Step 3: Operation

Now the model can work. When a user asks a question that requires external data or actions, the model looks at available tools, decides which one to call, formats the input according to the schema, and the client sends the request to the server. The server executes the action and returns the result.

If you have worked with [function calling in AI agents](/building-ai-agents/), this is the same concept, but standardized across hosts and tools.

### Step 4: Shutdown

When the session ends, the client sends a close message and the server cleans up. For stdio servers, the process exits. For HTTP servers, the session ID is invalidated.

---

## Build Your First MCP Server

Let us build a simple MCP server that exposes a weather tool. This is a minimal but complete example using the official TypeScript SDK.

### Setup

```bash
mkdir weather-mcp-server
cd weather-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
npx tsc --init
```

### The Server Code

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

server.tool(
  "get_weather",
  "Get the current weather for a city",
  {
    city: z.string().describe("City name, e.g. London"),
    units: z.enum(["celsius", "fahrenheit"]).default("celsius")
      .describe("Temperature units"),
  },
  async ({ city, units }) => {
    const response = await fetch(
      `https://wttr.in/${encodeURIComponent(city)}?format=j1`
    );
    const data = await response.json();
    const current = data.current_condition[0];
    const temp = units === "celsius"
      ? `${current.temp_C}°C`
      : `${current.temp_F}°F`;

    return {
      content: [
        {
          type: "text",
          text: `Weather in ${city}: ${temp}, ${current.weatherDesc[0].value}. ` +
                `Humidity: ${current.humidity}%, Wind: ${current.windspeedKmph} km/h`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

That is a complete, working MCP server. It defines one tool (`get_weather`) with typed input parameters and connects over stdio.

### Adding a Resource

You can also expose read-only data as resources:

```typescript
server.resource(
  "weather-help",
  "weather://help",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/plain",
        text: "This server provides weather data. Use the get_weather tool " +
              "with a city name to get current conditions.",
      },
    ],
  })
);
```

### Adding a Prompt

And provide reusable templates:

```typescript
server.prompt(
  "travel-weather",
  "Get weather for a travel destination with packing suggestions",
  { destination: z.string() },
  ({ destination }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `I'm planning to travel to ${destination}. ` +
                `Check the current weather and suggest what to pack.`,
        },
      },
    ],
  })
);
```

### Running and Testing

Build and test with the MCP Inspector:

```bash
npx tsc
npx @modelcontextprotocol/inspector node dist/index.js
```

The Inspector gives you a web UI to call tools, read resources, and test prompts without connecting to a full AI host.

---

## Connecting MCP Servers to Real Clients

Once your server works, connecting it to AI hosts is straightforward.

### Cursor

Create a `.cursor/mcp.json` file in your project root:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/absolute/path/to/weather-mcp-server/dist/index.js"]
    }
  }
}
```

Restart Cursor, and the weather tool appears in your available tools. The model can now call it when you ask weather-related questions.

If you are already using MCP servers in Cursor (like many developers working with [AI coding assistants](/ai-coding-assistants-guide/)), this pattern is familiar.

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/absolute/path/to/weather-mcp-server/dist/index.js"]
    }
  }
}
```

Restart Claude Desktop, and you will see a hammer icon indicating MCP tools are available.

### VS Code (GitHub Copilot)

In your VS Code settings or `.vscode/mcp.json`:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["./weather-mcp-server/dist/index.js"]
    }
  }
}
```

The configuration pattern is the same across hosts: tell the host what command to run, and MCP handles the rest.

---

## MCP Security: What You Need to Know

MCP gives AI models the ability to execute tools. That is powerful and dangerous. The protocol defines a security model, but enforcement is your responsibility.

### The Threat Model

```mermaid
flowchart TD
    User["fa:fa-user User"] --> Host["fa:fa-window-maximize Host"]
    Host --> Model["fa:fa-brain LLM"]
    Model --> Tool["fa:fa-wrench Tool Call"]
    
    Attack1["fa:fa-exclamation-triangle Prompt Injection"] -.->|"Trick model into<br>calling wrong tool"| Model
    Attack2["fa:fa-exclamation-triangle Tool Poisoning"] -.->|"Malicious tool<br>descriptions"| Tool
    Attack3["fa:fa-exclamation-triangle Data Exfiltration"] -.->|"Leak data via<br>tool arguments"| Tool

    style User fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style Host fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style Model fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
    style Tool fill:#fee2e2,stroke:#dc2626,stroke-width:2px
    style Attack1 fill:#fee2e2,stroke:#dc2626,stroke-width:1px
    style Attack2 fill:#fee2e2,stroke:#dc2626,stroke-width:1px
    style Attack3 fill:#fee2e2,stroke:#dc2626,stroke-width:1px
```

The risks are real. A malicious MCP server could define tools with misleading descriptions that trick the model. [Prompt injection attacks](/prompt-injection-explained/) could manipulate the model into calling destructive tools. Tool arguments could be used to exfiltrate sensitive data.

### Security Best Practices

**For MCP server builders:**

| Practice | What to Do |
|----------|------------|
| **Input validation** | Validate every input against your JSON Schema. Do not trust the model to send clean data |
| **Least privilege** | Only expose the minimum capabilities needed. A read-only DB tool should not have write access |
| **Sandboxing** | Run tool execution in isolated environments. Do not give MCP servers access to your entire system |
| **Rate limiting** | Limit how often tools can be called. An AI model in a loop can drain resources fast |
| **Output sanitization** | Clean tool outputs before returning them. Do not leak internal errors, stack traces, or credentials |

**For MCP host configuration:**

| Practice | What to Do |
|----------|------------|
| **Human approval** | Require user confirmation for destructive operations (delete, update, send) |
| **Local binding** | Bind local servers to `127.0.0.1`, never `0.0.0.0` |
| **Origin validation** | For HTTP servers, validate the `Origin` header to prevent DNS rebinding |
| **Auth for remote** | Use OAuth or equivalent for remote MCP servers |
| **Audit logging** | Log every tool call with timestamp, input, output, and user |

The [OWASP MCP Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html) goes deeper on threats like rug pulls (where a server changes tool definitions after approval), cross-server shadowing, and supply chain attacks. If you are deploying MCP in production, read it.

---

## The MCP Ecosystem Today

MCP adoption has grown faster than most developer protocols. Here is the current landscape.

### Hosts (AI applications with MCP support)

| Host | MCP Support | Notes |
|------|-------------|-------|
| Claude Desktop | Full | The reference implementation |
| Claude Code | Full | Terminal-based, great for development |
| Cursor | Full | IDE integration, project-level config |
| VS Code (Copilot) | Full | Via GitHub Copilot MCP support |
| ChatGPT | Growing | Added MCP support in 2025 |
| Windsurf | Full | Editor with native MCP support |

### Popular MCP Servers

The community has built MCP servers for almost every major developer tool:

- **Databases**: PostgreSQL, MySQL, MongoDB, SQLite, Redis
- **Version control**: GitHub, GitLab, Git (local)
- **Communication**: Slack, Discord, Email
- **Project management**: Jira, Linear, Notion
- **Cloud**: AWS, GCP, Cloudflare
- **Search**: Brave Search, Google Search, web scraping
- **Dev tools**: Docker, Kubernetes, Sentry, Puppeteer

Reference implementations are available at [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers). For a broader directory, [mcp-awesome.com](https://mcp-awesome.com/) maintains a searchable list of 1200+ verified community servers.

### SDKs

Official SDKs are available for:

- **TypeScript**: `@modelcontextprotocol/sdk`
- **Python**: `mcp` (PyPI)
- **Kotlin**, **Java**, and others are in development or community-maintained

---

## When to Use MCP (and When Not To)

MCP is not always the right answer. Here is a decision framework:

```mermaid
flowchart TD
    A["fa:fa-question-circle Does your tool need to<br>work with multiple AI hosts?"] -->|Yes| B["fa:fa-check-circle Build an MCP server"]
    A -->|No| C["fa:fa-question-circle Is it a one-off<br>script or integration?"]
    C -->|Yes| D["fa:fa-times-circle Direct API call<br>is simpler"]
    C -->|No| E["fa:fa-question-circle Will AI models<br>need to discover and<br>call your tools?"]
    E -->|Yes| F["fa:fa-check-circle Build an MCP server"]
    E -->|No| G["fa:fa-times-circle Regular API<br>is fine"]

    style A fill:#e0f2fe,stroke:#0284c7,stroke-width:2px
    style B fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style C fill:#e0f2fe,stroke:#0284c7,stroke-width:2px
    style D fill:#fef3c7,stroke:#d97706,stroke-width:2px
    style E fill:#e0f2fe,stroke:#0284c7,stroke-width:2px
    style F fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style G fill:#fef3c7,stroke:#d97706,stroke-width:2px
```

**Use MCP when:**
- You are building tools that multiple AI applications should be able to use
- You want AI models to discover and call your tools without hardcoded integrations
- You are building [multi-agent systems](/multi-agent-ai-swarms-system-design/) where agents need standardized tool access
- Your team uses multiple AI hosts and wants a single integration per tool

**Do not use MCP when:**
- You are building a one-off integration for a single app
- Your tool does not need to be called by AI models
- Direct API calls are simpler and you do not need cross-host compatibility
- You are just starting with [context engineering](/context-engineering/) and need to learn the basics first

---

## What is Coming Next

MCP is evolving fast. Here is what the community and specification are moving toward:

**Streamable HTTP maturity.** The newer transport mechanism (replacing the old HTTP+SSE) is becoming the standard for remote MCP servers. It enables better load balancing, session management, and horizontal scaling.

**Better authentication.** OAuth integration is being standardized across the protocol, making it easier to deploy MCP servers in enterprise environments where users need scoped access.

**Tasks (experimental).** The specification includes an experimental "Tasks" primitive for long-running, durable operations. Instead of blocking on a tool call that takes minutes, the server can return a task ID and the host can poll for completion.

**Registry and discovery.** Efforts are underway to create standard registries where MCP servers can be published, discovered, and installed, similar to how npm works for packages.

**Governance.** MCP has moved from Anthropic-only governance to a broader community model. The specification is open, and the goal is for MCP to be an industry standard, not tied to any single AI provider.

---

## Getting Started

If you made it this far, here is the fastest path to getting hands-on:

1. **Try existing MCP servers.** Install one in Cursor or Claude Desktop. The [filesystem server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) and [GitHub server](https://github.com/github/github-mcp-server) are good starting points.

2. **Build a simple server.** Follow the example in this post or the [official quickstart](https://modelcontextprotocol.io/quickstart). Wrap one of your existing APIs as an MCP tool.

3. **Read the specification.** The [MCP spec](https://modelcontextprotocol.io/specification/latest/) is well-written and not that long. Understanding the protocol details will help you build better servers.

4. **Explore the ecosystem.** Browse the [reference servers](https://github.com/modelcontextprotocol/servers) and community projects to see how others structure their MCP servers.

If you have been building [RAG applications](/building-your-first-rag-application/) or [AI agents](/building-ai-agents/), MCP is the natural next step. It takes the tools and integrations you have already built and makes them available to every AI application through a single protocol.

The era of building custom integrations for every AI tool is ending. MCP is how we connect AI to everything else.
