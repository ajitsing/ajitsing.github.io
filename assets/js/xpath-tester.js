(function() {
  'use strict';

  var SAMPLE_XML = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bookstore>\n' +
    '  <book category="cooking">\n' +
    '    <title lang="en">Everyday Italian</title>\n' +
    '    <author>Giada De Laurentiis</author>\n' +
    '    <year>2005</year>\n' +
    '    <price>30.00</price>\n' +
    '  </book>\n' +
    '  <book category="web">\n' +
    '    <title lang="en">Learning XML</title>\n' +
    '    <author>Erik T. Ray</author>\n' +
    '    <year>2003</year>\n' +
    '    <price>39.95</price>\n' +
    '  </book>\n' +
    '  <book category="web">\n' +
    '    <title lang="en">XQuery Kick Start</title>\n' +
    '    <author>James McGovern</author>\n' +
    '    <author>Per Bothner</author>\n' +
    '    <year>2003</year>\n' +
    '    <price>49.99</price>\n' +
    '  </book>\n' +
    '</bookstore>';

  var SAMPLE_HTML = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head><title>Demo Shop</title></head>\n' +
    '<body>\n' +
    '  <header>\n' +
    '    <h1>Demo Shop</h1>\n' +
    '  </header>\n' +
    '  <div id="main" class="content">\n' +
    '    <h2>Featured</h2>\n' +
    '    <div class="card product">\n' +
    '      <a href="/products/1">Laptop</a>\n' +
    '      <span class="price">999</span>\n' +
    '    </div>\n' +
    '    <div class="card product">\n' +
    '      <a href="/products/2">Keyboard</a>\n' +
    '      <span class="price">79</span>\n' +
    '    </div>\n' +
    '    <form action="/search">\n' +
    '      <input type="text" name="q" value="xpath">\n' +
    '    </form>\n' +
    '  </div>\n' +
    '</body>\n' +
    '</html>';

  var elements = {
    xpathInput: document.getElementById('xpath-input'),
    documentInput: document.getElementById('document-input'),
    xpathError: document.getElementById('xpath-error'),
    matchCount: document.getElementById('match-count'),
    resultsPanel: document.getElementById('results-panel'),
    evaluateBtn: document.getElementById('evaluate-btn'),
    sampleBtn: document.getElementById('sample-btn'),
    clearBtn: document.getElementById('clear-btn'),
    copyXpathBtn: document.getElementById('copy-xpath-btn'),
    shareBtn: document.getElementById('share-btn'),
    modeTabs: document.querySelectorAll('.mode-tab'),
    exampleRows: document.querySelectorAll('.example-row')
  };

  var currentMode = 'html';
  var evaluateTimer = null;
  var lastTrackedExpression = '';

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'XPath Tester',
        event_label: label,
        value: value
      });
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function showError(message) {
    if (message) {
      elements.xpathError.textContent = message;
      elements.xpathError.classList.add('visible');
    } else {
      elements.xpathError.textContent = '';
      elements.xpathError.classList.remove('visible');
    }
  }

  function setMode(mode, options) {
    options = options || {};
    currentMode = mode === 'xml' ? 'xml' : 'html';
    elements.modeTabs.forEach(function(tab) {
      tab.classList.toggle('active', tab.getAttribute('data-mode') === currentMode);
    });
    if (!options.silent) {
      trackEvent('toggle_mode', currentMode);
      scheduleEvaluate();
    }
  }

  function createNsResolver(doc) {
    var resolver = null;
    if (doc.createNSResolver) {
      resolver = doc.createNSResolver(doc.documentElement || doc);
    }
    return function(prefix) {
      if (!prefix) {
        return null;
      }
      if (resolver) {
        var uri = resolver.lookupNamespaceURI(prefix);
        if (uri) {
          return uri;
        }
      }
      if (doc.documentElement && doc.documentElement.getAttributeNS) {
        return doc.documentElement.getAttributeNS('http://www.w3.org/2000/xmlns/', prefix);
      }
      return null;
    };
  }

  function parseDocument(source, mode) {
    if (!source || !source.trim()) {
      return { doc: null, error: 'Please enter an XML or HTML document' };
    }

    var mime = mode === 'xml' ? 'application/xml' : 'text/html';
    var doc = new DOMParser().parseFromString(source, mime);
    var parseError = doc.getElementsByTagName('parsererror')[0];
    if (parseError) {
      var message = (parseError.textContent || 'Invalid document').replace(/\s+/g, ' ').trim();
      return { doc: null, error: message.slice(0, 300) };
    }
    return { doc: doc, error: null };
  }

  function getNodeName(node) {
    if (!node) {
      return 'null';
    }
    if (node.nodeType === Node.DOCUMENT_NODE) {
      return '#document';
    }
    if (node.nodeType === Node.DOCUMENT_TYPE_NODE) {
      return '<!DOCTYPE ' + (node.name || '') + '>';
    }
    if (node.nodeType === Node.TEXT_NODE) {
      return '#text';
    }
    if (node.nodeType === Node.COMMENT_NODE) {
      return '#comment';
    }
    if (node.nodeType === Node.ATTRIBUTE_NODE) {
      return '@' + node.name;
    }
    return node.nodeName || node.tagName || 'node';
  }

  function getNodeTypeLabel(node) {
    if (!node) {
      return 'unknown';
    }
    switch (node.nodeType) {
      case Node.ELEMENT_NODE: return 'element';
      case Node.ATTRIBUTE_NODE: return 'attribute';
      case Node.TEXT_NODE: return 'text';
      case Node.CDATA_SECTION_NODE: return 'cdata';
      case Node.COMMENT_NODE: return 'comment';
      case Node.DOCUMENT_NODE: return 'document';
      case Node.DOCUMENT_TYPE_NODE: return 'doctype';
      case Node.PROCESSING_INSTRUCTION_NODE: return 'pi';
      default: return 'node';
    }
  }

  function buildNodePath(node) {
    if (!node) {
      return '';
    }
    if (node.nodeType === Node.DOCUMENT_NODE) {
      return '/';
    }
    if (node.nodeType === Node.ATTRIBUTE_NODE) {
      var owner = node.ownerElement;
      return (owner ? buildNodePath(owner) : '') + '/@' + node.name;
    }

    var parts = [];
    var current = node;
    while (current && current.nodeType !== Node.DOCUMENT_NODE) {
      if (current.nodeType === Node.ELEMENT_NODE) {
        var name = current.nodeName;
        var index = 1;
        var sibling = current.previousSibling;
        while (sibling) {
          if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === name) {
            index++;
          }
          sibling = sibling.previousSibling;
        }
        parts.unshift(name + '[' + index + ']');
      } else if (current.nodeType === Node.TEXT_NODE) {
        parts.unshift('text()');
      } else if (current.nodeType === Node.COMMENT_NODE) {
        parts.unshift('comment()');
      } else {
        parts.unshift(getNodeName(current));
      }
      current = current.parentNode;
    }
    return '/' + parts.join('/');
  }

  function getNodeSnippet(node) {
    if (!node) {
      return '';
    }
    if (node.nodeType === Node.ATTRIBUTE_NODE) {
      return node.name + '="' + (node.value || '') + '"';
    }
    if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE || node.nodeType === Node.COMMENT_NODE) {
      return (node.nodeValue || '').trim();
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      var html = '';
      try {
        html = new XMLSerializer().serializeToString(node);
      } catch (e) {
        html = node.outerHTML || node.textContent || '';
      }
      html = html.replace(/\s+/g, ' ').trim();
      if (html.length > 240) {
        return html.slice(0, 237) + '...';
      }
      return html;
    }
    return getNodeName(node);
  }

  function renderPlaceholder(message) {
    elements.resultsPanel.innerHTML = '<span class="placeholder">' + escapeHtml(message) + '</span>';
    elements.matchCount.textContent = '0';
    elements.matchCount.classList.remove('has-matches');
  }

  function renderScalar(typeLabel, value) {
    elements.matchCount.textContent = '1';
    elements.matchCount.classList.add('has-matches');
    elements.resultsPanel.innerHTML =
      '<div class="scalar-result">' +
        '<span class="scalar-type">' + escapeHtml(typeLabel) + '</span>' +
        escapeHtml(String(value)) +
      '</div>';
  }

  function renderNodes(nodes) {
    if (!nodes.length) {
      renderPlaceholder('No matches found');
      return;
    }

    elements.matchCount.textContent = String(nodes.length);
    elements.matchCount.classList.add('has-matches');

    var html = '<div class="matches-list">';
    var limit = Math.min(nodes.length, 200);
    for (var i = 0; i < limit; i++) {
      var node = nodes[i];
      html +=
        '<div class="match-item">' +
          '<div class="match-item-header">' +
            '<span class="match-index">#' + (i + 1) + '</span>' +
            '<span class="match-type">' + escapeHtml(getNodeTypeLabel(node)) + '</span>' +
            '<span class="match-path">' + escapeHtml(buildNodePath(node)) + '</span>' +
          '</div>' +
          '<div class="match-snippet">' + escapeHtml(getNodeSnippet(node) || '(empty)') + '</div>' +
        '</div>';
    }
    if (nodes.length > limit) {
      html += '<div class="placeholder">Showing first ' + limit + ' of ' + nodes.length + ' matches</div>';
    }
    html += '</div>';
    elements.resultsPanel.innerHTML = html;
  }

  function evaluateXPath() {
    var expression = (elements.xpathInput.value || '').trim();
    var source = elements.documentInput.value || '';

    showError(null);

    if (!expression && !source.trim()) {
      renderPlaceholder('Enter an XPath expression and document to see results');
      return;
    }

    if (!expression) {
      renderPlaceholder('Enter an XPath expression');
      return;
    }

    var parsed = parseDocument(source, currentMode);
    if (!parsed.doc) {
      showError(parsed.error);
      renderPlaceholder('Fix the document to evaluate XPath');
      return;
    }

    try {
      var result = parsed.doc.evaluate(
        expression,
        parsed.doc,
        createNsResolver(parsed.doc),
        XPathResult.ANY_TYPE,
        null
      );

      switch (result.resultType) {
        case XPathResult.NUMBER_TYPE:
          renderScalar('number', result.numberValue);
          trackEvaluate(expression, 1);
          break;
        case XPathResult.STRING_TYPE:
          renderScalar('string', result.stringValue);
          trackEvaluate(expression, 1);
          break;
        case XPathResult.BOOLEAN_TYPE:
          renderScalar('boolean', result.booleanValue);
          trackEvaluate(expression, 1);
          break;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
        case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
        case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
        case XPathResult.ANY_UNORDERED_NODE_TYPE:
        case XPathResult.FIRST_ORDERED_NODE_TYPE:
        default: {
          var nodes = [];
          if (result.resultType === XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE ||
              result.resultType === XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
            for (var s = 0; s < result.snapshotLength; s++) {
              nodes.push(result.snapshotItem(s));
            }
          } else if (result.resultType === XPathResult.ANY_UNORDERED_NODE_TYPE ||
                     result.resultType === XPathResult.FIRST_ORDERED_NODE_TYPE) {
            if (result.singleNodeValue) {
              nodes.push(result.singleNodeValue);
            }
          } else {
            var node = result.iterateNext();
            while (node) {
              nodes.push(node);
              if (nodes.length >= 500) {
                break;
              }
              node = result.iterateNext();
            }
          }
          renderNodes(nodes);
          trackEvaluate(expression, nodes.length);
          break;
        }
      }
    } catch (e) {
      showError(e.message || 'Invalid XPath expression');
      renderPlaceholder('Fix the XPath expression to see results');
      trackEvent('evaluate', 'invalid');
    }
  }

  function trackEvaluate(expression, count) {
    if (expression !== lastTrackedExpression) {
      lastTrackedExpression = expression;
      trackEvent('evaluate', expression.slice(0, 80), count);
    }
  }

  function scheduleEvaluate() {
    if (evaluateTimer) {
      clearTimeout(evaluateTimer);
    }
    evaluateTimer = setTimeout(evaluateXPath, 250);
  }

  function handleSample() {
    if (currentMode === 'xml') {
      elements.documentInput.value = SAMPLE_XML;
      elements.xpathInput.value = '//book/title';
    } else {
      elements.documentInput.value = SAMPLE_HTML;
      elements.xpathInput.value = '//div[@id=\'main\']//a';
    }
    trackEvent('sample', currentMode);
    evaluateXPath();
    elements.xpathInput.focus();
  }

  function handleClear() {
    elements.xpathInput.value = '';
    elements.documentInput.value = '';
    showError(null);
    renderPlaceholder('Enter an XPath expression and document to see results');
    trackEvent('clear', 'xpath_content');
    elements.xpathInput.focus();
  }

  function handleCopy() {
    var value = elements.xpathInput.value || '';
    if (!value) {
      return;
    }
    navigator.clipboard.writeText(value).then(function() {
      elements.copyXpathBtn.classList.add('copied');
      elements.copyXpathBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(function() {
        elements.copyXpathBtn.classList.remove('copied');
        elements.copyXpathBtn.innerHTML = '<i class="fas fa-copy"></i> Copy XPath';
      }, 2000);
      trackEvent('copy', 'xpath_expression');
    });
  }

  function handleShare() {
    var params = new URLSearchParams();
    var expression = elements.xpathInput.value || '';
    if (expression) {
      params.set('xpath', expression);
    }
    params.set('mode', currentMode);
    var url = window.location.pathname + '?' + params.toString();
    var absolute = window.location.origin + url;
    navigator.clipboard.writeText(absolute).then(function() {
      elements.shareBtn.classList.add('copied');
      elements.shareBtn.innerHTML = '<i class="fas fa-check"></i> Link Copied!';
      setTimeout(function() {
        elements.shareBtn.classList.remove('copied');
        elements.shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share Link';
      }, 2000);
      trackEvent('share', 'share_link');
    });
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', url);
    }
  }

  function loadFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var mode = params.get('mode');
    var xpath = params.get('xpath');
    if (mode === 'xml' || mode === 'html') {
      setMode(mode, { silent: true });
    }
    if (xpath) {
      elements.xpathInput.value = xpath;
    }
    if (!elements.documentInput.value) {
      elements.documentInput.value = currentMode === 'xml' ? SAMPLE_XML : SAMPLE_HTML;
    }
  }

  function init() {
    elements.evaluateBtn.addEventListener('click', function() {
      evaluateXPath();
      trackEvent('click_evaluate', 'evaluate_button');
    });
    elements.sampleBtn.addEventListener('click', handleSample);
    elements.clearBtn.addEventListener('click', handleClear);
    elements.copyXpathBtn.addEventListener('click', handleCopy);
    elements.shareBtn.addEventListener('click', handleShare);

    elements.modeTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        setMode(tab.getAttribute('data-mode'));
      });
    });

    elements.xpathInput.addEventListener('input', scheduleEvaluate);
    elements.documentInput.addEventListener('input', scheduleEvaluate);

    elements.xpathInput.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        evaluateXPath();
      }
    });

    elements.exampleRows.forEach(function(row) {
      row.addEventListener('click', function() {
        var xpath = row.getAttribute('data-xpath') || '';
        var mode = row.getAttribute('data-mode') || 'html';
        setMode(mode, { silent: true });
        elements.documentInput.value = mode === 'xml' ? SAMPLE_XML : SAMPLE_HTML;
        elements.xpathInput.value = xpath;
        evaluateXPath();
        trackEvent('example', xpath.slice(0, 80));
        elements.xpathInput.focus();
      });
    });

    loadFromQuery();
    evaluateXPath();
    trackEvent('tool_load', 'xpath_tester_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
