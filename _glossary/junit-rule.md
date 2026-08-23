---
title: "JUnit Rule"
slug: "junit-rule"
also-known-as: ["@Rule", "TestRule", "JUnit 4 Rule", "MethodRule"]
category: "system-design"
date: 2026-08-23
definition: "A JUnit Rule is a reusable object that wraps a JUnit 4 test method (or a whole class with `@ClassRule`) so setup, cleanup, timeouts, and extra checks live in one place. You implement `TestRule` or extend `ExternalResource`, then put a public field annotated with `@Rule` on each test class that needs it. That is the same job as `setUp` and `tearDown`, without copying those methods into every class. JUnit 5 and 6 replace Rules with [extensions](/glossary/junit-extension/)."
key_takeaways:
  - "A Rule wraps the test `Statement`: work before `evaluate()` is setup, work in `finally` after it is cleanup."
  - "The `@Rule` field must be public and non-static. `@ClassRule` fields must be public and static."
  - "Write a Rule when more than one test class needs the same lifecycle. Keep `@Before`/`@After` for logic that is unique to one class."
  - "On new Jupiter tests, prefer an Extension instead of adding more `TestRule` classes."
how_it_works:
  - "The JUnit 4 runner finds `@Rule` with reflection, the same way it finds `@Test`."
  - "`apply` receives the current test `Statement` and returns a wrapper `Statement`."
  - "The wrapper runs around `@Before`, the test method, and `@After`."
  - "Several rules nest. `RuleChain` or `@Rule(order = ...)` makes that order explicit."
real_world:
  - "Teams extract a `DatabaseResetRule` so every service test starts from an empty schema."
  - "JUnit ships `TemporaryFolder`, `Timeout`, `ExpectedException`, and `ExternalResource`."
  - "Older Android Espresso tests use `ActivityTestRule`, which is a Rule that launches an Activity."
related_terms: ["junit-extension", "java-annotation", "jvm"]
related_posts:
  - "/junit-rules/"
  - "/java-custom-annotations/"
  - "/testing-android-database/"
  - "/android-instrumentation-testing-using-espresso/"
---
