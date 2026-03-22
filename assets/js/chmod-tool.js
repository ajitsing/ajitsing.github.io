(function () {
  'use strict';

  const PERMS = { read: 4, write: 2, execute: 1 };
  const ROLES = ['owner', 'group', 'others'];

  const octalInput = document.getElementById('octal-input');
  const checkboxes = document.querySelectorAll('.permission-grid input[type="checkbox"]');
  const ownerOctal = document.getElementById('owner-octal');
  const groupOctal = document.getElementById('group-octal');
  const othersOctal = document.getElementById('others-octal');
  const symbolicDisplay = document.getElementById('symbolic-display');
  const commandDisplay = document.getElementById('command-display');
  const summaryOwner = document.getElementById('summary-owner');
  const summaryGroup = document.getElementById('summary-group');
  const summaryOthers = document.getElementById('summary-others');
  const copyCommandBtn = document.getElementById('copy-command-btn');
  const copySymbolicBtn = document.getElementById('copy-symbolic-btn');
  const copyFullCmdBtn = document.getElementById('copy-full-cmd-btn');
  const presetBtns = document.querySelectorAll('.presets-grid .preset-btn');
  const tableRows = document.querySelectorAll('.chmod-table .clickable-row');

  let updatingFromInput = false;

  function getOctalForRole(role) {
    let val = 0;
    checkboxes.forEach(cb => {
      if (cb.dataset.role === role && cb.checked) {
        val += PERMS[cb.dataset.perm];
      }
    });
    return val;
  }

  function getSymbolicChar(role, perm) {
    const cb = document.querySelector(
      `input[data-role="${role}"][data-perm="${perm}"]`
    );
    if (!cb) return '-';
    if (!cb.checked) return '-';
    if (perm === 'read') return 'r';
    if (perm === 'write') return 'w';
    if (perm === 'execute') return 'x';
    return '-';
  }

  function getSymbolic() {
    let s = '';
    ROLES.forEach(role => {
      s += getSymbolicChar(role, 'read');
      s += getSymbolicChar(role, 'write');
      s += getSymbolicChar(role, 'execute');
    });
    return s;
  }

  function describePermissions(octalVal) {
    const parts = [];
    if (octalVal & 4) parts.push('Read');
    if (octalVal & 2) parts.push('Write');
    if (octalVal & 1) parts.push('Execute');
    return parts.length > 0 ? parts.join(', ') : 'No permissions';
  }

  function updateDisplay() {
    const o = getOctalForRole('owner');
    const g = getOctalForRole('group');
    const ot = getOctalForRole('others');
    const octalStr = '' + o + g + ot;

    ownerOctal.textContent = o;
    groupOctal.textContent = g;
    othersOctal.textContent = ot;

    if (!updatingFromInput) {
      octalInput.value = octalStr;
    }

    symbolicDisplay.textContent = getSymbolic();
    commandDisplay.textContent = `chmod ${octalStr} filename`;

    summaryOwner.innerHTML = `<strong>Owner:</strong> ${describePermissions(o)}`;
    summaryGroup.innerHTML = `<strong>Group:</strong> ${describePermissions(g)}`;
    summaryOthers.innerHTML = `<strong>Others:</strong> ${describePermissions(ot)}`;

    updateActivePreset(octalStr);
  }

  function setFromOctal(octalStr) {
    const digits = octalStr.replace(/^0+/, '').padStart(3, '0').slice(-3);
    const vals = [parseInt(digits[0], 10), parseInt(digits[1], 10), parseInt(digits[2], 10)];

    if (vals.some(v => isNaN(v) || v > 7)) return;

    ROLES.forEach((role, i) => {
      const v = vals[i];
      checkboxes.forEach(cb => {
        if (cb.dataset.role === role) {
          cb.checked = !!(v & PERMS[cb.dataset.perm]);
        }
      });
    });

    updateDisplay();
  }

  function updateActivePreset(octalStr) {
    const normalized = octalStr.replace(/^0+/, '').padStart(3, '0').slice(-3);
    presetBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.octal === normalized);
    });
  }

  function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-check';
        btn.classList.add('copy-success');
        setTimeout(() => {
          icon.className = 'fas fa-copy';
          btn.classList.remove('copy-success');
        }, 1200);
      }
    });
  }

  // Checkbox changes
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      updatingFromInput = false;
      updateDisplay();
    });
  });

  // Octal input
  octalInput.addEventListener('input', () => {
    let val = octalInput.value.replace(/[^0-7]/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    octalInput.value = val;

    if (val.length >= 3) {
      updatingFromInput = true;
      setFromOctal(val);
      updatingFromInput = false;
    }
  });

  octalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = octalInput.value;
      if (val.length >= 3) {
        updatingFromInput = true;
        setFromOctal(val);
        updatingFromInput = false;
      }
    }
  });

  // Presets
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      octalInput.value = btn.dataset.octal;
      updatingFromInput = true;
      setFromOctal(btn.dataset.octal);
      updatingFromInput = false;
    });
  });

  // Reference table rows
  tableRows.forEach(row => {
    row.addEventListener('click', () => {
      const octal = row.dataset.octal;
      octalInput.value = octal;
      updatingFromInput = true;
      setFromOctal(octal);
      updatingFromInput = false;
      document.querySelector('.calculator-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Copy buttons
  copyCommandBtn.addEventListener('click', () => {
    copyToClipboard(commandDisplay.textContent, copyCommandBtn);
  });

  copySymbolicBtn.addEventListener('click', () => {
    copyToClipboard(symbolicDisplay.textContent, copySymbolicBtn);
  });

  copyFullCmdBtn.addEventListener('click', () => {
    copyToClipboard(commandDisplay.textContent, copyFullCmdBtn);
  });

  // Initialize with 755
  octalInput.value = '755';
  setFromOctal('755');
})();
