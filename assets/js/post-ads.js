(function() {
  'use strict';

  var CONTENT_SELECTOR = '.blog-post';
  var AD_CLASS = 'post-mid-ad';
  var HEADING_TAGS = ['H2', 'H3'];
  var VISUAL_TAGS = ['IMG', 'FIGURE', 'PRE', 'SVG', 'TABLE'];
  var LAZY_AD_SELECTOR = '[data-lazy-ad]';
  var OBSERVER_ROOT_MARGIN = '1500px 0px';

  var MIN_HEADINGS_GAP = 3;
  var MIN_PIXEL_GAP = 800;
  var CONTENT_SKIP_RATIO = 0.1;
  var MAX_ADS_DESKTOP = 6;
  var MAX_ADS_MOBILE = 2;
  var MIN_HEADINGS_FOR_ADS = 3;
  var VISUAL_HEADING_PROXIMITY = 5;
  var SKIP_TAGS = ['STYLE', 'SCRIPT'];
  var SKIP_CLASSES = ['visually-hidden', 'quick-answer', 'key-takeaways'];

  var FIRST_AD_SLOT = '5138071441';
  var IN_ARTICLE_AD_SLOT = '1787846424';

  function createDisplayAdElement(slot) {
    var container = document.createElement('div');
    container.className = AD_CLASS;
    container.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2886086145980317" data-ad-slot="' + slot + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    return container;
  }

  function createInArticleAdElement(slot) {
    var container = document.createElement('div');
    container.className = AD_CLASS;
    container.setAttribute('data-lazy-ad', 'true');
    container.innerHTML = '<ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-2886086145980317" data-ad-slot="' + slot + '"></ins>';
    return container;
  }

  function pushToAdSense() {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }

  var adObserver = null;

  function getAdObserver() {
    if (adObserver) return adObserver;

    adObserver = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting && entries[i].target.offsetWidth > 0) {
          var target = entries[i].target;
          pushToAdSense();
          adObserver.unobserve(target);
          setTimeout(function(el) {
            el.classList.add('ad-visible');
          }.bind(null, target), 100);
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

  function collapseAdInstant(adContainer) {
    adContainer.style.transition = 'none';
    adContainer.style.display = 'none';
  }

  function collapseAdSmooth(adContainer) {
    adContainer.classList.add('ad-collapsing');
    adContainer.addEventListener('transitionend', function handler() {
      adContainer.removeEventListener('transitionend', handler);
      adContainer.style.display = 'none';
    });
  }

  function watchForUnfilled(adContainer) {
    var ins = adContainer.querySelector('.adsbygoogle');
    if (!ins) return;

    function handleUnfilled(container) {
      var rect = container.getBoundingClientRect();
      var inView = rect.bottom > 0 && rect.top < window.innerHeight;

      if (!inView) {
        collapseAdInstant(container);
      } else {
        collapseAdSmooth(container);
      }
    }

    function check() {
      var status = ins.getAttribute('data-ad-status');
      if (status === 'unfilled') {
        handleUnfilled(adContainer);
      }
    }

    new MutationObserver(check).observe(ins, {
      attributes: true,
      attributeFilter: ['data-ad-status']
    });
  }

  function isVisualElement(el) {
    if (SKIP_TAGS.indexOf(el.tagName) !== -1) return false;
    if (el.classList) {
      for (var i = 0; i < SKIP_CLASSES.length; i++) {
        if (el.classList.contains(SKIP_CLASSES[i])) return false;
      }
    }
    if (VISUAL_TAGS.indexOf(el.tagName) !== -1) return true;
    if (el.classList) {
      if (el.classList.contains('mermaid')) return true;
      if (el.classList.contains('language-mermaid')) return true;
      if (el.classList.contains('highlighter-rouge')) return true;
    }
    if (el.querySelector && el.querySelector('img, figure, .mermaid, .language-mermaid, svg, pre, table')) return true;
    return false;
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

  function getVisualIndices(children) {
    var indices = [];
    for (var i = 0; i < children.length; i++) {
      if (isVisualElement(children[i])) {
        indices.push(i);
      }
    }
    return indices;
  }

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function getMaxAds(article) {
    var override = article.getAttribute('data-ad-count');
    if (override) {
      return parseInt(override, 10) || MAX_ADS_DESKTOP;
    }
    return isMobile() ? MAX_ADS_MOBILE : MAX_ADS_DESKTOP;
  }

  function adsAlreadyInjected(container) {
    return container.querySelectorAll('.' + AD_CLASS).length > 0;
  }

  function countHeadingsBetween(headingIndices, fromIdx, toIdx) {
    var count = 0;
    for (var i = 0; i < headingIndices.length; i++) {
      if (headingIndices[i] > fromIdx && headingIndices[i] <= toIdx) {
        count++;
      }
    }
    return count;
  }

  function selectAdPositions(headingIndices, visualIndices, children, maxAds) {
    var totalChildren = children.length;
    var skipUntil = Math.floor(totalChildren * CONTENT_SKIP_RATIO);

    var candidates = [];

    for (var i = 0; i < visualIndices.length; i++) {
      var vIdx = visualIndices[i];
      if (vIdx + 1 < totalChildren) {
        candidates.push({ pos: vIdx + 1, isVisual: true });
      }
    }

    for (var i = 0; i < headingIndices.length; i++) {
      var hIdx = headingIndices[i];
      if (hIdx < skipUntil) continue;

      var nearVisual = false;
      for (var j = 0; j < candidates.length; j++) {
        if (Math.abs(hIdx - candidates[j].pos) <= VISUAL_HEADING_PROXIMITY) {
          nearVisual = true;
          break;
        }
      }
      if (!nearVisual) {
        candidates.push({ pos: hIdx, isVisual: false });
      }
    }

    candidates.sort(function(a, b) {
      if (a.pos !== b.pos) return a.pos - b.pos;
      return a.isVisual ? -1 : 1;
    });

    if (candidates.length === 0) return [];

    var selected = [candidates[0].pos];

    for (var i = 1; i < candidates.length && selected.length < maxAds; i++) {
      var lastPos = selected[selected.length - 1];
      var headingsBetween = countHeadingsBetween(headingIndices, lastPos, candidates[i].pos);
      if (headingsBetween >= MIN_HEADINGS_GAP) {
        selected.push(candidates[i].pos);
      }
    }

    return selected;
  }

  function enforcePixelGap(positions, children) {
    if (positions.length <= 1) return positions;

    var rects = {};
    for (var i = 0; i < positions.length; i++) {
      var el = children[positions[i]];
      if (el) rects[positions[i]] = el.getBoundingClientRect();
    }

    var filtered = [positions[0]];
    for (var i = 1; i < positions.length; i++) {
      var lastRect = rects[filtered[filtered.length - 1]];
      var currRect = rects[positions[i]];
      if (lastRect && currRect && currRect.top - lastRect.top >= MIN_PIXEL_GAP) {
        filtered.push(positions[i]);
      }
    }

    return filtered;
  }

  function injectContentAds() {
    var article = document.querySelector(CONTENT_SELECTOR);
    if (!article || adsAlreadyInjected(article)) return;

    var children = Array.from(article.children);
    if (children.length === 0) return;

    var headingIndices = getHeadingIndices(children);
    if (headingIndices.length < MIN_HEADINGS_FOR_ADS) return;

    var visualIndices = getVisualIndices(children);
    var maxAds = getMaxAds(article);
    var positions = selectAdPositions(headingIndices, visualIndices, children, maxAds);
    positions = enforcePixelGap(positions, children);

    for (var i = 0; i < positions.length; i++) {
      var ad;
      if (i % 2 !== 0) {
        ad = createDisplayAdElement(FIRST_AD_SLOT);
      } else {
        ad = createInArticleAdElement(IN_ARTICLE_AD_SLOT);
      }

      var idx = positions[i];
      if (idx < children.length) {
        article.insertBefore(ad, children[idx]);
      } else {
        article.appendChild(ad);
      }

      lazyLoadAd(ad);
      watchForUnfilled(ad);
    }
  }

  function observeStaticAds() {
    var staticAds = document.querySelectorAll(LAZY_AD_SELECTOR);
    for (var i = 0; i < staticAds.length; i++) {
      if (!staticAds[i].classList.contains(AD_CLASS)) {
        lazyLoadAd(staticAds[i]);
      }
      watchForUnfilled(staticAds[i]);
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
