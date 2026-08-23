---
title: "Class Loader"
slug: "class-loader"
also-known-as: ["ClassLoader", "Class Loading", "Class Loader Subsystem"]
category: "system-design"
date: 2026-08-11
definition: "A class loader is the part of the [JVM](/glossary/jvm/) that finds `.class` files and brings their [bytecode](/glossary/bytecode/) into memory. It works in three phases: loading (read the class file), linking (verify the bytecode, prepare static fields, resolve references), and initialization (run static blocks). Classes load lazily on first use, and loaders follow a parent-first delegation model from the bootstrap loader down to the application loader, which prevents untrusted code from shadowing core Java classes."
key_takeaways:
  - "Class loading has three phases: loading, linking (verify, prepare, resolve), and initialization."
  - "Classes are loaded lazily, the first time they are actually referenced, not all at once at startup."
  - "The parent-first delegation model (bootstrap, platform, application) is a security feature that stops fake core classes."
  - "Each loaded class gets one `java.lang.Class` object on the heap, which is the handle reflection uses."
how_it_works:
  - "A loader is asked for a class and first delegates the request to its parent loader."
  - "If no parent can supply it, the loader reads the `.class` bytes and stores the metadata in the method area."
  - "Linking verifies the bytecode, allocates static fields with default values, and resolves symbolic references."
  - "Initialization runs static initializers exactly once per class, guaranteed thread-safe by the JVM."
real_world:
  - "Application servers and plugin systems use custom class loaders to isolate modules from each other."
  - "Hot-reload and live-restart tools swap class loaders to pick up recompiled classes without a full restart."
  - "A ClassNotFoundException or NoClassDefFoundError almost always points to a class loading or classpath problem."
related_terms: ["jvm", "bytecode", "jit-compilation", "garbage-collection", "jdwp", "java-annotation"]
related_posts:
  - "/how-jvm-works/"
  - "/how-java-debugging-works/"
  - "/java-custom-annotations/"
---
