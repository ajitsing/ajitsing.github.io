---
layout: explainer
date: 2026-01-25
seo: true
title: "Regular Expressions Explained"
subtitle: "Pattern matching made simple"
description: "Learn how regular expressions (regex) work with simple examples. Understand pattern matching, special characters, and common use cases. A beginner-friendly guide to regex basics."
thumbnail: /assets/img/explainers/regex-thumbnail.svg
share-img: /assets/img/explainers/regex-thumbnail.svg
permalink: /explainer/regex-explained/
keywords: "regex, regular expressions, regex tutorial, regex basics, pattern matching, regex examples, regex for beginners, regex cheat sheet, learn regex"
tags: ["Programming"]
social-share: true
faq:
  - question: "What is a regular expression (regex)?"
    answer: "A regular expression is a pattern that describes a set of strings. Think of it as a search query on steroids - instead of searching for exact text, you search for patterns. For example, you can find all email addresses in a document without knowing what they are beforehand."
  - question: "Why should I learn regex?"
    answer: "Regex saves hours of manual work. You can validate user input (emails, phone numbers), search through logs, clean up data, and do find-and-replace across thousands of files. Every programming language supports regex."
  - question: "What does the dot (.) mean in regex?"
    answer: "The dot matches any single character except newline. So 'c.t' matches 'cat', 'cut', 'c9t', or 'c@t' - any three-character string starting with 'c' and ending with 't'."
  - question: "What is the difference between * and + in regex?"
    answer: "Both are quantifiers. The asterisk (*) matches zero or more of the previous character - so 'a*' matches '', 'a', 'aa', 'aaa'. The plus (+) matches one or more - so 'a+' requires at least one 'a'. It won't match an empty string."
  - question: "How do I match the start or end of a line?"
    answer: "Use ^ for the start and $ for the end. The pattern ^Hello matches 'Hello world' but not 'Say Hello'. The pattern world$ matches 'Hello world' but not 'world peace'."
  - question: "What are capture groups in regex?"
    answer: "Capture groups are created with parentheses (). They save the matched text so you can reference it later. In the pattern (\\d{3})-(\\d{4}), the first group captures the area code and the second captures the rest of the phone number."
---

{% include explainer-head.html %}

<style>
.pattern-card {
  background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%);
  border: 2px solid #facc15;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.pattern-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(250, 204, 21, 0.2);
}

.pattern-title {
  color: #854d0e;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pattern-example {
  background: #1e293b;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.95rem;
  margin: 15px 0;
  overflow-x: auto;
}

.matches {
  color: #4ade80;
}

.no-match {
  color: #f87171;
}

.try-it-box {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 2px solid #10b981;
  border-radius: 12px;
  padding: 25px;
  margin: 30px 0;
  text-align: center;
}

.try-it-box h3 {
  color: #065f46;
  margin: 0 0 15px 0;
}

