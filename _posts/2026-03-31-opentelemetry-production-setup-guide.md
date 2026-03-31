---
layout: post
seo: true
title: "OpenTelemetry in Production: A Complete Setup Guide"
subtitle: "Instrumentation, Collector pipelines, sampling, Kubernetes deployment, and the mistakes that cost teams weeks"
date: 2026-03-31
categories: devops
thumbnail-img: /assets/img/devops/opentelemetry-production-guide.png
share-img: /assets/img/devops/opentelemetry-production-guide.png
permalink: /opentelemetry-production-guide/
description: "A hands-on guide to running OpenTelemetry in production. Covers the OTel Collector, auto-instrumentation for Java, Python, and Go, sampling strategies, Kubernetes deployment patterns, and how to connect traces, metrics, and logs to backends like Prometheus, Jaeger, and Grafana Tempo."
keywords: "OpenTelemetry, OpenTelemetry tutorial, OpenTelemetry production, OpenTelemetry Collector, OpenTelemetry setup guide, OpenTelemetry best practices, OpenTelemetry instrumentation, OpenTelemetry auto instrumentation, OpenTelemetry Kubernetes, OpenTelemetry sampling, OTLP, OpenTelemetry metrics traces logs, OpenTelemetry vs Prometheus, OpenTelemetry vs Jaeger, OpenTelemetry Collector configuration, OpenTelemetry Go, OpenTelemetry Java, OpenTelemetry Python, observability, distributed tracing, OpenTelemetry Grafana Tempo, unified observability, OpenTelemetry Helm, tail sampling, head sampling, OpenTelemetry pipeline, CNCF observability, vendor neutral observability, OpenTelemetry collector processors, OpenTelemetry security, cardinality, span attributes, OpenTelemetry OTLP gRPC HTTP, OTel SDK, trace context propagation, W3C trace context, microservices observability"
comments: true
social-share: true
tags: [devops, system-design, software-engineering]

quick-answer: "Start with **auto-instrumentation** to get traces, metrics, and logs without code changes. Deploy the **OpenTelemetry Collector** as a gateway to handle batching, sampling, and export to backends like Prometheus, Jaeger, or Grafana Tempo. Use **head-based sampling** for simplicity, or **tail-based sampling** if you need to keep every error and slow request. In Kubernetes, deploy the Collector as a **DaemonSet** for node-level collection and a **Deployment** for a central gateway."

key-takeaways:
  - "OpenTelemetry is not a monitoring tool. It is a vendor-neutral instrumentation and data pipeline standard. You still need backends like Prometheus, Jaeger, or Grafana Tempo."
  - "Auto-instrumentation works for most frameworks out of the box. Start there and add manual spans only for business-specific logic."
  - "The Collector is the most important piece in production. It handles batching, retries, sampling, and format translation between your apps and backends."
  - "Put the memory_limiter processor first in every pipeline. Without it, a traffic spike or slow backend will OOM your Collector."
  - "Tail-based sampling catches errors and slow requests that head sampling misses, but it needs a stateful Collector tier with trace-aware load balancing."
  - "Monitor your observability pipeline. A Collector that silently drops spans is worse than no Collector at all."

faq:
  - question: "What is OpenTelemetry?"
    answer: "OpenTelemetry (OTel) is an open-source, vendor-neutral observability framework for generating, collecting, and exporting telemetry data: traces, metrics, and logs. It is a CNCF project and the second most active CNCF project after Kubernetes. It provides APIs, SDKs, and the OpenTelemetry Collector so you can instrument your applications once and send data to any backend."
  - question: "What is the difference between OpenTelemetry and Jaeger?"
    answer: "OpenTelemetry handles instrumentation and data collection. Jaeger is a tracing backend that stores and visualizes traces. They work together: your application uses OpenTelemetry SDKs to generate traces, the OpenTelemetry Collector processes and exports them, and Jaeger receives and stores them. OpenTelemetry replaced Jaeger's client libraries."
  - question: "What is the difference between OpenTelemetry and Prometheus?"
    answer: "Prometheus is a metrics backend with its own pull-based collection model. OpenTelemetry is a vendor-neutral instrumentation layer that can push metrics to Prometheus via remote write, or expose a Prometheus scrape endpoint via the Collector. You can use both together: instrument with OpenTelemetry, store in Prometheus."
  - question: "What is the OpenTelemetry Collector?"
    answer: "The Collector is a standalone binary that receives telemetry data from your applications, processes it through a pipeline of receivers, processors, and exporters, and sends it to one or more backends. It handles batching, retries, sampling, attribute manipulation, and format translation. You can deploy it as an agent alongside your app or as a central gateway."
  - question: "What is OTLP?"
    answer: "OTLP stands for OpenTelemetry Protocol. It is the native wire format for sending traces, metrics, and logs from OpenTelemetry SDKs to the Collector or directly to backends. OTLP supports gRPC on port 4317 and HTTP/protobuf on port 4318. Most modern observability backends accept OTLP natively."
  - question: "What is the difference between head sampling and tail sampling in OpenTelemetry?"
    answer: "Head sampling decides at the start of a request whether to record the trace. It is simple and cheap but can miss errors and slow requests. Tail sampling decides after the request completes, so it can keep all errors and high-latency traces. Tail sampling requires buffering complete traces in memory and routing all spans of a trace to the same Collector instance."
  - question: "How do I deploy OpenTelemetry in Kubernetes?"
    answer: "The most common pattern is a DaemonSet Collector on every node for receiving telemetry from pods, plus a central gateway Deployment for processing and exporting. The OpenTelemetry Operator can automate this and inject auto-instrumentation into pods. Use Helm charts from the official opentelemetry-helm-charts repository."
  - question: "Does OpenTelemetry support auto-instrumentation?"
    answer: "Yes. OpenTelemetry provides zero-code auto-instrumentation for Java (via a Java agent JAR), Python (via the opentelemetry-instrument CLI), .NET (via a NuGet package), and Node.js (via a require flag). Auto-instrumentation adds spans for HTTP requests, database queries, gRPC calls, and cache operations without modifying your code."
  - question: "What backends work with OpenTelemetry?"
    answer: "Nearly all modern observability backends support OpenTelemetry. For traces: Jaeger, Grafana Tempo, Zipkin, Datadog, New Relic, Honeycomb. For metrics: Prometheus, Grafana Mimir, Datadog, Dynatrace. For logs: Grafana Loki, Elasticsearch, Splunk. Most accept OTLP natively. The Collector has exporters for all major vendors."
  - question: "Is OpenTelemetry production ready?"
    answer: "Yes. Tracing is stable (GA) across all major language SDKs. Metrics are stable in Java, .NET, Python, and Go. Logs are stable in Java and .NET, and reaching stability in other languages. The Collector is production-ready. Companies like GitHub, Shopify, Canva, and eBay run OpenTelemetry at scale."

