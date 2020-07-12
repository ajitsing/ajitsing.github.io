---
layout: post
title: Prevent push on red build with the help of gocd_pre_push
description: gocd_pre_push helps agile teams to prevent pushing the changes in the central repo when the build is red by checking the status of concerned pipelines.
share-img: /assets/img/posts/gocd_pre_push/cover.png
permalink: /prevent-push-on-red-build-with-the-help-of-gocd-pre-push/
gh-repo: ajitsing/gocd_pre_push
gh-badge: [star, fork, follow]
tags: [ruby, rubygem, continuous integration, git, gocd]
comments: true
---

An agile team delivers their software as and when they are ready with a small feature or user feedback. This is achieved with the help of [Continuous integration](https://www.thoughtworks.com/continuous-integration){:target="_blank"} and [Continuos Delivery](https://www.thoughtworks.com/continuous-delivery){:target="_blank"}. The idea is whenever you make any change to your software, there is a continuous integration environment that checks if your changes integrates well with the rest of  the software or not. There are a lot of CI softwares available and one of them is [GoCD](https://www.go.cd/){:target="_blank"} which is open source and developed by [ThoughtWorks](https://www.thoughtworks.com/){:target="_blank"}.

GOCD has this concept of [pipelines](https://docs.go.cd/current/navigation/pipelines_dashboard_page.html){:target="_blank"} where you can configure what task you want to perform on your code base. For example when you push any change to your central repo, you want to run unit tests, integration tests and automation tests. And after all the tests passes, you want to create an artifact e.g .jar file for a java service and deploy it to an environment where QAs can test your changes.

The idea is if you make any breaking change and it makes your test fail, GOCD will highlight the pipeline as red. Then everybody will stop pushing their change until the pipeline becomes green. The person whoes changes has made it red is supposed to look into the pipeline and fix it, after that others can continue to push their changes.

Sometimes devs forget to check the status of pipelines and push the code on red pipeline. That makes the things worse because the pipeline will fail again. There is also a chance that your code might have another breaking changes, and multiple people will be looking into the pipeline.

Keeping the above problem in mind I wrote this tool called [gocd_pre_push](https://github.com/ajitsing/gocd_pre_push){:target="_blank"}. This checks the status of pipelines which you have configured in pipelines.yml before pushing your changes. The code for this is available on github.

# How gocd_pre_push works?

GOCD_PRE_PUSH is a ruby gem which creates a git pre-push hook for you. This hook checks the status of pipelines and based on the status it decides whether you can push your change or not. To make it very clear, it performs following tasks for you:

* Get all the concerned pipelines from pipelines.yml
* Get the status of all the pipelines using [GoCD Apis](https://api.go.cd/current/){:target="_blank"}.
* Check the status of the pipelines specified in pipelines.yml
* if any of the pipelines is red, print those pipelines and do not allow to push the changes.

# How to use it?

Using gocd_pre_push is very easy. You just have to install the gocd_pre_push gem and run a single command in the root folder of your git repository.

# Installation

Add the following line to your Gemfile and run bundle install.

{% highlight ruby linenos %}
gem 'gocd_pre_push'
{% endhighlight %}
<br>

# One time setup

To create pre-push hook and a template of ```pipelines.yml``` execute the below command in root folder of your git repository.

{% highlight bash linenos %}
gocd_pre_push create
{% endhighlight %}

It will create a hooks/pre-push file and symlink it with the ```.git/hooks/pre-push```. Now open this file and configure your gocd server url, username and password. The go server details will look like this.

{% highlight ruby linenos %}
gocd_server = GocdServer.with do |server|
  server.url      = 'http://yourgoserverurl.com'
  server.username = 'yourusername'
  server.password = 'yourpassword'
end
{% endhighlight %}

And your pre-push hook is ready. Now you need to tell gocd_pre_push, which pipelines you want to check for this repository. That you can add inside pipelines.yml. For example I want to check for following pipelines and their stages.

{% highlight yaml linenos %}
- pipeline: MyAwesomeProject
  stages:
    - spec
    - integration
    - create_artifacts
- pipeline: MyAwesomeProject_Smoke
  stages:
    - smoke
{% endhighlight %}

Thats all you have to configure. Once you push these change to your central repo, ask your fellow devs to take a pull and run the below commands on the root directory of your repository.

{% highlight bash linenos %}
bundle install
gocd_pre_push use_hooks
{% endhighlight %}

And they are done with the configuration. Now whenever someone runs git push command gocd_pre_push will check for the status of the pipelines and let you know if you can push your changes or not.

I hope you liked this tool, Happy Coding!