.try-it-box a {
  display: inline-block;
  background: #059669;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}

.try-it-box a:hover {
  background: #047857;
}

.cheat-sheet {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.cheat-item {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.cheat-symbol {
  background: #1e293b;
  color: #fef3c7;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
}

.cheat-desc {
  color: #374151;
  font-size: 0.95rem;
}

.diagram-container {
  margin: 40px 0;
  padding: 30px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  text-align: center;
}

.diagram-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .cheat-sheet {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .frame-content {
    padding: 20px 15px;
  }
  
  .pattern-card {
    padding: 20px 15px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.7rem;
  }
  
  .section-title {
    font-size: 1.4rem;
  }
}
</style>

<div class="explainer">
  <div class="explainer-frame">
    {% include explainer-hero.html title='Regular Expressions Explained' subtitle='Pattern matching made simple' %}
    
    <div class="frame-content">
      <div class="intro-card">
        <h3><i class="fas fa-search"></i> What is a Regular Expression?</h3>
        <p>A <strong>regular expression</strong> (regex) is a pattern you use to find text. Instead of searching for exact words, you describe what you're looking for. Want to find all email addresses in a document? All phone numbers? All dates? Regex can do that.</p>
        <p style="margin-top: 15px; color: #6b7280;">Think of it like this: if ctrl+F is a flashlight, regex is a metal detector. It finds things based on their shape, not their exact value.</p>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">How Regex Matching Works</h3>
        
<pre><code class="language-mermaid">
flowchart LR
    A[Your Pattern] --> B[Regex Engine]
    C[Input Text] --> B
    B --> D{Match?}
    D -->|Yes| E[Found matches]
    D -->|No| F[No matches]
</code></pre>
      </div>

      <div class="try-it-box">
        <h3><i class="fas fa-flask"></i> Try It Yourself</h3>
        <p style="color: #374151; margin-bottom: 15px;">Test these patterns in our interactive regex tool.</p>
        <a href="/tools/regex-tester/"><i class="fas fa-code"></i> Open Regex Tester</a>
      </div>

      <div class="white-container">
        <h2 class="section-title">The Basics</h2>
        
        <p>Most characters in regex match themselves. The pattern <code>cat</code> matches the word "cat". Simple. But regex has special characters that do more interesting things.</p>

        <div class="cheat-sheet">
          <div class="cheat-item">
            <span class="cheat-symbol">.</span>
            <span class="cheat-desc">Any character (except newline)</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">*</span>
            <span class="cheat-desc">Zero or more of previous</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">+</span>
            <span class="cheat-desc">One or more of previous</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">?</span>
            <span class="cheat-desc">Zero or one (optional)</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">^</span>
            <span class="cheat-desc">Start of line</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">$</span>
            <span class="cheat-desc">End of line</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">\d</span>
            <span class="cheat-desc">Any digit (0-9)</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">\w</span>
            <span class="cheat-desc">Any word character</span>
          </div>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">Common Patterns</h2>
        
        <div class="pattern-card">
          <h3 class="pattern-title"><i class="fas fa-at"></i> Email Address</h3>
          <div class="pattern-example">
Pattern: <span style="color: #fef3c7;">\w+@\w+\.\w+</span><br><br>
<span class="matches">✓ john@example.com</span><br>
<span class="matches">✓ test@company.org</span><br>
<span class="no-match">✗ not-an-email</span>
          </div>
          <p style="color: #374151;">This matches: one or more word characters, then @, then more word characters, a dot, and more word characters.</p>
        </div>

        <div class="pattern-card">
          <h3 class="pattern-title"><i class="fas fa-phone"></i> Phone Number</h3>
          <div class="pattern-example">
Pattern: <span style="color: #fef3c7;">\d{3}-\d{3}-\d{4}</span><br><br>
<span class="matches">✓ 555-123-4567</span><br>
<span class="matches">✓ 800-555-1234</span><br>
<span class="no-match">✗ 12345</span>
          </div>
          <p style="color: #374151;">The <code>{3}</code> means "exactly 3 times". So this matches 3 digits, a dash, 3 digits, a dash, then 4 digits.</p>
        </div>

        <div class="pattern-card">
          <h3 class="pattern-title"><i class="fas fa-calendar"></i> Date (YYYY-MM-DD)</h3>
          <div class="pattern-example">
Pattern: <span style="color: #fef3c7;">\d{4}-\d{2}-\d{2}</span><br><br>
<span class="matches">✓ 2024-01-15</span><br>
<span class="matches">✓ 1999-12-31</span><br>
<span class="no-match">✗ 01-15-2024</span>
          </div>
          <p style="color: #374151;">Four digits, dash, two digits, dash, two digits. The ISO date format.</p>
        </div>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">Character Classes</h3>
        
<pre><code class="language-mermaid">
flowchart TB
    subgraph "Character Classes"
        A["[abc]"] --> A1["Matches a, b, or c"]
        B["[a-z]"] --> B1["Any lowercase letter"]
        C["[0-9]"] --> C1["Any digit"]
        D["[^abc]"] --> D1["NOT a, b, or c"]
    end
</code></pre>
      </div>

      <div class="white-container">
        <h2 class="section-title">Capture Groups</h2>
        
        <p>Parentheses <code>()</code> create capture groups. They save what they match so you can use it later. This is super useful for extracting parts of a pattern.</p>

        <div class="pattern-example">
Pattern: <span style="color: #fef3c7;">(\w+)@(\w+)\.(\w+)</span><br><br>
Input: john@example.com<br><br>
<span style="color: #4ade80;">Group 1:</span> john<br>
<span style="color: #4ade80;">Group 2:</span> example<br>
<span style="color: #4ade80;">Group 3:</span> com
        </div>
        
        <p style="margin-top: 20px;">Now you can grab just the username, just the domain, or just the extension separately.</p>
      </div>

      <div class="white-container">
        <h2 class="section-title">Flags</h2>
        
        <p>Flags change how the regex engine works. They go after the pattern.</p>

        <div class="cheat-sheet">
          <div class="cheat-item">
            <span class="cheat-symbol">g</span>
            <span class="cheat-desc">Global - find all matches, not just the first</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">i</span>
            <span class="cheat-desc">Case insensitive - "Cat" matches "cat"</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">m</span>
            <span class="cheat-desc">Multiline - ^ and $ work on each line</span>
          </div>
          <div class="cheat-item">
            <span class="cheat-symbol">s</span>
            <span class="cheat-desc">Dot matches newlines too</span>
          </div>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">When to Use Regex</h2>
        
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
            <strong><i class="fas fa-check-circle" style="color: #059669; margin-right: 10px;"></i>Validating input</strong> - Check if emails, phone numbers, or URLs are in the right format.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
            <strong><i class="fas fa-check-circle" style="color: #059669; margin-right: 10px;"></i>Search and replace</strong> - Find patterns in text and replace them with something else.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
            <strong><i class="fas fa-check-circle" style="color: #059669; margin-right: 10px;"></i>Extracting data</strong> - Pull specific information out of logs, documents, or web pages.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
            <strong><i class="fas fa-check-circle" style="color: #059669; margin-right: 10px;"></i>Cleaning data</strong> - Remove unwanted characters or normalize formats.
          </li>
        </ul>
      </div>

      <div class="try-it-box" style="margin-top: 40px;">
        <h3><i class="fas fa-rocket"></i> Ready to Practice?</h3>
        <p style="color: #374151; margin-bottom: 15px;">The best way to learn regex is by doing. Try our interactive tool with real-time matching.</p>
        <a href="/tools/regex-tester/"><i class="fas fa-code"></i> Open Regex Tester</a>
      </div>

    </div>
  </div>
</div>
