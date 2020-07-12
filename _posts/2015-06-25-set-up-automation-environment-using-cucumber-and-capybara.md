---
layout: post
title: Set up automation using cucumber and capybara
description: This article is about setting up automation environment using cucumber and capybara (on chrome browser) with minimal config.
cover-img: /assets/img/posts/cucumber/cover.png
permalink: /set-up-automation-environment-using-cucumber-and-capybara/
gh-repo: ajitsing/cucumber_setup
gh-badge: [star, fork, follow]
tags: [testing, cucumber]
comments: true
---

This article is about setting up automation environment using cucumber and capybara from scratch with minimal configuration and the code. For this tutorial I have created a sample project and code for that is available [here](https://github.com/ajitsing/cucumber_setup){:target="_blank"} on github. We will start from nothing and build eventually. So lets start

Directory structure for cucumber:

```bash
features (holds all feature files)
├── demo.feature
├── step-definitions (holds all step definitions)
│   └── demo_steps.rb
└── support (holds config files)
    └── env.rb (this is the first file which executes when you run cucumber)
```

**features** - This directory will contain all your feature files and some other important directories.
**step-definitions** - It will have all the step definitions.
**support** - It will have all the configuration files including env.rb

**env.rb for chrome**

```ruby
require 'capybara/cucumber'
require 'selenium-webdriver'
require 'capybara/session'
require 'capybara/dsl'

Capybara.default_driver = :selenium

Capybara.register_driver :selenium do |app|
    Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.javascript_driver = :chrome
```

Now capybara knows that it has to use chrome browser for running the tests.

# Chrome driver

In order to run the tests in chrome you have to install chrome driver in your machine. which can be downloaded from [here](http://chromedriver.storage.googleapis.com/index.html?path=2.16/){:target="_blank"}.

Once you download the driver export it in you path or copy the executable to you `/usr/local/bin` because that is by default included in your path.

# Gemfile<br><br>

```ruby
source 'https://www.rubygems.org'

gem 'cucumber'
gem 'capybara'
gem 'selenium-webdriver'
gem 'pry'
gem 'rspec'
```

`rspec` gem is used for putting assertions in your step definitions.

# Feature File<br><br>

```cucumber
Feature: Test cucumber setup
  Scenario: Search for something on google
    Given I visit google
    And I search "github ajitsing"
    Then I pause the browser
```

In this file you can see a scenario where we want to search something on google. And for this we are using three steps. Let's see each step's implementation in detail.

**Given I visit google**

```ruby
Given(/^I visit google$/) do
  visit 'http://www.google.com'
end
```

In this step we are calling a capybara's method visit which will take us to google.com

**And I search "github ajitsing"**

```ruby
And(/^I search "([^"]*)"$/) do |query|
  search_box = '#lst-ib'
  search_button = '.lsb'

  find(search_box).set query
  find(search_button).click
end
```

In this step we are searching for a query in google. There are few things to note here.

1. Variable search_box contains the selector of search input box on google home page. I found this selector using inspect element, which is not so difficult to find. And similarly I have added the selector for search_button in our step.

2. Now we use capybara's find method to find that particular element on the page. First we are calling find for getting the search input box and then we are calling the set method on it to fill in the query which we want to search.

3. And then we are calling find method to find the search button and calling click method to click on the button.

4. Clicking on the button will take us to the search results page.

**Then I pause the browser**

```ruby
Then(/^I pause the browser$/) do
  require 'pry'
  binding.pry
end
```

This step is used for pausing the test in order to see the result in the browser, not doing that will quit the browser immediately which will not give us time to look into the search results.

Generally we use `binding.pry` only when we want to debug something. It will open a ruby console on command line to execute the ruby statements directly and see the result on the browser.

