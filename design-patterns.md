---
layout: page
title: "Design Patterns"
subtitle: "Battle-tested solutions to common software design problems"
seo: true
description: "Learn the 23 Gang of Four design patterns with practical examples. Creational, Structural, and Behavioral patterns explained with Java code, mermaid diagrams, and real-world use cases."
keywords: "design patterns, gang of four patterns, creational patterns, structural patterns, behavioral patterns, singleton pattern, factory pattern, strategy pattern, observer pattern, decorator pattern, software architecture"
thumbnail: /assets/img/ajit-singh-blog-og.png
share-img: /assets/img/ajit-singh-blog-og.png
permalink: /design-patterns/
social-share: true
canonical-url: "{{ site.url }}/design-patterns/"
---

<meta name="robots" content="index, follow">
<meta property="og:type" content="website">
<meta property="og:title" content="Design Patterns Guide">
<meta property="og:description" content="Master the 23 Gang of Four design patterns with practical examples, code samples, and real-world use cases.">
<meta property="og:image" content="{{ site.url }}/assets/img/ajit-singh-blog-og.png">
<meta property="og:url" content="{{ site.url }}/design-patterns/">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Design Patterns Guide">
<meta name="twitter:description" content="Learn Creational, Structural, and Behavioral patterns with practical Java examples and architecture diagrams.">
<meta name="twitter:image" content="{{ site.url }}/assets/img/ajit-singh-blog-og.png">

{% assign design_pattern_posts = site.posts | where_exp: "post", "post.tags contains 'design-patterns'" | sort: "date" | reverse %}
{% assign date_format = site.date_format | default: "%B %-d, %Y" %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "headline": "Design Patterns Guide",
  "description": "Collection of Gang of Four design patterns with practical examples, code samples, and real-world use cases.",
  "url": "{{ site.url }}/design-patterns/",
  "author": {
    "@type": "Person",
    "name": "Ajit Singh",
    "url": "https://github.com/ajitsing",
    "sameAs": [
      "https://github.com/ajitsing",
      "https://linkedin.com/in/ajitsingh",
      "https://x.com/ajit5ingh"
    ]
  },
  "publisher": {
    "@type": "Person",
    "name": "Ajit Singh",
    "url": "{{ site.url }}"
  },
  "about": [
    { "@type": "Thing", "name": "Design Patterns" },
    { "@type": "Thing", "name": "Software Architecture" },
    { "@type": "Thing", "name": "Gang of Four" },
    { "@type": "Thing", "name": "Object-Oriented Design" }
  ],
  "numberOfItems": {{ design_pattern_posts.size }},
  "itemListElement": [
    {% for post in design_pattern_posts %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "url": "{{ site.url }}{{ post.url }}",
      "name": "{{ post.title | escape }}",
      "description": "{{ post.description | default: post.excerpt | strip_html | strip_newlines | escape | truncatewords: 25 }}"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "@id": "{{ site.url }}/design-patterns/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "{{ site.url }}"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Design Patterns",
        "item": "{{ site.url }}/design-patterns/"
      }
    ]
  }
}
</script>

<div class="pattern-intro">
  <p>Design patterns are proven solutions to recurring problems in software design. The Gang of Four (GoF) catalogued 23 patterns in their seminal 1994 book, organized into three categories based on their purpose.</p>
</div>

{% assign creational_posts = design_pattern_posts | where_exp: "post", "post.pattern-category == 'creational'" %}
{% assign structural_posts = design_pattern_posts | where_exp: "post", "post.pattern-category == 'structural'" %}
{% assign behavioral_posts = design_pattern_posts | where_exp: "post", "post.pattern-category == 'behavioral'" %}

{% if creational_posts.size > 0 %}
<h2 class="pattern-category-title"><i class="fas fa-cube"></i> Creational Patterns</h2>
<p class="pattern-category-desc">Patterns that deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.</p>

