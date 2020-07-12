---
layout: post
title: Print custom messages after executing git commands
description: amusing_git will help you print custom messages after executing git commands. You can configure the messages which you want to show.
cover-img: /assets/img/posts/git/cover.png
permalink: /print-custom-messages-after-executing-git-commands/
gh-repo: ajitsing/amusing_git
gh-badge: [star, fork, follow]
tags: [git, shell, rubygem]
comments: true
---

Wanna have fun while coding? then this post is for you!

I wrote this tool called [amusing_git](https://github.com/ajitsing/amusing_git){:target="_blank"} which prints jokes when you run specific git commands. e.g when you push or pull the code from github repo, you will see some hilarious messages. Another good thing about this tool is you can add your own messages to the list.

# Demo

![Crepe](/assets/img/posts/amusing_git/amusing_git_1.png)

# How to install amusing_git?

[amusing_git](https://rubygems.org/gems/amusing_git){:target="_blank"} is a rubygem. It can be installed by running the below command.

```bash
gem install amusing_git
```
<br>

# Tell amusing_git to amuse

Once you install amusing_git, run below command to see the list of options it provides.

```bash
amusing_git -h
```

This command will show all the available features.

```bash
Commands:
  amusing_git amuse           # Print random message from configured messages, use `amusing_git help amuse` to know how to add your own messages
  amusing_git help [COMMAND]  # Describe available commands or one specific command
  amusing_git setup           # Setup amusing git
  amusing_git start           # Start amusing for the current git repository
  amusing_git stop            # Stop amusing for the current git repository
```

To start amusement for a specific git repository follow the below steps:

1. Go to the git repo
2. Run `amusing_git start`

Thats it, now when you pull or push code to github, amusing_git will amuse you. To stop amusing_git for a repo, just run `amusing_git stop` in the same repo.

# Want to print jokes in your own scripts?

amusing_git is flexible enough to be used anywhere. If you want to make your own script funny just execute below command in your script and amusing_git will take care of the rest.

```bash
amusing_git amuse
```
<br>

# amusing_git configuration

amusing_git stores all the configuration in ~/.amusing_git directory. This directory contains two files:

1. config
2. default_messages

default_messages is just a text files which contains all the default messages provided by amusing_git.

The config files contains the actual configuration of the plugin. Here is how it looks.

```json
{
  "messages": "/Users/ajitsingh/.amusing_git/default_messages",
  "hooks": [
    "pre-push",
    "pre-rebase",
    "post-merge"
  ]
}
```

You can configure the git hooks on which amusing_git amuses you. If you already are already using git hooks for some other purpose then don't worry, amusing_git will not override your configuration. It will just add another command to the same hook.

Also you can give your own messages file so that next time when amusing_git runs it considers the newly configured file.

# Want to make amusing_git better?

It's an open source project. You can contribute to it on github. All contributions are welcome :)

Thats all I had, thank you very much for reading. If you like the tool don't forget to it a star on github.
