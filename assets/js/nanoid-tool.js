(function() {
  'use strict';

  var URL_ALPHABET = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
  var ALPHABETS = {
    url: URL_ALPHABET,
    alphanumeric: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    hex: '0123456789abcdef',
    nolookalikes: '346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz'
  };

  var elements = {
    generateBtn: document.getElementById('generate-btn'),
    sizeRange: document.getElementById('size-range'),
    sizeInput: document.getElementById('size-input'),
    alphabetInput: document.getElementById('alphabet-input'),
    presetBtns: document.querySelectorAll('.preset-btn'),
    idText: document.getElementById('nanoid-text'),
    idMeta: document.getElementById('nanoid-meta'),
    copySingleBtn: document.getElementById('copy-single-btn'),
    collisionHint: document.getElementById('collision-hint'),
    bulkBtn: document.getElementById('bulk-btn'),
    bulkCount: document.getElementById('bulk-count'),
    bulkOutput: document.getElementById('bulk-output'),
    bulkCountLabel: document.getElementById('bulk-count-label'),
    bulkList: document.getElementById('bulk-list'),
    copyBulkBtn: document.getElementById('copy-bulk-btn')
  };

  var activePreset = 'url';

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'NanoID Generator',
        event_label: label
      });
    }
  }

  function clampSize(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) n = 21;
    if (n < 2) n = 2;
    if (n > 64) n = 64;
    return n;
  }

  function uniqueAlphabet(str) {
    var seen = {};
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str.charAt(i);
      if (ch === ' ' || ch === '\n' || ch === '\t') continue;
      if (!seen[ch]) {
        seen[ch] = true;
        out += ch;
      }
    }
    return out;
  }

  function getAlphabet() {
    var raw = elements.alphabetInput.value;
    var alphabet = uniqueAlphabet(raw);
    if (alphabet.length < 2) {
      return URL_ALPHABET;
    }
    return alphabet;
  }

  function getSize() {
    return clampSize(elements.sizeInput.value);
  }

  function generateId(alphabet, size) {
    var alphabetLen = alphabet.length;
    var mask = 1;
    var last = alphabetLen - 1;
    while (mask < last) {
      mask = (mask << 1) | 1;
    }
    var step = Math.ceil((1.6 * mask * size) / alphabetLen);
    var id = '';
    while (id.length < size) {
      var bytes = new Uint8Array(step);
      crypto.getRandomValues(bytes);
      for (var i = 0; i < step && id.length < size; i++) {
        var idx = bytes[i] & mask;
        if (idx < alphabetLen) {
          id += alphabet.charAt(idx);
        }
      }
    }
    return id;
  }

  function formatCount(n) {
    if (!isFinite(n) || n > 1e21) return 'more IDs than you will ever generate';
    var units = [
      { v: 1e18, s: 'quintillion' },
      { v: 1e15, s: 'quadrillion' },
      { v: 1e12, s: 'trillion' },
      { v: 1e9, s: 'billion' },
      { v: 1e6, s: 'million' },
      { v: 1e3, s: 'thousand' }
    ];
    for (var i = 0; i < units.length; i++) {
      if (n >= units[i].v) {
        var val = n / units[i].v;
        var digits = val >= 100 ? 0 : val >= 10 ? 1 : 1;
        return '~' + val.toFixed(digits).replace(/\.0$/, '') + ' ' + units[i].s;
      }
    }
    return '~' + Math.round(n);
  }

  function collisionAt(alphabetSize, length, p) {
    var lnSpace = length * Math.log(alphabetSize);
    var lnN = 0.5 * (Math.log(-2 * Math.log(1 - p)) + lnSpace);
    return Math.exp(lnN);
  }

  function entropyBits(alphabetSize, length) {
    return length * Math.log2(alphabetSize);
  }

  function updateCollisionHint() {
    var alphabet = getAlphabet();
    var size = getSize();
    var bits = entropyBits(alphabet.length, size);
    var n1 = collisionAt(alphabet.length, size, 0.01);
    elements.collisionHint.innerHTML =
      '<span><span class="meta-label">Alphabet:</span> ' + alphabet.length + ' chars</span>' +
      '<span><span class="meta-label">Entropy:</span> ' + bits.toFixed(1) + ' bits</span>' +
      '<span><span class="meta-label">1% collision after:</span> ' + formatCount(n1) + ' IDs</span>';
  }

  function handleGenerate() {
    var alphabet = getAlphabet();
    var size = getSize();
    var id = generateId(alphabet, size);
    elements.idText.textContent = id;
    elements.idText.classList.remove('placeholder');
    elements.idMeta.innerHTML =
      '<span><span class="meta-label">Length:</span> ' + id.length + '</span>' +
      '<span><span class="meta-label">Alphabet size:</span> ' + alphabet.length + '</span>';
    updateCollisionHint();
    trackEvent('generate', activePreset + ':' + size);
  }

  function handleBulkGenerate() {
    var alphabet = getAlphabet();
    var size = getSize();
    var count = parseInt(elements.bulkCount.value, 10);
    var ids = [];
    for (var i = 0; i < count; i++) {
      ids.push(generateId(alphabet, size));
    }
    elements.bulkCountLabel.textContent = count + ' NanoIDs generated';
    elements.bulkList.textContent = ids.join('\n');
    elements.bulkOutput.style.display = 'block';
    elements.copyBulkBtn.style.display = 'flex';
    trackEvent('bulk_generate', 'x' + count);
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

  function setPreset(name) {
    activePreset = name;
    for (var i = 0; i < elements.presetBtns.length; i++) {
      var btn = elements.presetBtns[i];
      btn.classList.toggle('active', btn.getAttribute('data-preset') === name);
    }
    if (name !== 'custom' && ALPHABETS[name]) {
      elements.alphabetInput.value = ALPHABETS[name];
    }
    updateCollisionHint();
    if (name !== 'custom') {
      handleGenerate();
    }
  }

  function syncSize(value, source) {
    var size = clampSize(value);
    if (source !== 'range') elements.sizeRange.value = String(size);
    if (source !== 'input') elements.sizeInput.value = String(size);
    updateCollisionHint();
  }

  function init() {
    elements.generateBtn.addEventListener('click', handleGenerate);
    elements.bulkBtn.addEventListener('click', handleBulkGenerate);

    elements.sizeRange.addEventListener('input', function() {
      syncSize(elements.sizeRange.value, 'range');
      handleGenerate();
    });
    elements.sizeInput.addEventListener('change', function() {
      syncSize(elements.sizeInput.value, 'input');
      handleGenerate();
    });

    for (var i = 0; i < elements.presetBtns.length; i++) {
      elements.presetBtns[i].addEventListener('click', function() {
        setPreset(this.getAttribute('data-preset'));
        trackEvent('preset', this.getAttribute('data-preset'));
      });
    }

    elements.alphabetInput.addEventListener('input', function() {
      var current = uniqueAlphabet(elements.alphabetInput.value);
      var matched = null;
      for (var key in ALPHABETS) {
        if (ALPHABETS[key] === current || ALPHABETS[key] === elements.alphabetInput.value) {
          matched = key;
          break;
        }
      }
      setPreset(matched || 'custom');
    });

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

    setPreset('url');
    trackEvent('tool_load', 'nanoid_generator_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
