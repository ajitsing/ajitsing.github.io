/**
 * Cron Expression Tool
 * 
 * A simple, clean cron expression parser and builder.
 * No external dependencies - pure vanilla JavaScript.
 * 
 * @author Ajit Singh
 */

(function() {
  'use strict';

  // ==========================================================================
  // Analytics Helper
  // ==========================================================================

  /**
   * Track an event with Google Analytics
   * @param {string} action - The action (e.g., 'click', 'parse', 'copy')
   * @param {string} label - Additional label for the event
   * @param {number} value - Optional numeric value
   */
  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        'event_category': 'Cron Tool',
        'event_label': label,
        'value': value
      });
    }
  }

  // ==========================================================================
  // Constants
  // ==========================================================================

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // ==========================================================================
  // DOM Elements
  // ==========================================================================

  const elements = {
    // Tabs
    modeTabs: document.querySelectorAll('.mode-tab'),
    modeContents: document.querySelectorAll('.mode-content'),
    
    // Parse mode
    cronInput: document.getElementById('cron-input'),
    parseBtn: document.getElementById('parse-btn'),
    cronFields: document.querySelectorAll('.cron-field'),
    humanReadable: document.getElementById('human-readable'),
    nextRuns: document.getElementById('next-runs'),
    
    // Build mode
    generatedCron: document.getElementById('generated-cron'),
    generatedDescription: document.getElementById('generated-description'),
    buildNextRuns: document.getElementById('build-next-runs'),
    copyBtn: document.getElementById('copy-btn'),
    
    // Examples (support both button and table row formats)
    exampleBtns: document.querySelectorAll('.example-btn'),
    exampleRows: document.querySelectorAll('.example-row')
  };

  // ==========================================================================
  // Cron Parser
  // ==========================================================================

  /**
   * Parse a cron expression into its components
   * @param {string} expression - The cron expression (5 fields)
   * @returns {object|null} Parsed fields or null if invalid
   */
  function parseCron(expression) {
    const parts = expression.trim().split(/\s+/);
    
    if (parts.length !== 5) {
      return null;
    }

    return {
      minute: parts[0],
      hour: parts[1],
      day: parts[2],
      month: parts[3],
      weekday: parts[4]
    };
  }

  /**
   * Validate a cron field value
   * @param {string} value - The field value
   * @param {number} min - Minimum allowed value
   * @param {number} max - Maximum allowed value
   * @returns {boolean} Whether the field is valid
   */
  function isValidField(value, min, max) {
    if (value === '*') return true;
    
    // Handle step values: */5, 0/10
    if (value.includes('/')) {
      const [range, step] = value.split('/');
      if (range !== '*' && !isValidField(range, min, max)) return false;
      const stepNum = parseInt(step, 10);
      return !isNaN(stepNum) && stepNum > 0;
    }
    
    // Handle ranges: 1-5, 0-23
    if (value.includes('-')) {
      const [start, end] = value.split('-').map(v => parseInt(v, 10));
      return !isNaN(start) && !isNaN(end) && 
             start >= min && end <= max && start <= end;
    }
    
    // Handle lists: 1,3,5
    if (value.includes(',')) {
      return value.split(',').every(v => isValidField(v, min, max));
    }
    
    // Single number
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= min && num <= max;
  }

  /**
   * Quartz Scheduler special characters (not valid in standard cron)
   */
  const QUARTZ_CHARS = /[?LW#]/i;

  /**
   * Check if a single field value contains Quartz-specific characters
   * @param {string} value - The field value
   * @returns {boolean} Whether the field contains Quartz characters
   */
  function hasQuartzChars(value) {
    return QUARTZ_CHARS.test(value);
  }

  /**
   * Detect Quartz-specific characters in a parsed expression.
   * Returns an object with field names that contain Quartz chars, or null if none found.
   * @param {object} parsed - Parsed cron fields
   * @returns {object|null} Map of field name to true for fields with Quartz chars
   */
  function detectQuartzFields(parsed) {
    if (!parsed) return null;

    const quartzFields = {};
    let found = false;

    ['minute', 'hour', 'day', 'month', 'weekday'].forEach(field => {
      if (hasQuartzChars(parsed[field])) {
        quartzFields[field] = true;
        found = true;
      }
    });

    return found ? quartzFields : null;
  }

  /**
   * Validate an entire cron expression
   * @param {object} parsed - Parsed cron fields
   * @returns {boolean} Whether the expression is valid
   */
  function isValidCron(parsed) {
    if (!parsed) return false;
    
    return isValidField(parsed.minute, 0, 59) &&
           isValidField(parsed.hour, 0, 23) &&
           isValidField(parsed.day, 1, 31) &&
           isValidField(parsed.month, 1, 12) &&
           isValidField(parsed.weekday, 0, 6);
  }

  // ==========================================================================
  // Human-Readable Description
  // ==========================================================================

  /**
   * Convert a cron expression to human-readable text
   * @param {object} parsed - Parsed cron fields
   * @returns {string} Human-readable description
   */
  function toHumanReadable(parsed) {
    if (!parsed) return 'Invalid expression';

    const parts = [];

    // Time description
    const timeDesc = describeTime(parsed.minute, parsed.hour);
    parts.push(timeDesc);

    // Day of month
    if (parsed.day !== '*') {
      parts.push(describeDayOfMonth(parsed.day));
    }

    // Month
    if (parsed.month !== '*') {
      parts.push(describeMonth(parsed.month));
    }

    // Day of week
    if (parsed.weekday !== '*') {
      parts.push(describeDayOfWeek(parsed.weekday));
    }

    return parts.join(', ');
  }

  /**
   * Describe the time portion (minute and hour)
   */
  function describeTime(minute, hour) {
    // Every minute
    if (minute === '*' && hour === '*') {
      return 'Every minute';
    }

    // Every X minutes
    if (minute.startsWith('*/') && hour === '*') {
      const interval = minute.split('/')[1];
      return `Every ${interval} minutes`;
    }

    // Every minute during specific hour(s)
    if (minute === '*' && hour !== '*') {
      const hourVal = parseFieldValues(hour);
      if (hourVal.length === 1) {
        const h = hourVal[0] % 12 || 12;
        const ampm = hourVal[0] < 12 ? 'AM' : 'PM';
        return `Every minute from ${h}:00-${h}:59 ${ampm}`;
      }
      return `Every minute during hours ${hour}`;
    }

    // Every hour at specific minute
    if (minute !== '*' && hour === '*') {
      return `Every hour at minute ${minute}`;
    }

    // Every X hours
    if (minute !== '*' && hour.startsWith('*/')) {
      const interval = hour.split('/')[1];
      return `Every ${interval} hours at minute ${minute}`;
    }

    // Specific time
    if (minute !== '*' && hour !== '*') {
      const hourVal = parseFieldValues(hour);
      const minVal = parseFieldValues(minute);
      
      if (hourVal.length === 1 && minVal.length === 1) {
        return `At ${formatTime(hourVal[0], minVal[0])}`;
      }
      
      // Multiple hours
      if (minVal.length === 1) {
        const times = hourVal.map(h => formatTime(h, minVal[0]));
        return `At ${times.join(', ')}`;
      }
    }

    return `At ${hour}:${String(minute).padStart(2, '0')}`;
  }

  /**
   * Describe day of month
   */
  function describeDayOfMonth(day) {
    const values = parseFieldValues(day);
    
    if (values.length === 1) {
      return `on day ${values[0]}`;
    }
    
    return `on days ${values.join(', ')}`;
  }

  /**
   * Describe month
   */
  function describeMonth(month) {
    const values = parseFieldValues(month);
    const names = values.map(m => MONTHS[m - 1]);
    
    if (names.length === 1) {
      return `in ${names[0]}`;
    }
    
    return `in ${names.join(', ')}`;
  }

  /**
   * Describe day of week
   */
  function describeDayOfWeek(weekday) {
    // Handle comma-separated values (which may include ranges)
    const parts = weekday.split(',');
    const daysList = [];
    
    parts.forEach(part => {
      part = part.trim();
      if (part.includes('-')) {
        // Range like 1-5 or 4-5
        const [start, end] = part.split('-').map(Number);
        if (start === 1 && end === 5) {
          daysList.push('Mon-Fri');
        } else if (start === 0 && end === 6) {
          daysList.push('every day');
        } else {
          daysList.push(`${WEEKDAYS[start]}-${WEEKDAYS[end]}`);
        }
      } else {
        // Single value
        const dayNum = parseInt(part, 10);
        if (!isNaN(dayNum) && WEEKDAYS[dayNum]) {
          daysList.push(WEEKDAYS[dayNum]);
        }
      }
    });
    
    if (daysList.length === 0) {
      return `on weekday ${weekday}`;
    }
    
    if (daysList.length === 1) {
      // Special case for common patterns
      if (daysList[0] === 'Mon-Fri') {
        return 'Monday through Friday';
      }
      return `on ${daysList[0]}`;
    }
    
    // Join with commas for clarity
    return `on ${daysList.join(', ')}`;
  }

  /**
   * Parse field values into an array of numbers
   */
  function parseFieldValues(value) {
    if (value === '*') return [];
    
    const values = [];
    
    value.split(',').forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          values.push(i);
        }
      } else if (part.includes('/')) {
        // Step values - just return the base for display
        const [range, step] = part.split('/');
        values.push(parseInt(step, 10));
      } else {
        values.push(parseInt(part, 10));
      }
    });
    
    return values;
  }

  /**
   * Format time as 12-hour format
   */
  function formatTime(hour, minute) {
    const h = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    const m = String(minute).padStart(2, '0');
    return `${h}:${m} ${ampm}`;
  }

  // ==========================================================================
  // Next Run Calculator
  // ==========================================================================

  /**
   * Calculate the next N run times for a cron expression
   * @param {object} parsed - Parsed cron fields
   * @param {number} count - Number of runs to calculate
   * @returns {Date[]} Array of next run dates
   */
  function getNextRuns(parsed, count = 3) {
    if (!parsed) return [];

    const runs = [];
    const now = new Date();
    let current = new Date(now);
    
    // Start from the next minute
    current.setSeconds(0);
    current.setMilliseconds(0);
    current.setMinutes(current.getMinutes() + 1);

    const maxIterations = 525600; // One year in minutes
    let iterations = 0;

    while (runs.length < count && iterations < maxIterations) {
      if (matchesCron(current, parsed)) {
        runs.push(new Date(current));
      }
      current.setMinutes(current.getMinutes() + 1);
      iterations++;
    }

    return runs;
  }

  /**
   * Check if a date matches the cron expression
   */
  function matchesCron(date, parsed) {
    return matchesField(date.getMinutes(), parsed.minute, 0, 59) &&
           matchesField(date.getHours(), parsed.hour, 0, 23) &&
           matchesField(date.getDate(), parsed.day, 1, 31) &&
           matchesField(date.getMonth() + 1, parsed.month, 1, 12) &&
           matchesField(date.getDay(), parsed.weekday, 0, 6);
  }

  /**
   * Check if a value matches a cron field
   */
  function matchesField(value, field, min, max) {
    if (field === '*') return true;

    // Step values
    if (field.includes('/')) {
      const [range, step] = field.split('/');
      const stepNum = parseInt(step, 10);
      
      if (range === '*') {
        return value % stepNum === 0;
      }
      
      // Range with step
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(Number);
        return value >= start && value <= end && (value - start) % stepNum === 0;
      }
      
      const start = parseInt(range, 10);
      return value >= start && (value - start) % stepNum === 0;
    }

    // Range
    if (field.includes('-')) {
      const [start, end] = field.split('-').map(Number);
      return value >= start && value <= end;
    }

    // List
    if (field.includes(',')) {
      return field.split(',').some(v => matchesField(value, v, min, max));
    }

    // Single value
    return value === parseInt(field, 10);
  }

  /**
   * Format a date for display
   */
  function formatRunDate(date) {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  }

  // ==========================================================================
  // UI Updates
  // ==========================================================================

  /**
   * Update the visual breakdown of cron fields.
   * If quartzFields is provided, those fields get a special Quartz highlight.
   */
  function updateBreakdown(parsed, quartzFields) {
    const fields = ['minute', 'hour', 'day', 'month', 'weekday'];
    
    fields.forEach(field => {
      const element = document.querySelector(`.cron-field[data-field="${field}"]`);
      const valueSpan = element.querySelector('.field-value');
      
      // Remove previous state classes
      element.classList.remove('highlight', 'quartz-highlight');

      if (parsed && parsed[field]) {
        valueSpan.textContent = parsed[field];

        if (quartzFields && quartzFields[field]) {
          // Quartz-specific character detected in this field
          element.classList.add('quartz-highlight');
        } else {
          element.classList.add('highlight');
        }
      } else {
        valueSpan.textContent = '*';
      }
    });
  }

  /**
   * Build the Quartz suggestion HTML with a link to the Quartz tool
   * @param {string} inputVal - The raw expression to pass as a query param
   * @param {string} reason - Short reason text (e.g. "6-7 fields" or specific chars)
   * @returns {string} HTML string
   */
  function buildQuartzSuggestion(inputVal, reason) {
    return '<span class="quartz-suggestion">' +
      '<i class="fas fa-info-circle"></i> ' +
      'This looks like a <strong>Quartz Scheduler</strong> expression (' + reason + '). ' +
      '<a href="/tools/quartz-scheduler/?expr=' + encodeURIComponent(inputVal) +
      '" class="quartz-link">Try the Quartz Scheduler Cron Tool instead →</a>' +
      '</span>';
  }

  /**
   * Update the human-readable description
   */
  function updateHumanReadable(parsed, isValid, quartzFields) {
    // Reset state classes
    elements.humanReadable.classList.remove('error', 'quartz-info');

    if (!isValid) {
      const inputVal = elements.cronInput.value.trim();
      const fieldCount = inputVal.split(/\s+/).length;

      if (fieldCount === 6 || fieldCount === 7) {
        // 6 or 7 fields: clearly a Quartz expression
        elements.humanReadable.innerHTML = buildQuartzSuggestion(inputVal, fieldCount + ' fields');
        elements.humanReadable.classList.add('quartz-info');
      } else if (quartzFields) {
        // 5 fields but contains ?, L, W, or #
        const chars = [];
        if (inputVal.includes('?')) chars.push('?');
        if (/L/i.test(inputVal)) chars.push('L');
        if (/W/i.test(inputVal)) chars.push('W');
        if (inputVal.includes('#')) chars.push('#');
        const charList = chars.map(c => '<code>' + c + '</code>').join(', ');
        elements.humanReadable.innerHTML = buildQuartzSuggestion(
          inputVal,
          'uses ' + charList + ' syntax'
        );
        elements.humanReadable.classList.add('quartz-info');
      } else {
        elements.humanReadable.textContent = 'Invalid cron expression';
        elements.humanReadable.classList.add('error');
      }
    } else {
      elements.humanReadable.textContent = toHumanReadable(parsed);
    }
  }

  /**
   * Update the next runs list
   */
  function updateNextRuns(parsed, isValid, quartzFields) {
    elements.nextRuns.innerHTML = '';

    if (!isValid) {
      const li = document.createElement('li');
      li.className = 'placeholder';
      if (quartzFields) {
        li.textContent = 'Use the Quartz Scheduler tool to see next runs';
      } else {
        li.textContent = 'Fix the expression to see upcoming runs';
      }
      elements.nextRuns.appendChild(li);
      return;
    }

    const runs = getNextRuns(parsed, 3);

    if (runs.length === 0) {
      const li = document.createElement('li');
      li.className = 'placeholder';
      li.textContent = 'No runs found in the next year';
      elements.nextRuns.appendChild(li);
      return;
    }

    runs.forEach(run => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-check-circle"></i> ${formatRunDate(run)}`;
      elements.nextRuns.appendChild(li);
    });
  }

  /**
   * Parse the current input and update all displays
   */
  function parseAndUpdate() {
    const expression = elements.cronInput.value.trim();
    
    if (!expression) {
      updateBreakdown(null);
      elements.humanReadable.textContent = 'Enter a cron expression above to see its description';
      elements.humanReadable.classList.remove('error', 'quartz-info');
      elements.nextRuns.innerHTML = '<li class="placeholder">Parse an expression to see upcoming runs</li>';
      return;
    }

    const parts = expression.split(/\s+/);
    const parsed = parseCron(expression);
    const isValid = isValidCron(parsed);
    const quartzFields = detectQuartzFields(parsed);

    // For 6/7 field expressions (Quartz), map fields onto the 5-field breakdown
    // so users see the values highlighted. Quartz format: sec min hour dom month dow [year]
    let displayParsed = parsed;
    let displayQuartzFields = quartzFields;
    if (!parsed && (parts.length === 6 || parts.length === 7)) {
      displayParsed = {
        minute: parts[1],
        hour: parts[2],
        day: parts[3],
        month: parts[4],
        weekday: parts[5] || '*'
      };
      // Highlight only the fields that contain Quartz-specific characters
      displayQuartzFields = {};
      const fieldMap = { minute: 1, hour: 2, day: 3, month: 4, weekday: 5 };
      Object.keys(fieldMap).forEach(field => {
        if (hasQuartzChars(parts[fieldMap[field]])) {
          displayQuartzFields[field] = true;
        }
      });
      // If no specific Quartz chars found, it's still a Quartz expression (6/7 fields)
      // Mark none as quartz-highlight but the suggestion will still show
    }

    updateBreakdown(displayParsed, displayQuartzFields);
    updateHumanReadable(parsed, isValid, quartzFields);
    // Show Quartz-specific message in next runs if Quartz chars detected or 6/7 fields
    const isQuartzLike = quartzFields || (parts.length === 6 || parts.length === 7);
    updateNextRuns(parsed, isValid, isQuartzLike);
  }

  // ==========================================================================
  // Builder Mode
  // ==========================================================================

  /**
   * Initialize the builder mode UI (compact dropdowns)
   */
  function initBuilder() {
    const selects = document.querySelectorAll('.builder-col select');
    selects.forEach(select => {
      select.addEventListener('change', updateGeneratedCron);
    });
  }

  /**
   * Update the generated cron expression from builder dropdowns
   */
  function updateGeneratedCron() {
    const minute = document.getElementById('minute-select')?.value || '*';
    const hour = document.getElementById('hour-select')?.value || '*';
    const day = document.getElementById('day-select')?.value || '*';
    const month = document.getElementById('month-select')?.value || '*';
    const weekday = document.getElementById('weekday-select')?.value || '*';

    const expression = `${minute} ${hour} ${day} ${month} ${weekday}`;
    
    elements.generatedCron.textContent = expression;
    
    const parsed = parseCron(expression);
    const isValid = isValidCron(parsed);
    
    elements.generatedDescription.textContent = toHumanReadable(parsed);
    
    // Update Next 5 Runs for build mode
    updateBuildNextRuns(parsed, isValid);
  }

  /**
   * Update the Next 5 Runs list for Build Mode
   */
  function updateBuildNextRuns(parsed, isValid) {
    if (!elements.buildNextRuns) return;
    
    elements.buildNextRuns.innerHTML = '';

    if (!isValid) {
      const li = document.createElement('li');
      li.className = 'placeholder';
      li.textContent = 'Invalid expression';
      elements.buildNextRuns.appendChild(li);
      return;
    }

    const runs = getNextRuns(parsed, 3);

    if (runs.length === 0) {
      const li = document.createElement('li');
      li.className = 'placeholder';
      li.textContent = 'No runs found in the next year';
      elements.buildNextRuns.appendChild(li);
      return;
    }

    runs.forEach(run => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-check-circle"></i> ${formatRunDate(run)}`;
      elements.buildNextRuns.appendChild(li);
    });
  }

  // ==========================================================================
  // Event Handlers
  // ==========================================================================

  /**
   * Handle tab switching
   */
  function handleTabClick(e) {
    const mode = e.currentTarget.dataset.mode;
    
    // Track mode switch
    trackEvent('mode_switch', mode);
    
    // Update tab states
    elements.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });
    
    // Update content visibility
    elements.modeContents.forEach(content => {
      content.classList.toggle('active', content.id === `${mode}-mode`);
    });
  }

  /**
   * Handle example button clicks
   */
  function handleExampleClick(e) {
    const cron = e.currentTarget.dataset.cron;
    
    // Track example usage
    trackEvent('example_click', cron);
    
    // Switch to parse mode
    elements.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === 'parse');
    });
    elements.modeContents.forEach(content => {
      content.classList.toggle('active', content.id === 'parse-mode');
    });
    
    // Set the expression and parse
    elements.cronInput.value = cron;
    parseAndUpdate();
    
    // Update URL with the example expression
    updateURL(cron);
    
    // Scroll to top of tool
    document.querySelector('.cron-tool').scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Handle copy button click
   */
  function handleCopyClick() {
    const text = elements.generatedCron.textContent;
    
    // Track copy action
    trackEvent('copy_expression', text);
    
    navigator.clipboard.writeText(text).then(() => {
      // Show success state
      elements.copyBtn.classList.add('copied');
      elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      
      setTimeout(() => {
        elements.copyBtn.classList.remove('copied');
        elements.copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    });
  }

  /**
   * Handle share button click - copies shareable URL to clipboard
   */
  function handleShareClick() {
    const expression = elements.generatedCron.textContent;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('expr', expression);
    const shareUrl = url.toString();
    
    // Track share action
    trackEvent('share_expression', expression);
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      // Show success state
      const shareBtn = document.getElementById('share-btn');
      shareBtn.classList.add('copied');
      shareBtn.innerHTML = '<i class="fas fa-check"></i> Link Copied!';
      
      setTimeout(() => {
        shareBtn.classList.remove('copied');
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
      }, 2000);
    });
  }

  // ==========================================================================
  // URL State Management (for shareable links)
  // ==========================================================================

  /**
   * Get cron expression from URL query parameter
   * @returns {string|null} The cron expression or null
   */
  function getExpressionFromURL() {
    const params = new URLSearchParams(window.location.search);
    const expr = params.get('expr');
    if (expr) {
      // URL decode and replace + with space (common URL encoding for spaces)
      return decodeURIComponent(expr).replace(/\+/g, ' ');
    }
    return null;
  }

  /**
   * Update URL with current cron expression (without page reload)
   * @param {string} expression - The cron expression to save in URL
   */
  function updateURL(expression) {
    if (!expression || expression.trim() === '') {
      // Remove the parameter if empty
      const url = new URL(window.location);
      url.searchParams.delete('expr');
      window.history.replaceState({}, '', url);
      return;
    }
    
    const url = new URL(window.location);
    url.searchParams.set('expr', expression.trim());
    window.history.replaceState({}, '', url);
  }

  /**
   * Parse and update with URL state awareness
   */
  function parseAndUpdateWithURL() {
    const expression = elements.cronInput.value.trim();
    parseAndUpdate();
    updateURL(expression);
  }

  // ==========================================================================
  // Initialize
  // ==========================================================================

  function init() {
    // Check for expression in URL first
    const urlExpression = getExpressionFromURL();
    
    // Tab switching
    elements.modeTabs.forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });

    // Parse mode
    elements.parseBtn.addEventListener('click', () => {
      const expression = elements.cronInput.value.trim();
      if (expression) {
        trackEvent('parse_expression', expression);
      }
      parseAndUpdateWithURL();
    });
    elements.cronInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const expression = elements.cronInput.value.trim();
        if (expression) {
          trackEvent('parse_expression', expression);
        }
        parseAndUpdateWithURL();
      }
    });
    
    // Real-time parsing as user types (with URL update)
    elements.cronInput.addEventListener('input', parseAndUpdateWithURL);

    // Example buttons (legacy support)
    elements.exampleBtns.forEach(btn => {
      btn.addEventListener('click', handleExampleClick);
    });

    // Example table rows
    elements.exampleRows.forEach(row => {
      row.addEventListener('click', handleExampleClick);
    });

    // Copy button
    elements.copyBtn.addEventListener('click', handleCopyClick);

    // Share button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', handleShareClick);
    }

    // Initialize builder
    initBuilder();
    
    // Initialize build mode with default values
    updateGeneratedCron();
    
    // Set expression: use URL param if available, otherwise use default
    if (urlExpression) {
      elements.cronInput.value = urlExpression;
      trackEvent('url_load', urlExpression);
    } else {
      elements.cronInput.value = '0 9 * * 1-5';
    }
    parseAndUpdate();
    
    // Track tool load
    trackEvent('tool_load', 'cron_expression_tool');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

