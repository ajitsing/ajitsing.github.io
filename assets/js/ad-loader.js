var AdLoader = (function() {
  'use strict';

  var CONFIG = {
    LOAD_DELAY_MS: 2000,
    CHECK_TIMEOUT_MS: 5000,
    PUB_ID: 'ca-pub-2886086145980317',
    SCRIPT_URL: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    SLOTS: {
      IN_ARTICLE: '7962308891',
      IN_FEED: '7281945758'
    }
  };

  var CLASSES = {
    WRAPPER: 'content-block',
    SLOT: 'promo-unit',
    BOTTOM: 'footer-block',
    FEED: 'feed-block'
  };

  var ANALYTICS_SENT_KEY = 'adblock_analytics_sent';
  var scriptLoaded = false;
  var scriptLoading = false;

  function randomId() {
    return Math.random().toString(36).substring(2, 10);
  }

  function loadScript(callback) {
    if (scriptLoaded || window.adsbygoogle) {
      scriptLoaded = true;
      callback && callback();
      return;
    }

    var existingScript = document.querySelector('script[src*="adsbygoogle"]');
    if (existingScript) {
      scriptLoaded = true;
      callback && callback();
      return;
    }

    if (scriptLoading) {
      var checkInterval = setInterval(function() {
        if (scriptLoaded || window.adsbygoogle) {
          scriptLoaded = true;
          clearInterval(checkInterval);
          callback && callback();
        }
      }, 100);
      return;
    }

    scriptLoading = true;
    var script = document.createElement('script');
    script.src = CONFIG.SCRIPT_URL + '?client=' + CONFIG.PUB_ID;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = function() {
      scriptLoaded = true;
      callback && callback();
    };
    script.onerror = function() {
      scriptLoading = false;
    };
    document.head.appendChild(script);
  }

  function createSlotElement(slotId, format, layoutKey) {
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.cssText = 'display:block; text-align:center;';
    ins.setAttribute('data-ad-client', CONFIG.PUB_ID);
    ins.setAttribute('data-ad-slot', slotId);
    ins.setAttribute('data-ad-format', format || 'fluid');
    if (layoutKey) {
      ins.setAttribute('data-ad-layout-key', layoutKey);
    }
    if (format === 'fluid') {
      ins.setAttribute('data-ad-layout', 'in-article');
    }
    return ins;
  }

  function pushAd(insElement) {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }

  function isAdEmpty(container) {
    var slot = container.querySelector('ins');
    if (!slot) return true;
    var hasIframe = slot.querySelector('iframe');
    var isLoaded = slot.dataset.adStatus === 'done' || slot.dataset.adStatus === 'filled';
    return slot.offsetHeight === 0 && !hasIframe && !isLoaded;
  }

  function sendAnalyticsEvent(hasAdBlocker) {
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

  function hideEmptyAds(selector) {
    var containers = document.querySelectorAll(selector);
    var hasBlockedAds = false;
    var hasLoadedAds = false;

    containers.forEach(function(container) {
      if (isAdEmpty(container)) {
        container.style.display = 'none';
        hasBlockedAds = true;
      } else {
        hasLoadedAds = true;
      }
    });

    if (containers.length > 0) {
      sendAnalyticsEvent(hasBlockedAds && !hasLoadedAds);
    }
  }

  function scheduleEmptyCheck(selector) {
    setTimeout(function() {
      requestAnimationFrame(function() {
        hideEmptyAds(selector);
      });
    }, CONFIG.CHECK_TIMEOUT_MS);
  }

  function injectAd(container, slotId, format, layoutKey) {
    var id = CLASSES.WRAPPER + '-' + randomId();
    container.id = id;
    var ins = createSlotElement(slotId, format, layoutKey);
    container.appendChild(ins);
    loadScript(function() {
      setTimeout(function() {
        pushAd(ins);
      }, 100);
    });
  }

  function delayedInit(callback) {
    var init = function() {
      setTimeout(callback, CONFIG.LOAD_DELAY_MS);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    CONFIG: CONFIG,
    CLASSES: CLASSES,
    randomId: randomId,
    loadScript: loadScript,
    createSlotElement: createSlotElement,
    pushAd: pushAd,
    isAdEmpty: isAdEmpty,
    hideEmptyAds: hideEmptyAds,
    scheduleEmptyCheck: scheduleEmptyCheck,
    injectAd: injectAd,
    delayedInit: delayedInit
  };
})();

