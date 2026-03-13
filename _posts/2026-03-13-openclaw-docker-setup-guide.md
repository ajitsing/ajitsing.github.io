---
layout: post
seo: true
title: "How to Set Up OpenClaw with Docker"
subtitle: "Docker Compose setup, sandboxing, multi-agent config, and the gotchas nobody tells you about"
date: 2026-03-13
categories: ai
thumbnail-img: /assets/img/posts/artificial-intelligence/openclaw-docker-setup.png
share-img: /assets/img/posts/artificial-intelligence/openclaw-docker-setup.png
permalink: /openclaw-docker-setup/
description: "Complete guide to setting up OpenClaw with Docker. Covers Docker Compose configuration, prebuilt vs local builds, sandboxing, multi-agent setup, local LLMs with Ollama, production hardening, and troubleshooting common issues like exit code 137 and permission denied errors."
keywords: "openclaw docker, openclaw docker setup, openclaw docker compose, how to set up openclaw with docker, openclaw docker install, openclaw docker guide, openclaw docker deploy, openclaw gateway docker, openclaw docker sandbox, openclaw docker troubleshooting, openclaw docker VPS, openclaw docker configuration, self-hosted ai agent docker, ai agent docker setup, openclaw prebuilt image, openclaw docker compose yml, openclaw docker tutorial, openclaw ollama docker, openclaw multi agent docker, openclaw docker production, run openclaw in docker, openclaw docker container, openclaw docker local llm, deploy openclaw docker, openclaw docker security"
tags: [ai, docker]
comments: true
social-share: true

quick-answer: "Clone the repo and run `./docker-setup.sh`, or use a Docker Compose file with the prebuilt image from `ghcr.io/openclaw/openclaw:latest`. The Gateway runs on port **18789** and config persists in `~/.openclaw/` via bind mounts. Use at least **2GB RAM** (1GB hosts will crash with exit code 137). For production, bind to `127.0.0.1`, put a reverse proxy in front, and enable sandboxing to isolate agent tool execution in separate containers."

key-takeaways:
  - "Docker is the recommended way to deploy OpenClaw on servers and VPS environments. It gives you isolation, clean updates, and portability."
  - "Use the prebuilt image from ghcr.io to skip the 30+ minute local build. Set OPENCLAW_IMAGE=ghcr.io/openclaw/openclaw:latest before running the setup script."
  - "The most common setup failure is exit code 137 (OOM kill) on hosts with less than 2GB RAM. Add 3GB swap or switch to the prebuilt image."
  - "Permission denied errors happen because the container runs as the node user (UID 1000). Fix with sudo chown -R 1000:1000 ~/.openclaw."
  - "Sandboxing runs agent tools in separate Docker containers, limiting blast radius when the model does something dumb. It is not a perfect security boundary, but it materially reduces risk."
  - "For production deployments, bind to localhost, use a reverse proxy with TLS, rotate gateway tokens, and set memory limits in your Compose file."

