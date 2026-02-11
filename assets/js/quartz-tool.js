/**
 * Quartz Scheduler Cron Expression Tool
 * 
 * Parse, validate, and build Quartz Scheduler cron expressions (6-7 fields).
 * Supports Quartz-specific syntax: ?, L, W, #, and optional year field.
 * No external dependencies - pure vanilla JavaScript.
 * 
 * @author Ajit Singh
 */

(function() {
  'use strict';

  // ==========================================================================
  // Analytics Helper
  // ==========================================================================

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        'event_category': 'Quartz Tool',
        'event_label': label,
        'value': value
      });
    }
  }

  // ==========================================================================
  // Constants
  // ==========================================================================

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const WEEKDAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Named month/weekday mappings for Quartz
  const MONTH_NAMES = { JAN:1, FEB:2, MAR:3, APR:4, MAY:5, JUN:6,
                        JUL:7, AUG:8, SEP:9, OCT:10, NOV:11, DEC:12 };
  const WEEKDAY_NAMES = { SUN:1, MON:2, TUE:3, WED:4, THU:5, FRI:6, SAT:7 };

  // ==========================================================================
  // DOM Elements
  // ==========================================================================

  const elements = {
    modeTabs: document.querySelectorAll('.mode-tab'),
    modeContents: document.querySelectorAll('.mode-content'),

    // Parse mode
    quartzInput: document.getElementById('quartz-input'),
    parseBtn: document.getElementById('parse-btn'),
    quartzFields: document.querySelectorAll('.quartz-field'),
    humanReadable: document.getElementById('human-readable'),
    nextRuns: document.getElementById('next-runs'),

    // Build mode
    generatedQuartz: document.getElementById('generated-quartz'),
    generatedDescription: document.getElementById('generated-description'),
    buildNextRuns: document.getElementById('build-next-runs'),
    copyBtn: document.getElementById('copy-btn'),

    // Example rows
    exampleRows: document.querySelectorAll('.example-row')
  };

  // ==========================================================================
  // Quartz Parser
  // ==========================================================================

  /**
   * Normalize named values (JAN→1, MON→2, etc.) in a field
   */
  function normalizeNames(value, map) {
    if (!value) return value;
    return value.replace(/[A-Z]{3}/gi, match => {
      const upper = match.toUpperCase();
      return map[upper] !== undefined ? String(map[upper]) : match;
    });
  }

  /**
   * Parse a Quartz cron expression into its components
   * Quartz format: second minute hour dayOfMonth month dayOfWeek [year]
   * @param {string} expression
   * @returns {object|null}
   */
  function parseQuartz(expression) {
    const parts = expression.trim().split(/\s+/);

    if (parts.length < 6 || parts.length > 7) {
      return null;
    }

    return {
      second: parts[0],
      minute: parts[1],
      hour: parts[2],
      dayOfMonth: parts[3],
      month: normalizeNames(parts[4], MONTH_NAMES),
      dayOfWeek: normalizeNames(parts[5], WEEKDAY_NAMES),
      year: parts[6] || null,
      fieldCount: parts.length
    };
  }

  // ==========================================================================
  // Quartz Validator
  // ==========================================================================

  /**
   * Validate a basic cron field value (numbers, *, /, -, ,)
   */
  function isValidBasicField(value, min, max) {
    if (value === '*') return true;

    // Step values: */5, 0/10
    if (value.includes('/')) {
      const [range, step] = value.split('/');
      if (range !== '*' && !isValidBasicField(range, min, max)) return false;
      const stepNum = parseInt(step, 10);
      return !isNaN(stepNum) && stepNum > 0;
    }

    // Ranges: 1-5
    if (value.includes('-')) {
      const [start, end] = value.split('-').map(v => parseInt(v, 10));
      return !isNaN(start) && !isNaN(end) &&
             start >= min && end <= max && start <= end;
    }

    // Lists: 1,3,5
    if (value.includes(',')) {
      return value.split(',').every(v => isValidBasicField(v.trim(), min, max));
    }

    // Single number
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= min && num <= max;
  }

  /**
   * Validate a Quartz day-of-month field (supports ?, L, W, LW)
   */
  function isValidDayOfMonth(value) {
    if (value === '?' || value === '*' || value === 'L' || value === 'LW') return true;

    // nW: nearest weekday (e.g. 15W)
    if (/^\d{1,2}W$/.test(value)) {
      const day = parseInt(value, 10);
      return day >= 1 && day <= 31;
    }

    // L-n: last day minus n
    if (/^L-\d{1,2}$/.test(value)) {
      const offset = parseInt(value.split('-')[1], 10);
      return offset >= 0 && offset <= 30;
    }

    return isValidBasicField(value, 1, 31);
  }

  /**
   * Validate a Quartz day-of-week field (supports ?, L, #)
   * Quartz uses 1-7 (1=SUN...7=SAT)
   */
  function isValidDayOfWeek(value) {
    if (value === '?' || value === '*') return true;

    // nL: last weekday (e.g. 6L = last Friday)
    if (/^\d{1}L$/.test(value)) {
      const day = parseInt(value, 10);
      return day >= 1 && day <= 7;
    }

    // L alone
    if (value === 'L') return true;

    // n#m: nth weekday (e.g. 6#3 = third Friday)
    if (value.includes('#')) {
      const [day, nth] = value.split('#').map(v => parseInt(v, 10));
      return !isNaN(day) && day >= 1 && day <= 7 &&
             !isNaN(nth) && nth >= 1 && nth <= 5;
    }

    return isValidBasicField(value, 1, 7);
  }

  /**
   * Validate a Quartz year field
   */
  function isValidYear(value) {
    if (!value || value === '*') return true;

    if (value.includes('-')) {
      const [start, end] = value.split('-').map(v => parseInt(v, 10));
      return !isNaN(start) && !isNaN(end) && start >= 1970 && end <= 2099 && start <= end;
    }

    if (value.includes(',')) {
      return value.split(',').every(v => isValidYear(v.trim()));
    }

    if (value.includes('/')) {
      const [range, step] = value.split('/');
      const stepNum = parseInt(step, 10);
      if (isNaN(stepNum) || stepNum <= 0) return false;
      if (range === '*') return true;
      return isValidYear(range);
    }

    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 1970 && num <= 2099;
  }

  /**
   * Validate entire Quartz expression
   */
  function isValidQuartz(parsed) {
    if (!parsed) return false;

    // Exactly one of dayOfMonth or dayOfWeek must be '?'
    const domIsQ = parsed.dayOfMonth === '?';
    const dowIsQ = parsed.dayOfWeek === '?';

    if (!domIsQ && !dowIsQ) {
      // Both specified without ? - Quartz requires one to be ?
      // However, * and * is technically a common usage, allow it with a warning
      // For strict validation: return false;
      // For user-friendliness, we allow * * but flag it
    }
    if (domIsQ && dowIsQ) return false; // Both can't be ?

    return isValidBasicField(parsed.second, 0, 59) &&
           isValidBasicField(parsed.minute, 0, 59) &&
           isValidBasicField(parsed.hour, 0, 23) &&
           isValidDayOfMonth(parsed.dayOfMonth) &&
           isValidBasicField(parsed.month, 1, 12) &&
           isValidDayOfWeek(parsed.dayOfWeek) &&
           isValidYear(parsed.year);
  }

  /**
   * Get validation warnings (not errors, but things to note)
   */
  function getWarnings(parsed) {
    if (!parsed) return [];
    const warnings = [];

    const domIsQ = parsed.dayOfMonth === '?';
    const dowIsQ = parsed.dayOfWeek === '?';

    if (!domIsQ && !dowIsQ && parsed.dayOfMonth !== '?' && parsed.dayOfWeek !== '?') {
      if (parsed.dayOfMonth !== '*' || parsed.dayOfWeek !== '*') {
        warnings.push('Quartz recommends using ? in either day-of-month or day-of-week when the other is specified');
      }
    }

    return warnings;
  }

  // ==========================================================================
  // Human-Readable Description
  // ==========================================================================

  /**
   * Convert Quartz day-of-week number (1-7, 1=Sun) to name
   */
  function quartzDowToName(n) {
    const idx = parseInt(n, 10) - 1; // 1-based to 0-based
    return WEEKDAYS[idx] || n;
  }

  function quartzDowToFullName(n) {
    const idx = parseInt(n, 10) - 1;
    return WEEKDAY_FULL[idx] || n;
  }

  /**
   * Convert to human-readable text
   */
  function toHumanReadable(parsed) {
    if (!parsed) return 'Invalid expression';

    const parts = [];

    // Time
    parts.push(describeTime(parsed.second, parsed.minute, parsed.hour));

    // Day of month
    if (parsed.dayOfMonth !== '*' && parsed.dayOfMonth !== '?') {
      parts.push(describeDayOfMonth(parsed.dayOfMonth));
    }

    // Month
    if (parsed.month !== '*') {
      parts.push(describeMonth(parsed.month));
    }

    // Day of week
    if (parsed.dayOfWeek !== '*' && parsed.dayOfWeek !== '?') {
      parts.push(describeDayOfWeek(parsed.dayOfWeek));
    }

    // Year
    if (parsed.year && parsed.year !== '*') {
      parts.push(describeYear(parsed.year));
    }

    return parts.join(', ');
  }

  function describeTime(second, minute, hour) {
    const secDesc = describeSecond(second);
    const hasSpecificSec = second !== '0' && second !== '*';

    // Every second
    if (second === '*' && minute === '*' && hour === '*') {
      return 'Every second';
    }

    // Every N seconds
    if (second.startsWith('*/') && minute === '*' && hour === '*') {
      return `Every ${second.split('/')[1]} seconds`;
    }

    // Every minute (at second 0)
    if (second === '0' && minute === '*' && hour === '*') {
      return 'Every minute';
    }

    // Every N minutes
    if (second === '0' && minute.startsWith('*/') && hour === '*') {
      return `Every ${minute.split('/')[1]} minutes`;
    }

    // Every hour
    if (second === '0' && minute !== '*' && hour === '*') {
      if (minute === '0') return 'Every hour';
      return `Every hour at minute ${minute}`;
    }

    // Every N hours
    if (second === '0' && minute !== '*' && hour.startsWith('*/')) {
      return `Every ${hour.split('/')[1]} hours at minute ${minute}`;
    }

    // Specific time
    if (second !== '*' && minute !== '*' && hour !== '*') {
      const hourVals = parseFieldValues(hour);
      const minVals = parseFieldValues(minute);
      const secVal = second === '0' ? '' : `:${String(parseInt(second)).padStart(2, '0')}`;

      if (hourVals.length === 1 && minVals.length === 1) {
        return `At ${formatTime(hourVals[0], minVals[0])}${secVal ? ' and ' + parseInt(second) + 's' : ''}`;
      }

      if (minVals.length === 1) {
        const times = hourVals.map(h => formatTime(h, minVals[0]));
        return `At ${times.join(', ')}${secVal ? ' and ' + parseInt(second) + 's' : ''}`;
      }
    }

    // Fallback
    let desc = '';
    if (hour !== '*') {
      const hVals = parseFieldValues(hour);
      if (hVals.length === 1) {
        desc = `At hour ${hVals[0]}`;
      } else {
        desc = `At hours ${hour}`;
      }
    }
    if (minute !== '*') desc += `, minute ${minute}`;
    if (second !== '0' && second !== '*') desc += `, second ${second}`;
    return desc || `At ${hour}:${minute}:${second}`;
  }

  function describeSecond(second) {
    if (second === '0') return '';
    if (second === '*') return 'every second';
    if (second.startsWith('*/')) return `every ${second.split('/')[1]} seconds`;
    return `at second ${second}`;
  }

  function describeDayOfMonth(day) {
    if (day === 'L') return 'on the last day of the month';
    if (day === 'LW') return 'on the last weekday of the month';
    if (/^L-\d+$/.test(day)) {
      const offset = day.split('-')[1];
      return `${offset} day(s) before the end of the month`;
    }
    if (/^\d+W$/.test(day)) {
      const d = parseInt(day, 10);
      return `on the nearest weekday to the ${ordinal(d)}`;
    }

    const values = parseFieldValues(day);
    if (values.length === 1) return `on day ${values[0]}`;
    return `on days ${values.join(', ')}`;
  }

  function describeMonth(month) {
    const values = parseFieldValues(month);
    const names = values.map(m => MONTHS[m - 1]).filter(Boolean);

    if (names.length === 1) return `in ${names[0]}`;
    if (names.length > 1) return `in ${names.join(', ')}`;
    return `in month ${month}`;
  }

  function describeDayOfWeek(weekday) {
    if (weekday === 'L') return 'on Saturday (last day of the week)';

    // nL: last nth weekday
    if (/^\dL$/.test(weekday)) {
      const day = parseInt(weekday, 10);
      return `on the last ${quartzDowToFullName(day)} of the month`;
    }

    // n#m: nth occurrence
    if (weekday.includes('#')) {
      const [day, nth] = weekday.split('#');
      const ordinalNth = ordinal(parseInt(nth, 10));
      return `on the ${ordinalNth} ${quartzDowToFullName(day)} of the month`;
    }

    // Range
    if (weekday.includes('-')) {
      const [start, end] = weekday.split('-');
      return `${quartzDowToName(start)} through ${quartzDowToName(end)}`;
    }

    // List
    if (weekday.includes(',')) {
      const days = weekday.split(',').map(d => quartzDowToName(d.trim()));
      return `on ${days.join(', ')}`;
    }

    // Single value
    const dayNum = parseInt(weekday, 10);
    if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 7) {
      return `on ${quartzDowToFullName(dayNum)}`;
    }

    return `on day ${weekday}`;
  }

  function describeYear(year) {
    if (year.includes('-')) {
      const [start, end] = year.split('-');
      return `from ${start} to ${end}`;
    }
    if (year.includes(',')) {
      return `in years ${year}`;
    }
    return `in ${year}`;
  }

  function ordinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function parseFieldValues(value) {
    if (value === '*' || value === '?') return [];

    const values = [];
    value.split(',').forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) values.push(i);
        }
      } else if (part.includes('/')) {
        values.push(parseInt(part.split('/')[1], 10));
      } else {
        const n = parseInt(part, 10);
        if (!isNaN(n)) values.push(n);
      }
    });
    return values;
  }

  function formatTime(hour, minute) {
    const h = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    const m = String(minute).padStart(2, '0');
    return `${h}:${m} ${ampm}`;
  }

  // ==========================================================================
  // Next Run Calculator
  // ==========================================================================

  function getNextRuns(parsed, count) {
    count = count || 3;
    if (!parsed) return [];

    const runs = [];
    const now = new Date();
    let current = new Date(now);

    current.setMilliseconds(0);
    current.setSeconds(current.getSeconds() + 1);

    const maxIterations = 31536000; // ~1 year in seconds
    let iterations = 0;
    const step = getSmartStep(parsed);

    while (runs.length < count && iterations < maxIterations) {
      if (matchesQuartz(current, parsed)) {
        runs.push(new Date(current));
      }
      current.setSeconds(current.getSeconds() + step);
      iterations += step;
    }

    return runs;
  }

  /**
   * Smart step to avoid iterating every second when not needed
   */
  function getSmartStep(parsed) {
    // If second is fixed (e.g. "0"), we can step by minutes
    if (parsed.second !== '*' && !parsed.second.includes('/') && !parsed.second.includes(',') && !parsed.second.includes('-')) {
      return 60;
    }
    if (parsed.second.startsWith('*/')) {
      return parseInt(parsed.second.split('/')[1], 10) || 1;
    }
    return 1;
  }

  function matchesQuartz(date, parsed) {
    if (!matchesField(date.getSeconds(), parsed.second, 0, 59)) return false;
    if (!matchesField(date.getMinutes(), parsed.minute, 0, 59)) return false;
    if (!matchesField(date.getHours(), parsed.hour, 0, 23)) return false;
    if (!matchesMonth(date.getMonth() + 1, parsed.month)) return false;
    if (!matchesDayOfMonth(date, parsed.dayOfMonth)) return false;
    if (!matchesDayOfWeek(date, parsed.dayOfWeek)) return false;
    if (parsed.year && !matchesYear(date.getFullYear(), parsed.year)) return false;
    return true;
  }

  function matchesField(value, field, min, max) {
    if (field === '*' || field === '?') return true;

    if (field.includes('/')) {
      const [range, step] = field.split('/');
      const stepNum = parseInt(step, 10);
      if (range === '*') return value % stepNum === 0;
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(Number);
        return value >= start && value <= end && (value - start) % stepNum === 0;
      }
      const start = parseInt(range, 10);
      return value >= start && (value - start) % stepNum === 0;
    }

    if (field.includes('-')) {
      const [start, end] = field.split('-').map(Number);
      return value >= start && value <= end;
    }

    if (field.includes(',')) {
      return field.split(',').some(v => matchesField(value, v.trim(), min, max));
    }

    return value === parseInt(field, 10);
  }

  function matchesMonth(month, field) {
    return matchesField(month, field, 1, 12);
  }

  function matchesDayOfMonth(date, field) {
    if (field === '*' || field === '?') return true;

    const day = date.getDate();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    if (field === 'L') return day === lastDay;
    if (field === 'LW') {
      // Last weekday of month
      let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      while (d.getDay() === 0 || d.getDay() === 6) {
        d.setDate(d.getDate() - 1);
      }
      return day === d.getDate();
    }
    if (/^L-\d+$/.test(field)) {
      const offset = parseInt(field.split('-')[1], 10);
      return day === lastDay - offset;
    }
    if (/^\d+W$/.test(field)) {
      const target = parseInt(field, 10);
      // Find nearest weekday to target
      let d = new Date(date.getFullYear(), date.getMonth(), target);
      if (d.getDay() === 0) d.setDate(d.getDate() + 1); // Sun → Mon
      if (d.getDay() === 6) d.setDate(d.getDate() - 1); // Sat → Fri
      // Stay within same month
      if (d.getMonth() !== date.getMonth()) {
        d = new Date(date.getFullYear(), date.getMonth(), target);
        if (d.getDay() === 6) d.setDate(d.getDate() + 2);
        if (d.getDay() === 0) d.setDate(d.getDate() - 2);
      }
      return day === d.getDate();
    }

    return matchesField(day, field, 1, 31);
  }

  function matchesDayOfWeek(date, field) {
    if (field === '*' || field === '?') return true;

    // Quartz: 1=Sun...7=Sat. JS: 0=Sun...6=Sat
    const jsDay = date.getDay(); // 0-6
    const quartzDay = jsDay + 1;  // 1-7

    if (field === 'L') return quartzDay === 7; // Saturday

    // nL: last occurrence of weekday n in this month
    if (/^\dL$/.test(field)) {
      const targetDay = parseInt(field, 10);
      if (quartzDay !== targetDay) return false;
      // Check if it's the last occurrence
      const nextWeek = new Date(date);
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.getMonth() !== date.getMonth();
    }

    // n#m: mth occurrence of weekday n
    if (field.includes('#')) {
      const [dayStr, nthStr] = field.split('#');
      const targetDay = parseInt(dayStr, 10);
      const nth = parseInt(nthStr, 10);
      if (quartzDay !== targetDay) return false;
      // Count occurrence
      const dayOfMonth = date.getDate();
      const occurrence = Math.ceil(dayOfMonth / 7);
      return occurrence === nth;
    }

    return matchesField(quartzDay, field, 1, 7);
  }

  function matchesYear(year, field) {
    if (!field || field === '*') return true;
    return matchesField(year, field, 1970, 2099);
  }

  function formatRunDate(date) {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  }

  // ==========================================================================
  // UI Updates
  // ==========================================================================

  function updateBreakdown(parsed) {
    const fields = ['second', 'minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'];

    fields.forEach(field => {
      const el = document.querySelector(`.quartz-field[data-field="${field}"]`);
      if (!el) return;
      const valueSpan = el.querySelector('.field-value');
      if (parsed && parsed[field] !== undefined) {
        valueSpan.textContent = parsed[field];
        el.classList.add('highlight');
      } else {
        valueSpan.textContent = '*';
        el.classList.remove('highlight');
      }
    });

    // Year field (optional)
    const yearEl = document.querySelector('.quartz-field[data-field="year"]');
    if (yearEl) {
      const yearVal = yearEl.querySelector('.field-value');
      if (parsed && parsed.year) {
        yearVal.textContent = parsed.year;
        yearEl.classList.add('highlight');
        yearEl.style.display = '';
      } else {
        yearVal.textContent = '*';
        yearEl.classList.remove('highlight');
      }
    }
  }

  function updateHumanReadable(parsed, isValid) {
    const warnings = getWarnings(parsed);

    if (!isValid) {
      // Check if it's a standard 5-field cron
      const parts = (elements.quartzInput.value || '').trim().split(/\s+/);
      if (parts.length === 5) {
        elements.humanReadable.innerHTML = 'This looks like a standard 5-field cron expression. ' +
          '<a href="/tools/cron-expression/?expr=' + encodeURIComponent(elements.quartzInput.value.trim()) +
          '" class="cross-tool-link">Try the Cron Expression Tool instead →</a>';
        elements.humanReadable.classList.add('error');
      } else {
        elements.humanReadable.textContent = 'Invalid Quartz cron expression';
        elements.humanReadable.classList.add('error');
      }
    } else {
      let text = toHumanReadable(parsed);
      if (warnings.length > 0) {
        text += ' ⚠️ ' + warnings.join('; ');
      }
      elements.humanReadable.textContent = text;
      elements.humanReadable.classList.remove('error');
    }
  }

  function updateNextRuns(parsed, isValid) {
    elements.nextRuns.innerHTML = '';

    if (!isValid) {
      const li = document.createElement('li');
      li.className = 'placeholder';
      li.textContent = 'Fix the expression to see upcoming runs';
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

  function parseAndUpdate() {
    const expression = elements.quartzInput.value.trim();

    if (!expression) {
      updateBreakdown(null);
      elements.humanReadable.textContent = 'Enter a Quartz cron expression above to see its description';
      elements.humanReadable.classList.remove('error');
      elements.nextRuns.innerHTML = '<li class="placeholder">Parse an expression to see upcoming runs</li>';
      return;
    }

    const parsed = parseQuartz(expression);
    const isValid = isValidQuartz(parsed);

    updateBreakdown(parsed);
    updateHumanReadable(parsed, isValid);
    updateNextRuns(parsed, isValid);
  }

  // ==========================================================================
  // Builder Mode
  // ==========================================================================

  function initBuilder() {
    const selects = document.querySelectorAll('.builder-col select');
    selects.forEach(select => {
      select.addEventListener('change', updateGeneratedQuartz);
    });
  }

  function updateGeneratedQuartz() {
    const second = document.getElementById('second-select')?.value || '0';
    const minute = document.getElementById('q-minute-select')?.value || '0';
    const hour = document.getElementById('q-hour-select')?.value || '*';
    const dayOfMonth = document.getElementById('dom-select')?.value || '?';
    const month = document.getElementById('q-month-select')?.value || '*';
    const dayOfWeek = document.getElementById('dow-select')?.value || '*';

    // Auto-adjust: if dayOfMonth != ?, set dayOfWeek to ? and vice versa
    let dom = dayOfMonth;
    let dow = dayOfWeek;
    if (dom !== '?' && dom !== '*' && dow !== '?' && dow !== '*') {
      dow = '?';
    } else if (dom === '*' && dow === '*') {
      dom = '?'; // default: set dom to ?
    }

    const expression = `${second} ${minute} ${hour} ${dom} ${month} ${dow}`;

    elements.generatedQuartz.textContent = expression;

    const parsed = parseQuartz(expression);
    const isValid = isValidQuartz(parsed);

    elements.generatedDescription.textContent = isValid ? toHumanReadable(parsed) : 'Adjust fields to create a valid expression';

    updateBuildNextRuns(parsed, isValid);
  }

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

  function handleTabClick(e) {
    const mode = e.currentTarget.dataset.mode;
    trackEvent('mode_switch', mode);

    elements.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });
    elements.modeContents.forEach(content => {
      content.classList.toggle('active', content.id === `${mode}-mode`);
    });
  }

  function handleExampleClick(e) {
    const cron = e.currentTarget.dataset.cron;
    trackEvent('example_click', cron);

    // Switch to parse mode
    elements.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === 'parse');
    });
    elements.modeContents.forEach(content => {
      content.classList.toggle('active', content.id === 'parse-mode');
    });

    elements.quartzInput.value = cron;
    parseAndUpdate();
    updateURL(cron);

    document.querySelector('.quartz-tool').scrollIntoView({ behavior: 'smooth' });
  }

  function handleCopyClick() {
    const text = elements.generatedQuartz.textContent;
    trackEvent('copy_expression', text);

    navigator.clipboard.writeText(text).then(() => {
      elements.copyBtn.classList.add('copied');
      elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

      setTimeout(() => {
        elements.copyBtn.classList.remove('copied');
        elements.copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    });
  }

  function handleShareClick() {
    const expression = elements.generatedQuartz.textContent;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('expr', expression);
    const shareUrl = url.toString();

    trackEvent('share_expression', expression);

    navigator.clipboard.writeText(shareUrl).then(() => {
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
  // URL State Management
  // ==========================================================================

  function getExpressionFromURL() {
    const params = new URLSearchParams(window.location.search);
    const expr = params.get('expr');
    if (expr) {
      return decodeURIComponent(expr).replace(/\+/g, ' ');
    }
    return null;
  }

  function updateURL(expression) {
    if (!expression || expression.trim() === '') {
      const url = new URL(window.location);
      url.searchParams.delete('expr');
      window.history.replaceState({}, '', url);
      return;
    }
    const url = new URL(window.location);
    url.searchParams.set('expr', expression.trim());
    window.history.replaceState({}, '', url);
  }

  function parseAndUpdateWithURL() {
    const expression = elements.quartzInput.value.trim();
    parseAndUpdate();
    updateURL(expression);
  }

  // ==========================================================================
  // Initialize
  // ==========================================================================

  function init() {
    const urlExpression = getExpressionFromURL();

    // Tab switching
    elements.modeTabs.forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });

    // Parse mode
    elements.parseBtn.addEventListener('click', () => {
      const expression = elements.quartzInput.value.trim();
      if (expression) trackEvent('parse_expression', expression);
      parseAndUpdateWithURL();
    });
    elements.quartzInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const expression = elements.quartzInput.value.trim();
        if (expression) trackEvent('parse_expression', expression);
        parseAndUpdateWithURL();
      }
    });
    elements.quartzInput.addEventListener('input', parseAndUpdateWithURL);

    // Example rows
    elements.exampleRows.forEach(row => {
      row.addEventListener('click', handleExampleClick);
    });

    // Copy button
    if (elements.copyBtn) {
      elements.copyBtn.addEventListener('click', handleCopyClick);
    }

    // Share button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', handleShareClick);
    }

    // Initialize builder
    initBuilder();
    updateGeneratedQuartz();

    // Set expression from URL or default
    if (urlExpression) {
      elements.quartzInput.value = urlExpression;
      trackEvent('url_load', urlExpression);
    } else {
      elements.quartzInput.value = '0 0 12 * * ?';
    }
    parseAndUpdate();

    trackEvent('tool_load', 'quartz_scheduler_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
