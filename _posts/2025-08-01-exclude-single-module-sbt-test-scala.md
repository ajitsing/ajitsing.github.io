---
layout: post
title: How to Exclude a Single Module from `sbt test` in a Multi-Module Scala Project
description: Learn different approaches to exclude specific modules from sbt test execution in multi-module Scala projects, with code examples and CI-friendly solutions.
share-img: /assets/img/posts/scala/cover.png
thumbnail-img: /assets/img/posts/scala/cover.png
permalink: /exclude-single-module-sbt-test-scala/
tags: [scala, sbt, testing, ci-cd]
keywords: "sbt test exclude module, scala multi-module testing, sbt skip tests, scala build configuration, sbt aggregate exclude, scala testing best practices, sbt multi-project setup, scala ci cd testing"
comments: true
---

When working with multi-module Scala projects, there are scenarios where you need to exclude specific modules from the `sbt test` command. This could be due to long-running integration tests, modules with external dependencies, or simply modules that aren't ready for automated testing yet.

In this comprehensive guide, we'll explore different approaches to exclude modules from `sbt test`, compare their effectiveness, and determine which approach works best in CI/CD environments.

## Project Structure Overview

Let's start with a typical multi-module Scala project structure:

```scala
// build.sbt
ThisBuild / version := "0.1.0-SNAPSHOT"
ThisBuild / scalaVersion := "2.13.10"

lazy val root = (project in file("."))
  .aggregate(core, api, integration, utils)
  .settings(
    name := "multi-module-app"
  )

lazy val core = (project in file("core"))
  .settings(
    name := "core",
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.15" % Test
    )
  )

lazy val api = (project in file("api"))
  .dependsOn(core)
  .settings(
    name := "api",
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.15" % Test
    )
  )

lazy val integration = (project in file("integration"))
  .dependsOn(core, api)
  .settings(
    name := "integration",
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.15" % Test
    )
  )

lazy val utils = (project in file("utils"))
  .settings(
    name := "utils",
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.15" % Test
    )
  )
```

Now, let's say we want to exclude the `integration` module from running tests when we execute `sbt test` from the root project.

## Method 1: Command-Line Skip (Recommended)

The most flexible approach is to skip tests directly from the command line without any code changes. This uses sbt's `set` command to dynamically configure the skip setting.

```bash
# Skip integration tests without any code changes
sbt 'set integration / Test / skip := true' test

# Skip multiple modules
sbt 'set integration / Test / skip := true' 'set utils / Test / skip := true' test

# Run all tests normally
sbt test
```

You can also combine this with other sbt tasks:

```bash
# Skip integration and run compile + test
sbt 'set integration / Test / skip := true' compile test

# Skip integration, run tests, then package
sbt 'set integration / Test / skip := true' test package
```

**Pros:**
- **No code changes required** - works with any existing project
- **Maximum flexibility** - can be used on any module dynamically
- **CI-friendly** - easy to incorporate into build scripts
- **Temporary** - doesn't permanently modify build configuration
- **Discoverable** - visible in command history and build logs

**Cons:**
- **Verbose** - longer command line for multiple modules
- **Easy to forget** - no permanent documentation in code
- **Case-sensitive** - module names must match exactly

## Method 2: Using `skip in Test` Setting

A more permanent approach is to use the `skip in Test` setting directly in the build file to disable tests for specific modules.

```scala
// build.sbt
lazy val integration = (project in file("integration"))
  .dependsOn(core, api)
  .settings(
    name := "integration",
    Test / skip := true,  // Skip tests for this module
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.15" % Test
    )
  )
```

**Pros:**
- Simple and explicit
- Tests are completely skipped, saving build time
- Clear intention in the build file

**Cons:**
- Permanently disables tests for the module
- Requires code changes to re-enable tests
- Not flexible for different environments

## Method 3: Conditional Skip Based on System Properties

A more flexible approach is to conditionally skip tests based on system properties or environment variables.

```scala
// build.sbt
lazy val integration = (project in file("integration"))
  .dependsOn(core, api)
  .settings(
    name := "integration",
    Test / skip := sys.props.get("skip.integration.tests").contains("true"),
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.15" % Test
    )
  )
```

**Usage:**
```bash
# Skip integration tests
sbt -Dskip.integration.tests=true test

# Run all tests including integration
sbt test
```

**Pros:**
- Flexible - can be controlled at runtime
- No permanent code changes needed
- Good for different environments (dev, CI, prod)

**Cons:**
- Requires remembering the system property
- Can be forgotten in documentation

## Method 4: Using Custom Task Aliases

Create custom task aliases that exclude specific modules from testing.

```scala
// build.sbt
addCommandAlias("testWithoutIntegration", 
  "core/test; api/test; utils/test")

addCommandAlias("testUnit", 
  "core/test; api/test; utils/test")

addCommandAlias("testIntegration", 
  "integration/test")

addCommandAlias("testAll", "test")
```

**Usage:**
```bash
# Run tests excluding integration
sbt testWithoutIntegration

# Run only integration tests
sbt testIntegration

# Run all tests
sbt testAll
```

**Pros:**
- Very explicit and readable
- Easy to understand what's being tested
- Can create multiple combinations

**Cons:**
- Need to maintain aliases when adding/removing modules
- Verbose command definitions
- Must remember different command names

## Method 5: Using Test Configurations

Create separate test configurations for different test types.

