/**
 * SQL Formatter Tool
 * Client-side SQL formatting, beautifying, and minifying
 * Supports MySQL, PostgreSQL, SQL Server, Oracle, and standard SQL
 */

(function () {
  'use strict';

  // =========================================================================
  // SQL Keywords Database
  // =========================================================================

  const MAJOR_KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
    'FULL JOIN', 'FULL OUTER JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN',
    'CROSS JOIN', 'NATURAL JOIN', 'ON', 'USING', 'GROUP BY', 'ORDER BY',
    'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
    'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE',
    'ALTER TABLE', 'DROP TABLE', 'CREATE INDEX', 'DROP INDEX', 'CREATE VIEW',
    'CREATE DATABASE', 'DROP DATABASE', 'TRUNCATE TABLE', 'WITH', 'AS',
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'IF', 'BEGIN', 'COMMIT',
    'ROLLBACK', 'FETCH', 'RETURNING', 'INTO', 'MERGE', 'MATCHED',
    'INSERT', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TRUNCATE'
  ];

  const NEWLINE_KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING',
    'LIMIT', 'OFFSET', 'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
    'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
    'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN',
    'FULL OUTER JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN',
    'CROSS JOIN', 'NATURAL JOIN', 'JOIN', 'ON',
    'RETURNING', 'FETCH', 'WITH', 'INTO', 'MERGE',
    'WHEN', 'THEN', 'ELSE', 'END', 'AND', 'OR'
  ];

  const ALL_KEYWORDS = [
    ...MAJOR_KEYWORDS,
    'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'ILIKE',
    'IS', 'NULL', 'IS NOT', 'IS NULL', 'IS NOT NULL', 'TRUE', 'FALSE',
    'ASC', 'DESC', 'DISTINCT', 'ALL', 'ANY', 'SOME', 'TOP',
    'AS', 'ON', 'USING', 'NATURAL', 'OUTER', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS',
    'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT', 'UNIQUE',
    'INDEX', 'DEFAULT', 'CHECK', 'NOT NULL', 'AUTO_INCREMENT', 'SERIAL',
    'CASCADE', 'RESTRICT', 'NO ACTION', 'SET NULL', 'SET DEFAULT',
    'INT', 'INTEGER', 'BIGINT', 'SMALLINT', 'TINYINT', 'FLOAT', 'DOUBLE',
    'DECIMAL', 'NUMERIC', 'CHAR', 'VARCHAR', 'TEXT', 'BLOB', 'DATE',
    'TIME', 'TIMESTAMP', 'DATETIME', 'BOOLEAN', 'BIT', 'BINARY',
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'NULLIF',
    'CAST', 'CONVERT', 'SUBSTRING', 'TRIM', 'UPPER', 'LOWER',
    'CONCAT', 'LENGTH', 'REPLACE', 'ROUND', 'FLOOR', 'CEIL',
    'NOW', 'CURRENT_TIMESTAMP', 'CURRENT_DATE', 'CURRENT_TIME',
    'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'NTILE', 'LAG', 'LEAD',
    'FIRST_VALUE', 'LAST_VALUE', 'OVER', 'PARTITION BY', 'ROWS',
    'RANGE', 'UNBOUNDED', 'PRECEDING', 'FOLLOWING', 'CURRENT ROW',
    'EXPLAIN', 'ANALYZE', 'VERBOSE', 'FORMAT', 'LATERAL',
    'RECURSIVE', 'MATERIALIZED', 'TEMPORARY', 'TEMP', 'IF EXISTS',
    'IF NOT EXISTS', 'GRANT', 'REVOKE', 'DENY', 'EXECUTE', 'PROCEDURE',
    'FUNCTION', 'TRIGGER', 'VIEW', 'TABLE', 'DATABASE', 'SCHEMA',
    'ADD', 'COLUMN', 'MODIFY', 'RENAME', 'TO', 'ENABLE', 'DISABLE',
    'WINDOW', 'GROUPING SETS', 'CUBE', 'ROLLUP', 'PIVOT', 'UNPIVOT'
  ];

  const keywordSet = new Set(ALL_KEYWORDS.map(k => k.toUpperCase()));

  // =========================================================================
  // Tokenizer
  // =========================================================================

  function tokenize(sql) {
    const tokens = [];
    let i = 0;
    const len = sql.length;

    while (i < len) {
      // Skip whitespace
      if (/\s/.test(sql[i])) {
        let ws = '';
        while (i < len && /\s/.test(sql[i])) {
          ws += sql[i];
          i++;
        }
        tokens.push({ type: 'whitespace', value: ws });
        continue;
      }

      // Single-line comment --
      if (sql[i] === '-' && sql[i + 1] === '-') {
        let comment = '';
        while (i < len && sql[i] !== '\n') {
          comment += sql[i];
          i++;
        }
        tokens.push({ type: 'comment', value: comment });
        continue;
      }

      // Multi-line comment /* */
      if (sql[i] === '/' && sql[i + 1] === '*') {
        let comment = '/*';
        i += 2;
        while (i < len && !(sql[i] === '*' && sql[i + 1] === '/')) {
          comment += sql[i];
          i++;
        }
        if (i < len) {
          comment += '*/';
          i += 2;
        }
        tokens.push({ type: 'comment', value: comment });
        continue;
      }

      // Single-quoted string
      if (sql[i] === "'") {
        let str = "'";
        i++;
        while (i < len) {
          if (sql[i] === "'" && sql[i + 1] === "'") {
            str += "''";
            i += 2;
          } else if (sql[i] === "'") {
            str += "'";
            i++;
            break;
          } else {
            str += sql[i];
            i++;
          }
        }
        tokens.push({ type: 'string', value: str });
        continue;
      }

      // Double-quoted identifier
      if (sql[i] === '"') {
        let str = '"';
        i++;
        while (i < len && sql[i] !== '"') {
          str += sql[i];
          i++;
        }
        if (i < len) {
          str += '"';
          i++;
        }
        tokens.push({ type: 'identifier', value: str });
        continue;
      }

      // Backtick-quoted identifier (MySQL)
      if (sql[i] === '`') {
        let str = '`';
        i++;
        while (i < len && sql[i] !== '`') {
          str += sql[i];
          i++;
        }
        if (i < len) {
          str += '`';
          i++;
        }
        tokens.push({ type: 'identifier', value: str });
        continue;
      }

      // Square bracket identifier (SQL Server)
      if (sql[i] === '[') {
        let str = '[';
        i++;
        while (i < len && sql[i] !== ']') {
          str += sql[i];
          i++;
        }
        if (i < len) {
          str += ']';
          i++;
        }
        tokens.push({ type: 'identifier', value: str });
        continue;
      }

      // Numbers
      if (/[0-9]/.test(sql[i]) || (sql[i] === '.' && /[0-9]/.test(sql[i + 1]))) {
        let num = '';
        while (i < len && /[0-9.eE\-+]/.test(sql[i])) {
          num += sql[i];
          i++;
        }
        tokens.push({ type: 'number', value: num });
        continue;
      }

      // Parentheses
      if (sql[i] === '(') {
        tokens.push({ type: 'open_paren', value: '(' });
        i++;
        continue;
      }
      if (sql[i] === ')') {
        tokens.push({ type: 'close_paren', value: ')' });
        i++;
        continue;
      }

      // Operators and punctuation
      if (sql[i] === ',' || sql[i] === ';') {
        tokens.push({ type: 'punctuation', value: sql[i] });
        i++;
        continue;
      }

      // Multi-char operators
      const twoChar = sql.substring(i, i + 2);
      if (['<>', '!=', '>=', '<=', '::', '||', '&&', '>>',  '<<'].includes(twoChar)) {
        tokens.push({ type: 'operator', value: twoChar });
        i += 2;
        continue;
      }

      if (['+', '-', '*', '/', '%', '=', '<', '>', '&', '|', '^', '~', '!', '.'].includes(sql[i])) {
        tokens.push({ type: 'operator', value: sql[i] });
        i++;
        continue;
      }

      // Words (keywords, identifiers, etc.)
      if (/[a-zA-Z_@#$]/.test(sql[i])) {
        let word = '';
        while (i < len && /[a-zA-Z0-9_@#$]/.test(sql[i])) {
          word += sql[i];
          i++;
        }
        const upper = word.toUpperCase();
        if (keywordSet.has(upper)) {
          tokens.push({ type: 'keyword', value: word, upper: upper });
        } else {
          tokens.push({ type: 'word', value: word });
        }
        continue;
      }

      // Unknown character
      tokens.push({ type: 'unknown', value: sql[i] });
      i++;
    }

    return tokens.filter(t => t.type !== 'whitespace');
  }

  // =========================================================================
  // Formatter
  // =========================================================================

  function formatSQL(sql, options = {}) {
    const indent = options.indentSize || 2;
    const uppercase = options.uppercaseKeywords !== false;
    const indentStr = ' '.repeat(indent);

    const tokens = tokenize(sql);
    if (tokens.length === 0) return '';

    let result = '';
    let currentIndent = 0;
    let newline = true;
    let prevToken = null;
    let parenDepth = 0;
    let inlineParenDepth = -1;
    let afterSelect = false;

    // Multi-word keyword matching
    const multiWordKeywords = [
      'INSERT INTO', 'DELETE FROM', 'GROUP BY', 'ORDER BY', 'PARTITION BY',
      'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN',
      'NATURAL JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'FULL OUTER JOIN',
      'UNION ALL', 'IS NOT NULL', 'IS NULL', 'IS NOT', 'NOT NULL',
      'IF EXISTS', 'IF NOT EXISTS', 'CREATE TABLE', 'ALTER TABLE',
      'DROP TABLE', 'CREATE INDEX', 'DROP INDEX', 'CREATE VIEW',
      'CREATE DATABASE', 'DROP DATABASE', 'TRUNCATE TABLE', 'SET DEFAULT',
      'SET NULL', 'NO ACTION', 'CURRENT ROW', 'GROUPING SETS',
      'NOT IN', 'NOT EXISTS', 'NOT BETWEEN', 'NOT LIKE'
    ];

    // Merge multi-word keywords
    const merged = [];
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'keyword') {
        let matched = false;
        // Try 4-word, then 3-word, then 2-word combinations
        for (let len = 4; len >= 2; len--) {
          if (i + len - 1 < tokens.length) {
            const combo = [];
            let valid = true;
            for (let j = 0; j < len; j++) {
              if (tokens[i + j].type !== 'keyword' && tokens[i + j].type !== 'word') {
                valid = false;
                break;
              }
              combo.push(tokens[i + j].value.toUpperCase());
            }
            if (valid) {
              const comboStr = combo.join(' ');
              if (multiWordKeywords.includes(comboStr)) {
                merged.push({ type: 'keyword', value: combo.join(' '), upper: comboStr });
                i += len - 1;
                matched = true;
                break;
              }
            }
          }
        }
        if (!matched) {
          merged.push(tokens[i]);
        }
      } else {
        merged.push(tokens[i]);
      }
    }

    const newlineKeywordSet = new Set(NEWLINE_KEYWORDS.map(k => k.toUpperCase()));

    function addNewline() {
      result = result.trimEnd();
      result += '\n' + indentStr.repeat(currentIndent);
      newline = true;
    }

    function addSpace() {
      if (!newline && result.length > 0 && !result.endsWith(' ') && !result.endsWith('\n') && !result.endsWith('(') && !result.endsWith('.') && !result.endsWith('::')) {
        result += ' ';
      }
    }

    for (let i = 0; i < merged.length; i++) {
      const token = merged[i];
      const nextToken = merged[i + 1] || null;
      const tokenUpper = token.upper || token.value.toUpperCase();

      if (token.type === 'comment') {
        addSpace();
        result += token.value;
        addNewline();
        prevToken = token;
        continue;
      }

      if (token.type === 'keyword') {
        const kw = tokenUpper;

        // Major clause keywords get newline
        if (['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING',
          'LIMIT', 'OFFSET', 'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
          'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
          'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'CREATE INDEX',
          'CREATE VIEW', 'CREATE DATABASE', 'DROP DATABASE', 'TRUNCATE TABLE',
          'WITH', 'RETURNING', 'FETCH', 'MERGE', 'INTO'
        ].includes(kw) && parenDepth === 0) {

          // Top-level keywords at indent 0
          if (['SELECT', 'INSERT INTO', 'UPDATE', 'DELETE FROM', 'CREATE TABLE',
            'ALTER TABLE', 'DROP TABLE', 'CREATE INDEX', 'CREATE VIEW',
            'CREATE DATABASE', 'DROP DATABASE', 'TRUNCATE TABLE',
            'WITH', 'MERGE'].includes(kw)) {
            currentIndent = 0;
          }

          if (kw === 'SELECT') afterSelect = true;
          else afterSelect = false;

          addNewline();
          result += uppercase ? kw : token.value;
          currentIndent = 1;
          newline = false;

          // Special: VALUES stays inline
          if (kw === 'VALUES') {
            addSpace();
          } else {
            addNewline();
          }
          prevToken = token;
          continue;
        }

        // JOIN keywords
        if (['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN',
          'FULL OUTER JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN',
          'CROSS JOIN', 'NATURAL JOIN', 'JOIN'
        ].includes(kw) && parenDepth === 0) {
          currentIndent = 1;
          addNewline();
          result += uppercase ? kw : token.value;
          newline = false;
          prevToken = token;
          continue;
        }

        // ON keyword
        if (kw === 'ON' && parenDepth === 0) {
          addSpace();
          result += uppercase ? 'ON' : token.value;
          newline = false;
          prevToken = token;
          continue;
        }

        // AND/OR at top level
        if ((kw === 'AND' || kw === 'OR') && parenDepth === 0) {
          currentIndent = 1;
          addNewline();
          result += uppercase ? kw : token.value;
          newline = false;
          prevToken = token;
          continue;
        }

        // CASE / WHEN / THEN / ELSE / END
        if (kw === 'CASE') {
          addSpace();
          result += uppercase ? 'CASE' : token.value;
          currentIndent++;
          newline = false;
          prevToken = token;
          continue;
        }
        if (kw === 'WHEN' || kw === 'ELSE') {
          addNewline();
          result += uppercase ? kw : token.value;
          newline = false;
          prevToken = token;
          continue;
        }
        if (kw === 'THEN') {
          addSpace();
          result += uppercase ? 'THEN' : token.value;
          newline = false;
          prevToken = token;
          continue;
        }
        if (kw === 'END') {
          currentIndent = Math.max(0, currentIndent - 1);
          addNewline();
          result += uppercase ? 'END' : token.value;
          newline = false;
          prevToken = token;
          continue;
        }

        // Regular keyword
        addSpace();
        result += uppercase ? kw : token.value;
        newline = false;
        prevToken = token;
        continue;
      }

      // Open parenthesis
      if (token.type === 'open_paren') {
        // Check if this is a function call (prev token was a word/keyword)
        const isFunction = prevToken && (prevToken.type === 'keyword' || prevToken.type === 'word');

        if (isFunction) {
          result += '(';
        } else {
          addSpace();
          result += '(';
        }
        parenDepth++;
        newline = false;
        prevToken = token;
        continue;
      }

      // Close parenthesis
      if (token.type === 'close_paren') {
        parenDepth = Math.max(0, parenDepth - 1);
        result += ')';
        newline = false;
        prevToken = token;
        continue;
      }

      // Comma
      if (token.type === 'punctuation' && token.value === ',') {
        result += ',';
        if (parenDepth === 0) {
          addNewline();
        } else {
          result += ' ';
        }
        newline = false;
        prevToken = token;
        continue;
      }

      // Semicolon
      if (token.type === 'punctuation' && token.value === ';') {
        result += ';';
        currentIndent = 0;
        result += '\n';
        newline = true;
        prevToken = token;
        continue;
      }

      // Operators
      if (token.type === 'operator') {
        if (token.value === '.') {
          result += '.';
        } else if (token.value === '::') {
          result += '::';
        } else {
          addSpace();
          result += token.value;
        }
        newline = false;
        prevToken = token;
        continue;
      }

      // Default: strings, numbers, words, identifiers, etc.
      addSpace();
      result += token.value;
      newline = false;
      prevToken = token;
    }

    // Clean up: remove extra blank lines, trim
    result = result
      .split('\n')
      .map(line => line.trimEnd())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return result;
  }

  // =========================================================================
  // Minifier
  // =========================================================================

  function minifySQL(sql) {
    const tokens = tokenize(sql);
    let result = '';
    let prevToken = null;

    for (const token of tokens) {
      if (token.type === 'comment') continue;

      if (token.type === 'open_paren') {
        // No space before ( if preceded by word/keyword (function call)
        const isFunction = prevToken && (prevToken.type === 'keyword' || prevToken.type === 'word');
        if (!isFunction && prevToken) {
          result += ' ';
        }
        result += '(';
        prevToken = token;
        continue;
      }

      if (token.type === 'close_paren') {
        result += ')';
        prevToken = token;
        continue;
      }

      if (token.type === 'punctuation') {
        if (token.value === ',') {
          result += ', ';
        } else {
          result += token.value + ' ';
        }
        prevToken = token;
        continue;
      }

      if (token.type === 'operator') {
        if (token.value === '.' || token.value === '::') {
          result += token.value;
        } else {
          result += ' ' + token.value + ' ';
        }
        prevToken = token;
        continue;
      }

      // Default
      if (prevToken && !['open_paren'].includes(prevToken.type) &&
        !(prevToken.type === 'operator' && (prevToken.value === '.' || prevToken.value === '::'))) {
        if (result.length > 0 && !result.endsWith(' ') && !result.endsWith('(') && !result.endsWith('\n')) {
          result += ' ';
        }
      }
      result += token.type === 'keyword' ? token.value.toUpperCase() : token.value;
      prevToken = token;
    }

    return result.replace(/\s+/g, ' ').trim();
  }

  // =========================================================================
  // Syntax Highlighting
  // =========================================================================

  function highlightSQL(sql) {
    const tokens = tokenize(sql);
    let html = '';

    // Rebuild including whitespace from original
    const allTokens = [];
    let pos = 0;
    const fullTokens = tokenizeWithWhitespace(sql);

    for (const token of fullTokens) {
      const escaped = escapeHtml(token.value);
      switch (token.type) {
        case 'keyword':
          html += `<span class="sql-keyword">${escaped}</span>`;
          break;
        case 'string':
          html += `<span class="sql-string">${escaped}</span>`;
          break;
        case 'number':
          html += `<span class="sql-number">${escaped}</span>`;
          break;
        case 'comment':
          html += `<span class="sql-comment">${escaped}</span>`;
          break;
        case 'identifier':
          html += `<span class="sql-identifier">${escaped}</span>`;
          break;
        case 'operator':
          html += `<span class="sql-operator">${escaped}</span>`;
          break;
        case 'open_paren':
        case 'close_paren':
          html += `<span class="sql-paren">${escaped}</span>`;
          break;
        case 'punctuation':
          html += `<span class="sql-punctuation">${escaped}</span>`;
          break;
        case 'word':
          html += `<span class="sql-word">${escaped}</span>`;
          break;
        default:
          html += escaped;
      }
    }

    return html;
  }

  function tokenizeWithWhitespace(sql) {
    const tokens = [];
    let i = 0;
    const len = sql.length;

    while (i < len) {
      // Whitespace
      if (/\s/.test(sql[i])) {
        let ws = '';
        while (i < len && /\s/.test(sql[i])) {
          ws += sql[i];
          i++;
        }
        tokens.push({ type: 'whitespace', value: ws });
        continue;
      }

      // Single-line comment --
      if (sql[i] === '-' && sql[i + 1] === '-') {
        let comment = '';
        while (i < len && sql[i] !== '\n') {
          comment += sql[i];
          i++;
        }
        tokens.push({ type: 'comment', value: comment });
        continue;
      }

      // Multi-line comment /* */
      if (sql[i] === '/' && sql[i + 1] === '*') {
        let comment = '/*';
        i += 2;
        while (i < len && !(sql[i] === '*' && sql[i + 1] === '/')) {
          comment += sql[i];
          i++;
        }
        if (i < len) {
          comment += '*/';
          i += 2;
        }
        tokens.push({ type: 'comment', value: comment });
        continue;
      }

      // Single-quoted string
      if (sql[i] === "'") {
        let str = "'";
        i++;
        while (i < len) {
          if (sql[i] === "'" && sql[i + 1] === "'") {
            str += "''";
            i += 2;
          } else if (sql[i] === "'") {
            str += "'";
            i++;
            break;
          } else {
            str += sql[i];
            i++;
          }
        }
        tokens.push({ type: 'string', value: str });
        continue;
      }

      // Double-quoted identifier
      if (sql[i] === '"') {
        let str = '"';
        i++;
        while (i < len && sql[i] !== '"') {
          str += sql[i];
          i++;
        }
        if (i < len) {
          str += '"';
          i++;
        }
        tokens.push({ type: 'identifier', value: str });
        continue;
      }

      // Backtick identifier
      if (sql[i] === '`') {
        let str = '`';
        i++;
        while (i < len && sql[i] !== '`') {
          str += sql[i];
          i++;
        }
        if (i < len) {
          str += '`';
          i++;
        }
        tokens.push({ type: 'identifier', value: str });
        continue;
      }

      // Square bracket identifier
      if (sql[i] === '[') {
        let str = '[';
        i++;
        while (i < len && sql[i] !== ']') {
          str += sql[i];
          i++;
        }
        if (i < len) {
          str += ']';
          i++;
        }
        tokens.push({ type: 'identifier', value: str });
        continue;
      }

      // Numbers
      if (/[0-9]/.test(sql[i]) || (sql[i] === '.' && /[0-9]/.test(sql[i + 1]))) {
        let num = '';
        while (i < len && /[0-9.eE\-+]/.test(sql[i])) {
          num += sql[i];
          i++;
        }
        tokens.push({ type: 'number', value: num });
        continue;
      }

      // Parentheses
      if (sql[i] === '(') {
        tokens.push({ type: 'open_paren', value: '(' });
        i++;
        continue;
      }
      if (sql[i] === ')') {
        tokens.push({ type: 'close_paren', value: ')' });
        i++;
        continue;
      }

      // Punctuation
      if (sql[i] === ',' || sql[i] === ';') {
        tokens.push({ type: 'punctuation', value: sql[i] });
        i++;
        continue;
      }

      // Multi-char operators
      const twoChar = sql.substring(i, i + 2);
      if (['<>', '!=', '>=', '<=', '::', '||', '&&', '>>', '<<'].includes(twoChar)) {
        tokens.push({ type: 'operator', value: twoChar });
        i += 2;
        continue;
      }

      if (['+', '-', '*', '/', '%', '=', '<', '>', '&', '|', '^', '~', '!', '.'].includes(sql[i])) {
        tokens.push({ type: 'operator', value: sql[i] });
        i++;
        continue;
      }

      // Words
      if (/[a-zA-Z_@#$]/.test(sql[i])) {
        let word = '';
        while (i < len && /[a-zA-Z0-9_@#$]/.test(sql[i])) {
          word += sql[i];
          i++;
        }
        const upper = word.toUpperCase();
        if (keywordSet.has(upper)) {
          tokens.push({ type: 'keyword', value: word, upper: upper });
        } else {
          tokens.push({ type: 'word', value: word });
        }
        continue;
      }

      tokens.push({ type: 'unknown', value: sql[i] });
      i++;
    }

    return tokens;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // Line Numbers
  // =========================================================================

  function generateLineNumbers(text, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const lines = text.split('\n');
    container.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('\n');
  }

  // =========================================================================
  // UI Controller
  // =========================================================================

  function init() {
    const sqlInput = document.getElementById('sql-input');
    const sqlOutput = document.getElementById('sql-output');
    const formatBtn = document.getElementById('format-btn');
    const minifyBtn = document.getElementById('minify-btn');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    const indentSelect = document.getElementById('indent-select');
    const uppercaseToggle = document.getElementById('uppercase-toggle');
    const charCount = document.getElementById('char-count');
    const resultSection = document.getElementById('result-section');
    const resultCard = document.getElementById('result-card');
    const resultIcon = document.getElementById('result-icon');
    const resultMessage = document.getElementById('result-message');
    const inputLineNumbers = document.getElementById('input-line-numbers');
    const outputLineNumbers = document.getElementById('output-line-numbers');

    // Track current formatted SQL for copy
    let currentFormattedSQL = '';

    // Update line numbers on input
    function updateInputLineNumbers() {
      generateLineNumbers(sqlInput.value, 'input-line-numbers');
    }

    function updateOutputLineNumbers(text) {
      generateLineNumbers(text, 'output-line-numbers');
    }

    // Sync scroll - input
    sqlInput.addEventListener('scroll', function () {
      if (inputLineNumbers) {
        inputLineNumbers.scrollTop = sqlInput.scrollTop;
      }
    });

    // Sync scroll - output
    sqlOutput.addEventListener('scroll', function () {
      if (outputLineNumbers) {
        outputLineNumbers.scrollTop = sqlOutput.scrollTop;
      }
    });

    // Input changes
    sqlInput.addEventListener('input', function () {
      updateInputLineNumbers();
      updateCharCount();
      // Hide result when input changes
      if (resultSection) resultSection.classList.add('hidden');
    });

    // Tab key support
    sqlInput.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const spaces = '  ';
        this.value = this.value.substring(0, start) + spaces + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + spaces.length;
        updateInputLineNumbers();
      }
      // Ctrl/Cmd + Enter to format
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        doFormat();
      }
    });

    function updateCharCount() {
      if (charCount) {
        const len = sqlInput.value.length;
        charCount.textContent = len > 0 ? `${len} chars` : '';
      }
    }

    function showResult(type, message) {
      if (!resultSection || !resultCard) return;
      resultSection.classList.remove('hidden');
      resultCard.className = 'result-card ' + type;
      resultIcon.innerHTML = type === 'success'
        ? '<i class="fas fa-check-circle"></i>'
        : '<i class="fas fa-exclamation-triangle"></i>';
      resultMessage.textContent = message;
    }

    function doFormat() {
      const sql = sqlInput.value.trim();
      if (!sql) {
        showResult('error', 'Please enter SQL to format');
        trackEvent('format_empty');
        return;
      }

      const indentSize = parseInt(indentSelect ? indentSelect.value : 2, 10);
      const uppercaseKeywords = uppercaseToggle ? uppercaseToggle.checked : true;

      try {
        const formatted = formatSQL(sql, { indentSize, uppercaseKeywords });
        currentFormattedSQL = formatted;
        sqlOutput.innerHTML = highlightSQL(formatted);
        updateOutputLineNumbers(formatted);
        showResult('success', 'SQL formatted successfully');
        trackEvent('format_sql', { chars: sql.length, indent: indentSize, uppercase: uppercaseKeywords });
      } catch (e) {
        showResult('error', 'Error formatting SQL: ' + e.message);
        trackEvent('format_error', { error: e.message });
      }
    }

    function doMinify() {
      const sql = sqlInput.value.trim();
      if (!sql) {
        showResult('error', 'Please enter SQL to minify');
        trackEvent('minify_empty');
        return;
      }

      try {
        const minified = minifySQL(sql);
        currentFormattedSQL = minified;
        sqlOutput.innerHTML = highlightSQL(minified);
        updateOutputLineNumbers(minified);
        showResult('success', 'SQL minified successfully (' + minified.length + ' chars)');
        trackEvent('minify_sql', { original: sql.length, minified: minified.length });
      } catch (e) {
        showResult('error', 'Error minifying SQL: ' + e.message);
        trackEvent('minify_error', { error: e.message });
      }
    }

    function doCopy() {
      const textToCopy = currentFormattedSQL || sqlInput.value;
      if (!textToCopy.trim()) {
        showResult('error', 'Nothing to copy');
        return;
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');
        trackEvent('copy_sql', { chars: textToCopy.length });
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    }

    function doClear() {
      sqlInput.value = '';
      sqlOutput.innerHTML = '<span class="output-placeholder">Formatted SQL will appear here</span>';
      currentFormattedSQL = '';
      updateInputLineNumbers();
      updateOutputLineNumbers('');
      if (resultSection) resultSection.classList.add('hidden');
      updateCharCount();
      sqlInput.focus();
      trackEvent('clear_sql');
    }

    // Event listeners
    if (formatBtn) formatBtn.addEventListener('click', doFormat);
    if (minifyBtn) minifyBtn.addEventListener('click', doMinify);
    if (copyBtn) copyBtn.addEventListener('click', doCopy);
    if (clearBtn) clearBtn.addEventListener('click', doClear);

    // Example queries
    document.querySelectorAll('.example-row[data-sql]').forEach(row => {
      row.addEventListener('click', function () {
        const sql = this.getAttribute('data-sql');
        if (sql) {
          sqlInput.value = sql;
          updateInputLineNumbers();
          updateCharCount();
          doFormat();
          // Scroll to top
          document.querySelector('.sql-formatter-main').scrollIntoView({ behavior: 'smooth' });
          trackEvent('example_click', { example: sql.substring(0, 50) });
        }
      });
    });

    // URL parameter support
    const params = new URLSearchParams(window.location.search);
    const urlSQL = params.get('sql') || params.get('q');
    if (urlSQL) {
      sqlInput.value = decodeURIComponent(urlSQL);
      updateInputLineNumbers();
      updateCharCount();
      doFormat();
      trackEvent('url_param_format');
    }

    // =========================================================================
    // Panel Resizer
    // =========================================================================

    (function initResizer() {
      const panelResizer = document.getElementById('panel-resizer');
      const editorPanels = document.getElementById('editor-panels');
      const inputPanel = document.getElementById('input-panel');
      const outputPanel = document.getElementById('output-panel');

      if (!panelResizer || !editorPanels || !inputPanel || !outputPanel) return;

      let isResizing = false;
      let startX = 0;
      let startInputWidth = 0;
      let startOutputWidth = 0;

      function onMouseDown(e) {
        isResizing = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX);
        startInputWidth = inputPanel.getBoundingClientRect().width;
        startOutputWidth = outputPanel.getBoundingClientRect().width;
        document.body.classList.add('resizing');
        panelResizer.classList.add('dragging');
        e.preventDefault();
      }

      function onMouseMove(e) {
        if (!isResizing) return;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const deltaX = clientX - startX;
        const resizerWidth = panelResizer.getBoundingClientRect().width;
        const containerWidth = editorPanels.getBoundingClientRect().width - resizerWidth;
        let newInputWidth = startInputWidth + deltaX;
        let newOutputWidth = startOutputWidth - deltaX;
        const minWidth = 200;

        if (newInputWidth < minWidth) {
          newInputWidth = minWidth;
          newOutputWidth = containerWidth - minWidth;
        }
        if (newOutputWidth < minWidth) {
          newOutputWidth = minWidth;
          newInputWidth = containerWidth - minWidth;
        }

        inputPanel.style.flex = '0 0 ' + newInputWidth + 'px';
        outputPanel.style.flex = '0 0 ' + newOutputWidth + 'px';
      }

      function onMouseUp() {
        if (!isResizing) return;
        isResizing = false;
        document.body.classList.remove('resizing');
        panelResizer.classList.remove('dragging');
      }

      panelResizer.addEventListener('mousedown', onMouseDown);
      panelResizer.addEventListener('touchstart', onMouseDown, { passive: false });
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onMouseMove, { passive: false });
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchend', onMouseUp);
    })();

    // Initialize
    updateInputLineNumbers();
    updateCharCount();
  }

  // =========================================================================
  // Google Analytics Tracking
  // =========================================================================

  function trackEvent(action, params = {}) {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'SQL Formatter',
        ...params
      });
    }
  }

  // =========================================================================
  // Initialize on DOM ready
  // =========================================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
