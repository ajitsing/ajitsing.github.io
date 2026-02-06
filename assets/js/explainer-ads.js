(function() {
  'use strict';

  var AD_POSITION = 0.3;
  var AD_LOAD_TIMEOUT_MS = 5000;
  var CONTENT_SELECTOR = '.frame-content';
  var AD_CLASS = 'explainer-top-ad';
  var VALID_INSERTION_TAGS = ['P', 'H2', 'H3', 'DIV', 'SECTION'];
  var EXCLUDED_TAGS = ['SCRIPT', 'STYLE', 'NOSCRIPT'];

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

  function hideEmptyContentAds() {
    var contentAds = document.querySelectorAll('.explainer-top-ad, .explainer-bottom-ad');
    
    contentAds.forEach(function(container) {
      var adSlot = container.querySelector('.adsbygoogle');
      if (adSlot) {
        var adStatus = adSlot.getAttribute('data-ad-status');
        var hasIframe = adSlot.querySelector('iframe');
        if (!adStatus && !hasIframe) {
          container.style.display = 'none';
        }
      }
    });
  }

  function init() {
    requestAnimationFrame(injectContentAd);

    setTimeout(function() {
      requestAnimationFrame(hideEmptyContentAds);
    }, AD_LOAD_TIMEOUT_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
