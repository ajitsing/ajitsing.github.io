---
title: "Sample Ratio Mismatch"
slug: "sample-ratio-mismatch"
also-known-as: ["SRM", "Sample ratio mismatch check"]
category: "system-design"
date: 2026-09-28
definition: "Sample ratio mismatch means an A/B test collected a split that is too far from the ratio you configured. A planned 50/50 test that lands at 51,000 versus 49,000 users on a sample of 100,000 is not a rounding error. The imbalance is evidence that assignment or logging is biased, and any lift you compute from that data is untrustworthy. The check uses a chi-square test, not a glance at the percentages, because a small-looking gap is extreme once the sample is large."
key_takeaways:
  - "Check the split before you read the lift. A significant metric on a mismatched sample is still a bad sample."
  - "Microsoft's widely used bar flags mismatch when the chi-square p-value is under 0.0005, so healthy tests rarely alarm."
  - "When the check fails, discard the result and fix the cause. Do not average it away or drop users until the ratio looks even."
  - "Common causes are a variant that errors before the exposure log, bot traffic, hash differences across services, and analytics blocked on only one path."
how_it_works:
  - "Count distinct exposed users in each variant."
  - "Compare those counts to the counts the configured ratio predicts, with a chi-square goodness-of-fit test."
  - "If the p-value is below a strict threshold such as 0.0005, declare a mismatch."
  - "Trace assignment, exposure logging, redirects, and bot filters. Rerun the test after the fix."
real_world:
  - "Experiment platforms run this check automatically and hide the metric results until it passes."
  - "A treatment page that is faster can be counted more often if you log the exposure late, which itself creates a mismatch."
  - "The diagnostic write-up most teams cite is the KDD 2019 paper from Microsoft, Diagnosing Sample Ratio Mismatch in A/B Testing."
related_terms: ["ab-testing", "p-value", "statistical-significance", "minimum-detectable-effect"]
related_posts:
  - "/ab-testing/"
---
