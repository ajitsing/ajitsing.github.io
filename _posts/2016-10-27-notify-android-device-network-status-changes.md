---
layout: post
title: Notify when android device network status changes
description: This article will show how you can listen network status and notify when android device network status changes using a snackbar notification.
share-img: /assets/img/posts/android/cover.png
permalink: /notify-android-device-network-status-changes/
gh-repo: ajitsing/AndroidOfflineModeNotifications
gh-badge: [star, fork, follow]
tags: [android]
comments: true
---

There are a lot of applications in the play store that notifies you when your mobile goes offline. This article will help you understand how all that happens. How app knows that device is offline and notifies the user about the same by showing a notification on the screen. To understand this clearly I have created this small [project on github](https://github.com/ajitsing/AndroidOfflineModeNotifications){:target="_blank"}.

# How do we show the notification to the user when device goes offline

Your android device has capability to notify all the applications in the mobile when network status changes. The only thing your application needs to do is listen to that event. For that we need to create a broadcast receiver which can listen to this particular network status change event and take some action based on the network status.

# For detailed explanation with demo, watch this

{% include youtubePlayer.html id="ubvWRlFnr74" %}
<br>

# NetworkStateChangeReceiver<br><br>

{% highlight java linenos %}
package com.ajit.singh.offlinemode.receiver;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import static android.content.Context.CONNECTIVITY_SERVICE;

public class NetworkStateChangeReceiver extends BroadcastReceiver {
  public static final String NETWORK_AVAILABLE_ACTION = "com.ajit.singh.NetworkAvailable";
  public static final String IS_NETWORK_AVAILABLE = "isNetworkAvailable";

  @Override
  public void onReceive(Context context, Intent intent) {
    Intent networkStateIntent = new Intent(NETWORK_AVAILABLE_ACTION);
    networkStateIntent.putExtra(IS_NETWORK_AVAILABLE,  isConnectedToInternet(context));
    LocalBroadcastManager.getInstance(context).sendBroadcast(networkStateIntent);
  }

  private boolean isConnectedToInternet(Context context) {
    try {
      if (context != null) {
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
      }
      return false;
    } catch (Exception e) {
      Log.e(NetworkStateChangeReceiver.class.getName(), e.getMessage());
      return false;
    }
  }
}
{% endhighlight %}

NetworkStateChangeReceiver is a broadcast receiver which can listen to network status change event. When android triggers that event then NetworkStateChangeReceiver's ```onReceive()``` method gets called. In ```onReceive()``` method you can write the logic to identify the network status and take some action.

```isConnectedToInternet()``` method takes care of identifying wether the device is connected to internet or not. It does that using ConnectivityManager which has the information about the active network. You can use that ```NetworkInfo``` object to check the network status as shown in the code.

# Adding receiver to AndroidManifest

Now that our ```NetworkStateChangeReceiver``` is ready and it can identify the network status but where is the code which tells that this receiver will listen to the network connectivity event. The answer is in the ```AndroidManifest.xml``` file. Your AndroidManifest will have that code. Let's take a look at the AndroidManifest file.

{% highlight xml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.ajit.singh.offlinemode">

  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>

  <application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:supportsRtl="true"
    android:theme="@style/AppTheme">
    <activity android:name=".MainActivity">
      <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
      </intent-filter>
    </activity>

    <receiver
      android:name="com.ajit.singh.offlinemode.receiver.NetworkStateChangeReceiver"
      android:exported="false">
      <intent-filter>
        <action android:name="android.net.conn.CONNECTIVITY_CHANGE"/>
      </intent-filter>
    </receiver>
  </application>

</manifest>
{% endhighlight %}

There are two things to notice here.

1. we have registered the receiver and added an intent filter which means that whenever an intent is fired by android which has android.net.conn. ```CONNECTIVITY_CHANGE``` action, our receiver will handle that intent.

2. I have given three user permissions and all of them are to gain the network status access. Its very important to give these permissions otherwise you code will not work.

# Show Notification

Now, we have our broadcast receiver in place and it can tell about the current internet status. But to show a notification we need UI and our ```NetworkStatusChangeReceiver`` doesn't have a UI. To show the notification we need to pass a message to the current activity that show a notification with the network status.

To do that there should be a communication between Broadcast Receiver and the activity and to handle that we can broadcast a local message to the whole app and whichever activity is listening to that message will show the notification. In our case MainActivity is listening to this message and will show the notification using a Snackbar.

{% highlight java linenos %}
package com.ajit.singh.offlinemode;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.AppCompatActivity;

import com.ajit.singh.offlinemode.receiver.NetworkStateChangeReceiver;

import static com.ajit.singh.offlinemode.receiver.NetworkStateChangeReceiver.IS_NETWORK_AVAILABLE;

public class MainActivity extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    IntentFilter intentFilter = new IntentFilter(NetworkStateChangeReceiver.NETWORK_AVAILABLE_ACTION);
    LocalBroadcastManager.getInstance(this).registerReceiver(new BroadcastReceiver() {
      @Override
      public void onReceive(Context context, Intent intent) {
        boolean isNetworkAvailable = intent.getBooleanExtra(IS_NETWORK_AVAILABLE, false);
        String networkStatus = isNetworkAvailable ? "connected" : "disconnected";

        Snackbar.make(findViewById(R.id.activity_main), "Network Status: " + networkStatus, Snackbar.LENGTH_LONG).show();
      }
    }, intentFilter);
  }
}
{% endhighlight %}

Our main activity has registered to a broadcast which has ```com.ajit.singh.NetworkAvailable``` action because thats the action we are using to broadcast the intent from the NetworkStatusChangeReceiver. In its ```onReceive()``` method we are getting the status of the network from the intent which we had set in the ```NetworkStatusChangeReceiver```. Then final thing is show that status using a Snackbar.

Thats all folks, I hope you liked this post. Thanks!
