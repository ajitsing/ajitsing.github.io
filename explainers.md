---
layout: page
title: "Explainers"
subtitle: "Short explanations of software engineering concepts"
seo: true
description: "Comprehensive collection of software engineering explainers and tutorials. Learn programming concepts, web development, API testing, command-line tools, and developer best practices with practical examples."
keywords: "software engineering explainers, programming tutorials, web development guides, API testing, command line tools, developer tutorials, coding examples, technical documentation, programming concepts, software development"
thumbnail: /assets/img/explainers/explainer-thumbnail.png
share-img: /assets/img/explainers/explainer-thumbnail.png
permalink: /explainers/
social-share: true
---

<!-- SEO: Structured Data for Explainers Collection -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "headline": "Software Engineering Explainers",
  "description": "Comprehensive collection of software engineering explainers and tutorials covering programming concepts, web development, API testing, and developer tools.",
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
      "name": "Software Engineering"
    },
    {
      "@type": "Thing",
      "name": "Programming Tutorials"
    },
    {
      "@type": "Thing",
      "name": "Web Development"
    },
    {
      "@type": "Thing",
      "name": "Developer Tools"
    }
  ],
  "hasPart": [
    {% for explainer in site.explainers %}
    {
      "@type": "TechArticle",
      "headline": "{{ explainer.title | escape }}",
      "description": "{{ explainer.description | escape }}",
      "url": "{{ site.url }}{{ explainer.url }}",
      "datePublished": "{{ explainer.date | date_to_xmlschema }}",
      "author": {
        "@type": "Person",
        "name": "Ajit Singh"
      }
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  "numberOfItems": {{ site.explainers.size }},
  "itemListElement": [
    {% for explainer in site.explainers %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "url": "{{ site.url }}{{ explainer.url }}",
      "name": "{{ explainer.title | escape }}"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
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

<link rel="stylesheet" href="{{ '/assets/css/explainers-grid.css' | relative_url }}">

<div class="explainers-grid">
  {% for explainer in site.explainers %}
    <div class="explainer-card">
      <a href="{{ explainer.url | relative_url }}" class="explainer-link">
        <div class="explainer-thumbnail">
          {% if explainer.thumbnail %}
            <img src="{{ explainer.thumbnail | relative_url }}" alt="{{ explainer.title }}" loading="lazy">
          {% else %}
            <div class="default-thumbnail">
              <i class="fas fa-lightbulb"></i>
            </div>
          {% endif %}
        </div>
        <div class="explainer-info">
          <h3 class="explainer-title">{{ explainer.title }}</h3>
        </div>
      </a>
    </div>
  {% endfor %}
</div>

{% if site.explainers.size == 0 %}
<div class="no-explainers">
  <p>No explainers available yet. Check back soon!</p>
</div>
{% endif %}
