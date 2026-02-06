(function() {
  'use strict';

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'Epoch Converter',
        event_label: label,
        value: value
      });
    }
  }

  const elements = {
    currentSeconds: document.getElementById('current-seconds'),
    currentMilliseconds: document.getElementById('current-milliseconds'),
    
    modeTabs: document.querySelectorAll('.mode-tab'),
    modeContents: document.querySelectorAll('.mode-content'),
    
    timestampInput: document.getElementById('timestamp-input'),
    convertTimestampBtn: document.getElementById('convert-timestamp-btn'),
    timestampError: document.getElementById('timestamp-error'),
    timestampErrorText: document.getElementById('timestamp-error-text'),
    timestampResult: document.getElementById('timestamp-result'),
    
    resultUtc: document.getElementById('result-utc'),
    resultLocal: document.getElementById('result-local'),
    resultIso: document.getElementById('result-iso'),
    resultRelative: document.getElementById('result-relative'),
    resultRfc2822: document.getElementById('result-rfc2822'),
    resultDay: document.getElementById('result-day'),
    resultWeek: document.getElementById('result-week'),
    resultDayOfYear: document.getElementById('result-dayofyear'),
    resultFormat: document.getElementById('result-format'),
    
    datePicker: document.getElementById('date-picker'),
    timePicker: document.getElementById('time-picker'),
    timezoneSelect: document.getElementById('timezone-select'),
    convertDateBtn: document.getElementById('convert-date-btn'),
    nowBtn: document.getElementById('now-btn'),
    dateResult: document.getElementById('date-result'),
    outputSeconds: document.getElementById('output-seconds'),
    outputMilliseconds: document.getElementById('output-milliseconds'),
    
    snippetTabs: document.querySelectorAll('.snippet-tab'),
    codeSnippet: document.getElementById('code-snippet'),
    snippetValue: document.getElementById('snippet-value'),
    copySnippetBtn: document.getElementById('copy-snippet-btn'),
    
    exampleBtns: document.querySelectorAll('.example-btn')
  };

  const codeSnippets = {
    javascript: (ts) => `// JavaScript
const timestamp = ${ts};
const date = new Date(timestamp * 1000);
console.log(date.toISOString());`,
    
    python: (ts) => `# Python
import datetime
timestamp = ${ts}
date = datetime.datetime.fromtimestamp(timestamp)
print(date.isoformat())`,
    
    php: (ts) => `<?php
// PHP
$timestamp = ${ts};
$date = date('c', $timestamp);
echo $date;`,
    
    java: (ts) => `// Java
long timestamp = ${ts}L;
Instant instant = Instant.ofEpochSecond(timestamp);
System.out.println(instant.toString());`
  };

  let currentSnippetLang = 'javascript';
  let currentTimestampSeconds = 0;

  function updateCurrentTimestamp() {
    const now = Date.now();
    const seconds = Math.floor(now / 1000);
    
    if (elements.currentSeconds) {
      elements.currentSeconds.textContent = seconds.toString();
    }
    if (elements.currentMilliseconds) {
      elements.currentMilliseconds.textContent = now.toString();
    }
  }

  setInterval(updateCurrentTimestamp, 1000);
  updateCurrentTimestamp();

  function switchMode(mode) {
    elements.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });
    
    elements.modeContents.forEach(content => {
      content.classList.toggle('active', content.id === `${mode}-mode`);
    });

    trackEvent('mode_switch', 'Tab: ' + mode);
  }

  elements.modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchMode(tab.dataset.mode);
    });
  });

  function detectTimestampFormat(timestamp) {
    const absTimestamp = Math.abs(timestamp);
    const digits = absTimestamp.toString().length;
    
    if (digits <= 10) return 'seconds';
    if (digits === 13) return 'milliseconds';
    if (digits > 13) return 'microseconds';
    return 'seconds';
  }

  function normalizeToMilliseconds(timestamp) {
    const format = detectTimestampFormat(timestamp);
    
    switch (format) {
      case 'seconds': return timestamp * 1000;
      case 'milliseconds': return timestamp;
      case 'microseconds': return Math.floor(timestamp / 1000);
      default: return timestamp * 1000;
    }
  }

  function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    const isFuture = diffMs < 0;
    const absDiffSec = Math.abs(diffSec);
    const absDiffMin = Math.abs(diffMin);
    const absDiffHour = Math.abs(diffHour);
    const absDiffDay = Math.abs(diffDay);
    const absDiffWeek = Math.abs(diffWeek);
    const absDiffMonth = Math.abs(diffMonth);
    const absDiffYear = Math.abs(diffYear);

    let result;

    if (absDiffSec < 60) {
      result = absDiffSec === 1 ? '1 second' : `${absDiffSec} seconds`;
    } else if (absDiffMin < 60) {
      result = absDiffMin === 1 ? '1 minute' : `${absDiffMin} minutes`;
    } else if (absDiffHour < 24) {
      result = absDiffHour === 1 ? '1 hour' : `${absDiffHour} hours`;
    } else if (absDiffDay < 7) {
      result = absDiffDay === 1 ? '1 day' : `${absDiffDay} days`;
    } else if (absDiffWeek < 4) {
      result = absDiffWeek === 1 ? '1 week' : `${absDiffWeek} weeks`;
    } else if (absDiffMonth < 12) {
      result = absDiffMonth === 1 ? '1 month' : `${absDiffMonth} months`;
    } else {
      result = absDiffYear === 1 ? '1 year' : `${absDiffYear} years`;
    }

    return isFuture ? `in ${result}` : `${result} ago`;
  }

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  function formatRFC2822(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[date.getUTCDay()];
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    
    return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} +0000`;
  }

  function convertTimestampToDate() {
    const input = elements.timestampInput.value.trim();
    
    elements.timestampError.classList.add('hidden');
    elements.timestampResult.classList.add('hidden');

    if (!input) {
      showTimestampError('Please enter a Unix timestamp');
      return;
    }

    const timestamp = parseInt(input, 10);
    
    if (isNaN(timestamp)) {
      showTimestampError('Invalid timestamp. Please enter a valid number.');
      return;
    }

    const format = detectTimestampFormat(timestamp);
    const milliseconds = normalizeToMilliseconds(timestamp);
    const date = new Date(milliseconds);
    
    if (isNaN(date.getTime())) {
      showTimestampError('Unable to convert timestamp to a valid date.');
      return;
    }

    currentTimestampSeconds = format === 'seconds' ? timestamp : Math.floor(timestamp / 1000);

    const utcOptions = { 
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZone: 'UTC', timeZoneName: 'short'
    };

    const localOptions = {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZoneName: 'short'
    };

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    elements.resultUtc.textContent = date.toLocaleString('en-US', utcOptions);
    elements.resultLocal.textContent = date.toLocaleString('en-US', localOptions);
    elements.resultIso.textContent = date.toISOString();
    elements.resultRelative.textContent = getRelativeTime(date);
    elements.resultRfc2822.textContent = formatRFC2822(date);
    elements.resultDay.textContent = days[date.getDay()];
    elements.resultWeek.textContent = 'Week ' + getWeekNumber(date);
    elements.resultDayOfYear.textContent = 'Day ' + getDayOfYear(date);
    
    let formatDisplay = format.charAt(0).toUpperCase() + format.slice(1);
    if (timestamp < 0) {
      formatDisplay += ' (pre-1970)';
    }
    elements.resultFormat.textContent = formatDisplay;

    elements.timestampResult.classList.remove('hidden');
    updateCodeSnippet();
    trackEvent('convert', 'Timestamp to Date', 1);
  }

  function showTimestampError(message) {
    elements.timestampErrorText.textContent = message;
    elements.timestampError.classList.remove('hidden');
    elements.timestampResult.classList.add('hidden');
  }

  if (elements.convertTimestampBtn) {
    elements.convertTimestampBtn.addEventListener('click', convertTimestampToDate);
  }

  if (elements.timestampInput) {
    elements.timestampInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        convertTimestampToDate();
      }
    });

    let debounceTimer;
    elements.timestampInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (elements.timestampInput.value.trim()) {
          convertTimestampToDate();
        }
      }, 500);
    });
  }

  function initDatePickers() {
    const now = new Date();
    
    if (elements.datePicker) {
      elements.datePicker.value = now.toISOString().split('T')[0];
    }
    
    if (elements.timePicker) {
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      elements.timePicker.value = `${hours}:${minutes}:${seconds}`;
    }
  }

  function convertDateToTimestamp() {
    const dateValue = elements.datePicker.value;
    const timeValue = elements.timePicker.value || '00:00:00';
    const timezone = elements.timezoneSelect.value;

    if (!dateValue) return;

    let date;
    
    if (timezone === 'utc') {
      date = new Date(`${dateValue}T${timeValue}Z`);
    } else {
      date = new Date(`${dateValue}T${timeValue}`);
    }

    if (isNaN(date.getTime())) return;

    const milliseconds = date.getTime();
    const seconds = Math.floor(milliseconds / 1000);

    currentTimestampSeconds = seconds;

    elements.outputSeconds.textContent = seconds.toString();
    elements.outputMilliseconds.textContent = milliseconds.toString();
    elements.dateResult.classList.remove('hidden');

    updateCodeSnippet();
    trackEvent('convert', 'Date to Timestamp', 1);
  }

  function setCurrentTime() {
    const now = new Date();
    
    if (elements.datePicker) {
      elements.datePicker.value = now.toISOString().split('T')[0];
    }
    
    if (elements.timePicker) {
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      elements.timePicker.value = `${hours}:${minutes}:${seconds}`;
    }

    if (elements.timezoneSelect) {
      elements.timezoneSelect.value = 'local';
    }

    convertDateToTimestamp();
  }

  if (elements.convertDateBtn) {
    elements.convertDateBtn.addEventListener('click', convertDateToTimestamp);
  }

  if (elements.nowBtn) {
    elements.nowBtn.addEventListener('click', setCurrentTime);
  }

  [elements.datePicker, elements.timePicker, elements.timezoneSelect].forEach(el => {
    if (el) {
      el.addEventListener('change', convertDateToTimestamp);
    }
  });

  function updateCodeSnippet() {
    if (elements.codeSnippet && codeSnippets[currentSnippetLang]) {
      elements.codeSnippet.textContent = codeSnippets[currentSnippetLang](currentTimestampSeconds);
    }
  }

  elements.snippetTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      elements.snippetTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentSnippetLang = tab.dataset.lang;
      updateCodeSnippet();
    });
  });

  if (elements.copySnippetBtn) {
    elements.copySnippetBtn.addEventListener('click', () => {
      const code = elements.codeSnippet.textContent;
      copyToClipboard(code, elements.copySnippetBtn);
      trackEvent('copy', 'Copy Snippet: ' + currentSnippetLang);
    });
  }

  elements.exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const timestamp = btn.dataset.timestamp;
      if (elements.timestampInput) {
        elements.timestampInput.value = timestamp;
        convertTimestampToDate();
        trackEvent('example_click', 'Example: ' + timestamp);
      }
    });
  });

  function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i>';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  document.querySelectorAll('.btn-copy-mini[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.copy;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        copyToClipboard(targetElement.textContent, btn);
        trackEvent('copy', 'Copy: ' + targetId);
      }
    });
  });

  document.querySelectorAll('.btn-copy-card[data-copy], .btn-copy-output[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.copy;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        copyToClipboard(targetElement.textContent, btn);
        trackEvent('copy', 'Copy Result');
      }
    });
  });

  function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const timestamp = urlParams.get('ts') || urlParams.get('timestamp');
    
    if (timestamp && elements.timestampInput) {
      elements.timestampInput.value = timestamp;
      trackEvent('url_load', timestamp);
      convertTimestampToDate();
    }
  }

  function init() {
    initDatePickers();
    handleUrlParameters();
    updateCodeSnippet();
    trackEvent('tool_load', 'epoch_converter_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
