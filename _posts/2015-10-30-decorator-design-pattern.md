---
layout: post
title: Decorator Design Pattern
description: Decorator Design Pattern is very useful when it comes to modifying the characteristics or functionality of an object at runtime.
cover-img: /assets/img/posts/decorator_design_pattern/cover.png
permalink: /decorator-design-pattern
gh-repo: ajitsing/design_patterns
gh-badge: [star, fork, follow]
tags: [java, design patterns]
comments: true
---

# What Is Decorator Pattern?

Decorator design pattern is a pattern which modifies the functionality of an object. In other words it gives different flavours to an object without using inheritance. You might think why not use inheritance if you are talking about flavours? Well, yes these are flavours but the permutation and combination of these flavours can be many and in that case it doesn't make sense to create a class for each combination.

Lets say you have 6 factors that can change the characteristics of your object, in that case you will have factorial of 6 which is, `6! = 720`, so there can be 720 objects with different characteristics.

# When to use it?

This pattern can be used when you have a requirement that you have to add characteristics to an object at runtime. And the factors that can affect the object's characteristics are many.

# Video<br><br>

{% include youtubePlayer.html id="DX6zmUyIhZg" %}
<br>


# Lets Understand With An Example

Problem Statement - In a flight while booking a main cabin seat, you can choose facilities like WiFi, Live TV, Head Phones etc. At the end you should show the price of the seat after including the individual price of each facility that user has chosen. For instance

Main cabin seat - $ 500.0
WiFi: $ 10
Live TV: $ 8.0
Head Phones: $ 5.0

If use choses WiFi and Head Phones with main cabin seat then total cost would be 500.0 + 10.0 + 5.0 = $ 515.0

Similarly there can be multiple combination of facilities a user can choose.

# Design

![Crepe](/assets/img/posts/decorator_design_pattern/decorator_design_pattern.png)

As you can see in the above image that we have a FlightSeat Interface and [MainCabinSeat](https://github.com/ajitsing/design_patterns/blob/master/src/decorator_pattern/MainCabinSeat.java){:target="_blank"} implements FlightSeat. We have an abstract class [FlightSeatDecorator](https://github.com/ajitsing/design_patterns/blob/master/src/decorator_pattern/decorator/FlightSeatDecorator.java){:target="_blank"} which holds an instance of [FlightSeat](https://github.com/ajitsing/design_patterns/blob/master/src/decorator_pattern/FlightSeat.java){:target="_blank"}. And we have 3 facilities (decorators) which extends the FlightSeatDecorator class.

# Implementation

Above is the github link to decorator pattern implementation. Still we will discuss the implementation of some important classes.

The FlightSeat interface has only two methods one gives the chosen facilities with the seat and other tells the cost of the seat with facilities.

```java
package decorator_pattern;

public interface FlightSeat {

    String getFacilities();

    Double getCost();

}
```

The FlightSeatDecorator has an instance of FlightSeat and also has both the methods.

```java
package decorator_pattern.decorator;

import decorator_pattern.FlightSeat;

public abstract class FlightSeatDecorator implements FlightSeat {
    protected FlightSeat flightSeat;

    public FlightSeatDecorator(FlightSeat flightSeat) {
        this.flightSeat = flightSeat;
    }

    public abstract String getFacilities();

    public abstract Double getCost();
}
```

MainCabinSeat implements the FlightSeat and both its methods.

```java
package decorator_pattern;

public class MainCabinSeat implements FlightSeat {
    @Override
    public String getFacilities() {
        return "Main Cabin Seat";
    }

    @Override
    public Double getCost() {
        return 500.0;
    }
}
```

WiFi decorator extends the FlightSeatDecorator and implements both the methods which are there in the decorator. It has its own cost.

```java
package decorator_pattern.decorator;

import decorator_pattern.FlightSeat;

public class WiFi extends FlightSeatDecorator {
    public WiFi(FlightSeat flightSeat) {
        super(flightSeat);
    }

    @Override
    public String getFacilities() {
        return this.flightSeat.getFacilities() + "\nWiFi";
    }

    @Override
    public Double getCost() {
        return this.flightSeat.getCost() + 10.0;
    }
}
```

Below is the main class which shows how we can use the facilities with the seat and get the cost.

```java
package decorator_pattern;

import decorator_pattern.decorator.HeadPhone;
import decorator_pattern.decorator.LiveTV;
import decorator_pattern.decorator.WiFi;

public class Test {
    public static void main(String[] args) {
        FlightSeat mainCabinSeat = new WiFi(new HeadPhone(new LiveTV(new MainCabinSeat())));

        System.out.println("Chosen Facilities for your seat:");
        System.out.println(mainCabinSeat.getFacilities());
        System.out.println("Total Cost:" + mainCabinSeat.getCost());
    }
}
```

If you want to see the implementation of all the classes then please visit the [github link](https://github.com/ajitsing/design_patterns/blob/master/src/decorator_pattern/FlightSeat.java){:target="_blank"}. And if you have any feedback, suggestion, concern or opinion please leave a comment below.