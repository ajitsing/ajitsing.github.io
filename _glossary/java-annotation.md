---
title: "Java Annotation"
slug: "java-annotation"
also-known-as: ["Annotation", "Custom Annotation", "@interface", "Java Annotations"]
category: "system-design"
date: 2026-08-22
definition: "A Java annotation is metadata attached to source code with an `@Name` tag. You declare a custom annotation with `@interface`, then control where it may appear with `@Target` and how long it is kept with `@Retention`. Annotations do not run by themselves. A compiler, an [annotation processor](/glossary/annotation-processor/), or runtime reflection has to read them and act. That is how JUnit finds `@Test` methods and how Spring honors `@Autowired`."
key_takeaways:
  - "Annotations are labels, not executable logic. Something else must consume them."
  - "`@Retention(RetentionPolicy.RUNTIME)` is required if you will read the annotation with reflection. The default is CLASS, which is invisible at runtime."
  - "`@Target` limits the annotation to types, methods, fields, parameters, and so on."
  - "Members look like methods and may return primitives, String, Class, enums, annotations, or arrays of those types."
how_it_works:
  - "You declare `@interface MyTest` and add meta-annotations for retention and target."
  - "You put `@MyTest` on a method, class, or field."
  - "At compile time a processor may generate code, or at runtime reflection calls `isAnnotationPresent` and `getAnnotation`."
  - "The [JVM](/glossary/jvm/) stores RUNTIME annotations with class metadata that the [class loader](/glossary/class-loader/) built from [bytecode](/glossary/bytecode/)."
real_world:
  - "JUnit uses `@Test` to discover test methods without a hardcoded list."
  - "Spring, Jackson, Hibernate, and Bean Validation all drive behavior from annotations."
  - "Lombok and MapStruct use SOURCE retention so the annotation disappears after code generation."
related_terms: ["annotation-processor", "jvm", "bytecode", "class-loader", "junit-rule", "junit-extension"]
related_posts:
  - "/java-custom-annotations/"
  - "/how-jvm-works/"
  - "/junit-rules/"
  - "/android-build-process/"
---
