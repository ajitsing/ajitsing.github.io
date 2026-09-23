---
layout: post
seo: true
title: "Follower Reads Pattern in Distributed Systems"
subtitle: "How to serve queries from replicas so the leader stays fast, and how much staleness you accept in return"
date: 2026-09-23
categories: distributed-systems
thumbnail-img: /assets/img/posts/distributed-systems/follower-reads-thumb.png
share-img: /assets/img/posts/distributed-systems/follower-reads-thumb.png
permalink: /distributed-systems/follower-reads/
description: "Follower reads send queries to a replica instead of the leader. Learn staleness bounds, read your writes, and how CockroachDB, TiDB, MongoDB, PostgreSQL, Amazon Aurora, and Kafka do it."
keywords: "follower reads, follower reads pattern, follower read, read from replica, read replica, read replicas, database replication, replication lag, bounded staleness, exact staleness, read your writes, causal consistency, PostgreSQL read replica, PostgreSQL streaming replication, hot standby, Amazon Aurora reader endpoint, AWS RDS read replica, MongoDB read preference, MongoDB Atlas, CockroachDB follower reads, TiDB follower read, Kafka follower fetch, distributed database, cloud database, high availability, disaster recovery, multi region database, linearizability, eventual consistency, high watermark, Raft ReadIndex"
tags: [distributed-systems]
comments: true
social-share: true

quick-answer: "The **Follower Reads** pattern sends read only queries to a replica instead of the leader. Writes still go to the leader, which orders them and copies them out. Followers answer reads so the leader is not the bottleneck, and so a client can read from a copy in its own region. The follower is usually a little behind, so you either accept that lag, bound it (CockroachDB and Spanner stale reads), wait until the follower has caught up to your own write, or ask the leader for the latest commit index before the follower answers (TiDB, Raft ReadIndex)."

key-takeaways:
  - "Follower reads scale the read path and cut cross region latency. They do not make writes faster. Writes still have one home, the leader."
  - "A follower is behind the leader by some replication lag. If you read it with no extra check, you can miss a write that already succeeded."
  - "Safe follower reads only return data at or below the high watermark, so a client never sees a log entry that failover might throw away."
  - "Pick the guarantee per query: latest (leader or ReadIndex), read your own writes (session token or log index), bounded staleness (a few seconds old), or plain stale."
  - "Nearest replica routing matters as much as the consistency mode. A fresh read on another continent is often slower than a local read that is 100 milliseconds old."
  - "The same replicas are your failover copies. A replica you allow to lag for cheap reads is also the copy you will promote in a disaster. Those two goals pull in opposite directions."

