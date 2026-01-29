---
layout: post
categories: mobile-development
seo: true
title: Android Instrumentation Testing Using Espresso
description: Recently people have started doing Android Instrumentation Testing Using Espresso. In this article we will see a demo of espresso testing.
share-img: /assets/img/posts/android/cover.png
permalink: /android-instrumentation-testing-using-espresso/
gh-repo: ajitsing/InstrumentationTestDemo
gh-badge: [star, fork, follow]
tags: [android, testing, espresso]
comments: true
keywords: "android instrumentation testing, espresso testing, android ui testing, espresso framework, android test automation, android testing tutorial, espresso api, android test example, android test automation tools, android testing best practices"
faq:
  - question: "What is Espresso in Android testing?"
    answer: "Espresso is Google's UI testing framework for Android. It provides APIs to find views, perform actions (click, type), and verify results. Espresso automatically waits for the main thread to be idle, eliminating the need for Thread.sleep() and making tests reliable."
  - question: "How do I write an Espresso test?"
    answer: "Use three steps: find the view with onView(withId(R.id.button)), perform action with .perform(click()), and verify with .check(matches(isDisplayed())). Example: onView(withId(R.id.submit)).perform(click()).check(matches(isDisplayed()))."
  - question: "What is the difference between onView and onData in Espresso?"
    answer: "onView works with views directly visible in the hierarchy. onData works with adapter-based views (ListView, RecyclerView) where items may not be loaded yet. Use onData for scrolling to and interacting with items in long lists."
  - question: "How do I add Espresso to my Android project?"
    answer: "Add to build.gradle: androidTestImplementation 'androidx.test.espresso:espresso-core:3.x.x' and androidTestImplementation 'androidx.test:runner:1.x.x'. Set testInstrumentationRunner in defaultConfig. Place tests in src/androidTest/java."
---

Hello Folks, This is my second article on Android Instrumentation testing. My previous instrumentation testing [article](http://www.singhajit.com/instrumentation-testing-of-listview/){:target="_blank"} was about testing a list view with core instrumentation (without any external library or framework). In this I am going to discuss the Espresso framework which I use for android instrumentation testing. I have also recored a series of [videos](https://www.youtube.com/watch?v=gdsxVfq-yNM&list=PLFYf87MeyEq588ibGPTu5lEhnJZG6KsmR){:target="_blank"} on instrumentation testing in Android.

# What is Espresso?

Espresso is a framework used for Android Instrumentation Testing. It provides a lots of useful APIs to test the UI elements and simulate the user interaction on the application. Espresso takes care of waiting for the main thread to be idle and perform the actions at the appropriate time. With this we will not have to put hacks like `Thread.sleep` in the code.  Espresso can run on devices with `Android 2.2`  or higher (API 8 or higher).

# Espresso Matchers

Espresso has two core APIs

1. To access the view elements or verify the view elements.
2. To perform an action on the view.

For Example below code verifies that element is present on the view

```java
onView(withId(R.id.items_list)).check(matches(isDisplayed()))
onView(withId(R.id.items_list)).check(matches(withChild(withText("Item 1"))))
```

Below is an example of swiping up the screen and clicking an item on the view

```java
onView(withId(R.id.parent_layout)).perform(swipeUp());
onView(withId(R.id.submit_button)).perform(click());
```
<br>

# Setup Espresso

Below is the build config of my demo project

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 22
    buildToolsVersion "21.1.2"

    defaultConfig {
        applicationId "ajitsingh.com.instrumentationtestdemo"
        minSdkVersion 21
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    packagingOptions {
        exclude 'LICENSE.txt'
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:support-annotations:22.2.0'

    androidTestCompile 'com.android.support.test:rules:0.3'
    androidTestCompile('com.android.support.test.espresso:espresso-core:2.2') {
        exclude group: 'com.android.support', module: 'support-annotations'
    }
    androidTestCompile('com.android.support.test.espresso:espresso-intents:2.2') {
        exclude group: 'com.android.support', module: 'support-annotations'
    }
}
```
<br>

# Example

I have created a demo [project](https://github.com/ajitsing/InstrumentationTestDemo){:target="_blank"} which has one [test class](https://github.com/ajitsing/InstrumentationTestDemo/blob/master/app/src/androidTest/java/ajitsingh/com/instrumentationtestdemo/ItemListActivityEspressoTest.java){:target="_blank"} which uses espresso and another with [core instrumentation](https://github.com/ajitsing/InstrumentationTestDemo/blob/master/app/src/androidTest/java/ajitsingh/com/instrumentationtestdemo/ItemListActivityTest.java){:target="_blank"}

```java
@RunWith(AndroidJUnit4.class)
public class ItemListActivityEspressoTest {

  @Rule
  public ActivityTestRule<ItemListActivity> main = new ActivityTestRule<ItemListActivity>(ItemListActivity.class){
    @Override
    protected void beforeActivityLaunched() {
      Intents.init();
      super.beforeActivityLaunched();
    }

    @Override
    protected void afterActivityFinished() {
      super.afterActivityFinished();
      Intents.release();
    }
  };

  @Test
  public void shouldLaunchTheMainActivityAndFindItemsInTheList() throws Exception {
    onView(withId(R.id.items_list)).check(matches(withChild(withText("Item 1"))));
    onView(withId(R.id.items_list)).check(matches(withChild(withText("Item 2"))));
    onView(withId(R.id.items_list)).check(matches(withChild(withText("Item 3"))));
    onView(withId(R.id.items_list)).check(matches(withChild(withText("Item 4"))));
  }

  @Test
  public void shouldShowTheItemDetailWhenAnItemIsClicked() throws Exception {
    intending(hasComponent(ItemDetailActivity.class.getName()))
      .respondWith(new Instrumentation.ActivityResult(Activity.RESULT_OK, new Intent()));

    onView(withText("Item 1")).perform(click());
    intended(hasComponent(ItemDetailActivity.class.getName()));
  }
}
```
<br>
