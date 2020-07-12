---
layout: post
title: What happens when android screen rotates?
description: Understand with example and demo that what happens when android screen rotates? How it causes lose of data?
share-img: /assets/img/posts/android/cover.png
permalink: /what-happens-when-android-screen-rotates/
gh-repo: ajitsing/AndroidScreenRotationDemo
gh-badge: [star, fork, follow]
tags: [android]
comments: true
---

Rotating the android device changes the device configuration. Android replaces the current resources with the best suited resources for that screen orientation. Thats why when we add a resource in android we add different versions of that resource. For example an image can be added in four formats(hdpi, mdpi, xhdpi, xxhdpi). The below screen shot shows the same resource for different screen sizes.

![Crepe](/assets/img/posts/android_screen_rotation/android_screen_rotation_1.png)

# Lets understand this with an example

For this [example](https://github.com/ajitsing/AndroidScreenRotationDemo){:target="_blank"} I have created two different layout files with the same name. One is present in the res/layout folder and other is in res/layout-land. Both the layouts contains just a TextView with different texts so that we can easily figure out which resource is loaded.

### `activity_main.xml` in res/layout<br><br>

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:tools="http://schemas.android.com/tools"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:paddingLeft="@dimen/activity_horizontal_margin"
                android:paddingRight="@dimen/activity_horizontal_margin"
                android:paddingTop="@dimen/activity_vertical_margin"
                android:paddingBottom="@dimen/activity_vertical_margin"
                android:background="@android:color/holo_blue_dark"
                tools:context=".MainActivity">

    <TextView
        android:text="@string/portrait"
        android:textSize="30dp"
        android:textColor="@android:color/white"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

</RelativeLayout>
```
<br>

###  `activity_main.xml` in res/layout-land<br><br>

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:tools="http://schemas.android.com/tools"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:paddingLeft="@dimen/activity_horizontal_margin"
                android:paddingRight="@dimen/activity_horizontal_margin"
                android:paddingTop="@dimen/activity_vertical_margin"
                android:paddingBottom="@dimen/activity_vertical_margin"
                android:background="@android:color/holo_blue_dark"
                tools:context=".MainActivity">

    <TextView
        android:text="@string/landscape"
        android:textSize="40dp"
        android:textColor="@android:color/white"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

</RelativeLayout>
```
<br>

# Watch the below video to see the above code in action<br><br>

{% include googleDrivePlayer.html id="1NYJLqXypJO71OoKAFxg79VYjwxLKS4Jd/preview" %}
<br>

# How android loads the different layout

When screen rotates, Android destroys the current activity and recreates it. Which means the Activity methods will be called in following order.

Destroys current activity with  `onPause()` => `onStop()` => `onDestroy()`

Creates same activity with different resources using  `onCreate()` => `onStart()` => `onResume()`

When onCreate method is called we call `setContentView(R.layout.activity_main)` in it. Which loads the new layout resource. And because it destroys the current activity your data on the screen will be lost.

Thats all what happens when android screen rotates. If you have any doubts or any suggestion or any feedback please leave a comment.
