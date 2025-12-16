---
layout: explainer
date: 2025-12-16
seo: true
title: "MCP Explained"
subtitle: "Connecting AI assistants to your tools and data"
description: "Learn what Model Context Protocol (MCP) is and how it helps AI assistants connect to external tools, databases, and services. Understand when to use MCP through simple examples and diagrams."
thumbnail: /assets/img/explainers/mcp-thumbnail.png
share-img: /assets/img/explainers/mcp-thumbnail.png
permalink: /explainer/mcp-explained/
keywords: "MCP, Model Context Protocol, AI tools, AI integrations, Claude, LLM tools, AI agents, function calling"
tags: ["AI"]
social-share: true
---

{% include explainer-head.html %}

<style>

/* Comparison Demos */
.without-mcp-demo {
  background: linear-gradient(135deg, #fef8f8 0%, #fdf2f2 100%);
  border-color: #e5b4b4;
}

.with-mcp-demo {
  background: linear-gradient(135deg, #f6fdf9 0%, #f0fdf4 100%);
  border-color: #bbf7d0;
}

.without-mcp-demo .demo-title {
  color: #b91c1c;
}

.with-mcp-demo .demo-title {
  color: #059669;
}

/* Feature Cards */
.feature-card {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.1);
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.2);
}

.feature-title {
  color: #0c4a6e;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.feature-description {
  color: #374151;
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Tools Section */
.tools-section {
  margin: 50px 0;
  padding: 40px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border: 2px solid #cbd5e1;
}

.tools-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tools-list li {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #374151;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);
}

.tools-list li:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(148, 163, 184, 0.2);
}

.tools-list li strong {
  color: #1e40af;
  font-weight: 700;
}

/* Decision Section */
.decision-section {
  margin: 50px 0;
  padding: 40px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
}

.decision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 30px 0;
}

.decision-card {
  padding: 25px;
  border-radius: 12px;
  border: 3px solid;
  background: white;
}

.decision-card.good {
  border-color: #059669;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
}

.decision-card.avoid {
  border-color: #b91c1c;
  background: linear-gradient(135deg, #fef2f2 0%, #fef2f2 100%);
}

.decision-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.decision-card.good .decision-title {
  color: #059669;
}

.decision-card.avoid .decision-title {
  color: #b91c1c;
}

.decision-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.decision-list li {
  margin-bottom: 10px;
  padding-left: 25px;
  position: relative;
  line-height: 1.6;
  color: #374151;
}

.decision-card.good .decision-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #059669;
  font-weight: bold;
}

.decision-card.avoid .decision-list li::before {
  content: "✗";
  position: absolute;
  left: 0;
  color: #b91c1c;
  font-weight: bold;
}

/* Diagram Container */
.diagram-container {
  margin: 40px 0;
  padding: 30px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  text-align: center;
}

