---
layout: post
seo: true
title: "Git Config Guide: Every Setting You Need to Know"
subtitle: "Configure Git the right way and never think about it again"
date: 2026-01-11
categories: git
permalink: /git-config-guide/
share-img: /assets/img/posts/git-commands/git-config-thumb.png
thumbnail-img: /assets/img/posts/git-commands/git-config-thumb.png
description: "A complete guide to Git configuration. Learn how to set up gitconfig for user identity, aliases, colors, editors, credentials, and more. Includes a sample config file you can copy."
keywords: "git config, gitconfig, git configuration, git setup, git config file, git global config, git config user, git aliases, git config editor, git credential helper, how to configure git, git settings, gitconfig example, git config list, git config email, git config username"
tags: ["git", "version-control", "devops"]
comments: true

quick-answer: "Git config levels: system < global < local (local wins). Essential settings: `user.name`, `user.email`, `core.editor`, `pull.rebase=true`, `fetch.prune=true`. Create aliases: `git config --global alias.co checkout`. Use conditional includes for different work/personal settings. Config files: `~/.gitconfig` (global), `.git/config` (local)."

key-takeaways:
  - "Git reads config from three places: system, global, and local. Local always wins."
  - "Set your user.name and user.email before your first commit or your history will look weird"
  - "Aliases save hours of typing. Start with co, br, ci, st, and lg"
  - "Use conditional includes to have different settings for work and personal projects"
  - "Set pull.rebase to true and fetch.prune to true for a cleaner workflow"

faq:
  - question: "Where is the Git config file located?"
    answer: "Git has three config levels. System config is at /etc/gitconfig (Linux/Mac) or C:\\Program Files\\Git\\etc\\gitconfig (Windows). Global config is at ~/.gitconfig or ~/.config/git/config. Local config is at .git/config inside each repository. Local settings override global, which override system."
  - question: "How do I set my Git username and email?"
    answer: "Run git config --global user.name 'Your Name' and git config --global user.email 'you@example.com'. These identify you in commits. Use --local instead of --global to set different values for a specific repository."
  - question: "How do I see all my Git config settings?"
    answer: "Run git config --list to see all settings. Add --show-origin to see which file each setting comes from. Run git config --list --global to see only global settings, or git config user.name to check a specific value."
  - question: "How do I change my default Git editor?"
    answer: "Run git config --global core.editor followed by your editor command. For VS Code use 'code --wait', for Vim use 'vim', for Nano use 'nano'. The --wait flag is important for GUI editors so Git waits for you to finish editing."
  - question: "How do I create Git aliases?"
    answer: "Run git config --global alias.shortcut 'command'. For example, git config --global alias.co checkout creates an alias so git co works like git checkout. For shell commands, prefix with ! like alias.lg '!git log --oneline --graph'."
  - question: "How do I store Git credentials so I do not have to type my password?"
    answer: "On macOS use git config --global credential.helper osxkeychain. On Windows use git config --global credential.helper manager. On Linux use git config --global credential.helper cache for temporary storage or git config --global credential.helper store for permanent (less secure) storage."
  - question: "How do I use different Git configs for work and personal projects?"
    answer: "Use conditional includes in your global gitconfig. Add [includeIf \"gitdir:~/work/\"] followed by path = ~/.gitconfig-work. Then create ~/.gitconfig-work with your work email and settings. Git automatically uses the right config based on the repository location."
  - question: "What does git config --global pull.rebase true do?"
    answer: "This makes git pull use rebase instead of merge by default. When you pull, your local commits are replayed on top of the remote commits instead of creating a merge commit. This keeps your history linear and cleaner. You can still use git pull --no-rebase when you need a merge."
---

Every Git repository on your machine reads from the same configuration. Set it up once and you never have to think about it again.

This guide covers every setting that matters, from basic identity to advanced performance tuning. If you are looking for Git commands instead, check out the [Git Cheat Sheet](/git-cheat-sheet/).

## Table of Contents

