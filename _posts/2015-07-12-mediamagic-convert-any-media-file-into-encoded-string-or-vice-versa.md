---
layout: post
title: "MediaMagic: Convert any media file into encoded string or vice-versa"
description: MediaMagic Convert any media file into encoded string or vice-versa. Its a very small ruby gem. We will discuss how to use it to encode and decode.
cover-img: /assets/img/posts/fancy_audio/cover.png
permalink: /mediamagic-convert-any-media-file-into-encoded-string-or-vice-versa/
gh-repo: ajitsing/MediaMagic
gh-badge: [star, fork, follow]
tags: [ruby, rubygem]
comments: true
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
