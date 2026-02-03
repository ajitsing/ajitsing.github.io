---
layout: post
seo: true
title: "Regex Cheat Sheet: Patterns Every Developer Should Know"
subtitle: "Stop guessing at regular expressions and start writing them with confidence"
date: 2026-01-01
categories: web-development
permalink: /regex-cheat-sheet/
share-img: /assets/img/tools/regex-tool-thumbnail.png
thumbnail-img: /assets/img/tools/regex-tool-thumbnail.png
description: "A practical regex cheat sheet with real examples. Learn regular expression syntax, character classes, quantifiers, lookaheads, and common patterns for email, URL, and phone validation."
keywords: "regex cheat sheet, regular expressions, regex patterns, regex tutorial, regex examples, regex syntax, regex for beginners, regex character classes, regex quantifiers, regex lookahead, email regex, url regex, phone regex, regex validation, pattern matching, regex flags, regex groups"
tags: ["programming", "regex"]
comments: true

quick-answer: "Core regex: `.` matches any char, `*` = 0+, `+` = 1+, `?` = 0 or 1, `\\d` = digit, `\\w` = word char, `\\s` = whitespace, `^` = start, `$` = end. Use `()` for capture groups, `(?:)` for non-capturing. Lazy: `*?`, `+?`. Flags: `i` (case-insensitive), `g` (global), `m` (multiline)."

key-takeaways:
  - "Start simple and build up. Test each piece of your pattern as you add it"
  - "Use non-greedy quantifiers (*? and +?) when you want the shortest match"
  - "Character classes like \\d, \\w, and \\s cover most common matching needs"
  - "Capture groups () let you extract parts of your match for later use"
  - "Always test your regex with edge cases before using it in production"

faq:
  - question: "What is a regular expression (regex)?"
    answer: "A regular expression is a pattern that describes a set of strings. It lets you search for patterns rather than exact text. For example, you can find all email addresses in a document without knowing what they are beforehand. Regex is supported in virtually all programming languages."
  - question: "What is the difference between * and + in regex?"
    answer: "The asterisk (*) matches zero or more of the previous element - so 'a*' matches '', 'a', 'aa', etc. The plus (+) matches one or more - so 'a+' requires at least one 'a' and won't match an empty string. Use * when the element is optional, use + when you need at least one."
  - question: "What does the dot (.) mean in regex?"
    answer: "The dot matches any single character except newline. So 'c.t' matches 'cat', 'cut', 'c9t', or 'c@t' - any three character string starting with 'c' and ending with 't'. To match a literal dot, escape it with a backslash: '\\.' matches only a period."
  - question: "How do I make regex case insensitive?"
    answer: "Add the 'i' flag to your pattern. In JavaScript, this looks like /pattern/i. In Python, use re.IGNORECASE or re.I. Most regex tools have a checkbox or button to enable case insensitive matching."
  - question: "What is the difference between greedy and lazy matching?"
    answer: "Greedy quantifiers (*, +, ?) match as much as possible. Lazy quantifiers (*?, +?, ??) match as little as possible. For example, given '<div>text</div>', the pattern '<.*>' greedily matches the entire string, while '<.*?>' lazily matches just '<div>'."
  - question: "What is a capture group in regex?"
    answer: "Parentheses () create capture groups that save the matched text for later use. You can reference captured groups with $1, $2, etc. in replacements, or \\1, \\2 as backreferences within the same pattern. Use (?:...) for grouping without capturing."
  - question: "How do I match the start or end of a string?"
    answer: "Use ^ to match the start and $ to match the end. The pattern ^Hello matches 'Hello world' but not 'Say Hello'. The pattern world$ matches 'Hello world' but not 'world peace'. With the multiline flag, these also match line boundaries."
  - question: "What is a lookahead in regex?"
    answer: "A lookahead checks if a pattern exists ahead without consuming characters. Positive lookahead (?=...) asserts the pattern must follow. Negative lookahead (?!...) asserts the pattern must not follow. For example, 'foo(?=bar)' matches 'foo' only if followed by 'bar'."
---

I used to copy regex patterns from Stack Overflow without understanding them. Then one day I needed to modify a pattern slightly, and I had no idea what any of it meant.

