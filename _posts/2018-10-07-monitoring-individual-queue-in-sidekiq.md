---
layout: post
seo: true
title: Monitoring individual queue in sidekiq
description: By default sidekiq does not allow you to monitor failures on individual queues. This article will help you monitor individual queue in sidekiq like a pro.
share-img: /assets/img/posts/monitoring_sidekiq/cover.png
permalink: /monitoring-individual-queue-in-sidekiq/
gh-repo: ajitsing/sidekiq_queue_metrics
gh-badge: [star, fork, follow]
tags: [rails, ruby, sidekiq, rubygem]
comments: true
keywords: "sidekiq queue monitoring, sidekiq queue metrics, sidekiq plugin, sidekiq failures, rails background jobs, sidekiq queue stats, ruby sidekiq gem, sidekiq dashboard, sidekiq job tracking, sidekiq development"
faq:
  - question: "How do I monitor individual Sidekiq queues?"
    answer: "Use the sidekiq_queue_metrics gem. Add it to your Gemfile, initialize with Sidekiq::QueueMetrics.init(config) in your Sidekiq initializer. It adds a dashboard showing processed, failed, enqueued, retry, and scheduled jobs per queue."
  - question: "How do I see failed jobs for a specific Sidekiq queue?"
    answer: "With sidekiq_queue_metrics, click on a queue name in the dashboard to see its summary page. It shows recent failures with worker name, arguments, enqueued time, and error messages. Click on a failure to see the full stacktrace."
  - question: "How do I get Sidekiq queue stats programmatically?"
    answer: "Call Sidekiq::QueueMetrics.fetch to get a hash with stats for all queues. Each queue has processed, failed, enqueued, in_retry, and scheduled counts. Useful for building custom dashboards or alerting."
  - question: "How many failed jobs does sidekiq_queue_metrics track?"
    answer: "By default it shows 50 recent failures per queue. Configure with Sidekiq::QueueMetrics.max_recently_failed_jobs = 200 to change the limit. Older failures are still in Sidekiq's dead jobs (morgue)."
---

The default interface of [sidekiq](https://github.com/mperham/sidekiq){:target="_blank"} allows you to see the number of processed and failed jobs with a morgue which has all the dead jobs. The interface is sufficient when you have few queues. But when you have more queues and the number of jobs in each queue is significant then it becomes difficult to track the progress of an individual queue in sidekiq. Also to group the failure for each queue becomes a challenge because sidekiq don't have the functionality to filter the dead jobs by the queue.

To achieve this functionality I wrote a sidekiq plugin called sidekiq_queue_metrics. The sidekiq_queue_metrics plugin provides you with the following capabilities:

1. View progress of individual sidekiq queue.
2. View failures of individual sidekiq queue.
3. Fetching current status of queues in a hash.

&nbsp;
## Installation

Add the below code in your Gemfile to install [sidekiq_queue_metrics](https://github.com/ajitsing/sidekiq_queue_metrics){:target="_blank"} gem

```ruby
gem 'sidekiq_queue_metrics'
```

&nbsp;
# How to use sidekiq_queue_metrics?

Sidekiq queue metrics plugin is very easy to use. You just have to initialize the plugin in the sidekiq initializer and your job is done. Here is how the code will look like.

```ruby
Sidekiq.configure_server do |config|
  Sidekiq::QueueMetrics.init(config)
end
```

Start sidekiq after enabling the sidekiq queue metrics plugin and you will see another table on the sidekiq UI as shown in the image below.

![Crepe](/assets/img/posts/monitoring_sidekiq/monitoring_sidekiq_1.png)

In this tab you will notice that each queue has its own widget which shows below stats of the queue:

* Processed jobs
* Failed jobs
* Enqueued jobs
* In Retry
* Scheduled jobs

To see more details of a particular queue, click on the queue name and you will be directed to queue summary page.

![Crepe](/assets/img/posts/monitoring_sidekiq/monitoring_sidekiq_2.png)

On this page you will notice that mailer_queue has its own widget that shows all the stats of the queue. Also there is a table of failed jobs. Which shows worker name, arguments, enqueued time and the error message of each failure. By default, the plugin shows 50 recent failures of a queue. You can configure that number according to your needs with below config.

```ruby
Sidekiq::QueueMetrics.max_recently_failed_jobs = 200
```

To view the details of individual job failure, click on the enqueued time of the failed job and you will be directed to another page which shows the job failure in details along with the stacktrace as shown below.

![Crepe](/assets/img/posts/monitoring_sidekiq/monitoring_sidekiq_3.png)

&nbsp;
## Fetching stats of all queues

You can use the below api to fetch the stats of all the queues.

```ruby
Sidekiq::QueueMetrics.fetch
```

This code will return the queue stats in a hash.

```ruby
{
  "mailer_queue" => {"processed" => 5, "failed" => 1, "enqueued" => 2, "in_retry" => 0, "scheduled" => 0},
  "default_queue" => {"processed" => 10, "failed" => 0, "enqueued" => 1, "in_retry" => 1, "scheduled" => 2}
}
```

&nbsp;
## Want to contribute?

I hope you found this plugin useful. Share it with other devs who use sidekiq and help them by making their life easier.

You can contribute to sidekiq queue metrics gem by creating issues for features and bugs on the [GitHub page](https://github.com/ajitsing/sidekiq_queue_metrics){:target="_blank"}.  Pull requests are most welcome :)

Thats all folks!