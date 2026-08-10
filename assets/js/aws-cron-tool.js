/**
 * AWS EventBridge Cron Expression Tool
 *
 * Parse, validate, and build AWS EventBridge / EventBridge Scheduler
 * cron expressions (6 fields) and rate expressions.
 * No external dependencies - pure vanilla JavaScript.
 *
 * Format: cron(minutes hours day-of-month month day-of-week year)
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
        'event_category': 'AWS Cron Tool',
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

  const MONTH_NAMES = { JAN:1, FEB:2, MAR:3, APR:4, MAY:5, JUN:6,
                        JUL:7, AUG:8, SEP:9, OCT:10, NOV:11, DEC:12 };
  // AWS: 1=SUN ... 7=SAT
  const WEEKDAY_NAMES = { SUN:1, MON:2, TUE:3, WED:4, THU:5, FRI:6, SAT:7 };

  // ==========================================================================
  // DOM Elements
  // ==========================================================================

  const elements = {
    modeTabs: document.querySelectorAll('.mode-tab'),
    modeContents: document.querySelectorAll('.mode-content'),

    awsInput: document.getElementById('aws-cron-input'),
    parseBtn: document.getElementById('parse-btn'),
    awsFields: document.querySelectorAll('.aws-cron-field'),
    humanReadable: document.getElementById('human-readable'),
    nextRuns: document.getElementById('next-runs'),

    generatedCron: document.getElementById('generated-cron'),
    generatedDescription: document.getElementById('generated-description'),
    buildNextRuns: document.getElementById('build-next-runs'),
    copyBtn: document.getElementById('copy-btn'),

    rateValue: document.getElementById('rate-value'),
    rateUnit: document.getElementById('rate-unit'),
    rateOutput: document.getElementById('rate-output'),
    rateCopyBtn: document.getElementById('rate-copy-btn'),
    rateDescription: document.getElementById('rate-description'),

    exampleRows: document.querySelectorAll('.example-row')
  };

  // ==========================================================================
  // Expression Normalization
  // ==========================================================================

  /**
   * Strip optional cron(...) wrapper and normalize whitespace.
   * Accepts: "cron(0 18 ? * MON-FRI *)" or "0 18 ? * MON-FRI *"
   */
  function unwrapCron(expression) {
    if (!expression) return '';
    let expr = expression.trim();
    const match = expr.match(/^cron\s*\(\s*(.+?)\s*\)$/i);
    if (match) {
      expr = match[1].trim();
    }
    return expr;
  }

  /**
   * Wrap a bare 6-field expression in cron(...)
   */
  function wrapCron(fields) {
    return 'cron(' + fields + ')';
  }

  /**
   * Detect and parse a rate(...) expression.
   * Returns { type:'rate', value, unit } or null.
   */
  function parseRate(expression) {
    if (!expression) return null;
    const match = expression.trim().match(/^rate\s*\(\s*(\d+)\s+(minute|minutes|hour|hours|day|days)\s*\)$/i);
    if (!match) return null;
    const value = parseInt(match[1], 10);
    let unit = match[2].toLowerCase();
    // AWS requires singular when value is 1
    if (value === 1) {
      unit = unit.replace(/s$/, '');
    } else if (!unit.endsWith('s')) {
      unit = unit + 's';
    }
    return { type: 'rate', value: value, unit: unit };
  }

  function normalizeNames(value, map) {
    if (!value) return value;
    return value.replace(/[A-Z]{3}/gi, match => {
      const upper = match.toUpperCase();
      return map[upper] !== undefined ? String(map[upper]) : match;
    });
  }

  // ==========================================================================
  // AWS Cron Parser
  // ==========================================================================

  /**
   * Parse an AWS EventBridge cron expression into components.
   * Format: minutes hours dayOfMonth month dayOfWeek year
   */
  function parseAwsCron(expression) {
    const bare = unwrapCron(expression);
    const parts = bare.split(/\s+/);

    if (parts.length !== 6) {
      return null;
    }

    return {
      type: 'cron',
      minute: parts[0],
      hour: parts[1],
      dayOfMonth: parts[2],
      month: normalizeNames(parts[3], MONTH_NAMES),
      dayOfWeek: normalizeNames(parts[4], WEEKDAY_NAMES),
      year: parts[5],
      raw: bare
    };
  }

  // ==========================================================================
  // Validator
  // ==========================================================================

  function isValidBasicField(value, min, max) {
    if (value === '*') return true;

    if (value.includes('/')) {
      const [range, step] = value.split('/');
      if (range !== '*' && !isValidBasicField(range, min, max)) return false;
      const stepNum = parseInt(step, 10);
      return !isNaN(stepNum) && stepNum > 0;
    }

    if (value.includes('-')) {
      const [start, end] = value.split('-').map(v => parseInt(v, 10));
      return !isNaN(start) && !isNaN(end) &&
             start >= min && end <= max && start <= end;
    }

    if (value.includes(',')) {
      return value.split(',').every(v => isValidBasicField(v.trim(), min, max));
    }

    const num = parseInt(value, 10);
    return !isNaN(num) && num >= min && num <= max;
  }

  function isValidDayOfMonth(value) {
    if (value === '?' || value === '*' || value === 'L' || value === 'LW') return true;

    if (/^\d{1,2}W$/i.test(value)) {
      const day = parseInt(value, 10);
      return day >= 1 && day <= 31;
    }

    if (/^L-\d{1,2}$/i.test(value)) {
      const offset = parseInt(value.split('-')[1], 10);
      return offset >= 0 && offset <= 30;
    }

    return isValidBasicField(value, 1, 31);
  }

  /**
   * Day-of-week: 1-7 (1=SUN), ?, L, nL, n#m
   * # cannot appear in a list
   */
  function isValidDayOfWeek(value) {
    if (value === '?' || value === '*') return true;

    if (/^\dL$/i.test(value)) {
      const day = parseInt(value, 10);
      return day >= 1 && day <= 7;
    }

    if (value.toUpperCase() === 'L') return true;

    if (value.includes('#')) {
      // Cannot be in a list
      if (value.includes(',')) return false;
      const [day, nth] = value.split('#').map(v => parseInt(v, 10));
      return !isNaN(day) && day >= 1 && day <= 7 &&
             !isNaN(nth) && nth >= 1 && nth <= 5;
    }

    return isValidBasicField(value, 1, 7);
  }

  function isValidYear(value) {
    if (!value) return false;
    if (value === '*') return true;

    if (value.includes('-')) {
      const [start, end] = value.split('-').map(v => parseInt(v, 10));
      return !isNaN(start) && !isNaN(end) && start >= 1970 && end <= 2199 && start <= end;
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
    return !isNaN(num) && num >= 1970 && num <= 2199;
  }

  /**
   * AWS requires exactly one of day-of-month or day-of-week to be '?'
   * when the other has a specific value. Both cannot be '?'.
   * If neither is '?', both must be '*' - but AWS docs say you can't use
   * * in both; one must be ?. So we require one to be ?.
   */
  function isValidAwsCron(parsed) {
    if (!parsed || parsed.type !== 'cron') return false;

    const domIsQ = parsed.dayOfMonth === '?';
    const dowIsQ = parsed.dayOfWeek === '?';

    // Both cannot be '?'
    if (domIsQ && dowIsQ) return false;

    // One must be '?' (AWS rule: can't use * in both day fields)
    if (!domIsQ && !dowIsQ) return false;

    return isValidBasicField(parsed.minute, 0, 59) &&
           isValidBasicField(parsed.hour, 0, 23) &&
           isValidDayOfMonth(parsed.dayOfMonth) &&
           isValidBasicField(parsed.month, 1, 12) &&
           isValidDayOfWeek(parsed.dayOfWeek) &&
           isValidYear(parsed.year);
  }

  function isValidRate(rate) {
    if (!rate || rate.type !== 'rate') return false;
    if (rate.value < 1) return false;
    const unit = rate.unit.replace(/s$/, '');
    return ['minute', 'hour', 'day'].indexOf(unit) !== -1;
  }

  // ==========================================================================
  // Human-Readable Description
  // ==========================================================================

  function awsDowToName(n) {
    const idx = parseInt(n, 10) - 1;
    return WEEKDAYS[idx] || n;
  }

  function awsDowToFullName(n) {
    const idx = parseInt(n, 10) - 1;
    return WEEKDAY_FULL[idx] || n;
  }

  function toHumanReadable(parsed) {
    if (!parsed) return 'Invalid expression';

    if (parsed.type === 'rate') {
      return `Every ${parsed.value} ${parsed.unit}`;
    }

    const parts = [];
    parts.push(describeTime(parsed.minute, parsed.hour));

    if (parsed.dayOfMonth !== '*' && parsed.dayOfMonth !== '?') {
      parts.push(describeDayOfMonth(parsed.dayOfMonth));
    }

    if (parsed.month !== '*') {
      parts.push(describeMonth(parsed.month));
    }

    if (parsed.dayOfWeek !== '*' && parsed.dayOfWeek !== '?') {
      parts.push(describeDayOfWeek(parsed.dayOfWeek));
    }

    if (parsed.year && parsed.year !== '*') {
      parts.push(describeYear(parsed.year));
    }

    return parts.join(', ') + ' (UTC)';
  }

  function describeTime(minute, hour) {
    if (minute === '*' && hour === '*') {
      return 'Every minute';
    }

    if (minute.startsWith('*/') && hour === '*') {
      return `Every ${minute.split('/')[1]} minutes`;
    }

    if (minute !== '*' && hour === '*') {
      if (minute === '0') return 'Every hour';
      return `Every hour at minute ${minute}`;
    }

    if (minute !== '*' && hour.startsWith('*/')) {
      return `Every ${hour.split('/')[1]} hours at minute ${minute}`;
    }

    if (minute.includes('/') && hour.includes('-')) {
      const step = minute.split('/')[1];
      return `Every ${step} minutes during hours ${hour}`;
    }

    if (minute !== '*' && hour !== '*') {
      const hourVals = parseFieldValues(hour);
      const minVals = parseFieldValues(minute);

      if (hourVals.length === 1 && minVals.length === 1) {
        return `At ${formatTime(hourVals[0], minVals[0])}`;
      }

      if (minVals.length === 1 && hourVals.length > 1) {
        const times = hourVals.map(h => formatTime(h, minVals[0]));
        return `At ${times.join(', ')}`;
      }

      if (hourVals.length === 1) {
        return `At hour ${hourVals[0]}, minute ${minute}`;
      }
    }

    let desc = '';
    if (hour !== '*') {
      desc = `At hours ${hour}`;
    }
    if (minute !== '*') desc += (desc ? ', ' : '') + `minute ${minute}`;
    return desc || `At ${hour}:${minute}`;
  }

  function describeDayOfMonth(day) {
    if (day === 'L') return 'on the last day of the month';
    if (day === 'LW') return 'on the last weekday of the month';
    if (/^L-\d+$/i.test(day)) {
      const offset = day.split('-')[1];
      return `${offset} day(s) before the end of the month`;
    }
    if (/^\d+W$/i.test(day)) {
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
    if (weekday.toUpperCase() === 'L') return 'on Saturday (last day of the week)';

    if (/^\dL$/i.test(weekday)) {
      const day = parseInt(weekday, 10);
      return `on the last ${awsDowToFullName(day)} of the month`;
    }

    if (weekday.includes('#')) {
      const [day, nth] = weekday.split('#');
      return `on the ${ordinal(parseInt(nth, 10))} ${awsDowToFullName(day)} of the month`;
    }

    if (weekday.includes('-')) {
      const [start, end] = weekday.split('-');
      return `${awsDowToName(start)} through ${awsDowToName(end)}`;
    }

    if (weekday.includes(',')) {
      const days = weekday.split(',').map(d => awsDowToName(d.trim()));
      return `on ${days.join(', ')}`;
    }

    const dayNum = parseInt(weekday, 10);
    if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 7) {
      return `on ${awsDowToFullName(dayNum)}`;
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
      if (part.includes('-') && !part.includes('/')) {
        const [start, end] = part.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) values.push(i);
        }
      } else if (part.includes('/')) {
        const [range, step] = part.split('/');
        if (range === '*') {
          values.push(parseInt(step, 10));
        } else if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          const stepNum = parseInt(step, 10);
          for (let i = start; i <= end; i += stepNum) values.push(i);
        } else {
          const start = parseInt(range, 10);
          const stepNum = parseInt(step, 10);
          // 0/5 style - values from start stepping
          for (let i = start; i <= 59; i += stepNum) values.push(i);
        }
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
  // Next Run Calculator (UTC)
  // ==========================================================================

  function getNextRuns(parsed, count) {
    count = count || 3;
    if (!parsed || parsed.type !== 'cron') return [];

    const runs = [];
    // Work in UTC
    const now = new Date();
    let current = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      0,
      0
    ));
    // Advance past current minute
    current.setUTCMinutes(current.getUTCMinutes() + 1);

    const maxIterations = 525600; // ~1 year in minutes
    let iterations = 0;

    while (runs.length < count && iterations < maxIterations) {
      if (matchesAwsCron(current, parsed)) {
        runs.push(new Date(current));
      }
      current.setUTCMinutes(current.getUTCMinutes() + 1);
      iterations++;
    }

    return runs;
  }

  function getNextRateRuns(rate, count) {
    count = count || 3;
    if (!rate || rate.type !== 'rate') return [];

    const unit = rate.unit.replace(/s$/, '');
    let ms = rate.value * 60 * 1000;
    if (unit === 'hour') ms = rate.value * 60 * 60 * 1000;
    if (unit === 'day') ms = rate.value * 24 * 60 * 60 * 1000;

    const runs = [];
    let next = Date.now() + ms;
    for (let i = 0; i < count; i++) {
      runs.push(new Date(next));
      next += ms;
    }
    return runs;
  }

  function matchesAwsCron(date, parsed) {
    if (!matchesField(date.getUTCMinutes(), parsed.minute, 0, 59)) return false;
    if (!matchesField(date.getUTCHours(), parsed.hour, 0, 23)) return false;
    if (!matchesMonth(date.getUTCMonth() + 1, parsed.month)) return false;
    if (!matchesDayOfMonth(date, parsed.dayOfMonth)) return false;
    if (!matchesDayOfWeek(date, parsed.dayOfWeek)) return false;
    if (!matchesYear(date.getUTCFullYear(), parsed.year)) return false;
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

    const day = date.getUTCDate();
    const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();

    if (field === 'L') return day === lastDay;
    if (field === 'LW') {
      let d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
      while (d.getUTCDay() === 0 || d.getUTCDay() === 6) {
        d.setUTCDate(d.getUTCDate() - 1);
      }
      return day === d.getUTCDate();
    }
    if (/^L-\d+$/i.test(field)) {
      const offset = parseInt(field.split('-')[1], 10);
      return day === lastDay - offset;
    }
    if (/^\d+W$/i.test(field)) {
      const target = parseInt(field, 10);
      let d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), target));
      if (d.getUTCDay() === 0) d.setUTCDate(d.getUTCDate() + 1);
      if (d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() - 1);
      if (d.getUTCMonth() !== date.getUTCMonth()) {
        d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), target));
        if (d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() + 2);
        if (d.getUTCDay() === 0) d.setUTCDate(d.getUTCDate() - 2);
      }
      return day === d.getUTCDate();
    }

    return matchesField(day, field, 1, 31);
  }

  function matchesDayOfWeek(date, field) {
    if (field === '*' || field === '?') return true;

    // AWS: 1=Sun...7=Sat. JS UTC: 0=Sun...6=Sat
    const jsDay = date.getUTCDay();
    const awsDay = jsDay + 1;

    if (field.toUpperCase() === 'L') return awsDay === 7;

    if (/^\dL$/i.test(field)) {
      const targetDay = parseInt(field, 10);
      if (awsDay !== targetDay) return false;
      const nextWeek = new Date(date);
      nextWeek.setUTCDate(nextWeek.getUTCDate() + 7);
      return nextWeek.getUTCMonth() !== date.getUTCMonth();
    }

    if (field.includes('#')) {
      const [dayStr, nthStr] = field.split('#');
      const targetDay = parseInt(dayStr, 10);
      const nth = parseInt(nthStr, 10);
      if (awsDay !== targetDay) return false;
      const occurrence = Math.ceil(date.getUTCDate() / 7);
      return occurrence === nth;
    }

    return matchesField(awsDay, field, 1, 7);
  }

  function matchesYear(year, field) {
    if (!field || field === '*') return true;
    return matchesField(year, field, 1970, 2199);
  }

  function formatRunDate(date) {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
      timeZoneName: 'short'
    };
    return date.toLocaleString('en-US', options);
  }

  // ==========================================================================
  // UI Updates
  // ==========================================================================

  function updateBreakdown(parsed) {
    const fields = ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek', 'year'];

    fields.forEach(field => {
      const el = document.querySelector(`.aws-cron-field[data-field="${field}"]`);
      if (!el) return;
      const valueSpan = el.querySelector('.field-value');
      if (parsed && parsed.type === 'cron' && parsed[field] !== undefined) {
        valueSpan.textContent = parsed[field];
        el.classList.add('highlight');
      } else if (parsed && parsed.type === 'rate') {
        valueSpan.textContent = '-';
        el.classList.remove('highlight');
      } else {
        valueSpan.textContent = '*';
        el.classList.remove('highlight');
      }
    });
  }

  function getQuestionMarkHint(parsed) {
    if (!parsed || parsed.type !== 'cron') return null;
    const domIsQ = parsed.dayOfMonth === '?';
    const dowIsQ = parsed.dayOfWeek === '?';
    if (domIsQ && dowIsQ) {
      return 'Both day-of-month and day-of-week cannot be <code>?</code>. Set one to a value or <code>*</code>.';
    }
    if (!domIsQ && !dowIsQ) {
      return 'One of day-of-month or day-of-week must be <code>?</code>. Example: <code>cron(0 18 ? * MON-FRI *)</code>';
    }
    return null;
  }

  function updateHumanReadable(parsed, isValid, rawInput) {
    if (!rawInput || !rawInput.trim()) {
      elements.humanReadable.textContent = 'Enter an AWS EventBridge cron or rate expression above';
      elements.humanReadable.classList.remove('error', 'valid');
      return;
    }

    if (!isValid) {
      const hint = getQuestionMarkHint(parsed);
      if (hint) {
        elements.humanReadable.innerHTML =
          '<span class="aws-cron-description">Invalid AWS cron expression</span>' +
          '<span class="aws-cron-warning"><i class="fas fa-exclamation-triangle"></i> ' +
          hint + '</span>';
      } else if (rawInput.trim().split(/\s+/).length === 5 ||
                 unwrapCron(rawInput).split(/\s+/).length === 5) {
        elements.humanReadable.innerHTML =
          '<span class="aws-cron-description">Invalid AWS cron expression</span>' +
          '<span class="aws-cron-warning"><i class="fas fa-exclamation-triangle"></i> ' +
          'AWS EventBridge requires <strong>6 fields</strong> including year. ' +
          'Add a year field (usually <code>*</code>). Example: <code>cron(0 18 ? * MON-FRI *)</code></span>';
      } else {
        elements.humanReadable.textContent = 'Invalid AWS cron or rate expression';
      }
      elements.humanReadable.classList.add('error');
      elements.humanReadable.classList.remove('valid');
    } else {
      elements.humanReadable.innerHTML =
        '<i class="fas fa-check-circle valid-icon"></i> ' + toHumanReadable(parsed);
      elements.humanReadable.classList.remove('error');
      elements.humanReadable.classList.add('valid');
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

    let runs = [];
    if (parsed.type === 'rate') {
      runs = getNextRateRuns(parsed, 3);
    } else {
      runs = getNextRuns(parsed, 3);
    }

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
    const expression = elements.awsInput.value.trim();

    if (!expression) {
      updateBreakdown(null);
      updateHumanReadable(null, false, '');
      elements.nextRuns.innerHTML = '<li class="placeholder">Enter an expression to see upcoming runs</li>';
      return;
    }

    // Try rate first
    const rate = parseRate(expression);
    if (rate) {
      const valid = isValidRate(rate);
      updateBreakdown(rate);
      updateHumanReadable(rate, valid, expression);
      updateNextRuns(rate, valid);
      return;
    }

    const parsed = parseAwsCron(expression);
    const isValid = isValidAwsCron(parsed);

    updateBreakdown(parsed);
    updateHumanReadable(parsed, isValid, expression);
    updateNextRuns(parsed, isValid);
  }

  // ==========================================================================
  // Builder Mode
  // ==========================================================================

  function initBuilder() {
    const selects = document.querySelectorAll('#build-mode .builder-col select');
    selects.forEach(select => {
      select.addEventListener('change', function() {
        // Auto-enforce ? rule
        const domSelect = document.getElementById('aws-dom-select');
        const dowSelect = document.getElementById('aws-dow-select');
        if (!domSelect || !dowSelect) return;

        if (select === domSelect && domSelect.value !== '?') {
          dowSelect.value = '?';
        } else if (select === dowSelect && dowSelect.value !== '?') {
          domSelect.value = '?';
        }

        updateGeneratedCron();
      });
    });
  }

  function updateGeneratedCron() {
    const minute = document.getElementById('aws-minute-select')?.value || '0';
    const hour = document.getElementById('aws-hour-select')?.value || '*';
    let dayOfMonth = document.getElementById('aws-dom-select')?.value || '?';
    const month = document.getElementById('aws-month-select')?.value || '*';
    let dayOfWeek = document.getElementById('aws-dow-select')?.value || '*';
    const year = document.getElementById('aws-year-select')?.value || '*';

    // Enforce ? rule
    if (dayOfMonth !== '?' && dayOfWeek !== '?') {
      dayOfWeek = '?';
      const dowEl = document.getElementById('aws-dow-select');
      if (dowEl) dowEl.value = '?';
    }
    if (dayOfMonth === '?' && dayOfWeek === '?') {
      dayOfWeek = '*';
      const dowEl = document.getElementById('aws-dow-select');
      if (dowEl) dowEl.value = '*';
    }

    const fields = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} ${year}`;
    const expression = wrapCron(fields);

    if (elements.generatedCron) {
      elements.generatedCron.textContent = expression;
    }

    const parsed = parseAwsCron(expression);
    const isValid = isValidAwsCron(parsed);

    if (elements.generatedDescription) {
      elements.generatedDescription.textContent = isValid
        ? toHumanReadable(parsed)
        : 'Adjust fields to create a valid expression';
    }

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
  // Rate Helper
  // ==========================================================================

  function updateRateOutput() {
    if (!elements.rateValue || !elements.rateUnit || !elements.rateOutput) return;

    let value = parseInt(elements.rateValue.value, 10);
    if (isNaN(value) || value < 1) value = 1;

    let unit = elements.rateUnit.value;
    // Singular when value is 1
    if (value === 1) {
      unit = unit.replace(/s$/, '');
    } else if (!unit.endsWith('s')) {
      unit = unit + 's';
    }

    const expr = `rate(${value} ${unit})`;
    elements.rateOutput.textContent = expr;

    if (elements.rateDescription) {
      elements.rateDescription.textContent = `Every ${value} ${unit}`;
    }
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

    elements.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === 'parse');
    });
    elements.modeContents.forEach(content => {
      content.classList.toggle('active', content.id === 'parse-mode');
    });

    elements.awsInput.value = cron;
    parseAndUpdate();
    updateURL(cron);

    document.querySelector('.aws-cron-tool').scrollIntoView({ behavior: 'smooth' });
  }

  function handleCopyClick() {
    const text = elements.generatedCron.textContent;
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
    const expression = elements.generatedCron.textContent;
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

  function handleRateCopy() {
    const text = elements.rateOutput.textContent;
    trackEvent('copy_rate', text);

    navigator.clipboard.writeText(text).then(() => {
      elements.rateCopyBtn.classList.add('copied');
      elements.rateCopyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

      setTimeout(() => {
        elements.rateCopyBtn.classList.remove('copied');
        elements.rateCopyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    });
  }

  // ==========================================================================
  // URL State
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
    const expression = elements.awsInput.value.trim();
    parseAndUpdate();
    updateURL(expression);
  }

  // ==========================================================================
  // Initialize
  // ==========================================================================

  function init() {
    const urlExpression = getExpressionFromURL();

    elements.modeTabs.forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });

    if (elements.parseBtn) {
      elements.parseBtn.addEventListener('click', () => {
        const expression = elements.awsInput.value.trim();
        if (expression) trackEvent('parse_expression', expression);
        parseAndUpdateWithURL();
      });
    }

    if (elements.awsInput) {
      elements.awsInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          const expression = elements.awsInput.value.trim();
          if (expression) trackEvent('parse_expression', expression);
          parseAndUpdateWithURL();
        }
      });
      elements.awsInput.addEventListener('input', parseAndUpdateWithURL);
    }

    elements.exampleRows.forEach(row => {
      row.addEventListener('click', handleExampleClick);
    });

    if (elements.copyBtn) {
      elements.copyBtn.addEventListener('click', handleCopyClick);
    }

    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', handleShareClick);
    }

    initBuilder();
    updateGeneratedCron();

    if (elements.rateValue) {
      elements.rateValue.addEventListener('input', updateRateOutput);
    }
    if (elements.rateUnit) {
      elements.rateUnit.addEventListener('change', updateRateOutput);
    }
    if (elements.rateCopyBtn) {
      elements.rateCopyBtn.addEventListener('click', handleRateCopy);
    }
    updateRateOutput();

    if (urlExpression) {
      elements.awsInput.value = urlExpression;
      trackEvent('url_load', urlExpression);
    } else {
      elements.awsInput.value = 'cron(0 18 ? * MON-FRI *)';
    }
    parseAndUpdate();

    trackEvent('tool_load', 'aws_eventbridge_cron_tool');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
