---
layout: explainer
date: 2025-11-12
seo: true
title: "SLI, SLO, and SLA Explained"
subtitle: "Measuring and promising service reliability"
description: "Learn what SLI, SLO, and SLA mean and how they work together. Understand how to measure service quality, set targets, and make promises to users through simple examples and diagrams."
thumbnail: /assets/img/explainers/sli-slo-sla.png
share-img: /assets/img/explainers/sli-slo-sla.png
permalink: /explainer/sli-slo-sla-explained/
keywords: "SLI, SLO, SLA, service level indicator, service level objective, service level agreement, reliability, uptime, SRE"
tags: ["DevOps", "SRE"]
social-share: true
faq:
  - question: "What is the difference between SLI, SLO, and SLA?"
    answer: "SLI (Service Level Indicator) is what you measure - like latency or error rate. SLO (Service Level Objective) is your internal target - like 99.9% availability. SLA (Service Level Agreement) is the external promise to customers with consequences - like refunds if uptime drops below 99.5%."
  - question: "What is an Error Budget and how does it work?"
    answer: "Error Budget is the allowed amount of unreliability based on your SLO. With 99.9% availability SLO, your error budget is 0.1% downtime (~43 minutes/month). Teams spend error budget on deployments and changes. When budget is exhausted, focus shifts to reliability over new features."
  - question: "How do I choose good SLIs for my service?"
    answer: "Choose SLIs that reflect user experience. For APIs: request latency (p99), error rate, and availability. For data pipelines: freshness and correctness. For storage: durability and read latency. Start with 3-5 key SLIs. More isn't better - focus on what users actually care about."
  - question: "What is the difference between availability and uptime?"
    answer: "Uptime measures if the service is running. Availability measures if the service is working correctly for users. A service can have 100% uptime but poor availability if it's responding with errors or too slowly. SLOs should measure availability from the user's perspective, not just uptime."
  - question: "How do I set realistic SLO targets?"
    answer: "Start by measuring current performance as a baseline. Set SLOs slightly below current performance to allow for variations. Consider dependencies - your SLO can't exceed your dependencies' reliability. Use 9s carefully: 99.9% (43 min/month downtime) is achievable, 99.99% (4 min/month) is very hard."
---

{% include explainer-head.html %}

<style>

/* Comparison Demos */
.without-slo-demo {
  background: linear-gradient(135deg, #fef8f8 0%, #fdf2f2 100%);
  border-color: #e5b4b4;
}

.with-slo-demo {
  background: linear-gradient(135deg, #f6fdf9 0%, #f0fdf4 100%);
  border-color: #bbf7d0;
}

.without-slo-demo .demo-title {
  color: #b91c1c;
}

.with-slo-demo .demo-title {
  color: #059669;
}

/* Tier Cards */
.tier-card {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);
}

.tier-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(148, 163, 184, 0.2);
}

