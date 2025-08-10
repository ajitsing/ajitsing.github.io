---
layout: post
seo: true
title: "From Panic to Performance: A Guide to Grafana k6 Load Testing"
subtitle: "From panic to performance confidence – scripting, scaling, observing, and automating load tests with k6"
date: 2025-08-10
permalink: /performance-testing-with-grafana-k6/
share-img: /assets/img/posts/performance_testing/cover.png
thumbnail-img: /assets/img/posts/performance_testing/cover.png
description: "Performance testing using Grafana k6: scripting basics, checks, thresholds, scenarios, custom metrics, observability, CI/CD automation, and best practices."
keywords: "performance testing, load testing, Grafana k6, k6 scenarios, k6 thresholds, k6 checks, DevOps, SRE, reliability engineering, k6 GitHub Actions"
tags: ["performance-testing", "testing"]
---

## 1. From Firefighting to Foresight

Your team just shipped a new personalization API. Marketing ran a campaign. Traffic spiked. Latency tripled. Dashboards lit up. Postmortem pain followed.

The root cause wasn’t a missing feature – it was missing **evidence**. No baseline, no capacity model, no load profile, no automated performance guardrails.

This week, you decide to change that. Enter **Grafana k6** – an open source, developer-centric performance testing tool that feels like writing integration tests, but for traffic at scale.

In this guide, we’ll rebuild performance confidence step‑by‑step – the same way a real team would.

---
## 2. Why k6?

| Need | k6 Advantage |
|------|--------------|
| Developer friendly | JavaScript ES2015+ scripting model |
| Shift-left | Run locally, in CI, in containers, or k6 Cloud |
| Production realism | Scenarios: arrival-rate, distributed VUs, ramping patterns |
| Rich validation | Checks, thresholds, tags, custom metrics |
| Observability | Native outputs to Prometheus / InfluxDB / JSON + Grafana dashboards |
| Automation | Deterministic exit codes based on SLO thresholds |
| Extensibility | xk6 extensions (GRPC, Redis, Kafka, WebSockets, Browser) |

---
## 3. First Script: Baseline Request

Create `scripts/smoke.js`:

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 5,              // virtual users
  duration: '30s',     // total test duration
};

export default function () {
  const res = http.get('https://api.example.com/health');
  check(res, {
    'status is 200': r => r.status === 200,
    'response < 200ms': r => r.timings.duration < 200,
  });
  sleep(1);
}
```

Run it:

```bash
k6 run scripts/smoke.js
```

Key output sections:
- **checks**: functional expectations
- **http_req_duration**: aggregate latency
- **iterations / vus**: workload profile

---
## 4. Add SLO Guardrails with Thresholds

Thresholds fail the test if SLOs degrade – perfect for CI.

```javascript
export const options = {
  vus: 10,
  duration: '1m',
  thresholds: {
    http_req_failed: ['rate<0.01'],              // <1% errors
    http_req_duration: ['p(95)<400', 'avg<250'], // latency SLO
  },
};
```

If violated, k6 exits with non‑zero status -> pipeline fails.

---
## 5. Realistic Scenarios: Spikes, Ramps & Constant Rate

`scenarios.js`:

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    ramp_up: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 50 },
        { duration: '2m', target: 50 },
        { duration: '30s', target: 0 },
      ],
      exec: 'browse',
    },
    sustained_api: {
      executor: 'constant-arrival-rate',
      rate: 100,               // requests per second
      timeUnit: '1s',
      duration: '3m',
      preAllocatedVUs: 60,
      maxVUs: 120,
      exec: 'api',
    },
    spike: {
      executor: 'per-vu-iterations',
      vus: 100,
      iterations: 1,
      gracefulStop: '30s',
      exec: 'login',
    },
  },
  thresholds: {
    'http_req_duration{type:api}': ['p(95)<500'],
    'checks{scenario:login}': ['rate>0.99'],
  },
};

export function browse () {
  http.get('https://example.com/');
}

export function api () {
  const res = http.get('https://api.example.com/v1/products');
  check(res, { '200': r => r.status === 200 });
}

export function login () {
  const payload = JSON.stringify({ user: 'test', pass: 'secret' });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://api.example.com/login', payload, { headers, tags: { scenario: 'login' } });
  check(res, { 'login ok': r => r.status === 200 });
}
```

