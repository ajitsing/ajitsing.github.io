(function() {
  'use strict';

  const POSTS_PER_PAGE = 10;
  const POSTS_DATA_URL = '/posts-data.json';
  const SCROLL_DELAY_MS = 150;
  const RENDER_DELAY_MS = 100;
  const AD_POSITIONS = [2, 6];

  let allPosts = [];
  let filteredPosts = [];
  let currentPage = 1;
  let currentCategory = 'all';
  let isInitialized = false;

  let postsContainer = null;
  let paginationContainer = null;
  let categoryFilters = null;

  async function init() {
    postsContainer = document.querySelector('.posts-list');
    if (!postsContainer) return;

    paginationContainer = document.createElement('div');
    paginationContainer.className = 'category-pagination';
    paginationContainer.style.display = 'none';
    postsContainer.parentNode.insertBefore(paginationContainer, postsContainer.nextSibling);

    categoryFilters = document.querySelector('.category-filters');

    try {
      const response = await fetch(POSTS_DATA_URL);
      if (!response.ok) throw new Error('Failed to load posts data');
      allPosts = await response.json();
      filteredPosts = [...allPosts];
      isInitialized = true;

      const hash = window.location.hash;
      if (hash && hash.startsWith('#category=')) {
        const category = hash.replace('#category=', '');
        const pill = document.querySelector(`.category-pill[data-category="${category}"]`);
        if (pill) {
          filterByCategory(category, pill);
          return;
        }
      }

      renderPosts();
    } catch (error) {
      console.error('Category filter initialization failed:', error);
    }
  }

  window.filterByCategory = function(category, element) {
    if (!isInitialized) return;

    currentCategory = category;
    currentPage = 1;

    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.classList.remove('active');
    });
    if (element) {
      element.classList.add('active');
    }

    if (category === 'all') {
      filteredPosts = [...allPosts];
    } else {
      filteredPosts = allPosts.filter(post => {
        return post.categories && post.categories.some(cat => 
          cat.toLowerCase() === category.toLowerCase()
        );
      });
    }

    if (category === 'all') {
      history.replaceState(null, '', window.location.pathname);
    } else {
      history.replaceState(null, '', `#category=${category}`);
    }

    if (typeof gtag !== 'undefined') {
      gtag('event', 'filter_category', {
        'event_category': 'Category Filter',
        'event_label': category,
        'value': filteredPosts.length
      });
    }

    renderPosts();
    smoothScrollToPosts();
  };

  function smoothScrollToPosts() {
    setTimeout(() => {
      if (postsContainer) {
        const headerOffset = categoryFilters ? categoryFilters.offsetHeight + 20 : 80;
        const elementPosition = postsContainer.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, SCROLL_DELAY_MS);
  }

  function renderPosts() {
    if (!postsContainer) return;

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    postsContainer.classList.add('loading');

    setTimeout(() => {
      if (postsToShow.length === 0) {
        postsContainer.innerHTML = `
          <div class="no-posts-message">
            <i class="fas fa-search"></i>
            <p>No posts found in this category.</p>
          </div>
        `;
        paginationContainer.style.display = 'none';
      } else {
        let html = '';
        postsToShow.forEach((post, index) => {
          html += renderPostCard(post);
          if (AD_POSITIONS.includes(index)) {
            html += renderInFeedAd();
          }
        });
        postsContainer.innerHTML = html;
        initializeAds();
        renderPagination(totalPages);
      }

      postsContainer.classList.remove('loading');
    }, RENDER_DELAY_MS);
  }

  function renderPostCard(post) {
    const thumbnailHTML = post.thumbnail 
      ? `<div class="post-thumbnail">
          <img src="${escapeHTML(post.thumbnail)}" alt="${escapeHTML(post.title)}" loading="lazy">
        </div>`
      : `<div class="post-thumbnail post-thumbnail-placeholder">
          <i class="fas fa-file-alt"></i>
        </div>`;

    const subtitleHTML = post.subtitle 
      ? `<p class="post-subtitle">${escapeHTML(post.subtitle)}</p>`
      : `<p class="post-excerpt">${escapeHTML(post.excerpt)}</p>`;

    const categoriesHTML = post.categories && post.categories.length > 0
      ? `<div class="post-tags-row">
          ${post.categories.slice(0, 2).map(cat => 
            `<span class="post-tag">${escapeHTML(cat)}</span>`
          ).join('')}
        </div>`
      : '';

    return `
      <article class="post-preview">
        <a href="${escapeHTML(post.url)}" class="post-preview-link">
          <div class="post-content">
            <h2 class="post-title">${escapeHTML(post.title)}</h2>
            ${subtitleHTML}
            <div class="post-meta-row">
              <span class="post-date">${escapeHTML(post.date)}</span>
            </div>
          </div>
          ${thumbnailHTML}
        </a>
        ${categoriesHTML}
      </article>
    `;
  }

  function renderPagination(totalPages) {
    if (totalPages <= 1) {
      paginationContainer.style.display = 'none';
      return;
    }

    paginationContainer.style.display = 'flex';
    paginationContainer.innerHTML = `
      <button class="category-pagination-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        &larr; Previous
      </button>
      <span class="category-pagination-info">
        Page ${currentPage} of ${totalPages}
      </span>
      <button class="category-pagination-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
        Next &rarr;
      </button>
    `;
  }

  window.goToPage = function(page) {
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderPosts();

    if (typeof gtag !== 'undefined') {
      gtag('event', 'paginate', {
        'event_category': 'Category Filter',
        'event_label': currentCategory,
        'value': page
      });
    }
  };

  function renderInFeedAd() {
    return `
      <div class="in-feed-ad" aria-label="Advertisement">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-format="fluid"
             data-ad-layout-key="-fz-16+2s-di+qa"
             data-ad-client="ca-pub-2886086145980317"
             data-ad-slot="7281945758"></ins>
      </div>
    `;
  }

  function initializeAds() {
    try {
      const adSlots = postsContainer.querySelectorAll('.adsbygoogle:not([data-ad-status])');
      adSlots.forEach(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      });
    } catch (e) {}
  }

  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
