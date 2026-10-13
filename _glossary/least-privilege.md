---
title: "Least Privilege"
slug: "least-privilege"
also-known-as: ["Least privilege", "Principle of least privilege", "POLP", "Minimum privilege"]
category: "security"
date: 2026-10-09
definition: "Least privilege means every user, service, and agent gets only the access it needs for the job in front of it, for only as long as that job lasts. A dataset worker that previews a file does not get a cluster admin token. A sandbox that installs one library does not get a credential shared with every other sandbox. When a credential leaks, the blast radius is the privilege you attached to it, so smaller grants are the control that still works after the leak."
key_takeaways:
  - "Start from deny. Add the specific API, bucket, or repo the workload needs, then take it back when the job ends."
  - "Shared long lived credentials turn every holder into the same principal. One run should not be able to read another run's files."
  - "Privilege on the identity beats filtering in the prompt. The model will call whatever the token allows."
  - "Review cloud roles, Kubernetes service accounts, and CI tokens on the same list. Lateral movement follows the widest one."
how_it_works:
  - "Name the actions the workload must perform, and grant only those actions on only those resources."
  - "Prefer short lived credentials minted per run over a robot user that lives in a shared config file."
  - "Separate identities for build, deploy, runtime, and admin so a compromised parser cannot push a release."
  - "Log the grants and alert when a workload uses an API it has never used, which is often the first sign the grant was too wide."
real_world:
  - "Cloud IAM roles, Kubernetes RBAC, and database roles are the usual places this shows up. A default service account that can read every secret is least privilege skipped."
  - "CI jobs that hold a deploy token in the same environment that runs untrusted pull request code fail this test."
  - "In the [OpenAI Hugging Face incident](/openai-hugging-face-incident/), a shared package proxy credential let isolated agents write to each other, and dataset workers could see cloud and cluster credentials they did not need in order to parse a file."
related_terms: ["ssrf", "reward-hacking", "rate-limiting", "row-level-security"]
related_posts:
  - "/openai-hugging-face-incident/"
  - "/building-ai-agents/"
  - "/model-context-protocol-mcp-explained/"
  - "/prompt-injection-explained/"
---
