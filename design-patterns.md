---
layout: hub
title: "Design Patterns"
meta-title: "Design Patterns Explained: Gang of Four Patterns with Java Examples"
subtitle: "Battle-tested solutions to common software design problems"
seo: true
description: "Design patterns explained with Java examples: all 23 Gang of Four creational, structural and behavioral patterns including Singleton, Factory, Strategy, Observer, Decorator, Builder, Adapter and Proxy."
keywords: "design patterns, design patterns explained, gang of four design patterns, gof design patterns, oop design patterns, object oriented design patterns, software design patterns, creational patterns, structural patterns, behavioral patterns, singleton pattern, factory pattern, abstract factory, builder pattern, prototype pattern, adapter pattern, bridge pattern, composite pattern, decorator pattern, facade pattern, flyweight pattern, proxy pattern, chain of responsibility, command pattern, iterator pattern, mediator pattern, memento pattern, observer pattern, state pattern, strategy pattern, template method, visitor pattern, design patterns in java, design patterns examples"
thumbnail: /assets/img/ajit-singh-blog-og.png
share-img: /assets/img/ajit-singh-blog-og.png
permalink: /design-patterns/
social-share: true
hub-icon: "fas fa-cubes"
hub-category: "design-patterns"
hub-intro: "The 23 Gang of Four patterns explained with practical Java code and real-world use cases. Each article breaks down when to use the pattern, how it works under the hood, and where it appears in production frameworks like Spring, JDK, and Android. Organized by Creational, Structural, and Behavioral categories."
hub-topics:
  - "Design Patterns"
  - "Software Architecture"
  - "Gang of Four"
  - "Creational Patterns"
  - "Structural Patterns"
  - "Behavioral Patterns"
  - "Object-Oriented Design"
hub-sections:
  - key: "creational"
    title: "Creational Patterns"
    icon: "fas fa-cube"
    description: "Patterns that deal with object creation mechanisms, trying to create objects in a manner suitable to the situation."
  - key: "structural"
    title: "Structural Patterns"
    icon: "fas fa-sitemap"
    description: "Patterns that ease the design by identifying a simple way to realize relationships between entities."
  - key: "behavioral"
    title: "Behavioral Patterns"
    icon: "fas fa-exchange-alt"
    description: "Patterns that identify common communication patterns between objects and realize these patterns."
also-known-as:
  - "Gang of Four Design Patterns"
  - "GoF Patterns"
  - "Object-Oriented Design Patterns"
  - "Software Design Patterns"
definition: "Design patterns are reusable, named solutions to recurring object-oriented design problems. The Gang of Four catalog (Gamma, Helm, Johnson, Vlissides, 1994) groups 23 patterns into three families: Creational (how objects are made: Singleton, Factory, Builder, Prototype, Abstract Factory), Structural (how objects compose: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy) and Behavioral (how objects communicate: Strategy, Observer, Command, State, Template Method, Iterator, Mediator, Memento, Visitor, Chain of Responsibility, Interpreter)."
faq:
  - question: "What are design patterns?"
    answer: "Design patterns are time-tested solutions to common software design problems, expressed as named templates rather than concrete code. They give developers a shared vocabulary (Singleton, Factory, Strategy) and capture the trade-offs of the solution. The most influential catalog is the 23 Gang of Four patterns from the 1994 book Design Patterns: Elements of Reusable Object-Oriented Software."
  - question: "What are the three categories of Gang of Four design patterns?"
    answer: "Creational patterns deal with object creation: Singleton, Factory Method, Abstract Factory, Builder, Prototype. Structural patterns deal with how classes and objects are composed: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy. Behavioral patterns deal with object collaboration and responsibilities: Strategy, Observer, Command, State, Template Method, Iterator, Mediator, Memento, Visitor, Chain of Responsibility, Interpreter."
  - question: "What is the Singleton pattern?"
    answer: "Singleton ensures a class has only one instance and provides a global access point to it. It is used for shared resources like configuration, logging, thread pools, and database connection pools. In Java the safest implementations are an enum-based Singleton or a static inner holder class, both of which guarantee thread safety and lazy initialization without explicit synchronization."
  - question: "What is the difference between Strategy and State pattern?"
    answer: "Both encapsulate behavior in separate classes, but the intent differs. Strategy lets a client pick an interchangeable algorithm (sort order, payment method) at runtime; the strategies usually do not know about each other. State lets an object change its behavior when its internal state changes; the state objects often know about each other and trigger transitions."
  - question: "Are design patterns still relevant?"
    answer: "Yes. Functional and reactive programming have absorbed some patterns (Iterator, Observer, Command) into language features, but the core Gang of Four catalog still describes problems that recur in every codebase: object creation, decoupling, varying behavior. Modern frameworks (Spring, Guice, React, Android) are built almost entirely from these patterns."
  - question: "Where can I see design patterns in real code?"
    answer: "The JDK uses Iterator (Collections), Observer (java.util.Observable, listeners), Decorator (BufferedReader wrapping InputStreamReader), Factory (Calendar.getInstance), Singleton (Runtime.getRuntime), and Adapter (java.io.InputStreamReader). Spring is built on Factory, Proxy, Template Method, and Strategy. Android uses Builder (AlertDialog.Builder), Observer (LiveData), and Adapter (RecyclerView.Adapter)."
definitions:
  - term: "Singleton"
    definition: "A creational pattern that restricts a class to a single instance and provides a global access point; used for shared configuration, logging, and connection pools."
  - term: "Factory Method"
    definition: "A creational pattern that defines an interface for creating an object but lets subclasses decide which concrete class to instantiate."
  - term: "Builder"
    definition: "A creational pattern that constructs a complex object step by step, useful when an object has many optional parameters."
  - term: "Adapter"
    definition: "A structural pattern that converts the interface of a class into another interface clients expect, letting incompatible classes work together."
  - term: "Decorator"
    definition: "A structural pattern that attaches new behavior to an object dynamically by wrapping it, providing a flexible alternative to subclassing."
  - term: "Proxy"
    definition: "A structural pattern that provides a placeholder for another object to control access, add caching, or enable lazy loading."
  - term: "Strategy"
    definition: "A behavioral pattern that defines a family of interchangeable algorithms and lets the client pick one at runtime."
  - term: "Observer"
    definition: "A behavioral pattern that defines a one-to-many dependency so when one object changes state, all dependents are notified."
  - term: "Command"
    definition: "A behavioral pattern that encapsulates a request as an object, allowing it to be queued, logged, undone, or sent across processes."
  - term: "Template Method"
    definition: "A behavioral pattern that defines the skeleton of an algorithm in a base class and lets subclasses override specific steps."
last-modified-date: 2026-04-22
sitemap:
  priority: 0.8
  changefreq: weekly
---