faq:
  - question: "What is OpenClaw Docker?"
    answer: "OpenClaw Docker is the containerized deployment method for OpenClaw, the open-source AI agent platform. Instead of installing OpenClaw directly on your machine with npm, you run it inside a Docker container. This gives you process isolation, easier updates, and the ability to run OpenClaw on servers and VPS environments without polluting the host system."
  - question: "How do I set up OpenClaw with Docker?"
    answer: "The fastest method is to clone the repository and run the setup script: git clone https://github.com/openclaw/openclaw.git, then cd openclaw and run ./docker-setup.sh. This builds the image, runs onboarding, starts the Gateway via Docker Compose, and generates a gateway token. Access the Control UI at http://127.0.0.1:18789/ and paste your token from the .env file."
  - question: "What are the system requirements for OpenClaw Docker?"
    answer: "You need Docker Engine 20.10 or later with Docker Compose v2, at least 2GB RAM (3GB swap recommended), 20GB free disk space, and an API key from an AI provider like Anthropic, OpenAI, or OpenRouter. Hosts with only 1GB RAM will fail during the build with exit code 137 (out of memory)."
  - question: "Should I use the prebuilt image or build locally?"
    answer: "Use the prebuilt image from ghcr.io/openclaw/openclaw:latest unless you need custom modifications. Local builds take 30+ minutes and require at least 2GB RAM. The prebuilt image is already optimized at around 2.7GB and skips the lengthy build process entirely."
  - question: "How do I fix OpenClaw Docker permission denied errors?"
    answer: "The container runs as the node user with UID 1000. If your config directory was created by root, the container cannot write to it. Fix this by running sudo chown -R 1000:1000 ~/.openclaw. For specific directories, also set chmod 600 on openclaw.json and chmod 700 on the credentials directory."
  - question: "What is OpenClaw Docker sandboxing?"
    answer: "Sandboxing is an optional feature that runs agent tool execution (file operations, shell commands, browser automation) inside separate Docker containers instead of on the host. This limits the blast radius when the AI model makes mistakes. The Gateway always stays on the host. Configure it with agents.defaults.sandbox.mode set to all, non-main, or off."
  - question: "How do I run OpenClaw with local models using Docker?"
    answer: "Install Ollama on your host, pull a model like llama3.1:8b, then configure OpenClaw to use http://host.docker.internal:11434/v1 as the base URL. Set any non-empty string as the API key since Ollama does not validate it. This gives you a fully local AI agent with zero API costs."
  - question: "How do I update OpenClaw Docker?"
    answer: "Pull the latest image and recreate the container: docker compose down, then docker compose pull, then docker compose up -d. Your configuration and workspace persist in bind-mounted volumes so nothing is lost during updates."

citations:
  - name: "Docker Installation - OpenClaw Official Documentation"
    url: "https://docs.openclaw.ai/install/docker"
    author: "OpenClaw"
  - name: "Run OpenClaw Securely in Docker Sandboxes"
    url: "https://www.docker.com/blog/run-openclaw-securely-in-docker-sandboxes/"
    author: "Docker"
  - name: "Sandboxing - OpenClaw Documentation"
    url: "https://docs.openclaw.ai/gateway/sandboxing"
    author: "OpenClaw"
  - name: "OpenClaw Architecture and Insights"
    url: "https://navant.github.io/posts/openclaw-architecture-and-insights/"
    author: "techaways"
  - name: "Docker Volume Permissions for OpenClaw on Linux"
    url: "https://lucaberton.com/blog/docker-volume-permissions-for-openclaw-on-linux/"
    author: "Luca Berton"
  - name: "The OpenClaw Hardening Guide"
    url: "https://clawctl.com/blog/openclaw-hardening-guide"
    author: "Clawctl"
---

This guide covers everything for developers who want to get OpenClaw running in Docker without the trial-and-error phase: the quick path, the production path, sandboxing, multi-agent configuration, local LLMs, and every gotcha you hit along the way.

If you are new to OpenClaw, read [How to Run Your Own AI Agent with Cloudflare Moltworker](/moltworker-self-hosted-ai-agent/) first for the architecture overview. If you need a refresher on Docker itself, the [Docker Cheat Sheet](/devops/docker-cheat-sheet/) has every command you will need.

> **TL;DR**: Clone the repo and run `./docker-setup.sh`, or write a Docker Compose file pointing at the prebuilt image `ghcr.io/openclaw/openclaw:latest`. The Gateway listens on port 18789. Config lives in `~/.openclaw/` and survives container restarts via bind mounts. Use 2GB+ RAM (1GB hosts crash with exit code 137). For production, bind to localhost, add a reverse proxy, enable sandboxing, and set resource limits. The prebuilt image saves 30+ minutes over local builds.

---

## <i class="fas fa-th-large"></i> How OpenClaw Docker Works

Before jumping into commands, it helps to understand what is actually running inside the container.

OpenClaw's Docker deployment has two layers. The **Gateway** is a long-running WebSocket server that handles connections, routes messages, and coordinates AI sessions. It always runs on the host (or inside the main container). The optional **sandbox containers** handle tool execution (file reads, shell commands, browser automation) in isolation.

