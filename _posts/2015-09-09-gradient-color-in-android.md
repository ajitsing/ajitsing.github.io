---
layout: post
title: Gradient color in android
description: How to use Gradient color in android as background or any component's background. Its very simple task to create a gradient color.
cover-img: /assets/img/posts/android_ui_styling/cover.png
permalink: /gradient-color-in-android
tags: [android]
comments: true
---

Hello Folks, In this post I will be showing how we can create gradient color in android and use it as a background. To create a gradient color we need to create an .xml file in the drawable directory. Below is the directory structure where you should put your .xml file.

![Crepe](/assets/img/posts/android_gradient/android_gradient_1.png)

# See it live<br><br>

{% include youtubePlayer.html id="NxRJNqOL-lk" %}
<br>

# What goes inside this xml file??<br><br>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item>
        <shape>
            <gradient
                android:startColor="@color/application_background"
                android:endColor="@color/bright_red"
                android:angle="45"/>
        </shape>
    </item>
</selector>
```

In the above file we add an selector with a gradient. There are a few things to note here.

1. **android:startColor:** This is the starting color of the gradient. This color will start from the top of the screen.

2. **android:endColor:** This is the ending color of the gradient.

3. **android:centerColor:** This color will come in the center of the screen.

4. **android:angle:** This is a special angle and works only with the multiple of 45 including 0. So you can give 0, 45, 90, 135 and so on. Depending on the angle gradient position will change on the screen.

# How to use this gradient

You can use this gradient in any layout file. below is an example.

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:background="@drawable/gradient_color">

    <TextView
        android:textColor="@color/white"
        android:textSize="25dp"
        android:textStyle="bold"
        android:gravity="center"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
</RelativeLayout>
```
<br>

# Below are some samples of gradient backgrounds<br><br>

```xml
<gradient
    android:startColor="#ff9a6922"
    android:centerColor="#ff9a4025"
    android:endColor="#ff9a0e32"
    android:angle="45"/>
```

![Crepe](/assets/img/posts/android_gradient/android_gradient_2.png)

```xml
<gradient
    android:startColor="#ff2d9a59"
    android:centerColor="#ff42959a"
    android:endColor="#ff23729a"
    android:angle="135"/>
```

![Crepe](/assets/img/posts/android_gradient/android_gradient_3.png)

