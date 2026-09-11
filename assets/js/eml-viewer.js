/* ==========================================================================
 * EML File Viewer - pure JavaScript, no dependencies.
 *
 * Parses RFC 5322 / MIME messages (.eml, "view original") and shows headers,
 * the MIME tree, decoded bodies, and attachments. Everything stays in the
 * browser. The file is never uploaded.
 * ========================================================================== */
(function () {
  'use strict';

  var MAX_BYTES = 12 * 1024 * 1024;
  var EMAIL_RE = /[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/gi;
  var SECRET_HEADERS = {
    authorization: true,
    cookie: true,
    'set-cookie': true,
    'x-api-key': true,
    'x-auth-token': true,
    'x-amz-security-token': true
  };

  function track(action, label, value) {
    if (typeof gtag === 'function') {
      try {
        gtag('event', action, {
          event_category: 'EML File Viewer',
          event_label: label,
          value: value
        });
      } catch (e) { /* ignore */ }
    }
  }

  var $ = function (id) { return document.getElementById(id); };

  var loaderSection = $('loader-section');
  var fileInput = $('eml-file');
  var fileDropZone = $('file-drop-zone');
  var pasteArea = $('eml-paste');
  var pasteLoadBtn = $('paste-load-btn');
  var pasteClearBtn = $('paste-clear-btn');
  var sampleLoadBtn = $('sample-load-btn');
  var loaderError = $('loader-error');
  var loaderErrorText = $('loader-error-text');

  var viewerSection = $('viewer-section');
  var metaSource = $('meta-source');
  var metaSize = $('meta-size');
  var metaParts = $('meta-parts');
  var redactToggle = $('redact-toggle');
  var remoteToggle = $('remote-images-toggle');
  var closeBtn = $('close-btn');

  var sumSubject = $('sum-subject');
  var sumFrom = $('sum-from');
  var sumDate = $('sum-date');
  var sumTo = $('sum-to');
  var authChips = $('auth-chips');
  var hopsList = $('hops-list');

  var detailBody = $('detail-body');
  var copyRawBtn = $('copy-raw-btn');

  var state = {
    raw: '',
    sourceName: '',
    root: null,
    flat: [],
    selectedId: '0',
    detailTab: 'overview',
    redact: false,
    loadRemote: false,
    bodyView: 'plain'
  };

  /* ---------- helpers --------------------------------------------------- */

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatBytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(n < 10 * 1024 ? 1 : 0) + ' KB';
    return (n / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function bytesFromBinaryString(s) {
    var u = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 0xff;
    return u;
  }

  function arrayBufferToBinaryString(buf) {
    var u8 = new Uint8Array(buf);
    var chunk = 0x8000;
    var out = '';
    for (var i = 0; i < u8.length; i += chunk) {
      out += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
    }
    return out;
  }

  function decodeCharset(bytes, charset) {
    var cs = String(charset || 'utf-8').replace(/['"]/g, '').toLowerCase();
    var map = {
      'utf-8': 'utf-8',
      utf8: 'utf-8',
      'us-ascii': 'utf-8',
      ascii: 'utf-8',
      'iso-8859-1': 'iso-8859-1',
      'iso8859-1': 'iso-8859-1',
      latin1: 'iso-8859-1',
      'windows-1252': 'windows-1252',
      'cp1252': 'windows-1252'
    };
    try {
      return new TextDecoder(map[cs] || cs, { fatal: false }).decode(bytes);
    } catch (e) {
      return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    }
  }

  function decodeEncodedWords(input) {
    if (!input || input.indexOf('=?') === -1) return input;
    var collapsed = input.replace(/(\=\?[^?]+\?[BbQq]\?[^?]*\?=)(\s+)(?=\=\?)/g, '$1');
    return collapsed.replace(/\=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, function (_, charset, enc, text) {
      var bytes;
      try {
        if (enc.toUpperCase() === 'B') {
          bytes = bytesFromBinaryString(atob(text.replace(/\s/g, '')));
        } else {
          var q = text.replace(/_/g, ' ').replace(/=([0-9A-Fa-f]{2})/g, function (m, h) {
            return String.fromCharCode(parseInt(h, 16));
          });
          bytes = bytesFromBinaryString(q);
        }
        return decodeCharset(bytes, charset);
      } catch (e) {
        return _;
      }
    });
  }

  function splitParamList(rest) {
    var parts = [];
    var cur = '';
    var inQ = false;
    for (var i = 0; i < rest.length; i++) {
      var c = rest[i];
      if (c === '"') inQ = !inQ;
      else if (c === ';' && !inQ) {
        if (cur.trim()) parts.push(cur);
        cur = '';
        continue;
      }
      cur += c;
    }
    if (cur.trim()) parts.push(cur);
    return parts;
  }

  function parseParams(rest) {
    var params = {};
    var pieces = splitParamList(rest);
    for (var i = 0; i < pieces.length; i++) {
      var p = pieces[i];
      var eq = p.indexOf('=');
      if (eq === -1) continue;
      var k = p.slice(0, eq).trim().toLowerCase();
      var v = p.slice(eq + 1).trim();
      if (v.charAt(0) === '"' && v.charAt(v.length - 1) === '"') v = v.slice(1, -1);
      if (/\*\d+\*$/.test(k) || k.charAt(k.length - 1) === '*') {
        k = k.replace(/\*\d+\*$/, '').replace(/\*$/, '');
        var m = v.match(/^([^']*)'[^']*'(.*)$/);
        if (m) {
          try {
            v = decodeURIComponent(m[2].replace(/\+/g, '%20'));
          } catch (e) {
            v = m[2];
          }
        }
      }
      params[k] = v;
    }
    return params;
  }

  function parseContentType(value) {
    var raw = (value || 'text/plain').trim();
    var semi = raw.indexOf(';');
    var typePart = (semi === -1 ? raw : raw.slice(0, semi)).trim().toLowerCase();
    var slash = typePart.indexOf('/');
    return {
      raw: raw,
      full: typePart || 'text/plain',
      type: slash === -1 ? typePart : typePart.slice(0, slash),
      subtype: slash === -1 ? '' : typePart.slice(slash + 1),
      params: parseParams(semi === -1 ? '' : raw.slice(semi + 1))
    };
  }

  function parseDisposition(value) {
    var raw = (value || '').trim();
    if (!raw) return { type: '', filename: '', params: {} };
    var semi = raw.indexOf(';');
    var type = (semi === -1 ? raw : raw.slice(0, semi)).trim().toLowerCase();
    var params = parseParams(semi === -1 ? '' : raw.slice(semi + 1));
    return { type: type, filename: params.filename || params.name || '', params: params };
  }

  function decodeQuotedPrintable(str) {
    var soft = str.replace(/=\r\n/g, '').replace(/=\n/g, '');
    return soft.replace(/=([0-9A-Fa-f]{2})/g, function (m, h) {
      return String.fromCharCode(parseInt(h, 16));
    });
  }

  function decodeTransfer(body, cte) {
    var enc = (cte || '7bit').toLowerCase().trim();
    if (enc === 'base64') {
      var cleaned = body.replace(/[^A-Za-z0-9+\/=]/g, '');
      try {
        return bytesFromBinaryString(atob(cleaned));
      } catch (e) {
        return bytesFromBinaryString(body);
      }
    }
    if (enc === 'quoted-printable' || enc === 'quotedprintable') {
      return bytesFromBinaryString(decodeQuotedPrintable(body));
    }
    return bytesFromBinaryString(body);
  }

  function parseHeaders(block) {
    var unfolded = block.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n[ \t]+/g, ' ');
    var lines = unfolded.split('\n');
    var list = [];
    var map = {};
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (!line) continue;
      var idx = line.indexOf(':');
      if (idx < 1) continue;
      var name = line.slice(0, idx).trim();
      var value = line.slice(idx + 1).trim();
      if (!/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(name)) continue;
      var decoded = decodeEncodedWords(value);
      list.push({ name: name, value: value, decoded: decoded });
      var key = name.toLowerCase();
      if (!map[key]) map[key] = [];
      map[key].push(decoded);
    }
    return {
      list: list,
      map: map,
      get: function (name) {
        var arr = map[name.toLowerCase()];
        return arr && arr.length ? arr[0] : '';
      },
      all: function (name) {
        return map[name.toLowerCase()] || [];
      }
    };
  }

  function splitHeadBody(raw) {
    var idx = raw.indexOf('\r\n\r\n');
    var sep = 4;
    if (idx === -1) {
      idx = raw.indexOf('\n\n');
      sep = 2;
    }
    if (idx === -1) return { head: raw, body: '' };
    return { head: raw.slice(0, idx), body: raw.slice(idx + sep) };
  }

  function splitMultipart(body, boundary) {
    if (!boundary) return [];
    var token = '--' + boundary;
    var raw = body.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    var start = raw.indexOf(token);
    if (start === -1) return [];
    var parts = [];
    while (start !== -1) {
      var after = start + token.length;
      if (raw.substr(after, 2) === '--') break;
      if (raw.charAt(after) === '\n') after += 1;
      var nextNl = raw.indexOf('\n' + token, after);
      var chunk;
      if (nextNl === -1) {
        chunk = raw.slice(after);
        start = -1;
      } else {
        chunk = raw.slice(after, nextNl);
        start = nextNl + 1;
      }
      if (chunk.charAt(chunk.length - 1) === '\n') chunk = chunk.slice(0, -1);
      parts.push(chunk);
    }
    return parts;
  }

  function looksLikeEmail(headers) {
    if (!headers.list.length) return false;
    var interesting = ['from', 'to', 'subject', 'date', 'message-id', 'mime-version', 'received', 'content-type', 'return-path'];
    for (var i = 0; i < interesting.length; i++) {
      if (headers.map[interesting[i]]) return true;
    }
    return headers.list.length >= 2;
  }

  function parseEntity(raw) {
    var split = splitHeadBody(raw);
    var headers = parseHeaders(split.head);
    var ct = parseContentType(headers.get('content-type') || 'text/plain; charset=utf-8');
    var cte = headers.get('content-transfer-encoding') || '7bit';
    var disp = parseDisposition(headers.get('content-disposition'));
    var filename = disp.filename || ct.params.name || '';
    var entity = {
      headers: headers,
      contentType: ct,
      encoding: cte,
      disposition: disp,
      filename: filename,
      parts: [],
      decodedBytes: null,
      text: '',
      size: split.body.length
    };

    if (ct.type === 'multipart') {
      var chunks = splitMultipart(split.body, ct.params.boundary);
      for (var i = 0; i < chunks.length; i++) {
        entity.parts.push(parseEntity(chunks[i]));
      }
      return entity;
    }

    entity.decodedBytes = decodeTransfer(split.body, cte);
    entity.size = entity.decodedBytes.length;

    if (ct.full === 'message/rfc822') {
      var innerRaw = decodeCharset(entity.decodedBytes, ct.params.charset || 'utf-8');
      entity.text = innerRaw;
      entity.parts.push(parseEntity(innerRaw));
      return entity;
    }

    if (ct.type === 'text' || ct.full === 'text/html') {
      entity.text = decodeCharset(entity.decodedBytes, ct.params.charset || 'utf-8');
    }
    return entity;
  }

  function flatten(entity, depth, id, acc) {
    acc.push({ entity: entity, depth: depth, id: id });
    for (var i = 0; i < entity.parts.length; i++) {
      flatten(entity.parts[i], depth + 1, id + '.' + i, acc);
    }
    return acc;
  }

  function findPart(id) {
    for (var i = 0; i < state.flat.length; i++) {
      if (state.flat[i].id === id) return state.flat[i];
    }
    return state.flat[0] || null;
  }

  function isAttachment(entity) {
    if (entity.contentType.type === 'multipart') return false;
    if (entity.disposition.type === 'attachment') return true;
    if (entity.filename && entity.disposition.type !== 'inline') return true;
    if (entity.contentType.type === 'text') return false;
    if (entity.contentType.full === 'message/rfc822') return false;
    return true;
  }

  function collectAttachments(flat) {
    var list = [];
    for (var i = 0; i < flat.length; i++) {
      var row = flat[i];
      if (isAttachment(row.entity)) list.push(row);
    }
    return list;
  }

  function findBody(root, subtype) {
    var want = 'text/' + subtype;
    var fallback = null;
    function walk(ent) {
      if (ent.contentType.full === want && ent.text) return ent;
      if (!fallback && ent.contentType.type === 'text' && ent.text && subtype === 'plain') fallback = ent;
      for (var i = 0; i < ent.parts.length; i++) {
        var hit = walk(ent.parts[i]);
        if (hit) return hit;
      }
      return null;
    }
    return walk(root) || (subtype === 'plain' ? fallback : null);
  }

  function parseAuthResults(values) {
    var keys = ['dkim', 'spf', 'dmarc', 'arc', 'compauth'];
    var seen = {};
    var out = [];
    for (var v = 0; v < values.length; v++) {
      var text = values[v];
      for (var k = 0; k < keys.length; k++) {
        var re = new RegExp('\\b' + keys[k] + '\\s*=\\s*([a-z0-9-]+)', 'i');
        var m = text.match(re);
        if (m && !seen[keys[k]]) {
          seen[keys[k]] = true;
          out.push({ key: keys[k].toUpperCase(), result: m[1].toLowerCase() });
        }
      }
    }
    return out;
  }

  function redactText(text) {
    if (!state.redact || !text) return text;
    return String(text).replace(EMAIL_RE, '[redacted@email]');
  }

  function displayHeaderValue(header) {
    var name = header.name.toLowerCase();
    if (state.redact && SECRET_HEADERS[name]) return '[redacted]';
    return redactText(header.decoded || header.value);
  }

  function copyText(text, btn) {
    var value = text == null ? '' : String(text);
    function done() {
      if (!btn) return;
      var prev = btn.textContent;
      btn.classList.add('copied');
      btn.textContent = 'Copied!';
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.textContent = prev;
      }, 1200);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(function () {
        fallbackCopy(value, done);
      });
    } else {
      fallbackCopy(value, done);
    }
    track('copy', btn ? btn.getAttribute('data-copy') || 'value' : 'value');
  }

  function fallbackCopy(value, done) {
    var ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
    done();
  }

  function showError(msg) {
    loaderErrorText.textContent = msg;
    loaderError.classList.remove('hidden');
  }

  function clearError() {
    loaderError.classList.add('hidden');
    loaderErrorText.textContent = '';
  }

  /* ---------- load ------------------------------------------------------ */

  fileDropZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    fileDropZone.classList.add('dragover');
  });
  fileDropZone.addEventListener('dragleave', function () {
    fileDropZone.classList.remove('dragover');
  });
  fileDropZone.addEventListener('drop', function (e) {
    e.preventDefault();
    fileDropZone.classList.remove('dragover');
    var file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) loadFile(file);
  });
  fileInput.addEventListener('change', function () {
    var file = fileInput.files && fileInput.files[0];
    if (file) loadFile(file);
  });

  pasteLoadBtn.addEventListener('click', function () {
    ingest(pasteArea.value || '', 'Pasted source');
    track('load', 'paste', (pasteArea.value || '').length);
  });
  pasteClearBtn.addEventListener('click', function () {
    pasteArea.value = '';
    pasteArea.focus();
  });
  sampleLoadBtn.addEventListener('click', function () {
    ingest(SAMPLE_EML, 'sample.eml');
    track('load', 'sample', SAMPLE_EML.length);
  });

  document.querySelectorAll('.loader-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var which = tab.getAttribute('data-loader');
      document.querySelectorAll('.loader-tab').forEach(function (t) {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      $('loader-panel-file').classList.toggle('hidden', which !== 'file');
      $('loader-panel-paste').classList.toggle('hidden', which !== 'paste');
      $('loader-panel-sample').classList.toggle('hidden', which !== 'sample');
    });
  });

  function loadFile(file) {
    clearError();
    if (file.size > MAX_BYTES) {
      showError('File is larger than 12 MB. Trim the message or save headers only.');
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var raw = arrayBufferToBinaryString(reader.result);
        ingest(raw, file.name);
        track('load', 'file', file.size);
      } catch (e) {
        showError('Could not read that file.');
      }
    };
    reader.onerror = function () {
      showError('Could not read that file.');
    };
    reader.readAsArrayBuffer(file);
  }

  function ingest(raw, sourceName) {
    clearError();
    if (!raw || !String(raw).trim()) {
      showError('Paste the raw message or drop an .eml file first.');
      return;
    }
    if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
    var root;
    try {
      root = parseEntity(raw);
    } catch (e) {
      showError('Could not parse this as an RFC 5322 message.');
      return;
    }
    if (!looksLikeEmail(root.headers)) {
      showError('This does not look like an email. Expect RFC 822 headers such as From, Subject, or MIME-Version, then a blank line and the body.');
      return;
    }
    state.raw = raw;
    state.sourceName = sourceName;
    state.root = root;
    state.flat = flatten(root, 0, '0', []);
    state.selectedId = '0';
    state.detailTab = 'overview';
    loaderSection.classList.add('hidden');
    viewerSection.classList.remove('hidden');
    render();
  }

  closeBtn.addEventListener('click', function () {
    state.root = null;
    state.raw = '';
    viewerSection.classList.add('hidden');
    loaderSection.classList.remove('hidden');
    if (fileInput) fileInput.value = '';
    track('close', 'viewer');
  });

  redactToggle.addEventListener('change', function () {
    state.redact = redactToggle.checked;
    render();
    track('toggle', 'redact', state.redact ? 1 : 0);
  });

  remoteToggle.addEventListener('change', function () {
    state.loadRemote = remoteToggle.checked;
    if (state.detailTab === 'body') renderDetail();
    track('toggle', 'remote-images', state.loadRemote ? 1 : 0);
  });

  copyRawBtn.addEventListener('click', function () {
    copyText(state.raw.replace(/\n/g, '\r\n'), copyRawBtn);
  });

  document.querySelectorAll('.detail-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      state.detailTab = tab.getAttribute('data-detail');
      document.querySelectorAll('.detail-tab').forEach(function (t) {
        t.classList.toggle('active', t === tab);
      });
      renderDetail();
      track('tab', state.detailTab);
    });
  });

  /* ---------- render ---------------------------------------------------- */

  function render() {
    var h = state.root.headers;
    metaSource.textContent = state.sourceName || 'message';
    metaSize.textContent = formatBytes(state.raw.length);
    metaParts.textContent = state.flat.length + (state.flat.length === 1 ? ' part' : ' parts');
    sumSubject.textContent = redactText(h.get('subject') || '(no subject)');
    sumFrom.textContent = redactText(h.get('from') || '-');
    sumDate.textContent = h.get('date') || '-';
    sumTo.textContent = redactText(h.get('to') || '-');
    renderAuth(h);
    renderHops(h);
    document.querySelectorAll('.detail-tab').forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-detail') === state.detailTab);
    });
    renderDetail();
  }

  function authClass(result) {
    if (result === 'pass' || result === 'none') return result === 'pass' ? 'auth-pass' : 'auth-none';
    if (result === 'fail' || result === 'permerror' || result === 'temperror') return 'auth-fail';
    return 'auth-other';
  }

  function renderAuth(headers) {
    var results = parseAuthResults(headers.all('authentication-results'));
    if (!results.length) {
      var spf = headers.get('received-spf');
      if (spf) {
        var m = spf.match(/\b(pass|fail|softfail|neutral|none|permerror|temperror)\b/i);
        if (m) results.push({ key: 'SPF', result: m[1].toLowerCase() });
      }
    }
    if (!results.length) {
      authChips.innerHTML = '<span class="auth-chip auth-none">No Authentication-Results header</span>';
      return;
    }
    authChips.innerHTML = results.map(function (r) {
      return '<span class="auth-chip ' + authClass(r.result) + '">' + escapeHtml(r.key) + ': ' + escapeHtml(r.result) + '</span>';
    }).join('');
  }

  function renderHops(headers) {
    var hops = headers.all('received').slice();
    if (!hops.length) {
      hopsList.innerHTML = '<p class="kv-empty">No Received headers. Some saved drafts omit the hop chain.</p>';
      return;
    }
    var html = '<ol class="hop-ol">';
    for (var i = 0; i < hops.length; i++) {
      html += '<li><span class="hop-n">Hop ' + (i + 1) + '</span><code>' + escapeHtml(redactText(hops[i])) + '</code></li>';
    }
    html += '</ol>';
    hopsList.innerHTML = html;
  }

  function renderDetail() {
    var tab = state.detailTab;
    if (tab === 'overview') renderOverview();
    else if (tab === 'headers') renderHeaders();
    else if (tab === 'mime') renderMime();
    else if (tab === 'body') renderBody();
    else if (tab === 'attachments') renderAttachments();
    else renderRaw();
  }

  function kvRow(key, val, extraClass) {
    return '<div class="kv-key">' + escapeHtml(key) + '</div><div class="kv-val' + (extraClass ? ' ' + extraClass : '') + '">' + escapeHtml(val || '') + '</div>';
  }

  function renderOverview() {
    var h = state.root.headers;
    var fields = ['from', 'to', 'cc', 'bcc', 'reply-to', 'sender', 'return-path', 'subject', 'date', 'message-id', 'in-reply-to', 'references', 'mime-version', 'x-mailer', 'x-ses-outgoing'];
    var html = '<div class="kv-section"><div class="kv-section-title">Envelope</div><div class="kv-table">';
    var shown = {};
    for (var i = 0; i < fields.length; i++) {
      var vals = h.all(fields[i]);
      if (!vals.length) continue;
      shown[fields[i]] = true;
      for (var j = 0; j < vals.length; j++) {
        var label = fields[i] + (vals.length > 1 ? ' [' + (j + 1) + ']' : '');
        html += kvRow(label, redactText(vals[j]));
      }
    }
    html += '</div></div>';
    var extras = [];
    for (var k = 0; k < h.list.length; k++) {
      var n = h.list[k].name.toLowerCase();
      if (shown[n] || n === 'received' || n === 'dkim-signature' || n === 'authentication-results' || n === 'received-spf') continue;
      extras.push(h.list[k]);
    }
    if (extras.length) {
      html += '<div class="kv-section"><div class="kv-section-title">Other headers <button type="button" class="kv-copy" data-copy="headers" id="copy-overview-headers">Copy</button></div><div class="kv-table">';
      for (var x = 0; x < extras.length; x++) {
        html += kvRow(extras[x].name, displayHeaderValue(extras[x]), state.redact && SECRET_HEADERS[extras[x].name.toLowerCase()] ? 'redacted' : '');
      }
      html += '</div></div>';
    }
    var dkim = h.all('dkim-signature');
    if (dkim.length) {
      html += '<div class="kv-section"><div class="kv-section-title">DKIM-Signature</div>';
      for (var d = 0; d < dkim.length; d++) {
        html += '<pre class="body-block wrap">' + escapeHtml(dkim[d]) + '</pre>';
      }
      html += '</div>';
    }
    detailBody.innerHTML = html;
    var copyBtn = $('copy-overview-headers');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        copyText(extras.map(function (hdr) { return hdr.name + ': ' + displayHeaderValue(hdr); }).join('\n'), copyBtn);
      });
    }
  }

  function renderHeaders() {
    var list = state.root.headers.list;
    var q = ($('header-filter') && $('header-filter').value || '').toLowerCase();
    var html = '<div class="filter-search header-filter-wrap"><i class="fas fa-search"></i>' +
      '<input type="search" id="header-filter" placeholder="Filter headers" aria-label="Filter headers"></div>';
    html += '<div class="kv-section"><div class="kv-section-title">All headers <button type="button" class="kv-copy" id="copy-all-headers" data-copy="all-headers">Copy</button></div><div class="kv-table">';
    var copied = [];
    for (var i = 0; i < list.length; i++) {
      var hdr = list[i];
      var shown = displayHeaderValue(hdr);
      if (q && (hdr.name + ' ' + shown).toLowerCase().indexOf(q) === -1) continue;
      copied.push(hdr.name + ': ' + shown);
      html += kvRow(hdr.name, shown, state.redact && SECRET_HEADERS[hdr.name.toLowerCase()] ? 'redacted' : '');
    }
    html += '</div></div>';
    detailBody.innerHTML = html;
    var input = $('header-filter');
    input.value = q;
    input.addEventListener('input', function () { renderHeaders(); });
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    $('copy-all-headers').addEventListener('click', function () {
      copyText(copied.join('\r\n'), $('copy-all-headers'));
    });
  }

  function partLabel(entity) {
    var ct = entity.contentType.full;
    if (entity.filename) return entity.filename + ' (' + ct + ')';
    return ct;
  }

  function renderMime() {
    var html = '<p class="section-desc" style="margin-top:0">Click a part to inspect it. Nested <code>multipart/*</code> and <code>message/rfc822</code> unfold as a tree.</p><div class="mime-tree">';
    for (var i = 0; i < state.flat.length; i++) {
      var row = state.flat[i];
      var ent = row.entity;
      var active = row.id === state.selectedId ? ' active' : '';
      html += '<button type="button" class="mime-row' + active + '" data-part="' + escapeHtml(row.id) + '" style="padding-left:' + (10 + row.depth * 16) + 'px">';
      html += '<span class="mime-ct">' + escapeHtml(partLabel(ent)) + '</span>';
      html += '<span class="mime-meta">' + escapeHtml(ent.encoding) + ' · ' + formatBytes(ent.size) + '</span>';
      html += '</button>';
    }
    html += '</div>';
    var selected = findPart(state.selectedId);
    if (selected) {
      var e = selected.entity;
      html += '<div class="kv-section" style="margin-top:16px"><div class="kv-section-title">Selected part</div><div class="kv-table">';
      html += kvRow('Content-Type', e.contentType.raw);
      html += kvRow('Encoding', e.encoding);
      html += kvRow('Disposition', e.disposition.type || '(none)');
      html += kvRow('Filename', e.filename || '(none)');
      html += kvRow('Size', formatBytes(e.size));
      html += kvRow('Child parts', String(e.parts.length));
      html += '</div></div>';
      if (e.text && e.contentType.type === 'text') {
        html += '<pre class="body-block wrap">' + escapeHtml(e.text.slice(0, 8000)) + (e.text.length > 8000 ? '\n…' : '') + '</pre>';
      }
    }
    detailBody.innerHTML = html;
    detailBody.querySelectorAll('.mime-row').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.selectedId = btn.getAttribute('data-part');
        renderMime();
      });
    });
  }

  function prepareHtml(html, loadRemote) {
    var out = html;
    if (!loadRemote) {
      out = out.replace(/\s(src|background)\s*=\s*(['"])\s*https?:[\s\S]*?\2/gi, ' $1=$2$2');
      out = out.replace(/url\(\s*(['"]?)https?:[\s\S]*?\1\s*\)/gi, 'url()');
    }
    var imgSrc = loadRemote ? "data: https: http:" : 'data:';
    var csp = '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; img-src ' + imgSrc + '; style-src \'unsafe-inline\'; font-src data:;">';
    if (/<head[\s>]/i.test(out)) return out.replace(/<head([^>]*)>/i, '<head$1>' + csp);
    return csp + out;
  }

  function renderBody() {
    var plain = findBody(state.root, 'plain');
    var htmlPart = findBody(state.root, 'html');
    var html = '<div class="body-switch" role="group" aria-label="Body type">';
    html += '<button type="button" class="chip' + (!htmlPart || state.bodyView !== 'html' ? ' active' : '') + '" data-body="plain">text/plain</button>';
    html += '<button type="button" class="chip' + (htmlPart && state.bodyView === 'html' ? ' active' : '') + '" data-body="html"' + (htmlPart ? '' : ' disabled') + '>text/html</button>';
    html += '</div>';
    var view = state.bodyView === 'html' && htmlPart ? 'html' : 'plain';
    if (view === 'html' && htmlPart) {
      html += '<div class="html-frame-wrap"><iframe id="html-preview" class="html-preview" sandbox="" referrerpolicy="no-referrer" title="HTML body preview"></iframe></div>';
      html += '<p class="preview-note">Preview runs in a sandboxed iframe. Remote images stay blocked unless you enable them in the toolbar. For formatting the markup, use the <a href="/tools/html-beautifier/">HTML Beautifier</a>.</p>';
    } else if (plain && plain.text) {
      html += '<div class="body-meta"><span class="body-pill">' + escapeHtml(plain.contentType.full) + '</span><span class="body-pill">' + formatBytes(plain.size) + '</span></div>';
      html += '<pre class="body-block wrap">' + escapeHtml(redactText(plain.text)) + '</pre>';
    } else {
      html += '<p class="kv-empty">No text/plain or text/html body in this message.</p>';
    }
    detailBody.innerHTML = html;
    detailBody.querySelectorAll('.body-switch .chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        state.bodyView = btn.getAttribute('data-body');
        renderBody();
      });
    });
    var frame = $('html-preview');
    if (frame && htmlPart) {
      frame.srcdoc = prepareHtml(htmlPart.text, state.loadRemote);
    }
  }

  function renderAttachments() {
    var list = collectAttachments(state.flat);
    if (!list.length) {
      detailBody.innerHTML = '<p class="kv-empty">No attachments. Inline images and binary parts with a filename show up here.</p>';
      return;
    }
    var html = '<div class="attach-list">';
    for (var i = 0; i < list.length; i++) {
      var ent = list[i].entity;
      html += '<div class="attach-card">';
      html += '<div class="attach-info"><strong>' + escapeHtml(ent.filename || partLabel(ent)) + '</strong>';
      html += '<span>' + escapeHtml(ent.contentType.full) + ' · ' + formatBytes(ent.size) + '</span></div>';
      html += '<button type="button" class="btn-secondary attach-dl" data-part="' + escapeHtml(list[i].id) + '"><i class="fas fa-download"></i> Download</button>';
      html += '</div>';
    }
    html += '</div>';
    html += '<p class="preview-note">Downloads are built from decoded bytes in memory. For Base64 payloads outside a message, use the <a href="/tools/base64-encoder/">Base64 Encoder and Decoder</a>.</p>';
    detailBody.innerHTML = html;
    detailBody.querySelectorAll('.attach-dl').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var row = findPart(btn.getAttribute('data-part'));
        if (!row) return;
        downloadPart(row.entity);
        track('download', row.entity.filename || row.entity.contentType.full, row.entity.size);
      });
    });
  }

  function downloadPart(entity) {
    var bytes = entity.decodedBytes || new Uint8Array(0);
    var blob = new Blob([bytes], { type: entity.contentType.full || 'application/octet-stream' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = entity.filename || 'part.bin';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  function renderRaw() {
    var shown = state.redact ? redactText(state.raw) : state.raw;
    detailBody.innerHTML = '<div class="body-meta"><span class="body-pill">' + formatBytes(state.raw.length) + '</span></div><pre class="body-block wrap">' + escapeHtml(shown) + '</pre>';
  }

  /* ---------- sample ---------------------------------------------------- */

  var SAMPLE_EML = [
    'Return-Path: <bounces@shop.example>',
    'Received: from mail.shop.example (mail.shop.example [203.0.113.10])',
    '\tby mx.google.com with ESMTPS id abc123',
    '\tfor <ajit@example.com>; Fri, 11 Sep 2026 06:12:01 +0000',
    'Received: from app-1.internal (unknown [10.0.4.12])',
    '\tby mail.shop.example with ESMTP id xyz789',
    '\tfor <ajit@example.com>; Fri, 11 Sep 2026 11:42:00 +0530',
    'Authentication-Results: mx.google.com;',
    '\tdkim=pass header.d=shop.example header.s=s1;',
    '\tspf=pass smtp.mailfrom=shop.example;',
    '\tdmarc=pass header.from=shop.example',
    'Received-SPF: pass (shop.example: domain of noreply@shop.example designates 203.0.113.10 as permitted sender)',
    'DKIM-Signature: v=1; a=rsa-sha256; d=shop.example; s=s1; c=relaxed/relaxed;',
    '\th=from:to:subject:date:message-id; bh=YWJj; b=ZGVm',
    'From: Order Confirm <noreply@shop.example>',
    'To: Ajit Singh <ajit@example.com>',
    'Subject: =?UTF-8?Q?Your_order_=231042_shipped?=',
    'Date: Fri, 11 Sep 2026 11:42:00 +0530',
    'Message-ID: <1042.ship@shop.example>',
    'MIME-Version: 1.0',
    'Content-Type: multipart/mixed; boundary="MIXED42"',
    '',
    '--MIXED42',
    'Content-Type: multipart/alternative; boundary="ALT42"',
    '',
    '--ALT42',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: quoted-printable',
    '',
    'Order 1042 is on the way.',
    'Tracking: 1Z999AA10123456784',
    '',
    '--ALT42',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: quoted-printable',
    '',
    '<html><body style=3D"font-family:sans-serif">',
    '<p>Order <strong>1042</strong> is on the way.</p>',
    '<p><a href=3D"https://shop.example/track/1042">Track package</a></p>',
    '<img src=3D"https://shop.example/pixel.gif" width=3D"1" height=3D"1" alt=3D"">',
    '</body></html>',
    '--ALT42--',
    '',
    '--MIXED42',
    'Content-Type: application/pdf; name="invoice-1042.txt"',
    'Content-Disposition: attachment; filename="invoice-1042.txt"',
    'Content-Transfer-Encoding: base64',
    '',
    'SW52b2ljZSAjMTA0MgpBbW91bnQ6ICR0NDkuMDAgVVNECg==',
    '--MIXED42--',
    ''
  ].join('\r\n');

})();
