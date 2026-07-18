---
title: "Double-Entry Ledger"
slug: "double-entry-ledger"
also-known-as: ["Double-Entry Bookkeeping", "Double-Entry Accounting", "Financial Ledger"]
category: "system-design"
date: 2026-07-18
definition: "A double-entry ledger records every money movement as two matching entries: a debit on one account and a credit on another, for the same amount. The books are correct only when total debits equal total credits, which turns accounting into an invariant a computer can check. Payment systems store the ledger as an append-only table, never updating balances in place, so every transaction has a permanent, auditable trail."
key_takeaways:
  - "Every entry has two sides. A debit to one account is always matched by an equal credit to another, so the ledger always balances."
  - "The ledger is append-only. You never edit or delete a row; a correction is a new pair of entries, which keeps a full audit trail."
  - "Balances are derived by summing entries, not stored and mutated, which removes a whole class of race conditions and drift."
  - "The balance invariant (debits equal credits) is a cheap, constant check that catches bugs, partial writes, and fraud early."
how_it_works:
  - "Each financial event (charge, refund, payout, fee) is written as two or more rows that sum to zero across accounts."
  - "Rows are inserted inside one database transaction so a partial write can never leave the books unbalanced."
  - "An account balance is computed by summing its debit and credit rows, often cached in a rollup table for speed."
  - "Corrections are made by appending reversing entries, never by editing history, so the ledger stays immutable."
real_world:
  - "Stripe, PayPal, and Square all model money movement on an immutable double-entry ledger."
  - "TigerBeetle is a database built specifically for high-throughput double-entry accounting."
  - "Banks have used double-entry bookkeeping for centuries; payment platforms encode the same idea in software."
related_terms: ["acid", "idempotent-receiver", "saga-pattern", "transactional-outbox", "eventual-consistency"]
related_posts:
  - "/payment-system-design/"
  - "/how-stripe-prevents-double-payment/"
  - "/how-databases-store-data-internally/"
---
