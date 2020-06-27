---
layout: post
title: Tool to execute commands in multiple directories
description: brint_it_on is a tool to execute commands in multiple directories, it takes a configuration file which provides all the info of the directories and commands.
cover-img: /assets/img/posts/bring_it_on/cover.jpg
permalink: /tool-to-execute-commands-in-multiple-directories
gh-repo: ajitsing/bring_it_on
gh-badge: [star, fork, follow]
tags: [nodejs, productivity]
comments: true
---

A few months back I was working on a project which had a SOA(Service Oriented Architecture). Which means I had to start 4 to 5 services from different directories to start my workflow. And it was important to monitor the logs as well. For a few days I just executed the commands by going in different directories but then after that I thought enough is enough. I am a programmer I can write programs to make my life easier. Thats when I wrote this tool called [bring_it_on](https://github.com/ajitsing/bring_it_on){:target="_blank"}. Its written in nodejs.

# How bring_it_on works

bring_it_on takes a configuration file and uses aliases to operate on a service or a command. If you pass the service alias to the bring_it_on it will start that particular service and it will show logs in different color for each service prepended with its alias.


To kill the service I used `SIGINT` signal. Pressing `Ctrl+c` will kill all the services started by bring_it_on.

Below is a sample configuration file that bring_it_on understands. `alias is a key` to the command. brint_it_on will identify the service/command using that alias.

```json
[
	{
		"dir":"/path/to/cost_service/", 
		"command":"sh cost_service.sh start", 
		"kill": "sh cost_service.sh stop", 
		"log":"/path/to/cost_service/logs/cost.log",
		"alias" : "cost"
	},
	{
		"dir":"/path/to/merchandise_service/", 
		"command":"sh merchandise_service.sh start", 
		"kill": "sh merchandise_service.sh stop", 
		"log":"/path/to/merchandise_service/logs/merchandise.log",
		"alias" : "merch"
	}
]
```

Now to run the services present in config I just had to type a command from one place. Below is the command I used to run to start the services.

```bash
node brint_it_on.js config.json #to start all services
node brint_it_on.js config.json cost #to start cost service
node brint_it_on.js config.json cost merch # to start cost and merch
```

At first it was pretty cool but then I realized the command is very big so I put an alias inside my `~/.zshrc` file. And then I could run any service from any directory.

```bash
alias bring_it_on='node path/to/bring_it_on.js  path/to/config.json'
#you can choose your own alias as well
```

Below is a screen shot of terminal after using bring_it_on

![Crepe](/assets/img/posts/bring_it_on/bring_it_on_1.png)

Now starting the services was a lot easier but then I had a use case where I wanted to start all the services except one or two of them. And then I extended brint_it_on to do that. After the changes I was able to start services except the ones which I didn't need at the moment.

```bash
bring_it_on -cost #will start all the services inside config except cost service
```
<br>

# How to install bring_it_on

1. git clone git@github.com:ajitsing/bring_it_on.git
2. cd bring_in_on
3. `npm install`
4. modify `config.json` according to your needs
5. add your preferred alias to `~/.bashrc` or `~/.zshrc`

