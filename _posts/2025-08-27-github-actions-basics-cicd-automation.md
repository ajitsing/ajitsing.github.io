---
layout: post
seo: true
title: "GitHub Actions: CI/CD Automation Basics"
subtitle: "Turn your repository into an automated testing and deployment machine that catches bugs before they reach users"
date: 2025-08-27
categories: devops
permalink: /github-actions-basics-cicd-automation/
share-img: /assets/img/posts/android_github_actions/thumbnail.png
thumbnail-img: /assets/img/posts/android_github_actions/thumbnail.png
description: "Learn GitHub Actions fundamentals with practical examples. Master CI/CD automation, workflow triggers, and best practices for software developers."
keywords: "GitHub Actions, CI/CD, automation, workflows, continuous integration, continuous deployment, DevOps"
tags: ["github-actions", "ci-cd", "devops"]

quick-answer: "GitHub Actions automates CI/CD through YAML workflow files in `.github/workflows/`. Workflows trigger on events (push, PR, schedule), run jobs on virtual machines, and execute steps. Use `actions/checkout` to get code, matrix builds for multi-version testing, and secrets for sensitive data. Free tier includes 2,000 minutes/month."

faq:
  - question: "What is GitHub Actions and how does it work?"
    answer: "GitHub Actions is a CI/CD platform built into GitHub that automates workflows based on repository events. Workflows are defined in YAML files in .github/workflows/ directory. When events occur (push, pull request, schedule), GitHub runs your workflow on virtual machines, executing jobs and steps you define."
  - question: "How do I create my first GitHub Actions workflow?"
    answer: "Create a YAML file in .github/workflows/ directory (e.g., ci.yml). Define the trigger events with 'on:', specify jobs with 'jobs:', and add steps for each task. Use 'actions/checkout@v4' to check out code and 'actions/setup-node@v4' (or similar) to set up your environment."
  - question: "What are GitHub Actions secrets and how do I use them?"
    answer: "GitHub Actions secrets are encrypted environment variables for storing sensitive data like API keys and passwords. Add them in Settings > Secrets and variables > Actions. Access them in workflows using ${{ secrets.SECRET_NAME }}. Never hardcode sensitive values in workflow files."
  - question: "How do I run tests on multiple versions or operating systems?"
    answer: "Use matrix builds with the 'strategy.matrix' option. Define arrays for versions and OS (e.g., node-version: [16, 18, 20], os: [ubuntu-latest, windows-latest]). GitHub Actions creates a job for each combination, running them in parallel."
  - question: "What is the difference between jobs and steps in GitHub Actions?"
    answer: "Jobs are independent units of work that run on separate virtual machines and can run in parallel. Steps are sequential tasks within a job that share the same environment. Use 'needs:' to create job dependencies. Steps can run shell commands or use pre-built actions."
  - question: "How do I trigger a workflow only on specific branches?"
    answer: "Use the 'on.push.branches' or 'on.pull_request.branches' configuration. For example: 'on: push: branches: [main, develop]' triggers only on pushes to main or develop branches. You can also use 'branches-ignore' to exclude specific branches."
---

Think of GitHub Actions as your digital assistant that never sleeps. Every time something happens in your repository - like pushing code or creating a pull request - Actions can automatically run tasks for you.

Here's what makes it powerful:

- **Built into GitHub** - No external tools to set up
- **Event-driven** - Responds to repository activities automatically  
- **Free tier** - 2,000 minutes per month for public repos
- **Flexible** - Run tests, deploy code, send notifications, and more

## The Building Blocks

Before we dive into code, let's understand the key components:

### Workflows
These are the automation recipes stored in `.github/workflows/` directory. Think of them as instruction manuals that tell GitHub what to do and when.

### Events
The triggers that kick off your workflows. Common ones include:
- `push` - Someone pushes code
- `pull_request` - A PR is opened or updated
- `schedule` - Run on a timer using [cron syntax](/tools/cron-expression/)
- `workflow_dispatch` - Manual trigger

### Jobs
The actual work your workflow does. Each job runs on a fresh virtual machine.

### Steps
Individual tasks within a job, like running tests or deploying code.

### Actions
Reusable pieces of code that perform specific tasks. You can use ones from the marketplace or create your own.

## Your First Workflow: Basic CI

Let's start with something practical - a workflow that runs tests every time you push code. Create this file in your repository:

`.github/workflows/ci.yml`

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Check out code
        uses: actions/checkout@v4
        
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Run linter
        run: npm run lint
```

This workflow does four things:
1. Checks out your code
2. Sets up Node.js with dependency caching
3. Installs dependencies
4. Runs tests and linting

Every push to `main` or `develop` will trigger this workflow. Every pull request targeting `main` will also run it. No more "works on my machine" surprises.

## Matrix Builds: Test Everywhere

Want to test your code across multiple Node.js versions? Use a matrix build:

```yaml
name: Cross-Platform CI

on: [push, pull_request]

jobs:
  test:
    runs-on: {% raw %}${{ matrix.os }}{% endraw %}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
        
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js {% raw %}${{ matrix.node-version }}{% endraw %}
        uses: actions/setup-node@v4
        with:
          node-version: {% raw %}${{ matrix.node-version }}{% endraw %}
      - run: npm ci
      - run: npm test
