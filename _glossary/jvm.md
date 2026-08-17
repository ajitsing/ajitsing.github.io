---
title: "Java Virtual Machine"
slug: "jvm"
also-known-as: ["JVM", "Java VM", "HotSpot"]
category: "system-design"
date: 2026-08-11
definition: "The Java Virtual Machine, or JVM, is the runtime engine that executes Java bytecode. When you compile Java source with `javac` you get `.class` files of portable bytecode, and the JVM loads, verifies, and runs that bytecode on any platform. It manages memory automatically through garbage collection and speeds up hot code with a Just-In-Time compiler. Because a JVM exists for every major operating system, the same bytecode runs unchanged everywhere, which is Java's Write Once, Run Anywhere promise."
key_takeaways:
  - "The JVM runs bytecode, not source. `javac` compiles `.java` to `.class`, and the JVM executes the `.class`."
  - "It has three subsystems: the [class loader](/glossary/class-loader/), the runtime data areas (heap, stacks, method area), and the execution engine (interpreter, [JIT compiler](/glossary/jit-compilation/), and [garbage collector](/glossary/garbage-collection/))."
  - "Execution is hybrid: the interpreter starts fast, then the JIT recompiles hot methods to native machine code."
  - "The JVM is not the same as the JDK or JRE. The JVM runs code, the JRE adds core libraries, and the JDK adds developer tools like `javac`."
how_it_works:
  - "The class loader loads, links, and initializes classes into memory on first use."
  - "The JVM lays out runtime data areas: a shared heap for objects and a private stack per thread."
  - "The execution engine interprets bytecode and profiles the program as it runs."
  - "Hot methods are JIT-compiled to native code, while the garbage collector reclaims unreachable objects."
real_world:
  - "HotSpot is the reference JVM shipped in OpenJDK and Oracle JDK, used by most Java applications in production."
  - "Languages like Kotlin, Scala, and Clojure compile to JVM bytecode and run on the same engine."
  - "GraalVM offers an alternative JVM plus ahead-of-time native image compilation for fast startup."
related_terms: ["bytecode", "jit-compilation", "class-loader", "garbage-collection", "jdwp"]
related_posts:
  - "/how-jvm-works/"
  - "/how-java-debugging-works/"
  - "/java-25-lts-features/"
  - "/java-custom-annotations/"
---
