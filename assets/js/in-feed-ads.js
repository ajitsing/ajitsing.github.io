(function() {
  'use strict';

  var AD_LOAD_TIMEOUT_MS = 5000;
  var AD_CONTAINER_SELECTOR = '.in-feed-ad';

  function hideEmptyAds() {
    var inFeedAds = document.querySelectorAll(AD_CONTAINER_SELECTOR);

    inFeedAds.forEach(function(container) {
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
    setTimeout(function() {
      requestAnimationFrame(hideEmptyAds);
    }, AD_LOAD_TIMEOUT_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
