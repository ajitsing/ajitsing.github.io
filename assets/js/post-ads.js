(function() {
  'use strict';

  var CONTENT_SELECTOR = '.blog-post';
  var AD_CLASS = 'post-mid-ad';
  var HEADING_TAGS = ['H2', 'H3'];
  var TARGET_POSITIONS = [0.25, 0.50, 0.75];

  function createAdElement() {
    var container = document.createElement('div');
    container.className = AD_CLASS;
    container.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2886086145980317" data-ad-slot="1787846424" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    return container;
  }

  function pushToAdSense() {
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
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

  function injectContentAds() {
    var article = document.querySelector(CONTENT_SELECTOR);
    if (!article || adsAlreadyInjected(article)) return;

    var children = Array.from(article.children);
    if (children.length === 0) return;

    var headingIndices = getHeadingIndices(children);
    if (headingIndices.length === 0) return;

    var insertBeforeIndices = [];

    if (headingIndices[0] > 0) {
      insertBeforeIndices.push(headingIndices[0]);
    }

    var usedIndices = {};
    if (insertBeforeIndices.length > 0) {
      usedIndices[insertBeforeIndices[0]] = true;
    }

    for (var i = 0; i < TARGET_POSITIONS.length; i++) {
      var targetIndex = Math.floor(children.length * TARGET_POSITIONS[i]);
      var nearest = findNearestHeading(headingIndices, targetIndex);
      if (nearest > 0 && !usedIndices[nearest]) {
        insertBeforeIndices.push(nearest);
        usedIndices[nearest] = true;
      }
    }

    insertBeforeIndices.sort(function(a, b) { return b - a; });

    for (var j = 0; j < insertBeforeIndices.length; j++) {
      var ad = createAdElement();
      var idx = insertBeforeIndices[j];
      if (idx < children.length) {
        article.insertBefore(ad, children[idx]);
      } else {
        article.appendChild(ad);
      }
    }

    for (var k = 0; k < insertBeforeIndices.length; k++) {
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
