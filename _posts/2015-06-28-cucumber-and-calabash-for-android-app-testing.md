---
layout: post
title: Cucumber and calabash for android app testing
description: This article is about how we can use cucumber and calabash for android app testing. Here we build the testing environment using calabash with minimal config
cover-img: /assets/img/posts/cucumber/cover.png
permalink: /cucumber-and-calabash-for-android-app-testing/
tags: [android, testing, cucumber]
comments: true
---

This article will cover how cucumber and calabash can be used for android testing. Code used in this post can be found on github using following urls.

[Android App](https://github.com/ajitsing/InstrumentationTestDemo){:target="_blank"}
[Functional Test Step](https://github.com/ajitsing/calabash_setup){:target="_blank"}


The app which we are going to test has only two screens.

1. Item List Screen - Default screen of app, it has a list of items.
2. Item Detail Screen - Clicking on an item in the list will take to the detail screen

You will need the following ruby gems to setup cucumber and calabash.

```ruby
source :rubygems

gem 'calabash-android'
gem 'calabash-cucumber'
gem 'cucumber'
gem 'rspec'
```

**calabash-android** - This is the main gem to setup the testing environment for android. It will generate a sample project for you with minimal configuration.

You should have `ANDROID_HOME` set to your android-sdk path in order to use calabash-android. Put the below line in your `bashrc` or `zshrc` file.

```bash
export ANDROID_HOME=/path/to/Android/sdk/
```

Generating scaffold using calabash-android

```bash
calabash-android gen

----------Question----------
I'm about to create a subdirectory called features.
features will contain all your calabash tests.
Please hit return to confirm that's what you want.
---------------------------

<press enter>;

----------Info----------
features subdirectory created.
---------------------------
```

As you can see when you run `calabash-android gen` it asks a question before creating the file structure. Hit enter key and it will create the directories for you. The directory structure is shown below.

```bash
└── features
    ├── my_first.feature
    ├── step_definitions
    │   └── calabash_steps.rb
    └── support
        ├── app_installation_hooks.rb
        ├── app_life_cycle_hooks.rb
        ├── env.rb
        └── hooks.rb

3 directories, 6 files
```

If you don't understand the above file structure and want to know what each directory means then visit this [link](http://www.singhajit.com/set-up-automation-environment-using-cucumber-and-capybara/){:target="_blank"}.

Now you don't have to touch any of the support directory files, because calabash does a good job in default configuration itself.

Replace the `my_first.feature` with your own features. I have added the following feature to my feature file.

```cucumber
Feature: Item List Feature

  Scenario: Click on an item in the list and see its details
    When I click on "Item 1"
    Then I see "Item 1" in detail
```

To define your own steps go to `calabash_steps.rb` file and write your own steps. In my case my steps looks like this.

```ruby
require 'calabash-android/calabash_steps'     #calabash's predefined steps

When(/^I click on "(.*)"$/) do |text|
  item = query("ListView TextView marked:'#{text}'").first

  item["text"].should == text
  touch item
end

Then(/^I see "(.*)" in detail$/) do |text|
  wait_for_elements_exist('TextView marked:"item_detail"')
  query('TextView marked:"item_detail"', :getText).first.should == text
end
```

`require 'calabash-android/calabash_steps'` - this line includes calabash's predefined steps in our steps and then you can use the predefined steps to press, type or any basic operation. You can find the predefined steps in calabash's github page.

# Query an element on screen

To query and element on the screen use the `query` method of calabash. You have to pass the path to the element you want to query. For example

If you want to query a text, which will be present inside a TextView then your query will be following:

```ruby
query('TextView marked:id_of_text_view')
```

This function returns the array of elements to get your item out of it use .first method of ruby or [0]You can use the above query for all kind of elements like ListView etc.

# Running Tests

To run the test type the following command. Remember that you have to run the command from outside of the features directory.

```bash
calabash-android run /path/to/apk_file.apk
```

Once you supply the apk file to calabash it takes care of installing that app in the simulator and uninstalling it before each feature.




