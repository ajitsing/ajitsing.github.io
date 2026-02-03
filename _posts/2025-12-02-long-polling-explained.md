---
layout: post
title: "Long Polling Explained: Build Real-Time Apps Without WebSockets"
subtitle: "The battle-tested technique that powers notifications when persistent connections fail"
date: 2025-12-02
last-modified-date: 2026-01-03
thumbnail-img: /assets/img/posts/system-design/long-polling-thumbnail.png
share-img: /assets/img/posts/system-design/long-polling-thumbnail.png
categories: system-design
tags: [system-design]
permalink: /long-polling-explained/
description: "Learn how Long Polling enables real-time communication using plain HTTP. Understand the implementation, trade-offs, and when to choose Long Polling over WebSockets or Server-Sent Events."
keywords: "long polling, real-time communication, HTTP polling, comet, reverse ajax, websocket alternative, server push, real-time web, notification system, chat application"
seo: true
social-share: true
comments: true

quick-answer: "Long polling: client sends request, server **holds connection open** until data arrives or timeout, then client immediately reconnects. Works everywhere HTTP works, even through restrictive firewalls/proxies. Use when WebSockets are blocked, updates are infrequent (<1/sec), or on serverless. More overhead than WebSockets due to HTTP headers per request."

faq:
  - question: "What is long polling?"
    answer: "Long polling is a technique where the client sends a request to the server and the server holds the connection open until new data is available (or a timeout occurs). When data arrives or timeout hits, the server responds and the client immediately opens a new request. This provides near-real-time updates using standard HTTP."
  - question: "What is the difference between long polling and WebSockets?"
    answer: "Long polling uses standard HTTP request-response cycles, opening a new connection for each update. WebSockets maintain a persistent bidirectional connection. Long polling works through any firewall/proxy that supports HTTP; WebSockets need special proxy support. WebSockets are more efficient for high-frequency updates; long polling is simpler to implement and more universally compatible."
  - question: "When should I use long polling instead of WebSockets?"
    answer: "Use long polling when WebSockets are blocked by firewalls or proxies, when you need a simple fallback mechanism, when updates are infrequent (less than once per second), or when you're using serverless infrastructure that doesn't support persistent connections. Long polling works everywhere HTTP works."
  - question: "What are the downsides of long polling?"
    answer: "Long polling creates more overhead than WebSockets due to HTTP headers on every request, requires server resources to hold connections open, and has slightly higher latency since a new connection is needed after each response. It's also less efficient for high-frequency bidirectional communication."
---

You're building a notification system. Users need to see new alerts the moment they arrive. The obvious solution? WebSockets. But your load balancer doesn't support them. Your corporate firewall blocks them. Your client's browser is ancient.

What do you do?

You reach for Long Polling. It's not glamorous. It's not cutting edge. But it works everywhere HTTP works, and it's been quietly powering real-time features for over 15 years.

Let's understand how this simple technique works and when it still makes sense in 2025.

## The Problem With Regular Polling

To understand Long Polling, you first need to understand why regular polling fails at scale.

Regular polling is simple: the client asks the server for updates every few seconds.

<pre><code class="language-mermaid">
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: Any updates?
    Server-->>Client: No
    Note over Client: Wait 5 seconds
    
    Client->>Server: Any updates?
    Server-->>Client: No
    Note over Client: Wait 5 seconds
    
    Client->>Server: Any updates?
    Server-->>Client: Yes, here's the data
    Note over Client: Wait 5 seconds
    
    Client->>Server: Any updates?
    Server-->>Client: No
</code></pre>

This works, but it has two problems:

**Problem 1: Wasted requests.** If you poll every 5 seconds and updates arrive once a minute, 11 out of 12 requests return empty. That's 91% wasted bandwidth and server processing.

**Problem 2: Delayed updates.** If you poll every 5 seconds and an update arrives right after a poll, users wait up to 5 seconds to see it. Poll more frequently and you waste more resources. Poll less frequently and updates feel sluggish.

You're stuck choosing between responsiveness and efficiency.

## How Long Polling Solves This

Long Polling flips the script. Instead of the client asking repeatedly, it asks once and waits. The server holds the connection open until it has something to say.