faq:
  - question: "What is the follower reads pattern?"
    answer: "Follower reads is a distributed systems pattern where read only requests go to a follower replica instead of the leader. The leader still accepts writes and replicates them. Followers serve reads so the cluster can handle more queries, and so clients can read from a nearby copy. The tradeoff is that a follower may not have the latest writes yet."
  - question: "Are follower reads the same as read replicas?"
    answer: "Read replicas are the common database version of the same idea. A PostgreSQL hot standby, an AWS RDS read replica, an Amazon Aurora reader, and a MongoDB secondary are all followers you can query. The pattern name covers the consistency choices on top of that copy: how stale a read may be, whether you must see your own write, and how the client picks which replica to talk to."
  - question: "What consistency do follower reads provide?"
    answer: "It depends on the mode. A plain read from any follower is eventually consistent and can be stale. A bounded staleness read promises the data is no older than a limit you set. A read your writes session promises this client sees its own updates. A ReadIndex follower read can be as fresh as a leader read, because the follower checks the leader's commit index first. None of these is free. Fresher reads do more work or wait longer."
  - question: "What is bounded staleness?"
    answer: "Bounded staleness means the read is allowed to be old, but not older than a limit such as 5 or 10 seconds. The database picks the newest timestamp a nearby replica can serve inside that limit. CockroachDB exposes this with AS OF SYSTEM TIME with_max_staleness(). Google Spanner exposes the same idea as a max staleness timestamp bound. If no local replica is fresh enough, the read can fall back to the leader or return an error, depending on the setting."
  - question: "How do CockroachDB follower reads work?"
    answer: "CockroachDB lets a replica answer a historical read when the requested timestamp is at or below the range's closed timestamp. The closed timestamp is a line the leaseholder has promised not to write behind. follower_read_timestamp() returns a time far enough in the past (the docs recommend at least 4.2 seconds) that a local replica can usually answer without contacting the leaseholder. Bounded staleness, with_max_staleness(), picks that time dynamically but is limited to single row, single statement reads."
  - question: "How do you get read your writes consistency from a replica?"
    answer: "Remember the log position or timestamp of the client's last write, and send it with the next read. The follower either waits until it has applied that point, or the router sends the read to the leader if the follower is too far behind. MongoDB does this with causally consistent sessions and cluster time. On PostgreSQL you can compare pg_current_wal_lsn() from the primary with pg_last_wal_replay_lsn() on the standby. Pinning the session to one replica helps monotonic reads, but it does not by itself guarantee the client sees its own write."
  - question: "When should you not use follower reads?"
    answer: "Do not use a stale follower read for a decision that must see the latest committed write. That includes checking a balance before a withdrawal, decrementing the last unit of stock, enforcing a unique name, or reading cluster metadata that decides who the leader is. Those reads belong on the leader, or on a follower that first confirms the latest commit index. Stale reads are a good fit for product pages, timelines, search, and dashboards."
  - question: "What is the difference between TiDB follower read and CockroachDB follower reads?"
    answer: "TiDB follower read is a fresh read. The follower runs a Raft ReadIndex against the leader, waits until it has applied that commit index, then serves the data locally. You get strong consistency and an extra network round trip. CockroachDB stale follower reads skip the leaseholder entirely by reading at a timestamp in the past. TiDB buys leader CPU relief. CockroachDB buys lower latency in other regions, at the cost of staleness."

citations:
  - name: "Follower Reads (Patterns of Distributed Systems)"
    url: "https://martinfowler.com/articles/patterns-of-distributed-systems/follower-reads.html"
    author: "Unmesh Joshi"
  - name: "Designing Data-Intensive Applications, Chapter 5 (Replication)"
    url: "https://dataintensive.net/"
    author: "Martin Kleppmann"
  - name: "CockroachDB Follower Reads"
    url: "https://www.cockroachlabs.com/docs/stable/follower-reads.html"
    author: "Cockroach Labs"
  - name: "Timestamp bounds (Google Spanner)"
    url: "https://docs.cloud.google.com/spanner/docs/timestamp-bounds"
    author: "Google Cloud"
  - name: "TiDB Follower Read"
    url: "https://docs.pingcap.com/tidb/stable/follower-read/"
    author: "PingCAP"
  - name: "MongoDB Read Preference"
    url: "https://www.mongodb.com/docs/manual/core/read-preference/"
    author: "MongoDB"
  - name: "PostgreSQL Hot Standby"
    url: "https://www.postgresql.org/docs/current/hot-standby.html"
    author: "PostgreSQL Global Development Group"
  - name: "Replication with Amazon Aurora"
    url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html"
    author: "Amazon Web Services"
  - name: "etcd API guarantees"
    url: "https://etcd.io/docs/latest/learning/api_guarantees/"
    author: "etcd"
  - name: "In Search of an Understandable Consensus Algorithm (Raft)"
    url: "https://raft.github.io/raft.pdf"
    author: "Diego Ongaro and John Ousterhout"
---

A product page is read hundreds of times for every time someone edits it. If every one of those reads goes to the leader, the leader spends its life answering queries that any copy could have answered, and a user in Singapore waits on a round trip to Virginia for a page that barely changes.

That is the Follower Reads pattern. Writes still go to one [leader](/distributed-systems/leader-follower/){:target="_blank" rel="noopener"}. Reads go to a follower, often the closest one. You get more read throughput and lower latency. You also get a new question you have to answer on purpose: how old is this copy allowed to be?

{% include glossary-callout.html terms="follower-reads,high-watermark,eventual-consistency,linearizability,hybrid-logical-clock,replicated-log" %}

## <i class="fas fa-question-circle"></i> The Problem: Every Read Hits the Leader

