---
layout: post
categories: devops
seo: true
title: Cool tips for vim users
description: Cool tips for vim users, In this article we will cover some awesome tips & tricks vim users can use to make their life easier while using vim.
share-img: /assets/img/posts/vim/cover.png
permalink: /cool-tips-for-vim-users/
gh-repo: ajitsing/vim-setup
gh-badge: [star, fork, follow]
tags: [vim]
keywords: "vim tips, vim tricks, vim productivity, vim shortcuts, vim advanced usage, vim configuration, vim editor tips, vim json formatting, vim uppercase lowercase, vimrc tips, vim best practices"
comments: true
faq:
  - question: "How do I beautify JSON in Vim?"
    answer: "Add this mapping: nnoremap <leader>j :%!python -m json.tool<CR>. Press your leader key + j to format JSON. Requires Python installed. Invalid JSON will show an error message."
  - question: "How do I stop Vim from creating swap and backup files?"
    answer: "Add these to ~/.vimrc: 'set nobackup', 'set nowritebackup', 'set noswapfile'. This prevents .swp files and ~ backup files from cluttering your directories."
  - question: "How do I convert text to uppercase or lowercase in Vim?"
    answer: "Select text in visual mode, then press 'U' for uppercase or 'u' for lowercase. Or use gU{motion} and gu{motion} in normal mode. Example: gUiW converts the inner word to uppercase."
  - question: "How do I auto-reload vimrc after saving it?"
    answer: "Add an autocommand: 'autocmd BufWritePost $MYVIMRC source $MYVIMRC'. This automatically sources your vimrc whenever you save it, so changes take effect immediately without restarting Vim."
---

Hello Folks, I have been using vim for about 2 years now. And it is my primary editor when it comes to editing text or coding(other than java ;) ). Since I have been exploring vim for 2 years, I have learned some cool tips which vim users can use. These things are small but makes a big difference when you use them. So let's go through them one by one.

If you want to take a look at my vim-setup you can have a look here on [github](https://github.com/ajitsing/vim-setup){:target="_blank"}.

# Uppercase and Lowercase conversion

below mappings takes care of converting a selected text into lower or uppercase.

```vimscript
nnoremap g^ gUiW
nnoremap gv guiW
```
<br>

# Beautify JSON

For this mapping you have to have python installed on your system. This mapping takes care of beautifying the json. And if the json is not proper it will show an error message. You can chose your own mapping instead of `<leader>j` in my case leader is ','

```vimscript
nnoremap <leader>j :%!python -m json.tool<CR>
autocmd BufNewFile,BufRead *.json set ft=javascript
```
<br>

# Do not create backup files

A lot of times vim creates some `.swap` or some backup file etc. which we really don't want and finally we have to remove them manually. Bellow settings tells vim that please do not create any backup files.

```vimscript
set nobackup
set nowritebackup
set noswapfile
```
<br>

# Show trailing spaces

Below config will show the trailing spaces at the end of the line.

```vimscript
set list listchars=tab:\ \ ,trail:.,extends:>,precedes:<
```
<br>

# Change cursor shape in different modes

In vim by default cursor show up as a square in all modes. I use this config to convert the cursor shape to pipe in insert mode.

```vimscript
let &t_SI = "\<Esc>]50;CursorShape=1\x7"
let &t_EI = "\<Esc>]50;CursorShape=0\x7"
```
<br>

# Reload vim after making change in ~/.vimrc

The below autogroup will reload vim every time you write the `~/.vimrc` file. If you put this in your ~/.vimrc file, you will never have to do `source ~/.vimrc` from the terminal.

```vimscript
augroup VimReload
autocmd!
    autocmd BufWritePost $MYVIMRC source $MYVIMRC
augroup END
```
<br>

# Selecting text till the last character

If you use vim's default `$` to go to the end of the line it counts the `\n(newline)` in it. To avoid that use the below mappings.If you want to select something till end or till start of line use `shift + l or `shift + h` respectively.

```vimscript
vnoremap H ^
vnoremap L g_
nnoremap H ^
nnoremap L g_
```
<br>

# Use ; instead of :

To go to command mode in vim we use `shift + ;` but actually if we see `;` alone is not doing anything, then why not use it to go to command mode. It will help you to navigate to command mode faster and you don't have to press two keys.

```vimscript
nnoremap ; :
```
<br>

# Deleting everything in the file

Generally we use 3 mappings to delete everything in a file, so why not combine them and use just one mapping.

```vimscript
nnoremap <silent>da ggdG
```
<br>

# Jump between relative and normal numbering

To jump between relative and normal numbering we go to command mode and type the command `:set nu` or `:set rnu`, instead we can map it to something simpler the easier to use. I use `F2` and `F3` for this purpose.

```vimscript
nnoremap <silent><F2> :set rnu!<CR>
nnoremap <silent><F3> :set nu!<CR>
```
<br>

