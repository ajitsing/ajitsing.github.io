(function () {
  'use strict';

  var FIRST_NAMES = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa', 'Anthony', 'Betty', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Aisha', 'Wei', 'Priya', 'Carlos', 'Fatima', 'Yuki', 'Omar', 'Sofia', 'Liam', 'Noah', 'Olivia', 'Emma', 'Ava', 'Ethan', 'Mia', 'Lucas'];
  var LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Patel', 'Kim', 'Chen', 'Singh', 'Kumar', 'Ali', 'Khan', 'Cohen', 'Murphy', 'Kowalski'];
  var EMAIL_DOMAINS = ['example.com', 'test.com', 'mail.com', 'demo.org', 'sample.net', 'inbox.io', 'company.co'];
  var STREETS = ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Pine St', 'Elm St', 'Washington Ave', 'Park Rd', 'Lake View Dr', 'Sunset Blvd', 'Hill St', 'River Rd', 'Church St', 'High St', 'Broadway', 'Meadow Ln', 'Willow Way', 'Birch Rd', 'Spring St', 'Franklin Ave'];
  var CITIES = ['Springfield', 'Riverside', 'Franklin', 'Greenville', 'Bristol', 'Clinton', 'Fairview', 'Salem', 'Madison', 'Georgetown', 'Arlington', 'Ashland', 'Burlington', 'Manchester', 'Oxford', 'Auburn', 'Dover', 'Hudson', 'Kingston', 'Milton'];
  var STATES = ['AL', 'AK', 'AZ', 'CA', 'CO', 'CT', 'FL', 'GA', 'HI', 'IL', 'IN', 'MA', 'MI', 'MN', 'NV', 'NJ', 'NY', 'NC', 'OH', 'OR', 'PA', 'TX', 'VA', 'WA', 'WI'];
  var COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'India', 'Japan', 'Brazil', 'Spain', 'Italy', 'Netherlands', 'Singapore', 'Mexico', 'Sweden'];
  var COMPANIES = ['Acme', 'Globex', 'Initech', 'Umbrella', 'Soylent', 'Hooli', 'Stark Industries', 'Wayne Enterprises', 'Wonka', 'Cyberdyne', 'Massive Dynamic', 'Pied Piper', 'Vandelay', 'Aperture', 'Gringotts'];
  var COMPANY_SUFFIX = ['Inc', 'LLC', 'Group', 'Labs', 'Systems', 'Solutions', 'Technologies', 'Co', 'Corp'];
  var JOB_TITLES = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UX Designer', 'DevOps Engineer', 'QA Engineer', 'Marketing Manager', 'Sales Representative', 'Account Executive', 'Project Manager', 'Business Analyst', 'Frontend Developer', 'Backend Developer', 'Data Scientist', 'HR Specialist', 'Support Engineer', 'CTO', 'CEO', 'Designer', 'Consultant'];
  var PRODUCTS = ['Wireless Mouse', 'Mechanical Keyboard', 'USB-C Hub', 'Laptop Stand', 'Noise-Cancelling Headphones', 'Webcam', 'Monitor', 'Desk Lamp', 'Office Chair', 'Standing Desk', 'Smartphone Case', 'Power Bank', 'Bluetooth Speaker', 'Smart Watch', 'Fitness Tracker', 'Water Bottle', 'Backpack', 'Notebook', 'Coffee Mug', 'Desk Organizer'];
  var CATEGORIES = ['Electronics', 'Accessories', 'Home', 'Office', 'Sports', 'Books', 'Clothing', 'Toys', 'Beauty', 'Grocery'];
  var COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Black', 'White', 'Gray', 'Pink', 'Teal', 'Navy', 'Maroon', 'Olive', 'Cyan'];
  var STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
  var LOREM = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'];
  var TLDS = ['com', 'io', 'org', 'net', 'dev', 'app', 'co'];

  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function pad(n, len) { var s = String(n); while (s.length < len) s = '0' + s; return s; }

  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '');
  }

  function hex(len) {
    var s = '';
    for (var i = 0; i < len; i++) s += '0123456789abcdef'[randInt(0, 15)];
    return s;
  }

  function uuid() {
    if (window.crypto && crypto.randomUUID) {
      try { return crypto.randomUUID(); } catch (e) {}
    }
    return hex(8) + '-' + hex(4) + '-4' + hex(3) + '-' + '89ab'[randInt(0, 3)] + hex(3) + '-' + hex(12);
  }

  function randomDate() {
    var start = new Date(2020, 0, 1).getTime();
    var end = Date.now();
    return new Date(start + Math.random() * (end - start));
  }

  var GENERATORS = {
    firstName: function () { return pick(FIRST_NAMES); },
    lastName: function () { return pick(LAST_NAMES); },
    fullName: function () { return pick(FIRST_NAMES) + ' ' + pick(LAST_NAMES); },
    email: function () { return slugify(pick(FIRST_NAMES)) + '.' + slugify(pick(LAST_NAMES)) + randInt(1, 99) + '@' + pick(EMAIL_DOMAINS); },
    username: function () { return slugify(pick(FIRST_NAMES)) + '_' + slugify(pick(LAST_NAMES)) + randInt(1, 999); },
    phone: function () { return '(' + randInt(200, 999) + ') ' + randInt(200, 999) + '-' + pad(randInt(0, 9999), 4); },
    streetAddress: function () { return randInt(1, 9999) + ' ' + pick(STREETS); },
    city: function () { return pick(CITIES); },
    state: function () { return pick(STATES); },
    country: function () { return pick(COUNTRIES); },
    zipCode: function () { return pad(randInt(1, 99999), 5); },
    company: function () { return pick(COMPANIES) + ' ' + pick(COMPANY_SUFFIX); },
    jobTitle: function () { return pick(JOB_TITLES); },
    productName: function () { return pick(PRODUCTS); },
    category: function () { return pick(CATEGORIES); },
    color: function () { return pick(COLORS); },
    status: function () { return pick(STATUSES); },
    boolean: function () { return Math.random() < 0.5; },
    integer: function () { return randInt(1, 1000); },
    price: function () { return parseFloat((Math.random() * 990 + 5).toFixed(2)); },
    uuid: function () { return uuid(); },
    ipAddress: function () { return randInt(1, 255) + '.' + randInt(0, 255) + '.' + randInt(0, 255) + '.' + randInt(1, 254); },
    url: function () { return 'https://' + pick(COMPANIES).toLowerCase().replace(/[^a-z]/g, '') + '.' + pick(TLDS); },
    date: function () { return randomDate().toISOString().slice(0, 10); },
    datetime: function () { return randomDate().toISOString().slice(0, 19).replace('T', ' '); },
    word: function () { return pick(LOREM); },
    sentence: function () {
      var n = randInt(5, 12), w = [];
      for (var i = 0; i < n; i++) w.push(pick(LOREM));
      w[0] = w[0].charAt(0).toUpperCase() + w[0].slice(1);
      return w.join(' ') + '.';
    }
  };

  var TYPE_OPTIONS = [
    { group: 'Identifiers', types: [['id', 'ID (auto-increment)'], ['uuid', 'UUID'], ['integer', 'Integer']] },
    { group: 'Person', types: [['firstName', 'First Name'], ['lastName', 'Last Name'], ['fullName', 'Full Name'], ['email', 'Email'], ['username', 'Username'], ['phone', 'Phone']] },
    { group: 'Location', types: [['streetAddress', 'Street Address'], ['city', 'City'], ['state', 'State'], ['country', 'Country'], ['zipCode', 'Zip Code'], ['ipAddress', 'IP Address']] },
    { group: 'Business', types: [['company', 'Company'], ['jobTitle', 'Job Title'], ['productName', 'Product Name'], ['category', 'Category'], ['price', 'Price'], ['status', 'Status']] },
    { group: 'Other', types: [['boolean', 'Boolean'], ['color', 'Color'], ['url', 'URL'], ['date', 'Date'], ['datetime', 'DateTime'], ['word', 'Word'], ['sentence', 'Lorem Sentence']] }
  ];

  var PRESETS = {
    users: { table: 'users', fields: [['id', 'id'], ['name', 'fullName'], ['email', 'email'], ['username', 'username'], ['phone', 'phone'], ['city', 'city']] },
    products: { table: 'products', fields: [['id', 'id'], ['name', 'productName'], ['price', 'price'], ['category', 'category'], ['sku', 'uuid'], ['in_stock', 'boolean']] },
    employees: { table: 'employees', fields: [['id', 'id'], ['name', 'fullName'], ['email', 'email'], ['job_title', 'jobTitle'], ['company', 'company'], ['hire_date', 'date']] },
    orders: { table: 'orders', fields: [['id', 'id'], ['customer', 'fullName'], ['product', 'productName'], ['amount', 'price'], ['status', 'status'], ['ordered_at', 'datetime']] }
  };

  var fieldsEl = document.getElementById('fdg-fields');
  var addFieldBtn = document.getElementById('fdg-add-field');
  var rowsInput = document.getElementById('fdg-rows');
  var rowsMinus = document.getElementById('fdg-rows-minus');
  var rowsPlus = document.getElementById('fdg-rows-plus');
  var tableRow = document.getElementById('fdg-table-row');
  var tableInput = document.getElementById('fdg-table');
  var generateBtn = document.getElementById('fdg-generate-btn');
  var copyBtn = document.getElementById('fdg-copy-btn');
  var downloadBtn = document.getElementById('fdg-download-btn');
  var clearBtn = document.getElementById('fdg-clear-btn');
  var outputEl = document.getElementById('fdg-output');
  var statsEl = document.getElementById('fdg-stats');
  var presetBtns = document.querySelectorAll('.fdg-preset-btn');
  var presetCards = document.querySelectorAll('.fdg-preset-card');
  var formatBtns = document.querySelectorAll('.fdg-format-btn');

  var currentFormat = 'json';
  var lastOutput = '';

  function buildTypeSelect(selected) {
    var sel = document.createElement('select');
    sel.className = 'fdg-field-type';
    TYPE_OPTIONS.forEach(function (grp) {
      var og = document.createElement('optgroup');
      og.label = grp.group;
      grp.types.forEach(function (t) {
        var opt = document.createElement('option');
        opt.value = t[0];
        opt.textContent = t[1];
        if (t[0] === selected) opt.selected = true;
        og.appendChild(opt);
      });
      sel.appendChild(og);
    });
    return sel;
  }

  function addFieldRow(name, type) {
    var row = document.createElement('div');
    row.className = 'fdg-field-row';

    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'fdg-field-name';
    nameInput.value = name || '';
    nameInput.placeholder = 'field_name';
    nameInput.spellcheck = false;
    nameInput.autocomplete = 'off';

    var typeSelect = buildTypeSelect(type || 'firstName');

    var removeBtn = document.createElement('button');
    removeBtn.className = 'fdg-field-remove';
    removeBtn.type = 'button';
    removeBtn.setAttribute('aria-label', 'Remove field');
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    removeBtn.addEventListener('click', function () {
      if (fieldsEl.children.length > 1) row.remove();
    });

    row.appendChild(nameInput);
    row.appendChild(typeSelect);
    row.appendChild(removeBtn);
    fieldsEl.appendChild(row);
  }

  function loadPreset(name) {
    var preset = PRESETS[name];
    if (!preset) return;
    fieldsEl.innerHTML = '';
    preset.fields.forEach(function (f) { addFieldRow(f[0], f[1]); });
    tableInput.value = preset.table;
  }

  function getSchema() {
    var rows = fieldsEl.querySelectorAll('.fdg-field-row');
    var schema = [];
    rows.forEach(function (r, i) {
      var name = r.querySelector('.fdg-field-name').value.trim() || ('field_' + (i + 1));
      var type = r.querySelector('.fdg-field-type').value;
      schema.push({ name: name, type: type });
    });
    return schema;
  }

  function buildDataset(schema, count) {
    var data = [];
    for (var i = 0; i < count; i++) {
      var row = {};
      for (var j = 0; j < schema.length; j++) {
        var f = schema[j];
        if (f.type === 'id') {
          row[f.name] = i + 1;
        } else {
          row[f.name] = GENERATORS[f.type] ? GENERATORS[f.type]() : '';
        }
      }
      data.push(row);
    }
    return data;
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function toJSON(data) {
    return JSON.stringify(data, null, 2);
  }

  function csvEscape(v) {
    var s = String(v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  function toCSV(data, schema) {
    var header = schema.map(function (f) { return csvEscape(f.name); }).join(',');
    var lines = data.map(function (row) {
      return schema.map(function (f) { return csvEscape(row[f.name]); }).join(',');
    });
    return header + '\n' + lines.join('\n');
  }

  function sqlValue(v) {
    if (typeof v === 'number') return String(v);
    if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
    return "'" + String(v).replace(/'/g, "''") + "'";
  }

  function toSQL(data, schema, table) {
    table = (table || 'data').trim() || 'data';
    var cols = schema.map(function (f) { return f.name; }).join(', ');
    return data.map(function (row) {
      var vals = schema.map(function (f) { return sqlValue(row[f.name]); }).join(', ');
      return 'INSERT INTO ' + table + ' (' + cols + ') VALUES (' + vals + ');';
    }).join('\n');
  }

  function highlightJSON(text) {
    return escapeHtml(text).replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false)\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g,
      function (m) {
        var cls = 'tok-num';
        if (/^"/.test(m)) {
          cls = /:$/.test(m) ? 'tok-key' : 'tok-str';
        } else if (/true|false/.test(m)) {
          cls = 'tok-bool';
        } else if (/null/.test(m)) {
          cls = 'tok-null';
        }
        return '<span class="' + cls + '">' + m + '</span>';
      }
    );
  }

  function highlightSQL(text) {
    return escapeHtml(text)
      .replace(/\b(INSERT INTO|VALUES|TRUE|FALSE)\b/g, '<span class="tok-kw">$1</span>')
      .replace(/'(?:[^'\\]|\\.|'')*'/g, '<span class="tok-str">$&</span>');
  }

  function render(text, format) {
    if (format === 'json') {
      outputEl.innerHTML = highlightJSON(text);
    } else if (format === 'sql') {
      outputEl.innerHTML = highlightSQL(text);
    } else {
      outputEl.textContent = text;
    }
  }

  function byteSize(str) {
    return new Blob([str]).size;
  }

  function humanSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function generate() {
    var schema = getSchema();
    var count = parseInt(rowsInput.value, 10);
    if (isNaN(count) || count < 1) count = 1;
    if (count > 1000) count = 1000;
    rowsInput.value = count;

    var data = buildDataset(schema, count);
    var text;
    if (currentFormat === 'csv') text = toCSV(data, schema);
    else if (currentFormat === 'sql') text = toSQL(data, schema, tableInput.value);
    else text = toJSON(data);

    lastOutput = text;
    render(text, currentFormat);

    statsEl.innerHTML =
      '<span class="stat-item"><span class="stat-label">Rows:</span> ' + count + '</span>' +
      '<span class="stat-item"><span class="stat-label">Fields:</span> ' + schema.length + '</span>' +
      '<span class="stat-item"><span class="stat-label">Format:</span> ' + currentFormat.toUpperCase() + '</span>' +
      '<span class="stat-item"><span class="stat-label">Size:</span> ' + humanSize(byteSize(text)) + '</span>';

    copyBtn.disabled = false;
    downloadBtn.disabled = false;
    clearBtn.disabled = false;

    if (typeof gtag === 'function') {
      gtag('event', 'generate', { 'event_category': 'Fake Data Generator', 'event_label': currentFormat });
    }
  }

  function clearOutput() {
    outputEl.innerHTML = '<div class="fdg-placeholder"><i class="fas fa-database"></i><span>Your fake data will appear here</span></div>';
    statsEl.innerHTML = '';
    lastOutput = '';
    copyBtn.disabled = true;
    downloadBtn.disabled = true;
    clearBtn.disabled = true;
  }

  function copyOutput() {
    if (!lastOutput) return;
    var done = function () {
      copyBtn.classList.add('copied');
      var orig = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(function () { copyBtn.classList.remove('copied'); copyBtn.innerHTML = orig; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lastOutput).then(done).catch(function () { fallbackCopy(lastOutput, done); });
    } else {
      fallbackCopy(lastOutput, done);
    }
    if (typeof gtag === 'function') {
      gtag('event', 'copy', { 'event_category': 'Fake Data Generator', 'event_label': currentFormat });
    }
  }

  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); if (cb) cb(); } catch (e) {}
    document.body.removeChild(ta);
  }

  function downloadOutput() {
    if (!lastOutput) return;
    var ext = currentFormat === 'json' ? 'json' : currentFormat === 'csv' ? 'csv' : 'sql';
    var mime = currentFormat === 'json' ? 'application/json' : currentFormat === 'csv' ? 'text/csv' : 'application/sql';
    var blob = new Blob([lastOutput], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'fake-data.' + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (typeof gtag === 'function') {
      gtag('event', 'download', { 'event_category': 'Fake Data Generator', 'event_label': ext });
    }
  }

  presetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      presetBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      loadPreset(btn.getAttribute('data-preset'));
      generate();
    });
  });

  presetCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var name = card.getAttribute('data-preset');
      presetBtns.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-preset') === name);
      });
      loadPreset(name);
      generate();
      document.querySelector('.fdg-output-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  formatBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      formatBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFormat = btn.getAttribute('data-format');
      tableRow.hidden = currentFormat !== 'sql';
      generate();
    });
  });

  addFieldBtn.addEventListener('click', function () { addFieldRow('field_' + (fieldsEl.children.length + 1), 'firstName'); });

  rowsMinus.addEventListener('click', function () {
    var v = parseInt(rowsInput.value, 10);
    if (v > 1) rowsInput.value = v - 1;
  });
  rowsPlus.addEventListener('click', function () {
    var v = parseInt(rowsInput.value, 10);
    if (v < 1000) rowsInput.value = v + 1;
  });
  rowsInput.addEventListener('change', function () {
    var v = parseInt(rowsInput.value, 10);
    if (isNaN(v) || v < 1) rowsInput.value = 1;
    if (v > 1000) rowsInput.value = 1000;
  });

  generateBtn.addEventListener('click', generate);
  copyBtn.addEventListener('click', copyOutput);
  downloadBtn.addEventListener('click', downloadOutput);
  clearBtn.addEventListener('click', clearOutput);

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      generate();
    }
  });

  loadPreset('users');
  generate();
})();
