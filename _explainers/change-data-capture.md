---
layout: explainer
date: 2025-10-09
seo: true
title: "Change Data Capture (CDC) Explained"
subtitle: "Keeping your cache in sync with your database"
description: "Learn how Change Data Capture (CDC) works to automatically keep your cache updated when database data changes. Understand CDC patterns, use cases, and when to use this approach through simple examples and diagrams."
thumbnail: /assets/img/explainers/change-data-capture.png
share-img: /assets/img/explainers/change-data-capture.png  
permalink: /explainer/change-data-capture/
keywords: "CDC, change data capture, database sync, cache invalidation, real-time data, event-driven architecture, database replication"
tags: ["Architecture"]
social-share: true
faq:
  - question: "What is Change Data Capture (CDC)?"
    answer: "Change Data Capture (CDC) is a pattern that tracks changes in your database and automatically updates other systems like caches, search indexes, or data warehouses. Instead of polling for changes, CDC detects changes the moment they happen by reading the database's transaction log."
  - question: "How does CDC keep cache in sync with database?"
    answer: "CDC reads the database's transaction log (WAL, binlog) to detect INSERT, UPDATE, and DELETE operations. When a change is detected, CDC sends an event to connected systems like Redis cache, which then updates or invalidates the affected data automatically without any polling."
  - question: "What are the main CDC methods?"
    answer: "The three main CDC methods are: Transaction Log reading (reads database WAL/binlog, most efficient), Triggers (database triggers write changes to a table, adds overhead), and Timestamp Polling (queries for rows with updated_at > last_check, not real-time). Transaction log is preferred for production."
  - question: "What is Debezium and how does it work?"
    answer: "Debezium is an open-source CDC tool that reads transaction logs from MySQL, PostgreSQL, MongoDB, and SQL Server. It captures row-level changes and streams them to Apache Kafka, allowing downstream systems to consume and react to database changes in real-time."
  - question: "When should I use CDC vs polling?"
    answer: "Use CDC when you need real-time data sync, have multiple systems consuming the same data, or want to avoid database load from polling queries. Use polling when data rarely changes, you need simplicity over real-time, or you cannot access database transaction logs."
---

{% include explainer-head.html %}

<style>

/* Approach Demo */
.polling-demo {
  background: linear-gradient(135deg, #fef8f8 0%, #fdf2f2 100%);
  border-color: #e5b4b4;
}

.cdc-demo {
  background: linear-gradient(135deg, #f6fdf9 0%, #f0fdf4 100%);
  border-color: #bbf7d0;
}

.polling-demo .demo-title {
  color: #b91c1c;
}

.cdc-demo .demo-title {
  color: #059669;
}

/* Benefits Cards */
.benefit-card {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.1);
}

.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.2);
}

.benefit-title {
  color: #0c4a6e;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.benefit-description {
  color: #374151;
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Method Cards */
.method-section {
  margin: 50px 0;
  padding: 40px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.method-card {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);
}

.method-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(148, 163, 184, 0.2);
  border-color: #6b7280;
}

