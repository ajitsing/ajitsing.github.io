/**
 * Epoch Timestamp Converter Tool
 * Converts between Unix timestamps and human-readable dates
 */

(function() {
  'use strict';

  // DOM Elements
  const elements = {
    // Current timestamp display
    currentSeconds: document.getElementById('current-seconds'),
    currentMilliseconds: document.getElementById('current-milliseconds'),
    
    // Mode tabs
    modeTabs: document.querySelectorAll('.mode-tab'),
    modeContents: document.querySelectorAll('.mode-content'),
    
    // Timestamp to Date
    timestampInput: document.getElementById('timestamp-input'),
    convertTimestampBtn: document.getElementById('convert-timestamp-btn'),
    timestampError: document.getElementById('timestamp-error'),
    timestampErrorText: document.getElementById('timestamp-error-text'),
    timestampResult: document.getElementById('timestamp-result'),
    
    // Result fields
    resultUtc: document.getElementById('result-utc'),
    resultLocal: document.getElementById('result-local'),
    resultIso: document.getElementById('result-iso'),
    resultRelative: document.getElementById('result-relative'),
    resultRfc2822: document.getElementById('result-rfc2822'),
    resultDay: document.getElementById('result-day'),
    resultWeek: document.getElementById('result-week'),
    resultDayOfYear: document.getElementById('result-dayofyear'),
    resultFormat: document.getElementById('result-format'),
    
    // Date to Timestamp
    datePicker: document.getElementById('date-picker'),
    timePicker: document.getElementById('time-picker'),
    timezoneSelect: document.getElementById('timezone-select'),
    convertDateBtn: document.getElementById('convert-date-btn'),
    nowBtn: document.getElementById('now-btn'),
    dateResult: document.getElementById('date-result'),
    outputSeconds: document.getElementById('output-seconds'),
    outputMilliseconds: document.getElementById('output-milliseconds'),
    
    // Code snippets
    snippetTabs: document.querySelectorAll('.snippet-tab'),
    codeSnippet: document.getElementById('code-snippet'),
    snippetValue: document.getElementById('snippet-value'),
    copySnippetBtn: document.getElementById('copy-snippet-btn'),
    
    // Example buttons
    exampleBtns: document.querySelectorAll('.example-btn')
  };

  // Code snippet templates
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

  // ========================================
  // Current Timestamp Display
  // ========================================

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

  // Update every second
  setInterval(updateCurrentTimestamp, 1000);
  updateCurrentTimestamp();

  // ========================================
  // Mode Tab Switching
  // ========================================

  function switchMode(mode) {
    elements.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });
    
    elements.modeContents.forEach(content => {
      content.classList.toggle('active', content.id === `${mode}-mode`);
    });

    // Track with Google Analytics
    if (typeof gtag === 'function') {
      gtag('event', 'tab_switch', {
        'event_category': 'Epoch Converter',
        'event_label': 'Tab: ' + mode
      });
    }
  }

  elements.modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchMode(tab.dataset.mode);
    });
  });

  // ========================================
  // Timestamp to Date Conversion
  // ========================================

  function detectTimestampFormat(timestamp) {
    const absTimestamp = Math.abs(timestamp);
    const digits = absTimestamp.toString().length;
    
    if (digits <= 10) {
      return 'seconds';
    } else if (digits === 13) {
      return 'milliseconds';
    } else if (digits > 13) {
      return 'microseconds';
    }
    return 'seconds';
  }

  function normalizeToMilliseconds(timestamp) {
    const format = detectTimestampFormat(timestamp);
    
    switch (format) {
      case 'seconds':
        return timestamp * 1000;
      case 'milliseconds':
        return timestamp;
      case 'microseconds':
        return Math.floor(timestamp / 1000);
      default:
        return timestamp * 1000;
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
    
    // Reset error state
    elements.timestampError.classList.add('hidden');
    elements.timestampResult.classList.add('hidden');

    if (!input) {
      showTimestampError('Please enter a Unix timestamp');
      return;
    }

    // Parse the timestamp
    const timestamp = parseInt(input, 10);
    
    if (isNaN(timestamp)) {
      showTimestampError('Invalid timestamp. Please enter a valid number.');
      return;
    }

    // Detect format and convert to milliseconds
    const format = detectTimestampFormat(timestamp);
    const milliseconds = normalizeToMilliseconds(timestamp);
    
    // Create date object
    const date = new Date(milliseconds);
    
    // Check if valid date
    if (isNaN(date.getTime())) {
      showTimestampError('Unable to convert timestamp to a valid date.');
      return;
    }

    // Store for code snippets
    currentTimestampSeconds = format === 'seconds' ? timestamp : Math.floor(timestamp / 1000);

    // Format options
    const utcOptions = { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short'
    };

    const localOptions = {
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Populate results
    elements.resultUtc.textContent = date.toLocaleString('en-US', utcOptions);
    elements.resultLocal.textContent = date.toLocaleString('en-US', localOptions);
    elements.resultIso.textContent = date.toISOString();
    elements.resultRelative.textContent = getRelativeTime(date);
    elements.resultRfc2822.textContent = formatRFC2822(date);
    elements.resultDay.textContent = days[date.getDay()];
    elements.resultWeek.textContent = 'Week ' + getWeekNumber(date);
    elements.resultDayOfYear.textContent = 'Day ' + getDayOfYear(date);
    
    // Format detection display
    let formatDisplay = format.charAt(0).toUpperCase() + format.slice(1);
    if (timestamp < 0) {
      formatDisplay += ' (pre-1970)';
    }
    elements.resultFormat.textContent = formatDisplay;

    // Show results
    elements.timestampResult.classList.remove('hidden');

    // Update code snippet
    updateCodeSnippet();

    // Track with Google Analytics
    if (typeof gtag === 'function') {
      gtag('event', 'convert', {
        'event_category': 'Epoch Converter',
        'event_label': 'Timestamp to Date',
        'value': 1
      });
    }
  }

  function showTimestampError(message) {
    elements.timestampErrorText.textContent = message;
    elements.timestampError.classList.remove('hidden');
    elements.timestampResult.classList.add('hidden');
  }

  // Event listeners for timestamp conversion
  if (elements.convertTimestampBtn) {
    elements.convertTimestampBtn.addEventListener('click', convertTimestampToDate);
  }

  if (elements.timestampInput) {
    elements.timestampInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        convertTimestampToDate();
      }
    });

    // Live conversion as user types (with debounce)
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

  // ========================================
  // Date to Timestamp Conversion
  // ========================================

  function initDatePickers() {
    const now = new Date();
    
    // Set default date
    if (elements.datePicker) {
      const dateStr = now.toISOString().split('T')[0];
      elements.datePicker.value = dateStr;
    }
    
    // Set default time
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

    if (!dateValue) {
      return;
    }

    let date;
    
    if (timezone === 'utc') {
      // Parse as UTC
      date = new Date(`${dateValue}T${timeValue}Z`);
    } else {
      // Parse as local time
      date = new Date(`${dateValue}T${timeValue}`);
    }

    if (isNaN(date.getTime())) {
      return;
    }

    const milliseconds = date.getTime();
    const seconds = Math.floor(milliseconds / 1000);

    // Store for code snippets
    currentTimestampSeconds = seconds;

    // Update display
    elements.outputSeconds.textContent = seconds.toString();
    elements.outputMilliseconds.textContent = milliseconds.toString();

    // Show result
    elements.dateResult.classList.remove('hidden');

    // Update code snippet
    updateCodeSnippet();

    // Track with Google Analytics
    if (typeof gtag === 'function') {
      gtag('event', 'convert', {
        'event_category': 'Epoch Converter',
        'event_label': 'Date to Timestamp',
        'value': 1
      });
    }
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

  // Event listeners for date conversion
  if (elements.convertDateBtn) {
    elements.convertDateBtn.addEventListener('click', convertDateToTimestamp);
  }

  if (elements.nowBtn) {
    elements.nowBtn.addEventListener('click', setCurrentTime);
  }

  // Auto-convert when date/time changes
  [elements.datePicker, elements.timePicker, elements.timezoneSelect].forEach(el => {
    if (el) {
      el.addEventListener('change', convertDateToTimestamp);
    }
  });

  // ========================================
  // Code Snippets
  // ========================================

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

      // Track with Google Analytics
      if (typeof gtag === 'function') {
        gtag('event', 'copy', {
          'event_category': 'Epoch Converter',
          'event_label': 'Copy Snippet: ' + currentSnippetLang
        });
      }
    });
  }

  // ========================================
  // Example Buttons
  // ========================================

  elements.exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const timestamp = btn.dataset.timestamp;
      if (elements.timestampInput) {
        elements.timestampInput.value = timestamp;
        convertTimestampToDate();

        // Track with Google Analytics
        if (typeof gtag === 'function') {
          gtag('event', 'example_click', {
            'event_category': 'Epoch Converter',
            'event_label': 'Example: ' + timestamp
          });
        }
      }
    });
  });

  // ========================================
  // Copy Functionality
  // ========================================

  function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
      // Visual feedback
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

  // Copy buttons for current timestamp
  document.querySelectorAll('.btn-copy-mini[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.copy;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        copyToClipboard(targetElement.textContent, btn);

        // Track with Google Analytics
        if (typeof gtag === 'function') {
          gtag('event', 'copy', {
            'event_category': 'Epoch Converter',
            'event_label': 'Copy: ' + targetId
          });
        }
      }
    });
  });

  // Copy buttons for result cards
  document.querySelectorAll('.btn-copy-card[data-copy], .btn-copy-output[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.copy;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        copyToClipboard(targetElement.textContent, btn);

        // Track with Google Analytics
        if (typeof gtag === 'function') {
          gtag('event', 'copy', {
            'event_category': 'Epoch Converter',
            'event_label': 'Copy Result'
          });
        }
      }
    });
  });

  // ========================================
  // URL Parameter Support
  // ========================================

  function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const timestamp = urlParams.get('ts') || urlParams.get('timestamp');
    
    if (timestamp && elements.timestampInput) {
      elements.timestampInput.value = timestamp;
      convertTimestampToDate();
    }
  }

  // ========================================
  // Initialization
  // ========================================

  function init() {
    initDatePickers();
    handleUrlParameters();
    updateCodeSnippet();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
