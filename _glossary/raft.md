---
title: "Raft"
slug: "raft"
also-known-as: ["Raft Consensus Algorithm"]
category: "distributed-systems"
date: 2026-05-22
definition: "Raft is a consensus algorithm from 2014 that gives the same fault tolerance as [Paxos](/glossary/paxos/) but is much easier to read and write. It splits the problem into three smaller pieces. Leader election picks a single leader. Log replication copies entries from the leader to followers. Safety rules make sure no two leaders disagree."
key_takeaways:
  - "Raft elects exactly one leader per term. It uses random election timeouts so two candidates rarely start at once."
  - "Every client write goes to the leader, which appends it to the log and copies it to followers. The entry is committed once a [majority quorum](/glossary/quorum/) has stored it."
  - "Followers reject log entries that conflict with their own log. The leader retries until the logs match."
  - "Raft powers etcd, Consul, CockroachDB, and TiKV, mostly because it is far easier to get right than classic Paxos."
how_it_works:
  - "A follower whose election timer fires becomes a candidate, bumps the term, votes for itself, and asks the others for votes."
  - "If it gets votes from a majority, it becomes leader and sends heartbeats to keep the others quiet."
  - "The leader appends client commands to its log and ships them to followers using AppendEntries calls."
  - "Once an entry is on a majority of nodes, the leader marks it committed and tells followers to apply it to their state."
real_world:
  - "etcd uses Raft to back the Kubernetes control plane."
  - "CockroachDB and TiDB run thousands of independent Raft groups, one per data range, so consensus scales out."
  - "Consul and Nomad use Raft for service discovery and orchestrator state."
related_terms: ["consensus", "paxos", "leader-election", "replicated-log", "heartbeat"]
related_posts:
  - "/distributed-systems/replicated-log/"
  - "/distributed-systems/heartbeat/"
  - "/distributed-systems/majority-quorum/"
---
