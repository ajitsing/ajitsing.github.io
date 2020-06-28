---
layout: post
title: Vim modes - normal, insert and visual
description: Vim modes - normal, insert and visual. What are the commands or mappings supported in each mode. What commands can be used to jump between the modes.
cover-img: /assets/img/posts/vim/cover.png
permalink: /vim-modes-normal-insert-and-visual
gh-repo: ajitsing/vim-setup
gh-badge: [star, fork, follow]
tags: [vim]
comments: true
---

This article covers all the basic modes of vim. commands or mappings supported in each mode and what commands we can use to jump between them. Or if you are looking for a well configured vim you can visit my github repo [here](https://github.com/ajitsing/vim-setup){:target="_blank"}.

There are mainly three modes in vim

1. Normal mode
2. Insert mode
3. Visual mode

# Normal mode

The normal mode is the default mode of vim. This mode of vim is mainly used for traversing in the file or to use the normal mode mappings which might have defined in the `~/.vimrc` file. Lets take a look at default mappings of normal mode.

Keys to jump between the line.

```bash
j (down arrow key) - move one line down
k (up arrow key) - move one line up
h (left arrow key) - move one character left
l (right arrow key) - move one character right
```

To jump multiple line you can use the numbers followed by the j,k,l,h or the arrow keys. For example lets say I want to go 10 lines down from the current line thenI will type `10j`(down arrow key).

Keys to traverse word by word

```bash
w - to jump to next word
e - to jump to end of word
b - to jump one word back
```

You can use the above commands with numbers as well. For example if I want to jump 4th word from the cursor position I will type `4w`

Keys to cut, copy and paste

```bash
dd - delete a line
yy - copy a line
p - paste the copied text or line
x - delete the character under the cursor
```

Use Cases

1. To delete a line in vim you can use `dd` command and to paste that line somewhere else just type `p` You can use the `dd` and `p` command with the numbers as well.

2. If you want to delete 10 lines including the current line just type `10dd`

3. To paste one line 10 number times type `10p` it will paste the copied lines or text 10 times

4. To copy multiple lines use `yy` with numbers. e.g `10yy`


# Insert Mode

Insert mode is mainly used for entering the text, This is where you really update the file.

Ways to enter the insert mode -

```bash
i - enter the insert mode at the current cursor position
I - enter the insert mode at the first character of line
A - enter insert mode at the end of line
S - delete all characters in line and enter insert mode
C - delete all the character from the cursor position and enter insert mode
s - delete the character under the cursor and enter insert mode
a - enter insert mode after the current cursor position
o - insert new line below and enter insert mode
O - insert new line above the current line and enter insert mode
```
<br>

# Visual Mode

Visual mode is mainly used for selecting some text and do something with it.

Keys to enter visual mode

```bash
v - enter visual mode
V- select whole line
ctrl + v - enter visual block mode
```

**v** - will just allow you to enter the visual mode, after that you can use normal mode's traversing commands`(w,e,b,j,k,l,h or arrow keys )` to select the text fast.

**ctrl + v** - This is used when you want to select a block of text and do something with it, e.g. delete, copy etc. This has lot of mapping of itself maybe I will write a separate article for it.

**V** - This is used when you are in normal mode and you want to select the current line, and after it if you use arrow up or down it will select the whole above or below line.

Delete, cut and copy in visual mode -

1. **Delete** - select the text you want to delete and press `d`
2. **Copy** - select the text using above commands and press `y`
3. **Cut** - You can use the delete commands(`d`) to cut and use `p` to paste
