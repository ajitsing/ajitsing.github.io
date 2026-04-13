(function() {
  var VIEWABILITY_THRESHOLD = 0.5;
  var MAX_REFRESHES = 10;
  var UNFILLED_RETRY_MS = 6000;
  var MAX_UNFILLED_RETRIES = 5;

  var container = document.querySelector('.sidebar-sticky-ad');
  if (!container) return;

  var refreshSec = parseInt(container.getAttribute('data-ad-refresh'), 10);
  if (!refreshSec || refreshSec < 30) return;
  var REFRESH_MS = refreshSec * 1000;

  var ins = container.querySelector('.adsbygoogle');
  if (!ins) return;

  var adClient = ins.getAttribute('data-ad-client');
  var adSlot = ins.getAttribute('data-ad-slot');
  var adFormat = ins.getAttribute('data-ad-format');
  var adResponsive = ins.getAttribute('data-full-width-responsive');

  var isViewable = false;
  var viewableStart = null;
  var viewableAccumulated = 0;

  var refreshTimer = null;
  var refreshCount = 0;
  var adIsFilled = false;

  var retryTimer = null;
  var retryCount = 0;

  function createNewAdSlot() {
    var old = container.querySelector('.adsbygoogle');
    if (old) old.remove();

    var el = document.createElement('ins');
    el.className = 'adsbygoogle';
    el.style.display = 'block';
    el.setAttribute('data-ad-client', adClient);
    el.setAttribute('data-ad-slot', adSlot);
    if (adFormat) el.setAttribute('data-ad-format', adFormat);
    if (adResponsive) el.setAttribute('data-full-width-responsive', adResponsive);

    container.appendChild(el);
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}

    observeAdStatus(el);
  }

  function observeAdStatus(insEl) {
    new MutationObserver(function() {
      var status = insEl.getAttribute('data-ad-status');
      if (status === 'filled') onAdFilled();
      else if (status === 'unfilled') onAdUnfilled();
    }).observe(insEl, {
      attributes: true, attributeFilter: ['data-ad-status']
    });
  }

  // ===== When ad fills: stop retries, start 30s refresh =====
  function onAdFilled() {
    adIsFilled = true;
    container.classList.remove('ad-unfilled');

    if (retryTimer) { clearTimeout(retryTimer); retryTimer = null; }
    retryCount = 0;

    viewableAccumulated = 0;
    viewableStart = isViewable ? Date.now() : null;
    if (isViewable) tickRefresh();
  }

  // ===== When ad is unfilled: stop refresh, start retries =====
  function onAdUnfilled() {
    adIsFilled = false;

    if (refreshTimer) { clearTimeout(refreshTimer); refreshTimer = null; }

    scheduleRetry();
  }

  // ===== FLOW 1: Unfilled retries (6s, up to 5 attempts) =====
  function scheduleRetry() {
    if (retryCount >= MAX_UNFILLED_RETRIES) {
      container.classList.add('ad-unfilled');
      return;
    }
    if (retryTimer) clearTimeout(retryTimer);
    retryTimer = setTimeout(function() {
      retryTimer = null;
      retryCount++;
      createNewAdSlot();
    }, UNFILLED_RETRY_MS);
  }

  // ===== FLOW 2: Viewable refresh (30s of viewable time) =====
  function tickRefresh() {
    if (refreshCount >= MAX_REFRESHES || !adIsFilled) return;
    if (refreshTimer) { clearTimeout(refreshTimer); refreshTimer = null; }

    var remaining = REFRESH_MS - viewableAccumulated;
    if (remaining <= 0) {
      doRefresh();
      return;
    }
    refreshTimer = setTimeout(function() {
      refreshTimer = null;
      if (isViewable && adIsFilled) doRefresh();
    }, remaining);
  }

  function doRefresh() {
    refreshCount++;
    adIsFilled = false;
    if (refreshTimer) { clearTimeout(refreshTimer); refreshTimer = null; }
    createNewAdSlot();
  }

  // ===== Viewability tracking (only drives Flow 2) =====
  var io = new IntersectionObserver(function(entries) {
    var e = entries[0];
    if (e.isIntersecting && e.intersectionRatio >= VIEWABILITY_THRESHOLD) {
      onViewable();
    } else {
      onHidden();
    }
  }, { threshold: [0, VIEWABILITY_THRESHOLD] });

  io.observe(container);

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) onHidden();
  });

  function onViewable() {
    if (isViewable) return;
    isViewable = true;
    viewableStart = Date.now();
    if (adIsFilled) tickRefresh();
  }

  function onHidden() {
    if (!isViewable) return;
    isViewable = false;
    if (viewableStart) {
      viewableAccumulated += Date.now() - viewableStart;
      viewableStart = null;
    }
    if (refreshTimer) { clearTimeout(refreshTimer); refreshTimer = null; }
  }

  // ===== Init =====
  observeAdStatus(ins);


})();
