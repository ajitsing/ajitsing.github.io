/**
 * Explainer Page Ad Management
 * - Injects top ad after hero-header section
 * - Hides empty ad containers for ad-blocker users
 */

(function() {
  'use strict';

  /**
   * Inject ad at 30% of the explainer content
   * SEO-friendly: Uses requestAnimationFrame to prevent layout shift
   */
  function injectTopAd() {
    // Check if top ad already exists
    var existingTopAd = document.querySelector('.explainer-top-ad');
    if (existingTopAd) {
      return;
    }

    // Find the frame-content container (main content area)
    var explainerFrame = document.querySelector('.explainer-frame');
    var frameContent = explainerFrame ? explainerFrame.querySelector('.frame-content') : null;
    
    // If no frame-content, try to find the main content container
    if (!frameContent) {
      frameContent = document.querySelector('.frame-content');
    }
    
    if (!frameContent) {
      return;
    }

    // Get all direct children of the frame-content (excluding scripts and styles)
    var children = Array.from(frameContent.children).filter(function(child) {
      var tagName = child.tagName;
      return tagName !== 'SCRIPT' && tagName !== 'STYLE' && tagName !== 'NOSCRIPT';
    });
    
    if (children.length === 0) {
      return;
    }

    // Calculate insertion point at ~30%
    var insertIndex = Math.floor(children.length * 0.3);
    
    // Ensure minimum insertion point (at least after first element)
    if (insertIndex < 1) {
      insertIndex = 1;
    }
    
    // Find a good insertion point (prefer after paragraphs, headings, or divs)
    for (var i = insertIndex; i < children.length && i < insertIndex + 3; i++) {
      var tagName = children[i].tagName;
      // Prefer inserting after paragraphs, headings, divs, or sections
      if (tagName === 'P' || tagName === 'H2' || tagName === 'H3' || tagName === 'DIV' || tagName === 'SECTION') {
        insertIndex = i + 1;
        break;
      }
    }

    // Create ad container with reserved space to prevent CLS
    var adContainer = document.createElement('div');
    adContainer.className = 'explainer-top-ad';
    adContainer.setAttribute('aria-label', 'Advertisement');
    adContainer.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    
    // Use requestAnimationFrame to batch DOM manipulation with browser paint
    requestAnimationFrame(function() {
      // Insert the ad
      if (insertIndex < children.length) {
        frameContent.insertBefore(adContainer, children[insertIndex]);
      } else {
        frameContent.appendChild(adContainer);
      }

      // Push to AdSense after insertion
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    });
  }

  /**
   * Hide empty ad containers when ads are blocked
   * SEO-friendly: uses requestAnimationFrame to batch with paint
   * Note: Sidebar ads are NEVER hidden - they don't block content reading
   */
  function hideEmptyAds() {
    // Only hide in-content ads that block reading flow
    // Sidebar ads are intentionally excluded - they stay visible even if empty
    var adContainers = document.querySelectorAll('.explainer-top-ad');
    adContainers.forEach(function(container) {
      var adSlot = container.querySelector('.adsbygoogle');
      // Check if ad is truly empty (no iframe, no content, and no ad-status indicating it's loading)
      if (adSlot) {
        var hasIframe = adSlot.querySelector('iframe');
        var hasAdStatus = adSlot.dataset.adStatus === 'done' || adSlot.dataset.adStatus === 'filled';
        var isEmpty = adSlot.offsetHeight === 0 && !hasIframe && !hasAdStatus;
        
        if (isEmpty) {
          container.style.display = 'none';
        }
      }
    });
    
    // Ensure sidebar ads are always visible (safeguard)
    var sidebarAds = document.querySelectorAll('.explainer-sidebar-ad');
    sidebarAds.forEach(function(container) {
      container.style.display = '';
    });
  }

  // Run when DOM is ready - SEO-friendly: wait for content to be fully parsed
  function initAds() {
    // Wait a tick to ensure all content is rendered
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        // Use requestAnimationFrame to ensure content is painted before ad injection
        requestAnimationFrame(function() {
          injectTopAd();
        });
        
        // Check for empty ads after they've had time to load
        setTimeout(function() {
          requestAnimationFrame(hideEmptyAds);
        }, 3000);
      });
    } else {
      // DOM already loaded - use requestAnimationFrame for smooth insertion
      requestAnimationFrame(function() {
        injectTopAd();
      });
      
      setTimeout(function() {
        requestAnimationFrame(hideEmptyAds);
      }, 3000);
    }
  }

  // Initialize
  initAds();
})();

