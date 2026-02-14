---
layout: explainer
date: 2026-02-14
seo: true
title: "Quartz Cron Expressions Explained"
subtitle: "The 6-field cron format used in Java and Spring Boot"
description: "Learn how Quartz cron expressions work and how they differ from standard cron. Understand the 6-field format, special characters like ?, L, W, #, and where Quartz cron is used."
thumbnail: /assets/img/explainers/quartz-cron-thumbnail.png
share-img: /assets/img/explainers/quartz-cron-thumbnail.png
permalink: /explainer/quartz-cron-explained/
canonical_url: "https://singhajit.com/explainer/quartz-cron-explained/"
keywords: "quartz cron expression, quartz scheduler, quartz cron syntax, quartz vs cron, spring boot cron, java cron expression, quartz cron L W #, quartz cron question mark"
tags: ["Java", "DevOps"]
social-share: true
faq:
  - question: "What is a Quartz cron expression?"
    answer: "A Quartz cron expression is a 6 or 7 field string used to schedule jobs in Java applications. The fields are: second, minute, hour, day-of-month, month, day-of-week, and optionally year. It's used by Java Quartz Scheduler, Spring Boot @Scheduled, and other enterprise schedulers."
  - question: "How is Quartz cron different from standard cron?"
    answer: "Standard Unix cron has 5 fields starting from minute. Quartz has 6-7 fields starting from second. Quartz also adds special characters: ? (no specific value), L (last), W (nearest weekday), and # (nth weekday). Day-of-week numbering is 1-7 (Sunday=1) instead of 0-6."
  - question: "What does the ? mean in Quartz cron?"
    answer: "The question mark means 'no specific value'. You must use it in either day-of-month or day-of-week (not both). It tells Quartz to not constrain on that day field. For example, 0 0 9 ? * 2-6 means 9 AM on weekdays - the ? says ignore day-of-month."
  - question: "What does L mean in Quartz cron?"
    answer: "L means 'last'. In the day-of-month field, L means the last day of the month. In day-of-week, 6L means the last Friday of the month. You can also use L-3 to mean 3 days before the last day."
  - question: "What does # mean in Quartz cron?"
    answer: "The # character lets you pick the Nth occurrence of a weekday. For example, 6#3 means the 3rd Friday of the month (Friday is 6 in Quartz where Sunday=1). Valid values are 1-5 for the occurrence number."
---

{% include explainer-head.html %}

<style>

/* Quartz Field Cards */
.quartz-field-card {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);
}

.quartz-field-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(148, 163, 184, 0.2);
  border-color: #0ea5e9;
}

