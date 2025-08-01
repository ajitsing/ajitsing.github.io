---
layout: post
title: Android Custom Animations
description: Android Custom Animations will cover how to create custom animations using pure xml tags e.g "alpha", "scale", "translate" and "rotate".
share-img: /assets/img/posts/android_custom_animation/cover.jpg
permalink: /android-custom-animations/
gh-repo: ajitsing/androiduisessions
gh-badge: [star, fork, follow]
tags: [android]
comments: true
keywords: "android custom animations, android xml animation, alpha animation, scale animation, rotate animation, translate animation, android UI effects, android animation tutorial, android UI design, android animation xml example"
---

Hello Folks, Recently I have been writing around Android UI Styling and Design. This is my yet another article on Android UI styling. In this article I will cover how we can create custom animations using pure xml tags. Here is my [github repo](https://github.com/ajitsing/androiduisessions){:target="_blank"} which contains all the code related to these articles.

# Android Animation Types

1. alpha - visibility of UI element
2. scale - size of UI element
3. rotate - rotation of UI element
4. translate - positioning of UI element

{% include googleDrivePlayer.html id="1SVSTMW5z_B76mgQpcTcF-C6CAqzEz7SM/preview" %}
<br>

# Alpha

Below is an example of fade in animation using ```<alpha/>```

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
  <alpha
      android:fromAlpha="0.0"
      android:toAlpha="10.0"
      android:interpolator="@android:anim/accelerate_interpolator"
      android:duration="10000"/>
</set>
```

Magic behind the animation

**```<alpha>```** : this is a tag to animate the rate of change of visibility of an element.

**android:fromAlpha :** this defines the initial visibility of the element. 0 means the element is invisible.

**android:toAlpha :** this attribute defines the time alpha will take to make the element completely visible, more the value lesser the time it will take.

**android:interpolator :** it controls the rate of change of animation, accelerate_interpolator is a default interpolator defined in android core libs.

**android:duration :** this attribute defines the total duration of the animation.

Put the above xml code in ```res/anim/fade_in.xml``` and use it in the activity as below.

```java
findById(R.id.element).startAnimation(AnimationUtils.loadAnimation(this, R.anim.fade_in));
```

This will make the R.id.element animate as shown below.

{% include googleDrivePlayer.html id="1PE4sbltMUvrVbRpeNVMeXxkzrBz_j3ze/preview" %}
<br>

# Scale

Below xml code creates a scale animation, which will increase the size of element and bring it back to its normal size.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true">

    <scale
        android:duration="2000"
        android:fromXScale="1"
        android:fromYScale="1"
        android:pivotX="50%"
        android:pivotY="50%"
        android:repeatMode="reverse"
        android:repeatCount="1"
        android:toXScale="1.5"
        android:toYScale="1.5"/>
</set>
```

Few of the attributes like duration, we have already covered and it will be same across different kind of animations. Lets discuss the other attributes.

**android:fromXScale :** this is the initial size of the UI element respective to X axis. 1 means that the initial size will be the actual size of element. Reducing it will make the element smaller.
android:fromYScale : its same as android:fromXScale except the size will change respective to Y axis.

**android:fromYScale :** its same as android:fromXScale except the size will change respective to Y axis.

**android:pivotX :** this is the position from where the size will increase or decrease. 50% means mid value of X axis.

**android:pivotY :** here 50% means mid value of Y axis.

**android:repeatMode :** this attribute defines the mode in which the android should repeat the same animation. This is how the element comes back in its normal size after it completes.

**android:repeatCount :** This defines the number of times animation should repeat. Setting it to *-1* will repeat the animation infinitely.

**android:toXScale :** this attribute defines the size of element till it will animate respective to X axis.

**android:toYScale :** same as android:toXScale except element will animate respective to Y axis.

Put the above xml code in ```res/anim/scale.xml``` and use it in the activity as below.

```java
findById(R.id.element).startAnimation(AnimationUtils.loadAnimation(this, R.anim.scale));
```

This will make the R.id.element animate as shown below.

{% include googleDrivePlayer.html id="1M_A-5b2V4RFrN2V-ZAAVc8TAhsl6MDnE/preview" %}
<br>

# Translate

Here is the code to create translate animation. The translate animation can move the element from one position to another.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
     android:fillAfter="true"
     android:interpolator="@android:anim/bounce_interpolator">

    <translate
        android:duration="1000"
        android:fromXDelta="0"
        android:fromYDelta="500"
        android:toXDelta="0"
        android:toYDelta="0"/>
</set>
```

**android:fromXDelta :** this attributes defines the initial position of the element respective to X axis. In the above example we are animating the element from bottom to top, so you will see only Y axis values are non-zero.

**android:fromYDelta :** this defines the initial position of the element respective to Y axis.

**android:toXDelta :** if we were animating from left to right or vice versa, we would add some value here and the element would have moved from fromXDelta to toXDelta.

**android:toYDelta :** this defines the last position of the element where it will rest after animation.

**android:interpolator :** in this case we are using bounce_interpolator which will give the bouncing effect to the animation.

Put the above xml code in ```res/anim/translate.xml``` and use it in the activity as below.

```java
findById(R.id.element).startAnimation(AnimationUtils.loadAnimation(this, R.anim.translate));
```

This will make the R.id.element animate as shown below.

{% include googleDrivePlayer.html id="1-lXySFM6NzrR0Cju1-mt1Bg23MJHInKd/preview" %}
<br>

# Rotate

As the name suggests, it will make the element rotate. Below is an sample animation using rotate tag.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
     android:fillAfter="true">

    <rotate
        android:duration="500"
        android:fromDegrees="0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:repeatCount="1"
        android:repeatMode="reverse"
        android:toDegrees="360"/>
</set>
```

**android:fromDegrees :** this attribute decides the initial position of rotation of the element. Here 0 means it will start the rotation from the actual position of the element.

**android:toDegnrees :** define till what angle you want to rotate the element.

**android:pivotX :** this defines the center of rotation of element respective to X axis.

**android:pivotY :** this defines the center of rotation of element respective to Y axis.

You are already familiar with the other attributes used in rotation tag.

Put the above xml code in ```res/anim/rotate.xml``` and use it in the activity as below.

```java
findById(R.id.element).startAnimation(AnimationUtils.loadAnimation(this, R.anim.rotate));
```

This will make the R.id.element animate as shown below.

{% include googleDrivePlayer.html id="110qilNXp9setxJMSTHMHLcPwlKFOJCyc/preview" %}
