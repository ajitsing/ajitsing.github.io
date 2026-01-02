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
   */
  function hideEmptyAds() {
    var adContainers = document.querySelectorAll('.post-mid-ad, .post-bottom-ad, .post-sidebar-ad');
    adContainers.forEach(function(container) {
      var adSlot = container.querySelector('.adsbygoogle');
      if (adSlot && adSlot.offsetHeight === 0 && !adSlot.dataset.adStatus) {
        container.style.display = 'none';
      }
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

