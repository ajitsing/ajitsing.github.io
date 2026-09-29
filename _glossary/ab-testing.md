---
title: "A/B Testing"
slug: "ab-testing"
also-known-as: ["AB testing", "Split testing", "Online controlled experiment", "Bucket test"]
category: "system-design"
date: 2026-09-28
definition: "A/B testing is a randomized experiment on live users. Each user is assigned to a control group, which sees the current experience, or a treatment group, which sees a change. You compare a metric you chose before the test started. Random assignment is what separates the effect of the change from day-of-week effects, campaigns, and other noise, as long as the split, the logging, and the sample size are sound."
key_takeaways:
  - "Control keeps today's experience. Treatment gets the change. The same user stays in one group for the whole test."
  - "One primary metric decides the result. Guardrail metrics (errors, latency, revenue, unsubscribes) can veto a ship."
  - "The sample size is set up front from the baseline rate and the smallest lift you care about."
  - "A mismatched split or a test stopped at the first green day can manufacture a winner that is not real."
how_it_works:
  - "Hash a stable user id with the experiment id so every server assigns the same variant."
  - "Log an exposure only when the user actually reaches the code that differs."
  - "Run until the planned sample size, across full weeks, unless you are using a sequential method designed for repeated looks."
  - "Check that the observed split matches the plan, then read the primary metric and the guardrails."
real_world:
  - "Product teams use it for checkout, signup, pricing, and ranking changes."
  - "Feature flags often deliver the split. The experiment adds the metric, the sample size, and the stopping rule."
  - "Platforms such as Optimizely, Statsig, GrowthBook, LaunchDarkly, and Eppo run the assignment and the statistics so teams do not hand-roll a stats engine."
related_terms: ["p-value", "statistical-significance", "minimum-detectable-effect", "sample-ratio-mismatch"]
related_posts:
  - "/ab-testing/"
  - "/feature-flags-guide/"
---
