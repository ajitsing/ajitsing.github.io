(function () {
  'use strict';

  // ── Lorem Ipsum word bank ───────────────────────────────────────
  var WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
    'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores',
    'quas', 'molestias', 'recusandae', 'itaque', 'earum', 'rerum', 'hic',
    'tenetur', 'sapiente', 'delectus', 'aut', 'reiciendis', 'voluptatibus',
    'maiores', 'alias', 'consequatur', 'perferendis', 'doloribus', 'asperiores',
    'repellat', 'temporibus', 'quibusdam', 'officiis', 'debitis',
    'necessitatibus', 'saepe', 'eveniet', 'voluptates', 'repudiandae',
    'recusandae', 'libero', 'tempore', 'cum', 'soluta', 'nobis', 'eligendi',
    'optio', 'cumque', 'nihil', 'impedit', 'quo', 'minus', 'quod', 'maxime',
    'placeat', 'facere', 'possimus', 'omnis', 'voluptas', 'assumenda',
    'repellendus', 'autem', 'vel', 'eum', 'fugit', 'harum', 'quidem',
    'exercitationem', 'ullam', 'corporis', 'suscipit', 'laboriosam', 'nemo',
    'ipsam', 'quia', 'consequuntur', 'magni', 'numquam', 'eius', 'modi',
    'tempora', 'incidunt', 'magnam', 'aliquam', 'quaerat', 'inventore',
    'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'explicabo',
    'aspernatur', 'odit', 'ab', 'illo', 'ratione', 'sententia', 'porro',
    'quisquam', 'nesciunt', 'neque', 'dolorem', 'adipisci', 'numquam',
    'dolore', 'ipsum', 'quia'
  ];

  var CLASSIC_OPENING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  // ── State ───────────────────────────────────────────────────────
  var currentType = 'paragraphs';

  // ── DOM refs ────────────────────────────────────────────────────
  var tabBtns       = document.querySelectorAll('.li-tab-btn');
  var quantityInput = document.getElementById('li-quantity');
  var qtyMinus      = document.getElementById('li-qty-minus');
  var qtyPlus       = document.getElementById('li-qty-plus');
  var startLorem    = document.getElementById('li-start-lorem');
  var htmlTags      = document.getElementById('li-html-tags');
  var generateBtn   = document.getElementById('li-generate-btn');
  var copyBtn       = document.getElementById('li-copy-btn');
  var clearBtn      = document.getElementById('li-clear-btn');
  var outputEl      = document.getElementById('li-output');
  var statsEl       = document.getElementById('li-stats');
  var presetCards   = document.querySelectorAll('.li-preset');

  // ── Helpers ─────────────────────────────────────────────────────
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ── Text generation ─────────────────────────────────────────────
  function generateWords(count) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push(pickRandom(WORDS));
    }
    return result;
  }

  function generateSentence(minWords, maxWords) {
    var count = randomInt(minWords || 6, maxWords || 16);
    var words = generateWords(count);
    words[0] = capitalize(words[0]);
    // Add occasional commas for natural flow
    if (count > 8) {
      var commaPos = randomInt(3, Math.floor(count / 2));
      words[commaPos] = words[commaPos] + ',';
    }
    return words.join(' ') + '.';
  }

  function generateParagraph(minSentences, maxSentences) {
    var count = randomInt(minSentences || 4, maxSentences || 8);
    var sentences = [];
    for (var i = 0; i < count; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  }

  function generate() {
    var qty = parseInt(quantityInput.value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    if (qty > 100) qty = 100;
    quantityInput.value = qty;

    var useClassic = startLorem.checked;
    var useHtml = htmlTags.checked;
    var items = [];

    if (currentType === 'paragraphs') {
      for (var i = 0; i < qty; i++) {
        if (i === 0 && useClassic) {
          items.push(CLASSIC_OPENING + ' ' + generateParagraph(3, 6));
        } else {
          items.push(generateParagraph());
        }
      }
    } else if (currentType === 'sentences') {
      for (var j = 0; j < qty; j++) {
        if (j === 0 && useClassic) {
          items.push(CLASSIC_OPENING);
        } else {
          items.push(generateSentence());
        }
      }
    } else { // words
      var words = generateWords(qty);
      if (useClassic && qty >= 2) {
        words[0] = 'lorem';
        words[1] = 'ipsum';
        if (qty >= 3) words[2] = 'dolor';
        if (qty >= 4) words[3] = 'sit';
        if (qty >= 5) words[4] = 'amet';
      }
      items = [words.join(' ')];
    }

    renderOutput(items, useHtml);
    updateStats(items, useHtml);

    copyBtn.disabled = false;
    clearBtn.disabled = false;
  }

  // ── Rendering ───────────────────────────────────────────────────
  function renderOutput(items, useHtml) {
    outputEl.innerHTML = '';

    if (useHtml && currentType !== 'words') {
      outputEl.classList.add('has-html');
      var html = items.map(function (text) {
        return '<span class="html-tag">&lt;p&gt;</span><span class="html-content">' + escapeHtml(text) + '</span><span class="html-tag">&lt;/p&gt;</span>';
      }).join('\n\n');
      outputEl.innerHTML = html;
    } else {
      outputEl.classList.remove('has-html');
      if (currentType === 'words') {
        var p = document.createElement('p');
        p.textContent = items[0];
        outputEl.appendChild(p);
      } else {
        items.forEach(function (text) {
          var p = document.createElement('p');
          p.textContent = text;
          outputEl.appendChild(p);
        });
      }
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function getPlainText(items, useHtml) {
    if (useHtml && currentType !== 'words') {
      return items.map(function (t) { return '<p>' + t + '</p>'; }).join('\n\n');
    }
    if (currentType === 'words') {
      return items[0];
    }
    return items.join('\n\n');
  }

  // ── Stats ───────────────────────────────────────────────────────
  function updateStats(items, useHtml) {
    var plain = getPlainText(items, useHtml);
    var wordCount = plain.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
    var charCount = plain.length;
    var typeLabel = currentType === 'paragraphs' ? 'Paragraphs' : currentType === 'sentences' ? 'Sentences' : 'Words';
    var itemCount = currentType === 'words' ? parseInt(quantityInput.value, 10) : items.length;

    statsEl.innerHTML =
      '<span class="stat-item"><span class="stat-label">' + typeLabel + ':</span> ' + itemCount + '</span>' +
      '<span class="stat-item"><span class="stat-label">Words:</span> ' + wordCount + '</span>' +
      '<span class="stat-item"><span class="stat-label">Characters:</span> ' + charCount.toLocaleString() + '</span>';
  }

  // ── Copy to clipboard ──────────────────────────────────────────
  function copyToClipboard() {
    // Reconstruct plain text from output
    var useHtml = htmlTags.checked;
    var text;

    if (outputEl.classList.contains('has-html')) {
      // Extract raw text from the HTML-mode output
      text = outputEl.innerText;
    } else {
      var paragraphs = outputEl.querySelectorAll('p');
      var texts = [];
      paragraphs.forEach(function (p) { texts.push(p.textContent); });
      text = texts.join('\n\n');
    }

    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopied();
      }).catch(function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopied();
    } catch (e) {
      // silent fail
    }
    document.body.removeChild(ta);
  }

  function showCopied() {
    copyBtn.classList.add('copied');
    var origHtml = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(function () {
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = origHtml;
    }, 2000);
  }

  // ── Clear output ───────────────────────────────────────────────
  function clearOutput() {
    outputEl.innerHTML = '<div class="li-placeholder"><i class="fas fa-paragraph"></i><span>Your lorem ipsum text will appear here</span></div>';
    outputEl.classList.remove('has-html');
    statsEl.innerHTML = '';
    copyBtn.disabled = true;
    clearBtn.disabled = true;
  }

  // ── Event listeners ─────────────────────────────────────────────
  // Tab switching
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentType = btn.getAttribute('data-type');

      // Adjust default quantity for type
      if (currentType === 'words' && parseInt(quantityInput.value, 10) < 10) {
        quantityInput.value = 50;
      } else if (currentType === 'sentences' && parseInt(quantityInput.value, 10) > 50) {
        quantityInput.value = 10;
      } else if (currentType === 'paragraphs' && parseInt(quantityInput.value, 10) > 20) {
        quantityInput.value = 5;
      }
    });
  });

  // Quantity buttons
  qtyMinus.addEventListener('click', function () {
    var val = parseInt(quantityInput.value, 10);
    if (val > 1) quantityInput.value = val - 1;
  });

  qtyPlus.addEventListener('click', function () {
    var val = parseInt(quantityInput.value, 10);
    if (val < 100) quantityInput.value = val + 1;
  });

  // Clamp quantity on manual input
  quantityInput.addEventListener('change', function () {
    var val = parseInt(quantityInput.value, 10);
    if (isNaN(val) || val < 1) quantityInput.value = 1;
    if (val > 100) quantityInput.value = 100;
  });

  // Generate
  generateBtn.addEventListener('click', generate);

  // Copy
  copyBtn.addEventListener('click', copyToClipboard);

  // Clear
  clearBtn.addEventListener('click', clearOutput);

  // Preset cards
  presetCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var type = card.getAttribute('data-type');
      var qty = parseInt(card.getAttribute('data-qty'), 10);

      // Set type
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      tabBtns.forEach(function (b) {
        if (b.getAttribute('data-type') === type) b.classList.add('active');
      });
      currentType = type;

      // Set quantity
      quantityInput.value = qty;

      // Generate
      generate();

      // Scroll to output
      outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Analytics
      if (typeof gtag === 'function') {
        gtag('event', 'click_preset', {
          'event_category': 'Lorem Ipsum Generator',
          'event_label': qty + ' ' + type
        });
      }
    });
  });

  // Keyboard shortcut: Ctrl/Cmd + Enter to generate
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      generate();
    }
  });

  // Auto-generate on page load
  generate();

})();
