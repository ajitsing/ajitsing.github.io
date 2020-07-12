---
layout: post
title: apkToJava - Gem to convert apk file to java code
description: Ruby gem to convert apk file to java code and open it in a gui. It will setup your environment and process the apk file to java code. Mac and Linux
share-img: /assets/img/posts/android/cover.png
permalink: /convert-apk-file-to-java-code/
gh-repo: ajitsing/apkToJava
gh-badge: [star, fork, follow]
tags: [android, rubygem]
comments: true
---

Hello Friends, here I am with another cool [ruby gem](https://rubygems.org/gems/apkToJava){:target="_blank"} [apkToJava](https://github.com/ajitsing/apkToJava){:target="_blank"} which will help you to improve your productivity while working on android project. This gem can convert apk file to java code and open it in a friendly GUI.

# Steps followed to convert apk file to java code

1. Convert apk to zip file
2. unzip the file and extract classes.dex from it
3. use dex2jar to convert classes.dex to a jar file
4. use jadx to open the jar in gui

apart from the above mentioned steps it takes care of installing dex2jar and jadx on its own when you first time use this gem to convert apk to java code.

# Installation

You just require ruby to be installed on your system nothing else. Then you need to install ```apkToJava``` gem with the below command.

```bash
gem install apkToJava
```

# See it in action:<br><br>

{% include youtubePlayer.html id="YDWg-bgsAfc" %}
<br>

# How to use it?<br><br>

### To setup the environment<br><br>

```bash
apkToJava setup
```

![Crepe](/assets/img/posts/apk_to_java/apk_to_java_1.png)
<br><br>

### To convert apk to java code<br><br>

```bash
apkToJava /path/to/apk/file.apk
```

![Crepe](/assets/img/posts/apk_to_java/apk_to_java_2.png)

### For help just type apkToJava and it will print the below usage.

![Crepe](/assets/img/posts/apk_to_java/apk_to_java_3.png)

# Supported Operating Systems

Currently apkToJava supports below operating systems

1. Mac
2. Linux

I am yet to add windows support for it, but that will be derived from your requirements. If you want apkToJava to support windows as well comment below and let me know. You can even contribute to it [here](https://github.com/ajitsing/apkToJava){:target="_blank"}.

Thanks!