### Explaining the Settings

#### scenarios.ramp_up (executor: ramping-vus)
Simulates organic growth, then steady usage, then traffic tapering off.
- startVUs: begin with zero users.
- stages: time-sequenced target VU changes.
  - 1m → target 50: warm‑up & ramp period (reveals connection pool / JIT / cache effects).
  - 2m @ 50: steady plateau to collect statistically meaningful latency.
  - 30s → 0: controlled ramp down to free resources cleanly.
- exec: browse – links this scenario to the `browse` function (lightweight page fetches).

#### scenarios.sustained_api (executor: constant-arrival-rate)
Models an API receiving a consistent external request rate regardless of how many VUs are required.
- executor: constant-arrival-rate drives RPS (requests per second) explicitly; k6 auto-scales active VUs to meet `rate`.
- rate: target of 100 iterations (requests) every `timeUnit`.
- timeUnit: '1s' → rate interpreted per second.
- duration: run length (3 minutes) to observe stabilization & GC cycles.
- preAllocatedVUs: initial pool of VUs reserved to avoid jitter at start.
- maxVUs: upper ceiling to prevent uncontrolled scaling (safety bound if SUT slows).
- exec: api – runs the heavier product list endpoint.

Why arrival‑rate over ramping VUs? It holds throughput constant so latency variations reflect system strain, not fluctuating concurrency patterns.

#### scenarios.spike (executor: per-vu-iterations)
Exercises a sudden burst such as a login storm after a push notification.
- vus: spawns 100 virtual users instantly.
- iterations: each VU executes the function exactly once (1 login attempt) – pure burst.
- gracefulStop: allows up to 30s for any hanging requests to finish before force termination.
- exec: login – the critical authentication path.

#### thresholds
Global pass/fail performance gates applied to filtered metrics.
- 'http_req_duration{type:api}': ['p(95)<500']
  - Metric: built-in request duration.
  - Tag filter: only samples where you added `type=api` as a tag (you could add `tags: { type: 'api' }` in the `api` function for clarity).
  - Condition: 95th percentile must stay under 500 ms. If exceeded → test exits non‑zero.
- 'checks{scenario:login}': ['rate>0.99']
  - Metric: aggregate success ratio of `check()` calls.
  - Tag filter: only for samples tagged with `scenario=login` (added automatically when using tags on the POST request or inherited from the scenario context).
  - Condition: at least 99% of login checks must pass.

#### Executors Recap

| Executor | Use Case | Key Control | Typical Question Answered |
|----------|----------|-------------|---------------------------|
| `ramping-vus` | Organic traffic ramp / soak prep | VU count over time | How do caches / warmup behave? |
| `constant-arrival-rate` | SLA / capacity validation at target RPS | Requests per time unit | Can we sustain 100 RPS within p95 SLO? |
| `per-vu-iterations` | Burst / spike / stress snapshot | Fixed iterations per VU | What happens on a sudden surge? |

#### VUs vs Arrival Rate
- VUs (virtual users) approximate concurrent actors. Ramp patterns show scaling and saturation characteristics.
- Arrival rate fixes throughput; VU usage becomes an internal mechanism. If latency increases, required VUs climb → early signal of saturation.

#### Tagging Strategy
Add tags (e.g., `{ type: 'api', endpoint: 'products' }`) to:
- Filter thresholds precisely.
- Break down dashboards by scenario / endpoint.
- Attribute regressions to a specific path.

