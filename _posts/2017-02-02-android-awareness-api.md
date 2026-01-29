---
layout: post
categories: mobile-development
seo: true
title: Why your android application needs awareness api
description: Learn how to use Android Awareness API to make your app context-aware. Use Fence API for geofencing and Snapshot API to get user's current context including location, activity, weather, and nearby beacons.
share-img: /assets/img/posts/android/cover.png
permalink: /android-awareness-api/
gh-repo: ajitsing/LocationAwareApp
gh-badge: [star, fork, follow]
tags: [android]
comments: true
keywords: "android awareness api, android fence api, android snapshot api, android geofencing, android context api, android location aware, android user context, android api tutorial, android app features, android development"
faq:
  - question: "What is Android Awareness API?"
    answer: "Awareness API is a Google API that provides context about the user including location, activity (walking, driving), weather, nearby beacons, headphone state, and time. It combines multiple signals efficiently in one unified API instead of multiple separate APIs."
  - question: "What is the difference between Fence API and Snapshot API?"
    answer: "Snapshot API gives you the user's current context on-demand (current location, activity, weather right now). Fence API triggers callbacks when conditions change (user enters/leaves location, connects headphones). Use Snapshot for one-time checks, Fence for continuous monitoring."
  - question: "How do I use geofencing with Awareness API?"
    answer: "Use Fence API to create a LocationFence with Fence.in() for enter or Fence.exiting() for leave. Register the fence with Awareness.getFenceClient().updateFences(). Your BroadcastReceiver will be called when user enters or exits the defined area."
  - question: "What permissions are needed for Awareness API?"
    answer: "Add google-play-services-awareness dependency. Request ACCESS_FINE_LOCATION for location features, ACTIVITY_RECOGNITION for activity detection. Get an API key from Google Console. Some features like weather don't need extra permissions."
---

