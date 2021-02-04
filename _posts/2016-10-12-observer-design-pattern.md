---
layout: post
title: Observer Design Pattern
description: How observer design pattern works and what are the use cases. This article explains observer design pattern with the help of an example.
share-img: /assets/img/posts/observer_design_pattern/observer-design-pattern.png
permalink: /observer-design-pattern/
gh-repo: ajitsing/design_patterns
gh-badge: [star, fork, follow]
tags: [java, design pattern]
comments: true
---

# What is Observer Design Pattern?

Observer design pattern is a software design pattern in which an `Observable/Subject` maintains a list of `Observers/Subscribers` and notifies them whenever its state changes.

# When to use Observer Design Pattern?

The Observer design pattern can be used in the cases where multiple objects wants to observe an observable object so that they can change themselves when its state changes.

# Video

{% include youtubePlayer.html id="KSJJ3JO9Zpc" %}
<br>

# Example:

Let's understand Observer Design Pattern with an example. All the code used below is available on [github](https://github.com/ajitsing/design_patterns/tree/master/src/observer_pattern){:target="_blank"}.

Let's build a hypothetical scenario to understand this pattern better.

You are building a website which supports multiple themes. Every web page of website has multiple componets e.g header, footer, body, nav bar etc.

When the User changes the theme of website, all the components on that web page should change their style according to the selected theme.

One way to do this is add an event listener on the theme selection component and when the event is triggered, access all the page components and ask them to change the style by passing in the selected theme.

Or a much cleaner way would be to make all the components subscribe to the theme and whenever the theme state changes, it will notify all its observers and observers will take care of updating themselve.

The good thing about this approach is that you can change the subscribers whenever you want.

# Design

![Crepe](/assets/img/posts/observer_design_pattern/observer-design-pattern.png)

# Implementation

Lets create the `Observable` interface which will be implemented by the `Theme` class.

# Observable.java<br><br>

{% highlight java linenos %}
package observer_pattern.observable;

import observer_pattern.observers.Observer;

public interface Observable {
    void subscribe(Observer observer);

    void unsubscribe(Observer observer);

    void notifyObservers();
}
{% endhighlight %}

Now let's create the `Observer` interface which will be implemented by the page components.

# Observer.java<br><br>

{% highlight java linenos %}
package observer_pattern.observers;

import observer_pattern.Mode;

public interface Observer {
    void update(Mode mode);
}
{% endhighlight %}
<br>

Let us impelment the Theme class which will have the list of subscribers and the mode of the theme.

# Theme.java<br><br>

{% highlight java linenos %}
package observer_pattern.observable;

import observer_pattern.Mode;
import observer_pattern.observers.Observer;

import java.util.ArrayList;

public class Theme implements Observable {

    private final ArrayList<Observer> observers;
    private Mode mode;

    public Theme(Mode mode) {
        this.mode = mode;
        observers = new ArrayList<>();
    }

    public void changeTheme(Mode mode) {
        this.mode = mode;
        notifyObservers();
    }

    @Override
    public void subscribe(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void unsubscribe(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(mode);
        }
    }
}
{% endhighlight %}
<br>

Now let us create couple of page componets which will implement `Observer` interface.

# Header.java<br><br>

{% highlight java linenos %}
package observer_pattern.observers;

import observer_pattern.Mode;

public class Header implements Observer {
    @Override
    public void update(Mode mode) {
        System.out.println("Applying " + mode.name() + " theme to header");
    }
}
{% endhighlight %}
<br>

# Footer.java<br><br>

{% highlight java linenos %}
package observer_pattern.observers;

import observer_pattern.Mode;

public class Footer implements Observer {
    @Override
    public void update(Mode mode) {
        System.out.println("Applying " + mode.name() + " theme to footer");
    }
}
{% endhighlight %}

Likewise there can be a lot of other observers e.g PageBody.java, NavBar.java etc.

Now that we have both `Observable` and `Observers` ready, let us use them to simulate a website experience.

# Main.java<br><br>

{% highlight java linenos %}
package observer_pattern;

import observer_pattern.observable.Theme;
import observer_pattern.observers.Footer;
import observer_pattern.observers.Header;
import observer_pattern.observers.NavBar;
import observer_pattern.observers.PageBody;

import static observer_pattern.Mode.BRIGHT;
import static observer_pattern.Mode.DARK;

public class Main {
    public static void main(String[] args) {
        Theme theme = new Theme(BRIGHT);

        Header header = new Header();
        NavBar navBar = new NavBar();
        Footer footer = new Footer();
        PageBody pageBody = new PageBody();

        theme.subscribe(header);
        theme.subscribe(footer);
        theme.subscribe(navBar);
        theme.subscribe(pageBody);

        theme.changeTheme(DARK);

        theme.unsubscribe(footer);

        theme.changeTheme(BRIGHT);
    }
}
{% endhighlight %}

In this example we are creating a Theme object which is our Observable and we are creating multiple page components which are Observers.

First we are subscribing all the page components to the Theme and then changing the theme to DARK mode. According to our Observers implementation whenever the theme will change all observers will print a message that they are changing the style according to the theme.

Thats all folks, I hope now you have a better understanding of observer design pattern. If you have any comments, suggestions or feedback, please leave a comment below. Thanks!
