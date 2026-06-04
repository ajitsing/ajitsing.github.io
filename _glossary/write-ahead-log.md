---
title: "Write Ahead Log"
slug: "write-ahead-log"
also-known-as: ["WAL", "Commit Log", "Redo Log"]
category: "distributed-systems"
date: 2026-05-22
definition: "A write ahead log, or WAL, is a file that a database appends every change to before touching its real data files. Writing the change to the log first means the database can survive a crash. On restart, it replays the log to get back to a clean state. The same log is what other replicas read to stay in sync."
key_takeaways:
  - "WAL is what makes the D in ACID work. If the log entry is on disk, the change is safe even if the server dies right after."
  - "WAL turns slow random page writes into fast sequential ones. That is why so many modern databases are log structured."
  - "Replication is just a second reader of the log. Followers stay in sync by tailing the leader's WAL and replaying it."
  - "Together with [consensus](/glossary/consensus/) like [Raft](/glossary/raft/), the WAL becomes a [replicated log](/glossary/replicated-log/) that backs fault tolerant state machines."
how_it_works:
  - "Append a record that describes the change, like the transaction id, page id, and old or new value, to the end of the log file."
  - "Call fsync so the log is on disk before the change is acknowledged to the client."
  - "Apply the change to the in memory page cache or memtable."
  - "After a crash, replay log entries from the last checkpoint forward to rebuild a clean state."
real_world:
  - "PostgreSQL's WAL drives streaming replication, point in time recovery, and tools like Debezium."
  - "Apache Kafka exposes its log directly. Each topic partition is essentially a distributed WAL."
  - "Cassandra calls it the CommitLog and pairs it with the in memory memtable and on disk SSTables."
  - "etcd writes every Raft log entry to its WAL before applying it to the boltdb store."
related_terms: ["replicated-log", "consensus", "raft", "two-phase-commit", "high-watermark", "low-watermark", "lsm-tree", "mvcc"]
related_posts:
  - "/distributed-systems/replicated-log/"
---
