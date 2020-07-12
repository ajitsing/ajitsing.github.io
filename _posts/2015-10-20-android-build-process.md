---
layout: post
title: Android Build Process
description: How Android build process works? What are the tools involved from android sdk and what they do? Lets understand all the steps involved in build process.
cover-img: /assets/img/posts/android_build_process/cover.jpg
permalink: /android-build-process/
tags: [android]
comments: true
---

There are a lot of steps involved in android build process. We will discuss them one by one. But before jumping to the explanation lets take a look at the below diagram first where I have tried to put all the steps of build process together.

![Crepe](/assets/img/posts/android_build_process/android_build_process_1.png)

# AAPT Tool

`AAPT` stands for [android assets packaging tool](https://developer.android.com/studio/command-line/aapt2){:target="_blank"}. This tool comes with the Android SDK and present in `$ANDROID_HOME/platform-tools/`. It takes all the resources present in the `res/` directory and compiles them. It generates a R.java file which contains ids of all the resources. Once you have installed the Android SDK you can directly execute the aapt commands.

# Android Build Process Steps

* `AAPT` takes all the resources present in res/ directory and AndroidManifest.xml(meta data of android app) and compiles all the resources. It creates a R.java class which has all the resource ids.

```bash
$ aapt
Android Asset Packaging Tool

Usage:
 aapt l[ist] [-v] [-a] file.{zip,jar,apk}
   List contents of Zip-compatible archive.

 aapt d[ump] [--values] [--include-meta-data] WHAT file.{apk} [asset [asset ...]]
   strings          Print the contents of the resource table string pool in the APK.
   badging          Print the label and icon for the app declared in APK.
   permissions      Print the permissions from the APK.
   resources        Print the resource table from the APK.
   configurations   Print the configurations in the APK.
   xmltree          Print the compiled xmls in the given assets.
   xmlstrings       Print the strings of the given compiled xml assets.

 aapt p[ackage] [-d][-f][-m][-u][-v][-x][-z][-M AndroidManifest.xml] \
        [-0 extension [-0 extension ...]] [-g tolerance] [-j jarfile] \
        [--debug-mode] [--min-sdk-version VAL] [--target-sdk-version VAL] \
        [--app-version VAL] [--app-version-name TEXT] [--custom-package VAL] \
        [--rename-manifest-package PACKAGE] \
        [--rename-instrumentation-target-package PACKAGE] \
        [--utf16] [--auto-add-overlay] \
        [--max-res-version VAL] \
        [-I base-package [-I base-package ...]] \
        [-A asset-source-dir]  [-G class-list-file] [-P public-definitions-file] \
        [-S resource-sources [-S resource-sources ...]] \
        [-F apk-file] [-J R-file-dir] \
        [--product product1,product2,...] \
        [-c CONFIGS] [--preferred-configurations CONFIGS] \
        [--split CONFIGS [--split CONFIGS]] \
        [--feature-of package [--feature-after package]] \
        [raw-files-dir [raw-files-dir] ...] \
        [--output-text-symbols DIR]
```

* Then all the java files including R.java gets compiled into byte code.

* Android application runs on dalvik vm so the byte code is cross compiled to the Dalvik byte code (.dex file)

* The .dex file and the compiled resources together forms the .apk file.

* Generated apk file is a debug build, to make a release build we need to sign the apk file using a key. You can do this from Android Studio.

![Crepe](/assets/img/posts/android_build_process/android_build_process_2.png)

* Once you sign the apk file it will be ready to use in production.
