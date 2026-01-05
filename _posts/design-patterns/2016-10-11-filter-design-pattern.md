---
layout: post
seo: true
title: Filter Design Pattern
description: How filter design pattern works and what are the use cases. This article explains filter design pattern with the help of an example.
share-img: /assets/img/posts/design-patterns/filter-design-pattern.png
thumbnail-img: /assets/img/posts/design-patterns/filter-design-pattern.png
permalink: /design-patterns/filter/
redirect_from:
  - /filter-design-pattern/
gh-repo: ajitsing/design_patterns
gh-badge: [star, fork, follow]
tags: [java, design-patterns]
pattern-category: "structural"
comments: true
keywords: "filter design pattern, criteria pattern, java filter pattern, design patterns, dynamic filtering, java criteria filter, specification pattern, reusable filters, filter chain pattern, software architecture"
video:
  id: "icgoR_vfh40"
  title: "Filter Design Pattern Explained"
  description: "Learn the Filter Design Pattern (also known as Criteria Pattern) with a Java example - build reusable, composable filter criteria."
faq:
  - question: "What is the Filter Design Pattern?"
    answer: "The Filter (or Criteria) pattern lets you filter collections of objects using different criteria. Each criterion is a separate class implementing a filter interface, making filters reusable, testable, and composable through AND/OR combinations."
  - question: "When should I use the Filter Design Pattern?"
    answer: "Use it when you need dynamic filtering with multiple criteria, or when different features need different filter combinations. Instead of hardcoding filters in business logic, create reusable filter classes that can be combined as needed."
  - question: "How do you combine multiple filters?"
    answer: "Create composite filter classes like AndCriteria and OrCriteria that take multiple filters and combine their results. This lets you build complex filters from simple ones: filter.and(anotherFilter).or(thirdFilter)."
  - question: "What are the benefits of Filter Design Pattern?"
    answer: "Single Responsibility - each filter does one thing. Open/Closed - add new filters without modifying existing code. Reusability - same filter works across features. Testability - filters are easy to unit test in isolation."
---

# What Is Filter Design Pattern?

Filter design pattern is used for building a criteria to filter items or objects dynamically. You can choose your own criteria and apply it on your objects to filter out the desired objects.

# When to use Filter Design Pattern?

It's easy to figure out when one should use filter design pattern. When you have a requirement where you want to add filters dynamically or you are implementing multiple functionalities and most of them require different filter criteria to filter something. In that case instead of hard coding the filters inside the functionalities, you can create filter criteria and re-use it wherever required.

# Video

{% include youtubePlayer.html id="icgoR_vfh40" %}

# Example:

Let's understand Filter Design Pattern with an example. All the code used below is available on [github](https://github.com/ajitsing/design_patterns/tree/master/src/filter_pattern){:target="_blank"}.

Let's build a hypothetical scenario to understand this pattern better.

You are building a tool to help tech-ops team in your company to distribute laptops to employees according to their configuration requirements. Each role in company has a different configuration requirement. Now tech-ops team have a very hard time to filter out the laptops as per the employee requirement because its a manual process.

The tool you are building provides a functionality to the employees to add filters to search for their desired laptop. The filters may change across the employees.

This is a very good place to use the filter design pattern, as you know that filters may change across employees. Now let's implement the solution.

# Design

![Crepe](/assets/img/posts/filter_design_pattern/filter-design-pattern.png)

Let's define the interface which every criteria has to implement. This interface has a method which meets the employee requirement and returns the filtered laptops.

# Criteria.java<br><br>

```java
package filter_pattern.filter_criteria;


import filter_pattern.model.Laptop;

import java.util.List;

public interface Criteria {
    List<Laptop> meets(List<Laptop> laptops);
}
```

Now let's implement a bunch of criteria to choose from.

# Macintosh.java<br><br>

```java
package filter_pattern.filter_criteria;


import filter_pattern.model.Laptop;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class Macintosh implements Criteria {
    @Override
    public List<Laptop> meets(List<Laptop> laptops) {
        return laptops.stream().filter(laptop -> laptop.getOperatingSystem().equals("MAC")).collect(toList());
    }
}
```
<br>

# 4GBRam.java<br><br>

```java
package filter_pattern.filter_criteria;

import filter_pattern.model.Laptop;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class Ram4GB implements Criteria {
    @Override
    public List<Laptop> meets(List<Laptop> laptops) {
        return laptops.stream().filter(laptop -> laptop.getRam().equals("4GB")).collect(toList());
    }
}
```
<br>

# I7Processor.java<br><br>

```java
package filter_pattern.filter_criteria;


import filter_pattern.model.Laptop;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class I7Processor implements Criteria {
    @Override
    public List<Laptop> meets(List<Laptop> laptops) {
        return laptops.stream().filter(laptop -> laptop.getProcessor().equals("i7")).collect(toList());
    }
}
```
<br>

# ScreenSize15Inch.java<br><br>

```java
package filter_pattern.filter_criteria;

import filter_pattern.model.Laptop;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class ScreenSize15Inch implements Criteria {
    @Override
    public List<Laptop> meets(List<Laptop> laptops) {
        return laptops.stream().filter(laptop -> laptop.getScreenSize().equals("15inch")).collect(toList());
    }
}
```

Likewise there can be a lot of other criteria e.g Windows.java, Ubuntu.java, 8GBRam.java, I3Processor.java etc.

There is two more criteria which are very important AndCriteria and OrCriteria. Both are used to combine multiple criteria.

# AndCritera.java<br><br>

```java
package filter_pattern.filter_criteria;


import filter_pattern.model.Laptop;

import java.util.List;

public class AndCriteria implements Criteria {
    private Criteria[] criterias;

    public AndCriteria(Criteria... criterias) {
        this.criterias = criterias;
    }

    @Override
    public List<Laptop> meets(List<Laptop> laptops) {
        List<Laptop> filteredLaptops = laptops;

        for (Criteria criteria : criterias) {
            filteredLaptops = criteria.meets(filteredLaptops);
        }

        return filteredLaptops;
    }
}
```

Now that we have all criteria implemented, lets use them to filter out the desired laptops.

# LaptopScanner.java<br><br>

```java
package filter_pattern;

import filter_pattern.filter_criteria.AndCriteria;
import filter_pattern.filter_criteria.I7Processor;
import filter_pattern.filter_criteria.Macintosh;
import filter_pattern.filter_criteria.Ram4GB;
import filter_pattern.model.Laptop;

import java.util.List;

public class LaptopScanner {

    public static void main(String[] args) {
        List<Laptop> laptops = LaptopFactory.manufactureInBulk();

        AndCriteria searchCriteria = new AndCriteria(new Ram4GB(), new Macintosh(), new I7Processor());
        List<Laptop> filteredLaptops = searchCriteria.meets(laptops);

        filteredLaptops.stream().forEach(Laptop::prettyPrint);
    }
}
```

This class combines multiple criteria and prints the laptops which matches with employees configuration.

Thats all folks, I hope now you have a better understanding of filter design pattern. If you have any comments, suggestions or feedback, please leave a comment below. Thanks!