citations:
  - name: "OpenTelemetry Documentation"
    url: "https://opentelemetry.io/docs/"
    author: "OpenTelemetry"
  - name: "OpenTelemetry Collector Configuration"
    url: "https://opentelemetry.io/docs/collector/configuration/"
    author: "OpenTelemetry"
  - name: "OpenTelemetry Collector Deployment Patterns"
    url: "https://opentelemetry.io/docs/collector/deployment/"
    author: "OpenTelemetry"
  - name: "OpenTelemetry Sampling"
    url: "https://opentelemetry.io/docs/concepts/sampling/"
    author: "OpenTelemetry"
  - name: "Kubernetes Observability with OpenTelemetry"
    url: "https://opentelemetry.io/docs/kubernetes/"
    author: "OpenTelemetry"
  - name: "Jaeger: Open Source, End-to-End Distributed Tracing"
    url: "https://www.jaegertracing.io/"
    author: "CNCF / Jaeger"
  - name: "Grafana Tempo Documentation"
    url: "https://grafana.com/docs/tempo/latest/"
    author: "Grafana Labs"
  - name: "Prometheus Remote Write"
    url: "https://prometheus.io/docs/concepts/remote_write_spec/"
    author: "Prometheus"
---

You instrumented your services. You see some traces in Jaeger. Then Friday happens. Traffic doubles, the Collector OOMs, half your spans vanish, and nobody notices until Monday because the observability pipeline itself had no monitoring.

This is not a made-up story. Most teams hit this wall within the first few months of running OpenTelemetry. The getting-started tutorials work great on a laptop. Production is a different game.

This guide covers what it actually takes to run OpenTelemetry in production: how the Collector pipeline works, how to instrument without drowning in noise, how to sample without losing the traces that matter, and how to deploy it all in Kubernetes without it falling over.

---

## Table of Contents