In the [Leader and Followers](/distributed-systems/leader-follower/){:target="_blank" rel="noopener"} pattern, one node orders every change and copies that order to the rest through a [replicated log](/distributed-systems/replicated-log/){:target="_blank" rel="noopener"}. That solves consistency. It creates a traffic problem.

Two kinds of pain show up in production:

1. **The leader runs out of CPU.** Reads and writes share one process. A dashboard, a search box, or a feed can drown the node that is also trying to commit writes.
2. **The leader is far away.** In a multi region cluster the leader lives in one region. Every read from the other regions pays the full cross region round trip, even when a local replica already has the row.

Followers are already there. They received the log so they can take over if the leader dies. Leaving them idle between failovers is a waste. Follower reads put that copy to work.

```mermaid
flowchart LR
    C["fa:fa-user Clients in Singapore"]
    L["fa:fa-crown Leader<br/>Virginia"]
    F1["fa:fa-server Follower<br/>Virginia"]
    F2["fa:fa-server Follower<br/>Singapore"]

    C -->|"writes"| L
    C -->|"reads"| F2
    L -->|"replicate log"| F1
    L -->|"replicate log"| F2

    classDef client fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef leader fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#0f172a
    classDef near fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef far fill:#cffafe,stroke:#0891b2,stroke-width:2px,color:#0f172a

    class C client
    class L leader
    class F2 near
    class F1 far
```

{% include ads/in-article.html %}

The green box is the win: the read never leaves the region. The orange box is still the only place a write is allowed to land. Replication flows one way, from leader to followers. If you draw an arrow the other way for a write, you have left the pattern.

## <i class="fas fa-book-reader"></i> What Follower Reads Are

Follower Reads states that write requests go to the leader to keep a single order, and read only requests can go to the nearest follower.

That is the whole pattern. The interesting part is everything you have to get right so that "read from a copy" does not turn into "read a lie."

A follower read has four moving pieces:

1. **A replica that can apply the log.** It might be a PostgreSQL hot standby, a MongoDB secondary, a Kafka follower, a CockroachDB replica, or a TiKV peer. The name on the box changes. The job does not.
2. **A router.** Something picks which replica answers this query: the driver, a proxy, or the database gateway. "Nearest" is a choice, not an accident.
3. **A freshness rule.** The newest point the follower is allowed to show. That might be "whatever you have," "nothing older than 5 seconds," or "at least the write this client just did."
4. **A cutoff for uncommitted data.** The follower must not serve log entries that are still in flight. That cutoff is the [high watermark](/distributed-systems/high-watermark/){:target="_blank" rel="noopener"}.

Miss any one of these and you get a familiar outage. The router sends reads to a replica that is hours behind. Or the follower serves an entry the leader had not committed, the leader dies, and the entry vanishes while the user is staring at it.

## <i class="fas fa-clock"></i> The Catch: The Follower Is Behind

Replication is not instant. The leader appends a write and ships it to followers. With quorum replication it waits until a majority has stored the entry before it tells the client the write succeeded. A follower that was not in that majority, or one that has stored the entry but not applied it yet, can still be behind when the client's next request arrives.

That gap is **replication lag**. It is usually milliseconds. During a bulk load, a network blip, or a follower that is busy with a huge query, it can jump to seconds. Your read path has to have a plan for both.

There is a worse bug than lag. If a follower serves an entry the leader has not yet committed, a failover can erase it. The client saw a row that the cluster then forgot. The high watermark exists to stop that. Followers only serve entries at or below the commit index the leader has announced. Anything above that line is invisible, even if the bytes are already on disk.

So a plain follower read is always a read of the past, even when the past is 2 milliseconds ago. [Linearizability](/glossary/linearizability/){:target="_blank" rel="noopener"}, the guarantee that a read sees the latest completed write, is what you give up when you skip the leader. You can buy it back, and later in this post you will see how a follower checks the leader's commit index first to do exactly that, but it is not what you get by default. [Eventual consistency](/glossary/eventual-consistency/){:target="_blank" rel="noopener"} is the floor: if writes stop, every follower catches up. Production systems usually want something in between those two, not the floor and not the ceiling.

## <i class="fas fa-sliders-h"></i> Four Ways to Read From a Follower

You do not pick one mode for the whole database. You pick it per query. A product page and a balance check do not want the same answer.

