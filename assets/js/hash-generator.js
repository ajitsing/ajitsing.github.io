(function () {
  'use strict';

  var app = document.getElementById('hash-generator-app');
  if (!app) return;

  var ALGOS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
  var HEX_LEN = { MD5: 32, 'SHA-1': 40, 'SHA-256': 64, 'SHA-384': 96, 'SHA-512': 128 };

  var locked = app.getAttribute('data-lock') === 'true';
  var currentAlgo = app.getAttribute('data-algorithm') || 'SHA-256';
  if (ALGOS.indexOf(currentAlgo) === -1) currentAlgo = 'SHA-256';
  if (locked) currentAlgo = 'MD5';

  var format = 'hex';
  var fileBytes = null;
  var fileName = '';
  var lastHex = '';

  var textEl = document.getElementById('hg-text');
  var outputEl = document.getElementById('hg-output');
  var statsEl = document.getElementById('hg-stats');
  var compareEl = document.getElementById('hg-compare');
  var expectedEl = document.getElementById('hg-expected');
  var upperEl = document.getElementById('hg-uppercase');
  var copyBtn = document.getElementById('hg-copy-btn');
  var clearBtn = document.getElementById('hg-clear-btn');
  var dropEl = document.getElementById('hg-drop');
  var fileInput = document.getElementById('hg-file');
  var fileBtn = document.getElementById('hg-file-btn');
  var fileNameEl = document.getElementById('hg-file-name');
  var algoBtns = document.querySelectorAll('.hg-algo-btn');
  var formatBtns = document.querySelectorAll('.hg-format-btn');

  function md5(bytes) {
    var orig = bytes.length;
    var bitLen = orig * 8;
    var padLen = (orig % 64 < 56) ? (56 - orig % 64) : (120 - orig % 64);
    var buf = new Uint8Array(orig + padLen + 8);
    buf.set(bytes);
    buf[orig] = 0x80;
    var dv = new DataView(buf.buffer);
    dv.setUint32(buf.length - 8, bitLen >>> 0, true);
    dv.setUint32(buf.length - 4, Math.floor(bitLen / 0x100000000), true);

    var h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
    var K = [];
    for (var i = 0; i < 64; i++) K[i] = (Math.abs(Math.sin(i + 1)) * 4294967296) | 0;
    var s = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
      5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
      4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
      6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];

    function rotl(x, n) { return (x << n) | (x >>> (32 - n)); }

    for (var off = 0; off < buf.length; off += 64) {
      var M = [];
      for (var j = 0; j < 16; j++) M[j] = dv.getUint32(off + j * 4, true);
      var A = h[0], B = h[1], C = h[2], D = h[3];
      for (i = 0; i < 64; i++) {
        var F, g;
        if (i < 16) { F = (B & C) | ((~B) & D); g = i; }
        else if (i < 32) { F = (D & B) | ((~D) & C); g = (5 * i + 1) % 16; }
        else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
        else { F = C ^ (B | (~D)); g = (7 * i) % 16; }
        F = (F + A + K[i] + M[g]) | 0;
        A = D;
        D = C;
        C = B;
        B = (B + rotl(F, s[i])) | 0;
      }
      h[0] = (h[0] + A) | 0;
      h[1] = (h[1] + B) | 0;
      h[2] = (h[2] + C) | 0;
      h[3] = (h[3] + D) | 0;
    }

    var out = new Uint8Array(16);
    var ov = new DataView(out.buffer);
    ov.setUint32(0, h[0], true);
    ov.setUint32(4, h[1], true);
    ov.setUint32(8, h[2], true);
    ov.setUint32(12, h[3], true);
    var hex = '';
    for (var k = 0; k < 16; k++) hex += ('0' + out[k].toString(16)).slice(-2);
    return hex;
  }

  function bytesToHex(buf) {
    var arr = new Uint8Array(buf);
    var s = '';
    for (var i = 0; i < arr.length; i++) s += ('0' + arr[i].toString(16)).slice(-2);
    return s;
  }

  function hexToBase64(hex) {
    var bytes = [];
    for (var i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.substr(i, 2), 16));
    var bin = '';
    for (var j = 0; j < bytes.length; j++) bin += String.fromCharCode(bytes[j]);
    return btoa(bin);
  }

  function getBytes() {
    if (fileBytes) return fileBytes;
    return new TextEncoder().encode(textEl.value);
  }

  function formatOutput(hex) {
    if (format === 'base64') return hexToBase64(hex);
    return upperEl.checked ? hex.toUpperCase() : hex;
  }

  function normalizeHash(s) {
    return s.replace(/\s+/g, '').toLowerCase();
  }

  function updateCompare(hex) {
    var expected = expectedEl.value.trim();
    if (!expected) {
      compareEl.hidden = true;
      compareEl.textContent = '';
      return;
    }
    var got = format === 'base64' ? hexToBase64(hex).replace(/=+$/, '') : hex;
    var want = normalizeHash(expected).replace(/=+$/, '');
    var match = want === (format === 'base64' ? got.replace(/=+$/, '').toLowerCase() : hex);
    compareEl.hidden = false;
    compareEl.className = 'hg-compare ' + (match ? 'match' : 'mismatch');
    compareEl.textContent = match ? 'Match' : 'Does not match';
  }

  function hasInput() {
    return fileBytes !== null || textEl.value.length > 0;
  }

  function showEmpty() {
    lastHex = '';
    outputEl.innerHTML = '<span class="hg-placeholder">Your hash value will appear here</span>';
    statsEl.innerHTML = '';
    compareEl.hidden = true;
    compareEl.textContent = '';
    copyBtn.disabled = true;
  }

  function render(hex) {
    lastHex = hex;
    outputEl.textContent = formatOutput(hex);
    copyBtn.disabled = false;
    var bytes = getBytes();
    var source = fileBytes ? ('File · ' + fileName) : (bytes.length + ' bytes');
    statsEl.innerHTML =
      '<span class="stat-item"><span class="stat-label">Algorithm:</span> ' + currentAlgo + '</span>' +
      '<span class="stat-item"><span class="stat-label">Hex length:</span> ' + HEX_LEN[currentAlgo] + '</span>' +
      '<span class="stat-item"><span class="stat-label">Source:</span> ' + source + '</span>';
    updateCompare(hex);
  }

  function hash() {
    if (!hasInput()) {
      showEmpty();
      return;
    }
    var bytes = getBytes();
    if (currentAlgo === 'MD5') {
      render(md5(bytes));
      return;
    }
    if (!window.crypto || !crypto.subtle) {
      outputEl.textContent = 'Web Crypto is not available in this browser.';
      return;
    }
    crypto.subtle.digest(currentAlgo, bytes).then(function (buf) {
      render(bytesToHex(buf));
    }).catch(function () {
      outputEl.textContent = 'Could not compute ' + currentAlgo + '.';
    });
  }

  function setAlgo(algo) {
    currentAlgo = algo;
    algoBtns.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-algo') === algo);
    });
    hash();
  }

  function clearFile() {
    fileBytes = null;
    fileName = '';
    fileInput.value = '';
    fileNameEl.hidden = true;
    fileNameEl.textContent = '';
    dropEl.classList.remove('has-file');
  }

  function loadFile(file) {
    if (!file) return;
    file.arrayBuffer().then(function (buf) {
      fileBytes = new Uint8Array(buf);
      fileName = file.name + ' (' + file.size.toLocaleString() + ' bytes)';
      fileNameEl.hidden = false;
      fileNameEl.textContent = fileName + '. Hashing file bytes, not the text box.';
      dropEl.classList.add('has-file');
      hash();
    });
  }

  algoBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setAlgo(btn.getAttribute('data-algo'));
      if (typeof gtag === 'function') {
        gtag('event', 'select_algorithm', { event_category: 'Hash Generator', event_label: currentAlgo });
      }
    });
  });

  formatBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      formatBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      format = btn.getAttribute('data-format');
      if (lastHex) render(lastHex);
    });
  });

  upperEl.addEventListener('change', function () {
    if (lastHex) render(lastHex);
  });

  textEl.addEventListener('input', function () {
    if (fileBytes) return;
    hash();
  });

  expectedEl.addEventListener('input', function () {
    if (lastHex) updateCompare(lastHex);
  });

  fileBtn.addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', function () {
    if (fileInput.files[0]) loadFile(fileInput.files[0]);
  });

  ;['dragenter', 'dragover'].forEach(function (ev) {
    dropEl.addEventListener(ev, function (e) {
      e.preventDefault();
      dropEl.classList.add('drag');
    });
  });
  ;['dragleave', 'drop'].forEach(function (ev) {
    dropEl.addEventListener(ev, function (e) {
      e.preventDefault();
      dropEl.classList.remove('drag');
    });
  });
  dropEl.addEventListener('drop', function (e) {
    var f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) loadFile(f);
  });

  copyBtn.addEventListener('click', function () {
    if (copyBtn.disabled || !lastHex) return;
    var done = function () {
      copyBtn.classList.add('copied');
      var orig = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(function () { copyBtn.classList.remove('copied'); copyBtn.innerHTML = orig; }, 1600);
    };
    var text = formatOutput(lastHex);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done);
    } else {
      done();
    }
    if (typeof gtag === 'function') {
      gtag('event', 'copy', { event_category: 'Hash Generator', event_label: currentAlgo });
    }
  });

  clearBtn.addEventListener('click', function () {
    textEl.value = '';
    expectedEl.value = '';
    clearFile();
    hash();
  });

  if (!locked) setAlgo(currentAlgo);
  else hash();
})();
