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

<div class="rss-section-footer">
  {% include rss-subscribe.html %}
</div>

{% assign posts = paginator.posts | default: site.posts %}
<div class="posts-list">
  {% for post in posts %}
  {% if post.tags contains "dev-weekly" %}
  <article class="post-preview">
    <a href="{{ post.url | relative_url }}" class="post-preview-link">
      <div class="post-content">
        <h2 class="post-title">{{ post.title }}</h2>

        {% if post.subtitle %}
          <p class="post-subtitle">{{ post.subtitle }}</p>
        {% else %}
          <p class="post-excerpt">
            {% assign excerpt_length = site.excerpt_length | default: 30 %}
            {{ post.excerpt | strip_html | xml_escape | truncatewords: excerpt_length }}
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
      {% elsif post.image %}
      <div class="post-thumbnail">
        <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
      </div>
      {% else %}
      <div class="post-thumbnail post-thumbnail-placeholder">
        <i class="fas fa-file-alt"></i>
      </div>
      {% endif %}
    </a>
    
    {% if post.tags.size > 0 %}
    <div class="post-tags-row">
      {% for tag in post.tags limit:2 %}
      <a href="{{ '/tags' | relative_url }}#{{- tag -}}" class="post-tag">{{ tag }}</a>
      {% endfor %}
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