.field-title {
  color: #0c4a6e;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.field-description {
  color: #374151;
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Expression Breakdown */
.quartz-expression {
  display: flex;
  gap: 0;
  margin: 30px 0;
  border-radius: 12px;
  overflow: hidden;
  font-family: 'Monaco', 'Menlo', monospace;
}

.quartz-field {
  flex: 1;
  padding: 20px 10px;
  text-align: center;
  color: white;
  font-weight: 600;
}

.quartz-field.second { background: #6366f1; }
.quartz-field.minute { background: #3b82f6; }
.quartz-field.hour { background: #10b981; }
.quartz-field.day { background: #f59e0b; }
.quartz-field.month { background: #ec4899; }
.quartz-field.weekday { background: #8b5cf6; }
.quartz-field.year { background: #6b7280; }

.quartz-value {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 8px;
}

.quartz-label {
  font-size: 0.75rem;
  opacity: 0.9;
}

/* Example Cards */
.example-card {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.example-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.15);
}

.example-expression {
  background: #1e293b;
  color: #22d3ee;
  padding: 12px 15px;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 1.1rem;
  margin-bottom: 10px;
  display: inline-block;
}

.example-meaning {
  color: #374151;
  font-size: 1rem;
  line-height: 1.5;
}

/* Comparison Table */
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
}

.comparison-table th,
.comparison-table td {
  padding: 15px;
  text-align: left;
  border: 1px solid #e2e8f0;
}

.comparison-table tr:nth-child(even) {
  background: #f8fafc;
}

.comparison-table thead tr {
  background: #1e293b !important;
}

.comparison-table th {
  background: #1e293b;
  color: #f8fafc !important;
  font-weight: 700;
  font-size: 1.1rem;
}

/* Tool CTA */
.tool-cta {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: 16px;
  padding: 30px;
  margin: 40px 0;
  text-align: center;
}

.tool-cta h3 {
  color: #92400e;
  margin: 0 0 15px 0;
  font-size: 1.4rem;
}

.tool-cta p {
  color: #78350f;
  margin: 0 0 20px 0;
  font-size: 1.1rem;
}

.tool-cta a {
  display: inline-block;
  background: #f59e0b;
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.tool-cta a:hover {
  background: #d97706;
  transform: translateY(-2px);
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
  
  .quartz-expression {
    flex-direction: column;
  }
  
  .quartz-field {
    padding: 15px;
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
  
  .diagram-container {
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
  
  .quartz-field-card,
  .example-card {
    padding: 15px;
  }
  
  .section-title {
    font-size: 1.4rem;
    margin-bottom: 25px;
  }
  
  .tool-cta {
    padding: 20px 15px;
  }
}
</style>

<div class="explainer">
  <div class="explainer-frame">
    {% include explainer-hero.html title='Quartz Cron Expressions' subtitle='The 6-field cron format used in Java and Spring Boot' %}
    
    <div class="frame-content">
      <div class="intro-card">
        <h3><i class="fas fa-calendar-check"></i> What is a Quartz Cron Expression?</h3>
        <p>If you've used <a href="/explainer/cron-jobs-explained/">standard cron</a>, Quartz cron is the same idea but with a few extras. It's the scheduling format used in <strong>Java Quartz Scheduler</strong> and <strong>Spring Boot</strong>. The big difference? It has <strong>6 fields instead of 5</strong> (it adds a seconds field) and comes with special characters that standard cron doesn't have.</p>
        <p style="font-size: 0.9rem; color: #6b7280; margin-top: 10px;"><strong>Quick example:</strong> <code>0 0 9 ? * 2-6</code> means "every weekday at 9 AM, starting at 0 seconds".</p>
      </div>


      <div class="white-container">
        <h2 class="section-title">The 6 Fields</h2>
        
        <p>A Quartz cron expression has 6 required fields (plus an optional 7th for year). Standard cron starts at minute - Quartz starts at <strong>second</strong>.</p>
        
        <div class="quartz-expression">
          <div class="quartz-field second">
            <span class="quartz-value">0</span>
            <span class="quartz-label">Second<br>0-59</span>
          </div>
          <div class="quartz-field minute">
            <span class="quartz-value">0</span>
            <span class="quartz-label">Minute<br>0-59</span>
          </div>
          <div class="quartz-field hour">
            <span class="quartz-value">9</span>
            <span class="quartz-label">Hour<br>0-23</span>
          </div>
          <div class="quartz-field day">
            <span class="quartz-value">?</span>
            <span class="quartz-label">Day(M)<br>1-31</span>
          </div>
          <div class="quartz-field month">
            <span class="quartz-value">*</span>
            <span class="quartz-label">Month<br>1-12</span>
          </div>
          <div class="quartz-field weekday">
            <span class="quartz-value">2-6</span>
            <span class="quartz-label">Day(W)<br>1-7</span>
          </div>
        </div>
        
        <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <p style="margin: 0; color: #374151; font-size: 0.95rem;">
            <strong>💡 Key difference:</strong> Standard cron uses 5 fields (no seconds) and numbers weekdays 0-6 (Sunday=0). Quartz uses 6 fields and numbers weekdays 1-7 (Sunday=1).
          </p>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">Quartz vs Standard Cron</h2>
        
        <div style="overflow-x: auto;">
          <table class="comparison-table">
            <thead>
              <tr>
                <th></th>
                <th style="color: #0c4a6e; font-size: 1.1rem;">Standard Cron</th>
                <th style="color: #0c4a6e; font-size: 1.1rem;">Quartz Cron</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td style="font-weight: 600;">Fields</td>
              <td>5 (min, hr, day, month, weekday)</td>
              <td>6-7 (sec, min, hr, day, month, weekday, year)</td>
            </tr>
            <tr>
              <td style="font-weight: 600;">Seconds</td>
              <td>❌ Not supported</td>
              <td>✅ First field</td>
            </tr>
            <tr>
              <td style="font-weight: 600;">Weekday</td>
              <td>0-6 (Sunday=0)</td>
              <td>1-7 (Sunday=1)</td>
            </tr>
            <tr>
              <td style="font-weight: 600;">? character</td>
              <td>❌ Not available</td>
              <td>✅ Required in one day field</td>
            </tr>
            <tr>
              <td style="font-weight: 600;">L, W, #</td>
              <td>❌ Not available</td>
              <td>✅ Last, weekday, nth</td>
            </tr>
            <tr>
              <td style="font-weight: 600;">Used in</td>
              <td>Linux crontab, GitHub Actions, K8s</td>
              <td>Java Quartz, Spring Boot, Camunda</td>
            </tr>
            </tbody>
          </table>
        </div>
        
        <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <p style="margin: 0; color: #374151; font-size: 0.95rem;">
            <strong>⚠️ Common mistake:</strong> Pasting a 5-field Linux cron expression into a Spring Boot <code>@Scheduled</code> annotation. It won't work - you need to add <code>0</code> at the start for seconds and adjust the weekday numbers.
          </p>
        </div>
      </div>

      <div class="tool-cta">
        <h3><i class="fas fa-tools"></i> Try the Quartz Cron Tool</h3>
        <p>Parse any expression, build new ones with dropdowns, and see the next 3 run times - all in your browser.</p>
        <a href="/tools/quartz-scheduler/">Open Quartz Cron Generator →</a>
      </div>

      <div class="white-container">
        <h2 class="section-title">Special Characters</h2>
        
        <p>These are what make Quartz cron more powerful than standard cron. Standard cron supports <code>*</code>, <code>,</code>, <code>-</code>, and <code>/</code> - Quartz adds four more.</p>
        
        <div class="quartz-field-card">
          <h3 class="field-title"><code>?</code> No specific value</h3>
          <p class="field-description">Must be used in either day-of-month or day-of-week (but not both). It means "I don't care about this field". If you want to schedule by weekday, put <code>?</code> in day-of-month. If you want to schedule by day of month, put <code>?</code> in day-of-week.</p>
          <p class="field-description" style="font-size: 0.9rem; color: #6b7280;"><strong>Example:</strong> <code>0 0 9 ? * 2-6</code> - run at 9 AM on weekdays. The <code>?</code> says "don't care which day of month it is".</p>
        </div>
        
        <div class="quartz-field-card">
          <h3 class="field-title"><code>L</code> Last</h3>
          <p class="field-description">In <strong>day-of-month</strong>: <code>L</code> means the last day of the month (could be 28, 29, 30, or 31). <code>L-3</code> means 3 days before the last day.</p>
          <p class="field-description">In <strong>day-of-week</strong>: <code>6L</code> means the last Friday of the month.</p>
        </div>
        
        <div class="quartz-field-card">
          <h3 class="field-title"><code>W</code> Nearest weekday</h3>
          <p class="field-description">Only works in day-of-month. <code>15W</code> means "the nearest weekday to the 15th". If the 15th is a Saturday, it fires on Friday the 14th. If it's a Sunday, it fires on Monday the 16th. <code>LW</code> means the last weekday of the month.</p>
        </div>
        
        <div class="quartz-field-card">
          <h3 class="field-title"><code>#</code> Nth weekday</h3>
          <p class="field-description">Only works in day-of-week. <code>6#3</code> means "the 3rd Friday of the month" (Friday=6 in Quartz). <code>2#1</code> means "the 1st Monday". You can use 1-5 for the occurrence.</p>
        </div>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">How the ? Character Works</h3>
        
<pre><code class="language-mermaid">
flowchart TB
    A["0 0 9 ? * 2-6"] --> B[Quartz Parser]
    B --> C["Second: 0"]
    B --> D["Minute: 0"]
    B --> E["Hour: 9"]
    B --> F["Day of Month: ? (skip)"]
    B --> G["Month: * (every)"]
    B --> H["Day of Week: 2-6 (Mon-Fri)"]
    
    F -. ignored .-> I[Schedule]
    C --> I
    D --> I
    E --> I
    G --> I
    H --> I
    
    I --> J["Fires at 9:00:00 AM, Mon through Fri"]
</code></pre>
        
        <p style="margin-top: 20px; color: #6b7280; font-size: 0.95rem;">One of the two day fields must always use <code>?</code>. You can't constrain on both day-of-month and day-of-week at the same time.</p>
      </div>

      <div class="white-container">
        <h2 class="section-title">Common Examples</h2>
        
        <div class="example-card">
          <div class="example-expression">0 0 12 * * ?</div>
          <p class="example-meaning"><strong>Every day at noon.</strong> The classic. Second 0, minute 0, hour 12, every day.</p>
        </div>
        
        <div class="example-card">
          <div class="example-expression">0 0 9 ? * 2-6</div>
          <p class="example-meaning"><strong>Weekdays at 9 AM.</strong> Monday (2) through Friday (6). Remember, Sunday is 1 in Quartz.</p>
        </div>
        
        <div class="example-card">
          <div class="example-expression">0 0/15 * * * ?</div>
          <p class="example-meaning"><strong>Every 15 minutes.</strong> Health checks, polling, cache refresh.</p>
        </div>
        
        <div class="example-card">
          <div class="example-expression">0 0 0 L * ?</div>
          <p class="example-meaning"><strong>Last day of every month at midnight.</strong> Month-end reports. The <code>L</code> handles the varying month lengths for you.</p>
        </div>
        
        <div class="example-card">
          <div class="example-expression">0 0 0 ? * 6#3</div>
          <p class="example-meaning"><strong>Third Friday of every month at midnight.</strong> The <code>#</code> picks the Nth occurrence of a weekday.</p>
        </div>
        
        <div class="example-card">
          <div class="example-expression">0 0 0 LW * ?</div>
          <p class="example-meaning"><strong>Last weekday of every month at midnight.</strong> Combines <code>L</code> and <code>W</code> - avoids weekends.</p>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">Converting Standard Cron to Quartz</h2>
        
        <p>Got a Linux cron expression and need to use it in Spring Boot? Here's how to convert:</p>
        
        <div style="background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 12px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 14px; margin: 20px 0; line-height: 1.8;">
<span style="color: #94a3b8;"># Standard cron (5 fields)</span><br>
<span style="color: #22d3ee;">0 9 * * 1-5</span>  <span style="color: #94a3b8;">← weekdays at 9 AM</span><br>
<br>
<span style="color: #94a3b8;"># Step 1: Add seconds (0) at the start</span><br>
<span style="color: #fbbf24;">0</span> 0 9 * * 1-5<br>
<br>
<span style="color: #94a3b8;"># Step 2: Change weekday numbers (0-6 → 1-7)</span><br>
0 0 9 * * <span style="color: #fbbf24;">2-6</span><br>
<br>
<span style="color: #94a3b8;"># Step 3: Add ? to day-of-month</span><br>
0 0 9 <span style="color: #fbbf24;">?</span> * 2-6<br>
<br>
<span style="color: #94a3b8;"># Final Quartz expression</span><br>
<span style="color: #22d3ee;">0 0 9 ? * 2-6</span>  <span style="color: #94a3b8;">← same schedule, Quartz format</span>
        </div>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">Quartz Scheduler in a Spring Boot App</h3>
        
<pre><code class="language-mermaid">
flowchart TB
    subgraph SpringApp["Spring Boot Application"]
        A["@Scheduled(cron='0 0 9 ? * 2-6')"] --> B[Quartz Scheduler Engine]
        B --> C[Job Store]
        C --> D[Thread Pool]
    end
    
    D --> E[Execute Job]
    E --> F[Database Cleanup]
    E --> G[Send Emails]
    E --> H[Generate Reports]
    
    style SpringApp fill:#f0f9ff,stroke:#0369a1,stroke-width:2px
    style E fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
</code></pre>
        
        <p style="margin-top: 20px; color: #6b7280; font-size: 0.95rem;">In Spring Boot, you just annotate a method with <code>@Scheduled</code> and pass a Quartz cron expression. Spring handles the rest.</p>
      </div>

      <div class="white-container">
        <h2 class="section-title">Where Quartz Cron Is Used</h2>
        
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px; font-size: 1.1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fab fa-java" style="color: #059669; margin-right: 10px;"></i>Java Quartz Scheduler:</strong> The original. Configure triggers with <code>CronScheduleBuilder.cronSchedule("0 0 12 * * ?")</code>.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px; font-size: 1.1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-leaf" style="color: #059669; margin-right: 10px;"></i>Spring Boot:</strong> Use <code>@Scheduled(cron = "0 0 9 ? * 2-6")</code> to schedule any method.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px; font-size: 1.1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-cogs" style="color: #059669; margin-right: 10px;"></i>Apache Camel:</strong> Route scheduling with Quartz-format cron expressions.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px; font-size: 1.1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-project-diagram" style="color: #059669; margin-right: 10px;"></i>Camunda / Activiti:</strong> BPM workflow engines use Quartz cron for timer events.
          </li>
        </ul>
      </div>

      <div class="white-container" style="margin-top: 40px; padding: 30px; background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 12px;">
        <h2 class="section-title" style="margin-top: 0;">Related</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #374151; margin-bottom: 20px;">
          Quartz cron builds on top of standard cron concepts. If you're new to cron in general, start here:
        </p>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 10px; font-size: 1rem; line-height: 1.6; color: #374151;">
            <strong><i class="fas fa-clock" style="color: #059669; margin-right: 10px;"></i><a href="/explainer/cron-jobs-explained/" style="color: #0284c7; text-decoration: none;">Cron Jobs Explained</a></strong> - How standard 5-field cron works on Linux
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 10px; font-size: 1rem; line-height: 1.6; color: #374151;">
            <strong><i class="fas fa-terminal" style="color: #059669; margin-right: 10px;"></i><a href="/tools/cron-expression/" style="color: #0284c7; text-decoration: none;">Cron Expression Tool</a></strong> - Parse and build standard 5-field cron expressions
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 10px; font-size: 1rem; line-height: 1.6; color: #374151;">
            <strong><i class="fas fa-calendar-check" style="color: #059669; margin-right: 10px;"></i><a href="/tools/quartz-scheduler/" style="color: #0284c7; text-decoration: none;">Quartz Cron Tool</a></strong> - Generate and validate 6-field Quartz cron expressions
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
