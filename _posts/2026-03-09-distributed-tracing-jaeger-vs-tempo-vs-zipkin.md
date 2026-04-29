---
layout: post
seo: true
title: "Distributed Tracing: Jaeger vs Tempo vs Zipkin"
subtitle: "Storage backends, sampling strategies, cost at scale, and how to pick the right one for your microservices stack"
date: 2026-03-09
categories: devops
thumbnail-img: /assets/img/posts/devops/distributed-tracing-jaeger-tempo-zipkin.png
share-img: /assets/img/posts/devops/distributed-tracing-jaeger-tempo-zipkin.png
permalink: /distributed-tracing-jaeger-vs-tempo-vs-zipkin/
description: "Compare Jaeger, Grafana Tempo, and Zipkin for distributed tracing in microservices. Covers storage backends, sampling strategies, OpenTelemetry setup, cost at scale, and a practical guide to picking the right tool in 2026."
keywords: "distributed tracing, distributed tracing tools, Jaeger vs Zipkin, Jaeger vs Tempo, Grafana Tempo vs Jaeger, Zipkin vs Jaeger, OpenTelemetry distributed tracing, distributed tracing microservices, what is distributed tracing, distributed tracing tutorial, distributed tracing best practices, Jaeger tutorial, Zipkin tutorial, Grafana Tempo setup, distributed tracing Kubernetes, distributed tracing Python, trace sampling, tail-based sampling, head-based sampling, OpenTelemetry spans traces, how distributed tracing works, distributed tracing vs logging, observability tools 2026, Jaeger storage backends, Tempo object storage S3, W3C trace context, B3 propagation, microservices observability, distributed systems tracing, Jaeger all-in-one, tracing tools comparison 2026, open source APM, OpenTelemetry collector setup, TraceQL query language, CNCF tracing, Jaeger CNCF graduated, Grafana LGTM stack, observability three pillars, service dependency graph, Jaeger adaptive sampling, distributed tracing cost, trace retention, span attributes, distributed tracing Go Java Python, OpenTelemetry auto-instrumentation"
comments: true
social-share: true
tags: [devops, system-design, software-engineering]

quick-answer: "**Zipkin** if you need something running in under five minutes for learning or a small project. **Jaeger** if you want a battle-tested, standalone tracing backend with rich visualization, adaptive sampling, and a service dependency graph. **Grafana Tempo** if you are already on the Grafana stack and need cheap, high-volume trace retention backed by object storage like S3 or GCS."

key-takeaways:
  - "All three support OpenTelemetry. Your instrumentation code does not change when you switch backends."
  - "Zipkin is the oldest and simplest. Good for learning and small projects, not for production scale."
  - "Jaeger is a CNCF graduated project from Uber. It has the richest feature set for standalone use and adaptive tail sampling."
  - "Grafana Tempo stores traces in object storage (S3, GCS, Azure Blob). It is dramatically cheaper per GB at scale than Jaeger with Elasticsearch."
  - "Sampling strategy matters more than which backend you pick. Bad sampling means you miss the traces that actually matter."
  - "Distributed tracing alone is not enough. You need logs and metrics alongside it to get the full picture."

faq:
  - question: "What is distributed tracing?"
    answer: "Distributed tracing tracks a single request as it travels through multiple services in a distributed system. Each service records a span, which is a unit of work with a name, timing data, and optional metadata. All spans from the same request share a trace ID, so you can reconstruct the full path of a request and see exactly where time was spent or errors occurred."
  - question: "What is the difference between Jaeger and Zipkin?"
    answer: "Both are open-source distributed tracing systems, but Jaeger was built more recently (2015 by Uber), is written in Go, is a CNCF graduated project, and has features like adaptive sampling, a service dependency graph, and richer UI. Zipkin was created by Twitter in 2012, is written in Java, and is simpler to set up but lacks features for large-scale production use."
  - question: "What is Grafana Tempo and how is it different from Jaeger?"
    answer: "Grafana Tempo is a distributed tracing backend from Grafana Labs released in 2020. The key difference from Jaeger is storage: Tempo stores traces in object storage like Amazon S3 or Google Cloud Storage instead of Elasticsearch or Cassandra. This makes Tempo significantly cheaper at high trace volumes. Tempo also integrates natively with Grafana, Loki, and Prometheus for correlated observability."
  - question: "Do I need OpenTelemetry for distributed tracing?"
    answer: "You do not need it strictly, but you should use it. OpenTelemetry is the industry-standard observability framework that works with all major tracing backends including Jaeger, Tempo, and Zipkin. Using OpenTelemetry means your instrumentation code is vendor-neutral. You can switch from Jaeger to Tempo without rewriting any application code."
  - question: "What is trace sampling and why does it matter?"
    answer: "Sampling is the decision of which requests to record full traces for. Recording every trace at production volume generates enormous storage costs. Head-based sampling decides at the start of a request (simple, low overhead, but misses slow tail events you have not seen yet). Tail-based sampling decides after the request completes (more accurate, captures errors and slow requests, but harder to implement). Jaeger supports adaptive tail sampling natively. Tempo supports tail sampling via the OpenTelemetry Collector."
  - question: "Is Jaeger free to use?"
    answer: "Yes. Jaeger is fully open-source under the Apache 2.0 license. You run it yourself and pay for infrastructure: Elasticsearch or Cassandra for storage and compute for the Jaeger backend. Managed Jaeger is available on AWS, and via the Red Hat OpenShift distributed tracing platform."
  - question: "Can Zipkin handle production workloads?"
    answer: "For small to medium applications, yes. Zipkin supports Cassandra and Elasticsearch as storage backends, which can handle significant volumes. But Zipkin lacks adaptive sampling, multi-tenancy, and the advanced querying capabilities of Jaeger and Tempo. Most teams outgrow Zipkin when tracing becomes central to debugging production. If you are starting fresh, Jaeger or Tempo is a better long-term choice."
  - question: "What is the Grafana LGTM stack?"
    answer: "LGTM stands for Loki (logs), Grafana (dashboards), Tempo (traces), and Mimir or Prometheus (metrics). It is Grafana Labs' open-source observability stack. If your team already uses Grafana for dashboards and Loki for logs, Tempo is a natural fit because you get trace-to-log and trace-to-metric correlation out of the box in the same UI."

