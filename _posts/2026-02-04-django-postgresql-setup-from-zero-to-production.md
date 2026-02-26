---
layout: post
title: "Django PostgreSQL Setup: From Zero to Production"
subtitle: "Connect Django to PostgreSQL, run migrations, and get it ready for production"
description: "Create a Django + PostgreSQL setup from scratch: uv and django-admin, create database and user, and configure settings.py in detail. Covers DATABASES keys, OPTIONS, env vars, split settings, migrations, and production (CONN_MAX_AGE, PgBouncer, SSL)."
date: 2026-02-04
categories: database
thumbnail-img: /assets/img/posts/database/django-postgresql-setup.png
share-img: /assets/img/posts/database/django-postgresql-setup.png
permalink: /django-postgresql-setup-from-zero-to-production/
keywords: "django postgresql, django postgresql setup, connect django to postgresql, django postgres, django database postgresql, django postgresql tutorial, django settings.py postgresql, psycopg2 django, django postgresql connection, django postgresql production, django migrate postgresql, django postgresql install, use postgresql with django, django postgresql configuration, postgresql django backend, django database configuration"
comments: true
seo: true
social-share: true
tags: [database, django, python, postgresql]

quick-answer: "Create the project with **uv init**, **uv add django psycopg2-binary**, and **django-admin startproject config .** Create a PostgreSQL database and user, then in **config/settings.py** set DATABASES with ENGINE django.db.backends.postgresql, NAME, USER, PASSWORD, HOST, PORT (use os.environ for credentials). Run **uv run python manage.py migrate** and verify with **manage.py dbshell**. For production, use CONN_MAX_AGE or PgBouncer and SSL in OPTIONS."

key-takeaways:
  - "Django connects to PostgreSQL via the psycopg2 driver; you configure DATABASES in config/settings.py (or your project's settings module)"
  - "Create the database and a dedicated user in PostgreSQL first; Django does not create the database for you"
  - "Every DATABASES key (ENGINE, NAME, USER, PASSWORD, HOST, PORT) is required; OPTIONS is passed through to psycopg2 (e.g. sslmode, connect_timeout, statement_timeout)"
  - "Use environment variables for credentials. Optionally split settings into base/local/production and set DJANGO_SETTINGS_MODULE"
  - "Run migrate to create tables; use dbshell or connection.ensure_connection() to verify the setup"
  - "For production: use CONN_MAX_AGE for connection reuse or PgBouncer for a shared pool; set SSL and statement_timeout in OPTIONS as needed"

faq:
  - question: "How do I connect Django to PostgreSQL?"
    answer: "Install psycopg2 (uv add psycopg2-binary), create a database and user in PostgreSQL, then in settings.py set DATABASES default ENGINE to django.db.backends.postgresql with NAME, USER, PASSWORD, HOST, and PORT. Run python manage.py migrate to create the tables."
  - question: "What is the difference between psycopg2 and psycopg2-binary?"
    answer: "psycopg2-binary ships with its own PostgreSQL client libraries so you do not need to install libpq-dev. It is easier for local development. For production, some teams prefer psycopg2 (without binary) and install libpq-dev on the server for fewer dependency issues. Both work with Django."
  - question: "How do I run Django migrations with PostgreSQL?"
    answer: "After configuring DATABASES for PostgreSQL, run python manage.py migrate. Django creates the auth, sessions, and other built-in tables, plus any tables from your apps. Use python manage.py makemigrations when you change models, then migrate again."
  - question: "Why does Django recommend PostgreSQL for production?"
    answer: "PostgreSQL handles concurrent writes better than SQLite, supports advanced types (JSONB, arrays, full-text search), and scales to larger datasets. Django's ORM is tested heavily against PostgreSQL and several features (like ArrayField, JSONField with indexing) are built with PostgreSQL in mind."
  - question: "What is CONN_MAX_AGE in Django?"
    answer: "CONN_MAX_AGE is the number of seconds Django keeps a database connection open. Default is 0 (close after each request). Setting it to 60 or 300 reuses connections and reduces overhead. Do not set it too high with many gunicorn workers or you can hit the database connection limit. For high concurrency, use PgBouncer instead."
  - question: "How do I fix 'too many connections' with Django and PostgreSQL?"
    answer: "Lower CONN_MAX_AGE or set it to 0 so each request closes its connection. Reduce the number of gunicorn/uwsgi workers, or put a connection pooler (PgBouncer) between Django and PostgreSQL. See our post on how OpenAI scales PostgreSQL for connection pooling details."
  - question: "Can I use Django with PostgreSQL on Windows?"
    answer: "Yes. Install PostgreSQL for Windows and psycopg2-binary. Point Django to localhost and port 5432. If you hit install issues with psycopg2, use psycopg2-binary; it includes prebuilt binaries."