<pre><code class="language-mermaid">
flowchart LR
    subgraph Channels["fa:fa-comments Channels"]
        TG["fa:fa-paper-plane Telegram"]
        SL["fa:fa-hashtag Slack"]
        DC["fa:fa-headset Discord"]
        WA["fa:fa-comment WhatsApp"]
    end

    subgraph Host["fa:fa-server Docker Host"]
        Gateway["fa:fa-plug Gateway\n:18789"]

        subgraph Sandbox["fa:fa-shield-alt Sandboxed Tools"]
            S1["fa:fa-terminal Session 1"]
            S2["fa:fa-terminal Session 2"]
        end
    end

    subgraph Output["  "]
        Providers["fa:fa-brain AI Providers\nAnthropic / OpenAI / Ollama"]
        Storage["fa:fa-hdd Persistent Storage\n~/.openclaw/"]
    end

    Channels --> Gateway
    Gateway --> Sandbox
    Gateway --> Providers
    Gateway --> Storage

    style Channels fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style Host fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Sandbox fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style Output fill:none,stroke:none
    style Providers fill:#f5f5f5,stroke:#424242,stroke-width:2px
    style Storage fill:#f5f5f5,stroke:#424242,stroke-width:2px
    style Gateway fill:#bbdefb,stroke:#1565c0,stroke-width:2px
</code></pre>

The Gateway itself does not do AI processing. It accepts inputs from messaging channels, manages WebSocket connections, and routes traffic to AI providers like Anthropic, OpenAI, or a local Ollama instance. The architecture is a hub-and-spoke design with strict separation between the interface layer and the intelligence layer.

Two directories get bind-mounted from the host: `~/.openclaw/` holds config files, credentials, memory, and logs. `~/.openclaw/workspace/` is the agent's working directory. Both survive container restarts and updates.

---

## <i class="fas fa-clipboard-list"></i> Prerequisites

Before starting, make sure you have:

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Docker Engine | 20.10+ | Latest stable |
| Docker Compose | v2 | v2 |
| RAM | 2 GB | 4 GB |
| Swap | None | 3 GB |
| Disk space | 10 GB | 20 GB |
| API key | One provider | Multiple providers |