.tier-card.sli {
  border-color: #0ea5e9;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

.tier-card.slo {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
}

.tier-card.sla {
  border-color: #059669;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
}

.tier-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tier-card.sli .tier-title {
  color: #0c4a6e;
}

.tier-card.slo .tier-title {
  color: #6b21a8;
}

.tier-card.sla .tier-title {
  color: #065f46;
}

.tier-description {
  color: #374151;
  margin-bottom: 10px;
  line-height: 1.6;
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
  
  .tier-card {
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
  .decision-section {
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
  
  .tier-card {
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
    {% include explainer-hero.html title='SLI, SLO & SLA' subtitle='Measuring and promising service reliability' %}
    
    <div class="frame-content">
      <div class="intro-card">
        <h3><i class="fas fa-tachometer-alt"></i> What are SLI, SLO, and SLA?</h3>
        <p>These are three related ways to think about service reliability. <strong>SLI (Service Level Indicator)</strong> is what you measure, <strong>SLO (Service Level Objective)</strong> is your target goal, and <strong>SLA (Service Level Agreement)</strong> is the promise you make to customers with consequences if you break it.</p>
        <p style="font-size: 0.9rem; color: #6b7280; margin-top: 10px;"><strong>Think of it like:</strong> A pizza delivery service. SLI = actual delivery time you measure, SLO = "we aim for under 30 minutes", SLA = "free pizza if we're late."</p>
      </div>

      <div class="white-container">
        <h2 class="section-title">The Three Levels</h2>
        
        <div class="tier-card sli">
          <h3 class="tier-title">
            <i class="fas fa-chart-line"></i>
            SLI - Service Level Indicator
          </h3>
          <p class="tier-description"><strong>What it is:</strong> The actual measurement of your service performance.</p>
          <p class="tier-description"><strong>Examples:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px; color: #374151;">
            <li>Request success rate: 99.5% of requests succeeded</li>
            <li>Response time: 95% of requests completed under 200ms</li>
            <li>Uptime: Service was available 99.9% of the time</li>
            <li>Error rate: 0.2% of requests returned errors</li>
          </ul>
          <p class="tier-description" style="margin-top: 15px;"><strong>Think:</strong> This is your speedometer reading - the raw data.</p>
        </div>

        <div class="tier-card slo">
          <h3 class="tier-title">
            <i class="fas fa-bullseye"></i>
            SLO - Service Level Objective
          </h3>
          <p class="tier-description"><strong>What it is:</strong> Your internal target for service performance.</p>
          <p class="tier-description"><strong>Examples:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px; color: #374151;">
            <li>We aim for 99.9% uptime</li>
            <li>99% of requests should finish under 300ms</li>
            <li>Error rate should stay below 0.1%</li>
            <li>API should respond within 500ms for 95% of calls</li>
          </ul>
          <p class="tier-description" style="margin-top: 15px;"><strong>Think:</strong> This is your speed limit - what you're aiming for.</p>
        </div>

        <div class="tier-card sla">
          <h3 class="tier-title">
            <i class="fas fa-file-contract"></i>
            SLA - Service Level Agreement
          </h3>
          <p class="tier-description"><strong>What it is:</strong> A formal promise to customers with consequences.</p>
          <p class="tier-description"><strong>Examples:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px; color: #374151;">
            <li>We guarantee 99.5% uptime or you get a refund</li>
            <li>10% credit if monthly uptime drops below 99.9%</li>
            <li>25% credit if we're down more than 1 hour per month</li>
            <li>Full refund if availability is below 99%</li>
          </ul>
          <p class="tier-description" style="margin-top: 15px;"><strong>Think:</strong> This is a legal contract - break it and you pay up.</p>
        </div>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">How They Work Together</h3>
        
<pre><code class="language-mermaid">
graph TD
    A[Measure Service] --> B[SLI: Actual Numbers]
    B --> C{Compare to Target}
    C --> D[SLO: Internal Goal]
    D --> E{Meeting Goal?}
    E -->|Yes| F[Keep Going]
    E -->|No| G[Fix Issues]
    D --> H[SLA: Customer Promise]
    H --> I{Breaking Promise?}
    I -->|No| J[All Good]
    I -->|Yes| K[Pay Penalty]
    
    style A fill:#e0f2fe,stroke:#0369a1,stroke-width:2px
    style B fill:#e0f2fe,stroke:#0369a1,stroke-width:2px
    style D fill:#f3e8ff,stroke:#8b5cf6,stroke-width:2px
    style H fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style F fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style G fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style K fill:#fecaca,stroke:#dc2626,stroke-width:2px
</code></pre>
        
        <p style="margin-top: 20px; color: #6b7280; font-size: 0.95rem;">You measure with SLIs, aim for SLOs, and promise SLAs. Your SLA should be looser than your SLO to give yourself breathing room.</p>
      </div>

      <div class="content-container">
        <h2 class="section-title">With vs Without Clear SLOs</h2>
        
        <div class="flex-comparison">
          <div class="flex-side without-slo-demo">
            <h3 class="demo-title">
              <i class="fas fa-times-circle"></i>
              No Clear Targets
            </h3>
            
            <div style="background: #fff; border: 2px solid #e5b4b4; border-radius: 12px; padding: 20px; margin: 15px 0;">
              <p style="margin: 0 0 8px 0; color: #6b7280;"><strong>Team:</strong> "Is the service fast enough?"</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;"><strong>Manager:</strong> "I don't know... feels slow?"</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;"><strong>Team:</strong> "Should we fix this bug?"</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;"><strong>Manager:</strong> "Maybe? How bad is it?"</p>
              <p style="margin: 10px 0 0 0; font-weight: 600; color: #991b1b;">No clear way to decide what's important!</p>
            </div>
            
            <p><strong>Problem:</strong> Everyone has different opinions about "good enough." Hard to prioritize work.</p>
          </div>
          
          <div class="flex-side with-slo-demo">
            <h3 class="demo-title">
              <i class="fas fa-check-circle"></i>
              With SLOs
            </h3>
            
            <div style="background: #fff; border: 2px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 15px 0;">
              <p style="margin: 0 0 8px 0; color: #6b7280;"><strong>Team:</strong> "Response time is 250ms, SLO is 200ms"</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;"><strong>Manager:</strong> "We're missing our target. Priority fix."</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;"><strong>Team:</strong> "This bug affects 0.01% of users"</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;"><strong>Manager:</strong> "Below our SLO. Can wait."</p>
              <p style="margin: 10px 0 0 0; font-weight: 600; color: #065f46;">Clear data-driven decisions!</p>
            </div>
            
            <p><strong>Result:</strong> Everyone knows the target. Easy to decide what needs attention now.</p>
          </div>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">Setting Good SLOs</h2>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 15px 0; font-size: 1.2rem;"><i class="fas fa-lightbulb"></i> Start with what you currently achieve</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">Look at your data. If you're at 99.8% uptime now, don't promise 99.99%. Set SLOs based on reality.</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #7dd3fc; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 1.2rem;"><i class="fas fa-calculator"></i> Calculate Your Downtime Budget</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">What does 99.9% uptime actually mean in practice? Use our <a href="/tools/sla-calculator/" style="color: #0c4a6e; font-weight: 600;">SLA Uptime Calculator</a> to see exactly how much downtime you can afford per day, month, and year for any uptime percentage.</p>
        </div>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 15px 0; font-size: 1.2rem;"><i class="fas fa-users"></i> Focus on what users actually care about</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">Users care if the page loads and works. They don't care about your CPU usage or memory. Pick metrics that affect user experience.</p>
        </div>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 15px 0; font-size: 1.2rem;"><i class="fas fa-balance-scale"></i> Make SLAs looser than SLOs</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">If your SLO is 99.9%, make your SLA 99.5%. This gives you room to have bad days without paying penalties.</p>
        </div>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 15px 0; font-size: 1.2rem;"><i class="fas fa-redo"></i> Review and adjust</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">SLOs aren't set in stone. If you're always exceeding them, make them stricter. If you always miss, make them more realistic.</p>
        </div>
      </div>

    </div>
  </div>
</div>