---

Django ships with SQLite out of the box. When you need real concurrency or are ready to deploy, you switch to DBs like PostgreSQL. This guide walks through creating a Django project from scratch and wiring it to PostgreSQL: project layout, database and user creation, and a detailed look at `settings.py` so you know exactly what each option does and where to put it.

> **TL;DR**: Create a Django project with uv, add psycopg2-binary, create a database and user in PostgreSQL, then set `DATABASES` in `settings.py` (ENGINE, NAME, USER, PASSWORD, HOST, PORT). Run `migrate` and you have a working Django PostgreSQL setup.

## Table of Contents

- [What You Need](#what-you-need)
- [Step 1: Create the Project with uv and Django](#step-1-create-the-project-with-uv-and-django)
- [Step 2: Create the PostgreSQL Database and User](#step-2-create-the-postgresql-database-and-user)
- [Step 3: Configure Django settings.py](#step-3-configure-django-settingspy)
  - [The DATABASES setting, key by key](#the-databases-setting-key-by-key)
  - [OPTIONS for PostgreSQL](#options-for-postgresql)
  - [Query timeout and retries](#query-timeout-and-retries)
  - [One settings file or split by environment?](#one-settings-file-or-split-by-environment)
  - [Using a DATABASE_URL](#using-a-database_url-eg-heroku-render)
- [Step 4: Run Migrations and Verify](#step-4-run-migrations-and-verify)
  - [How migrations work and creating the first migration](#how-migrations-work-and-creating-the-first-migration)
  - [Apply migrations and verify](#apply-migrations-and-verify)
- [Optional: First App and a Model](#optional-first-app-and-a-model)
- [Production Configuration](#production-configuration)
  - [Credentials](#credentials)
  - [Connection pooling](#connection-pooling)
  - [SSL and debugging](#ssl-and-debugging)
- [Avoiding N+1 Queries](#avoiding-n1-queries)
- [Summary](#summary)

## What You Need

You need Python 3.10+, [uv](https://docs.astral.sh/uv/) (install with `curl -LsSf https://astral.sh/uv/install.sh | sh`), and PostgreSQL installed and running.

- **macOS:** `brew install postgresql@16` then `brew services start postgresql@16`
- **Ubuntu/Debian:** `sudo apt install postgresql postgresql-contrib` then `sudo systemctl start postgresql`
- **Docker:** `docker run -d --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16`. From Django use `HOST=localhost`; from another container use `host.docker.internal`. Default port is 5432.

If you are new to PostgreSQL, the [PostgreSQL Cheat Sheet](/postgresql-cheat-sheet/) has the commands for creating databases and users. Bookmark it; you will use it when you tune queries or debug connection issues.

Django does not talk to PostgreSQL directly. It uses the psycopg2 driver. You set the connection in `settings.py`; Django and psycopg2 do the rest.

```mermaid
flowchart LR
    subgraph App["Django"]
        ORM[fa:fa-code ORM]
        Settings[fa:fa-cog settings.py]
    end

    subgraph Driver["Driver"]
        Psyco[fa:fa-plug psycopg2]
    end

    subgraph DB["Database"]
        PG[(fa:fa-database PostgreSQL)]
    end

    ORM --> Settings
    Settings --> Psyco
    Psyco -->|TCP 5432| PG

    style ORM fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Settings fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style Psyco fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style PG fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

Request hits Django. Django reads `settings.py`, opens a connection via psycopg2, and talks to PostgreSQL on port 5432. That is the whole chain.

## Step 1: Create the Project with uv and Django

Create a new directory and a Python project with uv. uv creates a virtual environment and a `pyproject.toml` for you.

```bash
mkdir myapp && cd myapp
uv init
```

Add Django and the PostgreSQL adapter. You need both: Django is the framework, psycopg2 is the driver that talks to PostgreSQL.

```bash
uv add django psycopg2-binary
```

The `-binary` variant ships with compiled PostgreSQL client libraries, so you do not need `libpq-dev` on your machine. On a Linux server some teams use `uv add psycopg2` (no binary) and install `libpq-dev` so the driver links to the system client. Both work with Django.

Create the Django project. The trailing dot creates the project in the current directory so you get a flat layout with `manage.py` at the root.

```bash
uv run django-admin startproject config .
```

This creates:

- `manage.py` – entry point for Django commands.
- `config/` – the project package, with `__init__.py`, `settings.py`, `urls.py`, `asgi.py`, `wsgi.py`.

Your layout looks like this:

```
myapp/
  manage.py
  pyproject.toml
  config/
    __init__.py
    settings.py   <-- database config goes here
    urls.py
    asgi.py
    wsgi.py
```

Django loads settings from the module in `DJANGO_SETTINGS_MODULE`. When you run `uv run python manage.py runserver`, that defaults to `config.settings`. The file you edit is `config/settings.py`.

## Step 2: Create the PostgreSQL Database and User

One thing that trips people up: Django does not create the database. You create it once in PostgreSQL and give Django the name and credentials. The [PostgreSQL Cheat Sheet](/postgresql-cheat-sheet/) has the full command set; below is the minimum you need.

Connect to PostgreSQL as the superuser. On macOS with Homebrew PostgreSQL you often have a user with your OS username; on Linux the default superuser is usually `postgres`.

```bash
# macOS (Homebrew): often your login user can connect
psql -d postgres

# Linux: use the postgres system user
sudo -u postgres psql
```

In the `psql` prompt, create a dedicated user and database for your app. Using a dedicated user (instead of the superuser) limits what the app can do and is what you want in production.

```sql
CREATE USER myapp WITH PASSWORD 'choose_a_strong_password';

CREATE DATABASE myapp_db
  OWNER myapp
  ENCODING 'UTF8';

GRANT ALL PRIVILEGES ON DATABASE myapp_db TO myapp;
\c myapp_db
GRANT ALL ON SCHEMA public TO myapp;
```

- **CREATE USER** – creates a role that can log in. Django will use this user.
- **CREATE DATABASE ... OWNER myapp** – creates the database and makes `myapp` its owner so it can create tables and extensions.
- **GRANT ALL PRIVILEGES ON DATABASE** – allows the user to connect and use the database.
- **GRANT ALL ON SCHEMA public** – in PostgreSQL 15+, the `public` schema is not granted by default; this lets the user create tables in `public`.

Exit psql with `\q`. Test the new user and database from the shell:

```bash
psql -U myapp -d myapp_db -h localhost -c '\conninfo'
```

You should see connection info for `myapp_db` as user `myapp`. If that works, Django will be able to connect with the same credentials.

## Step 3: Configure Django settings.py

Open `config/settings.py`. Out of the box you get SQLite. It looks like this:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

Replace it with a PostgreSQL configuration. The minimum that gets you connected is the next block: ENGINE, NAME, USER, PASSWORD, HOST, PORT. You can skip to [Step 4](#step-4-run-migrations-and-verify) after that and come back for OPTIONS and timeouts when you need them.

### The DATABASES setting, key by key

```python
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'myapp_db'),
        'USER': os.environ.get('DB_USER', 'myapp'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
```

- **ENGINE** – Must be `'django.db.backends.postgresql'`. Django uses this to load the right backend and to call psycopg2. No other value will use PostgreSQL.

- **NAME** – The name of the database. It must already exist (you created it in Step 2). Not a path, unlike SQLite.

- **USER** – The PostgreSQL role name. This is the user you created with `CREATE USER`.

- **PASSWORD** – The password for that user. Never commit this to version control. Use environment variables and, for local dev, a `.env` file or export in your shell.

- **HOST** – Where PostgreSQL is running. Use `'localhost'` for TCP on the same machine. Use `''` (empty string) to connect via Unix socket (common when PostgreSQL and the app are on the same host and you do not specify a host). In production this is often a hostname or an IP.

- **PORT** – TCP port. Default is `5432`. Omit it or set to `''` when using a Unix socket.

For local development you can set defaults in `os.environ.get('DB_NAME', 'myapp_db')` and set the variables only in production. Or use a `.env` file and load it at the top of `settings.py` (e.g. with `python-dotenv`) so that `os.environ` is populated when Django starts.

### OPTIONS for PostgreSQL

For local dev the block above is enough. When you need connection timeouts, SSL, keepalives, or session options (e.g. for production), add `OPTIONS`. Anything you pass in `OPTIONS` is forwarded to `psycopg2.connect()` (and thus to PostgreSQL’s libpq). Below is an example; the table that follows lists every option.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'myapp_db'),
        'USER': os.environ.get('DB_USER', 'myapp'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
        'OPTIONS': {
            'connect_timeout': 10,
            'keepalives': 1,
            'keepalives_idle': 30,
            'keepalives_interval': 10,
            'keepalives_count': 5,
            'options': '-c timezone=UTC -c statement_timeout=30000',
            'application_name': 'myapp_django',
            'sslmode': 'require',
        },
    }
}
```

**Option reference (all passed via OPTIONS):**

| Option | Meaning |
|--------|--------|
| **connect_timeout** | Seconds to wait when establishing the connection. 0 or omitted = wait indefinitely. |
| **tcp_user_timeout** | Milliseconds before unacknowledged data causes the connection to be closed. 0 = system default. |
| **keepalives** | 1 = enable TCP keepalives (default), 0 = disable. Reduces risk of silent drops by firewalls or load balancers. |
| **keepalives_idle** | Seconds of inactivity before the first keepalive is sent. 0 = system default. |
| **keepalives_interval** | Seconds between keepalive retransmits if the server does not respond. 0 = system default. |
| **keepalives_count** | Number of keepalives that can be lost before the connection is considered dead. 0 = system default. |
| **options** | Server command-line options at connection start, e.g. `-c timezone=UTC` or `-c statement_timeout=60000`. See PostgreSQL [runtime config](https://www.postgresql.org/docs/current/runtime-config.html). |
| **application_name** | Label for this connection in `pg_stat_activity` and in server logs. Helps with debugging and connection tracking. |
| **fallback_application_name** | Used if `application_name` is not set (e.g. by a generic pooler). |
| **sslmode** | `disable` = no SSL; `allow` = try non-SSL then SSL; `prefer` = try SSL first (default); `require` = SSL required; `verify-ca` = verify server cert against CA; `verify-full` = verify cert and hostname. |
| **sslrootcert** | Path to CA certificate file, or `system` to use the system CA store. Needed for `verify-ca` / `verify-full`. |
| **sslcert** | Path to client certificate file (when the server requires client certs). |
| **sslkey** | Path to client private key file. |
| **sslpassword** | Passphrase for an encrypted client key (no env var equivalent; avoid putting in code; use a secret manager). |
| **target_session_attrs** | With multiple hosts: `any` = any server; `read-write` = primary only; `read-only` = replica only; `primary` = not in standby; `standby` = replica; `prefer-standby` = try standby first then any. |
| **client_encoding** | Client encoding for this connection, e.g. `UTF8` or `auto` (from locale). |

For managed PostgreSQL (AWS RDS, Render, etc.) you typically set `sslmode` to `require` at minimum; some providers require `verify-full` and a path to their CA certificate in `sslrootcert`. Check your provider’s documentation.

### Query timeout and retries

**Query (statement) timeout** – Django does not define a query timeout itself. You set it per connection using PostgreSQL session parameters in `OPTIONS['options']`. The one that matters for “cancel long-running queries” is `statement_timeout` (time in milliseconds, or use a value with unit like `30s`):

```python
'OPTIONS': {
    'options': '-c statement_timeout=30000',
}
```

Other useful timeouts you can pass the same way:

- **lock_timeout** – How long to wait for a lock before giving up (e.g. `-c lock_timeout=5000` for 5 seconds).
- **idle_in_transaction_session_timeout** – Close connections that stay in a transaction but idle (helps avoid holding locks or bloating connection count). For example `-c idle_in_transaction_session_timeout=60000` (60 seconds).

You can combine them: `'options': '-c timezone=UTC -c statement_timeout=30000 -c idle_in_transaction_session_timeout=60000'`.

**Connection timeout** – How long to wait when *opening* the connection is controlled by `connect_timeout` in `OPTIONS` (seconds), as in the table above. That is separate from how long a single query may run.

**Retries** – Django does not have a built-in setting for retrying failed queries or failed connections. If a query or connection fails, the exception is raised to your code. You can:

- Set **CONN_HEALTH_CHECKS** to `True` (Django 4.1+) on the database config so Django checks that the connection is still usable before each request when using persistent connections. That reduces “stale connection” errors after a restart or idle timeout but does not retry a failed operation.
- Implement retries in your own code (e.g. catch `OperationalError`, reconnect or retry a limited number of times).
- Use a third-party package (e.g. `django-dbconn-retry`) that patches the database backend to retry once on connection failures, which can help with poolers or load balancers that close connections.

There is no `OPTIONS` key or Django setting that means "retry this query N times".

### One settings file or split by environment?

Most projects start with a single `config/settings.py`. Use `os.environ.get()` for database credentials so the same file works locally (with your `.env` or shell exports) and in production (with real env vars). You do not need to split settings to use PostgreSQL.

If you prefer to separate local and production config, use a settings package:

- **config/settings/base.py** – Shared settings, including `DATABASES` with env vars. No secrets; only `os.environ.get(...)`.
- **config/settings/local.py** – `from .base import *` then override `DEBUG = True`, `ALLOWED_HOSTS`, etc.
- **config/settings/production.py** – `from .base import *` then override `DEBUG = False`, `ALLOWED_HOSTS`, and any production-only options.

Run or deploy with `DJANGO_SETTINGS_MODULE=config.settings.local` or `config.settings.production`. The database config stays in `base.py`; only the environment (and thus the env vars) changes.

### Using a DATABASE_URL (e.g. Heroku, Render)

If your host gives you a single URL like `postgresql://user:pass@host:5432/dbname`, you can use `dj-database-url`:

```bash
uv add dj-database-url
```

In `settings.py`:

```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        conn_health_checks=True,
    )
}
```

This parses the URL and sets `ENGINE`, `NAME`, `USER`, `PASSWORD`, `HOST`, `PORT` for you. `conn_max_age` and `conn_health_checks` are Django options (see [Connection pooling](#connection-pooling)).

## Step 4: Run Migrations and Verify

Database and user exist; settings.py points at them. Create Django’s tables and confirm the connection.

### How migrations work and creating the first migration

Migrations are Django’s way of turning model changes into schema changes. Each migration is a small file that describes operations: create table, add column, and so on. Django records what has been applied in `django_migrations` so it only runs new ones.

**Built-in apps** – Apps that ship with Django (`django.contrib.auth`, `admin`, `sessions`, `contenttypes`, etc.) already include migration files. You do not create those; you only apply them. The first time you run `migrate` on a new database, Django applies all of these and creates the initial tables.

**Your own apps** – When you add an app (e.g. with `startapp`) and define models in `models.py`, you create migrations for that app by running:

```bash
uv run python manage.py makemigrations myapp
```

Django compares your models to the current migration state and generates a new migration file under `myapp/migrations/` (e.g. `0001_initial.py`). That file is the “first migration” for that app: it creates the tables and columns for your models. You then run `migrate` to apply it to the database. If you change a model later, run `makemigrations` again to generate a new migration, then `migrate` to apply it.

For the initial setup below you only need to apply existing migrations; there is nothing to create yet. Once you add your first app and models (see [Optional: First App and a Model](#optional-first-app-and-a-model)), you will run `makemigrations` to create that app’s first migration, then `migrate` to apply it.

### Apply migrations and verify

From the project root (where `manage.py` is), run:

```bash
uv run python manage.py migrate
```

Django creates the tables for the built-in apps: `auth`, `contenttypes`, `sessions`, `admin`, etc. You should see a list of migrations applied. Each line corresponds to a migration file; Django runs the SQL and records it in `django_migrations`.

Check that the database is in use:

```bash
uv run python manage.py check
```

Then open a PostgreSQL shell using the same config as Django:

```bash
uv run python manage.py dbshell
```

You are connected as `myapp` to `myapp_db`. In psql run `\dt` to list tables. You should see `auth_user`, `django_session`, `django_migrations`, and others. Type `\q` to exit.

To confirm programmatically from Django:

```python
from django.db import connection
connection.ensure_connection()
```

If that returns without error, your Django + Postgres setup is working.

## Optional: First App and a Model

Skip this if you only need the database connected. To see the full flow from model to table in PostgreSQL, add a small app.

```bash
uv run python manage.py startapp items
```

Register the app in `config/settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    # ...
    'items',
]
```

In `items/models.py` define a simple model:

```python
from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
```

Create and run migrations:

```bash
uv run python manage.py makemigrations items
uv run python manage.py migrate
```

Django generates SQL and applies it to PostgreSQL. To see the SQL for a migration: `uv run python manage.py sqlmigrate items 0001`. Then open `dbshell` and run `\dt` again; you will see `items_item`. Your Django + Postgres setup is now creating tables from models. For production deployments, run migrations as part of your release process; for large tables, prefer additive migrations (nullable columns, backfill, then add constraints). The [OpenAI PostgreSQL scaling post](/how-openai-scales-postgresql/) has more on migrations at scale.

## Production Configuration

When you deploy, you care about credentials, connection pooling, SSL, and debugging. Here is what actually matters.

### Credentials

Do not hardcode passwords. Use environment variables (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`) or a `DATABASE_URL` and set them in your deployment environment or secret manager.

### Connection pooling

Django does not ship a connection pool. Every worker can open its own connection, and that can exhaust PostgreSQL’s `max_connections`. You have two ways to fix that: reuse connections per worker with CONN_MAX_AGE, or put a pooler (PgBouncer) in front of PostgreSQL.

**1. CONN_MAX_AGE (connection reuse)**

By default Django opens a new connection per request and closes it when the request ends (`CONN_MAX_AGE=0`). Set `CONN_MAX_AGE` to a positive number (seconds) and Django keeps the connection open and reuses it for the next request in that process. That cuts connect/disconnect overhead. It is not a shared pool: each gunicorn worker still has its own connection.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'myapp_db'),
        'USER': os.environ.get('DB_USER', 'myapp'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
        'CONN_MAX_AGE': 600,
        'CONN_HEALTH_CHECKS': True,
    }
}
```

CONN_MAX_AGE is seconds to keep the connection open. `0` means close after each request. Sixty or six hundred is common. `None` means keep forever; only use that if you control worker count and stay well below `max_connections`. CONN_HEALTH_CHECKS (Django 4.1+) makes Django check that the connection is still valid before use. Use it with persistent connections so you do not reuse a connection the server or a proxy has already closed.

Total PostgreSQL connections ≈ (number of gunicorn/uwsgi workers) × (number of app instances). Example: 4 workers × 3 instances = 12 connections. Ensure PostgreSQL `max_connections` is greater than that. If you scale to many workers and approach `max_connections`, add a pooler instead of raising `max_connections` too high.

**2. PgBouncer (shared connection pool)**

When you have many workers or multiple app servers, a connection pooler sits between Django and PostgreSQL. Django connects to the pooler; the pooler keeps a smaller, fixed number of real connections to PostgreSQL and multiplexes client connections over them.

**Configuring Django to use PgBouncer:** Point `HOST` and `PORT` at the pooler, not PostgreSQL. No change to `ENGINE`; the pooler speaks the PostgreSQL protocol.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'myapp_db'),
        'USER': os.environ.get('DB_USER', 'myapp'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'pgbouncer.example.com'),
        'PORT': os.environ.get('DB_PORT', '6432'),
        'CONN_MAX_AGE': 0,
        'OPTIONS': {
            'connect_timeout': 10,
        },
    }
}
```

On the PgBouncer side you configure a database and user that proxy to the real PostgreSQL (host, port, user, password), and set **pool_size** (how many real connections to PostgreSQL) and **pool_mode**:

- **session** – One server connection per client connection; when the client disconnects, the server connection returns to the pool. Easiest for Django (no change in behaviour).
- **transaction** – One server connection per transaction; after `COMMIT`/`ROLLBACK` the server connection is reused. Fewer server connections, but Django uses features that assume a single connection per request (e.g. prepared statements, `SET` session variables), so **transaction** mode can cause subtle issues unless you test carefully. **Session** mode is the safe default for Django.
- **statement** – One server connection per statement (aggressive multiplexing). Not suitable for Django, which relies on transactions and session state.

Typical PgBouncer config snippet (see [PgBouncer docs](https://www.pgbouncer.org/config.html) for full reference):

```ini
[databases]
myapp_db = host=127.0.0.1 port=5432 dbname=myapp_db

[pgbouncer]
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = session
max_client_conn = 1000
default_pool_size = 25
```

So up to 1000 client connections from Django can share 25 connections to PostgreSQL. Tune `default_pool_size` (or per-database `pool_size`) based on your DB’s `max_connections` and how many other clients use the same server.

**CONN_MAX_AGE with PgBouncer** – With a pooler in front, many setups use `CONN_MAX_AGE=0` so each request gets a connection from the pool and returns it immediately; the pooler then reuses the underlying server connection. Alternatively you can set a small value (e.g. 60) so Django reuses its connection to PgBouncer for multiple requests and reduces reconnect overhead to the pooler; either way, the number of server connections is still limited by the pooler’s `pool_size`.

For more on connection pooling at scale (including read replicas and multiple pools), see [How OpenAI Scales PostgreSQL to 800 Million Users](/how-openai-scales-postgresql/).

### SSL and debugging

**SSL** – For managed PostgreSQL (RDS, Render, etc.) set `'OPTIONS': {'sslmode': 'require'}` or whatever your provider requires.

**Debugging** – To log every SQL statement, add to `settings.py` (only for local or debug): `LOGGING = {'version': 1, 'handlers': {'console': {'class': 'logging.StreamHandler'}}, 'loggers': {'django.db.backends': {'level': 'DEBUG', 'handlers': ['console']}}}`. Turn it off in production. For slow-query analysis in PostgreSQL, see the [PostgreSQL Cheat Sheet](/postgresql-cheat-sheet/#performance-and-troubleshooting).

## Avoiding N+1 Queries

Once you have related models (e.g. Author and Book), you can hit N+1 queries: one query for the list, then one extra query per row for a related object. Django loads relations lazily. Use `select_related('author')` for ForeignKey and OneToOne, and `prefetch_related('tags')` for reverse or many-to-many so Django fetches them in one or two queries. Full walkthrough: [N+1 query problem](/explainer/n-plus-one-query-problem/). For tuning slow queries and indexes, see the [PostgreSQL Cheat Sheet](/postgresql-cheat-sheet/) and [Database Indexing Explained](/database-indexing-explained/).

## Summary

Create the project with uv, add Django and psycopg2-binary, and create the app (e.g. config). Create the database and user in PostgreSQL; Django does not create the database. Set DATABASES in config/settings.py with ENGINE, NAME, USER, PASSWORD, HOST, PORT; use `os.environ.get()` for credentials and add OPTIONS and CONN_MAX_AGE when you need timeouts or connection reuse. Run migrate to create Django’s tables; use `manage.py check`, `dbshell`, or `connection.ensure_connection()` to verify. Use select_related and prefetch_related to avoid N+1 queries. In production keep credentials in env vars or DATABASE_URL, use CONN_MAX_AGE or PgBouncer for pooling, and set SSL and statement_timeout in OPTIONS as needed.

For day-to-day PostgreSQL commands and tuning, use the [PostgreSQL Cheat Sheet](/postgresql-cheat-sheet/). For scaling connections and read replicas, see [How OpenAI Scales PostgreSQL](/how-openai-scales-postgresql/).

---

**Related posts:**

- [PostgreSQL Cheat Sheet](/postgresql-cheat-sheet/) – Commands, queries, and troubleshooting for PostgreSQL
- [N+1 Query Problem Explained](/explainer/n-plus-one-query-problem/) – How to fix N+1 with select_related and prefetch_related
- [How OpenAI Scales PostgreSQL to 800 Million Users](/how-openai-scales-postgresql/) – Connection pooling, read replicas, and production patterns
- [Database Indexing Explained](/database-indexing-explained/) – How indexes work when you tune slow queries

**Further reading:**

- [Django Databases documentation](https://docs.djangoproject.com/en/stable/ref/databases/) – Official reference for ENGINE, OPTIONS, and CONN_MAX_AGE
- [How to Use PostgreSQL in Django](https://www.freecodecamp.org/news/how-to-use-postgresql-in-django/) – FreeCodeCamp tutorial with step-by-step setup
