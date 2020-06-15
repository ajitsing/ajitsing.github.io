---
layout: post
title: Ruby gem to fetch information from gocd as rich models
description: GoCD is a ruby gem to fetch information from gocd server as models. It will make the api calls on your behalf and get you the information that you want.
cover-img: /assets/img/posts/gocd_gem/cover.png
permalink: /ruby-gem-to-fetch-information-gocd-rich-models
gh-repo: ajitsing/gocd
gh-badge: [star, fork, follow]
tags: [ruby, gocd, rubygem]
comments: true
---

# What is GoCD?

GoCD is a product built by ThoughtWorks to Automate and streamline your build-test-release cycle for reliable, continuous delivery of your product. You can read more about it [here](https://www.go.cd/){:target="_blank"}.

# Why this Gem?

GoCD server provides some nice apis using which you can get the information about your builds, pipelines, agents etc. from your GoCD server. It provides that information in json/xml format. Now to utilize that information you will carve models out of that json/xml or just use it as hash map which is not very neat. Also you will have to write so much extra code to make a call and parse the json/xml to get to a specific piece of information.

So, here is [gocd ruby gem](https://github.com/ajitsing/gocd){:target="_blank"} to rescue.

# Installation

To install gocd gem just add below line to your Gemfile.

{% highlight ruby linenos %}
gem 'gocd'
{% endhighlight %}

You can also install it directly and try out in irb.

{% highlight bash linenos %}
gem install gocd
{% endhighlight %}
<br>

# What does gocd gem do?

gocd ruby gem helps you to get the information from GoCD server in a neat and clean fashion. Lets take an example and see how this gocd gem can help us.

*Problem statement:* I have a repository in github called MyRepo. Whenever someone pushes code in this repo, GoCD server runs 3 different pipelines to test the integration of old and new code. Now if any of those pipelines are red/failing, I don't want anybody to push their code.

Cool, now we have a problem in hand. Let's see how we can solve it.

Lets solve it step by step:

* Make a call to GoCD api to get the information of pipelines.
* Filter out the group of pipelines that you are interested in.
* Check the status of those pipelines
* If any of the pipelines are red do not allow to push.

Now that we have our dev tasks defined, lets see how we can complete theses tasks with the help of gocd gem.

{% highlight ruby linenos %}
require 'gocd'

GOCD.server = GOCD::Server.new 'http://goserverurl.com'
GOCD.credentials = GOCD::Credentials.new 'username', 'password'

pipelines = GOCD::PipelineGroup.new ['Pipeline1 :: stage1', 'Pipeline1 :: stage2', 'Pipeline2 :: stage1']

if pipelines.any_red?
  puts "below pipelines are red, can not allow to push!!"
  puts pipelines.red_pipelines
  sh 'exit 1'
end
{% endhighlight %}

Now run this script as part of your pre-push [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks){:target="_blank"} and you are done. Neat and Clean!!

# What else it can do?

Currently gocd gem can provide you information about:

1. All pipelines and their statuses
2. Information about a group of pipelines
3. Information about go agents

Below is how you can use these features:

{% highlight ruby linenos %}
require 'gocd'

GOCD.server = GOCD::Server.new 'http://goserverurl.com'
GOCD.credentials = GOCD::Credentials.new 'username', 'password'

#To check all pipelines
GOCD::AllPipelines.red_pipelines

#To check a group of pipelines
pipelines = GOCD::PipelineGroup.new ['Pipeline1 :: stage1', 'Pipeline1 :: stage2', 'Pipeline2 :: stage1']
pipelines.red_pipelines
pipelines.status
pipelines.any_red?


#To get all the idle agents:
idle_agents = GOCD::Agents.idle
idle_agents.each { |agent| agent.name }

#To get all the missing agents
GOCD::Agents.missing

#To get all the disabled agents
GOCD::Agents.disabled
{% endhighlight %}

Its Open Source...

gocd gem is open source. If you want this gem to provide you some other information which is not there yet, please comment below and I will try implementing it ASAP. Or you can also contribute to this gem.