| Mode | What the client is promised | What it costs | Where you see it |
|---|---|---|---|
| Plain stale | Whatever this follower has applied | Lowest latency, lag is unbounded unless you add a cutoff | PostgreSQL hot standby, MongoDB `secondary`, etcd serializable read |
| Bounded or exact staleness | Data no older than T, or exactly as of time T | A small, known age. No round trip to the leader if a nearby replica has already caught up past T | CockroachDB `AS OF SYSTEM TIME`, Spanner timestamp bounds |
| Read your writes | This client sees its own latest write. Other clients may still be behind | The follower waits, or the read is redirected, until it passes the client's token | MongoDB causal sessions, an app that waits on a PostgreSQL replay LSN |
| Fresh follower read | The same commit the leader would show | An extra round trip so the follower learns the latest commit index, then a local data read | TiDB follower read, Raft ReadIndex |

```mermaid
flowchart TD
    Q{"fa:fa-question-circle What does this query need?"}
    Q -->|"The latest committed value"| FRESH["fa:fa-crown Leader read<br/>or ReadIndex on a follower"]
    Q -->|"This user must see their own write"| RYW["fa:fa-user Send the write's index<br/>Follower waits, then answers"]
    Q -->|"A few seconds old is fine"| BOUND["fa:fa-clock Bounded staleness<br/>Nearest follower"]
    Q -->|"Show anything applied"| STALE["fa:fa-server Plain follower read<br/>Watch the lag"]

    classDef q fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#0f172a
    classDef fresh fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#0f172a
    classDef ryw fill:#cffafe,stroke:#0891b2,stroke-width:2px,color:#0f172a
    classDef bound fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef stale fill:#e2e8f0,stroke:#334155,stroke-width:2px,color:#0f172a

    class Q q
    class FRESH fresh
    class RYW ryw
    class BOUND bound
    class STALE stale
```

{% include ads/in-article.html %}

Read the diagram from the top every time you add a query. The mistake is picking the bottom box because it is fast, then using it for a check that cannot be wrong. Remaining stock, an account balance, "is this username taken," and "who is the leader" belong in the top box.

## <i class="fas fa-project-diagram"></i> How a Safe Follower Read Works

Three designs cover almost every system. One avoids the leader by reading the past. One waits until the follower has caught up to a client's own write. One asks the leader for the latest commit index, then reads the bytes locally.

### Reading the past: closed timestamps

CockroachDB, and Spanner before it, let a follower answer alone when the read is aimed at a timestamp that is already "closed."

The leader of a range (CockroachDB calls it the leaseholder) moves a marker called the **closed timestamp**. The promise is simple: no new write will be assigned a timestamp at or below that marker. The leader tells followers as the marker moves forward. A follower that has applied every write up to the marker can answer "what did this row look like at time T?" from its own disk, as long as T is at or below the marker.

Ask for `now()` and T is still open, so the follower cannot promise it has every write. Ask for a time a few seconds ago and the marker has usually passed it, so the local replica answers. The age of that answer is the price of not calling the leader.

CockroachDB wraps this in SQL. `follower_read_timestamp()` returns a timestamp far enough in the past that a local replica can usually serve it. The docs say to keep that at least **4.2 seconds** behind the present if you want the read to stay local instead of bouncing to the leaseholder.

```sql
SELECT * FROM products
AS OF SYSTEM TIME follower_read_timestamp()
WHERE sku = 'widget';
```

`with_max_staleness('10s')` is the bounded version. CockroachDB picks the newest timestamp a nearby replica can serve inside that window. It is picky: one statement, one row, and an index that covers the query. A `LIMIT 1` scan that might touch many rows is rejected. Exact staleness is the one you use when the read spans a transaction or more than one row.

```sql
BEGIN;
SET TRANSACTION AS OF SYSTEM TIME follower_read_timestamp();
SELECT * FROM products WHERE sku = 'widget';
SELECT * FROM inventory WHERE sku = 'widget';
COMMIT;
```

Those two statements share one timestamp, so they see one snapshot. You cannot mix this with writes in the same transaction. Follower reads are read only.

There is a second CockroachDB feature that sounds the same and is not. A **global table** can serve low latency reads from every region without a stale timestamp, because writes wait until every region has the data. You pay on the write, not on the read. If writes are rare and reads are everywhere, that trade can be the right one. If writes are common, the stale follower read is usually cheaper.

