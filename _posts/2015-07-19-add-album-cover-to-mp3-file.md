---
layout: post
title: Add album cover to mp3 file
description: Add album cover to mp3 file, We will discuss how we can attach album-cover-image file with mp3 file. And using it with multiple mp3 files.
share-img: /assets/img/posts/fancy_audio/cover.png
permalink: /add-album-cover-to-mp3-file/
gh-repo: ajitsing/fancy_audio
gh-badge: [star, fork, follow]
tags: [ruby, rubygem]
comments: true
keywords: "add album cover mp3, mp3 album art, fancy_audio gem, ruby mp3 tools, embed image mp3, mp3 metadata, album cover script, mp3 file editing, ruby audio gem, mp3 batch album art"
---

Hi Guys, Here I am again with a new gem called [FancyAudio](https://rubygems.org/gems/fancy_audio){:target="_blank"}. Any guesses what this gem might do or how to use it. Let me explain it for you.

I am one of those people who likes their mp3 files to be beautiful and clean so that I can identify a song by just looking at its album cover. And most of the time we have some mp3 files or lots of mp3 files which don't have album covers. Let's see how FancyAudio can help you guys.

To use this FancyAudio gem you need to have little bit knowledge of terminal/command line. Believe me its very simple to install and use the gem.

# Demo<br><br>

{% include youtubePlayer.html id="woqHqBDslWo" %}

# For Developers

Gem source code is available on [github](https://github.com/ajitsing/fancy_audio){:target="_blank"}. Any contribution is welcome.

### Installation

Go ahead and type this command in your terminal. This will install FancyAudio in your system.

```bash
gem install fancy_audio
```
<br>

# Usages

Ignore the warnings you see in the images. It happens when you don't have the right permission to the files.

### Attach an album cover to mp3 file

```bash
fancy_audio  path/to/mp3/file  path/to/album-cover-image
```

![Crepe](/assets/img/posts/fancy_audio/fancy_audio_1.png)

### Add album cover to multiple mp3 files in current directory

The below command will add each album-cover-image to mp3 file, provided they both share the same name. For example if there is an audio file `song.mp3` then there should be a file with name `song.jpg/song.jpeg/song.png` . If all the mp3 files has its album-cover-image file in current directory it will add the images to all the mp3 files.

```bash
fancy_audio
```

![Crepe](/assets/img/posts/fancy_audio/fancy_audio_2.png)

### Add one album cover to multiple mp3 files

This feature allows you to add a single image to multiple mp3 files in the same or specified directory.

```bash
fancy_audio --all [path/to/mp3/files(default is current dir)] path/to/image/file
```

![Crepe](/assets/img/posts/fancy_audio/fancy_audio_3.png)

### Add album cover to multiple mp3 files in specified directory.

This will work the same as mentioned in 2(Add album cover to multiple mp3 files) but in a specified directory instead of current directory.

```bash
fancy_audio path/to/mp3/and/album-cover-image
```

![Crepe](/assets/img/posts/fancy_audio/fancy_audio_4.png)

### To get a quick help use --h

```bash
fancy_audio --h
```

![Crepe](/assets/img/posts/fancy_audio/fancy_audio_5.png)

I hope you guys liked this gem. If you need any other feature or improvement in this gem please leave a comment below. Thanks.