citations:
  - name: "Jaeger: Open Source, End-to-End Distributed Tracing"
    url: "https://www.jaegertracing.io/"
    author: "CNCF / Jaeger"
  - name: "Grafana Tempo Documentation"
    url: "https://grafana.com/docs/tempo/latest/"
    author: "Grafana Labs"
  - name: "Zipkin Documentation"
    url: "https://zipkin.io/"
    author: "Twitter / OpenZipkin"
  - name: "OpenTelemetry: Traces"
    url: "https://opentelemetry.io/docs/concepts/signals/traces/"
    author: "OpenTelemetry"
  - name: "7 Open Source Distributed Tracing Tools for Microservices in 2026"
    url: "https://www.dash0.com/comparisons/open-source-distributed-tracing-tools"
    author: "Dash0"
  - name: "Best practices for migration from Jaeger to Tempo"
    url: "https://developers.redhat.com/articles/2025/04/09/best-practices-migration-jaeger-tempo"
    author: "Red Hat Developer"
  - name: "Grafana Tempo vs Jaeger: Key Features, Differences, and When to Use Each"
    url: "https://last9.io/blog/grafana-tempo-vs-jaeger"
    author: "Last9"
  - name: "Jaeger vs Tempo: Key Features, Differences, and Alternatives"
    url: "https://signoz.io/blog/jaeger-vs-tempo/"
    author: "SigNoz"
---

You have 12 microservices. A user reports their checkout failed. The frontend team says it is not them. The payments team says the order service timed out. The order service team says they never got the request.

You go digging through logs. Service A logs show the request went out. Service B logs show nothing came in. You can not tell if the request was dropped on the wire, crashed inside a queue, or went to the wrong instance.

This is the problem distributed tracing solves.

Tracing gives every request a unique ID that follows it from the moment it enters your system to the moment a response goes back out. Every service that touches that request records what it did, how long it took, and whether anything went wrong. You end up with a timeline you can actually read.

Jaeger, Grafana Tempo, and Zipkin are the three dominant open-source tools for collecting and querying that data. They all speak the same instrumentation language (OpenTelemetry), but they are built for different situations. This post covers all three.

> **TL;DR**: Use Zipkin to get running in five minutes. Use Jaeger for a production-grade standalone tracing system with adaptive sampling. Use Grafana Tempo if you are already in the Grafana ecosystem and want the cheapest storage at scale. Your OpenTelemetry instrumentation works with all three without changes.

---

## Quick Comparison

| | Zipkin | Jaeger | Grafana Tempo |
|---|---|---|---|
| **Created by** | Twitter (2012) | Uber (2015) | Grafana Labs (2020) |
| **Written in** | Java | Go | Go |
| **CNCF status** | No | Graduated | No |
| **Storage backends** | In-memory, MySQL, Cassandra, Elasticsearch | Badger (local), Cassandra, Elasticsearch, Kafka | S3, GCS, Azure Blob, local disk |
| **Multi-tenancy** | No | No | Yes |
| **Sampling** | Probability, rate-limiting | Probability, adaptive tail | Head and tail (via OTel Collector) |
| **UI** | Basic | Good, standalone | Grafana (excellent with ecosystem) |
| **TraceQL** | No | No | Yes |
| **Log/metric correlation** | No | Limited | Native (with Loki and Prometheus) |
| **Best for** | Learning, small projects | Standalone production tracing | Grafana stack, high-volume at low cost |
| **Worst for** | Large-scale production | Grafana-native correlation | Teams without Grafana |

---

## Core Concepts: Traces, Spans, and Context Propagation

Before comparing tools, the concepts underneath them are worth getting clear.

**A trace** is the complete record of one request as it moves through your system. If a user hits your API, and your API calls an auth service, which calls a database, that whole journey is one trace.

**A span** is one unit of work inside a trace. Each service call, database query, or external HTTP request is a span. A span has:
- A name (usually the operation: `HTTP GET /users`, `db.query`)
- A start time and duration
- A parent span ID (so you know where it came from)
- Optional attributes and events (error messages, query parameters, HTTP status codes)

**Context propagation** is how trace information passes from one service to the next. When Service A calls Service B over HTTP, it includes the trace ID and span ID in the request headers. Service B reads those headers and creates a child span under the parent. Without propagation, each service would start a new disconnected trace and you would lose the full picture.

