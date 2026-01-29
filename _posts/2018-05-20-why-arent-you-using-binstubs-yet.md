---
layout: post
categories: ruby
seo: true
title: Why aren't you using binstubs yet?
description: Stop typing bundle exec before every command. Learn how Rails binstubs work and how to create custom binstubs for any gem to run executables in your bundle context.
share-img: /assets/img/posts/bin_stubs/cover.png
permalink: /why-arent-you-using-binstubs-yet/
tags: [rails, ruby]
comments: true
keywords: "rails binstubs, bundle exec alternative, ruby binstubs, rails 5 bin, ruby gem executables, rails project setup, binstubs vs bundle exec, rails rake tasks, ruby gem versioning, rails development tips"
faq:
  - question: "What are binstubs in Rails?"
    answer: "Binstubs are wrapper scripts in the bin/ directory that run gem executables in the context of your current bundle. They eliminate the need for 'bundle exec' by loading your Gemfile and ensuring the correct gem versions are used."
  - question: "Why do we need bundle exec?"
    answer: "When you run a gem executable directly (like 'rake'), the system might use a different version than your project requires. 'bundle exec' ensures the command uses gem versions from your Gemfile. Binstubs achieve the same result without the prefix."
  - question: "How do I create a binstub for a gem?"
    answer: "Run 'bundle binstub <gem-name>' to generate binstubs for a gem's executables. For example, 'bundle binstub capistrano' creates bin/cap and bin/capify. Then run commands as bin/cap instead of bundle exec cap."
  - question: "How do binstubs work internally?"
    answer: "Binstubs require config/boot.rb which loads bundler/setup with your Gemfile. This sets up all gems from your bundle before executing the command. The script runs in your project's gem context automatically."
---

If you have been using bundle exec to run any executable gem and tired of it then this post is for you. In this post I will show you the ways to avoid bundle exec command and run the executable directly instead.

# Why do we use bundle exec at all?

Often you would have seen people prefixing bundle exec before executing any executable gem e.g rake. Why do they do that, why not directly run rake db:seed instead of bundle exec rake db:seed?

The answer is when you directly run the rake task or execute any binary file of a gem, there is no guarantee that the command will behave as expected. Because it might happen that you already have the same gem installed on your system which have a version say 1.0 but in your project you have higher version say 2.0. In this case you can not predict which one will be used.

To enforce the desired gem version you take the help of bundle exec command which would execute the binary in context of current bundle. That means when you use bundle exec, bundler checks the gem version configured for the current project and use that to perform the task.

Now that we understand why we need bundle exec command, lets see if we can avoid adding this prefix before every command and still achieve the desired behaviour.

# The rails 5 way

Rails 5 has introduced something called bin stubs. Bin stubs are created keeping the above problem in mind. When you create a new rails 5 project, by default you will have some binary files under /bin folder. Here is how the default bin stubs look like.

![Crepe](/assets/img/posts/bin_stubs/bin_stubs.png)

All these scripts runs within the context of current bundle. Lets take a look at one of the bin stub files. For instance this is how the rails binary file looks like.

```ruby
#!/usr/bin/env ruby
begin
  load File.expand_path('../spring', __FILE__)
rescue LoadError => e
  raise unless e.message.include?('spring')
end
APP_PATH = File.expand_path('../config/application', __dir__)
require_relative '../config/boot'
require 'rails/commands'
```

Take a look at the above code. I want you to focus on the second last line which requires the boot.rb file. Now lets see what lies in boot.rb file.

```ruby
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
```

boot.rb loads all the gems listed in Gemfile and this is how your bin stub executable will run in the context of current bundle.

# How to invoke a bin stub?

When you are using rails 5, you can run all the rake tasks using the rails command. which intern always runs the bin/rails binary file. In case you don't have this file in your rails 5 project, rails will not consider it a rails project and will prompt you to create  a new rails project instead.

In case of other binary files like rake or spring you will have to execute them as bin/rake or bin/spring still better than prefixing bundle exec which looks some kind of magic if you don't understand what it does or mean.

# Creating custom bin stubs

By default rails will create only the above mentioned bin stubs. If you wish to create bin stub for another gem, you can do it with a single command. Here is how you can do it.

```shell
bundle binstub capistrano
```

It will create the binstubs for all the binary files present inside capistrano gem. In this case capistrano has two binary files cap and capify. That means you will see two new files added under bin/ folder. bin/cap and bin/capify

# How can I generate bin stubs when I am not using rails 5?

We don't always work on rails 5 projects. How can we stop using bundle exec in simple ruby projects?

Well, the answer is simple. There is a ruby gem for this called [rubygems-bundler](https://github.com/rvm/rubygems-bundler){:target="_blank"}. It has a very good readme, you can take a look at how it works and how to create bin stubs using it.

I hope next time when you use bundle exec you will ask yourself if you really wanna type bundle exec for every single command or want to make it DRY and simply execute the command instead.

Thanks!