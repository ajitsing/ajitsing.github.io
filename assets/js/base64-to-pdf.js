(function() {
  'use strict';

  var MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
  var SAMPLE_BASE64 = 'JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCAzMDAgMTQ0XSAvQ29udGVudHMgNCAwIFIgL1Jlc291cmNlcyA8PCAvRm9udCA8PCAvRjEgNSAwIFIgPj4gPj4gPj4KZW5kb2JqCjQgMCBvYmoKPDwgL0xlbmd0aCAzOSA+PgpzdHJlYW0KQlQgL0YxIDI0IFRmIDQwIDYwIFRkIChIZWxsbyBQREYpIFRqIEVUCmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago8PCAvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL0Jhc2VGb250IC9IZWx2ZXRpY2EgPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0MSAwMDAwMCBuIAowMDAwMDAwMzMwIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKNDAwCiUlRU9GCg==';

  var elements = {
    modeTabs: document.querySelectorAll('.mode-tab'),
    modeToPdf: document.querySelectorAll('.mode-to-pdf'),
    modeToBase64: document.querySelectorAll('.mode-to-base64'),
    input: document.getElementById('b64pdf-input'),
    output: document.getElementById('b64pdf-output'),
    outputFormat: document.getElementById('output-format-select'),
    actionBtn: document.getElementById('action-btn'),
    actionBtnText: document.getElementById('action-btn-text'),
    downloadBtn: document.getElementById('download-btn'),
    previewBtn: document.getElementById('preview-btn'),
    copyBtn: document.getElementById('copy-btn'),
    sampleBtn: document.getElementById('sample-btn'),
    clearBtn: document.getElementById('clear-btn'),
    dropZone: document.getElementById('drop-zone'),
    fileInput: document.getElementById('file-input'),
    fileName: document.getElementById('file-name'),
    resultSection: document.getElementById('result-section'),
    resultCard: document.getElementById('result-card'),
    resultIcon: document.getElementById('result-icon'),
    resultMessage: document.getElementById('result-message'),
    charCount: document.getElementById('char-count'),
    previewSection: document.getElementById('preview-section'),
    previewFrame: document.getElementById('pdf-preview')
  };

  var currentMode = 'to-pdf';
  var pdfBlob = null;
  var pdfObjectUrl = null;
  var uploadedFile = null;
  var lastBase64Output = '';

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'Base64 to PDF',
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

  function revokePreview() {
    if (pdfObjectUrl) {
      URL.revokeObjectURL(pdfObjectUrl);
      pdfObjectUrl = null;
    }
    if (elements.previewFrame) {
      elements.previewFrame.removeAttribute('src');
    }
    elements.previewSection.classList.add('hidden');
  }

  function setMode(mode) {
    currentMode = mode === 'to-base64' ? 'to-base64' : 'to-pdf';
    elements.modeTabs.forEach(function(tab) {
      tab.classList.toggle('active', tab.getAttribute('data-mode') === currentMode);
    });
    elements.modeToPdf.forEach(function(el) {
      el.classList.toggle('hidden', currentMode !== 'to-pdf');
    });
    elements.modeToBase64.forEach(function(el) {
      el.classList.toggle('hidden', currentMode !== 'to-base64');
    });
    elements.actionBtnText.textContent = currentMode === 'to-pdf' ? 'Convert' : 'Encode';
    hideResult();
    if (currentMode !== 'to-pdf') {
      revokePreview();
    }
    trackEvent('toggle_mode', currentMode);
  }

  function stripBase64Input(raw) {
    var text = (raw || '').replace(/\s+/g, '');
    var marker = ';base64,';
    var idx = text.toLowerCase().indexOf(marker);
    if (text.toLowerCase().indexOf('data:') === 0 && idx !== -1) {
      text = text.slice(idx + marker.length);
    }
    return text;
  }

  function base64ToBytes(b64) {
    var cleaned = stripBase64Input(b64);
    if (!cleaned) {
      throw new Error('Please paste a Base64 string');
    }
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned) || cleaned.length % 4 !== 0) {
      throw new Error('Invalid Base64 string');
    }
    try {
      var binary = atob(cleaned);
      var bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    } catch (e) {
      throw new Error('Invalid Base64 string');
    }
  }

  function bytesToBase64(bytes) {
    var binary = '';
    var chunk = 0x8000;
    for (var i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }

  function isPdfBytes(bytes) {
    if (!bytes || bytes.length < 4) {
      return false;
    }
    return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  }

  function formatBytes(n) {
    if (n < 1024) {
      return n + ' B';
    }
    if (n < 1024 * 1024) {
      return (n / 1024).toFixed(1) + ' KB';
    }
    return (n / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function setPdfFromBytes(bytes) {
    if (!isPdfBytes(bytes)) {
      throw new Error('Decoded data is not a valid PDF (missing %PDF header)');
    }
    revokePreview();
    pdfBlob = new Blob([bytes], { type: 'application/pdf' });
    pdfObjectUrl = URL.createObjectURL(pdfBlob);
    return pdfBlob;
  }

  function showPreview() {
    if (!pdfObjectUrl) {
      showResult(false, 'Convert a Base64 PDF first');
      return;
    }
    elements.previewFrame.src = pdfObjectUrl;
    elements.previewSection.classList.remove('hidden');
    trackEvent('preview', 'pdf_preview');
  }

  function downloadPdf() {
    if (!pdfBlob) {
      showResult(false, 'Convert a Base64 PDF first');
      return;
    }
    var url = pdfObjectUrl || URL.createObjectURL(pdfBlob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    trackEvent('download', 'pdf_file', pdfBlob.size);
  }

  function convertToPdf() {
    try {
      var bytes = base64ToBytes(elements.input.value);
      setPdfFromBytes(bytes);
      showResult(true, 'Valid PDF decoded (' + formatBytes(bytes.length) + ')');
      showPreview();
      trackEvent('convert', 'success', bytes.length);
    } catch (e) {
      pdfBlob = null;
      revokePreview();
      showResult(false, e.message || 'Failed to convert Base64 to PDF');
      trackEvent('convert', 'error');
    }
  }

  function formatOutput(rawBase64) {
    if (elements.outputFormat.value === 'dataurl') {
      return 'data:application/pdf;base64,' + rawBase64;
    }
    return rawBase64;
  }

  function setEncodeOutput(rawBase64) {
    lastBase64Output = rawBase64;
    var formatted = formatOutput(rawBase64);
    elements.output.value = formatted;
    elements.charCount.textContent = formatted.length + ' characters';
  }

  function encodePdfFile(file) {
    if (!file) {
      throw new Error('Please upload a PDF file');
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      throw new Error('PDF is too large. Limit is 15 MB');
    }
    var name = (file.name || '').toLowerCase();
    var type = (file.type || '').toLowerCase();
    if (type && type !== 'application/pdf' && !name.endsWith('.pdf')) {
      throw new Error('Please upload a PDF file');
    }

    var reader = new FileReader();
    reader.onload = function() {
      try {
        var buffer = reader.result;
        var bytes = new Uint8Array(buffer);
        if (!isPdfBytes(bytes)) {
          throw new Error('File does not look like a valid PDF');
        }
        var raw = bytesToBase64(bytes);
        setEncodeOutput(raw);
        showResult(true, 'PDF encoded to Base64 (' + formatBytes(file.size) + ')');
        trackEvent('encode', 'success', file.size);
      } catch (e) {
        elements.output.value = '';
        elements.charCount.textContent = '';
        lastBase64Output = '';
        showResult(false, e.message || 'Failed to encode PDF');
        trackEvent('encode', 'error');
      }
    };
    reader.onerror = function() {
      showResult(false, 'Could not read the PDF file');
      trackEvent('encode', 'error');
    };
    reader.readAsArrayBuffer(file);
  }

  function handleAction() {
    if (currentMode === 'to-pdf') {
      convertToPdf();
    } else {
      try {
        encodePdfFile(uploadedFile);
      } catch (e) {
        showResult(false, e.message || 'Failed to encode PDF');
      }
    }
  }

  function handleCopy() {
    var value = elements.output.value || '';
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
      trackEvent('copy', 'base64_output');
    });
  }

  function handleSample() {
    setMode('to-pdf');
    elements.input.value = SAMPLE_BASE64;
    convertToPdf();
    trackEvent('sample', 'sample_pdf');
  }

  function handleClear() {
    elements.input.value = '';
    elements.output.value = '';
    elements.charCount.textContent = '';
    elements.fileName.textContent = '';
    elements.fileInput.value = '';
    uploadedFile = null;
    lastBase64Output = '';
    pdfBlob = null;
    revokePreview();
    hideResult();
    trackEvent('clear', 'b64pdf_content');
    if (currentMode === 'to-pdf') {
      elements.input.focus();
    }
  }

  function acceptFile(file) {
    if (!file) {
      return;
    }
    uploadedFile = file;
    elements.fileName.textContent = file.name + ' (' + formatBytes(file.size) + ')';
    hideResult();
    try {
      encodePdfFile(file);
    } catch (e) {
      showResult(false, e.message || 'Failed to encode PDF');
    }
  }

  function initDropZone() {
    elements.dropZone.addEventListener('click', function() {
      elements.fileInput.click();
    });
    elements.dropZone.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        elements.fileInput.click();
      }
    });
    elements.fileInput.addEventListener('change', function() {
      if (elements.fileInput.files && elements.fileInput.files[0]) {
        acceptFile(elements.fileInput.files[0]);
      }
    });

    ['dragenter', 'dragover'].forEach(function(name) {
      elements.dropZone.addEventListener(name, function(e) {
        e.preventDefault();
        e.stopPropagation();
        elements.dropZone.classList.add('drag-over');
      });
    });
    ['dragleave', 'drop'].forEach(function(name) {
      elements.dropZone.addEventListener(name, function(e) {
        e.preventDefault();
        e.stopPropagation();
        elements.dropZone.classList.remove('drag-over');
      });
    });
    elements.dropZone.addEventListener('drop', function(e) {
      var files = e.dataTransfer && e.dataTransfer.files;
      if (files && files[0]) {
        acceptFile(files[0]);
      }
    });
  }

  function init() {
    elements.modeTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        setMode(tab.getAttribute('data-mode'));
      });
    });

    elements.actionBtn.addEventListener('click', handleAction);
    elements.downloadBtn.addEventListener('click', downloadPdf);
    elements.previewBtn.addEventListener('click', function() {
      if (!pdfBlob) {
        convertToPdf();
        return;
      }
      showPreview();
    });
    elements.copyBtn.addEventListener('click', handleCopy);
    elements.sampleBtn.addEventListener('click', handleSample);
    elements.clearBtn.addEventListener('click', handleClear);

    elements.outputFormat.addEventListener('change', function() {
      if (lastBase64Output) {
        setEncodeOutput(lastBase64Output);
      }
    });

    elements.input.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        convertToPdf();
      }
    });

    initDropZone();
    trackEvent('tool_load', 'base64_to_pdf_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