You need at least one AI provider API key. [Anthropic](https://console.anthropic.com/), [OpenAI](https://platform.openai.com/), or [OpenRouter](https://openrouter.ai/) all work. If you want to skip API costs entirely, you can use Ollama with local models instead (covered later in this guide).

Check your Docker and Compose versions:

```bash
docker --version
docker compose version
```

If `docker compose version` prints a version starting with `v2`, you are good. If it says `command not found`, you need to install Compose v2. The old `docker-compose` (with a hyphen) is Compose v1, which was deprecated in 2023 and reached end-of-life in 2024. OpenClaw requires v2.

### Installing Docker Compose v2

**macOS / Windows**: Install or update [Docker Desktop](https://www.docker.com/products/docker-desktop/). Compose v2 is included out of the box.

**Linux (Ubuntu/Debian)**:

```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

**Linux (manual install)**:

```bash
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
  -o $DOCKER_CONFIG/cli-plugins/docker-compose
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```

Verify after install:

```bash
docker compose version
# Docker Compose version v2.x.x
```

---

## <i class="fas fa-rocket"></i> Method 1: The Quick Setup Script

This is the officially recommended path. It handles image building, onboarding, and token generation in one shot.

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
./docker-setup.sh
```

The script does four things in order:

1. Generates a 64-character gateway token using `openssl rand -hex 32`
2. Builds the Docker image locally (or pulls the prebuilt one)
3. Runs the interactive onboarding wizard
4. Starts the Gateway via Docker Compose

After it finishes, open `http://127.0.0.1:18789/` in your browser. You will see the OpenClaw Control UI. Paste the gateway token from the `.env` file to complete pairing.

### Skip the Long Build

Local builds take 30+ minutes and eat 2GB+ of RAM. A single `chown` step in the Dockerfile recursively changes ownership across the entire `/app` directory, which is painfully slow. If your host has limited resources, skip it entirely:

```bash
export OPENCLAW_IMAGE="ghcr.io/openclaw/openclaw:latest"
./docker-setup.sh
```

This pulls the prebuilt image from GitHub Container Registry (about 2.7GB) instead of building locally. The image is already optimized with proper file ownership baked in.

### If Pairing Fails

There is a known issue where the setup script generates a 64-character token but the onboarding wizard ignores it and creates its own 48-character token. This causes a token mismatch, and CLI commands fail with `unauthorized: device token mismatch`.

Fix it with the recovery flow:

```bash
docker compose run --rm openclaw-cli devices list
docker compose run --rm openclaw-cli devices approve <requestId>
```

---

## <i class="fas fa-file-code"></i> Method 2: Docker Compose from Scratch

If you want full control over the configuration, write your own Compose file. This is the method you use for production.

### Basic Compose File

Create a project directory and add two files:

**docker-compose.yml**:

```yaml
services:
  openclaw:
    image: ghcr.io/openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "127.0.0.1:18789:18789"
    volumes:
      - ${HOME}/.openclaw:/home/node/.openclaw
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    mem_limit: 2g
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

**.env**:

```
ANTHROPIC_API_KEY=your-key-here
OPENAI_API_KEY=your-key-here
```

Start it:

```bash
docker compose up -d
docker compose logs -f openclaw
```

Three things to note about this configuration.

**Port binding to 127.0.0.1.** The `127.0.0.1:18789:18789` binding means the Gateway is only accessible from localhost. If you bind to `0.0.0.0` (or omit the IP), anyone on the network can reach your agent. On a VPS with a public IP, this is a security hole. Always bind to localhost and put a reverse proxy in front for external access.

**Volume mount path.** Inside the container, OpenClaw runs as the `node` user with its home at `/home/node`. The config directory is `/home/node/.openclaw`. Your host-side `~/.openclaw` maps directly to it.

**Memory limit.** The `mem_limit: 2g` prevents runaway memory usage from killing other services on the host. Adjust based on your workload, but do not go below 1.5GB.

### Running Onboarding

If this is a fresh install, run the onboarding wizard:

```bash
docker compose exec openclaw openclaw onboard
```

This walks you through setting your API keys, gateway port, communication channels (Telegram, WhatsApp, Discord, etc.), and generates the gateway token.

### Common Compose Operations

```bash
# Check status
docker compose ps

# Follow logs
docker compose logs -f openclaw

# Restart after config changes
docker compose restart openclaw

# Update to latest image
docker compose down
docker compose pull
docker compose up -d

# Shell into the container
docker compose exec openclaw sh
```

For a full list of Docker Compose commands, see the [Docker Cheat Sheet](/devops/docker-cheat-sheet/#docker-compose).

---

## <i class="fas fa-shield-alt"></i> Setting Up Sandboxing

Sandboxing is where OpenClaw Docker gets interesting. Instead of running all agent tools directly on the host, you can isolate tool execution in separate Docker containers. This means a rogue `rm -rf` from a hallucinating model damages a throwaway container, not your server.

The [Docker blog](https://www.docker.com/blog/run-openclaw-securely-in-docker-sandboxes/) published an official guide on this because it matters. If you are running OpenClaw in production or giving it access to sensitive files, enable sandboxing.

### How Sandboxing Works

<pre><code class="language-mermaid">
flowchart LR
    subgraph Host["fa:fa-server Host"]
        Gateway["fa:fa-plug Gateway\n(Always on host)"]
    end

    subgraph Containers["fa:fa-cubes Sandbox Containers"]
        S1["fa:fa-terminal Session 1\nread, write, exec"]
        S2["fa:fa-terminal Session 2\nread, write, exec"]
        S3["fa:fa-globe Browser\nautomation"]
    end

    Gateway -->|"Delegates tools"| S1
    Gateway -->|"Delegates tools"| S2
    Gateway -->|"Delegates tools"| S3

    style Host fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Containers fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style Gateway fill:#bbdefb,stroke:#1565c0
    style S1 fill:#ffe0b2,stroke:#e65100
    style S2 fill:#ffe0b2,stroke:#e65100
    style S3 fill:#ffe0b2,stroke:#e65100
</code></pre>

The Gateway stays on the host. It handles connections and routing. When an agent needs to read a file, write code, or execute a shell command, that operation runs inside a sandbox container. If the sandbox crashes or gets corrupted, the Gateway keeps running and spins up a new one.

### What Gets Sandboxed

| Inside Sandbox | Outside Sandbox |
|----------------|-----------------|
| File read/write/edit | Gateway process |
| Shell execution (exec, bash) | Elevated tools (explicit host access) |
| Process management | Tools explicitly allowed on host |
| Browser automation | |

### Configuration

Add sandbox settings to your `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "all",
        "scope": "session",
        "workspaceAccess": "ro"
      }
    }
  }
}
```

The three controls:

**Mode** determines when sandboxing activates:
- `"all"`: Every session gets its own sandbox
- `"non-main"`: Only non-main sessions (group chats, channels) are sandboxed
- `"off"`: Everything runs on the host

**Scope** determines container allocation:
- `"session"`: One container per session (most isolated, default)
- `"agent"`: One container per agent
- `"shared"`: One container for all sandboxed sessions

**Workspace access** controls what the sandbox can see:
- `"none"`: Sandbox gets its own isolated workspace (most secure, default)
- `"ro"`: Read-only access to the agent workspace at `/agent`
- `"rw"`: Read-write access at `/workspace`

For most setups, `mode: "all"` with `workspaceAccess: "ro"` is the right balance. The agent can read your files but cannot modify them from inside the sandbox.

### Quick Sandbox Enable

If you used `docker-setup.sh`, you can also enable sandboxing with an environment variable:

```bash
OPENCLAW_SANDBOX=1 ./docker-setup.sh
```

### Custom Bind Mounts

If you need the sandbox to access specific host directories (like a source code folder), use `docker.binds`:

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "all",
        "docker": {
          "binds": ["/home/user/projects:/projects:ro"]
        }
      }
    }
  }
}
```

