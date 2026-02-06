(function() {
  'use strict';

  var ANALYTICS_SENT_KEY = 'adblock_analytics_sent';
  var CHECK_DELAY_MS = 5000;

  function isBaitBlocked() {
    var bait = document.createElement('div');
    bait.className = 'ad-banner ads adsbox ad-placement';
    bait.style.cssText = 'position:absolute;top:-10px;left:-10px;width:1px;height:1px;overflow:hidden;';
    bait.innerHTML = '&nbsp;';
    document.body.appendChild(bait);

    var blocked = (
      bait.offsetHeight === 0 ||
      bait.clientHeight === 0 ||
      window.getComputedStyle(bait).display === 'none' ||
      window.getComputedStyle(bait).visibility === 'hidden'
    );

    document.body.removeChild(bait);
    return blocked;
  }

  function hasBlockedAdSlots() {
    var adSlots = document.querySelectorAll('.adsbygoogle');
    if (adSlots.length === 0) return false;

    var blocked = false;
    adSlots.forEach(function(adSlot) {
      var adStatus = adSlot.getAttribute('data-ad-status');
      if (!adStatus && !adSlot.querySelector('iframe')) {
        blocked = true;
      }
    });
    return blocked;
  }

  function getPageType() {
    if (document.querySelector('.blog-post')) return 'post';
    if (document.querySelector('.explainer-frame')) return 'explainer';
    if (document.querySelector('.in-feed-ad')) return 'feed';
    if (document.querySelector('.tool-page, .tool-container')) return 'tool';
    return 'other';
  }

  function sendAnalyticsEvent(hasAdBlocker) {
    if (sessionStorage.getItem(ANALYTICS_SENT_KEY)) return;

    if (typeof gtag === 'function') {
      var pageType = getPageType();
      gtag('event', hasAdBlocker ? 'ad_blocker_detected' : 'ad_blocker_not_detected', {
        'event_category': 'Ad Blocker',
        'event_label': (hasAdBlocker ? 'Blocked' : 'Not blocked') + ' (' + pageType + ')',
        'non_interaction': true
      });
      sessionStorage.setItem(ANALYTICS_SENT_KEY, 'true');
    }
  }

  function detect() {
    if (isBaitBlocked()) {
      sendAnalyticsEvent(true);
      return;
    }

    if (hasBlockedAdSlots()) {
      sendAnalyticsEvent(true);
      return;
    }

    sendAnalyticsEvent(false);
  }

  function init() {
    if (sessionStorage.getItem(ANALYTICS_SENT_KEY)) return;

    setTimeout(function() {
      requestAnimationFrame(detect);
    }, CHECK_DELAY_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
