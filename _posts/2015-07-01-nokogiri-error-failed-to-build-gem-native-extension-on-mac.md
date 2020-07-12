---
layout: post
title: nokogiri ERROR Failed to build gem native extension on MAC
description: nokogiri ERROR Failed to build gem native extension on MAC, Find out how to solve this issue with a single command.
share-img: /assets/img/posts/ruby/cover.png
permalink: /nokogiri-error-failed-to-build-gem-native-extension-on-mac/
tags: [ruby]
comments: true
---

During `bundle install`, a lot of time we use to get following error because of `nokogiri` gem. This error generally occur on MAC OSX. There are few other gems as well which throw the same error like pg, rmagic etc. But the way we resolve this problem is same for most of them. So Lets see how we can resolve this issue.

```bash
gem install nokogiri
Building native extensions.  This could take a while...
ERROR:  Error installing opengraph:
 ERROR: Failed to build gem native extension.
 
    /Users/ajitsingh/.rvm/rubies/ruby-1.9.3-p448/bin/ruby extconf.rb
extconf.rb:10: Use RbConfig instead of obsolete and deprecated Config.
checking for libxml/parser.h... *** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of
necessary libraries and/or headers.  Check the mkmf.log file for more
details.  You may need configuration options.
 
Provided configuration options:
 --with-opt-dir
 --with-opt-include
 --without-opt-include=${opt-dir}/include
 --with-opt-lib
 --without-opt-lib=${opt-dir}/lib
 --with-make-prog
 --without-make-prog
 --srcdir=.
 --curdir
 --ruby=/Users/ajitsingh/.rvm/rubies/ruby-1.9.3-p448/bin/ruby
 --with-zlib-dir
 --without-zlib-dir
 --with-zlib-include
 --without-zlib-include=${zlib-dir}/include
 --with-zlib-lib
 --without-zlib-lib=${zlib-dir}/lib
 --with-iconv-dir
 --without-iconv-dir
 --with-iconv-include
 --without-iconv-include=${iconv-dir}/include
 --with-iconv-lib
 --without-iconv-lib=${iconv-dir}/lib
 --with-xml2-dir
 --without-xml2-dir
 --with-xml2-include
 --without-xml2-include=${xml2-dir}/include
 --with-xml2-lib
 --without-xml2-lib=${xml2-dir}/lib
 --with-xslt-dir
 --without-xslt-dir
 --with-xslt-include
 --without-xslt-include=${xslt-dir}/include
 --with-xslt-lib
 --without-xslt-lib=${xslt-dir}/lib
/Users/ajitsingh/.rvm/rubies/ruby-1.9.3-p448/lib/ruby/1.9.1/mkmf.rb:381:in `try_do': The compiler failed to generate an executable file. (RuntimeError)
You have to install development tools first.
```

This is a very weird error we get while installing gems and its not very easy to figure out why this happens but actually, It's not that hard to fix as it looks.

# Solution

The above error means that the file `/usr/include/iconv` is missing in your build environment and which also means that your `Xcode Command Line Tools` are `not installed properly`. Open your terminal and run the following command

```bash
xcode-select --install
```

It will open a GUI application as shown below. Click on install button and done.

![Crepe](/assets/img/posts/nokogiri_error/xcode-install.png)

Now if you run

```bash
gem install nokogiri

Building native extensions.  This could take a while...
Successfully installed nokogiri-1.6.0
Installing ri documentation for nokogiri-1.6.0
1 gem installed
```

And there you go, your problem is solved.

