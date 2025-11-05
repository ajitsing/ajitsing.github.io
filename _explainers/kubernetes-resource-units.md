---
layout: explainer
date: 2025-09-30
seo: true
title: "Kubernetes Resource Units Explained"
subtitle: "Understanding CPU and Memory notation in K8s"
description: "Master Kubernetes resource units - learn the difference between millicores, cores, Mi, Gi, and other CPU and memory notations. Understand what 128Mi, 500m, and other resource values actually mean."
thumbnail: /assets/img/devops/k8s-thumbnail.png
share-img: /assets/img/devops/k8s-thumbnail.png
permalink: /explainer/kubernetes-resource-units/
keywords: "kubernetes resources, CPU units, memory units, millicores, mebibytes, k8s resource limits, kubernetes requests, Mi vs M, resource notation"
tags: ["DevOps"]
social-share: true
---

{% include explainer-head.html %}

<style>

/* Resource Comparison */
.resource-demo {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
}

.resource-title {
  color: #0c4a6e;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Format Cards */
.format-card {
  background: white;
  border: 2px solid #cbd5e1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);
}

.format-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(148, 163, 184, 0.2);
}

.format-title {
  color: #334155;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.format-examples {
  background: #f8fafc;
  border-left: 4px solid #64748b;
  padding: 15px;
  border-radius: 4px;
  margin: 10px 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.8;
}

/* Warning Box */
.warning-box {
  background: linear-gradient(135deg, #fef8f8 0%, #fdf2f2 100%);
  border: 2px solid #e5b4b4;
  border-radius: 12px;
  padding: 20px;
  margin: 30px 0;
}

.warning-title {
  color: #b91c1c;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 10px 0;
}

/* Comparison Table */
.comparison-section {
  margin: 50px 0;
  padding: 40px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin: 30px 0;
}

.comparison-card {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s ease;
}

.comparison-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(107, 114, 128, 0.2);
  border-color: #6b7280;
}

.comparison-title {
  color: #374151;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 15px 0;
}

