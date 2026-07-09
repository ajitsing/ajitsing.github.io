(function () {
  function formatCount(n) {
    var num = parseInt(String(n).replace(/[^\d]/g, ''), 10);
    if (isNaN(num) || num < 1) return '';
    if (num >= 1000000) {
      var m = num / 1000000;
      return (m >= 10 ? Math.round(m) : Math.round(m * 10) / 10) + 'M';
    }
    if (num >= 1000) {
      var k = num / 1000;
      return (k >= 10 ? Math.round(k) : Math.round(k * 10) / 10) + 'k';
    }
    return String(num);
  }

  function fillViews(root) {
    var nodes = (root || document).querySelectorAll('.popular-post-views[data-gc-path]');
    if (!nodes.length) return;

    Array.prototype.forEach.call(nodes, function (el) {
      if (el.getAttribute('data-gc-loaded')) return;
      el.setAttribute('data-gc-loaded', '1');

      var path = el.getAttribute('data-gc-path');
      if (!path) return;

      fetch('https://singhajit.goatcounter.com/counter/' + encodeURIComponent(path) + '.json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var raw = data.count_unique || data.count;
          var label = formatCount(raw);
          if (!label) return;
          el.textContent = label + ' views';
          el.removeAttribute('hidden');
        })
        .catch(function () {});
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { fillViews(document); });
  } else {
    fillViews(document);
  }

  var obs = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var nodes = mutations[i].addedNodes;
      for (var j = 0; j < nodes.length; j++) {
        var n = nodes[j];
        if (n.nodeType !== 1) continue;
        if (n.classList && n.classList.contains('sidebar-popular')) {
          fillViews(n);
        } else if (n.querySelector) {
          var pop = n.querySelector('.sidebar-popular');
          if (pop) fillViews(pop);
        }
      }
    }
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
