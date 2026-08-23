---
title: "Java Bytecode"
slug: "bytecode"
also-known-as: ["Bytecode", "Java Bytecode", "Class File"]
category: "system-design"
date: 2026-08-11
definition: "Bytecode is the compact, platform-independent instruction set that the [JVM](/glossary/jvm/) executes. The `javac` compiler does not turn Java source into native machine code; it produces bytecode stored in `.class` files. Each instruction, such as `iload`, `iadd`, or `invokevirtual`, is a small operation for the JVM's stack-based machine. Because the bytecode is identical on every platform, only the JVM needs to be ported, which is how Java delivers Write Once, Run Anywhere."
key_takeaways:
  - "Bytecode is an intermediate format between source code and native machine code. It targets the JVM, not your CPU."
  - "It is the same across platforms, so a compiled `.class` or JAR runs unchanged on Windows, Linux, and macOS."
  - "The JVM is a stack-based machine, so bytecode pushes and pops values on an operand stack instead of naming CPU registers."
  - "You can read the bytecode of any class with `javap -c` to see exactly what the compiler produced."
how_it_works:
  - "`javac` compiles each `.java` file into one or more `.class` files containing bytecode and a constant pool."
  - "The JVM verifies the bytecode is safe before running it, rejecting malformed code with a VerifyError."
  - "The interpreter executes bytecode instruction by instruction using the operand stack."
  - "Frequently executed bytecode is handed to the JIT compiler and turned into native machine code."
real_world:
  - "Kotlin, Scala, Groovy, and Clojure all compile to the same JVM bytecode and interoperate with Java."
  - "Frameworks like Spring and Hibernate generate or manipulate bytecode at runtime for proxies and instrumentation."
  - "Tools such as ASM and ByteBuddy let libraries create and rewrite bytecode programmatically."
related_terms: ["jvm", "jit-compilation", "class-loader", "garbage-collection", "jdwp", "java-annotation", "annotation-processor"]
related_posts:
  - "/how-jvm-works/"
  - "/how-java-debugging-works/"
  - "/java-25-lts-features/"
  - "/java-custom-annotations/"
---
