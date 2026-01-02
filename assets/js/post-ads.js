/**
 * Blog Post Ad Management
 * - Injects mid-content ad at ~50% of article
 * - Hides empty ad containers for ad-blocker users
 */

(function() {
  'use strict';

  /**
   * Inject mid-content ad at approximately 50% of the article
   */
  function injectMidContentAd() {
    var article = document.querySelector('.blog-post');
    if (!article) return;

    // Get all direct children of the article (paragraphs, headings, lists, etc.)
    var children = Array.from(article.children);
    if (children.length === 0) return;

    // Calculate insertion point at ~50%
    var midPoint = Math.floor(children.length / 2);
    
    // Find a good insertion point (prefer after a paragraph or heading, not in the middle of a list)
    var insertIndex = midPoint;
    for (var i = midPoint; i < children.length && i < midPoint + 3; i++) {
      var tagName = children[i].tagName;
      // Prefer inserting after paragraphs, headings, or divs
      if (tagName === 'P' || tagName === 'H2' || tagName === 'H3' || tagName === 'DIV') {
        insertIndex = i + 1;
        break;
      }
    }

    // Create ad container
    var adContainer = document.createElement('div');
    adContainer.className = 'post-mid-ad';
    adContainer.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    
    // Insert the ad
    if (insertIndex < children.length) {
      article.insertBefore(adContainer, children[insertIndex]);
    } else {
      article.appendChild(adContainer);
    }

    // Push to AdSense
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  /**
   * Hide empty ad containers when ads are blocked
   * SEO-friendly: uses requestAnimationFrame to batch with paint
   * Note: Sidebar ads are NEVER hidden - they don't block content reading
   */
  function hideEmptyAds() {
    // Only hide in-content ads that block reading flow
    // Sidebar ads are intentionally excluded - they stay visible even if empty
    var adContainers = document.querySelectorAll('.post-mid-ad, .post-bottom-ad');
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
    var sidebarAds = document.querySelectorAll('.post-sidebar-ad');
    sidebarAds.forEach(function(container) {
      container.style.display = '';
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectMidContentAd();
      
      // Check for empty ads after they've had time to load
      setTimeout(function() {
        requestAnimationFrame(hideEmptyAds);
      }, 3000);
    });
  } else {
    // DOM already loaded
    injectMidContentAd();
    
    setTimeout(function() {
      requestAnimationFrame(hideEmptyAds);
    }, 3000);
  }
})();

