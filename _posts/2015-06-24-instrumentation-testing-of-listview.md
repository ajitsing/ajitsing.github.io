---
layout: post
title: Instrumentation testing of list view
description: Instrumentation testing of listView. It covers from checking the size of the list to clicking an item and viewing its details
cover-img: /assets/img/posts/android/cover.png
permalink: /instrumentation-testing-of-listview
gh-repo: ajitsing/InstrumentationTestDemo
gh-badge: [star, fork, follow]
tags: [android, testing]
comments: true
---

In this post we will learn how to write simple instrumentation test. We will be testing an app which has a listView. We will test that list has items in it and on clicking on an item it goes to item's detail page. For this post I have created a demo application with a list view, the code can be found [here](https://github.com/ajitsing/InstrumentationTestDemo){:target="_blank"}. It has following activities.

# ItemListActivity

This activity is responsible for showing a list view with some static entries in it.

```java
package ajitsingh.com.instrumentationtestdemo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

public class ItemListActivity extends Activity implements AdapterView.OnItemClickListener {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_item_list);

    ListView listView = (ListView) findViewById(R.id.items_list);

    listView.setOnItemClickListener(this);
  }

  @Override
  public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
    Intent intent = new Intent(this, ItemDetailActivity.class);
    intent.putExtra("detail", getResources().getStringArray(R.array.items)[i]);

    startActivity(intent);
  }
}
```

![Crepe](/assets/img/posts/android_instrumentation_testing/android_instrumentation_testing_1.png)

# ItemDetailActivity

This activity is responsible for showing the detail of an item on click. The details will include only the title of the Item.

```java
package ajitsingh.com.instrumentationtestdemo;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class ItemDetailActivity extends Activity{
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_item_detail);

    TextView detailView = (TextView) findViewById(R.id.item_detail);
    detailView.setText(getIntent().getStringExtra("detail"));
  }
}
```

![Crepe](/assets/img/posts/android_instrumentation_testing/android_instrumentation_testing_2.png)

# Gradle Config<br><br>

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 22
    buildToolsVersion "21.1.2"

    defaultConfig {
        applicationId "ajitsingh.com.instrumentationtestdemo"
        minSdkVersion 21
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
        //This is important to run the instrumentation tests
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'),'proguard-rules.pro'
        }
    }
    packagingOptions {
        exclude 'LICENSE.txt'
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:support-annotations:22.2.0'

    //test:rules has an internal dependency to test:runner:0.3
    androidTestCompile 'com.android.support.test:rules:0.3'
}
```

`androidTestCompile 'com.android.support.test:rules:0.3'` Instrumentation tests will be written with the help of this dependency. It has an internal dependency to test:runner:0.3 library which provides some class which are essential for our tests.

Enough of application knowledge, let's jump into our tests.

**Scenario 1** - I want to verify the number of items displayed in the list view.

```java
package ajitsingh.com.instrumentationtestdemo;

import android.app.Activity;
import android.app.Instrumentation;
import android.support.test.InstrumentationRegistry;
import android.support.test.rule.ActivityTestRule;
import android.widget.ListView;
import android.widget.TextView;

import org.junit.Rule;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class ItemListActivityTest {

  @Rule
  public ActivityTestRule<ItemListActivity> main = new ActivityTestRule<ItemListActivity>(ItemListActivity.class);


  @Test
  public void testShouldLaunchTheMainActivityAndFindItemsInTheList() throws Exception {
    ListView listview = (ListView) main.getActivity().findViewById(R.id.items_list);

    assertThat(listview.getCount(), is(4));
  }
}
```

**ActivityTestRule** - This class is used to test a single Activity. It will launch the activity before starting your test.

In the test, we are getting our list view from the activity and asserting that it has 4 items.

**Scenario 2** - I want to verify the name of the item in the list.

```java
@Test
 public void testShouldTestTheItemNameInTheList() throws Exception {
   ListView listview = (ListView) main.getActivity().findViewById(R.id.items_list);

   assertThat((String)listview.getItemAtPosition(0), is("Item 1"));
   assertThat((String)listview.getItemAtPosition(3), is("Item 4"));
 }
```

In this test, we are again getting the list view then getting an item from the list and asserting its name.

**Scenario 3** - Click an item in the list and go to its details page.

```java
@Test
public void testShouldShowTheItemDetailWhenAnItemIsClicked() throws Exception {
  Instrumentation instrumentation = InstrumentationRegistry.getInstrumentation();
  final ListView listview = (ListView) main.getActivity().findViewById(R.id.items_list);

  instrumentation.runOnMainSync(new Runnable() {
    @Override
    public void run() {
      int position = 0;
      listview.performItemClick(listview.getChildAt(position), position, listview.getAdapter().getItemId(position));
    }
  });

  Instrumentation.ActivityMonitor monitor = instrumentation.addMonitor(ItemDetailActivity.class.getName(), null, false);
  Activity itemDetailActivity = instrumentation.waitForMonitorWithTimeout(monitor, 5000);

  TextView detailView = (TextView) itemDetailActivity.findViewById(R.id.item_detail);
  assertThat(detailView.getText().toString(), is("Item 1"));
}
```

In the above test there are quite a few things to learn. Let's go through them one by one.

`runOnMainSync` - In order to click on an item in the list, we have to perform our click action in the main thread of our application otherwise test will throw the following error.

```java
android.view.ViewRootImpl$CalledFromWrongThreadException: Only the original thread that created a view hierarchy can touch its views.
at android.view.ViewRootImpl.checkThread(ViewRootImpl.java:6247)
at android.view.ViewRootImpl.playSoundEffect(ViewRootImpl.java:5222)
at android.view.View.playSoundEffect(View.java:17876)
at android.widget.AdapterView.performItemClick(AdapterView.java:299)
at android.widget.AbsListView.performItemClick(AbsListView.java:1143)
at ajitsingh.com.instrumentationtestdemo.ItemListActivityTest.testShouldShowTheItemDetailWhenAnItemIsClicked
```

`Instrumentation.ActivityMonitor` - Clicking on an item will take us to the ItemDetailActivity, which is a bit time consuming operation. So this class helps us to monitor the launch of ItemDetailActivity.

`instrumentation.waitForMonitorWithTimeout(monitor, 5000)` - This will wait for 5 seconds until the activity is launched, if activity is not launched it will fail. And this is a blocking code, so if you put this code before launching the activity which is before clicking one of the items then it will keep on waiting for it and will fail after the time out. So make sure that you put it in the right place.

Also this method returns back the target activity which makes our life easier to test the components on that activity.

At last in the test we assert the text on the ItemDetailActivity.

Thats All Folks!!



