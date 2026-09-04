(function() {
  'use strict';

  var PRESETS = [
    { r: 0, g: 0, b: 0 },
    { r: 255, g: 255, b: 255 },
    { r: 41, g: 37, b: 36 },
    { r: 250, g: 248, b: 245 },
    { r: 254, g: 243, b: 199 },
    { r: 255, g: 87, b: 51 },
    { r: 50, g: 108, b: 229 },
    { r: 22, g: 163, b: 74 }
  ];

  var elements = {
    rRange: document.getElementById('r-range'),
    gRange: document.getElementById('g-range'),
    bRange: document.getElementById('b-range'),
    aRange: document.getElementById('a-range'),
    rInput: document.getElementById('r-input'),
    gInput: document.getElementById('g-input'),
    bInput: document.getElementById('b-input'),
    aInput: document.getElementById('a-input'),
    picker: document.getElementById('color-picker'),
    swatch: document.getElementById('swatch-fill'),
    hexOut: document.getElementById('hex-out'),
    hexLowerOut: document.getElementById('hex-lower-out'),
    rgbOut: document.getElementById('rgb-out'),
    rgbaOut: document.getElementById('rgba-out'),
    hexaOut: document.getElementById('hexa-out'),
    presets: document.getElementById('presets'),
    copyBtns: document.querySelectorAll('[data-copy]')
  };

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'RGB to Hex',
        event_label: label
      });
    }
  }

  function clamp(n, min, max) {
    n = parseInt(n, 10);
    if (isNaN(n)) n = min;
    if (n < min) n = min;
    if (n > max) n = max;
    return n;
  }

  function toHexByte(n) {
    var h = clamp(n, 0, 255).toString(16).toUpperCase();
    return h.length === 1 ? '0' + h : h;
  }

  function state() {
    return {
      r: clamp(elements.rInput.value, 0, 255),
      g: clamp(elements.gInput.value, 0, 255),
      b: clamp(elements.bInput.value, 0, 255),
      a: clamp(elements.aInput.value, 0, 100)
    };
  }

  function setChannel(which, value, fromPicker) {
    var max = which === 'a' ? 100 : 255;
    var n = clamp(value, 0, max);
    elements[which + 'Range'].value = n;
    elements[which + 'Input'].value = n;
    if (!fromPicker && which !== 'a') {
      var s = state();
      elements.picker.value = ('#' + toHexByte(s.r) + toHexByte(s.g) + toHexByte(s.b)).toLowerCase();
    }
    render();
  }

  function render() {
    var s = state();
    var hex = '#' + toHexByte(s.r) + toHexByte(s.g) + toHexByte(s.b);
    var aByte = Math.round(s.a * 255 / 100);
    var hexa = hex + toHexByte(aByte);
    var alpha = (s.a / 100).toFixed(s.a % 1 === 0 ? 2 : 2);
    if (s.a === 100) alpha = '1';
    else if (s.a === 0) alpha = '0';
    else alpha = (s.a / 100).toFixed(2).replace(/0+$/, '').replace(/\.$/, '');

    elements.hexOut.textContent = hex;
    elements.hexLowerOut.textContent = hex.toLowerCase();
    elements.rgbOut.textContent = 'rgb(' + s.r + ', ' + s.g + ', ' + s.b + ')';
    elements.rgbaOut.textContent = 'rgba(' + s.r + ', ' + s.g + ', ' + s.b + ', ' + alpha + ')';
    elements.hexaOut.textContent = hexa;
    elements.swatch.style.background = 'rgba(' + s.r + ', ' + s.g + ', ' + s.b + ', ' + (s.a / 100) + ')';
  }

  function copyText(text, btn, label) {
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

  function applyRgb(r, g, b, a) {
    setChannel('r', r, true);
    setChannel('g', g, true);
    setChannel('b', b, true);
    if (typeof a === 'number') setChannel('a', a, true);
    elements.picker.value = ('#' + toHexByte(r) + toHexByte(g) + toHexByte(b)).toLowerCase();
    render();
  }

  function init() {
    ['r', 'g', 'b', 'a'].forEach(function(which) {
      elements[which + 'Range'].addEventListener('input', function() {
        setChannel(which, this.value);
      });
      elements[which + 'Input'].addEventListener('input', function() {
        setChannel(which, this.value);
      });
    });

    elements.picker.addEventListener('input', function() {
      var hex = this.value.replace('#', '');
      applyRgb(
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16)
      );
      trackEvent('picker', 'rgb');
    });

    PRESETS.forEach(function(p) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-swatch';
      btn.title = 'rgb(' + p.r + ', ' + p.g + ', ' + p.b + ')';
      btn.style.background = 'rgb(' + p.r + ', ' + p.g + ', ' + p.b + ')';
      btn.addEventListener('click', function() {
        applyRgb(p.r, p.g, p.b, 100);
        trackEvent('preset', p.r + ',' + p.g + ',' + p.b);
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

    applyRgb(41, 37, 36, 100);
    trackEvent('tool_load', 'rgb_to_hex');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
