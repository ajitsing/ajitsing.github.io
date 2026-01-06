(function() {
  'use strict';

  var AD_POSITIONS = [0.25, 0.75];
  var CONTENT_SELECTOR = '.blog-post';
  var VALID_INSERTION_TAGS = ['P', 'H2', 'H3', 'DIV'];
  var WRAPPER_CLASS = AdLoader.CLASSES.WRAPPER;
  var BOTTOM_CLASS = AdLoader.CLASSES.BOTTOM;

  function createAdContainer() {
    var container = document.createElement('div');
    container.className = WRAPPER_CLASS;
    container.id = WRAPPER_CLASS + '-' + AdLoader.randomId();
    return container;
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
    return container.querySelectorAll('.' + WRAPPER_CLASS).length > 0;
  }

  function injectContentAds() {
    var article = document.querySelector(CONTENT_SELECTOR);
    if (!article || adsAlreadyInjected(article)) return;

    var children = Array.from(article.children);
    if (children.length === 0) return;

    var insertionIndices = AD_POSITIONS.map(function(position) {
      return findInsertionIndex(children, position);
    });

    if (insertionIndices[1] <= insertionIndices[0]) {
      insertionIndices[1] = Math.min(
        insertionIndices[0] + Math.floor(children.length * 0.25),
        children.length
      );
    }

    var ads = AD_POSITIONS.map(function() {
      return createAdContainer();
    });

    insertAdAtIndex(article, ads[1], children, insertionIndices[1]);
    children = Array.from(article.children);
    insertAdAtIndex(article, ads[0], children, insertionIndices[0]);

    ads.forEach(function(adContainer) {
      AdLoader.injectAd(adContainer, AdLoader.CONFIG.SLOTS.IN_ARTICLE, 'fluid');
    });
  }

  function injectBottomAd() {
    var bottomContainer = document.querySelector('.' + BOTTOM_CLASS);
    if (!bottomContainer || bottomContainer.querySelector('ins')) return;
    AdLoader.injectAd(bottomContainer, AdLoader.CONFIG.SLOTS.IN_ARTICLE, 'fluid');
  }

  function init() {
    injectContentAds();
    injectBottomAd();
    AdLoader.scheduleEmptyCheck('.' + WRAPPER_CLASS + ', .' + BOTTOM_CLASS);
  }

  AdLoader.delayedInit(init);
})();