<img src="/assets/img/posts/system-design/long polling.png" alt="Long polling sequence diagram showing client sending request to server, server holding connection open while waiting for data, then responding when new data arrives and client immediately making another request" title="How Long Polling works - server holds connection until data is available" loading="lazy" />

The beauty is in the simplicity:

1. Client sends an HTTP request
2. Server doesn't respond immediately
3. Server waits until it has new data (or a timeout occurs)
4. Server sends the response
5. Client immediately makes another request

No wasted requests. Updates arrive the instant they're available. And it's just plain HTTP.

## The Technical Implementation

Let's build a basic Long Polling system. The server side is where the magic happens.

### Server Side (Node.js with Express)

```javascript
const express = require('express');
const app = express();

// Store for pending notification requests
const waitingClients = new Map();

// Store for user notifications
const notifications = new Map();

app.get('/notifications/:userId', async (req, res) => {
    const { userId } = req.params;
    const timeout = 30000; // 30 second timeout
    
    // Check if there are already pending notifications
    const pending = notifications.get(userId);
    if (pending && pending.length > 0) {
        const data = pending.splice(0, pending.length);
        return res.json({ notifications: data });
    }
    
    // No notifications yet, hold the connection
    const timeoutId = setTimeout(() => {
        waitingClients.delete(userId);
        res.json({ notifications: [] });
    }, timeout);
    
    // Store the response object so we can respond later
    waitingClients.set(userId, { res, timeoutId });
    
    // Clean up if client disconnects
    req.on('close', () => {
        clearTimeout(timeoutId);
        waitingClients.delete(userId);
    });
});

// Endpoint to send a notification (called by other services)
app.post('/send-notification', express.json(), (req, res) => {
    const { userId, message } = req.body;
    
    // Check if user has a waiting request
    const waiting = waitingClients.get(userId);
    if (waiting) {
        // User is connected and waiting, respond immediately
        clearTimeout(waiting.timeoutId);
        waitingClients.delete(userId);
        waiting.res.json({ notifications: [message] });
    } else {
        // User not connected, store for later
        if (!notifications.has(userId)) {
            notifications.set(userId, []);
        }
        notifications.get(userId).push(message);
    }
    
    res.json({ status: 'sent' });
});

app.listen(3000);
```

### Client Side (JavaScript)

```javascript
class LongPollingClient {
    constructor(userId) {
        this.userId = userId;
        this.isRunning = false;
    }
    
    start() {
        this.isRunning = true;
        this.poll();
    }
    
    stop() {
        this.isRunning = false;
    }
    
    async poll() {
        if (!this.isRunning) return;
        
        try {
            const response = await fetch(`/notifications/${this.userId}`, {
                // Important: don't let browser timeout before server
                signal: AbortSignal.timeout(35000)
            });
            
            const data = await response.json();
            
            if (data.notifications.length > 0) {
                this.handleNotifications(data.notifications);
            }
            
            // Immediately start next poll
            this.poll();
            
        } catch (error) {
            if (error.name === 'AbortError') {
                // Timeout, just try again
                this.poll();
            } else {
                // Network error, back off and retry
                console.error('Polling error:', error);
                setTimeout(() => this.poll(), 5000);
            }
        }
    }
    
    handleNotifications(notifications) {
        notifications.forEach(notification => {
            console.log('New notification:', notification);
            // Update UI, show toast, etc.
        });
    }
}

// Usage
const client = new LongPollingClient('user-123');
client.start();
```

## The Connection Timeout Dance

The 30 second timeout in the example isn't random. It's a careful balance between several constraints:

**Browser limits:** Most browsers kill idle HTTP connections after 60 to 120 seconds. Your timeout must be shorter.

**Proxy limits:** Corporate proxies, load balancers, and CDNs often have their own timeouts, typically 30 to 60 seconds. Nginx defaults to 60 seconds. AWS ALB defaults to 60 seconds.

**Keep-alive signals:** Some proxies drop connections that appear idle. Returning an empty response before the proxy timeout keeps the connection alive.

Here's the typical flow with timeouts:

