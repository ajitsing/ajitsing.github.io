(function() {
  'use strict';

  var CONTENT_SELECTOR = '.blog-post';
  var AD_CLASS = 'post-mid-ad';
  var HEADING_TAGS = ['H2', 'H3'];
  var LENGTH_THRESHOLDS = [30, 60, 100];
  var AD_COUNTS = [3, 5, 6, 8];
  var DEFAULT_AD_COUNT = 3;
  var LAZY_AD_SELECTOR = '[data-lazy-ad]';
  var OBSERVER_ROOT_MARGIN = '200px 0px';

  var FIRST_AD_SLOT = '5138071441';
  var SECOND_AD_SLOT = '2859538251';
  var DEFAULT_AD_SLOT = '1787846424';

  function createDisplayAdElement(slot) {
    var container = document.createElement('div');
    container.className = AD_CLASS;
    container.innerHTML = '<div class="ad-label"><span class="ad-label-text">Advertisement</span></div><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2886086145980317" data-ad-slot="' + slot + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    return container;
  }

  function createAdElement() {
    var container = document.createElement('div');
    container.className = AD_CLASS;
    container.setAttribute('data-lazy-ad', 'true');
    container.innerHTML = '<div class="ad-label"><span class="ad-label-text">Advertisement</span></div><ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-2886086145980317" data-ad-slot="' + DEFAULT_AD_SLOT + '"></ins>';
    return container;
  }

  function pushToAdSense() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  var adObserver = null;

  function getAdObserver() {
    if (adObserver) return adObserver;

    adObserver = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          pushToAdSense();
          adObserver.unobserve(entries[i].target);
        }
      }
    }, {
      rootMargin: OBSERVER_ROOT_MARGIN
    });

    return adObserver;
  }

  function lazyLoadAd(adContainer) {
    getAdObserver().observe(adContainer);
  }

  function getHeadingIndices(children) {
    var indices = [];
    for (var i = 0; i < children.length; i++) {
      if (HEADING_TAGS.indexOf(children[i].tagName) !== -1) {
        indices.push(i);
      }
    }
    return indices;
  }

  function findNearestHeading(headingIndices, targetIndex) {
    var best = -1;
    var bestDist = Infinity;
    for (var i = 0; i < headingIndices.length; i++) {
      var dist = Math.abs(headingIndices[i] - targetIndex);
      if (dist < bestDist) {
        bestDist = dist;
        best = headingIndices[i];
      }
    }
    return best;
  }

  function adsAlreadyInjected(container) {
    return container.querySelectorAll('.' + AD_CLASS).length > 0;
  }

  function getAdCount(article, childrenLength) {
    var overrideCount = article.getAttribute('data-ad-count');
    if (overrideCount) {
      return parseInt(overrideCount, 10) || DEFAULT_AD_COUNT;
    }

    for (var i = 0; i < LENGTH_THRESHOLDS.length; i++) {
      if (childrenLength < LENGTH_THRESHOLDS[i]) {
        return AD_COUNTS[i];
      }
    }
    return AD_COUNTS[AD_COUNTS.length - 1];
  }

  function calculateTargetPositions(adCount) {
    if (adCount <= 0) {
      return [];
    }
    var positions = [];
    var stepSize = 1 / (adCount + 1);
    for (var i = 1; i <= adCount; i++) {
      positions.push(i * stepSize);
    }
    return positions;
  }

  function injectContentAds() {
    var article = document.querySelector(CONTENT_SELECTOR);
    if (!article || adsAlreadyInjected(article)) return;

    var children = Array.from(article.children);
    if (children.length === 0) return;

    var headingIndices = getHeadingIndices(children);
    if (headingIndices.length === 0) return;

    var adCount = getAdCount(article, children.length);
    var hasFirstHeadingAd = headingIndices[0] > 0;
    var remainingAds = hasFirstHeadingAd ? adCount - 1 : adCount;
    var targetPositions = calculateTargetPositions(remainingAds);

    var insertBeforeIndices = [];

    if (hasFirstHeadingAd) {
      insertBeforeIndices.push(headingIndices[0]);
    }

    var usedIndices = {};
    if (insertBeforeIndices.length > 0) {
      usedIndices[insertBeforeIndices[0]] = true;
    }

    for (var i = 0; i < targetPositions.length; i++) {
      var targetIndex = Math.floor(children.length * targetPositions[i]);
      var nearest = findNearestHeading(headingIndices, targetIndex);
      if (nearest > 0 && !usedIndices[nearest]) {
        insertBeforeIndices.push(nearest);
        usedIndices[nearest] = true;
      }
    }

    insertBeforeIndices.sort(function(a, b) { return a - b; });

    for (var j = 0; j < insertBeforeIndices.length; j++) {
      var adPosition = j + 1;
      var ad;
      if (adPosition === 1) {
        ad = createDisplayAdElement(FIRST_AD_SLOT);
      } else if (adPosition === 2) {
        ad = createDisplayAdElement(SECOND_AD_SLOT);
      } else {
        ad = createAdElement();
      }
      var idx = insertBeforeIndices[j];
      if (idx < children.length) {
        article.insertBefore(ad, children[idx]);
      } else {
        article.appendChild(ad);
      }
      if (adPosition <= 2) {
        pushToAdSense();
      } else {
        lazyLoadAd(ad);
      }
    }
  }

  function observeStaticAds() {
    var staticAds = document.querySelectorAll(LAZY_AD_SELECTOR);
    for (var i = 0; i < staticAds.length; i++) {
      if (!staticAds[i].classList.contains(AD_CLASS)) {
        lazyLoadAd(staticAds[i]);
      }
    }
  }

  function init() {
    injectContentAds();
    observeStaticAds();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
