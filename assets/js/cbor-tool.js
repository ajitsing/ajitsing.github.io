/* ==========================================================================
 * CBOR Decoder (RFC 8949) — pure JavaScript, no dependencies.
 *
 * Decoder surface:
 *   CBOR.decode(uint8Array) -> { value, bytesRead }
 *
 * Decoded value shapes:
 *   - numbers / BigInt / string / boolean / null / undefined
 *   - { __cborBytes: Uint8Array }            byte string
 *   - { __cborTag: number, value: any }      tag wrapper
 *   - Arrays for major type 4
 *   - For maps with string keys: a plain object (insertion ordered) plus
 *     { __cborMapMixed: [[k,v], ...] } when any key is non-string.
 * ========================================================================== */

(function () {
  'use strict';

  // ---------- gtag helper -------------------------------------------------
  function track(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'CBOR Decoder',
        event_label: label,
        value: value
      });
    }
  }

  // =========================================================================
  // Decoder
  // =========================================================================
  const CBOR = (function () {
    const BREAK = Symbol('cbor-break');

    function decode(bytes) {
      if (!(bytes instanceof Uint8Array)) {
        throw new TypeError('CBOR.decode expects a Uint8Array');
      }
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const ctx = { bytes, view, pos: 0 };
      const value = readValue(ctx);
      return { value: value, bytesRead: ctx.pos };
    }

    function need(ctx, n) {
      if (ctx.pos + n > ctx.bytes.length) {
        const err = new Error(
          'Unexpected end of input at byte ' + ctx.pos +
          ' (need ' + n + ' more byte' + (n === 1 ? '' : 's') + ')'
        );
        err.offset = ctx.pos;
        throw err;
      }
    }

    function readUint(ctx, ai) {
      // Returns Number when safe, BigInt for 64-bit values > 2^53-1.
      if (ai < 24) return ai;
      if (ai === 24) {
        need(ctx, 1);
        return ctx.view.getUint8(ctx.pos++);
      }
      if (ai === 25) {
        need(ctx, 2);
        const v = ctx.view.getUint16(ctx.pos);
        ctx.pos += 2;
        return v;
      }
      if (ai === 26) {
        need(ctx, 4);
        const v = ctx.view.getUint32(ctx.pos);
        ctx.pos += 4;
        return v;
      }
      if (ai === 27) {
        need(ctx, 8);
        const hi = ctx.view.getUint32(ctx.pos);
        const lo = ctx.view.getUint32(ctx.pos + 4);
        ctx.pos += 8;
        if (hi === 0) return lo;
        const big = (BigInt(hi) << 32n) | BigInt(lo);
        if (big <= BigInt(Number.MAX_SAFE_INTEGER)) return Number(big);
        return big;
      }
      if (ai === 31) return -1; // indefinite-length sentinel (caller handles)
      const err = new Error(
        'Reserved additional info ' + ai + ' at byte ' + (ctx.pos - 1)
      );
      err.offset = ctx.pos - 1;
      throw err;
    }

    function readValue(ctx) {
      need(ctx, 1);
      const initial = ctx.view.getUint8(ctx.pos++);
      const major = initial >> 5;
      const ai = initial & 0x1f;

      switch (major) {
        case 0: // unsigned int
          return readUint(ctx, ai);

        case 1: { // negative int
          const n = readUint(ctx, ai);
          if (typeof n === 'bigint') return -1n - n;
          const neg = -1 - n;
          if (Number.isSafeInteger(neg)) return neg;
          return -1n - BigInt(n);
        }

        case 2: // byte string
          return { __cborBytes: readByteString(ctx, ai) };

        case 3: // text string
          return readTextString(ctx, ai);

        case 4: { // array
          if (ai === 31) {
            const arr = [];
            while (true) {
              const v = readValue(ctx);
              if (v === BREAK) break;
              arr.push(v);
            }
            return arr;
          }
          const len = readUint(ctx, ai);
          if (typeof len === 'bigint' || len > 0xffffff) {
            throw new Error('Array length too large to allocate: ' + len);
          }
          const arr = new Array(Number(len));
          for (let i = 0; i < arr.length; i++) arr[i] = readValue(ctx);
          return arr;
        }

        case 5: { // map
          const pairs = [];
          let hasNonStringKey = false;
          let len;
          if (ai === 31) {
            while (true) {
              const k = readValue(ctx);
              if (k === BREAK) break;
              const v = readValue(ctx);
              if (typeof k !== 'string') hasNonStringKey = true;
              pairs.push([k, v]);
            }
          } else {
            len = readUint(ctx, ai);
            if (typeof len === 'bigint' || len > 0xffffff) {
              throw new Error('Map length too large to allocate: ' + len);
            }
            for (let i = 0; i < Number(len); i++) {
              const k = readValue(ctx);
              const v = readValue(ctx);
              if (typeof k !== 'string') hasNonStringKey = true;
              pairs.push([k, v]);
            }
          }
          if (hasNonStringKey) return { __cborMapMixed: pairs };
          const obj = {};
          for (let i = 0; i < pairs.length; i++) obj[pairs[i][0]] = pairs[i][1];
          return obj;
        }

        case 6: { // tag
          const tag = readUint(ctx, ai);
          const inner = readValue(ctx);
          return applyTag(typeof tag === 'bigint' ? Number(tag) : tag, inner);
        }

        case 7: { // float / simple / break
          switch (ai) {
            case 20: return false;
            case 21: return true;
            case 22: return null;
            case 23: return undefined;
            case 24: { // simple value, 1 byte
              need(ctx, 1);
              const v = ctx.view.getUint8(ctx.pos++);
              return { __cborSimple: v };
            }
            case 25: { // float16
              need(ctx, 2);
              const u = ctx.view.getUint16(ctx.pos);
              ctx.pos += 2;
              return decodeFloat16(u);
            }
            case 26: { // float32
              need(ctx, 4);
              const v = ctx.view.getFloat32(ctx.pos);
              ctx.pos += 4;
              return v;
            }
            case 27: { // float64
              need(ctx, 8);
              const v = ctx.view.getFloat64(ctx.pos);
              ctx.pos += 8;
              return v;
            }
            case 31: return BREAK;
            default:
              if (ai < 20) return { __cborSimple: ai };
              throw new Error('Unsupported major 7 ai=' + ai + ' at byte ' + (ctx.pos - 1));
          }
        }
      }
      throw new Error('Unreachable: major=' + major);
    }

    function readByteString(ctx, ai) {
      if (ai === 31) {
        const chunks = [];
        let total = 0;
        while (true) {
          need(ctx, 1);
          const peek = ctx.view.getUint8(ctx.pos);
          if (peek === 0xff) { ctx.pos++; break; }
          if ((peek >> 5) !== 2) {
            throw new Error('Indefinite byte string contains non-byte-string chunk at byte ' + ctx.pos);
          }
          ctx.pos++;
          const cai = peek & 0x1f;
          if (cai === 31) throw new Error('Nested indefinite chunk at byte ' + (ctx.pos - 1));
          const chunk = readByteString(ctx, cai);
          chunks.push(chunk);
          total += chunk.length;
        }
        const out = new Uint8Array(total);
        let off = 0;
        for (let i = 0; i < chunks.length; i++) {
          out.set(chunks[i], off);
          off += chunks[i].length;
        }
        return out;
      }
      const len = readUint(ctx, ai);
      if (typeof len === 'bigint') throw new Error('Byte string too large: ' + len);
      need(ctx, len);
      const slice = ctx.bytes.slice(ctx.pos, ctx.pos + len);
      ctx.pos += len;
      return slice;
    }

    function readTextString(ctx, ai) {
      if (ai === 31) {
        let out = '';
        while (true) {
          need(ctx, 1);
          const peek = ctx.view.getUint8(ctx.pos);
          if (peek === 0xff) { ctx.pos++; break; }
          if ((peek >> 5) !== 3) {
            throw new Error('Indefinite text string contains non-text chunk at byte ' + ctx.pos);
          }
          ctx.pos++;
          const cai = peek & 0x1f;
          if (cai === 31) throw new Error('Nested indefinite chunk at byte ' + (ctx.pos - 1));
          out += readTextString(ctx, cai);
        }
        return out;
      }
      const len = readUint(ctx, ai);
      if (typeof len === 'bigint') throw new Error('Text string too large: ' + len);
      need(ctx, len);
      const slice = ctx.bytes.subarray(ctx.pos, ctx.pos + len);
      ctx.pos += len;
      try {
        return utf8Decoder.decode(slice);
      } catch (e) {
        throw new Error('Invalid UTF-8 in text string at byte ' + (ctx.pos - len));
      }
    }

    const utf8Decoder = new TextDecoder('utf-8', { fatal: true });

    function decodeFloat16(u) {
      const sign = (u & 0x8000) >> 15;
      const exp = (u & 0x7c00) >> 10;
      const frac = u & 0x03ff;
      let value;
      if (exp === 0) {
        value = Math.pow(2, -14) * (frac / 1024);
      } else if (exp === 0x1f) {
        value = frac ? NaN : Infinity;
      } else {
        value = Math.pow(2, exp - 15) * (1 + frac / 1024);
      }
      return sign ? -value : value;
    }

    // Tag handling: lift well-known tags into nicer JS values where lossless,
    // otherwise preserve the tag wrapper so renderers can show "tag(N)".
    const TAG_NAMES = {
      0: 'date/time string',
      1: 'epoch timestamp',
      2: 'positive bignum',
      3: 'negative bignum',
      4: 'decimal fraction',
      5: 'bigfloat',
      21: 'expected b64url',
      22: 'expected b64',
      23: 'expected b16',
      24: 'encoded CBOR',
      32: 'URI',
      33: 'b64url text',
      34: 'b64 text',
      35: 'regex',
      36: 'MIME message',
      55799: 'self-describe CBOR',
      16: 'COSE_Encrypt0',
      17: 'COSE_Mac0',
      18: 'COSE_Sign1',
      96: 'COSE_Encrypt',
      97: 'COSE_Mac',
      98: 'COSE_Sign',
      61: 'CWT'
    };

    function applyTag(tag, inner) {
      // Bignums: convert to BigInt directly so output stays a number-shaped value.
      if (tag === 2 && inner && inner.__cborBytes instanceof Uint8Array) {
        return bytesToBigInt(inner.__cborBytes);
      }
      if (tag === 3 && inner && inner.__cborBytes instanceof Uint8Array) {
        return -1n - bytesToBigInt(inner.__cborBytes);
      }
      // Self-describe: pass through, just remember it for the meta.
      if (tag === 55799) return inner;
      return { __cborTag: tag, value: inner, name: TAG_NAMES[tag] || null };
    }

    function bytesToBigInt(bytes) {
      let n = 0n;
      for (let i = 0; i < bytes.length; i++) {
        n = (n << 8n) | BigInt(bytes[i]);
      }
      return n;
    }

    return { decode: decode, _TAG_NAMES: TAG_NAMES };
  })();

  // =========================================================================
  // Rendering helpers
  // =========================================================================
  function bytesToHex(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i++) {
      s += bytes[i].toString(16).padStart(2, '0');
    }
    return s;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ---------- Pretty JSON renderer (returns highlighted HTML string) -------
  function renderPretty(value) {
    const out = [];
    write(value, 0);
    return out.join('');

    function write(v, depth) {
      const indent = '  '.repeat(depth);
      const indentInner = '  '.repeat(depth + 1);

      if (v === null) { out.push(span('null', 'tok-null')); return; }
      if (v === undefined) { out.push(span('undefined', 'tok-null')); return; }
      if (typeof v === 'boolean') { out.push(span(String(v), 'tok-bool')); return; }
      if (typeof v === 'number') {
        if (Number.isFinite(v)) {
          out.push(span(String(v), 'tok-number'));
        } else {
          out.push(span(JSON.stringify(numberSentinel(v)), 'tok-number'));
        }
        return;
      }
      if (typeof v === 'bigint') {
        out.push(span(JSON.stringify(v.toString()), 'tok-bigint'));
        out.push(span(' // bigint', 'tok-comment'));
        return;
      }
      if (typeof v === 'string') {
        out.push(span(JSON.stringify(v), 'tok-string'));
        return;
      }
      if (v instanceof Uint8Array) { // shouldn't normally hit
        out.push(span(JSON.stringify('0x' + bytesToHex(v)), 'tok-bytes'));
        return;
      }
      if (v && v.__cborBytes instanceof Uint8Array) {
        out.push(span(JSON.stringify('0x' + bytesToHex(v.__cborBytes)), 'tok-bytes'));
        out.push(span(' // bytes(' + v.__cborBytes.length + ')', 'tok-comment'));
        return;
      }
      if (v && typeof v === 'object' && v.__cborSimple !== undefined) {
        out.push(span(JSON.stringify('simple(' + v.__cborSimple + ')'), 'tok-string'));
        return;
      }
      if (v && typeof v === 'object' && '__cborTag' in v) {
        const name = v.name ? ' ' + v.name : '';
        out.push(span('// tag(' + v.__cborTag + ')' + name + '\n' + indent, 'tok-comment'));
        write(v.value, depth);
        return;
      }
      if (Array.isArray(v)) {
        if (v.length === 0) { out.push(span('[]', 'tok-punc')); return; }
        out.push(span('[', 'tok-punc'));
        out.push('\n');
        for (let i = 0; i < v.length; i++) {
          out.push(indentInner);
          write(v[i], depth + 1);
          if (i < v.length - 1) out.push(span(',', 'tok-punc'));
          out.push('\n');
        }
        out.push(indent + span(']', 'tok-punc'));
        return;
      }
      if (v && typeof v === 'object' && Array.isArray(v.__cborMapMixed)) {
        const pairs = v.__cborMapMixed;
        if (pairs.length === 0) { out.push(span('{}', 'tok-punc')); return; }
        out.push(span('{', 'tok-punc'));
        out.push(span(' // map with non-string keys', 'tok-comment'));
        out.push('\n');
        for (let i = 0; i < pairs.length; i++) {
          const k = pairs[i][0];
          const val = pairs[i][1];
          out.push(indentInner);
          out.push(span('// key:', 'tok-comment'));
          out.push(' ');
          write(k, depth + 1);
          out.push('\n');
          out.push(indentInner);
          out.push(span('// value:', 'tok-comment'));
          out.push(' ');
          write(val, depth + 1);
          if (i < pairs.length - 1) out.push(span(',', 'tok-punc'));
          out.push('\n');
        }
        out.push(indent + span('}', 'tok-punc'));
        return;
      }
      if (v && typeof v === 'object') {
        const keys = Object.keys(v);
        if (keys.length === 0) { out.push(span('{}', 'tok-punc')); return; }
        out.push(span('{', 'tok-punc'));
        out.push('\n');
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          out.push(indentInner);
          out.push(span(JSON.stringify(k), 'tok-key'));
          out.push(span(': ', 'tok-punc'));
          write(v[k], depth + 1);
          if (i < keys.length - 1) out.push(span(',', 'tok-punc'));
          out.push('\n');
        }
        out.push(indent + span('}', 'tok-punc'));
        return;
      }
      out.push(span(escapeHtml(String(v)), 'tok-string'));
    }
  }

  function span(text, cls) {
    return '<span class="' + cls + '">' + escapeHtml(text) + '</span>';
  }

  function numberSentinel(v) {
    if (Number.isNaN(v)) return 'NaN';
    if (v === Infinity) return 'Infinity';
    if (v === -Infinity) return '-Infinity';
    return v;
  }

  // ---------- Plain JSON (for Copy / Download) -----------------------------
  function toPlainJson(value) {
    function transform(v) {
      if (v === undefined) return null;
      if (typeof v === 'bigint') return v.toString();
      if (typeof v === 'number' && !Number.isFinite(v)) return numberSentinel(v);
      if (v instanceof Uint8Array) return '0x' + bytesToHex(v);
      if (v && v.__cborBytes instanceof Uint8Array) {
        return '0x' + bytesToHex(v.__cborBytes);
      }
      if (v && typeof v === 'object' && v.__cborSimple !== undefined) {
        return 'simple(' + v.__cborSimple + ')';
      }
      if (v && typeof v === 'object' && '__cborTag' in v) {
        return { ['tag(' + v.__cborTag + ')']: transform(v.value) };
      }
      if (v && typeof v === 'object' && Array.isArray(v.__cborMapMixed)) {
        return v.__cborMapMixed.map(function (p) {
          return [transform(p[0]), transform(p[1])];
        });
      }
      if (Array.isArray(v)) return v.map(transform);
      if (v && typeof v === 'object') {
        const out = {};
        Object.keys(v).forEach(function (k) { out[k] = transform(v[k]); });
        return out;
      }
      return v;
    }
    return JSON.stringify(transform(value), null, 2);
  }

  // ---------- Annotated tree -----------------------------------------------
  function renderTree(container, value) {
    container.innerHTML = '';
    const root = document.createElement('div');
    root.className = 'tree-node';
    buildTreeNode(root, null, value);
    container.appendChild(root);
  }

  function buildTreeNode(parent, key, v) {
    const node = document.createElement('div');
    node.className = 'tree-node';
    const row = document.createElement('div');
    row.className = 'tree-row';
    node.appendChild(row);

    const toggle = document.createElement('span');
    toggle.className = 'tree-toggle leaf';
    toggle.textContent = '▸';
    row.appendChild(toggle);

    if (key !== null) {
      const keyEl = document.createElement('span');
      keyEl.className = 'tree-key';
      keyEl.textContent = (typeof key === 'string')
        ? JSON.stringify(key)
        : (typeof key === 'number' || typeof key === 'bigint')
          ? String(key)
          : describeKey(key);
      row.appendChild(keyEl);
      const colon = document.createElement('span');
      colon.className = 'tree-colon';
      colon.textContent = ':';
      row.appendChild(colon);
    }

    const valueEl = document.createElement('span');
    valueEl.className = 'tree-value';
    const typeEl = document.createElement('span');
    typeEl.className = 'tree-type';

    let children = null;

    if (v === null) {
      valueEl.classList.add('null');
      valueEl.textContent = 'null';
      typeEl.textContent = 'null';
    } else if (v === undefined) {
      valueEl.classList.add('null');
      valueEl.textContent = 'undefined';
      typeEl.textContent = 'undefined';
    } else if (typeof v === 'boolean') {
      valueEl.classList.add('bool');
      valueEl.textContent = String(v);
      typeEl.textContent = 'bool';
    } else if (typeof v === 'number') {
      valueEl.classList.add('number');
      valueEl.textContent = Number.isFinite(v) ? String(v) : numberSentinel(v);
      typeEl.textContent = Number.isInteger(v) ? 'int' : 'float';
    } else if (typeof v === 'bigint') {
      valueEl.classList.add('bigint');
      valueEl.textContent = v.toString() + 'n';
      typeEl.textContent = 'bigint';
    } else if (typeof v === 'string') {
      valueEl.classList.add('string');
      valueEl.textContent = JSON.stringify(v);
      typeEl.textContent = 'text(' + v.length + ')';
    } else if (v && v.__cborBytes instanceof Uint8Array) {
      valueEl.classList.add('bytes');
      const hex = bytesToHex(v.__cborBytes);
      valueEl.textContent = hex.length > 64
        ? '0x' + hex.slice(0, 60) + '… '
        : '0x' + hex;
      typeEl.textContent = 'bytes(' + v.__cborBytes.length + ')';
    } else if (v && typeof v === 'object' && v.__cborSimple !== undefined) {
      valueEl.classList.add('null');
      valueEl.textContent = 'simple(' + v.__cborSimple + ')';
      typeEl.textContent = 'simple';
    } else if (v && typeof v === 'object' && '__cborTag' in v) {
      valueEl.classList.add('tag');
      valueEl.textContent = 'tag(' + v.__cborTag + ')' + (v.name ? ' · ' + v.name : '');
      typeEl.textContent = 'tag';
      children = [['value', v.value]];
    } else if (Array.isArray(v)) {
      valueEl.textContent = '[' + v.length + ']';
      typeEl.textContent = 'array(' + v.length + ')';
      children = v.map(function (item, i) { return [i, item]; });
    } else if (v && typeof v === 'object' && Array.isArray(v.__cborMapMixed)) {
      valueEl.textContent = '{' + v.__cborMapMixed.length + '}';
      typeEl.textContent = 'map(' + v.__cborMapMixed.length + ')*';
      children = v.__cborMapMixed.map(function (p) { return [p[0], p[1]]; });
    } else if (v && typeof v === 'object') {
      const keys = Object.keys(v);
      valueEl.textContent = '{' + keys.length + '}';
      typeEl.textContent = 'map(' + keys.length + ')';
      children = keys.map(function (k) { return [k, v[k]]; });
    } else {
      valueEl.textContent = String(v);
      typeEl.textContent = typeof v;
    }

    row.appendChild(valueEl);
    row.appendChild(typeEl);

    if (children && children.length) {
      toggle.classList.remove('leaf');
      const wrap = document.createElement('div');
      wrap.className = 'tree-children';
      for (let i = 0; i < children.length; i++) {
        buildTreeNode(wrap, children[i][0], children[i][1]);
      }
      node.appendChild(wrap);
      toggle.textContent = '▾';
      toggle.addEventListener('click', function () {
        const collapsed = wrap.classList.toggle('collapsed');
        toggle.textContent = collapsed ? '▸' : '▾';
      });
    }

    parent.appendChild(node);
  }

  function describeKey(k) {
    if (k && k.__cborBytes instanceof Uint8Array) {
      return '0x' + bytesToHex(k.__cborBytes);
    }
    if (k && typeof k === 'object' && '__cborTag' in k) {
      return 'tag(' + k.__cborTag + ')';
    }
    try { return JSON.stringify(k); } catch (e) { return String(k); }
  }

  // =========================================================================
  // Input parsing
  // =========================================================================
  function parseHex(input) {
    const cleaned = input.replace(/0x/gi, '').replace(/[\s,;:_]/g, '');
    if (cleaned.length === 0) return new Uint8Array(0);
    if (!/^[0-9a-fA-F]+$/.test(cleaned)) {
      const m = cleaned.match(/[^0-9a-fA-F]/);
      throw new Error('Invalid hex character "' + m[0] + '"');
    }
    if (cleaned.length % 2 !== 0) {
      throw new Error('Hex input has an odd number of digits (' + cleaned.length + ')');
    }
    const out = new Uint8Array(cleaned.length / 2);
    for (let i = 0; i < out.length; i++) {
      out[i] = parseInt(cleaned.substr(i * 2, 2), 16);
    }
    return out;
  }

  function parseBase64(input, urlSafe) {
    let s = input.replace(/\s+/g, '');
    if (s.length === 0) return new Uint8Array(0);
    if (urlSafe) {
      s = s.replace(/-/g, '+').replace(/_/g, '/');
      while (s.length % 4 !== 0) s += '=';
    }
    let bin;
    try {
      bin = atob(s);
    } catch (e) {
      throw new Error('Invalid base64 input');
    }
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function formatBytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    return (n / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function topLevelTypeLabel(bytes) {
    if (bytes.length === 0) return '—';
    const initial = bytes[0];
    const major = initial >> 5;
    const names = ['uint', 'nint', 'bytes', 'text', 'array', 'map', 'tag', 'simple/float'];
    return 'major ' + major + ' · ' + names[major];
  }

  // =========================================================================
  // UI controller
  // =========================================================================
  const SAMPLE_HEX = 'a26161016162820203';

  document.addEventListener('DOMContentLoaded', function () {
    // Top-level tabs (Decode | Examples)
    const tabBtns = document.querySelectorAll('.cbor-tab-btn');
    const tabPanels = document.querySelectorAll('.cbor-tab-panel');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.dataset.tab;
        tabBtns.forEach(function (b) {
          const active = b === btn;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        tabPanels.forEach(function (p) {
          p.classList.toggle('hidden', p.dataset.tab !== target);
        });
        track('tab_switch', target);
      });
    });

    // Input format mode buttons
    const modeBtns = document.querySelectorAll('.mode-btn');
    const textWrap = document.getElementById('text-input-wrapper');
    const fileWrap = document.getElementById('file-input-wrapper');
    const textarea = document.getElementById('cbor-input');
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
    const fileInput = document.getElementById('cbor-file');
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
          if (textarea.value.trim().length === 0) {
            clearResult();
          } else {
            runDecode(textarea.value);
          }
        } else if (currentBytes && fileMeta.classList.contains('hidden') === false) {
          runDecodeFromBytes(currentBytes);
        }
        track('mode_change', mode);
      });
    });

    function placeholderFor(m) {
      if (m === 'hex')       return 'Paste CBOR payload here. e.g. a26161016162820203';
      if (m === 'base64')    return 'Paste base64-encoded CBOR. e.g. omFhAWFiggID';
      if (m === 'base64url') return 'Paste base64url-encoded CBOR (no padding required)';
      return '';
    }

    // Live decode on textarea input
    textarea.addEventListener('input', function () {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        runDecode(textarea.value);
      }, 150);
    });

    // Paste / Clear / Sample buttons
    pasteBtn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(function (t) {
          if (mode === 'file') {
            mode = 'hex';
            modeBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.mode === 'hex'); });
            textWrap.classList.remove('hidden');
            fileWrap.classList.add('hidden');
          }
          textarea.value = t;
          runDecode(t);
          track('paste');
        }).catch(function () {
          textarea.focus();
        });
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
      if (mode === 'file') {
        mode = 'hex';
        modeBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.mode === 'hex'); });
        textWrap.classList.remove('hidden');
        fileWrap.classList.add('hidden');
      }
      textarea.value = SAMPLE_HEX;
      runDecode(SAMPLE_HEX);
      track('sample_load', 'default');
    });

    // Copy / Download
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
        // Fallback for older browsers
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
      a.download = 'cbor-decoded.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 0);
      track('download_json');
    });

    // Result view tabs (Pretty | Tree)
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

    // File handling (drag/drop + click)
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
        showError('File is too large (' + formatBytes(file.size) + '). Limit is 5 MB to keep the page responsive.');
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
      reader.onerror = function () {
        showError('Could not read file.');
      };
      reader.readAsArrayBuffer(file);
    }

    function clearFile() {
      fileInput.value = '';
      fileMeta.classList.add('hidden');
      fileName.textContent = '—';
      fileSize.textContent = '—';
    }

    // -------------------- decode driver --------------------
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
      const t0 = performance.now();
      let result;
      try {
        result = CBOR.decode(bytes);
      } catch (e) {
        showError(e.message || 'Failed to decode CBOR');
        clearResult();
        track('decode_error', truncate(e.message || '', 80));
        return;
      }
      const elapsed = performance.now() - t0;

      const json = toPlainJson(result.value);
      currentJson = json;

      prettyOut.innerHTML = renderPretty(result.value);
      renderTree(treeOut, result.value);

      metaInput.textContent = formatBytes(bytes.length);
      metaOutput.textContent = formatBytes(new Blob([json]).size);
      metaTime.textContent = elapsed < 1
        ? '<1 ms'
        : (elapsed < 10 ? elapsed.toFixed(2) : elapsed.toFixed(1)) + ' ms';
      metaType.textContent = topLevelTypeLabel(bytes);

      resultSection.classList.remove('hidden');
      copyBtn.disabled = false;
      downloadBtn.disabled = false;

      clearError();
      const trailing = bytes.length - result.bytesRead;
      if (trailing > 0) {
        showWarning(
          'Decoded ' + result.bytesRead + ' byte' + (result.bytesRead === 1 ? '' : 's') +
          ', ' + trailing + ' trailing byte' + (trailing === 1 ? '' : 's') +
          ' unread. Showing the first complete CBOR item.'
        );
      } else {
        hideWarning();
      }
      track('decode_success', mode, bytes.length);
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

    // Example buttons jump back to Decode tab and load the hex
    document.querySelectorAll('.example-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const hex = btn.dataset.hex;
        if (!hex) return;
        // switch to decode tab
        tabBtns.forEach(function (b) {
          const active = b.dataset.tab === 'decode';
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        tabPanels.forEach(function (p) {
          p.classList.toggle('hidden', p.dataset.tab !== 'decode');
        });
        // switch to hex mode
        mode = 'hex';
        modeBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.mode === 'hex'); });
        textWrap.classList.remove('hidden');
        fileWrap.classList.add('hidden');
        textarea.value = hex;
        runDecode(hex);
        textarea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        track('example_load', btn.dataset.label || hex);
      });
    });
  });
})();