Google introduced android [awareness api](https://developers.google.com/awareness/){:target="_blank"} in I/O 16. It offers a lot of awesome features which can make your android application better and improve the user experience. Awareness API is a combination of two APIs

* [Fence API](https://developers.google.com/awareness/android-api/fence-api-overview){:target="_blank"}
* [Snapshot API](https://developers.google.com/awareness/android-api/snapshot-api-overview){:target="_blank"}


# Fence API

This API is an enhancement over geofencing. It can call a callback when user enters or leaves a particular location. It also applies on things like headphones, your app can receive a callback when headphones are connected or disconnect. We will see and example of geofencing in a while.

# Snapshot API

Using snapshot API you can get the information about user's current context. You can access user activity, nearby beacons, weather condition in that area etc.

# How awareness API can boost your application

Awareness api is very powerful as it can give the entire context of the user. Using that context you can make your application smart and act according to the user conditions. We will see an example where we will advertise newly introduced and less known feature of our app with the help of awareness api.

# Advertise your new indoor map feature using Fence API

Lets say you are working on an airline application. You introduced the new indoor airport map feature in your application. You want your travelers to use this new feature when they are within an airport.

Now lets take a hypothetical scenario, there is a traveller Bob who is traveling with your airline for the first time. He is new to town and has never been to the airport. He just reached the airport and want to go to gate A2 for boarding. Can your application help Bob to reach to gate A2?

The answer is yes, because you know with the help of awareness API that Bob is on the airport. That is good enough input for your application to prompt Bob with a notification mentioning your new feature of indoor airport maps.

Getting to know the location of user and prompting them with notification sounds good, but how to achieve this or in other words how to code this? Don't worry its not as complicated as it sounds. Lets see the code.

# Location Aware App

To make this article more helpful, I have created a project on [github](https://github.com/ajitsing/LocationAwareApp){:target="_blank"} which uses awareness API to prompt user with notification when user reaches a configured location.

# How to use Awareness API

To start using awareness API you need to create an API key from [google console](https://console.developers.google.com){:target="_blank"}. Once you create the key add it in your [AndroidManifest.xml](https://github.com/ajitsing/LocationAwareApp/blob/master/app/src/main/AndroidManifest.xml){:target="_blank"} file as shown below.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.singh.ajit.locationawareapp">

  <uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION"/>
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
  <application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:supportsRtl="true"
    android:theme="@style/AppTheme">

    <meta-data
      android:name="com.google.android.awareness.API_KEY"
      android:value="A_y2I6rzj6baJFUl-5JL0u4KEy0hlc1AIzaSyBn"/>

    <service android:name=".LocationAwareService"/>

    <activity android:name=".MainActivity">
      <intent-filter>
        <action android:name="android.intent.action.MAIN"/>

        <category android:name="android.intent.category.LAUNCHER"/>
      </intent-filter>
    </activity>

    <receiver android:name=".NotificationGenerator">
      <intent-filter>
        <action android:name="com.singh.ajit.action.DISPLAY_NOTIFICATION"/>
      </intent-filter>
    </receiver>
  </application>
</manifest>
```

*Note:* The key which I have used above is a fake key, it will not work. To make it work you have to generate your own key and replace the above key with your newly created key.

Now that our setup is done, lets start using awareness API in our app. Lets take the above example of advertising your new indoor map feature of your app. For this what you would need is list of airports locations where you have enabled indoor map.

Once you have latitude and longitude of all the location we can start registering those locations in awareness API, so that whenever user reaches nearby those location your app gets a callback. Lets take a look at the code for this.

```java
final GoogleApiClient client = new GoogleApiClient.Builder(this)
        .addApi(Awareness.API)
        .addApi(LocationServices.API)
        .build();

GeofenceApiHelper geofenceApiHelper = new GeofenceApiHelper(client, this);
geofenceApiHelper.registerLocations();
```

Here we are creating GoogleApiClient and adding the Awareness and LocationServices API to it. Now lets take a look at [GeofenceApiHelper](https://github.com/ajitsing/LocationAwareApp/blob/master/app/src/main/AndroidManifest.xml){:target="_blank"} and what it does in registerLocations() method.

```java
  public void registerLocations() {
    client.registerConnectionCallbacks(new GoogleApiClient.ConnectionCallbacks() {
      @Override
      public void onConnected(@Nullable Bundle bundle) {
        registerGeoFence();
      }

      @Override
      public void onConnectionSuspended(int i) { }
    });

    client.connect();
  }
```

To register locations we have to connect to the google client first and pass it a callback saying whenever you are connected, register these locations. Now lets see what regiserGeoFence() does.

```java
private void registerGeoFence() {
  GeofencingRequest geofencingRequest = new GeofencingRequest.Builder()
      .addGeofences(locationsToBeRegistered())
      .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
      .build();
  geofenceRequestRegistrar.registerGeofenceRequest(client, geofencingRequest);
}
```

In this method we are registering the locations and setting the trigger INITIAL_TRIGGER_ENTER, which means whenever user enters this location, your app will get a callback. All this is done using GeofencingRequest. This request takes our locations and geofenceRequestRegistrar registers this request. Now how are we getting the locationsToBeRegistered(). Lets take a look.

```java
private List<Geofence> locationsToBeRegistered() {
  int twentyFourHours = 24 * 60 * 60 * 1000;

  Geofence atlantaAirport = new Geofence.Builder()
      .setRequestId("atlantaAirport")
      .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER)
      .setExpirationDuration(twentyFourHours)
      .setCircularRegion(33.6402486,-84.420513, 20).build();
  Geofence chicagoAirport = new Geofence.Builder()
      .setRequestId("chicagoAirport")
      .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER)
      .setExpirationDuration(twentyFourHours)
      .setCircularRegion(41.9741625,-87.9095101, 30).build();

  return asList(atlantaAirport, chicagoAirport);
}
```

Locations are nothing but a List of Geofences. Here we are creating two Geofence, one for Atlanta airport and another for Chicago airport.

Ok, now we have the GeofencingRequest  ready, now we need to register this using GeofenceRegistrar. Lets take a look at the registration code.

```java
public void registerGeofenceRequest(GoogleApiClient client, GeofencingRequest geofencingRequest) {
  if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
    Toast.makeText(this, "please give the required permission", Toast.LENGTH_SHORT).show();
    return;
  }

  Intent intent = new Intent(this, LocationAwareService.class);
  PendingIntent geoFencePendingIntent = PendingIntent.getService(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

  LocationServices.GeofencingApi.addGeofences(client, geofencingRequest, geoFencePendingIntent);
}
```

Registering geofencingRequest is a simple task, you just have to use *LocationServices.GeofencingApi* to add the request. But what is this LocationAwareService? Ok, so what happens when user comes nearby the registered location? Your awareness api need something e.g callback which it can trigger.

LocationAwareService is an IntentService which acts like a callback and is triggered by the awareness API. Lets take a look at the LocationAwareService code.

```java
public class LocationAwareService extends IntentService {

  public LocationAwareService() {
    super(LocationAwareService.class.getSimpleName());
  }

  @Override
  protected void onHandleIntent(Intent intent) {
    GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);
    Location location = geofencingEvent.getTriggeringLocation();

    Geocoder geocoder = new Geocoder(this, Locale.getDefault());
    List<Address> addresses = new ArrayList<>();
    try {
      addresses = geocoder.getFromLocation(location.getLatitude(), location.getLongitude(), 1);
    } catch (IOException e) {
      e.printStackTrace();
    }

    Intent message = new Intent("com.singh.ajit.action.DISPLAY_NOTIFICATION");
    message.putExtra("detail", !addresses.isEmpty() ? addresses.get(0).getAddressLine(1) : location.toString());

    sendBroadcast(message);
  }
}
```

Whenever awareness api detects that user is nearby the configured location, it will call the onHandleIntent() method of this service. Then we can extract the location information from the intent. In this case I am just sending a broadcast to show a notification in the phone. But for your use case you can do whatever you want when the user is at your configured location.

Thats all folks! I hope this will help you to make your application better.
