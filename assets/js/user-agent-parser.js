(function() {
  'use strict';

  var STORAGE_KEY = 'ua-parser:last';
  var STORAGE_MODE_KEY = 'ua-parser:mode';
  var MAX_BULK_LINES = 5000;
  var DEBOUNCE_MS = 200;

  var BOT_REGEX = /bot|crawl|spider|slurp|facebookexternalhit|preview|http-client|curl|wget|axios|python-requests|go-http-client|HeadlessChrome|PhantomJS|Semrush|Ahrefs|bingpreview|Googlebot|Baiduspider|YandexBot|DuckDuckBot|ia_archiver/i;

  var SAMPLES = {
    chrome: {
      label: 'Chrome (Windows)',
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    safari: {
      label: 'Safari (iPhone)',
      ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
    },
    firefox: {
      label: 'Firefox (Android)',
      ua: 'Mozilla/5.0 (Android 14; Mobile; rv:121.0) Gecko/121.0 Firefox/121.0'
    },
    edge: {
      label: 'Edge (Windows)',
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
    },
    googlebot: {
      label: 'Googlebot',
      ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    },
    curl: {
      label: 'curl',
      ua: 'curl/8.4.0'
    },
    ipad: {
      label: 'Safari (iPad)',
      ua: 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
    },
    mac: {
      label: 'Safari (macOS)',
      ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15'
    }
  };

  var elements = {
    singleInput: document.getElementById('ua-input'),
    bulkInput: document.getElementById('bulk-input'),
    parseStatus: document.getElementById('parse-status'),
    singlePanel: document.getElementById('single-panel'),
    bulkPanel: document.getElementById('bulk-panel'),
    singleResults: document.getElementById('single-results'),
    bulkResults: document.getElementById('bulk-results'),
    summaryBadges: document.getElementById('summary-badges'),
    resultGrid: document.getElementById('result-grid'),
    rawText: document.getElementById('raw-ua-text'),
    charCount: document.getElementById('char-count'),
    bulkStats: document.getElementById('bulk-stats'),
    browserBreakdown: document.getElementById('browser-breakdown'),
    osBreakdown: document.getElementById('os-breakdown'),
    bulkTableBody: document.getElementById('bulk-table-body'),
    bulkTable: document.getElementById('bulk-table'),
    pasteBtn: document.getElementById('paste-btn'),
    myBrowserBtn: document.getElementById('my-browser-btn'),
    clearBtn: document.getElementById('clear-btn'),
    sampleBtn: document.getElementById('sample-btn'),
    sampleMenu: document.getElementById('sample-menu'),
    modeTabs: document.querySelectorAll('.ua-mode-tab'),
    downloadCsvBtn: document.getElementById('download-csv-btn'),
    downloadJsonBtn: document.getElementById('download-json-btn'),
    copyTableBtn: document.getElementById('copy-table-btn')
  };

  var currentMode = 'single';
  var parseTimer = null;
  var bulkRows = [];
  var sortCol = 'index';
  var sortDir = 1;

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'User Agent Parser',
        event_label: label
      });
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function displayVal(val) {
    if (val === undefined || val === null || val === '') return '—';
    return String(val);
  }

  function detectBot(ua, parsed) {
    if (!ua || !ua.trim()) return false;
    if (BOT_REGEX.test(ua)) return true;
    var b = parsed && parsed.browser;
    if (b && b.name && /bot|crawl|spider/i.test(b.name)) return true;
    return false;
  }

  function getDeviceClass(parsed, isBot) {
    if (isBot) return 'bot';
    var type = parsed.device && parsed.device.type;
    if (type) return type;
    var os = (parsed.os && parsed.os.name) || '';
    if (/android|ios|iphone|ipad|mobile/i.test(os)) return 'mobile';
    return 'desktop';
  }

  function parseUA(ua) {
    var trimmed = (ua || '').trim();
    if (!trimmed) return null;
    var parser = new UAParser(trimmed);
    var result = parser.getResult();
    var isBot = detectBot(trimmed, result);
    var deviceClass = getDeviceClass(result, isBot);
    return {
      ua: trimmed,
      browser: result.browser || {},
      engine: result.engine || {},
      os: result.os || {},
      device: result.device || {},
      cpu: result.cpu || {},
      isBot: isBot,
      deviceClass: deviceClass
    };
  }

  function setStatus(msg, type) {
    if (!elements.parseStatus) return;
    elements.parseStatus.textContent = msg || '';
    elements.parseStatus.className = 'ua-parse-status' + (type ? ' status-' + type : '');
  }

  function copyToClipboard(text, label) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(function() {
      setStatus('Copied ' + (label || 'value') + ' to clipboard.', 'ok');
      setTimeout(function() { setStatus('', ''); }, 2000);
    }).catch(function() {
      setStatus('Copy failed. Select and copy manually.', 'error');
    });
  }

  function fieldRow(label, value) {
    var v = displayVal(value);
    var isEmpty = v === '—';
    return (
      '<div class="ua-field-row">' +
        '<span class="ua-field-label">' + escapeHtml(label) + '</span>' +
        '<div class="ua-field-value-wrap">' +
          '<span class="ua-field-value' + (isEmpty ? ' empty' : '') + '">' + escapeHtml(v) + '</span>' +
          (isEmpty ? '' : '<button type="button" class="btn-mini btn-copy-field" title="Copy"><i class="fas fa-copy"></i></button>') +
        '</div>' +
      '</div>'
    );
  }

  function renderSingle(parsed) {
    if (!elements.singleResults || !elements.resultGrid) return;

    if (!parsed) {
      elements.singleResults.style.display = 'none';
      setStatus('', '');
      return;
    }

    elements.singleResults.style.display = 'block';

    var dc = parsed.deviceClass;
    var dcLabel = dc.charAt(0).toUpperCase() + dc.slice(1);
    var botHtml = parsed.isBot
      ? '<span class="ua-bot-badge"><i class="fas fa-robot"></i> Bot / Crawler</span>'
      : '<span class="ua-bot-badge is-human"><i class="fas fa-user"></i> Human visitor</span>';

    elements.summaryBadges.innerHTML =
      '<span class="ua-device-badge badge-' + escapeHtml(dc) + '"><i class="fas fa-desktop"></i> ' + escapeHtml(dcLabel) + '</span>' +
      botHtml;

    elements.resultGrid.innerHTML =
      '<div class="ua-field-card">' +
        '<h4><i class="fas fa-globe"></i> Browser</h4>' +
        fieldRow('Name', parsed.browser.name) +
        fieldRow('Version', parsed.browser.version) +
        fieldRow('Major', parsed.browser.major) +
      '</div>' +
      '<div class="ua-field-card">' +
        '<h4><i class="fas fa-cog"></i> Engine</h4>' +
        fieldRow('Name', parsed.engine.name) +
        fieldRow('Version', parsed.engine.version) +
      '</div>' +
      '<div class="ua-field-card">' +
        '<h4><i class="fas fa-laptop"></i> Operating System</h4>' +
        fieldRow('Name', parsed.os.name) +
        fieldRow('Version', parsed.os.version) +
      '</div>' +
      '<div class="ua-field-card">' +
        '<h4><i class="fas fa-mobile-alt"></i> Device</h4>' +
        fieldRow('Vendor', parsed.device.vendor) +
        fieldRow('Model', parsed.device.model) +
        fieldRow('Type', parsed.device.type) +
      '</div>' +
      '<div class="ua-field-card">' +
        '<h4><i class="fas fa-microchip"></i> CPU</h4>' +
        fieldRow('Architecture', parsed.cpu.architecture) +
      '</div>';

    elements.resultGrid.querySelectorAll('.btn-copy-field').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var valEl = btn.previousElementSibling;
        copyToClipboard(valEl ? valEl.textContent : '', 'field');
      });
    });

    if (elements.rawText) elements.rawText.textContent = parsed.ua;
    if (elements.charCount) elements.charCount.textContent = parsed.ua.length + ' characters';

    setStatus('Parsed successfully: ' + displayVal(parsed.browser.name) + ' on ' + displayVal(parsed.os.name), 'ok');
  }

  function countBy(rows, keyFn) {
    var counts = {};
    rows.forEach(function(r) {
      var k = keyFn(r) || 'Unknown';
      counts[k] = (counts[k] || 0) + 1;
    });
    return Object.keys(counts).sort(function(a, b) {
      return counts[b] - counts[a];
    }).map(function(k) {
      return { name: k, count: counts[k] };
    });
  }

  function renderBreakdown(el, items, max) {
    if (!el) return;
    max = max || 8;
    if (!items.length) {
      el.innerHTML = '<li>No data</li>';
      return;
    }
    el.innerHTML = items.slice(0, max).map(function(item) {
      return '<li><span>' + escapeHtml(item.name) + '</span><span class="count">' + item.count + '</span></li>';
    }).join('');
  }

  function compareRows(a, b, col) {
    var va = a[col];
    var vb = b[col];
    if (col === 'index') {
      va = a.index;
      vb = b.index;
    }
    if (va == null) va = '';
    if (vb == null) vb = '';
    if (typeof va === 'boolean') {
      return (va === vb ? 0 : va ? 1 : -1) * sortDir;
    }
    va = String(va).toLowerCase();
    vb = String(vb).toLowerCase();
    if (va < vb) return -1 * sortDir;
    if (va > vb) return 1 * sortDir;
    return 0;
  }

  function renderBulkTable() {
    if (!elements.bulkTableBody) return;
    var sorted = bulkRows.slice().sort(function(a, b) {
      return compareRows(a, b, sortCol);
    });

    elements.bulkTableBody.innerHTML = sorted.map(function(row) {
      var trunc = row.ua.length > 80 ? row.ua.slice(0, 77) + '...' : row.ua;
      return (
        '<tr>' +
          '<td class="ua-cell-truncate" title="' + escapeHtml(row.ua) + '">' + escapeHtml(trunc) + '</td>' +
          '<td>' + escapeHtml(displayVal(row.browser)) + '</td>' +
          '<td>' + escapeHtml(displayVal(row.version)) + '</td>' +
          '<td>' + escapeHtml(displayVal(row.os)) + '</td>' +
          '<td>' + escapeHtml(displayVal(row.device)) + '</td>' +
          '<td>' + escapeHtml(displayVal(row.type)) + '</td>' +
          '<td class="' + (row.isBot ? 'tag-bot' : 'tag-human') + '">' + (row.isBot ? 'Yes' : 'No') + '</td>' +
        '</tr>'
      );
    }).join('');

    if (elements.bulkTable) {
      elements.bulkTable.querySelectorAll('th[data-sort]').forEach(function(th) {
        th.classList.remove('sorted-asc', 'sorted-desc');
        if (th.getAttribute('data-sort') === sortCol) {
          th.classList.add(sortDir === 1 ? 'sorted-asc' : 'sorted-desc');
        }
      });
    }
  }

  function renderBulk(rows) {
    if (!elements.bulkResults) return;

    if (!rows.length) {
      elements.bulkResults.style.display = 'none';
      setStatus('', '');
      return;
    }

    elements.bulkResults.style.display = 'block';
    bulkRows = rows;

    var uniqueUas = {};
    var botCount = 0;
    rows.forEach(function(r) {
      uniqueUas[r.ua] = true;
      if (r.isBot) botCount++;
    });
    var uniqueCount = Object.keys(uniqueUas).length;
    var botPct = rows.length ? Math.round((botCount / rows.length) * 100) : 0;

    if (elements.bulkStats) {
      elements.bulkStats.innerHTML =
        '<div class="ua-stat-card"><span class="stat-value">' + rows.length + '</span><span class="stat-label">Parsed</span></div>' +
        '<div class="ua-stat-card"><span class="stat-value">' + uniqueCount + '</span><span class="stat-label">Unique UAs</span></div>' +
        '<div class="ua-stat-card"><span class="stat-value">' + botCount + '</span><span class="stat-label">Bots</span></div>' +
        '<div class="ua-stat-card"><span class="stat-value">' + botPct + '%</span><span class="stat-label">Bot share</span></div>';
    }

    renderBreakdown(elements.browserBreakdown, countBy(rows, function(r) { return r.browser; }));
    renderBreakdown(elements.osBreakdown, countBy(rows, function(r) { return r.os; }));

    renderBulkTable();
    setStatus('Parsed ' + rows.length + ' user agent' + (rows.length === 1 ? '' : 's') + '.', 'ok');
  }

  function parseBulkInput(text) {
    var lines = text.split(/\r?\n/).map(function(l) { return l.trim(); }).filter(Boolean);
    if (lines.length > MAX_BULK_LINES) {
      setStatus('Too many lines (max ' + MAX_BULK_LINES + '). Only the first ' + MAX_BULK_LINES + ' will be parsed.', 'warn');
      lines = lines.slice(0, MAX_BULK_LINES);
    }
    return lines.map(function(ua, i) {
      var p = parseUA(ua);
      if (!p) return null;
      return {
        index: i + 1,
        ua: p.ua,
        browser: p.browser.name,
        version: p.browser.version,
        os: p.os.name,
        device: [p.device.vendor, p.device.model].filter(Boolean).join(' ') || p.device.type,
        type: p.deviceClass,
        isBot: p.isBot
      };
    }).filter(Boolean);
  }

  function runParse() {
    if (currentMode === 'single') {
      var ua = elements.singleInput ? elements.singleInput.value : '';
      try {
        localStorage.setItem(STORAGE_KEY, ua);
      } catch (e) { /* ignore */ }
      if (!ua.trim()) {
        renderSingle(null);
        return;
      }
      renderSingle(parseUA(ua));
    } else {
      var bulk = elements.bulkInput ? elements.bulkInput.value : '';
      try {
        localStorage.setItem(STORAGE_KEY + ':bulk', bulk);
      } catch (e) { /* ignore */ }
      if (!bulk.trim()) {
        renderBulk([]);
        return;
      }
      renderBulk(parseBulkInput(bulk));
    }
  }

  function scheduleParse() {
    if (parseTimer) clearTimeout(parseTimer);
    parseTimer = setTimeout(runParse, DEBOUNCE_MS);
  }

  function setMode(mode) {
    currentMode = mode;
    try {
      localStorage.setItem(STORAGE_MODE_KEY, mode);
    } catch (e) { /* ignore */ }

    elements.modeTabs.forEach(function(tab) {
      tab.classList.toggle('active', tab.getAttribute('data-mode') === mode);
    });

    if (elements.singlePanel) elements.singlePanel.classList.toggle('active', mode === 'single');
    if (elements.bulkPanel) elements.bulkPanel.classList.toggle('active', mode === 'bulk');

    setStatus('', '');
    runParse();
    trackEvent('mode_switch', mode);
  }

  function buildSampleMenu() {
    if (!elements.sampleMenu) return;
    elements.sampleMenu.innerHTML = Object.keys(SAMPLES).map(function(key) {
      return '<button type="button" data-sample="' + key + '">' + escapeHtml(SAMPLES[key].label) + '</button>';
    }).join('');

    elements.sampleMenu.querySelectorAll('button').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var s = SAMPLES[btn.getAttribute('data-sample')];
        if (s && elements.singleInput) {
          elements.singleInput.value = s.ua;
          elements.sampleMenu.classList.remove('open');
          scheduleParse();
          trackEvent('sample', s.label);
        }
      });
    });
  }

  function toCSV(rows) {
    var headers = ['User Agent', 'Browser', 'Version', 'OS', 'Device', 'Type', 'Bot'];
    var lines = [headers.join(',')];
    rows.forEach(function(r) {
      lines.push([
        '"' + r.ua.replace(/"/g, '""') + '"',
        '"' + String(r.browser || '').replace(/"/g, '""') + '"',
        '"' + String(r.version || '').replace(/"/g, '""') + '"',
        '"' + String(r.os || '').replace(/"/g, '""') + '"',
        '"' + String(r.device || '').replace(/"/g, '""') + '"',
        '"' + String(r.type || '').replace(/"/g, '""') + '"',
        r.isBot ? 'Yes' : 'No'
      ].join(','));
    });
    return lines.join('\n');
  }

  function downloadFile(content, filename, mime) {
    var blob = new Blob([content], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function tableToTsv(rows) {
    var headers = ['User Agent', 'Browser', 'Version', 'OS', 'Device', 'Type', 'Bot'];
    var lines = [headers.join('\t')];
    rows.forEach(function(r) {
      lines.push([
        r.ua,
        r.browser || '',
        r.version || '',
        r.os || '',
        r.device || '',
        r.type || '',
        r.isBot ? 'Yes' : 'No'
      ].join('\t'));
    });
    return lines.join('\n');
  }

  function bindEvents() {
    if (elements.singleInput) {
      elements.singleInput.addEventListener('input', scheduleParse);
    }
    if (elements.bulkInput) {
      elements.bulkInput.addEventListener('input', scheduleParse);
    }

    elements.modeTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        setMode(tab.getAttribute('data-mode'));
      });
    });

    if (elements.pasteBtn) {
      elements.pasteBtn.addEventListener('click', function() {
        navigator.clipboard.readText().then(function(text) {
          var target = currentMode === 'single' ? elements.singleInput : elements.bulkInput;
          if (target) {
            target.value = text;
            scheduleParse();
          }
          trackEvent('paste', currentMode);
        }).catch(function() {
          setStatus('Paste failed. Allow clipboard access or paste manually.', 'error');
        });
      });
    }

    if (elements.myBrowserBtn) {
      elements.myBrowserBtn.addEventListener('click', function() {
        if (elements.singleInput) {
          elements.singleInput.value = navigator.userAgent || '';
          setMode('single');
          scheduleParse();
          trackEvent('my_browser', 'detect');
        }
      });
    }

    if (elements.clearBtn) {
      elements.clearBtn.addEventListener('click', function() {
        if (currentMode === 'single' && elements.singleInput) {
          elements.singleInput.value = '';
        } else if (elements.bulkInput) {
          elements.bulkInput.value = '';
        }
        runParse();
        trackEvent('clear', currentMode);
      });
    }

    if (elements.sampleBtn && elements.sampleMenu) {
      elements.sampleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        elements.sampleMenu.classList.toggle('open');
      });
      document.addEventListener('click', function() {
        elements.sampleMenu.classList.remove('open');
      });
    }

    var copyRawBtn = document.getElementById('copy-raw-btn');
    if (copyRawBtn) {
      copyRawBtn.addEventListener('click', function() {
        copyToClipboard(elements.rawText && elements.rawText.textContent, 'raw UA');
      });
    }

    if (elements.downloadCsvBtn) {
      elements.downloadCsvBtn.addEventListener('click', function() {
        if (!bulkRows.length) {
          setStatus('Nothing to export. Paste user agents first.', 'warn');
          return;
        }
        downloadFile(toCSV(bulkRows), 'user-agents-parsed.csv', 'text/csv;charset=utf-8');
        trackEvent('download_csv', String(bulkRows.length));
      });
    }

    if (elements.downloadJsonBtn) {
      elements.downloadJsonBtn.addEventListener('click', function() {
        if (!bulkRows.length) {
          setStatus('Nothing to export. Paste user agents first.', 'warn');
          return;
        }
        downloadFile(JSON.stringify(bulkRows, null, 2), 'user-agents-parsed.json', 'application/json');
        trackEvent('download_json', String(bulkRows.length));
      });
    }

    if (elements.copyTableBtn) {
      elements.copyTableBtn.addEventListener('click', function() {
        if (!bulkRows.length) {
          setStatus('Nothing to copy. Paste user agents first.', 'warn');
          return;
        }
        copyToClipboard(tableToTsv(bulkRows), 'table');
        trackEvent('copy_table', String(bulkRows.length));
      });
    }

    if (elements.bulkTable) {
      elements.bulkTable.querySelectorAll('th[data-sort]').forEach(function(th) {
        th.addEventListener('click', function() {
          var col = th.getAttribute('data-sort');
          if (sortCol === col) {
            sortDir = -sortDir;
          } else {
            sortCol = col;
            sortDir = 1;
          }
          renderBulkTable();
        });
      });
    }
  }

  function restoreState() {
    try {
      var mode = localStorage.getItem(STORAGE_MODE_KEY) || 'single';
      var saved = localStorage.getItem(STORAGE_KEY);
      var savedBulk = localStorage.getItem(STORAGE_KEY + ':bulk');
      if (elements.singleInput && saved) elements.singleInput.value = saved;
      if (elements.bulkInput && savedBulk) elements.bulkInput.value = savedBulk;
      setMode(mode);
    } catch (e) {
      setMode('single');
    }
  }

  function init() {
    if (typeof UAParser === 'undefined') {
      setStatus('Parser library failed to load. Refresh the page.', 'error');
      return;
    }
    buildSampleMenu();
    bindEvents();
    restoreState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
