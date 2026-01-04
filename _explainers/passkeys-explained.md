---
layout: explainer
date: 2025-11-08
seo: true
title: "Passkeys Explained"
subtitle: "Passwordless login that actually works"
description: "Learn how passkeys replace passwords with a simple, secure way to log in. Understand how they work, why they're safer than passwords, and when to use them."
thumbnail: /assets/img/explainers/passkeys-thumbnail.png
share-img: /assets/img/explainers/passkeys-thumbnail.png
permalink: /explainer/passkeys-explained/
keywords: "passkeys, passwordless authentication, WebAuthn, FIDO2, login security, password replacement, biometric login"
tags: ["Security"]
social-share: true
faq:
  - question: "What is a passkey and how does it work?"
    answer: "A passkey is a cryptographic credential that replaces passwords. It uses public-key cryptography: your device stores a private key (unlocked by biometrics or PIN), and the website stores the public key. During login, your device signs a challenge with the private key, proving identity without sending any secret."
  - question: "Are passkeys safer than passwords?"
    answer: "Yes, passkeys are significantly safer. They can't be phished (tied to specific domains), can't be leaked in database breaches (sites only have public keys), can't be guessed or cracked, and don't need to be remembered or typed. Each passkey is unique per site, eliminating password reuse risks."
  - question: "What happens if I lose my device with passkeys?"
    answer: "Passkeys can sync across devices via iCloud Keychain, Google Password Manager, or 1Password. If synced, access them from any linked device. If not synced, use account recovery options. Many sites let you register multiple passkeys or keep a backup authentication method."
  - question: "What is the difference between passkeys and hardware security keys?"
    answer: "Hardware security keys (like YubiKey) are physical devices you plug in or tap. Passkeys can be stored on phones/computers and synced via cloud. Both use the same WebAuthn/FIDO2 standard. Hardware keys are slightly more secure (no cloud sync), passkeys are more convenient."
  - question: "Which websites and apps support passkeys?"
    answer: "Major services supporting passkeys include Google, Apple, Microsoft, GitHub, PayPal, eBay, Best Buy, and many more. Support is growing rapidly. Check passkeys.directory for a current list of supporting services."
---

{% include explainer-head.html %}

<style>

