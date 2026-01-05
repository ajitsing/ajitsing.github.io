---
layout: post
seo: true
title: "MediaMagic: Convert any media file into encoded string or vice-versa"
description: MediaMagic Convert any media file into encoded string or vice-versa. Its a very small ruby gem. We will discuss how to use it to encode and decode.
share-img: /assets/img/posts/fancy_audio/cover.png
permalink: /mediamagic-convert-any-media-file-into-encoded-string-or-vice-versa/
gh-repo: ajitsing/MediaMagic
gh-badge: [star, fork, follow]
tags: [ruby, rubygem]
comments: true
keywords: "mediamagic gem, encode media file, decode media file, ruby media tools, file to string ruby, string to file ruby, media encoding ruby, ruby gem media, store media in database, media file conversion"
faq:
  - question: "How do I convert a file to a Base64 string in Ruby?"
    answer: "Use the MediaMagic gem: require 'media-magic', include MediaMagic::Operations, then call encode('/path/to/file'). It returns a Base64 encoded string of the file content."
  - question: "How do I decode a Base64 string back to a file?"
    answer: "Use decode(encoded_string, 'filename.ext') from MediaMagic gem. It creates the file in the current directory. Works for images, videos, audio, or any file type."
  - question: "What are use cases for encoding files to strings?"
    answer: "Store images/videos/audio in databases, embed files in emails or chat messages, save entire web pages as single HTML files with embedded resources, or transfer binary data through text-only protocols."
  - question: "Can MediaMagic encode files from URLs?"
    answer: "Yes! Instead of a file path, pass a URL: encode('http://url/to/image.jpeg'). The gem downloads and encodes the file in one step, useful for processing remote resources."
---

This [gem](https://rubygems.org/gems/media-magic){:target="_blank"} is  written with the intention of converting any kind of file into encoded string or vice versa. The code is available on [github](https://github.com/ajitsing/MediaMagic){:target="_blank"}.

**Possible use cases:**

1. Store an image in database
2. Store a video in database
3. Store an audio in database(In short you can `store *.* file in database`)
4. Pass a media file as a string in an email, comment, chat conversation etc.
5. To save entire web page into just a single .html file.

# How to use it?<br><br>

```bash
gem install media-magic
```

or

Add following to your `Gemfile`.

```ruby
source :rubygems

gem 'media-magic'
```

Lets say I have a file available on my desktop Users/ajitsingh/Desktop/image.jpeg .Now I want to encode this file into a string so that I can store it in database.

```ruby
require 'media-magic'

include MediaMagic::Operations

encoded_string = encode '/Users/ajitsingh/Desktop/image.jpeg'

p encoded_string

#=>"R2VtOAgICAgICA9xJwogIHMu\nc3VtbWFyeSAgICAgICAgID0gJ01lZGlhLU1hZ2ljJwogIHMuZGVzY3JpG9yIHRvIGNvbnZlcnQgYW55IHR5cGUgb2Yg\nbWVkaWCAgICA9ICdqZWV0c2luZ2guYWppdEBnYW1pbC5jb9tZWRpYS1tYWdpYy5yYiddCiAgcy5s\naWNlbnNlICAgICAgICAgPSAnTUlUJwplbmQK\n"
```

You can also use an url of a file instead of supplying an actual file.

```ruby
encoded_string = encode 'http://url/to/image.jpeg'
```

To decode the encoded string back into the image file use the following code.

```ruby
decode encoded_string, 'image.jpeg'

#above code will create a file with name image.jpeg in the current  directory.
```
<br>