Use `:ro` (read-only) for anything containing source code or secrets. Bind mounts pierce the sandbox boundary, so treat them carefully.

The OpenClaw docs say it best: sandboxing is "not a perfect security boundary, but it materially limits filesystem and process access when the model does something dumb." It is defense in depth, not a fortress. For more on the security model behind AI agent sandboxing, see how [Perplexity Personal Computer handles isolation](/perplexity-computer-explained/#safety-and-security-architecture) with Firecracker VMs.

---

## <i class="fas fa-users"></i> Multi-Agent Setup

OpenClaw supports multiple agents with independent configurations, credentials, and security profiles. This is useful when you want a personal assistant with full access alongside a family or team agent with restricted permissions.

### Per-Agent Configuration

Each agent gets its own directory under `~/.openclaw/agents/<agentId>/`:

```
~/.openclaw/
├── openclaw.json          # Global config
├── agents/
│   ├── main/
│   │   └── agent/
│   │       └── auth-profiles.json
│   ├── family/
│   │   └── agent/
│   │       └── auth-profiles.json
│   └── work/
│       └── agent/
│           └── auth-profiles.json
```

Credentials are not shared between agents. Each agent reads from its own `auth-profiles.json`. To share credentials, copy the file manually.

### Example: Three Agents with Different Security Profiles

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "non-main",
        "scope": "agent"
      }
    },
    "list": [
      {
        "id": "main",
        "sandbox": { "mode": "off" }
      },
      {
        "id": "family",
        "sandbox": {
          "mode": "all",
          "scope": "agent",
          "workspaceAccess": "none"
        },
        "tools": {
          "allow": ["read", "search_web"],
          "deny": ["exec", "write", "apply_patch"]
        }
      },
      {
        "id": "work",
        "sandbox": {
          "mode": "all",
          "scope": "session"
        },
        "tools": {
          "allow": ["group:fs", "group:web"],
          "deny": ["group:runtime"]
        }
      }
    ]
  }
}
```

The `main` agent runs unsandboxed with full access for personal use. The `family` agent is fully sandboxed with read-only tools and no shell access. The `work` agent gets filesystem and web tools but no runtime execution.

Tool groups like `group:fs`, `group:runtime`, and `group:web` simplify configuration. Instead of listing individual tools, you allow or deny entire categories.

### Debugging Effective Permissions

Not sure what a specific agent can actually do? OpenClaw has a built-in command for that:

```bash
docker compose exec openclaw openclaw sandbox explain
```

This shows the effective sandbox mode, tool permissions, and workspace access for each configured agent.

---

## <i class="fas fa-microchip"></i> Running with Local LLMs (No API Key Required)

If you want to run OpenClaw entirely locally without sending data to cloud providers, pair it with Ollama. No API costs, full data privacy, and the setup takes five minutes.

### Install Ollama on Your Host

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.1:8b
ollama serve
```

### Configure OpenClaw to Use Ollama

