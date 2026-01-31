---
layout: post
seo: true
title: "50+ Linux Commands Cheat Sheet: The Complete Developer Guide"
subtitle: "Master the command line with these practical Linux commands every developer should know"
date: 2026-01-02
categories: devops
thumbnail-img: /assets/img/posts/linux-commands/linux-commands-thumbnail.svg
share-img: /assets/img/posts/linux-commands/linux-commands-thumbnail.svg
permalink: /linux-commands-cheat-sheet/
description: "Master 50+ essential Linux commands with practical examples. Covers file management, process control, networking, permissions, grep, find, SSH, and system administration for developers."
keywords: "linux commands cheat sheet, linux terminal commands, linux command line, bash commands, linux shell commands, linux basics for developers, ssh commands, grep command, linux file management, process management linux, linux networking commands"
tags: ["linux", "devops", "command-line"]
comments: true
faq:
  - question: "What are the most essential Linux commands for developers?"
    answer: "The essential Linux commands are: ls (list files), cd (change directory), pwd (print working directory), cat (view files), grep (search text), find (search files), ps (list processes), kill (stop processes), chmod (change permissions), and ssh (remote connection). These cover navigation, file operations, process management, and remote access."
  - question: "How do I find which process is using a specific port in Linux?"
    answer: "Use 'lsof -i :PORT' or 'netstat -tulpn | grep PORT' or 'ss -tulpn | grep PORT'. For example, 'lsof -i :8080' shows which process is using port 8080. You need root access for complete information on some systems."
  - question: "How do I safely delete files in Linux?"
    answer: "Use 'rm -i filename' to get a confirmation prompt before deleting. For directories, use 'rm -ri directory'. Avoid 'rm -rf' unless absolutely sure. Never run 'rm -rf /' or 'rm -rf *' as this can delete your entire system. Consider using 'trash-cli' for recoverable deletes."
  - question: "What is the difference between sudo and su in Linux?"
    answer: "sudo runs a single command with root privileges and logs the action. su switches to the root user entirely until you exit. sudo is safer because it limits elevated access to one command, requires your own password, and maintains an audit trail. Use 'sudo command' instead of 'su' when possible."
  - question: "How do I check disk space in Linux?"
    answer: "Use 'df -h' to see disk space usage for all mounted filesystems in human-readable format. Use 'du -sh directory' to check the size of a specific directory. Use 'du -sh * | sort -h' to see sizes of all items in current directory sorted by size."
  - question: "How do I search for text inside files in Linux?"
    answer: "Use grep: 'grep pattern filename' for single file, 'grep -r pattern directory' for recursive search, 'grep -i pattern file' for case-insensitive search. Add '-n' to show line numbers, '-l' to show only filenames. Example: 'grep -rn \"TODO\" ./src' finds all TODOs in src directory with line numbers."
---

You SSH into a production server at 2 AM because something is broken. The monitoring dashboard is useless. All you have is a terminal prompt blinking at you.

This is where knowing Linux commands separates developers who can debug issues from those who cannot.

I have been using Linux for over a decade, first on servers, then on my development machines. This post covers the commands I actually use, organized by what you are trying to do. No obscure flags that nobody remembers. Just practical commands that work.

---

## Table of Contents

