---
title: "Row Level Security"
slug: "row-level-security"
also-known-as: ["RLS", "Row-Level Security", "Row Security Policies"]
category: "database"
date: 2026-07-14
definition: "Row Level Security, or RLS, is a database feature that restricts which rows a role can read or change, based on a policy expression evaluated for every query. In multi-tenant SaaS it is the usual safety net for shared-schema designs: a policy compares each row's `tenant_id` to a session variable like `app.current_tenant`, so even a forgotten `WHERE` clause cannot leak another customer's data. PostgreSQL, and managed engines built on it such as Amazon RDS and Aurora, support RLS through `CREATE POLICY` and `ENABLE ROW LEVEL SECURITY`."
key_takeaways:
  - "RLS is a database-layer safety net, not a replacement for application filters. Scope queries by tenant in the app, and let RLS catch the bugs you miss."
  - "In [PostgreSQL](/postgresql-cheat-sheet/), policies use `USING` for visible rows and `WITH CHECK` for inserted or updated rows. Enable them with `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`."
  - "Set tenant context with `SET LOCAL` (or `set_config(..., true)`) inside a transaction so pooled connections cannot leak one tenant into the next request."
  - "Table owners and roles with `BYPASSRLS` skip policies by default. Use `FORCE ROW LEVEL SECURITY` for the app role, and reserve bypass for migrations and audited admin work."
  - "Lead every tenant-scoped [index](/glossary/database-index/) with `tenant_id`. Without that, RLS still filters correctly but every query pays for a wider scan."
how_it_works:
  - "You enable RLS on a table and attach one or more policies that return true or false for each row."
  - "The application sets a session or transaction-local variable with the current tenant id before running queries."
  - "On every SELECT, INSERT, UPDATE, or DELETE, Postgres evaluates the policy and only allows rows that pass."
  - "If no policy applies to the role, the default is deny: no rows are visible or writable."
real_world:
  - "B2B multi-tenant SaaS products use RLS on shared tables so one customer's invoices, projects, and users stay invisible to every other customer."
  - "AWS documents RLS as the isolation backstop for the PostgreSQL pool model on Amazon RDS and Aurora."
  - "Admin dashboards and schema migrations usually run under a separate role that can bypass RLS, with access logged and short-lived."
related_terms: ["database-index", "acid", "database-lock", "sharding", "mvcc"]
related_posts:
  - "/multi-tenant-database-isolation/"
  - "/database-indexing-explained/"
  - "/how-openai-scales-postgresql/"
---
