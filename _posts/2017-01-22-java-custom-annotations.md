---
layout: post
seo: true
title: "Java Custom Annotations: How They Work and How to Write Your Own"
subtitle: "Retention, targets, reflection, and a small test runner that shows why Spring, JUnit, and Jackson all lean on @interface"
date: 2017-01-22
last-modified-date: 2026-08-22
categories: java
permalink: /java-custom-annotations/
thumbnail-img: /assets/img/posts/java/java-custom-annotations-thumb.png
share-img: /assets/img/posts/java/java-custom-annotations-thumb.png
description: "Learn Java custom annotations from scratch. Create an @interface, set @Retention and @Target, process annotations with reflection, and see how JUnit, Spring, and Jackson use the same idea."
keywords: "java custom annotations, java annotations, how to create custom annotation in java, java annotation tutorial, @interface java, @Retention java, @Target java, RetentionPolicy RUNTIME, java reflection annotations, java annotation processor, annotation processing java, create annotation java, java meta annotations, repeatable annotations java, spring custom annotation, junit @Test, jackson @JsonProperty, hibernate annotations, lombok annotation processor, java programming, spring boot, junit, maven, gradle, jdk"
tags: [java]
social-share: true
comments: true
gh-repo: ajitsing/JavaCustomAnnotations
gh-badge: [star, fork, follow]

quick-answer: "A **Java annotation** is metadata you attach to code with `@Name`. You declare a custom one with `@interface`, then tell the compiler where it may sit (`@Target`) and how long it lives (`@Retention`). **SOURCE** is dropped at compile time, **CLASS** is stored in the `.class` file but not visible at runtime, and **RUNTIME** can be read with reflection. Frameworks such as JUnit (`@Test`), Spring (`@Autowired`), and Jackson (`@JsonProperty`) are just custom annotations plus a processor. To write your own, define the annotation, mark the code, then either scan it at runtime with `isAnnotationPresent` or generate code at compile time with an annotation processor."

key-takeaways:
  - "Annotations do not change how a method runs by themselves. Something else, a compiler plugin, a framework, or your own reflection code, has to look at them and act."
  - "Always set @Retention and @Target. The default retention is CLASS, which is why a runtime scanner often sees nothing even though the annotation is on the source."
  - "RUNTIME retention plus reflection is how JUnit finds @Test methods. SOURCE retention plus an annotation processor is how Lombok and MapStruct generate code before your app starts."
  - "Annotation members look like methods. They can return primitives, String, Class, enums, annotations, or arrays of those, and they can have defaults. They cannot take parameters or throw checked exceptions."
  - "getDeclaredMethods sees private methods on that class. getMethods sees public methods including inherited ones. Pick the API that matches where you put the annotation."
  - "Prefer compile-time processing when you can. Runtime reflection is flexible, but it is slower, easier to get wrong with proxies, and it pushes failures from build time to production."

