---
layout: post
categories: devops
seo: true
title: "shell_session_update: command not found"
description: "rvm issue: shell_session_update: command not found and its solutions."
share-img: /assets/img/posts/terminal/cover.png
permalink: /shell_session_update-command-not-found/
tags: [rvm, ruby, shell]
comments: true
keywords: "shell_session_update command not found, rvm shell error, rvm get head, rvm troubleshooting, ruby shell issues, direnv shell_session_update, rvm update solution, shell command not found fix, rvm mac error, ruby environment setup"
faq:
  - question: "How do I fix shell_session_update command not found?"
    answer: "Run 'rvm get head' to update RVM to latest version. This pulls fixes for the shell_session_update issue. The error occurs when multiple RVM sessions are active in the same terminal."
  - question: "What causes shell_session_update error?"
    answer: "This occurs when RVM is initialized multiple times in the same terminal session. It happens if 'source $HOME/.rvm/scripts/rvm' appears in multiple shell config files (.bashrc, .bash_profile, .profile)."
  - question: "How do I prevent RVM double initialization?"
    answer: "Keep RVM initialization in only ONE file - either ~/.bashrc OR ~/.bash_profile OR ~/.profile. Remove duplicate 'source $HOME/.rvm/scripts/rvm' and 'export PATH=...rvm/bin' lines from other files."
  - question: "What if rvm get head doesn't fix it?"
    answer: "Try creating ~/.direnvrc with: 'shell_session_update() { :; }'. Or run 'rvm get stable' instead. Ensure RVM is sourced only once across your shell config files."
---

This problem has troubled me a lot before I found the solution to it. And no forum provided the right solution for it, hence this post. You can go through the [rvm issue thread](https://github.com/direnv/direnv/issues/210){:target="_blank"} for more details about the issue.

# Why this occurs?

This problem occurs when you have multiple active rvm sessions in the same terminal.

# Solution

Simple solution to this problem is update your rvm version such that [this pull request](https://github.com/rvm/rvm/pull/3627){:target="_blank"} is present in that version or just point your rvm to the latest head. Run the below command and **it will solve your problem**.

```bash
rvm get head
```
<br>

# Other potential solutions which might or might not work

create ```~/.direnvrc``` with the below content

```bash
# Circumvent https://github.com/direnv/direnv/issues/210
#
shell_session_update() { :; }
```
<br>
### get stable<br><br>

```bash
rvm get stable
```
<br>

### Initialize rvm only once

If you have below line in multiple files like ```~/.profile``` or ```~/.bash_profile``` or ```~/.bashrc```, please keep this line in only one of the files so that it gets initialized only once.

```bash
source $HOME/.rvm/scripts/rvm
export PATH="$PATH:$HOME/.rvm/bin

or

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
export PATH="$PATH:$HOME/.rvm/bin"
```
<br>