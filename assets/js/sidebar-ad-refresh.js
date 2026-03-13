(function() {
  var VIEWABILITY_THRESHOLD = 0.5;
  var MAX_REFRESHES = 10;

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
  var accumulated = 0;
  var timer = null;
  var count = 0;

  setupUnfilledObserver(ins);

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
    schedule();
  }

  function onHidden() {
    if (!isViewable) return;
    isViewable = false;
    if (viewableStart) {
      accumulated += Date.now() - viewableStart;
      viewableStart = null;
    }
    if (timer) { clearTimeout(timer); timer = null; }
  }

  function schedule() {
    if (count >= MAX_REFRESHES) return;
    var remaining = REFRESH_MS - accumulated;
    if (remaining <= 0) { refresh(); return; }
    timer = setTimeout(function() {
      if (isViewable) refresh();
    }, remaining);
  }

  function refresh() {
    accumulated = 0;
    viewableStart = isViewable ? Date.now() : null;
    count++;

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

    setupUnfilledObserver(el);

    if (isViewable && count < MAX_REFRESHES) schedule();
  }

  function setupUnfilledObserver(insEl) {
    function check() {
      var s = insEl.getAttribute('data-ad-status');
      if (s === 'unfilled') container.classList.add('ad-unfilled');
      else if (s === 'filled') container.classList.remove('ad-unfilled');
    }
    check();
    new MutationObserver(check).observe(insEl, {
      attributes: true, attributeFilter: ['data-ad-status']
    });
  }
})();
