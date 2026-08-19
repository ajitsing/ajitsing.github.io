/**
 * HTML Beautifier — client-side pretty-print and minify.
 */
(function (root) {
  'use strict';

  var VOID_TAGS = {
    area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1,
    link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1
  };

  var PRESERVE_TAGS = { script: 1, style: 1, pre: 1, textarea: 1 };

  var INLINE_TAGS = {
    a: 1, abbr: 1, b: 1, bdi: 1, bdo: 1, br: 1, cite: 1, code: 1, data: 1,
    dfn: 1, em: 1, i: 1, img: 1, input: 1, kbd: 1, label: 1, mark: 1, q: 1,
    s: 1, samp: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, time: 1,
    u: 1, var: 1, wbr: 1, button: 1
  };

  var SAMPLE =
    '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Demo page</title>' +
    '<style>body{margin:0;font-family:sans-serif}h1{color:#292524}</style></head>' +
    '<body><header class="site-header" id="top"><h1>Hello, world</h1></header>' +
    '<main><p>This is <strong>messy</strong> HTML with <a href="/">a link</a>.</p>' +
    '<ul><li>One</li><li>Two</li><li>Three</li></ul></main>' +
    '<script>console.log("ready")</script></body></html>';

  function isVoid(name) {
    return VOID_TAGS[name.toLowerCase()] === 1;
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

  function parse(html) {
    var root = { type: 'root', children: [] };
    var stack = [root];
    var i = 0;
    var len = html.length;

    function current() {
      return stack[stack.length - 1];
    }

    function append(node) {
      current().children.push(node);
    }

    while (i < len) {
      if (html.charAt(i) !== '<') {
        var textStart = i;
        while (i < len && html.charAt(i) !== '<') i++;
        append({ type: 'text', value: html.slice(textStart, i) });
        continue;
      }

      if (html.substr(i, 4) === '<!--') {
        var cEnd = html.indexOf('-->', i + 4);
        if (cEnd === -1) {
          append({ type: 'comment', value: html.slice(i + 4) });
          break;
        }
        append({ type: 'comment', value: html.slice(i + 4, cEnd) });
        i = cEnd + 3;
        continue;
      }

      if (html.substr(i, 2) === '<!') {
        var dEnd = html.indexOf('>', i + 2);
        if (dEnd === -1) break;
        append({ type: 'declaration', value: html.slice(i, dEnd + 1) });
        i = dEnd + 1;
        continue;
      }

      if (html.substr(i, 2) === '<?') {
        var pEnd = html.indexOf('?>', i + 2);
        if (pEnd === -1) pEnd = html.indexOf('>', i + 2);
        if (pEnd === -1) break;
        var pClose = html.substr(pEnd, 2) === '?>' ? 2 : 1;
        append({ type: 'declaration', value: html.slice(i, pEnd + pClose) });
        i = pEnd + pClose;
        continue;
      }

      if (html.substr(i, 2) === '</') {
        var closeEnd = html.indexOf('>', i + 2);
        if (closeEnd === -1) break;
        var closeName = html.slice(i + 2, closeEnd).trim().split(/\s/)[0];
        i = closeEnd + 1;
        for (var s = stack.length - 1; s > 0; s--) {
          if (stack[s].name.toLowerCase() === closeName.toLowerCase()) {
            stack.length = s;
            break;
          }
        }
        continue;
      }

      var tagEnd = findTagEnd(html, i);
      var rawInner = html.slice(i + 1, tagEnd);
      var selfClosing = /\/\s*$/.test(rawInner);
      rawInner = rawInner.replace(/\/\s*$/, '').trim();
      var nameMatch = rawInner.match(/^([^\s]+)/);
      var name = nameMatch ? nameMatch[1] : 'div';
      var attrRaw = rawInner.slice(name.length).trim();
      var el = {
        type: 'element',
        name: name,
        attrs: attrRaw,
        children: [],
        void: isVoid(name) || selfClosing,
        selfClosing: selfClosing
      };
      append(el);
      i = tagEnd + 1;

      var lname = name.toLowerCase();
      if (PRESERVE_TAGS[lname] && !el.void) {
        var closeRe = new RegExp('</' + lname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*>', 'i');
        var rest = html.slice(i);
        var match = rest.match(closeRe);
        if (match) {
          el.rawInner = rest.slice(0, match.index);
          i += match.index + match[0].length;
        } else {
          el.rawInner = rest;
          i = len;
        }
        continue;
      }

      if (!el.void) stack.push(el);
    }

    return root;
  }

  function collapseTrim(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function collapseKeepEdges(value) {
    if (!value) return '';
    if (!/\S/.test(value)) return ' ';
    return value.replace(/\s+/g, ' ');
  }

  function isFlow(node) {
    if (node.type === 'text' || node.type === 'comment') return true;
    if (node.type !== 'element') return false;
    if (node.rawInner != null) return false;
    if (!INLINE_TAGS[node.name.toLowerCase()]) return false;
    for (var i = 0; i < node.children.length; i++) {
      if (!isFlow(node.children[i])) return false;
    }
    return true;
  }

  function childrenAreFlow(nodes) {
    if (!nodes.length) return true;
    var hasContent = false;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.type === 'text' && !collapseTrim(n.value)) continue;
      hasContent = true;
      if (!isFlow(n)) return false;
    }
    return hasContent || nodes.length === 0;
  }

  function splitAttrs(raw) {
    var out = [];
    var re = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    var m;
    while ((m = re.exec(raw))) {
      if (m[2] != null) out.push(m[1] + '="' + m[2] + '"');
      else if (m[3] != null) out.push(m[1] + "='" + m[3] + "'");
      else if (m[4] != null) out.push(m[1] + '=' + m[4]);
      else out.push(m[1]);
    }
    return out.length ? out : (raw ? [raw] : []);
  }

  function openTag(el, opts, pad) {
    var end = el.void && el.selfClosing ? ' />' : '>';
    if (!el.attrs) return '<' + el.name + end;
    if (opts.wrapAttrs && !opts.minify) {
      var parts = splitAttrs(el.attrs);
      if (parts.length >= 3) {
        var innerPad = pad + opts.indentStr;
        return '<' + el.name + '\n' + innerPad + parts.join('\n' + innerPad) + '\n' + pad + (el.void && el.selfClosing ? '/>' : '>');
      }
    }
    return '<' + el.name + ' ' + el.attrs + end;
  }

  function closeTag(el) {
    return '</' + el.name + '>';
  }

  function flowLine(nodes) {
    var out = '';
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.type === 'text') {
        out += collapseKeepEdges(n.value);
      } else if (n.type === 'comment') {
        out += '<!--' + n.value + '-->';
      } else if (n.type === 'element') {
        out += openTag(n, { wrapAttrs: false, minify: true }, '');
        if (!n.void) {
          out += flowLine(n.children);
          out += closeTag(n);
        }
      }
    }
    return out.replace(/^\s+|\s+$/g, '');
  }

  function serialize(node, opts, depth) {
    var pad = opts.minify ? '' : opts.indentStr.repeat(depth);
    var nl = opts.minify ? '' : '\n';
    var chunks = [];

    if (node.type === 'root') {
      return serializeChildren(node.children, opts, 0).replace(/^\n+|\n+$/g, '');
    }

    if (node.type === 'text') {
      if (opts.minify) {
        if (!/\S/.test(node.value)) return '';
        return collapseKeepEdges(node.value);
      }
      var text = collapseTrim(node.value);
      if (!text) return '';
      return pad + text;
    }

    if (node.type === 'comment') {
      return (opts.minify ? '' : pad) + '<!--' + node.value + '-->';
    }

    if (node.type === 'declaration') {
      return (opts.minify ? '' : pad) + node.value;
    }

    if (node.type === 'element') {
      if (node.rawInner != null) {
        var open = openTag(node, opts, pad);
        var inner = node.rawInner;
        var preserveName = node.name.toLowerCase();
        var trimEnds = preserveName === 'script' || preserveName === 'style';
        if (opts.minify && trimEnds) {
          inner = inner.replace(/^\s+|\s+$/g, '');
        }
        if (opts.minify) return open + inner + closeTag(node);
        if (trimEnds) {
          inner = inner.replace(/^\s+|\s+$/g, '');
          if (!inner) return pad + open + closeTag(node);
          return pad + open + nl + inner + nl + pad + closeTag(node);
        }
        return pad + open + inner + closeTag(node);
      }

      if (node.void) {
        return (opts.minify ? '' : pad) + openTag(node, opts, pad);
      }

      if (!node.children.length) {
        return (opts.minify ? '' : pad) + openTag(node, opts, pad) + closeTag(node);
      }

      if (!opts.minify && childrenAreFlow(node.children)) {
        var line = flowLine(node.children);
        return pad + openTag(node, opts, pad) + line + closeTag(node);
      }

      if (opts.minify) {
        return openTag(node, opts, '') + serializeChildren(node.children, opts, 0) + closeTag(node);
      }

      chunks.push(pad + openTag(node, opts, pad));
      chunks.push(serializeChildren(node.children, opts, depth + 1));
      chunks.push(pad + closeTag(node));
      return chunks.join(nl);
    }

    return '';
  }

  function serializeChildren(children, opts, depth) {
    var parts = [];
    for (var i = 0; i < children.length; i++) {
      var piece = serialize(children[i], opts, depth);
      if (piece) parts.push(piece);
    }
    if (opts.minify) return parts.join('');
    return parts.join('\n');
  }

  function normalizeOpts(options) {
    var indentSize = options && Number(options.indentSize);
    if (indentSize !== 4 && indentSize !== 0 && options && options.indent === '\t') {
      return {
        indentStr: '\t',
        wrapAttrs: !!(options && options.wrapAttrs),
        minify: !!(options && options.minify)
      };
    }
    return {
      indentStr: indentSize === 4 ? '    ' : '  ',
      wrapAttrs: !!(options && options.wrapAttrs),
      minify: !!(options && options.minify)
    };
  }

  function beautify(html, options) {
    var opts = normalizeOpts(options);
    opts.minify = false;
    return serialize(parse(String(html || '')), opts, 0);
  }

  function minify(html, options) {
    var opts = normalizeOpts(options);
    opts.minify = true;
    opts.wrapAttrs = false;
    return serialize(parse(String(html || '')), opts, 0);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function span(cls, value) {
    return '<span class="hb-' + cls + '">' + escapeHtml(value) + '</span>';
  }

  function highlightAttrs(raw) {
    var out = '';
    var re = /([^\s=]+)(?:(\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?|\s+/g;
    var m;
    while ((m = re.exec(raw))) {
      if (m[0].charAt(0) && /^\s+$/.test(m[0])) {
        out += escapeHtml(m[0]);
        continue;
      }
      if (!m[1]) {
        out += escapeHtml(m[0]);
        continue;
      }
      out += span('attr', m[1]);
      if (m[2]) {
        out += span('punct', m[2]);
        if (m[3] != null) out += span('string', '"' + m[3] + '"');
        else if (m[4] != null) out += span('string', "'" + m[4] + "'");
        else if (m[5] != null) out += span('string', m[5]);
      }
    }
    return out;
  }

  function highlightTag(tag) {
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
    var html = span('punct', '<');
    if (close) html += span('punct', '/');
    html += escapeHtml(leadSpace);
    if (isDecl) {
      html += span('doctype', name + rest);
    } else {
      html += span('name', name) + highlightAttrs(rest);
    }
    if (selfClose) html += span('punct', '/');
    if (end) html += span('punct', '>');
    return html;
  }

  function highlightHtml(src) {
    var out = '';
    var i = 0;
    var len = src.length;
    while (i < len) {
      if (src.substr(i, 4) === '<!--') {
        var cEnd = src.indexOf('-->', i + 4);
        if (cEnd === -1) {
          out += span('comment', src.slice(i));
          break;
        }
        out += span('comment', src.slice(i, cEnd + 3));
        i = cEnd + 3;
        continue;
      }
      if (src.charAt(i) === '<') {
        var tagEnd = findTagEnd(src, i);
        var rawTag = src.slice(i, tagEnd + 1);
        out += highlightTag(rawTag);
        i = tagEnd + 1;
        var openInner = rawTag.slice(1, rawTag.length - (rawTag.slice(-1) === '>' ? 1 : 0));
        if (openInner.charAt(0) !== '/' && !/\/\s*$/.test(openInner)) {
          var nameMatch = openInner.trim().match(/^([^\s>]+)/);
          var lname = nameMatch ? nameMatch[1].toLowerCase() : '';
          if (PRESERVE_TAGS[lname]) {
            var closeRe = new RegExp('</' + lname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*>', 'i');
            var rest = src.slice(i);
            var match = rest.match(closeRe);
            if (match) {
              out += span('text', rest.slice(0, match.index));
              out += highlightTag(match[0]);
              i += match.index + match[0].length;
            } else {
              out += span('text', rest);
              i = len;
            }
          }
        }
        continue;
      }
      var textStart = i;
      while (i < len && src.charAt(i) !== '<') i++;
      out += span('text', src.slice(textStart, i));
    }
    return out;
  }

  function bind() {
    var input = document.getElementById('html-input');
    var highlight = document.getElementById('hb-highlight');
    var formatBtn = document.getElementById('format-btn');
    var minifyBtn = document.getElementById('minify-btn');
    var copyBtn = document.getElementById('copy-btn');
    var clearBtn = document.getElementById('clear-btn');
    var sampleBtn = document.getElementById('sample-btn');
    var indentSelect = document.getElementById('indent-select');
    var wrapToggle = document.getElementById('wrap-attrs-toggle');
    var status = document.getElementById('hb-status');
    if (!input || !formatBtn) return;

    function updateHighlight() {
      if (!highlight) return;
      highlight.innerHTML = highlightHtml(input.value) + '\n';
    }

    function refresh() {
      updateMeta();
      updateHighlight();
    }

    function syncScroll() {
      if (!highlight) return;
      highlight.scrollTop = input.scrollTop;
      highlight.scrollLeft = input.scrollLeft;
    }

    function opts() {
      return {
        indentSize: indentSelect ? Number(indentSelect.value) : 2,
        wrapAttrs: wrapToggle ? wrapToggle.checked : false
      };
    }

    function setStatus(message, kind) {
      if (!status) return;
      status.textContent = message;
      status.className = 'hb-status' + (kind ? ' hb-status--' + kind : '');
    }

    function updateMeta() {
      var text = input.value;
      var chars = text.length;
      var lines = text ? text.split(/\n/).length : 0;
      var meta = document.getElementById('hb-meta');
      if (meta) meta.textContent = chars.toLocaleString() + ' characters · ' + lines.toLocaleString() + ' lines';
    }

    function runBeautify() {
      var source = input.value;
      if (!source.trim()) {
        setStatus('Paste HTML to beautify.', 'warn');
        return;
      }
      try {
        input.value = beautify(source, opts());
        refresh();
        setStatus('Beautified. HTML stays in your browser.', 'ok');
        if (typeof gtag === 'function') gtag('event', 'html_beautify', { event_category: 'HTML Beautifier' });
      } catch (err) {
        setStatus('Could not format this markup.', 'error');
      }
    }

    function runMinify() {
      var source = input.value;
      if (!source.trim()) {
        setStatus('Paste HTML to minify.', 'warn');
        return;
      }
      try {
        input.value = minify(source, opts());
        refresh();
        setStatus('Minified. Extra whitespace removed.', 'ok');
        if (typeof gtag === 'function') gtag('event', 'html_minify', { event_category: 'HTML Beautifier' });
      } catch (err) {
        setStatus('Could not minify this markup.', 'error');
      }
    }

    formatBtn.addEventListener('click', runBeautify);
    if (minifyBtn) minifyBtn.addEventListener('click', runMinify);

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (!input.value) {
          setStatus('Nothing to copy yet.', 'warn');
          return;
        }
        navigator.clipboard.writeText(input.value).then(function () {
          var prev = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
          setStatus('Copied to clipboard.', 'ok');
          setTimeout(function () { copyBtn.innerHTML = prev; }, 1400);
          if (typeof gtag === 'function') gtag('event', 'html_copy', { event_category: 'HTML Beautifier' });
        }).catch(function () {
          input.select();
          document.execCommand('copy');
          setStatus('Copied to clipboard.', 'ok');
        });
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        refresh();
        setStatus('Cleared.', '');
        input.focus();
      });
    }

    if (sampleBtn) {
      sampleBtn.addEventListener('click', function () {
        input.value = SAMPLE;
        runBeautify();
        if (typeof gtag === 'function') gtag('event', 'html_sample', { event_category: 'HTML Beautifier' });
      });
    }

    input.addEventListener('input', refresh);
    input.addEventListener('scroll', syncScroll);
    input.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        runBeautify();
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        var start = input.selectionStart;
        var end = input.selectionEnd;
        var tab = (indentSelect && indentSelect.value === '4') ? '    ' : '  ';
        input.value = input.value.slice(0, start) + tab + input.value.slice(end);
        input.selectionStart = input.selectionEnd = start + tab.length;
        refresh();
      }
    });

    var editor = document.getElementById('hb-editor');
    function onFile(file) {
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        input.value = String(reader.result || '');
        refresh();
        runBeautify();
      };
      reader.readAsText(file);
    }

    if (editor) {
      editor.addEventListener('dragover', function (e) {
        e.preventDefault();
        editor.classList.add('is-drop');
      });
      editor.addEventListener('dragleave', function () {
        editor.classList.remove('is-drop');
      });
      editor.addEventListener('drop', function (e) {
        e.preventDefault();
        editor.classList.remove('is-drop');
        var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        onFile(file);
      });
    }

    refresh();
    input.focus();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bind);
    } else {
      bind();
    }
  }

  var api = { beautify: beautify, minify: minify, sample: SAMPLE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.HtmlBeautifier = api;
})(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : this);
