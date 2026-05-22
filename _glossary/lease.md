---
title: "Lease"
slug: "lease"
also-known-as: ["Time Bound Lease", "Lock with TTL"]
category: "distributed-systems"
date: 2026-05-22
definition: "A lease is a grant that gives one node exclusive access to a resource for a fixed amount of time, called the [TTL](/glossary/ttl/). The holder has to keep refreshing the lease with [heartbeats](/glossary/heartbeat/) before it runs out. If it crashes, freezes, or loses the network, the lease expires on its own and someone else can take over."
key_takeaways:
  - "A lease is a lock with an expiry. The TTL is what makes locking safe when holders can crash or freeze without notice."
  - "Always pair a lease with a [fencing token](/glossary/fencing-token/). Without it, a frozen holder can wake up after the lease has been reassigned and corrupt the resource."
  - "Leases need a strongly consistent store like etcd, ZooKeeper, or Chubby. Using Redis or another best effort store risks split brain."
  - "A short TTL gives faster failover but more renewal traffic. A long TTL is cheaper but recovers slower."
how_it_works:
  - "A client asks the lease service for a lease on a resource with a chosen TTL."
  - "The service stores a record with the holder id, the TTL, and a fencing token that always goes up."
  - "The holder sends a heartbeat every so often to push the expiry forward."
  - "If the heartbeats stop, the lease expires and another node can grab it with a higher fencing token."
real_world:
  - "Kubernetes uses Lease objects for kubelet liveness and for controller manager leader election."
  - "etcd's Grant and KeepAlive APIs are the basis of distributed locks, leader election, and service discovery in many cloud systems."
  - "HDFS uses leases to make sure only one client can write to a file at a time."
related_terms: ["fencing-token", "ttl", "heartbeat", "leader-election", "consensus"]
related_posts:
  - "/distributed-systems/lease/"
  - "/distributed-systems/heartbeat/"
related_tools: ["snowflake-decoder"]
---