/* Code Block */
.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 25px;
  border-radius: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
  margin: 20px 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  border: 1px solid #334155;
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
  
  .comparison-grid {
    grid-template-columns: 1fr;
    gap: 20px;
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
  
  .comparison-section {
    margin: 30px 0;
    padding: 25px 15px;
  }
  
  .code-block {
    font-size: 12px;
    padding: 15px;
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
  
  .format-card {
    padding: 18px 15px;
  }
  
  .resource-demo {
    padding: 20px 15px;
  }
  
  .code-block {
    font-size: 11px;
    padding: 12px;
  }
  
  .section-title {
    font-size: 1.4rem;
    margin-bottom: 25px;
  }
}
</style>

<div class="explainer">
  <div class="explainer-frame">
    {% include explainer-hero.html title='Kubernetes Resource Units' subtitle='CPU and Memory notation demystified' %}
    
    <div class="frame-content">
      <div class="intro-card">
        <h3><i class="fas fa-microchip"></i> What are Resource Units?</h3>
        <p>When you set <code>cpu: "500m"</code> or <code>memory: "128Mi"</code> in Kubernetes, you're using resource units to tell the cluster how much CPU and memory your containers need. Understanding these units is critical for proper resource allocation and avoiding pod scheduling issues.</p>
      </div>

      <div class="content-container">
        <h2 class="section-title">CPU Units</h2>
        
        <div class="format-card">
          <h3 class="format-title">
            <i class="fas fa-desktop"></i>
            Whole Cores
          </h3>
          <p>Use integers to specify full CPU cores.</p>
          
          <div class="format-examples">
cpu: "1"     # 1 full CPU core<br>
cpu: "2"     # 2 full CPU cores<br>
cpu: "4"     # 4 full CPU cores
          </div>
        </div>
        
        <div class="format-card">
          <h3 class="format-title">
            <i class="fas fa-percentage"></i>
            Decimal Notation
          </h3>
          <p>Use decimals for fractional CPU cores.</p>
          
          <div class="format-examples">
cpu: "0.5"   # Half a CPU core (50%)<br>
cpu: "0.1"   # One-tenth of a core (10%)<br>
cpu: "1.5"   # 1.5 CPU cores
          </div>
        </div>
        
        <div class="format-card">
          <h3 class="format-title">
            <i class="fas fa-chart-pie"></i>
            Millicores (m)
          </h3>
          <p>Use millicores for precise CPU allocation. <strong>1000m = 1 core</strong></p>
          
          <div class="format-examples">
cpu: "100m"  # 0.1 cores (10%)<br>
cpu: "250m"  # 0.25 cores (25%)<br>
cpu: "500m"  # 0.5 cores (50%)<br>
cpu: "1500m" # 1.5 cores
          </div>
          
          <p style="margin-top: 15px; color: #6b7280; font-size: 0.95rem;">
            <strong>Note:</strong> <code>500m</code> = <code>0.5</code> (they are equivalent). Minimum precision is <code>1m</code> (1 millicore).
          </p>
        </div>
      </div>

      <div class="content-container">
        <h2 class="section-title">Memory Units</h2>
        
        <div class="format-card">
          <h3 class="format-title">
            <i class="fas fa-memory"></i>
            Plain Bytes
          </h3>
          <p>Specify memory as raw bytes (rarely used).</p>
          
          <div class="format-examples">
memory: "134217728"  # 134,217,728 bytes
          </div>
        </div>
        
        <div class="format-card">
          <h3 class="format-title">
            <i class="fas fa-calculator"></i>
            Decimal (SI) Suffixes
          </h3>
          <p>Use metric units based on powers of 1000.</p>
          
          <div class="format-examples">
memory: "128M"   # 128 megabytes (128 × 10⁶)<br>
memory: "1G"     # 1 gigabyte (1 × 10⁹)<br>
memory: "2T"     # 2 terabytes (2 × 10¹²)
          </div>
          
          <p style="margin-top: 15px; color: #6b7280; font-size: 0.95rem;">
            <strong>Available suffixes:</strong> <code>k</code> (kilo), <code>M</code> (mega), <code>G</code> (giga), <code>T</code> (tera), <code>P</code> (peta), <code>E</code> (exa)
          </p>
        </div>
        
        <div class="format-card">
          <h3 class="format-title">
            <i class="fas fa-binary"></i>
            Binary (IEC) Suffixes
          </h3>
          <p>Use binary units based on powers of 1024. <strong>Most commonly used!</strong></p>
          
          <div class="format-examples">
memory: "128Mi"  # 128 mebibytes (128 × 2²⁰) ≈ 134 MB<br>
memory: "1Gi"    # 1 gibibyte (1 × 2³⁰) ≈ 1.07 GB<br>
memory: "512Mi"  # 512 mebibytes ≈ 537 MB
          </div>
          
          <p style="margin-top: 15px; color: #6b7280; font-size: 0.95rem;">
            <strong>Available suffixes:</strong> <code>Ki</code> (kibi), <code>Mi</code> (mebi), <code>Gi</code> (gibi), <code>Ti</code> (tebi), <code>Pi</code> (pebi), <code>Ei</code> (exbi)
          </p>
        </div>
      </div>

      <div class="warning-box">
        <h3 class="warning-title">
          <i class="fas fa-exclamation-triangle"></i>
          Common Gotcha
        </h3>
        <p><strong>Never use <code>m</code> suffix for memory!</strong></p>
        <p style="margin-top: 10px;">
          <code>memory: "400m"</code> means 0.4 bytes (not 400 megabytes). You want <code>memory: "400Mi"</code> for 400 mebibytes.
        </p>
        <p style="margin-top: 10px; font-style: italic; color: #6b7280;">
          The <code>m</code> suffix is for millicores (CPU only), not memory.
        </p>
      </div>

      <div class="comparison-section">
        <h2 class="section-title">Mi vs M: What's the Difference?</h2>
        
        <div class="comparison-grid">
          <div class="comparison-card">
            <h3 class="comparison-title">
              <i class="fas fa-ruler"></i>
              128Mi (Binary)
            </h3>
            <p style="margin-bottom: 10px;"><strong>128 × 1024² bytes</strong></p>
            <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 15px;">= 134,217,728 bytes</p>
            <p style="color: #059669; font-weight: 600;">≈ 134 MB</p>
            <p style="margin-top: 15px; font-size: 0.95rem; line-height: 1.6;">
              <strong>Use this:</strong> Matches what monitoring tools (kubectl, Prometheus) display.
            </p>
          </div>
          
          <div class="comparison-card">
            <h3 class="comparison-title">
              <i class="fas fa-ruler-horizontal"></i>
              128M (Decimal)
            </h3>
            <p style="margin-bottom: 10px;"><strong>128 × 1000² bytes</strong></p>
            <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 15px;">= 128,000,000 bytes</p>
            <p style="color: #059669; font-weight: 600;">= 128 MB</p>
            <p style="margin-top: 15px; font-size: 0.95rem; line-height: 1.6;">
              <strong>Note:</strong> Less common in K8s. Use Mi for consistency.
            </p>
          </div>
        </div>
        
        <p style="text-align: center; font-size: 1.1rem; color: #374151; margin-top: 30px;">
          <strong>That's a 6 MB difference!</strong> For larger allocations (like 10Gi vs 10G), the gap widens significantly.
        </p>
      </div>
    </div>
  </div>
</div>