faq:
  - question: "How do I create a custom annotation in Java?"
    answer: "Declare it with @interface, then add @Retention and @Target. Example: @Retention(RetentionPolicy.RUNTIME) @Target(ElementType.METHOD) public @interface MyTest {}. You can add members such as int timeout() default 0. Use the annotation on a method, class, or field the same way you use @Test or @Override."
  - question: "What is @Retention in Java annotations?"
    answer: "@Retention says how long the annotation is kept. SOURCE means the compiler discards it after it is done. CLASS (the default) writes it into the .class file but the JVM does not have to keep it at runtime. RUNTIME keeps it in the class file and in memory so you can read it with reflection. Use RUNTIME when your own code or a framework will inspect the annotation while the program runs."
  - question: "What is the difference between @Target and @Retention?"
    answer: "@Target limits where you may put the annotation: TYPE for classes, METHOD for methods, FIELD for fields, PARAMETER for parameters, and so on. @Retention limits how long the annotation exists after you write it. They answer two different questions: where is this legal, and when is it still visible."
  - question: "How do I process custom annotations at runtime?"
    answer: "Use the Reflection API. Get the Class, Method, or Field, call isAnnotationPresent(MyTest.class), then getAnnotation(MyTest.class) to read member values. Typical loop: Method[] methods = obj.getClass().getDeclaredMethods(); then invoke the methods that carry your annotation. The annotation must use RetentionPolicy.RUNTIME or this returns nothing."
  - question: "What is a Java annotation processor?"
    answer: "An annotation processor is a plugin that javac runs during compilation. You extend AbstractProcessor, declare which annotation types you handle, and in process() you can validate code or generate new .java files. Tools like Lombok, MapStruct, Dagger, and Room work this way. Use RetentionPolicy.SOURCE for annotations that only exist to drive the processor."
  - question: "What are common uses for custom Java annotations?"
    answer: "Test discovery (@Test), dependency injection (@Autowired, @Inject), JSON mapping (@JsonProperty, @Expose), Bean Validation (@NotNull), JPA/Hibernate mapping (@Entity, @Column), compile-time code generation (Lombok, MapStruct), and any metadata you would otherwise stuff into XML or a marker interface."
  - question: "Why is my custom annotation null at runtime?"
    answer: "The usual cause is missing @Retention(RetentionPolicy.RUNTIME). The default is CLASS, so the annotation is in the bytecode but Class.getAnnotation returns null. Other causes: you used getMethods when the method is private, you inspected a JDK proxy that does not copy method annotations, or you put the annotation on an interface method and looked at the implementing class without scanning the interface."
  - question: "Can I put parameters on a Java annotation?"
    answer: "You cannot write methods with arguments. You declare members that look like no-arg methods: String value(); int timeout() default 5. If the only member is named value, callers can write @MyTest(5) instead of @MyTest(value = 5). Allowed types are primitives, String, Class, enums, annotations, and arrays of those. null is not a legal default."

citations:
  - name: "Oracle Java Tutorials: Annotations"
    url: "https://docs.oracle.com/javase/tutorial/java/annotations/index.html"
    author: "Oracle"
  - name: "Declaring an Annotation Type"
    url: "https://docs.oracle.com/javase/tutorial/java/annotations/declaring.html"
    author: "Oracle"
  - name: "RetentionPolicy (Java SE 21)"
    url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/annotation/RetentionPolicy.html"
    author: "Oracle"
  - name: "Creating a Custom Annotation in Java"
    url: "https://www.baeldung.com/java-custom-annotation"
    author: "Baeldung"
  - name: "Java Annotation Processing and Creating a Builder"
    url: "https://www.baeldung.com/java-annotation-processing-builder"
    author: "Baeldung"
  - name: "Java Annotations and Java Reflection"
    url: "https://www.vogella.com/tutorials/JavaAnnotations/article.html"
    author: "Vogella"
---

You put `@Test` on a method and JUnit runs it. You put `@Autowired` on a field and Spring fills it in. You put `@JsonProperty` on a getter and Jackson names the JSON field. None of those tags is magic. Each one is a small piece of metadata, plus some other code that knows how to read it.

That other code is the interesting part. A [Java annotation](/glossary/java-annotation/){:target="_blank" rel="noopener"} does nothing by itself. The compiler, a framework, or a few lines of reflection have to look at the tag and decide what to do. Once you see that split, writing your own annotations stops feeling like advanced Java and starts feeling like a labeling system.

