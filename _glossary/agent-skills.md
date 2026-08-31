---
title: "Agent Skills"
slug: "agent-skills"
also-known-as: ["Skills", "SKILL.md", "Claude Code skills", "Cursor Skills"]
category: "ai"
date: 2026-08-31
definition: "Agent Skills are portable folders that teach an AI coding agent how to do one job. Each skill is a directory with a `SKILL.md` file: YAML frontmatter for the name and description, plus Markdown instructions the agent follows when the task matches. Claude Code, Cursor, and other tools that implement the [Agent Skills](https://agentskills.io/) standard can load the same files. The agent keeps only the name and description in context until it actually needs the body, which is [progressive disclosure](/glossary/progressive-disclosure/) applied to prompts."
key_takeaways:
  - "A skill is a folder with a `SKILL.md`, not a hidden product setting. Commit it and the whole team gets the same playbook."
  - "The `description` is the routing key. A vague description means the skill never fires."
  - "Put standing rules in `CLAUDE.md` (or Cursor Rules). Put multi-step workflows in a skill so they load only when needed."
  - "Claude Code adds extra frontmatter on top of the open spec: slash commands, `allowed-tools`, `context: fork`, and live shell injection before the model sees the skill."
how_it_works:
  - "At session start the agent reads each skill's name and description, about a hundred tokens each."
  - "When your request matches a description, or you type `/skill-name`, it loads the full `SKILL.md` body."
  - "Linked files under `references/` and executables under `scripts/` load only if the instructions point at them."
  - "In Claude Code, a `!`command`` line runs before the model sees the skill, so the prompt can include a live git diff or PR body."
real_world:
  - "Teams commit `.claude/skills/` so Claude Code reviews pull requests, writes commits, and deploys the same way for everyone."
  - "The same `SKILL.md` format works in Cursor under `.cursor/skills/`, which is why one repo can serve both agents."
  - "Anthropic ships bundled Claude Code skills such as `/code-review` and `/debug`, and lets you override them with a project skill of the same name."
related_terms: ["progressive-disclosure"]
related_posts:
  - "/how-to-create-and-use-skills-in-claude-code/"
  - "/how-to-create-and-use-skills-in-cursor/"
  - "/model-context-protocol-mcp-explained/"
  - "/context-engineering/"
---
