---
layout: explainer
date: 2026-03-22
seo: true
title: "Linux File Permissions Explained"
subtitle: "How read, write, and execute permissions work in Linux"
description: "Learn how Linux file permissions work. Understand read, write, execute permissions, owner, group, others, octal notation like 755 and 644, and the chmod command with simple examples."
thumbnail: /assets/img/explainers/linux-file-permissions.png
share-img: /assets/img/explainers/linux-file-permissions.png
permalink: /explainer/linux-file-permissions-explained/
canonical_url: "https://singhajit.com/explainer/linux-file-permissions-explained/"
keywords: "linux file permissions, chmod, file permissions linux, rwx permissions, octal permissions, chmod 755, chmod 644, linux permissions explained, unix permissions, file permission types"
tags: ["Linux"]
social-share: true
faq:
  - question: "What does chmod 755 mean?"
    answer: "chmod 755 means the owner can read, write, and execute the file (7). The group can read and execute but not write (5). Others can also read and execute but not write (5). This is the most common permission for scripts and executable files."
  - question: "What is the difference between chmod 644 and chmod 755?"
    answer: "chmod 644 gives the owner read and write access, while group and others can only read. chmod 755 gives the owner full access, while group and others can read and execute. Use 644 for regular files and 755 for scripts or programs that need to be executed."
  - question: "How do I check file permissions in Linux?"
    answer: "Use the ls -l command. The output shows permissions as a 10-character string like -rwxr-xr-x. The first character is the file type, then three groups of rwx for owner, group, and others."
  - question: "What does rwx mean in Linux?"
    answer: "r means read (view file contents), w means write (modify or delete the file), and x means execute (run the file as a program). A dash (-) means that permission is not granted."
  - question: "How do I make a file executable in Linux?"
    answer: "Run chmod +x filename to add execute permission for everyone. Or use chmod u+x filename to add it only for the owner. You can also use octal notation like chmod 755 filename."
---

{% include explainer-head.html %}

<style>

/* Permission Cards */
.perm-card {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);
}

.perm-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(148, 163, 184, 0.2);
  border-color: #0ea5e9;
}

