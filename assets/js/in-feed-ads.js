(function() {
  'use strict';

  var FEED_CLASS = AdLoader.CLASSES.FEED;

  function injectFeedAds() {
    var containers = document.querySelectorAll('.' + FEED_CLASS);
    containers.forEach(function(container) {
      if (container.querySelector('ins')) return;
      container.id = FEED_CLASS + '-' + AdLoader.randomId();
      AdLoader.injectAd(container, AdLoader.CONFIG.SLOTS.IN_FEED, 'fluid', '-fz-16+2s-di+qa');
    });
  }

  function init() {
    injectFeedAds();
    AdLoader.scheduleEmptyCheck('.' + FEED_CLASS);
  }

  AdLoader.delayedInit(init);
})();
