(function() {
  'use strict';

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'Base64 Tool',
        event_label: label,
        value: value
      });
    }
  }

  const modeTabs = document.querySelectorAll('.mode-tab');
  const inputLabel = document.getElementById('input-label');
  const outputLabel = document.getElementById('output-label');
  const inputTextarea = document.getElementById('base64-input');
  const outputTextarea = document.getElementById('base64-output');
  const convertBtn = document.getElementById('convert-btn');
  const convertBtnText = document.getElementById('convert-btn-text');
  const copyBtn = document.getElementById('copy-btn');
  const clearBtn = document.getElementById('clear-btn');
  const resultSection = document.getElementById('result-section');
  const resultCard = document.getElementById('result-card');
  const resultIcon = document.getElementById('result-icon');
  const resultMessage = document.getElementById('result-message');
  const charCount = document.getElementById('char-count');

  let currentMode = 'encode';
  let state = {
    encode: { input: '', output: '' },
    decode: { input: '', output: '' }
  };

  function init() {
    setupEventListeners();
    loadFromURL();
    updateCharCount();
    trackEvent('tool_load', 'base64_tool');
  }

  function setupEventListeners() {
    modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        setMode(tab.dataset.mode);
      });
    });

    convertBtn.addEventListener('click', convert);
    copyBtn.addEventListener('click', copyOutput);
    clearBtn.addEventListener('click', clearAll);

    inputTextarea.addEventListener('input', () => {
      hideResult();
      updateCharCount();
    });

    inputTextarea.addEventListener('paste', () => {
      setTimeout(() => {
        convert();
      }, 0);
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        convert();
      }
    });
  }

  function setMode(mode) {
    if (mode === currentMode) return;
    
    state[currentMode].input = inputTextarea.value;
    state[currentMode].output = outputTextarea.value;
    currentMode = mode;
    trackEvent('mode_switch', mode);

    modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    if (mode === 'encode') {
      inputLabel.textContent = 'Text to encode:';
      outputLabel.textContent = 'Base64 encoded:';
      inputTextarea.placeholder = 'Enter text to encode to Base64...';
      outputTextarea.placeholder = 'Base64 result will appear here...';
      convertBtnText.textContent = 'Encode';
    } else {
      inputLabel.textContent = 'Base64 to decode:';
      outputLabel.textContent = 'Decoded text:';
      inputTextarea.placeholder = 'Enter Base64 string to decode...';
      outputTextarea.placeholder = 'Decoded text will appear here...';
      convertBtnText.textContent = 'Decode';
    }

    inputTextarea.value = state[mode].input;
    outputTextarea.value = state[mode].output;
    hideResult();
    updateCharCount();
  }

  function encodeBase64(text) {
    const utf8Bytes = new TextEncoder().encode(text);
    const binaryString = Array.from(utf8Bytes, byte => String.fromCharCode(byte)).join('');
    return btoa(binaryString);
  }

  function decodeBase64(base64) {
    const cleanBase64 = base64.replace(/\s/g, '');
    
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanBase64)) {
      throw new Error('Invalid characters in Base64 string');
    }
    
    const binaryString = atob(cleanBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return new TextDecoder('utf-8').decode(bytes);
  }

  function convert() {
    const input = inputTextarea.value;
    
    if (!input.trim()) {
      outputTextarea.value = '';
      hideResult();
      updateCharCount();
      return;
    }

    try {
      let result;
      
      if (currentMode === 'encode') {
        result = encodeBase64(input);
        showResult('success', 'Encoded successfully!');
        trackEvent('encode', 'success', input.length);
      } else {
        result = decodeBase64(input);
        showResult('success', 'Decoded successfully!');
        trackEvent('decode', 'success', input.length);
      }
      
      outputTextarea.value = result;
      state[currentMode].output = result;
      updateCharCount();
    } catch (e) {
      outputTextarea.value = '';
      state[currentMode].output = '';
      showResult('error', e.message);
      trackEvent(currentMode + '_error', e.message);
      updateCharCount();
    }
  }

  function showResult(type, message) {
    resultSection.classList.remove('hidden');
    resultCard.className = 'result-card ' + type;
    resultIcon.innerHTML = type === 'success' 
      ? '<i class="fas fa-check-circle"></i>' 
      : '<i class="fas fa-exclamation-circle"></i>';
    resultMessage.textContent = message;
  }

  function hideResult() {
    resultSection.classList.add('hidden');
  }

  function copyOutput() {
    const output = outputTextarea.value;
    if (!output) return;

    navigator.clipboard.writeText(output).then(() => {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.classList.add('copied');
      trackEvent('copy', currentMode, output.length);
      
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  }

  function clearAll() {
    inputTextarea.value = '';
    outputTextarea.value = '';
    state[currentMode].input = '';
    state[currentMode].output = '';
    hideResult();
    updateCharCount();
    inputTextarea.focus();
  }

  function updateCharCount() {
    const inputLen = inputTextarea.value.length;
    const outputLen = outputTextarea.value.length;
    charCount.textContent = inputLen + ' → ' + outputLen + ' chars';
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    const mode = params.get('mode');
    if (mode === 'encode' || mode === 'decode') {
      currentMode = mode;
      modeTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.mode === mode);
      });
      if (mode === 'decode') {
        inputLabel.textContent = 'Base64 to decode:';
        outputLabel.textContent = 'Decoded text:';
        inputTextarea.placeholder = 'Enter Base64 string to decode...';
        outputTextarea.placeholder = 'Decoded text will appear here...';
        convertBtnText.textContent = 'Decode';
      }
    }
    
    const input = params.get('input');
    if (input) {
      const decodedInput = decodeURIComponent(input);
      inputTextarea.value = decodedInput;
      state[currentMode].input = decodedInput;
      trackEvent('url_load', currentMode);
      convert();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
