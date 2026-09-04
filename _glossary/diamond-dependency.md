---
title: "Diamond Dependency"
slug: "diamond-dependency"
also-known-as: ["Diamond Dependency Problem", "Dependency Hell", "Incompatible Versions"]
category: "system-design"
date: 2026-09-04
definition: "A diamond dependency conflict happens when two libraries in the same program depend on incompatible versions of a third library. The graph looks like a diamond: an app depends on A and B, while A depends on C 1.x and B depends on C 2.x. The package manager or linker must then find one compatible version, install multiple copies, or fail the build. A single-version [monorepo](/glossary/monorepo/) prevents this conflict for internal libraries by keeping their callers on one shared version."
key_takeaways:
  - "The diamond is A and B both depending on C, with A and B expecting different C versions."
  - "Package managers may select one compatible version, install multiple copies, or fail resolution. Multiple copies can add bloat or create incompatible runtime types."
  - "A single-version monorepo prevents the conflict for internal libraries by requiring every caller to build against the same C."
  - "The trade-off is that upgrading C becomes a whole-tree job. You need tests and large-scale change tooling, not a version bump in one package.json."
how_it_works:
  - "Project P depends on libraries A and B."
  - "A declares a dependency on C version 1 and exposes a value or type from that version."
  - "B declares a dependency on C version 2, which is incompatible with version 1."
  - "Resolution then fails, selects one version that may break a caller, or installs both versions and prevents their values from being used interchangeably."
real_world:
  - "npm, Maven, and pip hit this constantly when two packages pin overlapping but incompatible ranges."
  - "Google's google3 tree keeps one version of each library so a compiler or protocol buffer change can roll out once."
  - "Bazel makes dependency versions explicit and reproducible, but it can still model multiple versions through distinct external repositories when a project needs them."
related_terms: ["monorepo", "modular-monolith", "microservices"]
related_posts:
  - "/how-google-manages-its-monorepo/"
  - "/modular-monolith-architecture/"
---
