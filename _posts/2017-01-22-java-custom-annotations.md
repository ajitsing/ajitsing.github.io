---
layout: post
title: Java custom annotations
cover-img: /assets/img/posts/java_annotations/cover.png
permalink: /java-custom-annotations
gh-repo: ajitsing/JavaCustomAnnotations
gh-badge: [star, fork, follow]
tags: [java]
comments: true
---

We use a lot of java annotations in our day to day coding. Ever thought how these annotations works? How you can leverage their power by creating your own annotations? This article will explain how these java annotations works and how you can define your own java annotations.

# Some java annotations

If you do TDD in java, you would have used ```@Test``` annotation on each and every test that you write. Also if you use ORMs like Hibernet or Libs to serialize and deserialize java objects e.g GSON or Jacson, you would have used annotations like ```@Expose``` or ```@JacsonXmlProperty``` etc. Libraries like junit, gson, jacson heavily use java annotations. If you have worked on spring apps there also you would see a lot of java annotations like ```@Autowired``` etc.

# How to create custom java annotations

Java annotation is nothing but an interface and we all know that creating an interface just takes few lines of code and its very simple. The whole point is if you have clarity on the purpose of your custom annotation, then its damn simple to create one.

Lets take an example of Junit test runner. If you had to design your own test runner, how would you implement it?

To explain java custom annotations better I have created this small [project on github](https://github.com/ajitsing/JavaCustomAnnotations) which is nothing but a custom test runner. I have tests which are marked with @MyTest annotation. TestRunner will execute all the tests marked with @MyTest annotation. Lets see the code.

# @MyTest<br><br>

{% highlight java linenos %}
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface MyTest {
}
{% endhighlight %}

The above code creates ```@MyTest``` annotation. ```@Retention(RUNTIME)``` tells java compiler that this annotation should be retained at RUNTIME.

# Test Cases<br><br>

{% highlight java linenos %}
public class Test {
    @MyTest
    public void firstTest() {
        System.out.println("Running first test");
    }

    @MyTest
    public void secondTest() {
        System.out.println("Running 2nd test");
    }

    public void thirdTest() {
        System.out.println("Running 3rd test");
    }

    private void helperMethod() {
        System.out.println("I am helper method");
    }
}
{% endhighlight %}

Test class contains all the tests. It has three tests but only two of them is marked with ```@MyTest``` annotation. Which means our test runner should execute only first two tests. Now lets take a look at our test runner which will run these tests.

# TestRunner<br><br>

{% highlight java linenos %}
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class TestRunner {
    public void runTests(Object test) throws InvocationTargetException, IllegalAccessException {
        Method[] allMethods = test.getClass().getDeclaredMethods();
        for (Method method : allMethods) {
            executeMethod(test, method);
        }
    }

    private void executeMethod(Object test, Method method) throws InvocationTargetException, IllegalAccessException {
        if (method.isAnnotationPresent(MyTest.class)) {
            method.invoke(test);
        }
    }
}
{% endhighlight %}

This test runner takes an object and runs tests present in that object. Tests are nothing but methods. So to run the tests we would need to get all the methods present in this object. To achieve that we will use reflection.

```test.getClass().getDeclaredMethods()``` returns all the methods present in test class. Then iterate over each method and check for MyTest annotation. If a method has ```@MyTest``` annotation then it invokes that method. And ultimately it runs your tests. Now lets see how to use this TestRunner.

# TestRunner Usage<br><br>

{% highlight java linenos %}
import java.lang.reflect.InvocationTargetException;

public class Main {

    public static void main(String[] args) throws InvocationTargetException, IllegalAccessException {
        TestRunner testRunner = new TestRunner();
        testRunner.runTests(new Test());
    }
}
{% endhighlight %}

In this Main class I create the new object of Test and pass it to testRunner. Thats all you need to do and your tests will be executed.

# Output

![Crepe](/assets/img/posts/java_annotations/test_runner.png)

As you can see above, our test runner successfully identified the tests marked with ```@MyTest``` annotation and executed them.

Thats all folks, I hope you liked this article. If you have any comments, feedback or suggestions, please leave a comment below and also subscribe to my blog. Thanks!
