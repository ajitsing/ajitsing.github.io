---
title: "Monorepo"
slug: "monorepo"
also-known-as: ["Monolithic Repository", "Mono-repo", "Single Repository"]
category: "system-design"
date: 2026-09-04
definition: "A monorepo is a version control layout where many projects, libraries, and services live in one repository instead of one repo per project or team. In a trunk-based, single-version monorepo, a change can update a library and all of its callers in one logical commit. It is a source layout, not a runtime architecture: the code can still ship as many independent services."
key_takeaways:
  - "One repository contains many projects. The opposite layout is a polyrepo, where projects live in separate repositories."
  - "Common benefits include atomic cross-project changes, coordinated dependency versions, and easier large-scale refactoring."
  - "The cost is tooling. Builds, tests, search, and access control have to scale with the whole tree, not with one small project."
  - "A monorepo is not a [modular monolith](/glossary/modular-monolith/). You can deploy hundreds of [microservices](/glossary/microservices/) from one repo, and you can split a monolith across many repos."
how_it_works:
  - "Projects sit in directories of one tree. Shared libraries can be referenced directly or managed through workspace-aware package tooling."
  - "Many monorepos use trunk-based development and short-lived branches, but the repository layout does not require a particular branching model."
  - "The build system tracks a full dependency graph so a change rebuilds only the targets that depend on it."
  - "Ownership files and visibility rules keep review and access scoped even though the code is in one place."
real_world:
  - "Google stores most of its code in one Piper-backed repository that engineers call google3."
  - "Meta, Microsoft, and Uber also run large monorepos, each with custom source control or Git scale-out tooling."
  - "Smaller teams use Git plus Bazel, Nx, Turborepo, or package workspaces to get a slice of the same benefits."
related_terms: ["diamond-dependency", "modular-monolith", "microservices", "content-addressable-storage", "paxos", "consensus"]
related_posts:
  - "/how-google-manages-its-monorepo/"
  - "/how-github-stores-and-serves-git-repositories/"
  - "/how-git-stores-data-internally/"
  - "/git-flow-vs-github-flow/"
  - "/modular-monolith-architecture/"
---
