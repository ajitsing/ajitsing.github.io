(function () {
  'use strict';

  const originalText = document.getElementById('original-text');
  const modifiedText = document.getElementById('modified-text');
  const compareBtn = document.getElementById('compare-btn');
  const swapBtn = document.getElementById('swap-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const sampleBtn = document.getElementById('sample-btn');
  const clearOriginalBtn = document.getElementById('clear-original-btn');
  const clearModifiedBtn = document.getElementById('clear-modified-btn');
  const sbsBtn = document.getElementById('side-by-side-btn');
  const inlineBtn = document.getElementById('inline-btn');
  const diffStats = document.getElementById('diff-stats');
  const diffOutput = document.getElementById('diff-output');
  const diffSbs = document.getElementById('diff-sbs');
  const diffInline = document.getElementById('diff-inline');
  const diffIdentical = document.getElementById('diff-identical');
  const diffEmpty = document.getElementById('diff-empty');
  const statAdded = document.getElementById('stat-added');
  const statRemoved = document.getElementById('stat-removed');
  const statUnchanged = document.getElementById('stat-unchanged');
  const paneLeft = document.getElementById('diff-pane-left');
  const paneRight = document.getElementById('diff-pane-right');
  const wordwrapToggle = document.getElementById('wordwrap-toggle');

  let currentView = 'sbs';
  let lastDiff = null;

  // --- LCS-based line diff ---
  function lcsMatrix(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    return dp;
  }

  function diffLines(a, b) {
    const dp = lcsMatrix(a, b);
    const result = [];
    let i = a.length, j = b.length;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
        result.push({ type: 'equal', oldLine: i, newLine: j, text: a[i - 1] });
        i--; j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        result.push({ type: 'added', newLine: j, text: b[j - 1] });
        j--;
      } else {
        result.push({ type: 'removed', oldLine: i, text: a[i - 1] });
        i--;
      }
    }

    return result.reverse();
  }

  // --- Character-level diff within a line ---
  function diffChars(oldStr, newStr) {
    const oldChars = oldStr.split('');
    const newChars = newStr.split('');
    const m = oldChars.length, n = newChars.length;

    if (m > 500 || n > 500) return null;

    const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = oldChars[i - 1] === newChars[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }

    const ops = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && oldChars[i - 1] === newChars[j - 1]) {
        ops.push({ type: 'equal', char: oldChars[i - 1] });
        i--; j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        ops.push({ type: 'added', char: newChars[j - 1] });
        j--;
      } else {
        ops.push({ type: 'removed', char: oldChars[i - 1] });
        i--;
      }
    }
    return ops.reverse();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderCharDiff(charOps, side) {
    let html = '';
    let buf = '';
    let bufType = null;

    function flush() {
      if (buf.length === 0) return;
      if (bufType === 'equal') {
        html += escapeHtml(buf);
      } else if (bufType === 'added' && side === 'new') {
        html += '<span class="char-added">' + escapeHtml(buf) + '</span>';
      } else if (bufType === 'removed' && side === 'old') {
        html += '<span class="char-removed">' + escapeHtml(buf) + '</span>';
      }
      buf = '';
    }

    for (const op of charOps) {
      const t = op.type;
      const keepType = t === 'equal' ? 'equal' : t;
      if (keepType !== bufType) {
        flush();
        bufType = keepType;
      }
      if (t === 'equal' || (t === 'added' && side === 'new') || (t === 'removed' && side === 'old')) {
        buf += op.char;
      }
    }
    flush();
    return html;
  }

  // --- Pair up removed/added for char-level diff ---
  function pairChanges(diff) {
    const paired = [];
    let i = 0;
    while (i < diff.length) {
      if (diff[i].type === 'removed') {
        const removedBlock = [];
        while (i < diff.length && diff[i].type === 'removed') {
          removedBlock.push(diff[i]);
          i++;
        }
        const addedBlock = [];
        while (i < diff.length && diff[i].type === 'added') {
          addedBlock.push(diff[i]);
          i++;
        }
        const maxLen = Math.max(removedBlock.length, addedBlock.length);
        for (let k = 0; k < maxLen; k++) {
          paired.push({
            removed: removedBlock[k] || null,
            added: addedBlock[k] || null,
          });
        }
      } else {
        paired.push({ equal: diff[i] });
        i++;
      }
    }
    return paired;
  }

  // --- Build line HTML ---
  function makeLine(lineNum, prefix, content, cls) {
    return '<div class="diff-line ' + cls + '">' +
      '<span class="diff-line-num">' + (lineNum || '') + '</span>' +
      '<span class="diff-line-prefix">' + escapeHtml(prefix) + '</span>' +
      '<span class="diff-line-content">' + content + '</span>' +
      '</div>';
  }

  // --- Render side-by-side ---
  function renderSbs(paired) {
    let leftHtml = '', rightHtml = '';

    for (const p of paired) {
      if (p.equal) {
        const e = p.equal;
        leftHtml += makeLine(e.oldLine, ' ', escapeHtml(e.text), 'diff-equal');
        rightHtml += makeLine(e.newLine, ' ', escapeHtml(e.text), 'diff-equal');
      } else {
        const rm = p.removed;
        const ad = p.added;

        if (rm && ad) {
          const charOps = diffChars(rm.text, ad.text);
          if (charOps) {
            leftHtml += makeLine(rm.oldLine, '-', renderCharDiff(charOps, 'old'), 'diff-removed');
            rightHtml += makeLine(ad.newLine, '+', renderCharDiff(charOps, 'new'), 'diff-added');
          } else {
            leftHtml += makeLine(rm.oldLine, '-', escapeHtml(rm.text), 'diff-removed');
            rightHtml += makeLine(ad.newLine, '+', escapeHtml(ad.text), 'diff-added');
          }
        } else if (rm) {
          leftHtml += makeLine(rm.oldLine, '-', escapeHtml(rm.text), 'diff-removed');
          rightHtml += makeLine('', ' ', '', 'diff-empty');
        } else if (ad) {
          leftHtml += makeLine('', ' ', '', 'diff-empty');
          rightHtml += makeLine(ad.newLine, '+', escapeHtml(ad.text), 'diff-added');
        }
      }
    }

    paneLeft.innerHTML = leftHtml;
    paneRight.innerHTML = rightHtml;
  }

  // --- Render inline ---
  function renderInline(paired) {
    let html = '';

    for (const p of paired) {
      if (p.equal) {
        const e = p.equal;
        html += makeLine(e.oldLine, ' ', escapeHtml(e.text), 'diff-equal');
      } else {
        const rm = p.removed;
        const ad = p.added;

        if (rm && ad) {
          const charOps = diffChars(rm.text, ad.text);
          if (charOps) {
            html += makeLine(rm.oldLine, '-', renderCharDiff(charOps, 'old'), 'diff-removed');
            html += makeLine(ad.newLine, '+', renderCharDiff(charOps, 'new'), 'diff-added');
          } else {
            html += makeLine(rm.oldLine, '-', escapeHtml(rm.text), 'diff-removed');
            html += makeLine(ad.newLine, '+', escapeHtml(ad.text), 'diff-added');
          }
        } else if (rm) {
          html += makeLine(rm.oldLine, '-', escapeHtml(rm.text), 'diff-removed');
        } else if (ad) {
          html += makeLine(ad.newLine, '+', escapeHtml(ad.text), 'diff-added');
        }
      }
    }

    diffInline.innerHTML = html;
  }

  // --- Main compare ---
  function compare() {
    const a = originalText.value;
    const b = modifiedText.value;

    if (!a && !b) {
      diffOutput.style.display = 'none';
      diffStats.style.display = 'none';
      diffIdentical.style.display = 'none';
      diffEmpty.style.display = '';
      lastDiff = null;
      return;
    }

    diffEmpty.style.display = 'none';

    const aLines = a.split('\n');
    const bLines = b.split('\n');

    if (a === b) {
      diffOutput.style.display = 'none';
      diffStats.style.display = 'none';
      diffIdentical.style.display = '';
      lastDiff = null;
      return;
    }

    diffIdentical.style.display = 'none';

    const diff = diffLines(aLines, bLines);
    const paired = pairChanges(diff);
    lastDiff = paired;

    let added = 0, removed = 0, unchanged = 0;
    for (const d of diff) {
      if (d.type === 'added') added++;
      else if (d.type === 'removed') removed++;
      else unchanged++;
    }

    statAdded.textContent = added;
    statRemoved.textContent = removed;
    statUnchanged.textContent = unchanged;
    diffStats.style.display = '';

    renderSbs(paired);
    renderInline(paired);

    diffOutput.style.display = '';
    updateView();

    syncScroll();
  }

  function updateView() {
    if (currentView === 'sbs') {
      diffSbs.style.display = '';
      diffInline.style.display = 'none';
    } else {
      diffSbs.style.display = 'none';
      diffInline.style.display = '';
    }
  }

  // Sync scroll between panes
  function syncScroll() {
    let syncing = false;
    paneLeft.addEventListener('scroll', function () {
      if (syncing) return;
      syncing = true;
      paneRight.scrollTop = paneLeft.scrollTop;
      paneRight.scrollLeft = paneLeft.scrollLeft;
      syncing = false;
    });
    paneRight.addEventListener('scroll', function () {
      if (syncing) return;
      syncing = true;
      paneLeft.scrollTop = paneRight.scrollTop;
      paneLeft.scrollLeft = paneRight.scrollLeft;
      syncing = false;
    });
  }

  // --- Event listeners ---
  compareBtn.addEventListener('click', compare);

  originalText.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      compare();
    }
  });

  modifiedText.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      compare();
    }
  });

  swapBtn.addEventListener('click', function () {
    const tmp = originalText.value;
    originalText.value = modifiedText.value;
    modifiedText.value = tmp;
    if (lastDiff) compare();
  });

  clearAllBtn.addEventListener('click', function () {
    originalText.value = '';
    modifiedText.value = '';
    diffOutput.style.display = 'none';
    diffStats.style.display = 'none';
    diffIdentical.style.display = 'none';
    diffEmpty.style.display = '';
    lastDiff = null;
  });

  clearOriginalBtn.addEventListener('click', function () {
    originalText.value = '';
  });

  clearModifiedBtn.addEventListener('click', function () {
    modifiedText.value = '';
  });

  sampleBtn.addEventListener('click', function () {
    originalText.value =
      'function greet(name) {\n' +
      '  console.log("Hello, " + name);\n' +
      '  return true;\n' +
      '}\n' +
      '\n' +
      'const result = greet("World");\n' +
      'console.log(result);';

    modifiedText.value =
      'function greet(name, greeting = "Hello") {\n' +
      '  console.log(greeting + ", " + name + "!");\n' +
      '  return { success: true, name };\n' +
      '}\n' +
      '\n' +
      'const result = greet("World", "Hi");\n' +
      'console.log(result.success);';

    compare();
  });

  sbsBtn.addEventListener('click', function () {
    currentView = 'sbs';
    sbsBtn.classList.add('active');
    inlineBtn.classList.remove('active');
    updateView();
  });

  inlineBtn.addEventListener('click', function () {
    currentView = 'inline';
    inlineBtn.classList.add('active');
    sbsBtn.classList.remove('active');
    updateView();
  });

  wordwrapToggle.addEventListener('change', function () {
    diffOutput.classList.toggle('no-wrap', !wordwrapToggle.checked);
  });
})();
