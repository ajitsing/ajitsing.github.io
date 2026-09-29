---
title: "P-Value"
slug: "p-value"
also-known-as: ["p value", "Probability value"]
category: "system-design"
date: 2026-09-29
definition: "A p-value tells you how surprising your result would be if the change had no effect at all. Suppose both versions of an A/B test are truly the same. The p-value is the chance of still seeing a gap at least as big as yours, just by luck. A p-value of 0.03 means about 3 in 100. The smaller it is, the harder it is to explain the result as luck. Most teams call a result significant when the p-value is below 0.05."
key_takeaways:
  - "It answers one question: if nothing changed, how likely is a gap this big by luck alone?"
  - "A p-value of 0.03 does not mean there is a 97% chance your change works. It only measures how surprising the data is if the change did nothing."
  - "It says nothing about how big or how useful the lift is. Look at the size of the lift as well."
  - "It is only valid if you decide when to look in advance. Checking every day and stopping at the first p-value under 0.05 gives you false winners."
how_it_works:
  - "Start by assuming the two versions perform the same. This is called the null hypothesis."
  - "Measure the gap you saw. Example: 10,000 visitors on each checkout, 1,000 purchases on the old one (10%) and 1,100 on the new one (11%)."
  - "Ask how often luck alone would make one side lead by a point or more if both were identical. Here the answer is about 2 times in 100, so the p-value is about 0.02."
  - "Compare it to your cutoff, usually 0.05. 0.02 is below it, so the result is statistically significant."
  - "Same rates with only 5,000 visitors per side (500 vs 550 purchases) give a p-value of about 0.10. Luck could do that 10 times in 100, so it is not significant. The bigger the sample, the stronger the proof."
real_world:
  - "A/B testing tools show a p-value or a confidence interval next to each metric."
  - "Teams pick the cutoff, often 0.05, before the test starts so they do not move it after seeing the data."
  - "A very strict cutoff such as 0.0005 is used for sample ratio mismatch checks, so healthy tests rarely raise a false alarm."
related_terms: ["statistical-significance", "ab-testing", "minimum-detectable-effect", "sample-ratio-mismatch"]
related_posts:
  - "/ab-testing/"
---
