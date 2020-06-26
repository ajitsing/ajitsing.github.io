---
layout: post
title: MVP in android
description: How to use MVP in android, In this article we will discuss what is MVP in android and how we can implement it. MVP helps improve coverage of code too.
cover-img: /assets/img/posts/android_mvp/cover.png
permalink: /mvp-in-android
tags: [android, design pattern]
comments: true
---

Hello Folks, In this article we will discuss what is MVP in android and how we can use it to make our code better organised and unit/integration tested ([video series](https://www.youtube.com/watch?v=gdsxVfq-yNM&list=PLFYf87MeyEq588ibGPTu5lEhnJZG6KsmR){:target="_blank"} on android instrumentation testing). There are mainly three components involved in MVP pattern Model, View and Presenter. Lets discuss about each of them in detail.

# What is MVP in android?

You might have seen the android code examples. Mostly you will find all the code written in the activity itself. Which makes the code less readable and hard to test. MVP helps us to separate the concerns of various parts of the code and keep it organised. Take a look at the below diagram

![Crepe](/assets/img/posts/android_mvp/android_mvp.png)

Let's discuss about all the components of MVP in android one by one.

# View

In android MVP, a view contains two things:

1. [Activity](https://github.com/ajitsing/ExpenseManager/blob/master/app/src/main/java/ajitsingh/com/expensemanager/activity/AddCategoryActivity.java){:target="_blank"} - android resource
2. [View](https://github.com/ajitsing/ExpenseManager/blob/master/app/src/main/java/ajitsingh/com/expensemanager/activity/AddCategoryActivity.java){:target="_blank"} - java interface

`Activity Implements the View` and it injects itself(View interface) in the presenter so that presenter can talk to activity using view interface. First three blocks of the diagram shows the communication between View and The Presenter.

# Presenter

[Presenter](https://github.com/ajitsing/ExpenseManager/blob/master/app/src/main/java/ajitsingh/com/expensemanager/presenter/CategoryPresenter.java){:target="_blank"} acts as a middle layer between View and Data/Model. View(Activity) commands presenter to present something and presenter then takes data from the database/Model and gives back the presentable form of data to the View. View then takes care of displaying that data on the screen. And remember that Presenter is a plain java class it should not include any of the android components otherwise it will make the unit testing of the presenter hard.

If you wish to use database in the presenter then make activity create a database instance and inject it in the presenter. This will help you to mock the database while unit testing and will enable you to test the business logic.

# Model

Model in MVP is nothing but your data source. View does not talk to data directly instead it commands Presenter to handle data for it and give the information back which can be displayed without any further modification.

# Example of application built using MVP

Recently I built an app called [ExpenseManager](https://github.com/ajitsing/ExpenseManager){:target="_blank"} to manage my expenses and its a prefect example of MVP in android. Have a look at the code and the tests.

Thats all folks, If you have any questions or feedback, please leave a comment.


