/* ==========================================================================
 * Protobuf Decoder (Wire Format Viewer) — pure JavaScript, no dependencies.
 *
 * Schema-free decode equivalent to `protoc --decode_raw`.
 *
 * Decoder surface:
 *   Protobuf.decode(uint8Array, options?) ->
 *     { fields, bytesRead, warnings }
 *
 * Each field:
 *   {
 *     field, wireType, wireTypeName, offset, length,
 *     value,                // primary display value
 *     interpretations,      // [{ label, value }]
 *     children,             // nested message fields (or null)
 *     bytesHex              // for length-delimited raw bytes
 *   }
 * ========================================================================== */

(function () {
  'use strict';

  function track(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'Protobuf Decoder',
        event_label: label,
        value: value
      });
    }
  }

  // =========================================================================
  // Decoder core
  // =========================================================================
  const Protobuf = (function () {
    const WIRE_NAMES = {
      0: 'Varint',
      1: '64-bit',
      2: 'Length-delimited',
      3: 'Start group',
      4: 'End group',
      5: '32-bit'
    };

    function decode(bytes, options) {
      if (!(bytes instanceof Uint8Array)) {
        throw new TypeError('Protobuf.decode expects a Uint8Array');
      }
      options = options || {};
      const depth = options.depth || 0;
      const maxDepth = options.maxDepth == null ? 32 : options.maxDepth;
      if (depth > maxDepth) {
        throw new Error('Nested message depth exceeds ' + maxDepth);
      }

      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      let offset = 0;
      const fields = [];
      const warnings = [];

      while (offset < bytes.length) {
        const start = offset;
        let tag;
        try {
          const r = readVarint(view, offset);
          tag = r.value;
          offset = r.offset;
        } catch (e) {
          // If we already decoded some fields, treat remaining as trailing
          if (fields.length > 0) {
            warnings.push('Stopped at offset ' + start + ': ' + e.message);
            offset = start;
            break;
          }
          throw e;
        }

        if (tag === 0n) {
          // A zero tag is invalid as a field start; stop if we have fields
          if (fields.length > 0) {
            warnings.push('Zero tag at offset ' + start + '; treating remaining bytes as trailing');
            offset = start;
            break;
          }
          throw new Error('Invalid protobuf: tag is 0 at offset ' + start);
        }

        const fieldNumber = Number(tag >> 3n);
        const wireType = Number(tag & 7n);

        if (fieldNumber === 0) {
          if (fields.length > 0) {
            warnings.push('Field number 0 at offset ' + start + '; treating remaining as trailing');
            offset = start;
            break;
          }
          throw new Error('Invalid protobuf: field number is 0 at offset ' + start);
        }

        if (wireType === 3 || wireType === 4) {
          fields.push({
            field: fieldNumber,
            wireType: wireType,
            wireTypeName: WIRE_NAMES[wireType] || ('Unknown(' + wireType + ')'),
            offset: start,
            length: offset - start,
            value: '(deprecated group marker)',
            interpretations: [{ label: 'note', value: 'Groups (wire types 3/4) are deprecated' }],
            children: null,
            bytesHex: null
          });
          continue;
        }

        if (![0, 1, 2, 5].includes(wireType)) {
          throw new Error('Unknown wire type ' + wireType + ' at offset ' + start);
        }

        const field = decodeField(view, bytes, offset, fieldNumber, wireType, start, depth, maxDepth);
        offset = field.nextOffset;
        fields.push(field.record);
      }

      return {
        fields: fields,
        bytesRead: offset,
        warnings: warnings
      };
    }

    function decodeField(view, bytes, offset, fieldNumber, wireType, start, depth, maxDepth) {
      let value;
      let interpretations = [];
      let children = null;
      let bytesHex = null;
      let nextOffset = offset;

      if (wireType === 0) {
        const r = readVarint(view, offset);
        nextOffset = r.offset;
        const u = r.value;
        const asInt = toSigned64(u);
        const asSint = zigzagDecode(u);
        const asBool = u === 0n ? false : (u === 1n ? true : null);

        value = formatBigInt(u);
        interpretations = [
          { label: 'uint64', value: formatBigInt(u) },
          { label: 'int64', value: formatBigInt(asInt) },
          { label: 'sint64 (zigzag)', value: formatBigInt(asSint) }
        ];
        if (asBool !== null) {
          interpretations.push({ label: 'bool', value: String(asBool) });
        }
      } else if (wireType === 1) {
        if (offset + 8 > view.byteLength) {
          throw new Error('Truncated 64-bit value at offset ' + offset);
        }
        const lo = view.getUint32(offset, true);
        const hi = view.getUint32(offset + 4, true);
        const u = (BigInt(hi) << 32n) | BigInt(lo);
        const asInt = toSigned64(u);
        const dbl = view.getFloat64(offset, true);
        nextOffset = offset + 8;

        value = formatBigInt(u);
        interpretations = [
          { label: 'fixed64', value: formatBigInt(u) },
          { label: 'sfixed64', value: formatBigInt(asInt) },
          { label: 'double', value: formatFloat(dbl) }
        ];
      } else if (wireType === 5) {
        if (offset + 4 > view.byteLength) {
          throw new Error('Truncated 32-bit value at offset ' + offset);
        }
        const u = view.getUint32(offset, true);
        const s = view.getInt32(offset, true);
        const f = view.getFloat32(offset, true);
        nextOffset = offset + 4;

        value = String(u >>> 0);
        interpretations = [
          { label: 'fixed32', value: String(u >>> 0) },
          { label: 'sfixed32', value: String(s) },
          { label: 'float', value: formatFloat(f) }
        ];
      } else if (wireType === 2) {
        const lenR = readVarint(view, offset);
        const len = Number(lenR.value);
        if (len < 0 || len > 64 * 1024 * 1024) {
          throw new Error('Unreasonable length-delimited size ' + len + ' at offset ' + offset);
        }
        const dataStart = lenR.offset;
        if (dataStart + len > view.byteLength) {
          throw new Error('Truncated length-delimited field at offset ' + offset +
            ' (need ' + len + ' bytes, have ' + (view.byteLength - dataStart) + ')');
        }
        const slice = bytes.subarray(dataStart, dataStart + len);
        nextOffset = dataStart + len;
        bytesHex = bytesToHex(slice);

        // Try nested message
        let nestedOk = false;
        if (len > 0) {
          try {
            const nested = decode(slice, { depth: depth + 1, maxDepth: maxDepth });
            if (nested.fields.length > 0 && nested.bytesRead === len && nested.warnings.length === 0) {
              children = nested.fields;
              nestedOk = true;
              value = '{ ' + nested.fields.length + ' field' + (nested.fields.length === 1 ? '' : 's') + ' }';
              interpretations.push({ label: 'message', value: value });
            }
          } catch (e) {
            // not a nested message
          }
        } else {
          value = '(empty)';
          interpretations.push({ label: 'bytes', value: '(empty)' });
        }

        // UTF-8 string?
        const asString = tryUtf8(slice);
        if (asString !== null) {
          if (!nestedOk) value = JSON.stringify(asString);
          interpretations.push({ label: 'string', value: JSON.stringify(asString) });
        }

        // Packed repeated heuristic (only if not a nested message and length > 0)
        if (!nestedOk && len > 0) {
          const packed = tryPacked(slice);
          if (packed) {
            interpretations.push({ label: 'packed ' + packed.type, value: packed.values.join(', ') });
            if (!asString) {
              value = '[' + packed.values.join(', ') + ']';
            }
          }
        }

        if (!nestedOk && asString === null) {
          value = '0x' + (bytesHex.length > 64 ? bytesHex.slice(0, 64) + '…' : bytesHex);
        }

        interpretations.push({
          label: 'bytes',
          value: '0x' + (bytesHex.length > 96 ? bytesHex.slice(0, 96) + '… (' + len + ' B)' : bytesHex) +
            (bytesHex.length <= 96 ? ' (' + len + ' B)' : '')
        });
      }

      return {
        nextOffset: nextOffset,
        record: {
          field: fieldNumber,
          wireType: wireType,
          wireTypeName: WIRE_NAMES[wireType] || ('Unknown(' + wireType + ')'),
          offset: start,
          length: nextOffset - start,
          value: value,
          interpretations: interpretations,
          children: children,
          bytesHex: bytesHex
        }
      };
    }

    function readVarint(view, offset) {
      let result = 0n;
      let shift = 0n;
      let pos = offset;
      for (let i = 0; i < 10; i++) {
        if (pos >= view.byteLength) {
          throw new Error('Truncated varint at offset ' + offset);
        }
        const b = view.getUint8(pos++);
        result |= BigInt(b & 0x7f) << shift;
        if ((b & 0x80) === 0) {
          return { value: result, offset: pos };
        }
        shift += 7n;
      }
      throw new Error('Varint too long at offset ' + offset);
    }

    function zigzagDecode(n) {
      return (n >> 1n) ^ (-(n & 1n));
    }

    function toSigned64(u) {
      if (u >= 0x8000000000000000n) {
        return u - 0x10000000000000000n;
      }
      return u;
    }

    function formatBigInt(n) {
      return n.toString();
    }

    function formatFloat(n) {
      if (Number.isNaN(n)) return 'NaN';
      if (n === Infinity) return 'Infinity';
      if (n === -Infinity) return '-Infinity';
      // Prefer a readable representation
      const s = String(n);
      return s;
    }

    function bytesToHex(bytes) {
      let out = '';
      for (let i = 0; i < bytes.length; i++) {
        out += bytes[i].toString(16).padStart(2, '0');
      }
      return out;
    }

    function tryUtf8(bytes) {
      if (bytes.length === 0) return '';
      // Reject if contains NULs in the middle of short strings? Allow them.
      // Must be valid UTF-8 and mostly printable for "string" preference.
      try {
        const decoder = new TextDecoder('utf-8', { fatal: true });
        const s = decoder.decode(bytes);
        // Prefer strings that are mostly printable
        let printable = 0;
        for (let i = 0; i < s.length; i++) {
          const c = s.charCodeAt(i);
          if (c >= 0x20 || c === 0x09 || c === 0x0a || c === 0x0d) printable++;
        }
        if (s.length > 0 && printable / s.length < 0.85) return null;
        return s;
      } catch (e) {
        return null;
      }
    }

    function tryPacked(bytes) {
      // Try packed varints
      try {
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        let off = 0;
        const vals = [];
        while (off < bytes.length) {
          const r = readVarint(view, off);
          vals.push(formatBigInt(r.value));
          off = r.offset;
        }
        if (vals.length >= 2 && off === bytes.length) {
          return { type: 'varint', values: vals };
        }
      } catch (e) { /* not packed varint */ }

      // Packed fixed32
      if (bytes.length >= 8 && bytes.length % 4 === 0) {
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const vals = [];
        for (let i = 0; i < bytes.length; i += 4) {
          vals.push(String(view.getUint32(i, true)));
        }
        if (vals.length >= 2) return { type: 'fixed32', values: vals };
      }

      // Packed fixed64
      if (bytes.length >= 16 && bytes.length % 8 === 0) {
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const vals = [];
        for (let i = 0; i < bytes.length; i += 8) {
          const lo = view.getUint32(i, true);
          const hi = view.getUint32(i + 4, true);
          vals.push(formatBigInt((BigInt(hi) << 32n) | BigInt(lo)));
        }
        if (vals.length >= 2) return { type: 'fixed64', values: vals };
      }

      return null;
    }

    /**
     * Speculatively test whether bytes look like a valid protobuf message.
     * Used for auto-detect and input validation heuristics.
     */
    function looksLikeProtobuf(bytes) {
      if (!bytes || bytes.length === 0) return false;
      try {
        const r = decode(bytes);
        return r.fields.length > 0 && r.bytesRead === bytes.length && r.warnings.length === 0;
      } catch (e) {
        return false;
      }
    }

    return {
      decode: decode,
      looksLikeProtobuf: looksLikeProtobuf,
      WIRE_NAMES: WIRE_NAMES
    };
  })();

  // =========================================================================
  // Input parsers
  // =========================================================================
  function parseHex(input) {
    let s = input.replace(/0x/gi, ' ').replace(/[^0-9a-fA-F]/g, '');
    if (s.length === 0) throw new Error('No hex digits found');
    if (s.length % 2 !== 0) throw new Error('Odd number of hex digits');
    const out = new Uint8Array(s.length / 2);
    for (let i = 0; i < out.length; i++) {
      out[i] = parseInt(s.substr(i * 2, 2), 16);
    }
    return out;
  }

  function parseBase64(input, urlSafe) {
    let s = input.replace(/\s+/g, '');
    if (urlSafe) {
      s = s.replace(/-/g, '+').replace(/_/g, '/');
    }
    // Add padding
    const pad = s.length % 4;
    if (pad === 2) s += '==';
    else if (pad === 3) s += '=';
    else if (pad === 1) throw new Error('Invalid base64 length');

    try {
      const bin = atob(s);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    } catch (e) {
      throw new Error('Invalid base64: ' + (e.message || 'decode failed'));
    }
  }

  function autoDetectBytes(input) {
    const trimmed = input.trim();
    if (!trimmed) throw new Error('Empty input');

    // Prefer hex if it looks like hex
    const hexish = trimmed.replace(/0x/gi, '').replace(/[\s,;:_-]/g, '');
    if (/^[0-9a-fA-F]+$/.test(hexish) && hexish.length % 2 === 0 && hexish.length >= 2) {
      try {
        return { bytes: parseHex(trimmed), mode: 'hex' };
      } catch (e) { /* fall through */ }
    }

    // Try base64 / base64url
    try {
      const b64 = parseBase64(trimmed, /[-_]/.test(trimmed));
      return { bytes: b64, mode: /[-_]/.test(trimmed) ? 'base64url' : 'base64' };
    } catch (e) { /* fall through */ }

    // Last resort: hex
    return { bytes: parseHex(trimmed), mode: 'hex' };
  }

  async function maybeGunzip(bytes) {
    // gzip magic 1f 8b
    if (bytes.length < 2 || bytes[0] !== 0x1f || bytes[1] !== 0x8b) {
      return { bytes: bytes, gunzipped: false };
    }
    if (typeof DecompressionStream === 'undefined') {
      return { bytes: bytes, gunzipped: false, warning: 'Payload looks gzip-compressed but DecompressionStream is unavailable in this browser' };
    }
    try {
      const ds = new DecompressionStream('gzip');
      const stream = new Blob([bytes]).stream().pipeThrough(ds);
      const ab = await new Response(stream).arrayBuffer();
      return { bytes: new Uint8Array(ab), gunzipped: true };
    } catch (e) {
      return { bytes: bytes, gunzipped: false, warning: 'Gzip decompress failed: ' + (e.message || 'unknown error') };
    }
  }

  // =========================================================================
  // JSON / Tree rendering
  // =========================================================================
  function fieldsToJson(fields) {
    // Group by field number; repeated fields become arrays
    const order = [];
    const map = Object.create(null);

    fields.forEach(function (f) {
      const key = String(f.field);
      let entry;
      if (f.children) {
        entry = fieldsToJson(f.children);
      } else {
        // Prefer string interpretation, else primary value
        const strInterp = f.interpretations && f.interpretations.find(function (i) { return i.label === 'string'; });
        if (strInterp) {
          try { entry = JSON.parse(strInterp.value); } catch (e) { entry = strInterp.value; }
        } else if (f.wireType === 0 || f.wireType === 1 || f.wireType === 5) {
          // Prefer primary numeric/string value; keep as string if BigInt-ish
          entry = coerceJsonValue(f.value, f.interpretations);
        } else {
          entry = f.value;
        }
      }

      if (!(key in map)) {
        order.push(key);
        map[key] = entry;
      } else if (Array.isArray(map[key])) {
        map[key].push(entry);
      } else {
        map[key] = [map[key], entry];
      }
    });

    const obj = {};
    order.forEach(function (k) { obj[k] = map[k]; });
    return obj;
  }

  function coerceJsonValue(value, interpretations) {
    // Try number if safe
    if (/^-?\d+$/.test(value)) {
      try {
        const n = BigInt(value);
        if (n >= BigInt(Number.MIN_SAFE_INTEGER) && n <= BigInt(Number.MAX_SAFE_INTEGER)) {
          return Number(n);
        }
        return value; // keep as string for large ints
      } catch (e) {
        return value;
      }
    }
    if (value === 'true') return true;
    if (value === 'false') return false;
    // Prefer float interpretation for wire type 1/5 when primary is int-looking
    const floatInterp = interpretations && interpretations.find(function (i) {
      return i.label === 'double' || i.label === 'float';
    });
    if (floatInterp && /e|\./i.test(floatInterp.value)) {
      const f = Number(floatInterp.value);
      if (!Number.isNaN(f)) return f;
    }
    return value;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPrettyJson(obj) {
    const json = JSON.stringify(obj, null, 2);
    return escapeHtml(json);
  }

  function renderTree(container, fields) {
    container.innerHTML = '';
    if (!fields || fields.length === 0) {
      container.innerHTML = '<div class="tree-empty">No fields decoded</div>';
      return;
    }
    const root = document.createElement('ul');
    root.className = 'tree-list';
    fields.forEach(function (f) {
      root.appendChild(buildTreeNode(f));
    });
    container.appendChild(root);
  }

  function buildTreeNode(f) {
    const li = document.createElement('li');
    li.className = 'tree-node';

    const row = document.createElement('div');
    row.className = 'tree-row';

    const hasChildren = f.children && f.children.length > 0;

    if (hasChildren) {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'tree-toggle';
      toggle.setAttribute('aria-expanded', 'true');
      toggle.innerHTML = '<i class="fas fa-caret-down"></i>';
      toggle.addEventListener('click', function () {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
        toggle.innerHTML = open
          ? '<i class="fas fa-caret-right"></i>'
          : '<i class="fas fa-caret-down"></i>';
        childList.classList.toggle('collapsed', open);
      });
      row.appendChild(toggle);
    } else {
      const spacer = document.createElement('span');
      spacer.className = 'tree-toggle-spacer';
      row.appendChild(spacer);
    }

    const fieldEl = document.createElement('span');
    fieldEl.className = 'tree-field';
    fieldEl.textContent = 'Field ' + f.field;
    row.appendChild(fieldEl);

    const typeEl = document.createElement('span');
    typeEl.className = 'tree-type';
    typeEl.textContent = f.wireTypeName + ' (' + f.wireType + ')';
    row.appendChild(typeEl);

    const valEl = document.createElement('span');
    valEl.className = 'tree-value';
    valEl.textContent = f.value;
    row.appendChild(valEl);

    const metaEl = document.createElement('span');
    metaEl.className = 'tree-meta';
    metaEl.textContent = '@' + f.offset + ' · ' + f.length + ' B';
    row.appendChild(metaEl);

    li.appendChild(row);

    if (f.interpretations && f.interpretations.length > 0) {
      const interp = document.createElement('div');
      interp.className = 'tree-interpretations';
      f.interpretations.forEach(function (i) {
        const pill = document.createElement('span');
        pill.className = 'interp-pill';
        pill.innerHTML = '<strong>' + escapeHtml(i.label) + '</strong> ' + escapeHtml(i.value);
        interp.appendChild(pill);
      });
      li.appendChild(interp);
    }

    let childList = null;
    if (hasChildren) {
      childList = document.createElement('ul');
      childList.className = 'tree-list tree-children';
      f.children.forEach(function (c) {
        childList.appendChild(buildTreeNode(c));
      });
      li.appendChild(childList);
    }

    return li;
  }

  function countFields(fields) {
    let n = 0;
    (fields || []).forEach(function (f) {
      n += 1;
      if (f.children) n += countFields(f.children);
    });
    return n;
  }

  function formatBytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(n < 10 * 1024 ? 2 : 1) + ' KB';
    return (n / (1024 * 1024)).toFixed(2) + ' MB';
  }

  // =========================================================================
  // UI
  // =========================================================================
  // Sample: field 1 = 150 (varint), field 2 = "testing"
  const SAMPLE_HEX = '089601120774657374696e67';

  document.addEventListener('DOMContentLoaded', function () {
    const modeBtns = document.querySelectorAll('.mode-btn');
    const textWrap = document.getElementById('text-input-wrapper');
    const fileWrap = document.getElementById('file-input-wrapper');
    const textarea = document.getElementById('protobuf-input');
    const errorBox = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const warnBox = document.getElementById('warning-message');
    const warnText = document.getElementById('warning-text');
    const resultSection = document.getElementById('result-section');
    const metaInput = document.getElementById('meta-input');
    const metaOutput = document.getElementById('meta-output');
    const metaTime = document.getElementById('meta-time');
    const metaType = document.getElementById('meta-type');
    const prettyOut = document.querySelector('#output-json code');
    const treeOut = document.getElementById('output-tree');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const pasteBtn = document.getElementById('paste-btn');
    const clearBtn = document.getElementById('clear-btn');
    const sampleBtn = document.getElementById('sample-btn');
    const fileInput = document.getElementById('protobuf-file');
    const dropZone = document.getElementById('file-drop-zone');
    const fileMeta = document.getElementById('file-meta');
    const fileName = document.getElementById('file-meta-name');
    const fileSize = document.getElementById('file-meta-size');
    const fileClear = document.getElementById('file-clear-btn');

    let mode = 'hex';
    let currentBytes = null;
    let currentJson = '';
    let debounceTimer = null;

    modeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        mode = btn.dataset.mode;
        modeBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        const isFile = mode === 'file';
        textWrap.classList.toggle('hidden', isFile);
        fileWrap.classList.toggle('hidden', !isFile);
        textarea.placeholder = placeholderFor(mode);
        clearMessages();
        if (!isFile) {
          if (textarea.value.trim().length === 0) clearResult();
          else runDecode(textarea.value);
        } else if (currentBytes && !fileMeta.classList.contains('hidden')) {
          runDecodeFromBytes(currentBytes);
        }
        track('mode_change', mode);
      });
    });

    function placeholderFor(m) {
      if (m === 'hex') return 'Paste protobuf bytes as hex. e.g. 08 96 01 12 07 74 65 73 74 69 6e 67';
      if (m === 'base64') return 'Paste base64-encoded protobuf. e.g. CJYBEgd0ZXN0aW5n';
      if (m === 'base64url') return 'Paste base64url-encoded protobuf (no padding required)';
      if (m === 'auto') return 'Paste hex or base64 — format is auto-detected';
      return '';
    }

    textarea.addEventListener('input', function () {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        runDecode(textarea.value);
      }, 150);
    });

    pasteBtn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(function (t) {
          if (mode === 'file') switchToTextMode('hex');
          textarea.value = t;
          runDecode(t);
          track('paste');
        }).catch(function () { textarea.focus(); });
      } else {
        textarea.focus();
      }
    });

    clearBtn.addEventListener('click', function () {
      textarea.value = '';
      clearFile();
      clearResult();
      clearMessages();
      textarea.focus();
      track('clear');
    });

    sampleBtn.addEventListener('click', function () {
      if (mode === 'file') switchToTextMode('hex');
      textarea.value = SAMPLE_HEX;
      runDecode(SAMPLE_HEX);
      track('sample_load', 'default');
    });

    function switchToTextMode(m) {
      mode = m;
      modeBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.mode === m); });
      textWrap.classList.remove('hidden');
      fileWrap.classList.add('hidden');
      textarea.placeholder = placeholderFor(m);
    }

    copyBtn.addEventListener('click', function () {
      if (!currentJson) return;
      const doCopy = navigator.clipboard && navigator.clipboard.writeText
        ? navigator.clipboard.writeText(currentJson)
        : Promise.reject();
      doCopy.then(function () {
        copyBtn.classList.add('copied');
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = original;
        }, 1400);
        track('copy_json');
      }).catch(function () {
        const ta = document.createElement('textarea');
        ta.value = currentJson;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
      });
    });

    downloadBtn.addEventListener('click', function () {
      if (!currentJson) return;
      const blob = new Blob([currentJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'protobuf-decoded.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 0);
      track('download_json');
    });

    const viewTabs = document.querySelectorAll('.view-tab');
    const viewPanes = document.querySelectorAll('.result-view');
    viewTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.dataset.view;
        viewTabs.forEach(function (t) {
          const active = t === tab;
          t.classList.toggle('active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        viewPanes.forEach(function (p) {
          p.classList.toggle('hidden', p.dataset.view !== target);
          p.classList.toggle('active', p.dataset.view === target);
        });
        track('view_switch', target);
      });
    });

    fileInput.addEventListener('change', function (e) {
      const file = e.target.files && e.target.files[0];
      if (file) loadFile(file);
    });

    ['dragenter', 'dragover'].forEach(function (ev) {
      dropZone.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      dropZone.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('dragover');
      });
    });
    dropZone.addEventListener('drop', function (e) {
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) loadFile(file);
    });
    fileClear.addEventListener('click', function (e) {
      e.preventDefault();
      clearFile();
      clearResult();
      clearMessages();
    });

    function loadFile(file) {
      if (file.size > 5 * 1024 * 1024) {
        showError('File is too large (' + formatBytes(file.size) + '). Limit is 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = function () {
        const bytes = new Uint8Array(reader.result);
        fileName.textContent = file.name;
        fileSize.textContent = formatBytes(file.size);
        fileMeta.classList.remove('hidden');
        runDecodeFromBytes(bytes);
        track('file_load', file.name.split('.').pop() || 'unknown', file.size);
      };
      reader.onerror = function () { showError('Could not read file.'); };
      reader.readAsArrayBuffer(file);
    }

    function clearFile() {
      fileInput.value = '';
      fileMeta.classList.add('hidden');
      fileName.textContent = '—';
      fileSize.textContent = '—';
    }

    function runDecode(input) {
      const trimmed = input.trim();
      if (trimmed.length === 0) {
        clearResult();
        clearMessages();
        return;
      }
      let bytes;
      try {
        if (mode === 'hex') bytes = parseHex(trimmed);
        else if (mode === 'base64') bytes = parseBase64(trimmed, false);
        else if (mode === 'base64url') bytes = parseBase64(trimmed, true);
        else if (mode === 'auto') bytes = autoDetectBytes(trimmed).bytes;
        else return;
      } catch (e) {
        showError(e.message);
        clearResult();
        return;
      }
      runDecodeFromBytes(bytes);
    }

    function runDecodeFromBytes(bytes) {
      if (bytes.length === 0) {
        clearResult();
        clearMessages();
        return;
      }
      currentBytes = bytes;

      maybeGunzip(bytes).then(function (gz) {
        const payload = gz.bytes;
        const t0 = performance.now();
        let result;
        try {
          result = Protobuf.decode(payload);
        } catch (e) {
          showError(e.message || 'Failed to decode protobuf');
          clearResult();
          track('decode_error', truncate(e.message || '', 80));
          return;
        }
        const elapsed = performance.now() - t0;

        if (result.fields.length === 0) {
          showError('No protobuf fields found in the payload');
          clearResult();
          return;
        }

        const jsonObj = fieldsToJson(result.fields);
        const json = JSON.stringify(jsonObj, null, 2);
        currentJson = json;

        prettyOut.innerHTML = renderPrettyJson(jsonObj);
        renderTree(treeOut, result.fields);

        metaInput.textContent = formatBytes(payload.length);
        metaOutput.textContent = countFields(result.fields) + ' fields';
        metaTime.textContent = elapsed < 1
          ? '<1 ms'
          : (elapsed < 10 ? elapsed.toFixed(2) : elapsed.toFixed(1)) + ' ms';
        metaType.textContent = result.fields.length + ' top-level';

        resultSection.classList.remove('hidden');
        copyBtn.disabled = false;
        downloadBtn.disabled = false;

        clearError();
        const msgs = [];
        if (gz.gunzipped) msgs.push('Gzip-compressed payload was decompressed automatically.');
        if (gz.warning) msgs.push(gz.warning);
        const trailing = payload.length - result.bytesRead;
        if (trailing > 0) {
          msgs.push(
            'Decoded ' + result.bytesRead + ' byte' + (result.bytesRead === 1 ? '' : 's') +
            ', ' + trailing + ' trailing byte' + (trailing === 1 ? '' : 's') + ' unread.'
          );
        }
        (result.warnings || []).forEach(function (w) { msgs.push(w); });
        if (msgs.length) showWarning(msgs.join(' '));
        else hideWarning();

        track('decode_success', mode, payload.length);
      });
    }

    function clearMessages() { clearError(); hideWarning(); }
    function clearError() { errorBox.classList.add('hidden'); errorText.textContent = ''; }
    function hideWarning() { warnBox.classList.add('hidden'); warnText.textContent = ''; }
    function showError(msg) { errorText.textContent = msg; errorBox.classList.remove('hidden'); }
    function showWarning(msg) { warnText.textContent = msg; warnBox.classList.remove('hidden'); }

    function clearResult() {
      resultSection.classList.add('hidden');
      prettyOut.innerHTML = '';
      treeOut.innerHTML = '';
      currentJson = '';
      currentBytes = null;
      copyBtn.disabled = true;
      downloadBtn.disabled = true;
    }

    function truncate(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }

    document.querySelectorAll('.example-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const hex = btn.dataset.hex;
        if (!hex) return;
        switchToTextMode('hex');
        textarea.value = hex;
        runDecode(hex);
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        track('example_load', btn.dataset.label || hex);
      });
    });

    // Expose for browser console / tests
    window.ProtobufTool = {
      Protobuf: Protobuf,
      parseHex: parseHex,
      parseBase64: parseBase64,
      fieldsToJson: fieldsToJson
    };
  });

  // Node / unit-test export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      Protobuf: Protobuf,
      parseHex: parseHex,
      parseBase64: parseBase64,
      fieldsToJson: fieldsToJson,
      autoDetectBytes: autoDetectBytes
    };
  }
})();
