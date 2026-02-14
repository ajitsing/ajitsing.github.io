(function() {
  'use strict';

  var elements = {};
  var currentErrorLine = null;
  var currentOutputMode = 'toml';

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'TOML Validator',
        event_label: label,
        value: value
      });
    }
  }

  function cacheElements() {
    elements = {
      tomlInput: document.getElementById('toml-input'),
      tomlOutput: document.getElementById('toml-output'),
      lineNumbers: document.getElementById('line-numbers'),
      outputLineNumbers: document.getElementById('output-line-numbers'),
      outputLabel: document.getElementById('output-label'),
      outputFormatBadge: document.getElementById('output-format-badge'),
      charCount: document.getElementById('char-count'),
      validateBtn: document.getElementById('validate-btn'),
      formatBtn: document.getElementById('format-btn'),
      toJsonBtn: document.getElementById('to-json-btn'),
      copyBtn: document.getElementById('copy-btn'),
      clearBtn: document.getElementById('clear-btn'),
      resultSection: document.getElementById('result-section'),
      resultCard: document.getElementById('result-card'),
      resultIcon: document.getElementById('result-icon'),
      resultMessage: document.getElementById('result-message'),
      errorDetails: document.getElementById('error-details'),
      editorPanels: document.getElementById('editor-panels'),
      inputPanel: document.getElementById('input-panel'),
      outputPanel: document.getElementById('output-panel'),
      panelResizer: document.getElementById('panel-resizer')
    };
  }

  // ── Line numbers ─────────────────────────────────────────────
  function updateLineNumbers(errorLine) {
    var text = elements.tomlInput.value;
    var lines = text.split('\n');
    var lineCount = Math.max(lines.length, 1);

    var html = '';
    for (var i = 1; i <= lineCount; i++) {
      var errorClass = (i === errorLine) ? ' error-line' : '';
      html += '<span class="line-number' + errorClass + '">' + i + '</span>';
    }

    elements.lineNumbers.innerHTML = html;
    currentErrorLine = errorLine || null;
  }

  function syncScroll() {
    elements.lineNumbers.scrollTop = elements.tomlInput.scrollTop;
  }

  function syncOutputScroll() {
    elements.outputLineNumbers.scrollTop = elements.tomlOutput.scrollTop;
  }

  function updateOutputLineNumbers(lineCount) {
    if (!lineCount || lineCount < 1) {
      elements.outputLineNumbers.innerHTML = '';
      return;
    }

    var html = '';
    for (var i = 1; i <= lineCount; i++) {
      html += '<span class="line-number">' + i + '</span>';
    }
    elements.outputLineNumbers.innerHTML = html;
  }

  function clearErrorHighlight() {
    currentErrorLine = null;
    updateLineNumbers(null);
    elements.resultSection.classList.add('hidden');
  }

  // ── Helpers ──────────────────────────────────────────────────
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── TOML syntax highlighting ─────────────────────────────────
  function highlightToml(tomlStr) {
    var lines = tomlStr.split('\n');
    var highlighted = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      // Empty line
      if (!line.trim()) {
        highlighted.push('');
        continue;
      }

      // Full-line comment
      if (/^\s*#/.test(line)) {
        highlighted.push('<span class="toml-comment">' + escapeHtml(line) + '</span>');
        continue;
      }

      // Array of tables header: [[...]]
      var arrTableMatch = line.match(/^(\s*)(\[\[)(.+?)(\]\])\s*(#.*)?$/);
      if (arrTableMatch) {
        var result = escapeHtml(arrTableMatch[1]);
        result += '<span class="toml-table-header">' + escapeHtml(arrTableMatch[2] + arrTableMatch[3] + arrTableMatch[4]) + '</span>';
        if (arrTableMatch[5]) {
          result += ' <span class="toml-comment">' + escapeHtml(arrTableMatch[5]) + '</span>';
        }
        highlighted.push(result);
        continue;
      }

      // Table header: [...]
      var tableMatch = line.match(/^(\s*)(\[)([^\[\]]+?)(\])\s*(#.*)?$/);
      if (tableMatch) {
        var tResult = escapeHtml(tableMatch[1]);
        tResult += '<span class="toml-table-header">' + escapeHtml(tableMatch[2] + tableMatch[3] + tableMatch[4]) + '</span>';
        if (tableMatch[5]) {
          tResult += ' <span class="toml-comment">' + escapeHtml(tableMatch[5]) + '</span>';
        }
        highlighted.push(tResult);
        continue;
      }

      // Key = value pair — find the first unquoted =
      var eqIdx = findUnquotedEquals(line);
      if (eqIdx >= 0) {
        var keyPart = line.substring(0, eqIdx);
        var valPart = line.substring(eqIdx + 1);

        // Check for inline comment in value
        var commentSplit = splitInlineComment(valPart);
        var valuePortion = commentSplit.value;
        var commentPortion = commentSplit.comment;

        var kvResult = '<span class="toml-key">' + escapeHtml(keyPart) + '</span>';
        kvResult += '<span class="toml-punctuation">=</span>';
        kvResult += highlightValue(valuePortion);
        if (commentPortion) {
          kvResult += '<span class="toml-comment">' + escapeHtml(commentPortion) + '</span>';
        }
        highlighted.push(kvResult);
        continue;
      }

      // Fallback: plain text
      highlighted.push(escapeHtml(line));
    }

    return highlighted.join('\n');
  }

  function findUnquotedEquals(line) {
    var inQuote = false;
    var quoteChar = '';
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (inQuote) {
        if (ch === '\\') { i++; continue; }
        if (ch === quoteChar) inQuote = false;
      } else {
        if (ch === '"' || ch === "'") { inQuote = true; quoteChar = ch; }
        else if (ch === '=') return i;
        else if (ch === '#') return -1; // comment before any =
      }
    }
    return -1;
  }

  function splitInlineComment(str) {
    var inQuote = false;
    var quoteChar = '';
    var inBracket = 0;
    var inBrace = 0;
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (inQuote) {
        if (ch === '\\') { i++; continue; }
        if (ch === quoteChar) inQuote = false;
      } else {
        if (ch === '"' || ch === "'") { inQuote = true; quoteChar = ch; }
        else if (ch === '[') inBracket++;
        else if (ch === ']') inBracket--;
        else if (ch === '{') inBrace++;
        else if (ch === '}') inBrace--;
        else if (ch === '#' && inBracket === 0 && inBrace === 0 && (i === 0 || str[i - 1] === ' ' || str[i - 1] === '\t')) {
          return { value: str.substring(0, i), comment: str.substring(i) };
        }
      }
    }
    return { value: str, comment: '' };
  }

  function highlightValue(val) {
    var trimmed = val.trim();

    if (!trimmed) return escapeHtml(val);

    // Boolean
    if (trimmed === 'true' || trimmed === 'false') {
      return leadingSpace(val) + '<span class="toml-boolean">' + escapeHtml(trimmed) + '</span>';
    }

    // Date/time (basic pattern)
    if (/^\d{4}-\d{2}-\d{2}/.test(trimmed) || /^\d{2}:\d{2}:\d{2}/.test(trimmed)) {
      return leadingSpace(val) + '<span class="toml-date">' + escapeHtml(trimmed) + '</span>';
    }

    // Number (integer or float, including hex, oct, bin, inf, nan)
    if (/^[+-]?(\d[\d_]*\.?[\d_]*([eE][+-]?\d[\d_]*)?|0x[\da-fA-F_]+|0o[0-7_]+|0b[01_]+|inf|nan)$/.test(trimmed)) {
      return leadingSpace(val) + '<span class="toml-number">' + escapeHtml(trimmed) + '</span>';
    }
    if (/^[+-](inf|nan)$/.test(trimmed)) {
      return leadingSpace(val) + '<span class="toml-number">' + escapeHtml(trimmed) + '</span>';
    }

    // Quoted string (basic or literal)
    if ((trimmed[0] === '"' || trimmed[0] === "'")) {
      return leadingSpace(val) + '<span class="toml-string">' + escapeHtml(trimmed) + '</span>';
    }

    // Array or inline table
    if (trimmed[0] === '[' || trimmed[0] === '{') {
      return highlightArrayOrInline(val);
    }

    // Fallback
    return '<span class="toml-string">' + escapeHtml(val) + '</span>';
  }

  function leadingSpace(val) {
    var match = val.match(/^(\s+)/);
    return match ? match[1] : '';
  }

  function highlightArrayOrInline(val) {
    // For arrays and inline tables, just color the brackets/braces
    var result = '';
    var inQuote = false;
    var quoteChar = '';

    for (var i = 0; i < val.length; i++) {
      var ch = val[i];
      if (inQuote) {
        result += escapeHtml(ch);
        if (ch === '\\') { i++; if (i < val.length) result += escapeHtml(val[i]); continue; }
        if (ch === quoteChar) inQuote = false;
      } else {
        if (ch === '"' || ch === "'") {
          inQuote = true;
          quoteChar = ch;
          result += '<span class="toml-string">' + escapeHtml(ch);
          // Collect the rest of the string
          var j = i + 1;
          while (j < val.length) {
            if (val[j] === '\\') { result += escapeHtml(val[j] + (val[j + 1] || '')); j += 2; continue; }
            if (val[j] === quoteChar) { result += escapeHtml(val[j]) + '</span>'; i = j; inQuote = false; break; }
            result += escapeHtml(val[j]);
            j++;
          }
          if (inQuote) { result += '</span>'; i = j - 1; inQuote = false; }
        } else if (ch === '[' || ch === ']' || ch === '{' || ch === '}' || ch === ',') {
          result += '<span class="toml-punctuation">' + escapeHtml(ch) + '</span>';
        } else if (ch === '#') {
          result += '<span class="toml-comment">' + escapeHtml(val.substring(i)) + '</span>';
          break;
        } else if (/\d/.test(ch)) {
          // Collect number
          var numStr = ch;
          var k = i + 1;
          while (k < val.length && /[\d._eExXoObB+-]/.test(val[k])) { numStr += val[k]; k++; }
          if (/^[+-]?(\d[\d_]*\.?[\d_]*([eE][+-]?\d[\d_]*)?|0x[\da-fA-F_]+|0o[0-7_]+|0b[01_]+|inf|nan)$/.test(numStr)) {
            result += '<span class="toml-number">' + escapeHtml(numStr) + '</span>';
          } else {
            result += escapeHtml(numStr);
          }
          i = k - 1;
        } else if (/[a-zA-Z]/.test(ch)) {
          // Collect keyword (true/false/inf/nan)
          var word = ch;
          var w = i + 1;
          while (w < val.length && /[a-zA-Z]/.test(val[w])) { word += val[w]; w++; }
          if (word === 'true' || word === 'false') {
            result += '<span class="toml-boolean">' + escapeHtml(word) + '</span>';
          } else if (word === 'inf' || word === 'nan') {
            result += '<span class="toml-number">' + escapeHtml(word) + '</span>';
          } else {
            result += escapeHtml(word);
          }
          i = w - 1;
        } else {
          result += escapeHtml(ch);
        }
      }
    }
    return result;
  }

  // ── JSON syntax highlighting ─────────────────────────────────
  function highlightJson(data, indent) {
    indent = indent || 0;
    var spaces = '  '.repeat(indent);
    var html = '';

    if (data === null) {
      return '<span class="json-null">null</span>';
    }

    if (typeof data === 'boolean') {
      return '<span class="json-boolean">' + data + '</span>';
    }

    if (typeof data === 'number') {
      return '<span class="json-number">' + data + '</span>';
    }

    if (typeof data === 'bigint') {
      return '<span class="json-number">' + data.toString() + '</span>';
    }

    if (typeof data === 'string') {
      return '<span class="json-string">"' + escapeHtml(data) + '"</span>';
    }

    if (data && typeof data === 'object' && typeof data.toISOString === 'function') {
      return '<span class="json-string">"' + escapeHtml(data.toISOString()) + '"</span>';
    }

    if (data && typeof data === 'object' && typeof data.toJSON === 'function' && !Array.isArray(data)) {
      return '<span class="json-string">"' + escapeHtml(String(data)) + '"</span>';
    }

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return '<span class="json-punctuation">[]</span>';
      }

      html += '<span class="json-punctuation">[</span>';

      for (var i = 0; i < data.length; i++) {
        html += '\n' + spaces + '  ' + highlightJson(data[i], indent + 1);
        if (i < data.length - 1) {
          html += '<span class="json-punctuation">,</span>';
        }
      }

      html += '\n' + spaces + '<span class="json-punctuation">]</span>';
      return html;
    }

    if (typeof data === 'object') {
      var keys = Object.keys(data);
      if (keys.length === 0) {
        return '<span class="json-punctuation">{}</span>';
      }

      html += '<span class="json-punctuation">{</span>';

      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        html += '\n' + spaces + '  ';
        html += '<span class="json-key">"' + escapeHtml(key) + '"</span>';
        html += '<span class="json-punctuation">: </span>';
        html += highlightJson(data[key], indent + 1);
        if (j < keys.length - 1) {
          html += '<span class="json-punctuation">,</span>';
        }
      }

      html += '\n' + spaces + '<span class="json-punctuation">}</span>';
      return html;
    }

    return escapeHtml(String(data));
  }

  // ── Output management ────────────────────────────────────────
  function setOutputMode(mode) {
    currentOutputMode = mode;
    if (mode === 'json') {
      elements.outputFormatBadge.textContent = 'JSON';
      elements.outputFormatBadge.className = 'format-badge json';
    } else {
      elements.outputFormatBadge.textContent = 'TOML';
      elements.outputFormatBadge.className = 'format-badge';
    }
  }

  function updateOutput(text, mode, parsedData) {
    if (!text) {
      elements.tomlOutput.innerHTML = '<span class="output-placeholder">Formatted output will appear here</span>';
      elements.charCount.textContent = '';
      updateOutputLineNumbers(0);
      setOutputMode('toml');
      return;
    }

    setOutputMode(mode || 'toml');

    if (mode === 'json' && parsedData !== undefined) {
      var html = highlightJson(parsedData, 0);
      html = html.replace(/^[\n\r]+/, '');
      elements.tomlOutput.innerHTML = html;
    } else {
      elements.tomlOutput.innerHTML = highlightToml(text);
    }

    elements.charCount.textContent = text.length + ' characters';

    var lineCount = text.split('\n').length;
    updateOutputLineNumbers(lineCount);
  }

  // ── TOML parsing/formatting ──────────────────────────────────
  function validateTOML(tomlString) {
    if (!tomlString.trim()) {
      return { valid: false, error: 'Please enter some TOML to validate', position: null };
    }

    try {
      var parsed = window.smolToml.parse(tomlString);
      return { valid: true, parsed: parsed, error: null };
    } catch (e) {
      var position = null;
      if (typeof e.line === 'number') {
        position = {
          line: e.line,
          column: (typeof e.column === 'number') ? e.column : 1
        };
      }
      var message = e.message || 'Unknown TOML error';
      // Clean up error message — remove "Invalid TOML: " prefix if present
      message = message.replace(/^Invalid TOML document:\s*/i, '').replace(/^Invalid TOML:\s*/i, '');
      return { valid: false, error: message, position: position };
    }
  }

  function formatTOML(tomlString) {
    var result = validateTOML(tomlString);
    if (!result.valid) {
      return result;
    }

    try {
      var formatted = window.smolToml.stringify(result.parsed);
      return { valid: true, formatted: formatted.trimEnd(), parsed: result.parsed, error: null };
    } catch (e) {
      return { valid: false, error: e.message || 'Failed to format TOML', position: null };
    }
  }

  function tomlToJson(tomlString) {
    var result = validateTOML(tomlString);
    if (!result.valid) {
      return result;
    }

    try {
      var json = JSON.stringify(result.parsed, function(key, value) {
        if (typeof value === 'bigint') return value.toString();
        return value;
      }, 2);
      return { valid: true, json: json, parsed: result.parsed, error: null };
    } catch (e) {
      return { valid: false, error: e.message || 'Failed to convert to JSON', position: null };
    }
  }

  // ── Result display ───────────────────────────────────────────
  function showResult(isValid, message, errorPosition) {
    var iconHtml = isValid
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-times-circle"></i>';
    var cardClass = 'result-card ' + (isValid ? 'success' : 'error');

    if (!isValid && errorPosition) {
      updateLineNumbers(errorPosition.line);
      elements.errorDetails.classList.remove('hidden');
      elements.errorDetails.innerHTML =
        '<div class="error-location">' +
          '<span class="error-label">Line ' + errorPosition.line + ', Column ' + errorPosition.column + '</span>' +
        '</div>' +
        '<div class="error-text">' + escapeHtml(message) + '</div>';
    } else if (!isValid) {
      updateLineNumbers(null);
      elements.errorDetails.classList.remove('hidden');
      elements.errorDetails.innerHTML = '<div class="error-text">' + escapeHtml(message) + '</div>';
    } else {
      updateLineNumbers(null);
      elements.errorDetails.classList.add('hidden');
    }

    elements.resultSection.classList.remove('hidden');
    elements.resultCard.className = cardClass;
    elements.resultIcon.innerHTML = iconHtml;
    elements.resultMessage.textContent = isValid ? 'Valid TOML' : 'Invalid TOML';
  }

  // ── Event handlers ───────────────────────────────────────────
  function handleValidate() {
    var tomlString = elements.tomlInput.value;
    var result = validateTOML(tomlString);

    trackEvent('validate', result.valid ? 'valid' : 'invalid');

    if (result.valid) {
      try {
        var formatted = window.smolToml.stringify(result.parsed).trimEnd();
        updateOutput(formatted, 'toml');
      } catch (e) {
        // If stringify fails, just show the original input
        updateOutput(tomlString, 'toml');
      }
    } else {
      updateOutput(null);
    }

    showResult(result.valid, result.error, result.position);
  }

  function handleFormat() {
    var tomlString = elements.tomlInput.value;
    var result = formatTOML(tomlString);

    trackEvent('format', result.valid ? 'valid' : 'invalid');

    if (result.valid) {
      updateOutput(result.formatted, 'toml');
      showResult(true, null, null);
    } else {
      updateOutput(null);
      showResult(false, result.error, result.position);
    }
  }

  function handleToJson() {
    var tomlString = elements.tomlInput.value;
    var result = tomlToJson(tomlString);

    trackEvent('to_json', result.valid ? 'valid' : 'invalid');

    if (result.valid) {
      updateOutput(result.json, 'json', result.parsed);
      showResult(true, null, null);
      elements.resultMessage.textContent = 'Valid TOML — Converted to JSON';
    } else {
      updateOutput(null);
      showResult(false, result.error, result.position);
    }
  }

  function handleCopy() {
    var outputText = elements.tomlOutput.textContent;
    if (!outputText || outputText === 'Formatted output will appear here') {
      var inputText = elements.tomlInput.value;
      if (!inputText.trim()) return;
      outputText = inputText;
    }

    trackEvent('copy', currentOutputMode + '_content');

    navigator.clipboard.writeText(outputText).then(function() {
      elements.copyBtn.classList.add('copied');
      elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

      setTimeout(function() {
        elements.copyBtn.classList.remove('copied');
        elements.copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    });
  }

  function handleClear() {
    trackEvent('clear', 'toml_content');

    elements.tomlInput.value = '';
    elements.resultSection.classList.add('hidden');
    updateLineNumbers(null);
    updateOutput(null);
    elements.tomlInput.focus();
  }

  function handleTabKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      var start = elements.tomlInput.selectionStart;
      var end = elements.tomlInput.selectionEnd;
      var value = elements.tomlInput.value;

      elements.tomlInput.value = value.substring(0, start) + '  ' + value.substring(end);
      elements.tomlInput.selectionStart = elements.tomlInput.selectionEnd = start + 2;

      updateLineNumbers(null);
    }
  }

  // ── Panel resizer ────────────────────────────────────────────
  function initResizer() {
    var isResizing = false;
    var startX = 0;
    var startInputWidth = 0;
    var startOutputWidth = 0;

    function onMouseDown(e) {
      isResizing = true;
      startX = e.clientX;
      var inputRect = elements.inputPanel.getBoundingClientRect();
      var outputRect = elements.outputPanel.getBoundingClientRect();
      startInputWidth = inputRect.width;
      startOutputWidth = outputRect.width;

      document.body.classList.add('resizing');
      elements.panelResizer.classList.add('dragging');

      e.preventDefault();
    }

    function onMouseMove(e) {
      if (!isResizing) return;

      var deltaX = e.clientX - startX;
      var containerWidth = elements.editorPanels.getBoundingClientRect().width - 24;
      var newInputWidth = startInputWidth + deltaX;
      var newOutputWidth = startOutputWidth - deltaX;

      var minWidth = 200;
      if (newInputWidth < minWidth) {
        newInputWidth = minWidth;
        newOutputWidth = containerWidth - minWidth;
      }
      if (newOutputWidth < minWidth) {
        newOutputWidth = minWidth;
        newInputWidth = containerWidth - minWidth;
      }

      var inputPercent = (newInputWidth / containerWidth) * 100;
      var outputPercent = (newOutputWidth / containerWidth) * 100;

      elements.inputPanel.style.flex = '0 0 ' + inputPercent + '%';
      elements.outputPanel.style.flex = '0 0 ' + outputPercent + '%';
    }

    function onMouseUp() {
      if (!isResizing) return;
      isResizing = false;
      document.body.classList.remove('resizing');
      elements.panelResizer.classList.remove('dragging');
    }

    elements.panelResizer.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    elements.panelResizer.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        onMouseDown({ clientX: e.touches[0].clientX, preventDefault: function() { e.preventDefault(); } });
      }
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
      if (isResizing && e.touches.length === 1) {
        onMouseMove({ clientX: e.touches[0].clientX });
      }
    }, { passive: true });

    document.addEventListener('touchend', onMouseUp);
  }

  // ── Enable buttons once library is loaded ────────────────────
  function enableButtons() {
    elements.validateBtn.disabled = false;
    elements.formatBtn.disabled = false;
    elements.toJsonBtn.disabled = false;
  }

  // ── Initialization ───────────────────────────────────────────
  function init() {
    cacheElements();
    enableButtons();

    elements.validateBtn.addEventListener('click', handleValidate);
    elements.formatBtn.addEventListener('click', handleFormat);
    elements.toJsonBtn.addEventListener('click', handleToJson);
    elements.copyBtn.addEventListener('click', handleCopy);
    elements.clearBtn.addEventListener('click', handleClear);

    elements.tomlInput.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleFormat();
      }
    });

    elements.tomlInput.addEventListener('keydown', handleTabKey);

    elements.tomlInput.addEventListener('input', function() {
      clearErrorHighlight();
      updateLineNumbers(null);
    });

    elements.tomlInput.addEventListener('paste', function() {
      setTimeout(function() {
        if (elements.tomlInput.value.trim()) {
          handleFormat();
        }
      }, 0);
    });

    elements.tomlInput.addEventListener('scroll', syncScroll);
    elements.tomlOutput.addEventListener('scroll', syncOutputScroll);

    updateLineNumbers(null);
    initResizer();

    trackEvent('tool_load', 'toml_validator_tool');
  }

  // Wait for smol-toml library before initializing
  function initWhenReady() {
    if (window.smolToml && window.smolToml.parse) {
      init();
    } else {
      window.addEventListener('toml-lib-ready', function() {
        init();
      }, { once: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }
})();