.perm-card h3 {
  color: #0c4a6e;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.perm-card p {
  color: #374151;
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Permission Breakdown */
.perm-breakdown {
  display: flex;
  gap: 0;
  margin: 30px 0;
  border-radius: 12px;
  overflow: hidden;
  font-family: 'Monaco', 'Menlo', monospace;
}

.perm-slot {
  flex: 1;
  padding: 20px 10px;
  text-align: center;
  color: white;
  font-weight: 600;
}

.perm-slot.owner { background: #3b82f6; }
.perm-slot.group { background: #10b981; }
.perm-slot.others { background: #f59e0b; }

.perm-value {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 8px;
}

.perm-label {
  font-size: 0.75rem;
  opacity: 0.9;
}

/* Octal Table */
.octal-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
}

.octal-table th {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
}

.octal-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e2e8f0;
  color: #374151;
}

.octal-table tr:hover td {
  background: #f0f9ff;
}

.octal-table code {
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.95rem;
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
  
  .perm-breakdown {
    flex-direction: column;
  }
  
  .perm-slot {
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
  
  .octal-table {
    font-size: 0.9rem;
  }
  
  .octal-table th,
  .octal-table td {
    padding: 10px;
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
  
  .perm-card {
    padding: 20px 15px;
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
    {% include explainer-hero.html title='Linux File Permissions Explained' subtitle='How read, write, and execute permissions work in Linux' %}
    
    <div class="frame-content">
      <div class="intro-card">
        <h3><i class="fas fa-lock"></i> What are File Permissions?</h3>
        <p>Every file and directory in Linux has permissions that control who can do what with it. There are three things you can do with a file: <strong>read</strong> it, <strong>write</strong> to it, or <strong>execute</strong> it. And there are three types of users: the <strong>owner</strong>, the <strong>group</strong>, and <strong>everyone else</strong>.</p>
        <p style="font-size: 0.9rem; color: #6b7280; margin-top: 10px;"><strong>Why does this matter?</strong> Permissions keep your system safe. Without them, any user could delete system files or read your private data.</p>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">The Permission Model</h3>
        
<pre><code class="language-mermaid">
graph TD
    F[File or Directory] --> O[Owner]
    F --> G[Group]
    F --> E[Others]
    
    O --> OR[Read]
    O --> OW[Write]
    O --> OX[Execute]
    
    G --> GR[Read]
    G --> GW[Write]
    G --> GX[Execute]
    
    E --> ER[Read]
    E --> EW[Write]
    E --> EX[Execute]
    
    style F fill:#1e293b,stroke:#1e293b,color:#fff,stroke-width:2px
    style O fill:#3b82f6,stroke:#2563eb,color:#fff,stroke-width:2px
    style G fill:#10b981,stroke:#059669,color:#fff,stroke-width:2px
    style E fill:#f59e0b,stroke:#d97706,color:#fff,stroke-width:2px
    style OR fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style OW fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style OX fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style GR fill:#d1fae5,stroke:#10b981,stroke-width:2px
    style GW fill:#d1fae5,stroke:#10b981,stroke-width:2px
    style GX fill:#d1fae5,stroke:#10b981,stroke-width:2px
    style ER fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style EW fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style EX fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
</code></pre>
        
        <p style="margin-top: 20px; color: #6b7280; font-size: 0.95rem;">Each file has 9 permission bits: 3 for the owner, 3 for the group, and 3 for everyone else.</p>
      </div>

      <div class="white-container">
        <h2 class="section-title">The Three Permission Types</h2>
        
        <div class="perm-card">
          <h3>
            <i class="fas fa-eye" style="color: #3b82f6;"></i>
            Read (r)
          </h3>
          <p><strong>For files:</strong> You can see the contents of the file.</p>
          <p><strong>For directories:</strong> You can list the files inside the directory.</p>
        </div>
        
        <div class="perm-card">
          <h3>
            <i class="fas fa-pen" style="color: #10b981;"></i>
            Write (w)
          </h3>
          <p><strong>For files:</strong> You can change, add to, or delete the contents.</p>
          <p><strong>For directories:</strong> You can create, rename, or delete files inside it.</p>
        </div>
        
        <div class="perm-card">
          <h3>
            <i class="fas fa-play" style="color: #f59e0b;"></i>
            Execute (x)
          </h3>
          <p><strong>For files:</strong> You can run the file as a program or script.</p>
          <p><strong>For directories:</strong> You can <code>cd</code> into the directory.</p>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">The Three User Categories</h2>
        
        <div class="perm-breakdown">
          <div class="perm-slot owner">
            <span class="perm-value">Owner</span>
            <span class="perm-label">The user who<br>created the file</span>
          </div>
          <div class="perm-slot group">
            <span class="perm-value">Group</span>
            <span class="perm-label">Users in the<br>same group</span>
          </div>
          <div class="perm-slot others">
            <span class="perm-value">Others</span>
            <span class="perm-label">Everyone else<br>on the system</span>
          </div>
        </div>
        
        <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <p style="margin: 0; color: #374151; font-size: 0.95rem;">
            <strong>Example:</strong> If "john" creates a file and belongs to the "developers" group, then john is the owner, anyone in the developers group is the group, and everyone else falls under others.
          </p>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">Reading Permissions with ls -l</h2>
        
        <p>Run <code>ls -l</code> to see file permissions. Here is what the output looks like:</p>
        
        <div style="background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 12px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 14px; margin: 20px 0; line-height: 1.8; overflow-x: auto;">
<span style="color: #94a3b8;">$ ls -l</span><br>
<span style="color: #22d3ee;">-rwxr-xr--</span>  1  <span style="color: #34d399;">john</span>  <span style="color: #fbbf24;">developers</span>  4096  Mar 22  script.sh<br>
<span style="color: #22d3ee;">-rw-r--r--</span>  1  <span style="color: #34d399;">john</span>  <span style="color: #fbbf24;">developers</span>  1024  Mar 22  notes.txt<br>
<span style="color: #22d3ee;">drwxr-xr-x</span>  2  <span style="color: #34d399;">john</span>  <span style="color: #fbbf24;">developers</span>  4096  Mar 22  projects/
        </div>

        <p>That 10 character string at the start is the permission string. Let's break it down:</p>

        <div class="diagram-container">
          <h3 class="diagram-title">Breaking Down -rwxr-xr--</h3>
          
<pre><code class="language-mermaid">
graph LR
    A["-"] --> B["rwx"]
    B --> C["r-x"]
    C --> D["r--"]
    
    A -.- A1["File type: - = file, d = directory"]
    B -.- B1["Owner: read, write, execute"]
    C -.- C1["Group: read, execute"]
    D -.- D1["Others: read only"]
    
    style A fill:#64748b,stroke:#475569,color:#fff,stroke-width:2px
    style B fill:#3b82f6,stroke:#2563eb,color:#fff,stroke-width:2px
    style C fill:#10b981,stroke:#059669,color:#fff,stroke-width:2px
    style D fill:#f59e0b,stroke:#d97706,color:#fff,stroke-width:2px
    style A1 fill:#f1f5f9,stroke:#cbd5e1,stroke-width:1px
    style B1 fill:#dbeafe,stroke:#93c5fd,stroke-width:1px
    style C1 fill:#d1fae5,stroke:#6ee7b7,stroke-width:1px
    style D1 fill:#fef3c7,stroke:#fcd34d,stroke-width:1px
</code></pre>
        </div>

        <p>A dash (<code>-</code>) in place of r, w, or x means that permission is not set. So <code>r--</code> means read only, and <code>r-x</code> means read and execute but no write.</p>
      </div>

      <div class="white-container">
        <h2 class="section-title">Octal (Number) Notation</h2>
        
        <p>Instead of letters, you can represent permissions as numbers. Each permission has a value:</p>
        
        <table class="octal-table">
          <thead>
            <tr>
              <th>Permission</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Read (r)</td>
              <td><code>4</code></td>
            </tr>
            <tr>
              <td>Write (w)</td>
              <td><code>2</code></td>
            </tr>
            <tr>
              <td>Execute (x)</td>
              <td><code>1</code></td>
            </tr>
            <tr>
              <td>No permission (-)</td>
              <td><code>0</code></td>
            </tr>
          </tbody>
        </table>
        
        <p>You add them up for each user category. For example:</p>
        
        <table class="octal-table">
          <thead>
            <tr>
              <th>Combo</th>
              <th>Calculation</th>
              <th>Octal</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>rwx</code></td>
              <td>4 + 2 + 1</td>
              <td><code>7</code></td>
              <td>Full access</td>
            </tr>
            <tr>
              <td><code>rw-</code></td>
              <td>4 + 2 + 0</td>
              <td><code>6</code></td>
              <td>Read and write</td>
            </tr>
            <tr>
              <td><code>r-x</code></td>
              <td>4 + 0 + 1</td>
              <td><code>5</code></td>
              <td>Read and execute</td>
            </tr>
            <tr>
              <td><code>r--</code></td>
              <td>4 + 0 + 0</td>
              <td><code>4</code></td>
              <td>Read only</td>
            </tr>
            <tr>
              <td><code>---</code></td>
              <td>0 + 0 + 0</td>
              <td><code>0</code></td>
              <td>No access</td>
            </tr>
          </tbody>
        </table>

        <p>So <code>755</code> means: owner gets 7 (rwx), group gets 5 (r-x), others get 5 (r-x).</p>
      </div>

      <div class="tool-cta">
        <h3><i class="fas fa-calculator"></i> Calculate Permissions Instantly</h3>
        <p>Don't want to do the math? Use our chmod calculator to convert between octal and symbolic permissions.</p>
        <a href="/tools/chmod-calculator/">Try Chmod Calculator →</a>
      </div>

      <div class="white-container">
        <h2 class="section-title">The chmod Command</h2>
        
        <p>Use <code>chmod</code> to change file permissions. There are two ways to use it:</p>
        
        <h3 style="color: #0c4a6e; margin: 25px 0 15px 0; font-size: 1.2rem;">Using Octal Numbers</h3>
        
        <div style="background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 12px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 14px; margin: 15px 0; line-height: 1.8;">
<span style="color: #94a3b8;"># Owner: rwx, Group: r-x, Others: r-x</span><br>
<span style="color: #22d3ee;">chmod</span> 755 script.sh<br>
<br>
<span style="color: #94a3b8;"># Owner: rw-, Group: r--, Others: r--</span><br>
<span style="color: #22d3ee;">chmod</span> 644 config.txt<br>
<br>
<span style="color: #94a3b8;"># Owner: rw-, Group: ---, Others: ---</span><br>
<span style="color: #22d3ee;">chmod</span> 600 secrets.env
        </div>
        
        <h3 style="color: #0c4a6e; margin: 25px 0 15px 0; font-size: 1.2rem;">Using Symbolic Notation</h3>
        
        <p>You can also add or remove specific permissions using letters:</p>
        
        <div style="background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 12px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 14px; margin: 15px 0; line-height: 1.8;">
<span style="color: #94a3b8;"># Add execute permission for the owner</span><br>
<span style="color: #22d3ee;">chmod</span> u+x script.sh<br>
<br>
<span style="color: #94a3b8;"># Remove write permission for group and others</span><br>
<span style="color: #22d3ee;">chmod</span> go-w report.txt<br>
<br>
<span style="color: #94a3b8;"># Add execute for everyone</span><br>
<span style="color: #22d3ee;">chmod</span> +x deploy.sh<br>
<br>
<span style="color: #94a3b8;"># Set exact permissions for owner, remove all for others</span><br>
<span style="color: #22d3ee;">chmod</span> u=rwx,go=r file.txt
        </div>
        
        <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <p style="margin: 0; color: #374151; font-size: 0.95rem;">
            <strong>The letters:</strong> <code>u</code> = owner (user), <code>g</code> = group, <code>o</code> = others, <code>a</code> = all three. The operators: <code>+</code> adds, <code>-</code> removes, <code>=</code> sets exactly.
          </p>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">Common Permission Presets</h2>
        
        <div class="example-card">
          <div class="example-expression">chmod 755</div>
          <p class="example-meaning"><strong>Scripts and executables.</strong> Owner can do everything. Everyone else can read and run it but not change it.</p>
        </div>
        
        <div class="example-card">
          <div class="example-expression">chmod 644</div>
          <p class="example-meaning"><strong>Regular files.</strong> Owner can read and write. Everyone else can only read. This is the default for most files.</p>
        </div>
        
        <div class="example-card">
          <div class="example-expression">chmod 600</div>
          <p class="example-meaning"><strong>Private files.</strong> Only the owner can read and write. Nobody else can even see the contents. Good for SSH keys and passwords.</p>
        </div>
        
        <div class="example-card">
          <div class="example-expression">chmod 700</div>
          <p class="example-meaning"><strong>Private directories.</strong> Only the owner can do anything. Good for personal folders you want to keep locked down.</p>
        </div>
        
        <div class="example-card">
          <div class="example-expression">chmod 444</div>
          <p class="example-meaning"><strong>Read-only for everyone.</strong> Nobody can change the file, not even the owner (without changing permissions first).</p>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">Changing Ownership</h2>
        
        <p>Permissions control what you can do. Ownership controls who the owner and group are. Use <code>chown</code> to change them:</p>
        
        <div style="background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 12px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 14px; margin: 15px 0; line-height: 1.8;">
<span style="color: #94a3b8;"># Change owner to john</span><br>
<span style="color: #22d3ee;">chown</span> john file.txt<br>
<br>
<span style="color: #94a3b8;"># Change owner and group</span><br>
<span style="color: #22d3ee;">chown</span> john:developers file.txt<br>
<br>
<span style="color: #94a3b8;"># Change ownership of a directory and everything inside it</span><br>
<span style="color: #22d3ee;">chown</span> -R john:developers /var/www/
        </div>
        
        <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <p style="margin: 0; color: #374151; font-size: 0.95rem;">
            <strong>Note:</strong> You need <code>sudo</code> to change file ownership unless you already own the file.
          </p>
        </div>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">Quick Reference</h3>
        
<pre><code class="language-mermaid">
graph LR
    A[What do you need?] --> B[Make a script runnable?]
    A --> C[Protect a private file?]
    A --> D[Share with your team?]
    A --> E[Web server files?]
    
    B --> B1["chmod 755 | rwxr-xr-x"]
    C --> C1["chmod 600 | rw-------"]
    D --> D1["chmod 664 | rw-rw-r--"]
    E --> E1["chmod 644 | rw-r--r--"]
    
    style A fill:#1e293b,stroke:#1e293b,color:#fff,stroke-width:2px
    style B1 fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style C1 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style D1 fill:#d1fae5,stroke:#10b981,stroke-width:2px
    style E1 fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
</code></pre>
      </div>

      <div class="tool-cta">
        <h3><i class="fas fa-calculator"></i> Need Help With Permissions?</h3>
        <p>Use our free chmod calculator to convert between octal and symbolic notation, pick permissions with checkboxes, and get ready-to-use commands.</p>
        <a href="/tools/chmod-calculator/">Open Chmod Calculator →</a>
      </div>

      <div class="white-container" style="margin-top: 40px; padding: 30px; background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 12px;">
        <h2 class="section-title" style="margin-top: 0;">Keep Learning</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #374151; margin-bottom: 20px;">
          Now that you understand file permissions, explore more Linux topics:
        </p>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 10px; font-size: 1rem; line-height: 1.6; color: #374151;">
            <strong><i class="fas fa-folder-open" style="color: #059669; margin-right: 10px;"></i><a href="/explainer/linux-directory-structure/" style="color: #0284c7; text-decoration: none;">Linux Directory Structure</a></strong> - Understand where files live and what each directory is for
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 10px; font-size: 1rem; line-height: 1.6; color: #374151;">
            <strong><i class="fas fa-clock" style="color: #059669; margin-right: 10px;"></i><a href="/explainer/cron-jobs-explained/" style="color: #0284c7; text-decoration: none;">Cron Jobs Explained</a></strong> - Schedule tasks to run automatically
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 15px 20px; margin-bottom: 10px; font-size: 1rem; line-height: 1.6; color: #374151;">
            <strong><i class="fas fa-terminal" style="color: #059669; margin-right: 10px;"></i><a href="/linux-commands-cheat-sheet/" style="color: #0284c7; text-decoration: none;">Linux Commands Cheat Sheet</a></strong> - Essential terminal commands you should know
          </li>
        </ul>
      </div>

    </div>
  </div>
</div>
