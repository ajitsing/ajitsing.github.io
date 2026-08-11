---
title: "JIT Compilation"
slug: "jit-compilation"
also-known-as: ["JIT", "Just-In-Time Compilation", "JIT Compiler"]
category: "system-design"
date: 2026-08-11
definition: "Just-In-Time (JIT) compilation is how the [JVM](/glossary/jvm/) turns frequently executed [bytecode](/glossary/bytecode/) into optimized native machine code while the program runs. The JVM starts by interpreting bytecode for fast startup, profiles which methods are hot, and then compiles those methods to native code so they run at near-native speed. HotSpot uses tiered compilation with a fast C1 compiler and an aggressive C2 compiler, and can deoptimize back to the interpreter if an optimization assumption turns out wrong."
key_takeaways:
  - "JIT compilation is why Java code speeds up after warmup: hot methods move from interpreted to compiled native code."
  - "HotSpot uses tiered compilation: Tier 0 interpreter, C1 for quick optimization, C2 for aggressive optimization."
  - "C2 applies inlining, loop unrolling, and escape analysis, sometimes matching or beating statically compiled languages."
  - "Deoptimization lets the JVM make optimistic bets and safely fall back when they fail, then recompile with better data."
how_it_works:
  - "The interpreter runs bytecode immediately and counts method calls and loop iterations."
  - "When a method crosses a threshold it is marked hot and queued for compilation."
  - "C1 compiles quickly with light optimization; C2 later recompiles the hottest code with heavier optimization."
  - "If a speculative optimization is invalidated, the JVM deoptimizes to the interpreter and may recompile."
real_world:
  - "HotSpot's C1 and C2 compilers power tiered compilation in the standard OpenJDK and Oracle JDK."
  - "GraalVM offers a JIT written in Java and also ahead-of-time native image compilation for fast startup."
  - "Benchmarks use a warmup phase precisely because the JIT needs time to compile hot paths."
related_terms: ["jvm", "bytecode", "garbage-collection", "class-loader"]
related_posts:
  - "/how-jvm-works/"
  - "/java-25-lts-features/"
---