#### Practical Tuning Tips
- Keep ramp stages long enough (≥ p95 * several hundred samples) for percentile stability.
- Use `constant-arrival-rate` for SLA confirmation before launches.
- Add separate spike scenario to isolate cold path / lock contention issues.
- Raise `preAllocatedVUs` if you observe early under-shooting of target RPS.
- Always cap `maxVUs` to avoid runaway load if the system slows drastically.

**Summary:** These combined scenarios create a realistic composite load: gradual adoption, steady sustained business traffic, and acute spike risk — all enforced by objective SLO-style thresholds for fast feedback and CI gating.

**Why multiple thresholds?** Separate latency (performance) and correctness (functional) signals reduce false positives and clarify remediation priority.

---
## 6. Data-Driven & Parameterized Tests

`data.js`:

```javascript
import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', () => JSON.parse(open('./users.json')));

export const options = { vus: 20, duration: '45s' };

export default function () {
  const user = users[__ITER % users.length];
  const res = http.get(`https://api.example.com/users/${user.id}`);
  check(res, { 'user fetched': r => r.status === 200 });
}
```

`users.json` example:

```json
[
  { "id": 101 },
  { "id": 102 },
  { "id": 103 }
]
```

Use environment variables for secrets:

```bash
API_BASE=https://api.example.com \
TOKEN=$(op read op://secrets/api_token) \
k6 run data.js
```

In script:
```javascript
const BASE = __ENV.API_BASE;
```

---
## 7. Checks vs Thresholds vs Assertions

| Concept | Scope | Purpose |
|--------|-------|---------|
| check() | Per response | Functional validation; contributes to `checks` metric |
| Threshold | Aggregated metric | Enforce SLOs; fails run on breach |
| Custom logic (throw) | Immediate | Hard stop for critical scenarios |

---
## 8. Custom & Trend Metrics

```javascript
import { Trend, Counter } from 'k6/metrics';

const queueDelay = new Trend('queue_delay_ms');
const authFailures = new Counter('auth_failures');

export default function () {
  const start = Date.now();
  // simulate internal queue wait
  sleep(Math.random() * 0.05);
  queueDelay.add(Date.now() - start);

  const res = http.get('https://api.example.com/auth/ping');
  if (res.status !== 200) authFailures.add(1);
}
```

Visualize custom metrics in Grafana (Prometheus / Influx pipeline described next).

---
## 9. Observability: Streaming to Grafana

### Option A: Prometheus Remote Write

Run k6 with output:
```bash
k6 run --out experimental-prometheus-rw --tag test=baseline scenarios.js \
  --address 0.0.0.0:6565 \
  -e API_BASE=https://api.example.com
```
Point to your Prometheus remote-write endpoint via env vars (`K6_PROMETHEUS_RW_SERVER_URL`).

### Option B: InfluxDB + Grafana

```bash
docker run -d --name influx -p 8086:8086 influxdb:2
export K6_INFLUXDB_ORGANIZATION=myorg
export K6_INFLUXDB_BUCKET=perf
export K6_INFLUXDB_TOKEN=secret
k6 run --out influxdb=http://localhost:8086 scenarios.js
```

Import a k6 Grafana dashboard (ID: 2587 or community variants) and correlate with application metrics.

### Correlation Workflow
1. Run k6 scenario tagged with `scenario`, `type`.
2. Use Grafana to filter: `http_req_duration{scenario="sustained_api"}`
3. Overlay with service latency & DB CPU.
4. Pin p95 regression panels.

---
## 10. GitHub Actions CI Integration

`.github/workflows/perf.yml`:

```yaml
name: performance
on:
  pull_request:
    paths: ['api/**']
  workflow_dispatch: {}

jobs:
  k6:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install k6
        uses: grafana/setup-k6-action@v1
      - name: Run smoke performance test
        run: k6 run scripts/smoke.js
      - name: Run gated scenario test
        run: |
          k6 run scenarios.js || echo "Performance regression detected" && exit 1
```

Failing thresholds stop merges: true shift‑left.

---
## 11. Scaling Beyond One Machine

| Need | Approach |
|------|----------|
| Higher concurrency | k6 Cloud (managed scaling) |
| Kubernetes-native | k6 Operator (CRDs define tests) |
| Protocol diversity | xk6 extensions (Kafka, Redis, Browser) |
| Browser + API mix | k6 Browser module (Chromium drive) |

**k6 Operator Example (CRD excerpt):**
```yaml
apiVersion: k6.io/v1alpha1
kind: K6
metadata:
  name: api-load
spec:
  parallelism: 4
  script:
    configMap:
      name: k6-script
      file: scenarios.js
```

---
## 12. Performance Analysis Heuristics

| Symptom | Likely Cause | Next Step |
|---------|-------------|-----------|
| Rising p95 only | Tail latency, GC pauses | Inspect memory, heap profiling |
| Uniform latency shift | Network / dependency slowdown | Trace upstream services |
| Error spike + low latency | Fast failures (auth / rate limit) | Examine response codes |
| High latency + CPU low | Lock contention / I/O wait | Thread dumps / slow queries |
| RPS plateaus early | Bottleneck before target concurrency | Load test dependency services |

---
## 13. Best Practices Checklist

- Start with **small smoke tests** on every PR.
- Define **SLO-aligned thresholds** (p95, error rate) early.
- Model **realistic traffic mix** (browsing vs API vs auth spike).
- Keep **scripts versioned** alongside code; treat as test artifacts.
- **Tag everything**: scenario, endpoint, version, commit SHA.
- Stream to **Grafana**; correlate with infra + APM traces.
- Use **arrival-rate executors** for RPS targets (not just VUs).
- Add **custom business metrics** (e.g., `orders_per_second`).
- Run **capacity tests** before major launches.
- Automate **regression gates** in CI.
- Periodically **refresh test data** to avoid caching distortion.

---
## 14. From Panic to Performance Maturity

Two weeks later, marketing launches again. This time:
- You ran capacity & spike tests in staging.
- Bottlenecks (N+1 query + slow Redis pipeline) were fixed pre-launch.
- Dashboards show stable p95, zero error threshold violations.
- Leadership sees green SLOs. Users see speed.

The difference wasn’t luck – it was **intentional performance engineering** powered by k6.

---
## 15. Quick Reference Cheat Sheet

| Goal | Snippet |
|------|---------|
| Basic test | `vus/duration` in `options` |
| Multiple patterns | `scenarios` map |
| Enforce SLO | `thresholds` with p95 / error rate |
| Validate responses | `check(res, {cond})` |
| Add metadata | `http.get(url, { tags: { type: 'api' }})` |
| Custom metric | `new Trend('name').add(val)` |
| Load profile RPS | `constant-arrival-rate` executor |
| Data reuse | `new SharedArray(...)` |
| Secret config | `__ENV.MY_VAR` |
| CI failure | Non-zero exit on threshold breach |

---
## 16. Resources

- [Official k6 Documentation](https://k6.io/docs/)
- [k6 Examples Repository](https://github.com/grafana/k6-examples)
- [xk6 Extensions Hub](https://github.com/grafana/xk6)
- [k6 Kubernetes Operator](https://github.com/grafana/k6-operator)
- [k6 Browser Module Guide](https://k6.io/docs/using-k6-browser/)
- [Prometheus Remote Write Output Guide](https://k6.io/docs/results-output/real-time/prometheus-remote-write/)
- [Grafana k6 Blog Articles](https://grafana.com/blog/tags/k6/)
- [Performance Test Thresholds Best Practices](https://k6.io/docs/using-k6/thresholds/)

---
**Final Thought:** Performance isn’t a phase – it’s a **habit**. k6 lets you encode that habit as code, observable data, and enforceable standards.

If you found this helpful, share it or adapt the snippets to your stack. Have a twist on these patterns? Drop a comment.
