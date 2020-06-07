---
layout: post
title: Pairing matrix for agile teams
description: This blog shows how you can automate the creation of pairing matrix for your agile team. The pairing matrix is created using pairing_matrix rubygem.
cover-img: /assets/img/posts/pairing_matrix/cover.jpg
permalink: /pairing-matrix-for-agile-teams
gh-repo: ajitsing/pairing_matrix
gh-badge: [star, fork, follow]
tags: [ruby, agile, rubygem]
comments: true
---

I work in an agile team which follows [extreme programming](https://en.wikipedia.org/wiki/Extreme_programming) practices like [pairing programming](https://en.wikipedia.org/wiki/Pair_programming). But with pair programming comes the problem of switching pairs. Sometimes in big teams we do see that the individuals are not able to make the decision of with whom they should pair next. To overcome this problem we generally create pairing matrix which helps us figure out who is pairing with whom and wether team is switching pairs frequently or not.

Managing the hand made pairing matrix is a pain. Also maintaining the matrix of more than a month is difficult and space consuming on the white boards. I wanted a matrix that can allow me to see the pairing data based on the time span without much effort. To solve this problem I created a [rubygem](https://github.com/ajitsing/pairing_matrix) which automates the generation of pairing matrix based on the git commits.

# Demo

{% include googleDrivePlayer.html id="1Rf3IONhuMnFfiIFHxj0yDbrxZC9KDGGA/preview" %}

&nbsp;
# How to read this matrix?

* This matrix is purely based on git commits.
* Darker the line more the pair has worked together.
* If you see a darker red circle around a name that means the person has worked alone.

&nbsp;
# How pairing matrix gem works?

The matrix is generated using the git commits presents in your local machine or github. I would suggest to point the pairing matrix to github so that everyone sees the same copy of the matrix.

&nbsp;
# Installation of gem

Add the below line to the Gemfile and run bundle install

```ruby
gem 'pairing_matrix'
```

Or install it yourself:

```bash
gem install pairing_matrix
```

![Crepe](/assets/img/posts/pairing_matrix/pairing_matrix_1.png)

To automate pairing matrix you need to provide following things to pairing matrix gem:

* Regex to extract pair name from the commit message
* Github access token (only required for private repositories)
* Github repos

You need to add all this information in the pairing_martix.yml file. Please refer to the below sample.

```yaml
authors_regex: ^.*\[([\w]*)(?:\/)?([\w]*)\].*$
github_access_token: 000324cff69wes5613f732c345hn679c0knt509c
github_repos:
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

You can choose any format as long as you are able to extract dev names from the message using a regex. To figure out if your regex is correct, you can try the regex on the commit message in [irb](http://tryruby.org/levels/1/challenges/0).

```ruby
"4324 [Ajit/Abhishek] My commit message".scan(/^.*\[([\w]*)(?:\/)?([\w]*)\].*$/).flatten
=> ["Ajit", "Abhishek"]
```

Once you are ready with your regex, put it in the pairing_matrix.yml and run the below command from the same directory.

```bash
pairing_martix
```

![Crepe](/assets/img/posts/pairing_matrix/pairing_martix_2.png)

This command starts the [sinatra](http://sinatrarb.com) server on the machine on port 4567. Now go to web browser and type localhost:4567/matrix. You should start seeing the pairing matrix based on the data you have provided in the pairing_matrix.yml file.

&nbsp;
# Some example of pairing_matrix.yml

&nbsp;
### For local repositories

```yaml
authors_regex: ^.*\[([\w]*)(?:\/)?([\w]*)\].*$
repos:
  - /Users/Ajit/projects/project1
  - /Users/Ajit/projects/project2
  - /Users/Ajit/projects/project3
```

&nbsp;
### For private repositories on github

```yaml
authors_regex: ^.*\[([\w]*)(?:\/)?([\w]*)\].*$
github_access_token: 000324cff69wes5613f732c345hn679c0knt509c
github_repos:
  - organization1/repo1
  - organization1/repo2
  - github_username/my_private_repo
```

&nbsp;
### For public repositories on github

```yaml
authors_regex: ^.*\[([\w]*)(?:\/)?([\w]*)\].*$
github_repos:
  - github_username/my_public_repo1
  - github_username/my_public_repo2
```

I hope you will now be able to automate your pairing matrix. If you have any questions or feedback, please write it in the comment below. Thanks!