/* Comparison Demos */
.password-demo {
  background: linear-gradient(135deg, #fef8f8 0%, #fdf2f2 100%);
  border-color: #e5b4b4;
}

.passkey-demo {
  background: linear-gradient(135deg, #f6fdf9 0%, #f0fdf4 100%);
  border-color: #bbf7d0;
}

.password-demo .demo-title {
  color: #b91c1c;
}

.passkey-demo .demo-title {
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
  
  .benefit-card {
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
    {% include explainer-hero.html title='Passkeys' subtitle='Passwordless login that actually works' %}
    
    <div class="frame-content">
      <div class="intro-card">
        <h3><i class="fas fa-key"></i> What are Passkeys?</h3>
        <p>A <strong>passkey</strong> is a new way to log in without typing a password. Instead of remembering complex passwords, you just use your fingerprint, face, or PIN the same way you unlock your phone. It's faster, safer, and way easier than passwords.</p>
        <p style="font-size: 0.9rem; color: #6b7280; margin-top: 10px;"><strong>Think of it like:</strong> Using your house key instead of remembering a secret code. The key stays with you and can't be stolen by someone on the internet.</p>
      </div>

      <div class="content-container">
        <h2 class="section-title">Passwords vs Passkeys</h2>
        
        <div class="flex-comparison">
          <div class="flex-side password-demo">
            <h3 class="demo-title">
              <i class="fas fa-lock"></i>
              Traditional Passwords
            </h3>
            
            <div style="background: #fff; border: 2px solid #e5b4b4; border-radius: 12px; padding: 20px; margin: 15px 0;">
              <p style="margin: 0 0 10px 0; font-weight: 600; color: #991b1b;">What you deal with:</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;">• Remember complex passwords</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;">• Different password for each site</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;">• Type it correctly every time</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;">• Reset when you forget</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;">• Can be stolen by hackers</p>
              <p style="margin: 10px 0 0 0; font-weight: 600; color: #991b1b;">Stored on the server!</p>
            </div>
          </div>
          
          <div class="flex-side passkey-demo">
            <h3 class="demo-title">
              <i class="fas fa-fingerprint"></i>
              With Passkeys
            </h3>
            
            <div style="background: #fff; border: 2px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 15px 0;">
              <p style="margin: 0 0 10px 0; font-weight: 600; color: #065f46;">What you do:</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;">↓</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;">Use fingerprint or face ID</p>
              <p style="margin: 0 0 8px 0; color: #6b7280;">↓</p>
              <p style="margin: 0 0 10px 0; font-weight: 600; color: #065f46;">Done! You're logged in.</p>
              <p style="margin: 0 0 5px 0; color: #6b7280;">✓ Nothing to remember</p>
              <p style="margin: 0 0 5px 0; color: #6b7280;">✓ Can't be phished</p>
              <p style="margin: 0 0 5px 0; color: #6b7280;">✓ Works across devices</p>
              <p style="margin: 0 0 5px 0; color: #6b7280;">✓ Never leaves your device</p>
            </div>
          </div>
        </div>
      </div>

      <div class="diagram-container">
        <h3 class="diagram-title">How Passkeys Work</h3>
        
<pre><code class="language-mermaid">
sequenceDiagram
    participant User
    participant Device as Your Device
    participant Website
    
    Note over User,Website: First Time Setup (Registration)
    User->>Website: Create account
    Website->>Device: Request passkey creation
    Note over Device: Generate key pair (public + private)
    Device->>User: Authenticate with biometric
    User->>Device: Fingerprint/Face ID verified
    Device->>Website: Send public key only
    Note over Device: Private key stored in secure hardware
    Note over Website: Public key stored with account
    
    Note over User,Website: Subsequent Login
    User->>Website: Click login
    Note over Website: Generate random challenge (nonce)
    Website->>Device: Send unique challenge
    Device->>User: Request biometric authentication
    User->>Device: Fingerprint/Face ID verified
    Note over Device: Sign challenge with private key
    Device->>Website: Send signature
    Note over Website: Verify signature using public key
    Website->>User: Access granted!
    Note over User,Website: Challenge is different every time
</code></pre>
        
        <p style="margin-top: 20px; color: #6b7280; font-size: 0.95rem;">The website gets a "public key" that can't unlock anything by itself. Your device keeps the "private key" safe and uses it to prove you're you.</p>
      </div>

      <div class="white-container">
        <h2 class="section-title">How Public Key Authentication Works</h2>
        
        <p style="margin-bottom: 20px; color: #374151; line-height: 1.7;">Passkeys use standard public-key cryptography with a challenge-response flow:</p>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 15px 0; font-size: 1.2rem;"><i class="fas fa-user-plus"></i> Step 1: Registration</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">During account setup, your device generates an asymmetric key pair. The public key is sent to the server and stored with your account. The private key stays in your device's secure hardware (like TPM or Secure Enclave) and never leaves.</p>
        </div>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 15px 0; font-size: 1.2rem;"><i class="fas fa-key"></i> Step 2: Challenge Request</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">On login, the server generates a random nonce (challenge) and sends it to your device. This prevents replay attacks since each challenge is unique.</p>
        </div>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 15px 0; font-size: 1.2rem;"><i class="fas fa-signature"></i> Step 3: Sign Challenge</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">After biometric verification, your device uses the private key to sign the challenge. The signature is computed locally and sent back to the server. The private key itself never leaves the secure hardware.</p>
        </div>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 15px 0; font-size: 1.2rem;"><i class="fas fa-check-circle"></i> Step 4: Verify Signature</h4>
          <p style="margin: 0 0 10px 0; color: #374151; line-height: 1.6;">The server uses your stored public key to verify the signature. If verification succeeds, it confirms you possess the corresponding private key without ever seeing it.</p>
          <p style="margin: 10px 0 0 0; padding: 15px; background: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 4px; color: #374151; font-size: 0.95rem;"><strong>💡 Key point:</strong> This is standard asymmetric cryptography, but the private key is bound to your device's hardware and protected by biometrics. You get cryptographic security plus proof of physical presence.</p>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">Why Passkeys Are Better</h2>
        
        <div class="benefit-card">
          <h3 class="benefit-title">
            <i class="fas fa-shield-alt"></i>
            Can't Be Phished
          </h3>
          <p class="benefit-description">Unlike passwords, passkeys only work on the real website. Even if you click a fake link, the passkey won't work. The technology makes phishing impossible.</p>
        </div>
        
        <div class="benefit-card">
          <h3 class="benefit-title">
            <i class="fas fa-bolt"></i>
            Super Fast
          </h3>
          <p class="benefit-description">No typing, no forgotten passwords, no password resets. Just touch your fingerprint sensor or look at your camera and you're in. Takes less than a second.</p>
        </div>
        
        <div class="benefit-card">
          <h3 class="benefit-title">
            <i class="fas fa-user-secret"></i>
            Nothing to Steal
          </h3>
          <p class="benefit-description">The secret never leaves your device. Even if a website gets hacked, there's nothing useful for hackers to steal. Your account stays safe.</p>
        </div>
      </div>

      <div class="white-container">
        <h2 class="section-title">Where You Can Use Passkeys</h2>
        
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px; font-size: 1.1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-globe" style="color: #059669; margin-right: 10px;"></i>Major Websites:</strong> Google, Apple, Microsoft, PayPal, Amazon, and many others already support passkeys.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px; font-size: 1.1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-mobile-alt" style="color: #059669; margin-right: 10px;"></i>All Modern Devices:</strong> Works on iPhone, Android, Mac, Windows, and even Linux. Your phone can also log you into your computer.
          </li>
          <li style="background: white; border: 2px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 15px; font-size: 1.1rem; line-height: 1.6; color: #374151; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);">
            <strong><i class="fas fa-sync-alt" style="color: #059669; margin-right: 10px;"></i>Synced Across Devices:</strong> Create a passkey on your phone and it works on your tablet and computer too. iCloud Keychain and Google Password Manager handle this automatically.
          </li>
        </ul>
      </div>

      <div class="white-container">
        <h2 class="section-title">Common Questions</h2>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 10px 0; font-size: 1.2rem;">What if I lose my phone?</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">Passkeys sync across your devices through iCloud or Google. If you lose your phone, you can still log in from your other devices. Plus, websites usually let you set up multiple passkeys.</p>
        </div>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 10px 0; font-size: 1.2rem;">Can someone use my passkey if they steal my phone?</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">No. They'd need your fingerprint, face, or phone PIN to use the passkey. It's protected by the same security that locks your phone.</p>
        </div>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h4 style="color: #334155; margin: 0 0 10px 0; font-size: 1.2rem;">Are passkeys the same as two-factor authentication?</h4>
          <p style="margin: 0; color: #374151; line-height: 1.6;">They're better. Passkeys combine both steps into one. You don't need passwords AND a second factor. The passkey is both things at once - something you have (your device) and something you are (your fingerprint).</p>
        </div>
      </div>
    </div>
  </div>
</div>

