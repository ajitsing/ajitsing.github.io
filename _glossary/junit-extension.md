---
title: "JUnit Extension"
slug: "junit-extension"
also-known-as: ["JUnit 5 Extension", "Jupiter Extension", "@ExtendWith", "@RegisterExtension"]
category: "system-design"
date: 2026-08-23
definition: "A JUnit Extension is the Jupiter replacement for a [JUnit 4 Rule](/glossary/junit-rule/). You implement callbacks such as `BeforeEachCallback` or `AfterAllCallback`, then register the extension with `@ExtendWith` on a class or with a `@RegisterExtension` field. Extensions wrap test execution the same way Rules did: shared setup, cleanup, parameter injection, and extra conditions, without copying `setUp` into every class. Current JUnit 6 docs still use this model on the JUnit Platform."
key_takeaways:
  - "New tests on JUnit 5 or 6 should use Extensions, not `org.junit.Rule`."
  - "`@ExtendWith` is declarative. `@RegisterExtension` is the instance-field style closest to `@Rule`."
  - "`@TempDir`, `assertThrows`, `@Timeout`, and `TestInfo` replace the old built-in rules."
  - "Spring Boot and Mockito register their own extensions instead of JUnit 4 rules."
how_it_works:
  - "Jupiter looks for registered extensions and calls their callbacks around each test or class."
  - "`ExtensionContext` gives you the test class, method, and a store for per-test state."
  - "You can implement several callback interfaces on one class if you need before and after."
  - "JUnit Vintage can still run old Rules on the platform, but it is a migration path, not the long-term API."
real_world:
  - "`@ExtendWith(SpringExtension.class)` or `@SpringBootTest` wires the Spring test context."
  - "`@ExtendWith(MockitoExtension.class)` initializes `@Mock` fields."
  - "A `DatabaseResetExtension` that implements `BeforeEachCallback` is the direct port of a `DatabaseResetRule`."
related_terms: ["junit-rule", "java-annotation", "jvm"]
related_posts:
  - "/junit-rules/"
  - "/java-custom-annotations/"
  - "/testing-android-database/"
---
