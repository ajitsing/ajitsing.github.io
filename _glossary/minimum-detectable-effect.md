---
title: "Minimum Detectable Effect"
slug: "minimum-detectable-effect"
also-known-as: ["MDE", "Minimum detectable lift"]
category: "system-design"
date: 2026-09-28
definition: "The minimum detectable effect is the smallest lift an A/B test is designed to find. You pick it before the test, along with a confidence level (often 95%) and statistical power (often 80%). A smaller effect needs many more users. If your traffic cannot reach that sample in a reasonable time, the test cannot see the lift you care about, and a 'no difference' result is mostly the sample being too small."
key_takeaways:
  - "It is the smallest change worth detecting, chosen up front, not the lift you hope to see."
  - "A 10% relative lift on a 10% conversion rate is a move from 10% to 11%, and it needs on the order of 15,000 users per variant."
  - "The same relative lift on a rarer event, such as a 2% baseline, can need well over 80,000 users per variant."
  - "Effects smaller than the minimum detectable effect mostly stay invisible. That is part of the design."
how_it_works:
  - "Estimate the baseline rate of the primary metric from recent traffic."
  - "Choose the smallest relative or absolute lift that would change what you ship."
  - "Plug the baseline, that lift, 95% confidence, and 80% power into a sample size calculation."
  - "If you cannot collect that many users in a week or two, test a bigger change or a more frequent metric."
real_world:
  - "Sample size calculators such as Evan Miller's take a baseline rate and a minimum detectable effect and return users per variant."
  - "Checkout and signup tests on low-traffic products often cannot detect small conversion lifts, so teams test bolder changes."
  - "Experiment platforms use it to estimate how long a test must run before it can give a trustworthy answer."
related_terms: ["ab-testing", "p-value", "statistical-significance", "sample-ratio-mismatch"]
related_posts:
  - "/ab-testing/"
---
