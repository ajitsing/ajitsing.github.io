(function () {
  var searchInput = document.getElementById("tools-search-input");
  var pills = document.querySelectorAll(".tools-pill");
  var popularSection = document.querySelector("[data-popular-section]");
  var cards = document.querySelectorAll("[data-tools-grid] .tool-card");
  var emptyState = document.querySelector("[data-tools-empty]");
  var countEl = document.querySelector("[data-tools-count]");
  var activeCategory = "all";

  if (!searchInput || !cards.length) return;

  function applyFilters() {
    var query = (searchInput.value || "").trim().toLowerCase();
    var visible = 0;

    cards.forEach(function (card) {
      var category = card.getAttribute("data-category") || "";
      var haystack = card.getAttribute("data-search") || "";
      var matchesCategory = activeCategory === "all" || category === activeCategory;
      var matchesQuery = !query || haystack.indexOf(query) !== -1;
      var show = matchesCategory && matchesQuery;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    var filtering = activeCategory !== "all" || query.length > 0;
    if (popularSection) {
      popularSection.classList.toggle("is-hidden", filtering);
    }

    if (emptyState) {
      emptyState.hidden = visible > 0;
    }

    if (countEl) {
      countEl.textContent = visible + (visible === 1 ? " tool" : " tools");
    }
  }

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      activeCategory = pill.getAttribute("data-category") || "all";
      pills.forEach(function (other) {
        other.classList.toggle("is-active", other === pill);
      });
      applyFilters();
    });
  });

  searchInput.addEventListener("input", applyFilters);
  applyFilters();
})();
