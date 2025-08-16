---
layout: post
title: "How Uber Finds Nearby Drivers at 1 Million Requests per Second"
description: "How Uber matches you with a driver in seconds? Here's the fascinating story behind their 1M+ requests per second matching system."
date: 2025-08-16
categories: system-design
thumbnail-img: /assets/img/posts/uber-sytem-design/thumbnail.png
share-img: /assets/img/posts/uber-sytem-design/thumbnail.png
permalink: /how-uber-finds-nearby-drivers-1-million-requests-per-second/
keywords: "uber system design, geospatial indexing, H3 hexagonal grid, distributed systems, real-time matching, driver location tracking, scalability, microservices architecture, kafka streaming, redis caching, system design interview, uber engineering, location-based services, high-performance systems, 1 million RPS"
comments: true
tags: [system-design]
---

Picture this. You're standing outside Select City Walk in Saket, tired after shopping, and you open the Uber app. Tap the destination, hit "Book Ride", and boom - within 3-4 seconds, you see "Driver is 2 minutes away" with his Maruti Dzire coming towards you on the map.

What just happened behind that simple tap? Let me tell you the story of one of the most fascinating distributed systems ever built.

## The Problem That Started It All

Back in 2010-2012, Uber was a small San Francisco startup. Their first system was simple - when you requested a ride, they'd just loop through every available driver in the city and find the closest one. Worked fine when they had 50 drivers. 

But then Uber started growing. Fast.

By 2014, they had thousands of drivers in each city. The old "check every driver" approach was taking 10-15 seconds just to find matches. Riders were getting frustrated. Drivers were going offline. The business was literally breaking under its own success.

That's when Uber's engineering team realized they needed to completely rethink how they find nearby drivers. They weren't just building a ride-hailing app anymore - they were building a real-time matching engine that could handle millions of requests per second globally.

## The Big Picture First

Before we dive into the technical details, let me paint the whole picture. Today, Uber processes over 1 million driver-matching requests per second across all their services (Rides, Eats, Freight). That's not just finding drivers - that's the complete flow from "user taps request" to "driver gets notification".

Here's what happens in those magical 2-3 seconds:

1. **Location Magic**: Convert your GPS coordinates into a special hexagonal grid system
2. **Smart Search**: Find all available drivers in nearby hexagons without checking everyone
3. **Quick Ranking**: Score drivers based on distance, acceptance rate, and other factors
4. **Real-time Offers**: Send ride offers to drivers through persistent connections
5. **Instant Updates**: Show you the matched driver on the map in real-time

Now, let me tell you how each piece works.

## Chapter 1: The Hexagon Revolution

The breakthrough moment came when Uber's team discovered something called H3 - a hexagonal hierarchical spatial indexing system. Think of it as dividing the entire Earth into millions of hexagonal tiles, like a giant honeycomb.

Why hexagons instead of squares? This is brilliant:

**Uniform Neighbors**: Every hexagon has exactly 6 neighbors at the same distance. With squares, you have 4 close neighbors (sharing edges) and 4 diagonal neighbors (sharing corners) at different distances. This makes calculations messy.

**Better Circles**: When you want to find drivers within 2 km radius, hexagons approximate a circle much better than squares do.

**Hierarchical**: H3 has 16 different resolution levels. Level 0 covers continents, Level 8 covers neighborhoods, Level 15 covers individual parking spots. You can easily go from fine-grained to coarse-grained.

Here's the magic - every location on Earth gets a unique 64-bit H3 ID. Your pickup location `28.5355, 77.2090` (Connaught Place, Delhi) becomes something like `8a1fb466d18ffff`. That ID tells you exactly which hexagon you're in.

## Chapter 2: The Real-Time Location Pipeline

Every Uber driver's phone sends a GPS ping every 4-6 seconds. That's millions of location updates per minute flowing into Uber's system. But raw GPS is noisy and unreliable.

Here's what happens to each location ping:

**Step 1: Map Matching**
Raw GPS often shows drivers floating in buildings or water. Uber's map-matching algorithm snaps each location to the nearest road. They use OpenStreetMap data combined with their own road network data.

**Step 2: Smoothing**
GPS can jump around wildly. Uber applies smoothing algorithms (similar to Kalman filters) to create realistic movement patterns.

**Step 3: H3 Conversion**
The clean GPS coordinate gets converted to an H3 cell ID at the appropriate resolution (usually level 8 or 9 for city-level matching).

