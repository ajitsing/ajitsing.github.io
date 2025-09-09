---
layout: explainer
seo: true
title: "cURL Command Explained"
subtitle: "Master HTTP requests, API testing, and file downloads with practical cURL examples"
description: "Complete cURL command reference for developers. Learn HTTP requests, authentication, file uploads, API testing, and advanced cURL techniques with practical examples and syntax highlighting."
thumbnail: /assets/img/explainers/curl-commands.png
share-img: /assets/img/explainers/curl-commands.png  
permalink: /explainer/curl-commands/
keywords: "cURL commands, HTTP requests, API testing, REST API, command line tools, web development, developer tools, HTTP client, cURL tutorial, cURL examples, API authentication, file download, POST requests, curl, http, api, command-line, web-development, developer-tools"
social-share: true
---

<style>
body {
  background: #f5f7fa !important;
  margin: 0 !important;
  padding: 20px !important;
}

.curl-explainer {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: transparent;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

.explainer-frame {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.hero-header {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  color: white;
  padding: 50px 40px;
  text-align: center;
  position: relative;
}

.hero-header::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(135deg, #2196F3, #1976D2);
  border-radius: 0 0 20px 20px;
}

.branding {
  position: absolute;
  top: 25px;
  right: 40px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
  font-weight: 400;
  margin: 0;
}

.frame-content {
  padding: 50px 40px;
  background: white;
}

.intro-card {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 1px solid #2196F3;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 50px;
  box-shadow: 0 4px 16px rgba(33, 150, 243, 0.1);
}

.intro-card h3 {
  color: #1565c0;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.intro-card h3::before {
  content: '💡';
  margin-right: 12px;
  font-size: 1.6rem;
}

.intro-card p {
  color: #37474f;
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0;
}

.section-title {
  color: #1976D2;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 35px;
  position: relative;
  padding-left: 25px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 50px;
  background: #2196F3;
  border-radius: 3px;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
  width: 100%;
  box-sizing: border-box;
}

.command-card {
  background: #fafbfc;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e8ed;
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.command-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #2196F3;
  border-radius: 12px 12px 0 0;
}

.command-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(33, 150, 243, 0.15);
  border-color: #2196F3;
}

.command-title {
  color: #1976D2;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.command-description {
  color: #5f6368;
  font-size: 0.95rem;
  margin-bottom: 18px;
  line-height: 1.5;
}

.code-block {
  background: #263238;
  color: #eceff1;
  padding: 20px;
  border-radius: 8px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
  border-left: 4px solid #2196F3;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  word-break: break-all;
  white-space: pre-wrap;
}

.code-block .command { color: #66bb6a; }
.code-block .url { color: #42a5f5; }
.code-block .flag { color: #ef5350; }
.code-block .string { color: #ffca28; }
.code-block .comment { color: #90a4ae; font-style: italic; }

.response-example {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 13px;
  margin-top: 12px;
  border-left: 4px solid #4caf50;
}

.response-example .json-key { color: #4fc3f7; }
.response-example .json-string { color: #66bb6a; }
.response-example .json-number { color: #ffb74d; }

.tips-card {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border: 1px solid #4caf50;
  border-radius: 12px;
  padding: 35px;
  margin-top: 50px;
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.1);
}

.tips-card h3 {
  color: #2e7d32;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.tips-card h3::before {
  content: '✨';
  margin-right: 12px;
  font-size: 1.8rem;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  margin-bottom: 16px;
  padding-left: 32px;
  position: relative;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #374151;
}

.tips-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  body {
    padding: 15px !important;
    background: #f5f7fa !important;
  }
  
  .explainer-frame {
    border-radius: 16px;
    margin: 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }
  
  .hero-header {
    padding: 35px 20px;
    text-align: center;
    position: relative;
    background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  }
  
  .hero-header::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(135deg, #2196F3, #1976D2);
    border-radius: 0 0 16px 16px;
  }
  
  .hero-title {
    font-size: 2.2rem;
    line-height: 1.1;
    margin-bottom: 12px;
    font-weight: 800;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .hero-subtitle {
    font-size: 1rem;
    line-height: 1.4;
    opacity: 0.95;
  }
  
  .branding {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 13px;
    padding: 8px 16px;
    margin-bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .frame-content {
    padding: 30px 20px;
    background: white;
  }
  
  .intro-card {
    padding: 25px 20px;
    margin-bottom: 35px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 1px solid #2196F3;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(33, 150, 243, 0.1);
  }
  
  .intro-card h3 {
    font-size: 1.2rem;
    margin-bottom: 12px;
    color: #1565c0;
    font-weight: 700;
  }
  
  .intro-card h3::before {
    font-size: 1.4rem;
    margin-right: 10px;
  }
  
  .intro-card p {
    font-size: 0.95rem;
    color: #37474f;
    line-height: 1.6;
  }
  
  .section-title {
    font-size: 1.7rem;
    padding-left: 20px;
    margin-bottom: 25px;
    color: #1976D2;
    font-weight: 700;
  }
  
  .section-title::before {
    height: 35px;
    width: 4px;
    background: #2196F3;
  }
  
  .commands-grid {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-bottom: 45px;
    width: 100%;
    padding: 0;
  }
  
  .command-card {
    padding: 20px;
    border-radius: 12px;
    background: #fafbfc;
    border: 1px solid #e1e8ed;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    position: relative;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  .command-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #2196F3;
    border-radius: 12px 12px 0 0;
  }
  
  .command-title {
    font-size: 1.15rem;
    margin-bottom: 8px;
    color: #1976D2;
    font-weight: 600;
  }
  
  .command-description {
    font-size: 0.9rem;
    margin-bottom: 16px;
    line-height: 1.5;
    color: #5f6368;
  }
  
  .code-block {
    padding: 16px;
    font-size: 12px;
    line-height: 1.4;
    border-radius: 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    background: #263238;
    color: #eceff1;
    border-left: 4px solid #2196F3;
    width: 100%;
    box-sizing: border-box;
    word-break: break-all;
    white-space: pre-wrap;
  }
  
  .response-example {
    padding: 14px;
    font-size: 11px;
    margin-top: 12px;
    background: #1e1e1e;
    color: #d4d4d4;
    border-left: 4px solid #4caf50;
    border-radius: 6px;
  }
  
  .tips-card {
    padding: 25px 20px;
    margin-top: 40px;
    background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
    border: 1px solid #4caf50;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.1);
  }
  
  .tips-card h3 {
    font-size: 1.4rem;
    margin-bottom: 18px;
    color: #2e7d32;
    font-weight: 700;
  }
  
  .tips-card h3::before {
    font-size: 1.6rem;
    margin-right: 10px;
  }
  
  .tips-list li {
    font-size: 0.95rem;
    margin-bottom: 12px;
    padding-left: 25px;
    line-height: 1.5;
    color: #374151;
  }
  
  .tips-list li::before {
    font-size: 1rem;
    color: #10b981;
  }
@media (max-width: 480px) {
  body {
    padding: 10px !important;
    background: #f5f7fa !important;
  }
  
  .explainer-frame {
    border-radius: 12px;
    margin: 0;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid #e2e8f0;
    overflow: hidden;
    background: white;
  }
  
  .hero-header {
    padding: 30px 15px;
    background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
    text-align: center;
    position: relative;
  }
  
  .hero-header::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(135deg, #2196F3, #1976D2);
    border-radius: 0 0 12px 12px;
  }
  
  .hero-title {
    font-size: 1.9rem;
    text-align: center;
    font-weight: 800;
    margin-bottom: 10px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
    text-align: center;
    opacity: 0.95;
  }
  
  .branding {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(255, 255, 255, 0.25);
    font-size: 11px;
    padding: 6px 12px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  
  .frame-content {
    padding: 25px 15px;
    background: white;
  }
  
  .intro-card {
    padding: 20px 15px;
    border-radius: 10px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 1px solid #2196F3;
    box-shadow: 0 4px 16px rgba(33, 150, 243, 0.1);
    margin-bottom: 30px;
  }
  
  .section-title {
    font-size: 1.5rem;
    padding-left: 18px;
    color: #1976D2;
    font-weight: 700;
  }
  
  .section-title::before {
    background: #2196F3;
    height: 30px;
    width: 4px;
  }
  
  .command-card {
    padding: 18px 15px;
    border-radius: 10px;
    background: #fafbfc;
    border: 1px solid #e1e8ed;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    position: relative;
  }
  
  .command-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #2196F3;
    border-radius: 10px 10px 0 0;
  }
  
  .code-block {
    padding: 14px;
    font-size: 11px;
    border-left-width: 3px;
    background: #263238;
    color: #eceff1;
    border-left-color: #2196F3;
    border-radius: 6px;
  }
  
  .tips-card {
    padding: 20px 15px;
    border-radius: 10px;
    background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
    border: 1px solid #4caf50;
    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.1);
  }
}

/* Improve touch targets and scrolling */
@media (max-width: 768px) {
  .command-card {
    -webkit-tap-highlight-color: rgba(33, 150, 243, 0.1);
    touch-action: manipulation;
  }
  
  .command-card:active {
    transform: translateY(-2px);
    transition: transform 0.1s;
  }
  
  .code-block {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }
  
  .code-block::-webkit-scrollbar {
    height: 4px;
  }
  
  .code-block::-webkit-scrollbar-thumb {
    background: rgba(33, 150, 243, 0.3);
    border-radius: 2px;
  }
  
  /* Improve text selection on mobile */
  .code-block {
    -webkit-user-select: all;
    user-select: all;
  }
  
  /* Better spacing for thumbs */
  .tips-list li {
    min-height: 44px;
    display: flex;
    align-items: flex-start;
    padding-top: 8px;
  }
}
</style>

<!-- SEO: Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "cURL Command Examples - Complete Developer Guide",
  "description": "Complete cURL command reference for developers. Learn HTTP requests, authentication, file uploads, API testing, and advanced cURL techniques with practical examples.",
  "author": {
    "@type": "Person",
    "name": "Ajit Singh",
    "url": "https://github.com/ajitsing"
  },
  "publisher": {
    "@type": "Person",
    "name": "Ajit Singh",
    "url": "https://ajitsing.github.io"
  },
  "datePublished": "2025-09-08",
  "dateModified": "2025-09-08",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://ajitsing.github.io/explainer/curl-commands/"
  },
  "articleSection": "Web Development",
  "keywords": ["cURL", "HTTP requests", "API testing", "command line", "web development"],
  "about": [
    {
      "@type": "Thing",
      "name": "cURL"
    },
    {
      "@type": "Thing", 
      "name": "HTTP Client"
    },
    {
      "@type": "Thing",
      "name": "API Testing"
    }
  ],
  "teaches": [
    "Basic cURL GET and POST requests",
    "cURL authentication methods",
    "File uploads and downloads with cURL",
    "Advanced cURL options and flags",
    "API testing with cURL"
  ]
}
</script>

<!-- SEO: Additional Meta Tags -->
<meta name="robots" content="index, follow">
<meta name="author" content="Ajit Singh">
<meta property="article:author" content="Ajit Singh">
<meta property="article:section" content="Web Development">
<meta property="article:tag" content="cURL">
<meta property="article:tag" content="HTTP">
<meta property="article:tag" content="API Testing">
<meta property="article:tag" content="Command Line">
<meta property="article:tag" content="Web Development">

<div class="curl-explainer">
  <div class="explainer-frame">
    <div class="hero-header">
      <div class="branding">@Ajit5ingh</div>
      <h1 class="hero-title">cURL Commands</h1>
      <p class="hero-subtitle">Essential HTTP client commands every developer should know</p>
    </div>

    <div class="frame-content">
    <div class="intro-card">
      <h3>What is cURL?</h3>
      <p>cURL is a command-line tool for making HTTP requests. Think of it as your browser's developer tools, but for the terminal. It lets you send requests, download files, and test APIs without opening a browser.</p>
    </div>

    <h2 class="section-title">Basic Requests</h2>
    <div class="commands-grid">
      <div class="command-card">
        <div class="command-title">Simple GET Request</div>
        <div class="command-description">The most basic way to fetch data from an API</div>
        <div class="code-block">
<span class="command">curl</span> <span class="url">https://api.github.com/users/octocat</span>
        </div>
        <div class="response-example">
{
  <span class="json-key">"login"</span>: <span class="json-string">"octocat"</span>,
  <span class="json-key">"id"</span>: <span class="json-number">1</span>,
  <span class="json-key">"name"</span>: <span class="json-string">"The Octocat"</span>
}
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">POST Request with JSON</div>
        <div class="command-description">Send data to create or update resources</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-X POST</span> \
  <span class="flag">-H</span> <span class="string">"Content-Type: application/json"</span> \
  <span class="flag">-d</span> <span class="string">'{"name":"John","email":"john@example.com"}'</span> \
  <span class="url">https://api.example.com/users</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">Download a File</div>
        <div class="command-description">Save content directly to your local machine</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-o</span> filename.zip <span class="url">https://example.com/file.zip</span>

<span class="comment"># Or use the remote filename</span>
<span class="command">curl</span> <span class="flag">-O</span> <span class="url">https://example.com/file.zip</span>
        </div>
      </div>
    </div>

    <h2 class="section-title">Authentication Examples</h2>
    <div class="commands-grid">
      <div class="command-card">
        <div class="command-title">Basic Auth</div>
        <div class="command-description">Username and password authentication</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-u</span> username:password <span class="url">https://api.example.com/data</span>

<span class="comment"># Or encode it yourself</span>
<span class="command">curl</span> <span class="flag">-H</span> <span class="string">"Authorization: Basic dXNlcjpwYXNz"</span> <span class="url">https://api.example.com/data</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">Bearer Token</div>
        <div class="command-description">API token authentication (most common for modern APIs)</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-H</span> <span class="string">"Authorization: Bearer your-token-here"</span> \
  <span class="url">https://api.example.com/protected</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">API Key in Header</div>
        <div class="command-description">Custom header for API key authentication</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-H</span> <span class="string">"X-API-Key: your-api-key"</span> \
  <span class="url">https://api.example.com/data</span>
        </div>
      </div>
    </div>

    <h2 class="section-title">Advanced Usage</h2>
    <div class="commands-grid">
      <div class="command-card">
        <div class="command-title">Follow Redirects</div>
        <div class="command-description">Automatically follow HTTP redirects</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-L</span> <span class="url">https://bit.ly/short-url</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">Show Response Headers</div>
        <div class="command-description">Include headers in the output for debugging</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-i</span> <span class="url">https://api.example.com/data</span>

<span class="comment"># Or just headers</span>
<span class="command">curl</span> <span class="flag">-I</span> <span class="url">https://api.example.com/data</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">Upload a File</div>
        <div class="command-description">Send files via form data or multipart</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-X POST</span> \
  <span class="flag">-F</span> <span class="string">"file=@/path/to/file.jpg"</span> \
  <span class="flag">-F</span> <span class="string">"description=My photo"</span> \
  <span class="url">https://api.example.com/upload</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">Set Timeout</div>
        <div class="command-description">Prevent hanging on slow connections</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">--connect-timeout 10</span> \
  <span class="flag">--max-time 30</span> \
  <span class="url">https://api.example.com/data</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">Ignore SSL Errors</div>
        <div class="command-description">Skip certificate validation (use carefully!)</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-k</span> <span class="url">https://self-signed.example.com</span>

<span class="comment"># Or be more specific</span>
<span class="command">curl</span> <span class="flag">--insecure</span> <span class="url">https://self-signed.example.com</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">Save Cookies</div>
        <div class="command-description">Handle session cookies for authenticated flows</div>
        <div class="code-block">
<span class="comment"># Save cookies</span>
<span class="command">curl</span> <span class="flag">-c</span> cookies.txt <span class="url">https://example.com/login</span>

<span class="comment"># Use saved cookies</span>
<span class="command">curl</span> <span class="flag">-b</span> cookies.txt <span class="url">https://example.com/dashboard</span>
        </div>
      </div>
    </div>

    <h2 class="section-title">Testing Different HTTP Methods</h2>
    <div class="commands-grid">
      <div class="command-card">
        <div class="command-title">PUT Request</div>
        <div class="command-description">Update an existing resource</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-X PUT</span> \
  <span class="flag">-H</span> <span class="string">"Content-Type: application/json"</span> \
  <span class="flag">-d</span> <span class="string">'{"name":"Updated Name"}'</span> \
  <span class="url">https://api.example.com/users/123</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">DELETE Request</div>
        <div class="command-description">Remove a resource</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-X DELETE</span> \
  <span class="flag">-H</span> <span class="string">"Authorization: Bearer token"</span> \
  <span class="url">https://api.example.com/users/123</span>
        </div>
      </div>

      <div class="command-card">
        <div class="command-title">PATCH Request</div>
        <div class="command-description">Partial updates to a resource</div>
        <div class="code-block">
<span class="command">curl</span> <span class="flag">-X PATCH</span> \
  <span class="flag">-H</span> <span class="string">"Content-Type: application/json"</span> \
  <span class="flag">-d</span> <span class="string">'{"email":"new@example.com"}'</span> \
  <span class="url">https://api.example.com/users/123</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>