The clock underneath the timestamp is a [hybrid logical clock](/distributed-systems/hybrid-clock/){:target="_blank" rel="noopener"}. You do not have to read that post to use follower reads. You do need healthy clocks. If a node's clock is far off, the closed timestamp cannot move cleanly and local reads stop being local.

### Waiting for your own write

The second design keeps the read fresh for one client. The client remembers how far the log had gone when its write committed. The next read carries that point. The follower serves the read only after its applied index has caught up.

```mermaid
sequenceDiagram
    participant C as Client
    participant L as Leader
    participant F as Local follower
    C->>L: UPDATE profile SET name = 'Ava'
    L->>F: replicate log index 410
    L-->>C: committed at index 410
    Note over C: session stores 410
    C->>F: SELECT profile, min index 410
    Note over F: applied index is 402, wait
    F-->>C: name = Ava
```

{% include ads/in-article.html %}

The wait is the feature. Without it, the same user refreshes and sees the old name, then files a bug saying the save button is broken. With it, a follower that is a few milliseconds behind pauses briefly and then answers. If it is seconds behind, a good router gives up and sends that one read to the leader rather than making the user stare at a spinner.

MongoDB does this with causally consistent sessions. The driver tracks cluster time. A secondary blocks until it has applied that time. That timestamp is a hybrid logical clock. The lesson here is the token: a read your writes guarantee is a number the client carries, not a hope that the replica is fast today.

On PostgreSQL the same number is a WAL position:

```sql
-- primary, after the write commits
SELECT pg_current_wal_lsn();

-- standby, before serving this user's next read
SELECT pg_last_wal_replay_lsn();
```

The application waits until the standby's replay LSN is at least the LSN the primary returned. Then it runs the `SELECT`. That is follower reads with a session token, built from two functions instead of a database feature.

### Fresh data, local bytes: ReadIndex

Sometimes you want the latest value and you still do not want the leader to read the pages. Raft's answer is **ReadIndex**. The follower asks the leader for the current commit index. The leader confirms it is still the leader, usually by hearing back from a majority, replies with the index, and the follower waits until it has applied that index. Then the follower reads its own state machine.

The data comes from the follower. The freshness check still touches the leader, so you pay a round trip. This helps when the payload is large: a big scan, a report, a cross zone transfer of rows. It does little for a point read of one integer, because the extra round trip costs as much as just asking the leader.

TiDB's follower read is this design. `tidb_replica_read = 'closest-adaptive'` keeps small queries on the leader and sends large ones to a replica in the same zone. That split is the practical version of the rule above.

## <i class="fas fa-random"></i> Three Bugs Stale Reads Cause