This post rebuilds that system from scratch. We will look at the annotations you already use, the meta-annotations that control them, a custom `@MyTest` runner you can run locally, then the compile-time path that tools like Lombok use. The original mini [test runner on GitHub](https://github.com/ajitsing/JavaCustomAnnotations){:target="_blank" rel="noopener"} is still the working example. If you want the runtime that actually stores this metadata, the [how the JVM works](/how-jvm-works/){:target="_blank" rel="noopener"} guide sits underneath everything here.

{% include glossary-callout.html terms="java-annotation,annotation-processor,jvm,bytecode,class-loader" %}

## <i class="fas fa-tags"></i> What a Java Annotation Actually Is

An annotation is data about your code, not code that runs. Oracle's tutorial puts it plainly: annotations have no direct effect on the operation of the code they annotate. `@Override` does not override anything. It tells `javac` "please fail the build if this method does not override a parent method." `@Deprecated` does not stop callers. It tells the compiler and your IDE to warn them.

That is a different idea from a method call or an `if`. You are attaching a label. Some other program consumes the label later.

Java got annotations in JDK 5. Before that, frameworks stuffed the same information into XML files or marker interfaces (empty interfaces like `Serializable`). Annotations won because the metadata lives next to the thing it describes. When you rename a field, the `@Column` on it moves with it. An XML mapping in another file does not.

You declare a custom annotation with `@interface`. That is not a coincidence. An annotation type is a special kind of interface. The compiler generates a real interface for it, and at runtime you get a proxy that implements that interface so `timeout()` can return the value you wrote in source.

## <i class="fas fa-code"></i> Annotations You Already Use

If you write tests, you have used `@Test`. JUnit 5's `@Test` lives in `org.junit.jupiter.api`. JUnit 4's lives in `org.junit`. Same idea: mark methods, let a runner find them. You do not call `firstTest()` from `main`. The runner does.

If you map JSON, Jackson's `@JsonProperty` and Gson's `@Expose` tell the library which fields to include and what to name them. Hibernate and JPA use `@Entity` and `@Column` the same way for tables. Spring Boot apps are covered in annotations: `@SpringBootApplication`, `@RestController`, `@GetMapping`, `@Autowired`.

The JDK itself ships a small set you should know:

- `@Override` is a compile-time check. Retention is SOURCE.
- `@Deprecated` marks APIs that should not be used. Since Java 9 it can carry `since` and `forRemoval`.
- `@SuppressWarnings` silences specific compiler warnings. Also SOURCE.
- `@FunctionalInterface` documents that an interface has exactly one abstract method, and the compiler enforces it.
- `@SafeVarargs` is a promise about generic varargs.

Those last few are processed by `javac`. You never write a loop that looks for `@Override`. Custom annotations you invent for your own framework almost always need you to write that loop, or to write a processor that runs at compile time.

## <i class="fas fa-layer-group"></i> Meta-Annotations: Retention and Target

When you define an annotation, you annotate the annotation. Those tags are called meta-annotations. Two of them decide whether your custom type is usable.

**`@Retention`** answers "how long does this live?"

**`@Target`** answers "where may I put this?"

```mermaid
flowchart LR
    A["fa:fa-file-code <b>Source</b><br/>@MyTest on a method"] --> B["fa:fa-cog <b>javac</b>"]
    B -->|SOURCE| X["fa:fa-trash <b>Dropped</b><br/>not in .class"]
    B -->|CLASS default| C["fa:fa-file <b>.class file</b><br/>annotation stored"]
    B -->|RUNTIME| C
    C -->|CLASS| Y["fa:fa-eye-slash <b>JVM may drop it</b><br/>reflection sees nothing"]
    C -->|RUNTIME| D["fa:fa-search <b>Reflection</b><br/>isAnnotationPresent"]

    classDef src fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef compile fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#0f172a
    classDef cls fill:#e0f2fe,stroke:#0891b2,stroke-width:2px,color:#0f172a
    classDef run fill:#c8e6c9,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef drop fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#0f172a

    class A src
    class B compile
    class C cls
    class D run
    class X,Y drop
```

{% include ads/in-article.html %}

The three [retention policies](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/annotation/RetentionPolicy.html){:target="_blank" rel="noopener"} are:

| Policy | Still in source | In the `.class` file | Visible with reflection |
|--------|-----------------|----------------------|-------------------------|
| SOURCE | yes | no | no |
| CLASS | yes | yes | no |
| RUNTIME | yes | yes | yes |

CLASS is the default if you forget `@Retention`. That default is the number one reason a custom annotation "does not work." You put it on a method, you print `getAnnotation`, you get `null`. The compiler did its job. The JVM was never asked to keep the metadata around.

Use SOURCE when only the compiler or an [annotation processor](/glossary/annotation-processor/){:target="_blank" rel="noopener"} cares, for example Lombok-style code generation. Use RUNTIME when JUnit-style discovery, Spring-style injection, or your own scanner will read the annotation while the program runs. CLASS is rare in application code. Some bytecode tools read it from the class file without loading the class, but if you are using `java.lang.reflect`, you want RUNTIME.

`@Target` takes one or more `ElementType` values. The ones you will actually use:

- `TYPE`: class, interface, enum, record, annotation type
- `METHOD`, `FIELD`, `CONSTRUCTOR`, `PARAMETER`
- `TYPE_USE` and `TYPE_PARAMETER`: Java 8 type annotations, such as `List<@NonNull String>`
- `ANNOTATION_TYPE`: you can only put this on another annotation (meta-annotation)
- `RECORD_COMPONENT`: Java 16 records

If you omit `@Target`, the annotation is allowed on most declarations. Be explicit anyway. A test marker that accidentally compiles on a field is a footgun.

A few other meta-annotations show up often:

- `@Documented` includes the annotation in Javadoc.
- `@Inherited` copies a class-level annotation from a superclass to a subclass. It does not copy method annotations, and it does not apply to interfaces.
- `@Repeatable` (Java 8) lets you write the same annotation twice on one element. You also define a containing annotation that holds an array of them.

## <i class="fas fa-plus-circle"></i> How to Create a Custom Annotation

Start with the smallest useful example: a marker that means "this method is a test." That is how JUnit began, and it is enough to teach the whole loop.

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyTest {
    long timeout() default 0L;
    String reason() default "";
}
```

Members look like methods. They cannot take parameters or throw exceptions. Allowed return types are primitives, `String`, `Class`, enums, other annotations, and arrays of those. A default cannot be `null`.

If you have a single member named `value`, callers can skip the name:

```java
public @interface Role {
    String value();
}

@Role("admin")          // short form
@Role(value = "admin")  // same thing
```

That is why so many library annotations are written `@Qualifier("mainDataSource")` instead of `@Qualifier(name = "mainDataSource")`.

You can also make a marker with no members at all, which is what the first version of `@MyTest` was. Markers are fine when presence is the only signal you need.

## <i class="fas fa-flask"></i> A Tiny Test Runner with Reflection

Here is the original idea, cleaned up. You mark tests with `@MyTest`. A runner scans the class and invokes those methods. Helper methods without the annotation are ignored. Full source is in the [JavaCustomAnnotations](https://github.com/ajitsing/JavaCustomAnnotations){:target="_blank" rel="noopener"} repo.

```java
public class SampleTests {
    @MyTest
    public void firstTest() {
        System.out.println("Running first test");
    }

    @MyTest(timeout = 1000, reason = "checks the happy path")
    public void secondTest() {
        System.out.println("Running 2nd test");
    }

    public void thirdTest() {
        System.out.println("This is not a test");
    }

    private void helperMethod() {
        System.out.println("I am a helper");
    }
}
```

The runner uses reflection. It asks the [class loader](/glossary/class-loader/){:target="_blank" rel="noopener"}'s `Class` object for methods, then checks each one:

```java
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class TestRunner {
    public void runTests(Object test) throws Exception {
        Method[] allMethods = test.getClass().getDeclaredMethods();
        for (Method method : allMethods) {
            executeMethod(test, method);
        }
    }

    private void executeMethod(Object test, Method method)
            throws InvocationTargetException, IllegalAccessException {
        if (!method.isAnnotationPresent(MyTest.class)) {
            return;
        }
        MyTest spec = method.getAnnotation(MyTest.class);
        method.setAccessible(true);
        long started = System.nanoTime();
        method.invoke(test);
        long tookMs = (System.nanoTime() - started) / 1_000_000;
        if (spec.timeout() > 0 && tookMs > spec.timeout()) {
            throw new AssertionError(
                method.getName() + " took " + tookMs + " ms, limit is " + spec.timeout());
        }
    }
}
```

`getDeclaredMethods()` returns methods declared on that class, including private ones, and does not walk the superclass. `getMethods()` returns public methods, including inherited ones. JUnit-style runners usually want declared methods on the test class, so `getDeclaredMethods` is the right call. `setAccessible(true)` is only needed if you allow package-private or private tests.

Wire it from `main`:

```java
public class Main {
    public static void main(String[] args) throws Exception {
        new TestRunner().runTests(new SampleTests());
    }
}
```

Output is the two annotated methods. `thirdTest` and `helperMethod` never run, because they have no `@MyTest`.

```mermaid
flowchart TD
    M["fa:fa-play <b>main</b>"] --> R["fa:fa-cogs <b>TestRunner.runTests</b>"]
    R --> G["fa:fa-list <b>getDeclaredMethods</b>"]
    G --> Q{"isAnnotationPresent<br/>MyTest?"}
    Q -->|yes| I["fa:fa-bolt <b>method.invoke</b>"]
    Q -->|no| S["fa:fa-forward skip"]
    I --> T["fa:fa-clock optional timeout check"]

    classDef start fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef work fill:#e0f2fe,stroke:#0891b2,stroke-width:2px,color:#0f172a
    classDef yes fill:#c8e6c9,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef no fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#0f172a

    class M start
    class R,G work
    class I,T yes
    class S no
```

{% include ads/in-article.html %}

That is the entire JUnit discovery model, minus reporting, assertions, and lifecycle callbacks. JUnit 5's Jupiter engine still does a version of this scan, then builds a test plan from the methods it found.

One reflection detail that bites people: `method.invoke` wraps failures in `InvocationTargetException`. The real assertion error or runtime exception is `getCause()`. Unwrap it if you are building a runner you actually want to use.

## <i class="fas fa-industry"></i> Runtime vs Compile Time

You now have two ways to consume an annotation. Pick based on when the work should happen.

```mermaid
flowchart TD
    Q{"When must the<br/>annotation be read?"}
    Q -->|While the app runs| RT["fa:fa-search <b>RUNTIME + reflection</b><br/>JUnit, Spring, Jackson"]
    Q -->|While javac runs| CT["fa:fa-magic <b>SOURCE + processor</b><br/>Lombok, MapStruct, Dagger, Room"]
    RT --> RTN["Flexible, no extra build setup<br/>Cost: slower, errors at runtime"]
    CT --> CTN["Zero runtime cost<br/>Cost: processor module, rebuild"]

    classDef q fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef rt fill:#c8e6c9,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef ct fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#0f172a
    classDef note fill:#e0f2fe,stroke:#0891b2,stroke-width:2px,color:#0f172a

    class Q q
    class RT rt
    class CT ct
    class RTN,CTN note
```

{% include ads/in-article.html %}

**Runtime** is what we just built. The [bytecode](/glossary/bytecode/){:target="_blank" rel="noopener"} still contains the annotation, the JVM keeps it, and your code asks for it. Spring's `@Transactional`, Jackson's `@JsonIgnore`, and Bean Validation's `@NotNull` all work this way (sometimes with a bytecode enhancer on top).

**Compile time** uses the annotation processing API in `javax.annotation.processing` (still that package name inside the JDK). You extend `AbstractProcessor`, list the types you support, and in `process` you can emit new source files. `javac` compiles those in a later round. That is how MapStruct writes mapper implementations and how Dagger writes the dependency graph. Android's Room does the same during the [Android build process](/android-build-process/){:target="_blank" rel="noopener"}. Kotlin projects go through kapt or the faster KSP.

A processor skeleton looks like this:

```java
import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.annotation.processing.SupportedSourceVersion;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.TypeElement;
import java.util.Set;

@SupportedAnnotationTypes("com.example.MyTest")
@SupportedSourceVersion(SourceVersion.RELEASE_21)
public class MyTestProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations,
                           RoundEnvironment roundEnv) {
        roundEnv.getElementsAnnotatedWith(MyTest.class)
                .forEach(element -> {
                    // validate, or write a new .java file
                });
        return true;
    }
}
```

You register the processor in `META-INF/services/javax.annotation.processing.Processor`, or with Google's AutoService. For SOURCE retention, the annotation never reaches the running app. That is a feature: generated code has already done the work.

If you are choosing for a new library, prefer compile time when the annotation would otherwise force every call site to pay for reflection, or when a mistake should fail the build. Prefer runtime when behavior depends on objects that only exist after startup, such as "inject this field from the current Spring context."

## <i class="fas fa-cogs"></i> How Popular Libraries Use the Same Trick

Once you have written `@MyTest`, the big frameworks look less mysterious.

**JUnit** discovers tests by annotation, then runs before/after callbacks the same way. A [JUnit Rule](/junit-rules/){:target="_blank" rel="noopener"} is another annotation (`@Rule`) pointing at an object that wraps each test.

**Spring** reads `@Component`, `@Service`, and `@Autowired` to build the application context. Around `@Transactional` it often creates a [proxy](/design-patterns/proxy/){:target="_blank" rel="noopener"} so that begin/commit/rollback wrap the real method. If you later inspect the proxy with raw reflection, you may not see the annotation that was on the target class. Spring's `AnnotationUtils` and `AopUtils` exist because of that gap.

**Jackson** and Gson walk fields and methods, skip anything without the right annotation (or honor `@JsonIgnore`), and name properties from `@JsonProperty`.

**Jakarta Bean Validation** (`@NotNull`, `@Size`) is read by a validator at runtime, often on a REST controller argument.

**Lombok** is the compile-time extreme: `@Getter` is gone from the [bytecode](/glossary/bytecode/){:target="_blank" rel="noopener"} after the processor writes an actual `getName()` method. Your running program never sees `@Getter`.

You can mix both styles in one annotation type, but it is usually cleaner to pick one retention and stick to it.

## <i class="fas fa-exclamation-triangle"></i> Mistakes That Waste an Afternoon

**Forgetting RUNTIME.** If your scanner uses reflection, `@Retention(RetentionPolicy.RUNTIME)` is not optional. CLASS will compile and still return `null`.

**Scanning the wrong methods.** Private `@MyTest` methods are invisible to `getMethods()`. Inherited public tests are invisible to `getDeclaredMethods()`. Match the API to your rule.

**Looking at a JDK proxy.** `Proxy.newProxyInstance` can hide annotations on the target. Spring MVC controllers with class-level annotations sometimes need `AnnotationUtils.findAnnotation` instead of `clazz.getAnnotation`.

**Expecting `@Inherited` on methods.** It only copies type-level annotations down a class hierarchy. A `@MyTest` on a superclass method is already on that method object when you scan the superclass. It is not copied onto an override unless you put it on the override too.

**Illegal member types.** You cannot put a `List<String>` on an annotation. Use `String[]`. You cannot default a `String` member to `null`. Use `""` or make the member required.

**Doing heavy work in a runtime scanner on a hot path.** Reflection is fine at startup (Spring does a lot of it once). It is a poor choice inside a tight request loop. Cache the `Method` list, or generate code at compile time.

**Security and `setAccessible`.** Opening private methods is what a test runner needs. The same trick in production code can break modules (Java 16+ stronger encapsulation) and can surprise callers who thought a method was private. Keep it in frameworks, not in random business logic.

## <i class="fas fa-flag-checkered"></i> Wrapping Up

A custom Java annotation is a labeled interface plus a consumer. You write `@interface`, pin it down with `@Target` and `@Retention`, put it on the code you care about, then either scan it at runtime with reflection or let `javac` run a processor. That is the same pattern behind JUnit, Spring, Jackson, Hibernate, and Lombok.

The `@MyTest` runner is enough to prove the runtime path: marker on a method, `isAnnotationPresent`, `invoke`. Add members when you need data, not just a flag. Switch to SOURCE retention and an annotation processor when you want the work done before the process even starts.

Keep the retention policy honest, scan the methods you actually annotated, and remember that the annotation never runs by itself. The interesting code is always the reader.

---

**Related posts:**

- [How the JVM Works](/how-jvm-works/){:target="_blank" rel="noopener"} - Where class metadata and the Class object live, which reflection reads
- [How Java Debugging Works](/how-java-debugging-works/){:target="_blank" rel="noopener"} - Another look at JVM metadata, this time for breakpoints
- [Java 25 LTS Features](/java-25-lts-features/){:target="_blank" rel="noopener"} - What a modern JDK adds on top of the language these annotations use
- [JUnit Rules](/junit-rules/){:target="_blank" rel="noopener"} - Reusable test lifecycle, driven by the `@Rule` annotation
- [Android Build Process](/android-build-process/){:target="_blank" rel="noopener"} - Where Dagger, Room, kapt, and KSP run processors during a build
- [Proxy Design Pattern](/design-patterns/proxy/){:target="_blank" rel="noopener"} - How Spring wraps `@Transactional` methods without changing your class

*Further reading: Oracle's [Annotations tutorial](https://docs.oracle.com/javase/tutorial/java/annotations/index.html){:target="_blank" rel="noopener"} and [declaring an annotation type](https://docs.oracle.com/javase/tutorial/java/annotations/declaring.html){:target="_blank" rel="noopener"}, the [RetentionPolicy](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/annotation/RetentionPolicy.html){:target="_blank" rel="noopener"} API docs, Baeldung on [custom annotations](https://www.baeldung.com/java-custom-annotation){:target="_blank" rel="noopener"} and [annotation processing](https://www.baeldung.com/java-annotation-processing-builder){:target="_blank" rel="noopener"}, and Vogella's [annotations and reflection](https://www.vogella.com/tutorials/JavaAnnotations/article.html){:target="_blank" rel="noopener"} tutorial.*
