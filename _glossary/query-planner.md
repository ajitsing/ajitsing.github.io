---
title: "Query Planner"
slug: "query-planner"
also-known-as: ["Query Optimizer", "Planner/Optimizer"]
category: "database"
date: 2026-06-04
definition: "The query planner is the part of a database that turns a SQL statement into an execution plan. It is a cost-based optimizer: it considers many ways to run the query, such as a sequential scan versus an [index](/glossary/database-index/) scan, or different join orders and methods, estimates the cost of each using table statistics, and picks the cheapest. The executor then runs that plan. Bad statistics, not bad SQL, are the most common cause of a slow plan."
key_takeaways:
  - "The planner chooses the plan; you only describe the result. Two equivalent queries can run very differently depending on its choice."
  - "It is cost based, estimating row counts from statistics like Postgres's pg_statistic, then picking the lowest estimated cost."
  - "Stale or missing statistics lead to bad estimates and bad plans, which is why ANALYZE and [autovacuum](/glossary/autovacuum/) matter."
  - "EXPLAIN shows the chosen plan; EXPLAIN ANALYZE runs it and shows estimated versus actual rows, which is the fastest way to debug slow queries."
how_it_works:
  - "The parser turns SQL text into a tree, and the rewriter expands views and rules."
  - "The planner enumerates candidate plans: scan methods, join orders, and join algorithms."
  - "It estimates the cost of each candidate from table statistics and picks the cheapest."
  - "The executor pulls rows through the chosen plan one node at a time."
real_world:
  - "PostgreSQL's planner is a classic cost-based optimizer driven by pg_statistic and EXPLAIN ANALYZE."
  - "MySQL, SQL Server, and Oracle all ship cost-based optimizers with their own statistics and hints."
  - "Query hints and planner settings let you nudge the optimizer when its estimates are wrong."
related_terms: ["database-index", "mvcc", "lsm-tree", "autovacuum"]
related_posts:
  - "/postgresql-internals-how-queries-execute/"
  - "/database-indexing-explained/"
---