- [Navigation and File Operations](#navigation-and-file-operations)
- [Viewing and Editing Files](#viewing-and-editing-files)
- [Searching and Finding](#searching-and-finding)
- [Process Management](#process-management)
- [Disk and Memory](#disk-and-memory)
- [Networking](#networking)
- [Permissions and Ownership](#permissions-and-ownership)
- [Text Processing](#text-processing)
- [Archives and Compression](#archives-and-compression)
- [System Information](#system-information)
- [Putting It Together: Real Scenarios](#putting-it-together-real-scenarios)
- [Command Flow: How Data Moves Through Pipes](#command-flow-how-data-moves-through-pipes)
- [Quick Reference Table](#quick-reference-table)

---

## Navigation and File Operations

These commands are your bread and butter. You will use them dozens of times every day.

### Moving Around

```bash
# Where am I right now?
pwd

# List files in current directory
ls

# List with details (permissions, size, date)
ls -la

# List sorted by modification time (newest first)
ls -lt

# Change to a directory
cd /var/log

# Go back to previous directory
cd -

# Go to home directory
cd ~

# Go up one level
cd ..
```

The `-la` flag combination is what you will use most often. It shows hidden files (those starting with a dot) and gives you file permissions, owner, size, and modification date.

For more on how the [Linux directory structure](/explainer/linux-directory-structure/) works and where to find things, check out the directory structure explainer.

### Creating and Removing

```bash
# Create a directory
mkdir logs

# Create nested directories
mkdir -p app/src/components

# Create an empty file
touch config.yml

# Remove a file
rm old-file.txt

# Remove with confirmation prompt (safer)
rm -i important-file.txt

# Remove a directory and its contents
rm -r old-directory

# Force remove without prompts (use carefully)
rm -rf node_modules
```

A word of caution: `rm -rf` is dangerous. There is no trash can in Linux. Once deleted, files are gone. I have seen developers accidentally wipe production data with a misplaced space: `rm -rf / var/log` instead of `rm -rf /var/log`. Always double check before pressing enter.

### Copying and Moving

```bash
# Copy a file
cp config.yml config.backup.yml

# Copy a directory recursively
cp -r src src-backup

# Move or rename a file
mv old-name.txt new-name.txt

# Move multiple files to a directory
mv *.log /var/log/app/

# Move with confirmation if overwriting
mv -i source.txt destination.txt
```

---

## Viewing and Editing Files

### Quick File Viewing

```bash
# View entire file
cat README.md

# View with line numbers
cat -n script.py

# View first 20 lines
head -20 large-file.log

# View last 50 lines
tail -50 large-file.log

# Follow a file in real-time (great for logs)
tail -f /var/log/app.log

# Follow multiple files
tail -f app.log error.log

# Page through a large file
less huge-file.log
```

The `tail -f` command is essential for debugging. When your application is running and you want to see logs as they appear, this is what you use. Press `Ctrl+C` to stop following.

In `less`, use these keys:
- `Space` or `f` to go forward one page
- `b` to go back one page
- `/pattern` to search forward
- `n` to find next occurrence
- `q` to quit

### Editing Files

```bash
# Edit with nano (beginner friendly)
nano config.yml

# Edit with vim (more powerful)
vim config.yml

# Quick edit from command line (append text)
echo "new line" >> file.txt

# Overwrite file with text
echo "fresh start" > file.txt
```

If you are stuck in vim and do not know how to exit, press `Esc`, then type `:q!` and press `Enter`. This quits without saving. For saving and quitting, use `:wq`.

---

## Searching and Finding

This is where you become effective at debugging. Knowing how to search quickly saves hours.

### Grep: Search Inside Files

```bash
# Basic search
grep "error" app.log

# Case insensitive search
grep -i "error" app.log

# Show line numbers
grep -n "error" app.log

# Search recursively in directory
grep -r "TODO" ./src

# Search with context (3 lines before and after)
grep -C 3 "exception" app.log

# Invert match (show lines NOT containing pattern)
grep -v "DEBUG" app.log

# Count occurrences
grep -c "error" app.log

# Search for exact word (not substring)
grep -w "error" app.log

# Show only filenames containing matches
grep -l "password" *.conf
```

Combine grep with other commands using pipes:

```bash
# Find error lines, then search for specific user
grep "error" app.log | grep "user123"

# Check running processes for python
ps aux | grep python

# See which ports are in use
netstat -tulpn | grep LISTEN
```

### Find: Search for Files

```bash
# Find by name
find /var/log -name "*.log"

# Find by name (case insensitive)
find . -iname "readme*"

# Find files modified in last 24 hours
find . -mtime -1

# Find files larger than 100MB
find /var -size +100M

# Find and delete (careful!)
find /tmp -name "*.tmp" -delete

# Find and execute command on each result
find . -name "*.py" -exec grep "import os" {} \;

# Find directories only
find . -type d -name "node_modules"

# Find files only
find . -type f -name "*.js"
```

Real world example: finding all large log files that are eating up disk space:

```bash
find /var/log -type f -size +50M -exec ls -lh {} \;
```

---

## Process Management

When something is stuck or eating CPU, you need to find it and stop it.

### Viewing Processes

```bash
# List all processes with details
ps aux

# List processes in tree format
ps auxf

# Show top processes by CPU usage (real-time)
top

# Better alternative to top (if installed)
htop

# Find specific process
ps aux | grep nginx

# Show process using a specific port
lsof -i :8080

# List all network connections
netstat -tulpn

# Modern alternative to netstat
ss -tulpn
```

The `ps aux` output can be overwhelming. Here is what the columns mean:
- USER: who owns the process
- PID: process ID (use this to kill it)
- %CPU: CPU usage
- %MEM: memory usage
- COMMAND: what is running

### Stopping Processes

```bash
# Graceful stop (SIGTERM)
kill 1234

# Force kill (SIGKILL) - use when regular kill fails
kill -9 1234

# Kill by name
pkill nginx

# Kill all processes matching pattern
pkill -f "python server.py"

# Kill process using specific port
lsof -ti :8080 | xargs kill
```

Always try `kill` before `kill -9`. The regular kill gives the process a chance to clean up (close files, release locks, save state). Force kill terminates immediately and can leave things in a bad state.

---

## Disk and Memory

```bash
# Disk usage by filesystem
df -h

# Disk usage of current directory
du -sh .

# Disk usage of subdirectories, sorted
du -sh * | sort -h

# Find largest directories
du -h --max-depth=1 / | sort -h | tail -10

# Memory usage
free -h

# Detailed memory info
cat /proc/meminfo
```

The `-h` flag means "human readable" and shows sizes in KB, MB, GB instead of raw bytes.

---

## Networking

Essential for working with remote servers and debugging network issues.

### Remote Connections

```bash
# SSH into a server
ssh user@server.com

# SSH with specific port
ssh -p 2222 user@server.com

# SSH with private key
ssh -i ~/.ssh/my-key.pem user@server.com

# Copy file to remote server
scp local-file.txt user@server.com:/path/to/destination/

# Copy file from remote server
scp user@server.com:/var/log/app.log ./local-copy.log

# Copy directory recursively
scp -r ./project user@server.com:/home/user/

# Sync directories (smarter than scp, only copies changes)
rsync -avz ./local-dir/ user@server.com:/remote-dir/
```

For API testing and HTTP requests, check out the [cURL commands reference](/explainer/curl-commands/) which covers everything from basic GET requests to authentication and file uploads.

### Network Diagnostics

```bash
# Test if host is reachable
ping google.com

# Trace route to host
traceroute google.com

# DNS lookup
nslookup example.com

# More detailed DNS lookup
dig example.com

# Download a file
wget https://example.com/file.zip

# Download and save with specific name
wget -O custom-name.zip https://example.com/file.zip

# Check open ports on a host
nmap -p 1-1000 localhost

# Test if a port is open
nc -zv server.com 443
```

---

## Permissions and Ownership

Linux permissions confuse everyone at first. Here is the practical stuff.

### Understanding Permissions

When you run `ls -la`, you see something like:

```
-rwxr-xr-- 1 john developers 4096 Jan 30 10:00 script.sh
```

The first column shows permissions:
- First character: file type (`-` for file, `d` for directory)
- Characters 2-4: owner permissions (rwx = read, write, execute)
- Characters 5-7: group permissions
- Characters 8-10: everyone else

### Changing Permissions

```bash
# Make file executable
chmod +x script.sh

# Remove write permission for others
chmod o-w file.txt

# Set specific permissions using numbers
chmod 755 script.sh   # rwxr-xr-x
chmod 644 file.txt    # rw-r--r--

# Change permissions recursively
chmod -R 755 ./directory

# Make file readable only by owner
chmod 600 private-key.pem
```

Common permission numbers:
- `755`: Owner can do everything, others can read and execute (scripts, directories)
- `644`: Owner can read and write, others can only read (regular files)
- `600`: Only owner can read and write (private keys, passwords)

### Changing Ownership

```bash
# Change owner
chown john file.txt

# Change owner and group
chown john:developers file.txt

# Change ownership recursively
chown -R www-data:www-data /var/www/html
```

---

## Text Processing

These commands transform and analyze text. Incredibly useful for parsing logs and data.

### Cut, Sort, and Unique

```bash
# Get specific column (e.g., usernames from /etc/passwd)
cut -d: -f1 /etc/passwd

# Sort lines
sort names.txt

# Sort numerically
sort -n numbers.txt

# Sort in reverse
sort -r names.txt

# Remove duplicate lines (file must be sorted first)
sort file.txt | uniq

# Count duplicates
sort file.txt | uniq -c

# Get unique values from specific column
cut -d, -f2 data.csv | sort | uniq
```

### Sed and Awk

```bash
# Replace text (first occurrence per line)
sed 's/old/new/' file.txt

# Replace all occurrences
sed 's/old/new/g' file.txt

# Replace and save to file
sed -i 's/old/new/g' file.txt

# Delete lines containing pattern
sed '/pattern/d' file.txt

# Print specific column with awk
awk '{print $2}' file.txt

# Print multiple columns
awk '{print $1, $3}' file.txt

# Sum numbers in a column
awk '{sum += $1} END {print sum}' numbers.txt

# Filter and print
awk '$3 > 100 {print $1, $3}' data.txt
```

Real world example: analyze Apache access logs to find top IP addresses:

```bash
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10
```

---

## Archives and Compression

```bash
# Create tar archive
tar -cvf archive.tar directory/

# Create compressed archive (gzip)
tar -czvf archive.tar.gz directory/

# Extract tar archive
tar -xvf archive.tar

# Extract compressed archive
tar -xzvf archive.tar.gz

# Extract to specific directory
tar -xzvf archive.tar.gz -C /destination/

# List contents without extracting
tar -tzvf archive.tar.gz

# Compress single file
gzip large-file.log

# Decompress
gunzip large-file.log.gz

# Create zip archive
zip -r archive.zip directory/

# Extract zip
unzip archive.zip
```

Flags for tar:
- `c` = create
- `x` = extract
- `v` = verbose (show files being processed)
- `f` = file (specify archive name)
- `z` = use gzip compression

---

## System Information

```bash
# Linux version and kernel
uname -a

# Distribution info
cat /etc/os-release

# CPU info
lscpu

# Memory info
free -h

# Disk partitions
lsblk

# System uptime
uptime

# Who is logged in
who

# Current user
whoami

# Environment variables
env

# Specific environment variable
echo $PATH
```

---

## Putting It Together: Real Scenarios

### Scenario 1: Debug a Slow Application

```bash
# Check if the process is running
ps aux | grep myapp

# Check CPU and memory usage
top -p $(pgrep -d',' myapp)

# Check disk I/O
iostat -x 1

# Watch log output in real-time
tail -f /var/log/myapp/app.log | grep -i error

# Check network connections
netstat -tulpn | grep myapp
```

### Scenario 2: Clean Up Disk Space

```bash
# Check overall disk usage
df -h

# Find largest directories
du -h --max-depth=1 / 2>/dev/null | sort -h | tail -20

# Find large files
find / -type f -size +500M 2>/dev/null

# Clean old log files
find /var/log -name "*.log" -mtime +30 -delete

# Clear systemd journal (keep last 7 days)
journalctl --vacuum-time=7d
```

### Scenario 3: Deploy Code to Server

```bash
# Connect to server
ssh deploy@production.example.com

# Pull latest code
cd /var/www/app && git pull origin main

# Install dependencies
npm install --production

# Restart application
sudo systemctl restart myapp

# Check it's running
sudo systemctl status myapp

# Watch logs for errors
tail -f /var/log/myapp/app.log
```

---

## Command Flow: How Data Moves Through Pipes

One of the most powerful features of Linux is piping. Commands can be chained together, with the output of one becoming the input of the next.

```mermaid
flowchart LR
    A[cat access.log] --> B[grep 404]
    B --> C[awk '{print $7}']
    C --> D[sort]
    D --> E[uniq -c]
    E --> F[sort -rn]
    F --> G[head -10]
    
    style A fill:#e0f2fe,stroke:#0284c7,stroke-width:2px
    style G fill:#dcfce7,stroke:#16a34a,stroke-width:2px
```

This pipeline finds the top 10 URLs that returned 404 errors:

```bash
cat access.log | grep 404 | awk '{print $7}' | sort | uniq -c | sort -rn | head -10
```

Each step transforms the data:
1. Read the log file
2. Keep only lines with 404
3. Extract the URL column
4. Sort alphabetically
5. Count unique URLs
6. Sort by count (highest first)
7. Show top 10

---

## Quick Reference Table

| Task | Command |
|------|---------|
| List files with details | `ls -la` |
| Find text in files | `grep -r "pattern" ./` |
| Find files by name | `find . -name "*.js"` |
| View process list | `ps aux` |
| Kill a process | `kill -9 PID` |
| Check disk space | `df -h` |
| Check memory | `free -h` |
| SSH to server | `ssh user@host` |
| Copy to server | `scp file user@host:/path/` |
| Follow log file | `tail -f logfile` |
| Make executable | `chmod +x script.sh` |
| Extract tar.gz | `tar -xzvf file.tar.gz` |
| Find large files | `find / -size +100M` |
| Check open ports | `netstat -tulpn` |
| Download file | `wget URL` |

---

## Related Topics

Once you are comfortable with basic Linux commands, these topics will make you even more effective:

- **[Git Command Line](/git-command-line-basics/)**: Version control commands you will use alongside Linux commands daily
- **[Cron Jobs](/explainer/cron-jobs-explained/)**: Schedule your scripts to run automatically
- **[cURL Commands](/explainer/curl-commands/)**: Make HTTP requests and test APIs from the terminal
- **[Linux Directory Structure](/explainer/linux-directory-structure/)**: Understand where files live and why
- **[Kubernetes Architecture](/devops/kubernetes-architecture/)**: Container orchestration that builds on these fundamentals

---

## Further Reading

- [GNU Core Utilities Manual](https://www.gnu.org/software/coreutils/manual/coreutils.html): Official documentation for core Linux commands
- [Linux Command Library](https://linuxcommandlibrary.com/): Searchable reference for commands with examples
- [ExplainShell](https://explainshell.com/): Paste a command to see what each part does
- [The Linux Documentation Project](https://tldp.org/): Comprehensive guides and HOWTOs

---

The best way to learn these commands is to use them. Next time you need to edit a file or find something, resist the urge to use a GUI. Open a terminal and figure it out. The commands will become muscle memory faster than you think.

*What commands do you use most often? Share in the comments below.*
