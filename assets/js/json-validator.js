(function() {
  'use strict';

  const elements = {
    jsonInput: document.getElementById('json-input'),
    jsonOutput: document.getElementById('json-output'),
    lineNumbers: document.getElementById('line-numbers'),
    outputLineNumbers: document.getElementById('output-line-numbers'),
    charCount: document.getElementById('char-count'),
    validateBtn: document.getElementById('validate-btn'),
    formatBtn: document.getElementById('format-btn'),
    copyBtn: document.getElementById('copy-btn'),
    clearBtn: document.getElementById('clear-btn'),
    expandAllBtn: document.getElementById('expand-all-btn'),
    collapseAllBtn: document.getElementById('collapse-all-btn'),
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

  let currentErrorLine = null;

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'JSON Validator',
        event_label: label,
        value: value
      });
    }
  }

  function updateLineNumbers(errorLine) {
    var text = elements.jsonInput.value;
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
    elements.lineNumbers.scrollTop = elements.jsonInput.scrollTop;
  }

  function syncOutputScroll() {
    elements.outputLineNumbers.scrollTop = elements.jsonOutput.scrollTop;
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

  function escapeHtmlContent(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderCollapsibleJson(data, indent) {
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
      return '<span class="json-string">"' + escapeHtmlContent(data) + '"</span>';
    }

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return '<span class="json-punctuation">[]</span>';
      }
      
      var itemCount = data.length;
      var preview = itemCount + ' item' + (itemCount === 1 ? '' : 's');
      
      html += '<span class="json-collapsible" onclick="toggleJsonNode(this)">';
      html += '<span class="json-toggle"></span>';
      html += '<span class="json-punctuation">[</span>';
      html += '<span class="json-preview">' + preview + '</span>';
      html += '</span>';
      html += '<span class="json-content">';
      
      for (var i = 0; i < data.length; i++) {
        html += '\n' + spaces + '  ' + renderCollapsibleJson(data[i], indent + 1);
        if (i < data.length - 1) {
          html += '<span class="json-punctuation">,</span>';
        }
      }
      
      html += '\n' + spaces + '<span class="json-punctuation">]</span>';
      html += '</span>';
      return html;
    }

    if (typeof data === 'object') {
      var keys = Object.keys(data);
      if (keys.length === 0) {
        return '<span class="json-punctuation">{}</span>';
      }
      
      var keyCount = keys.length;
      var preview = keyCount + ' key' + (keyCount === 1 ? '' : 's');
      
      html += '<span class="json-collapsible" onclick="toggleJsonNode(this)">';
      html += '<span class="json-toggle"></span>';
      html += '<span class="json-punctuation">{</span>';
      html += '<span class="json-preview">' + preview + '</span>';
      html += '</span>';
      html += '<span class="json-content">';
      
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        html += '\n' + spaces + '  ';
        html += '<span class="json-key">"' + escapeHtmlContent(key) + '"</span>';
        html += '<span class="json-punctuation">: </span>';
        html += renderCollapsibleJson(data[key], indent + 1);
        if (j < keys.length - 1) {
          html += '<span class="json-punctuation">,</span>';
        }
      }
      
      html += '\n' + spaces + '<span class="json-punctuation">}</span>';
      html += '</span>';
      return html;
    }

    return '';
  }

  function updateOutput(formattedJson, parsedData) {
    if (!formattedJson) {
      elements.jsonOutput.innerHTML = '<span class="output-placeholder">Formatted JSON will appear here</span>';
      elements.charCount.textContent = '';
      updateOutputLineNumbers(0);
      return;
    }
    
    if (parsedData !== undefined) {
      var html = renderCollapsibleJson(parsedData, 0);
      html = html.replace(/^[\n\r]+/, '');
      elements.jsonOutput.innerHTML = html;
    } else {
      elements.jsonOutput.textContent = formattedJson;
    }
    elements.charCount.textContent = formattedJson.length + ' characters';
    
    var outputText = elements.jsonOutput.textContent || '';
    var lineCount = outputText.split('\n').length;
    updateOutputLineNumbers(lineCount);
  }

  window.toggleJsonNode = function(el) {
    el.classList.toggle('collapsed');
  };

  function expandAll() {
    var nodes = elements.jsonOutput.querySelectorAll('.json-collapsible.collapsed');
    nodes.forEach(function(node) {
      node.classList.remove('collapsed');
    });
  }

  function collapseAll() {
    var nodes = elements.jsonOutput.querySelectorAll('.json-collapsible');
    nodes.forEach(function(node) {
      node.classList.add('collapsed');
    });
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

  function parseErrorPosition(errorMessage, jsonString) {
    const positionMatch = errorMessage.match(/position\s+(\d+)/i);
    if (!positionMatch) {
      return null;
    }

    const position = parseInt(positionMatch[1], 10);
    const beforeError = jsonString.substring(0, position);
    const lines = beforeError.split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;

    return { line, column, position };
  }

  function validateJSON(jsonString) {
    if (!jsonString.trim()) {
      return { valid: false, error: 'Please enter some JSON to validate', position: null };
    }

    try {
      const parsed = JSON.parse(jsonString);
      return { valid: true, parsed, error: null };
    } catch (e) {
      const position = parseErrorPosition(e.message, jsonString);
      return { valid: false, error: e.message, position };
    }
  }

  function formatJSON(jsonString) {
    const result = validateJSON(jsonString);
    if (!result.valid) {
      return result;
    }
    const formatted = JSON.stringify(result.parsed, null, 2);
    return { valid: true, formatted, error: null };
  }

  function showResult(isValid, message, errorPosition) {
    var iconHtml = isValid 
      ? '<i class="fas fa-check-circle"></i>' 
      : '<i class="fas fa-times-circle"></i>';
    var messageText = isValid ? 'Valid JSON' : 'Invalid JSON';
    var cardClass = 'result-card ' + (isValid ? 'success' : 'error');

    if (!isValid && errorPosition) {
      updateLineNumbers(errorPosition.line);
      elements.errorDetails.classList.remove('hidden');
      elements.errorDetails.innerHTML = `
        <div class="error-location">
          <span class="error-label">Line ${errorPosition.line}, Column ${errorPosition.column}</span>
        </div>
        <div class="error-text">${escapeHtml(message)}</div>
      `;
    } else if (!isValid) {
      updateLineNumbers(null);
      elements.errorDetails.classList.remove('hidden');
      elements.errorDetails.innerHTML = `<div class="error-text">${escapeHtml(message)}</div>`;
    } else {
      updateLineNumbers(null);
      elements.errorDetails.classList.add('hidden');
    }

    elements.resultSection.classList.remove('hidden');
    elements.resultCard.className = cardClass;
    elements.resultIcon.innerHTML = iconHtml;
    elements.resultMessage.textContent = messageText;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function handleValidate() {
    const jsonString = elements.jsonInput.value;
    const result = validateJSON(jsonString);
    
    trackEvent('validate', result.valid ? 'valid' : 'invalid');
    
    if (result.valid) {
      const formatted = JSON.stringify(result.parsed, null, 2);
      updateOutput(formatted, result.parsed);
    } else {
      updateOutput(null);
    }
    
    showResult(result.valid, result.error, result.position);
  }

  function handleFormat() {
    const jsonString = elements.jsonInput.value;
    const result = formatJSON(jsonString);
    
    trackEvent('format', result.valid ? 'valid' : 'invalid');
    
    if (result.valid) {
      const parsed = JSON.parse(jsonString);
      updateOutput(result.formatted, parsed);
      showResult(true, null, null);
    } else {
      updateOutput(null);
      showResult(false, result.error, result.position);
    }
  }

  function handleCopy() {
    var outputText = elements.jsonOutput.textContent;
    if (!outputText || outputText === 'Formatted JSON will appear here') {
      var inputText = elements.jsonInput.value;
      if (!inputText.trim()) return;
      outputText = inputText;
    }
    
    trackEvent('copy', 'json_content');
    
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
    trackEvent('clear', 'json_content');
    
    elements.jsonInput.value = '';
    elements.resultSection.classList.add('hidden');
    updateLineNumbers(null);
    updateOutput(null);
    elements.jsonInput.focus();
  }

  function init() {
    elements.validateBtn.addEventListener('click', handleValidate);
    elements.formatBtn.addEventListener('click', handleFormat);
    elements.copyBtn.addEventListener('click', handleCopy);
    elements.clearBtn.addEventListener('click', handleClear);
    
    elements.expandAllBtn.addEventListener('click', expandAll);
    elements.collapseAllBtn.addEventListener('click', collapseAll);
    
    elements.jsonInput.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleFormat();
      }
    });
    
    elements.jsonInput.addEventListener('input', function() {
      clearErrorHighlight();
      updateLineNumbers(null);
    });
    
    elements.jsonInput.addEventListener('paste', function() {
      setTimeout(function() {
        if (elements.jsonInput.value.trim()) {
          handleFormat();
        }
      }, 0);
    });
    
    elements.jsonInput.addEventListener('scroll', syncScroll);
    elements.jsonOutput.addEventListener('scroll', syncOutputScroll);
    
    updateLineNumbers(null);
    initResizer();
    
    trackEvent('tool_load', 'json_validator_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
