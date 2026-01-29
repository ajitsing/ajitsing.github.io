---
layout: post
categories: mobile-development
seo: true
title: Integrating Sherlock with android apps
description: Learn how to integrate Sherlock library for crash reporting in Android apps. Get instant crash notifications with full stack traces and device info that you can share via email or messaging apps.
share-img: /assets/img/posts/android/cover.png
permalink: /integrating-sherlock-with-android-apps-to-get-crash-reports/
gh-repo: ajitsing/Sherlock
gh-badge: [star, fork, follow]
tags: [android]
comments: true
keywords: "android crash reporting, sherlock android library, android crash logs, crash notification android, crashlytics alternative, android app debugging, android error tracking, crash report sharing, android app stability, android development tools"
video:
  id: "cEQBJkTeRUQ"
  title: "Sherlock Android Crash Reporter Demo"
  description: "Demo of Sherlock library for Android crash reporting - get instant notifications with full crash details and share them via any app."
faq:
  - question: "What is Sherlock for Android?"
    answer: "Sherlock is an open-source Android library that captures crashes and shows local notifications with full crash details including stack trace, device info, and app version. Unlike Crashlytics, crashes are stored locally and can be shared via email, WhatsApp, or any sharing app."
  - question: "How do I integrate Sherlock in my Android app?"
    answer: "Add the dependency compile('com.github.ajitsing:sherlock:1.0.1@aar') { transitive = true } to build.gradle. Then call Sherlock.init(this) in your Application class onCreate(). That's it - crashes will now show notifications."
  - question: "How do I view all crashes with Sherlock?"
    answer: "Start CrashListActivity from anywhere in your app: startActivity(new Intent(this, CrashListActivity.class)). You can also get crash objects programmatically with Sherlock.getInstance().getAllCrashes() to build custom reports."
  - question: "Can I add custom app info to Sherlock crash reports?"
    answer: "Yes, implement AppInfoProvider and call Sherlock.setAppInfoProvider(). Use AppInfo.Builder to add custom fields like version, build number, or environment. Call this after Sherlock.init() or you'll get SherlockNotInitializedException."
---

Its always a challenge for an app tester to report crashes to the developers. Because most of the time they don't have enough info about the crash which can enable developers to start fixing the crash right away. Even if you are using Crashlytics, its hard to find the logs for your crash as crashlytics is the central server and has all the crashes and figuring out which one is yours is a nightmare.

Keeping this problem in mind, I created this android library named [Sherlock](https://github.com/ajitsing/Sherlock){:target="_blank"}. Yes its your apps private detective which can tell exactly where the crash occurred along with Device and Application information. It also enables you to share the crash details using any sharing app available on your device e.g mail, whatsapp, messenger etc.


# How to integrate Sherlock with your app?

Integrating Sherlock with your android application is very easy. You just need to add Sherlock as a dependency in your build.gradle file. And then initialize Sherlock in the Application class of your app.

```groovy
dependencies {
    compile('com.github.ajitsing:sherlock:1.0.1@aar') {
        transitive = true
    }
}
```

After adding the Sherlock to the build.gradle file sync your android studio project and then initialize Sherlock in your application class.


```java
package com.singhajit.login;

import android.app.Application;

import com.singhajit.sherlock.core.Sherlock;

public class SampleApp extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    Sherlock.init(this);
  }
}
```

Thats all you need to do to integrate Sherlock in your application. Now whenever your app will crash, Sherlock will give a notification. When you tap on that notification, it will open an activity with all the crash details.

Here is a small demo.

{% include youtubePlayer.html id="cEQBJkTeRUQ" %}

# Sherlock provides much more than just a crash notification

Using sherlock you can get list of all crashes that has occurred since you installed the application on your device. To see all the crashes, create a menu item or wherever you want to trigger that view from and start the CrashListActivity.

```java
import com.singhajit.sherlock.crashes.activity.CrashListActivity;

public class LoginActivity extends AppCompatActivity {
  private void showAllCrashes() {
    startActivity(new Intent(this, CrashListActivity.class));
  }
}
```

Apart from showing all the crashes, Sherlock can also give you all the crash objects it has persisted. You can utilize these crash objects for anything. One possible use case is to generate a custom crash report.

```java
Sherlock.getInstance().getAllCrashes();
```

&nbsp;
# App Information Provider

By default Sherlock only provides app version in the crash reports. If you want to add extra information, you need to provide your own AppInfoProvider to Sherlock.

```java
Sherlock.setAppInfoProvider(new AppInfoProvider() {
  @Override
  public AppInfo getAppInfo() {
    return new AppInfo.Builder()
               .with("Version", "2.21") //You can get the actual version using "AppInfoUtil.getAppVersion(context)"
               .with("BuildNumber", "221B")
               .build();
  }
});
```

Before doing this make sure that you have initialized Sherlock otherwise it will throw SherlockNotInitializedException.

Thats all folks! I hope you liked Sherlock. For any feedback or suggestion comment below and do share this post with others so that they can benefit from this library.