Add this to your `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "ollama": {
        "baseUrl": "http://host.docker.internal:11434/v1",
        "apiKey": "ollama-local",
        "api": "openai-responses"
      }
    }
  }
}
```

Two details that trip people up:

**The base URL must use `host.docker.internal`**, not `127.0.0.1`. Inside a Docker container, `127.0.0.1` points to the container itself, not the host. `host.docker.internal` is a special DNS name that Docker provides to reach the host machine.

**The API key can be any non-empty string.** Ollama does not validate API keys. The value `"ollama-local"` is a convention, but `"anything"` works too. OpenClaw requires the field to be present, so you cannot leave it blank.

### Hardware Requirements for Local Models

| Model Size | RAM Required | Speed (M4 Pro) |
|-----------|-------------|-----------------|
| 7-8B params | 8 GB | 30-40 tokens/sec |
| 13-14B params | 16 GB | 15-25 tokens/sec |
| 30-32B params | 32-64 GB | 10-15 tokens/sec |

For a local-only setup that is actually usable, a 14B parameter model on 16GB RAM is the sweet spot. Below that, the agent's reasoning quality drops noticeably. Above that, you need serious hardware. For detailed benchmarks across different hardware, see [Local LLM Speed: Real Benchmark Results](/llm-inference-speed-comparison/).