<pre><code class="language-mermaid">
sequenceDiagram
    participant Client
    participant Proxy
    participant Server
    
    Client->>Proxy: Long poll request
    Proxy->>Server: Forward request
    
    Note over Server: Waiting for data...
    Note over Server: 25 seconds pass...
    Note over Server: No data yet
    Note over Server: Approaching timeout
    
    Server-->>Proxy: Empty response (timeout)
    Proxy-->>Client: Forward response
    
    Client->>Proxy: New long poll request
    Proxy->>Server: Forward request
    
    Note over Server: 5 seconds pass
    Note over Server: Data arrives!
    
    Server-->>Proxy: Response with data
    Proxy-->>Client: Forward response
</code></pre>

## Long Polling vs WebSockets vs Server-Sent Events

Long Polling isn't the only way to push data to clients. Let's compare the three main approaches:

| Feature | Long Polling | WebSockets | Server-Sent Events |
|---------|--------------|------------|-------------------|
| Connection | New HTTP request each cycle | Single persistent connection | Single persistent connection |
| Direction | Server to client (with tricks) | Bidirectional | Server to client only |
| Protocol | HTTP | WebSocket (ws://, wss://) | HTTP |
| Proxy support | Excellent | Variable | Good |
| Firewall friendly | Yes | Sometimes blocked | Yes |
| Browser support | Universal | Modern browsers | Modern browsers (no IE) |
| Reconnection | Built into pattern | Must implement | Automatic |
| Message efficiency | HTTP overhead each message | Minimal overhead | Minimal overhead |

**Choose Long Polling when:**
- You need maximum compatibility
- Corporate firewalls block WebSocket traffic
- Your infrastructure doesn't support persistent connections
- You're dealing with legacy systems

**Choose WebSockets when:**
- You need bidirectional communication
- Message frequency is high
- Latency is critical
- You control the infrastructure

**Choose Server-Sent Events when:**
- You only need server to client updates
- You want simplicity without WebSocket complexity
- HTTP/2 is available (multiplexes efficiently)

## Real-World Long Polling: How Facebook Did It

Before Facebook moved to MQTT and eventually their custom protocol, they used Long Polling for their chat and notification systems. Their implementation handled millions of concurrent connections.

Here's what made it work at scale:

### 1. Connection Pooling

Instead of one request per user, Facebook multiplexed multiple users onto shared long-poll channels:

```javascript
// Simplified concept of channel-based long polling
app.get('/channel/:channelId', async (req, res) => {
    const { channelId } = req.params;
    const userIds = getUsersInChannel(channelId);
    
    // Wait for any event relevant to any user in this channel
    const event = await waitForEvent(userIds, 30000);
    
    if (event) {
        res.json(event);
    } else {
        res.json({ type: 'heartbeat' });
    }
});
```

This reduced the number of open connections dramatically. Instead of 1 million connections for 1 million users, they might have 100,000 connections each serving 10 users.

### 2. Sticky Sessions

Long Polling requires the same server to handle the request that has the user's pending data. Facebook used sticky sessions (also called session affinity) at the load balancer level to route each user's requests to the same server.

<pre><code class="language-mermaid">
flowchart TD
    C1[Client A] --> LB[Load Balancer]
    C2[Client B] --> LB
    C3[Client C] --> LB
    
    LB -->|"Session: A"| S1[Server 1]
    LB -->|"Session: B, C"| S2[Server 2]
    
    S1 --> Q1[User A Queue]
    S2 --> Q2[User B Queue]
    S2 --> Q3[User C Queue]
    
    style LB fill:#fef3c7,stroke:#d97706,stroke-width:2px
    style S1 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style S2 fill:#dcfce7,stroke:#16a34a,stroke-width:2px
</code></pre>

### 3. Graceful Degradation

When servers got overloaded, Facebook would increase the timeout gradually. Under extreme load, Long Polling degrades naturally into regular polling with longer intervals.

```javascript
function getTimeoutBasedOnLoad() {
    const serverLoad = getServerLoadPercent();
    
    if (serverLoad < 50) {
        return 30000; // Normal: 30 seconds
    } else if (serverLoad < 75) {
        return 45000; // Medium load: 45 seconds
    } else if (serverLoad < 90) {
        return 60000; // High load: 60 seconds
    } else {
        // Critical load: switch to regular polling
        return 5000;
    }
}
```

## Common Pitfalls and How to Avoid Them

### Pitfall 1: Connection Starvation

Browsers limit concurrent connections to the same domain (usually 6 per domain). If you open too many long-poll connections, regular requests can't get through.

**Fix:** Use a single long-poll connection per tab, or use a separate subdomain for long polling:

```javascript
// Use a dedicated subdomain for long polling
const pollEndpoint = 'https://poll.yoursite.com/notifications';

// Or limit connections per tab
if (!window.longPollActive) {
    window.longPollActive = true;
    startLongPolling();
}
```

### Pitfall 2: Thundering Herd

When a server restarts or a network hiccup occurs, all clients reconnect simultaneously. This flood can overwhelm the server.

**Fix:** Add jitter to reconnection timing:

```javascript
function reconnectWithJitter() {
    // Random delay between 0 and 5 seconds
    const jitter = Math.random() * 5000;
    setTimeout(() => this.poll(), jitter);
}
```

### Pitfall 3: Memory Leaks

Holding thousands of response objects in memory for waiting clients can cause memory leaks if not cleaned up properly.

**Fix:** Always handle client disconnections:

```javascript
app.get('/poll', (req, res) => {
    const clientId = req.query.id;
    
    // Store the client
    clients.set(clientId, res);
    
    // Clean up on disconnect
    req.on('close', () => {
        clients.delete(clientId);
    });
    
    // Clean up on error
    req.on('error', () => {
        clients.delete(clientId);
    });
});
```

### Pitfall 4: Missing Messages During Reconnection

Between when a response is sent and when the next poll request arrives, messages can be lost.

**Fix:** Use sequence numbers or timestamps:

```javascript
// Client tracks last seen sequence
let lastSeq = 0;

async function poll() {
    const response = await fetch(`/poll?since=${lastSeq}`);
    const data = await response.json();
    
    if (data.messages.length > 0) {
        lastSeq = data.messages[data.messages.length - 1].seq;
    }
    
    poll();
}
```

```javascript
// Server stores messages with sequence numbers
const messages = [];
let currentSeq = 0;

function addMessage(content) {
    messages.push({ seq: ++currentSeq, content, timestamp: Date.now() });
    // Clean up old messages after 5 minutes
    const cutoff = Date.now() - 300000;
    while (messages.length && messages[0].timestamp < cutoff) {
        messages.shift();
    }
}

app.get('/poll', (req, res) => {
    const since = parseInt(req.query.since) || 0;
    const newMessages = messages.filter(m => m.seq > since);
    
    if (newMessages.length > 0) {
        res.json({ messages: newMessages });
    } else {
        // Wait for new messages or timeout
        // ...
    }
});
```

## Scaling Long Polling

For serious production use, you need to think about horizontal scaling. The challenge is that a user's long-poll request might hit Server A, but the event they're waiting for arrives at Server B.

### Option 1: Redis Pub/Sub

Use Redis to broadcast events across all servers:

<pre><code class="language-mermaid">
flowchart TD
    subgraph Clients
        C1[Client 1]
        C2[Client 2]
        C3[Client 3]
    end
    
    subgraph Servers
        S1[Server 1]
        S2[Server 2]
        S3[Server 3]
    end
    
    R[(Redis Pub/Sub)]
    
    C1 --> S1
    C2 --> S2
    C3 --> S3
    
    S1 <--> R
    S2 <--> R
    S3 <--> R
    
    style R fill:#fee2e2,stroke:#dc2626,stroke-width:2px
</code></pre>

```javascript
const Redis = require('ioredis');
const pub = new Redis();
const sub = new Redis();

// Subscribe to user events
sub.subscribe('user-events');

sub.on('message', (channel, message) => {
    const { userId, data } = JSON.parse(message);
    
    // Check if this user is waiting on this server
    const waiting = waitingClients.get(userId);
    if (waiting) {
        clearTimeout(waiting.timeoutId);
        waitingClients.delete(userId);
        waiting.res.json({ data });
    }
});

// When an event occurs, publish it
function notifyUser(userId, data) {
    pub.publish('user-events', JSON.stringify({ userId, data }));
}
```

### Option 2: Sticky Sessions with Shared State

Route users consistently to the same server, but use shared storage (Redis, database) for event data:

```javascript
// Store events in Redis with expiry
async function storeEvent(userId, event) {
    const key = `events:${userId}`;
    await redis.rpush(key, JSON.stringify(event));
    await redis.expire(key, 300); // 5 minute expiry
}

// Poll endpoint checks Redis
app.get('/poll/:userId', async (req, res) => {
    const { userId } = req.params;
    const key = `events:${userId}`;
    
    // Check for existing events
    const events = await redis.lrange(key, 0, -1);
    if (events.length > 0) {
        await redis.del(key);
        return res.json({ events: events.map(JSON.parse) });
    }
    
    // No events, wait with polling on Redis
    // ...
});
```

## Performance Numbers

To give you a sense of what Long Polling can handle:

| Metric | Typical Value |
|--------|---------------|
| Connections per server | 10,000 to 50,000 |
| Memory per connection | 2KB to 10KB |
| Timeout duration | 20 to 60 seconds |
| Reconnection delay | 0 to 5 seconds (with jitter) |
| Message latency | Near-instant to timeout length |
| HTTP overhead per message | 400 to 800 bytes headers |

Compare this to WebSockets:

| Metric | WebSocket | Long Polling |
|--------|-----------|--------------|
| Connection overhead | One handshake | Headers every request |
| Message overhead | 2 to 14 bytes | 400+ bytes |
| Connections per server | 100,000+ | 10,000 to 50,000 |
| Bidirectional | Native | Requires separate request |

## When Long Polling Still Makes Sense in 2025

Despite WebSockets and Server-Sent Events being widely available, Long Polling hasn't disappeared. Here's where you'll still find it:

**Enterprise environments:** Many corporate networks and proxies still don't handle WebSockets well. Long Polling just works.

**Serverless architectures:** AWS Lambda, Cloud Functions, and other serverless platforms don't support persistent connections. Long Polling works within HTTP request timeouts.

**Simple notification systems:** If you're sending a few notifications per minute to users, the overhead of Long Polling is negligible, and the implementation is simpler than setting up WebSocket infrastructure.

**Fallback mechanisms:** Even apps that primarily use WebSockets often fall back to Long Polling when WebSocket connections fail.

## Key Takeaways

**1. Long Polling is HTTP polling done right.** The server holds the connection until it has data, eliminating wasted requests and reducing latency.

**2. Timeouts are critical.** Stay under browser and proxy limits. 30 seconds is a safe default.

**3. Handle reconnection gracefully.** Add jitter to prevent thundering herds. Use sequence numbers to avoid missing messages.

**4. Clean up resources.** Remove waiting clients when they disconnect. Set expiry on stored messages.

**5. Consider scaling early.** Redis Pub/Sub or sticky sessions with shared state let you scale horizontally.

**6. Know when to graduate.** If you're sending dozens of messages per second per user, it's time for WebSockets. Long Polling works best for low to medium frequency updates.

Long Polling isn't the future of real-time web. But it's a reliable, battle-tested technique that works in environments where nothing else will. Sometimes the best solution isn't the newest one.

---

*Want to understand other real-time communication approaches? Check out [Server-Sent Events Explained](/server-sent-events-explained/) for one-way server push, [WebSockets Explained](/explainer/websockets-explained/) for the persistent connection alternative, [How Google Docs Works](/how-google-docs-works/) for collaborative editing architecture, and [How Stock Brokers Handle Real-Time Price Updates](/how-stock-brokers-handle-real-time-price-updates/) to see WebSockets in action at massive scale.*

*References: [Comet (Wikipedia)](https://en.wikipedia.org/wiki/Comet_(programming)), [RFC 6202: HTTP Long Polling](https://tools.ietf.org/html/rfc6202), [Facebook Engineering Blog](https://engineering.fb.com/)*

