---
layout: post
title: Basic configuration of VIM
description: Basic configuration of vim - This article will explain how to configure VIM for basic things like syntax highlighting, enabling numbers and a lot more.
cover-img: /assets/img/posts/vim/cover.png
permalink: /basic-configuration-of-vim
gh-repo: ajitsing/vim-setup
gh-badge: [star, fork, follow]
tags: [vim]
comments: true
---

This article will explain about how we can configure vim for basic features like syntax highlighting, enabling numbers etc. To enable basic features of vim you need to make some configuration changes.

If you are looking for a tutorial of vim then read [this](http://www.singhajit.com/vim-modes-normal-insert-and-visual/){:target="_blank"} article. or if you are looking for full setup of vim which is ready to install then go to my github [repo](https://github.com/ajitsing/vim-setup){:target="_blank"} of vim.

# ~/.vimrc

Vim by default picks its configuration from `~/.vimrc` file. If you don't have one then go ahead and create this file in home directory with following command.

```bash
touch ~/.vimrc
```

Now it's time to put some configuration in this file. So open this file in your favourite editor and paste the below configurations in it.

```vimscript
syntax on
set number
set cursorline
set clipboard=unnamed

"search settings (this is a comment in vim)
set incsearch
set ignorecase
set hlsearch
```

After putting all these configuration you need to source the ~/.vimrc file with the following command. And then the next time whenever you will open vim, you will see the changes made by the configuration.

```bash
source ~/.vimrc
```

Explanation:

### syntax on

This will enable the syntax highlighting in your vim. Whenever you will open a file with some extension like `.rb`, `.java`, `.js` etc it will identify the right language and will highlight the syntax accordingly.

### set number or set nu

This will enabling the numbering of lines in the left side of editor.

### set cursorline

This config will highlight the current line where your cursor is present.

### set clipboard=unnamed

By default when you copy something in vim, it will not copy on the clipboard in fact it will store it temporarily in a buffer. So this configuration tells vim that copy the content on the system clipboard and then you can use your copied text anywhere in your computer.

### set insearch

This config helps for searching something in vim using /. it will start jumping to the occurrences of the character that you type for search. Its also called incremental search.

### set ignorecase

This config also helps for searching in vim. It will tell vim to ignore the case of letters while searching for something.

### set hlsearch

By default vim does not highlight the search results. If you set this option then vim will start highlighting the search results.