For comparison, here is how [Perplexity's Personal Computer](/perplexity-computer-explained/) solves this differently: they keep the Mac mini as the local interface but route all AI processing to cloud servers running 19 different models. The local-cloud hybrid avoids the hardware limitation entirely.

---

## <i class="fas fa-server"></i> Production Deployment on a VPS

Running OpenClaw on a VPS gives you a 24/7 always-on agent without leaving a laptop running. A $6/month VPS with 2GB RAM handles a single agent comfortably.

### Production Compose File

```yaml
services:
  openclaw:
    image: ghcr.io/openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "127.0.0.1:18789:18789"
    volumes:
      - ${HOME}/.openclaw:/home/node/.openclaw
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    mem_limit: 2g
    memswap_limit: 3g
    cpus: 1.5
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:18789/health"]
      interval: 60s
      timeout: 10s
      retries: 3
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

This adds three things over the basic setup:

**Health checks** ping the Gateway every 60 seconds. If three consecutive checks fail, Docker marks the container as unhealthy and the `unless-stopped` restart policy brings it back.

**Memory + swap limits** prevent the container from consuming all host resources. The 3GB swap gives breathing room during memory spikes without letting it run away.

**Log rotation** caps log files at 10MB with three rotations. Without this, logs grow until your disk fills up.

### Reverse Proxy with Caddy

Put Caddy or Nginx in front of the Gateway for TLS and authentication:

```yaml
services:
  openclaw:
    image: ghcr.io/openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "127.0.0.1:18789:18789"
    volumes:
      - ${HOME}/.openclaw:/home/node/.openclaw
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    mem_limit: 2g

  caddy:
    image: caddy:2
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data

volumes:
  caddy_data:
```

**Caddyfile**:

```
openclaw.yourdomain.com {
    reverse_proxy openclaw:18789
}
```

Caddy handles TLS certificates automatically via Let's Encrypt. Replace `openclaw.yourdomain.com` with your actual domain.

### Security Hardening Checklist

Before exposing your OpenClaw instance:

- Bind Gateway to `127.0.0.1`, not `0.0.0.0`
- Put a reverse proxy with TLS in front
- Generate a strong gateway token (`openssl rand -hex 32`)
- Set `mem_limit` and `cpus` in Compose
- Enable log rotation
- Enable sandboxing for tool execution
- Restrict tool permissions with `tools.allow`/`tools.deny`
- Set up firewall rules (allow only 80/443 inbound)
- Store API keys in `.env` with `chmod 600`

For a deeper look at security architecture in AI agent systems, see the security section in [Prompt Injection Explained](/prompt-injection-explained/) and the credential isolation patterns in [Perplexity Computer](/perplexity-computer-explained/#safety-and-security-architecture).

---

## <i class="fas fa-wrench"></i> Troubleshooting

These are the issues I hit and the fixes that actually work.

### Exit Code 137 (Container Killed)

**Symptom**: Container starts, runs for a few seconds, then exits with code 137.

**Cause**: The Linux OOM killer terminated the process because it exceeded available memory. This happens during image builds on 1GB hosts and occasionally at runtime with large context windows.

```bash
# Confirm it was an OOM kill
docker inspect openclaw --format '{% raw %}{{.State.OOMKilled}}{% endraw %}'

# Check kernel logs
dmesg | grep -i "oom"
```

**Fix**:

1. Switch to the prebuilt image to skip the memory-hungry build step
2. Add swap space:
```bash
sudo fallocate -l 3G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
3. Increase `mem_limit` in your Compose file

### Permission Denied (EACCES)

**Symptom**: Container crashes with `Error: EACCES: permission denied` when trying to read or write `openclaw.json`, memory files, or logs.

**Cause**: UID mismatch. The container runs as the `node` user with UID 1000. If the host directories were created by root (UID 0), the container cannot write to them.

**Fix**:

```bash
sudo chown -R 1000:1000 ~/.openclaw

# Set proper permissions
chmod 600 ~/.openclaw/openclaw.json
chmod 700 ~/.openclaw/credentials
chmod 770 ~/.openclaw/memory
```

Verify the fix:

```bash
docker exec -it openclaw sh -c 'echo test > /home/node/.openclaw/memory/test && echo "OK" && rm /home/node/.openclaw/memory/test'
```

### Gateway Token Mismatch

**Symptom**: CLI commands fail with `unauthorized: device token mismatch`. The Control UI shows "pairing required" even after pasting the token.

**Cause**: The setup script generates a 64-character token, but the QuickStart onboarding wizard ignores it and creates its own 48-character token. They do not match.

**Fix**:

```bash
# List pending device requests
docker compose run --rm openclaw-cli devices list

# Approve the request
docker compose run --rm openclaw-cli devices approve <requestId>
```

Alternatively, copy the token from `~/.openclaw/openclaw.json` (the one the wizard created) and use that instead of the one in `.env`.

### Container Keeps Restarting

**Symptom**: `docker compose ps` shows the container restarting in a loop.

**Cause**: Usually a bad config file or missing API key.

```bash
# Check logs for the actual error
docker compose logs --tail 50 openclaw

# Run without restart policy to see the error
docker compose run --rm openclaw openclaw gateway start
```

Common causes:
- Missing or invalid API key in environment variables
- Malformed `openclaw.json` (invalid JSON)
- Port 18789 already in use by another process

### Slow or Hanging Builds

**Symptom**: `docker build` hangs for 30+ minutes.

**Cause**: The Dockerfile runs a recursive `chown` on the entire `/app` directory, which is extremely slow with large `node_modules`.

**Fix**: Use the prebuilt image. If you must build locally, make sure you have at least 2GB RAM and check that Docker has enough disk space:

```bash
docker system df
docker system prune -a  # Removes unused images and containers
```

---

## <i class="fas fa-sync-alt"></i> Keeping OpenClaw Updated

### Manual Update

```bash
docker compose down
docker compose pull
docker compose up -d
```

Your config and workspace persist in bind-mounted volumes, so nothing is lost during updates.

### Automated Updates with Watchtower

Add Watchtower to your Compose file to check for new images daily:

```yaml
services:
  openclaw:
    image: ghcr.io/openclaw/openclaw:latest
    # ... your existing config ...

  watchtower:
    image: containrrr/watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_POLL_INTERVAL=86400
      - WATCHTOWER_LABEL_ENABLE=false
    command: openclaw
```

This checks for updates every 24 hours, pulls the new image, recreates the container, and cleans up the old image. The `command: openclaw` argument tells Watchtower to only watch the `openclaw` container, not every container on the host.

A word of caution: Watchtower was archived in December 2025. It still works, but for production environments that need rollback capability and zero-downtime updates, use a CI/CD pipeline instead.

---

## <i class="fas fa-graduation-cap"></i> What I Learned Setting This Up

A few lessons that apply beyond OpenClaw:

### 1. Prebuilt Images Save More Than Time

The 30-minute local build is not just slow. It is fragile. It requires 2GB RAM, breaks on low-disk hosts, and the recursive `chown` step is a known pain point with an open GitHub issue. Using prebuilt images is not lazy. It is the right engineering decision for anything that is not a custom fork.

### 2. Volume Permissions Are Always the Problem

Every containerized application that runs as a non-root user hits the UID mismatch issue. It is not specific to OpenClaw. The fix is always the same: match the container's UID to the host directory ownership. Docker still does not have a great solution for this. Know the pattern, because you will see it everywhere. For more on Docker volume management, see [Volumes and Data Persistence](/devops/docker-cheat-sheet/#volumes-and-data-persistence) in the Docker Cheat Sheet.

### 3. Bind to Localhost, Always

The number of tutorials that show `ports: - "18789:18789"` without the `127.0.0.1:` prefix is alarming. That binds to all interfaces. On a VPS with a public IP, your agent is now accessible to the internet with nothing but a gateway token between it and the world. Always bind to localhost and use a reverse proxy.

### 4. Sandboxing Is Not Optional for Production

If your agent can execute shell commands, it can delete files, install packages, and make network requests. Sandboxing does not make this impossible, but it limits the damage to a throwaway container. The same principle applies to any system where untrusted input controls execution: contain the blast radius. This is the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) applied to AI agents, the same concept that [Perplexity Computer uses with Firecracker VMs](/perplexity-computer-explained/).

