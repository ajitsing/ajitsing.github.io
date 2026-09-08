(function () {
  'use strict';

  var SAMPLE = {
    name: 'Sample User',
    email: 'sample@example.com',
    comment: '',
    passphrase: ''
  };

  var elements = {
    modeTabs: document.querySelectorAll('.mode-tab'),
    generateOnly: document.querySelectorAll('.generate-only'),
    inspectOnly: document.querySelectorAll('.inspect-only'),
    nameInput: document.getElementById('pgp-name'),
    emailInput: document.getElementById('pgp-email'),
    commentInput: document.getElementById('pgp-comment'),
    passphraseInput: document.getElementById('pgp-passphrase'),
    togglePassphraseBtn: document.getElementById('toggle-passphrase-btn'),
    algorithmSelect: document.getElementById('algorithm-select'),
    expirySelect: document.getElementById('expiry-select'),
    inspectInput: document.getElementById('pgp-inspect-input'),
    actionBtn: document.getElementById('action-btn'),
    actionBtnText: document.getElementById('action-btn-text'),
    sampleBtn: document.getElementById('sample-btn'),
    clearBtn: document.getElementById('clear-btn'),
    resultSection: document.getElementById('result-section'),
    resultCard: document.getElementById('result-card'),
    resultIcon: document.getElementById('result-icon'),
    resultMessage: document.getElementById('result-message'),
    outputWrap: document.getElementById('output-wrap'),
    metaGrid: document.getElementById('meta-grid'),
    publicOutput: document.getElementById('pgp-public-output'),
    privateOutput: document.getElementById('pgp-private-output'),
    revocationOutput: document.getElementById('pgp-revocation-output'),
    publicCount: document.getElementById('public-char-count'),
    privateCount: document.getElementById('private-char-count'),
    copyPublicBtn: document.getElementById('copy-public-btn'),
    copyPrivateBtn: document.getElementById('copy-private-btn'),
    copyRevocationBtn: document.getElementById('copy-revocation-btn'),
    downloadPublicBtn: document.getElementById('download-public-btn'),
    downloadPrivateBtn: document.getElementById('download-private-btn'),
    downloadRevocationBtn: document.getElementById('download-revocation-btn'),
    privateSection: document.getElementById('private-section'),
    revocationSection: document.getElementById('revocation-section')
  };

  var currentMode = 'generate';
  var lastPublic = '';
  var lastPrivate = '';
  var lastRevocation = '';
  var lastFingerprint = '';
  var busy = false;

  function trackEvent(action, label, value) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'PGP Key Generator',
        event_label: label,
        value: value
      });
    }
  }

  function showResult(isSuccess, message) {
    elements.resultSection.classList.remove('hidden');
    elements.resultCard.className = 'result-card ' + (isSuccess ? 'success' : 'error');
    elements.resultIcon.innerHTML = isSuccess
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-times-circle"></i>';
    elements.resultMessage.textContent = message;
  }

  function hideResult() {
    elements.resultSection.classList.add('hidden');
  }

  function setBusy(isBusy, label) {
    busy = isBusy;
    elements.actionBtn.disabled = isBusy;
    elements.sampleBtn.disabled = isBusy;
    elements.actionBtnText.textContent = label;
  }

  function formatFingerprint(hex) {
    var clean = String(hex || '').replace(/[^0-9a-fA-F]/g, '').toUpperCase();
    return clean.replace(/(.{4})/g, '$1 ').trim();
  }

  function formatDate(value) {
    if (!value || value === Infinity) {
      return 'Never';
    }
    var date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) {
      return 'Unknown';
    }
    return date.toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC');
  }

  function algorithmLabel(info) {
    if (!info) {
      return 'Unknown';
    }
    if (info.bits) {
      return (info.algorithm || 'RSA') + ' ' + info.bits + '-bit';
    }
    if (info.curve) {
      return (info.algorithm || 'ECC') + ' ' + info.curve;
    }
    return info.algorithm || 'Unknown';
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderMeta(items) {
    elements.metaGrid.innerHTML = items.map(function (item) {
      return (
        '<div class="meta-card">' +
          '<span class="meta-label">' + escapeHtml(item.label) + '</span>' +
          '<div class="meta-value">' + escapeHtml(item.value) + '</div>' +
        '</div>'
      );
    }).join('');
  }

  function setOutputCounts() {
    if (elements.publicCount) {
      elements.publicCount.textContent = lastPublic
        ? lastPublic.length.toLocaleString() + ' chars'
        : '';
    }
    if (elements.privateCount) {
      elements.privateCount.textContent = lastPrivate
        ? lastPrivate.length.toLocaleString() + ' chars'
        : '';
    }
  }

  function setMode(mode) {
    currentMode = mode === 'inspect' ? 'inspect' : 'generate';
    elements.modeTabs.forEach(function (tab) {
      tab.classList.toggle('active', tab.getAttribute('data-mode') === currentMode);
    });
    elements.generateOnly.forEach(function (el) {
      el.classList.toggle('hidden', currentMode !== 'generate');
    });
    elements.inspectOnly.forEach(function (el) {
      el.classList.toggle('hidden', currentMode !== 'inspect');
    });
    elements.actionBtnText.textContent = currentMode === 'inspect' ? 'Inspect' : 'Generate keys';
    hideResult();
  }

  function parseAlgorithm() {
    var value = elements.algorithmSelect.value;
    if (value === 'rsa-2048') {
      return { type: 'rsa', rsaBits: 2048 };
    }
    if (value === 'rsa-3072') {
      return { type: 'rsa', rsaBits: 3072 };
    }
    if (value === 'rsa-4096') {
      return { type: 'rsa', rsaBits: 4096 };
    }
    if (value === 'ecc-p256') {
      return { type: 'ecc', curve: 'p256' };
    }
    return { type: 'ecc', curve: 'curve25519' };
  }

  function expirySeconds() {
    return parseInt(elements.expirySelect.value, 10) || 0;
  }

  function downloadFile(filename, contents) {
    var blob = new Blob([contents], { type: 'application/pgp-keys;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function copyText(text, button) {
    if (!text) {
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
      var original = button.innerHTML;
      button.classList.add('copied');
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(function () {
        button.classList.remove('copied');
        button.innerHTML = original;
      }, 1600);
      trackEvent('copy', currentMode);
    }).catch(function () {
      showResult(false, 'Could not copy. Select the text and copy it manually.');
    });
  }

  function shortFileBase() {
    var id = lastFingerprint.replace(/\s+/g, '').slice(-8).toLowerCase() || 'key';
    return 'pgp-' + id;
  }

  async function readAnyKey(armored) {
    try {
      return await openpgp.readKey({ armoredKey: armored });
    } catch (err) {
      return await openpgp.readPrivateKey({ armoredKey: armored });
    }
  }

  async function describeKey(key) {
    var info = key.getAlgorithmInfo();
    var expiry = await key.getExpirationTime();
    var userIds = key.getUserIDs();
    lastFingerprint = formatFingerprint(key.getFingerprint());
    return [
      { label: 'Fingerprint', value: lastFingerprint },
      { label: 'Key ID', value: key.getKeyID().toHex().toUpperCase() },
      { label: 'Algorithm', value: algorithmLabel(info) },
      { label: 'Created', value: formatDate(key.getCreationTime()) },
      { label: 'Expires', value: formatDate(expiry) },
      { label: 'User IDs', value: userIds.length ? userIds.join(', ') : '(none)' },
      { label: 'Type', value: key.isPrivate() ? 'Private key (secret material present)' : 'Public key' }
    ];
  }

  async function generateKeys() {
    if (typeof openpgp === 'undefined') {
      showResult(false, 'OpenPGP library did not load. Check your network and refresh.');
      return;
    }

    var name = (elements.nameInput.value || '').trim();
    var email = (elements.emailInput.value || '').trim();
    var comment = (elements.commentInput.value || '').trim();
    var passphrase = elements.passphraseInput.value;

    if (!name && !email) {
      showResult(false, 'Enter a name or email for the User ID.');
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showResult(false, 'Email looks invalid. Fix it or leave it blank.');
      return;
    }

    var userID = { name: name, email: email };
    if (comment) {
      userID.comment = comment;
    }

    var algo = parseAlgorithm();
    var options = {
      type: algo.type,
      userIDs: [userID],
      format: 'armored'
    };
    if (algo.rsaBits) {
      options.rsaBits = algo.rsaBits;
    }
    if (algo.curve) {
      options.curve = algo.curve;
    }
    if (passphrase) {
      options.passphrase = passphrase;
    }
    var expiry = expirySeconds();
    if (expiry > 0) {
      options.keyExpirationTime = expiry;
    }

    setBusy(true, 'Generating...');
    hideResult();
    try {
      var result = await openpgp.generateKey(options);
      lastPublic = result.publicKey || '';
      lastPrivate = result.privateKey || '';
      lastRevocation = result.revocationCertificate || '';
      elements.publicOutput.value = lastPublic;
      elements.privateOutput.value = lastPrivate;
      elements.revocationOutput.value = lastRevocation;
      elements.outputWrap.classList.remove('hidden');
      elements.privateSection.classList.remove('hidden');
      elements.revocationSection.classList.remove('hidden');
      setOutputCounts();

      var key = await openpgp.readKey({ armoredKey: lastPublic });
      renderMeta(await describeKey(key));
      showResult(true, passphrase
        ? 'Key pair generated. Private key is passphrase-protected and stays in this browser.'
        : 'Key pair generated. Private key has no passphrase. Download it and store it offline.');
      trackEvent('generate', algo.type + (algo.rsaBits || algo.curve || ''));
    } catch (err) {
      showResult(false, err && err.message ? err.message : 'Key generation failed.');
      trackEvent('generate_error', (err && err.message) || 'unknown');
    } finally {
      setBusy(false, 'Generate keys');
    }
  }

  async function inspectKey(armoredOverride) {
    if (typeof openpgp === 'undefined') {
      showResult(false, 'OpenPGP library did not load. Check your network and refresh.');
      return;
    }

    var armored = (armoredOverride != null ? armoredOverride : elements.inspectInput.value || '').trim();
    if (!armored) {
      showResult(false, 'Paste an armored public or private key to inspect.');
      return;
    }

    setBusy(true, 'Inspecting...');
    hideResult();
    try {
      var key = await readAnyKey(armored);
      var meta = await describeKey(key);
      renderMeta(meta);
      lastPublic = key.isPrivate() ? await key.toPublic().armor() : armored;
      lastPrivate = key.isPrivate() ? armored : '';
      lastRevocation = '';
      elements.publicOutput.value = lastPublic;
      elements.privateOutput.value = lastPrivate;
      elements.revocationOutput.value = '';
      elements.outputWrap.classList.remove('hidden');
      elements.privateSection.classList.toggle('hidden', !lastPrivate);
      elements.revocationSection.classList.add('hidden');
      setOutputCounts();
      showResult(true, key.isPrivate()
        ? 'Private key parsed locally. Do not share this block.'
        : 'Public key parsed. Fingerprint and User IDs are shown above.');
      trackEvent('inspect', key.isPrivate() ? 'private' : 'public');
    } catch (err) {
      showResult(false, err && err.message ? err.message : 'Could not parse that key.');
      trackEvent('inspect_error', (err && err.message) || 'unknown');
    } finally {
      setBusy(false, 'Inspect');
    }
  }

  async function loadSample() {
    if (currentMode === 'generate') {
      elements.nameInput.value = SAMPLE.name;
      elements.emailInput.value = SAMPLE.email;
      elements.commentInput.value = SAMPLE.comment;
      elements.passphraseInput.value = SAMPLE.passphrase;
      elements.algorithmSelect.value = 'ecc-curve25519';
      elements.expirySelect.value = '0';
      hideResult();
      trackEvent('sample', 'generate');
      return;
    }

    if (typeof openpgp === 'undefined') {
      showResult(false, 'OpenPGP library did not load. Check your network and refresh.');
      return;
    }

    setBusy(true, 'Preparing sample...');
    try {
      var sample = await openpgp.generateKey({
        type: 'ecc',
        curve: 'curve25519',
        userIDs: [{ name: SAMPLE.name, email: SAMPLE.email }],
        format: 'armored'
      });
      elements.inspectInput.value = sample.publicKey;
      await inspectKey(sample.publicKey);
      trackEvent('sample', 'inspect');
    } catch (err) {
      showResult(false, err && err.message ? err.message : 'Could not build a sample key.');
      setBusy(false, 'Inspect');
    }
  }

  function clearAll() {
    elements.nameInput.value = '';
    elements.emailInput.value = '';
    elements.commentInput.value = '';
    elements.passphraseInput.value = '';
    elements.inspectInput.value = '';
    elements.publicOutput.value = '';
    elements.privateOutput.value = '';
    elements.revocationOutput.value = '';
    elements.metaGrid.innerHTML = '';
    elements.outputWrap.classList.add('hidden');
    lastPublic = '';
    lastPrivate = '';
    lastRevocation = '';
    lastFingerprint = '';
    hideResult();
    trackEvent('clear', currentMode);
  }

  function bind() {
    elements.modeTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        if (!busy) {
          setMode(tab.getAttribute('data-mode'));
        }
      });
    });

    elements.actionBtn.addEventListener('click', function () {
      if (busy) {
        return;
      }
      if (currentMode === 'inspect') {
        inspectKey();
      } else {
        generateKeys();
      }
    });

    elements.sampleBtn.addEventListener('click', function () {
      if (!busy) {
        loadSample();
      }
    });

    elements.clearBtn.addEventListener('click', function () {
      if (!busy) {
        clearAll();
      }
    });

    elements.togglePassphraseBtn.addEventListener('click', function () {
      var isPassword = elements.passphraseInput.type === 'password';
      elements.passphraseInput.type = isPassword ? 'text' : 'password';
      elements.togglePassphraseBtn.innerHTML = isPassword
        ? '<i class="fas fa-eye-slash"></i>'
        : '<i class="fas fa-eye"></i>';
    });

    elements.copyPublicBtn.addEventListener('click', function () {
      copyText(lastPublic, elements.copyPublicBtn);
    });
    elements.copyPrivateBtn.addEventListener('click', function () {
      copyText(lastPrivate, elements.copyPrivateBtn);
    });
    elements.copyRevocationBtn.addEventListener('click', function () {
      copyText(lastRevocation, elements.copyRevocationBtn);
    });
    elements.downloadPublicBtn.addEventListener('click', function () {
      if (lastPublic) {
        downloadFile(shortFileBase() + '-public.asc', lastPublic);
        trackEvent('download', 'public');
      }
    });
    elements.downloadPrivateBtn.addEventListener('click', function () {
      if (lastPrivate) {
        downloadFile(shortFileBase() + '-private.asc', lastPrivate);
        trackEvent('download', 'private');
      }
    });
    elements.downloadRevocationBtn.addEventListener('click', function () {
      if (lastRevocation) {
        downloadFile(shortFileBase() + '-revocation.asc', lastRevocation);
        trackEvent('download', 'revocation');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