This cheat sheet is what I wish I had back then. Real patterns, clear explanations, and examples you can actually use.

<div class="tool-highlight" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #10b981; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
  <h3 style="color: #065f46; margin: 0 0 15px 0;"><i class="fas fa-flask"></i> Test Your Patterns Live</h3>
  <p style="color: #374151; margin-bottom: 15px;">Every pattern in this cheat sheet can be tested in our free regex tester. See matches highlighted in real time, understand your pattern with explanations, and visualize capture groups.</p>
  <a href="/tools/regex-tester/" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;"><i class="fas fa-code"></i> Open Regex Tester</a>
</div>

## Table of Contents

- [Basic Syntax](#basic-syntax)
- [Character Classes](#character-classes)
- [Quantifiers](#quantifiers)
- [Anchors and Boundaries](#anchors-and-boundaries)
- [Groups](#groups)
- [Alternation](#alternation)
- [Lookahead and Lookbehind](#lookahead-and-lookbehind)
- [Flags](#flags)
- [Common Patterns](#common-patterns)
- [Quick Reference Tables](#quick-reference-tables)
- [Regex in Different Languages](#regex-in-different-languages)
- [Tips and Gotchas](#tips-and-gotchas)

## Basic Syntax

Most characters match themselves. The pattern `hello` matches the text "hello". But some characters have special meanings.

### Special Characters (Metacharacters)

These characters have special meaning in regex. To match them literally, escape with a backslash.

| Character | Meaning | To Match Literally |
|-----------|---------|-------------------|
| `.` | Any character (except newline) | `\.` |
| `*` | Zero or more of previous | `\*` |
| `+` | One or more of previous | `\+` |
| `?` | Zero or one of previous | `\?` |
| `^` | Start of string/line | `\^` |
| `$` | End of string/line | `\$` |
| `\|` | OR (alternation) | `\\|` |
| `()` | Capture group | `\(` `\)` |
| `[]` | Character class | `\[` `\]` |
| `{}` | Quantifier | `\{` `\}` |
| `\` | Escape character | `\\` |

### Escaping

When you need to match a special character literally, put a backslash before it:

```
\.    matches a literal dot
\$    matches a dollar sign
\\    matches a backslash
\(    matches an opening parenthesis
```

## Character Classes

Character classes match one character from a set of characters.

### Shorthand Classes

| Pattern | Matches | Equivalent |
|---------|---------|------------|
| `\d` | Any digit | `[0-9]` |
| `\D` | Any non-digit | `[^0-9]` |
| `\w` | Word character | `[a-zA-Z0-9_]` |
| `\W` | Non-word character | `[^a-zA-Z0-9_]` |
| `\s` | Whitespace | `[ \t\n\r\f]` |
| `\S` | Non-whitespace | `[^ \t\n\r\f]` |
| `.` | Any character (except newline) | |

### Custom Classes

Use square brackets to define your own character class:

| Pattern | Matches |
|---------|---------|
| `[abc]` | a, b, or c |
| `[a-z]` | Any lowercase letter |
| `[A-Z]` | Any uppercase letter |
| `[a-zA-Z]` | Any letter |
| `[0-9]` | Any digit |
| `[a-zA-Z0-9]` | Any alphanumeric |
| `[^abc]` | Any character except a, b, c |
| `[^0-9]` | Any non-digit |

The caret `^` at the start of a character class negates it.

### Examples

```
\d\d\d          matches "123", "456", "789"
[aeiou]         matches any vowel
[^aeiou]        matches any consonant (or non-letter)
[a-zA-Z_]\w*    matches valid variable names
```

## Quantifiers

Quantifiers specify how many times the previous element should match.

| Quantifier | Meaning | Example | Matches |
|------------|---------|---------|---------|
| `*` | Zero or more | `ab*c` | ac, abc, abbc, abbbc... |
| `+` | One or more | `ab+c` | abc, abbc, abbbc... |
| `?` | Zero or one | `ab?c` | ac, abc |
| `{n}` | Exactly n | `a{3}` | aaa |
| `{n,}` | n or more | `a{2,}` | aa, aaa, aaaa... |
| `{n,m}` | Between n and m | `a{2,4}` | aa, aaa, aaaa |

### Greedy vs Lazy

By default, quantifiers are greedy. They match as much as possible.

Add `?` after a quantifier to make it lazy (non-greedy). It matches as little as possible.

| Greedy | Lazy | Behavior |
|--------|------|----------|
| `*` | `*?` | Zero or more (shortest) |
| `+` | `+?` | One or more (shortest) |
| `?` | `??` | Zero or one (prefer zero) |
| `{n,m}` | `{n,m}?` | Between n and m (prefer n) |

**Example:**

Given the text: `<div>hello</div>`

| Pattern | Matches |
|---------|---------|
| `<.*>` (greedy) | `<div>hello</div>` |
| `<.*?>` (lazy) | `<div>` |

The greedy pattern matches from the first `<` to the last `>`. The lazy pattern stops at the first `>`.

## Anchors and Boundaries

Anchors match positions, not characters.

| Anchor | Matches |
|--------|---------|
| `^` | Start of string (or line with m flag) |
| `$` | End of string (or line with m flag) |
| `\b` | Word boundary |
| `\B` | Not a word boundary |
| `\A` | Start of string (never matches line) |
| `\Z` | End of string (never matches line) |

### Word Boundaries

A word boundary `\b` occurs between a word character and a non-word character:

```
\bcat\b      matches "cat" but not "category" or "concatenate"
\bcat        matches "cat" and "category" but not "concatenate"
cat\b        matches "cat" and "concatenate" but not "category"
```

### Start and End

```
^hello       matches "hello world" but not "say hello"
world$       matches "hello world" but not "world peace"
^hello$      matches only "hello" by itself
```

## Groups

Groups let you treat multiple characters as a single unit and capture matches for later use.

### Capture Groups

Parentheses create capture groups:

```
(abc)        matches and captures "abc"
(ab)+        matches "ab", "abab", "ababab"...
(\d{3})-(\d{4})    captures area code and number separately
```

You can reference captured groups:
- In replacements: `$1`, `$2`, `$3`...
- As backreferences: `\1`, `\2`, `\3`...

**Example:** Find repeated words

```
\b(\w+)\s+\1\b    matches "the the", "is is", etc.
```

The `\1` refers back to whatever was captured by the first group.

### Non-Capturing Groups

When you need grouping but don't need to capture:

```
(?:abc)      groups "abc" without capturing
(?:ab)+      matches "ab", "abab"... without capturing
```

Use non-capturing groups when you only need grouping for alternation or quantifiers.

### Named Groups

Some regex flavors support named capture groups:

```
(?<name>\w+)         named capture group (JavaScript, .NET, Python)
(?P<name>\w+)        named capture group (Python alternative)
```

Reference named groups with `\k<name>` or in replacements with `$<name>`.

## Alternation

The pipe `|` matches either the pattern on the left or the right:

```
cat|dog           matches "cat" or "dog"
(cat|dog)s        matches "cats" or "dogs"
gr(a|e)y          matches "gray" or "grey"
```

Alternation has low precedence. Use groups to control scope:

```
^cat|dog$         matches "cat..." or "...dog" (^ and $ bind tighter)
^(cat|dog)$       matches only "cat" or "dog" by itself
```

## Lookahead and Lookbehind

Lookarounds check for a pattern without including it in the match.

| Syntax | Name | Meaning |
|--------|------|---------|
| `(?=...)` | Positive lookahead | Followed by... |
| `(?!...)` | Negative lookahead | Not followed by... |
| `(?<=...)` | Positive lookbehind | Preceded by... |
| `(?<!...)` | Negative lookbehind | Not preceded by... |

### Lookahead Examples

```
foo(?=bar)        matches "foo" only if followed by "bar"
foo(?!bar)        matches "foo" only if NOT followed by "bar"
\d+(?=%)          matches digits only if followed by "%"
```

### Lookbehind Examples

```
(?<=@)\w+         matches word characters only if preceded by "@"
(?<!@)\w+         matches word characters only if NOT preceded by "@"
(?<=\$)\d+        matches digits only if preceded by "$"
```

**Note:** Lookbehind support varies by regex engine. JavaScript added lookbehind in ES2018.

## Flags

Flags modify how the pattern is interpreted:

| Flag | Name | Effect |
|------|------|--------|
| `g` | Global | Find all matches, not just the first |
| `i` | Case-insensitive | Ignore letter case |
| `m` | Multiline | `^` and `$` match line boundaries |
| `s` | DotAll | `.` matches newlines too |
| `u` | Unicode | Enable full Unicode support |
| `x` | Extended | Allow whitespace and comments |

### Flag Usage by Language

**JavaScript:**
```javascript
/pattern/gi
new RegExp('pattern', 'gi')
```

**Python:**
```python
re.search(r'pattern', text, re.IGNORECASE | re.MULTILINE)
```

**Java:**
```java
Pattern.compile("pattern", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE)
```

## Common Patterns

Here are battle-tested patterns for common use cases. [Test them in our Regex Tester](/tools/regex-tester/).

### Email Address

```
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

Matches: `john@example.com`, `user.name+tag@domain.org`

Does not match: `@nodomain.com`, `missing@tld`

### URL

```
^https?:\/\/[^\s/$.?#].[^\s]*$
```

Matches: `https://example.com`, `http://test.org/path?q=1`

Does not match: `not a url`, `ftp://wrong.protocol`

### Phone Number (US)

```
\b\d{3}[-.]?\d{3}[-.]?\d{4}\b
```

Matches: `555-123-4567`, `555.123.4567`, `5551234567`

### Date (YYYY-MM-DD)

```
^\d{4}-\d{2}-\d{2}$
```

Matches: `2024-01-15`, `1999-12-31`

Does not match: `01-15-2024`, `2024/01/15`

### Time (24-hour)

```
^([01]?[0-9]|2[0-3]):[0-5][0-9]$
```

Matches: `14:30`, `9:05`, `23:59`

Does not match: `25:00`, `12:60`

### IP Address (IPv4)

```
^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$
```

Matches: `192.168.1.1`, `10.0.0.255`

Note: This matches the format but allows invalid values like `999.999.999.999`

### Strong Password

```
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
```

Requires: At least 8 characters, one lowercase, one uppercase, one digit

Matches: `StrongPass1`, `MyP@ssw0rd`

Does not match: `weakpass`, `NoDigits`

### Hex Color Code

```
^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
```

Matches: `#FF5733`, `#fff`, `abc123`

Does not match: `#GGG`, `#12`

### Username

```
^[a-zA-Z0-9_-]{3,16}$
```

Matches: `john_doe`, `user123`, `my-name`

Does not match: `ab` (too short), `has spaces`

### ZIP Code (US)

```
^\d{5}(-\d{4})?$
```

Matches: `12345`, `12345-6789`

Does not match: `1234`, `123456`

### Slug (URL-friendly)

```
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

Matches: `my-blog-post`, `article123`

Does not match: `Has Spaces`, `UPPERCASE`

### HTML Tag

```
<([a-z]+)[^>]*>(.*?)<\/\1>
```

Matches: `<div>content</div>`, `<span class="x">text</span>`

Uses backreference `\1` to match closing tag with opening tag name.

### Whitespace

```
\s+              one or more whitespace characters
^\s+|\s+$        leading or trailing whitespace
\s{2,}           two or more consecutive spaces
```

### Extract Domain from URL

```
https?:\/\/([^\/]+)
```

Captures the domain in group 1.

### Find Duplicate Words

```
\b(\w+)\s+\1\b
```

Matches: `the the`, `is is`

Uses backreference to find repeated words.

## Quick Reference Tables

### Metacharacters

| Char | Description |
|------|-------------|
| `\` | Escape next character |
| `^` | Start of string |
| `$` | End of string |
| `.` | Any character |
| `\|` | Alternation (or) |
| `?` | Zero or one |
| `*` | Zero or more |
| `+` | One or more |
| `()` | Group |
| `[]` | Character class |

### Character Classes

| Class | Description |
|-------|-------------|
| `\d` | Digit [0-9] |
| `\D` | Non-digit |
| `\w` | Word character [a-zA-Z0-9_] |
| `\W` | Non-word character |
| `\s` | Whitespace |
| `\S` | Non-whitespace |
| `.` | Any character (except newline) |

### Quantifiers

| Quant | Description |
|-------|-------------|
| `*` | 0 or more |
| `+` | 1 or more |
| `?` | 0 or 1 |
| `{3}` | Exactly 3 |
| `{3,}` | 3 or more |
| `{3,5}` | 3, 4, or 5 |

### Anchors

| Anchor | Description |
|--------|-------------|
| `^` | Start of string/line |
| `$` | End of string/line |
| `\b` | Word boundary |
| `\B` | Non-word boundary |

### Groups

| Syntax | Description |
|--------|-------------|
| `(...)` | Capture group |
| `(?:...)` | Non-capturing group |
| `(?=...)` | Positive lookahead |
| `(?!...)` | Negative lookahead |
| `(?<=...)` | Positive lookbehind |
| `(?<!...)` | Negative lookbehind |

## Regex in Different Languages

### JavaScript

```javascript
// Test if pattern matches
const regex = /\d+/g;
const matches = 'abc123def456'.match(regex);  // ['123', '456']

// Replace
'hello world'.replace(/world/, 'regex');  // 'hello regex'

// Test
/^\d+$/.test('12345');  // true
```

### Python

```python
import re

# Find all matches
matches = re.findall(r'\d+', 'abc123def456')  # ['123', '456']

# Replace
re.sub(r'world', 'regex', 'hello world')  # 'hello regex'

# Test
bool(re.match(r'^\d+$', '12345'))  # True
```

### Java

```java
import java.util.regex.*;

// Find matches
Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher("abc123def456");
while (matcher.find()) {
    System.out.println(matcher.group());
}

// Replace
"hello world".replaceAll("world", "regex");  // "hello regex"

// Test
Pattern.matches("^\\d+$", "12345");  // true
```

### Bash/grep

```bash
# Find lines matching pattern
grep -E '\d{3}-\d{4}' file.txt

# Find and replace (sed)
sed -E 's/world/regex/g' file.txt
```

## Tips and Gotchas

### Always Escape Backslashes in Strings

In most languages, backslashes in strings need to be escaped:

```javascript
// JavaScript - use regex literal
const regex = /\d+/;

// Or double-escape in string
const regex = new RegExp('\\d+');
```

```python
# Python - use raw strings
regex = r'\d+'
```

### Be Careful with Greedy Quantifiers

Greedy matching can surprise you:

```
Pattern: ".*"
Input: "hello" said "world"
Match: "hello" said "world"    (not just "hello")
```

Use lazy quantifiers or negated character classes:

```
Pattern: ".*?"       matches "hello"
Pattern: "[^"]*"     matches "hello"
```

### Anchor Your Patterns

Without anchors, patterns can match anywhere:

```
Pattern: \d+
Input: abc123def
Match: 123    (found in the middle)

Pattern: ^\d+$
Input: abc123def
Match: none   (requires only digits)
```

### Test Edge Cases

Always test with:
- Empty strings
- Very long strings
- Unicode characters
- Newlines and special whitespace
- Invalid input

<div class="tool-highlight" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #10b981; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
  <h3 style="color: #065f46; margin: 0 0 15px 0;"><i class="fas fa-rocket"></i> Ready to Practice?</h3>
  <p style="color: #374151; margin-bottom: 15px;">The best way to learn regex is by doing. Try these patterns in our interactive tester with real-time matching and explanations.</p>
  <a href="/tools/regex-tester/" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;"><i class="fas fa-code"></i> Open Regex Tester</a>
</div>

## Next Steps

Now that you have the patterns, put them to use:

- [Regex Tester Tool](/tools/regex-tester/) - Test patterns with live feedback
- [Regular Expressions Explained](/explainer/regex-explained/) - Visual guide to how regex works

---

**Further Reading:**

- [Regular-Expressions.info](https://www.regular-expressions.info/) - Comprehensive regex reference
- [regex101.com](https://regex101.com/) - Another great online tester
- [MDN Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) - JavaScript specific
