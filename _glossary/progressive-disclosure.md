---
title: "Progressive Disclosure"
slug: "progressive-disclosure"
also-known-as: ["Lazy loading context", "On-demand context"]
category: "ai"
date: 2026-08-31
definition: "Progressive disclosure is the practice of showing only the information needed for the current step, then revealing more on demand. In AI coding agents it means keeping a short routing hint (a skill name and description) in the context window, and loading the full playbook, reference docs, or scripts only after the agent decides that playbook applies. The same idea shows up in product UI as hiding advanced settings until the user asks for them."
key_takeaways:
  - "You pay tokens for what sits in context. Progressive disclosure keeps unused playbooks cheap."
  - "[Agent Skills](/glossary/agent-skills/) are built around this: metadata first, `SKILL.md` body second, `references/` and `scripts/` last."
  - "A skill that dumps a 2,000-line style guide into every session is not using progressive disclosure. Split that guide into a linked file."
  - "Always-on files such as `CLAUDE.md` skip this pattern. Put only standing rules there."
how_it_works:
  - "The host loads a small index of available skills at session start."
  - "The model matches the user request against those short descriptions."
  - "Only the chosen skill's body enters the conversation. Linked files are read if the instructions say to."
  - "After compaction, hosts like Claude Code may re-attach a truncated copy of recently used skills so the playbook is not lost entirely."
real_world:
  - "Claude Code loads skill descriptions for routing, then injects `SKILL.md` when you type `/deploy` or when the task matches."
  - "Cursor Agent Skills use the same two-stage load so dozens of project skills do not fill the window on every chat."
  - "Settings screens that hide power-user options behind an Advanced toggle are the same idea in a GUI."
related_terms: ["agent-skills"]
related_posts:
  - "/how-to-create-and-use-skills-in-claude-code/"
  - "/how-to-create-and-use-skills-in-cursor/"
  - "/context-engineering/"
---
