---
layout: page
title: "Dev Weekly"
subtitle: "Latest trends, updates, and insights from the software development world"
seo: true
description: "Stay ahead with curated software development news, technology trends, programming updates, and tech industry insights. Covering web development, mobile apps, DevOps, AI/ML, and emerging technologies."
keywords: "dev news, software development news, programming trends, technology updates, web development news, mobile development, DevOps trends, AI ML updates, software engineering news, tech industry insights"
thumbnail: /assets/img/tech-news/software-development-news.png
share-img: /assets/img/tech-news/software-development-news.png
permalink: /software-development-news/
social-share: true
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "headline": "Dev Weekly - Software Development Updates",
  "description": "Curated software development news, technology trends, and programming updates covering web development, mobile apps, DevOps, AI/ML, and emerging technologies.",
  "author": {
    "@type": "Person",
    "name": "Ajit Singh",
    "url": "https://github.com/ajitsing"
  },
  "publisher": {
    "@type": "Person",
    "name": "Ajit Singh",
    "url": "{{ site.url }}"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ site.url }}{{ page.url }}"
  },
  "about": [
    {
      "@type": "Thing",
      "name": "Software Development"
    },
    {
      "@type": "Thing",
      "name": "Technology News"
    },
    {
      "@type": "Thing",
      "name": "Programming"
    },
    {
      "@type": "Thing",
      "name": "Tech Industry"
    }
  ],
  "specialty": [
    "Web Development News",
    "Mobile Development Updates",
    "DevOps Trends",
    "AI and Machine Learning",
    "Programming Languages",
    "Software Engineering"
  ],
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "@id": "{{ site.url }}{{ page.url }}#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": {
          "@type": "WebSite",
          "@id": "{{ site.url }}",
          "name": "Home"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "{{ page.title | escape }}",
        "item": {
          "@type": "CollectionPage",
          "@id": "{{ site.url }}{{ page.url }}",
          "name": "{{ page.title | escape }}"
        }
      }
    ]
  }
}
</script>

<div class="newsletter-section-footer">
  {% include newsletter-subscription.html %}
</div>

{% assign posts = paginator.posts | default: site.posts %}
<div class="posts-list">
  {% for post in posts %}
  {% if post.tags contains "dev-weekly" %}
  <article class="post-preview">
    <a href="{{ post.url | relative_url }}">
      <h2 class="post-title">{{ post.title }}</h2>

      {% if post.subtitle %}
        <h3 class="post-subtitle">
        {{ post.subtitle }}
        </h3>
      {% endif %}
    </a>

    <p class="post-meta">
      {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
      Posted on {{ post.date | date: date_format }}
    </p>

    <div class="post-entry-container">
      {% if post.image %}
      <div class="post-image">
        <a href="{{ post.url | relative_url }}">
          <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
        </a>
      </div>
      {% endif %}
      <div class="post-entry">
        {% assign excerpt_length = site.excerpt_length | default: 50 %}
        {{ post.excerpt | strip_html | xml_escape | truncatewords: excerpt_length }}
        {% assign excerpt_word_count = post.excerpt | number_of_words %}
        {% if post.content != post.excerpt or excerpt_word_count > excerpt_length %}
          <a href="{{ post.url | relative_url }}" class="post-read-more">[Read&nbsp;More]</a>
        {% endif %}
      </div>
    </div>

    {% if post.tags.size > 0 %}
    <div class="blog-tags">
      Tags:
      {% if site.link-tags %}
      {% for tag in post.tags %}
      <a href="{{ '/tags' | relative_url }}#{{- tag -}}">{{- tag -}}</a>
      {% endfor %}
      {% else %}
        {{ post.tags | join: ", " }}
      {% endif %}
    </div>
    {% endif %}

   </article>
   {% endif %}
  {% endfor %}
</div>

{% assign dev_weekly_posts = site.tags.dev-weekly | default: empty %}
{% if site.posts.size == 0 or dev_weekly_posts.size == 0 %}
<div class="no-posts">
  <p>No tech news posts available yet. Check back soon for the latest software development updates!</p>
</div>
{% endif %}

{% if paginator.total_pages > 1 %}
<ul class="pagination main-pager">
  {% if paginator.previous_page %}
  <li class="page-item previous">
    <a class="page-link" href="{{ paginator.previous_page_path | relative_url }}">&larr; Newer Posts</a>
  </li>
  {% endif %}
  {% if paginator.next_page %}
  <li class="page-item next">
    <a class="page-link" href="{{ paginator.next_page_path | relative_url }}">Older Posts &rarr;</a>
  </li>
  {% endif %}
</ul>
{% endif %}
