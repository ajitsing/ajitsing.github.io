/* ==========================================================================
 * Curl Converter — parser + generators + UI (no dependencies)
 * ========================================================================== */
(function () {
  'use strict';

  function track(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'Curl Converter',
        event_label: label,
        value: value
      });
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Parser                                                                 */
  /* ---------------------------------------------------------------------- */
  function createIR() {
    return {
      method: 'GET',
      url: '',
      headers: [],
      queryParams: [],
      body: { kind: 'none', data: null },
      auth: { kind: 'none', user: '', pass: '' },
      cookies: [],
      followRedirects: false,
      insecure: false,
      compressed: false,
      timeout: null,
      proxy: null,
      warnings: []
    };
  }

  function preprocess(input) {
    let s = input.replace(/\r\n/g, '\n').replace(/\\\n/g, ' ');
    s = s.trim();
    s = s.replace(/^\$\s*/, '');
    if (/^curl\b/i.test(s)) s = s.replace(/^curl\b\s*/i, '');
    return s;
  }

  function tokenizeShell(input) {
    const tokens = [];
    let i = 0;
    const len = input.length;

    function skipWs() {
      while (i < len && /[\s]/.test(input[i])) i++;
    }

    function readSingleQuoted() {
      const start = i + 1;
      i++;
      while (i < len && input[i] !== "'") i++;
      if (i >= len) throw new Error('Unterminated single-quoted string at char ' + start);
      const val = input.slice(start, i);
      i++;
      return val;
    }

    function readDoubleQuoted() {
      const start = i + 1;
      i++;
      let val = '';
      while (i < len) {
        if (input[i] === '\\' && i + 1 < len) {
          const n = input[i + 1];
          if (n === 'n') val += '\n';
          else if (n === 't') val += '\t';
          else if (n === 'r') val += '\r';
          else if (n === '\\') val += '\\';
          else if (n === '"') val += '"';
          else if (n === '$') val += '$';
          else val += n;
          i += 2;
        } else if (input[i] === '"') {
          i++;
          return val;
        } else {
          val += input[i++];
        }
      }
      throw new Error('Unterminated double-quoted string at char ' + start);
    }

    function readAnsiC() {
      const start = i + 2;
      i += 2;
      let val = '';
      while (i < len) {
        if (input[i] === '\\' && i + 1 < len) {
          const n = input[i + 1];
          if (n === 'n') val += '\n';
          else if (n === 't') val += '\t';
          else if (n === 'r') val += '\r';
          else if (n === '\\') val += '\\';
          else if (n === "'") val += "'";
          else if (n === 'x' && i + 3 < len) {
            val += String.fromCharCode(parseInt(input.slice(i + 2, i + 4), 16));
            i += 4;
            continue;
          } else val += n;
          i += 2;
        } else if (input[i] === "'") {
          i++;
          return val;
        } else {
          val += input[i++];
        }
      }
      throw new Error('Unterminated $\' string at char ' + start);
    }

    function readBare() {
      const start = i;
      while (i < len && !/[\s#]/.test(input[i])) i++;
      return input.slice(start, i);
    }

    while (i < len) {
      skipWs();
      if (i >= len) break;
      if (input[i] === '#') {
        while (i < len && input[i] !== '\n') i++;
        continue;
      }
      if (input[i] === "'") {
        tokens.push(readSingleQuoted());
        continue;
      }
      if (input[i] === '"') {
        tokens.push(readDoubleQuoted());
        continue;
      }
      if (input[i] === '$' && i + 1 < len && input[i + 1] === "'") {
        tokens.push(readAnsiC());
        continue;
      }
      const bare = readBare();
      if (bare) tokens.push(bare);
    }
    return tokens;
  }

  function isUrl(s) {
    return /^https?:\/\//i.test(s) || /^ftp:\/\//i.test(s);
  }

  function parseHeaderLine(line) {
    const idx = line.indexOf(':');
    if (idx === -1) return [line.trim(), ''];
    return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
  }

  function setHeader(ir, name, value) {
    const n = name.toLowerCase();
    if (n === 'authorization' && /^bearer\s+/i.test(value)) {
      ir.auth = { kind: 'bearer', token: value.replace(/^bearer\s+/i, '') };
      return;
    }
    ir.headers.push([name, value]);
  }

  function tryParseJson(s) {
    try {
      return JSON.parse(s);
    } catch (e) {
      return null;
    }
  }

  function finalizeBody(ir) {
    if (ir.body.kind === 'none') return;
    const ct = getHeader(ir, 'content-type');
    if (ir.body.kind === 'raw' && typeof ir.body.data === 'string') {
      if ((ct && ct.indexOf('application/json') !== -1) || tryParseJson(ir.body.data) !== null) {
        const parsed = tryParseJson(ir.body.data);
        if (parsed !== null) {
          ir.body = { kind: 'json', data: parsed };
        }
      } else if (ct && ct.indexOf('application/x-www-form-urlencoded') !== -1) {
        ir.body = { kind: 'form-urlencoded', data: parseFormUrlencoded(ir.body.data) };
      }
    }
    if (ir.method === 'GET' && ir.body.kind !== 'none') {
      ir.method = 'POST';
    }
  }

  function parseFormUrlencoded(s) {
    const out = [];
    const parts = s.split('&');
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      const eq = p.indexOf('=');
      if (eq === -1) out.push([decodeURIComponent(p.replace(/\+/g, ' ')), '']);
      else {
        out.push([
          decodeURIComponent(p.slice(0, eq).replace(/\+/g, ' ')),
          decodeURIComponent(p.slice(eq + 1).replace(/\+/g, ' '))
        ]);
      }
    }
    return out;
  }

  function getHeader(ir, name) {
    const n = name.toLowerCase();
    for (let i = ir.headers.length - 1; i >= 0; i--) {
      if (ir.headers[i][0].toLowerCase() === n) return ir.headers[i][1];
    }
    return null;
  }

  function addFormUrlencode(ir, pair) {
    if (ir.body.kind === 'none') {
      ir.body = { kind: 'form-urlencoded', data: [pair] };
    } else if (ir.body.kind === 'form-urlencoded') {
      ir.body.data.push(pair);
    } else {
      ir.warnings.push('Multiple body types; keeping last form field');
      ir.body = { kind: 'form-urlencoded', data: [pair] };
    }
  }

  function addMultipart(ir, part) {
    if (ir.body.kind === 'none' || ir.body.kind === 'multipart') {
      if (ir.body.kind === 'none') ir.body = { kind: 'multipart', data: [] };
      ir.body.data.push(part);
    } else {
      ir.warnings.push('Cannot mix multipart with other body types');
    }
  }

  const IGNORE_FLAGS = new Set([
    '-s', '--silent', '-S', '--show-error', '-v', '--verbose', '-#', '--progress-bar',
    '-o', '--output', '-O', '--remote-name', '--write-out', '--stderr', '--dump-header'
  ]);

  const NEXT_ARG = {
    '-X': 'method', '--request': 'method',
    '-H': 'header', '--header': 'header',
    '-d': 'data', '--data': 'data', '--data-ascii': 'data', '--data-binary': 'data-binary',
    '--data-raw': 'data-raw', '--data-urlencode': 'data-urlencode',
    '--json': 'json',
    '-F': 'form', '--form': 'form',
    '-u': 'user', '--user': 'user',
    '-A': 'user-agent', '--user-agent': 'user-agent',
    '-e': 'referer', '--referer': 'referer',
    '-b': 'cookie', '--cookie': 'cookie',
    '-c': 'cookie-jar', '--cookie-jar': 'cookie-jar',
    '-x': 'proxy', '--proxy': 'proxy',
    '--max-time': 'max-time', '--connect-timeout': 'connect-timeout',
    '-o': 'output', '--output': 'output'
  };

  const BOOL_FLAGS = new Set([
    '-L', '--location', '-k', '--insecure', '--compressed', '-G', '--get', '-I', '--head'
  ]);

  function parseCurl(input) {
    const ir = createIR();
    const pre = preprocess(input);
    if (!pre) return ir;
    const tokens = tokenizeShell(pre);
    let i = 0;

    function next() {
      return i < tokens.length ? tokens[i++] : null;
    }

    function peek() {
      return i < tokens.length ? tokens[i] : null;
    }

    while (i < tokens.length) {
      let tok = tokens[i++];
      if (!tok) continue;

      if (tok.startsWith('-')) {
        let flag = tok;
        let inline = null;
        if (flag.indexOf('=') !== -1) {
          const parts = flag.split('=');
          flag = parts[0];
          inline = parts.slice(1).join('=');
        }

        if (IGNORE_FLAGS.has(flag)) {
          if (flag === '-o' || flag === '--output') next();
          continue;
        }

        if (BOOL_FLAGS.has(flag)) {
          if (flag === '-L' || flag === '--location') ir.followRedirects = true;
          if (flag === '-k' || flag === '--insecure') ir.insecure = true;
          if (flag === '--compressed') ir.compressed = true;
          if (flag === '-G' || flag === '--get') {
            /* defer: move body to query at end */
            ir._get = true;
          }
          if (flag === '-I' || flag === '--head') ir.method = 'HEAD';
          continue;
        }

        const kind = NEXT_ARG[flag];
        const arg = inline !== null ? inline : next();
        if (!kind) {
          if (flag.startsWith('--')) ir.warnings.push('Unknown flag: ' + flag);
          continue;
        }

        if (kind === 'method' && arg) ir.method = arg.toUpperCase();
        else if (kind === 'header' && arg) {
          const [k, v] = parseHeaderLine(arg);
          setHeader(ir, k, v);
        } else if (kind === 'data' && arg !== null) {
          ir.body = { kind: 'raw', data: arg };
        } else if (kind === 'data-binary' && arg !== null) {
          if (arg.charAt(0) === '@') {
            ir.warnings.push('Binary file body @' + arg.slice(1) + ' cannot be read in browser');
            ir.body = { kind: 'binary-file', data: arg.slice(1) };
          } else {
            ir.body = { kind: 'raw', data: arg };
          }
        } else if (kind === 'data-raw' && arg !== null) {
          ir.body = { kind: 'raw', data: arg };
        } else if (kind === 'data-urlencode' && arg !== null) {
          const eq = arg.indexOf('=');
          if (eq === -1) addFormUrlencode(ir, [arg, '']);
          else addFormUrlencode(ir, [arg.slice(0, eq), arg.slice(eq + 1)]);
        } else if (kind === 'json' && arg !== null) {
          const parsed = tryParseJson(arg);
          ir.body = parsed !== null ? { kind: 'json', data: parsed } : { kind: 'raw', data: arg };
          setHeader(ir, 'Content-Type', 'application/json');
          setHeader(ir, 'Accept', 'application/json');
        } else if (kind === 'form' && arg !== null) {
          const eq = arg.indexOf('=');
          let part;
          if (eq === -1) part = { name: arg, value: '', file: false };
          else {
            const name = arg.slice(0, eq);
            let value = arg.slice(eq + 1);
            if (value.charAt(0) === '@') {
              ir.warnings.push('File upload @' + value.slice(1) + ' — replace with local path in generated code');
              part = { name: name, value: value.slice(1), file: true, path: value.slice(1) };
            } else if (value.charAt(0) === '<') {
              ir.warnings.push('Form field ' + name + ' uses stdin; not supported');
              part = { name: name, value: '', file: false };
            } else {
              part = { name: name, value: value, file: false };
            }
          }
          addMultipart(ir, part);
        } else if (kind === 'user' && arg !== null) {
          const colon = arg.indexOf(':');
          if (colon !== -1) {
            ir.auth = { kind: 'basic', user: arg.slice(0, colon), pass: arg.slice(colon + 1) };
          } else {
            ir.auth = { kind: 'basic', user: arg, pass: '' };
          }
        } else if (kind === 'user-agent' && arg) setHeader(ir, 'User-Agent', arg);
        else if (kind === 'referer' && arg) setHeader(ir, 'Referer', arg);
        else if (kind === 'cookie' && arg) {
          arg.split(';').forEach(function (c) {
            const p = c.trim().indexOf('=');
            if (p === -1) ir.cookies.push([c.trim(), '']);
            else ir.cookies.push([c.trim().slice(0, p), c.trim().slice(p + 1)]);
          });
        } else if (kind === 'cookie-jar') {
          ir.warnings.push('Cookie jar file not supported in browser converter');
        } else if (kind === 'proxy' && arg) ir.proxy = arg;
        else if (kind === 'max-time' && arg) ir.timeout = parseFloat(arg);
        else if (kind === 'connect-timeout' && arg) ir.timeout = parseFloat(arg);
        else if (kind === 'output') { /* ignored */ }
        continue;
      }

      if (isUrl(tok) || tok.indexOf('.') !== -1 || /^localhost/.test(tok)) {
        if (!ir.url) ir.url = tok;
        else ir.warnings.push('Multiple URLs; using first: ' + ir.url);
      }
    }

    if (ir._get && ir.body.kind !== 'none') {
      if (ir.body.kind === 'form-urlencoded') {
        ir.queryParams = ir.queryParams.concat(ir.body.data);
      } else if (ir.body.kind === 'raw' && typeof ir.body.data === 'string') {
        parseFormUrlencoded(ir.body.data).forEach(function (p) { ir.queryParams.push(p); });
      }
      ir.body = { kind: 'none', data: null };
      ir.method = 'GET';
    }
    delete ir._get;

    finalizeBody(ir);
    return ir;
  }

  /* ---------------------------------------------------------------------- */
  /* Generator utilities                                                    */
  /* ---------------------------------------------------------------------- */
  function warnBlock(ir, commentChar) {
    const c = commentChar || '#';
    if (!ir.warnings.length) return '';
    return ir.warnings.map(function (w) { return c + ' ' + w; }).join('\n') + '\n\n';
  }

  function filterHeaders(ir, skip) {
    const skipL = (skip || []).map(function (s) { return s.toLowerCase(); });
    return ir.headers.filter(function (h) {
      return skipL.indexOf(h[0].toLowerCase()) === -1;
    });
  }

  function pyRepr(val, indent) {
    indent = indent || 0;
    const sp = '  '.repeat(indent);
    if (val === null) return 'None';
    if (typeof val === 'boolean') return val ? 'True' : 'False';
    if (typeof val === 'number') return String(val);
    if (typeof val === 'string') return JSON.stringify(val);
    if (Array.isArray(val)) {
      if (!val.length) return '[]';
      return '[\n' + val.map(function (v) {
        return sp + '  ' + pyRepr(v, indent + 1);
      }).join(',\n') + '\n' + sp + ']';
    }
    if (typeof val === 'object') {
      const keys = Object.keys(val);
      if (!keys.length) return '{}';
      return '{\n' + keys.map(function (k) {
        return sp + '  ' + JSON.stringify(k) + ': ' + pyRepr(val[k], indent + 1);
      }).join(',\n') + '\n' + sp + '}';
    }
    return 'None';
  }

  function jsObject(val, indent) {
    indent = indent || 0;
    const sp = '  '.repeat(indent);
    if (val === null) return 'null';
    if (typeof val === 'boolean' || typeof val === 'number') return String(val);
    if (typeof val === 'string') return JSON.stringify(val);
    if (Array.isArray(val)) {
      if (!val.length) return '[]';
      return '[\n' + val.map(function (v) {
        return sp + '  ' + jsObject(v, indent + 1);
      }).join(',\n') + '\n' + sp + ']';
    }
    const keys = Object.keys(val);
    if (!keys.length) return '{}';
    return '{\n' + keys.map(function (k) {
      return sp + '  ' + JSON.stringify(k) + ': ' + jsObject(val[k], indent + 1);
    }).join(',\n') + '\n' + sp + '}';
  }

  function goLiteral(val, indent) {
    indent = indent || 0;
    const sp = '\t'.repeat(indent);
    if (val === null) return 'nil';
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (typeof val === 'number') return String(val);
    if (typeof val === 'string') return JSON.stringify(val);
    if (Array.isArray(val)) {
      return '[]interface{}{' + val.map(function (v) { return goLiteral(v, 0); }).join(', ') + '}';
    }
    const keys = Object.keys(val);
    return 'map[string]interface{}{' + keys.map(function (k) {
      return JSON.stringify(k) + ': ' + goLiteral(val[k], 0);
    }).join(', ') + '}';
  }

  function buildUrlWithQuery(ir) {
    if (!ir.queryParams.length) return ir.url;
    try {
      const u = new URL(ir.url);
      ir.queryParams.forEach(function (p) {
        u.searchParams.append(p[0], p[1]);
      });
      return u.toString();
    } catch (e) {
      const sep = ir.url.indexOf('?') >= 0 ? '&' : '?';
      const q = ir.queryParams.map(function (p) {
        return encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1]);
      }).join('&');
      return ir.url + sep + q;
    }
  }

  function authHeaders(ir) {
    if (ir.auth.kind === 'bearer') return [['Authorization', 'Bearer ' + ir.auth.token]];
    return [];
  }

  /* ---------------------------------------------------------------------- */
  /* Generators                                                             */
  /* ---------------------------------------------------------------------- */
  function genPythonRequests(ir) {
    const lines = [warnBlock(ir, '#'), 'import requests', ''];
    const url = buildUrlWithQuery(ir);
    const hdrs = filterHeaders(ir, ['content-type', 'content-length']);
    const allHdrs = hdrs.concat(authHeaders(ir));
    if (allHdrs.length) {
      lines.push('headers = {');
      allHdrs.forEach(function (h) {
        lines.push('    ' + JSON.stringify(h[0]) + ': ' + JSON.stringify(h[1]) + ',');
      });
      lines.push('}');
      lines.push('');
    }
    if (ir.auth.kind === 'basic') {
      lines.push('auth = (' + JSON.stringify(ir.auth.user) + ', ' + JSON.stringify(ir.auth.pass) + ')');
      lines.push('');
    }
    if (ir.body.kind === 'json') {
      lines.push('payload = ' + pyRepr(ir.body.data));
      lines.push('');
    } else if (ir.body.kind === 'form-urlencoded') {
      lines.push('data = {');
      ir.body.data.forEach(function (p) {
        lines.push('    ' + JSON.stringify(p[0]) + ': ' + JSON.stringify(p[1]) + ',');
      });
      lines.push('}');
      lines.push('');
    } else if (ir.body.kind === 'multipart') {
      lines.push('files = {');
      ir.body.data.forEach(function (p) {
        if (p.file) {
          lines.push('    ' + JSON.stringify(p.name) + ': open(' + JSON.stringify(p.path) + ', "rb"),');
        } else {
          lines.push('    ' + JSON.stringify(p.name) + ': (None, ' + JSON.stringify(p.value) + '),');
        }
      });
      lines.push('}');
      lines.push('');
    } else if (ir.body.kind === 'raw') {
      lines.push('data = ' + JSON.stringify(ir.body.data));
      lines.push('');
    }
    const method = ir.method.toLowerCase();
    const args = [JSON.stringify(url)];
    if (allHdrs.length) args.push('headers=headers');
    if (ir.auth.kind === 'basic') args.push('auth=auth');
    if (ir.body.kind === 'json') args.push('json=payload');
    else if (ir.body.kind === 'form-urlencoded') args.push('data=data');
    else if (ir.body.kind === 'multipart') args.push('files=files');
    else if (ir.body.kind === 'raw') args.push('data=data');
    lines.push('response = requests.' + method + '(' + args.join(', ') + ')');
    lines.push('print(response.status_code)');
    lines.push('print(response.text)');
    return lines.join('\n');
  }

  function genPythonHttpx(ir) {
    const base = genPythonRequests(ir);
    return base.replace(/import requests/g, 'import httpx')
      .replace(/requests\./g, 'httpx.');
  }

  function genPhpCurl(ir) {
    const lines = [warnBlock(ir, '//'), '<?php', '', '$ch = curl_init();', ''];
    const url = buildUrlWithQuery(ir);
    lines.push('curl_setopt($ch, CURLOPT_URL, ' + JSON.stringify(url) + ');');
    if (ir.followRedirects) lines.push('curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);');
    if (ir.insecure) lines.push('curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);');
    if (ir.compressed) lines.push('curl_setopt($ch, CURLOPT_ENCODING, "");');
    if (ir.proxy) lines.push('curl_setopt($ch, CURLOPT_PROXY, ' + JSON.stringify(ir.proxy) + ');');
    if (ir.timeout) lines.push('curl_setopt($ch, CURLOPT_TIMEOUT, ' + ir.timeout + ');');

    const method = ir.method.toUpperCase();
    if (method !== 'GET') {
      lines.push('curl_setopt($ch, CURLOPT_CUSTOMREQUEST, ' + JSON.stringify(method) + ');');
    }

    if (ir.auth.kind === 'basic') {
      lines.push('curl_setopt($ch, CURLOPT_USERPWD, ' + JSON.stringify(ir.auth.user + ':' + ir.auth.pass) + ');');
    }

    const hdrList = filterHeaders(ir, []);
    const hdrOut = hdrList.map(function (h) {
      return JSON.stringify(h[0] + ': ' + h[1]);
    });
    if (ir.auth.kind === 'bearer') hdrOut.push(JSON.stringify('Authorization: Bearer ' + ir.auth.token));
    if (hdrOut.length) {
      lines.push('curl_setopt($ch, CURLOPT_HTTPHEADER, [');
      hdrOut.forEach(function (h) { lines.push('    ' + h + ','); });
      lines.push(']);');
    }

    if (ir.body.kind === 'json') {
      lines.push('$body = ' + JSON.stringify(JSON.stringify(ir.body.data)) + ';');
      lines.push('curl_setopt($ch, CURLOPT_POSTFIELDS, $body);');
    } else if (ir.body.kind === 'form-urlencoded') {
      lines.push('curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([');
      ir.body.data.forEach(function (p) {
        lines.push('    ' + JSON.stringify(p[0]) + ' => ' + JSON.stringify(p[1]) + ',');
      });
      lines.push(']));');
    } else if (ir.body.kind === 'multipart') {
      lines.push('$postFields = [');
      ir.body.data.forEach(function (p) {
        if (p.file) {
          lines.push('    ' + JSON.stringify(p.name) + ' => new CURLFile(' + JSON.stringify(p.path) + '),');
        } else {
          lines.push('    ' + JSON.stringify(p.name) + ' => ' + JSON.stringify(p.value) + ',');
        }
      });
      lines.push('];');
      lines.push('curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);');
    } else if (ir.body.kind === 'raw') {
      lines.push('curl_setopt($ch, CURLOPT_POSTFIELDS, ' + JSON.stringify(ir.body.data) + ');');
    }

    lines.push('');
    lines.push('$response = curl_exec($ch);');
    lines.push('if (curl_errno($ch)) {');
    lines.push('    throw new Exception(curl_error($ch));');
    lines.push('}');
    lines.push('curl_close($ch);');
    lines.push('echo $response;');
    return lines.join('\n');
  }

  function genPhpGuzzle(ir) {
    const lines = [warnBlock(ir, '//'), '<?php', '', 'use GuzzleHttp\\Client;', '', '$client = new Client();', ''];
    const url = buildUrlWithQuery(ir);
    const opts = [];
    opts.push("'method' => " + JSON.stringify(ir.method.toUpperCase()));
    opts.push("'uri' => " + JSON.stringify(url));

    const hdrs = {};
    filterHeaders(ir, []).forEach(function (h) { hdrs[h[0]] = h[1]; });
    if (ir.auth.kind === 'bearer') hdrs['Authorization'] = 'Bearer ' + ir.auth.token;
    lines.push('$options = [');
    if (Object.keys(hdrs).length) {
      lines.push("    'headers' => " + JSON.stringify(hdrs) + ',');
    }

    if (ir.auth.kind === 'basic') {
      lines.push("    'auth' => [" + JSON.stringify(ir.auth.user) + ', ' + JSON.stringify(ir.auth.pass) + '],');
    }
    if (ir.body.kind === 'json') {
      lines.push("    'json' => " + JSON.stringify(ir.body.data) + ',');
    } else if (ir.body.kind === 'form-urlencoded') {
      const fp = {};
      ir.body.data.forEach(function (p) { fp[p[0]] = p[1]; });
      lines.push("    'form_params' => " + JSON.stringify(fp) + ',');
    } else if (ir.body.kind === 'multipart') {
      lines.push("    'multipart' => [");
      ir.body.data.forEach(function (p) {
        if (p.file) {
          lines.push("        ['name' => " + JSON.stringify(p.name) + ", 'contents' => fopen(" + JSON.stringify(p.path) + ", 'r')],");
        } else {
          lines.push("        ['name' => " + JSON.stringify(p.name) + ", 'contents' => " + JSON.stringify(p.value) + '],');
        }
      });
      lines.push('    ],');
    } else if (ir.body.kind === 'raw') {
      lines.push("    'body' => " + JSON.stringify(ir.body.data) + ',');
    }
    if (ir.followRedirects) lines.push("    'allow_redirects' => true,");
    if (ir.insecure) lines.push("    'verify' => false,");
    if (ir.proxy) lines.push("    'proxy' => " + JSON.stringify(ir.proxy) + ',');
    lines.push('];');
    lines.push('');
    lines.push('$response = $client->request(' + JSON.stringify(ir.method.toUpperCase()) + ', ' + JSON.stringify(url) + ', $options);');
    lines.push('echo $response->getBody();');
    return lines.join('\n');
  }

  function genGo(ir) {
    const url = buildUrlWithQuery(ir);
    const goImports = ['bytes', 'encoding/json', 'fmt', 'io', 'net/http'];
    if (ir.body.kind === 'raw' || ir.body.kind === 'form-urlencoded') {
      goImports.push('strings');
    }
    const lines = [
      warnBlock(ir, '//'),
      'package main',
      '',
      'import (',
    ].concat(goImports.map(function (p) { return '    "' + p + '"'; })).concat([')', '']);

    if (ir.body.kind === 'json') {
      lines.push('payload := ' + goLiteral(ir.body.data));
      lines.push('bodyBytes, err := json.Marshal(payload)');
      lines.push('if err != nil { panic(err) }');
      lines.push('body := bytes.NewReader(bodyBytes)');
    } else if (ir.body.kind === 'raw') {
      lines.push('body := strings.NewReader(' + JSON.stringify(ir.body.data) + ')');
    } else if (ir.body.kind === 'form-urlencoded') {
      const enc = ir.body.data.map(function (p) {
        return encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1]);
      }).join('&');
      lines.push('body := strings.NewReader(' + JSON.stringify(enc) + ')');
    } else {
      lines.push('var body io.Reader');
    }

    lines.push('');
    lines.push('req, err := http.NewRequest(' + JSON.stringify(ir.method.toUpperCase()) + ', ' + JSON.stringify(url) + ', body)');
    lines.push('if err != nil { panic(err) }');
    filterHeaders(ir, []).forEach(function (h) {
      lines.push('req.Header.Set(' + JSON.stringify(h[0]) + ', ' + JSON.stringify(h[1]) + ')');
    });
    if (ir.auth.kind === 'bearer') {
      lines.push('req.Header.Set("Authorization", ' + JSON.stringify('Bearer ' + ir.auth.token) + ')');
    }
    if (ir.auth.kind === 'basic') {
      lines.push('req.SetBasicAuth(' + JSON.stringify(ir.auth.user) + ', ' + JSON.stringify(ir.auth.pass) + ')');
    }
    lines.push('');
    lines.push('client := &http.Client{}');
    if (ir.followRedirects) lines.push('// Default client follows redirects');
    if (ir.insecure) lines.push('// Use custom Transport with InsecureSkipVerify for -k');
    lines.push('resp, err := client.Do(req)');
    lines.push('if err != nil { panic(err) }');
    lines.push('defer resp.Body.Close()');
    lines.push('b, _ := io.ReadAll(resp.Body)');
    lines.push('fmt.Println(string(b))');
    return lines.join('\n');
  }

  function genAxios(ir) {
    const lines = [warnBlock(ir, '//'), "const axios = require('axios');", ''];
    const url = buildUrlWithQuery(ir);
    const cfg = [];
    cfg.push('  method: ' + JSON.stringify(ir.method.toLowerCase()));
    cfg.push('  url: ' + JSON.stringify(url));

    const hdrs = {};
    filterHeaders(ir, []).forEach(function (h) { hdrs[h[0]] = h[1]; });
    if (ir.auth.kind === 'bearer') hdrs['Authorization'] = 'Bearer ' + ir.auth.token;
    if (Object.keys(hdrs).length) cfg.push('  headers: ' + jsObject(hdrs, 1));

    if (ir.auth.kind === 'basic') {
      cfg.push('  auth: { username: ' + JSON.stringify(ir.auth.user) + ', password: ' + JSON.stringify(ir.auth.pass) + ' }');
    }

    if (ir.body.kind === 'json') {
      cfg.push('  data: ' + jsObject(ir.body.data, 1));
    } else if (ir.body.kind === 'form-urlencoded') {
      cfg.push('  data: new URLSearchParams(' + jsObject(Object.fromEntries(ir.body.data), 1) + ')');
    } else if (ir.body.kind === 'multipart') {
      lines.push('const FormData = require("form-data");');
      lines.push('const form = new FormData();');
      ir.body.data.forEach(function (p) {
        if (p.file) {
          lines.push('form.append(' + JSON.stringify(p.name) + ', require("fs").createReadStream(' + JSON.stringify(p.path) + '));');
        } else {
          lines.push('form.append(' + JSON.stringify(p.name) + ', ' + JSON.stringify(p.value) + ');');
        }
      });
      lines.push('');
      cfg.push('  data: form');
      cfg.push('  headers: { ...form.getHeaders() }');
    } else if (ir.body.kind === 'raw') {
      cfg.push('  data: ' + JSON.stringify(ir.body.data));
    }

    if (ir.followRedirects) cfg.push('  maxRedirects: 5');
    if (ir.proxy) cfg.push('  proxy: ' + JSON.stringify(ir.proxy));

    lines.push('const config = {');
    lines.push(cfg.join(',\n'));
    lines.push('};');
    lines.push('');
    lines.push('axios(config)');
    lines.push('  .then((res) => console.log(res.status, res.data))');
    lines.push('  .catch((err) => console.error(err));');
    return lines.join('\n');
  }

  function genJavaOkHttp(ir) {
    const lines = [
      warnBlock(ir, '//'),
      'import okhttp3.*;',
      'import java.io.IOException;',
      '',
      'public class Main {',
      '  public static void main(String[] args) throws IOException {',
      '    OkHttpClient client = new OkHttpClient();',
      ''
    ];
    const url = buildUrlWithQuery(ir);
    let bodyExpr = 'null';
    const ct = getHeader(ir, 'content-type') || 'application/json';

    if (ir.body.kind === 'json') {
      lines.push('    String json = ' + JSON.stringify(JSON.stringify(ir.body.data)) + ';');
      lines.push('    MediaType mediaType = MediaType.parse(' + JSON.stringify(ct) + ');');
      lines.push('    RequestBody body = RequestBody.create(json, mediaType);');
      bodyExpr = 'body';
    } else if (ir.body.kind === 'raw') {
      lines.push('    RequestBody body = RequestBody.create(' + JSON.stringify(ir.body.data) + ', MediaType.parse(' + JSON.stringify(ct) + '));');
      bodyExpr = 'body';
    } else if (ir.body.kind === 'form-urlencoded') {
      const fb = new URLSearchParams();
      ir.body.data.forEach(function (p) { fb.append(p[0], p[1]); });
      lines.push('    FormBody.Builder formBuilder = new FormBody.Builder();');
      ir.body.data.forEach(function (p) {
        lines.push('    formBuilder.add(' + JSON.stringify(p[0]) + ', ' + JSON.stringify(p[1]) + ');');
      });
      lines.push('    RequestBody body = formBuilder.build();');
      bodyExpr = 'body';
    } else if (ir.body.kind === 'multipart') {
      lines.push('    MultipartBody.Builder multipart = new MultipartBody.Builder().setType(MultipartBody.FORM);');
      ir.body.data.forEach(function (p) {
        if (p.file) {
          lines.push('  // multipart.addFormDataPart(' + JSON.stringify(p.name) + ', "file", RequestBody.create(new File(' + JSON.stringify(p.path) + '), null));');
        } else {
          lines.push('    multipart.addFormDataPart(' + JSON.stringify(p.name) + ', ' + JSON.stringify(p.value) + ');');
        }
      });
      lines.push('    RequestBody body = multipart.build();');
      bodyExpr = 'body';
    }

    lines.push('    Request request = new Request.Builder()');
    lines.push('      .url(' + JSON.stringify(url) + ')');
    lines.push('      .method(' + JSON.stringify(ir.method.toUpperCase()) + ', ' + bodyExpr + ')');
    filterHeaders(ir, ['content-type', 'content-length']).forEach(function (h) {
      lines.push('      .addHeader(' + JSON.stringify(h[0]) + ', ' + JSON.stringify(h[1]) + ')');
    });
    if (ir.auth.kind === 'bearer') {
      lines.push('      .addHeader("Authorization", ' + JSON.stringify('Bearer ' + ir.auth.token) + ')');
    }
    lines.push('      .build();');
    lines.push('');
    lines.push('    try (Response response = client.newCall(request).execute()) {');
    lines.push('      System.out.println(response.body().string());');
    lines.push('    }');
    lines.push('  }');
    lines.push('}');
    return lines.join('\n');
  }

  function genCSharpHttpClient(ir) {
    const lines = [
      warnBlock(ir, '//'),
      'using System;',
      'using System.Net.Http;',
      'using System.Text;',
      'using System.Threading.Tasks;',
      '',
      'class Program',
      '{',
      '    static async Task Main()',
      '    {',
      '        using var client = new HttpClient();',
      ''
    ];
    const url = buildUrlWithQuery(ir);
    const httpMethod = { GET: 'Get', POST: 'Post', PUT: 'Put', PATCH: 'Patch', DELETE: 'Delete', HEAD: 'Head', OPTIONS: 'Options' };
    const m = httpMethod[ir.method.toUpperCase()] || 'Get';
    lines.push('        var request = new HttpRequestMessage(HttpMethod.' + m + ', ' + JSON.stringify(url) + ');');

    if (ir.body.kind === 'json') {
      lines.push('        var json = ' + JSON.stringify(JSON.stringify(ir.body.data)) + ';');
      lines.push('        request.Content = new StringContent(json, Encoding.UTF8, "application/json");');
    } else if (ir.body.kind === 'raw') {
      const ct = getHeader(ir, 'content-type') || 'text/plain';
      lines.push('        request.Content = new StringContent(' + JSON.stringify(ir.body.data) + ', Encoding.UTF8, ' + JSON.stringify(ct) + ');');
    } else if (ir.body.kind === 'form-urlencoded') {
      lines.push('        var form = new FormUrlEncodedContent(new[] {');
      ir.body.data.forEach(function (p) {
        lines.push('            new KeyValuePair<string, string>(' + JSON.stringify(p[0]) + ', ' + JSON.stringify(p[1]) + '),');
      });
      lines.push('        });');
      lines.push('        request.Content = form;');
    }

    filterHeaders(ir, ['content-type', 'content-length']).forEach(function (h) {
      lines.push('        request.Headers.TryAddWithoutValidation(' + JSON.stringify(h[0]) + ', ' + JSON.stringify(h[1]) + ');');
    });
    if (ir.auth.kind === 'bearer') {
      lines.push('        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", ' + JSON.stringify(ir.auth.token) + ');');
    }
    if (ir.auth.kind === 'basic') {
      lines.push('        var creds = Convert.ToBase64String(Encoding.UTF8.GetBytes(' + JSON.stringify(ir.auth.user + ':' + ir.auth.pass) + '));');
      lines.push('        request.Headers.TryAddWithoutValidation("Authorization", "Basic " + creds);');
    }

    lines.push('');
    lines.push('        var response = await client.SendAsync(request);');
    lines.push('        response.EnsureSuccessStatusCode();');
    lines.push('        Console.WriteLine(await response.Content.ReadAsStringAsync());');
    lines.push('    }');
    lines.push('}');
    return lines.join('\n');
  }

  function genPowerShell(ir) {
    const lines = [warnBlock(ir, '#'), '$headers = @{', ''];
    filterHeaders(ir, []).forEach(function (h) {
      lines.push('    "' + h[0].replace(/"/g, '`"') + '" = "' + h[1].replace(/"/g, '`"') + '"');
    });
    if (ir.auth.kind === 'bearer') {
      lines.push('    "Authorization" = "Bearer ' + ir.auth.token.replace(/"/g, '`"') + '"');
    }
    lines.push('}');
    lines.push('');

    const url = buildUrlWithQuery(ir);
    const params = [
      '    -Method ' + ir.method,
      '    -Uri ' + JSON.stringify(url),
      '    -Headers $headers'
    ];

    if (ir.body.kind === 'json') {
      lines.push('$body = ' + JSON.stringify(JSON.stringify(ir.body.data)) + ' | ConvertFrom-Json | ConvertTo-Json -Compress');
      params.push('    -Body $body');
      params.push('    -ContentType "application/json"');
    } else if (ir.body.kind === 'raw') {
      params.push('    -Body ' + JSON.stringify(ir.body.data));
      const ct = getHeader(ir, 'content-type');
      if (ct) params.push('    -ContentType ' + JSON.stringify(ct));
    } else if (ir.body.kind === 'form-urlencoded') {
      lines.push('$body = @{');
      ir.body.data.forEach(function (p) {
        lines.push('    ' + JSON.stringify(p[0]) + ' = ' + JSON.stringify(p[1]));
      });
      lines.push('}');
      params.push('    -Body $body');
    }

    if (ir.auth.kind === 'basic') {
      lines.push('$cred = Get-Credential  # Or: $secpass = ConvertTo-SecureString ...');
      params.push('    -Credential $cred');
    }

    lines.push('Invoke-RestMethod `');
    lines.push(params.join(" `\n"));
    return lines.join('\n');
  }

  const GENERATORS = {
    'python-requests': genPythonRequests,
    'python-httpx': genPythonHttpx,
    'php-curl': genPhpCurl,
    'php-guzzle': genPhpGuzzle,
    go: genGo,
    axios: genAxios,
    'java-okhttp': genJavaOkHttp,
    'csharp-httpclient': genCSharpHttpClient,
    powershell: genPowerShell
  };

  const TARGET_META = {
    'python-requests': { label: 'Python', sub: 'requests', path: '/tools/curl-to-python/', ext: '.py', group: 'python' },
    'python-httpx': { label: 'Python', sub: 'httpx', path: '/tools/curl-to-python/', ext: '.py', group: 'python' },
    'php-curl': { label: 'PHP', sub: 'curl', path: '/tools/curl-to-php/', ext: '.php', group: 'php' },
    'php-guzzle': { label: 'PHP', sub: 'Guzzle', path: '/tools/curl-to-php/', ext: '.php', group: 'php' },
    go: { label: 'Go', sub: 'net/http', path: '/tools/curl-to-go/', ext: '.go', group: 'go' },
    axios: { label: 'Axios', sub: 'axios', path: '/tools/curl-to-axios/', ext: '.js', group: 'axios' },
    'java-okhttp': { label: 'Java', sub: 'OkHttp', path: '/tools/curl-to-java/', ext: '.java', group: 'java' },
    'csharp-httpclient': { label: 'C#', sub: 'HttpClient', path: '/tools/curl-to-csharp/', ext: '.cs', group: 'csharp' },
    powershell: { label: 'PowerShell', sub: 'Invoke-RestMethod', path: '/tools/curl-to-powershell/', ext: '.ps1', group: 'powershell' }
  };

  const PICKER_GROUPS = [
    { id: 'python', label: 'Python', icon: 'fab fa-python', defaultTarget: 'python-requests' },
    { id: 'php', label: 'PHP', icon: 'fab fa-php', defaultTarget: 'php-curl' },
    { id: 'go', label: 'Go', icon: 'fas fa-code', defaultTarget: 'go' },
    { id: 'axios', label: 'Axios', icon: 'fab fa-js', defaultTarget: 'axios' },
    { id: 'java', label: 'Java', icon: 'fab fa-java', defaultTarget: 'java-okhttp' },
    { id: 'csharp', label: 'C#', icon: 'fas fa-hashtag', defaultTarget: 'csharp-httpclient' },
    { id: 'powershell', label: 'PowerShell', icon: 'fas fa-terminal', defaultTarget: 'powershell' }
  ];

  const SAMPLE_CURL = "curl -X POST 'https://api.example.com/users' \\\n  -H 'Content-Type: application/json' \\\n  -H 'Authorization: Bearer YOUR_TOKEN' \\\n  -d '{\"name\": \"Jane\", \"email\": \"jane@example.com\"}'";

  function convert(input, targetId) {
    const ir = parseCurl(input);
    if (!ir.url) throw new Error('No URL found in curl command. Paste a full curl including the URL.');
    const gen = GENERATORS[targetId];
    if (!gen) throw new Error('Unknown target: ' + targetId);
    return { code: gen(ir), ir: ir };
  }

  const LANG_FOR_TARGET = {
    'python-requests': 'python',
    'python-httpx': 'python',
    'php-curl': 'php',
    'php-guzzle': 'php',
    go: 'go',
    axios: 'javascript',
    'java-okhttp': 'java',
    'csharp-httpclient': 'csharp',
    powershell: 'powershell'
  };

  const SOURCE_KEYWORDS = {
    python: new Set([
      'import', 'from', 'as', 'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while',
      'with', 'try', 'except', 'finally', 'raise', 'pass', 'break', 'continue', 'in', 'not',
      'and', 'or', 'is', 'None', 'True', 'False', 'print', 'lambda', 'yield', 'async', 'await'
    ]),
    php: new Set([
      '<?php', 'function', 'return', 'if', 'else', 'elseif', 'foreach', 'for', 'while',
      'class', 'new', 'true', 'false', 'null', 'array', 'echo', 'require', 'include'
    ]),
    go: new Set([
      'package', 'import', 'func', 'var', 'const', 'return', 'if', 'else', 'for', 'range',
      'switch', 'case', 'default', 'break', 'continue', 'defer', 'go', 'chan', 'map',
      'struct', 'interface', 'type', 'nil', 'true', 'false', 'panic'
    ]),
    javascript: new Set([
      'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'await',
      'async', 'try', 'catch', 'finally', 'throw', 'new', 'class', 'import', 'from', 'export',
      'default', 'true', 'false', 'null', 'undefined', 'require'
    ]),
    java: new Set([
      'package', 'import', 'class', 'public', 'private', 'protected', 'static', 'final',
      'void', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'finally', 'throw',
      'new', 'true', 'false', 'null', 'var'
    ]),
    csharp: new Set([
      'using', 'namespace', 'class', 'public', 'private', 'protected', 'static', 'readonly',
      'void', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'finally', 'throw',
      'new', 'var', 'true', 'false', 'null', 'async', 'await'
    ]),
    powershell: new Set([
      'function', 'param', 'return', 'if', 'else', 'foreach', 'for', 'while', 'switch',
      'try', 'catch', 'finally', 'throw', 'true', 'false', 'null'
    ])
  };

  function hlSpan(cls, text) {
    return '<span class="hl-' + cls + '">' + escapeHtml(text) + '</span>';
  }

  function highlightSource(code, lang) {
    const keywords = SOURCE_KEYWORDS[lang] || SOURCE_KEYWORDS.python;
    const builtins = lang === 'python'
      ? new Set(['requests', 'httpx', 'open', 'len', 'dict', 'list', 'str', 'int'])
      : lang === 'javascript'
        ? new Set(['axios', 'console', 'JSON', 'Promise'])
        : lang === 'go'
          ? new Set(['fmt', 'http', 'json', 'bytes', 'io', 'strings'])
          : lang === 'java'
            ? new Set(['Request', 'Response', 'OkHttpClient', 'MediaType', 'RequestBody'])
            : new Set();
    let html = '';
    let i = 0;
    const len = code.length;

    function readWhile(test) {
      let s = '';
      while (i < len && test(code[i])) {
        s += code[i++];
      }
      return s;
    }

    while (i < len) {
      const ch = code[i];

      if (/\s/.test(ch)) {
        html += escapeHtml(readWhile(function (c) { return /\s/.test(c); }));
        continue;
      }

      if (lang === 'python' || lang === 'php' || lang === 'powershell') {
        if (ch === '#') {
          html += hlSpan('cm', readWhile(function (c) { return c !== '\n'; }));
          if (i < len && code[i] === '\n') html += escapeHtml('\n');
          continue;
        }
      }

      if (lang !== 'python' && ch === '/' && code[i + 1] === '/') {
        html += hlSpan('cm', readWhile(function (c) { return c !== '\n'; }));
        if (i < len && code[i] === '\n') html += escapeHtml('\n');
        continue;
      }

      if (ch === '/' && code[i + 1] === '*') {
        let block = '/*';
        i += 2;
        while (i < len) {
          if (code[i] === '*' && code[i + 1] === '/') {
            block += '*/';
            i += 2;
            break;
          }
          block += code[i++];
        }
        html += hlSpan('cm', block);
        continue;
      }

      if (lang === 'python' && (ch === '"' || ch === "'") && code.slice(i, i + 3) === ch + ch + ch) {
        const q = ch + ch + ch;
        let s = q;
        i += 3;
        while (i < len) {
          if (code.slice(i, i + 3) === q) {
            s += q;
            i += 3;
            break;
          }
          if (code[i] === '\\') {
            s += code[i++];
            if (i < len) s += code[i++];
            continue;
          }
          s += code[i++];
        }
        html += hlSpan('str', s);
        continue;
      }

      if (ch === '"' || ch === "'") {
        const q = ch;
        let s = q;
        i++;
        while (i < len) {
          if (code[i] === '\\') {
            s += code[i++];
            if (i < len) s += code[i++];
            continue;
          }
          if (code[i] === q) {
            s += q;
            i++;
            break;
          }
          s += code[i++];
        }
        html += hlSpan('str', s);
        continue;
      }

      if (lang === 'go' && ch === '`') {
        let s = '`';
        i++;
        while (i < len) {
          if (code[i] === '`') {
            s += '`';
            i++;
            break;
          }
          s += code[i++];
        }
        html += hlSpan('str', s);
        continue;
      }

      if (/[0-9]/.test(ch) || (ch === '.' && i + 1 < len && /[0-9]/.test(code[i + 1]))) {
        html += hlSpan('num', readWhile(function (c) {
          return /[0-9.xXa-fA-FeE_]/.test(c);
        }));
        continue;
      }

      if (/[a-zA-Z_$@]/.test(ch)) {
        const word = readWhile(function (c) { return /[\w$@]/.test(c); });
        if ((lang === 'php' || lang === 'powershell') && word.charAt(0) === '$') {
          html += hlSpan('var', word);
          continue;
        }
        if (keywords.has(word)) {
          html += hlSpan('kw', word);
        } else if (builtins.has(word)) {
          html += hlSpan('bi', word);
        } else if (lang === 'csharp' && /^[A-Z]/.test(word)) {
          html += hlSpan('ty', word);
        } else if (lang === 'java' && /^[A-Z]/.test(word)) {
          html += hlSpan('ty', word);
        } else {
          html += escapeHtml(word);
        }
        continue;
      }

      html += escapeHtml(ch);
      i++;
    }
    return html;
  }

  function highlightCode(code, targetId) {
    const lang = LANG_FOR_TARGET[targetId] || 'python';
    return highlightSource(code, lang);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function base64UrlEncode(str) {
    const b64 = btoa(unescape(encodeURIComponent(str)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function base64UrlDecode(str) {
    let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    return decodeURIComponent(escape(atob(b64)));
  }

  /* Expose for tests / debugging */
  window.CurlConverter = { parse: parseCurl, convert: convert };

  /* ---------------------------------------------------------------------- */
  /* UI                                                                     */
  /* ---------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('curl-converter-app');
    if (!app) return;

    const defaultTarget = app.dataset.defaultTarget || 'python-requests';
    const input = document.getElementById('curl-input');
    const outputCode = document.querySelector('#curl-output code');
    const outputLabel = document.getElementById('curl-output-label');
    const errorBox = document.getElementById('curl-error-message');
    const errorText = document.getElementById('curl-error-text');
    const warnBox = document.getElementById('curl-warning-message');
    const warnText = document.getElementById('curl-warning-text');
    const resultSection = document.getElementById('curl-result-section');
    const subToggle = document.getElementById('curl-sub-toggle');
    const subButtons = subToggle ? subToggle.querySelectorAll('.sub-toggle-btn') : [];
    const pickerBtns = app.querySelectorAll('.target-picker-btn');
    const copyBtn = document.getElementById('curl-copy-btn');
    const downloadBtn = document.getElementById('curl-download-btn');
    const pasteBtn = document.getElementById('curl-paste-btn');
    const clearBtn = document.getElementById('curl-clear-btn');
    const sampleBtn = document.getElementById('curl-sample-btn');

    let currentTarget = defaultTarget;
    let currentCode = '';
    let debounceTimer = null;

    function getStoredFlavor(group) {
      try {
        return localStorage.getItem('curl_flavor_' + group);
      } catch (e) {
        return null;
      }
    }

    function setStoredFlavor(group, targetId) {
      try {
        localStorage.setItem('curl_flavor_' + group, targetId);
      } catch (e) { /* ignore */ }
    }

    function resolveTargetForGroup(groupId) {
      const g = PICKER_GROUPS.find(function (x) { return x.id === groupId; });
      if (!g) return currentTarget;
      const stored = getStoredFlavor(groupId);
      if (stored && GENERATORS[stored]) return stored;
      return g.defaultTarget;
    }

    function updateSubToggle() {
      if (!subToggle) return;
      const meta = TARGET_META[currentTarget];
      const group = meta ? meta.group : '';
      if (group === 'python' || group === 'php') {
        subToggle.classList.remove('hidden');
        subToggle.querySelectorAll('.python-sub').forEach(function (btn) {
          btn.classList.toggle('hidden', group !== 'python');
        });
        subToggle.querySelectorAll('.php-sub').forEach(function (btn) {
          btn.classList.toggle('hidden', group !== 'php');
        });
        subButtons.forEach(function (btn) {
          if (!btn.classList.contains('hidden')) {
            btn.classList.toggle('active', btn.dataset.target === currentTarget);
          } else {
            btn.classList.remove('active');
          }
        });
      } else {
        subToggle.classList.add('hidden');
      }
    }

    function updatePickerHighlight() {
      const meta = TARGET_META[currentTarget];
      const group = meta ? meta.group : '';
      pickerBtns.forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.group === group);
      });
    }

    function updateUrl() {
      const meta = TARGET_META[currentTarget];
      if (!meta || !window.history.replaceState) return;
      const base = meta.path;
      const q = input.value.trim() ? '?cmd=' + base64UrlEncode(input.value) : '';
      const full = (window.location.origin || '') + base + q;
      if (window.location.pathname !== base || window.location.search !== q) {
        history.replaceState(null, '', base + q);
      }
    }

    function showError(msg) {
      errorText.textContent = msg;
      errorBox.classList.remove('hidden');
      resultSection.classList.add('hidden');
    }

    function hideError() {
      errorBox.classList.add('hidden');
    }

    function showWarnings(warnings) {
      if (!warnings || !warnings.length) {
        warnBox.classList.add('hidden');
        return;
      }
      warnText.textContent = warnings.join(' · ');
      warnBox.classList.remove('hidden');
    }

    function runConvert() {
      const raw = input.value.trim();
      if (!raw) {
        hideError();
        warnBox.classList.add('hidden');
        resultSection.classList.add('hidden');
        currentCode = '';
        copyBtn.disabled = true;
        downloadBtn.disabled = true;
        return;
      }
      try {
        const out = convert(raw, currentTarget);
        currentCode = out.code;
        outputCode.innerHTML = highlightCode(out.code, currentTarget);
        const meta = TARGET_META[currentTarget];
        outputLabel.textContent = meta ? meta.label + ' · ' + meta.sub : currentTarget;
        showWarnings(out.ir.warnings);
        hideError();
        resultSection.classList.remove('hidden');
        copyBtn.disabled = false;
        downloadBtn.disabled = false;
        updateUrl();
        track('convert_success', currentTarget);
      } catch (e) {
        showError(e.message || 'Failed to parse curl command');
        track('convert_error', (e.message || '').slice(0, 80));
      }
    }

    function scheduleConvert() {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(runConvert, 150);
    }

    function setTarget(targetId, fromPicker) {
      if (!GENERATORS[targetId]) return;
      currentTarget = targetId;
      const meta = TARGET_META[targetId];
      if (meta) setStoredFlavor(meta.group, targetId);
      updateSubToggle();
      updatePickerHighlight();
      if (fromPicker) {
        const m = TARGET_META[targetId];
        if (m && window.history.replaceState) {
          const q = input.value.trim() ? '?cmd=' + base64UrlEncode(input.value) : '';
          history.replaceState(null, '', m.path + q);
        }
        track('target_change', targetId);
      }
      scheduleConvert();
    }

    pickerBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const groupId = btn.dataset.group;
        setTarget(resolveTargetForGroup(groupId), true);
      });
    });

    subButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTarget(btn.dataset.target, false);
      });
    });

    input.addEventListener('input', scheduleConvert);

    pasteBtn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(function (t) {
          input.value = t;
          scheduleConvert();
          track('paste');
        });
      } else input.focus();
    });

    clearBtn.addEventListener('click', function () {
      input.value = '';
      runConvert();
      if (window.history.replaceState) {
        const m = TARGET_META[currentTarget];
        history.replaceState(null, '', (m ? m.path : '/tools/curl-converter/'));
      }
      track('clear');
    });

    sampleBtn.addEventListener('click', function () {
      input.value = SAMPLE_CURL;
      scheduleConvert();
      track('sample');
    });

    copyBtn.addEventListener('click', function () {
      if (!currentCode) return;
      const done = navigator.clipboard && navigator.clipboard.writeText
        ? navigator.clipboard.writeText(currentCode)
        : Promise.reject();
      done.then(function () {
        copyBtn.classList.add('copied');
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = orig;
        }, 1400);
        track('copy');
      }).catch(function () {
        const ta = document.createElement('textarea');
        ta.value = currentCode;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
      });
    });

    downloadBtn.addEventListener('click', function () {
      if (!currentCode) return;
      const meta = TARGET_META[currentTarget] || { ext: '.txt' };
      const blob = new Blob([currentCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'request' + meta.ext;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      track('download', meta.ext);
    });

    document.querySelectorAll('.curl-example-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        input.value = btn.dataset.curl || '';
        if (btn.dataset.target) setTarget(btn.dataset.target, false);
        scheduleConvert();
        input.scrollIntoView({ behavior: 'smooth', block: 'start' });
        track('example', btn.dataset.label || '');
      });
    });

    /* Init from ?cmd= */
    const params = new URLSearchParams(window.location.search);
    const cmd = params.get('cmd');
    if (cmd) {
      try {
        input.value = base64UrlDecode(cmd);
      } catch (e) { /* ignore */ }
    }

    /* Apply stored flavor for python/php if default group matches */
    const initMeta = TARGET_META[defaultTarget];
    if (initMeta && (initMeta.group === 'python' || initMeta.group === 'php')) {
      const stored = getStoredFlavor(initMeta.group);
      if (stored && GENERATORS[stored]) currentTarget = stored;
    } else {
      currentTarget = defaultTarget;
    }

    updateSubToggle();
    updatePickerHighlight();
    if (input.value.trim()) runConvert();
  });
})();
