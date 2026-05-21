(function () {
  'use strict';

  const CIDR_TABLE = [];
  for (let cidr = 0; cidr <= 32; cidr++) {
    const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const wildcard = (~mask) >>> 0;
    const total = cidr === 32 ? 1 : Math.pow(2, 32 - cidr);
    const usable = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, total - 2);
    CIDR_TABLE.push({
      cidr,
      mask: intToIPv4(mask),
      wildcard: intToIPv4(wildcard),
      total: formatNumber(total),
      usable: formatNumber(usable)
    });
  }

  const IPV4_PRESETS = [8, 16, 22, 23, 24, 26, 27, 28, 29, 30];

  let activeMode = 'ipv4';

  const modeTabs = document.querySelectorAll('.mode-tab');
  const ipv4Section = document.getElementById('ipv4-mode');
  const ipv6Section = document.getElementById('ipv6-mode');
  const ipv4Input = document.getElementById('ipv4-input');
  const ipv4Cidr = document.getElementById('ipv4-cidr');
  const ipv4CidrSlider = document.getElementById('ipv4-cidr-slider');
  const ipv4MaskInput = document.getElementById('ipv4-mask-input');
  const ipv4Error = document.getElementById('ipv4-error');
  const ipv6Input = document.getElementById('ipv6-input');
  const ipv6Cidr = document.getElementById('ipv6-cidr');
  const ipv6CidrSlider = document.getElementById('ipv6-cidr-slider');
  const ipv6Error = document.getElementById('ipv6-error');
  const splitPrefix = document.getElementById('split-prefix');
  const splitResults = document.getElementById('split-results');
  const splitBody = document.getElementById('split-body');
  const cidrTableBody = document.getElementById('cidr-table-body');
  function formatNumber(n) {
    if (typeof n === 'bigint') {
      if (n > BigInt(Number.MAX_SAFE_INTEGER)) return n.toString() + '+';
      return n.toLocaleString('en-US');
    }
    if (n > Number.MAX_SAFE_INTEGER) return n.toExponential(2);
    return Number(n).toLocaleString('en-US');
  }

  function intToIPv4(n) {
    n = n >>> 0;
    return [
      (n >>> 24) & 255,
      (n >>> 16) & 255,
      (n >>> 8) & 255,
      n & 255
    ].join('.');
  }

  function ipv4ToInt(ip) {
    const parts = ip.trim().split('.');
    if (parts.length !== 4) return null;
    let n = 0;
    for (let i = 0; i < 4; i++) {
      const p = parts[i].trim();
      if (!/^\d{1,3}$/.test(p)) return null;
      const o = parseInt(p, 10);
      if (o < 0 || o > 255) return null;
      n = (n << 8) | o;
    }
    return n >>> 0;
  }

  function cidrToMask(cidr) {
    if (cidr < 0 || cidr > 32) return null;
    if (cidr === 0) return 0;
    return (0xffffffff << (32 - cidr)) >>> 0;
  }

  function maskToCidr(mask) {
    if (mask === null) return null;
    let cidr = 0;
    for (let i = 31; i >= 0; i--) {
      if ((mask >>> i) & 1) cidr++;
      else break;
    }
    const expected = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    return mask === expected ? cidr : null;
  }

  function maskToDotted(mask) {
    return intToIPv4(mask);
  }

  function maskToBinary(mask) {
    return intToIPv4(mask)
      .split('.')
      .map(o => parseInt(o, 10).toString(2).padStart(8, '0'))
      .join('.');
  }

  function parseIPv4Input(raw) {
    const s = raw.trim();
    if (!s) return { error: 'Enter an IPv4 address' };
    let ipStr = s;
    let cidr = null;
    if (s.includes('/')) {
      const [a, b] = s.split('/');
      ipStr = a.trim();
      cidr = parseInt(b, 10);
      if (isNaN(cidr) || cidr < 0 || cidr > 32) return { error: 'Invalid CIDR prefix (0–32)' };
    }
    const ip = ipv4ToInt(ipStr);
    if (ip === null) return { error: 'Invalid IPv4 address' };
    return { ip, ipStr, cidr };
  }

  function getIpClass(firstOctet) {
    if (firstOctet >= 1 && firstOctet <= 126) return 'Class A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'Class B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'Class C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'Class D (Multicast)';
    if (firstOctet >= 240 && firstOctet <= 255) return 'Class E (Reserved)';
    return 'Reserved';
  }

  function getIpScope(ip, cidr) {
    const o1 = (ip >>> 24) & 255;
    const o2 = (ip >>> 16) & 255;
    if (o1 === 10) return 'Private (RFC 1918)';
    if (o1 === 172 && o2 >= 16 && o2 <= 31) return 'Private (RFC 1918)';
    if (o1 === 192 && o2 === 168) return 'Private (RFC 1918)';
    if (o1 === 127) return 'Loopback';
    if (o1 >= 224 && o1 <= 239) return 'Multicast';
    if (o1 === 169 && o2 === 254) return 'Link-local (APIPA)';
    if (o1 === 0) return 'Reserved / Current network';
    return 'Public';
  }

  function getIpType(ip) {
    const o1 = (ip >>> 24) & 255;
    if (o1 === 127) return 'Loopback';
    if (o1 >= 224 && o1 <= 239) return 'Multicast';
    if (o1 === 169 && ((ip >>> 16) & 255) === 254) return 'APIPA';
    return 'Unicast';
  }

  function calcIPv4(ip, cidr) {
    const mask = cidrToMask(cidr);
    const wildcard = (~mask) >>> 0;
    const network = (ip & mask) >>> 0;
    const broadcast = (network | wildcard) >>> 0;
    const total = cidr === 32 ? 1 : Math.pow(2, 32 - cidr);
    let firstHost = null;
    let lastHost = null;
    let usable = 0;
    if (cidr === 32) {
      firstHost = network;
      lastHost = network;
      usable = 1;
    } else if (cidr === 31) {
      firstHost = network;
      lastHost = broadcast;
      usable = 2;
    } else {
      firstHost = (network + 1) >>> 0;
      lastHost = (broadcast - 1) >>> 0;
      usable = total - 2;
    }
    const firstOctet = (ip >>> 24) & 255;
    return {
      ip: intToIPv4(ip),
      cidr,
      network: intToIPv4(network),
      broadcast: intToIPv4(broadcast),
      firstHost: intToIPv4(firstHost),
      lastHost: intToIPv4(lastHost),
      mask: maskToDotted(mask),
      wildcard: maskToDotted(wildcard),
      maskBinary: maskToBinary(mask),
      total: formatNumber(total),
      usable: formatNumber(usable),
      cidrNotation: intToIPv4(network) + '/' + cidr,
      ipClass: getIpClass(firstOctet),
      scope: getIpScope(ip, cidr),
      ipType: getIpType(ip),
      hex: '0x' + (ip >>> 0).toString(16).padStart(8, '0'),
      integer: String(ip >>> 0)
    };
  }

  function expandIPv6(addr) {
    let a = addr.trim().toLowerCase();
    if (a.includes('%')) a = a.split('%')[0];
    const dbl = a.indexOf('::');
    let parts;
    if (dbl !== -1) {
      const left = a.slice(0, dbl).split(':').filter(Boolean);
      const right = a.slice(dbl + 2).split(':').filter(Boolean);
      const missing = 8 - left.length - right.length;
      if (missing < 0) return null;
      parts = left.concat(Array(missing).fill('0'), right);
    } else {
      parts = a.split(':');
    }
    if (parts.length !== 8) return null;
    const groups = [];
    for (const p of parts) {
      if (!/^[0-9a-f]{0,4}$/i.test(p)) return null;
      groups.push(parseInt(p || '0', 16));
      if (groups[groups.length - 1] > 0xffff) return null;
    }
    return groups;
  }

  function groupsToBigInt(groups) {
    let n = 0n;
    for (const g of groups) {
      n = (n << 16n) + BigInt(g);
    }
    return n;
  }

  function bigIntToGroups(n) {
    const groups = [];
    for (let i = 7; i >= 0; i--) {
      groups.unshift(Number((n >> BigInt(i * 16)) & 0xffffn));
    }
    return groups;
  }

  function compressIPv6(groups) {
    const hex = groups.map(g => g.toString(16));
    let bestStart = -1;
    let bestLen = 0;
    for (let i = 0; i < 8; i++) {
      if (hex[i] !== '0') continue;
      let j = i;
      while (j < 8 && hex[j] === '0') j++;
      const len = j - i;
      if (len > bestLen) {
        bestLen = len;
        bestStart = i;
      }
      i = j;
    }
    if (bestLen < 2) return hex.join(':');
    const left = hex.slice(0, bestStart).join(':');
    const right = hex.slice(bestStart + bestLen).join(':');
    if (bestStart === 0 && bestStart + bestLen === 8) return '::';
    if (bestStart === 0) return '::' + right;
    if (bestStart + bestLen === 8) return left + '::';
    return left + '::' + right;
  }

  function expandedIPv6(groups) {
    return groups.map(g => g.toString(16).padStart(4, '0')).join(':');
  }

  function parseIPv6Input(raw) {
    const s = raw.trim();
    if (!s) return { error: 'Enter an IPv6 address' };
    let addr = s;
    let cidr = null;
    if (s.includes('/')) {
      const idx = s.lastIndexOf('/');
      addr = s.slice(0, idx).trim();
      cidr = parseInt(s.slice(idx + 1), 10);
      if (isNaN(cidr) || cidr < 0 || cidr > 128) return { error: 'Invalid prefix length (0–128)' };
    }
    const groups = expandIPv6(addr);
    if (!groups) return { error: 'Invalid IPv6 address' };
    return { groups, addr, cidr };
  }

  function getIPv6Type(groups) {
    const g0 = groups[0];
    if (g0 === 0 && groups[1] === 0) {
      if (groups[2] === 0 && groups[3] === 0 && groups[4] === 0 && groups[5] === 0) {
        if (groups[6] === 0 && groups[7] === 1) return 'Loopback (::1)';
        if (groups[6] === 0 && groups[7] === 0) return 'Unspecified (::)';
      }
      if (groups[2] === 0xff && groups[3] === 0xff) return 'IPv4-mapped';
      if (groups[2] === 0 && groups[3] === 0) return 'IPv4-compatible (deprecated)';
    }
    if ((g0 & 0xff00) === 0xff00) return 'Multicast';
    if ((g0 & 0xfe00) === 0xfc00) return 'Unique Local (ULA)';
    if ((g0 & 0xffc0) === 0xfe80) return 'Link-local';
    if (g0 === 0x2001 && groups[1] === 0x0db8) return 'Documentation';
    if ((g0 & 0xe000) === 0x2000) return 'Global Unicast';
    return 'Global / Other';
  }

  function calcIPv6(groups, cidr) {
    const ip = groupsToBigInt(groups);
    const maskBits = BigInt(cidr);
    const max128 = (1n << 128n) - 1n;
    const mask = cidr === 0 ? 0n : ((1n << maskBits) - 1n) << (128n - maskBits);
    const network = ip & mask;
    const hostMask = (~mask) & max128;
    const last = network | hostMask;
    const hostBits = 128n - maskBits;
    const total = hostBits === 0n ? 1n : (1n << hostBits);
    const netGroups = bigIntToGroups(network);
    const lastGroups = bigIntToGroups(last);
    return {
      expanded: expandedIPv6(groups),
      compressed: compressIPv6(groups),
      networkPrefix: compressIPv6(netGroups) + '/' + cidr,
      first: compressIPv6(netGroups),
      last: compressIPv6(lastGroups),
      total: formatNumber(total),
      type: getIPv6Type(groups),
      cidr
    };
  }

  function setResult(id, value, isError) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = value;
    el.classList.toggle('result-error', !!isError);
    el.classList.toggle('result-placeholder', value === '—' || value.startsWith('Enter'));
  }

  function showIPv4Error(msg) {
    if (ipv4Error) {
      ipv4Error.textContent = msg || '';
      ipv4Error.hidden = !msg;
    }
  }

  function showIPv6Error(msg) {
    if (ipv6Error) {
      ipv6Error.textContent = msg || '';
      ipv6Error.hidden = !msg;
    }
  }

  function updateIPv4() {
    const parsed = parseIPv4Input(ipv4Input.value);
    if (parsed.error) {
      showIPv4Error(parsed.error);
      clearIPv4Results();
      return;
    }
    let cidr = parsed.cidr;
    if (cidr === null) {
      cidr = parseInt(ipv4Cidr.value, 10);
    } else {
      ipv4Cidr.value = cidr;
      if (ipv4CidrSlider) ipv4CidrSlider.value = cidr;
    }
    const maskStr = ipv4MaskInput.value.trim();
    if (maskStr && parsed.cidr === null) {
      const maskInt = ipv4ToInt(maskStr);
      const fromMask = maskToCidr(maskInt);
      if (fromMask !== null) {
        cidr = fromMask;
        ipv4Cidr.value = cidr;
        if (ipv4CidrSlider) ipv4CidrSlider.value = cidr;
      }
    }
    const mask = cidrToMask(cidr);
    if (mask !== null) ipv4MaskInput.value = maskToDotted(mask);

    showIPv4Error('');
    const r = calcIPv4(parsed.ip, cidr);
    setResult('r-network', r.network);
    setResult('r-broadcast', r.broadcast);
    setResult('r-first', r.firstHost);
    setResult('r-last', r.lastHost);
    setResult('r-usable', r.usable);
    setResult('r-total', r.total);
    setResult('r-mask', r.mask);
    setResult('r-wildcard', r.wildcard);
    setResult('r-mask-binary', r.maskBinary);
    setResult('r-cidr', r.cidrNotation);
    setResult('r-class', r.ipClass);
    setResult('r-scope', r.scope);
    setResult('r-type', r.ipType);
    setResult('r-hex', r.hex);
    setResult('r-integer', r.integer);
    updateSplitSubnets(parsed.ip, cidr);
  }

  function clearIPv4Results() {
    [
      'r-network', 'r-broadcast', 'r-first', 'r-last', 'r-usable', 'r-total',
      'r-mask', 'r-wildcard', 'r-mask-binary', 'r-cidr', 'r-class', 'r-scope',
      'r-type', 'r-hex', 'r-integer'
    ].forEach(id => setResult(id, '—'));
    if (splitResults) splitResults.hidden = true;
  }

  function updateIPv6() {
    const parsed = parseIPv6Input(ipv6Input.value);
    if (parsed.error) {
      showIPv6Error(parsed.error);
      clearIPv6Results();
      return;
    }
    let cidr = parsed.cidr;
    if (cidr === null) cidr = parseInt(ipv6Cidr.value, 10);
    else {
      ipv6Cidr.value = cidr;
      if (ipv6CidrSlider) ipv6CidrSlider.value = cidr;
    }
    showIPv6Error('');
    const r = calcIPv6(parsed.groups, cidr);
    setResult('v6-expanded', r.expanded);
    setResult('v6-compressed', r.compressed);
    setResult('v6-prefix', r.networkPrefix);
    setResult('v6-first', r.first);
    setResult('v6-last', r.last);
    setResult('v6-total', r.total);
    setResult('v6-type', r.type);
  }

  function clearIPv6Results() {
    ['v6-expanded', 'v6-compressed', 'v6-prefix', 'v6-first', 'v6-last', 'v6-total', 'v6-type']
      .forEach(id => setResult(id, '—'));
  }

  function updateSplitSubnets(ip, parentCidr) {
    if (!splitPrefix || !splitBody || !splitResults) return;
    const newCidr = parseInt(splitPrefix.value, 10);
    if (isNaN(newCidr) || newCidr <= parentCidr || newCidr > 32) {
      splitResults.hidden = true;
      return;
    }
    const count = Math.pow(2, newCidr - parentCidr);
    if (count > 64) {
      splitBody.innerHTML = '<tr><td colspan="3">Too many subnets (max 64 shown). Use a smaller split.</td></tr>';
      splitResults.hidden = false;
      return;
    }
    const mask = cidrToMask(parentCidr);
    const network = (ip & mask) >>> 0;
    const blockSize = Math.pow(2, 32 - newCidr);
    let rows = '';
    for (let i = 0; i < count; i++) {
      const net = (network + i * blockSize) >>> 0;
      const bcast = (net + blockSize - 1) >>> 0;
      rows += '<tr><td><code>' + intToIPv4(net) + '/' + newCidr + '</code></td>' +
        '<td>' + intToIPv4(net) + '</td><td>' + intToIPv4(bcast) + '</td></tr>';
    }
    splitBody.innerHTML = rows;
    splitResults.hidden = false;
  }

  function syncCidrFromSlider(slider, select, maskInput) {
    if (!slider || !select) return;
    select.value = slider.value;
    if (maskInput && activeMode === 'ipv4') {
      const m = cidrToMask(parseInt(slider.value, 10));
      if (m !== null) maskInput.value = maskToDotted(m);
    }
    if (activeMode === 'ipv4') updateIPv4();
    else updateIPv6();
  }

  function applyPreset(cidr) {
    ipv4Cidr.value = cidr;
    if (ipv4CidrSlider) ipv4CidrSlider.value = cidr;
    const m = cidrToMask(cidr);
    if (m !== null) ipv4MaskInput.value = maskToDotted(m);
    updateIPv4();
  }

  function copyText(text, btn) {
    if (!text || text === '—') return;
    navigator.clipboard.writeText(text).then(() => {
      if (!btn) return;
      const icon = btn.querySelector('i');
      const orig = icon ? icon.className : '';
      if (icon) icon.className = 'fas fa-check';
      setTimeout(() => { if (icon) icon.className = orig || 'fas fa-copy'; }, 1200);
    }).catch(() => {});
  }

  function buildCidrTable() {
    if (!cidrTableBody) return;
    let html = '';
    CIDR_TABLE.slice()
      .reverse()
      .forEach(row => {
        html += '<tr class="cidr-example-row" data-cidr="' + row.cidr + '">' +
          '<td><code>/' + row.cidr + '</code></td>' +
          '<td><code>' + row.mask + '</code></td>' +
          '<td><code>' + row.wildcard + '</code></td>' +
          '<td>' + row.usable + '</td>' +
          '<td>' + row.total + '</td></tr>';
      });
    cidrTableBody.innerHTML = html;
    cidrTableBody.querySelectorAll('.cidr-example-row').forEach(tr => {
      tr.addEventListener('click', () => {
        const c = parseInt(tr.dataset.cidr, 10);
        if (activeMode !== 'ipv4') {
          modeTabs.forEach(t => {
            if (t.dataset.mode === 'ipv4') t.click();
          });
        }
        applyPreset(c);
        if (ipv4Input.value && !ipv4Input.value.includes('/')) {
          ipv4Input.value = ipv4Input.value.split('/')[0] + '/' + c;
        }
      });
    });
  }

  function initModeTabs() {
    modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.mode;
        activeMode = mode;
        modeTabs.forEach(t => t.classList.toggle('active', t === tab));
        if (ipv4Section) ipv4Section.classList.toggle('active', mode === 'ipv4');
        if (ipv6Section) ipv6Section.classList.toggle('active', mode === 'ipv6');
      });
    });
  }

  function initCopyButtons() {
    document.querySelectorAll('.btn-copy-result').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        if (target) copyText(target.textContent, btn);
      });
    });
  }

  function debounce(fn, ms) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  const debouncedV4 = debounce(updateIPv4, 120);
  const debouncedV6 = debounce(updateIPv6, 120);

  if (ipv4Input) {
    ipv4Input.addEventListener('input', debouncedV4);
    ipv4Input.value = '192.168.1.10/24';
  }
  if (ipv4Cidr) {
    ipv4Cidr.addEventListener('change', () => {
      if (ipv4CidrSlider) ipv4CidrSlider.value = ipv4Cidr.value;
      const m = cidrToMask(parseInt(ipv4Cidr.value, 10));
      if (m !== null) ipv4MaskInput.value = maskToDotted(m);
      updateIPv4();
    });
  }
  if (ipv4CidrSlider) {
    ipv4CidrSlider.addEventListener('input', () => {
      syncCidrFromSlider(ipv4CidrSlider, ipv4Cidr, ipv4MaskInput);
    });
  }
  if (ipv4MaskInput) {
    ipv4MaskInput.addEventListener('input', debouncedV4);
  }
  if (ipv6Input) {
    ipv6Input.addEventListener('input', debouncedV6);
    ipv6Input.value = '2001:db8::1/64';
  }
  if (ipv6Cidr) {
    ipv6Cidr.addEventListener('change', () => {
      if (ipv6CidrSlider) ipv6CidrSlider.value = ipv6Cidr.value;
      updateIPv6();
    });
  }
  if (ipv6CidrSlider) {
    ipv6CidrSlider.addEventListener('input', () => {
      syncCidrFromSlider(ipv6CidrSlider, ipv6Cidr, null);
    });
  }
  if (splitPrefix) {
    splitPrefix.addEventListener('change', updateIPv4);
    splitPrefix.addEventListener('input', updateIPv4);
  }

  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.addEventListener('click', () => applyPreset(parseInt(chip.dataset.cidr, 10)));
  });

  initModeTabs();
  initCopyButtons();
  buildCidrTable();
  updateIPv4();
  updateIPv6();
})();
