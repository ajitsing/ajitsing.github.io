(function() {
  'use strict';

  var SAMPLE_CSV = 'name,email,role,active\n' +
    'Ada Lovelace,ada@example.com,Engineer,true\n' +
    'Alan Turing,alan@example.com,Researcher,true\n' +
    'Grace Hopper,"grace@example.com","Rear Admiral, USN",true\n' +
    'Katherine Johnson,katherine@example.com,Mathematician,false';

  var elements = {
    csvInput: document.getElementById('csv-input'),
    jsonOutput: document.getElementById('json-output'),
    lineNumbers: document.getElementById('line-numbers'),
    outputLineNumbers: document.getElementById('output-line-numbers'),
    charCount: document.getElementById('char-count'),
    statusCount: document.getElementById('status-count'),
    convertBtn: document.getElementById('convert-btn'),
    copyBtn: document.getElementById('copy-btn'),
    downloadBtn: document.getElementById('download-btn'),
    sampleBtn: document.getElementById('sample-btn'),
    clearBtn: document.getElementById('clear-btn'),
    uploadBtn: document.getElementById('upload-btn'),
    fileInput: document.getElementById('file-input'),
    delimiterSelect: document.getElementById('delimiter-select'),
    headersToggle: document.getElementById('headers-toggle'),
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

  var currentJsonText = '';
  var convertTimer = null;
  var lastConvertSource = 'auto';

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'CSV to JSON',
        event_label: label,
        value: value
      });
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function stripBom(text) {
    if (text && text.charCodeAt(0) === 0xfeff) {
      return text.slice(1);
    }
    return text;
  }

  function updateLineNumbers(errorLine) {
    var text = elements.csvInput.value;
    var lines = text.split('\n');
    var lineCount = Math.max(lines.length, 1);
    var html = '';

    for (var i = 1; i <= lineCount; i++) {
      var errorClass = (i === errorLine) ? ' error-line' : '';
      html += '<span class="line-number' + errorClass + '">' + i + '</span>';
    }

    elements.lineNumbers.innerHTML = html;
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

  function syncScroll() {
    elements.lineNumbers.scrollTop = elements.csvInput.scrollTop;
  }

  function syncOutputScroll() {
    elements.outputLineNumbers.scrollTop = elements.jsonOutput.scrollTop;
  }

  function detectDelimiter(text) {
    var lines = text.split(/\r\n|\n|\r/);
    var sample = '';
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].trim()) {
        sample = lines[i];
        break;
      }
    }
    if (!sample) {
      return ',';
    }

    var candidates = [',', '\t', ';', '|'];
    var best = ',';
    var bestCount = -1;

    for (var c = 0; c < candidates.length; c++) {
      var delim = candidates[c];
      var count = 0;
      var inQuotes = false;
      for (var j = 0; j < sample.length; j++) {
        var ch = sample[j];
        if (ch === '"') {
          if (inQuotes && sample[j + 1] === '"') {
            j++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === delim && !inQuotes) {
          count++;
        }
      }
      if (count > bestCount) {
        bestCount = count;
        best = delim;
      }
    }

    return bestCount > 0 ? best : ',';
  }

  function parseCsv(text, delimiter) {
    text = stripBom(text || '');
    if (!text.trim()) {
      return { ok: false, error: 'Please enter some CSV to convert', position: null, rows: null };
    }

    var rows = [];
    var field = '';
    var row = [];
    var inQuotes = false;
    var line = 1;
    var column = 1;
    var fieldStartLine = 1;
    var fieldStartColumn = 1;
    var i = 0;

    function pushField() {
      row.push(field);
      field = '';
    }

    function pushRow() {
      var allEmpty = true;
      for (var r = 0; r < row.length; r++) {
        if (row[r] !== '') {
          allEmpty = false;
          break;
        }
      }
      if (!(allEmpty && row.length <= 1 && rows.length > 0)) {
        rows.push(row);
      }
      row = [];
    }

    while (i < text.length) {
      var ch = text[i];

      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i += 2;
            column += 2;
            continue;
          }
          inQuotes = false;
          i++;
          column++;
          continue;
        }

        if (ch === '\r') {
          field += '\n';
          if (text[i + 1] === '\n') {
            i += 2;
          } else {
            i++;
          }
          line++;
          column = 1;
          continue;
        }

        if (ch === '\n') {
          field += '\n';
          i++;
          line++;
          column = 1;
          continue;
        }

        field += ch;
        i++;
        column++;
        continue;
      }

      if (ch === '"') {
        if (field.length === 0) {
          inQuotes = true;
          fieldStartLine = line;
          fieldStartColumn = column;
          i++;
          column++;
          continue;
        }
        field += ch;
        i++;
        column++;
        continue;
      }

      if (ch === delimiter) {
        pushField();
        i++;
        column++;
        fieldStartLine = line;
        fieldStartColumn = column;
        continue;
      }

      if (ch === '\r' || ch === '\n') {
        pushField();
        pushRow();
        if (ch === '\r' && text[i + 1] === '\n') {
          i += 2;
        } else {
          i++;
        }
        line++;
        column = 1;
        fieldStartLine = line;
        fieldStartColumn = column;
        continue;
      }

      field += ch;
      i++;
      column++;
    }

    if (inQuotes) {
      return {
        ok: false,
        error: 'Unclosed quoted field',
        position: { line: fieldStartLine, column: fieldStartColumn },
        rows: null
      };
    }

    if (field.length > 0 || row.length > 0) {
      pushField();
      pushRow();
    }

    while (rows.length > 0) {
      var last = rows[rows.length - 1];
      var empty = true;
      for (var e = 0; e < last.length; e++) {
        if (last[e] !== '') {
          empty = false;
          break;
        }
      }
      if (empty) {
        rows.pop();
      } else {
        break;
      }
    }

    if (rows.length === 0) {
      return { ok: false, error: 'Please enter some CSV to convert', position: null, rows: null };
    }

    return { ok: true, error: null, position: null, rows: rows };
  }

  function uniqueHeaders(headers) {
    var seen = {};
    var result = [];
    for (var i = 0; i < headers.length; i++) {
      var base = headers[i] === '' ? 'column_' + (i + 1) : headers[i];
      var name = base;
      var n = 2;
      while (Object.prototype.hasOwnProperty.call(seen, name)) {
        name = base + '_' + n;
        n++;
      }
      seen[name] = true;
      result.push(name);
    }
    return result;
  }

  function rowsToJson(rows, useHeaders) {
    if (!useHeaders) {
      return rows.slice();
    }

    var headers = uniqueHeaders(rows[0]);
    var data = [];

    for (var i = 1; i < rows.length; i++) {
      var obj = {};
      var source = rows[i];
      for (var h = 0; h < headers.length; h++) {
        obj[headers[h]] = h < source.length ? source[h] : '';
      }
      data.push(obj);
    }

    return data;
  }

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

  function clearOutput() {
    currentJsonText = '';
    elements.jsonOutput.innerHTML = '<span class="output-placeholder">JSON output will appear here</span>';
    elements.charCount.textContent = '';
    elements.statusCount.textContent = '';
    updateOutputLineNumbers(0);
  }

  function setOutput(parsed, jsonText) {
    currentJsonText = jsonText;
    var html = highlightJson(parsed, 0).replace(/^[\n\r]+/, '');
    elements.jsonOutput.innerHTML = html;
    elements.charCount.textContent = jsonText.length + ' characters';
    updateOutputLineNumbers(jsonText.split('\n').length);
  }

  function showResult(isSuccess, message, errorPosition, detail) {
    var iconHtml = isSuccess
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-times-circle"></i>';
    var cardClass = 'result-card ' + (isSuccess ? 'success' : 'error');

    if (!isSuccess && errorPosition) {
      updateLineNumbers(errorPosition.line);
      elements.errorDetails.classList.remove('hidden');
      elements.errorDetails.innerHTML =
        '<div class="error-location">' +
          '<span class="error-label">Line ' + errorPosition.line + ', Column ' + errorPosition.column + '</span>' +
        '</div>' +
        '<div class="error-text">' + escapeHtml(detail || message) + '</div>';
    } else if (!isSuccess) {
      updateLineNumbers(null);
      elements.errorDetails.classList.remove('hidden');
      elements.errorDetails.innerHTML = '<div class="error-text">' + escapeHtml(detail || message) + '</div>';
    } else {
      updateLineNumbers(null);
      elements.errorDetails.classList.add('hidden');
      elements.errorDetails.innerHTML = '';
    }

    elements.resultSection.classList.remove('hidden');
    elements.resultCard.className = cardClass;
    elements.resultIcon.innerHTML = iconHtml;
    elements.resultMessage.textContent = message;
  }

  function getDelimiter() {
    var selected = elements.delimiterSelect.value;
    if (selected === 'auto') {
      return detectDelimiter(elements.csvInput.value);
    }
    if (selected === 'tab') {
      return '\t';
    }
    return selected;
  }

  function convert(source) {
    source = source || 'button';
    lastConvertSource = source;

    var csvText = elements.csvInput.value;
    if (!csvText.trim()) {
      clearOutput();
      elements.resultSection.classList.add('hidden');
      updateLineNumbers(null);
      return;
    }

    var delimiter = getDelimiter();
    var parsedCsv = parseCsv(csvText, delimiter);

    if (!parsedCsv.ok) {
      clearOutput();
      showResult(false, 'Invalid CSV', parsedCsv.position, parsedCsv.error);
      if (source !== 'auto') {
        trackEvent('convert', 'invalid');
      }
      return;
    }

    var useHeaders = elements.headersToggle.checked;
    if (useHeaders && parsedCsv.rows.length < 2) {
      clearOutput();
      showResult(false, 'Invalid CSV', null, 'Header mode needs a header row and at least one data row');
      if (source !== 'auto') {
        trackEvent('convert', 'invalid');
      }
      return;
    }

    var data = rowsToJson(parsedCsv.rows, useHeaders);
    var jsonText = JSON.stringify(data, null, 2);
    setOutput(data, jsonText);

    var rowCount = useHeaders ? data.length : parsedCsv.rows.length;
    var label = rowCount === 1 ? '1 row converted' : rowCount + ' rows converted';
    elements.statusCount.textContent = label;
    showResult(true, 'Converted to JSON - ' + label, null, null);

    if (source !== 'auto') {
      trackEvent('convert', 'success', rowCount);
    }
  }

  function scheduleConvert() {
    if (convertTimer) {
      clearTimeout(convertTimer);
    }
    convertTimer = setTimeout(function() {
      convert('auto');
    }, 300);
  }

  function handleCopy() {
    if (!currentJsonText) {
      return;
    }

    trackEvent('copy', 'json_content');

    navigator.clipboard.writeText(currentJsonText).then(function() {
      elements.copyBtn.classList.add('copied');
      elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(function() {
        elements.copyBtn.classList.remove('copied');
        elements.copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    });
  }

  function handleDownload() {
    if (!currentJsonText) {
      return;
    }

    trackEvent('download', 'json_file');

    var blob = new Blob([currentJsonText], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'converted.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleSample() {
    trackEvent('sample', 'load_sample');
    elements.csvInput.value = SAMPLE_CSV;
    elements.delimiterSelect.value = 'auto';
    elements.headersToggle.checked = true;
    updateLineNumbers(null);
    convert('sample');
    elements.csvInput.focus();
  }

  function handleClear() {
    trackEvent('clear', 'csv_content');
    elements.csvInput.value = '';
    elements.resultSection.classList.add('hidden');
    updateLineNumbers(null);
    clearOutput();
    elements.csvInput.focus();
  }

  function readFile(file) {
    if (!file) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
      elements.csvInput.value = stripBom(String(e.target.result || ''));
      updateLineNumbers(null);
      convert('upload');
      trackEvent('upload', file.name || 'csv_file');
    };
    reader.readAsText(file);
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
      if (!isResizing) {
        return;
      }

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
      if (!isResizing) {
        return;
      }
      isResizing = false;
      document.body.classList.remove('resizing');
      elements.panelResizer.classList.remove('dragging');
    }

    elements.panelResizer.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    elements.panelResizer.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        onMouseDown({
          clientX: e.touches[0].clientX,
          preventDefault: function() { e.preventDefault(); }
        });
      }
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
      if (isResizing && e.touches.length === 1) {
        onMouseMove({ clientX: e.touches[0].clientX });
      }
    }, { passive: true });

    document.addEventListener('touchend', onMouseUp);
  }

  function initDragDrop() {
    var panel = elements.inputPanel;

    ['dragenter', 'dragover'].forEach(function(eventName) {
      panel.addEventListener(eventName, function(e) {
        e.preventDefault();
        e.stopPropagation();
        panel.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(function(eventName) {
      panel.addEventListener(eventName, function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (eventName === 'dragleave' && panel.contains(e.relatedTarget)) {
          return;
        }
        panel.classList.remove('drag-over');
      });
    });

    panel.addEventListener('drop', function(e) {
      var files = e.dataTransfer && e.dataTransfer.files;
      if (files && files.length) {
        readFile(files[0]);
      }
    });
  }

  function init() {
    elements.convertBtn.addEventListener('click', function() {
      convert('button');
    });
    elements.copyBtn.addEventListener('click', handleCopy);
    elements.downloadBtn.addEventListener('click', handleDownload);
    elements.sampleBtn.addEventListener('click', handleSample);
    elements.clearBtn.addEventListener('click', handleClear);

    elements.uploadBtn.addEventListener('click', function() {
      elements.fileInput.click();
    });
    elements.fileInput.addEventListener('change', function() {
      if (elements.fileInput.files && elements.fileInput.files[0]) {
        readFile(elements.fileInput.files[0]);
        elements.fileInput.value = '';
      }
    });

    elements.delimiterSelect.addEventListener('change', function() {
      convert('options');
    });
    elements.headersToggle.addEventListener('change', function() {
      convert('options');
    });

    elements.csvInput.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        convert('keyboard');
      }
    });

    elements.csvInput.addEventListener('input', function() {
      updateLineNumbers(null);
      scheduleConvert();
    });

    elements.csvInput.addEventListener('scroll', syncScroll);
    elements.jsonOutput.addEventListener('scroll', syncOutputScroll);

    updateLineNumbers(null);
    initResizer();
    initDragDrop();
    trackEvent('tool_load', 'csv_to_json_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
