(function() {
  'use strict';

  var CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  var CROCKFORD_DECODE = {};
  for (var i = 0; i < CROCKFORD.length; i++) {
    CROCKFORD_DECODE[CROCKFORD[i]] = i;
  }
  // Case-insensitive + commonly confused chars
  CROCKFORD_DECODE['O'] = 0;
  CROCKFORD_DECODE['o'] = 0;
  CROCKFORD_DECODE['I'] = 1;
  CROCKFORD_DECODE['i'] = 1;
  CROCKFORD_DECODE['L'] = 1;
  CROCKFORD_DECODE['l'] = 1;
  for (var c = 0; c < CROCKFORD.length; c++) {
    CROCKFORD_DECODE[CROCKFORD[c].toLowerCase()] = c;
  }

  var elements = {
    generateBtn: document.getElementById('generate-btn'),
    lowercaseToggle: document.getElementById('lowercase-toggle'),
    monotonicToggle: document.getElementById('monotonic-toggle'),
    ulidText: document.getElementById('ulid-text'),
    ulidMeta: document.getElementById('ulid-meta'),
    copySingleBtn: document.getElementById('copy-single-btn'),
    singleOutput: document.getElementById('single-output'),
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

  var lastTime = 0;
  var lastRandom = null;

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'ULID Generator',
        event_label: label
      });
    }
  }

  function randomBytes(n) {
    var bytes = new Uint8Array(n);
    crypto.getRandomValues(bytes);
    return bytes;
  }

  function encodeTime(time, len) {
    var str = '';
    for (var i = len - 1; i >= 0; i--) {
      var mod = time % 32;
      str = CROCKFORD[mod] + str;
      time = Math.floor(time / 32);
    }
    return str;
  }

  function encodeRandom(bytes) {
    // 80 bits = 16 base32 chars
    // We need to process 10 bytes into 16 chars (5 bits each)
    var bits = 0;
    var bitsCount = 0;
    var result = '';
    for (var i = 0; i < bytes.length && result.length < 16; i++) {
      bits = (bits << 8) | bytes[i];
      bitsCount += 8;
      while (bitsCount >= 5 && result.length < 16) {
        bitsCount -= 5;
        result += CROCKFORD[(bits >> bitsCount) & 0x1f];
      }
    }
    while (result.length < 16) {
      result += '0';
    }
    return result;
  }

  function incrementRandom(randomStr) {
    var chars = randomStr.split('');
    for (var i = chars.length - 1; i >= 0; i--) {
      var val = CROCKFORD_DECODE[chars[i]];
      if (val === undefined) val = 0;
      if (val < 31) {
        chars[i] = CROCKFORD[val + 1];
        return chars.join('');
      }
      chars[i] = CROCKFORD[0];
    }
    return null; // overflow
  }

  function generateULID() {
    var now = Date.now();
    var monotonic = elements.monotonicToggle.checked;
    var timeStr = encodeTime(now, 10);
    var randomStr;

    if (monotonic && now === lastTime && lastRandom) {
      randomStr = incrementRandom(lastRandom);
      if (!randomStr) {
        randomStr = encodeRandom(randomBytes(10));
      }
    } else {
      randomStr = encodeRandom(randomBytes(10));
    }

    lastTime = now;
    lastRandom = randomStr;

    return timeStr + randomStr;
  }

  function formatULID(ulid) {
    if (elements.lowercaseToggle.checked) {
      return ulid.toLowerCase();
    }
    return ulid;
  }

  function decodeTimestamp(ulid) {
    var timeStr = ulid.substring(0, 10).toUpperCase();
    var time = 0;
    for (var i = 0; i < timeStr.length; i++) {
      var val = CROCKFORD_DECODE[timeStr[i]];
      if (val === undefined) return null;
      time = time * 32 + val;
    }
    return time;
  }

  function isValidULID(str) {
    if (str.length !== 26) return false;
    var upper = str.toUpperCase();
    for (var i = 0; i < upper.length; i++) {
      if (CROCKFORD_DECODE[upper[i]] === undefined) return false;
    }
    // First character must be <= 7 (max ULID starts with 7)
    if (CROCKFORD_DECODE[upper[0]] > 7) return false;
    return true;
  }

  function formatTimestamp(ms) {
    var d = new Date(ms);
    if (isNaN(d.getTime())) return 'Invalid';
    return d.toLocaleString('en-US', {
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
      fractionalSecondDigits: 3,
      timeZone: 'UTC',
      timeZoneName: 'short'
    });
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function handleGenerate() {
    var ulid = formatULID(generateULID());
    elements.ulidText.textContent = ulid;
    elements.ulidText.classList.remove('placeholder');

    var ts = decodeTimestamp(ulid);
    var meta = '<span><span class="meta-label">Timestamp:</span> ' + formatTimestamp(ts) + '</span>';
    meta += '<span><span class="meta-label">Encoding:</span> Crockford Base32</span>';
    meta += '<span><span class="meta-label">Bits:</span> 128</span>';
    elements.ulidMeta.innerHTML = meta;

    elements.singleOutput.style.display = 'block';
    elements.bulkOutput.style.display = 'none';

    trackEvent('generate', 'single');
  }

  function handleBulkGenerate() {
    var count = parseInt(elements.bulkCount.value, 10);
    var ulids = [];
    for (var i = 0; i < count; i++) {
      ulids.push(formatULID(generateULID()));
    }

    elements.bulkCountLabel.textContent = count + ' ULIDs generated';
    elements.bulkList.textContent = ulids.join('\n');
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

    if (!isValidULID(input)) {
      elements.decodeResult.style.display = 'block';
      elements.decodeResult.className = 'decode-result error';
      elements.decodeResult.innerHTML = '<span class="decode-error"><i class="fas fa-times-circle"></i> Invalid ULID. Must be exactly 26 Crockford Base32 characters.</span>';
      trackEvent('decode', 'invalid');
      return;
    }

    var normalized = input.toUpperCase();
    var timestamp = decodeTimestamp(normalized);
    var tsPart = normalized.substring(0, 10);
    var randPart = normalized.substring(10);

    var html = '<div class="decode-grid">';
    html += '<div class="decode-item"><span class="decode-label">Valid</span><span class="decode-value"><span class="badge">Valid ULID</span></span></div>';
    html += '<div class="decode-item"><span class="decode-label">Timestamp (UTC)</span><span class="decode-value">' + escapeHtml(formatUTC(timestamp)) + '</span></div>';
    html += '<div class="decode-item"><span class="decode-label">Timestamp (Local)</span><span class="decode-value">' + escapeHtml(formatTimestamp(timestamp)) + '</span></div>';
    html += '<div class="decode-item"><span class="decode-label">Unix ms</span><span class="decode-value">' + timestamp + '</span></div>';
    html += '<div class="decode-item"><span class="decode-label">Timestamp Part</span><span class="decode-value">' + escapeHtml(tsPart) + '</span></div>';
    html += '<div class="decode-item"><span class="decode-label">Random Part</span><span class="decode-value">' + escapeHtml(randPart) + '</span></div>';
    html += '</div>';

    // Visual breakdown
    var displayUlid = elements.lowercaseToggle.checked ? normalized.toLowerCase() : normalized;
    var displayTs = displayUlid.substring(0, 10);
    var displayRand = displayUlid.substring(10);

    html += '<div class="ulid-breakdown">';
    html += '<div class="breakdown-bar">';
    html += '<div class="breakdown-ts">' + escapeHtml(displayTs) + '</div>';
    html += '<div class="breakdown-rand">' + escapeHtml(displayRand) + '</div>';
    html += '</div>';
    html += '<div class="breakdown-legend">';
    html += '<span><span class="legend-dot ts"></span>Timestamp (10 chars)</span>';
    html += '<span><span class="legend-dot rand"></span>Randomness (16 chars)</span>';
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

    elements.lowercaseToggle.addEventListener('change', function() {
      if (!elements.ulidText.classList.contains('placeholder')) {
        var current = elements.ulidText.textContent;
        elements.ulidText.textContent = elements.lowercaseToggle.checked
          ? current.toLowerCase()
          : current.toUpperCase();
      }
    });

    elements.copySingleBtn.addEventListener('click', function() {
      var text = elements.ulidText.textContent;
      if (text && !elements.ulidText.classList.contains('placeholder')) {
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
    trackEvent('tool_load', 'ulid_generator_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
