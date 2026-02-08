(function() {
  'use strict';

  var elements = {
    jwtInput: document.getElementById('jwt-input'),
    jwtDisplay: document.getElementById('jwt-display'),
    decodedHeader: document.getElementById('decoded-header'),
    decodedPayload: document.getElementById('decoded-payload'),
    decodedSection: document.getElementById('decoded-section'),
    tokenStatus: document.getElementById('token-status'),
    algoBadge: document.getElementById('algo-badge'),
    claimsCount: document.getElementById('claims-count'),
    claimsTable: document.getElementById('claims-table'),
    signatureText: document.getElementById('signature-text'),
    sampleBtn: document.getElementById('sample-btn'),
    clearBtn: document.getElementById('clear-btn'),
    copyHeaderBtn: document.getElementById('copy-header-btn'),
    copyPayloadBtn: document.getElementById('copy-payload-btn')
  };

  var SAMPLE_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFiYzEyMyJ9.eyJzdWIiOiJ1c2VyXzEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJhdWQiOiJodHRwczovL2FwaS5leGFtcGxlLmNvbSIsImlhdCI6MTcwNzM1MDQwMCwiZXhwIjoxNzA3MzU0MDAwLCJuYmYiOjE3MDczNTA0MDAsImp0aSI6InRva2VuXzk4NzY1NDMyMTAifQ.dummysignaturevalue';

  var STANDARD_CLAIMS = {
    iss: 'Issuer — who created the token',
    sub: 'Subject — user identifier',
    aud: 'Audience — intended recipient',
    exp: 'Expiration time',
    nbf: 'Not valid before',
    iat: 'Issued at',
    jti: 'JWT ID — unique token identifier',
    name: 'Full name',
    email: 'Email address',
    role: 'User role',
    roles: 'User roles',
    scope: 'Authorized scopes',
    permissions: 'Granted permissions',
    azp: 'Authorized party',
    nonce: 'Nonce for replay protection',
    at_hash: 'Access token hash',
    c_hash: 'Code hash',
    auth_time: 'Time of authentication',
    acr: 'Authentication context class',
    amr: 'Authentication methods',
    sid: 'Session ID',
    org_id: 'Organization ID',
    tenant: 'Tenant identifier',
    client_id: 'Client ID'
  };

  var TIMESTAMP_CLAIMS = ['exp', 'iat', 'nbf', 'auth_time'];

  var currentHeader = null;
  var currentPayload = null;

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'JWT Decoder',
        event_label: label
      });
    }
  }

  function base64UrlDecode(str) {
    // Add padding
    var pad = str.length % 4;
    if (pad === 2) str += '==';
    else if (pad === 3) str += '=';

    // Convert Base64URL to Base64
    str = str.replace(/-/g, '+').replace(/_/g, '/');

    try {
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      return atob(str);
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
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
      if (data.length === 0) return '<span class="json-punctuation">[]</span>';
      html += '<span class="json-punctuation">[</span>';
      for (var i = 0; i < data.length; i++) {
        html += '\n' + spaces + '  ' + highlightJson(data[i], indent + 1);
        if (i < data.length - 1) html += '<span class="json-punctuation">,</span>';
      }
      html += '\n' + spaces + '<span class="json-punctuation">]</span>';
      return html;
    }

    if (typeof data === 'object') {
      var keys = Object.keys(data);
      if (keys.length === 0) return '<span class="json-punctuation">{}</span>';
      html += '<span class="json-punctuation">{</span>';
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        html += '\n' + spaces + '  ';
        html += '<span class="json-key">"' + escapeHtml(key) + '"</span>';
        html += '<span class="json-punctuation">: </span>';
        html += highlightJson(data[key], indent + 1);
        if (j < keys.length - 1) html += '<span class="json-punctuation">,</span>';
      }
      html += '\n' + spaces + '<span class="json-punctuation">}</span>';
      return html;
    }
    return '';
  }

  function formatTimestamp(ts) {
    try {
      var d = new Date(ts * 1000);
      return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
    } catch (e) {
      return String(ts);
    }
  }

  function renderColoredToken(token) {
    var parts = token.split('.');
    if (parts.length !== 3) return;

    elements.jwtDisplay.innerHTML =
      '<span class="jwt-part-header">' + escapeHtml(parts[0]) + '</span>' +
      '<span class="jwt-dot">.</span>' +
      '<span class="jwt-part-payload">' + escapeHtml(parts[1]) + '</span>' +
      '<span class="jwt-dot">.</span>' +
      '<span class="jwt-part-signature">' + escapeHtml(parts[2]) + '</span>';

    elements.jwtDisplay.style.display = 'block';
    elements.jwtInput.style.display = 'none';
  }

  function showError(message) {
    elements.tokenStatus.innerHTML =
      '<span class="status-badge error"><i class="fas fa-times-circle"></i> ' + escapeHtml(message) + '</span>';
    elements.decodedSection.style.display = 'none';
  }

  function showStatus(payload) {
    if (!payload.exp) {
      elements.tokenStatus.innerHTML =
        '<span class="status-badge no-exp"><i class="fas fa-exclamation-triangle"></i> No expiration claim (exp) — token never expires</span>';
      return;
    }

    var now = Math.floor(Date.now() / 1000);
    var exp = payload.exp;

    if (now > exp) {
      var ago = now - exp;
      var agoStr = '';
      if (ago < 60) agoStr = ago + ' seconds ago';
      else if (ago < 3600) agoStr = Math.floor(ago / 60) + ' minutes ago';
      else if (ago < 86400) agoStr = Math.floor(ago / 3600) + ' hours ago';
      else agoStr = Math.floor(ago / 86400) + ' days ago';

      elements.tokenStatus.innerHTML =
        '<span class="status-badge expired"><i class="fas fa-times-circle"></i> Expired ' + agoStr + ' (' + formatTimestamp(exp) + ')</span>';
    } else {
      var remaining = exp - now;
      var remStr = '';
      if (remaining < 60) remStr = remaining + ' seconds';
      else if (remaining < 3600) remStr = Math.floor(remaining / 60) + ' minutes';
      else if (remaining < 86400) remStr = Math.floor(remaining / 3600) + ' hours';
      else remStr = Math.floor(remaining / 86400) + ' days';

      elements.tokenStatus.innerHTML =
        '<span class="status-badge valid"><i class="fas fa-check-circle"></i> Valid — expires in ' + remStr + ' (' + formatTimestamp(exp) + ')</span>';
    }
  }

  function renderClaims(payload) {
    var keys = Object.keys(payload);
    var html = '';

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = payload[key];
      var desc = STANDARD_CLAIMS[key] || 'Custom claim';
      var valueStr = '';

      if (typeof value === 'object') {
        valueStr = JSON.stringify(value);
      } else {
        valueStr = String(value);
      }

      // Build description with timestamp info
      var descHtml = escapeHtml(desc);
      if (TIMESTAMP_CLAIMS.indexOf(key) !== -1 && typeof value === 'number') {
        descHtml = '<span class="timestamp-human">' + formatTimestamp(value) + '</span>';
        if (key === 'exp') {
          var now = Math.floor(Date.now() / 1000);
          if (now > value) {
            descHtml += '<span class="expired-tag">EXPIRED</span>';
          } else {
            descHtml += '<span class="valid-tag">VALID</span>';
          }
        }
      }

      html += '<div class="claim-row">' +
        '<div class="claim-key">' + escapeHtml(key) + '</div>' +
        '<div class="claim-value">' + escapeHtml(valueStr) + '</div>' +
        '<div class="claim-description">' + descHtml + '</div>' +
        '</div>';
    }

    elements.claimsTable.innerHTML = html;
    elements.claimsCount.textContent = keys.length + ' claims';
  }

  function decodeToken(token) {
    // Strip "Bearer " prefix
    token = token.replace(/^Bearer\s+/i, '').trim();

    if (!token) {
      elements.decodedSection.style.display = 'none';
      elements.tokenStatus.innerHTML = '';
      elements.jwtDisplay.style.display = 'none';
      elements.jwtInput.style.display = 'block';
      currentHeader = null;
      currentPayload = null;
      return;
    }

    var parts = token.split('.');
    if (parts.length !== 3) {
      showError('Invalid JWT — expected 3 parts (header.payload.signature), found ' + parts.length);
      currentHeader = null;
      currentPayload = null;
      return;
    }

    // Decode header
    var header, payload;
    try {
      var headerJson = base64UrlDecode(parts[0]);
      header = JSON.parse(headerJson);
    } catch (e) {
      showError('Failed to decode header — invalid Base64URL or JSON');
      return;
    }

    try {
      var payloadJson = base64UrlDecode(parts[1]);
      payload = JSON.parse(payloadJson);
    } catch (e) {
      showError('Failed to decode payload — invalid Base64URL or JSON');
      return;
    }

    currentHeader = header;
    currentPayload = payload;

    // Render colored token
    renderColoredToken(token);

    // Render header
    var headerHtml = highlightJson(header, 0).replace(/^[\n\r]+/, '');
    elements.decodedHeader.innerHTML = headerHtml;

    // Render payload
    var payloadHtml = highlightJson(payload, 0).replace(/^[\n\r]+/, '');
    elements.decodedPayload.innerHTML = payloadHtml;

    // Algorithm badge
    elements.algoBadge.textContent = header.alg || 'unknown';
    elements.algoBadge.style.display = header.alg ? '' : 'none';

    // Signature
    elements.signatureText.textContent = parts[2];

    // Claims
    renderClaims(payload);

    // Status
    showStatus(payload);

    // Show decoded section
    elements.decodedSection.style.display = 'block';

    trackEvent('decode', header.alg || 'unknown');
  }

  function handleCopy(data, btn) {
    if (!data) return;
    var text = JSON.stringify(data, null, 2);

    navigator.clipboard.writeText(text).then(function() {
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(function() {
        btn.classList.remove('copied');
        btn.innerHTML = '<i class="fas fa-copy"></i>';
      }, 2000);
    });
  }

  function init() {
    // Real-time decoding
    elements.jwtInput.addEventListener('input', function() {
      decodeToken(elements.jwtInput.value);
    });

    // Auto-decode on paste
    elements.jwtInput.addEventListener('paste', function() {
      setTimeout(function() {
        decodeToken(elements.jwtInput.value);
      }, 0);
    });

    // Sample button
    elements.sampleBtn.addEventListener('click', function() {
      elements.jwtInput.value = SAMPLE_TOKEN;
      elements.jwtInput.style.display = 'block';
      elements.jwtDisplay.style.display = 'none';
      decodeToken(SAMPLE_TOKEN);
      trackEvent('sample', 'load_sample');
    });

    // Clear button
    elements.clearBtn.addEventListener('click', function() {
      elements.jwtInput.value = '';
      elements.jwtInput.style.display = 'block';
      elements.jwtDisplay.style.display = 'none';
      elements.decodedSection.style.display = 'none';
      elements.tokenStatus.innerHTML = '';
      currentHeader = null;
      currentPayload = null;
      elements.jwtInput.focus();
      trackEvent('clear', 'jwt_content');
    });

    // Click on colored display to edit
    elements.jwtDisplay.addEventListener('click', function() {
      elements.jwtDisplay.style.display = 'none';
      elements.jwtInput.style.display = 'block';
      elements.jwtInput.focus();
    });

    // Copy buttons
    elements.copyHeaderBtn.addEventListener('click', function() {
      handleCopy(currentHeader, elements.copyHeaderBtn);
      trackEvent('copy', 'header');
    });

    elements.copyPayloadBtn.addEventListener('click', function() {
      handleCopy(currentPayload, elements.copyPayloadBtn);
      trackEvent('copy', 'payload');
    });

    trackEvent('tool_load', 'jwt_decoder_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
