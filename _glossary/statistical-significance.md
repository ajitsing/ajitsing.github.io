---
title: "Statistical Significance"
slug: "statistical-significance"
also-known-as: ["Significance", "p-value threshold"]
category: "system-design"
date: 2026-09-28
definition: "Statistical significance means a result is unlikely if there were truly no difference, at a threshold you chose in advance. In A/B testing that threshold is usually 5%: a p-value under 0.05. It is a filter on noise. It does not say how large the effect is, and a tiny lift on a huge sample can be significant while still being too small to act on. Read it with the confidence interval and the practical size of the lift."
key_takeaways:
  - "A p-value under 0.05 means a gap at least this large would be uncommon if control and treatment were the same."
  - "The threshold is set before you look. Stopping at the first day that crosses it, on a fixed-horizon test, inflates false positives."
  - "Significance is not the same thing as a lift large enough to be worth shipping."
  - "About one in twenty tests of a change that does nothing will still cross a 5% bar. That is the trade you accepted."
how_it_works:
  - "Assume the null: the two variants are the same, and any gap is chance."
  - "Compute how surprising the observed gap is under that assumption. That surprise is the p-value."
  - "If the p-value is below the threshold you set (often 0.05), call the result statistically significant."
  - "Check the confidence interval. If it still includes 'no meaningful lift,' you have not pinned the effect down."
real_world:
  - "Experiment platforms report a p-value or a confidence interval next to each metric."
  - "Sequential tests adjust the math so repeated looks during the experiment stay valid."
  - "Shipping decisions at mature teams require a significant primary metric and healthy guardrails, not a significant result on a metric chosen afterward."
related_terms: ["p-value", "ab-testing", "minimum-detectable-effect", "sample-ratio-mismatch"]
related_posts:
  - "/ab-testing/"
---
