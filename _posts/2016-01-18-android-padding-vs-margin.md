---
layout: post
title: Android Padding vs Margin
description: Android Padding vs Margin covers whats the difference between padding and margin in context of android UI with examples.
cover-img: /assets/img/posts/android_padding_vs_margin/cover.png
permalink: /android-padding-vs-margin
tags: [android]
comments: true
---

Android padding vs margin is a very frequently asked question. Most of the beginners miss understand it. So here is a little help from my side. The idea behind android margin and padding is very similar to CSS margin and padding. Let's understand it with examples.

# Margin

Margin is a way for a view to enforce some distance from others views. By specifying margin for a view, we say that keep this much distance from this view. Android has 5 kinds of margins.

1. **margin** - keep distance on all the four sides
2. **marginLeft** - keep distance from left side of the view
3. **marginRight** - keep distance from right side of the view
4. **marginTop** - keep distance from top of the view
5. **marginBottom** - keep distance from bottom of the view

# Example<br><br>

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/colorPrimaryDark"
    android:orientation="vertical"
    tools:context="ajitsingh.com.androiduiplayground.DemoActivity">

    <TextView
        android:background="@color/highlighted_text_material_dark"
        android:id="@+id/text1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20dp"
        android:layout_margin="40dp"
        android:text="Text 1"
        android:textColor="@color/accent_material_dark"/>
    
    <LinearLayout
        android:orientation="vertical"
        android:background="@color/highlighted_text_material_dark"
        android:id="@+id/layout1"
        android:layout_marginLeft="10dp"
        android:layout_marginRight="10dp"
        android:layout_marginBottom="10dp"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:textColor="@color/accent_material_dark"/>
</LinearLayout>
```

![Crepe](/assets/img/posts/android_padding_vs_margin/android_padding_vs_margin_1.png)

In the above example there is a LinearLayout(Parent of all views) which does not have  any margin specified. But the textView has a margin of 20dp, and according to our earlier definition the text view is saying that keep 20dp distance from me in all the sides. That is why the textView has the 20dp space in all the directions. Then there is LinearLayout sibling of textView which says in left, right and bottom keep 10dp distance from me and hence there is space in all 3 sides.

# Padding

Padding is a way to push the contents away from view's inner boundary. When we specify the padding of a view, we say the content to keep this much distance from your inner boundary(left, right, top or bottom). Like margin, padding is also of 5 types.

1. **padding** - keep distance from all the inner boundaries
2. **paddingLeft** - keep distance from the left inner boundary
3. **paddingRight** - keep distance from the right inner boundary
4. **paddingTop** - keep distance from the top inner boundary
5. **paddingBottom** - keep distance from the bottom inner boundary

# Example<br><br>

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/colorPrimaryDark"
    android:orientation="vertical"
    android:padding="20dp"
    tools:context="ajitsingh.com.androiduiplayground.DemoActivity">

    <TextView
        android:background="@color/highlighted_text_material_dark"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20dp"
        android:paddingLeft="40dp"
        android:text="paddingLeft"
        android:layout_margin="10dp"
        android:textColor="@color/accent_material_dark"/>

    <TextView
        android:background="@color/highlighted_text_material_dark"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20dp"
        android:paddingRight="40dp"
        android:text="paddingRight"
        android:layout_margin="10dp"
        android:textColor="@color/accent_material_dark"/>

    <TextView
        android:background="@color/highlighted_text_material_dark"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20dp"
        android:paddingTop="20dp"
        android:text="paddingTop"
        android:layout_margin="10dp"
        android:textColor="@color/accent_material_dark"/>

    <TextView
        android:background="@color/highlighted_text_material_dark"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20dp"
        android:paddingBottom="20dp"
        android:text="paddingBottom"
        android:layout_margin="10dp"
        android:textColor="@color/accent_material_dark"/>

    <TextView
        android:background="@color/highlighted_text_material_dark"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20dp"
        android:padding="20dp"
        android:text="padding"
        android:layout_margin="10dp"
        android:textColor="@color/accent_material_dark"/>
</LinearLayout>
```

![Crepe](/assets/img/posts/android_padding_vs_margin/android_padding_vs_margin_2.png)

Above you can see example of all kinds of paddings applied to a textView. So at the end the difference between margin and padding is that margin keeps the other views away from a view and padding pushes its contents away from view's own inner boundaries.
