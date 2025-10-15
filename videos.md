---
layout: page
title: "Videos"
subtitle: "A collection of videos from my YouTube channel"
description: "A collection of videos from my YouTube channel covering topics like Test-Driven Development (TDD), GitHub Actions, Android development, design patterns, and terminal hacks."
seo: true
keywords: "TDD, Test-Driven Development, GitHub Actions, Android development, design patterns, terminal hacks, programming tutorials, software engineering, video tutorials"
thumbnail: /assets/img/videos/video-thumbnail.png
share-img: /assets/img/videos/video-thumbnail.png
permalink: /videos/
social-share: true
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "headline": "Software Development Video Tutorials",
  "description": "A collection of videos from my YouTube channel covering topics like Test-Driven Development (TDD), GitHub Actions, Android development, design patterns, and terminal hacks.",
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
      "name": "TDD"
    },
    {
      "@type": "Thing",
      "name": "GitHub Actions"
    },
    {
      "@type": "Thing",
      "name": "Android Development"
    },
    {
      "@type": "Thing",
      "name": "Design Patterns"
    }
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

{% include youtubeChannelPromo.html %}

<br>
{% include youtubeGrid.html gridTitle="TDD In Java" videos="e68qxC3cTQc" %}

<br>
{% include youtubeGrid.html gridTitle="GitHub Actions For Android" videos="2mCJZHEhsxc,E8qXYydzDbc,slCtr4LXmIM,g9WDcGuhfSI,ydRhDYhw3i0,SmY__nDcw5w" %}

<br>
{% include youtubeGrid.html gridTitle="Android Videos" videos="k-tREnlQsrk,N8w0enp1Krg,NxRJNqOL-lk,NLfKxEprWB4,ubvWRlFnr74,YDWg-bgsAfc,cEQBJkTeRUQ" %}

<br>
{% include youtubeGrid.html gridTitle="Android Instrumentation Testing" videos="gdsxVfq-yNM,Vbe6kklkNhA,-uMo4jQdl8s,5pqWuhdQMCA,PJs-QCS0EkU" %}

<br>
{% include youtubeGrid.html gridTitle="Design Patterns" videos="DX6zmUyIhZg,icgoR_vfh40,F7_cRqNKoJs,KSJJ3JO9Zpc" %}

<br>
{% include youtubeGrid.html gridTitle="Terminal Hacks" videos="L4NE7gIhiEg,RSO3z8mNyNU,uVj9ut7mJgs" %}