.method-title {
  color: #374151;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.method-description {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Use Cases */
.use-case-section {
  margin: 50px 0;
  padding: 40px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border: 2px solid #cbd5e1;
}

.use-case-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.use-case-list li {
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

.use-case-list li:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(148, 163, 184, 0.2);
}

.use-case-list li strong {
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
  
  .method-grid {
    grid-template-columns: 1fr;
  }
  
  .benefit-card {
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
  .method-section,
  .use-case-section {
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
  
  .benefit-card {
    padding: 18px 15px;
  }
  
  .decision-card {
    padding: 20px 15px;
  }
  
  .method-card {
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
    {% include explainer-hero.html title='Change Data Capture (CDC)' subtitle='Keeping your cache in sync with your database' %}
    
    <div class="frame-content">
      <div class="intro-card">
        <h3><i class="fas fa-sync-alt"></i> What is CDC?</h3>
        <p><strong>Change Data Capture (CDC)</strong> is a way to track changes in your database and automatically update other systems - like your cache, search index, or analytics warehouse. Instead of constantly asking "did anything change?", CDC tells you "hey, this just changed!" the moment it happens.</p>
        <p style="font-size: 0.9rem; color: #6b7280; margin-top: 10px;"><strong>Think of it like:</strong> Your database sending push notifications whenever data changes, so your cache always knows what to update.</p>
      </div>

      <div class="content-container">
        <h2 class="section-title">The Problem: Stale Cache</h2>
        
        <div class="flex-comparison">
          <div class="flex-side polling-demo">
            <h3 class="demo-title">
              <i class="fas fa-times-circle"></i>
              Without CDC
            </h3>
            
            <p style="margin-bottom: 15px;">Your cache gets out of sync with the database:</p>
            
            <div style="background: #fff; border: 2px solid #e5b4b4; border-radius: 12px; padding: 20px; margin: 15px 0;">
              <p style="margin: 0 0 10px 0; font-weight: 600; color: #991b1b;">User updates email in database</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">Cache still has old email</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0; font-weight: 600; color: #991b1b;">App shows wrong data!</p>
            </div>
            
            <p><strong>Solution?</strong> Manually clear cache or wait for it to expire. Slow and error-prone.</p>
          </div>
          
          <div class="flex-side cdc-demo">
            <h3 class="demo-title">
              <i class="fas fa-check-circle"></i>
              With CDC
            </h3>
            
            <p style="margin-bottom: 15px;">Changes automatically sync to your cache:</p>
            
            <div style="background: #fff; border: 2px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 15px 0;">
              <p style="margin: 0 0 10px 0; font-weight: 600; color: #065f46;">User updates email in database</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">CDC detects change instantly</p>
              <p style="margin: 0 0 10px 0; color: #6b7280;">↓</p>
              <p style="margin: 0; font-weight: 600; color: #065f46;">Cache updates automatically!</p>
            </div>
            
            <p><strong>Result:</strong> Cache always has fresh data. No manual work needed.</p>
          </div>
        </div>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">How CDC Works</h3>
        
<pre><code class="language-mermaid">
sequenceDiagram
    participant App
    participant Database
    participant CDC
    participant Cache
    
    App->>Database: UPDATE user email
    Database->>Database: Write to transaction log
    Database-->>App: Success
    
    Note over CDC: Continuously reads<br/>transaction log
    
    Database->>CDC: New change detected
    CDC->>Cache: Update user email
    Cache-->>CDC: Updated
    
    Note over Cache: Cache now has<br/>fresh data
    
    App->>Cache: GET user
    Cache-->>App: Returns updated email
</code></pre>
      </div>

      <div class="white-container">
        <h2 class="section-title">Key Benefits</h2>
        
        <div class="benefit-card">
          <h3 class="benefit-title">
            <i class="fas fa-bolt"></i>
            Real-Time Updates
          </h3>
          <p class="benefit-description">Changes propagate instantly. Your cache, search indexes, and other systems update as soon as data changes - no delays.</p>
        </div>
        
        <div class="benefit-card">
          <h3 class="benefit-title">
            <i class="fas fa-feather-alt"></i>
            Low Database Impact
          </h3>
          <p class="benefit-description">CDC reads from transaction logs, not your actual tables. No extra queries hitting your database - it just quietly watches the log.</p>
        </div>
        
        <div class="benefit-card">
          <h3 class="benefit-title">
            <i class="fas fa-shield-alt"></i>
            No Code Changes
          </h3>
          <p class="benefit-description">Your app doesn't need to know CDC exists. It writes to the database normally, and CDC handles the rest behind the scenes.</p>
        </div>
      </div>

      <div class="method-section">
        <h2 class="section-title">Common CDC Methods</h2>
        
        <div class="method-grid">
          <div class="method-card">
            <h3 class="method-title">
              <i class="fas fa-file-alt"></i>
              Transaction Log
            </h3>
            <p class="method-description">Reads the database's built-in transaction log (WAL, binlog, etc.). Most efficient - zero impact on database performance.</p>
            <p style="margin-top: 10px; font-size: 0.9rem; color: #059669;"><strong>Best for:</strong> Production systems</p>
          </div>
          
          <div class="method-card">
            <h3 class="method-title">
              <i class="fas fa-table"></i>
              Triggers
            </h3>
            <p class="method-description">Database triggers fire on INSERT/UPDATE/DELETE and write changes to a separate table. Simple but adds overhead to every write.</p>
            <p style="margin-top: 10px; font-size: 0.9rem; color: #d97706;"><strong>Use when:</strong> Can't access logs</p>
          </div>
          
          <div class="method-card">
            <h3 class="method-title">
              <i class="fas fa-clock"></i>
              Timestamp Polling
            </h3>
            <p class="method-description">Periodically query for rows with updated_at > last_check. Easy to set up but not real-time and adds database load.</p>
            <p style="margin-top: 10px; font-size: 0.9rem; color: #dc2626;"><strong>Avoid if:</strong> You need real-time data</p>
          </div>
        </div>
      </div>

      <div class="use-case-section">
        <h2 class="section-title">Common Use Cases</h2>
        
        <ul class="use-case-list">
          <li>
            <strong><i class="fas fa-tachometer-alt" style="color: #059669; margin-right: 10px;"></i>Cache Sync:</strong> Keep Redis or Memcached in sync with your database. User updates profile? Cache updates instantly.
          </li>
          <li>
            <strong><i class="fas fa-search" style="color: #059669; margin-right: 10px;"></i>Search Indexing:</strong> Auto-update Elasticsearch when products change. No manual reindexing needed.
          </li>
          <li>
            <strong><i class="fas fa-chart-bar" style="color: #059669; margin-right: 10px;"></i>Data Warehouse:</strong> Stream changes to your analytics database (Snowflake, BigQuery) for near real-time reporting.
          </li>
          <li>
            <strong><i class="fas fa-sync" style="color: #059669; margin-right: 10px;"></i>Microservices:</strong> Keep data synced across services. Orders service updates inventory? Warehouse service knows immediately.
          </li>
          <li>
            <strong><i class="fas fa-bell" style="color: #059669; margin-right: 10px;"></i>Event Streaming:</strong> Feed changes into Kafka for event-driven architectures and real-time processing.
          </li>
        </ul>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">CDC in Action</h3>
        
<pre><code class="language-mermaid">
graph TD
    A[PostgreSQL Database] --> B[CDC Tool<br/>Debezium/Maxwell/etc]
    
    B --> C[Redis Cache]
    B --> D[Elasticsearch]
    B --> E[Data Warehouse]
    B --> F[Kafka Stream]
    
    G[Your Application] --> A
    G --> C
    
    style A fill:#e0f2fe,stroke:#0369a1,stroke-width:2px
    style B fill:#fef3c7,stroke:#f59e0b,stroke-width:3px
    style C fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style D fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style E fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style F fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style G fill:#f3e8ff,stroke:#a855f7,stroke-width:2px
</code></pre>
        
        <p style="margin-top: 20px; color: #6b7280; font-size: 0.95rem;">CDC sits between your database and everything else, automatically keeping them in sync</p>
      </div>

      <div class="white-container">
        <h2 class="section-title">Popular CDC Tools</h2>
        
        <div style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
          <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 1.2rem;"><i class="fas fa-star" style="color: #f59e0b;"></i> Debezium</h3>
          <p style="margin: 0; color: #6b7280; line-height: 1.6;">Open-source, works with MySQL, PostgreSQL, MongoDB, SQL Server. Streams to Kafka. Industry standard.</p>
        </div>
        
        <div style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
          <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 1.2rem;"><i class="fas fa-magic" style="color: #8b5cf6;"></i> Maxwell's Daemon</h3>
          <p style="margin: 0; color: #6b7280; line-height: 1.6;">Simple CDC for MySQL. Outputs JSON. Great for getting started quickly.</p>
        </div>
        
        <div style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
          <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 1.2rem;"><i class="fas fa-cloud" style="color: #0ea5e9;"></i> AWS DMS / Fivetran</h3>
          <p style="margin: 0; color: #6b7280; line-height: 1.6;">Managed CDC services. Less setup but costs money. Good for enterprise.</p>
        </div>
      </div>

      <div class="decision-section">
        <h2 class="section-title">When to Use CDC</h2>
        
        <div class="decision-grid">
          <div class="decision-card good">
            <h3 class="decision-title">
              <i class="fas fa-check-circle"></i>
              Use CDC When
            </h3>
            <ul class="decision-list">
              <li>You need real-time data sync</li>
              <li>Multiple systems need the same data</li>
              <li>Your cache keeps getting stale</li>
              <li>Building event-driven architecture</li>
              <li>Database handles lots of writes</li>
              <li>Manual sync is too error-prone</li>
            </ul>
          </div>
          
          <div class="decision-card avoid">
            <h3 class="decision-title">
              <i class="fas fa-times-circle"></i>
              Skip CDC When
            </h3>
            <ul class="decision-list">
              <li>Data rarely changes</li>
              <li>Eventual consistency is fine</li>
              <li>Only one system uses the data</li>
              <li>Simple app with no cache</li>
              <li>Can't access database logs</li>
              <li>Team too small for complexity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