1. [What Is OpenTelemetry (and What It Is Not)](#what-is-opentelemetry-and-what-it-is-not)
2. [The Three Signals](#the-three-signals-traces-metrics-and-logs)
3. [Collector Architecture](#the-opentelemetry-collector)
4. [Instrumentation: Auto vs Manual](#instrumentation-auto-vs-manual)
5. [Collector Configuration for Production](#collector-configuration-for-production)
6. [Deployment Patterns](#deployment-patterns-agent-vs-gateway-vs-hybrid)
7. [Kubernetes Deployment](#kubernetes-deployment)
8. [Sampling Strategies](#sampling-strategies)
9. [Connecting to Backends](#connecting-to-backends)
10. [Security and PII](#security-and-pii)
11. [Monitoring Your Observability Pipeline](#monitoring-your-observability-pipeline)
12. [Common Mistakes](#common-mistakes-that-cost-teams-weeks)

---

## What Is OpenTelemetry (and What It Is Not)

OpenTelemetry is a vendor-neutral framework for instrumenting, generating, collecting, and exporting telemetry data. It is the second most active project in the [Cloud Native Computing Foundation](https://www.cncf.io/) (CNCF), right after Kubernetes.

Here is the important part that trips people up: **OpenTelemetry is not a monitoring tool.** It does not store data. It does not have dashboards. It does not alert you at 3 AM.

OpenTelemetry handles one job: getting telemetry data out of your applications and into whatever backend you choose. The backends do the storing and querying.

<pre><code class="language-mermaid">
flowchart LR
    subgraph Your_Code["<fa:fa-code></fa:fa-code> Your Applications"]
        direction TB
        A1["Java Service"]
        A2["Python Service"]
        A3["Go Service"]
    end

    subgraph OTel["<fa:fa-cogs></fa:fa-cogs> OpenTelemetry"]
        direction TB
        SDK["SDKs & APIs"]
        COL["Collector"]
        SDK --> COL
    end

    subgraph Backends["<fa:fa-database></fa:fa-database> Backends"]
        direction TB
        P["Prometheus\n(Metrics)"]
        J["Jaeger / Tempo\n(Traces)"]
        L["Loki\n(Logs)"]
    end

    A1 --> SDK
    A2 --> SDK
    A3 --> SDK
    COL --> P
    COL --> J
    COL --> L

    style Your_Code fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style OTel fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style Backends fill:#fff4e0,stroke:#e07b00,color:#0d2137
</code></pre>

Before OpenTelemetry, you had to pick a vendor early. Datadog, New Relic, Jaeger, and Prometheus all had their own SDKs and wire formats. Switching vendors meant rewriting instrumentation code across every service. OpenTelemetry solved this by creating one standard API and protocol ([OTLP](https://opentelemetry.io/docs/specs/otlp/)) that all vendors agreed to support.

Think of it like USB-C for observability. You plug in once and connect to anything.

### A Brief History

OpenTelemetry was formed in 2019 by merging two older CNCF projects:

- **OpenTracing**: A vendor-neutral API for distributed tracing
- **OpenCensus**: Google's observability framework that covered both tracing and metrics

The merger was necessary because having two competing standards was worse than having none. OpenTelemetry unified them and added logs as a third signal.

Today, OpenTelemetry has SDKs for Java, Python, Go, .NET, JavaScript, Ruby, Rust, PHP, Swift, and C++. Tracing is stable (GA) in all major languages. Metrics are stable in Java, Python, Go, and .NET. Logs are reaching stability across the board.

---

## The Three Signals: Traces, Metrics, and Logs

OpenTelemetry treats observability as three distinct signals that share context.

| Signal | What It Captures | Example |
|--------|-----------------|---------|
| **Traces** | The path of a request across services | User checkout request took 1.2s, 800ms in payment service |
| **Metrics** | Numerical measurements over time | Request count, error rate, CPU usage, queue depth |
| **Logs** | Discrete events with unstructured or structured data | `ERROR: payment gateway timeout for order_id=5678` |

Each signal alone gives you a partial picture. The real power of OpenTelemetry is **correlation**: linking a metric spike to the traces that caused it, and linking those traces to the log lines from each service involved.

This works because OpenTelemetry injects the same `trace_id` and `span_id` into all three signals. When your error rate metric spikes, you click through to the traces from that window. When you find a slow trace, you click through to the logs from each span.

<pre><code class="language-mermaid">
flowchart TD
    subgraph Correlation["Signal Correlation"]
        M["<fa:fa-chart-line></fa:fa-chart-line> Metrics\nError rate spikes to 12%"]
        T["<fa:fa-project-diagram></fa:fa-project-diagram> Traces\nGET /checkout took 4.2s\ntrace_id: abc-123"]
        L["<fa:fa-file-alt></fa:fa-file-alt> Logs\nERROR: DB connection pool exhausted\ntrace_id: abc-123, span_id: span-7"]
    end

    M -->|"Which requests failed?"| T
    T -->|"What happened inside?"| L
    L -->|"How often does this happen?"| M

    style Correlation fill:#f8f9fa,stroke:#495057,color:#0d2137
    style M fill:#dbeafe,stroke:#2563eb,color:#0d2137
    style T fill:#d1fae5,stroke:#059669,color:#0d2137
    style L fill:#fef3c7,stroke:#d97706,color:#0d2137
</code></pre>

Without this correlation, you end up with three disconnected tools and a lot of tab switching. I covered the tracing side in depth in [Distributed Tracing: Jaeger vs Tempo vs Zipkin](/distributed-tracing-jaeger-vs-tempo-vs-zipkin/). This post focuses on the full picture.

---

## The OpenTelemetry Collector

The Collector is the central piece of any production OpenTelemetry setup. It is a vendor-agnostic proxy that sits between your applications and your backends.

Your apps send telemetry to the Collector. The Collector processes it and forwards it to one or more backends. This decouples your application code from your backend choice, and it gives you a single place to handle batching, retries, sampling, and data transformation.

### Pipeline Architecture

The Collector is built around a pipeline model with four components:

<pre><code class="language-mermaid">
flowchart LR
    subgraph Pipeline["Collector Pipeline"]
        direction LR
        R["<fa:fa-plug></fa:fa-plug> Receivers\nOTLP, Prometheus\nJaeger, Zipkin"]
        P["<fa:fa-filter></fa:fa-filter> Processors\nBatch, Memory Limiter\nAttributes, Sampling"]
        E["<fa:fa-share-square></fa:fa-share-square> Exporters\nOTLP, Prometheus\nJaeger, Loki"]
        R --> P --> E
    end

    subgraph Extensions["Extensions"]
        direction TB
        H["Health Check"]
        Z["zPages"]
        PP["pprof"]
    end

    style Pipeline fill:#f0f4f8,stroke:#334155,color:#0d2137
    style Extensions fill:#f0fdf4,stroke:#166534,color:#0d2137
    style R fill:#dbeafe,stroke:#2563eb,color:#0d2137
    style P fill:#fef3c7,stroke:#d97706,color:#0d2137
    style E fill:#d1fae5,stroke:#059669,color:#0d2137
</code></pre>

**Receivers** accept data in various formats. The OTLP receiver listens on port 4317 (gRPC) and 4318 (HTTP). You can also accept Prometheus metrics, Jaeger spans, Zipkin spans, and dozens of other formats.

**Processors** transform data in the pipeline. They run in order, and the order matters (more on this later). Common processors include batching, memory limiting, attribute filtering, and sampling.

**Exporters** send data to backends. You can export to multiple backends simultaneously. One pipeline can send traces to both Jaeger and Grafana Tempo, or metrics to both Prometheus and Datadog.

**Extensions** provide capabilities outside the pipeline, like health check endpoints, zPages for debugging, and pprof for profiling the Collector itself.

### Contrib vs Core

The Collector comes in two distributions:

- **Core**: The official, minimal distribution with a small set of receivers, processors, and exporters. Maintained by the OpenTelemetry team.
- **Contrib**: The community distribution with everything in Core plus hundreds of additional components from vendors and the community.

For production, most teams use Contrib because it includes exporters for Prometheus, Jaeger, Loki, and other popular backends. If you only need OTLP and a few exporters, Core is lighter and has a smaller attack surface.

You can also build a custom Collector with exactly the components you need using the [OpenTelemetry Collector Builder (ocb)](https://opentelemetry.io/docs/collector/custom-collector/).

---

## Instrumentation: Auto vs Manual

There are two ways to instrument your application with OpenTelemetry.

### Auto-Instrumentation (Zero-Code)

Auto-instrumentation adds spans for HTTP requests, database queries, gRPC calls, and other common operations without modifying your code. For most teams, this should be the starting point.

**Java** (via the Java agent):

```bash
java -javaagent:opentelemetry-javaagent.jar \
  -Dotel.service.name=order-service \
  -Dotel.exporter.otlp.endpoint=http://otel-collector:4317 \
  -jar your-app.jar
```

The Java agent intercepts framework calls at the bytecode level. It covers Spring Boot, Quarkus, Micronaut, JDBC, Hibernate, Kafka, gRPC, and dozens of other libraries automatically.

**Python** (via the opentelemetry-instrument CLI):

```bash
pip install opentelemetry-distro opentelemetry-exporter-otlp
opentelemetry-bootstrap -a install

OTEL_SERVICE_NAME=payment-service \
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317 \
opentelemetry-instrument python app.py
```

This wraps Flask, Django, FastAPI, SQLAlchemy, requests, httpx, and other libraries.

**Go** (via the Auto SDK):

Go does not have a traditional agent-based auto-instrumentation because of how the language compiles. Instead, you use instrumentation libraries for specific frameworks:

```go
import (
    "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
    "go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc"
)

// Wrap your HTTP handler
handler := otelhttp.NewHandler(mux, "server")

// Wrap your gRPC server
grpcServer := grpc.NewServer(
    grpc.StatsHandler(otelgrpc.NewServerHandler()),
)
```

### Manual Instrumentation

Auto-instrumentation covers infrastructure calls, but it does not know about your business logic. You add manual spans to capture operations that matter to your team.

```python
from opentelemetry import trace

tracer = trace.get_tracer("order-service")

def process_order(order):
    with tracer.start_as_current_span("process_order") as span:
        span.set_attribute("order.id", order.id)
        span.set_attribute("order.total", order.total)
        span.set_attribute("order.item_count", len(order.items))

        validate_inventory(order)

        with tracer.start_as_current_span("apply_discount") as child:
            discount = calculate_discount(order)
            child.set_attribute("discount.percent", discount)

        charge_payment(order)
```

<br>

```java
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.trace.Span;

@Autowired
private Tracer tracer;

public Order processOrder(OrderRequest request) {
    Span span = tracer.spanBuilder("process_order").startSpan();
    try (var scope = span.makeCurrent()) {
        span.setAttribute("order.id", request.getId());
        span.setAttribute("order.total", request.getTotal());

        validateInventory(request);
        applyDiscount(request);
        chargePayment(request);

        return createOrder(request);
    } catch (Exception e) {
        span.recordException(e);
        span.setStatus(StatusCode.ERROR, e.getMessage());
        throw e;
    } finally {
        span.end();
    }
}
```

### When to Use Which

| Situation | Approach |
|-----------|----------|
| HTTP, gRPC, DB calls | Auto-instrumentation |
| Business logic (checkout, discount, fraud check) | Manual spans |
| Third-party library calls | Check if OTel has an instrumentation library first |
| Background jobs, cron tasks | Manual spans |

**Start with auto-instrumentation.** Get it running, see what shows up, and add manual spans only where you need business context. Most teams over-instrument on day one and end up with 10x the trace volume they need.

---

## Collector Configuration for Production

Here is a production-ready Collector configuration. Every line is there for a reason.

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  # MUST be first - prevents OOM under load
  memory_limiter:
    check_interval: 1s
    limit_mib: 1536
    spike_limit_mib: 512

  batch:
    send_batch_size: 1024
    send_batch_max_size: 2048
    timeout: 5s

  attributes/remove-sensitive:
    actions:
      - key: user.email
        action: delete
      - key: http.request.header.authorization
        action: delete

  resource:
    attributes:
      - key: deployment.environment
        value: production
        action: upsert

exporters:
  otlp/tempo:
    endpoint: tempo:4317
    tls:
      insecure: false
      cert_file: /etc/ssl/certs/collector.crt
      key_file: /etc/ssl/private/collector.key

  otlp/jaeger:
    endpoint: jaeger-collector:4317
    tls:
      insecure: true

  prometheusremotewrite:
    endpoint: http://prometheus:9090/api/v1/write
    resource_to_telemetry_conversion:
      enabled: true

  otlp/loki:
    endpoint: loki:3100

extensions:
  health_check:
    endpoint: 0.0.0.0:13133
  zpages:
    endpoint: 0.0.0.0:55679

service:
  extensions: [health_check, zpages]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, attributes/remove-sensitive, resource, batch]
      exporters: [otlp/tempo]
    metrics:
      receivers: [otlp]
      processors: [memory_limiter, resource, batch]
      exporters: [prometheusremotewrite]
    logs:
      receivers: [otlp]
      processors: [memory_limiter, attributes/remove-sensitive, resource, batch]
      exporters: [otlp/loki]
```

### Processor Order Matters

The order of processors in the pipeline is critical. Here is why:

1. **memory_limiter** goes first. If the Collector is under memory pressure, it needs to start dropping data before other processors allocate more memory. If you put it after batch, the batch processor accumulates data in memory, the Collector runs out of RAM, and the Linux OOM killer takes it down.

2. **Attribute processors** go before batch. You want to strip sensitive data before it accumulates anywhere.

3. **batch** goes last (or near last). It accumulates spans and sends them in bulk to reduce network overhead.

Getting this order wrong is one of the most common production mistakes. The Collector will start, accept data, and look healthy right up until a traffic spike hits.

---

## Deployment Patterns: Agent vs Gateway vs Hybrid

There are three common ways to deploy the Collector, and the right choice depends on your scale and infrastructure.

### Pattern 1: Agent (No Collector)

Your applications export directly to backends. This is the simplest setup, but it couples your apps to specific backends and means every application handles its own retries, batching, and failures.

Good for local development. Bad for production.

### Pattern 2: Agent Collector

A Collector runs alongside every application instance (as a sidecar in Kubernetes, or on the same host). Each Collector handles a single app's telemetry.

<pre><code class="language-mermaid">
flowchart LR
    subgraph Node1["Node 1"]
        A1["App A"] --> C1["Collector\n(Agent)"]
    end
    subgraph Node2["Node 2"]
        A2["App B"] --> C2["Collector\n(Agent)"]
    end

    C1 --> BE["Backends"]
    C2 --> BE

    style Node1 fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style Node2 fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style BE fill:#fff4e0,stroke:#e07b00,color:#0d2137
</code></pre>

**Pros**: Low latency between app and Collector, failure isolation, per-service config.
**Cons**: Higher resource overhead (one Collector per app), configuration sprawl.

### Pattern 3: Gateway Collector

All applications send telemetry to a shared, centralized Collector pool. The gateway handles all processing and exporting.

<pre><code class="language-mermaid">
flowchart LR
    A1["App A"] --> GW["Collector Pool\n(Gateway)"]
    A2["App B"] --> GW
    A3["App C"] --> GW

    GW --> P["Prometheus"]
    GW --> J["Jaeger / Tempo"]
    GW --> L["Loki"]

    style GW fill:#e8f6ee,stroke:#00684A,color:#0d2137
</code></pre>

**Pros**: Centralized config, lower total resource usage, easier to manage.
**Cons**: Single point of failure if not HA, network hop, harder to scale per-service.

### Pattern 4: Hybrid (Recommended for Production)

This is what most production deployments end up looking like. Agent Collectors on every node handle local buffering and basic processing. A gateway Collector pool handles central processing like tail sampling and multi-backend export.

<pre><code class="language-mermaid">
flowchart LR
    subgraph Nodes["Application Nodes"]
        direction TB
        subgraph N1["Node 1"]
            A1["App A"] --> AC1["Agent\nCollector"]
        end
        subgraph N2["Node 2"]
            A2["App B"] --> AC2["Agent\nCollector"]
        end
        subgraph N3["Node 3"]
            A3["App C"] --> AC3["Agent\nCollector"]
        end
    end

    subgraph Gateway["Gateway Tier"]
        direction TB
        GW1["Gateway\nCollector 1"]
        GW2["Gateway\nCollector 2"]
    end

    subgraph Storage["Backends"]
        direction TB
        PR["Prometheus"]
        TE["Grafana Tempo"]
        LO["Loki"]
    end

    AC1 --> GW1
    AC2 --> GW1
    AC3 --> GW2

    GW1 --> PR
    GW1 --> TE
    GW2 --> LO
    GW2 --> PR

    style Nodes fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style Gateway fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style Storage fill:#fff4e0,stroke:#e07b00,color:#0d2137
</code></pre>

The agent Collectors run with minimal config: receive OTLP, add resource attributes (hostname, environment), batch, and forward. The gateway Collectors handle the heavy lifting: tail sampling, attribute transformation, multi-backend routing, and retries.

This pattern gives you fault isolation at the node level and centralized control at the gateway level. If a gateway goes down, agents buffer locally for a short time. If an agent goes down, only one node is affected.

---

## Kubernetes Deployment

In Kubernetes, the Collector fits into three deployment models. The choice depends on what kind of telemetry you are collecting and how much control you need.

### DaemonSet (Most Common)

One Collector pod on every node. Applications send telemetry to the Collector on their node via `localhost` or the node IP.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: otel-collector-agent
  namespace: observability
spec:
  selector:
    matchLabels:
      app: otel-collector-agent
  template:
    metadata:
      labels:
        app: otel-collector-agent
    spec:
      containers:
        - name: collector
          image: otel/opentelemetry-collector-contrib:latest
          ports:
            - containerPort: 4317
              hostPort: 4317
              protocol: TCP
            - containerPort: 4318
              hostPort: 4318
              protocol: TCP
            - containerPort: 13133
              protocol: TCP
          resources:
            requests:
              cpu: 200m
              memory: 256Mi
            limits:
              cpu: 500m
              memory: 512Mi
          volumeMounts:
            - name: config
              mountPath: /etc/otelcol-contrib
      volumes:
        - name: config
          configMap:
            name: otel-collector-agent-config
```

Applications reference the Collector using the Kubernetes downward API:

```yaml
env:
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: "http://$(NODE_IP):4317"
  - name: NODE_IP
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
```

### Gateway Deployment

A separate Deployment (or StatefulSet for tail sampling) that acts as a central gateway. The DaemonSet agents forward to this tier.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: otel-collector-gateway
  namespace: observability
spec:
  replicas: 3
  selector:
    matchLabels:
      app: otel-collector-gateway
  template:
    metadata:
      labels:
        app: otel-collector-gateway
    spec:
      containers:
        - name: collector
          image: otel/opentelemetry-collector-contrib:latest
          resources:
            requests:
              cpu: 1
              memory: 2Gi
            limits:
              cpu: 2
              memory: 4Gi
          volumeMounts:
            - name: config
              mountPath: /etc/otelcol-contrib
      volumes:
        - name: config
          configMap:
            name: otel-collector-gateway-config
---
apiVersion: v1
kind: Service
metadata:
  name: otel-collector-gateway
  namespace: observability
spec:
  selector:
    app: otel-collector-gateway
  ports:
    - name: otlp-grpc
      port: 4317
      targetPort: 4317
    - name: otlp-http
      port: 4318
      targetPort: 4318
```

### OpenTelemetry Operator

The [OpenTelemetry Operator](https://github.com/open-telemetry/opentelemetry-operator) is a Kubernetes operator that manages Collector instances and can inject auto-instrumentation into pods automatically.

```yaml
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: otel
  namespace: observability
spec:
  mode: daemonset
  config:
    receivers:
      otlp:
        protocols:
          grpc: {}
          http: {}
    processors:
      memory_limiter:
        check_interval: 1s
        limit_mib: 512
      batch: {}
    exporters:
      otlp:
        endpoint: otel-collector-gateway:4317
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [memory_limiter, batch]
          exporters: [otlp]
```

Auto-instrumentation injection:

```yaml
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: java-instrumentation
  namespace: observability
spec:
  exporter:
    endpoint: http://otel-collector-agent:4317
  propagators:
    - tracecontext
    - baggage
  sampler:
    type: parentbased_traceidratio
    argument: "0.25"
  java:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:latest
```

Then annotate your pods:

```yaml
metadata:
  annotations:
    instrumentation.opentelemetry.io/inject-java: "observability/java-instrumentation"
```

The operator injects the Java agent as an init container and sets the required environment variables. No changes to your Dockerfile or application code.

If you are already running [Kubernetes](/devops/kubernetes-architecture/) in production, the Operator is the cleanest way to manage OpenTelemetry. It handles upgrades, configuration changes, and scaling through standard Kubernetes resources.

### Helm Charts

For teams not using the Operator, the official [Helm charts](https://github.com/open-telemetry/opentelemetry-helm-charts) provide ready-made DaemonSet and Deployment configurations:

```bash
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm install otel-collector open-telemetry/opentelemetry-collector \
  --set mode=daemonset \
  --set config.receivers.otlp.protocols.grpc.endpoint=0.0.0.0:4317 \
  --namespace observability
```

---

## Sampling Strategies

At production volume, recording every single trace is prohibitively expensive. A busy service generating 10,000 requests per second produces millions of spans per minute. You need sampling to keep costs under control while still capturing the traces that matter.

### Head-Based Sampling

Head-based sampling makes the sampling decision at the start of a request, before any work is done. The most common approach is **probabilistic sampling**, where you keep a fixed percentage of traces.

```yaml
# In your application SDK config
sampler:
  type: parentbased_traceidratio
  argument: "0.1"  # Keep 10% of traces
```

The `parentbased_traceidratio` sampler is critical. It means if a parent span was sampled, all child spans in that trace are also sampled. Without `parentbased`, you get fragmented traces where some spans are missing.

**Pros**: Simple, low overhead, consistent across services.
**Cons**: You might drop the one trace that shows the production bug. A 10% sample rate means there is a 90% chance any specific error trace gets dropped.

### Tail-Based Sampling

Tail-based sampling makes the decision after the trace is complete. The Collector waits for all spans of a trace to arrive, examines the whole trace, and then decides whether to keep or drop it.

This lets you define policies like:
- Keep all traces with errors
- Keep all traces slower than 2 seconds
- Keep all traces from the `/checkout` endpoint
- Sample everything else at 5%

```yaml
processors:
  tail_sampling:
    decision_wait: 30s
    num_traces: 100000
    expected_new_traces_per_sec: 1000
    policies:
      - name: errors
        type: status_code
        status_code:
          status_codes: [ERROR]
      - name: slow-traces
        type: latency
        latency:
          threshold_ms: 2000
      - name: default-sample
        type: probabilistic
        probabilistic:
          sampling_percentage: 5
```

**The catch**: tail sampling is stateful. The Collector must buffer all spans of a trace in memory until the decision is made. This means:

1. All spans of a single trace must reach the **same Collector instance**. You need a **load-balancing exporter** that routes by trace ID.
2. The Collector needs enough memory to hold all in-flight traces during the `decision_wait` window.
3. If the Collector restarts, buffered traces are lost.

<pre><code class="language-mermaid">
flowchart LR
    subgraph Agents["Agent Tier (Stateless)"]
        direction TB
        AG1["Agent 1"]
        AG2["Agent 2"]
        AG3["Agent 3"]
    end

    subgraph LB["Load Balancing"]
        LBE["Load Balancing\nExporter\n(routes by trace_id)"]
    end

    subgraph Samplers["Tail Sampling Tier (Stateful)"]
        direction TB
        TS1["Sampler 1\n(traces a-m)"]
        TS2["Sampler 2\n(traces n-z)"]
    end

    AG1 --> LBE
    AG2 --> LBE
    AG3 --> LBE
    LBE --> TS1
    LBE --> TS2
    TS1 --> BE["Backends"]
    TS2 --> BE

    style Agents fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style LB fill:#fef3c7,stroke:#d97706,color:#0d2137
    style Samplers fill:#e8f6ee,stroke:#00684A,color:#0d2137
</code></pre>

The agent Collector config for the load-balancing exporter:

```yaml
exporters:
  loadbalancing:
    routing_key: traceID
    protocol:
      otlp:
        tls:
          insecure: true
    resolver:
      dns:
        hostname: otel-collector-sampler-headless
        port: 4317
```

This resolves the headless service to get individual Collector pod IPs and consistently routes spans with the same trace ID to the same pod.

I covered sampling strategies and their tradeoffs in more detail in the [distributed tracing comparison post](/distributed-tracing-jaeger-vs-tempo-vs-zipkin/). The short version: use head sampling if your volume is manageable and you do not need guaranteed error capture. Use tail sampling when missing error traces is not acceptable.

---

## Connecting to Backends

OpenTelemetry does not lock you into any backend. Here is how to connect to the most common open-source options.

### Traces: Jaeger or Grafana Tempo

Both Jaeger and Grafana Tempo accept OTLP natively. The Collector config is almost identical.

```yaml
exporters:
  # Jaeger via OTLP
  otlp/jaeger:
    endpoint: jaeger-collector:4317
    tls:
      insecure: true

  # Grafana Tempo via OTLP
  otlp/tempo:
    endpoint: tempo:4317
    tls:
      insecure: true
```

If you are choosing between them, Tempo is significantly cheaper at high volumes because it stores traces in object storage (S3, GCS) instead of Elasticsearch or Cassandra. If you are already running the Grafana stack with Loki and Prometheus, Tempo is the natural choice for trace-to-log and trace-to-metric correlation.

### Metrics: Prometheus

For metrics, you have two options:

**Option 1: Prometheus Remote Write** (push model). The Collector pushes metrics to Prometheus.

```yaml
exporters:
  prometheusremotewrite:
    endpoint: http://prometheus:9090/api/v1/write
    resource_to_telemetry_conversion:
      enabled: true
```

**Option 2: Prometheus Scrape** (pull model). The Collector exposes a `/metrics` endpoint that Prometheus scrapes.

```yaml
exporters:
  prometheus:
    endpoint: 0.0.0.0:8889
    resource_to_telemetry_conversion:
      enabled: true
```

Remote write is better for most Kubernetes setups because it does not require Prometheus to discover and scrape the Collector. If you are already using [Grafana k6](/performance-testing-with-grafana-k6/) for load testing, you can send both application metrics and test results to the same Prometheus instance.

### Logs: Grafana Loki

```yaml
exporters:
  otlphttp/loki:
    endpoint: http://loki:3100/otlp
```

Loki accepts OTLP natively since version 3.0. The key detail: Loki stores logs with label-based indexing, so the Collector's resource attributes (`service.name`, `deployment.environment`) become Loki labels. Keep these low-cardinality to avoid performance problems.

### Full Stack Diagram

<pre><code class="language-mermaid">
flowchart TB
    subgraph Apps["Applications"]
        direction LR
        S1["<fa:fa-server></fa:fa-server> Service A\nJava + OTel Agent"]
        S2["<fa:fa-server></fa:fa-server> Service B\nPython + OTel"]
        S3["<fa:fa-server></fa:fa-server> Service C\nGo + OTel"]
    end

    subgraph Collector["OTel Collector Gateway"]
        direction TB
        R["Receivers\nOTLP :4317"]
        P1["memory_limiter"]
        P2["batch"]
        P3["resource"]
        EXP["Exporters"]
        R --> P1 --> P3 --> P2 --> EXP
    end

    subgraph Backends["Observability Stack"]
        direction LR
        PROM["<fa:fa-chart-bar></fa:fa-chart-bar> Prometheus\nMetrics"]
        TEMPO["<fa:fa-project-diagram></fa:fa-project-diagram> Grafana Tempo\nTraces"]
        LOKI["<fa:fa-file-alt></fa:fa-file-alt> Loki\nLogs"]
    end

    subgraph Viz["Visualization"]
        G["<fa:fa-tachometer-alt></fa:fa-tachometer-alt> Grafana\nDashboards"]
    end

    S1 -->|OTLP gRPC| R
    S2 -->|OTLP gRPC| R
    S3 -->|OTLP gRPC| R
    EXP -->|"remote write"| PROM
    EXP -->|OTLP| TEMPO
    EXP -->|OTLP| LOKI
    PROM --> G
    TEMPO --> G
    LOKI --> G

    style Apps fill:#e8f4fd,stroke:#1a73e8,color:#0d2137
    style Collector fill:#e8f6ee,stroke:#00684A,color:#0d2137
    style Backends fill:#fff4e0,stroke:#e07b00,color:#0d2137
    style Viz fill:#f0fdf4,stroke:#166534,color:#0d2137
</code></pre>

---

## Security and PII

Telemetry data can accidentally contain sensitive information: email addresses in URLs, auth tokens in headers, credit card numbers in span attributes, PII in log messages. Once it reaches your backend, it is stored and potentially searchable.

Defense in depth works best here: prevent sensitive data from being emitted, and scrub what gets through.

### At the SDK Level

Configure the SDK to not record certain attributes:

```python
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

provider = TracerProvider()
# Do not set span attributes that contain PII
# Bad:  span.set_attribute("user.email", user.email)
# Good: span.set_attribute("user.id", user.id)
```

### At the Collector Level

Use the `attributes` processor to drop or hash sensitive fields:

```yaml
processors:
  attributes/sanitize:
    actions:
      - key: user.email
        action: delete
      - key: http.request.header.authorization
        action: delete
      - key: http.request.header.cookie
        action: delete
      - key: db.statement
        action: delete
      - key: http.url
        action: hash
```

Use the `filter` processor to drop entire spans or metrics you do not want:

```yaml
processors:
  filter/health:
    error_mode: ignore
    traces:
      span:
        - 'attributes["http.route"] == "/healthz"'
        - 'attributes["http.route"] == "/readyz"'
        - 'attributes["http.route"] == "/metrics"'
```

This is also where you drop noisy health check and readiness probe spans that provide zero debugging value but consume storage.

### Compliance

For teams under GDPR, HIPAA, or PCI-DSS, document which telemetry fields you collect, where they are stored, and for how long. The Collector gives you a single enforcement point for data sanitization. Any field that reaches the Collector can be dropped, hashed, or transformed before it leaves for the backend.

---

## Monitoring Your Observability Pipeline

Here is the irony nobody warns you about: if your observability pipeline goes down, you lose visibility into everything, including the pipeline itself.

The Collector exposes its own metrics via Prometheus. Monitor these:

| Metric | What It Means | Alert When |
|--------|--------------|------------|
| `otelcol_exporter_send_failed_spans` | Spans that failed to export | Increasing over 5 minutes |
| `otelcol_exporter_queue_size` | Items waiting to be exported | Approaching `queue_size` limit |
| `otelcol_processor_dropped_spans` | Spans dropped by processors | Any non-zero value |
| `otelcol_receiver_refused_spans` | Spans rejected at intake | Increasing (backpressure) |
| `otelcol_process_memory_rss` | Collector memory usage | Approaching limit |
| `otelcol_processor_batch_timeout_trigger_send` | Batches sent due to timeout | High ratio (means low throughput) |

Set up alerts for these. Seriously. A Collector that silently drops 30% of your spans because the backend is slow will ruin your next incident investigation.

### Health Check

The `health_check` extension exposes an endpoint at `/` on port 13133. Use it as a Kubernetes liveness probe:

```yaml
livenessProbe:
  httpGet:
    path: /
    port: 13133
  initialDelaySeconds: 5
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /
    port: 13133
  initialDelaySeconds: 5
  periodSeconds: 10
```

### zPages

The `zpages` extension provides in-process debugging pages at `http://collector:55679/debug/tracez` and `http://collector:55679/debug/pipelinez`. These show active traces passing through the Collector and the state of each pipeline. Useful for debugging but do not expose them to the internet.

---

## Common Mistakes That Cost Teams Weeks

After running OpenTelemetry across multiple services, these are the mistakes I have seen (and made) that waste the most time.

### 1. Missing the Memory Limiter

Without `memory_limiter` as the first processor, a traffic spike or slow backend will cause the Collector to buffer data in memory until the Linux OOM killer terminates it. You lose everything in the buffer, and the Collector restarts with empty state.

```yaml
# Always first in the processor chain
processors:
  memory_limiter:
    check_interval: 1s
    limit_mib: 1536
    spike_limit_mib: 512
```

### 2. High-Cardinality Attributes

Setting span attributes like `user.id`, full request URLs, or UUIDs as metric labels creates a cardinality explosion. Your Prometheus instance runs out of memory or your time-series database slows to a crawl.

```python
# Bad - creates millions of unique metric series
span.set_attribute("request.url", "/api/users/12345/orders/67890")

# Good - uses route template
span.set_attribute("http.route", "/api/users/{userId}/orders/{orderId}")
```

Keep span attributes detailed (they are per-trace, so cardinality does not matter as much). Keep metric labels low-cardinality (status code, method, route template, environment).

### 3. Not Filtering Health Check Spans

Kubernetes health checks hit your services every 10 seconds. Each one generates a span. With 50 services and 3 probes each, that is 15 health-check spans per second, or over a million per day. They are noise.

Filter them out at the Collector:

```yaml
processors:
  filter/drop-health:
    error_mode: ignore
    traces:
      span:
        - 'attributes["http.target"] == "/healthz"'
        - 'attributes["http.target"] == "/readyz"'
        - 'attributes["http.target"] == "/livez"'
```

### 4. Inconsistent Service Names

If your Java service reports as `order-service` and your Kubernetes config calls it `orderservice`, you end up with two entries in your service map. Every service must use the same `service.name` everywhere.

Set it explicitly via environment variable:

```yaml
env:
  - name: OTEL_SERVICE_NAME
    value: "order-service"
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: "deployment.environment=production,service.version=1.4.2"
```

### 5. Forgetting Context Propagation

Auto-instrumentation handles context propagation for HTTP and gRPC automatically. But if your services communicate over message queues (Kafka, RabbitMQ, SQS), you need to propagate context manually by injecting trace headers into message attributes and extracting them on the consumer side.

```python
from opentelemetry import context
from opentelemetry.propagate import inject, extract

# Producer: inject trace context into message headers
headers = {}
inject(headers)
producer.send("orders", value=order_data, headers=headers)

# Consumer: extract trace context from message headers
ctx = extract(message.headers)
with tracer.start_as_current_span("process_order", context=ctx):
    process(message)
```

Without this, every message consumer starts a new, disconnected trace. You lose the ability to trace a request from the API call through the queue to the worker.

If you are building resilient microservices, proper context propagation is just as important as patterns like [circuit breakers](/circuit-breaker-pattern/) for understanding failures end to end.

### 6. Deploying Without Resource Limits

In Kubernetes, always set resource requests and limits on the Collector. Without limits, a misbehaving Collector can consume all node resources and affect other workloads. Without requests, the scheduler might pack too many Collectors on one node.

Start with these and adjust based on your volume:

| Role | CPU Request | CPU Limit | Memory Request | Memory Limit |
|------|------------|-----------|----------------|--------------|
| Agent (DaemonSet) | 200m | 500m | 256Mi | 512Mi |
| Gateway (Deployment) | 1 | 2 | 2Gi | 4Gi |
| Tail Sampler (StatefulSet) | 1 | 2 | 2Gi | 4Gi |

---

## Getting Started Checklist

If you are adding OpenTelemetry to an existing production system, here is the order that works:

1. **Pick one service.** Start with a non-critical service that makes downstream calls.
2. **Add auto-instrumentation.** Use the Java agent, Python CLI, or framework wrappers.
3. **Deploy a single Collector.** Gateway mode with OTLP receiver, memory_limiter, batch, and one exporter.
4. **Connect to a trace backend.** Jaeger (easy, standalone) or Tempo (if you are already on Grafana).
5. **Verify traces end-to-end.** Make a request, find the trace in the UI, confirm spans from all involved services.
6. **Add metrics export.** Prometheus remote write from the same Collector.
7. **Add log correlation.** Inject trace_id into your log format, export to Loki.
8. **Roll out to more services.** Expand auto-instrumentation, add manual spans for business logic.
9. **Add tail sampling.** When volume warrants it, add the stateful sampling tier.
10. **Monitor the pipeline.** Set up alerts on Collector health metrics.

Do not try to do all of this in one sprint. The teams that succeed with OpenTelemetry treat it as a gradual rollout, not a big-bang migration.

---

## Wrapping Up

OpenTelemetry solved the vendor lock-in problem for observability. You instrument once, and you can send data anywhere. That is genuinely valuable.

But running it in production requires more care than the getting-started guides suggest. The Collector needs proper memory limits, processor ordering, and its own monitoring. Sampling needs to be deliberate. Auto-instrumentation needs to be tuned to remove noise. And context propagation needs to work across every communication channel, not just HTTP.

The good news is that once you get it right, you have a single, consistent view across all your services. When the next production incident hits, you go from metric spike to trace to log line in seconds instead of hours.

If you have not read it yet, the [distributed tracing comparison](/distributed-tracing-jaeger-vs-tempo-vs-zipkin/) covers the backend side of this story: how to choose between Jaeger, Tempo, and Zipkin for storing the traces that OpenTelemetry collects.
