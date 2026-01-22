(function() {
  'use strict';

  var AD_POSITION = 0.3;
  var AD_LOAD_TIMEOUT_MS = 3000;
  var CONTENT_SELECTOR = '.frame-content';
  var AD_CLASS = 'explainer-top-ad';
  var VALID_INSERTION_TAGS = ['P', 'H2', 'H3', 'DIV', 'SECTION'];
  var EXCLUDED_TAGS = ['SCRIPT', 'STYLE', 'NOSCRIPT'];
  var ANALYTICS_SENT_KEY = 'adblock_analytics_sent';

  function createAdElement(className) {
    var container = document.createElement('div');
    container.className = className;
    container.setAttribute('aria-label', 'Advertisement');
    container.innerHTML = '<div class="ad-label"><span class="ad-label-text">Advertisement</span></div><ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-2886086145980317" data-ad-slot="7962308891"></ins>';
    return container;
  }

  function pushToAdSense() {
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  function isContentElement(element) {
    return EXCLUDED_TAGS.indexOf(element.tagName) === -1;
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

  function getContentContainer() {
    var explainerFrame = document.querySelector('.explainer-frame');
    if (explainerFrame) {
      var frameContent = explainerFrame.querySelector(CONTENT_SELECTOR);
      if (frameContent) return frameContent;
    }
    return document.querySelector(CONTENT_SELECTOR);
  }

  function adAlreadyInjected() {
    return document.querySelector('.' + AD_CLASS) !== null;
  }

  function injectContentAd() {
    if (adAlreadyInjected()) return;

    var contentContainer = getContentContainer();
    if (!contentContainer) return;

    var children = Array.from(contentContainer.children).filter(isContentElement);
    if (children.length === 0) return;

    var insertionIndex = findInsertionIndex(children, AD_POSITION);
    var ad = createAdElement(AD_CLASS);

    requestAnimationFrame(function() {
      if (insertionIndex < children.length) {
        contentContainer.insertBefore(ad, children[insertionIndex]);
      } else {
        contentContainer.appendChild(ad);
      }
      pushToAdSense();
    });
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

  function hideEmptyContentAds() {
    var contentAds = document.querySelectorAll('.explainer-top-ad, .explainer-bottom-ad');
    var hasBlockedAds = false;
    var hasLoadedAds = false;
    
    contentAds.forEach(function(container) {
      var adSlot = container.querySelector('.adsbygoogle');
      if (adSlot && isAdEmpty(adSlot)) {
        container.style.display = 'none';
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

  function scheduleEmptyAdCheck() {
    setTimeout(function() {
      requestAnimationFrame(hideEmptyContentAds);
    }, AD_LOAD_TIMEOUT_MS);
  }

  function init() {
    requestAnimationFrame(injectContentAd);
    scheduleEmptyAdCheck();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
