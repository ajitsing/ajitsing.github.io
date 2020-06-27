---
layout: post
title: Is ruby monkey patching evil?
description: The way we use ruby monkey patching, is it good or evil? Lets understand through some examples.
cover-img: /assets/img/posts/ruby_monkey_patching/cover.jpeg
permalink: /is-ruby-monkey-patching-evil
tags: [ruby]
comments: true
---

We have been using monkey patching since we had exposure to it. Now the question is ruby monkey patching is it good or bad?.  Before answering the question lets understand what monkey patching is.

# What is Ruby monkey patching?

When we see an opportunity to move a util method to one of the existing ruby's standard classes, thats when we open the existing ruby class and add that method there. This is called monkey patching or open classes in ruby.

# Example of money patching or open classes

Lets say we want to create a Tweet object from a String object. Lets implement it in two ways.

### Using normal util method<br><br>

```ruby
def to_tweet(val)
  Twitter::Tweet.new val
end

to_tweet("Is ruby monkey patching evil?")
```
<br>

### Using monkey  patching<br><br>

```ruby
class String
  def to_tweet
    Twitter::Tweet.new self
  end
end

"Is ruby monkey evil?".to_tweet
```

In second example we are using the concept of monkey patching or open classes. Now you might say how it can be evil? Its a good thing to put the method in String class itself rather than having a separate Util module or class to do the job.

# How ruby monkey patching can be evil?

Let's understand it through an example. So let's take a scenario where we want to replace a string in the array with another string. If you do it using monkey patching, you would write something like this

```ruby
class Array
  def replace(existing_val, new_val)
   each_with_index do |val, index|
     self[index] = new_val if val == existing_val
   end
  end
end

['hello', 'ruby', 'monkey patching'].replace('monkey patching', 'open classes')
```

The above code will work fine. But if you have used array in your project exhaustively and you don't have test, you might face some issues and your code will break. Why, because ruby's Array class already has a replace method, And if you have used that replace method and you don't have test for it you will not know where it might break.

```ruby
['hello'].methods.grep /rep/
 => [:replace, :repeated_permutation, :repeated_combination, :grep]
```

Also for the people who are new to ruby will see this replace method and think that it replaces a string with another and when they try it outside the project then it doesn't behave as expected. Then it creates confusion for them and doesn't leave a good impression of ruby.

# What should we do to avoid such issues?

So we have to be very careful while using monkey patching in our code. Look if the method with the same name already exists if yes think of some different name and then monkey patch it. And write tests from day 1 which will give you confidence to use such concepts in your codebase.

