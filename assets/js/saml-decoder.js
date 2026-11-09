(function () {
  'use strict';

  var NS_PROTOCOL = 'urn:oasis:names:tc:SAML:2.0:protocol';
  var NS_ASSERTION = 'urn:oasis:names:tc:SAML:2.0:assertion';
  var NS_DS = 'http://www.w3.org/2000/09/xmldsig#';

  var SAMPLE_REQUEST_XML = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<samlp:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"',
    '  xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"',
    '  ID="_a1b2c3d4e5" Version="2.0" IssueInstant="2026-03-01T12:00:00Z"',
    '  Destination="https://idp.example.com/sso/saml"',
    '  AssertionConsumerServiceURL="https://app.example.com/saml/acs"',
    '  ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"',
    '  ForceAuthn="false" IsPassive="false">',
    '  <saml:Issuer>https://app.example.com</saml:Issuer>',
    '  <samlp:NameIDPolicy Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress" AllowCreate="true"/>',
    '</samlp:AuthnRequest>'
  ].join('\n');

  var SAMPLE_RESPONSE_XML = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<samlp:Response xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"',
    '  xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"',
    '  ID="_r9f8e7d6c5" Version="2.0" IssueInstant="2026-03-01T12:00:05Z"',
    '  Destination="https://app.example.com/saml/acs"',
    '  InResponseTo="_a1b2c3d4e5">',
    '  <saml:Issuer>https://idp.example.com</saml:Issuer>',
    '  <samlp:Status>',
    '    <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>',
    '  </samlp:Status>',
    '  <saml:Assertion ID="_assertion1" Version="2.0" IssueInstant="2026-03-01T12:00:05Z">',
    '    <saml:Issuer>https://idp.example.com</saml:Issuer>',
    '    <saml:Subject>',
    '      <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">user@example.com</saml:NameID>',
    '      <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">',
    '        <saml:SubjectConfirmationData NotOnOrAfter="2026-03-01T13:00:05Z" Recipient="https://app.example.com/saml/acs" InResponseTo="_a1b2c3d4e5"/>',
    '      </saml:SubjectConfirmation>',
    '    </saml:Subject>',
    '    <saml:Conditions NotBefore="2026-03-01T11:55:05Z" NotOnOrAfter="2026-03-01T13:00:05Z">',
    '      <saml:AudienceRestriction>',
    '        <saml:Audience>https://app.example.com</saml:Audience>',
    '      </saml:AudienceRestriction>',
    '    </saml:Conditions>',
    '    <saml:AuthnStatement AuthnInstant="2026-03-01T12:00:05Z" SessionIndex="_session123">',
    '      <saml:AuthnContext>',
    '        <saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml:AuthnContextClassRef>',
    '      </saml:AuthnContext>',
    '    </saml:AuthnStatement>',
    '    <saml:AttributeStatement>',
    '      <saml:Attribute Name="email" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">',
    '        <saml:AttributeValue>user@example.com</saml:AttributeValue>',
    '      </saml:Attribute>',
    '      <saml:Attribute Name="firstName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">',
    '        <saml:AttributeValue>Alex</saml:AttributeValue>',
    '      </saml:Attribute>',
    '    </saml:AttributeStatement>',
    '  </saml:Assertion>',
    '</samlp:Response>'
  ].join('\n');

  var SAMPLE_LOGOUT_XML = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<samlp:LogoutRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"',
    '  xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"',
    '  ID="_logout1" Version="2.0" IssueInstant="2026-03-01T18:00:00Z"',
    '  Destination="https://idp.example.com/slo/saml">',
    '  <saml:Issuer>https://app.example.com</saml:Issuer>',
    '  <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">user@example.com</saml:NameID>',
    '</samlp:LogoutRequest>'
  ].join('\n');

  var app = document.getElementById('saml-decoder-app');
  if (!app) return;

  var defaultMode = app.getAttribute('data-default-mode') || 'request';
  var eventCategory = app.getAttribute('data-event-category') || 'SAML Decoder';

  var inputEl = document.getElementById('saml-input');
  var detectedEl = document.getElementById('saml-detected');
  var decodePathEl = document.getElementById('saml-decode-path');
  var parseStatus = document.getElementById('saml-parse-status');
  var resultsSection = document.getElementById('saml-results-section');
  var summaryEl = document.getElementById('saml-summary');
  var detailsEl = document.getElementById('saml-details');
  var certCard = document.getElementById('saml-cert-card');
  var xmlOut = document.getElementById('saml-xml-output');
  var sampleBtn = document.getElementById('saml-sample-btn');
  var pasteBtn = document.getElementById('saml-paste-btn');
  var clearBtn = document.getElementById('saml-clear-btn');
  var copyXmlBtn = document.getElementById('saml-copy-xml');
  var downloadXmlBtn = document.getElementById('saml-download-xml');
  var fileInput = document.getElementById('saml-file');
  var tabBtns = app.querySelectorAll('.sd-tab-btn');
  var viewBtns = app.querySelectorAll('.sd-view-btn');
  var decodePanel = document.getElementById('saml-decode-panel');
  var encodePanel = document.getElementById('saml-encode-panel');
  var encodeInput = document.getElementById('saml-encode-input');
  var encodeDetected = document.getElementById('saml-encode-detected');
  var encodeStatus = document.getElementById('saml-encode-status');
  var encodeFromDecodeBtn = document.getElementById('saml-encode-from-decode');
  var encodeClearBtn = document.getElementById('saml-encode-clear');
  var encodePostOut = document.getElementById('saml-encode-post');
  var encodeRedirectOut = document.getElementById('saml-encode-redirect');

  var lastXml = '';
  var lastFormattedXml = '';
  var lastRelayState = '';
  var parseTimer = null;
  var encodeTimer = null;

  function track(action, label) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: eventCategory,
        event_label: label
      });
    }
  }

  function setStatus(type, message, target) {
    var node = target || parseStatus;
    if (!node) return;
    node.className = 'parse-status visible ' + type;
    node.innerHTML = '<i class="fas fa-' + (type === 'error' ? 'exclamation-circle' : 'info-circle') + '"></i> ' + escapeHtmlText(message);
  }

  function clearStatus(target) {
    var node = target || parseStatus;
    if (!node) return;
    node.className = 'parse-status';
    node.textContent = '';
  }

  function setDetected(node, text, state) {
    if (!node) return;
    node.textContent = text;
    node.className = 'sd-detected' + (state ? ' is-' + state : '');
  }

  function normalizeBase64(str) {
    var s = str.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return s;
  }

  function base64ToBytes(b64) {
    var bin = atob(b64);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function bytesToText(bytes) {
    return new TextDecoder('utf-8').decode(bytes);
  }

  function textToBytes(text) {
    return new TextEncoder().encode(text);
  }

  function bytesToBase64(bytes) {
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function isLikelyXml(str) {
    var t = str.trim();
    return t.indexOf('<') === 0 || t.indexOf('<?xml') === 0;
  }

  function extractQueryParam(raw, names) {
    var relayState = '';
    var payload = '';
    var i;
    var text = raw.trim();
    if (!text) return { payload: '', relayState: '', param: '' };

    try {
      if (/^https?:\/\//i.test(text)) {
        var u = new URL(text);
        for (i = 0; i < names.length; i++) {
          if (u.searchParams.has(names[i])) {
            payload = u.searchParams.get(names[i]) || '';
            relayState = u.searchParams.get('RelayState') || '';
            return { payload: payload, relayState: relayState, param: names[i] };
          }
        }
        text = u.search || text;
      }
    } catch (e) {
      /* not a URL */
    }

    if (text.indexOf('?') !== -1) {
      text = text.split('?').pop();
    }

    var parts = text.split('&');
    for (i = 0; i < parts.length; i++) {
      var kv = parts[i].split('=');
      if (kv.length < 2) continue;
      var key = decodeURIComponent(kv[0].replace(/\+/g, '%20'));
      var val = kv.slice(1).join('=');
      if (names.indexOf(key) !== -1) {
        payload = val;
      }
      if (key === 'RelayState') relayState = val;
    }

    var foundParam = '';
    for (i = 0; i < names.length; i++) {
      var re = new RegExp('(?:^|&)' + names[i] + '=([^&]*)');
      var m = text.match(re);
      if (m) {
        payload = m[1];
        foundParam = names[i];
        break;
      }
    }
    var rs = text.match(/(?:^|&)RelayState=([^&]*)/);
    if (rs) relayState = rs[1];

    return { payload: payload, relayState: relayState, param: foundParam };
  }

  function tryParseXml(xml) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xml, 'application/xml');
    if (doc.getElementsByTagName('parsererror').length) {
      return null;
    }
    return doc;
  }

  function inflateRaw(bytes) {
    if (typeof DecompressionStream === 'undefined') {
      return Promise.reject(new Error('DEFLATE is not supported in this browser'));
    }
    var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Response(stream).arrayBuffer().then(function (buf) {
      return new Uint8Array(buf);
    });
  }

  function deflateRaw(bytes) {
    if (typeof CompressionStream === 'undefined') {
      return Promise.reject(new Error('DEFLATE is not supported in this browser'));
    }
    var stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
    return new Response(stream).arrayBuffer().then(function (buf) {
      return new Uint8Array(buf);
    });
  }

  var FORMAT_LINE_LIMIT = 100;

  function escapeXmlAttr(v) {
    return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

  function escapeXmlText(v) {
    return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function formatOpenTag(node, indent) {
    var attrs = Array.prototype.map.call(node.attributes, function (a) {
      return a.name + '="' + escapeXmlAttr(a.value) + '"';
    });
    var oneLine = indent + '<' + node.nodeName + (attrs.length ? ' ' + attrs.join(' ') : '');
    if (attrs.length < 2 || oneLine.length <= FORMAT_LINE_LIMIT) return oneLine;
    var attrIndent = indent + new Array(node.nodeName.length + 3).join(' ');
    return indent + '<' + node.nodeName + ' ' + attrs[0] + attrs.slice(1).map(function (a) {
      return '\n' + attrIndent + a;
    }).join('');
  }

  function formatNode(node, depth, out) {
    var indent = new Array(depth + 1).join('  ');
    var children = Array.prototype.filter.call(node.childNodes, function (c) {
      if (c.nodeType === 3) return c.nodeValue.trim() !== '';
      return c.nodeType === 1 || c.nodeType === 4 || c.nodeType === 8;
    });
    var open = formatOpenTag(node, indent);
    var close = '</' + node.nodeName + '>';

    if (!children.length) {
      out.push(open + '/>');
      return;
    }
    if (children.length === 1 && (children[0].nodeType === 3 || children[0].nodeType === 4)) {
      var only = children[0];
      var inner = only.nodeType === 4 ? '<![CDATA[' + only.nodeValue + ']]>' : escapeXmlText(only.nodeValue.trim());
      out.push(open + '>' + inner + close);
      return;
    }
    out.push(open + '>');
    children.forEach(function (c) {
      var childIndent = indent + '  ';
      if (c.nodeType === 1) formatNode(c, depth + 1, out);
      else if (c.nodeType === 8) out.push(childIndent + '<!--' + c.nodeValue + '-->');
      else if (c.nodeType === 4) out.push(childIndent + '<![CDATA[' + c.nodeValue + ']]>');
      else out.push(childIndent + escapeXmlText(c.nodeValue.trim()));
    });
    out.push(indent + close);
  }

  function formatXml(xml) {
    var doc = tryParseXml(xml);
    if (!doc) return xml.trim();
    var out = [];
    var decl = xml.trim().match(/^<\?xml[^?]*\?>/);
    if (decl) out.push(decl[0]);
    formatNode(doc.documentElement, 0, out);
    return out.join('\n');
  }

  function findTagEnd(html, from) {
    var quote = null;
    for (var i = from + 1; i < html.length; i++) {
      var c = html.charAt(i);
      if (quote) {
        if (c === quote) quote = null;
      } else if (c === '"' || c === "'") {
        quote = c;
      } else if (c === '>') {
        return i;
      }
    }
    return html.length - 1;
  }

  function escapeHtmlText(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function xmlSpan(cls, value) {
    return '<span class="sd-xml-' + cls + '">' + escapeHtmlText(value) + '</span>';
  }

  function highlightXmlAttrs(raw) {
    var out = '';
    var re = /([^\s=]+)(?:(\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?|\s+/g;
    var m;
    while ((m = re.exec(raw))) {
      if (m[0].charAt(0) && /^\s+$/.test(m[0])) {
        out += escapeHtmlText(m[0]);
        continue;
      }
      if (!m[1]) {
        out += escapeHtmlText(m[0]);
        continue;
      }
      out += xmlSpan('attr', m[1]);
      if (m[2]) {
        out += xmlSpan('punct', m[2]);
        if (m[3] != null) out += xmlSpan('string', '"' + m[3] + '"');
        else if (m[4] != null) out += xmlSpan('string', "'" + m[4] + "'");
        else if (m[5] != null) out += xmlSpan('string', m[5]);
      }
    }
    return out;
  }

  function highlightXmlTag(tag) {
    var end = tag.charAt(tag.length - 1) === '>' ? '>' : '';
    var inner = end ? tag.slice(1, -1) : tag.slice(1);
    var selfClose = /\/\s*$/.test(inner);
    if (selfClose) inner = inner.replace(/\/\s*$/, '');
    var close = inner.charAt(0) === '/';
    if (close) inner = inner.slice(1);
    var trimmed = inner.replace(/^\s+/, '');
    var leadSpace = inner.slice(0, inner.length - trimmed.length);
    var nameMatch = trimmed.match(/^[^\s]+/);
    var name = nameMatch ? nameMatch[0] : '';
    var rest = trimmed.slice(name.length);
    var isDecl = name.charAt(0) === '!' || name.charAt(0) === '?';
    var html = xmlSpan('punct', '<');
    if (close) html += xmlSpan('punct', '/');
    html += escapeHtmlText(leadSpace);
    if (isDecl) {
      html += xmlSpan('decl', name + rest);
    } else {
      html += xmlSpan('name', name) + highlightXmlAttrs(rest);
    }
    if (selfClose) html += xmlSpan('punct', '/');
    if (end) html += xmlSpan('punct', '>');
    return html;
  }

  function highlightXml(src) {
    var out = '';
    var i = 0;
    var len = src.length;
    while (i < len) {
      if (src.substr(i, 4) === '<!--') {
        var cEnd = src.indexOf('-->', i + 4);
        if (cEnd === -1) {
          out += xmlSpan('comment', src.slice(i));
          break;
        }
        out += xmlSpan('comment', src.slice(i, cEnd + 3));
        i = cEnd + 3;
        continue;
      }
      if (src.charAt(i) === '<') {
        var tagEnd = findTagEnd(src, i);
        out += highlightXmlTag(src.slice(i, tagEnd + 1));
        i = tagEnd + 1;
        continue;
      }
      var textStart = i;
      while (i < len && src.charAt(i) !== '<') i++;
      out += xmlSpan('text', src.slice(textStart, i));
    }
    return out;
  }

  function setFormattedXmlOutput(formatted) {
    lastFormattedXml = formatted;
    if (!xmlOut) return;
    xmlOut.innerHTML = highlightXml(formatted);
  }

  function decodeInput(raw) {
    var steps = [];
    var text = raw.trim();
    if (!text) {
      return Promise.reject(new Error('Paste a SAML payload or XML'));
    }

    var relayState = '';
    var payloadText = text;

    if (!isLikelyXml(text)) {
      var extracted = extractQueryParam(text, ['SAMLRequest', 'SAMLResponse', 'SAMLLogoutRequest', 'SAMLLogoutResponse']);
      if (extracted.payload) {
        payloadText = extracted.payload;
        relayState = extracted.relayState;
        steps.push('URL query extracted (' + extracted.param + ')');
      }
    }

    if (payloadText.indexOf('%') !== -1) {
      try {
        payloadText = decodeURIComponent(payloadText.replace(/\+/g, '%20'));
        steps.push('URL decoded');
      } catch (e) {
        /* keep as-is */
      }
    }

    if (isLikelyXml(payloadText)) {
      steps.push('Raw XML');
      return Promise.resolve({ xml: payloadText, steps: steps, relayState: relayState });
    }

    var b64 = normalizeBase64(payloadText);
    var bytes;
    try {
      bytes = base64ToBytes(b64);
      steps.push('Base64 decoded');
    } catch (e) {
      return Promise.reject(new Error('Invalid Base64. Paste XML, Base64, or a redirect URL with SAMLRequest/SAMLResponse.'));
    }

    var asText = bytesToText(bytes);
    if (tryParseXml(asText)) {
      return Promise.resolve({ xml: asText, steps: steps, relayState: relayState });
    }

    return inflateRaw(bytes)
      .then(function (inflated) {
        steps.push('DEFLATE inflated (HTTP-Redirect)');
        var xml = bytesToText(inflated);
        if (!tryParseXml(xml)) {
          throw new Error('Decoded bytes are not valid SAML XML');
        }
        return { xml: xml, steps: steps, relayState: relayState };
      })
      .catch(function () {
        if (tryParseXml(asText)) {
          return { xml: asText, steps: steps, relayState: relayState };
        }
        return Promise.reject(new Error('Could not decode SAML. Tried Base64 and DEFLATE. Paste pretty-printed XML to inspect.'));
      });
  }

  function firstByLocalName(root, local) {
    var all = root.getElementsByTagName('*');
    var i;
    for (i = 0; i < all.length; i++) {
      if (all[i].localName === local) return all[i];
    }
    return null;
  }

  function textIn(parent, ns, local) {
    if (!parent) return '';
    var nodes = parent.getElementsByTagNameNS(ns, local);
    return nodes.length ? (nodes[0].textContent || '').trim() : '';
  }

  function attrVal(el, name) {
    return el && el.getAttribute ? (el.getAttribute(name) || '') : '';
  }

  function statusLabel(statusValue) {
    if (!statusValue) return 'Unknown';
    if (statusValue.indexOf('Success') !== -1) return 'Success';
    var parts = statusValue.split(':');
    return parts[parts.length - 1] || statusValue;
  }

  function parseConditions(conditionsEl) {
    if (!conditionsEl) return null;
    return {
      notBefore: attrVal(conditionsEl, 'NotBefore'),
      notOnOrAfter: attrVal(conditionsEl, 'NotOnOrAfter'),
      audiences: Array.prototype.map.call(conditionsEl.getElementsByTagNameNS(NS_ASSERTION, 'Audience'), function (n) {
        return (n.textContent || '').trim();
      })
    };
  }

  function conditionsBadge(notBefore, notOnOrAfter) {
    if (!notBefore && !notOnOrAfter) return { cls: '', label: '' };
    var now = Date.now();
    var nb = notBefore ? Date.parse(notBefore) : null;
    var na = notOnOrAfter ? Date.parse(notOnOrAfter) : null;
    if (na && now > na) return { cls: 'expired', label: 'Expired' };
    if (nb && now < nb) return { cls: 'not-yet', label: 'Not yet valid' };
    return { cls: 'valid', label: 'Active' };
  }

  function extractAttributes(assertionEl) {
    var rows = [];
    var attrs = assertionEl.getElementsByTagNameNS(NS_ASSERTION, 'Attribute');
    var i;
    var j;
    for (i = 0; i < attrs.length; i++) {
      var name = attrVal(attrs[i], 'Name') || attrVal(attrs[i], 'FriendlyName');
      var values = attrs[i].getElementsByTagNameNS(NS_ASSERTION, 'AttributeValue');
      var vals = [];
      for (j = 0; j < values.length; j++) {
        vals.push((values[j].textContent || '').trim());
      }
      rows.push({ name: name, values: vals.join(', ') });
    }
    return rows;
  }

  function findX509Certificate(doc) {
    var nodes = doc.getElementsByTagNameNS(NS_DS, 'X509Certificate');
    if (!nodes.length) {
      nodes = doc.getElementsByTagName('X509Certificate');
    }
    if (!nodes.length) return null;
    var body = (nodes[0].textContent || '').replace(/\s+/g, '');
    if (!body) return null;
    var pem = '-----BEGIN CERTIFICATE-----\n' + body.match(/.{1,64}/g).join('\n') + '\n-----END CERTIFICATE-----';
    return { body: body, pem: pem };
  }

  function sha256FingerprintHex(derBytes) {
    return crypto.subtle.digest('SHA-256', derBytes).then(function (buf) {
      var arr = new Uint8Array(buf);
      var parts = [];
      for (var i = 0; i < arr.length; i++) {
        parts.push(arr[i].toString(16).padStart(2, '0'));
      }
      return parts.join(':').toUpperCase();
    });
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function appendField(grid, label, value) {
    grid.appendChild(el('span', 'field-label', label));
    var val = el('span', 'field-value mono');
    val.textContent = value || '—';
    grid.appendChild(val);
  }

  function buildSummaryCard(info) {
    summaryEl.innerHTML = '';
    var card = el('div', 'cert-card');
    var header = el('div', 'cert-card-header');
    var title = el('div', 'cert-card-title');
    title.appendChild(el('p', 'cert-position', 'SAML message'));
    title.appendChild(el('h3', 'cert-cn', info.messageType || 'Unknown'));
    header.appendChild(title);

    if (info.statusClass) {
      var badge = el('span', 'validity-badge ' + info.statusClass, info.statusLabel);
      header.appendChild(badge);
    } else if (info.condBadge && info.condBadge.label) {
      var cb = el('span', 'validity-badge ' + info.condBadge.cls, info.condBadge.label);
      header.appendChild(cb);
    }

    card.appendChild(header);

    var body = el('div', 'cert-card-body');
    var group = el('div', 'field-group');
    group.appendChild(el('h4', 'field-group-title', 'Summary'));
    var grid = el('div', 'field-grid');
    ['messageType', 'id', 'version', 'issueInstant', 'destination', 'issuer', 'inResponseTo', 'relayState'].forEach(function (key) {
      if (!info[key]) return;
      var labelMap = {
        messageType: 'Type',
        id: 'ID',
        version: 'Version',
        issueInstant: 'IssueInstant',
        destination: 'Destination',
        issuer: 'Issuer',
        inResponseTo: 'InResponseTo',
        relayState: 'RelayState'
      };
      appendField(grid, labelMap[key], info[key]);
    });
    group.appendChild(grid);
    body.appendChild(group);
    card.appendChild(body);
    summaryEl.appendChild(card);
  }

  function buildDetailsSections(sections) {
    detailsEl.innerHTML = '';
    sections.forEach(function (sec) {
      var card = el('div', 'cert-card');
      var body = el('div', 'cert-card-body');
      var group = el('div', 'field-group');
      group.appendChild(el('h4', 'field-group-title', sec.title));
      if (sec.rows && sec.rows.length) {
        var table = el('table', 'extensions-table');
        var thead = el('thead');
        var hr = el('tr');
        hr.appendChild(el('th', '', 'Field'));
        hr.appendChild(el('th', '', 'Value'));
        thead.appendChild(hr);
        table.appendChild(thead);
        var tbody = el('tbody');
        sec.rows.forEach(function (row) {
          var tr = el('tr');
          tr.appendChild(el('td', '', row[0]));
          tr.appendChild(el('td', 'field-value mono', row[1]));
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        group.appendChild(table);
      }
      if (sec.html) {
        group.innerHTML += sec.html;
      }
      body.appendChild(group);
      card.appendChild(body);
      detailsEl.appendChild(card);
    });
  }

  function analyzeXml(xml, relayState) {
    var doc = tryParseXml(xml);
    if (!doc) throw new Error('Invalid SAML XML');

    var root = doc.documentElement;
    var messageType = root.localName || root.nodeName;
    var info = {
      messageType: messageType,
      id: attrVal(root, 'ID'),
      version: attrVal(root, 'Version'),
      issueInstant: attrVal(root, 'IssueInstant'),
      destination: attrVal(root, 'Destination'),
      issuer: textIn(root, NS_ASSERTION, 'Issuer'),
      inResponseTo: attrVal(root, 'InResponseTo'),
      relayState: relayState ? decodeURIComponent(relayState.replace(/\+/g, '%20')) : ''
    };

    var sections = [];

    if (messageType === 'AuthnRequest') {
      sections.push({
        title: 'AuthnRequest',
        rows: [
          ['AssertionConsumerServiceURL', attrVal(root, 'AssertionConsumerServiceURL')],
          ['ProtocolBinding', attrVal(root, 'ProtocolBinding')],
          ['ForceAuthn', attrVal(root, 'ForceAuthn')],
          ['IsPassive', attrVal(root, 'IsPassive')]
        ]
      });
      var nip = root.getElementsByTagNameNS(NS_PROTOCOL, 'NameIDPolicy')[0] || firstByLocalName(root, 'NameIDPolicy');
      if (nip) {
        sections.push({
          title: 'NameIDPolicy',
          rows: [
            ['Format', attrVal(nip, 'Format')],
            ['AllowCreate', attrVal(nip, 'AllowCreate')]
          ]
        });
      }
      var rac = root.getElementsByTagNameNS(NS_PROTOCOL, 'RequestedAuthnContext')[0];
      if (rac) {
        var refs = rac.getElementsByTagNameNS(NS_ASSERTION, 'AuthnContextClassRef');
        var list = [];
        for (var i = 0; i < refs.length; i++) list.push((refs[i].textContent || '').trim());
        sections.push({
          title: 'RequestedAuthnContext',
          rows: [
            ['Comparison', attrVal(rac, 'Comparison')],
            ['ClassRef', list.join(', ')]
          ]
        });
      }
    }

    if (messageType === 'LogoutRequest' || messageType === 'LogoutResponse') {
      var nid = root.getElementsByTagNameNS(NS_ASSERTION, 'NameID')[0];
      if (nid) {
        sections.push({
          title: 'NameID',
          rows: [
            ['Format', attrVal(nid, 'Format')],
            ['Value', (nid.textContent || '').trim()]
          ]
        });
      }
    }

    if (messageType === 'Response') {
      var statusCodeEl = root.getElementsByTagNameNS(NS_PROTOCOL, 'StatusCode')[0];
      var statusVal = statusCodeEl ? attrVal(statusCodeEl, 'Value') : '';
      var sl = statusLabel(statusVal);
      info.statusLabel = sl;
      info.statusClass = sl === 'Success' ? 'valid' : 'expired';
      sections.push({
        title: 'Status',
        rows: [['StatusCode', statusVal], ['Label', sl]]
      });

      var assertion = root.getElementsByTagNameNS(NS_ASSERTION, 'Assertion')[0] || firstByLocalName(root, 'Assertion');
      if (assertion) {
        var subject = assertion.getElementsByTagNameNS(NS_ASSERTION, 'Subject')[0];
        var nameId = subject ? subject.getElementsByTagNameNS(NS_ASSERTION, 'NameID')[0] : null;
        if (nameId) {
          sections.push({
            title: 'Subject',
            rows: [
              ['NameID Format', attrVal(nameId, 'Format')],
              ['NameID', (nameId.textContent || '').trim()]
            ]
          });
        }
        var cond = assertion.getElementsByTagNameNS(NS_ASSERTION, 'Conditions')[0];
        var parsed = parseConditions(cond);
        if (parsed) {
          info.condBadge = conditionsBadge(parsed.notBefore, parsed.notOnOrAfter);
          sections.push({
            title: 'Conditions',
            rows: [
              ['NotBefore', parsed.notBefore],
              ['NotOnOrAfter', parsed.notOnOrAfter],
              ['Audience', parsed.audiences.join(', ')]
            ]
          });
        }
        var authn = assertion.getElementsByTagNameNS(NS_ASSERTION, 'AuthnStatement')[0];
        if (authn) {
          var acr = textIn(authn, NS_ASSERTION, 'AuthnContextClassRef');
          sections.push({
            title: 'AuthnStatement',
            rows: [
              ['AuthnInstant', attrVal(authn, 'AuthnInstant')],
              ['SessionIndex', attrVal(authn, 'SessionIndex')],
              ['AuthnContextClassRef', acr]
            ]
          });
        }
        var attrRows = extractAttributes(assertion);
        if (attrRows.length) {
          var html = '<table class="extensions-table"><thead><tr><th>Attribute</th><th>Value</th></tr></thead><tbody>';
          attrRows.forEach(function (r) {
            html += '<tr><td>' + escapeHtml(r.name) + '</td><td class="field-value mono">' + escapeHtml(r.values) + '</td></tr>';
          });
          html += '</tbody></table>';
          sections.push({ title: 'AttributeStatement', html: html });
        }
      }
    }

    return { doc: doc, info: info, sections: sections };
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderCertCard(doc) {
    if (!certCard) return;
    certCard.innerHTML = '';
    var cert = findX509Certificate(doc);
    if (!cert) {
      certCard.style.display = 'none';
      return;
    }
    certCard.style.display = 'block';
    var card = el('div', 'cert-card');
    var body = el('div', 'cert-card-body');
    var group = el('div', 'field-group');
    group.appendChild(el('h4', 'field-group-title', 'Embedded X.509 certificate'));
    var fpEl = el('p', 'field-value mono', 'Computing SHA-256 fingerprint…');
    group.appendChild(fpEl);
    var pemPre = el('div', 'sd-pem-block', cert.pem);
    group.appendChild(pemPre);
    var link = el('a', 'sd-ssl-link', 'Open SSL/TLS Certificate Decoder');
    link.href = '/tools/ssl-certificate-decoder/';
    link.target = '_blank';
    group.appendChild(link);
    body.appendChild(group);
    card.appendChild(body);
    certCard.appendChild(card);

    try {
      var der = base64ToBytes(normalizeBase64(cert.body));
      sha256FingerprintHex(der).then(function (fp) {
        fpEl.textContent = 'SHA-256: ' + fp;
      });
    } catch (e) {
      fpEl.textContent = 'Could not compute fingerprint';
    }
  }

  function describeDecode(steps) {
    var joined = steps.join('|');
    var param = '';
    var m = joined.match(/URL query extracted \(([^)]+)\)/);
    if (m) param = m[1];
    var binding;
    if (joined.indexOf('DEFLATE') !== -1) binding = 'HTTP-Redirect (DEFLATE + Base64)';
    else if (joined.indexOf('Base64') !== -1) binding = 'HTTP-POST (Base64)';
    else binding = 'Plain XML';

    var path = steps.map(function (s) {
      if (s.indexOf('URL query extracted') === 0) return 'pulled ' + (param || 'SAML') + ' from the URL';
      if (s === 'URL decoded') return 'URL decoded';
      if (s === 'Base64 decoded') return 'Base64 decoded';
      if (s.indexOf('DEFLATE') === 0) return 'inflated (DEFLATE)';
      return '';
    }).filter(Boolean);

    var sentence = path.length
      ? 'Steps applied: ' + path.join(', then ') + '.'
      : 'Input was already XML, so it was only parsed and formatted.';

    return {
      label: (param ? param + ' · ' : '') + binding,
      sentence: sentence
    };
  }

  function resetResults() {
    if (resultsSection) resultsSection.style.display = 'none';
    lastXml = '';
    lastFormattedXml = '';
    if (xmlOut) xmlOut.innerHTML = '';
  }

  function runParse() {
    clearStatus();
    var raw = inputEl ? inputEl.value : '';
    if (!raw.trim()) {
      resetResults();
      setDetected(detectedEl, 'Waiting for input');
      return;
    }

    decodeInput(raw)
      .then(function (decoded) {
        lastXml = decoded.xml;
        lastRelayState = decoded.relayState || '';
        var desc = describeDecode(decoded.steps);
        setDetected(detectedEl, 'Detected: ' + desc.label, 'ok');
        if (decodePathEl) decodePathEl.textContent = desc.sentence;
        var formatted = formatXml(decoded.xml);
        setFormattedXmlOutput(formatted);
        var analyzed = analyzeXml(decoded.xml, decoded.relayState);
        buildSummaryCard(analyzed.info);
        buildDetailsSections(analyzed.sections);
        renderCertCard(analyzed.doc);
        if (resultsSection) resultsSection.style.display = 'block';
        track('decode', analyzed.info.messageType);
      })
      .catch(function (err) {
        resetResults();
        setDetected(detectedEl, 'Could not decode', 'error');
        setStatus('error', err.message || String(err));
      });
  }

  function scheduleParse() {
    if (parseTimer) clearTimeout(parseTimer);
    parseTimer = setTimeout(runParse, 250);
  }

  function setInput(value) {
    if (!inputEl) return;
    inputEl.value = value;
    inputEl.scrollTop = 0;
    scheduleParse();
  }

  function loadSample(kind) {
    if (kind === 'response') setInput(SAMPLE_RESPONSE_XML);
    else if (kind === 'logout') setInput(SAMPLE_LOGOUT_XML);
    else setInput(SAMPLE_REQUEST_XML);
    track('sample', kind);
  }

  function copyText(text, btn, label) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      if (btn) {
        var orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(function () { btn.innerHTML = orig; }, 1500);
      }
      track('copy', label || 'xml');
    });
  }

  function resetEncodeOutputs(message) {
    if (encodePostOut) encodePostOut.textContent = message;
    if (encodeRedirectOut) encodeRedirectOut.textContent = message;
  }

  function runEncode() {
    clearStatus(encodeStatus);
    var xml = encodeInput ? encodeInput.value.trim() : '';
    if (!xml) {
      setDetected(encodeDetected, 'Waiting for XML');
      resetEncodeOutputs('Paste XML above');
      return;
    }
    var doc = tryParseXml(xml);
    if (!doc) {
      setDetected(encodeDetected, 'Invalid XML', 'error');
      setStatus('error', 'This is not well-formed XML yet. Check for unclosed tags or stray characters.', encodeStatus);
      resetEncodeOutputs('Fix the XML to see output');
      return;
    }
    var rootName = doc.documentElement.localName || 'XML';
    var param = /Response$/.test(rootName) ? 'SAMLResponse' : 'SAMLRequest';
    setDetected(encodeDetected, rootName + ' · sent as ' + param, 'ok');

    var bytes = textToBytes(xml);
    if (encodePostOut) encodePostOut.textContent = bytesToBase64(bytes);
    deflateRaw(bytes)
      .then(function (deflated) {
        if (encodeRedirectOut) {
          encodeRedirectOut.textContent = param + '=' + encodeURIComponent(bytesToBase64(deflated));
        }
        track('encode', rootName);
      })
      .catch(function (err) {
        if (encodeRedirectOut) encodeRedirectOut.textContent = 'DEFLATE unavailable in this browser: ' + (err.message || err);
      });
  }

  function scheduleEncode() {
    if (encodeTimer) clearTimeout(encodeTimer);
    encodeTimer = setTimeout(runEncode, 250);
  }

  function setEncodeInput(value) {
    if (!encodeInput) return;
    encodeInput.value = value;
    encodeInput.scrollTop = 0;
    runEncode();
  }

  function setActiveTab(mode) {
    tabBtns.forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === mode;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (decodePanel) decodePanel.classList.toggle('hidden', mode !== 'decode');
    if (encodePanel) encodePanel.classList.toggle('hidden', mode !== 'encode');
    if (mode === 'encode' && encodeInput && !encodeInput.value.trim() && lastFormattedXml) {
      setEncodeInput(lastFormattedXml);
    }
  }

  function setActiveView(view) {
    viewBtns.forEach(function (btn) {
      var on = btn.getAttribute('data-view') === view;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var summaryView = document.getElementById('saml-view-summary');
    var xmlView = document.getElementById('saml-view-xml');
    if (summaryView) summaryView.classList.toggle('hidden', view !== 'summary');
    if (xmlView) xmlView.classList.toggle('hidden', view !== 'xml');
  }

  function readFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      setInput(String(reader.result || ''));
      track('file', file.name);
    };
    reader.readAsText(file);
  }

  if (inputEl) inputEl.addEventListener('input', scheduleParse);
  if (encodeInput) encodeInput.addEventListener('input', scheduleEncode);

  if (sampleBtn) {
    sampleBtn.addEventListener('click', function () {
      loadSample(defaultMode === 'response' ? 'response' : 'request');
    });
  }

  if (pasteBtn) {
    pasteBtn.addEventListener('click', function () {
      navigator.clipboard.readText().then(function (t) {
        setInput(t);
        track('paste', 'clipboard');
      }).catch(function () {
        if (inputEl) inputEl.focus();
        setStatus('info', 'Clipboard access was blocked. Press Ctrl+V or Cmd+V in the editor instead.');
      });
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      setInput('');
      if (inputEl) inputEl.focus();
      track('clear', 'input');
    });
  }

  if (copyXmlBtn) {
    copyXmlBtn.addEventListener('click', function () {
      copyText(lastFormattedXml || lastXml, copyXmlBtn, 'xml');
    });
  }

  if (downloadXmlBtn) {
    downloadXmlBtn.addEventListener('click', function () {
      if (!lastXml) return;
      var blob = new Blob([lastFormattedXml || lastXml], { type: 'application/xml' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'saml-decoded.xml';
      a.click();
      URL.revokeObjectURL(a.href);
      track('download', 'xml');
    });
  }

  if (fileInput) {
    var fileBtn = document.getElementById('saml-file-btn');
    if (fileBtn) fileBtn.addEventListener('click', function () { fileInput.click(); });
    fileInput.addEventListener('change', function () {
      if (fileInput.files[0]) readFile(fileInput.files[0]);
      fileInput.value = '';
    });
  }

  if (inputEl) {
    inputEl.addEventListener('dragover', function (e) {
      e.preventDefault();
      inputEl.classList.add('is-drop');
    });
    inputEl.addEventListener('dragleave', function () {
      inputEl.classList.remove('is-drop');
    });
    inputEl.addEventListener('drop', function (e) {
      if (!e.dataTransfer.files.length) return;
      e.preventDefault();
      inputEl.classList.remove('is-drop');
      var f = e.dataTransfer.files[0];
      if (f) readFile(f);
    });
  }

  if (encodeFromDecodeBtn) {
    encodeFromDecodeBtn.addEventListener('click', function () {
      if (lastFormattedXml) {
        setEncodeInput(lastFormattedXml);
      } else {
        setStatus('info', 'Nothing decoded yet. Decode a payload first, or paste XML here.', encodeStatus);
      }
    });
  }

  if (encodeClearBtn) {
    encodeClearBtn.addEventListener('click', function () {
      setEncodeInput('');
      if (encodeInput) encodeInput.focus();
    });
  }

  app.querySelectorAll('[data-copy-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-copy-target'));
      if (!target || !encodeInput || !encodeInput.value.trim()) return;
      copyText(target.textContent, btn, btn.getAttribute('data-copy-target'));
    });
  });

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setActiveTab(btn.getAttribute('data-tab'));
    });
  });

  viewBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setActiveView(btn.getAttribute('data-view'));
    });
  });

  setActiveTab('decode');
  setActiveView('summary');
  loadSample(defaultMode === 'response' ? 'response' : 'request');
})();
