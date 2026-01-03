(function() {
  'use strict';

  var AD_LOAD_TIMEOUT_MS = 3000;
  var AD_CONTAINER_SELECTOR = '.in-feed-ad';
  var ANALYTICS_SENT_KEY = 'adblock_analytics_sent';

  function isAdBlocked(adSlot) {
    if (!adSlot) return true;
    var hasIframe = adSlot.querySelector('iframe');
    var isLoaded = adSlot.dataset.adStatus === 'done' || adSlot.dataset.adStatus === 'filled';
    return adSlot.offsetHeight === 0 && !hasIframe && !isLoaded;
  }

  function sendAnalyticsEvent(hasAdBlocker) {
    // Only send once per session to avoid duplicate events
    if (sessionStorage.getItem(ANALYTICS_SENT_KEY)) return;

    if (typeof gtag === 'function') {
      gtag('event', hasAdBlocker ? 'ad_blocker_detected' : 'ad_blocker_not_detected', {
        'event_category': 'Ad Blocker',
        'event_label': hasAdBlocker ? 'Using Ad Blocker' : 'No Ad Blocker',
        'non_interaction': true
      });
      sessionStorage.setItem(ANALYTICS_SENT_KEY, 'true');
    }
  }

  function hideBlockedInFeedAds() {
    var inFeedAds = document.querySelectorAll(AD_CONTAINER_SELECTOR);
    var hasBlockedAds = false;
    var hasLoadedAds = false;

    inFeedAds.forEach(function(container) {
      var adSlot = container.querySelector('.adsbygoogle');
      if (isAdBlocked(adSlot)) {
        container.style.display = 'none';
        hasBlockedAds = true;
      } else {
        hasLoadedAds = true;
      }
    });

    // Send analytics event based on ad status
    if (inFeedAds.length > 0) {
      sendAnalyticsEvent(hasBlockedAds && !hasLoadedAds);
    }
  }

  function init() {
    setTimeout(function() {
      requestAnimationFrame(hideBlockedInFeedAds);
    }, AD_LOAD_TIMEOUT_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

