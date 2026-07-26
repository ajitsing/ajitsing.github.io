(function () {
  'use strict';

  var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var LOWER = 'abcdefghijklmnopqrstuvwxyz';
  var NUMBERS = '0123456789';
  var SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?/~';
  var AMBIGUOUS = /[0Ol1I]/g;

  var app = document.getElementById('password-generator-app');
  if (!app) return;

  var defaultLength = parseInt(app.getAttribute('data-default-length'), 10) || 16;
  var mode = 'characters';
  var separator = '-';

  var outputEl = document.getElementById('pg-output');
  var copyBtn = document.getElementById('pg-copy-btn');
  var regenBtn = document.getElementById('pg-regen-btn');
  var strengthFill = document.getElementById('pg-strength-fill');
  var strengthLabel = document.getElementById('pg-strength-label');

  var lengthInput = document.getElementById('pg-length');
  var lengthValue = document.getElementById('pg-length-value');
  var upperEl = document.getElementById('pg-upper');
  var lowerEl = document.getElementById('pg-lower');
  var numbersEl = document.getElementById('pg-numbers');
  var symbolsEl = document.getElementById('pg-symbols');
  var spacesEl = document.getElementById('pg-spaces');
  var ambiguousEl = document.getElementById('pg-ambiguous');

  var wordCountInput = document.getElementById('pg-word-count');
  var wordCountValue = document.getElementById('pg-word-count-value');
  var capitalizeEl = document.getElementById('pg-capitalize');
  var addNumberEl = document.getElementById('pg-add-number');

  var charPanel = document.getElementById('pg-char-panel');
  var wordPanel = document.getElementById('pg-word-panel');
  var modeBtns = app.querySelectorAll('.pg-mode-btn');
  var presetBtns = app.querySelectorAll('.pg-preset-btn');
  var wordPresetBtns = app.querySelectorAll('.pg-word-preset-btn');
  var sepBtns = app.querySelectorAll('.pg-sep-btn');

  function track(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'Password Generator',
        event_label: label
      });
    }
  }

  function secureRandomInt(max) {
    if (max <= 0) return 0;
    var limit = Math.floor(0x100000000 / max) * max;
    var arr = new Uint32Array(1);
    var x;
    do {
      crypto.getRandomValues(arr);
      x = arr[0];
    } while (x >= limit);
    return x % max;
  }

  function pickChar(pool) {
    return pool.charAt(secureRandomInt(pool.length));
  }

  function buildCharset() {
    var pool = '';
    if (upperEl.checked) pool += UPPER;
    if (lowerEl.checked) pool += LOWER;
    if (numbersEl.checked) pool += NUMBERS;
    if (symbolsEl.checked) pool += SYMBOLS;
    if (spacesEl.checked) pool += ' ';
    if (ambiguousEl.checked) pool = pool.replace(AMBIGUOUS, '');
    return pool;
  }

  function generateCharacterPassword(length) {
    var pool = buildCharset();
    if (!pool) {
      return { password: '', error: 'Select at least one character set.' };
    }

    var required = [];
    if (upperEl.checked) {
      var u = ambiguousEl.checked ? UPPER.replace(AMBIGUOUS, '') : UPPER;
      if (u) required.push(pickChar(u));
    }
    if (lowerEl.checked) {
      var l = ambiguousEl.checked ? LOWER.replace(AMBIGUOUS, '') : LOWER;
      if (l) required.push(pickChar(l));
    }
    if (numbersEl.checked) {
      var n = ambiguousEl.checked ? NUMBERS.replace(AMBIGUOUS, '') : NUMBERS;
      if (n) required.push(pickChar(n));
    }
    if (symbolsEl.checked) required.push(pickChar(SYMBOLS));
    if (spacesEl.checked) required.push(' ');

    while (required.length > length) {
      required.pop();
    }

    var chars = required.slice();
    while (chars.length < length) {
      chars.push(pickChar(pool));
    }

    for (var i = chars.length - 1; i > 0; i--) {
      var j = secureRandomInt(i + 1);
      var tmp = chars[i];
      chars[i] = chars[j];
      chars[j] = tmp;
    }

    return { password: chars.join('') };
  }

  function generatePassphrase(wordCount) {
    var list = window.EFF_WORDLIST;
    if (!list || !list.length) {
      return { password: '', error: 'Word list failed to load.' };
    }

    var words = [];
    for (var i = 0; i < wordCount; i++) {
      var word = list[secureRandomInt(list.length)];
      if (capitalizeEl.checked) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      words.push(word);
    }

    var phrase = words.join(separator);
    if (addNumberEl.checked) {
      phrase += String(secureRandomInt(10));
    }
    return { password: phrase };
  }

  function estimateStrength(password) {
    if (!password) {
      return { level: 0, label: '-', className: '' };
    }

    var entropy;
    if (mode === 'words') {
      var wordCount = parseInt(wordCountInput.value, 10) || 6;
      entropy = wordCount * Math.log2(7776);
      if (addNumberEl.checked) entropy += Math.log2(10);
    } else {
      var pool = buildCharset();
      entropy = password.length * Math.log2(Math.max(pool.length, 2));
    }

    if (entropy < 40) return { level: 1, label: 'Weak', className: 'weak' };
    if (entropy < 60) return { level: 2, label: 'Fair', className: 'fair' };
    if (entropy < 80) return { level: 3, label: 'Good', className: 'good' };
    if (entropy < 100) return { level: 4, label: 'Strong', className: 'strong' };
    return { level: 5, label: 'Very strong', className: 'very-strong' };
  }

  function updateStrength(password) {
    var s = estimateStrength(password);
    strengthFill.className = 'pg-strength-fill' + (s.className ? ' ' + s.className : '');
    strengthFill.style.width = (s.level * 20) + '%';
    strengthLabel.textContent = s.label;
    strengthLabel.className = 'pg-strength-label' + (s.className ? ' ' + s.className : '');
  }

  function syncLengthPresets(length) {
    for (var i = 0; i < presetBtns.length; i++) {
      var btn = presetBtns[i];
      var val = parseInt(btn.getAttribute('data-length'), 10);
      btn.classList.toggle('active', val === length);
    }
  }

  function syncWordPresets(count) {
    for (var i = 0; i < wordPresetBtns.length; i++) {
      var btn = wordPresetBtns[i];
      var val = parseInt(btn.getAttribute('data-words'), 10);
      btn.classList.toggle('active', val === count);
    }
  }

  function setLength(length) {
    length = Math.max(4, Math.min(64, length));
    lengthInput.value = String(length);
    lengthInput.setAttribute('aria-valuenow', String(length));
    lengthValue.textContent = String(length);
    syncLengthPresets(length);
  }

  function setWordCount(count) {
    count = Math.max(3, Math.min(10, count));
    wordCountInput.value = String(count);
    wordCountInput.setAttribute('aria-valuenow', String(count));
    wordCountValue.textContent = String(count);
    syncWordPresets(count);
  }

  function setMode(nextMode) {
    mode = nextMode;
    for (var i = 0; i < modeBtns.length; i++) {
      var btn = modeBtns[i];
      var active = btn.getAttribute('data-mode') === mode;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    }
    charPanel.classList.toggle('hidden', mode !== 'characters');
    wordPanel.classList.toggle('hidden', mode !== 'words');
    track('select_mode', mode);
    generate();
  }

  function generate() {
    var result;
    if (mode === 'words') {
      result = generatePassphrase(parseInt(wordCountInput.value, 10) || 6);
    } else {
      result = generateCharacterPassword(parseInt(lengthInput.value, 10) || defaultLength);
    }

    if (result.error) {
      outputEl.textContent = result.error;
      outputEl.classList.add('pg-error');
      updateStrength('');
      return;
    }

    outputEl.classList.remove('pg-error');
    outputEl.textContent = result.password;
    updateStrength(result.password);
  }

  function copyPassword() {
    var text = outputEl.textContent || '';
    if (!text || outputEl.classList.contains('pg-error')) return;

    function done() {
      var icon = copyBtn.querySelector('i');
      var label = copyBtn.querySelector('.pg-btn-label');
      copyBtn.classList.add('copied');
      if (icon) icon.className = 'fas fa-check';
      if (label) label.textContent = 'Copied';
      track('click_copy', mode);
      setTimeout(function () {
        copyBtn.classList.remove('copied');
        if (icon) icon.className = 'fas fa-copy';
        if (label) label.textContent = 'Copy';
      }, 1500);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text);
        done();
      });
    } else {
      fallbackCopy(text);
      done();
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  for (var m = 0; m < modeBtns.length; m++) {
    modeBtns[m].addEventListener('click', function (e) {
      setMode(e.currentTarget.getAttribute('data-mode'));
    });
  }

  lengthInput.addEventListener('input', function () {
    setLength(parseInt(lengthInput.value, 10));
    generate();
  });

  wordCountInput.addEventListener('input', function () {
    setWordCount(parseInt(wordCountInput.value, 10));
    generate();
  });

  for (var p = 0; p < presetBtns.length; p++) {
    presetBtns[p].addEventListener('click', function (e) {
      var len = parseInt(e.currentTarget.getAttribute('data-length'), 10);
      setLength(len);
      track('select_preset', String(len));
      generate();
    });
  }

  for (var w = 0; w < wordPresetBtns.length; w++) {
    wordPresetBtns[w].addEventListener('click', function (e) {
      var count = parseInt(e.currentTarget.getAttribute('data-words'), 10);
      setWordCount(count);
      track('select_word_preset', String(count));
      generate();
    });
  }

  for (var s = 0; s < sepBtns.length; s++) {
    sepBtns[s].addEventListener('click', function (e) {
      separator = e.currentTarget.getAttribute('data-sep');
      for (var i = 0; i < sepBtns.length; i++) {
        sepBtns[i].classList.toggle('active', sepBtns[i] === e.currentTarget);
      }
      generate();
    });
  }

  var optionEls = [upperEl, lowerEl, numbersEl, symbolsEl, spacesEl, ambiguousEl, capitalizeEl, addNumberEl];
  for (var o = 0; o < optionEls.length; o++) {
    optionEls[o].addEventListener('change', generate);
  }

  copyBtn.addEventListener('click', copyPassword);
  regenBtn.addEventListener('click', function () {
    track('click_regenerate', mode);
    generate();
  });

  setLength(defaultLength);
  setWordCount(6);
  generate();
})();
