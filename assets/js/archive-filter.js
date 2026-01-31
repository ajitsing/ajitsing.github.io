(function() {
  'use strict';

  const elements = {
    search: document.getElementById('archiveSearch'),
    searchClear: document.getElementById('searchClear'),
    content: document.getElementById('archiveContent'),
    resultsCount: document.getElementById('resultsCount'),
    noResults: document.getElementById('noResults'),
    resetBtn: document.getElementById('resetFilters')
  };

  if (!elements.search || !elements.content) return;

  const sections = [...elements.content.querySelectorAll('.archive-section')];
  const cards = [...elements.content.querySelectorAll('.archive-card')];
  const pills = [...document.querySelectorAll('.filter-pill')];
  const totalPosts = cards.length;

  let state = { category: 'all', search: '' };

  function init() {
    let debounceTimer;
    elements.search.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.search = elements.search.value.toLowerCase().trim();
        elements.searchClear.style.display = state.search ? 'block' : 'none';
        render();
        if (state.search.length > 2) {
          gtag('event', 'search', { event_category: 'Archive', event_label: state.search });
        }
      }, 200);
    });

    elements.searchClear.addEventListener('click', () => {
      elements.search.value = '';
      state.search = '';
      elements.searchClear.style.display = 'none';
      elements.search.focus();
      render();
    });

    elements.resetBtn.addEventListener('click', reset);

    pills.forEach(pill => {
      pill.addEventListener('click', () => filterByCategory(pill.dataset.category, pill));
    });

    handleHash();
    window.addEventListener('hashchange', handleHash);
  }

  function handleHash() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const pill = pills.find(p => p.dataset.category === hash);
      if (pill) filterByCategory(hash, pill);
    }
  }

  function filterByCategory(category, activePill) {
    state.category = category;
    pills.forEach(p => p.classList.toggle('active', p === activePill));
    history.replaceState(null, '', category === 'all' ? window.location.pathname : `#${category}`);
    render();
    gtag('event', 'filter', { event_category: 'Archive', event_label: category });
  }

  function reset() {
    state = { category: 'all', search: '' };
    elements.search.value = '';
    elements.searchClear.style.display = 'none';
    pills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
    history.replaceState(null, '', window.location.pathname);
    render();
  }

  function render() {
    let visibleCount = 0;

    if (state.search) {
      sections.forEach(section => section.classList.add('hidden'));
      
      cards.forEach(card => {
        const categories = (card.dataset.categories || '').toLowerCase().split(',');
        const title = card.dataset.title || '';
        const matchesCategory = state.category === 'all' || categories.includes(state.category);
        const matchesSearch = title.includes(state.search);
        const isVisible = matchesCategory && matchesSearch;
        
        card.classList.toggle('hidden', !isVisible);
        
        if (isVisible) {
          visibleCount++;
          card.closest('.archive-section')?.classList.remove('hidden');
        }
      });
    } else {
      sections.forEach(section => {
        const sectionCategory = section.dataset.section;
        const isVisible = state.category === 'all' || sectionCategory === state.category;
        section.classList.toggle('hidden', !isVisible);
        
        if (isVisible) {
          const sectionCards = section.querySelectorAll('.archive-card');
          sectionCards.forEach(card => card.classList.remove('hidden'));
          visibleCount += sectionCards.length;
        }
      });
    }

    elements.content.style.display = visibleCount ? 'block' : 'none';
    elements.noResults.style.display = visibleCount ? 'none' : 'block';
    updateResultsText(visibleCount);
  }

  function updateResultsText(count) {
    let text;
    if (state.category === 'all' && !state.search) {
      text = `Showing all ${totalPosts} items`;
    } else if (count === 0) {
      text = 'No content found';
    } else if (count === 1) {
      text = 'Showing 1 item';
    } else {
      text = `Showing ${count} of ${totalPosts} items`;
    }
    if (state.search) text += ` for "${state.search}"`;
    elements.resultsCount.textContent = text;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
