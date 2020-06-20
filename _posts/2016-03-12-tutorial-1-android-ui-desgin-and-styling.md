---
layout: post
title: Android UI Design And Styling
description: This tutorial covers DP, SP and Pixels in depth with examples. And what to use where. Android UI Design And Styling.
cover-img: /assets/img/posts/android_ui_styling/cover.png
permalink: /tutorial-1-android-ui-desgin-and-styling
gh-repo: ajitsing/androiduisessions
gh-badge: [star, fork, follow]
tags: [android]
comments: true
---

Hello friends, Recently I have been doing some Android UI Design And Styling training [sessions](https://github.com/ajitsing/AndroidUISessions){:target="_blank"}. So I thought to share it with the wider audience. And here I am with my first android ui design and styling tutorial. I will be writing more on the same topic. So, Lets get started...

# DP, SP & Pixels

As Android developers we always want our UI design to be device independent. Our design should work on any device and screen size. Keeping this in mind Android provides us few units that can help us to achieve our goal.

# DP

DP is ultimately dots per inch. On different android screens dots per inch/pixels per inch may differ. Now in that case if you use Pixels as unit while designing your UI then it will not look same on different screen sizes. Take a look at the below picture which describes the number of pixels on screens with different densities.

![Crepe](/assets/img/posts/android_ui_styling/android_ui_styling_1.png)

As you can see the higher the density of you screen is the more number of pixels screen will have. What will happen if you use pixels instead of dp. Take a look at the below picture.

![Crepe](/assets/img/posts/android_ui_styling/android_ui_styling_2.png)

The higher the density of the screen is the UI elements will appear smaller because the same number of pixels will be available in the smaller region of the screen.

# Types of DPIs

* ldpi - low dots per inch (number of pixels on the screen will be lowest)
* mdpi - medium dots per inch
* hdpi - high dots per inch
* xhdpi - extra hight dots per inch
* xxhdpi - extra extra high dots per inch (number of pixels on the screen will be highest)

![Crepe](/assets/img/posts/android_ui_styling/android_ui_styling_3.png)

This is how we can calculate the number of pixels for each dpi. So if you have given an height of 10dp to a View then it will occupy

10 * 0.75 pixels in ldpi screen
10 pixels in mdpi screen
10 * 1.5 pixels in hdpi screen
10 * 2 pixels in xhdpi screen

# SP

SP or scale independent pixel is used for fonts and is very much similar to DP with an extra feature that SP honours the user preference. For example you have a text with 10sp in your app and user goes to the android settings and changes the text size to Large, then the size of text defined in your application will also change. Lets understand it with an example.

```xml
    <TextView
        android:id="@+id/sp_text"
        android:text="Hello SP"
        android:textSize="40sp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

    <TextView
        android:id="@+id/dp_text"
        android:text="Hello DP"
        android:textSize="40dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
```

Now this is how it looks on the screen.

![Crepe](/assets/img/posts/android_ui_styling/android_ui_styling_4.png)

Now change the size of device text as below. (Settings -> Display -> Font Size)

![Crepe](/assets/img/posts/android_ui_styling/android_ui_styling_5.png)

Now jump to your application and relook at the texts. You will find that the text defined using SP has different size than the one defined using DP. [You can find the example here](https://github.com/ajitsing/AndroidUISessions){:target="_blank"}.

![Crepe](/assets/img/posts/android_ui_styling/android_ui_styling_6.png)