Chapter 5 of [Designing Data-Intensive Applications](https://dataintensive.net/){:target="_blank" rel="noopener"} names three ways a lagging replica embarrasses you. They are worth memorizing, because each one needs a different fix.

**Read your writes.** You change your display name, the write hits the leader, and the next page load hits a follower that does not have it yet. You see the old name and assume the save failed. Fix: carry the write's index or timestamp, as in the sequence above. Routing this user to the leader for a few seconds after a write also works, and it is what a lot of application code does when the database has no session token.

**Monotonic reads.** You see the new name. You refresh. The load balancer picks a slower follower, and the old name is back. Time moved backwards for one user. Fix: pin the session to one replica, or remember the newest timestamp this client has already observed and refuse an older snapshot. Pinning alone does not give you read your writes. A pinned replica can still be behind the write you just did.

**Consistent prefix.** You see a comment before the post it replies to, because the comment and the post landed on different followers at different times. Fix: read both from the same replica, or read both at one snapshot timestamp. The CockroachDB transaction above pins both statements to a single `AS OF SYSTEM TIME`, so they share one snapshot. Two separate stale reads do not.

If you only remember one rule, make it this: staleness is fine when the user cannot tell, and it is a bug when the user just wrote the value they are now reading.

## <i class="fas fa-map-marker-alt"></i> Send the Read to the Nearest Follower

A fresh follower on another continent is still a slow read. Locality is half the pattern.

The router needs a notion of "close":

- **Zone or rack.** Kafka can fetch from the closest in sync replica so a consumer does not pull bytes across regions. The follower still only serves up to the high watermark, so you do not read uncommitted records. The setting lives in the [replica placement design](https://kafka.apache.org/documentation/#design_replicaplacement){:target="_blank" rel="noopener"}.
- **Latency window.** MongoDB's `nearest` read preference picks a member whose ping is within `localThresholdMS` of the fastest member. It does not prefer the primary. Pair it with `maxStalenessSeconds` if you want the driver to skip a secondary that has fallen too far behind.
- **Zone labels.** TiDB matches the `zone` label on the gateway and the replica, and prefers a local peer when you set `closest-replicas` or `closest-adaptive`.
- **Gateway to closest replica.** CockroachDB's SQL gateway forwards a sufficiently old read to the nearest replica that holds the range, follower or leaseholder.

"Nearest" without a staleness cap is how you end up reading a replica that was partitioned an hour ago and is still accepting connections. Pair it with a max age. Kafka's version of that cap is membership in the in sync replica set, plus the high watermark.

Tags help when nearest is the wrong question. A reporting job should hit a secondary tagged `usage=analytics`, even if a hotter secondary is closer. MongoDB tag sets and PostgreSQL connection strings that point at a dedicated standby are the same idea: not every follower is for every reader.

## <i class="fas fa-database"></i> How Real Systems Expose the Knob

The pattern is one idea. The product names are a pile of settings. This is the map.

### PostgreSQL, RDS, and Aurora

A PostgreSQL standby with `hot_standby = on` accepts queries while it replays the WAL. That is a plain stale follower read. Streaming replication is asynchronous unless you set `synchronous_standby_names`, so lag is whatever the network and the standby's disk are doing right now.

An **AWS RDS read replica** is this design as a managed service. You point reporting and product reads at the replica endpoint and keep writes on the primary. Lag can stretch into seconds under a heavy write burst. Treat it as eventual unless your application waits on the replay LSN.

**Amazon Aurora** is the exception people mix up with RDS. Aurora replicas share the cluster storage volume. They do not copy a second full dataset over the network. AWS documents replica lag as usually much less than 100 milliseconds after the writer commits, and it grows when the write rate spikes. You scale reads by connecting to the **reader endpoint**, which spreads connections across Aurora replicas. Up to 15 readers can sit in the cluster, including in other Availability Zones, and those same readers are the failover targets. Lag under 100 milliseconds is still lag. A read your writes bug can still happen inside that window. It is just a shorter window than a typical RDS replica.

Standby queries can also fight replay. A long `SELECT` on a hot standby either delays WAL replay on that standby or gets cancelled so replay can catch up, and `max_standby_streaming_delay` decides how long the standby waits before it cancels the query. Turning on `hot_standby_feedback` protects those queries instead, by telling the primary to hold off vacuuming rows the standby is still reading. The vacuum side of that fight is covered in [PostgreSQL MVCC and autovacuum](/postgresql-mvcc-autovacuum/){:target="_blank" rel="noopener"}. Teams running PostgreSQL very hot, including the layout in [how OpenAI scales PostgreSQL](/how-openai-scales-postgresql/){:target="_blank" rel="noopener"}, use replicas for exactly this read split.

### MongoDB and MongoDB Atlas

MongoDB calls the choice a **read preference**: `primary`, `primaryPreferred`, `secondary`, `secondaryPreferred`, or `nearest`. Anything except `primary` may return stale data, because secondaries apply the oplog asynchronously. Atlas uses the same replica set rules. The managed part does not remove the lag.

```javascript
db.products.find({ sku: "widget" }).readPref("nearest")
```

Transactions that read must use `primary`. Every statement in the transaction runs on the primary, so a secondary read preference is rejected.

For "the user must see their write," turn on a causally consistent session and use majority write concern plus majority read concern. The [causal consistency docs](https://www.mongodb.com/docs/manual/core/causal-consistency-read-write-concerns/){:target="_blank" rel="noopener"} spell out the guarantee: it holds on secondaries, not only on the primary. That is read your writes without pinning every session to the primary.

### CockroachDB and Spanner

Spanner is where the stale read was designed as a product feature. A strong read contacts the leader. An exact staleness read or a max staleness (bounded) read can be served by a replica that is up to date as of the chosen timestamp. The [timestamp bounds](https://docs.cloud.google.com/spanner/docs/timestamp-bounds){:target="_blank" rel="noopener"} page is the short version.

CockroachDB follows that split, with the SQL shown earlier. Two operational checks are worth knowing:

- `EXPLAIN ANALYZE` prints `used follower read` when the local replica actually served it. If that line is missing, you are paying leader latency and calling it a follower read.
- The metric `follower_reads.success_count` tells you whether the cluster is doing this in volume, or whether one test query worked once.

Exact staleness can still block on a long running write that left an intent at an old timestamp. CockroachDB's docs suggest running those reads in a `HIGH` priority transaction so they are less likely to sit in a wait queue. If your follower reads suddenly get slow, look for a transaction that has been open for a long time before you look at the network.

### TiDB

TiDB does not hand you a stale snapshot for its main follower read feature. It hands you ReadIndex plus a placement policy:

```sql
SET SESSION tidb_replica_read = 'closest-adaptive';
```

`closest-replicas` always prefers the same zone. `closest-adaptive` does that only when the optimizer thinks the read is large enough to pay for the ReadIndex round trip. `follower` and `leader-and-follower` still exist, and current docs point people at the closest variants when the goal is less cross zone traffic.

The cost shows up as CPU on TiKV, not only as latency. Every follower read does a ReadIndex, even if the scan returns one row. That is why the adaptive mode leaves small queries on the leader. Measure read traffic by zone before and after you flip the session variable. If cross zone bytes did not drop, the policy is not matching labels and you are still reading the leader.

### Kafka

Kafka consumers historically fetched only from the partition leader. Follower fetch lets a consumer in the same rack read from a local in sync replica instead. The follower will not serve past the high watermark, so the consumer still sees only committed records. Produce requests stay on the leader. This is a throughput and bandwidth feature. It is not a way to get a newer record than the leader has committed.

### etcd

etcd's default read is linearizable. The member you talk to may have to confirm with the leader, and you pay for that. Set the read consistency to **serializable** and the member can answer from its local applied state without that round trip. The [API guarantees](https://etcd.io/docs/latest/learning/api_guarantees/){:target="_blank" rel="noopener"} say this plainly: serializable reads can be stale, and that is the point.

Do not use the cheap mode for data that elects a leader or grants a lock. A stale view of "who owns this shard" is how you get two writers. The [consistent core](/distributed-systems/consistent-core/){:target="_blank" rel="noopener"} post walks through that failure. Serializable reads belong on values where a slightly older version is still a correct version.

## <i class="fas fa-balance-scale"></i> When to Use Follower Reads

Use them when the read is allowed to be a little old, or when the payload is large enough that serving it locally is worth a freshness check:

- Product pages, user profiles, timelines, and search results.
- Dashboards and reports that already say "as of a few seconds ago."
- Multi region deployments where the reader is not in the leader's region.
- Read heavy keys that would pin one leader core at 100 percent while followers sit idle.
- Large scans you would rather not pull across a zone, even if a ReadIndex round trip is required.

Keep the read on the leader when the result decides a write:

- Balances, inventory counts, and seat maps at the moment of purchase.
- Uniqueness checks.
- Anything inside a read write transaction that must see its own earlier statements. CockroachDB will not even let you combine follower reads with writes in one transaction.
- Metadata about leadership, leases, and membership.

A useful default: after a user writes, send that user's next few reads to the leader or attach a session token. Send everyone else's reads to a local follower. Most of the traffic is "everyone else."

Disaster recovery pulls the other way, and you should notice the tension. The replica you read from is often the replica you will promote when the primary dies. Async replication makes follower reads cheap and makes your recovery point worse, because the promoted replica may be missing the last seconds of writes. Synchronous replication makes the standby closer to the primary, which makes follower reads fresher, and it makes every commit wait on that standby. Pick the lag with both jobs in mind. A replica tuned only for cheap reads can be a poor failover target.

## <i class="fas fa-exclamation-triangle"></i> What Goes Wrong in Production

**Lag with no alarm.** The follower is up, so health checks pass, and it is 40 seconds behind. Users see old prices. Alert on replication lag itself, not only on "is the process alive." Put a ceiling in the client (`maxStalenessSeconds`, a max LSN gap, `with_max_staleness`) so a stuck follower is skipped instead of trusted.

**Serving past the high watermark.** This one loses data from the user's point of view. They saw a write, failover happens, the write was never committed, and it is gone. Followers must learn the commit index from the leader and hide anything above it.

**A partitioned follower that keeps serving.** Bounded staleness systems will keep answering at the last closed timestamp even when the follower cannot reach the leader. That is good for availability and bad if you thought "follower" meant "pretty fresh." The age only grows. If your product cannot show data from ten minutes ago, fail the read when the closed timestamp is too old.

**Clock skew.** Timestamp based follower reads depend on a bound between clocks. A node with a broken clock either stops serving local reads or, worse, serves a time it should not. Monitor the offset, and treat a node that drifts past the cluster's configured maximum as a node that needs fixing, not as a node that needs a wider window.

**Read your writes tested only on one node.** The bug hides when the developer laptop hits one database. It shows up when the pool has five replicas and the read after `POST` lands on a different one. Integration tests should write on the primary and immediately read with the same session against a replica.

**Using follower reads to dodge a missing index.** A slow query on the leader is usually still a slow query on the follower. You moved the pain and added lag. Fix the query, then decide if the read belongs off the leader.

## <i class="fas fa-flag-checkered"></i> Wrapping Up

Follower reads are how a leader and followers cluster survives its own success. The leader stays the only writer. The copies you already pay for start answering queries. Users in other regions stop waiting on a continent they do not live in.

The work is in the promise you attach to each read. Latest, read your writes, bounded staleness, or plain stale. Those are different products wearing one pattern name. Pick per query, carry a token when the user just wrote, and never let a follower serve past the high watermark.

Do that and the leader stops being a single crowded door. It goes back to the job it was elected for: deciding the order of writes, and letting everyone else read the result.

---

**Related posts:**

- [Leader and Followers Pattern](/distributed-systems/leader-follower/){:target="_blank" rel="noopener"} - The replication setup follower reads depend on
- [High Watermark](/distributed-systems/high-watermark/){:target="_blank" rel="noopener"} - The commit index a follower must not read past
- [Hybrid Logical Clock](/distributed-systems/hybrid-clock/){:target="_blank" rel="noopener"} - The timestamp CockroachDB and MongoDB use to order stale reads
- [Replicated Log](/distributed-systems/replicated-log/){:target="_blank" rel="noopener"} - The log followers apply before they can serve a read
- [Consistent Core](/distributed-systems/consistent-core/){:target="_blank" rel="noopener"} - Why metadata reads should stay linearizable
- [How OpenAI Scales PostgreSQL](/how-openai-scales-postgresql/){:target="_blank" rel="noopener"} - Read replicas as the practical version of this pattern
- [PostgreSQL MVCC and Autovacuum](/postgresql-mvcc-autovacuum/){:target="_blank" rel="noopener"} - How long queries on a standby push back on the primary

*Further reading: Unmesh Joshi's [Follower Reads chapter](https://martinfowler.com/articles/patterns-of-distributed-systems/follower-reads.html){:target="_blank" rel="noopener"} in Patterns of Distributed Systems; Chapter 5 of Martin Kleppmann's [Designing Data-Intensive Applications](https://dataintensive.net/){:target="_blank" rel="noopener"}; the [CockroachDB follower reads docs](https://www.cockroachlabs.com/docs/stable/follower-reads.html){:target="_blank" rel="noopener"}; [Spanner timestamp bounds](https://docs.cloud.google.com/spanner/docs/timestamp-bounds){:target="_blank" rel="noopener"}; [TiDB follower read](https://docs.pingcap.com/tidb/stable/follower-read/){:target="_blank" rel="noopener"}; [MongoDB read preference](https://www.mongodb.com/docs/manual/core/read-preference/){:target="_blank" rel="noopener"}; [PostgreSQL hot standby](https://www.postgresql.org/docs/current/hot-standby.html){:target="_blank" rel="noopener"}; and the [Raft paper](https://raft.github.io/raft.pdf){:target="_blank" rel="noopener"} for ReadIndex.*
