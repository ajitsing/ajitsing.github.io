---
title: "Agentic Coding"
slug: "agentic-coding"
also-known-as: ["Agentic software development", "Agentic AI coding", "Coding agents"]
category: "ai"
date: 2026-10-30
definition: "Agentic coding is software work where an AI agent plans steps, edits files, runs commands, and loops until a task looks done, while a person sets the goal, the boundaries, and the review. Autocomplete suggests the next line in the file you have open. A coding agent takes a task, uses tools, and comes back with a diff. You still own the merge. The agent does not join the incident call when that diff breaks production."
key_takeaways:
  - "An agent is a loop with tools: read, edit, run, look at the result, repeat. Your job is the goal, the limits, and the review."
  - "Bound the task before it starts. Name the files, the behavior, and the tests. A vague prompt produces a wide diff."
  - "Two wrong attempts is a signal to take the keyboard. More prompting on a confused thread usually spends tokens and adds code you did not ask for."
  - "Give the agent the least access that can finish the task. A prompt is not a permission boundary."
how_it_works:
  - "You describe a task, often with the files, constraints, and a check that can fail."
  - "The agent calls tools: search the repo, edit a file, run a test, read the output."
  - "Each tool result goes back into the conversation, and the model decides the next step."
  - "The loop stops when the agent claims success, hits a limit, or you interrupt it. Reading the diff is still your step."
real_world:
  - "Cursor Agent, Claude Code, GitHub Copilot's coding agent, and similar tools are the everyday form. They differ in models and permissions. The loop is the same shape."
  - "Teams that get value write the constraints down: which directories the agent may touch, which commands it may run, and which changes need a person."
  - "Amazon's 2026 SDE role guideline treats this as normal engineering practice and still scores people on customer and business outcomes, not on how many tokens the loop burned."
related_terms: ["agent-skills", "prompt-caching", "least-privilege", "progressive-disclosure"]
related_posts:
  - "/sde-role-in-the-age-of-ai/"
  - "/building-ai-agents/"
  - "/ai-coding-assistants-guide/"
  - "/how-to-save-cost-on-ai-assisted-coding/"
  - "/prompt-injection-explained/"
  - "/context-engineering/"
---
