(function() {
  'use strict';

  var SAMPLE =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">\n' +
    '  <rect width="120" height="120" rx="16" fill="#292524"/>\n' +
    '  <circle cx="60" cy="52" r="22" fill="#fef3c7"/>\n' +
    '  <path d="M38 92h44c0-12-10-20-22-20s-22 8-22 20z" fill="#e7e0d5"/>\n' +
    '</svg>';

  var elements = {
    input: document.getElementById('svg-input'),
    preview: document.getElementById('svg-preview'),
    previewFrame: document.getElementById('preview-frame'),
    meta: document.getElementById('svg-meta'),
    error: document.getElementById('svg-error'),
    sampleBtn: document.getElementById('sample-btn'),
    copyBtn: document.getElementById('copy-btn'),
    dataUriBtn: document.getElementById('data-uri-btn'),
    downloadBtn: document.getElementById('download-btn'),
    clearBtn: document.getElementById('clear-btn'),
    fileInput: document.getElementById('file-input'),
    bgBtns: document.querySelectorAll('[data-bg]')
  };

  var renderTimer = null;
  var currentBg = 'checks';

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'SVG Viewer',
        event_label: label
      });
    }
  }

  function parseSvg(text) {
    var trimmed = (text || '').trim();
    if (!trimmed) {
      return { error: 'Paste SVG markup or drop an .svg file.' };
    }
    var doc = new DOMParser().parseFromString(trimmed, 'image/svg+xml');
    var root = doc.documentElement;
    if (!root || root.localName.toLowerCase() === 'parsererror' || doc.querySelector('parsererror')) {
      return { error: 'That markup is not valid SVG.' };
    }
    if (root.localName.toLowerCase() !== 'svg') {
      return { error: 'The root element must be <svg>.' };
    }
    return { doc: doc, root: root, source: trimmed };
  }

  function attr(el, name) {
    return el.getAttribute(name) || '';
  }

  function render() {
    var parsed = parseSvg(elements.input.value);
    if (parsed.error) {
      elements.error.textContent = parsed.error;
      elements.error.style.display = 'block';
      elements.meta.innerHTML = '';
      elements.preview.removeAttribute('srcdoc');
      return;
    }

    elements.error.style.display = 'none';
    var w = attr(parsed.root, 'width') || 'auto';
    var h = attr(parsed.root, 'height') || 'auto';
    var vb = attr(parsed.root, 'viewBox') || 'none';
    var count = parsed.root.querySelectorAll('*').length;
    elements.meta.innerHTML =
      '<span><span class="meta-label">Width:</span> ' + w + '</span>' +
      '<span><span class="meta-label">Height:</span> ' + h + '</span>' +
      '<span><span class="meta-label">viewBox:</span> ' + vb + '</span>' +
      '<span><span class="meta-label">Elements:</span> ' + count + '</span>';

    var html = '<!DOCTYPE html><html><head><style>' +
      'html,body{margin:0;height:100%;display:flex;align-items:center;justify-content:center;background:transparent;}' +
      'svg{display:block;width:min(92vw,92%);height:auto;max-height:92%;}' +
      '</style></head><body>' + parsed.source + '</body></html>';
    elements.preview.setAttribute('srcdoc', html);
  }

  function scheduleRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(render, 180);
  }

  function copyText(text, btn, label) {
    navigator.clipboard.writeText(text).then(function() {
      var original = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(function() {
        btn.classList.remove('copied');
        btn.innerHTML = original;
      }, 1800);
      trackEvent('copy', label);
    });
  }

  function setBg(name) {
    currentBg = name;
    elements.previewFrame.classList.remove('is-checks', 'is-dark');
    if (name === 'checks') elements.previewFrame.classList.add('is-checks');
    if (name === 'dark') elements.previewFrame.classList.add('is-dark');
    for (var i = 0; i < elements.bgBtns.length; i++) {
      elements.bgBtns[i].classList.toggle('active', elements.bgBtns[i].getAttribute('data-bg') === name);
    }
  }

  function readFile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function() {
      elements.input.value = String(reader.result || '');
      render();
      trackEvent('file', file.name || 'drop');
    };
    reader.readAsText(file);
  }

  function init() {
    elements.input.addEventListener('input', scheduleRender);
    elements.sampleBtn.addEventListener('click', function() {
      elements.input.value = SAMPLE;
      render();
      trackEvent('sample', 'load');
    });
    elements.clearBtn.addEventListener('click', function() {
      elements.input.value = '';
      render();
      trackEvent('clear', 'editor');
    });
    elements.copyBtn.addEventListener('click', function() {
      var parsed = parseSvg(elements.input.value);
      if (parsed.error) return;
      copyText(parsed.source, elements.copyBtn, 'svg');
    });
    elements.dataUriBtn.addEventListener('click', function() {
      var parsed = parseSvg(elements.input.value);
      if (parsed.error) return;
      copyText('data:image/svg+xml;utf8,' + encodeURIComponent(parsed.source), elements.dataUriBtn, 'data-uri');
    });
    elements.downloadBtn.addEventListener('click', function() {
      var parsed = parseSvg(elements.input.value);
      if (parsed.error) return;
      var blob = new Blob([parsed.source], { type: 'image/svg+xml' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'image.svg';
      a.click();
      URL.revokeObjectURL(url);
      trackEvent('download', 'svg');
    });
    elements.fileInput.addEventListener('change', function() {
      readFile(elements.fileInput.files && elements.fileInput.files[0]);
      elements.fileInput.value = '';
    });
    for (var i = 0; i < elements.bgBtns.length; i++) {
      elements.bgBtns[i].addEventListener('click', function() {
        setBg(this.getAttribute('data-bg'));
        trackEvent('background', this.getAttribute('data-bg'));
      });
    }

    var dropTarget = elements.input.parentNode;
    dropTarget.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    dropTarget.addEventListener('drop', function(e) {
      e.preventDefault();
      var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      readFile(file);
    });

    setBg('checks');
    elements.input.value = SAMPLE;
    render();
    trackEvent('tool_load', 'svg_viewer_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
