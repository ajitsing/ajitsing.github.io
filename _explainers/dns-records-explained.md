---
layout: explainer
date: 2025-11-05
seo: true
title: "DNS Records Explained"
subtitle: "Understanding A, CNAME, MX, TXT, and other DNS record types"
description: "Learn about different DNS record types like A, AAAA, CNAME, MX, TXT, and NS records. Understand what each record does, when to use them, and how they work together to make the internet function."
thumbnail: /assets/img/posts/dns/dns-explained.png
share-img: /assets/img/posts/dns/dns-explained.png
permalink: /explainer/dns-records-explained/
keywords: "DNS records, A record, CNAME, MX record, TXT record, DNS explained, domain name system, nameserver"
social-share: true
---

{% include explainer-head.html %}

<style>

/* Record Type Cards */
.record-card {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.1);
}

.record-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.2);
}

.record-title {
  color: #0c4a6e;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.record-description {
  color: #374151;
  margin-bottom: 15px;
  line-height: 1.6;
  font-size: 1.05rem;
}

.record-example {
  background: #1e293b;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  margin-top: 15px;
  overflow-x: auto;
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
  
  .record-card {
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
  
  .record-card {
    padding: 18px 15px;
  }
  
  .section-title {
    font-size: 1.4rem;
    margin-bottom: 25px;
  }
}
</style>

<div class="explainer">
  <div class="explainer-frame">
    {% include explainer-hero.html title='DNS Records Explained' subtitle='Understanding A, CNAME, MX, TXT, and other DNS record types' %}
    
    <div class="frame-content">
      <div class="intro-card">
        <h3><i class="fas fa-database"></i> What are DNS Records?</h3>
        <p>DNS records are like entries in a phone book for the internet. When you type "google.com" into your browser, DNS records tell your computer where to actually go - what IP address to connect to, where to send emails, and other important information. Each type of DNS record has a specific job.</p>
        <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <p style="margin: 0; color: #374151; font-size: 0.95rem;">
            <strong>📖 Want to learn more?</strong> Check out our detailed guide on <a href="/how-dns-works-complete-guide/" style="color: #0369a1; text-decoration: underline;">What Actually Happens When You Type a URL</a> to understand the complete DNS lookup process.
          </p>
        </div>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">How DNS Lookup Works</h3>
        
<pre><code class="language-mermaid">
sequenceDiagram
    participant User
    participant Browser
    participant DNS
    participant Server
    
    User->>Browser: Types "example.com"
    Browser->>DNS: Where is example.com?
    DNS->>DNS: Checks DNS records
    DNS-->>Browser: IP: 93.184.216.34
    Browser->>Server: Connect to 93.184.216.34
    Server-->>Browser: Website content
    Browser-->>User: Shows website
</code></pre>
      </div>

      <div class="white-container">
        <h2 class="section-title">Common DNS Record Types</h2>
        
        <div class="record-card">
          <h3 class="record-title">
            <i class="fas fa-map-marker-alt"></i>
            A Record (Address)
          </h3>
          <p class="record-description">Points your domain to an IPv4 address. This is the most basic and common DNS record - it tells browsers where your website lives.</p>
          <div class="record-example">
example.com    A    93.184.216.34
          </div>
          <p style="margin-top: 15px; color: #6b7280; font-size: 0.95rem;"><strong>Use it for:</strong> Pointing your main domain to your web server.</p>
        </div>
        
        <div class="record-card">
          <h3 class="record-title">
            <i class="fas fa-network-wired"></i>
            AAAA Record (IPv6 Address)
          </h3>
          <p class="record-description">Same as A record but for IPv6 addresses. IPv6 is the newer internet addressing system with way more addresses available.</p>
          <div class="record-example">
example.com    AAAA    2606:2800:220:1:248:1893:25c8:1946
          </div>
          <p style="margin-top: 15px; color: #6b7280; font-size: 0.95rem;"><strong>Use it for:</strong> Supporting IPv6-enabled devices and future-proofing your site.</p>
        </div>
        
        <div class="record-card">
          <h3 class="record-title">
            <i class="fas fa-link"></i>
            CNAME Record (Canonical Name)
          </h3>
          <p class="record-description">Creates an alias that points to another domain name. Like a nickname - when someone uses the alias, DNS automatically redirects them to the real name.</p>
          <div class="record-example">
<span style="color: #22d3ee;">www.example.com</span>     CNAME    <span style="color: #34d399;">example.com</span><br>
<span style="color: #94a3b8;"># alias "www.example.com" points to "example.com"</span><br>
<br>
<span style="color: #22d3ee;">blog.example.com</span>    CNAME    <span style="color: #34d399;">myblog.wordpress.com</span><br>
<span style="color: #94a3b8;"># alias "blog.example.com" points to "myblog.wordpress.com"</span>
          </div>
          <p style="margin-top: 15px; color: #6b7280; font-size: 0.95rem;"><strong>Use it for:</strong> Creating subdomains or pointing to external services like CDNs.</p>
        </div>
        
        <div class="record-card">
          <h3 class="record-title">
            <i class="fas fa-envelope"></i>
            MX Record (Mail Exchange)
          </h3>
          <p class="record-description">Tells email services where to deliver mail for your domain. You can have multiple MX records with different priorities - lower numbers get tried first.</p>
          <div class="record-example">
example.com    MX    10    mail1.example.com<br>
example.com    MX    20    mail2.example.com
          </div>
          <p style="margin-top: 15px; color: #6b7280; font-size: 0.95rem;"><strong>Use it for:</strong> Setting up email for your domain (Gmail, Outlook, etc).</p>
        </div>
        
        <div class="record-card">
          <h3 class="record-title">
            <i class="fas fa-file-alt"></i>
            TXT Record (Text)
          </h3>
          <p class="record-description">Stores text information. Commonly used for email verification, domain ownership proof, and security settings. It's like a notes field that other services can read.</p>
          <div class="record-example">
example.com    TXT    "v=spf1 include:_spf.google.com ~all"<br>
example.com    TXT    "google-site-verification=abc123"
          </div>
          <p style="margin-top: 15px; color: #6b7280; font-size: 0.95rem;"><strong>Use it for:</strong> Email authentication (SPF, DKIM), domain verification, security policies.</p>
        </div>
        
        <div class="record-card">
          <h3 class="record-title">
            <i class="fas fa-server"></i>
            NS Record (Nameserver)
          </h3>
          <p class="record-description">Specifies which nameservers are authoritative for your domain. These are the servers that actually host your DNS records.</p>
          <div class="record-example">
example.com    NS    ns1.cloudflare.com<br>
example.com    NS    ns2.cloudflare.com
          </div>
          <p style="margin-top: 15px; color: #6b7280; font-size: 0.95rem;"><strong>Use it for:</strong> Pointing your domain to a DNS hosting provider.</p>
        </div>
      </div>
    </div>
  </div>
</div>

