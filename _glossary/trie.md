---
title: "Trie"
slug: "trie"
also-known-as: ["Prefix Tree", "Digital Tree"]
category: "data-structures"
date: 2026-11-18
definition: "A trie (pronounced 'try', from retrieval) is a tree data structure where each node represents a single character or token of a string, and paths from the root spell out prefixes and full keys. Lookup time depends only on the length of the query prefix, not on how many strings are stored. In search autocomplete systems, tries often cache the top-k ranked suggestions at each prefix node so a keystroke returns results in O(p) time."
key_takeaways:
  - "Lookup time is O(p), where p is the prefix length, regardless of whether the dictionary has ten thousand or ten million terms."
  - "Shared prefixes are stored once, which saves space when many queries start the same way, though raw pointer-heavy tries can still be memory-hungry."
  - "Caching the top-k suggestions inside each node turns a subtree traversal into a single node read, trading extra memory for sub-millisecond reads."
  - "Variants like radix trees (compressed tries) and finite state transducers (FSTs) pack nodes tightly to fit large vocabularies in RAM."
how_it_works:
  - "Start at the root node and follow the edge matching the first character of the prefix."
  - "Repeat for each character in the prefix; if an edge is missing, no stored term starts with that prefix."
  - "If the prefix node exists, either traverse its subtree to collect matching terms or read a precomputed top-k list stored directly on that node."
  - "During updates, insert new terms along their character path and refresh the cached top-k lists on ancestor nodes."
real_world:
  - "Search autocomplete and typeahead services use tries or compressed tries to serve top query completions on every keystroke."
  - "Lucene and Elasticsearch use weighted Finite State Transducers (FSTs), a compact trie-like graph, for their completion suggester."
  - "IP routing tables use radix tries (longest prefix match) to route packets to the right network."
related_terms: ["caching", "sharding", "consistent-hashing", "database-index", "cuckoo-filter"]
related_posts:
  - "/search-autocomplete-system-design/"
  - "/data-structures/bloom-filter/"
  - "/database-indexing-explained/"
---
