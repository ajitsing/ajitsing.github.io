---
title: "Fencing Token"
slug: "fencing-token"
also-known-as: ["Epoch Number", "Generation Number"]
category: "distributed-systems"
date: 2026-05-22
definition: "A fencing token is a number that goes up every time a [lease](/glossary/lease/) or lock is given out. The resource being protected remembers the highest token it has seen and rejects any request with a smaller one. This stops a frozen holder from waking up after its lease has expired and writing to a resource it no longer owns."
key_takeaways:
  - "Fencing tokens fix the worst kind of locking bug. A slow or paused holder cannot write after its lease has been reassigned."
  - "The lease service has to hand out tokens that always go up, and the storage layer has to reject smaller tokens. Without both, the token does nothing."
  - "Without fencing, one long GC pause can corrupt shared state. Martin Kleppmann's 2016 post is a good read on this."
  - "Tokens, epochs, and generations all mean the same thing in different systems like ZooKeeper, etcd, Kafka, and HDFS."
how_it_works:
  - "When the lease service grants a lease, it stamps it with a token bigger than any token it has ever issued."
  - "The client sends the token along with every write to the protected resource."
  - "The resource compares the token to the highest one it has accepted. Anything smaller is rejected."
  - "When a new holder takes over, it gets a fresher token. Any late writes from the old holder fail safely."
real_world:
  - "Kafka's controller epoch and producer epoch are fencing tokens. They stop stale leaders and zombie producers from writing bad data."
  - "ZooKeeper uses the cversion or czxid of a znode as a natural fencing token for client side locking."
  - "HDFS NameNode lease recovery uses generation stamps as fencing tokens to invalidate stale block writes."
related_terms: ["lease", "ttl", "leader-election", "consensus", "split-brain"]
related_posts:
  - "/distributed-systems/lease/"
---
