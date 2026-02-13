(function() {
  'use strict';

  // QR Code Generator
  // Uses QRious@4.0.2 loaded via CDN in the HTML

  var elements = {};
  var currentContentType = 'url';

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'QR Code Generator',
        event_label: label
      });
    }
  }

  function generateQR(text, size, errorCorrection, fgColor, bgColor) {
    if (typeof QRious === 'undefined') {
      // Library not yet loaded — retry briefly
      var attempts = 0;
      var retryInterval = setInterval(function() {
        attempts++;
        if (typeof QRious !== 'undefined') {
          clearInterval(retryInterval);
          generateQR(text, size, errorCorrection, fgColor, bgColor);
        } else if (attempts > 20) {
          clearInterval(retryInterval);
          showError('QR Code library is loading. Please try again in a moment.');
        }
      }, 100);
      return;
    }

    var canvas = elements.qrCanvas;

    try {
      new QRious({
        element: canvas,
        value: text,
        size: size,
        foreground: fgColor,
        background: bgColor,
        level: errorCorrection,
        padding: null
      });

      showQRCode();
      updateDownloadButtons();
      updateQRInfo(text, size);
    } catch (error) {
      console.error('QR Code generation error:', error);
      showError('Failed to generate QR code: ' + error.message);
    }
  }

  function getContentFromInputs() {
    var subjectEl, bodyEl, ssidEl, passwordEl, securityEl;

    switch (currentContentType) {
      case 'url':
        return elements.urlInput ? elements.urlInput.value.trim() : '';
      case 'text':
        return elements.textInput ? elements.textInput.value.trim() : '';
      case 'email':
        var email = elements.emailInput ? elements.emailInput.value.trim() : '';
        subjectEl = document.getElementById('qr-email-subject');
        bodyEl = document.getElementById('qr-email-body');
        var subject = subjectEl ? subjectEl.value.trim() : '';
        var body = bodyEl ? bodyEl.value.trim() : '';
        if (!email) return '';
        var mailto = 'mailto:' + email;
        if (subject || body) {
          var params = [];
          if (subject) params.push('subject=' + encodeURIComponent(subject));
          if (body) params.push('body=' + encodeURIComponent(body));
          mailto += '?' + params.join('&');
        }
        return mailto;
      case 'phone':
        var phone = elements.phoneInput ? elements.phoneInput.value.trim() : '';
        return phone ? 'tel:' + phone : '';
      case 'wifi':
        ssidEl = document.getElementById('qr-wifi-ssid');
        passwordEl = document.getElementById('qr-wifi-password');
        securityEl = document.getElementById('qr-wifi-security');
        var ssid = ssidEl ? ssidEl.value.trim() : '';
        var wifiPass = passwordEl ? passwordEl.value.trim() : '';
        var security = securityEl ? securityEl.value : 'WPA';
        if (!ssid) return '';
        return 'WIFI:T:' + security + ';S:' + ssid + ';P:' + wifiPass + ';;';
      default:
        return '';
    }
  }

  function getErrorCorrectionLevel() {
    return elements.errorSelect ? elements.errorSelect.value : 'M';
  }

  function getSize() {
    return elements.sizeSelect ? parseInt(elements.sizeSelect.value, 10) : 400;
  }

  function getColors() {
    return {
      fg: elements.fgColorInput ? elements.fgColorInput.value : '#000000',
      bg: elements.bgColorInput ? elements.bgColorInput.value : '#ffffff'
    };
  }

  function showError(message) {
    if (elements.qrPlaceholder) {
      elements.qrPlaceholder.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>' + message + '</span>';
      elements.qrPlaceholder.style.display = 'flex';
    }
    if (elements.qrCanvas) {
      elements.qrCanvas.style.display = 'none';
    }
  }

  function showQRCode() {
    if (elements.qrPlaceholder) {
      elements.qrPlaceholder.style.display = 'none';
    }
    if (elements.qrCanvas) {
      elements.qrCanvas.style.display = 'block';
    }
  }

  function updateDownloadButtons() {
    var hasQR = elements.qrCanvas && elements.qrCanvas.style.display !== 'none' && elements.qrCanvas.width > 0;
    if (elements.downloadPng) elements.downloadPng.disabled = !hasQR;
    if (elements.downloadSvg) elements.downloadSvg.disabled = !hasQR;
    if (elements.copyBtn) elements.copyBtn.disabled = !hasQR;
  }

  function updateQRInfo(text, size) {
    if (elements.qrInfo) {
      var errorLevel = getErrorCorrectionLevel();
      elements.qrInfo.innerHTML =
        '<div class="info-item"><span class="info-label">Size:</span> ' + size + '×' + size + 'px</div>' +
        '<div class="info-item"><span class="info-label">Error:</span> ' + errorLevel + '</div>' +
        '<div class="info-item"><span class="info-label">Chars:</span> ' + text.length + '</div>';
    }
  }

  function handleGenerate() {
    var content = getContentFromInputs();

    if (!content) {
      showError('Please enter content to generate a QR code');
      trackEvent('generate_error', 'empty_content');
      return;
    }

    var size = getSize();
    var errorLevel = getErrorCorrectionLevel();
    var colors = getColors();

    generateQR(content, size, errorLevel, colors.fg, colors.bg);
    trackEvent('generate', currentContentType);
  }

  function downloadPNG() {
    var canvas = elements.qrCanvas;
    if (!canvas || canvas.width === 0) return;

    canvas.toBlob(function(blob) {
      saveBlobAs(blob, 'qrcode.png');
      trackEvent('download', 'png');
    }, 'image/png');
  }

  function downloadSVG() {
    var canvas = elements.qrCanvas;
    if (!canvas || canvas.width === 0) return;

    // Generate vector SVG by reading canvas pixel data
    var size = canvas.width;
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, size, size);
    var pixels = imageData.data;

    // Detect module (cell) size by scanning top-left finder pattern
    var moduleSize = 1;
    var firstDarkPixel = -1;
    for (var i = 0; i < size; i++) {
      var idx = (i * size + i) * 4;
      var brightness = pixels[idx] + pixels[idx + 1] + pixels[idx + 2];
      if (brightness < 384 && firstDarkPixel === -1) {
        firstDarkPixel = i;
      }
    }

    // Scan from first dark pixel to find module size
    if (firstDarkPixel >= 0) {
      var startX = firstDarkPixel;
      for (var x = startX + 1; x < size; x++) {
        var pIdx = (firstDarkPixel * size + x) * 4;
        var b = pixels[pIdx] + pixels[pIdx + 1] + pixels[pIdx + 2];
        if (b >= 384) {
          moduleSize = x - startX;
          break;
        }
      }
    }

    if (moduleSize < 1) moduleSize = 1;
    var modules = Math.round(size / moduleSize);
    var colors = getColors();

    // Build SVG
    var svgParts = [];
    svgParts.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + modules + ' ' + modules + '" width="' + size + '" height="' + size + '">');
    svgParts.push('<rect width="' + modules + '" height="' + modules + '" fill="' + colors.bg + '"/>');

    for (var row = 0; row < modules; row++) {
      for (var col = 0; col < modules; col++) {
        var px = Math.round(col * moduleSize + moduleSize / 2);
        var py = Math.round(row * moduleSize + moduleSize / 2);
        if (px < size && py < size) {
          var pxIdx = (py * size + px) * 4;
          var lum = pixels[pxIdx] + pixels[pxIdx + 1] + pixels[pxIdx + 2];
          if (lum < 384) {
            svgParts.push('<rect x="' + col + '" y="' + row + '" width="1" height="1" fill="' + colors.fg + '"/>');
          }
        }
      }
    }

    svgParts.push('</svg>');
    var svgString = svgParts.join('');

    saveBlobAs(new Blob([svgString], { type: 'image/svg+xml' }), 'qrcode.svg');
    trackEvent('download', 'svg');
  }

  function saveBlobAs(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyToClipboard() {
    var canvas = elements.qrCanvas;
    if (!canvas || canvas.width === 0) return;

    canvas.toBlob(function(blob) {
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]).then(function() {
        if (elements.copyBtn) {
          var originalHtml = elements.copyBtn.innerHTML;
          elements.copyBtn.classList.add('copied');
          elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(function() {
            elements.copyBtn.classList.remove('copied');
            elements.copyBtn.innerHTML = originalHtml;
          }, 2000);
        }
        trackEvent('copy', 'image');
      }).catch(function(err) {
        console.error('Failed to copy:', err);
      });
    }, 'image/png');
  }

  function switchContentType(type) {
    currentContentType = type;

    // Update tab buttons
    var tabs = document.querySelectorAll('.qr-tab-btn');
    tabs.forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.type === type);
    });

    // Show/hide input sections
    var sections = document.querySelectorAll('.qr-content-section');
    sections.forEach(function(section) {
      section.style.display = section.dataset.type === type ? 'block' : 'none';
    });

    trackEvent('switch_type', type);
  }

  function init() {
    // Cache DOM elements
    elements = {
      contentTabs: document.querySelectorAll('.qr-tab-btn'),
      urlInput: document.getElementById('qr-url-input'),
      textInput: document.getElementById('qr-text-input'),
      emailInput: document.getElementById('qr-email-input'),
      phoneInput: document.getElementById('qr-phone-input'),
      sizeSelect: document.getElementById('qr-size'),
      errorSelect: document.getElementById('qr-error'),
      fgColorInput: document.getElementById('qr-fg-color'),
      bgColorInput: document.getElementById('qr-bg-color'),
      generateBtn: document.getElementById('qr-generate-btn'),
      qrCanvas: document.getElementById('qr-canvas'),
      qrPlaceholder: document.getElementById('qr-placeholder'),
      downloadPng: document.getElementById('qr-download-png'),
      downloadSvg: document.getElementById('qr-download-svg'),
      copyBtn: document.getElementById('qr-copy-btn'),
      qrInfo: document.getElementById('qr-info')
    };

    // Content type tabs
    elements.contentTabs.forEach(function(btn) {
      btn.addEventListener('click', function() {
        switchContentType(btn.dataset.type);
      });
    });

    // Generate button
    if (elements.generateBtn) {
      elements.generateBtn.addEventListener('click', handleGenerate);
    }

    // Download buttons
    if (elements.downloadPng) {
      elements.downloadPng.addEventListener('click', downloadPNG);
    }
    if (elements.downloadSvg) {
      elements.downloadSvg.addEventListener('click', downloadSVG);
    }
    if (elements.copyBtn) {
      elements.copyBtn.addEventListener('click', copyToClipboard);
    }

    // Auto-generate on Enter key
    var inputs = [elements.urlInput, elements.textInput, elements.emailInput, elements.phoneInput];
    inputs.forEach(function(input) {
      if (input) {
        input.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleGenerate();
          }
        });
      }
    });

    // Initialise UI state
    switchContentType('url');
    updateDownloadButtons();

    trackEvent('tool_load', 'qr_code_generator');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
