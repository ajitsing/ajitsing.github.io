---
title: "Annotation Processor"
slug: "annotation-processor"
also-known-as: ["APT", "Java Annotation Processor", "Compile-Time Annotation Processing", "AbstractProcessor"]
category: "system-design"
date: 2026-08-22
definition: "An annotation processor is a plugin that `javac` runs while it compiles your code. It inspects [Java annotations](/glossary/java-annotation/) on source elements and can validate them or generate new `.java` files, which the compiler then compiles in a later round. Processors live in `javax.annotation.processing` and usually extend `AbstractProcessor`. Because the work happens at compile time, the generated code has zero extra runtime cost compared with a reflection scan after startup."
key_takeaways:
  - "Processors run inside the compiler, not inside your finished application."
  - "SOURCE retention is the usual choice when the annotation exists only to drive generation or checks."
  - "You register a processor with `META-INF/services/javax.annotation.processing.Processor` or a tool such as AutoService."
  - "Lombok, MapStruct, Dagger, and Android Room are the processors most developers meet every day."
how_it_works:
  - "`javac` loads processors and matches them to annotation types they claim to support."
  - "Each round, `process` receives the elements that carry those annotations."
  - "A processor may write new source. The compiler compiles it and starts another round until nothing new is produced."
  - "Kotlin projects often reach Java processors through kapt, or skip Java stubs with KSP."
real_world:
  - "MapStruct generates mapper implementations from `@Mapper` interfaces."
  - "Dagger generates the dependency injection graph from `@Inject` and `@Module`."
  - "Room generates SQLite bindings from `@Dao` and `@Entity` during the Android Gradle build."
related_terms: ["java-annotation", "bytecode", "class-loader", "jvm"]
related_posts:
  - "/java-custom-annotations/"
  - "/android-build-process/"
  - "/how-jvm-works/"
---