- [Where Git Stores Configuration](#where-git-stores-configuration)
- [User Identity](#user-identity)
- [Core Settings](#core-settings)
- [Color Configuration](#color-configuration)
- [Aliases](#aliases)
- [Diff and Merge Tools](#diff-and-merge-tools)
- [Pull and Push Behavior](#pull-and-push-behavior)
- [Credential Management](#credential-management)
- [Performance Settings](#performance-settings)
- [Useful Miscellaneous Settings](#useful-miscellaneous-settings)
- [Sample gitconfig File](#sample-gitconfig-file)
- [Common Tasks](#common-tasks)

## Where Git Stores Configuration

Git reads configuration from multiple files, in order of priority:

```mermaid
flowchart LR
    A[System] --> B[Global]
    B --> C[Local]
    C --> D[Worktree]
```

Each level overrides the previous one. If you set `user.email` globally but also set it in a local repository, the local value wins for that repository.

| Level | Location | Flag | Use Case |
|-------|----------|------|----------|
| System | `/etc/gitconfig` | `--system` | Settings for all users on the machine |
| Global | `~/.gitconfig` | `--global` | Your personal defaults |
| Local | `.git/config` | `--local` | Project specific settings |
| Worktree | `.git/config.worktree` | `--worktree` | Per worktree settings (rare) |

### View Your Current Config

See all settings and where they come from:

```bash
git config --list --show-origin
```

See just the value of a specific setting:

```bash
git config user.email
```

### Edit Config Directly

Open your global config in your editor:

```bash
git config --global --edit
```

Or edit it manually. The file is at `~/.gitconfig` on Mac and Linux, or `C:\Users\YourName\.gitconfig` on Windows.

## User Identity

This is the first thing you should configure. Your name and email appear in every commit you make.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Check your current settings:

```bash
git config user.name
git config user.email
```

### Different Identity for Work

If you use one email for personal projects and another for work, set up conditional includes. Add this to your `~/.gitconfig`:

```ini
[user]
    name = Your Name
    email = personal@example.com

[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
```

Then create `~/.gitconfig-work`:

```ini
[user]
    email = work@company.com
```

Now any repository under `~/work/` automatically uses your work email. Everything else uses your personal email.

You can also match by remote URL:

```ini
[includeIf "hasconfig:remote.*.url:git@github.com:company/**"]
    path = ~/.gitconfig-work
```

This applies work settings to any repository cloned from your company's GitHub organization.

## Core Settings

These settings control fundamental Git behavior.

### Default Editor

Git opens an editor for commit messages, interactive rebases, and other operations. Set your preferred editor:

**VS Code:**
```bash
git config --global core.editor "code --wait"
```

**Vim:**
```bash
git config --global core.editor "vim"
```

**Nano:**
```bash
git config --global core.editor "nano"
```

**Sublime Text:**
```bash
git config --global core.editor "subl -n -w"
```

The `--wait` flag tells Git to wait until you close the editor before continuing.

### Default Branch Name

Set the default branch name for new repositories:

```bash
git config --global init.defaultBranch main
```

### Pager

Git uses a pager for long output like `git log` and `git diff`. The default is `less`.

**Use less with useful options:**
```bash
git config --global core.pager "less -FRX"
```

- `-F` quits if output fits on one screen
- `-R` preserves colors
- `-X` prevents clearing screen on exit

**Use delta for better diffs:**

[Delta](https://github.com/dandavison/delta) is a syntax highlighting pager. Install it first, then:

```bash
git config --global core.pager delta
```

**Disable pager entirely:**
```bash
git config --global core.pager cat
```

### Line Endings

Different operating systems use different line endings. Windows uses CRLF (`\r\n`), Mac and Linux use LF (`\n`). Git can convert automatically.

**On Windows:**
```bash
git config --global core.autocrlf true
```

This converts LF to CRLF when checking out and CRLF to LF when committing.

**On Mac/Linux:**
```bash
git config --global core.autocrlf input
```

This converts CRLF to LF when committing but leaves files unchanged when checking out.

**Disable conversion:**
```bash
git config --global core.autocrlf false
```

Use this if your team has standardized on one line ending style.

### Global Gitignore

Set a global ignore file for patterns you always want to ignore:

```bash
git config --global core.excludesfile ~/.gitignore_global
```

Then create `~/.gitignore_global`:

```
# OS files
.DS_Store
Thumbs.db

# Editor files
*.swp
*.swo
*~
.idea/
.vscode/

# Dependencies (if you want them globally ignored)
node_modules/
```

### File Permissions

On Unix systems, Git tracks file permissions. This can cause issues when sharing repositories between different systems.

Disable executable bit tracking:

```bash
git config --global core.filemode false
```

### Case Sensitivity

By default, Git on macOS and Windows is case insensitive for filenames. This can cause problems when collaborating with Linux users.

```bash
git config --global core.ignorecase false
```

Be careful with this. If you rename `File.txt` to `file.txt` on a case insensitive system, Git might not notice.

## Color Configuration

Git output is colored by default. You can customize the colors.

### Enable/Disable Colors

```bash
git config --global color.ui auto
```

Values:
- `auto` - use colors when output is a terminal
- `always` - always use colors
- `false` - never use colors

### Custom Colors

Customize colors for specific commands:

```bash
git config --global color.status.added "green bold"
git config --global color.status.changed "yellow bold"
git config --global color.status.untracked "red bold"
```

```bash
git config --global color.diff.meta "blue bold"
git config --global color.diff.old "red bold"
git config --global color.diff.new "green bold"
```

Available colors: `normal`, `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`

Attributes: `bold`, `dim`, `ul` (underline), `blink`, `reverse`

## Aliases

Aliases are shortcuts for commands you use frequently. They save time and reduce typing errors.

### Essential Aliases

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.sw switch
```

Now `git st` works like `git status`.

### Useful Log Aliases

A pretty log with graph:

```bash
git config --global alias.lg "log --oneline --graph --all --decorate"
```

Last commit:

```bash
git config --global alias.last "log -1 HEAD --stat"
```

Commits by author:

```bash
git config --global alias.who "shortlog -sn --all --no-merges"
```

### Workflow Aliases

Undo last commit but keep changes:

```bash
git config --global alias.uncommit "reset --soft HEAD~1"
```

Stage and commit all tracked files:

```bash
git config --global alias.save "commit -am"
```

Show what changed in the last commit:

```bash
git config --global alias.what "show --stat"
```

Amend without changing message:

```bash
git config --global alias.amend "commit --amend --no-edit"
```

### Shell Command Aliases

Prefix with `!` to run shell commands:

List all aliases:

```bash
git config --global alias.aliases "!git config --get-regexp alias | sed 's/alias\\.//'"
```

Clean up merged branches:

```bash
git config --global alias.cleanup "!git branch --merged | grep -v '\\*\\|main\\|master' | xargs -n 1 git branch -d"
```

### In Config File Format

Here is what these look like in your `~/.gitconfig`:

```ini
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    sw = switch
    lg = log --oneline --graph --all --decorate
    last = log -1 HEAD --stat
    uncommit = reset --soft HEAD~1
    save = commit -am
    amend = commit --amend --no-edit
```

## Diff and Merge Tools

Configure external tools for viewing diffs and resolving merge conflicts.

### Diff Tool

**VS Code:**
```bash
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'
git config --global difftool.prompt false
```

**Vimdiff:**
```bash
git config --global diff.tool vimdiff
git config --global difftool.prompt false
```

Use it with:

```bash
git difftool
```

### Merge Tool

**VS Code:**
```bash
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
```

**Vimdiff:**
```bash
git config --global merge.tool vimdiff
```

**Meld (Linux/Mac):**
```bash
git config --global merge.tool meld
```

Use it with:

```bash
git mergetool
```

### Disable Merge Backup Files

By default, Git creates `.orig` backup files during merges. Disable them:

```bash
git config --global mergetool.keepBackup false
```

## Pull and Push Behavior

Control how Git handles remote operations.

### Pull with Rebase

Always rebase when pulling instead of creating merge commits:

```bash
git config --global pull.rebase true
```

This keeps your history linear. If you have not pushed your commits yet, they get replayed on top of the remote commits.

You can still merge when needed:

```bash
git pull --no-rebase
```

### Fast Forward Only

Prevent accidental merges on pull. Require fast forward:

```bash
git config --global pull.ff only
```

This fails if a merge would be required, forcing you to choose between merge and rebase explicitly.

### Auto Prune on Fetch

Remove local references to deleted remote branches:

```bash
git config --global fetch.prune true
```

Now `git fetch` automatically cleans up stale tracking branches.

### Push Behavior

Set the default push behavior:

```bash
git config --global push.default current
```

Options:
- `simple` - push current branch to its upstream (default)
- `current` - push current branch to same named remote branch
- `matching` - push all branches with same name on remote

### Auto Setup Remote

Automatically create a remote tracking branch on first push:

```bash
git config --global push.autoSetupRemote true
```

Now `git push` works on new branches without needing `-u origin branch-name`.

## Credential Management

Store your credentials so you do not have to type passwords repeatedly.

### macOS

Use the macOS Keychain:

```bash
git config --global credential.helper osxkeychain
```

### Windows

Use Windows Credential Manager:

```bash
git config --global credential.helper manager
```

Or the newer version:

```bash
git config --global credential.helper manager-core
```

### Linux

**Temporary cache (15 minutes by default):**
```bash
git config --global credential.helper cache
```

**Longer cache (1 hour):**
```bash
git config --global credential.helper 'cache --timeout=3600'
```

**Permanent storage (stored in plaintext, less secure):**
```bash
git config --global credential.helper store
```

### SSH Instead of HTTPS

For better security, use SSH keys instead of passwords. This is configured per remote:

```bash
git remote set-url origin git@github.com:user/repo.git
```

See [GitHub's SSH documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) for setting up SSH keys.

## Performance Settings

For large repositories, these settings can improve performance.

### Preload Index

Speed up commands by preloading the index:

```bash
git config --global core.preloadindex true
```

### File System Cache (Windows)

Enable the file system cache on Windows:

```bash
git config --global core.fscache true
```

### Many Files Mode

Enable optimizations for repositories with many files:

```bash
git config --global feature.manyFiles true
```

This enables several performance features including `index.skipHash` and the file system monitor.

### Commit Graph

Use the commit graph for faster log and merge base calculations:

```bash
git config --global fetch.writeCommitGraph true
```

### Parallel Operations

Enable parallel operations for checkout and fetch:

```bash
git config --global checkout.workers 0
git config --global fetch.parallel 0
```

Setting to `0` uses one worker per CPU core.

## Useful Miscellaneous Settings

### Auto Correct

Fix typos automatically (with a delay):

```bash
git config --global help.autocorrect 10
```

If you type `git stats`, Git will wait 1 second then run `git status`. The value is in tenths of a second.

### Rename Detection

Improve rename detection in diffs and logs:

```bash
git config --global diff.renames copies
```

### Show Signature in Log

Always show GPG signature status in log:

```bash
git config --global log.showSignature false
```

### Merge Conflict Style

Show more context in merge conflicts:

```bash
git config --global merge.conflictstyle diff3
```

This shows the common ancestor in addition to both sides, making conflicts easier to understand.

### Reuse Recorded Resolution (rerere)

Remember how you resolved conflicts and apply the same resolution next time:

```bash
git config --global rerere.enabled true
```

Useful when rebasing and hitting the same conflicts repeatedly.

## Sample gitconfig File

Here is a complete example you can use as a starting point. Copy this to `~/.gitconfig`:

```ini
[user]
    name = Your Name
    email = you@example.com

[init]
    defaultBranch = main

[core]
    editor = code --wait
    pager = less -FRX
    autocrlf = input
    excludesfile = ~/.gitignore_global

[color]
    ui = auto

[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    sw = switch
    lg = log --oneline --graph --all --decorate
    last = log -1 HEAD --stat
    uncommit = reset --soft HEAD~1
    save = commit -am
    amend = commit --amend --no-edit
    who = shortlog -sn --all --no-merges

[pull]
    rebase = true

[fetch]
    prune = true
    writeCommitGraph = true

[push]
    default = current
    autoSetupRemote = true

[merge]
    conflictstyle = diff3

[diff]
    renames = copies

[rerere]
    enabled = true

[help]
    autocorrect = 10

[credential]
    helper = osxkeychain

# Work configuration
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
```

## Common Tasks

### Reset a Config Value

Remove a setting:

```bash
git config --global --unset user.email
```

Remove all values for a key:

```bash
git config --global --unset-all alias.lg
```

### Copy Config to New Machine

Your gitconfig is just a text file. Copy `~/.gitconfig` to your new machine and you are done.

Or use a dotfiles repository:

```bash
# On your old machine
cp ~/.gitconfig ~/dotfiles/
cd ~/dotfiles
git add .gitconfig
git commit -m "Add gitconfig"
git push

# On your new machine
git clone https://github.com/you/dotfiles.git ~/dotfiles
ln -s ~/dotfiles/.gitconfig ~/.gitconfig
```

### Check Where a Setting Comes From

```bash
git config --show-origin user.email
```

This shows which file contains that setting.

## Next Steps

With your Git properly configured, you are ready to use it effectively. Check out:

- [Git Cheat Sheet](/git-cheat-sheet/) - Quick reference for everyday commands
- [Git Command Line Basics](/git-command-line-basics/) - Understanding the fundamentals
- [GitHub Actions](/github-actions-basics-cicd-automation/) - Automate your workflow

---

**Further Reading:**

- [Official Git Config Documentation](https://git-scm.com/docs/git-config) - Complete reference
- [GitHub's Git Configuration Guide](https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git) - Getting started
- [Pro Git Book - Configuration](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration) - In depth coverage
