(function() {
  'use strict';

  const TOKEN_EXPLANATIONS = {
    '^': 'Start of string (or line with multiline flag)',
    '$': 'End of string (or line with multiline flag)',
    '\\b': 'Word boundary',
    '\\B': 'Not a word boundary',
    '.': 'Any character except newline',
    '\\d': 'Any digit (0-9)',
    '\\D': 'Any non-digit',
    '\\w': 'Any word character (a-z, A-Z, 0-9, _)',
    '\\W': 'Any non-word character',
    '\\s': 'Any whitespace (space, tab, newline)',
    '\\S': 'Any non-whitespace character',
    '\\n': 'Newline character',
    '\\r': 'Carriage return',
    '\\t': 'Tab character',
    '\\0': 'Null character',
    '*': 'Zero or more of the preceding element',
    '+': 'One or more of the preceding element',
    '?': 'Zero or one of the preceding element (optional)',
    '*?': 'Zero or more (lazy/non-greedy)',
    '+?': 'One or more (lazy/non-greedy)',
    '??': 'Zero or one (lazy/non-greedy)',
    '|': 'Alternation (OR)',
    '\\': 'Escape next character',
  };

  const elements = {
    regexInput: document.getElementById('regex-input'),
    testString: document.getElementById('test-string'),
    flagBtns: document.querySelectorAll('.flag-btn'),
    patternError: document.getElementById('pattern-error'),
    matchCount: document.getElementById('match-count'),
    highlightedResult: document.getElementById('highlighted-result'),
    captureGroups: document.getElementById('capture-groups'),
    patternExplanation: document.getElementById('pattern-explanation'),
    copyPatternBtn: document.getElementById('copy-pattern-btn'),
    shareBtn: document.getElementById('share-btn'),
    exampleRows: document.querySelectorAll('.example-row')
  };

  let currentFlags = { g: true, i: false, m: true, s: false, u: false };

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'Regex Tool',
        event_label: label,
        value: value
      });
    }
  }

  function getFlagsString(flags) {
    return Object.entries(flags)
      .filter(([, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('');
  }

  function toggleFlag(flag) {
    currentFlags[flag] = !currentFlags[flag];
    elements.flagBtns.forEach(btn => {
      if (btn.dataset.flag === flag) {
        btn.classList.toggle('active', currentFlags[flag]);
      }
    });
    updateTestMode();
    trackEvent('toggle_flag', flag, currentFlags[flag] ? 1 : 0);
  }

  function createRegex(pattern, flags) {
    if (!pattern) return { regex: null, error: null };
    try {
      return { regex: new RegExp(pattern, flags), error: null };
    } catch (e) {
      return { regex: null, error: e.message };
    }
  }

  function showError(errorElement, message) {
    if (message) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    } else {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function highlightMatches(text, regex) {
    if (!regex || !text) {
      return { html: escapeHtml(text) || '', matches: [] };
    }

    const matches = [];
    const flags = regex.flags.includes('g') ? regex.flags : regex.flags + 'g';
    const globalRegex = new RegExp(regex.source, flags);
    
    let result, lastIndex = 0, html = '', matchIndex = 0;
    
    while ((result = globalRegex.exec(text)) !== null) {
      if (result.index === globalRegex.lastIndex) globalRegex.lastIndex++;
      
      if (result.index > lastIndex) {
        html += escapeHtml(text.slice(lastIndex, result.index));
      }
      
      const matchClass = matchIndex % 2 === 0 ? 'match' : 'match-alt';
      html += `<span class="${matchClass}">${escapeHtml(result[0])}</span>`;
      
      matches.push({
        index: matchIndex,
        match: result[0],
        groups: result.slice(1),
        position: result.index
      });
      
      lastIndex = result.index + result[0].length;
      matchIndex++;
      
      if (matchIndex > 10000) break;
      if (!regex.flags.includes('g')) break;
    }
    
    if (lastIndex < text.length) {
      html += escapeHtml(text.slice(lastIndex));
    }
    
    return { html, matches };
  }

  function renderCaptureGroups(matches) {
    if (!matches || matches.length === 0) {
      elements.captureGroups.innerHTML = '<span class="placeholder">No matches found</span>';
      return;
    }
    
    const hasGroups = matches.some(m => m.groups?.length > 0 && m.groups.some(g => g !== undefined));
    
    if (!hasGroups) {
      elements.captureGroups.innerHTML = '<span class="placeholder">No capture groups in pattern</span>';
      return;
    }
    
    let html = '';
    matches.forEach((match, i) => {
      if (i > 0) {
        html += `<div class="match-separator">Match ${i + 1}</div>`;
      } else if (matches.length > 1) {
        html += `<div class="match-separator" style="border-top:none;margin-top:0;padding-top:0;">Match 1</div>`;
      }
      
      html += `<div class="capture-group-item">
        <span class="group-label">Full</span>
        <span class="group-value">${escapeHtml(match.match) || '(empty)'}</span>
      </div>`;
      
      match.groups?.forEach((group, j) => {
        if (group !== undefined) {
          html += `<div class="capture-group-item">
            <span class="group-label">$${j + 1}</span>
            <span class="group-value">${escapeHtml(group) || '(empty)'}</span>
          </div>`;
        }
      });
    });
    
    elements.captureGroups.innerHTML = html;
  }

  function tokenizePattern(pattern) {
    if (!pattern) return [];
    
    const tokens = [];
    let i = 0;
    
    while (i < pattern.length) {
      const char = pattern[i];
      const remaining = pattern.slice(i);
      
      if (char === '\\' && i + 1 < pattern.length) {
        const next = pattern[i + 1];
        const escaped = '\\' + next;
        
        if ('dDwWsSbBnrt0'.includes(next)) {
          tokens.push({ token: escaped, desc: TOKEN_EXPLANATIONS[escaped] || `Escaped ${next}` });
          i += 2;
          continue;
        }
        
        if (/\d/.test(next)) {
          let num = '', j = i + 1;
          while (j < pattern.length && /\d/.test(pattern[j])) {
            num += pattern[j];
            j++;
          }
          tokens.push({ token: '\\' + num, desc: `Backreference to group ${num}` });
          i = j;
          continue;
        }
        
        tokens.push({ token: escaped, desc: `Literal "${next}" character` });
        i += 2;
        continue;
      }
      
      if (char === '[') {
        let classEnd = i + 1;
        const negated = pattern[classEnd] === '^';
        if (negated) classEnd++;
        
        while (classEnd < pattern.length && (pattern[classEnd] !== ']' || classEnd === i + 1)) {
          if (pattern[classEnd] === '\\' && classEnd + 1 < pattern.length) {
            classEnd += 2;
          } else {
            classEnd++;
          }
        }
        
        if (classEnd < pattern.length) {
          const classContent = pattern.slice(i, classEnd + 1);
          const inner = pattern.slice(i + 1 + (negated ? 1 : 0), classEnd);
          
          let desc = negated ? 'Any character NOT in: ' : 'Any character in: ';
          if (inner === 'a-z') desc = negated ? 'Any character except lowercase a-z' : 'Any lowercase letter a-z';
          else if (inner === 'A-Z') desc = negated ? 'Any character except uppercase A-Z' : 'Any uppercase letter A-Z';
          else if (inner === '0-9') desc = negated ? 'Any non-digit' : 'Any digit 0-9';
          else if (inner === 'a-zA-Z') desc = negated ? 'Any non-letter' : 'Any letter (upper or lower)';
          else if (inner === 'a-zA-Z0-9') desc = negated ? 'Any non-alphanumeric' : 'Any alphanumeric character';
          else desc += inner;
          
          tokens.push({ token: classContent, desc });
          i = classEnd + 1;
          continue;
        }
      }
      
      if (char === '(') {
        const groupPatterns = [
          { prefix: '(?:', desc: 'Non-capturing group start' },
          { prefix: '(?=', desc: 'Positive lookahead start' },
          { prefix: '(?!', desc: 'Negative lookahead start' },
          { prefix: '(?<=', desc: 'Positive lookbehind start' },
          { prefix: '(?<!', desc: 'Negative lookbehind start' }
        ];
        
        const matched = groupPatterns.find(p => remaining.startsWith(p.prefix));
        if (matched) {
          tokens.push({ token: matched.prefix, desc: matched.desc });
          i += matched.prefix.length;
          continue;
        }
        
        const namedMatch = remaining.match(/^\(\?<([a-zA-Z_][a-zA-Z0-9_]*)>/);
        if (namedMatch) {
          tokens.push({ token: namedMatch[0], desc: `Named capture group "${namedMatch[1]}"` });
          i += namedMatch[0].length;
          continue;
        }
        
        tokens.push({ token: '(', desc: 'Capturing group start' });
        i++;
        continue;
      }
      
      if (char === ')') {
        tokens.push({ token: ')', desc: 'Group end' });
        i++;
        continue;
      }
      
      if (char === '{') {
        const match = remaining.match(/^\{(\d+)(,)?(\d*)?\}/);
        if (match) {
          const [token, min, hasComma, max] = match;
          let desc;
          if (!hasComma) desc = `Exactly ${min} times`;
          else if (!max) desc = `${min} or more times`;
          else desc = `Between ${min} and ${max} times`;
          
          tokens.push({ token, desc });
          i += token.length;
          continue;
        }
      }
      
      if ('*+?'.includes(char) && pattern[i + 1] === '?') {
        tokens.push({ token: char + '?', desc: TOKEN_EXPLANATIONS[char + '?'] || `${char} (lazy)` });
        i += 2;
        continue;
      }
      
      if (TOKEN_EXPLANATIONS[char]) {
        tokens.push({ token: char, desc: TOKEN_EXPLANATIONS[char] });
        i++;
        continue;
      }
      
      tokens.push({ token: char, desc: `Literal "${char}"` });
      i++;
    }
    
    return tokens;
  }

  function renderExplanation(pattern) {
    const tokens = tokenizePattern(pattern);
    
    if (tokens.length === 0) {
      elements.patternExplanation.innerHTML = '<span class="placeholder">Enter a regex pattern to see its explanation</span>';
      return;
    }
    
    elements.patternExplanation.innerHTML = tokens.map(({ token, desc }) => 
      `<div class="explanation-item">
        <span class="explanation-token">${escapeHtml(token)}</span>
        <span class="explanation-desc">${escapeHtml(desc)}</span>
      </div>`
    ).join('');
  }

  function updateTestMode() {
    const pattern = elements.regexInput.value;
    const testStr = elements.testString.value;
    const flagsStr = getFlagsString(currentFlags);
    
    showError(elements.patternError, null);
    
    const { regex, error } = createRegex(pattern, flagsStr);
    
    if (error) {
      showError(elements.patternError, error);
      elements.matchCount.textContent = '0';
      elements.matchCount.classList.remove('has-matches');
      elements.highlightedResult.innerHTML = '<span class="placeholder">Fix the pattern error above</span>';
      elements.captureGroups.innerHTML = '<span class="placeholder">Fix the pattern error</span>';
      renderExplanation(pattern);
      return;
    }
    
    if (!pattern) {
      elements.matchCount.textContent = '0';
      elements.matchCount.classList.remove('has-matches');
      elements.highlightedResult.innerHTML = '<span class="placeholder">Enter a pattern and test string to see matches</span>';
      elements.captureGroups.innerHTML = '<span class="placeholder">Capture groups will appear here</span>';
      elements.patternExplanation.innerHTML = '<span class="placeholder">Enter a regex pattern to see its explanation</span>';
      return;
    }
    
    const { html, matches } = highlightMatches(testStr, regex);
    
    elements.matchCount.textContent = matches.length;
    elements.matchCount.classList.toggle('has-matches', matches.length > 0);
    
    if (testStr) {
      elements.highlightedResult.innerHTML = html || '<span class="placeholder">No matches found</span>';
    } else {
      elements.highlightedResult.innerHTML = '<span class="placeholder">Enter a test string above</span>';
    }
    
    renderCaptureGroups(matches);
    renderExplanation(pattern);
  }

  function getStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
      pattern: params.get('pattern') ? decodeURIComponent(params.get('pattern')) : null,
      test: params.get('test') ? decodeURIComponent(params.get('test')) : null,
      flags: params.get('flags') || 'gm'
    };
  }

  function updateURL() {
    const pattern = elements.regexInput.value;
    const testStr = elements.testString.value;
    const flagsStr = getFlagsString(currentFlags);
    const url = new URL(window.location);
    
    if (pattern) url.searchParams.set('pattern', encodeURIComponent(pattern));
    else url.searchParams.delete('pattern');
    
    if (testStr) url.searchParams.set('test', encodeURIComponent(testStr));
    else url.searchParams.delete('test');
    
    if (flagsStr && flagsStr !== 'gm') url.searchParams.set('flags', flagsStr);
    else url.searchParams.delete('flags');
    
    window.history.replaceState({}, '', url);
  }

  function loadFromURL() {
    const state = getStateFromURL();
    
    if (state.pattern) elements.regexInput.value = state.pattern;
    if (state.test) elements.testString.value = state.test;
    
    if (state.flags) {
      Object.keys(currentFlags).forEach(flag => {
        currentFlags[flag] = state.flags.includes(flag);
      });
      elements.flagBtns.forEach(btn => {
        btn.classList.toggle('active', currentFlags[btn.dataset.flag]);
      });
    }
  }

  function handleExampleClick(e) {
    const { pattern, test } = e.currentTarget.dataset;
    trackEvent('example_click', pattern);
    
    elements.regexInput.value = pattern;
    if (test) elements.testString.value = test.replace(/&#10;/g, '\n');
    
    updateTestMode();
    updateURL();
    document.querySelector('.regex-tool').scrollIntoView({ behavior: 'smooth' });
  }

  function handleCopyPattern() {
    const pattern = elements.regexInput.value;
    if (!pattern) return;
    
    trackEvent('copy_pattern', pattern);
    navigator.clipboard.writeText(pattern).then(() => {
      elements.copyPatternBtn.classList.add('copied');
      elements.copyPatternBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        elements.copyPatternBtn.classList.remove('copied');
        elements.copyPatternBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Pattern';
      }, 2000);
    });
  }

  function handleShare() {
    trackEvent('share_pattern', elements.regexInput.value);
    updateURL();
    
    navigator.clipboard.writeText(window.location.href).then(() => {
      elements.shareBtn.classList.add('copied');
      elements.shareBtn.innerHTML = '<i class="fas fa-check"></i> Link Copied!';
      setTimeout(() => {
        elements.shareBtn.classList.remove('copied');
        elements.shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share Link';
      }, 2000);
    });
  }

  function init() {
    loadFromURL();
    
    elements.regexInput.addEventListener('input', () => { updateTestMode(); updateURL(); });
    elements.testString.addEventListener('input', () => { updateTestMode(); updateURL(); });
    
    elements.flagBtns.forEach(btn => {
      btn.addEventListener('click', () => { toggleFlag(btn.dataset.flag); updateURL(); });
    });
    
    elements.exampleRows.forEach(row => row.addEventListener('click', handleExampleClick));
    elements.copyPatternBtn?.addEventListener('click', handleCopyPattern);
    elements.shareBtn?.addEventListener('click', handleShare);
    
    updateTestMode();
    trackEvent('tool_load', 'regex_tester_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
