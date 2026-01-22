(function() {
  'use strict';

  var AD_POSITIONS = [0.05, 0.30];
  var CONTENT_SELECTOR = '.blog-post';
  var AD_CLASS = 'post-mid-ad';
  var VALID_INSERTION_TAGS = ['P', 'H2', 'H3', 'DIV'];
  var AD_LOAD_TIMEOUT_MS = 3000;
  var ANALYTICS_SENT_KEY = 'adblock_analytics_sent';

  function createAdElement(className) {
    var container = document.createElement('div');
    container.className = className;
    container.innerHTML = '<div class="ad-label"><span class="ad-label-text">Advertisement</span></div><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2886086145980317" data-ad-slot="1787846424" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    return container;
  }

  function pushToAdSense() {
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  function isValidInsertionPoint(element) {
    return VALID_INSERTION_TAGS.indexOf(element.tagName) !== -1;
  }

  function findInsertionIndex(children, targetPercent) {
    var targetIndex = Math.max(1, Math.floor(children.length * targetPercent));
    
    for (var i = targetIndex; i < Math.min(children.length, targetIndex + 3); i++) {
      if (isValidInsertionPoint(children[i])) {
        return i + 1;
      }
    }
    
    return targetIndex;
  }

  function insertAdAtIndex(container, ad, children, index) {
    if (index < children.length) {
      container.insertBefore(ad, children[index]);
    } else {
      container.appendChild(ad);
    }
  }

  function adsAlreadyInjected(container) {
    return container.querySelectorAll('.' + AD_CLASS).length > 0;
  }

  function injectContentAds() {
    var article = document.querySelector(CONTENT_SELECTOR);
    if (!article || adsAlreadyInjected(article)) return;

    var children = Array.from(article.children);
    if (children.length === 0) return;

    var adsInserted = 0;

    // Insert ads at each position (in reverse order to maintain correct indices)
    for (var i = AD_POSITIONS.length - 1; i >= 0; i--) {
      var insertionIndex = findInsertionIndex(children, AD_POSITIONS[i]);
      var ad = createAdElement(AD_CLASS);
      insertAdAtIndex(article, ad, children, insertionIndex);
      adsInserted++;
      // Update children array after each insertion
      children = Array.from(article.children);
    }
    
    // Push to AdSense for each ad inserted
    for (var j = 0; j < adsInserted; j++) {
      pushToAdSense();
    }
  }

  function isAdEmpty(adSlot) {
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

  function checkAdStatus() {
    var contentAds = document.querySelectorAll('.post-mid-ad');
    var hasBlockedAds = false;
    var hasLoadedAds = false;
    
    contentAds.forEach(function(container) {
      var adSlot = container.querySelector('.adsbygoogle');
      if (adSlot && isAdEmpty(adSlot)) {
        hasBlockedAds = true;
      } else if (adSlot) {
        hasLoadedAds = true;
      }
    });

    // Send analytics event based on ad status
    if (contentAds.length > 0) {
      sendAnalyticsEvent(hasBlockedAds && !hasLoadedAds);
    }
  }

  function init() {
    injectContentAds();
    
    setTimeout(function() {
      requestAnimationFrame(checkAdStatus);
    }, AD_LOAD_TIMEOUT_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
