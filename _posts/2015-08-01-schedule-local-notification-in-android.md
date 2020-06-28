---
layout: post
title: Schedule local notification in android
description: What are the things you need to know to schedule local notification in android. Here we will discuss in detail about the android components involved int it.
cover-img: /assets/img/posts/android/cover.png
permalink: /schedule-local-notification-in-android
gh-repo: ajitsing/AlarmManagerAndReceiver
gh-badge: [star, fork, follow]
tags: [android]
comments: true
---

Hello Folks, In this tutorial we will discuss how we can schedule local notification in android. Its a super easy job and involves few android components.

I have created a demo project for this tutorial you can find it on [github](https://github.com/ajitsing/AlarmManagerAndReceiver){:target="_blank"}.

# Components involved to schedule local notification in android

1. BroadCastReceiver
2. AlarmManager
3. Notification Service
4. PendingIntent

We will discuss these components whenever we will come across them in the code.

# Watch this video to understand scheduling local notification in depth<br><br>

{% include youtubePlayer.html id="k-tREnlQsrk" %}
<br>

# Create MainActivity<br><br>

```java
import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import java.util.Calendar;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);

        Intent notificationIntent = new Intent("android.media.action.DISPLAY_NOTIFICATION");
        notificationIntent.addCategory("android.intent.category.DEFAULT");

        PendingIntent broadcast = PendingIntent.getBroadcast(this, 100, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.SECOND, 15);
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), broadcast);
    }
}
```

There are few things to discuss here

### Intent

In the above code we are creating a notification intent with action `android.media.action.DISPLAY_NOTIFICATION`.

### AlarmManager

AlarmManager is created using the `ALARM_SERVICE`. It takes a [PendingIntent](https://github.com/ajitsing/AlarmManagerAndReceiver){:target="_blank"} and time as  parameters. And it launches that intent when the time is over. In our case the time when the intent will be broadcasted is 15 seconds.

```java
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.TaskStackBuilder;

public class AlarmReceiver extends BroadcastReceiver{
    @Override
    public void onReceive(Context context, Intent intent) {
        Intent notificationIntent = new Intent(context, NotificationActivity.class);

        TaskStackBuilder stackBuilder = TaskStackBuilder.create(context);
        stackBuilder.addParentStack(NotificationActivity.class);
        stackBuilder.addNextIntent(notificationIntent);

        PendingIntent pendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context);

        Notification notification = builder.setContentTitle("Demo App Notification")
                .setContentText("New Notification From Demo App..")
                .setTicker("New Message Alert!")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(pendingIntent).build();

        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(0, notification);
    }
}
```

In the above code main components are

### BroadCastReceiver

Here AlarmReceiver is a broadcast receiver which listens to broadcasts with action `android.media.action.DISPLAY_NOTIFICATION`. This action is declared in the AndroidManifest.xml file.

### NotificationCompat.Builder

This builder is used to build a Notification object which can be used by NotificationManger to notify the user. The Notification object can have an Icon, Text to be displayed in notification and most importantly a  PendingIntent which will be used when we will click on the notification.

### NotificationManager

At last NotificationManager will do the job of sending the notification to the user. And it will take notification as the 2nd argument. First argument to notify function is an identifier for the notification which should be unique within that system or mobile.

# Lets see how AlarmManager receives the broadcast, where do we define that configuration

Well its the AndroidManifest.xml which does the magic. We define all the broadcast receivers in that file. And what should they do when a broadcast is broadcasted. Lets have a look at our AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="bootcamp.android.demoapp" >

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <action android:name="android.media.action.IMAGE_CAPTURE" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.media.action.IMAGE_CAPTURE" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
        <activity android:name=".NotificationActivity" />

        <receiver android:name=".AlarmReceiver">
            <intent-filter>
                <action android:name="android.media.action.DISPLAY_NOTIFICATION" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </receiver>
    </application>

</manifest>
```

As you can see in the above file I have defined a receiver whose name is .AlarmReceiver which points to java class AlarmReceiver. And it has the action to which it listens to and a category. The intent-filter helps the receiver to filter those broadcast which it suppose to listen.


