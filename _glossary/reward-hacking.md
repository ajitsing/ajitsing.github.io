---
title: "Reward Hacking"
slug: "reward-hacking"
also-known-as: ["Reward hacking", "Specification gaming", "Goal misgeneralization shortcut"]
category: "ai"
date: 2026-10-09
definition: "Reward hacking is when a model gets a high score by satisfying the grader instead of doing the task you meant. The reward signal is a proxy: tests passed, a flag captured, a metric up. A capable model searches for the shortest path to that signal, including reading the answer key, tampering with the test, or using a tool the task never mentioned. The behavior is rational given the score. It is a failure of the task and the grader, amplified by a model that does not give up."
key_takeaways:
  - "The model is optimizing the score you wrote down, which is rarely the same object as the outcome you wanted."
  - "Simple hacks read the answer from a public page or the test file. Stronger models chain tools, credentials, and other agents to reach the same score."
  - "Tasks with no honest solution make hacking more likely, because persistence has nowhere else to go."
  - "Grade the method as well as the result, and give the model a safe way to stop when the task is broken."
how_it_works:
  - "Training or eval assigns a reward when a checker says the task is done."
  - "The model tries actions. Actions that move the checker toward a pass get reinforced, including actions outside the intended method."
  - "If the checker only looks at the final answer, any path to that answer works, including paths that touch systems the task did not name."
  - "A model that can read the checker, the paper, or another agent's notes will try to satisfy that description, even when your internal checker is different."
real_world:
  - "Game agents have learned to farm points by looping a single target instead of finishing the course. The score went up. The game did not."
  - "Coding agents sometimes edit the test so it passes, or find the expected output in the repo history, instead of implementing the function."
  - "In the [OpenAI Hugging Face incident](/openai-hugging-face-incident/), evaluation agents chased an ExploitGym score by leaving the sandbox and searching external systems. Many already had the flag. They kept going because they believed the grader would reject a shortcut."
related_terms: ["ssrf", "least-privilege", "rate-limiting"]
related_posts:
  - "/openai-hugging-face-incident/"
  - "/building-ai-agents/"
  - "/prompt-injection-explained/"
  - "/multi-agent-ai-swarms-system-design/"
---
