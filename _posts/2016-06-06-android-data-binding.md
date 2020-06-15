---
layout: post
title: Android Data Binding
description: Keep your android activities lean with Android Data Binding. Use ViewModels to render the data on UI and notify the UI when something changes in ViewModel
cover-img: /assets/img/posts/data_binding/cover.png
permalink: /android-data-binding
gh-repo: ajitsing/AndroidDataBinding
gh-badge: [star, fork, follow]
tags: [android]
comments: true
---

Hello friends, Recently I have tried android's new library Android Data Binding. My experience with data binding has been really good and I would like others to try it out too. It takes very less to integrate android data binding in your existing code. You don't need to download any extra dependency for it as it comes built in the android's gradle plugin. All the code used in this article is present in my [github repo](https://github.com/ajitsing/AndroidDataBinding){:target="_blank"}.

# How to enable Android Data Binding?

Add below line in your build.gradle file and sync it. After syncing you will be able to see some of the Data Binding classes like DataBindingUtils.java etc.

{% highlight groovy linenos %}
android {
    dataBinding {
        enabled = true
    }
}
{% endhighlight %}
<br>

# Here is a detailed video<br><br>

{% include youtubePlayer.html id="NLfKxEprWB4" %}
<br>

# How to use Data Binding?

Well Android Data Binding starts when you inflate xml layout. Few things needs to be changed in the layout file to make Data Binding work. Also you need to use a util class to inflate the layout file. Lets take a look at the layout file first and then we will see how to inflate this it.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  xmlns:app="http://schemas.android.com/apk/res-auto">

  <data>
    <variable
      name="loginViewModel"
      type="com.ajit.singh.androiddatabinding.login.LoginViewModel"/>
    <variable
      name="handler"
      type="com.ajit.singh.androiddatabinding.login.LoginHandler"/>
  </data>

  <LinearLayout
    app:toast="@{loginViewModel.loginMessage}"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context=".login.LoginActivity">

    <LinearLayout
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:gravity="center_horizontal"
      android:orientation="vertical">

      <EditText
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:text="@={loginViewModel.username}"
        android:gravity="center_horizontal"
        android:inputType="text"
        android:hint="Username"/>

      <EditText
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:text="@={loginViewModel.password}"
        android:gravity="center_horizontal"
        android:inputType="textPassword"
        android:hint="Password"/>

      <Button
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:onClick="@{handler.onLogin(loginViewModel)}"
        android:text="Log In"/>
    </LinearLayout>
  </LinearLayout>
</layout>
```

You would notice a lot of new things in this file. Lets discuss them one by one.

# <layout>

You would have noticed that LinearLayout is wrapped inside ```<layout>``` tag. This tag is required to define some of the data binding's meta data like variables, imports etc. Also there is one more important thing to keep in mind, all the ```namespaces must be in the <layout>``` tag otherwise android studio will throw an error while compiling the code.

# <variable>

you can define the variables which you would want to use in your layout file to show data on UI. You can have any number of variables in your layout file. But generally we would have a viewModel which will have all the data that would be shown on the UI and a handler that can handle events or user interactions.

All the variables defined in the <data> tag has to be set while inflating the view. Android Data Binding generates setter for these variables and we can use them to set these objects. We will see that when we will start using this layout file.

# @{expression}

All your java expressions must be inside @{}. You can use java keywords directly in the expression but not all of them are supported, for example you can not use java's new, super, this keyword in expressions. Here are the [keywords and operators that are supported in data  binding expression](https://developer.android.com/topic/libraries/data-binding/index.html#expression_language){:target="_blank"}. You will generally use this to get value from the viewModel or get a listener from the handler object as shown in the above layout.

Be careful while writing java code in layout file, because data binding enables us to do a lot of things in the expressions but whatever you will write in the expression can not be unit tested. So to make things unit testable write the least possible code in the xml.

# @={expression}

This expression is used for two way binding. Most obvious example is EditText fields. Whenever user changes value of EditText we would want to notify viewModel to change its value. But to enable two way binding make sure that you have latest build-tools and gradle plugin.

Also you need to have setters of the fields in your viewModel for it to work.

# Data Binding In Activity

Now that our layout is ready, lets see how to inflate this layout file and set it's variables in the activity.

{% highlight java linenos %}
package com.ajit.singh.androiddatabinding.login;

import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.ajit.singh.androiddatabinding.R;
import com.ajit.singh.androiddatabinding.databinding.LoginBinding;

public class LoginActivity extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    LoginBinding binding = DataBindingUtil.setContentView(this, R.layout.login);
    binding.setLoginViewModel(new LoginViewModel());
    binding.setHandler(new LoginHandler(new LoginPresenter()));
  }
}
{% endhighlight %}

You would notice one things here that your activity's onCreate method is very lean and simple. Thats all because of data binding as you don't need to write any boiler plate code like findViewById() etc.

To inflate the layout I am using DataBindingUtil.setContentView() method. This method inflates the layout and returns a binding class which is generated at compile time. You can give a customized name to this binding class by adding a class attribute in data tag inside the layout xml file. If you don't provide a name then binding will look at the naming convention of the layout file and will name the class accordingly. For example if your layout file name is my_activity.xml then binding will generate a class with name MyActivityBinding.

Here is how you can give custom name to your binding class.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  xmlns:app="http://schemas.android.com/apk/res-auto">

  <data class="MyCustomBinding">
    ...
  </data>
```

