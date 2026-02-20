---
layout: post
seo: true
title: "PostgreSQL Cheat Sheet: 100+ Commands with Real Examples"
subtitle: "The practical guide to psql commands, queries, and database management you will actually use"
date: 2026-02-18
categories: database
thumbnail-img: /assets/img/posts/database/postgresql-cheat-sheet.png
share-img: /assets/img/posts/database/postgresql-cheat-sheet.png
permalink: /postgresql-cheat-sheet/
description: "Master PostgreSQL with this practical cheat sheet. Covers psql commands, database management, table operations, queries, indexes, joins, JSON, backup and restore, performance tuning with EXPLAIN ANALYZE, roles, and troubleshooting. Real examples for software developers."
keywords: "postgresql cheat sheet, psql commands, postgresql commands, postgresql tutorial, postgres cheat sheet, sql cheat sheet, postgresql for developers, postgresql create table, postgresql select query, postgresql insert, postgresql update, postgresql delete, postgresql join, postgresql index, postgresql backup, pg_dump, postgresql data types, postgresql explain analyze, postgresql performance tuning, postgresql roles permissions, postgresql json, postgresql views, postgresql triggers, postgresql functions, psql meta commands, postgresql connection string"
tags: ["database", "postgres", "sql"]
comments: true

quick-answer: "Essential psql: `\\l` (list databases), `\\dt` (list tables), `\\d table_name` (describe table), `\\c dbname` (switch database). Key SQL: `EXPLAIN ANALYZE` (query performance), `CREATE INDEX` (speed up queries), `pg_dump` (backup), `COPY` (import/export CSV). Always use transactions for multi-step changes. Use `\\x` for readable output on wide tables."

key-takeaways:
  - "psql meta-commands start with backslash. \\dt lists tables, \\d describes a table, \\l lists databases"
  - "Always use EXPLAIN ANALYZE to understand why a query is slow before adding indexes"
  - "Use pg_dump for backups and pg_restore to bring them back. Automate this with cron"
  - "COPY is orders of magnitude faster than INSERT for bulk data loading"
  - "Wrap multi-step changes in BEGIN and COMMIT to avoid leaving your database in a broken state"

faq:
  - question: "How do I connect to a PostgreSQL database from the command line?"
    answer: "Use psql with connection parameters: psql -U username -d database_name -h hostname -p port. For local connections, psql -U postgres -d mydb is usually enough. You can also use a connection string: psql 'postgresql://user:password@host:5432/dbname'. The default port is 5432."
  - question: "How do I list all tables in PostgreSQL?"
    answer: "In psql, use the \\dt meta-command to list all tables in the current schema. Use \\dt+ for more details including table size. To list tables across all schemas, use \\dt *.*. You can also query the information_schema: SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'."
  - question: "How do I check the size of a PostgreSQL database or table?"
    answer: "For database size, use SELECT pg_size_pretty(pg_database_size('dbname')). For table size, use SELECT pg_size_pretty(pg_total_relation_size('table_name')). The pg_total_relation_size function includes indexes and TOAST data. Use \\dt+ in psql for a quick overview of all table sizes."
  - question: "How do I backup and restore a PostgreSQL database?"
    answer: "Use pg_dump to create a backup: pg_dump -U username dbname > backup.sql for SQL format, or pg_dump -Fc -U username dbname > backup.dump for custom compressed format. Restore SQL format with psql -U username dbname < backup.sql. Restore custom format with pg_restore -U username -d dbname backup.dump."
  - question: "What is EXPLAIN ANALYZE in PostgreSQL and how do I use it?"
    answer: "EXPLAIN ANALYZE runs your query and shows the actual execution plan with real timing information. Use it like: EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com'. Look for Seq Scan on large tables (means no index is being used), high actual time values, and large row estimates vs actual rows. This helps you identify slow queries and missing indexes."
  - question: "How do I import a CSV file into PostgreSQL?"
    answer: "Use the COPY command: COPY table_name FROM '/path/to/file.csv' WITH (FORMAT csv, HEADER true). From psql, use \\copy which runs client-side: \\copy table_name FROM 'file.csv' WITH (FORMAT csv, HEADER true). COPY is much faster than individual INSERT statements for bulk loading."
  - question: "How do I add an index in PostgreSQL?"
    answer: "Use CREATE INDEX: CREATE INDEX idx_users_email ON users(email). For unique constraints, use CREATE UNIQUE INDEX. For production databases, use CREATE INDEX CONCURRENTLY to avoid locking the table during index creation. Check if your index is being used with EXPLAIN ANALYZE on your queries."
  - question: "How do I find and kill long-running queries in PostgreSQL?"
    answer: "Find active queries with: SELECT pid, now() - pg_stat_activity.query_start AS duration, query FROM pg_stat_activity WHERE state = 'active' ORDER BY duration DESC. Cancel a query gracefully with SELECT pg_cancel_backend(pid). Force terminate with SELECT pg_terminate_backend(pid). Cancel tries to stop the query, terminate kills the entire connection."
  - question: "What are the most common PostgreSQL data types?"
    answer: "Most used types: INTEGER and BIGINT for numbers, VARCHAR(n) and TEXT for strings, BOOLEAN for true/false, TIMESTAMP and TIMESTAMPTZ for dates (always use TIMESTAMPTZ), UUID for unique identifiers, JSONB for JSON data (use JSONB over JSON for indexing and performance), NUMERIC for precise decimals like money, and SERIAL or BIGSERIAL for auto-incrementing IDs."
  - question: "How do I create a user and grant permissions in PostgreSQL?"
    answer: "Create a user: CREATE USER appuser WITH PASSWORD 'password'. Grant database access: GRANT CONNECT ON DATABASE mydb TO appuser. Grant table permissions: GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO appuser. For read-only access, only grant SELECT. Use roles to group permissions: CREATE ROLE readonly, then GRANT readonly TO appuser."
