---
title: "Garbage Collection"
slug: "garbage-collection"
also-known-as: ["GC", "Automatic Memory Management", "Java Garbage Collection"]
category: "system-design"
date: 2026-08-11
definition: "Garbage collection (GC) is the [JVM](/glossary/jvm/)'s automatic memory management. Instead of freeing memory by hand, you let objects go out of scope and the collector reclaims the heap memory used by objects that are no longer reachable. Most JVM collectors are generational: new objects live in the young generation and are cleared by cheap minor collections, while long-lived objects are promoted to the old generation and collected less often. Modern Java defaults to the G1 collector, with ZGC and Shenandoah available for very low pause times."
key_takeaways:
  - "GC reclaims only unreachable objects. Objects still referenced, for example held in a static map, are never collected."
  - "Generational collectors focus effort on the young generation, where most objects die quickly."
  - "GC frees you from manual memory management but does not make memory leaks impossible."
  - "Collector choice and heap sizing are the core of Java performance tuning, and always trade off throughput, latency, and memory."
how_it_works:
  - "New objects are allocated in the young generation (Eden)."
  - "A minor GC clears dead young objects and moves survivors between survivor spaces."
  - "Objects that survive enough collections are promoted to the old generation."
  - "A major or full GC collects the old generation, which is more expensive and can pause application threads."
real_world:
  - "G1 (Garbage-First) is the default collector in modern OpenJDK and Oracle JDK."
  - "ZGC and Shenandoah keep pauses to a few milliseconds even on very large heaps."
  - "An `OutOfMemoryError: Java heap space` means the GC could not free enough room on the heap."
related_terms: ["jvm", "bytecode", "jit-compilation", "class-loader"]
related_posts:
  - "/how-jvm-works/"
  - "/java-25-lts-features/"
---
