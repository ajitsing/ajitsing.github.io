---
title: "Delta Sync"
slug: "delta-sync"
also-known-as: ["Block-Level Sync", "Delta Encoding", "Differential Sync"]
category: "system-design"
date: 2026-08-20
definition: "Delta sync transfers only the parts of a file that changed instead of the whole file. The file is treated as a list of chunks, each identified by a content hash. When the file is edited, the client re-chunks it, compares the new chunk hashes against the previous ones, and uploads or downloads only the chunks whose hashes differ. Editing a few bytes of a large file then costs kilobytes instead of the full file size."
key_takeaways:
  - "Delta sync moves only changed chunks, so a small edit to a huge file transfers very little data."
  - "It relies on chunking plus [content-addressable storage](/glossary/content-addressable-storage/) to tell changed chunks from unchanged ones."
  - "Fixed-size chunking breaks on byte insertions because every later boundary shifts; content-defined chunking fixes that."
  - "It pairs with [deduplication](/glossary/data-deduplication/): unchanged chunks are already stored, so only new ones are written."
how_it_works:
  - "Represent each file version as an ordered list of content-hashed chunks."
  - "On edit, re-chunk the file and compute the new list of chunk hashes."
  - "Diff the new hash list against the old one to find which chunks are new."
  - "Transfer only the new chunks, then commit the new version's chunk list."
real_world:
  - "Dropbox uses block-level delta sync so editing a large file uploads only changed blocks."
  - "The rsync algorithm popularized transferring file deltas using rolling checksums."
  - "Version control and backup tools store successive versions as deltas to save space."
related_terms: ["content-addressable-storage", "data-deduplication", "cdn"]
related_posts:
  - "/dropbox-system-design/"
  - "/how-git-stores-data-internally/"
---