The above code will generate a class with name MyCustomBinding.

Now the generated binding class will have the setters for the variables which you have defined in the layout file. As in our example we have defined a viewModel and a handler. We can set both the variables and use them in the layout file.

# How to use binding with fragments?

You can define your layout file as shown above, the only thing which will change in fragments is the way we inflate the layout file. You can use DataBindingUtil.inflate() method to inflate the layout and that will also return a Binding class. After inflating the layout set the variables and call binding.getRoot() to return the root view of the layout file. This is how your code will look like.

{% highlight java linenos %}
@Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
    LoginBinding binding = DataBindingUtil.inflate(inflater, R.layout.login, container, false);

    LoginPresenter presenter = new LoginPresenter(this);
    LoginViewModel viewModel = new LoginViewModel();
    binding.setHandler(new LoginHandler(presenter));
    binding.setViewModel(viewModel);

    return binding.getRoot();
  }
{% endhighlight %}
<br>

# Lets dig deep into the ViewModel

ViewModel is a very essential component of binding. This is where you will bind content of UI with your logic. For each element on UI which will be dynamically populated, you will have a corresponding field in your view model. Now the main part is, binding those viewModel fields with the UI elements. Lets take a look at our viewModel.

{% highlight java linenos %}
package com.ajit.singh.androiddatabinding.login;

import android.databinding.BaseObservable;
import android.databinding.Bindable;

import com.ajit.singh.androiddatabinding.BR;

public class LoginViewModel extends BaseObservable {
  private String username;
  private String password;
  private String loginMessage;

  @Bindable
  public String getUsername() {
    return username;
  }

  @Bindable
  public String getPassword() {
    return password;
  }

  @Bindable
  public String getLoginMessage() {
    return loginMessage;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void loginSucceeded() {
    loginMessage = "Login Successful!!";
    notifyPropertyChanged(BR.loginMessage);
  }

  public void loginFailed() {
    loginMessage = "Login Failed!!";
    notifyPropertyChanged(BR.loginMessage);
  }
}
{% endhighlight %}

You would notice that we are extending the ```LoginViewModel``` with ```BaseObservable``` class. Which means that any of the fields in this view model can be observed using binding. Whenever value of a field changes we need to notify binding that this particular field has changed so please refresh all the views which are using this particular field.

To generate BR property, you need to add ```@Bindable``` annotation on it's getter. The @Bindable annotation will generate a property by omitting the prefix 'get' or 'is' from getter's name. As you can see the ```getLoginMessage()``` has a property with name BR.loginMessage.

# What is Handler?

Handler is the class which holds all the event listeners. For example it might have onClick listeners or TextWatchers etc. Lets take a look at our handler class.

{% highlight java linenos %}
package com.ajit.singh.androiddatabinding.login;

import android.view.View;

public class LoginHandler {
  private LoginPresenter presenter;

  public LoginHandler(LoginPresenter presenter) {
    this.presenter = presenter;
  }

  public View.OnClickListener onLogin(final LoginViewModel viewModel) {
    return new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        presenter.login(viewModel);
      }
    };
  }
}
{% endhighlight %}

You can use all the handler methods directly as a value of the listener attributes in the layout file. As you might have noticed in our layout file.

Well thats all folks, I will write a separate article on how to create custom bindings and use them in layout files. Please comment below for feedback and suggestions. Thank you!

