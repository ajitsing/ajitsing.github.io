(function() {
  'use strict';

  var AD_POSITION = 0.3;
  var CONTENT_SELECTOR = '.frame-content';
  var VALID_INSERTION_TAGS = ['P', 'H2', 'H3', 'DIV', 'SECTION'];
  var EXCLUDED_TAGS = ['SCRIPT', 'STYLE', 'NOSCRIPT'];
  var WRAPPER_CLASS = AdLoader.CLASSES.WRAPPER;
  var BOTTOM_CLASS = AdLoader.CLASSES.BOTTOM;

  function createAdContainer() {
    var container = document.createElement('div');
    container.className = WRAPPER_CLASS;
    container.id = WRAPPER_CLASS + '-' + AdLoader.randomId();
    container.setAttribute('aria-label', 'Sponsored content');
    return container;
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
    return document.querySelector('.' + WRAPPER_CLASS) !== null;
  }

  function injectContentAd() {
    if (adAlreadyInjected()) return;

    var contentContainer = getContentContainer();
    if (!contentContainer) return;

    var children = Array.from(contentContainer.children).filter(isContentElement);
    if (children.length === 0) return;

    var insertionIndex = findInsertionIndex(children, AD_POSITION);
    var adContainer = createAdContainer();

    requestAnimationFrame(function() {
      if (insertionIndex < children.length) {
        contentContainer.insertBefore(adContainer, children[insertionIndex]);
      } else {
        contentContainer.appendChild(adContainer);
      }
      AdLoader.injectAd(adContainer, AdLoader.CONFIG.SLOTS.IN_ARTICLE, 'fluid');
    });
  }

  function injectBottomAd() {
    var bottomContainer = document.querySelector('.' + BOTTOM_CLASS);
    if (!bottomContainer || bottomContainer.querySelector('ins')) return;
    AdLoader.injectAd(bottomContainer, AdLoader.CONFIG.SLOTS.IN_ARTICLE, 'fluid');
  }

  function init() {
    requestAnimationFrame(injectContentAd);
    injectBottomAd();
    AdLoader.scheduleEmptyCheck('.' + WRAPPER_CLASS + ', .' + BOTTOM_CLASS);
  }

  AdLoader.delayedInit(init);
})();
