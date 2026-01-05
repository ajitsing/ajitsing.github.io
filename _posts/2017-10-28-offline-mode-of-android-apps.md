---
layout: post
seo: true
title: Offline Mode Of Android Apps
description: This talk covers offline mode of android apps. In this talk I talked about, what it takes to build offline mode and how to design its architecture.
share-img: /assets/img/posts/offline_mode_presentation/cover.jpg
permalink: /offline-mode-of-android-apps/
tags: [android, presentation, conference]
comments: true
keywords: "android offline mode, offline app architecture, android offline support, mobile offline design, android network handling, offline testing android, droidcon presentation, android app reliability, offline bugs android, android development"
faq:
  - question: "How do I build offline mode for an Android app?"
    answer: "Design with local-first storage (SQLite/Room), queue operations when offline, sync when connectivity returns, handle conflicts during sync, and detect network status changes. Cache API responses, show cached data immediately, and update when fresh data arrives."
  - question: "How do I detect offline status in Android?"
    answer: "Use ConnectivityManager to check network state, and register a BroadcastReceiver for CONNECTIVITY_CHANGE to react to changes. Check both connectivity and actual internet access since WiFi connection doesn't guarantee internet. Test edge cases like slow connections."
  - question: "What are common offline mode bugs in Android?"
    answer: "Common issues include: stale cached data, sync conflicts when same data is modified online and offline, duplicate operations when queue retries, UI not updating after sync, and not handling partial connectivity (connected but no internet). Test with airplane mode and slow networks."
  - question: "How do I test offline mode in Android apps?"
    answer: "Use airplane mode for complete offline testing. Use network throttling in Android Studio or Charles Proxy for slow connections. Write instrumentation tests that mock ConnectivityManager. Test sync conflicts by modifying data on another device while offline."
---

I presented this talk in droid con London 2017. Here are the [slides for download](/assets/img/posts/offline_mode_presentation/presentation.pdf){:target="_blank"}. You can also watch the entire talk on [skillcasts](https://skillsmatter.com/skillscasts/10667-bridging-the-gaps-online-to-offline-world-of-mobile-apps){:target="_blank"}.

# Agenda of the talk

* Why Offline mode?
* What it takes to build an offline mode
* Offline mode Architecture
* Network factors that can affect your application
* Testing (Unit, Instrumentation, Automation and Manual)
* Bugs and how to resolve them

&nbsp;
<iframe src="//www.slideshare.net/slideshow/embed_code/key/ynpcL1GMZsknhi" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/secret/ynpcL1GMZsknhi" title="Offline mode of Android Apps" target="_blank">Offline mode of Android Apps</a> </strong> from <strong><a href="https://www.slideshare.net/saroyaajit" target="_blank">Ajit Singh</a></strong> </div>

&nbsp;