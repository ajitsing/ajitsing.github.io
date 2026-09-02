(function() {
  'use strict';

  var BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var BASE62_INDEX = {};
  for (var i = 0; i < BASE62.length; i++) {
    BASE62_INDEX[BASE62.charAt(i)] = i;
  }

  var EPOCH_SECONDS = 1400000000; // 2014-05-13T16:53:20Z
  var BYTE_LENGTH = 20;
  var STRING_LENGTH = 27;

  var elements = {
    generateBtn: document.getElementById('generate-btn'),
    idText: document.getElementById('ksuid-text'),
    idMeta: document.getElementById('ksuid-meta'),
    copySingleBtn: document.getElementById('copy-single-btn'),
    bulkBtn: document.getElementById('bulk-btn'),
    bulkCount: document.getElementById('bulk-count'),
    bulkOutput: document.getElementById('bulk-output'),
    bulkCountLabel: document.getElementById('bulk-count-label'),
    bulkList: document.getElementById('bulk-list'),
    copyBulkBtn: document.getElementById('copy-bulk-btn'),
    decodeInput: document.getElementById('decode-input'),
    decodeBtn: document.getElementById('decode-btn'),
    decodeResult: document.getElementById('decode-result')
  };

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'KSUID Generator',
        event_label: label
      });
    }
  }

  function bytesToBigInt(bytes) {
    var n = 0n;
    for (var i = 0; i < bytes.length; i++) {
      n = (n << 8n) + BigInt(bytes[i]);
    }
    return n;
  }

  function encodeBase62(bytes) {
    var n = bytesToBigInt(bytes);
    if (n === 0n) {
      return BASE62.charAt(0).repeat(STRING_LENGTH);
    }
    var s = '';
    while (n > 0n) {
      s = BASE62.charAt(Number(n % 62n)) + s;
      n = n / 62n;
    }
    while (s.length < STRING_LENGTH) {
      s = BASE62.charAt(0) + s;
    }
    return s;
  }

  function decodeBase62(str) {
    var n = 0n;
    for (var i = 0; i < str.length; i++) {
      var idx = BASE62_INDEX[str.charAt(i)];
      if (idx === undefined) return null;
      n = n * 62n + BigInt(idx);
    }
    var bytes = new Uint8Array(BYTE_LENGTH);
    for (var j = BYTE_LENGTH - 1; j >= 0; j--) {
      bytes[j] = Number(n & 0xffn);
      n >>= 8n;
    }
    if (n !== 0n) return null;
    return bytes;
  }

  function parseTimestamp(bytes) {
    return ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) >>> 0;
  }

  function timestampHex(bytes) {
    var hex = '';
    for (var i = 0; i < 4; i++) {
      hex += ('0' + bytes[i].toString(16)).slice(-2);
    }
    return hex;
  }

  function payloadHex(bytes) {
    var hex = '';
    for (var i = 4; i < BYTE_LENGTH; i++) {
      hex += ('0' + bytes[i].toString(16)).slice(-2);
    }
    return hex;
  }

  function generateKSUID() {
    var ts = Math.floor(Date.now() / 1000) - EPOCH_SECONDS;
    if (ts < 0) ts = 0;
    var bytes = new Uint8Array(BYTE_LENGTH);
    bytes[0] = (ts >>> 24) & 0xff;
    bytes[1] = (ts >>> 16) & 0xff;
    bytes[2] = (ts >>> 8) & 0xff;
    bytes[3] = ts & 0xff;
    crypto.getRandomValues(bytes.subarray(4));
    return { id: encodeBase62(bytes), bytes: bytes };
  }

  function isValidKSUID(str) {
    if (!str || str.length !== STRING_LENGTH) return false;
    for (var i = 0; i < str.length; i++) {
      if (BASE62_INDEX[str.charAt(i)] === undefined) return false;
    }
    return decodeBase62(str) !== null;
  }

  function formatTime(ms) {
    var d = new Date(ms);
    if (isNaN(d.getTime())) return 'Invalid';
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  }

  function formatUTC(ms) {
    var d = new Date(ms);
    if (isNaN(d.getTime())) return 'Invalid';
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short'
    });
  }

  function unixFromBytes(bytes) {
    return parseTimestamp(bytes) + EPOCH_SECONDS;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function handleGenerate() {
    var result = generateKSUID();
    var unix = unixFromBytes(result.bytes);
    elements.idText.textContent = result.id;
    elements.idText.classList.remove('placeholder');
    elements.idMeta.innerHTML =
      '<span><span class="meta-label">Created:</span> ' + escapeHtml(formatTime(unix * 1000)) + '</span>' +
      '<span><span class="meta-label">Unix:</span> ' + unix + '</span>' +
      '<span><span class="meta-label">Encoding:</span> Base62</span>';
    trackEvent('generate', 'single');
  }

  function handleBulkGenerate() {
    var count = parseInt(elements.bulkCount.value, 10);
    var ids = [];
    for (var i = 0; i < count; i++) {
      ids.push(generateKSUID().id);
    }
    elements.bulkCountLabel.textContent = count + ' KSUIDs generated';
    elements.bulkList.textContent = ids.join('\n');
    elements.bulkOutput.style.display = 'block';
    elements.copyBulkBtn.style.display = 'flex';
    trackEvent('bulk_generate', 'x' + count);
  }

  function handleDecode() {
    var input = elements.decodeInput.value.trim();
    if (!input) {
      elements.decodeResult.style.display = 'none';
      return;
    }

    if (!isValidKSUID(input)) {
      elements.decodeResult.style.display = 'block';
      elements.decodeResult.className = 'decode-result error';
      elements.decodeResult.innerHTML = '<span class="decode-error"><i class="fas fa-times-circle"></i> Invalid KSUID. It must be exactly 27 Base62 characters (0-9, A-Z, a-z).</span>';
      trackEvent('decode', 'invalid');
      return;
    }

    var bytes = decodeBase62(input);
    var unix = unixFromBytes(bytes);
    var payload = payloadHex(bytes);
    var tsHex = timestampHex(bytes);

    var html = '<div class="decode-grid">';
    html += '<div class="decode-item"><span class="decode-label">Valid</span><span class="decode-value"><span class="badge">Valid KSUID</span></span></div>';
    html += '<div class="decode-item"><span class="decode-label">Timestamp (UTC)</span><span class="decode-value">' + escapeHtml(formatUTC(unix * 1000)) + '</span></div>';
    html += '<div class="decode-item"><span class="decode-label">Timestamp (Local)</span><span class="decode-value">' + escapeHtml(formatTime(unix * 1000)) + '</span></div>';
    html += '<div class="decode-item"><span class="decode-label">Unix seconds</span><span class="decode-value">' + unix + '</span></div>';
    html += '<div class="decode-item"><span class="decode-label">KSUID epoch offset</span><span class="decode-value">' + parseTimestamp(bytes) + ' s</span></div>';
    html += '<div class="decode-item"><span class="decode-label">Payload</span><span class="decode-value">' + escapeHtml(payload) + '</span></div>';
    html += '</div>';

    html += '<div class="ksuid-breakdown">';
    html += '<div class="breakdown-bar">';
    html += '<div class="breakdown-ts">' + escapeHtml(tsHex) + '</div>';
    html += '<div class="breakdown-rand">' + escapeHtml(payload) + '</div>';
    html += '</div>';
    html += '<div class="breakdown-legend">';
    html += '<span><span class="legend-dot ts"></span>Timestamp (4 bytes, hex)</span>';
    html += '<span><span class="legend-dot rand"></span>Payload (16 bytes, hex)</span>';
    html += '</div>';
    html += '</div>';

    elements.decodeResult.style.display = 'block';
    elements.decodeResult.className = 'decode-result';
    elements.decodeResult.innerHTML = html;
    trackEvent('decode', 'valid');
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
    elements.generateBtn.addEventListener('click', handleGenerate);
    elements.bulkBtn.addEventListener('click', handleBulkGenerate);

    elements.copySingleBtn.addEventListener('click', function() {
      var text = elements.idText.textContent;
      if (text && !elements.idText.classList.contains('placeholder')) {
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

    elements.decodeBtn.addEventListener('click', handleDecode);
    elements.decodeInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleDecode();
      }
    });
    elements.decodeInput.addEventListener('paste', function() {
      setTimeout(handleDecode, 0);
    });

    handleGenerate();
    trackEvent('tool_load', 'ksuid_generator_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
