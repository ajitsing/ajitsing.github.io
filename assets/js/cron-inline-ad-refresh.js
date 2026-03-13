(function() {
  var MAX_REFRESHES = 10;

  var container = document.querySelector('.cron-inline-ad');
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

  var count = 0;
  var timer = null;

  setupUnfilledObserver(ins);
  startTimer();

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  function startTimer() {
    if (timer || count >= MAX_REFRESHES) return;
    timer = setInterval(refresh, REFRESH_MS);
  }

  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function refresh() {
    if (count >= MAX_REFRESHES) { stopTimer(); return; }
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

    var label = container.querySelector('.ad-label');
    if (label) {
      label.insertAdjacentElement('afterend', el);
    } else {
      container.appendChild(el);
    }

    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}

    setupUnfilledObserver(el);
  }

  function setupUnfilledObserver(insEl, retries) {
    retries = retries || 0;
    var MAX_UNFILLED_RETRIES = 3;
    var RETRY_DELAY_MS = 5000;

    function check() {
      var s = insEl.getAttribute('data-ad-status');
      if (s === 'unfilled') {
        container.classList.add('ad-unfilled');
        if (retries < MAX_UNFILLED_RETRIES) {
          setTimeout(function() { retryFill(retries + 1); }, RETRY_DELAY_MS);
        }
      } else if (s === 'filled') {
        container.classList.remove('ad-unfilled');
      }
    }
    check();
    new MutationObserver(function() { check(); }).observe(insEl, {
      attributes: true, attributeFilter: ['data-ad-status']
    });
  }

  function retryFill(retries) {
    var old = container.querySelector('.adsbygoogle');
    if (old) old.remove();

    var el = document.createElement('ins');
    el.className = 'adsbygoogle';
    el.style.display = 'block';
    el.setAttribute('data-ad-client', adClient);
    el.setAttribute('data-ad-slot', adSlot);
    if (adFormat) el.setAttribute('data-ad-format', adFormat);
    if (adResponsive) el.setAttribute('data-full-width-responsive', adResponsive);

    var label = container.querySelector('.ad-label');
    if (label) {
      label.insertAdjacentElement('afterend', el);
    } else {
      container.appendChild(el);
    }

    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}

    setupUnfilledObserver(el, retries);
  }
})();
