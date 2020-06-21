---
layout: post
title: Junit Rules Vs Setup and TearDown
description: This articles covers implementing your own junit rules and its benefits over setup and teardown.
cover-img: /assets/img/posts/junit_rules/cover.png
permalink: /junit-rules
tags: [java, junit, testing]
comments: true
---

There has been a lot of confusion when it comes to Junit Rules. People hardly use it or avoid using it without knowing its essence. This article will cover the power of junit rules and how to implement them. Also we will see whats the benefits of using junit rules over `setup()` and `tearDown()` methods.

# What is a Junit Rule?

Well, Its nothing but a junit annotation [@Rule](http://junit.org/apidocs/org/junit/rules/TestRule.html){:target="_blank"}. You can use this annotation on anything that returns a [MethodRule](http://junit.org/apidocs/org/junit/rules/TestRule.html){:target="_blank"} or a [TestRule](http://junit.org/apidocs/org/junit/rules/TestRule.html){:target="_blank"}. A rule can run before or after a test. You can create your own rules which can replace your setup() and tearDown() methods.

# Use Case

Now lets come to the interesting part of the article. When would I want to use a rule or let me put it in other way, Tell me a use case where Rule would be a better fit than anything.

So, here is my use case. I am writing test for a Class which uses database and I want to start my test with an empty database. I will setup my data in the test itself. Now you might ask why to use a Rule when I can do this with a `setup()` method. Well, you are right but what if you have multiple classes which uses database. In that case you have to implement `setup()` method in each of the test file where you can implement it once in your Rule and use it in all the tests.

This is one example, what if you don't just have to clear the database but write something which is comparatively big in implementation and is being used in multiple test classes.

# Implementation

Lets implement our custom Rule which will clear the database. before the test starts.

```java
import org.junit.rules.TestRule;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;

public class DatabaseResetRule implements TestRule {

  @Override
  public Statement apply(final Statement base, Description description) {
    return new Statement() {
      @Override
      public void evaluate() throws Throwable {
        //code here executes before test runs
        clearDatabase();
        base.evaluate();
        //code here executes after test is finished
      }
    };
  }

  private void clearDatabase() {
    //write code to clear the database.
  }
}
```

`DatabaseResetRule` implements `TestRule` which has only one method `apply()`.

Now we can use this rule in as many test files as we want. Below is an example.

```java
public class UserServiceTest {
  @Rule
  DatabaseResetRule rule = new DatabaseResetRule();

  public void shouldAddUserToDatabase() {
   User user = new User("Ajit");
   UserService service = new UserService();
   service.add(user);
   assertNotNull(service.getUserByName("Ajit"));
  }

  public void shouldGetAllUsers() {
   User user = new User("Ajit");
   UserService service = new UserService();
   service.add(user);
   assertThat(service.getAllUsers().size(), is(1));
  }
}
```
<br>

# Benefits Of Junit Rules Over Setup & TearDown

The main benefit of junit rule is you have to write it once and use it as many times as you want. whereas `setup()` and `tearDown()` are the methods that has to be written for every TestClass on ad-hoc basis.