.diagram-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 25px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  body {
    padding: 10px !important;
  }
  
  .explainer-frame {
    margin: 0;
    border-radius: 12px;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-header {
    padding: 30px 20px;
  }
  
  .frame-content {
    padding: 20px 15px;
  }
  
  .decision-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .feature-card {
    padding: 20px 15px;
  }
  
  .branding {
    position: static;
    display: inline-block;
    margin-bottom: 15px;
    font-size: 14px;
    padding: 8px 16px;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .diagram-container,
  .decision-section,
  .tools-section {
    margin: 30px 0;
    padding: 25px 15px;
  }
}

@media (max-width: 480px) {
  .hero-header {
    padding: 25px 15px;
  }
  
  .hero-title {
    font-size: 1.8rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
  }
  
  .frame-content {
    padding: 15px 10px;
  }
  
  .intro-card {
    padding: 15px;
    margin-bottom: 25px;
  }
  
  .feature-card {
    padding: 18px 15px;
  }
  
  .decision-card {
    padding: 20px 15px;
  }
  
  .section-title {
    font-size: 1.4rem;
    margin-bottom: 25px;
  }
}
</style>

<div class="explainer">
  <div class="explainer-frame">
    {% include explainer-hero.html title='MCP Explained' subtitle='Connecting AI assistants to your tools and data' %}
    
    <div class="frame-content">
      <div class="intro-card">
        <h3><i class="fas fa-plug"></i> What is MCP?</h3>
        <p><strong>Model Context Protocol (MCP)</strong> is a standard way for AI assistants to connect with external tools and data sources. Instead of the AI being stuck with just what it knows, MCP lets it talk to databases, APIs, file systems, and other services. Think of it as USB for AI - a common plug that works with many different things.</p>
        <p style="font-size: 0.9rem; color: #6b7280; margin-top: 10px;"><strong>Created by:</strong> Anthropic (the company behind Claude) released MCP in late 2024 as an open standard anyone can use.</p>
      </div>

      <div class="content-container">
        <h2 class="section-title">The Problem: AI in a Bubble</h2>
        
        <div class="flex-comparison">
          <div class="flex-side without-mcp-demo">
            <h3 class="demo-title">
              <i class="fas fa-times-circle"></i>
              Without MCP
            </h3>
            
            <p style="margin-bottom: 15px;">AI assistants are isolated:</p>
            
            <div style="background: #fff; border: 2px solid #e5b4b4; border-radius: 12px; padding: 20px; margin: 15px 0;">
              <p style="margin: 0 0 10px 0; font-weight: 600; color: #991b1b;">You want AI to check your database</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">Build custom integration from scratch</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">Each tool needs different code</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0; font-weight: 600; color: #991b1b;">Lots of work, hard to maintain</p>
            </div>
            
            <p><strong>Problem:</strong> Every integration is custom. Same work repeated for each AI tool.</p>
          </div>
          
          <div class="flex-side with-mcp-demo">
            <h3 class="demo-title">
              <i class="fas fa-check-circle"></i>
              With MCP
            </h3>
            
            <p style="margin-bottom: 15px;">One standard protocol for everything:</p>
            
            <div style="background: #fff; border: 2px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 15px 0;">
              <p style="margin: 0 0 10px 0; font-weight: 600; color: #065f46;">You want AI to check your database</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">Use existing MCP server for databases</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">AI connects using MCP protocol</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0; font-weight: 600; color: #065f46;">Works with any MCP-compatible AI!</p>
            </div>
            
            <p><strong>Result:</strong> Build once, works with many AI tools. Community shares integrations.</p>
          </div>
        </div>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">How MCP Works</h3>
        
<pre><code class="language-mermaid">
graph TB
    AI[AI Assistant - Claude, etc.] <--> MC[MCP Client]
    
    MC <--> MS1[MCP Server - Files]
    MC <--> MS2[MCP Server - Database]
    MC <--> MS3[MCP Server - GitHub]
    MC <--> MS4[MCP Server - Slack]
    
    MS1 <--> F[Local Files]
    MS2 <--> DB[(Database)]
    MS3 <--> GH[GitHub API]
    MS4 <--> SL[Slack API]
    
    style AI fill:#e0f2fe,stroke:#0369a1,stroke-width:2px
    style MC fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style MS1 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style MS2 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style MS3 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style MS4 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
</code></pre>
        
        <p style="margin-top: 20px; color: #6b7280; font-size: 0.95rem;">The AI talks to an MCP client, which connects to multiple MCP servers. Each server handles a specific tool or data source.</p>
      </div>

      <div class="white-container">
        <h2 class="section-title">Key Concepts</h2>
        
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 12px; font-size: 1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-server" style="color: #0ea5e9; margin-right: 10px;"></i>MCP Server:</strong> A small program that exposes tools and data. One server per integration (files, database, API, etc.)
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 12px; font-size: 1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-desktop" style="color: #0ea5e9; margin-right: 10px;"></i>MCP Client:</strong> Lives inside the AI app (like Claude Desktop). Connects to servers and translates requests.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 12px; font-size: 1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-tools" style="color: #0ea5e9; margin-right: 10px;"></i>Tools:</strong> Actions the AI can take - like "read file", "run query", or "send message". Servers expose these.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 12px; font-size: 1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-database" style="color: #0ea5e9; margin-right: 10px;"></i>Resources:</strong> Data the AI can read - files, database records, API responses. Servers provide access to these.
          </li>
        </ul>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">MCP Communication Flow</h3>
        
<pre><code class="language-mermaid">
sequenceDiagram
    participant User
    participant AI as AI Assistant
    participant Client as MCP Client
    participant Server as MCP Server
    participant Tool as External Tool
    
    User->>AI: "What files are in my project?"
    AI->>Client: List files request
    Client->>Server: tools/call: list_files
    Server->>Tool: Read directory
    Tool-->>Server: File list
    Server-->>Client: Results
    Client-->>AI: File list data
    AI-->>User: "Here are your files..."
</code></pre>
      </div>

      <div class="white-container">
        <h2 class="section-title">What Can You Do With MCP?</h2>
        
        <div class="feature-card">
          <h3 class="feature-title">
            <i class="fas fa-folder-open"></i>
            Access Local Files
          </h3>
          <p class="feature-description">Let the AI read, search, and work with files on your computer. Great for coding assistants that need to understand your project.</p>
        </div>
        
        <div class="feature-card">
          <h3 class="feature-title">
            <i class="fas fa-database"></i>
            Query Databases
          </h3>
          <p class="feature-description">Connect to PostgreSQL, MySQL, SQLite and run queries. AI can answer questions about your data directly.</p>
        </div>
        
        <div class="feature-card">
          <h3 class="feature-title">
            <i class="fas fa-code-branch"></i>
            Use Developer Tools
          </h3>
          <p class="feature-description">GitHub, GitLab, Jira - AI can read issues, create PRs, check build status. Fits into your existing workflow.</p>
        </div>
        
        <div class="feature-card">
          <h3 class="feature-title">
            <i class="fas fa-globe"></i>
            Connect to APIs
          </h3>
          <p class="feature-description">Weather, stocks, internal company APIs - wrap any API in an MCP server and AI can use it.</p>
        </div>
      </div>

      <div class="tools-section">
        <h2 class="section-title">Popular MCP Servers</h2>
        
        <ul class="tools-list">
          <li>
            <strong><i class="fas fa-folder" style="color: #059669; margin-right: 10px;"></i>Filesystem:</strong> Read and search files in allowed directories. Built by Anthropic.
          </li>
          <li>
            <strong><i class="fab fa-github" style="color: #059669; margin-right: 10px;"></i>GitHub:</strong> Manage repos, issues, PRs. Search code across your projects.
          </li>
          <li>
            <strong><i class="fas fa-database" style="color: #059669; margin-right: 10px;"></i>PostgreSQL/SQLite:</strong> Run read-only queries against your databases.
          </li>
          <li>
            <strong><i class="fab fa-slack" style="color: #059669; margin-right: 10px;"></i>Slack:</strong> Read messages, search channels, post updates.
          </li>
          <li>
            <strong><i class="fas fa-search" style="color: #059669; margin-right: 10px;"></i>Brave Search:</strong> Web search for AI to find current information.
          </li>
        </ul>
        
        <p style="margin-top: 20px; color: #6b7280; font-size: 0.95rem; text-align: center;">More servers available at <a href="https://github.com/modelcontextprotocol/servers" style="color: #0284c7;">github.com/modelcontextprotocol/servers</a></p>
      </div>

    </div>
  </div>
</div>

