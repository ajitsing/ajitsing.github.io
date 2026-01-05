---
layout: post
seo: true
title: Gradient color in android
description: How to use Gradient color in android as background or any component's background. Its very simple task to create a gradient color.
share-img: /assets/img/posts/android_ui_styling/cover.png
permalink: /gradient-color-in-android/
tags: [android]
comments: true
keywords: "android gradient color, android background gradient, gradient xml android, android drawable gradient, android ui design, gradient color tutorial, android layout background, android xml example, android color resources, android app styling"
video:
  id: "NxRJNqOL-lk"
  title: "Android Gradient Color Background Tutorial"
  description: "Learn how to create beautiful gradient color backgrounds in Android using XML drawable files."
faq:
  - question: "How do I create a gradient background in Android?"
    answer: "Create an XML file in res/drawable with a selector containing a shape with gradient element. Set android:startColor, android:endColor, and optionally android:centerColor. Use android:angle (multiples of 45) to set direction. Apply to any view with android:background='@drawable/your_gradient'."
  - question: "What does android:angle do in gradient?"
    answer: "android:angle controls the direction of the gradient. It only works with multiples of 45 (0, 45, 90, 135, 180, etc.). 0 means left to right, 90 means bottom to top, 180 means right to left, 270 means top to bottom."
  - question: "Can I add more than two colors to an Android gradient?"
    answer: "Yes, use android:centerColor to add a third color in the middle of the gradient. The gradient will smoothly transition from startColor through centerColor to endColor."
  - question: "How do I apply gradient to a button in Android?"
    answer: "Create a gradient drawable XML file and set it as the button's background using android:background='@drawable/gradient_button' in your layout XML, or programmatically with button.setBackground(getDrawable(R.drawable.gradient_button))."
---

Hello Folks, In this post I will be showing how we can create gradient color in android and use it as a background. To create a gradient color we need to create an .xml file in the drawable directory. Below is the directory structure where you should put your .xml file.

![Crepe](/assets/img/posts/android_gradient/android_gradient_1.png)

# See it live<br><br>

{% include youtubePlayer.html id="NxRJNqOL-lk" %}

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