<div class="posts-list">
  {% for post in creational_posts %}
  <article class="post-preview">
    <a href="{{ post.url | relative_url }}" class="post-preview-link" onclick="gtag('event', 'click', {'event_category': 'Blog Post', 'event_label': '{{ post.title | escape }}'});">
      <div class="post-content">
        <h2 class="post-title">{{ post.title }}</h2>

        {% if post.subtitle %}
          <p class="post-subtitle">{{ post.subtitle }}</p>
        {% else %}
          <p class="post-excerpt">
            {{ post.description | default: post.excerpt | strip_html | xml_escape | truncatewords: 30 }}
          </p>
        {% endif %}

        <div class="post-meta-row">
          <span class="post-date">
            {{ post.date | date: "%b %-d, %Y" }}
          </span>
        </div>
      </div>

      {% if post["thumbnail-img"] %}
      <div class="post-thumbnail">
        <img src="{{ post["thumbnail-img"] | relative_url }}" alt="{{ post.title }}" loading="lazy">
      </div>
      {% elsif post["share-img"] %}
      <div class="post-thumbnail">
        <img src="{{ post["share-img"] | relative_url }}" alt="{{ post.title }}" loading="lazy">
      </div>
      {% else %}
      <div class="post-thumbnail post-thumbnail-placeholder">
        <i class="fas fa-cube"></i>
      </div>
      {% endif %}
    </a>
  </article>
  {% endfor %}
</div>
{% endif %}

{% if structural_posts.size > 0 %}
<h2 class="pattern-category-title"><i class="fas fa-sitemap"></i> Structural Patterns</h2>
<p class="pattern-category-desc">Patterns that ease the design by identifying a simple way to realize relationships between entities.</p>

<div class="posts-list">
  {% for post in structural_posts %}
  <article class="post-preview">
    <a href="{{ post.url | relative_url }}" class="post-preview-link" onclick="gtag('event', 'click', {'event_category': 'Blog Post', 'event_label': '{{ post.title | escape }}'});">
      <div class="post-content">
        <h2 class="post-title">{{ post.title }}</h2>

        {% if post.subtitle %}
          <p class="post-subtitle">{{ post.subtitle }}</p>
        {% else %}
          <p class="post-excerpt">
            {{ post.description | default: post.excerpt | strip_html | xml_escape | truncatewords: 30 }}
          </p>
        {% endif %}

        <div class="post-meta-row">
          <span class="post-date">
            {{ post.date | date: "%b %-d, %Y" }}
          </span>
        </div>
      </div>

      {% if post["thumbnail-img"] %}
      <div class="post-thumbnail">
        <img src="{{ post["thumbnail-img"] | relative_url }}" alt="{{ post.title }}" loading="lazy">
      </div>
      {% elsif post["share-img"] %}
      <div class="post-thumbnail">
        <img src="{{ post["share-img"] | relative_url }}" alt="{{ post.title }}" loading="lazy">
      </div>
      {% else %}
      <div class="post-thumbnail post-thumbnail-placeholder">
        <i class="fas fa-sitemap"></i>
      </div>
      {% endif %}
    </a>
  </article>
  {% endfor %}
</div>
{% endif %}

{% if behavioral_posts.size > 0 %}
<h2 class="pattern-category-title"><i class="fas fa-exchange-alt"></i> Behavioral Patterns</h2>
<p class="pattern-category-desc">Patterns that identify common communication patterns between objects and realize these patterns.</p>

<div class="posts-list">
  {% for post in behavioral_posts %}
  <article class="post-preview">
    <a href="{{ post.url | relative_url }}" class="post-preview-link" onclick="gtag('event', 'click', {'event_category': 'Blog Post', 'event_label': '{{ post.title | escape }}'});">
      <div class="post-content">
        <h2 class="post-title">{{ post.title }}</h2>

        {% if post.subtitle %}
          <p class="post-subtitle">{{ post.subtitle }}</p>
        {% else %}
          <p class="post-excerpt">
            {{ post.description | default: post.excerpt | strip_html | xml_escape | truncatewords: 30 }}
          </p>
        {% endif %}

        <div class="post-meta-row">
          <span class="post-date">
            {{ post.date | date: "%b %-d, %Y" }}
          </span>
        </div>
      </div>

      {% if post["thumbnail-img"] %}
      <div class="post-thumbnail">
        <img src="{{ post["thumbnail-img"] | relative_url }}" alt="{{ post.title }}" loading="lazy">
      </div>
      {% elsif post["share-img"] %}
      <div class="post-thumbnail">
        <img src="{{ post["share-img"] | relative_url }}" alt="{{ post.title }}" loading="lazy">
      </div>
      {% else %}
      <div class="post-thumbnail post-thumbnail-placeholder">
        <i class="fas fa-exchange-alt"></i>
      </div>
      {% endif %}
    </a>
  </article>
  {% endfor %}
</div>
{% endif %}

{% if design_pattern_posts.size == 0 %}
<div class="no-design-pattern-posts">
  <p>Design pattern posts coming soon. Check back shortly!</p>
</div>
{% endif %}

<div class="rss-section-footer">
  {% include rss-subscribe.html %}
</div>

