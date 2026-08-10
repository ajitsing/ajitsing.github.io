(function() {
  'use strict';

  var SAMPLE = {
    secret: 'secret-key',
    message: 'The quick brown fox jumps over the lazy dog',
    algorithm: 'SHA-256',
    // HMAC-SHA256("The quick brown fox jumps over the lazy dog", "secret-key")
    expectedHex: 'affee3b4888c714d8369e419b5e51d1ff7c024b64a94d76b8dd53c8fb5d0a2dc'
  };

  var elements = {
    modeTabs: document.querySelectorAll('.mode-tab'),
    algorithmSelect: document.getElementById('algorithm-select'),
    keyEncodingSelect: document.getElementById('key-encoding-select'),
    outputEncodingSelect: document.getElementById('output-encoding-select'),
    secretInput: document.getElementById('hmac-secret'),
    toggleSecretBtn: document.getElementById('toggle-secret-btn'),
    messageInput: document.getElementById('hmac-message'),
    expectedInput: document.getElementById('hmac-expected'),
    outputInput: document.getElementById('hmac-output'),
    actionBtn: document.getElementById('action-btn'),
    actionBtnText: document.getElementById('action-btn-text'),
    copyBtn: document.getElementById('copy-btn'),
    sampleBtn: document.getElementById('sample-btn'),
    clearBtn: document.getElementById('clear-btn'),
    resultSection: document.getElementById('result-section'),
    resultCard: document.getElementById('result-card'),
    resultIcon: document.getElementById('result-icon'),
    resultMessage: document.getElementById('result-message'),
    charCount: document.getElementById('char-count'),
    verifyOnly: document.querySelectorAll('.verify-only'),
    generateOnly: document.querySelectorAll('.generate-only'),
    outputLabel: document.getElementById('output-label')
  };

  var currentMode = 'generate';
  var lastDigest = '';
  var runTimer = null;

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'HMAC Generator',
        event_label: label,
        value: value
      });
    }
  }

  function showResult(isSuccess, message) {
    elements.resultSection.classList.remove('hidden');
    elements.resultCard.className = 'result-card ' + (isSuccess ? 'success' : 'error');
    elements.resultIcon.innerHTML = isSuccess
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-times-circle"></i>';
    elements.resultMessage.textContent = message;
  }

  function hideResult() {
    elements.resultSection.classList.add('hidden');
  }

  function setMode(mode) {
    currentMode = mode === 'verify' ? 'verify' : 'generate';
    elements.modeTabs.forEach(function(tab) {
      tab.classList.toggle('active', tab.getAttribute('data-mode') === currentMode);
    });
    elements.verifyOnly.forEach(function(el) {
      el.classList.toggle('hidden', currentMode !== 'verify');
    });
    elements.generateOnly.forEach(function(el) {
      el.classList.toggle('hidden', currentMode !== 'generate');
    });
    elements.actionBtnText.textContent = currentMode === 'verify' ? 'Verify' : 'Generate';
    if (elements.outputLabel) {
      elements.outputLabel.textContent = currentMode === 'verify' ? 'Computed HMAC:' : 'HMAC digest:';
    }
    hideResult();
    scheduleRun();
    trackEvent('toggle_mode', currentMode);
  }

  function utf8Encode(str) {
    return new TextEncoder().encode(str);
  }

  function bytesToHex(bytes) {
    var hex = '';
    var view = new Uint8Array(bytes);
    for (var i = 0; i < view.length; i++) {
      hex += view[i].toString(16).padStart(2, '0');
    }
    return hex;
  }

  function bytesToBase64(bytes) {
    var view = new Uint8Array(bytes);
    var binary = '';
    for (var i = 0; i < view.length; i++) {
      binary += String.fromCharCode(view[i]);
    }
    return btoa(binary);
  }

  function hexToBytes(hex) {
    var cleaned = hex.replace(/\s+/g, '').toLowerCase();
    if (!cleaned) {
      throw new Error('Hex key is empty');
    }
    if (cleaned.length % 2 !== 0) {
      throw new Error('Hex value must have an even number of characters');
    }
    if (!/^[0-9a-f]+$/.test(cleaned)) {
      throw new Error('Invalid hex value');
    }
    var out = new Uint8Array(cleaned.length / 2);
    for (var i = 0; i < out.length; i++) {
      out[i] = parseInt(cleaned.substr(i * 2, 2), 16);
    }
    return out;
  }

  function base64ToBytes(b64) {
    var cleaned = b64.replace(/\s+/g, '');
    if (!cleaned) {
      throw new Error('Base64 value is empty');
    }
    try {
      var binary = atob(cleaned);
      var out = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i++) {
        out[i] = binary.charCodeAt(i);
      }
      return out;
    } catch (e) {
      throw new Error('Invalid Base64 value');
    }
  }

  function decodeKey(value, encoding) {
    if (!value) {
      throw new Error('Please enter a secret key');
    }
    if (encoding === 'hex') {
      return hexToBytes(value);
    }
    if (encoding === 'base64') {
      return base64ToBytes(value);
    }
    return utf8Encode(value);
  }

  function normalizeDigest(value, encoding) {
    var cleaned = (value || '').replace(/\s+/g, '');
    if (!cleaned) {
      throw new Error('Please enter the expected HMAC');
    }
    if (encoding === 'hex') {
      cleaned = cleaned.toLowerCase();
      if (cleaned.length % 2 !== 0 || !/^[0-9a-f]+$/.test(cleaned)) {
        throw new Error('Expected HMAC is not valid hex');
      }
      return cleaned;
    }
    // Normalize Base64 by decoding and re-encoding
    var bytes = base64ToBytes(cleaned);
    return bytesToBase64(bytes);
  }

  function timingSafeEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    var diff = 0;
    for (var i = 0; i < a.length; i++) {
      diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
  }

  async function computeHmac(message, secretBytes, algorithm) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error('Web Crypto API is not available in this browser');
    }
    var key = await crypto.subtle.importKey(
      'raw',
      secretBytes,
      { name: 'HMAC', hash: { name: algorithm } },
      false,
      ['sign']
    );
    return crypto.subtle.sign('HMAC', key, utf8Encode(message));
  }

  function formatDigest(buffer, encoding) {
    return encoding === 'base64' ? bytesToBase64(buffer) : bytesToHex(buffer);
  }

  async function run() {
    var algorithm = elements.algorithmSelect.value;
    var keyEncoding = elements.keyEncodingSelect.value;
    var outputEncoding = elements.outputEncodingSelect.value;
    var secret = elements.secretInput.value;
    var message = elements.messageInput.value;

    try {
      if (!message) {
        throw new Error('Please enter a message');
      }

      var secretBytes = decodeKey(secret, keyEncoding);
      var digestBuffer = await computeHmac(message, secretBytes, algorithm);
      var digest = formatDigest(digestBuffer, outputEncoding);
      lastDigest = digest;

      if (currentMode === 'generate') {
        elements.outputInput.value = digest;
        elements.charCount.textContent = digest.length + ' characters';
        showResult(true, 'HMAC generated with ' + algorithm.replace('SHA-', 'HMAC-SHA'));
        trackEvent('generate', algorithm);
      } else {
        var expected = normalizeDigest(elements.expectedInput.value, outputEncoding);
        var matches = timingSafeEqual(digest.toLowerCase(), expected.toLowerCase());
        elements.outputInput.value = digest;
        elements.charCount.textContent = digest.length + ' characters';
        if (matches) {
          showResult(true, 'Signature valid - digests match');
          trackEvent('verify', 'valid');
        } else {
          showResult(false, 'Signature invalid - digests do not match');
          trackEvent('verify', 'invalid');
        }
      }
    } catch (e) {
      lastDigest = '';
      if (currentMode === 'generate') {
        elements.outputInput.value = '';
        elements.charCount.textContent = '';
      }
      showResult(false, e.message || 'Failed to compute HMAC');
      trackEvent(currentMode, 'error');
    }
  }

  function scheduleRun() {
    if (runTimer) {
      clearTimeout(runTimer);
    }
    runTimer = setTimeout(function() {
      run();
    }, 250);
  }

  function handleCopy() {
    var value = currentMode === 'generate'
      ? (elements.outputInput.value || lastDigest)
      : (elements.outputInput.value || lastDigest);
    if (!value) {
      return;
    }
    navigator.clipboard.writeText(value).then(function() {
      elements.copyBtn.classList.add('copied');
      elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(function() {
        elements.copyBtn.classList.remove('copied');
        elements.copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
      trackEvent('copy', 'hmac_digest');
    });
  }

  function handleSample() {
    elements.algorithmSelect.value = SAMPLE.algorithm;
    elements.keyEncodingSelect.value = 'utf8';
    elements.outputEncodingSelect.value = 'hex';
    elements.secretInput.value = SAMPLE.secret;
    elements.messageInput.value = SAMPLE.message;
    elements.expectedInput.value = SAMPLE.expectedHex;
    trackEvent('sample', currentMode);
    run();
  }

  function handleClear() {
    elements.secretInput.value = '';
    elements.messageInput.value = '';
    elements.expectedInput.value = '';
    elements.outputInput.value = '';
    elements.charCount.textContent = '';
    lastDigest = '';
    hideResult();
    trackEvent('clear', 'hmac_content');
    elements.messageInput.focus();
  }

  function toggleSecret() {
    var isPassword = elements.secretInput.type === 'password';
    elements.secretInput.type = isPassword ? 'text' : 'password';
    elements.toggleSecretBtn.innerHTML = isPassword
      ? '<i class="fas fa-eye-slash"></i>'
      : '<i class="fas fa-eye"></i>';
  }

  function init() {
    if (!window.crypto || !window.crypto.subtle) {
      showResult(false, 'Web Crypto API unavailable. Use HTTPS or a modern browser.');
    }

    elements.modeTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        setMode(tab.getAttribute('data-mode'));
      });
    });

    elements.actionBtn.addEventListener('click', function() {
      run();
    });
    elements.copyBtn.addEventListener('click', handleCopy);
    elements.sampleBtn.addEventListener('click', handleSample);
    elements.clearBtn.addEventListener('click', handleClear);
    elements.toggleSecretBtn.addEventListener('click', toggleSecret);

    [
      elements.algorithmSelect,
      elements.keyEncodingSelect,
      elements.outputEncodingSelect,
      elements.secretInput,
      elements.messageInput,
      elements.expectedInput
    ].forEach(function(el) {
      el.addEventListener('input', scheduleRun);
      el.addEventListener('change', scheduleRun);
    });

    elements.messageInput.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        run();
      }
    });

    trackEvent('tool_load', 'hmac_generator_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
