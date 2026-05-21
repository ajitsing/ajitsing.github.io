(function() {
  'use strict';

  var SAMPLE_PEM = [
    '-----BEGIN CERTIFICATE-----',
    'MIIEMzCCAxugAwIBAgIUCnafb3hree86chrGb3ltvzLCeL4wDQYJKoZIhvcNAQEL',
    'BQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcM',
    'DVNhbiBGcmFuY2lzY28xFzAVBgNVBAoMDlNpbmdoYWppdCBEZW1vMRwwGgYDVQQD',
    'DBN0b29scy5zaW5naGFqaXQuY29tMB4XDTI2MDUyMTEyNTk1OFoXDTI4MDgyMzEy',
    'NTk1OFowcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNV',
    'BAcMDVNhbiBGcmFuY2lzY28xFzAVBgNVBAoMDlNpbmdoYWppdCBEZW1vMRwwGgYD',
    'VQQDDBN0b29scy5zaW5naGFqaXQuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A',
    'MIIBCgKCAQEAtsuhPmCC2ilXYtPM2MSCud8M40TjiMYm8sWz+PU1cl7QFVtcbYya',
    'H8eputIZeGvKfHXLMJ3zZq8NgXD1aaN2zhmtIgCDoa21T8AOjdDA9T3R1Ttk74Hq',
    'egmwDyD6Gb2yVqLJjk/fGZVsBcr+ysHUeKlKMa7rNprtTq4V8WWAlqhkF8exCnrW',
    'a3QUW28dASw8jKI8Gq0Cf6sC6RVZFaSHAjvLj55wHSKwIGrwvjdQBqTQ351SRUXh',
    'Bf0izxORWSZKdwupHEI6LuyWeabYFRT04EELizEwURzetebIPIYdvEuykphRQ+aE',
    'lUoqwJqKZe8Cwq65CKXeft7QGAfe2L9FNQIDAQABo4HCMIG/MB0GA1UdDgQWBBTG',
    'xBEvye946aPDPDJ9+VpSFOVicjAfBgNVHSMEGDAWgBTGxBEvye946aPDPDJ9+VpS',
    'FOVicjAPBgNVHRMBAf8EBTADAQH/MEAGA1UdEQQ5MDeCE3Rvb2xzLnNpbmdoYWpp',
    'dC5jb22CDXNpbmdoYWppdC5jb22CEXd3dy5zaW5naGFqaXQuY29tMAsGA1UdDwQE',
    'AwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDQYJKoZIhvcNAQEL',
    'BQADggEBAF5o0M3WxG9rgscj2pSiKy9NzGNyRubqxpX/PiWOiJ0EcZohKPbZo2Sg',
    'teucyQzTRtoOf0MOwod7P69s4fQWP+yenvYVjeHSAbn9SQ5XOdLy3Ql6jwvds911',
    '5xj2o7B3ZX8tOO24MPXjRK1wGXxLKMiU2JMkfqlbC09RwsV1n7aSncoeFL/AqHVS',
    'AWeRc83YSsWOfto8kzzA6Avhb/tGvYHtqFsV9TDvz8fdtmCTpxO/GejbLZR6DMVq',
    '4xmOVQaLiI5FxWhRX+HIcw0lkPjBZeuHmPM4MVYkW3L1mFuddRlYkS+x2RKMHC5l',
    'duaUCcIw9gzXZ5K4jVkPWVLjHeJEx1U=',
    '-----END CERTIFICATE-----'
  ].join('\n');

  var OID_NAMES = {
    '1.2.840.113549.1.1.1': 'RSA',
    '1.2.840.113549.1.1.5': 'SHA-1 with RSA',
    '1.2.840.113549.1.1.11': 'SHA-256 with RSA',
    '1.2.840.113549.1.1.12': 'SHA-384 with RSA',
    '1.2.840.113549.1.1.13': 'SHA-512 with RSA',
    '1.2.840.10045.4.3.2': 'ECDSA with SHA-256',
    '1.2.840.10045.4.3.3': 'ECDSA with SHA-384',
    '1.2.840.10045.4.3.4': 'ECDSA with SHA-512',
    '1.2.840.10040.4.3': 'DSA with SHA-1',
    '2.16.840.1.101.3.4.3.2': 'SHA-256 with RSA (PSS)',
    '2.16.840.1.101.3.4.3.3': 'SHA-384 with RSA (PSS)',
    '2.16.840.1.101.3.4.3.4': 'SHA-512 with RSA (PSS)'
  };

  var KEY_USAGE_FLAGS = [
    ['digitalSignature', 'Digital Signature'],
    ['nonRepudiation', 'Non Repudiation'],
    ['keyEncipherment', 'Key Encipherment'],
    ['dataEncipherment', 'Data Encipherment'],
    ['keyAgreement', 'Key Agreement'],
    ['keyCertSign', 'Key Cert Sign'],
    ['cRLSign', 'CRL Sign'],
    ['encipherOnly', 'Encipher Only'],
    ['decipherOnly', 'Decipher Only']
  ];

  var EXT_KEY_USAGE_FLAGS = [
    ['serverAuth', 'TLS Server Authentication'],
    ['clientAuth', 'TLS Client Authentication'],
    ['codeSigning', 'Code Signing'],
    ['emailProtection', 'Email Protection'],
    ['timeStamping', 'Time Stamping'],
    ['OCSPSigning', 'OCSP Signing'],
    ['ipsecEndSystem', 'IPsec End System'],
    ['ipsecTunnel', 'IPsec Tunnel'],
    ['ipsecUser', 'IPsec User']
  ];

  var elements = {
    certInput: document.getElementById('cert-input'),
    parseStatus: document.getElementById('parse-status'),
    resultsSection: document.getElementById('results-section'),
    chainSummary: document.getElementById('chain-summary'),
    certResults: document.getElementById('cert-results'),
    sampleBtn: document.getElementById('sample-btn'),
    clearBtn: document.getElementById('clear-btn'),
    pasteBtn: document.getElementById('paste-btn'),
    textWrapper: document.getElementById('text-input-wrapper'),
    fileWrapper: document.getElementById('file-input-wrapper'),
    fileInput: document.getElementById('cert-file'),
    fileDropZone: document.getElementById('file-drop-zone'),
    modeButtons: document.querySelectorAll('.mode-btn')
  };

  var currentMode = 'pem';
  var parseTimer = null;

  function trackEvent(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'SSL Certificate Decoder',
        event_label: label
      });
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(date) {
    if (!date || isNaN(date.getTime())) return '—';
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  }

  function formatRelativeDays(targetDate, isExpiry) {
    var now = new Date();
    var diffMs = targetDate.getTime() - now.getTime();
    var days = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (days === 0) return isExpiry ? 'expires today' : 'starts today';
    if (days > 0) {
      return isExpiry ? 'expires in ' + days + ' day' + (days === 1 ? '' : 's') : 'starts in ' + days + ' day' + (days === 1 ? '' : 's');
    }
    var absDays = Math.abs(days);
    return isExpiry ? 'expired ' + absDays + ' day' + (absDays === 1 ? '' : 's') + ' ago' : 'started ' + absDays + ' day' + (absDays === 1 ? '' : 's') + ' ago';
  }

  function getValidityStatus(notBefore, notAfter) {
    var now = new Date();
    if (now < notBefore) return { status: 'not-yet', label: 'Not Yet Valid' };
    if (now > notAfter) return { status: 'expired', label: 'Expired' };
    return { status: 'valid', label: 'Valid' };
  }

  function dnToString(attrs) {
    if (!attrs || !attrs.length) return '—';
    return attrs
      .map(function(a) {
        var name = a.shortName || a.name || a.type;
        return (name ? name + '=' : '') + (a.value || '');
      })
      .join(', ');
  }

  function getAttr(attrs, shortName) {
    if (!attrs) return null;
    for (var i = 0; i < attrs.length; i++) {
      if (attrs[i].shortName === shortName || attrs[i].name === shortName) {
        return attrs[i].value;
      }
    }
    return null;
  }

  function oidName(oid) {
    return OID_NAMES[oid] || oid || '—';
  }

  function formatSerial(serialHex) {
    if (!serialHex) return '—';
    var clean = serialHex.replace(/:/g, '').toUpperCase();
    if (clean.length <= 32) return clean.match(/.{1,2}/g).join(':');
    return clean;
  }

  function certFingerprint(cert, algorithm) {
    var asn1 = forge.pki.certificateToAsn1(cert);
    var der = forge.asn1.toDer(asn1).getBytes();
    var md = forge.md[algorithm].create();
    md.update(der);
    return md.digest().toHex().toUpperCase().match(/.{1,2}/g).join(':');
  }

  function describePublicKey(cert) {
    var key = cert.publicKey;
    if (!key) return { type: '—', bits: '—', curve: null };

    if (key.n) {
      var bits = key.n.bitLength();
      return { type: 'RSA', bits: bits + ' bits', curve: null };
    }
    if (key.q) {
      return { type: 'DSA', bits: (key.p ? key.p.bitLength() : '—') + ' bits', curve: null };
    }
    if (key.curve) {
      var curveOid = key.curve.oid || '';
      var curveName = forge.pki.oids[curveOid] || curveOid || 'EC';
      return { type: 'EC (' + curveName + ')', bits: key.n ? key.n.bitLength() + ' bits' : '—', curve: curveName };
    }
    return { type: 'Unknown', bits: '—', curve: null };
  }

  function parseSubjectAltName(ext) {
    var items = [];
    if (!ext || !ext.altNames) return items;
    ext.altNames.forEach(function(alt) {
      var typeLabel = 'Other';
      if (alt.type === 1) typeLabel = 'Email';
      else if (alt.type === 2) typeLabel = 'DNS';
      else if (alt.type === 7) typeLabel = 'IP';
      else if (alt.type === 6) typeLabel = 'URI';
      var value = alt.value;
      if (alt.type === 7 && alt.ip) {
        value = alt.ip;
      }
      items.push({ type: typeLabel, value: String(value) });
    });
    return items;
  }

  function parseKeyUsage(ext) {
    if (!ext) return null;
    var usages = [];
    KEY_USAGE_FLAGS.forEach(function(pair) {
      if (ext[pair[0]]) usages.push(pair[1]);
    });
    return usages.length ? usages.join(', ') : null;
  }

  function parseExtendedKeyUsage(ext) {
    if (!ext) return null;
    var usages = [];
    EXT_KEY_USAGE_FLAGS.forEach(function(pair) {
      if (ext[pair[0]]) usages.push(pair[1]);
    });
    Object.keys(ext).forEach(function(k) {
      if (k === 'name' || k === 'id' || k === 'critical' || k === 'value') return;
      var matched = EXT_KEY_USAGE_FLAGS.some(function(p) { return p[0] === k; });
      if (!matched && ext[k] === true) usages.push(k);
    });
    return usages.length ? usages.join(', ') : null;
  }

  function bytesToHex(bytes) {
    if (!bytes) return null;
    var out = '';
    for (var i = 0; i < bytes.length; i++) {
      var h = bytes.charCodeAt(i).toString(16).toUpperCase();
      out += (h.length === 1 ? '0' : '') + h;
    }
    return out.match(/.{1,2}/g).join(':');
  }

  function parseBasicConstraints(ext) {
    if (!ext) return null;
    var parts = [];
    if (ext.cA) parts.push('CA: yes');
    else parts.push('CA: no');
    if (ext.pathLenConstraint !== undefined) {
      parts.push('path length: ' + ext.pathLenConstraint);
    }
    return parts.join(', ');
  }

  function formatHexId(raw) {
    if (!raw) return null;
    var clean = String(raw).replace(/[^0-9a-fA-F]/g, '');
    if (!clean) return null;
    return clean.toUpperCase().match(/.{1,2}/g).join(':');
  }

  function getExtensions(cert) {
    var rows = [];
    var seen = {};

    cert.extensions.forEach(function(ext) {
      var name = ext.name || ext.id || 'unknown';
      if (seen[name]) return;
      seen[name] = true;

      var value = 'present';
      try {
        if (name === 'subjectAltName') {
          var sans = parseSubjectAltName(ext);
          value = sans.length ? sans.length + ' name(s)' : '—';
        } else if (name === 'keyUsage') {
          value = parseKeyUsage(ext) || '—';
        } else if (name === 'extKeyUsage') {
          value = parseExtendedKeyUsage(ext) || '—';
        } else if (name === 'basicConstraints') {
          value = parseBasicConstraints(ext) || '—';
        } else if (name === 'subjectKeyIdentifier') {
          value = formatHexId(ext.subjectKeyIdentifier) || 'present';
        } else if (name === 'authorityKeyIdentifier') {
          var akid = ext.keyIdentifier || ext.authorityKeyIdentifier || ext.serialNumber;
          value = formatHexId(akid) || 'present';
        } else if (name === 'cRLDistributionPoints' && Array.isArray(ext.value)) {
          value = ext.value.length + ' distribution point(s)';
        } else if (name === 'authorityInfoAccess' && typeof ext.value === 'string') {
          value = 'present';
        } else if (typeof ext.value === 'string') {
          value = ext.value.length > 80 ? ext.value.slice(0, 80) + '…' : ext.value;
        }
      } catch (err) {
        value = 'present';
      }

      rows.push({ name: name, value: value, critical: ext.critical });
    });

    return rows;
  }

  function extractPemBlocks(text) {
    var blocks = [];
    var regex = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/gi;
    var match;
    while ((match = regex.exec(text)) !== null) {
      blocks.push(match[0].trim());
    }
    return blocks;
  }

  function parseDerBytes(bytes) {
    var asn1 = forge.asn1.fromDer(bytes);
    return forge.pki.certificateFromAsn1(asn1);
  }

  function parseInput(text) {
    var trimmed = (text || '').trim();
    if (!trimmed) {
      showStatus('', false);
      hideResults();
      return;
    }

    if (typeof forge === 'undefined') {
      showStatus('Certificate library is still loading. Please try again in a moment.', true);
      return;
    }

    var certs = [];

    try {
      if (currentMode === 'der' || isLikelyDer(trimmed)) {
        var bytes = trimmed;
        if (/^[A-Za-z0-9+/=\s]+$/.test(trimmed.replace(/\s/g, '')) && trimmed.indexOf('BEGIN') === -1) {
          bytes = forge.util.decode64(trimmed.replace(/\s/g, ''));
        }
        certs.push(parseDerBytes(bytes));
      } else {
        var blocks = extractPemBlocks(trimmed);
        if (!blocks.length) {
          showStatus('No PEM certificate found. Paste text between BEGIN/END CERTIFICATE lines, or upload a .pem/.crt file.', true);
          hideResults();
          return;
        }
        blocks.forEach(function(pem) {
          certs.push(forge.pki.certificateFromPem(pem));
        });
      }

      try {
        renderResults(certs);
        showStatus('Parsed ' + certs.length + ' certificate' + (certs.length === 1 ? '' : 's') + ' successfully.', false);
        trackEvent('decode_success', certs.length + '_certs');
      } catch (renderErr) {
        showStatus('Parsed certificate but could not render: ' + (renderErr.message || 'unknown error'), true);
        hideResults();
        trackEvent('render_error', renderErr.message || 'unknown');
      }
    } catch (err) {
      showStatus('Could not parse certificate: ' + (err.message || 'Invalid format'), true);
      hideResults();
      trackEvent('decode_error', err.message || 'unknown');
    }
  }

  function isLikelyDer(text) {
    return text.indexOf('BEGIN') === -1 && /^[A-Za-z0-9+/=\s]+$/.test(text.replace(/\s/g, ''));
  }

  function showStatus(message, isError) {
    if (!message) {
      elements.parseStatus.classList.remove('visible', 'error', 'info');
      elements.parseStatus.textContent = '';
      return;
    }
    elements.parseStatus.classList.add('visible');
    elements.parseStatus.classList.remove('error', 'info');
    elements.parseStatus.classList.add(isError ? 'error' : 'info');
    elements.parseStatus.innerHTML =
      '<i class="fas fa-' + (isError ? 'exclamation-circle' : 'check-circle') + '"></i> ' + escapeHtml(message);
  }

  function hideResults() {
    elements.resultsSection.style.display = 'none';
    elements.certResults.innerHTML = '';
    elements.chainSummary.innerHTML = '';
  }

  function certRole(index, total) {
    if (total === 1) return 'End-entity certificate';
    if (index === 0) return 'Leaf certificate';
    if (index === total - 1) return 'Root CA';
    return 'Intermediate CA';
  }

  function buildFieldRow(label, value, copyable) {
    var copyBtn = copyable
      ? '<button type="button" class="btn-copy-field" data-copy="' + escapeHtml(value) + '" title="Copy"><i class="fas fa-copy"></i></button>'
      : '';
    return (
      '<div class="field-label">' + escapeHtml(label) + '</div>' +
      '<div class="field-value' + (copyable ? ' mono' : '') + '">' +
      '<div class="field-value-row"><span>' + escapeHtml(value) + '</span>' + copyBtn + '</div></div>'
    );
  }

  function renderResults(certs) {
    elements.resultsSection.style.display = 'block';
    elements.chainSummary.innerHTML =
      '<i class="fas fa-link"></i> <span>Certificate chain: <strong>' +
      certs.length +
      '</strong> certificate' +
      (certs.length === 1 ? '' : 's') +
      '</span>';

    var html = '';
    certs.forEach(function(cert, index) {
      html += renderCertCard(cert, index, certs.length);
    });
    elements.certResults.innerHTML = html;
    bindCopyButtons();
  }

  function renderCertCard(cert, index, total) {
    var subjectCn = getAttr(cert.subject.attributes, 'CN') || dnToString(cert.subject.attributes);
    var issuerCn = getAttr(cert.issuer.attributes, 'CN') || dnToString(cert.issuer.attributes);
    var notBefore = cert.validity.notBefore;
    var notAfter = cert.validity.notAfter;
    var validity = getValidityStatus(notBefore, notAfter);
    var pubKey = describePublicKey(cert);
    var sha256 = certFingerprint(cert, 'sha256');
    var sha1 = certFingerprint(cert, 'sha1');
    var sigOid = cert.siginfo && cert.siginfo.algorithmOid;
    var sigName = oidName(sigOid);
    var sanExt = cert.getExtension({ name: 'subjectAltName' });
    var sans = parseSubjectAltName(sanExt);
    var extensions = getExtensions(cert);

    var sanHtml = '';
    if (sans.length) {
      sanHtml = '<ul class="san-list">';
      sans.forEach(function(s) {
        sanHtml += '<li><span class="san-type">' + escapeHtml(s.type) + '</span>' + escapeHtml(s.value) + '</li>';
      });
      sanHtml += '</ul>';
    } else {
      sanHtml = '<span class="field-value">—</span>';
    }

    var extRows = '';
    extensions.forEach(function(row) {
      extRows +=
        '<tr><th>' +
        escapeHtml(row.name) +
        (row.critical ? ' <code>critical</code>' : '') +
        '</th><td>' +
        escapeHtml(row.value) +
        '</td></tr>';
    });

    return (
      '<article class="cert-card" data-cert-index="' +
      index +
      '">' +
      '<header class="cert-card-header">' +
      '<div class="cert-card-title">' +
      '<div class="cert-position">' +
      escapeHtml(certRole(index, total)) +
      ' · #' +
      (index + 1) +
      '</div>' +
      '<h3 class="cert-cn">' +
      escapeHtml(subjectCn) +
      '</h3>' +
      '<p class="cert-subtitle-text">Issued by ' +
      escapeHtml(issuerCn) +
      '</p>' +
      '</div>' +
      '<span class="validity-badge ' +
      validity.status +
      '"><i class="fas fa-' +
      (validity.status === 'valid' ? 'check-circle' : validity.status === 'expired' ? 'times-circle' : 'clock') +
      '"></i> ' +
      escapeHtml(validity.label) +
      '</span>' +
      '</header>' +
      '<div class="cert-card-body">' +
      '<div class="field-group">' +
      '<h4 class="field-group-title"><i class="fas fa-id-card"></i> Subject & Issuer</h4>' +
      '<div class="field-grid">' +
      buildFieldRow('Subject', dnToString(cert.subject.attributes), false) +
      buildFieldRow('Issuer', dnToString(cert.issuer.attributes), false) +
      buildFieldRow('Common Name', getAttr(cert.subject.attributes, 'CN') || '—', false) +
      buildFieldRow('Organization', getAttr(cert.subject.attributes, 'O') || '—', false) +
      '</div></div>' +
      '<div class="field-group">' +
      '<h4 class="field-group-title"><i class="fas fa-calendar-alt"></i> Validity</h4>' +
      '<div class="field-grid">' +
      buildFieldRow('Valid from', formatDate(notBefore) + ' (' + formatRelativeDays(notBefore, false) + ')', false) +
      buildFieldRow('Valid until', formatDate(notAfter) + ' (' + formatRelativeDays(notAfter, true) + ')', false) +
      buildFieldRow('Status', validity.label, false) +
      '</div></div>' +
      '<div class="field-group">' +
      '<h4 class="field-group-title"><i class="fas fa-fingerprint"></i> Identifiers & Signature</h4>' +
      '<div class="field-grid">' +
      buildFieldRow('Serial number', formatSerial(cert.serialNumber), true) +
      buildFieldRow('Signature algorithm', sigName, false) +
      buildFieldRow('Version', 'v' + (cert.version + 1), false) +
      '</div></div>' +
      '<div class="field-group">' +
      '<h4 class="field-group-title"><i class="fas fa-key"></i> Public Key</h4>' +
      '<div class="field-grid">' +
      buildFieldRow('Algorithm', pubKey.type, false) +
      buildFieldRow('Key size', pubKey.bits, false) +
      '</div></div>' +
      '<div class="field-group">' +
      '<h4 class="field-group-title"><i class="fas fa-hashtag"></i> Fingerprints</h4>' +
      '<div class="field-grid">' +
      buildFieldRow('SHA-256', sha256, true) +
      buildFieldRow('SHA-1', sha1, true) +
      '</div></div>' +
      '<div class="field-group">' +
      '<h4 class="field-group-title"><i class="fas fa-globe"></i> Subject Alternative Names</h4>' +
      sanHtml +
      '</div>' +
      (extRows
        ? '<div class="field-group"><h4 class="field-group-title"><i class="fas fa-puzzle-piece"></i> Extensions</h4><table class="extensions-table"><tbody>' +
          extRows +
          '</tbody></table></div>'
        : '') +
      '</div></article>'
    );
  }

  function bindCopyButtons() {
    elements.certResults.querySelectorAll('.btn-copy-field').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var text = btn.getAttribute('data-copy');
        if (!text) return;
        navigator.clipboard.writeText(text).then(function() {
          btn.classList.add('copied');
          btn.innerHTML = '<i class="fas fa-check"></i>';
          setTimeout(function() {
            btn.classList.remove('copied');
            btn.innerHTML = '<i class="fas fa-copy"></i>';
          }, 1500);
          trackEvent('copy_field', 'fingerprint');
        });
      });
    });
  }

  function scheduleParse() {
    clearTimeout(parseTimer);
    parseTimer = setTimeout(function() {
      parseInput(elements.certInput.value);
    }, 200);
  }

  function setInputMode(mode) {
    currentMode = mode;
    elements.modeButtons.forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    if (mode === 'file') {
      elements.textWrapper.classList.add('hidden');
      elements.fileWrapper.classList.remove('hidden');
    } else {
      elements.textWrapper.classList.remove('hidden');
      elements.fileWrapper.classList.add('hidden');
      if (mode === 'pem') {
        elements.certInput.placeholder =
          '-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAKoL...\n-----END CERTIFICATE-----';
      } else {
        elements.certInput.placeholder = 'Paste Base64-encoded DER certificate (no PEM headers)';
      }
    }
  }

  function readFile(file) {
    var reader = new FileReader();
    var isDer = /\.(der|cer)$/i.test(file.name);

    reader.onload = function(e) {
      if (isDer) {
        var bytes = e.target.result;
        try {
          var cert = parseDerBytes(bytes);
          renderResults([cert]);
          showStatus('Parsed certificate from ' + file.name, false);
        } catch (err) {
          showStatus('Could not parse DER file: ' + (err.message || 'Invalid format'), true);
          hideResults();
        }
      } else {
        elements.certInput.value = e.target.result;
        currentMode = 'pem';
        setInputMode('pem');
        scheduleParse();
      }
      trackEvent('file_upload', file.name);
    };

    if (isDer) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  }

  function init() {
    elements.certInput.addEventListener('input', scheduleParse);

    elements.sampleBtn.addEventListener('click', function() {
      elements.certInput.value = SAMPLE_PEM;
      setInputMode('pem');
      scheduleParse();
      trackEvent('load_sample', 'ISRG Root X1');
    });

    elements.clearBtn.addEventListener('click', function() {
      elements.certInput.value = '';
      if (elements.fileInput) elements.fileInput.value = '';
      hideResults();
      showStatus('', false);
      trackEvent('clear', 'input');
    });

    elements.pasteBtn.addEventListener('click', function() {
      navigator.clipboard.readText().then(function(text) {
        elements.certInput.value = text;
        setInputMode('pem');
        scheduleParse();
        trackEvent('paste', 'clipboard');
      });
    });

    elements.modeButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        setInputMode(btn.dataset.mode);
        if (btn.dataset.mode !== 'file') scheduleParse();
      });
    });

    if (elements.fileInput) {
      elements.fileInput.addEventListener('change', function() {
        if (elements.fileInput.files[0]) readFile(elements.fileInput.files[0]);
      });
    }

    if (elements.fileDropZone) {
      elements.fileDropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        elements.fileDropZone.classList.add('dragover');
      });
      elements.fileDropZone.addEventListener('dragleave', function() {
        elements.fileDropZone.classList.remove('dragover');
      });
      elements.fileDropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        elements.fileDropZone.classList.remove('dragover');
        if (e.dataTransfer.files[0]) readFile(e.dataTransfer.files[0]);
      });
    }

    setInputMode('pem');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
