---
layout: post
title: Closure in Ruby
description: Closure in Ruby, This article will explain what is closure in ruby and how it works.
share-img: /assets/img/posts/ruby/cover.png
permalink: /closure-in-ruby/
tags: [ruby]
keywords: "ruby closure, ruby blocks, ruby lambda, closure in programming, ruby scope, ruby binding, ruby functional programming, ruby code examples, ruby tutorial, ruby advanced concepts"
comments: true
---

# What is Closure?

A closure is a function or a method or a block in case of ruby which has an environment/scope of its own and that environment/scope can have local variables, bindings which can be used at the place where that function is getting executed.

# What is closure in ruby?

In ruby closure is nothing but a block or lambda which captures the bindings of the scope where it's defined. That binding can have local variables defined inside the block or any variable that was available to the block at the time when it was defined.

# Lets understand via an example<br><br>

```ruby
class Printer
  def print
    p yield
    p "done.."
  end
end

printer = Printer.new
title = "Closures!"

printer.print do
  "Hello #{title}"
end #=> Hello Closures!
```

In the above code snippet we have a `Printer` class, which prints whatever is passed in the block. Now our block which is passed to the print method is a closure. And this closure has a variable in its binding which is being used in the `print` method of Printer class.

Can a closure modify the value of variable which is bound to it?

```ruby
def change
  yield
end

x = 1
change do
   x = 10
end

p x #=> 10
```

So the answer is yes, a closure can change the value of its variable which is bound to it. This is because when a block is passed, it contains the references of the variables bounded to it. hence if you modify the variable it will take effect everywhere.

What if the scope where block is getting executed has a variable with the same name which is present in a block, which value will it pick?

```ruby
def change
  x = 2
  yield
  p x # => 2
end

x = 1
change do
   x = 10
end

p x # => 10
```

Value of `x` inside the `change` method doesn't get modified instead it modifies the variable which was available inside the closure/block. So this explains that, a block uses only those variables which were present when it was defined.
