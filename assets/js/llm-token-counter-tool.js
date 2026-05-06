(function() {
  'use strict';

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'LLM Token Counter',
        event_label: label,
        value: value
      });
    }
  }

  const TOKENIZER_CDN = 'https://esm.sh/gpt-tokenizer@2.9.0';
  const MAX_VIZ_TOKENS = 2000;

  const MODELS = {
    'gpt-4o':  { label: 'GPT-4o / GPT-4.1', kind: 'openai', encoding: 'o200k_base' },
    'gpt-4':   { label: 'GPT-4 / GPT-3.5',  kind: 'openai', encoding: 'cl100k_base' },
    'o1':      { label: 'o1 / o3',          kind: 'openai', encoding: 'o200k_base' },
    'claude':  { label: 'Claude',  kind: 'approx', ratio: 3.5 },
    'llama':   { label: 'Llama 3', kind: 'approx', ratio: 3.8 },
    'gemini':  { label: 'Gemini',  kind: 'approx', ratio: 4.0 },
    'mistral': { label: 'Mistral', kind: 'approx', ratio: 3.7 }
  };

  const EXAMPLES = {
    short: 'What is the capital of France?',
    system:
      'You are a helpful AI assistant. Answer the user\'s questions accurately and concisely. ' +
      'If you are uncertain about a fact, say so. Use markdown for formatting when appropriate, ' +
      'and prefer short paragraphs over long walls of text.',
    code:
      'function fib(n: number): number {\n' +
      '  if (n < 2) return n;\n' +
      '  let [a, b] = [0, 1];\n' +
      '  for (let i = 2; i <= n; i++) {\n' +
      '    [a, b] = [b, a + b];\n' +
      '  }\n' +
      '  return b;\n' +
      '}\n\n' +
      'console.log(fib(20));',
    long:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ' +
      'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
      'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in ' +
      'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n' +
      'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo ' +
      'pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris ' +
      'eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. ' +
      'Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien ' +
      'risus a quam. Maecenas fermentum consequat mi. Donec fermentum.\n\n' +
      'Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, ' +
      'neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada ' +
      'diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu.'
  };

  function getInputText() {
    return dom.input ? (dom.input.innerText || '') : '';
  }

  function setInputText(text) {
    if (!dom.input) return;
    dom.input.textContent = text || '';
  }

  const dom = {
    input:        document.getElementById('prompt-text'),
    pasteBtn:     document.getElementById('paste-btn'),
    clearBtn:     document.getElementById('clear-btn'),
    modelBtns:    document.querySelectorAll('.model-btn'),
    status:       document.getElementById('tokenizer-status'),
    statTokens:   document.getElementById('stat-tokens'),
    statTokensMeta: document.getElementById('stat-tokens-meta'),
    statChars:    document.getElementById('stat-chars'),
    statCharsMeta: document.getElementById('stat-chars-meta'),
    statWords:    document.getElementById('stat-words'),
    statRatio:    document.getElementById('stat-ratio'),
    copyBtn:      document.getElementById('copy-count-btn'),
    copyFeedback: document.getElementById('copy-feedback'),
    vizSection:   document.getElementById('visualization-section'),
    vizModeBadge: document.getElementById('viz-mode-badge'),
    vizContent:   document.getElementById('viz-content'),
    exampleBtns:  document.querySelectorAll('.example-btn')
  };

  const encoderCache = {};
  let encoderLoadFailed = false;
  let activeModel = 'gpt-4o';
  let updateTimer = null;

  function setStatus(state, message) {
    if (!dom.status) return;
    dom.status.classList.remove('ready', 'error');
    if (state === 'ready') dom.status.classList.add('ready');
    if (state === 'error') dom.status.classList.add('error');
    if (state === 'hidden') {
      dom.status.classList.add('hidden');
      return;
    }
    dom.status.classList.remove('hidden');
    const icon = state === 'ready'
      ? '<i class="fas fa-check-circle"></i>'
      : state === 'error'
        ? '<i class="fas fa-exclamation-triangle"></i>'
        : '<i class="fas fa-circle-notch fa-spin"></i>';
    dom.status.innerHTML = icon + '<span>' + message + '</span>';
  }

  async function loadEncoder(encoding) {
    if (encoderCache[encoding]) return encoderCache[encoding];
    if (encoderLoadFailed) throw new Error('encoder load previously failed');
    setStatus('loading', 'Loading ' + encoding + ' tokenizer...');
    try {
      const mod = await import(TOKENIZER_CDN + '/encoding/' + encoding);
      const encoder = {
        encode: mod.encode || (mod.default && mod.default.encode),
        decode: mod.decode || (mod.default && mod.default.decode)
      };
      if (typeof encoder.encode !== 'function') {
        throw new Error('tokenizer module missing encode()');
      }
      encoderCache[encoding] = encoder;
      return encoder;
    } catch (err) {
      encoderLoadFailed = true;
      throw err;
    }
  }

  function approxTokenize(text, ratio) {
    if (!text) return [];
    const re = /\s+|\S+/g;
    const tokens = [];
    const maxChunk = Math.max(2, Math.round(ratio));
    let m;
    while ((m = re.exec(text)) !== null) {
      const piece = m[0];
      if (piece.length <= Math.ceil(ratio * 1.5)) {
        tokens.push(piece);
      } else {
        for (let i = 0; i < piece.length; i += maxChunk) {
          tokens.push(piece.slice(i, i + maxChunk));
        }
      }
    }
    return tokens;
  }

  function approxCount(text, ratio) {
    if (!text) return 0;
    return Math.max(1, Math.ceil(text.length / ratio));
  }

  function countWords(text) {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  function fmtNumber(n) {
    return n.toLocaleString('en-US');
  }

  function clearVisualization(reason) {
    dom.vizContent.innerHTML = reason
      ? '<span class="viz-empty">' + reason + '</span>'
      : '';
  }

  function renderVisualization(pieces, mode) {
    dom.vizSection.classList.remove('hidden');
    dom.vizModeBadge.textContent = mode === 'exact' ? 'exact tokens' : 'approximation';
    dom.vizModeBadge.classList.toggle('exact', mode === 'exact');
    dom.vizModeBadge.classList.toggle('approx', mode !== 'exact');

    if (!pieces.length) {
      clearVisualization('Type something above to see the token breakdown.');
      return;
    }

    const fragment = document.createDocumentFragment();
    const cap = Math.min(pieces.length, MAX_VIZ_TOKENS);
    for (let i = 0; i < cap; i++) {
      const piece = pieces[i];
      const span = document.createElement('span');
      span.className = 'tok tok-' + (i % 8);
      span.textContent = piece;
      span.title = '#' + (i + 1) + (piece.length === 1 ? ' (1 char)' : ' (' + piece.length + ' chars)');
      fragment.appendChild(span);
    }
    if (pieces.length > MAX_VIZ_TOKENS) {
      const more = document.createElement('div');
      more.className = 'viz-empty';
      more.style.marginTop = '12px';
      more.textContent = '… (+ ' + fmtNumber(pieces.length - MAX_VIZ_TOKENS) +
        ' more tokens not rendered for performance)';
      fragment.appendChild(more);
    }
    dom.vizContent.replaceChildren(fragment);
  }

  function updateStats(tokenCount, text, modelMeta) {
    const chars = text.length;
    const words = countWords(text);
    dom.statTokens.textContent = fmtNumber(tokenCount);
    dom.statTokensMeta.textContent = modelMeta;
    dom.statChars.textContent = fmtNumber(chars);
    dom.statWords.textContent = fmtNumber(words);
    if (tokenCount > 0 && chars > 0) {
      dom.statRatio.textContent = (chars / tokenCount).toFixed(2);
    } else {
      dom.statRatio.textContent = '—';
    }
  }

  async function recompute() {
    const text = getInputText();
    const model = MODELS[activeModel];

    if (!text) {
      updateStats(0, text, model.kind === 'openai' ? model.encoding : '~' + model.ratio + ' chars/token');
      clearVisualization('Type something above to see the token breakdown.');
      dom.vizModeBadge.textContent = model.kind === 'openai' ? 'exact tokens' : 'approximation';
      dom.vizModeBadge.classList.toggle('exact', model.kind === 'openai');
      dom.vizModeBadge.classList.toggle('approx', model.kind !== 'openai');
      dom.vizSection.classList.remove('hidden');
      return;
    }

    if (model.kind === 'openai') {
      try {
        const enc = await loadEncoder(model.encoding);
        const ids = enc.encode(text);
        const pieces = ids.map(id => {
          try { return enc.decode([id]); }
          catch (_) { return '\uFFFD'; }
        });
        updateStats(ids.length, text, model.encoding);
        renderVisualization(pieces, 'exact');
        setStatus('ready', 'Tokenizer ready (' + model.encoding + ')');
        return;
      } catch (err) {
        const fallbackRatio = model.encoding === 'o200k_base' ? 4.0 : 3.7;
        const pieces = approxTokenize(text, fallbackRatio);
        const count = approxCount(text, fallbackRatio);
        updateStats(count, text, '~' + fallbackRatio + ' chars/token (fallback)');
        renderVisualization(pieces, 'approx');
        setStatus('error',
          'Tokenizer CDN unreachable. Showing approximation. Refresh to retry.');
        return;
      }
    }

    const pieces = approxTokenize(text, model.ratio);
    const count = approxCount(text, model.ratio);
    updateStats(count, text, '~' + model.ratio + ' chars/token');
    renderVisualization(pieces, 'approx');
    setStatus('hidden');
  }

  function scheduleRecompute() {
    if (updateTimer) clearTimeout(updateTimer);
    updateTimer = setTimeout(recompute, 180);
  }

  function setActiveModel(modelKey) {
    if (!MODELS[modelKey]) return;
    activeModel = modelKey;
    dom.modelBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.model === modelKey);
    });
    const model = MODELS[modelKey];
    if (model.kind === 'openai') {
      setStatus('loading', 'Switching to ' + model.encoding + '...');
    } else {
      setStatus('hidden');
    }
    recompute();
    trackEvent('model_change', modelKey);
  }

  function showCopyFeedback() {
    dom.copyFeedback.classList.remove('hidden');
    setTimeout(() => {
      dom.copyFeedback.classList.add('hidden');
    }, 1400);
  }

  function copySummary() {
    const model = MODELS[activeModel];
    const tokens = dom.statTokens.textContent;
    const chars = dom.statChars.textContent;
    const words = dom.statWords.textContent;
    const ratio = dom.statRatio.textContent;
    const tag = model.kind === 'openai' ? 'exact' : 'approx';
    const summary =
      'LLM Token Counter — ' + model.label + ' (' + tag + ')\n' +
      'Tokens:     ' + tokens + '\n' +
      'Characters: ' + chars + '\n' +
      'Words:      ' + words + '\n' +
      'Chars/Tok:  ' + ratio;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(summary).then(showCopyFeedback, () => {});
    } else {
      const ta = document.createElement('textarea');
      ta.value = summary;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showCopyFeedback(); }
      catch (_) {}
      document.body.removeChild(ta);
    }
    trackEvent('copy_summary', activeModel);
  }

  async function pasteFromClipboard() {
    if (!navigator.clipboard || !navigator.clipboard.readText) return;
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        recompute();
        trackEvent('paste', activeModel);
      }
    } catch (_) {
      /* user denied, ignore */
    }
  }

  function clearInput() {
    setInputText('');
    dom.input.focus();
    recompute();
    trackEvent('clear', activeModel);
  }

  function loadExample(key) {
    const text = EXAMPLES[key];
    if (!text) return;
    setInputText(text);
    recompute();
    trackEvent('example_load', key);
  }

  function handleEditorPaste(e) {
    e.preventDefault();
    const cd = e.clipboardData || window.clipboardData;
    const text = cd ? cd.getData('text/plain') : '';
    if (!text) return;
    if (document.execCommand) {
      document.execCommand('insertText', false, text);
    } else {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  function bindEvents() {
    dom.input.addEventListener('input', scheduleRecompute);
    dom.input.addEventListener('paste', handleEditorPaste);
    dom.pasteBtn.addEventListener('click', pasteFromClipboard);
    dom.clearBtn.addEventListener('click', clearInput);
    dom.copyBtn.addEventListener('click', copySummary);
    dom.modelBtns.forEach(btn => {
      btn.addEventListener('click', () => setActiveModel(btn.dataset.model));
    });
    dom.exampleBtns.forEach(btn => {
      btn.addEventListener('click', () => loadExample(btn.dataset.example));
    });
  }

  async function init() {
    bindEvents();
    setStatus('loading', 'Loading o200k_base tokenizer...');
    try {
      await loadEncoder('o200k_base');
      setStatus('ready', 'Tokenizer ready (o200k_base)');
    } catch (err) {
      setStatus('error',
        'Could not load tokenizer from CDN. Approximations will be used instead.');
    }
    recompute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