---

I have been using PostgreSQL for years across different projects and companies. Every time I set up a new database, debug a slow query, or onboard someone to a project, I end up looking up the same commands.

This cheat sheet is the result of all those lookups. It covers the PostgreSQL commands you will actually use as a developer, with real examples. Not a documentation dump. Just the practical stuff.

Bookmark this page. You will come back to it.

---

## Table of Contents

- [Connecting to PostgreSQL](#connecting-to-postgresql)
- [psql Meta Commands](#psql-meta-commands)
- [Database Management](#database-management)
- [Table Operations](#table-operations)
- [Data Types](#data-types)
- [CRUD Operations](#crud-operations)
- [Filtering and Sorting](#filtering-and-sorting)
- [Joins](#joins)
- [Aggregations](#aggregations)
- [Indexes](#indexes)
- [Views](#views)
- [Transactions](#transactions)
- [JSON and JSONB](#json-and-jsonb)
- [Backup and Restore](#backup-and-restore)
- [Import and Export CSV](#import-and-export-csv)
- [Users, Roles, and Permissions](#users-roles-and-permissions)
- [Performance and Troubleshooting](#performance-and-troubleshooting)
- [Useful Monitoring Queries](#useful-monitoring-queries)
- [Quick Reference Table](#quick-reference-table)

---

## Connecting to PostgreSQL

The `psql` command line tool is how most developers interact with PostgreSQL directly. Here are the connection options you will use most.

```bash
# Basic connection
psql -U username -d database_name

# Connect to a remote server
psql -U username -h hostname -p 5432 -d database_name

# Connection string format
psql "postgresql://username:password@hostname:5432/database_name"

# Connect with SSL
psql "postgresql://username:password@hostname:5432/database_name?sslmode=require"

# Connect as the default postgres superuser
psql -U postgres
```

If you keep typing the same connection parameters, set environment variables to save time:

```bash
export PGHOST=localhost
export PGPORT=5432
export PGUSER=myuser
export PGDATABASE=mydb

# Now just run
psql
```

You can also put these in a `~/.pgpass` file to skip password prompts:

```
# hostname:port:database:username:password
localhost:5432:mydb:myuser:mypassword
```

Make sure to set the file permissions:

```bash
chmod 600 ~/.pgpass
```

---

## psql Meta Commands

These are the commands that start with a backslash. They only work inside the psql shell, not in SQL files. Think of them as your navigation shortcuts.

### Listing Things

```sql
-- List all databases
\l

-- List all tables in current database
\dt

-- List tables with sizes and descriptions
\dt+

-- List all schemas
\dn

-- List all views
\dv

-- List all functions
\df

-- List all indexes
\di

-- List all sequences
\ds

-- List all users/roles
\du
```

### Describing Objects

```sql
-- Describe a table (columns, types, constraints, indexes)
\d table_name

-- Describe with extra info (size, storage, stats)
\d+ table_name
```

### Navigation and Output

```sql
-- Switch to another database
\c database_name

-- Turn on expanded display (vertical output for wide tables)
\x

-- Toggle between regular and expanded output automatically
\x auto

-- Turn on query timing
\timing

-- Edit the last query in your editor
\e

-- Run SQL from a file
\i /path/to/file.sql

-- Show command history
\s

-- Get help on SQL commands
\h CREATE TABLE

-- Get help on psql commands
\?

-- Quit psql
\q
```

The `\x auto` command is a lifesaver when you are dealing with tables that have many columns. It automatically switches to vertical output when the result is too wide for your terminal.

---

## Database Management

```sql
-- Create a new database
CREATE DATABASE myapp;

-- Create with specific owner and encoding
CREATE DATABASE myapp
  OWNER appuser
  ENCODING 'UTF8'
  LC_COLLATE 'en_US.UTF-8'
  LC_CTYPE 'en_US.UTF-8';

-- Rename a database (no active connections allowed)
ALTER DATABASE oldname RENAME TO newname;

-- Change database owner
ALTER DATABASE myapp OWNER TO newuser;

-- Drop a database (careful, this is permanent)
DROP DATABASE myapp;

-- Drop only if it exists (avoids error)
DROP DATABASE IF EXISTS myapp;

-- Check database sizes
SELECT
  datname AS database,
  pg_size_pretty(pg_database_size(datname)) AS size
FROM pg_database
ORDER BY pg_database_size(datname) DESC;
```

<i class="fas fa-exclamation-triangle" style="color: #e65100;"></i> **Warning**: You cannot drop a database while there are active connections to it. Disconnect all clients first, or use `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'myapp'` to force-close connections.

---

## Table Operations

### Creating Tables

```sql
-- Basic table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- With foreign key
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  total NUMERIC(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table from a query result
CREATE TABLE active_users AS
SELECT * FROM users WHERE last_login > NOW() - INTERVAL '30 days';

-- Create table only if it does not exist
CREATE TABLE IF NOT EXISTS logs (
  id BIGSERIAL PRIMARY KEY,
  message TEXT,
  level VARCHAR(10),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Use `BIGSERIAL` instead of `SERIAL` if your table might have more than 2 billion rows. `SERIAL` maxes out at about 2.1 billion. For new projects, many teams are switching to UUID primary keys. For more on why, check the [Snowflake ID Guide](/snowflake-id-guide/).

**Modern alternative to SERIAL** *(PostgreSQL 10+)*: Use `GENERATED ALWAYS AS IDENTITY` instead of `SERIAL`. It is the SQL standard way to do auto-incrementing columns and avoids some [subtle issues](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Don.27t_use_serial) with `SERIAL` around permissions and sequence ownership.

```sql
CREATE TABLE users (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL
);

-- If you need to override the generated value during inserts (e.g., data migration)
INSERT INTO users (id, name) OVERRIDING SYSTEM VALUE VALUES (999, 'Migrated User');
```

### Modifying Tables

```sql
-- Add a column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Add a column with a default value
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT true;

-- Drop a column
ALTER TABLE users DROP COLUMN phone;

-- Rename a column
ALTER TABLE users RENAME COLUMN name TO full_name;

-- Change column type
ALTER TABLE users ALTER COLUMN full_name TYPE TEXT;

-- Set a column as NOT NULL
ALTER TABLE users ALTER COLUMN email SET NOT NULL;

-- Remove NOT NULL constraint
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;

-- Add a constraint
ALTER TABLE orders ADD CONSTRAINT positive_total CHECK (total > 0);

-- Rename a table
ALTER TABLE users RENAME TO customers;
```

### Dropping Tables

```sql
-- Drop a table
DROP TABLE users;

-- Drop only if it exists
DROP TABLE IF EXISTS users;

-- Drop and everything that depends on it (foreign keys, views)
DROP TABLE users CASCADE;
```

---

## Data Types

Picking the right data type matters more than most developers think. Here are the types you will use most often and when to use them.

| Type | Use Case | Example |
|------|----------|---------|
| `INTEGER` | Standard numbers | User age, count |
| `BIGINT` | Large numbers | Row IDs in big tables |
| `SERIAL` / `BIGSERIAL` | Auto-increment IDs | Primary keys |
| `NUMERIC(p, s)` | Exact decimals | Money, financial data |
| `TEXT` | Variable length strings | Comments, descriptions |
| `VARCHAR(n)` | Strings with max length | Email, username |
| `BOOLEAN` | True/false | is_active, is_verified |
| `TIMESTAMPTZ` | Date + time + timezone | created_at, updated_at |
| `DATE` | Date only | birth_date |
| `UUID` | Unique identifiers | Distributed IDs |
| `JSONB` | Structured JSON data | Settings, metadata |
| `INTEGER[]` | Array of integers | Tag IDs |
| `INET` | IP addresses | Client IP |

**A few strong opinions from experience:**

- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Always use `TIMESTAMPTZ`** over `TIMESTAMP`. The one without timezone will cause bugs when your servers are in different time zones. It always does.
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Use `TEXT` over `VARCHAR`** unless you have a real reason for a length limit. PostgreSQL stores them identically. `VARCHAR(255)` is a MySQL habit that does not help you in Postgres.
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Use `NUMERIC` for money**, not `FLOAT` or `DOUBLE PRECISION`. Floating point math will give you rounding errors on financial data.
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Use `JSONB` over `JSON`**. JSONB is stored in a binary format that supports indexing and is faster to query. JSON just stores the raw text.

For more on how PostgreSQL stores these types internally, see [How Databases Store Data Internally](/how-databases-store-data-internally/).

---

## CRUD Operations

### INSERT

```sql
-- Insert a single row
INSERT INTO users (name, email)
VALUES ('Ajit Singh', 'ajit@example.com');

-- Insert and return the new row
INSERT INTO users (name, email)
VALUES ('Ajit Singh', 'ajit@example.com')
RETURNING *;

-- Insert multiple rows
INSERT INTO users (name, email) VALUES
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com'),
  ('Charlie', 'charlie@example.com');

-- Insert from a query
INSERT INTO archived_users
SELECT * FROM users WHERE last_login < '2024-01-01';

-- Insert or update on conflict (upsert) [PostgreSQL 9.5+]
INSERT INTO users (email, name)
VALUES ('ajit@example.com', 'Ajit Singh')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name;

-- Insert or do nothing on conflict [PostgreSQL 9.5+]
INSERT INTO users (email, name)
VALUES ('ajit@example.com', 'Ajit Singh')
ON CONFLICT (email) DO NOTHING;
```

The `RETURNING *` clause is one of those PostgreSQL features that saves you a second query. You insert and get back the new row (with the generated ID, defaults, etc.) in one shot. The `ON CONFLICT` clause (upsert) was added in PostgreSQL 9.5. If you are on an older version, you would need to use a CTE or a function with exception handling instead.

### SELECT

```sql
-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- Select with alias
SELECT name AS full_name, email AS contact FROM users;

-- Select distinct values
SELECT DISTINCT status FROM orders;

-- Select with limit and offset (pagination)
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;

-- Count rows
SELECT COUNT(*) FROM users;

-- Check if a row exists
SELECT EXISTS(SELECT 1 FROM users WHERE email = 'ajit@example.com');
```

### UPDATE

```sql
-- Update specific rows
UPDATE users SET name = 'Ajit' WHERE id = 1;

-- Update multiple columns
UPDATE users
SET name = 'Ajit', is_active = true
WHERE id = 1;

-- Update and return the changed rows
UPDATE users SET is_active = false
WHERE last_login < NOW() - INTERVAL '1 year'
RETURNING id, name, email;

-- Update using data from another table
UPDATE orders
SET status = 'cancelled'
FROM users
WHERE orders.user_id = users.id
  AND users.is_active = false;
```

### DELETE

```sql
-- Delete specific rows
DELETE FROM users WHERE id = 1;

-- Delete and return what was deleted
DELETE FROM users WHERE is_active = false
RETURNING *;

-- Delete all rows (use TRUNCATE for large tables)
DELETE FROM logs;

-- TRUNCATE is faster for clearing entire tables
TRUNCATE TABLE logs;

-- TRUNCATE and reset the auto-increment counter
TRUNCATE TABLE logs RESTART IDENTITY;
```

`TRUNCATE` is significantly faster than `DELETE` when you want to remove all rows. `DELETE` processes one row at a time and logs each deletion. `TRUNCATE` just deallocates the data pages in one operation. Unlike MySQL, `TRUNCATE` in PostgreSQL is fully transactional. You can run it inside a `BEGIN`/`ROLLBACK` block and undo it.

---

## Filtering and Sorting

```sql
-- WHERE with comparison
SELECT * FROM users WHERE age > 25;

-- Multiple conditions
SELECT * FROM orders
WHERE status = 'pending'
  AND total > 100
  AND created_at > '2025-01-01';

-- OR condition
SELECT * FROM users
WHERE role = 'admin' OR role = 'moderator';

-- IN list
SELECT * FROM users WHERE role IN ('admin', 'moderator', 'editor');

-- NOT IN
SELECT * FROM users WHERE status NOT IN ('banned', 'deleted');

-- BETWEEN range
SELECT * FROM orders
WHERE created_at BETWEEN '2025-01-01' AND '2025-12-31';

-- Pattern matching with LIKE
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Case insensitive pattern matching
SELECT * FROM users WHERE email ILIKE '%@Gmail.com';

-- NULL checks
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- Sorting
SELECT * FROM users ORDER BY created_at DESC;

-- Multiple sort columns
SELECT * FROM users ORDER BY role ASC, name ASC;

-- NULLS handling in sorting
SELECT * FROM users ORDER BY phone ASC NULLS LAST;
```

**Tip**: `ILIKE` is a PostgreSQL extension that does case-insensitive matching. Standard SQL only has `LIKE` which is case-sensitive. If you need case-insensitive searches on large datasets, create an index on `LOWER(column)` instead.

---

## Joins

Joins are how you combine data from multiple tables.

### INNER JOIN

Returns rows only when there is a match in both tables.

```sql
SELECT u.name, o.total, o.status
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

### LEFT JOIN

Returns all rows from the left table and matching rows from the right. Missing matches get NULLs.

```sql
-- Find users and their orders (including users with no orders)
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Find users who have never ordered anything
SELECT u.name, u.email
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;
```

### RIGHT JOIN

Returns all rows from the right table and matching rows from the left.

```sql
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;
```

### FULL OUTER JOIN

Returns all rows from both tables, with NULLs where there is no match.

```sql
SELECT u.name, o.total
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;
```

### Self Join

Join a table to itself. Useful for hierarchical data.

```sql
-- Find employees and their managers
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

### Cross Join

Returns every combination of rows from both tables. Rarely needed, but useful for generating test data.

```sql
SELECT colors.name, sizes.name
FROM colors
CROSS JOIN sizes;
```

Be careful with joins on large tables without proper indexes. A join on unindexed columns can turn a simple query into something that takes minutes. See [How Database Indexing Works](/database-indexing-explained/) for details.

---

## Aggregations

```sql
-- Count, sum, average, min, max
SELECT
  COUNT(*) AS total_orders,
  SUM(total) AS revenue,
  AVG(total) AS avg_order,
  MIN(total) AS smallest_order,
  MAX(total) AS largest_order
FROM orders;

-- Group by
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status
ORDER BY count DESC;

-- Group by with filtering (HAVING)
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5
ORDER BY order_count DESC;

-- Group by date (count orders per day)
SELECT
  created_at::date AS order_date,
  COUNT(*) AS orders
FROM orders
GROUP BY created_at::date
ORDER BY order_date DESC;

-- Group by month
SELECT
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*) AS orders,
  SUM(total) AS revenue
FROM orders
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- String aggregation (concatenate values) [PostgreSQL 9.0+]
SELECT
  department,
  STRING_AGG(name, ', ' ORDER BY name) AS members
FROM employees
GROUP BY department;
```

The difference between `WHERE` and `HAVING`: `WHERE` filters rows before grouping. `HAVING` filters groups after aggregation. You cannot use aggregate functions in `WHERE`.

---

## Indexes

Indexes are the single most impactful thing you can do for query performance. But adding the wrong indexes can hurt more than help. For a deep dive into how they work under the hood, check out [How Database Indexing Works](/database-indexing-explained/).

### Creating Indexes

```sql
-- Basic index
CREATE INDEX idx_users_email ON users(email);

-- Unique index
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Composite index (multi-column)
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index (only index rows matching a condition)
CREATE INDEX idx_orders_pending ON orders(created_at)
WHERE status = 'pending';

-- Expression index (index on a function result)
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- GIN index for JSONB columns
CREATE INDEX idx_users_metadata ON users USING GIN(metadata);

-- GIN index for full text search
CREATE INDEX idx_posts_search ON posts USING GIN(to_tsvector('english', title || ' ' || body));

-- Create index without locking the table (use this in production)
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

<i class="fas fa-exclamation-triangle" style="color: #e65100;"></i> **Always use `CONCURRENTLY` in production.** Without it, `CREATE INDEX` locks the table against writes for the entire duration of the index build. On a large table, that could be minutes or even hours of downtime. One caveat: `CREATE INDEX CONCURRENTLY` cannot run inside a transaction block. If you are running migrations that wrap everything in a transaction, you need to handle this index creation separately.

### Managing Indexes

```sql
-- Show indexes on a table (listed at the bottom of the output)
\d table_name

-- List all indexes in the database
\di

-- Check index sizes
SELECT
  indexname,
  pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_indexes
WHERE tablename = 'users';

-- Drop an index
DROP INDEX idx_users_email;

-- Drop without error if it does not exist
DROP INDEX IF EXISTS idx_users_email;

-- Rebuild an index
REINDEX INDEX idx_users_email;

-- Rebuild all indexes on a table
REINDEX TABLE users;

-- Rebuild an index without locking the table [PostgreSQL 12+]
REINDEX INDEX CONCURRENTLY idx_users_email;
```

### Check If Your Indexes Are Actually Being Used

```sql
-- Find unused indexes (wasting disk space and slowing down writes)
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan AS times_used,
  pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexname::regclass) DESC;
```

If an index shows zero scans over a reasonable period, it is just overhead. Drop it. Every index slows down INSERT, UPDATE, and DELETE operations because PostgreSQL has to update the index along with the table data.

---

## Views

Views are saved queries. They do not store data, they just run the query each time you access them. Materialized views actually store the result and need to be refreshed.

```sql
-- Create a view
CREATE VIEW active_orders AS
SELECT o.id, u.name, o.total, o.status, o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status IN ('pending', 'processing');

-- Use it like a table
SELECT * FROM active_orders WHERE total > 100;

-- Create or replace a view
CREATE OR REPLACE VIEW active_orders AS
SELECT o.id, u.name, u.email, o.total, o.status, o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status IN ('pending', 'processing');

-- Drop a view
DROP VIEW active_orders;

-- Materialized view (stores the result on disk) [PostgreSQL 9.3+]
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT
  DATE_TRUNC('month', created_at) AS month,
  SUM(total) AS revenue,
  COUNT(*) AS order_count
FROM orders
GROUP BY DATE_TRUNC('month', created_at);

-- Refresh the materialized view (re-runs the query)
REFRESH MATERIALIZED VIEW monthly_revenue;

-- Refresh without locking reads [PostgreSQL 9.4+]
-- Requires a UNIQUE index on the materialized view
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;
```

<i class="fas fa-info-circle" style="color: #1565c0;"></i> **Note**: `REFRESH MATERIALIZED VIEW CONCURRENTLY` requires that the materialized view has at least one `UNIQUE` index. Without it, PostgreSQL throws an error. Create one before using `CONCURRENTLY`:

```sql
CREATE UNIQUE INDEX ON monthly_revenue (month);
```

Materialized views are great for dashboards and reporting queries that are expensive to run. Refresh them on a schedule (every hour, every night) depending on how fresh the data needs to be.

---

## Transactions

Transactions let you group multiple operations into a single atomic unit. Either everything succeeds, or nothing does. This is one of the most important things PostgreSQL gives you, and too many developers skip it.

```sql
-- Basic transaction
BEGIN;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;

-- If something goes wrong, roll everything back
BEGIN;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  -- Oops, something went wrong
ROLLBACK;

-- Savepoints for partial rollbacks
BEGIN;
  INSERT INTO orders (user_id, total) VALUES (1, 99.99);
  SAVEPOINT order_created;
  
  INSERT INTO order_items (order_id, product_id) VALUES (1, 100);
  -- This fails, but we only roll back to the savepoint
  ROLLBACK TO SAVEPOINT order_created;
  
  -- The order insert is still good
COMMIT;
```

**When to use transactions:**

- <i class="fas fa-check-circle" style="color: #388e3c;"></i> Transferring money between accounts
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> Creating an order with its line items
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> Any multi-step operation that must succeed or fail as a whole
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> Schema migrations involving multiple tables

In PostgreSQL, every individual statement is already wrapped in an implicit transaction. But when you have multiple statements that depend on each other, you need explicit `BEGIN` and `COMMIT`.

---

## JSON and JSONB

PostgreSQL has excellent JSON support. The `JSON` type was added in PostgreSQL 9.2, and `JSONB` (binary JSON) arrived in PostgreSQL 9.4. Use `JSONB` over `JSON` in almost all cases. JSONB supports indexing, is faster to query, and does not preserve whitespace or key order (which you rarely need).

```sql
-- Create a table with JSONB column
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'
);

-- Insert JSON data
INSERT INTO events (name, metadata) VALUES
  ('signup', '{"source": "google", "campaign": "summer2025"}'),
  ('purchase', '{"amount": 49.99, "product_id": 123, "coupon": "SAVE10"}');

-- Query JSON fields
SELECT name, metadata->>'source' AS source
FROM events
WHERE metadata->>'source' = 'google';

-- Query nested JSON
SELECT metadata->'address'->>'city' AS city FROM users;

-- Check if a key exists
SELECT * FROM events WHERE metadata ? 'coupon';

-- Check if JSON contains a value
SELECT * FROM events WHERE metadata @> '{"source": "google"}';

-- Update a JSON field [PostgreSQL 9.5+]
UPDATE events
SET metadata = jsonb_set(metadata, '{campaign}', '"winter2025"')
WHERE id = 1;

-- Add a new key to JSON [PostgreSQL 9.5+]
UPDATE events
SET metadata = metadata || '{"processed": true}'
WHERE id = 1;

-- Remove a key from JSON [PostgreSQL 9.5+]
UPDATE events
SET metadata = metadata - 'campaign'
WHERE id = 1;

-- Aggregate JSON
SELECT jsonb_agg(name) FROM events;
```

### JSONB Operators Quick Reference

| Operator | Description | Example |
|----------|-------------|---------|
| `->` | Get JSON element (as JSON) | `data->'key'` |
| `->>` | Get JSON element (as text) | `data->>'key'` |
| `#>` | Get nested element (as JSON) | `data#>'{a,b}'` |
| `#>>` | Get nested element (as text) | `data#>>'{a,b}'` |
| `@>` | Contains | `data @> '{"key":"val"}'` |
| `?` | Key exists | `data ? 'key'` |
| `?&` | All keys exist | `data ?& array['a','b']` |
| <code>?&#124;</code> | Any key exists | <code>data ?&#124; array['a','b']</code> |
| `||` | Concatenate | `data || '{"new":"val"}'` |
| `-` | Delete key | `data - 'key'` |

Index your JSONB columns with GIN indexes for fast `@>` and `?` queries:

```sql
CREATE INDEX idx_events_metadata ON events USING GIN(metadata);
```

---

## Backup and Restore

Regular backups are not optional. Here is how to do them properly.

### pg_dump (Single Database Backup)

```bash
# SQL format (readable, portable)
pg_dump -U postgres mydb > backup.sql

# Custom format (compressed, supports parallel restore)
pg_dump -Fc -U postgres mydb > backup.dump

# Directory format (parallel dump) [PostgreSQL 9.3+]
pg_dump -Fd -j 4 -U postgres mydb -f backup_dir/

# Dump only the schema (no data)
pg_dump -s -U postgres mydb > schema.sql

# Dump only the data (no schema)
pg_dump -a -U postgres mydb > data.sql

# Dump specific tables
pg_dump -t users -t orders -U postgres mydb > tables.sql
```

### pg_restore (Restore from Backup)

```bash
# Restore SQL format
psql -U postgres mydb < backup.sql

# Restore custom format
pg_restore -U postgres -d mydb backup.dump

# Restore with parallel workers (faster)
pg_restore -j 4 -U postgres -d mydb backup.dump

# Restore into a new database
createdb -U postgres mydb_restored
pg_restore -U postgres -d mydb_restored backup.dump

# Restore only specific tables
pg_restore -t users -U postgres -d mydb backup.dump
```

### pg_dumpall (All Databases)

```bash
# Backup all databases, roles, and tablespaces
pg_dumpall -U postgres > full_backup.sql

# Restore everything
psql -U postgres < full_backup.sql
```

**Tip**: Schedule your backups with [cron jobs](/explainer/cron-jobs-explained/). A common setup is nightly full backups with the custom format:

```bash
# Add to crontab: crontab -e
0 2 * * * pg_dump -Fc -U postgres mydb > /backups/mydb_$(date +\%Y\%m\%d).dump
```

Not sure about the cron syntax? Use [Cron Expression Tool](/tools/cron-expression/) to build and validate your schedule.

---

## Import and Export CSV

The `COPY` command is the fastest way to move data in and out of PostgreSQL. It is orders of magnitude faster than running individual INSERT statements.

### Export to CSV

```sql
-- Export a table to CSV
COPY users TO '/tmp/users.csv' WITH (FORMAT csv, HEADER true);

-- Export a query result to CSV
COPY (SELECT name, email FROM users WHERE is_active = true)
TO '/tmp/active_users.csv' WITH (FORMAT csv, HEADER true);
```

### Import from CSV

```sql
-- Import CSV into a table
COPY users (name, email, created_at)
FROM '/tmp/users.csv'
WITH (FORMAT csv, HEADER true);
```

### psql Client Side COPY

If you do not have server file system access (common in cloud databases like RDS or Cloud SQL), use `\copy` from psql:

```sql
-- Client-side export
\copy users TO 'users.csv' WITH (FORMAT csv, HEADER true)

-- Client-side import
\copy users (name, email) FROM 'users.csv' WITH (FORMAT csv, HEADER true)
```

The difference: `COPY` runs on the database server and reads/writes server files. `\copy` streams data through the psql client connection. `COPY` is faster for large datasets, but `\copy` works when you do not have access to the server filesystem.

---

## Users, Roles, and Permissions

PostgreSQL uses a role-based permission system. Users are just roles with login privileges.

### Managing Users

```sql
-- Create a new user
CREATE USER appuser WITH PASSWORD 'secure_password';

-- Create a user with specific privileges
CREATE USER readonly_user WITH PASSWORD 'password' NOSUPERUSER NOCREATEDB;

-- Change a user's password
ALTER USER appuser WITH PASSWORD 'new_password';

-- Drop a user
DROP USER appuser;

-- List all users
\du
```

### Managing Roles

```sql
-- Create a role (no login by default)
CREATE ROLE analyst;

-- Grant permissions to a role
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;

-- Assign a role to a user
GRANT analyst TO appuser;

-- Remove a role from a user
REVOKE analyst FROM appuser;
```

### Granting Permissions

```sql
-- Grant full access to a database
GRANT ALL PRIVILEGES ON DATABASE mydb TO appuser;

-- Grant specific table permissions
GRANT SELECT, INSERT, UPDATE ON users TO appuser;

-- Grant access to all tables in a schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

-- Grant access to future tables automatically [PostgreSQL 9.0+]
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO readonly_user;

-- Revoke permissions
REVOKE INSERT, UPDATE ON users FROM appuser;

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO appuser;
```

**A practical setup for a web application:**

```sql
-- Application user: can read and write data, but cannot modify schema
CREATE USER webapp WITH PASSWORD 'app_password';
GRANT CONNECT ON DATABASE mydb TO webapp;
GRANT USAGE ON SCHEMA public TO webapp;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO webapp;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO webapp;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO webapp;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO webapp;

-- Read-only user for analytics
CREATE USER analyst WITH PASSWORD 'analyst_password';
GRANT CONNECT ON DATABASE mydb TO analyst;
GRANT USAGE ON SCHEMA public TO analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO analyst;
```

---

## Performance and Troubleshooting

This is where PostgreSQL experience really shows. Knowing how to diagnose slow queries is one of the most valuable skills you can have as a developer.

### EXPLAIN ANALYZE

`EXPLAIN` shows you what PostgreSQL plans to do. `EXPLAIN ANALYZE` actually runs the query and shows what it did. Always use `ANALYZE` when debugging performance.

```sql
-- Show the execution plan (does not run the query)
EXPLAIN SELECT * FROM users WHERE email = 'ajit@example.com';

-- Show the plan WITH actual execution stats
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'ajit@example.com';

-- More detailed output (BUFFERS option available in PostgreSQL 9.0+)
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM users WHERE email = 'ajit@example.com';
```

Here is how to read the output:

| Node Type | What It Means | What To Do |
|-----------|---------------|------------|
| **Seq Scan** | No index being used. Scans every row in the table | Add an index on the filtered column |
| **Index Scan** | Good. An index is being used to find rows | Nothing. This is what you want |
| **Bitmap Index Scan** | Index used, but scanning many rows | Fine for medium selectivity. Watch for high row counts |
| **Nested Loop** | Loops through one table for each row of the other | Fine for small result sets. Slow for large joins |
| **Hash Join** | Builds a hash table and probes it | Good for large joins between two big tables |
| **Merge Join** | Merges two sorted inputs | Efficient when both sides are already sorted or indexed |
| **Sort** | Sorts rows for ORDER BY or Merge Join | Can be avoided by adding an index that matches your ORDER BY |

**Red flags in EXPLAIN output:**

- <i class="fas fa-times-circle" style="color: #d32f2f;"></i> **Seq Scan on a large table**: You probably need an index
- <i class="fas fa-times-circle" style="color: #d32f2f;"></i> **Rows estimated vs actual are very different**: Run `ANALYZE tablename` to update statistics
- <i class="fas fa-times-circle" style="color: #d32f2f;"></i> **Nested Loop with large row counts**: Consider restructuring the query
- <i class="fas fa-times-circle" style="color: #d32f2f;"></i> **Sort with high cost**: Add an index that matches your ORDER BY

### VACUUM and ANALYZE

PostgreSQL uses MVCC (Multi-Version Concurrency Control). When you UPDATE or DELETE a row, the old version is not immediately removed. VACUUM cleans up these dead rows.

```sql
-- Vacuum a specific table
VACUUM users;

-- Vacuum and reclaim disk space (locks the table)
VACUUM FULL users;

-- Update table statistics for the query planner
ANALYZE users;

-- Do both at once
VACUUM ANALYZE users;

-- Check when tables were last vacuumed
SELECT
  relname AS table,
  last_vacuum,
  last_autovacuum,
  last_analyze,
  n_dead_tup AS dead_rows
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
```

PostgreSQL runs autovacuum in the background, but on busy tables with lots of updates and deletes, it might not keep up. If you see dead rows piling up, you might need to tune the autovacuum settings or run manual VACUUM during off-peak hours.

### Finding Slow Queries

```sql
-- Find currently running queries (state column requires PostgreSQL 9.2+)
SELECT
  pid,
  now() - pg_stat_activity.query_start AS duration,
  state,
  query
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;

-- Find queries running longer than 5 minutes
SELECT
  pid,
  now() - pg_stat_activity.query_start AS duration,
  query
FROM pg_stat_activity
WHERE state = 'active'
  AND now() - pg_stat_activity.query_start > INTERVAL '5 minutes';

-- Kill a specific query (graceful)
SELECT pg_cancel_backend(12345);

-- Kill a specific query (force)
SELECT pg_terminate_backend(12345);
```

### Connection Management

```sql
-- See all active connections
SELECT
  datname AS database,
  usename AS user,
  client_addr,
  state,
  query
FROM pg_stat_activity
ORDER BY state;

-- Count connections per database
SELECT datname, COUNT(*)
FROM pg_stat_activity
GROUP BY datname;

-- Check max connections setting
SHOW max_connections;
```

If you are running out of connections, look into connection pooling with PgBouncer. We covered this in detail in [How OpenAI Scales PostgreSQL to 800 Million Users](/how-openai-scales-postgresql/).

---

## Useful Monitoring Queries

These are the queries I run first when something seems off with the database.

### Table and Index Sizes

```sql
-- Top 10 largest tables
SELECT
  tablename,
  pg_size_pretty(pg_total_relation_size(tablename::regclass)) AS total_size,
  pg_size_pretty(pg_relation_size(tablename::regclass)) AS table_size,
  pg_size_pretty(pg_total_relation_size(tablename::regclass) - pg_relation_size(tablename::regclass)) AS index_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(tablename::regclass) DESC
LIMIT 10;
```

### Cache Hit Ratio

```sql
-- Should be above 99% for most workloads
SELECT
  sum(heap_blks_read) AS heap_read,
  sum(heap_blks_hit) AS heap_hit,
  CASE WHEN sum(heap_blks_hit) + sum(heap_blks_read) > 0
    THEN round(sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read))::numeric * 100, 2)
    ELSE 0
  END AS ratio
FROM pg_statio_user_tables;
```

If the cache hit ratio is below 99%, your database is hitting disk too often. You probably need more RAM for the shared_buffers setting. For more on how buffer pools work, see [How Databases Store Data Internally](/how-databases-store-data-internally/).

### Index Usage

```sql
-- Index hit rate (should be high)
SELECT
  relname AS table,
  idx_scan AS index_scans,
  seq_scan AS sequential_scans,
  CASE WHEN idx_scan + seq_scan > 0
    THEN round(idx_scan::numeric / (idx_scan + seq_scan) * 100, 2)
    ELSE 0
  END AS index_usage_percent
FROM pg_stat_user_tables
ORDER BY seq_scan DESC;
```

### Bloat Detection

```sql
-- Find tables with lots of dead tuples (need vacuuming)
SELECT
  relname AS table,
  n_live_tup AS live_rows,
  n_dead_tup AS dead_rows,
  CASE WHEN n_live_tup > 0
    THEN round(n_dead_tup::numeric / n_live_tup * 100, 2)
    ELSE 0
  END AS dead_ratio_percent,
  last_autovacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;
```

### Lock Detection

If you are on PostgreSQL 9.6 or later, use `pg_blocking_pids()` for a much simpler query:

```sql
-- Find blocked queries and what is blocking them [PostgreSQL 9.6+]
SELECT
  pid,
  pg_blocking_pids(pid) AS blocked_by,
  query,
  now() - query_start AS duration
FROM pg_stat_activity
WHERE cardinality(pg_blocking_pids(pid)) > 0;
```

For older versions, or if you need to see both sides of each lock conflict:

```sql
-- Find blocking queries (works on all versions)
SELECT
  blocked.pid AS blocked_pid,
  blocked.query AS blocked_query,
  blocking.pid AS blocking_pid,
  blocking.query AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_locks bl ON bl.pid = blocked.pid
JOIN pg_locks lo ON lo.locktype = bl.locktype
  AND lo.database IS NOT DISTINCT FROM bl.database
  AND lo.relation IS NOT DISTINCT FROM bl.relation
  AND lo.page IS NOT DISTINCT FROM bl.page
  AND lo.tuple IS NOT DISTINCT FROM bl.tuple
  AND lo.virtualxid IS NOT DISTINCT FROM bl.virtualxid
  AND lo.transactionid IS NOT DISTINCT FROM bl.transactionid
  AND lo.classid IS NOT DISTINCT FROM bl.classid
  AND lo.objid IS NOT DISTINCT FROM bl.objid
  AND lo.objsubid IS NOT DISTINCT FROM bl.objsubid
  AND lo.pid != bl.pid
JOIN pg_stat_activity blocking ON blocking.pid = lo.pid
WHERE NOT bl.granted;
```

---

## Quick Reference Table

| Task | Command |
|------|---------|
| Connect to database | `psql -U user -d dbname -h host` |
| List databases | `\l` |
| List tables | `\dt` |
| Describe table | `\d table_name` |
| Switch database | `\c dbname` |
| Create database | `CREATE DATABASE name;` |
| Create table | `CREATE TABLE name (...)` |
| Add column | `ALTER TABLE t ADD COLUMN col TYPE;` |
| Drop table | `DROP TABLE name;` |
| Insert row | `INSERT INTO t (cols) VALUES (vals);` |
| Update rows | `UPDATE t SET col = val WHERE ...;` |
| Delete rows | `DELETE FROM t WHERE ...;` |
| Upsert | `INSERT ... ON CONFLICT DO UPDATE;` |
| Create index | `CREATE INDEX idx ON t(col);` |
| Create index (production) | `CREATE INDEX CONCURRENTLY ...;` |
| Backup database | `pg_dump -Fc -U user db > file.dump` |
| Restore database | `pg_restore -U user -d db file.dump` |
| Import CSV | `\copy t FROM 'file.csv' CSV HEADER` |
| Export CSV | `\copy t TO 'file.csv' CSV HEADER` |
| Show slow queries | `SELECT * FROM pg_stat_activity;` |
| Kill query | `SELECT pg_cancel_backend(pid);` |
| Check table size | `\dt+` |
| Vacuum table | `VACUUM ANALYZE table;` |
| Expanded output | `\x auto` |
| Query timing | `\timing` |
| Execution plan | `EXPLAIN ANALYZE query;` |

---

## Related Posts

These posts go deeper into specific database topics:

**PostgreSQL Deep Dives**:
- [How OpenAI Scales PostgreSQL to 800 Million Users](/how-openai-scales-postgresql/)
- [PostgreSQL 18: The Release That Makes Databases Fast Again](/postgres-18-features/)

**Database Fundamentals**:
- [How Database Indexing Works](/database-indexing-explained/)
- [How Databases Store Data Internally](/how-databases-store-data-internally/)
- [Caching Strategies Explained](/caching-strategies-explained/)

**Related Cheat Sheets**:
- [Docker Cheat Sheet](/devops/docker-cheat-sheet/) - Run PostgreSQL in containers
- [Linux Commands Cheat Sheet](/linux-commands-cheat-sheet/)
- [Git Cheat Sheet](/git-cheat-sheet/)
- [Kubernetes Cheat Sheet](/kubernetes-cheat-sheet/)
- [System Design Cheat Sheet](/system-design-cheat-sheet/)

---

## External Resources

- [Official PostgreSQL Documentation](https://www.postgresql.org/docs/current/) -- the definitive reference
- [PostgreSQL Wiki: Don't Do This](https://wiki.postgresql.org/wiki/Don%27t_Do_This) -- common mistakes to avoid
- [pgTune](https://pgtune.leopard.in.ua/) -- generate optimal postgresql.conf settings for your hardware
- [Use The Index, Luke](https://use-the-index-luke.com/) -- SQL indexing best practices
- [Postgres Guide](http://postgresguide.com/) -- practical tips from the community

---

Every developer who works with data ends up needing PostgreSQL skills. The commands in this cheat sheet cover 90% of what you will do day to day. Start with the basics, use `EXPLAIN ANALYZE` when things are slow, and always back up your databases.

*What PostgreSQL commands do you use most? Drop them in the comments below.*