The current standard for this is the [W3C Trace Context](https://www.w3.org/TR/trace-context/) specification. It defines two HTTP headers: `traceparent` (which carries the trace ID, parent span ID, and sampling flags) and `tracestate` (optional vendor metadata). OpenTelemetry uses W3C Trace Context by default. Zipkin uses its own B3 headers, though it can also accept W3C headers with configuration.

<pre><code class="language-mermaid">
sequenceDiagram
    participant C as Client
    participant A as API Gateway
    participant Auth as Auth Service
    participant DB as Database

    C->>A: POST /checkout
    Note right of A: Trace started
    Note right of A: trace_id: abc123, span_id: 001

    A->>Auth: GET /validate-token
    Note right of A: traceparent: 00-abc123-001-01
    Note right of Auth: Child span, parent: 001, span: 002

    Auth-->>A: 200 OK
    Note right of Auth: Span 002 ends (12ms)

    A->>DB: INSERT INTO orders
    Note right of A: traceparent: 00-abc123-001-01
    Note right of DB: Child span, parent: 001, span: 003

    DB-->>A: OK
    Note right of DB: Span 003 ends (34ms)

    A-->>C: 201 Created
    Note right of A: Root span 001 ends (52ms)
</code></pre>

The trace backend receives all three spans (001, 002, 003), links them by `trace_id`, and assembles the waterfall view you see in the UI.

---

## OpenTelemetry: The Layer That Makes All Three Work

A few years ago, if you wanted to switch from Zipkin to Jaeger, you would rewrite your instrumentation. Every vendor had its own SDK and wire format.

OpenTelemetry (OTel) fixed that. It is a vendor-neutral standard for collecting traces, metrics, and logs. Your application code uses the OTel SDK. The OTel Collector receives the data, processes it, and exports it to any backend: Jaeger, Tempo, Zipkin, Datadog, whatever. For a hands-on guide to running the full OpenTelemetry pipeline in production, see [OpenTelemetry in Production: A Complete Setup Guide](/opentelemetry-production-guide/).

<pre><code class="language-mermaid">
flowchart LR
    subgraph App["Your Application"]
        direction TB
        S1["Service A\n(OTel SDK)"]
        S2["Service B\n(OTel SDK)"]
        S3["Service C\n(OTel SDK)"]
    end

    subgraph Collector["OpenTelemetry Collector"]
        direction TB
        RCV["Receivers\n(OTLP, Jaeger, Zipkin)"]
        PROC["Processors\n(sampling, batching, filtering)"]
        EXP["Exporters"]
        RCV --> PROC --> EXP
    end

    subgraph Backends["Tracing Backends"]
        direction TB
        J["Jaeger"]
        T["Grafana Tempo"]
        Z["Zipkin"]
    end

    S1 -->|OTLP gRPC| Collector
    S2 -->|OTLP gRPC| Collector
    S3 -->|OTLP gRPC| Collector
    EXP -->|Jaeger format| J
    EXP -->|OTLP| T
    EXP -->|Zipkin format| Z

    style App fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style Collector fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style Backends fill:#fff4e0,stroke:#e07b00,color:#0d2137
</code></pre>

The OTel Collector sits in the middle. It handles batching, sampling decisions, retries, and format translation. This is where you configure tail-based sampling, add custom attributes, and control what gets exported where.

Here is what OpenTelemetry instrumentation looks like in Python. This code works with Jaeger, Tempo, and Zipkin without modification:

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

# Configure the tracer to export via OTLP
# The OTLP Collector endpoint points to Jaeger, Tempo, or Zipkin collector
provider = TracerProvider()
exporter = OTLPSpanExporter(endpoint="http://otel-collector:4317")
provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(provider)

tracer = trace.get_tracer(__name__)

def process_order(order_id: str) -> dict:
    with tracer.start_as_current_span("process_order") as span:
        span.set_attribute("order.id", order_id)

        # Child span for payment validation
        with tracer.start_as_current_span("validate_payment") as child:
            result = validate_payment(order_id)
            child.set_attribute("payment.status", result["status"])

        # Child span for inventory check
        with tracer.start_as_current_span("check_inventory"):
            inventory = check_inventory(order_id)

        return {"order_id": order_id, "status": "confirmed"}
```


{% include ads/in-article.html %}


Most frameworks support auto-instrumentation, which adds spans automatically for HTTP requests, database calls, and cache operations without touching your code:

```bash
# Auto-instrument a Django or Flask app
# This wraps outgoing HTTP calls, DB queries, and incoming requests automatically
opentelemetry-instrument \
  --traces_exporter otlp \
  --exporter_otlp_endpoint http://otel-collector:4317 \
  python manage.py runserver
```

---

## <i class="fas fa-search"></i> Zipkin

Zipkin was built by Twitter in 2012, based on Google's internal [Dapper paper](https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/). Twitter open-sourced it that same year under the [OpenZipkin](https://github.com/openzipkin) organization.

It was the first widely adopted open-source distributed tracing system, and for years, it was the default choice. Jaeger and Tempo both took inspiration from Zipkin's data model.

### Architecture

Zipkin runs as a single Java process. It has four components: a collector that receives spans, a storage layer, a query API, and a web UI. All four can run in one process, which makes it extremely easy to start.

<pre><code class="language-mermaid">
flowchart LR
    subgraph Services["Instrumented Services"]
        A["Service A"]
        B["Service B"]
        C["Service C"]
    end

    subgraph Zipkin["Zipkin Server"]
        COL["Collector\n(HTTP / Kafka / Scribe)"]
        STORE["Storage\n(In-Memory / MySQL / Cassandra / Elasticsearch)"]
        API["Query API"]
        UI["Web UI"]
        COL --> STORE --> API --> UI
    end

    A -->|HTTP POST /api/v2/spans| COL
    B -->|HTTP POST /api/v2/spans| COL
    C -->|HTTP POST /api/v2/spans| COL

    style Services fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style Zipkin fill:#fde8e8,stroke:#dc2626,color:#0d2137
</code></pre>

Getting Zipkin running locally takes one Docker command:

```bash
docker run -d -p 9411:9411 openzipkin/zipkin
```

The UI is at `http://localhost:9411`. That is the entire setup.

For production, Zipkin supports Cassandra and Elasticsearch as backends. Cassandra is the recommended option for high write volume. Elasticsearch works but is not officially recommended for very high trace rates.

### What it does well

Zipkin's strength is simplicity. The data model is straightforward, the setup is fast, and the B3 propagation format it introduced is still widely used. It has a clean UI for finding traces by service name, operation, and time range. Dependencies between services are visualized as a simple graph.

If you are debugging a small system, running a local development environment, or learning how distributed tracing works, Zipkin gets out of your way.

### Where it falls short

Zipkin has not kept pace with Jaeger and Tempo in features. It lacks adaptive sampling, multi-tenancy, the service dependency analysis depth that Jaeger has, and the cost efficiency and log correlation that Tempo provides. There is no TraceQL or equivalent query language. If you need to search spans by attribute (for example, find all traces where `http.status_code = 500`), Zipkin's options are limited compared to the other two.

The community has also slowed. Jaeger and Tempo are more actively maintained and have broader cloud-native ecosystems around them.

### When to choose Zipkin

- You need a tracing backend running in under five minutes
- You are learning distributed tracing and want minimal complexity
- You are working on a small project or internal tool where scale is not a concern
- Your existing code already uses Zipkin client libraries and you do not want to migrate

---

## <i class="fas fa-project-diagram"></i> Jaeger

Jaeger was built by the engineering team at Uber in 2015 to solve their distributed tracing problems across hundreds of microservices. They open-sourced it in 2017 and donated it to the Cloud Native Computing Foundation (CNCF) in 2017. It graduated from CNCF in 2019, the same tier as Kubernetes, Prometheus, and Envoy.

It was written in Go, which makes it significantly leaner than Zipkin on memory and startup time.

### Architecture

Jaeger separates concerns into distinct components that can be scaled independently:

<pre><code class="language-mermaid">
flowchart TB
    subgraph Services["Instrumented Services (OTel SDK)"]
        direction LR
        A["Service A"] ~~~ B["Service B"] ~~~ C["Service C"]
    end

    subgraph Ingestion["Ingestion Layer"]
        COL["Jaeger Collector\n(OTLP / Thrift / Protobuf)\nMultiple instances, load balanced"]
        Q["Kafka\n(optional buffer\nfor high-volume ingest)"]
        ING["Jaeger Ingester\n(reads from Kafka)"]
        COL --> Q --> ING
        COL --> STORE
    end

    subgraph Storage["Storage Layer"]
        STORE["Cassandra or Elasticsearch\n(or Badger for single-node dev)"]
    end

    subgraph Query["Query and UI Layer"]
        QSV["Jaeger Query Service"]
        UI["Jaeger UI\n(React app)"]
        QSV --> UI
    end

    A -->|OTLP gRPC| COL
    B -->|OTLP gRPC| COL
    C -->|OTLP gRPC| COL
    ING --> STORE
    STORE --> QSV

    style Services fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style Ingestion fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style Storage fill:#fff4e0,stroke:#e07b00,color:#0d2137
    style Query fill:#fde8e8,stroke:#dc2626,color:#0d2137
</code></pre>

For development, Jaeger ships an all-in-one binary that runs every component in one process with in-memory storage:

```bash
docker run -d \
  -p 16686:16686 \   # Jaeger UI
  -p 4317:4317 \     # OTLP gRPC receiver
  -p 4318:4318 \     # OTLP HTTP receiver
  jaegertracing/all-in-one:latest
```


{% include ads/display.html %}


For production, you run the collector, storage, and query service as separate deployable units. The Helm chart handles this for Kubernetes deployments.

### Adaptive sampling

This is the feature that most distinguishes Jaeger from Zipkin. Jaeger supports adaptive sampling, which automatically adjusts sampling rates per operation based on observed traffic.

Instead of saying "sample 10% of all requests," adaptive sampling says "sample enough requests that I see at least 1 trace per second for each operation, but back off automatically when volume is high." It monitors incoming trace rates and updates sampling strategies across your entire fleet, delivered through the Jaeger Agent.

This matters because a naive 1% sampling rate on a service receiving 1,000 requests per second means you see 10 traces per second. On a service receiving 5 requests per second, 1% means you see one trace every 20 seconds. Adaptive sampling keeps coverage proportional across all operations without you tuning each one manually.

### Service dependency graph

Jaeger builds a service dependency graph from the spans it receives. You can see which services call which other services, how many requests flow between them, and what the error rates look like on each edge. This is genuinely useful for understanding how a large system is connected and where failures cascade.

### What it does well

Jaeger is the most complete standalone tracing system. It runs independently of any particular observability stack, has excellent documentation, solid Kubernetes support through its operator, and a good UI for trace investigation. Adaptive sampling is production-grade and saves significant storage costs compared to probability sampling. The service dependency graph helps new engineers understand system topology quickly.

### Where it falls short

Jaeger's storage costs are higher than Tempo's because it relies on Elasticsearch or Cassandra, both of which are resource-intensive to run at scale. Operating an Elasticsearch cluster at high trace volumes requires dedicated ops effort. There is also no native log or metric correlation. You can link to external systems from the Jaeger UI, but it is not seamless the way Grafana's unified data view is.

Jaeger does not support multi-tenancy natively, which matters in platform teams that operate shared observability infrastructure for multiple product teams.

### When to choose Jaeger

- You want a standalone tracing system that does not require the rest of the Grafana stack
- You need adaptive sampling to handle variable traffic across many operations
- You are running on Kubernetes and want CNCF-native tooling
- Your team needs a service dependency graph out of the box
- You are on AWS, GCP, or Azure and want a managed or operator-managed tracing backend

---

## <i class="fas fa-chart-line"></i> Grafana Tempo

Grafana Labs announced Tempo in October 2020 and open-sourced it immediately. The design goal was explicit: make distributed tracing storage cheap enough that teams never have to think about what they can afford to keep.

Jaeger and Zipkin index traces in their storage backend, which makes search fast but makes storage expensive. Tempo took a different approach: store traces as objects in cheap blob storage and index only trace IDs and service/operation metadata. If you need to find traces, you use other signals (metrics, logs, alerts) to get a trace ID first, then look up the full trace.

### Architecture

Tempo follows the same distributed architecture pattern as Grafana's other components (Loki for logs, Mimir for metrics):

<pre><code class="language-mermaid">
flowchart TB
    subgraph Services["Instrumented Services (OTel SDK)"]
        direction LR
        A["Service A"] ~~~ B["Service B"] ~~~ C["Service C"]
    end

    subgraph OTel["OpenTelemetry Collector"]
        SAMP["Tail-based sampler\n(optional)"]
        BATCH["Batcher"]
        SAMP --> BATCH
    end

    subgraph Tempo["Grafana Tempo"]
        direction TB
        DIST["Distributor\n(receives spans via OTLP)"]
        ING["Ingester\n(writes to WAL + memory)"]
        COMP["Compactor\n(merges and flushes to object store)"]
        QF["Query Frontend"]
        QR["Querier\n(reads from object store)"]
        DIST --> ING --> COMP
        QF --> QR
    end

    subgraph Store["Object Storage"]
        S3["Amazon S3\nor GCS\nor Azure Blob"]
    end

    subgraph Observe["Grafana Observability"]
        direction LR
        G["Grafana\n(dashboards)"]
        L["Loki\n(logs)"]
        P["Prometheus\n(metrics)"]
        G --- L
        G --- P
    end

    A -->|OTLP| OTel
    B -->|OTLP| OTel
    C -->|OTLP| OTel
    OTel -->|OTLP| DIST
    COMP -->|write traces| S3
    QR -->|read traces| S3
    QF --> G

    style Services fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style OTel fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style Tempo fill:#fff4e0,stroke:#e07b00,color:#0d2137
    style Store fill:#fde8e8,stroke:#dc2626,color:#0d2137
    style Observe fill:#f0f0f0,stroke:#555,color:#0d2137
</code></pre>

### TraceQL

Tempo ships with TraceQL, a query language for searching traces. It is more expressive than what Zipkin or Jaeger offer for span-level search.

```
# Find all traces where any span had an error

{ status = error }

# Find traces where the root span took more than 2 seconds
{ rootSpan.duration > 2s }

# Find traces with a database span that hit a specific table
{ span.db.name = "orders" && span.db.operation = "SELECT" && duration > 500ms }

# Find traces touching a specific service with a 5xx status code
{ resource.service.name = "payments-service" && span.http.status_code >= 500 }
```

{% include ads/in-article.html %}

TraceQL works well when you know what attribute you are looking for. For more open-ended investigation (what is slow right now?), Tempo's integration with Grafana alerting and Prometheus is the intended path: you alert on high latency via Prometheus, click through to the trace ID in Grafana, and load the full trace from Tempo.

### Cost difference at scale

This is where Tempo's design choice pays off most visibly.

Storing traces in Elasticsearch (as Jaeger typically does) costs roughly $0.10 to $0.30 per GB per month for managed Elasticsearch on AWS (OpenSearch). A system generating 10GB of trace data per day accumulates 300GB per month, costing $30 to $90 per month on storage alone, before you account for compute, replicas, and memory for the cluster.

Amazon S3 costs $0.023 per GB per month. The same 300GB costs $6.90 per month. Tempo can also compress traces heavily, often achieving 4-6x compression, which brings the effective cost to around $1-2 per month for the same trace volume.

At 1TB of trace data per month, the difference between Elasticsearch and S3 storage is real money. Tempo makes long trace retention economically practical.

### What it does well

Tempo's object storage backend is its strongest advantage. It is the cheapest way to keep traces at high volume and long retention. The integration with Grafana means you can see traces, logs, and metrics in the same UI, and jump between them with a single click. Loki's log lines can link directly to Tempo traces using the trace ID embedded in structured logs. Prometheus metric alerts can link to exemplar trace IDs.

Multi-tenancy is built in. A platform team can operate one Tempo cluster and give each product team its own isolated namespace.

### Where it falls short

The flip side of Tempo's cost-efficient storage is that search is slower than Jaeger for ad hoc queries. If you need to find "all traces from the payment service with HTTP 500 in the last hour" and you have not pre-filtered by trace ID, you either need to use Tempo's tag search (which requires the vParquet3 block format and limits index cardinality) or you need to go through Grafana Explore and build the query there.

Tempo works best in a workflow where you start from an alert or a metric anomaly and use the trace ID to drill down. If your team's workflow is "browse all recent traces and look for anything suspicious," Jaeger's UI is a better fit.

Tempo also has more operational moving parts in a full production deployment (distributor, ingester, compactor, query frontend, querier). The monolithic single-binary mode exists and works, but at scale you run multiple component types.

### When to choose Grafana Tempo

- You are already running Grafana and Loki
- You need long trace retention (weeks or months) at low cost
- You want trace-to-log and trace-to-metric correlation in a single UI
- You need multi-tenancy on shared observability infrastructure
- You generate high trace volume and Elasticsearch costs are a concern
- You are on AWS, GCP, or Azure and want to use object storage

---

## <i class="fas fa-database"></i> Storage: The Decision That Drives Cost

Storage is where the three tools diverge most sharply in production.

<pre><code class="language-mermaid">
flowchart TB
    subgraph Z["Zipkin Storage Options"]
        direction LR
        ZM["In-Memory\n(dev only)"]
        ZMY["MySQL\n(low volume)"]
        ZC["Cassandra\n(recommended)"]
        ZE["Elasticsearch\n(optional)"]
    end

    subgraph J["Jaeger Storage Options"]
        direction LR
        JB["Badger\n(local dev only)"]
        JC["Cassandra\n(write-optimized)"]
        JE["Elasticsearch\n(full-text search)"]
        JK["Kafka\n(ingestion buffer)"]
    end

    subgraph T["Grafana Tempo Storage"]
        direction LR
        TS3["Amazon S3\n(recommended)"]
        TGCS["Google Cloud Storage"]
        TAZ["Azure Blob Storage"]
        TLD["Local disk\n(single-node only)"]
    end

    subgraph Cost["Approx Storage Cost per 300GB/month"]
        ZCost["Zipkin on Cassandra: ~$40-80\n(3-node cluster)"]
        JCost["Jaeger on Elasticsearch: ~$30-90\n(managed OpenSearch)"]
        TCost["Tempo on S3: ~$1-7\n(with compression)"]
    end

    Z --> ZCost
    J --> JCost
    T --> TCost

    style Z fill:#fde8e8,stroke:#dc2626,color:#0d2137
    style J fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style T fill:#fff4e0,stroke:#e07b00,color:#0d2137
    style Cost fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
</code></pre>

One thing worth noting: Elasticsearch has richer querying capabilities than S3. Jaeger with Elasticsearch lets you search by span tags with full indexing. Tempo's tag search has cardinality limits and is less expressive by design. You trade query flexibility for storage economics.

For most teams, the query flexibility does not justify the cost difference once trace volume crosses a few gigabytes per day. At that point, you are usually better served by Tempo's workflow: find the trace ID from an alert or log, then load the full trace.

---

## <i class="fas fa-random"></i> Sampling Strategies


{% include ads/display.html %}


Getting sampling right matters more than which backend you pick. Poor sampling is how you end up paying a lot for tracing while still missing the traces that would have actually helped you debug production.

There are two fundamental approaches:

**Head-based sampling** makes the sampling decision at the start of a request, before any work happens. It is simple and low-overhead because the sampler does not need to wait for the request to complete. The downside is that you cannot know at the start whether a request will be slow or will fail. You will sample uniformly across all requests, which means slow tail requests are sampled at the same rate as fast normal requests.

**Tail-based sampling** makes the sampling decision after the request completes. You buffer the spans in memory, wait for the full trace to arrive, then decide whether to keep it based on what actually happened (was there an error? was it slow? did it touch a specific service?). This is much more useful for debugging because you can configure rules like "always keep traces with errors" and "always keep the slowest 1% of traces" while sampling down the normal fast ones.

The tradeoff is that tail-based sampling requires buffering spans in memory until a trace is complete, which adds latency to the export pipeline and requires careful memory management.

Here is how to configure tail-based sampling in the OpenTelemetry Collector, which feeds all three backends:

```yaml
# otel-collector-config.yaml
processors:
  tail_sampling:
    decision_wait: 10s        # Wait up to 10 seconds for all spans in a trace
    num_traces: 100000        # Max traces to buffer in memory
    policies:
      # Always keep traces with errors
      - name: errors-policy
        type: status_code
        status_code:
          status_codes: [ERROR]

      # Always keep slow traces (p99 region)
      - name: slow-traces-policy
        type: latency
        latency:
          threshold_ms: 2000

      # Keep 10% of everything else (normal traffic)
      - name: probabilistic-policy
        type: probabilistic
        probabilistic:
          sampling_percentage: 10

exporters:
  otlp:
    endpoint: "jaeger-collector:4317"    # or tempo:4317, or zipkin:9411

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [tail_sampling]
      exporters: [otlp]
```

Jaeger also has its own built-in adaptive sampling that adjusts rates automatically per operation. If you are using Jaeger without the OTel Collector, Jaeger's adaptive sampler is a good default. If you are using the OTel Collector in front of any backend, tail sampling in the collector gives you the most control.

---

## <i class="fas fa-code"></i> Getting Started: Quick Setup for Each Tool

### Zipkin

```yaml
# docker-compose.yml
version: "3"
services:
  zipkin:
    image: openzipkin/zipkin:latest
    ports:
      - "9411:9411"
```

Point your OTel Collector's Zipkin exporter to `http://zipkin:9411/api/v2/spans`.

### Jaeger

```yaml
# docker-compose.yml
version: "3"
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    environment:
      - COLLECTOR_OTLP_ENABLED=true
    ports:
      - "16686:16686"   # Jaeger UI
      - "4317:4317"     # OTLP gRPC
      - "4318:4318"     # OTLP HTTP
```

Open `http://localhost:16686` for the UI. Send spans to `http://jaeger:4317` via OTLP.

### Grafana Tempo (with Grafana)

```yaml
# docker-compose.yml
version: "3"
services:
  tempo:
    image: grafana/tempo:latest
    command: ["-config.file=/etc/tempo.yaml"]
    volumes:
      - ./tempo.yaml:/etc/tempo.yaml
      - ./tempo-data:/tmp/tempo
    ports:
      - "4317:4317"     # OTLP gRPC
      - "3200:3200"     # Tempo query API

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
    volumes:
      - ./grafana-datasources.yaml:/etc/grafana/provisioning/datasources/datasources.yaml
```

```yaml
# tempo.yaml
server:
  http_listen_port: 3200

distributor:
  receivers:
    otlp:
      protocols:
        grpc:

storage:
  trace:
    backend: local
    local:
      path: /tmp/tempo/blocks
```

For production Tempo with S3, swap the storage backend to `s3` and point it at your bucket.

---

## <i class="fas fa-sitemap"></i> How to Choose

<pre><code class="language-mermaid">
flowchart TD
    Start(["fa:fa-question-circle Where are you starting?"])

    Start --> Q1{"Are you learning tracing\nor building a small project?"}

    Q1 -->|Yes| ZipkinChoice["fa:fa-check Zipkin\nFastest to start\ndocker run in 30 seconds"]

    Q1 -->|No| Q2{"Are you already running\nGrafana and Loki?"}

    Q2 -->|Yes| Q3{"Do you need cheap long\ntrace retention at high volume?"}

    Q3 -->|Yes| TempoChoice["fa:fa-check Grafana Tempo\nObject storage backend\nTrace + log + metric correlation"]

    Q3 -->|No| Q4{"Does your team actively\nbrowse traces for investigation\nrather than following alerts?"}

    Q4 -->|Yes| JaegerChoice2["fa:fa-check Jaeger\nRicher UI for exploration\nAdaptive sampling"]

    Q4 -->|No| TempoChoice2["fa:fa-check Grafana Tempo\nFits your alert-driven\ndebugging workflow"]

    Q2 -->|No| Q5{"Do you need adaptive sampling\nor a service dependency graph?"}

    Q5 -->|Yes| JaegerChoice["fa:fa-check Jaeger\nCNCF graduated\nBest standalone option"]

    Q5 -->|No| Q6{"Is Elasticsearch\ncost a concern?"}

    Q6 -->|Yes| TempoChoice3["fa:fa-check Grafana Tempo\nPair with Grafana OSS\nMuch cheaper storage"]

    Q6 -->|No| JaegerChoice3["fa:fa-check Jaeger\nSimpler ops if Elasticsearch\nis already in your stack"]

    style ZipkinChoice fill:#fde8e8,stroke:#dc2626,color:#0d2137
    style JaegerChoice fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style JaegerChoice2 fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style JaegerChoice3 fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style TempoChoice fill:#fff4e0,stroke:#e07b00,color:#0d2137
    style TempoChoice2 fill:#fff4e0,stroke:#e07b00,color:#0d2137
    style TempoChoice3 fill:#fff4e0,stroke:#e07b00,color:#0d2137
    style Start fill:#f8f9fa,stroke:#6c757d,color:#0d2137
</code></pre>

---

## What Real Teams Use


{% include ads/in-article.html %}


Understanding the theory is useful. Seeing what engineering teams actually deploy in production tells you a different story.

**Uber** built Jaeger and ran it at scale internally before open-sourcing it. They dealt with hundreds of microservices and millions of requests per second, which is why Jaeger's adaptive sampling and scalable architecture are as strong as they are. The tool was built from necessity, not from a whiteboard.

**Red Hat** ships Jaeger as part of OpenShift's distributed tracing platform and has published detailed guidance on migrating from Jaeger to Tempo as teams outgrow Elasticsearch costs. That migration path is real and documented.

**Many teams using Kubernetes** start with Jaeger because of its CNCF status and Helm chart support, then evaluate Tempo as their trace volume grows and storage costs appear on the infrastructure bill.

**Grafana Labs** runs Tempo internally as their own tracing backend, which is a reasonable signal. If they use it themselves for a public SaaS product, it can handle production workloads.

**Teams already on Grafana Cloud** often get Tempo as part of the package. Grafana Cloud's free tier includes 50GB of trace storage per month using Tempo, which is generous enough to cover many small to medium applications.

One pattern worth noting: [Kubernetes deployments](/devops/kubernetes-architecture/) make the CNCF ecosystem feel more natural, which is one reason Jaeger adoption tracks closely with Kubernetes adoption. If you are operating on Kubernetes, Jaeger's operator makes lifecycle management straightforward. Tempo works equally well on Kubernetes but its integration advantage is with Grafana, not the broader CNCF ecosystem.

---

## <i class="fas fa-exclamation-triangle"></i> Common Mistakes

### Tracing everything at 100% sample rate in production

This is the most common starting mistake. You instrument your services, send all traces to your backend, and two weeks later someone notices your Elasticsearch bill has doubled. 

Set a sampling strategy from day one, even if it is a simple 10% probability sample. Use the OTel Collector to implement it so you can change it without redeploying your services.

### Using in-memory storage for anything beyond local dev

Zipkin's in-memory mode and Jaeger's Badger storage are for development only. They lose data on restart and do not scale. It is easy to forget this when you are moving fast, but discovering that your traces vanished after a pod restart in production is not a good experience.

### Not propagating context across async boundaries

HTTP calls propagate context automatically when you use OpenTelemetry auto-instrumentation. Message queues, background jobs, and event streams do not. If Service A publishes a Kafka message and Service B consumes it, the trace will be split into two disconnected traces unless you manually extract the trace context from the message headers and inject it into the new span.

```python
# When publishing to Kafka: inject trace context into message headers
from opentelemetry.propagate import inject

headers = {}
inject(headers)  # adds traceparent, tracestate to headers dict
producer.send("orders", value=payload, headers=list(headers.items()))

# When consuming from Kafka: extract trace context from headers
from opentelemetry.propagate import extract

context = extract(dict(message.headers))
with tracer.start_as_current_span("process_order", context=context):
    process(message.value)
```

This matters especially in event-driven architectures. Without it, traces stop at the queue boundary and you lose the connection between the publisher and consumer. For more on how Kafka works under the hood and why this context passing is non-trivial, see [How Kafka Works](/distributed-systems/how-kafka-works/).

### Treating distributed tracing as a replacement for logging

Traces tell you where time was spent and whether errors occurred. Logs tell you what specifically happened. You need both. A trace that shows an error in Service B does not tell you what the error message was, what the SQL query looked like, or what the input data was. That information lives in the logs.

The goal is correlation: your logs should include the trace ID so you can jump from a trace to the relevant log lines. In structured logging, add the trace ID as a field:

```python
import logging
from opentelemetry import trace

logger = logging.getLogger(__name__)

def process_order(order_id):
    span = trace.get_current_span()
    ctx = span.get_span_context()
    trace_id = format(ctx.trace_id, '032x')

    logger.info("Processing order", extra={
        "order_id": order_id,
        "trace_id": trace_id,      # Same ID in logs and traces
        "span_id": format(ctx.span_id, '016x')
    })
```

If you are using Grafana Tempo, Loki reads this field automatically and creates clickable links between log lines and the full trace. This is the "three pillars of observability" in practice: [metrics for alerting, logs for details, traces for request-level flow](/system-design-cheat-sheet/).

### Sampling without a strategy for errors

A common mistake is applying a flat percentage sample to everything. This means a service with 1,000 requests per second at 1% sampling generates 10 traces per second, but a service with 1 request per second generates one trace every 100 seconds.

More critically, if your error rate is 0.1% and your sample rate is 1%, you will miss 90% of your error traces. Configure your sampler to always keep traces with errors, regardless of overall sampling rate. This is the first rule you should add to any tail-based sampling configuration.

---

## The Three Pillars in Practice

Distributed tracing is one leg of the observability triangle. Traces answer "what path did this request take and where was it slow?" Metrics answer "how is the system behaving right now overall?" Logs answer "what specifically happened in this piece of code?"

All three tools in this comparison are best used alongside a metrics system (Prometheus) and a log aggregation system (Loki, Elasticsearch, or similar). The more your tooling allows you to move between the three without switching UIs, the faster you can diagnose production issues.

That correlation story is where Grafana Tempo has a genuine advantage over Jaeger and Zipkin today. Jumping from a Prometheus alert to a Grafana dashboard, clicking an exemplar to a trace in Tempo, and then clicking a trace ID to the matching log lines in Loki is a single workflow in one browser tab. Jaeger requires you to copy a trace ID and paste it into a separate tool.

For teams that have not yet invested in an observability stack and are choosing now: the [Grafana LGTM stack](https://grafana.com/blog/2024/03/13/an-opentelemetry-backend-in-a-docker-image-introducing-grafana/otel-lgtm/) is a coherent, all open-source option worth evaluating alongside commercial alternatives like Datadog, Honeycomb, and New Relic.

---

## Related Reading

- [Kubernetes Architecture Explained](/devops/kubernetes-architecture/) - how container orchestration works and where distributed tracing fits in a Kubernetes-native stack
- [System Design Cheat Sheet](/system-design-cheat-sheet/) - the broader context of observability in system design
- [How Kafka Works](/distributed-systems/how-kafka-works/) - event streaming and why trace context propagation across queues is not automatic
- [Feature Flags Guide](/feature-flags-guide/) - canary releases and rollouts are easier to debug when you have traces correlated to feature flag state
- [PostgreSQL vs MongoDB vs DynamoDB](/postgresql-vs-mongodb-vs-dynamodb/) - same format, choosing between tools with real trade-offs
