(function() {
  'use strict';

  var PRESETS = ['#000000', '#FFFFFF', '#292524', '#FAF8F5', '#FEF3C7', '#FF5733', '#326CE5', '#16A34A'];

  var elements = {
    hexInput: document.getElementById('hex-input'),
    picker: document.getElementById('color-picker'),
    swatch: document.getElementById('swatch-fill'),
    error: document.getElementById('hex-error'),
    rOut: document.getElementById('r-out'),
    gOut: document.getElementById('g-out'),
    bOut: document.getElementById('b-out'),
    aOut: document.getElementById('a-out'),
    rgbOut: document.getElementById('rgb-out'),
    rgbaOut: document.getElementById('rgba-out'),
    hexOut: document.getElementById('hex-out'),
    presets: document.getElementById('presets'),
    copyBtns: document.querySelectorAll('[data-copy]'),
    sampleBtn: document.getElementById('sample-btn'),
    clearBtn: document.getElementById('clear-btn')
  };

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'Hex to RGB',
        event_label: label
      });
    }
  }

  function expandNibble(ch) {
    return ch + ch;
  }

  function parseHex(raw) {
    var s = String(raw || '').trim().replace(/^#/, '');
    if (!s) return { error: 'Paste a hex color such as #292524 or FF5733.' };
    if (!/^[0-9a-fA-F]+$/.test(s)) {
      return { error: 'Use only 0-9 and A-F. The # is optional.' };
    }
    if (s.length === 3) {
      s = expandNibble(s[0]) + expandNibble(s[1]) + expandNibble(s[2]);
    } else if (s.length === 4) {
      s = expandNibble(s[0]) + expandNibble(s[1]) + expandNibble(s[2]) + expandNibble(s[3]);
    }
    if (s.length !== 6 && s.length !== 8) {
      return { error: 'Use 3, 4, 6, or 8 hex digits.' };
    }
    var r = parseInt(s.slice(0, 2), 16);
    var g = parseInt(s.slice(2, 4), 16);
    var b = parseInt(s.slice(4, 6), 16);
    var aByte = s.length === 8 ? parseInt(s.slice(6, 8), 16) : 255;
    return { r: r, g: g, b: b, aByte: aByte, hex6: '#' + s.slice(0, 6).toUpperCase() };
  }

  function formatAlpha(aByte) {
    if (aByte === 255) return '1';
    if (aByte === 0) return '0';
    var n = Math.round((aByte / 255) * 100) / 100;
    return String(n);
  }

  function render() {
    var parsed = parseHex(elements.hexInput.value);
    if (parsed.error) {
      elements.error.textContent = parsed.error;
      elements.error.style.display = 'block';
      elements.rOut.textContent = '-';
      elements.gOut.textContent = '-';
      elements.bOut.textContent = '-';
      elements.aOut.textContent = '-';
      elements.rgbOut.textContent = '';
      elements.rgbaOut.textContent = '';
      elements.hexOut.textContent = '';
      elements.swatch.style.background = 'transparent';
      return;
    }

    elements.error.style.display = 'none';
    elements.error.textContent = '';
    var alpha = formatAlpha(parsed.aByte);
    elements.rOut.textContent = String(parsed.r);
    elements.gOut.textContent = String(parsed.g);
    elements.bOut.textContent = String(parsed.b);
    elements.aOut.textContent = parsed.aByte === 255 ? '1' : alpha;
    elements.rgbOut.textContent = 'rgb(' + parsed.r + ', ' + parsed.g + ', ' + parsed.b + ')';
    elements.rgbaOut.textContent = 'rgba(' + parsed.r + ', ' + parsed.g + ', ' + parsed.b + ', ' + alpha + ')';
    elements.hexOut.textContent = parsed.hex6;
    elements.swatch.style.background = 'rgba(' + parsed.r + ', ' + parsed.g + ', ' + parsed.b + ', ' + (parsed.aByte / 255) + ')';
    elements.picker.value = parsed.hex6.toLowerCase();
  }

  function copyText(text, btn, label) {
    if (!text || text === '-') return;
    navigator.clipboard.writeText(text).then(function() {
      var original = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(function() {
        btn.classList.remove('copied');
        btn.innerHTML = original;
      }, 1600);
      trackEvent('copy', label);
    });
  }

  function init() {
    elements.hexInput.addEventListener('input', render);
    elements.picker.addEventListener('input', function() {
      elements.hexInput.value = this.value.toUpperCase();
      render();
      trackEvent('picker', 'hex');
    });
    elements.sampleBtn.addEventListener('click', function() {
      elements.hexInput.value = '#FF5733';
      render();
      trackEvent('sample', '#FF5733');
    });
    elements.clearBtn.addEventListener('click', function() {
      elements.hexInput.value = '';
      render();
      trackEvent('clear', 'hex');
    });

    PRESETS.forEach(function(hex) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-swatch';
      btn.title = hex;
      btn.style.background = hex;
      btn.addEventListener('click', function() {
        elements.hexInput.value = hex;
        render();
        trackEvent('preset', hex);
      });
      elements.presets.appendChild(btn);
    });

    elements.copyBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-copy');
        var node = document.getElementById(id);
        if (node) copyText(node.textContent, btn, id);
      });
    });

    elements.hexInput.value = '#292524';
    render();
    trackEvent('tool_load', 'hex_to_rgb');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
