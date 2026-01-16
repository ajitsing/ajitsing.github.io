(function() {
  'use strict';

  var SCROLL_MILESTONES = [25, 50, 75, 100];
  var INIT_DELAY = 100;
  var EVENT_NAME = 'scroll_depth';
  var EVENT_CATEGORY = 'Engagement';

  function isLocalhost() {
    var hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1';
  }

  function isGtagAvailable() {
    return typeof gtag === 'function';
  }

  function getDocumentHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  }

  function getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight;
  }

  function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  }

  function getScrollPercentage() {
    var windowHeight = getWindowHeight();
    var documentHeight = getDocumentHeight();
    var scrollTop = getScrollTop();
    var scrollableHeight = documentHeight - windowHeight;
    
    if (scrollableHeight <= 0) {
      return 100;
    }
    
    return Math.round((scrollTop / scrollableHeight) * 100);
  }

  function createScrollTracker() {
    var trackedMilestones = {};
    var maxScroll = 0;
    var isTracking = false;

    function trackMilestone(percentage) {
      if (trackedMilestones[percentage] || percentage < maxScroll) {
        return;
      }

      trackedMilestones[percentage] = true;
      maxScroll = Math.max(maxScroll, percentage);

      gtag('event', EVENT_NAME, {
        'event_category': EVENT_CATEGORY,
        'event_label': percentage + '%',
        'value': percentage,
        'non_interaction': false
      });
    }

    function checkMilestones() {
      if (isTracking) {
        return;
      }

      isTracking = true;
      
      requestAnimationFrame(function() {
        var currentScroll = getScrollPercentage();
        
        SCROLL_MILESTONES.forEach(function(milestone) {
          if (currentScroll >= milestone) {
            trackMilestone(milestone);
          }
        });
        
        isTracking = false;
      });
    }

    function trackFinalScroll() {
      var finalScroll = getScrollPercentage();
      SCROLL_MILESTONES.forEach(function(milestone) {
        if (finalScroll >= milestone && !trackedMilestones[milestone]) {
          trackMilestone(milestone);
        }
      });
    }

    function init() {
      window.addEventListener('scroll', checkMilestones, { passive: true });
      window.addEventListener('beforeunload', trackFinalScroll);

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          setTimeout(checkMilestones, INIT_DELAY);
        });
      } else {
        setTimeout(checkMilestones, INIT_DELAY);
      }
    }

    return {
      init: init
    };
  }

  if (isLocalhost() || !isGtagAvailable()) {
    return;
  }

  createScrollTracker().init();
})();
