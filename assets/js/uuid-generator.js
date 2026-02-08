(function() {
  'use strict';

  var elements = {
    v4Btn: document.getElementById('v4-btn'),
    v7Btn: document.getElementById('v7-btn'),
    generateBtn: document.getElementById('generate-btn'),
    bulkBtn: document.getElementById('bulk-btn'),
    bulkCount: document.getElementById('bulk-count'),
    uppercaseToggle: document.getElementById('uppercase-toggle'),
    noHyphensToggle: document.getElementById('no-hyphens-toggle'),
    uuidText: document.getElementById('uuid-text'),
    uuidMeta: document.getElementById('uuid-meta'),
    copySingleBtn: document.getElementById('copy-single-btn'),
    singleOutput: document.getElementById('single-output'),
    bulkOutput: document.getElementById('bulk-output'),
    bulkCountLabel: document.getElementById('bulk-count-label'),
    bulkList: document.getElementById('bulk-list'),
    copyBulkBtn: document.getElementById('copy-bulk-btn'),
    decodeInput: document.getElementById('decode-input'),
    decodeBtn: document.getElementById('decode-btn'),
    decodeResult: document.getElementById('decode-result')
  };

  var selectedVersion = 4;

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'UUID Generator',
        event_label: label
      });
    }
  }

  // Generate cryptographically random bytes
  function randomBytes(n) {
    var bytes = new Uint8Array(n);
    crypto.getRandomValues(bytes);
    return bytes;
  }

  // Convert byte array to hex string
  function bytesToHex(bytes) {
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
      hex += ('0' + bytes[i].toString(16)).slice(-2);
    }
    return hex;
  }

  // Generate UUID v4
  function generateV4() {
    var bytes = randomBytes(16);
    // Set version 4: byte 6 = 0100xxxx
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    // Set variant RFC 9562: byte 8 = 10xxxxxx
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    var hex = bytesToHex(bytes);
    return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20, 32);
  }

  // Generate UUID v7
  function generateV7() {
    var now = Date.now();
    var bytes = randomBytes(16);

    // First 6 bytes: 48-bit Unix timestamp in milliseconds (big-endian)
    bytes[0] = (now / 1099511627776) & 0xff;
    bytes[1] = (now / 4294967296) & 0xff;
    bytes[2] = (now / 16777216) & 0xff;
    bytes[3] = (now / 65536) & 0xff;
    bytes[4] = (now / 256) & 0xff;
    bytes[5] = now & 0xff;

    // Set version 7: byte 6 = 0111xxxx
    bytes[6] = (bytes[6] & 0x0f) | 0x70;
    // Set variant RFC 9562: byte 8 = 10xxxxxx
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    var hex = bytesToHex(bytes);
    return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20, 32);
  }

  function generateUUID() {
    return selectedVersion === 7 ? generateV7() : generateV4();
  }

  function formatUUID(uuid) {
    if (elements.noHyphensToggle.checked) {
      uuid = uuid.replace(/-/g, '');
    }
    if (elements.uppercaseToggle.checked) {
      uuid = uuid.toUpperCase();
    }
    return uuid;
  }

  function getVersionFromUUID(uuid) {
    var clean = uuid.replace(/-/g, '');
    if (clean.length !== 32) return null;
    var versionChar = clean.charAt(12);
    return parseInt(versionChar, 16);
  }

  function getVariantFromUUID(uuid) {
    var clean = uuid.replace(/-/g, '');
    if (clean.length !== 32) return null;
    var variantByte = parseInt(clean.charAt(16), 16);

    if ((variantByte & 0x8) === 0) return 'NCS (reserved)';
    if ((variantByte & 0xc) === 0x8) return 'RFC 9562';
    if ((variantByte & 0xe) === 0xc) return 'Microsoft (reserved)';
    return 'Reserved';
  }

  function extractTimestamp(uuid) {
    var clean = uuid.replace(/-/g, '');
    var version = getVersionFromUUID(uuid);

    if (version === 7) {
      // UUID v7: first 48 bits are Unix timestamp in milliseconds
      var hexTs = clean.slice(0, 12);
      var ms = parseInt(hexTs, 16);
      return new Date(ms);
    }

    if (version === 1) {
      // UUID v1: timestamp is in bytes 0-3, 4-5, 6-7 (60-bit, 100ns intervals since 1582-10-15)
      var timeLow = clean.slice(0, 8);
      var timeMid = clean.slice(8, 12);
      var timeHi = clean.slice(13, 16); // skip version nibble
      var timestamp100ns = parseInt(timeHi + timeMid + timeLow, 16);
      // Convert from 100ns intervals since 1582-10-15 to Unix ms
      var unixMs = (timestamp100ns - 122192928000000000) / 10000;
      return new Date(unixMs);
    }

    return null;
  }

  function formatTimestamp(date) {
    if (!date || isNaN(date.getTime())) return 'Invalid timestamp';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
      timeZoneName: 'short'
    });
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function handleGenerate() {
    var uuid = formatUUID(generateUUID());

    elements.uuidText.textContent = uuid;
    elements.uuidText.classList.remove('placeholder');

    // Show meta info
    var meta = '<span><span class="meta-label">Version:</span> ' + selectedVersion + '</span>';
    meta += '<span><span class="meta-label">Variant:</span> RFC 9562</span>';
    meta += '<span><span class="meta-label">Bits:</span> 128</span>';
    if (selectedVersion === 7) {
      var ts = extractTimestamp(uuid.toLowerCase());
      if (ts) {
        meta += '<span><span class="meta-label">Timestamp:</span> ' + formatTimestamp(ts) + '</span>';
      }
    }
    elements.uuidMeta.innerHTML = meta;

    elements.singleOutput.style.display = 'block';
    elements.bulkOutput.style.display = 'none';

    trackEvent('generate', 'v' + selectedVersion);
  }

  function handleBulkGenerate() {
    var count = parseInt(elements.bulkCount.value, 10);
    var uuids = [];
    for (var i = 0; i < count; i++) {
      uuids.push(formatUUID(generateUUID()));
    }

    elements.bulkCountLabel.textContent = count + ' UUIDs generated (v' + selectedVersion + ')';
    elements.bulkList.textContent = uuids.join('\n');
    elements.bulkOutput.style.display = 'block';
    elements.copyBulkBtn.style.display = 'flex';

    trackEvent('bulk_generate', 'v' + selectedVersion + '_x' + count);
  }

  function handleDecode() {
    var input = elements.decodeInput.value.trim();
    if (!input) {
      elements.decodeResult.style.display = 'none';
      return;
    }

    // Validate UUID format
    var uuidRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
    if (!uuidRegex.test(input)) {
      elements.decodeResult.style.display = 'block';
      elements.decodeResult.className = 'decode-result error';
      elements.decodeResult.innerHTML = '<span class="decode-error"><i class="fas fa-times-circle"></i> Invalid UUID format. Expected 32 hex characters (with or without hyphens).</span>';
      trackEvent('decode', 'invalid');
      return;
    }

    // Normalize to lowercase with hyphens
    var clean = input.replace(/-/g, '').toLowerCase();
    var normalized = clean.slice(0, 8) + '-' + clean.slice(8, 12) + '-' + clean.slice(12, 16) + '-' + clean.slice(16, 20) + '-' + clean.slice(20, 32);

    var version = getVersionFromUUID(normalized);
    var variant = getVariantFromUUID(normalized);
    var timestamp = extractTimestamp(normalized);

    var versionNames = {
      1: 'v1 (Timestamp + MAC)',
      2: 'v2 (DCE Security)',
      3: 'v3 (MD5 Hash)',
      4: 'v4 (Random)',
      5: 'v5 (SHA-1 Hash)',
      6: 'v6 (Reordered Timestamp)',
      7: 'v7 (Timestamp + Random)',
      8: 'v8 (Custom)'
    };

    var badgeClass = 'badge-other';
    if (version === 4) badgeClass = 'badge-v4';
    else if (version === 7) badgeClass = 'badge-v7';
    else if (version === 1) badgeClass = 'badge-v1';

    var html = '<div class="decode-grid">';
    html += '<div class="decode-item"><span class="decode-label">Version</span><span class="decode-value version-badge"><span class="badge ' + badgeClass + '">' + (versionNames[version] || 'Unknown (v' + version + ')') + '</span></span></div>';
    html += '<div class="decode-item"><span class="decode-label">Variant</span><span class="decode-value">' + escapeHtml(variant) + '</span></div>';
    html += '<div class="decode-item"><span class="decode-label">Canonical</span><span class="decode-value">' + escapeHtml(normalized) + '</span></div>';

    if (timestamp && !isNaN(timestamp.getTime())) {
      html += '<div class="decode-item"><span class="decode-label">Timestamp</span><span class="decode-value">' + escapeHtml(formatTimestamp(timestamp)) + '</span></div>';
      html += '<div class="decode-item"><span class="decode-label">Unix ms</span><span class="decode-value">' + timestamp.getTime() + '</span></div>';
    } else if (version === 4) {
      html += '<div class="decode-item"><span class="decode-label">Timestamp</span><span class="decode-value">None (random UUID)</span></div>';
    }

    html += '<div class="decode-item"><span class="decode-label">Hex (no hyphens)</span><span class="decode-value">' + escapeHtml(clean) + '</span></div>';
    html += '</div>';

    elements.decodeResult.style.display = 'block';
    elements.decodeResult.className = 'decode-result';
    elements.decodeResult.innerHTML = html;

    trackEvent('decode', 'v' + version);
  }

  function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(function() {
      var originalHtml = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(function() {
        btn.classList.remove('copied');
        btn.innerHTML = originalHtml;
      }, 2000);
    });
  }

  function init() {
    // Version selection
    elements.v4Btn.addEventListener('click', function() {
      selectedVersion = 4;
      elements.v4Btn.classList.add('active');
      elements.v7Btn.classList.remove('active');
    });

    elements.v7Btn.addEventListener('click', function() {
      selectedVersion = 7;
      elements.v7Btn.classList.add('active');
      elements.v4Btn.classList.remove('active');
    });

    // Generate
    elements.generateBtn.addEventListener('click', handleGenerate);
    elements.bulkBtn.addEventListener('click', handleBulkGenerate);

    // Format options trigger regeneration
    elements.uppercaseToggle.addEventListener('change', function() {
      if (!elements.uuidText.classList.contains('placeholder')) {
        handleGenerate();
      }
    });
    elements.noHyphensToggle.addEventListener('change', function() {
      if (!elements.uuidText.classList.contains('placeholder')) {
        handleGenerate();
      }
    });

    // Copy
    elements.copySingleBtn.addEventListener('click', function() {
      var text = elements.uuidText.textContent;
      if (text && !elements.uuidText.classList.contains('placeholder')) {
        copyToClipboard(text, elements.copySingleBtn);
        trackEvent('copy', 'single');
      }
    });

    elements.copyBulkBtn.addEventListener('click', function() {
      var text = elements.bulkList.textContent;
      if (text) {
        copyToClipboard(text, elements.copyBulkBtn);
        trackEvent('copy', 'bulk');
      }
    });

    // Decode
    elements.decodeBtn.addEventListener('click', handleDecode);
    elements.decodeInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleDecode();
      }
    });

    // Auto-decode on paste
    elements.decodeInput.addEventListener('paste', function() {
      setTimeout(handleDecode, 0);
    });

    // Generate one on load
    handleGenerate();

    trackEvent('tool_load', 'uuid_generator_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
