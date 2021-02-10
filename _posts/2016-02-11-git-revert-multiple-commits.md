---
layout: post
title: GIT revert multiple commits
description: git revert multiple commits with single command. Use grep, cut and xargs to revert multiple commits of a feature.
share-img: /assets/img/posts/git/cover.png
permalink: /git-revert-multiple-commits/
tags: [git, shell]
comments: true
---

Hello Folks, There are situations when we want to revert all the commits of a feature instead of checking out an earlier commit, because you want to retain the changes made for other features.

# Why?

It was a real scenario where my project QA reported a bug which might have introduced by my changes. But I was doubtful of that. So what I did is I reverted all the commits of the feature I was working on and then tested the scenario. I had almost 20 commits for that feature and that too in the middle of others commits. So, If I had to do it manually then I would have given up. But I tried to automate it and I tried this.

# Git revert multiple commits<br><br>

```bash
git log --pretty=oneline | grep 'feature_name' | cut -d ' ' -f1 | xargs -n1 git revert --no-edit
```

and wallah, I was able to revert all the commits of that feature and found that the bug was not introduced by my commits :)

# Video tutorial<br><br>

{% include youtubePlayer.html id="uVj9ut7mJgs" %}

# How it works?

First you log all the commits in single line using ```git log --pretty=oneline``` then we pass the output to the ```grep``` 'feature_name' which filters commits of your feature. Now you want just the SHA of each commit for which we pass the output of grep command to ```cut -d ' ' -f1``` which splits the commits message which space and gives back the first column of it which is hash from each commit.

Now that we have all the commits, we want to revert them one by one. I used xargs for this purpose. xargs takes standard output from the previous command and executes a command on each of the output. which means ```xargs -n1 git revert --no-edit``` will take each of the SHA and execute git revert on it.

And believe me it saves a lot of time :)