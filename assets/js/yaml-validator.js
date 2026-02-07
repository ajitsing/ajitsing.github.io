(function() {
  'use strict';

  var elements = {
    yamlInput: document.getElementById('yaml-input'),
    yamlOutput: document.getElementById('yaml-output'),
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

  var currentErrorLine = null;
  var currentOutputMode = 'yaml';

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'YAML Validator',
        event_label: label,
        value: value
      });
    }
  }

  function updateLineNumbers(errorLine) {
    var text = elements.yamlInput.value;
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
    elements.lineNumbers.scrollTop = elements.yamlInput.scrollTop;
  }

  function syncOutputScroll() {
    elements.outputLineNumbers.scrollTop = elements.yamlOutput.scrollTop;
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

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // YAML syntax highlighting
  function highlightYaml(yamlStr) {
    var lines = yamlStr.split('\n');
    var highlighted = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      // Document separator
      if (/^---\s*$/.test(line) || /^\.\.\.\s*$/.test(line)) {
        highlighted.push('<span class="yaml-separator">' + escapeHtml(line) + '</span>');
        continue;
      }

      // Full-line comment
      if (/^\s*#/.test(line)) {
        highlighted.push('<span class="yaml-comment">' + escapeHtml(line) + '</span>');
        continue;
      }

      // Inline comment handling
      var commentIdx = -1;
      var inQuote = false;
      var quoteChar = '';
      for (var c = 0; c < line.length; c++) {
        var ch = line[c];
        if (inQuote) {
          if (ch === quoteChar && line[c - 1] !== '\\') inQuote = false;
        } else {
          if (ch === '"' || ch === "'") { inQuote = true; quoteChar = ch; }
          else if (ch === '#' && (c === 0 || line[c - 1] === ' ')) { commentIdx = c; break; }
        }
      }

      var mainPart = commentIdx >= 0 ? line.substring(0, commentIdx) : line;
      var commentPart = commentIdx >= 0 ? line.substring(commentIdx) : '';

      // List item prefix
      var listMatch = mainPart.match(/^(\s*-\s+)(.*)/);
      var prefix = '';
      var content = mainPart;
      if (listMatch) {
        prefix = escapeHtml(listMatch[1]);
        content = listMatch[2];
      }

      // Key: value pair
      var kvMatch = content.match(/^([^:]+?)(:(?:\s+|$))(.*)/);
      var result = '';

      if (kvMatch) {
        var key = kvMatch[1];
        var colon = kvMatch[2];
        var value = kvMatch[3];
        result = prefix + '<span class="yaml-key">' + escapeHtml(key) + '</span>' + escapeHtml(colon) + highlightValue(value);
      } else {
        result = prefix + highlightValue(content);
      }

      if (commentPart) {
        result += '<span class="yaml-comment">' + escapeHtml(commentPart) + '</span>';
      }

      highlighted.push(result);
    }

    return highlighted.join('\n');
  }

  function highlightValue(val) {
    val = val.trim();
    if (!val) return '';

    // Anchor
    if (/^&\w+/.test(val)) {
      return '<span class="yaml-anchor">' + escapeHtml(val) + '</span>';
    }

    // Alias
    if (/^\*\w+/.test(val)) {
      return '<span class="yaml-alias">' + escapeHtml(val) + '</span>';
    }

    // null
    if (/^(null|~)$/i.test(val)) {
      return '<span class="yaml-null">' + escapeHtml(val) + '</span>';
    }

    // boolean
    if (/^(true|false|yes|no|on|off)$/i.test(val)) {
      return '<span class="yaml-boolean">' + escapeHtml(val) + '</span>';
    }

    // number
    if (/^-?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(val) || /^0x[0-9a-fA-F]+$/.test(val) || /^0o[0-7]+$/.test(val)) {
      return '<span class="yaml-number">' + escapeHtml(val) + '</span>';
    }

    // Quoted string
    if ((val[0] === '"' && val[val.length - 1] === '"') || (val[0] === "'" && val[val.length - 1] === "'")) {
      return '<span class="yaml-string">' + escapeHtml(val) + '</span>';
    }

    // Multi-line block indicators
    if (/^[|>][-+]?\s*$/.test(val)) {
      return '<span class="yaml-string">' + escapeHtml(val) + '</span>';
    }

    // Plain string
    return '<span class="yaml-string">' + escapeHtml(val) + '</span>';
  }

  // JSON syntax highlighting (reused from JSON validator pattern)
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

    if (typeof data === 'string') {
      return '<span class="json-string">"' + escapeHtml(data) + '"</span>';
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

    return '';
  }

  function setOutputMode(mode) {
    currentOutputMode = mode;
    if (mode === 'json') {
      elements.outputFormatBadge.textContent = 'JSON';
      elements.outputFormatBadge.className = 'format-badge json';
    } else {
      elements.outputFormatBadge.textContent = 'YAML';
      elements.outputFormatBadge.className = 'format-badge';
    }
  }

  function updateOutput(text, mode, parsedData) {
    if (!text) {
      elements.yamlOutput.innerHTML = '<span class="output-placeholder">Formatted output will appear here</span>';
      elements.charCount.textContent = '';
      updateOutputLineNumbers(0);
      setOutputMode('yaml');
      return;
    }

    setOutputMode(mode || 'yaml');

    if (mode === 'json' && parsedData !== undefined) {
      var html = highlightJson(parsedData, 0);
      html = html.replace(/^[\n\r]+/, '');
      elements.yamlOutput.innerHTML = html;
    } else {
      elements.yamlOutput.innerHTML = highlightYaml(text);
    }

    elements.charCount.textContent = text.length + ' characters';

    var lineCount = text.split('\n').length;
    updateOutputLineNumbers(lineCount);
  }

  function validateYAML(yamlString) {
    if (!yamlString.trim()) {
      return { valid: false, error: 'Please enter some YAML to validate', position: null };
    }

    try {
      var parsed = jsyaml.load(yamlString, { schema: jsyaml.DEFAULT_SCHEMA });
      return { valid: true, parsed: parsed, error: null };
    } catch (e) {
      var position = null;
      if (e.mark) {
        position = {
          line: (e.mark.line || 0) + 1,
          column: (e.mark.column || 0) + 1
        };
      }
      var message = e.reason || e.message || 'Unknown YAML error';
      return { valid: false, error: message, position: position };
    }
  }

  function formatYAML(yamlString) {
    var result = validateYAML(yamlString);
    if (!result.valid) {
      return result;
    }

    try {
      var formatted = jsyaml.dump(result.parsed, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false,
        quotingType: "'",
        forceQuotes: false
      });
      return { valid: true, formatted: formatted.trimEnd(), parsed: result.parsed, error: null };
    } catch (e) {
      return { valid: false, error: e.message || 'Failed to format YAML', position: null };
    }
  }

  function yamlToJson(yamlString) {
    var result = validateYAML(yamlString);
    if (!result.valid) {
      return result;
    }

    try {
      var json = JSON.stringify(result.parsed, null, 2);
      return { valid: true, json: json, parsed: result.parsed, error: null };
    } catch (e) {
      return { valid: false, error: e.message || 'Failed to convert to JSON', position: null };
    }
  }

  function showResult(isValid, message, errorPosition) {
    var iconHtml = isValid
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-times-circle"></i>';
    var messageText = isValid ? 'Valid YAML' : 'Invalid YAML';
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
    elements.resultMessage.textContent = messageText;
  }

  function handleValidate() {
    var yamlString = elements.yamlInput.value;
    var result = validateYAML(yamlString);

    trackEvent('validate', result.valid ? 'valid' : 'invalid');

    if (result.valid) {
      var formatted = jsyaml.dump(result.parsed, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false
      }).trimEnd();
      updateOutput(formatted, 'yaml');
    } else {
      updateOutput(null);
    }

    showResult(result.valid, result.error, result.position);
  }

  function handleFormat() {
    var yamlString = elements.yamlInput.value;
    var result = formatYAML(yamlString);

    trackEvent('format', result.valid ? 'valid' : 'invalid');

    if (result.valid) {
      updateOutput(result.formatted, 'yaml');
      showResult(true, null, null);
    } else {
      updateOutput(null);
      showResult(false, result.error, result.position);
    }
  }

  function handleToJson() {
    var yamlString = elements.yamlInput.value;
    var result = yamlToJson(yamlString);

    trackEvent('to_json', result.valid ? 'valid' : 'invalid');

    if (result.valid) {
      updateOutput(result.json, 'json', result.parsed);
      showResult(true, null, null);
      elements.resultMessage.textContent = 'Valid YAML — Converted to JSON';
    } else {
      updateOutput(null);
      showResult(false, result.error, result.position);
    }
  }

  function handleCopy() {
    var outputText = elements.yamlOutput.textContent;
    if (!outputText || outputText === 'Formatted output will appear here') {
      var inputText = elements.yamlInput.value;
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
    trackEvent('clear', 'yaml_content');

    elements.yamlInput.value = '';
    elements.resultSection.classList.add('hidden');
    updateLineNumbers(null);
    updateOutput(null);
    elements.yamlInput.focus();
  }

  function handleTabKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      var start = elements.yamlInput.selectionStart;
      var end = elements.yamlInput.selectionEnd;
      var value = elements.yamlInput.value;

      elements.yamlInput.value = value.substring(0, start) + '  ' + value.substring(end);
      elements.yamlInput.selectionStart = elements.yamlInput.selectionEnd = start + 2;

      updateLineNumbers(null);
    }
  }

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

  function init() {
    elements.validateBtn.addEventListener('click', handleValidate);
    elements.formatBtn.addEventListener('click', handleFormat);
    elements.toJsonBtn.addEventListener('click', handleToJson);
    elements.copyBtn.addEventListener('click', handleCopy);
    elements.clearBtn.addEventListener('click', handleClear);

    elements.yamlInput.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleFormat();
      }
    });

    elements.yamlInput.addEventListener('keydown', handleTabKey);

    elements.yamlInput.addEventListener('input', function() {
      clearErrorHighlight();
      updateLineNumbers(null);
    });

    elements.yamlInput.addEventListener('paste', function() {
      setTimeout(function() {
        if (elements.yamlInput.value.trim()) {
          handleFormat();
        }
      }, 0);
    });

    elements.yamlInput.addEventListener('scroll', syncScroll);
    elements.yamlOutput.addEventListener('scroll', syncOutputScroll);

    updateLineNumbers(null);
    initResizer();

    trackEvent('tool_load', 'yaml_validator_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