**Step 4: Streaming Updates**
All these location updates flow through Kafka (Uber's message broker of choice) to multiple consumers. One consumer updates the real-time search index, another writes to long-term storage for analytics.

The key insight: they separate the fast path (real-time matching) from the slow path (analytics and logging). Your ride request only touches the fast path.

## Chapter 3: The Search Engine

Now comes the clever part. Instead of maintaining a database of "all drivers and their coordinates", Uber maintains an in-memory index of "which drivers are in which H3 cells".

The data structure looks like this:
```
H3_Cell_8a1fb466d18ffff → [driver_123, driver_456, driver_789]
H3_Cell_8a1fb466d1b7fff → [driver_234, driver_567]
```

When you request a ride from Connaught Place:

1. **Convert** your pickup location to H3 cell `8a1fb466d18ffff`
2. **Expand** search to k-ring neighbors (k=1 means immediate neighbors, k=2 means neighbors of neighbors)
3. **Collect** all driver IDs from these cells
4. **Filter** out drivers who are busy, offline, or have stale locations (older than 30 seconds)

This approach is lightning fast because:
- No geometry calculations during search
- No distance computations until the final step  
- Cache-friendly memory access patterns
- Easy to shard by geographic regions

## Chapter 4: The Ranking Brain

You've got 50 candidate drivers within 2 km. Now what? Uber's ranking system kicks in, but it has to be super fast - no time for complex ML models during the request flow.

The ranking considers:
- **Distance/ETA**: Obviously the most important factor
- **Acceptance Rate**: Drivers who frequently decline get lower priority  
- **Driver Rating**: But only as a tie-breaker
- **Vehicle Type**: Match to what user requested
- **Driver Direction**: Is the driver moving towards or away from you?

Here's the engineering trick: all these features are pre-computed and cached with each driver's location. When the driver sends a location ping, Uber also updates their cached features. During ranking, it's just a simple weighted sum - no database calls needed.

The formula is roughly: `Score = w1*ETA + w2*AcceptanceRate + w3*Rating + ...`

Pick the top 3-5 drivers and start making offers.

## Chapter 5: The Notification System

Making offers to drivers is where things get really interesting. Uber can't afford to lose seconds sending HTTP requests and waiting for responses. They need persistent, real-time connections.

**Persistent Connections**: Every driver's phone maintains a persistent gRPC connection to Uber's driver notification service. These connections stay open for hours, routing through regional gateways for low latency.

**Smart Retry Logic**: If the top driver doesn't respond within 5-7 seconds, immediately offer to the next driver. But they also implement smart timeouts - busier areas get shorter timeouts.

**Geographic Routing**: A driver in Delhi connects to Uber's Singapore data center (closest to India), not their US servers. This keeps latency under 100ms.

**Deduplication**: What if the same ride request gets processed twice? Uber uses idempotency keys and versioned state machines to ensure exactly-once processing.

## Chapter 6: Scale - The 1 Million RPS Story

Let's talk numbers. Uber handles 1M+ matching requests per second. That's:
- 86 billion requests per day
- Each request touching 10-50 H3 cells
- Each cell potentially containing 100+ drivers
- All responses needed within 200-300ms

How do they not collapse under this load?

**Geographic Sharding**: The real-time index is sharded by H3 prefix. All of Delhi NCR's data lives on specific shards, never mixed with New York's data. A pickup request in Connaught Place will never hit servers storing San Francisco data.

**Memory-First Architecture**: The entire "which drivers are in which cells" mapping lives in RAM across thousands of servers. They use Redis for shared state, but most reads happen from local memory.

**Circuit Breakers**: When a shard gets overloaded, they automatically:
  - Expand search radius to neighboring shards  
  - Shed non-critical features (fancy routing, detailed ETA calculations)
  - Fall back to cached results
  - Drop requests gracefully rather than failing everything

**Predictable Performance**: They optimize for p99 latency, not average. Better to consistently deliver 250ms responses than to have 100ms average with 2-second spikes.

## Chapter 7: When Things Go Wrong

Distributed systems fail in interesting ways. Here's how Uber handles the chaos:

**Stale Driver Locations**: What if a driver's phone loses network for 30 seconds? Their location gets marked as "stale" and they stop receiving requests until fresh location comes in.

**Split Brain Scenarios**: What if two servers think they both assigned the same driver to different rides? Uber uses versioned state with compare-and-swap operations. Only one assignment wins.

**Data Center Failures**: If Singapore data center goes down, Indian traffic fails over to European servers. Higher latency, but service continues.

**Hot Spots**: During rush hour or big events, some H3 cells get overloaded. Uber dynamically adjusts cell resolution - busy areas get finer hexagons, sparse areas get coarser ones.

## Chapter 8: The Technology Stack

For fellow developers curious about the actual tech:

**Languages**: Go for real-time services, Java for business logic, Python for data processing

**Storage**: Redis for hot data, Cassandra for persistent storage, Kafka for event streaming

**Networking**: gRPC for service-to-service, WebSocket for mobile connections

**Monitoring**: They track "Time to Match" as their key metric, not just system metrics

**Deployment**: Blue-green deployments with canary releases. New matching logic gets tested on 1% of traffic first.

## What We Can Learn

As developers, here are the key insights from Uber's system:

**1. Choose the Right Data Structure**: The H3 hexagonal grid was the breakthrough. Sometimes the solution isn't faster algorithms - it's better data organization.

**2. Separate Fast and Slow Paths**: Real-time matching logic is completely isolated from analytics, logging, and other slow operations.

**3. Cache Aggressively**: Pre-compute everything you can. Driver features, ETA estimates, even routing hints are cached and updated asynchronously.

**4. Design for Failure**: Circuit breakers, graceful degradation, and automatic fallbacks aren't afterthoughts - they're core to the architecture.

**5. Geographic Thinking**: Location-based services need geographic sharding. Never let a request from one city hit data from another city.

---

*That's the story of how Uber finds your nearby driver. Amazing what happens when you combine smart algorithms, solid engineering, and massive scale, isn't it?*
