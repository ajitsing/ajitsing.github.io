---
layout: post
seo: true
title: Pairing matrix for agile teams
description: This blog shows how you can automate the creation of pairing matrix for your agile team. The pairing matrix is created using pairing_matrix rubygem.
share-img: /assets/img/posts/pairing_matrix/thumbnail.png
cover-img: /assets/img/posts/pairing_matrix/cover.png
thumbnail-img: /assets/img/posts/pairing_matrix/thumbnail.png
permalink: /pairing-matrix-for-agile-teams/
gh-repo: ajitsing/pairing_matrix
gh-badge: [star, fork, follow]
tags: [ruby, agile, rubygem]
comments: true
keywords: "pairing matrix, agile teams, pair programming, pairing_matrix gem, ruby gem, agile tools, team collaboration, git pairing matrix, extreme programming, automate pairing matrix"
video:
  id: "H8PpiUFBpyI"
  title: "Pairing Matrix Ruby Gem Demo"
  description: "Demo of the pairing_matrix Ruby gem that automatically generates a visual pairing matrix from git commits for agile teams."
faq:
  - question: "What is a pairing matrix?"
    answer: "A pairing matrix visualizes who has paired with whom on a team. It helps agile teams practicing pair programming see if pairs are rotating frequently enough and identify if anyone is working alone too often or not pairing with certain team members."
  - question: "How does the pairing_matrix gem work?"
    answer: "It analyzes git commit messages for co-author patterns (like 'Author1/Author2' format). It generates a visual matrix where darker lines indicate more frequent pairing, and red circles around names show solo work. All data comes from your git history."
  - question: "How do I install and use pairing_matrix?"
    answer: "Add gem 'pairing_matrix' to your Gemfile, configure authors and repositories in config/pairing_matrix.yml, then run 'pairing_matrix' command. It starts a web server showing the interactive matrix visualization."
  - question: "Can pairing_matrix work with multiple repositories?"
    answer: "Yes, configure multiple repos in pairing_matrix.yml under the repos section. The gem aggregates pairing data across all configured repositories, giving a team-wide view of pairing patterns."
---

I work in an agile team which follows [extreme programming](https://en.wikipedia.org/wiki/Extreme_programming){:target="_blank"} practices like [pairing programming](https://en.wikipedia.org/wiki/Pair_programming){:target="_blank"}. But with pair programming comes the problem of switching pairs. Sometimes in big teams we do see that the individuals are not able to make the decision of with whom they should pair next. To overcome this problem we generally create pairing matrix which helps us figure out who is pairing with whom and wether team is switching pairs frequently or not.

Managing the hand made pairing matrix is a pain. Also maintaining the matrix of more than a month is difficult and space consuming on the white boards. I wanted a matrix that can allow me to see the pairing data based on the time span without much effort. To solve this problem I created a [rubygem](https://github.com/ajitsing/pairing_matrix){:target="_blank"} which automates the generation of pairing matrix based on the git commits.

# See it in action

{% include youtubePlayer.html id="H8PpiUFBpyI" %}

# How to read this matrix?

* This matrix is purely based on git commits.
* Darker the line more the pair has worked together.
* If you see a darker red circle around a name that means the person has worked alone.

&nbsp;
# How pairing matrix gem works?

The matrix is generated using the git commits presents in your git repositories. I would suggest to point the pairing matrix to your code hosting platform like github or gitlab so that everyone sees the same copy of the matrix.

&nbsp;
# Installation of gem

Run the below command in your terminal:

```shell
gem install pairing_matrix
```

![Crepe](/assets/img/posts/pairing_matrix/pairing_matrix_1.png)

To automate pairing matrix you need to provide following detail:

* Regex to extract pair name from the commit message
* Access token
* Url of the code hosting platform APIs
* Repositories

You need to add all this information in the ```pairing_martix.yml``` file. Please refer to the below github sample configuration.

```yaml
authors_regex: ^.*\[([\w]*)(?:\/)?([\w]*)\].*$

github:
  url: https://api.github.com/
  access_token: 000324cgf89weq56132f32c345hn679c0knh501c
  repositories:
    - org1/repo1
    - org1/repo2
    - github_username/my_private_repo
```

&nbsp;
# How to test the author regex?

First of all you need to follow a particular pattern in your git commit messages. Then you can write a regex to extract the dev names from the commit message. Also make sure that all the devs in the team follows the same commit message pattern for all the commits. For example:

```
4324 [Ajit/Abhishek] My commit message

StoryNumber [Dev1/Dev2] message
```

You can choose any format as long as you are able to extract dev names from the message using a regex. To figure out if your regex is correct, you can try the regex on the commit message in [irb](https://repl.it/languages/ruby){:target="_blank"}.

```ruby
"4324 [Ajit/Abhishek] My commit message".scan(/^.*\[([\w]*)(?:\/)?([\w]*)\].*$/).flatten
=> ["Ajit", "Abhishek"]
```

Once you are ready with your regex, put it in the pairing_matrix.yml and run the below command from the same directory.

```bash
pairing_martix
```

![Crepe](/assets/img/posts/pairing_matrix/pairing_martix_2.png)

This command starts the [sinatra](http://sinatrarb.com){:target="_blank"} server on the machine on port 4567. Now go to web browser and type localhost:4567/matrix. You should start seeing the pairing matrix based on the data you have provided in the pairing_matrix.yml file.

&nbsp;
# Supported code hosting platforms

Pairing matrix gem supports below platforms:
* Github
* Gitlab
* Local

Support for bitbucket is coming soon!

&nbsp;
### Github sample configuration

```yaml
authors_regex: ^.*\[([\w]*)(?:\/)?([\w]*)\].*$

github:
  url: https://api.github.com/
  access_token: 000324cff69wes5613f732c345hn679c0knt509c
  repositories:
    - org1/repo1
    - org1/repo2
    - github_username/my_private_repo
```

**Note: Access token is optional if you are using public repositories.**

&nbsp;
### Gitlab sample configuration

```yaml
authors_regex: ^.*\[([\w]*)(?:\/)?([\w]*)\].*$

gitlab:
  url: https://gitlab.com/api/v4
  access_token: G7EmKQs4swhadZn2sd0T
  repositories:
    - username/repo1
    - username/repo2
```

**Note: Add your custom urls if you are using enterprise version of Github or Gitlab.**

&nbsp;
### For local repositories

```yaml
authors_regex: ^.*\[([\w]*)(?:\/)?([\w]*)\].*$
local:
  repositories:
    - /Users/Ajit/projects/project1
    - /Users/Ajit/projects/project2
    - /Users/Ajit/projects/project3
```

You can also use all these configurations together if you have repositories on multiple platforms.

I hope you will now be able to automate your pairing matrix using this tool. If you have any questions or feedback, please write it in the comment below. For any feature request or reporting bug create an issue on [Github](https://github.com/ajitsing/pairing_matrix){:target="_blank"}. Thanks!
