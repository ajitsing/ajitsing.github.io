(function() {
  'use strict';

  var AD_POSITIONS = [0.05, 0.30, 0.60];
  var CONTENT_SELECTOR = '.blog-post';
  var AD_CLASS = 'post-mid-ad';
  var VALID_INSERTION_TAGS = ['P', 'H2', 'H3', 'DIV'];

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

    for (var i = AD_POSITIONS.length - 1; i >= 0; i--) {
      var insertionIndex = findInsertionIndex(children, AD_POSITIONS[i]);
      var ad = createAdElement(AD_CLASS);
      insertAdAtIndex(article, ad, children, insertionIndex);
      adsInserted++;
      children = Array.from(article.children);
    }
    
    for (var j = 0; j < adsInserted; j++) {
      pushToAdSense();
    }
  }

  function init() {
    injectContentAds();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
