(function() {
  'use strict';

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'Snowflake Decoder',
        event_label: label,
        value: value
      });
    }
  }

  const EPOCHS = {
    discord: 1420070400000n,
    twitter: 1288834974657n,
    instagram: 0n,
    custom: 0n
  };

  const snowflakeInput = document.getElementById('snowflake-input');
  const pasteBtn = document.getElementById('paste-btn');
  const clearBtn = document.getElementById('clear-btn');
  const platformBtns = document.querySelectorAll('.platform-btn');
  const customEpochContainer = document.getElementById('custom-epoch-container');
  const customEpochInput = document.getElementById('custom-epoch');
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');
  const resultSection = document.getElementById('result-section');

  const utcTime = document.getElementById('utc-time');
  const localTime = document.getElementById('local-time');
  const relativeTime = document.getElementById('relative-time');
  const unixTime = document.getElementById('unix-time');
  const bitSign = document.getElementById('bit-sign');
  const bitTimestamp = document.getElementById('bit-timestamp');
  const bitWorker = document.getElementById('bit-worker');
  const bitSequence = document.getElementById('bit-sequence');
  const workerId = document.getElementById('worker-id');
  const processId = document.getElementById('process-id');
  const sequenceNum = document.getElementById('sequence-num');
  const binaryValue = document.getElementById('binary-value');

  const genDatetime = document.getElementById('gen-datetime');
  const genWorker = document.getElementById('gen-worker');
  const genProcess = document.getElementById('gen-process');
  const genSequence = document.getElementById('gen-sequence');
  const generateBtn = document.getElementById('generate-btn');
  const generatedResult = document.getElementById('generated-result');
  const generatedId = document.getElementById('generated-id');
  const copyGeneratedBtn = document.getElementById('copy-generated-btn');
  const decodeGeneratedBtn = document.getElementById('decode-generated-btn');

  const exampleBtns = document.querySelectorAll('.example-btn');

  let currentPlatform = 'twitter';
  let currentEpoch = EPOCHS.twitter;

  function init() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    genDatetime.value = now.toISOString().slice(0, 16);

    snowflakeInput.addEventListener('input', debounce(handleDecode, 150));
    snowflakeInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') handleDecode();
    });

    pasteBtn.addEventListener('click', handlePaste);
    clearBtn.addEventListener('click', handleClear);

    platformBtns.forEach(btn => {
      btn.addEventListener('click', () => handlePlatformChange(btn));
    });

    customEpochInput.addEventListener('input', debounce(handleCustomEpoch, 200));

    generateBtn.addEventListener('click', handleGenerate);
    copyGeneratedBtn.addEventListener('click', handleCopyGenerated);
    decodeGeneratedBtn.addEventListener('click', handleDecodeGenerated);

    exampleBtns.forEach(btn => {
      btn.addEventListener('click', () => handleExample(btn));
    });

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    const platformParam = urlParams.get('platform');

    if (platformParam && EPOCHS[platformParam]) {
      setActivePlatform(platformParam);
    }

    if (idParam) {
      snowflakeInput.value = idParam;
      trackEvent('url_load', idParam);
      handleDecode();
    }

    trackEvent('tool_load', 'snowflake_decoder_tool');
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      snowflakeInput.value = text.trim();
      trackEvent('paste', 'Paste from clipboard');
      handleDecode();
    } catch (err) {
      showError('Could not access clipboard. Please paste manually.');
    }
  }

  function handleClear() {
    snowflakeInput.value = '';
    hideError();
    resultSection.classList.add('hidden');
  }

  function handlePlatformChange(btn) {
    const platform = btn.dataset.platform;
    setActivePlatform(platform);
    trackEvent('platform_change', 'Platform: ' + platform);
    handleDecode();
  }

  function setActivePlatform(platform) {
    currentPlatform = platform;
    currentEpoch = EPOCHS[platform] || 0n;

    platformBtns.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.platform-btn[data-platform="${platform}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      if (activeBtn.dataset.epoch) {
        currentEpoch = BigInt(activeBtn.dataset.epoch);
      }
    }

    if (platform === 'custom') {
      customEpochContainer.classList.remove('hidden');
      if (customEpochInput.value) {
        currentEpoch = BigInt(customEpochInput.value || 0);
      }
    } else {
      customEpochContainer.classList.add('hidden');
    }
  }

  function handleCustomEpoch() {
    const value = customEpochInput.value.trim();
    if (value && /^\d+$/.test(value)) {
      currentEpoch = BigInt(value);
      handleDecode();
    }
  }

  function handleDecode() {
    const input = snowflakeInput.value.trim();
    
    if (!input) {
      hideError();
      resultSection.classList.add('hidden');
      return;
    }

    if (!/^\d+$/.test(input)) {
      showError('Please enter a valid Snowflake ID (numbers only)');
      resultSection.classList.add('hidden');
      return;
    }

    try {
      const snowflakeId = BigInt(input);
      
      if (snowflakeId < 0n) {
        showError('Snowflake ID cannot be negative');
        resultSection.classList.add('hidden');
        return;
      }

      if (snowflakeId > 9223372036854775807n) {
        showError('Snowflake ID is too large (max: 9223372036854775807)');
        resultSection.classList.add('hidden');
        return;
      }

      const decoded = decodeSnowflake(snowflakeId, currentEpoch);
      displayResults(decoded, snowflakeId);
      hideError();
      resultSection.classList.remove('hidden');
      trackEvent('decode', 'Platform: ' + currentPlatform, input.length);

    } catch (err) {
      showError('Invalid Snowflake ID: ' + err.message);
      resultSection.classList.add('hidden');
      trackEvent('decode_error', err.message);
    }
  }

  function decodeSnowflake(id, epoch) {
    const timestamp = (id >> 22n) + epoch;
    const workerIdRaw = (id >> 12n) & 0x3FFn;
    const datacenter = (id >> 17n) & 0x1Fn;
    const worker = (id >> 12n) & 0x1Fn;
    const sequence = id & 0xFFFn;

    const date = new Date(Number(timestamp));

    return {
      timestamp: Number(timestamp),
      date: date,
      workerIdCombined: Number(workerIdRaw),
      datacenterId: Number(datacenter),
      workerId: Number(worker),
      sequence: Number(sequence),
      timestampBits: Number((id >> 22n)),
      binary: id.toString(2).padStart(64, '0')
    };
  }

  function displayResults(decoded, id) {
    utcTime.textContent = formatUTC(decoded.date);
    localTime.textContent = formatLocal(decoded.date);
    relativeTime.textContent = formatRelative(decoded.date);
    unixTime.textContent = decoded.timestamp.toString();

    bitSign.textContent = '0';
    bitTimestamp.textContent = decoded.timestampBits.toLocaleString();
    bitWorker.textContent = decoded.workerIdCombined;
    bitSequence.textContent = decoded.sequence;

    workerId.textContent = decoded.workerId;
    processId.textContent = decoded.datacenterId;
    sequenceNum.textContent = decoded.sequence;

    const binary = decoded.binary;
    const formatted = [
      `<span style="color:#9ca3af">${binary.substring(0, 1)}</span>`,
      `<span style="color:#60a5fa">${binary.substring(1, 42)}</span>`,
      `<span style="color:#34d399">${binary.substring(42, 52)}</span>`,
      `<span style="color:#fbbf24">${binary.substring(52, 64)}</span>`
    ].join(' ');
    binaryValue.innerHTML = formatted;

    updateURL(id.toString());
  }

  function formatUTC(date) {
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toUTCString().replace('GMT', 'UTC');
  }

  function formatLocal(date) {
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleString();
  }

  function formatRelative(date) {
    if (isNaN(date.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diff = now - date;
    const absDiff = Math.abs(diff);
    const isPast = diff > 0;

    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let value, unit;

    if (years > 0) {
      value = years;
      unit = years === 1 ? 'year' : 'years';
    } else if (months > 0) {
      value = months;
      unit = months === 1 ? 'month' : 'months';
    } else if (days > 0) {
      value = days;
      unit = days === 1 ? 'day' : 'days';
    } else if (hours > 0) {
      value = hours;
      unit = hours === 1 ? 'hour' : 'hours';
    } else if (minutes > 0) {
      value = minutes;
      unit = minutes === 1 ? 'minute' : 'minutes';
    } else {
      value = seconds;
      unit = seconds === 1 ? 'second' : 'seconds';
    }

    if (isPast) {
      return `${value} ${unit} ago`;
    } else {
      return `in ${value} ${unit}`;
    }
  }

  function handleGenerate() {
    const datetimeValue = genDatetime.value;
    const workerValue = parseInt(genWorker.value, 10) || 0;
    const processValue = parseInt(genProcess.value, 10) || 0;
    const sequenceValue = parseInt(genSequence.value, 10) || 0;

    if (!datetimeValue) {
      alert('Please select a date and time');
      return;
    }

    if (workerValue < 0 || workerValue > 31) {
      alert('Worker ID must be between 0 and 31');
      return;
    }

    if (processValue < 0 || processValue > 31) {
      alert('Process ID must be between 0 and 31');
      return;
    }

    if (sequenceValue < 0 || sequenceValue > 4095) {
      alert('Sequence must be between 0 and 4095');
      return;
    }

    const date = new Date(datetimeValue);
    const timestamp = BigInt(date.getTime()) - currentEpoch;

    if (timestamp < 0n) {
      alert('Date is before the selected platform epoch. Choose a later date or different platform.');
      return;
    }

    const id = (timestamp << 22n) | 
               (BigInt(processValue) << 17n) | 
               (BigInt(workerValue) << 12n) | 
               BigInt(sequenceValue);

    generatedId.textContent = id.toString();
    generatedResult.classList.remove('hidden');
    trackEvent('generate', 'Platform: ' + currentPlatform, 1);
  }

  async function handleCopyGenerated() {
    const id = generatedId.textContent;
    try {
      await navigator.clipboard.writeText(id);
      copyGeneratedBtn.innerHTML = '<i class="fas fa-check"></i>';
      trackEvent('copy', 'Copy generated ID', id.length);
      setTimeout(() => {
        copyGeneratedBtn.innerHTML = '<i class="fas fa-copy"></i>';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  function handleDecodeGenerated() {
    const id = generatedId.textContent;
    snowflakeInput.value = id;
    trackEvent('decode_generated', 'Decode generated ID');
    handleDecode();
    snowflakeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function handleExample(btn) {
    const id = btn.dataset.id;
    const platform = btn.dataset.platform;

    setActivePlatform(platform);
    snowflakeInput.value = id;
    trackEvent('example_click', 'Example: ' + platform + ' - ' + id);
    handleDecode();
    snowflakeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
  }

  function hideError() {
    errorMessage.classList.add('hidden');
  }

  function updateURL(id) {
    const url = new URL(window.location);
    url.searchParams.set('id', id);
    url.searchParams.set('platform', currentPlatform);
    window.history.replaceState({}, '', url);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
