/* ==========================================================================
 * HAR File Viewer — pure JavaScript, no dependencies.
 *
 * Parses HAR 1.2 logs and renders a filterable, sortable entries table with
 * a per-request waterfall and a tabbed detail panel (headers / cookies /
 * query / request body / response body / timings).
 *
 * Everything runs client-side. The HAR is never uploaded.
 * ========================================================================== */
(function () {
  'use strict';

  // ---------- gtag helper -------------------------------------------------
  function track(action, label, value) {
    if (typeof gtag === 'function') {
      try {
        gtag('event', action, {
          event_category: 'HAR Viewer',
          event_label: label,
          value: value
        });
      } catch (e) { /* ignore */ }
    }
  }

  // ---------- DOM ---------------------------------------------------------
  const $ = (id) => document.getElementById(id);

  // Loader
  const loaderSection = $('loader-section');
  const fileInput = $('har-file');
  const fileDropZone = $('file-drop-zone');
  const pasteArea = $('har-paste');
  const pasteLoadBtn = $('paste-load-btn');
  const pasteClearBtn = $('paste-clear-btn');
  const sampleLoadBtn = $('sample-load-btn');
  const loaderError = $('loader-error');
  const loaderErrorText = $('loader-error-text');

  // Viewer
  const viewerSection = $('viewer-section');
  const metaSource = $('meta-source');
  const metaCreator = $('meta-creator');
  const metaVersion = $('meta-version');
  const redactToggle = $('redact-toggle');
  const exportBtn = $('export-btn');
  const closeBtn = $('close-btn');

  const sumRequests = $('sum-requests');
  const sumRequestsSub = $('sum-requests-sub');
  const sumTransferred = $('sum-transferred');
  const sumResources = $('sum-resources');
  const sumTotalTime = $('sum-total-time');
  const sumStatusChips = $('sum-status-chips');

  const filterUrl = $('filter-url');
  const filterMethods = $('filter-methods');
  const filterStatus = $('filter-status');
  const filterTypes = $('filter-types');

  const entriesTable = $('entries-table');
  const entriesBody = $('entries-body');
  const entriesEmpty = $('entries-empty');
  const clearFiltersBtn = $('clear-filters-btn');

  const detailPanel = $('detail-panel');
  const detailMethod = $('detail-method');
  const detailStatus = $('detail-status');
  const detailUrl = $('detail-url');
  const detailCloseBtn = $('detail-close-btn');
  const detailBody = $('detail-body');

  // ---------- State -------------------------------------------------------
  const state = {
    har: null,                  // raw HAR object
    sourceName: '',             // file name or "Pasted HAR"
    entries: [],                // normalized entries (one per HAR entry)
    timelineStart: 0,           // earliest startedDateTime in ms
    timelineEnd: 0,             // latest end in ms
    filter: {
      url: '',
      urlRegex: null,
      methods: new Set(),       // empty = all
      status: 'all',
      type: 'all'
    },
    sort: { key: 'started', dir: 'asc' },
    selectedId: null,
    detailTab: 'headers',
    redact: false
  };

  // ---------- Loader: file ----------------------------------------------
  fileDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropZone.classList.add('dragover');
  });
  fileDropZone.addEventListener('dragleave', () => {
    fileDropZone.classList.remove('dragover');
  });
  fileDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropZone.classList.remove('dragover');
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) loadFile(file);
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (file) loadFile(file);
  });

  function loadFile(file) {
    clearError();
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const har = JSON.parse(reader.result);
        ingest(har, file.name);
        track('load', 'file', file.size);
      } catch (err) {
        showError('Could not parse HAR file: ' + err.message);
      }
    };
    reader.onerror = () => showError('Failed to read file.');
    reader.readAsText(file);
  }

  // ---------- Loader: paste ----------------------------------------------
  pasteLoadBtn.addEventListener('click', () => {
    const text = pasteArea.value.trim();
    if (!text) {
      showError('Paste some HAR JSON first.');
      return;
    }
    clearError();
    try {
      const har = JSON.parse(text);
      ingest(har, 'Pasted HAR');
      track('load', 'paste', text.length);
    } catch (err) {
      showError('Could not parse pasted JSON: ' + err.message);
    }
  });

  pasteClearBtn.addEventListener('click', () => {
    pasteArea.value = '';
    pasteArea.focus();
    clearError();
  });

  // ---------- Loader: tabs ------------------------------------------------
  const loaderTabs = document.querySelectorAll('.loader-tab');
  loaderTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      loaderTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const name = tab.getAttribute('data-loader');
      document.querySelectorAll('.loader-panel').forEach((p) => p.classList.add('hidden'));
      $('loader-panel-' + name).classList.remove('hidden');
      clearError();
    });
  });

  // ---------- Loader: sample ----------------------------------------------
  sampleLoadBtn.addEventListener('click', () => {
    clearError();
    ingest(buildSampleHar(), 'Sample HAR');
    track('load', 'sample', 0);
  });

  function showError(msg) {
    loaderErrorText.textContent = msg;
    loaderError.classList.remove('hidden');
  }
  function clearError() {
    loaderError.classList.add('hidden');
    loaderErrorText.textContent = '';
  }

  // ---------- Ingest ------------------------------------------------------
  function ingest(har, sourceName) {
    if (!har || typeof har !== 'object' || !har.log || !Array.isArray(har.log.entries)) {
      showError('Not a valid HAR file. Expected { log: { entries: [...] } }.');
      return;
    }
    state.har = har;
    state.sourceName = sourceName || '—';

    const rawEntries = har.log.entries;
    state.entries = rawEntries.map((e, i) => normalizeEntry(e, i));

    if (state.entries.length) {
      state.timelineStart = Math.min.apply(null, state.entries.map((e) => e.startedMs));
      state.timelineEnd = Math.max.apply(null, state.entries.map((e) => e.startedMs + Math.max(0, e.time || 0)));
    } else {
      state.timelineStart = 0;
      state.timelineEnd = 0;
    }

    state.filter = { url: '', urlRegex: null, methods: new Set(), status: 'all', type: 'all' };
    state.sort = { key: 'started', dir: 'asc' };
    state.selectedId = null;
    detailPanel.classList.add('hidden');

    metaSource.textContent = state.sourceName;
    const creator = har.log.creator || {};
    metaCreator.textContent = (creator.name || 'unknown') + (creator.version ? ' ' + creator.version : '');
    metaVersion.textContent = 'HAR ' + (har.log.version || '1.2');

    loaderSection.classList.add('hidden');
    viewerSection.classList.remove('hidden');

    renderMethodChips();
    renderSummary();
    renderEntries();
    viewerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function normalizeEntry(e, i) {
    const req = e.request || {};
    const res = e.response || {};
    const timings = e.timings || {};
    const started = e.startedDateTime ? Date.parse(e.startedDateTime) : 0;
    let urlObj = null;
    try { urlObj = new URL(req.url || ''); } catch (_) { /* ignore */ }
    const status = res.status || 0;
    const mime = (res.content && res.content.mimeType) || '';

    return {
      id: i,
      raw: e,
      method: (req.method || 'GET').toUpperCase(),
      url: req.url || '',
      host: urlObj ? urlObj.host : '',
      path: urlObj ? (urlObj.pathname + (urlObj.search || '')) : (req.url || ''),
      status: status,
      statusText: res.statusText || '',
      mime: mime,
      typeGroup: classifyType(req.url || '', mime),
      // size we display = response body decoded (content.size) is "resource" size;
      // transfer = headersSize + bodySize. Prefer transferred bytes when available.
      transferSize: bytesOver(req, res),
      resourceSize: (res.content && res.content.size) || 0,
      time: e.time != null ? e.time : sumTimings(timings),
      timings: timings,
      startedMs: isFinite(started) ? started : 0,
      isError: !status || status >= 400
    };
  }

  function sumTimings(t) {
    let s = 0;
    ['blocked', 'dns', 'connect', 'ssl', 'send', 'wait', 'receive'].forEach((k) => {
      const v = t[k];
      if (typeof v === 'number' && v > 0) s += v;
    });
    return s;
  }

  function bytesOver(req, res) {
    let total = 0;
    if (req && req.headersSize > 0) total += req.headersSize;
    if (req && req.bodySize > 0) total += req.bodySize;
    if (res && res.headersSize > 0) total += res.headersSize;
    if (res && res.bodySize > 0) total += res.bodySize;
    if (total > 0) return total;
    // Fallback to decoded content size when headersSize is missing/-1.
    if (res && res.content && res.content.size > 0) return res.content.size;
    return 0;
  }

  function classifyType(url, mime) {
    const m = (mime || '').toLowerCase();
    const u = (url || '').toLowerCase().split('?')[0];
    if (m.indexOf('html') !== -1) return 'doc';
    if (m.indexOf('css') !== -1 || u.endsWith('.css')) return 'css';
    if (m.indexOf('javascript') !== -1 || m.indexOf('ecmascript') !== -1 ||
        u.endsWith('.js') || u.endsWith('.mjs')) return 'js';
    if (m.indexOf('json') !== -1 || m.indexOf('xml') !== -1 ||
        m.indexOf('application/x-www-form-urlencoded') !== -1) return 'xhr';
    if (m.indexOf('image/') !== -1 ||
        u.endsWith('.png') || u.endsWith('.jpg') || u.endsWith('.jpeg') ||
        u.endsWith('.gif') || u.endsWith('.svg') || u.endsWith('.webp') ||
        u.endsWith('.avif') || u.endsWith('.ico')) return 'img';
    if (m.indexOf('font/') !== -1 || m.indexOf('font-') !== -1 ||
        u.endsWith('.woff') || u.endsWith('.woff2') || u.endsWith('.ttf') ||
        u.endsWith('.otf') || u.endsWith('.eot')) return 'font';
    if (m.indexOf('video/') !== -1 || m.indexOf('audio/') !== -1 ||
        u.endsWith('.mp4') || u.endsWith('.webm') || u.endsWith('.mp3') ||
        u.endsWith('.wav') || u.endsWith('.ogg')) return 'media';
    return 'other';
  }

  // ---------- Method chips (dynamic per HAR) ------------------------------
  function renderMethodChips() {
    const methods = Array.from(new Set(state.entries.map((e) => e.method))).sort();
    const html = ['<button type="button" class="chip active" data-method="all">All</button>']
      .concat(methods.map((m) => '<button type="button" class="chip" data-method="' + m + '">' + escapeHtml(m) + '</button>'))
      .join('');
    filterMethods.innerHTML = html;
    filterMethods.querySelectorAll('.chip').forEach((c) => {
      c.addEventListener('click', () => {
        const m = c.getAttribute('data-method');
        if (m === 'all') {
          state.filter.methods.clear();
          filterMethods.querySelectorAll('.chip').forEach((x) => x.classList.remove('active'));
          c.classList.add('active');
        } else {
          filterMethods.querySelector('[data-method="all"]').classList.remove('active');
          if (state.filter.methods.has(m)) {
            state.filter.methods.delete(m);
            c.classList.remove('active');
          } else {
            state.filter.methods.add(m);
            c.classList.add('active');
          }
          if (state.filter.methods.size === 0) {
            filterMethods.querySelector('[data-method="all"]').classList.add('active');
          }
        }
        renderEntries();
      });
    });
  }

  // Status / type filter chips
  filterStatus.querySelectorAll('.chip').forEach((c) => {
    c.addEventListener('click', () => {
      filterStatus.querySelectorAll('.chip').forEach((x) => x.classList.remove('active'));
      c.classList.add('active');
      state.filter.status = c.getAttribute('data-status');
      renderEntries();
    });
  });
  filterTypes.querySelectorAll('.chip').forEach((c) => {
    c.addEventListener('click', () => {
      filterTypes.querySelectorAll('.chip').forEach((x) => x.classList.remove('active'));
      c.classList.add('active');
      state.filter.type = c.getAttribute('data-type');
      renderEntries();
    });
  });

  // URL filter with optional /regex/ syntax
  let urlDebounce = 0;
  filterUrl.addEventListener('input', () => {
    clearTimeout(urlDebounce);
    urlDebounce = setTimeout(() => {
      const v = filterUrl.value.trim();
      state.filter.url = v;
      state.filter.urlRegex = null;
      if (v.length > 2 && v[0] === '/' && v.lastIndexOf('/') > 0) {
        const last = v.lastIndexOf('/');
        const pat = v.slice(1, last);
        const flags = v.slice(last + 1);
        try { state.filter.urlRegex = new RegExp(pat, flags); } catch (_) { /* fall back to plain */ }
      }
      renderEntries();
    }, 120);
  });

  clearFiltersBtn.addEventListener('click', () => {
    filterUrl.value = '';
    state.filter = { url: '', urlRegex: null, methods: new Set(), status: 'all', type: 'all' };
    filterMethods.querySelectorAll('.chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-method') === 'all');
    });
    filterStatus.querySelectorAll('.chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-status') === 'all');
    });
    filterTypes.querySelectorAll('.chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-type') === 'all');
    });
    renderEntries();
  });

  // ---------- Sorting -----------------------------------------------------
  entriesTable.querySelectorAll('.sortable').forEach((h) => {
    h.addEventListener('click', () => {
      const key = h.getAttribute('data-sort');
      if (state.sort.key === key) {
        state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort.key = key;
        state.sort.dir = 'asc';
      }
      renderEntries();
    });
  });

  function applySortClasses() {
    entriesTable.querySelectorAll('.sortable').forEach((h) => {
      h.classList.remove('sort-asc', 'sort-desc');
      const i = h.querySelector('i');
      if (i) i.className = 'fas fa-sort';
      if (h.getAttribute('data-sort') === state.sort.key) {
        h.classList.add('sort-' + state.sort.dir);
        if (i) i.className = 'fas fa-sort-' + (state.sort.dir === 'asc' ? 'up' : 'down');
      }
    });
  }

  // ---------- Filtering ---------------------------------------------------
  function filtered() {
    const f = state.filter;
    return state.entries.filter((e) => {
      if (f.methods.size > 0 && !f.methods.has(e.method)) return false;
      if (f.status !== 'all') {
        if (f.status === 'err' && !(e.status === 0 || e.status >= 400)) return false;
        if (f.status === '2xx' && !(e.status >= 200 && e.status < 300)) return false;
        if (f.status === '3xx' && !(e.status >= 300 && e.status < 400)) return false;
        if (f.status === '4xx' && !(e.status >= 400 && e.status < 500)) return false;
        if (f.status === '5xx' && !(e.status >= 500 && e.status < 600)) return false;
      }
      if (f.type !== 'all' && e.typeGroup !== f.type) return false;
      if (f.url) {
        if (f.urlRegex) {
          if (!f.urlRegex.test(e.url)) return false;
        } else {
          if (e.url.toLowerCase().indexOf(f.url.toLowerCase()) === -1) return false;
        }
      }
      return true;
    });
  }

  // ---------- Render: summary --------------------------------------------
  function renderSummary() {
    const total = state.entries.length;
    sumRequestsSub.textContent = 'of ' + total;
    const totalTransfer = state.entries.reduce((s, e) => s + (e.transferSize || 0), 0);
    const totalResource = state.entries.reduce((s, e) => s + (e.resourceSize || 0), 0);
    const elapsed = state.timelineEnd > state.timelineStart
      ? (state.timelineEnd - state.timelineStart)
      : state.entries.reduce((s, e) => s + (e.time || 0), 0);

    sumTransferred.textContent = formatBytes(totalTransfer);
    sumResources.textContent = formatBytes(totalResource);
    sumTotalTime.textContent = formatMs(elapsed);

    // Status chips: count by status class
    const buckets = { 2: 0, 3: 0, 4: 0, 5: 0, 0: 0 };
    state.entries.forEach((e) => {
      if (!e.status) buckets[0]++;
      else if (e.status >= 500) buckets[5]++;
      else if (e.status >= 400) buckets[4]++;
      else if (e.status >= 300) buckets[3]++;
      else buckets[2]++;
    });
    const labels = { 2: '2xx', 3: '3xx', 4: '4xx', 5: '5xx', 0: 'err' };
    const html = Object.keys(buckets)
      .filter((k) => buckets[k] > 0)
      .map((k) => '<span class="status-chip s-' + k + '">' + labels[k] + ' ' + buckets[k] + '</span>')
      .join('');
    sumStatusChips.innerHTML = html || '<span class="status-chip">no requests</span>';
  }

  // ---------- Render: entries --------------------------------------------
  function renderEntries() {
    applySortClasses();
    let rows = filtered();
    rows.sort(makeComparator(state.sort.key, state.sort.dir));

    sumRequests.textContent = rows.length;

    if (rows.length === 0) {
      entriesBody.innerHTML = '';
      entriesEmpty.classList.remove('hidden');
      return;
    }
    entriesEmpty.classList.add('hidden');

    const timelineSpan = Math.max(1, state.timelineEnd - state.timelineStart);

    // Build HTML in chunks for big HARs
    const parts = [];
    for (let i = 0; i < rows.length; i++) {
      const e = rows[i];
      parts.push(renderRowHtml(e, i + 1, timelineSpan));
    }
    entriesBody.innerHTML = parts.join('');

    // Wire row clicks
    entriesBody.querySelectorAll('.entry-row').forEach((row) => {
      row.addEventListener('click', () => {
        const id = Number(row.getAttribute('data-id'));
        selectEntry(id);
      });
    });

    // Re-apply selected highlight
    if (state.selectedId != null) {
      const sel = entriesBody.querySelector('[data-id="' + state.selectedId + '"]');
      if (sel) sel.classList.add('selected');
    }
  }

  function makeComparator(key, dir) {
    const mul = dir === 'asc' ? 1 : -1;
    return (a, b) => {
      let av, bv;
      switch (key) {
        case 'method':  av = a.method;     bv = b.method;     break;
        case 'status':  av = a.status;     bv = b.status;     break;
        case 'url':     av = a.url;        bv = b.url;        break;
        case 'type':    av = a.typeGroup;  bv = b.typeGroup;  break;
        case 'size':    av = a.transferSize; bv = b.transferSize; break;
        case 'time':    av = a.time;       bv = b.time;       break;
        case 'started': default: av = a.startedMs; bv = b.startedMs;
      }
      if (av === bv) return a.id - b.id;
      return av < bv ? -1 * mul : 1 * mul;
    };
  }

  function renderRowHtml(e, rowNum, timelineSpan) {
    const statusClass = e.status ? String(Math.floor(e.status / 100)) : '0';
    const methodClass = 'm-' + e.method.toLowerCase();
    const sizeText = e.transferSize ? formatBytes(e.transferSize) : '—';
    const timeText = e.time > 0 ? formatMs(e.time) : '—';
    const startFrac = (e.startedMs - state.timelineStart) / timelineSpan;
    const widthFrac = Math.max(0.005, (e.time || 0) / timelineSpan);
    const left = Math.max(0, Math.min(100, startFrac * 100));
    const width = Math.max(0.2, Math.min(100 - left, widthFrac * 100));

    const segs = buildWaterfallSegs(e);

    const isSelected = state.selectedId === e.id ? ' selected' : '';
    const errClass = e.isError ? ' entry-error' : '';

    return (
      '<div class="entry-row' + isSelected + errClass + '" data-id="' + e.id + '" role="row">' +
        '<div class="col-num">' + rowNum + '</div>' +
        '<div class="col-method ' + methodClass + '">' + escapeHtml(e.method) + '</div>' +
        '<div class="col-status s-' + statusClass + '" title="' + escapeAttr(e.statusText) + '">' + (e.status || '—') + '</div>' +
        '<div class="col-url">' +
          '<span class="url-path" title="' + escapeAttr(e.url) + '">' + escapeHtml(e.path || e.url) + '</span>' +
          (e.host ? '<span class="url-host">' + escapeHtml(e.host) + '</span>' : '') +
        '</div>' +
        '<div class="col-type">' + escapeHtml(typeLabel(e.typeGroup)) + '</div>' +
        '<div class="col-size">' + sizeText + '</div>' +
        '<div class="col-time">' + timeText + '</div>' +
        '<div class="col-waterfall" title="' + escapeAttr(waterfallTitle(e)) + '">' +
          '<div class="waterfall-bar" style="left:' + left.toFixed(2) + '%;width:' + width.toFixed(2) + '%">' +
            segs +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function buildWaterfallSegs(e) {
    const t = e.timings || {};
    const phases = ['blocked', 'dns', 'connect', 'ssl', 'send', 'wait', 'receive'];
    let total = 0;
    phases.forEach((p) => { if (t[p] > 0) total += t[p]; });
    if (total <= 0) return '';
    return phases.map((p) => {
      const v = t[p];
      if (!(v > 0)) return '';
      const pct = (v / total) * 100;
      return '<span class="waterfall-seg s-' + p + '" style="width:' + pct.toFixed(2) + '%"></span>';
    }).join('');
  }

  function waterfallTitle(e) {
    const t = e.timings || {};
    const parts = [];
    ['blocked', 'dns', 'connect', 'ssl', 'send', 'wait', 'receive'].forEach((p) => {
      if (t[p] > 0) parts.push(p + ': ' + formatMs(t[p]));
    });
    return (e.time > 0 ? 'total ' + formatMs(e.time) : '') + (parts.length ? ' (' + parts.join(', ') + ')' : '');
  }

  function typeLabel(g) {
    switch (g) {
      case 'doc':   return 'doc';
      case 'css':   return 'css';
      case 'js':    return 'js';
      case 'xhr':   return 'xhr';
      case 'img':   return 'img';
      case 'font':  return 'font';
      case 'media': return 'media';
      default:      return 'other';
    }
  }

  // ---------- Detail panel ------------------------------------------------
  function selectEntry(id) {
    state.selectedId = id;
    entriesBody.querySelectorAll('.entry-row').forEach((r) => r.classList.remove('selected'));
    const row = entriesBody.querySelector('[data-id="' + id + '"]');
    if (row) row.classList.add('selected');

    const e = state.entries[id];
    if (!e) return;

    detailPanel.classList.remove('hidden');
    detailMethod.textContent = e.method;
    const statusClass = e.status ? String(Math.floor(e.status / 100)) : '0';
    detailStatus.className = 'detail-status s-' + statusClass;
    detailStatus.textContent = (e.status || '—') + (e.statusText ? ' ' + e.statusText : '');
    detailUrl.textContent = e.url;
    detailUrl.title = e.url;

    renderDetailTab(state.detailTab);
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    track('select', e.method + ' ' + e.status);
  }

  document.querySelectorAll('.detail-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.detail-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.detailTab = tab.getAttribute('data-detail');
      renderDetailTab(state.detailTab);
    });
  });

  detailCloseBtn.addEventListener('click', () => {
    detailPanel.classList.add('hidden');
    state.selectedId = null;
    entriesBody.querySelectorAll('.entry-row').forEach((r) => r.classList.remove('selected'));
  });

  function renderDetailTab(tab) {
    if (state.selectedId == null) return;
    const e = state.entries[state.selectedId];
    if (!e) return;
    const req = e.raw.request || {};
    const res = e.raw.response || {};

    let html = '';
    switch (tab) {
      case 'headers':
        html =
          renderKVSection('General', generalKv(e)) +
          renderKVSection('Request Headers', headersKv(req.headers)) +
          renderKVSection('Response Headers', headersKv(res.headers));
        break;
      case 'cookies':
        html =
          renderKVSection('Request Cookies', cookiesKv(req.cookies)) +
          renderKVSection('Response Cookies', cookiesKv(res.cookies));
        break;
      case 'query':
        html = renderKVSection('Query String Parameters', kvFromList(req.queryString));
        break;
      case 'request':
        html = renderBodySection('Request Body', req.postData, req.bodySize);
        break;
      case 'response':
        html = renderBodySection('Response Body', res.content, res.bodySize);
        break;
      case 'timing':
        html = renderTimingSection(e);
        break;
    }
    detailBody.innerHTML = html;
    wireCopyButtons();
  }

  function generalKv(e) {
    const out = [];
    out.push(['Request URL', e.url]);
    out.push(['Request Method', e.method]);
    out.push(['Status', (e.status || '—') + (e.statusText ? ' ' + e.statusText : '')]);
    out.push(['Remote IP', e.raw.serverIPAddress || '—']);
    if (e.raw.connection) out.push(['Connection', String(e.raw.connection)]);
    if (e.raw.startedDateTime) out.push(['Started', e.raw.startedDateTime]);
    if (e.time > 0) out.push(['Duration', formatMs(e.time)]);
    return out;
  }

  function headersKv(list) {
    if (!Array.isArray(list)) return [];
    return list.map((h) => [String(h.name || ''), redactHeader(h.name, String(h.value == null ? '' : h.value))]);
  }

  function cookiesKv(list) {
    if (!Array.isArray(list)) return [];
    return list.map((c) => {
      const meta = [];
      if (c.path) meta.push('path=' + c.path);
      if (c.domain) meta.push('domain=' + c.domain);
      if (c.expires) meta.push('expires=' + c.expires);
      if (c.httpOnly) meta.push('HttpOnly');
      if (c.secure) meta.push('Secure');
      if (c.sameSite) meta.push('SameSite=' + c.sameSite);
      const val = state.redact
        ? '\u2022\u2022\u2022 redacted'
        : (c.value == null ? '' : String(c.value));
      const suffix = meta.length ? '   (' + meta.join(', ') + ')' : '';
      return [String(c.name || ''), val + suffix];
    });
  }

  function kvFromList(list) {
    if (!Array.isArray(list)) return [];
    return list.map((q) => [String(q.name || ''), String(q.value == null ? '' : q.value)]);
  }

  function redactHeader(name, value) {
    if (!state.redact) return value;
    const n = String(name || '').toLowerCase();
    if (n === 'authorization' || n === 'proxy-authorization' ||
        n === 'cookie' || n === 'set-cookie' ||
        n === 'x-api-key' || n === 'api-key' ||
        n === 'x-auth-token' || n === 'x-csrf-token') {
      return '\u2022\u2022\u2022 redacted';
    }
    return value;
  }

  function renderKVSection(title, rows) {
    let copyAttr = '';
    if (rows.length) {
      const text = rows.map((r) => r[0] + ': ' + r[1]).join('\n');
      copyAttr = '<button class="kv-copy" type="button" data-copy="' + escapeAttr(text) + '"><i class="fas fa-copy"></i> Copy</button>';
    }
    const header = '<div class="kv-section-title">' + escapeHtml(title) + copyAttr + '</div>';
    if (!rows.length) {
      return '<div class="kv-section">' + header + '<div class="kv-empty">No data</div></div>';
    }
    const body = '<div class="kv-table">' +
      rows.map((r) => {
        const v = r[1];
        const isRedacted = typeof v === 'string' && v.indexOf('\u2022\u2022\u2022 redacted') === 0;
        return '<div class="kv-key">' + escapeHtml(r[0]) + '</div>' +
               '<div class="kv-val' + (isRedacted ? ' redacted' : '') + '">' + escapeHtml(v) + '</div>';
      }).join('') +
    '</div>';
    return '<div class="kv-section">' + header + body + '</div>';
  }

  function renderBodySection(title, content, declaredSize) {
    if (!content || (content.text == null && !content.params)) {
      return '<div class="kv-section">' +
        '<div class="kv-section-title">' + escapeHtml(title) + '</div>' +
        '<div class="kv-empty">No body captured. Browsers may omit this if not configured to save with content.</div>' +
      '</div>';
    }

    // postData with params (form fields)
    if (content.params && Array.isArray(content.params)) {
      const rows = content.params.map((p) => [
        String(p.name || ''),
        p.fileName ? '[file: ' + p.fileName + ']' : (p.value == null ? '' : String(p.value))
      ]);
      const mimeBadge = '<span class="body-pill">' + escapeHtml(content.mimeType || 'form') + '</span>';
      const sizeBadge = declaredSize > 0 ? '<span class="body-pill">' + formatBytes(declaredSize) + '</span>' : '';
      return '<div class="kv-section">' +
        '<div class="kv-section-title">' + escapeHtml(title) + '</div>' +
        '<div class="body-meta">' + mimeBadge + sizeBadge + '</div>' +
        renderKVSection('Form fields', rows) +
      '</div>';
    }

    const mime = (content.mimeType || '').toLowerCase();
    let text = String(content.text || '');
    let displayed = text;
    let isJson = false;

    if (content.encoding === 'base64') {
      try {
        const decoded = atob(text);
        if (looksTextual(mime)) {
          displayed = decoded;
          text = decoded;
        } else {
          displayed = '[binary, base64 ' + text.length + ' chars, ~' + formatBytes(Math.floor(text.length * 0.75)) + ']';
        }
      } catch (_) {
        displayed = '[base64 decode failed]\n' + text.slice(0, 4000);
      }
    }

    // Pretty-print JSON when possible
    if (mime.indexOf('json') !== -1 || (text && (text.trim()[0] === '{' || text.trim()[0] === '['))) {
      try {
        const obj = JSON.parse(text);
        displayed = JSON.stringify(obj, null, 2);
        isJson = true;
      } catch (_) { /* not JSON */ }
    }

    const mimeBadge = '<span class="body-pill">' + escapeHtml(content.mimeType || 'text') + '</span>';
    const sizeBadge = (declaredSize > 0)
      ? '<span class="body-pill">' + formatBytes(declaredSize) + '</span>'
      : (content.size > 0 ? '<span class="body-pill">' + formatBytes(content.size) + '</span>' : '');
    const copyBtn = '<button class="kv-copy" type="button" data-copy="' + escapeAttr(displayed) + '"><i class="fas fa-copy"></i> Copy</button>';

    const body = isJson
      ? '<pre class="body-block">' + highlightJson(displayed) + '</pre>'
      : '<pre class="body-block wrap">' + escapeHtml(displayed) + '</pre>';

    return '<div class="kv-section">' +
      '<div class="kv-section-title">' + escapeHtml(title) + copyBtn + '</div>' +
      '<div class="body-meta">' + mimeBadge + sizeBadge + '</div>' +
      body +
    '</div>';
  }

  function looksTextual(mime) {
    if (!mime) return true;
    const m = mime.toLowerCase();
    return m.indexOf('text/') === 0 ||
           m.indexOf('json') !== -1 ||
           m.indexOf('xml') !== -1 ||
           m.indexOf('javascript') !== -1 ||
           m.indexOf('html') !== -1 ||
           m.indexOf('css') !== -1 ||
           m.indexOf('application/x-www-form-urlencoded') !== -1;
  }

  function renderTimingSection(e) {
    const t = e.timings || {};
    const phases = [
      { k: 'blocked', label: 'Blocked',  color: '#9ca3af' },
      { k: 'dns',     label: 'DNS',      color: '#a78bfa' },
      { k: 'connect', label: 'Connect',  color: '#fb923c' },
      { k: 'ssl',     label: 'SSL',      color: '#f472b6' },
      { k: 'send',    label: 'Send',     color: '#34d399' },
      { k: 'wait',    label: 'Wait',     color: '#60a5fa' },
      { k: 'receive', label: 'Receive',  color: '#facc15' }
    ];
    let total = 0;
    phases.forEach((p) => { if (t[p.k] > 0) total += t[p.k]; });
    if (total <= 0 && !(e.time > 0)) {
      return '<div class="kv-section">' +
        '<div class="kv-section-title">Timings</div>' +
        '<div class="kv-empty">No timing data captured for this entry.</div>' +
      '</div>';
    }

    const max = Math.max(total, 1);
    const rows = phases.map((p) => {
      const v = t[p.k];
      const has = typeof v === 'number' && v > 0;
      const pct = has ? Math.max(1, (v / max) * 100) : 0;
      return '<div class="timing-phase"><span class="phase-dot" style="background:' + p.color + '"></span>' + p.label + '</div>' +
             '<div class="timing-bar">' +
               (has ? '<div class="timing-bar-fill" style="left:0;width:' + pct.toFixed(2) + '%;background:' + p.color + '"></div>' : '') +
             '</div>' +
             '<div class="timing-value">' + (has ? formatMs(v) : '—') + '</div>';
    }).join('');

    return '<div class="kv-section">' +
      '<div class="kv-section-title">Timings (phase breakdown)</div>' +
      '<div class="timing-list">' + rows + '</div>' +
      '<div class="timing-total"><span>Total</span><span>' + formatMs(e.time > 0 ? e.time : total) + '</span></div>' +
    '</div>';
  }

  function wireCopyButtons() {
    detailBody.querySelectorAll('.kv-copy').forEach((btn) => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy') || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => flashCopied(btn));
        } else {
          // Fallback
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (_) { /* ignore */ }
          document.body.removeChild(ta);
          flashCopied(btn);
        }
        track('copy', 'detail');
      });
    });
  }

  function flashCopied(btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.classList.remove('copied');
    }, 1400);
  }

  // ---------- JSON highlight (lightweight) -------------------------------
  function highlightJson(json) {
    // Escape then highlight tokens. Order matters: strings first, then numbers, etc.
    json = escapeHtml(json);
    json = json.replace(
      /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        let cls = 'tok-number';
        if (/^"/.test(match)) {
          cls = /:$/.test(match.replace(/\s/g, '')) ? 'tok-key' : 'tok-string';
        } else if (/true|false/.test(match)) {
          cls = 'tok-bool';
        } else if (/null/.test(match)) {
          cls = 'tok-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
    return json;
  }

  // ---------- Redact toggle ----------------------------------------------
  redactToggle.addEventListener('change', () => {
    state.redact = !!redactToggle.checked;
    if (state.selectedId != null) renderDetailTab(state.detailTab);
    track('redact', state.redact ? 'on' : 'off');
  });

  // ---------- Export filtered HAR ----------------------------------------
  exportBtn.addEventListener('click', () => {
    if (!state.har) return;
    const rows = filtered();
    const ids = new Set(rows.map((r) => r.id));
    const original = state.har;
    const filteredEntries = original.log.entries.filter((_, i) => ids.has(i));

    const out = {
      log: Object.assign({}, original.log, {
        entries: state.redact ? filteredEntries.map(redactEntry) : filteredEntries
      })
    };
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stem = state.sourceName.replace(/\.har$/i, '') || 'export';
    a.href = url;
    a.download = stem + '.filtered.har';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    track('export', state.redact ? 'redacted' : 'plain', filteredEntries.length);
  });

  function redactEntry(e) {
    const copy = JSON.parse(JSON.stringify(e));
    if (copy.request) {
      if (Array.isArray(copy.request.headers)) {
        copy.request.headers = copy.request.headers.map((h) => ({
          name: h.name,
          value: redactHeaderForExport(h.name, h.value)
        }));
      }
      if (Array.isArray(copy.request.cookies)) {
        copy.request.cookies = copy.request.cookies.map((c) =>
          Object.assign({}, c, { value: '\u2022\u2022\u2022 redacted' })
        );
      }
    }
    if (copy.response && Array.isArray(copy.response.headers)) {
      copy.response.headers = copy.response.headers.map((h) => ({
        name: h.name,
        value: redactHeaderForExport(h.name, h.value)
      }));
    }
    if (copy.response && Array.isArray(copy.response.cookies)) {
      copy.response.cookies = copy.response.cookies.map((c) =>
        Object.assign({}, c, { value: '\u2022\u2022\u2022 redacted' })
      );
    }
    return copy;
  }

  function redactHeaderForExport(name, value) {
    const n = String(name || '').toLowerCase();
    if (n === 'authorization' || n === 'proxy-authorization' ||
        n === 'cookie' || n === 'set-cookie' ||
        n === 'x-api-key' || n === 'api-key' ||
        n === 'x-auth-token' || n === 'x-csrf-token') {
      return '\u2022\u2022\u2022 redacted';
    }
    return value;
  }

  // ---------- Close current HAR ------------------------------------------
  closeBtn.addEventListener('click', () => {
    state.har = null;
    state.entries = [];
    state.selectedId = null;
    viewerSection.classList.add('hidden');
    detailPanel.classList.add('hidden');
    loaderSection.classList.remove('hidden');
    fileInput.value = '';
    pasteArea.value = '';
    loaderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ---------- Utilities --------------------------------------------------
  function formatBytes(n) {
    if (!n || n < 0) return '0 B';
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    if (n < 1024 * 1024 * 1024) return (n / 1024 / 1024).toFixed(2) + ' MB';
    return (n / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  }

  function formatMs(ms) {
    if (!isFinite(ms) || ms < 0) return '0 ms';
    if (ms < 1) return ms.toFixed(2) + ' ms';
    if (ms < 1000) return Math.round(ms) + ' ms';
    if (ms < 60000) return (ms / 1000).toFixed(2) + ' s';
    const m = Math.floor(ms / 60000);
    const s = ((ms % 60000) / 1000).toFixed(1);
    return m + 'm ' + s + 's';
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeAttr(s) { return escapeHtml(s); }

  // ---------- Sample HAR --------------------------------------------------
  function buildSampleHar() {
    const start = new Date();
    const iso = (offsetMs) => new Date(start.getTime() + offsetMs).toISOString();
    function entry(opts) {
      return {
        startedDateTime: iso(opts.startOffset),
        time: opts.time,
        request: {
          method: opts.method || 'GET',
          url: opts.url,
          httpVersion: 'HTTP/2',
          headers: opts.reqHeaders || [
            { name: 'accept', value: '*/*' },
            { name: 'user-agent', value: 'SampleBrowser/1.0' }
          ],
          queryString: opts.query || [],
          cookies: opts.reqCookies || [],
          headersSize: opts.reqHeadersSize != null ? opts.reqHeadersSize : 220,
          bodySize: opts.reqBodySize || 0,
          postData: opts.postData
        },
        response: {
          status: opts.status,
          statusText: opts.statusText || '',
          httpVersion: 'HTTP/2',
          headers: opts.resHeaders || [
            { name: 'content-type', value: opts.mime || 'text/plain' }
          ],
          cookies: opts.resCookies || [],
          content: {
            size: opts.size || 0,
            mimeType: opts.mime || 'text/plain',
            text: opts.text || ''
          },
          redirectURL: opts.redirect || '',
          headersSize: opts.resHeadersSize != null ? opts.resHeadersSize : 180,
          bodySize: opts.bodySize != null ? opts.bodySize : (opts.size || 0)
        },
        cache: {},
        timings: opts.timings,
        serverIPAddress: '93.184.216.34',
        connection: '1234'
      };
    }

    const entries = [
      entry({
        startOffset: 0, time: 145, method: 'GET',
        url: 'https://example.com/',
        status: 200, statusText: 'OK',
        mime: 'text/html; charset=utf-8', size: 8210,
        text: '<!doctype html><html><head><title>Example</title></head><body><h1>Hello</h1></body></html>',
        timings: { blocked: 2, dns: 12, connect: 18, ssl: 14, send: 1, wait: 95, receive: 17 }
      }),
      entry({
        startOffset: 150, time: 72, method: 'GET',
        url: 'https://cdn.example.com/static/app.css',
        status: 200, statusText: 'OK',
        mime: 'text/css', size: 24500,
        text: 'body{margin:0;font-family:system-ui}',
        timings: { blocked: 3, dns: 0, connect: 0, ssl: 0, send: 1, wait: 28, receive: 40 }
      }),
      entry({
        startOffset: 152, time: 110, method: 'GET',
        url: 'https://cdn.example.com/static/app.js',
        status: 200, statusText: 'OK',
        mime: 'application/javascript', size: 138400,
        text: 'console.log("app loaded")',
        timings: { blocked: 5, dns: 0, connect: 0, ssl: 0, send: 1, wait: 22, receive: 82 }
      }),
      entry({
        startOffset: 280, time: 180, method: 'GET',
        url: 'https://api.example.com/v1/products?page=1&limit=20',
        query: [{ name: 'page', value: '1' }, { name: 'limit', value: '20' }],
        status: 200, statusText: 'OK',
        mime: 'application/json',
        reqHeaders: [
          { name: 'accept', value: 'application/json' },
          { name: 'authorization', value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.sig' }
        ],
        text: JSON.stringify({
          products: [
            { id: 1, name: 'Widget A', price: 19.99, inStock: true },
            { id: 2, name: 'Widget B', price: 24.5, inStock: false }
          ],
          page: 1, total: 2
        }, null, 2),
        size: 220,
        timings: { blocked: 1, dns: 8, connect: 22, ssl: 18, send: 1, wait: 118, receive: 12 }
      }),
      entry({
        startOffset: 470, time: 22, method: 'POST',
        url: 'https://api.example.com/v1/analytics/event',
        status: 204, statusText: 'No Content',
        mime: 'text/plain',
        reqHeaders: [
          { name: 'content-type', value: 'application/json' },
          { name: 'cookie', value: 'sid=abc123; flag=on' }
        ],
        reqCookies: [
          { name: 'sid', value: 'abc123' },
          { name: 'flag', value: 'on' }
        ],
        postData: {
          mimeType: 'application/json',
          text: JSON.stringify({ event: 'pageview', path: '/' })
        },
        reqBodySize: 38,
        text: '', size: 0,
        timings: { blocked: 0, dns: 0, connect: 0, ssl: 0, send: 1, wait: 18, receive: 3 }
      }),
      entry({
        startOffset: 500, time: 88, method: 'GET',
        url: 'https://cdn.example.com/img/hero.webp',
        status: 200, statusText: 'OK',
        mime: 'image/webp', size: 92450,
        text: 'UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAQAcJaQAA3AA/v3AgAA=',
        bodySize: 92450,
        timings: { blocked: 4, dns: 0, connect: 0, ssl: 0, send: 1, wait: 19, receive: 64 }
      }),
      entry({
        startOffset: 510, time: 60, method: 'GET',
        url: 'https://fonts.example.com/inter.woff2',
        status: 200, statusText: 'OK',
        mime: 'font/woff2', size: 32100,
        text: '',
        timings: { blocked: 6, dns: 5, connect: 18, ssl: 14, send: 1, wait: 9, receive: 7 }
      }),
      entry({
        startOffset: 620, time: 12, method: 'GET',
        url: 'https://example.com/old-page',
        status: 301, statusText: 'Moved Permanently',
        mime: 'text/html', size: 0,
        redirect: 'https://example.com/new-page',
        resHeaders: [
          { name: 'location', value: '/new-page' },
          { name: 'content-type', value: 'text/html' }
        ],
        timings: { blocked: 0, dns: 0, connect: 0, ssl: 0, send: 0, wait: 10, receive: 2 }
      }),
      entry({
        startOffset: 640, time: 38, method: 'GET',
        url: 'https://api.example.com/v1/missing',
        status: 404, statusText: 'Not Found',
        mime: 'application/json',
        text: JSON.stringify({ error: 'not_found', message: 'resource not found' }),
        size: 56,
        timings: { blocked: 1, dns: 0, connect: 0, ssl: 0, send: 1, wait: 34, receive: 2 }
      })
    ];

    return {
      log: {
        version: '1.2',
        creator: { name: 'HAR Viewer Sample', version: '1.0' },
        browser: { name: 'SampleBrowser', version: '1.0' },
        pages: [{
          startedDateTime: iso(0),
          id: 'page_1',
          title: 'https://example.com/',
          pageTimings: { onContentLoad: 320, onLoad: 720 }
        }],
        entries: entries
      }
    };
  }

})();