```

This creates 9 jobs (3 operating systems × 3 Node.js versions) and runs them in parallel. You'll know your code works everywhere, not just on your laptop.

## Secrets and Environment Variables

Never hardcode API keys or passwords. Use GitHub's encrypted secrets instead:

```yaml
steps:
  - name: Deploy to production
    env:
      API_KEY: {% raw %}${{ secrets.API_KEY }}{% endraw %}
      DATABASE_URL: {% raw %}${{ secrets.DATABASE_URL }}{% endraw %}
    run: |
      echo "Deploying with API key..."
      # Your deployment script here
```

Add secrets in your repository settings under **Settings > Secrets and variables > Actions**.

## Conditional Logic

Sometimes you only want steps to run under specific conditions:

```yaml
steps:
  - name: Run integration tests
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    run: npm run test:integration
    
  - name: Notify Slack on failure
    if: failure()
    run: |
      curl -X POST -H 'Content-type: application/json' \
      --data '{"text":"Build failed on {% raw %}${{ github.ref }}{% endraw %}"}' \
      {% raw %}${{ secrets.SLACK_WEBHOOK_URL }}{% endraw %}
```

The `if` condition supports various contexts:
- `success()` - Previous steps succeeded
- `failure()` - Any previous step failed
- `always()` - Run regardless of previous step status

## Artifacts: Save Your Work

Need to preserve build outputs or test results? Use artifacts:

```yaml
steps:
  - name: Build application
    run: npm run build
    
  - name: Upload build artifacts
    uses: actions/upload-artifact@v4
    with:
      name: build-files
      path: dist/
      
  - name: Upload test results
    uses: actions/upload-artifact@v4
    if: always()
    with:
      name: test-results
      path: test-results.xml
```

Artifacts are stored for 90 days by default and can be downloaded from the workflow run page.

## Deployment Workflow

Here's a practical deployment workflow that only runs when tests pass:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to server
        env:
          DEPLOY_KEY: {% raw %}${{ secrets.DEPLOY_KEY }}{% endraw %}
        run: |
          # Your deployment script
          echo "Deploying to production..."
```

The `needs: test` ensures deployment only happens after tests pass. The `if` condition adds an extra safety check.

## Common Pitfalls to Avoid

### 1. Hardcoding Values
```yaml
# Bad
run: echo "Deploying to https://myapp.com"

# Good
run: echo "Deploying to {% raw %}${{ vars.APP_URL }}{% endraw %}"
```

### 2. Not Using Caching
```yaml
# Slow
- run: npm install

# Fast
- uses: actions/setup-node@v4
  with:
    cache: 'npm'
- run: npm ci
```

### 3. Ignoring Security
```yaml
# Dangerous
run: curl -H "Authorization: Bearer {% raw %}${{ secrets.TOKEN }}{% endraw %}" | bash

# Safer
run: |
  response=$(curl -H "Authorization: Bearer {% raw %}${{ secrets.TOKEN }}{% endraw %}" https://api.example.com)
  echo "$response" | jq '.status'
```

## Architecture Overview

Here's how GitHub Actions fits into your development workflow:

**Developer pushes code**  
&nbsp;&nbsp;&nbsp;&nbsp;↓  
**GitHub receives push event**  
&nbsp;&nbsp;&nbsp;&nbsp;↓  
**Workflow triggers automatically**  
&nbsp;&nbsp;&nbsp;&nbsp;↓  
**Runner starts (Ubuntu/Windows/macOS)**  
&nbsp;&nbsp;&nbsp;&nbsp;↓  
**Steps execute in sequence**  
&nbsp;&nbsp;&nbsp;&nbsp;↓  
**Results reported back to GitHub**  
&nbsp;&nbsp;&nbsp;&nbsp;↓  
**Notifications sent (email/Slack/etc)**

The beauty is that this entire process happens without any manual intervention. You push code, GitHub handles the rest.

## Best Practices for Production

### 1. Use Specific Action Versions
```yaml
# Good
uses: actions/checkout@v4.1.1

# Avoid
uses: actions/checkout@main
```

### 2. Fail Fast
```yaml
strategy:
  fail-fast: true
  matrix:
    node-version: [16, 18, 20]
```

### 3. Set Timeouts
```yaml
jobs:
  test:
    timeout-minutes: 10
    runs-on: ubuntu-latest
```

### 4. Use Environments for Deployments
```yaml
deploy:
  environment: production
  runs-on: ubuntu-latest
```

## Monitoring and Debugging

When workflows fail, GitHub provides detailed logs for each step. Common debugging techniques:

1. **Add debug output**
```yaml
- name: Debug info
  run: |
    echo "GitHub ref: {% raw %}${{ github.ref }}{% endraw %}"
    echo "Event name: {% raw %}${{ github.event_name }}{% endraw %}"
    ls -la
```
2. **Use the GitHub CLI**
```yaml
- name: Check PR status
  run: gh pr view --json state,title
```

3. **Enable debug logging**
<br>
  Set `ACTIONS_STEP_DEBUG` to `true` in repository secrets for verbose output.

## What's Next?

You now have the foundation to automate your development workflow. Start small:

1. Create a basic CI workflow for your current project
2. Add automated testing
3. Set up deployment for a staging environment
4. Gradually add more sophisticated automation

GitHub Actions can do much more than we covered - from managing releases to automating issue responses. But these basics will handle 90% of what most developers need.

---

*Got questions about GitHub Actions or want to share your automation wins? Drop a comment below. And if you found this helpful, consider sharing it with a fellow developer.*