```scala
// build.sbt
lazy val IntegrationTest = config("integration") extend Test

lazy val integration = (project in file("integration"))
  .dependsOn(core, api)
  .configs(IntegrationTest)
  .settings(
    name := "integration",
    inConfig(IntegrationTest)(Defaults.testSettings),
    Test / skip := true,  // Skip in regular test
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.15" % "test,integration"
    )
  )

// Root project aggregation
lazy val root = (project in file("."))
  .aggregate(core, api, integration, utils)
  .settings(
    name := "multi-module-app"
  )
```

**Usage:**
```bash
# Run unit tests only
sbt test

# Run integration tests only
sbt integration:test

# Run all tests
sbt test integration:test
```

**Pros:**
- Clean separation of test types
- Standard sbt approach
- Can have different test configurations

**Cons:**
- More complex setup
- Need to understand sbt configurations
- Requires specific knowledge of custom configs

## Method 6: Selective Aggregation

Remove the module from the root project's aggregation and handle it separately.

```scala
// build.sbt
lazy val root = (project in file("."))
  .aggregate(core, api, utils)  // integration excluded from aggregation
  .settings(
    name := "multi-module-app"
  )

lazy val integrationRoot = (project in file("integration-root"))
  .aggregate(integration)
  .settings(
    name := "integration-suite"
  )

// Keep integration module definition as before
lazy val integration = (project in file("integration"))
  .dependsOn(core, api)
  .settings(
    name := "integration",
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.15" % Test
    )
  )
```

**Usage:**
```bash
# Run unit tests
sbt test

# Run integration tests
sbt integrationRoot/test

# Run specific module tests
sbt integration/test
```

**Pros:**
- Clean separation at build level
- No conditional logic needed
- Clear project structure

**Cons:**
- Changes project structure
- May require build script updates
- Less discoverable

## Method 7: Environment-Based Configuration

Use environment variables to control test execution dynamically.

```scala
// build.sbt
val skipIntegrationTests = sys.env.get("SKIP_INTEGRATION_TESTS")
  .map(_.toLowerCase)
  .contains("true")

lazy val integration = (project in file("integration"))
  .dependsOn(core, api)
  .settings(
    name := "integration",
    Test / skip := skipIntegrationTests,
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.15" % Test
    )
  )
```

**Usage:**
```bash
# Skip integration tests
SKIP_INTEGRATION_TESTS=true sbt test

# Run all tests
sbt test
```

**Pros:**
- Environment-friendly
- Easy to set in CI/CD pipelines
- No command-line complexity

**Cons:**
- Environment variable dependency
- May not be obvious to new developers


## CI/CD Recommendations

For CI/CD environments, here are the most effective approaches:

### 1. **Command-Line Skip (Most Recommended)**

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup JDK
        uses: actions/setup-java@v2
        with:
          java-version: '11'
          distribution: 'adopt'
      - name: Run unit tests (skip integration)
        run: sbt 'set integration / Test / skip := true' test
        
  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    steps:
      - uses: actions/checkout@v2
      - name: Setup JDK
        uses: actions/setup-java@v2
        with:
          java-version: '11'
          distribution: 'adopt'
      - name: Run integration tests only
        run: sbt integration/test
```


### 2. **Environment Variables**


```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup JDK
        uses: actions/setup-java@v2
        with:
          java-version: '11'
          distribution: 'adopt'
      - name: Run unit tests
        run: SKIP_INTEGRATION_TESTS=true sbt test
        
  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    steps:
      - uses: actions/checkout@v2
      - name: Setup JDK
        uses: actions/setup-java@v2
        with:
          java-version: '11'
          distribution: 'adopt'
      - name: Run integration tests
        run: sbt integration/test
```

      - name: Run integration tests
        run: sbt integration/test


### 3. **Conditional Skip with System Properties**


```yaml
# Jenkins pipeline example
pipeline {
    agent any
    stages {
        stage('Unit Tests') {
            steps {
                sh 'sbt -Dskip.integration.tests=true test'
            }
        }
        stage('Integration Tests') {
            steps {
                sh 'sbt integration/test'
            }
        }
    }
}
```

## Best Practices

1. **Document Your Approach**: Clearly document which method you're using and how to run different test suites.

2. **Consistent Naming**: Use consistent naming conventions for your exclusion mechanisms.

3. **Default to Safe**: Make the default behavior run the most critical tests.

4. **Parallel Execution**: Consider running excluded tests in parallel stages in CI.

5. **Test Organization**: Group tests logically (unit, integration, end-to-end).

## Summary

For most multi-module Scala projects, **Method 1 (Command-Line Skip)** is the most recommended approach, followed by **Method 3 (Conditional Skip)** or **Method 7 (Environment Variables)**. The command-line approach provides the best balance of flexibility, simplicity, and CI/CD friendliness because it:

- **Requires zero code changes** - works with any existing project immediately
- **Maximum flexibility** - can skip any combination of modules dynamically  
- **Easy CI/CD integration** - simple to add to any build pipeline
- **Clear documentation** - the intent is visible in build logs and command history
- **Temporary by design** - doesn't permanently modify project configuration

**Quick Reference:**
```bash
# Skip single module
sbt 'set integration / Test / skip := true' test

# Skip multiple modules  
sbt 'set integration / Test / skip := true' 'set utils / Test / skip := true' test

# Skip and run other tasks
sbt 'set integration / Test / skip := true' compile test package
```

Choose the approach that best fits your team's workflow and CI/CD requirements. The key is consistency and clear documentation for your development team.