### 5. Memory Limits Are Guardrails, Not Suggestions

LLM conversations with large context windows can spike memory usage unexpectedly. Without `mem_limit` in your Compose file, one long conversation can consume all available RAM and take down other services on the host. Set limits, add swap, and monitor. This is basic [container resource management](/devops/docker-cheat-sheet/#resource-management) but it is easy to forget.

### 6. Three Security Layers, Not One

OpenClaw separates security into three independent controls: sandbox (where tools run), tool policy (which tools are available), and elevated mode (escape hatch for host execution). This layered approach is the right model. No single control is enough. If you are building systems that give AI models tool access, study how OpenClaw structures these layers. For the broader context on why layered security matters for AI systems, see [Prompt Injection Explained](/prompt-injection-explained/).

---

## Quick Reference

### Essential Commands

| Task | Command |
|------|---------|
| Start gateway | `docker compose up -d` |
| View logs | `docker compose logs -f openclaw` |
| Stop gateway | `docker compose down` |
| Restart | `docker compose restart openclaw` |
| Shell access | `docker compose exec openclaw sh` |
| Run onboarding | `docker compose exec openclaw openclaw onboard` |
| Check sandbox | `docker compose exec openclaw openclaw sandbox explain` |
| Update | `docker compose down && docker compose pull && docker compose up -d` |

### Key File Paths

| Path (Host) | Path (Container) | Purpose |
|-------------|-------------------|---------|
| `~/.openclaw/` | `/home/node/.openclaw/` | Config, credentials, memory, logs |
| `~/.openclaw/openclaw.json` | `/home/node/.openclaw/openclaw.json` | Main configuration file |
| `~/.openclaw/workspace/` | `/home/node/.openclaw/workspace/` | Agent working directory |
| `~/.openclaw/agents/` | `/home/node/.openclaw/agents/` | Per-agent configs and credentials |

### Port Reference

| Port | Service |
|------|---------|
| 18789 | Gateway + Control UI |
| 11434 | Ollama (if using local models) |

---

## Related Posts

These go deeper on the topics covered here:

**OpenClaw and AI Agents**:
- [How to Run Your Own AI Agent with Cloudflare Moltworker](/moltworker-self-hosted-ai-agent/) - OpenClaw architecture, Gateway pattern, and serverless deployment
- [How Perplexity Personal Computer Works](/perplexity-computer-explained/) - The managed alternative to self-hosted agents, with 19-model orchestration

**Docker**:
- [Docker Cheat Sheet](/devops/docker-cheat-sheet/) - 100+ Docker commands with real examples

**Security**:
- [Prompt Injection Explained](/prompt-injection-explained/) - The #1 security threat to AI applications and how to defend against it

---

OpenClaw in Docker is the best way to run a self-hosted AI agent on a server. The prebuilt image, proper volume mounts, and sandboxing give you a setup that is isolated, updatable, and production-ready. Start with the basic Compose file, add sandboxing once you are comfortable, and harden for production before exposing it to the network.

*Running OpenClaw on Docker? Hit an issue not covered here? Drop it in the comments.*
