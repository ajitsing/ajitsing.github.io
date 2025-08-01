---
layout: post
title: Android Draggable View
description: This tutorial covers how we can add a draggable view/button in the layout.
share-img: /assets/img/posts/android/cover.png
permalink: /android-draggable-view/
gh-repo: ajitsing/androiduisessions
gh-badge: [star, fork, follow]
tags: [android]
comments: true
keywords: "android draggable view, draggable button android, android onTouch event, android FrameLayout, android UI tutorial, draggable layout android, android viewgroup, android floating button, android custom view, android development"
---

Hello Folks, this blog will help you add a draggable view to your android page. It's fairly simple to add a draggable view to your layout if you know about FrameLayout and Android's ```onTouch``` event. You can find the code in this [Github repo](https://github.com/ajitsing/androiduisessions){:target="_blank"}.


# Video Tutorial

{% include youtubePlayer.html id="N8w0enp1Krg" %}

We can divide the draggable view implementation in two parts.

1. Adding a floating view/button
2. Making the floating view/button draggable

# Adding a floating view

To make the view draggable we should ensure that it will not impact/disturb other views on the page/layout. To achieve that we can make use of FrameLayout.

FrameLayout is a ViewGroup where if you add a child view to it, the child view will be positioned to the top left corner of the screen. So you can wrap all the UI components in a ViewGroup e.g LinearLayout or ScrollLayout and add it under the FrameLayout. Then add button/view which you want to drag. Take a look at the below example.

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:clickable="true">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">

            <TextView
                android:layout_width="match_parent"
                android:layout_height="400dp"
                android:background="@color/colorPrimary"
                android:gravity="center"
                android:text="View 1"
                android:textColor="@color/primary_dark_material_dark"
                android:textSize="100dp"/>

            <TextView
                android:layout_width="match_parent"
                android:layout_height="400dp"
                android:background="@color/colorAccent"
                android:text="View 2"
                android:textColor="@color/primary_dark_material_dark"
                android:textSize="100dp"/>
        </LinearLayout>
    </ScrollView>

    <ImageButton
        android:id="@+id/draggable_view"
        android:background="@mipmap/ic_launcher"
        android:layout_gravity="bottom|right"
        android:layout_marginBottom="20dp"
        android:layout_marginEnd="20dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

</FrameLayout>
```

The above example will make the ImageButton(id:draggable_view) float on the bottom right corner of the screen.

# Making the floating view/button draggable

Now that we have made our button floating on the screen, We are one step closer to our goal to make the button draggable.

There is no xml code that can make the view draggable by just adding a magical line. At least I don't know of any. Which means we have to do this from java code. Below is the code that makes the Button draggable.

```java
package ajitsingh.com.androiduisessions.session2;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Toast;

import ajitsingh.com.androiduisessions.R;

public class DraggableView extends AppCompatActivity implements View.OnTouchListener {
  float dX;
  float dY;
  int lastAction;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.draggable_view);

    final View dragView = findViewById(R.id.draggable_view);
    dragView.setOnTouchListener(this);
  }

  @Override
  public boolean onTouch(View view, MotionEvent event) {
    switch (event.getActionMasked()) {
      case MotionEvent.ACTION_DOWN:
        dX = view.getX() - event.getRawX();
        dY = view.getY() - event.getRawY();
        lastAction = MotionEvent.ACTION_DOWN;
        break;

      case MotionEvent.ACTION_MOVE:
        view.setY(event.getRawY() + dY);
        view.setX(event.getRawX() + dX);
        lastAction = MotionEvent.ACTION_MOVE;
        break;

      case MotionEvent.ACTION_UP:
        if (lastAction == MotionEvent.ACTION_DOWN)
          Toast.makeText(DraggableView.this, "Clicked!", Toast.LENGTH_SHORT).show();
        break;

      default:
        return false;
    }
    return true;
  }
}
```

Wow thats a lot of code!! But you will not feel so after reading through the explanation of this code.

Before going into implementation details lets understand what we want to achieve by this code. Our goal is to drag the view whenever we long click the view and drag it with the thumb/finger. Now in simple words.

1. Whenever I touch the button and move my thumb/finger, I want to get the modified position(x,y) of the button
2. And set it as the current position of the button and go back to step 1

The above algorithm will make our button draggable. Now lets see how we are achieving it by using above code.

# Explanation of above code

```View.OnTouchListener()``` gets called whenever the view is touched and it can produce a variety of events.

We can get the current position of the button when the button is touched, which means the on ```MotionEvent.ACTION_DOWN``` we can get the current position of the view. Whenever you touch the button, touch event populates ```event.getRawX()``` and ```event.getRawY()``` values, which are the current values of the view BUT there is always some difference between actual values of x and y coordinates and the rawX and rawY coordinates. To give the feel of drag we have to bridge this gap. And we are doing it by getting the difference b/w actual X and raw X which we call as dX and same goes for dY.


Now whenever the thumb/finger is moved while the button is touched we have to set the new value of X and Y coordinates of the button. We can do that in the ```MotionEvent.ACTION_MOVE```. We just have to set the raw X and raw Y value as the view's X and Y coordinates and remember to add the dY and dX which we discussed above.

Now that we have successfully made our button draggable, how about handling the onClick event? You can not just add a onClickListener and get away with it. As onClickListener is overridden by the onTouch listener. Which means you have to handle the click event in the onTouch listener itself.

The click will be considered when the ```MotionEvent.ACTION_UP``` event will be triggered immediately  after the ```MotionEvent.ACTION_DOWN``` event. So to check that we can maintain a variable which will have the previous event. And in ```MotionEvent.ACTION_UP``` event we can check for the lastAction/lastEvent if its ```MotionEvent.ACTION_DOWN``` we will say the button is clicked otherwise don't do anything.

Thats all folks, I hope you enjoyed it. Please feel free to give any suggestion, feedback in the comments below. Thanks.
