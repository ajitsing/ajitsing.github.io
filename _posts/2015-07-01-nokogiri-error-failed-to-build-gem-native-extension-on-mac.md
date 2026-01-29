---
layout: post
categories: ruby
seo: true
title: nokogiri ERROR Failed to build gem native extension on MAC
description: nokogiri ERROR Failed to build gem native extension on MAC, Find out how to solve this issue with a single command.
share-img: /assets/img/posts/ruby/cover.png
permalink: /nokogiri-error-failed-to-build-gem-native-extension-on-mac/
tags: [ruby]
comments: true
keywords: "nokogiri error mac, failed to build gem native extension, nokogiri install error, ruby gem install mac, xcode command line tools, nokogiri troubleshooting, mac gem native extension, nokogiri solution, ruby development tools mac, nokogiri mac fix"
faq:
  - question: "How do I fix 'Failed to build gem native extension' on Mac?"
    answer: "Run 'xcode-select --install' in terminal. This installs Xcode Command Line Tools which provides the missing compilers and headers (like /usr/include/iconv) needed to build native gem extensions."
  - question: "Why does nokogiri fail to install on Mac?"
    answer: "Nokogiri requires native C extensions and libraries (libxml2, libxslt). If Xcode Command Line Tools aren't installed properly, the compiler can't find required headers and fails. Installing the tools with 'xcode-select --install' fixes this."
  - question: "What other gems have this native extension error?"
    answer: "Common gems with native extensions that fail similarly: pg (PostgreSQL), mysql2, rmagick, ffi, eventmachine, puma, thin. The solution is usually the same - install Xcode Command Line Tools."
  - question: "How do I install Xcode Command Line Tools?"
    answer: "Run 'xcode-select --install' in terminal. A GUI dialog appears - click Install. Wait for download and installation. You don't need full Xcode, just the command line tools which are much smaller."
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

