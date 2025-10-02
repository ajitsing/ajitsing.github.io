---
layout: post
seo: true
title: "Why JWT Replaced Sessions: Building Auth That Scales"
subtitle: "How stateless tokens solved the scaling problem that broke every session-based system"
date: 2025-10-02
categories: web-development
thumbnail-img: /assets/img/posts/security/jwt-thumbnail.png
share-img: /assets/img/posts/security/jwt-thumbnail.png
permalink: /how-jwt-works/
description: "Deep dive into JSON Web Tokens (JWT) - understand the structure, signature verification, security best practices, and common vulnerabilities. Learn how JWT enables stateless authentication and when to use (or avoid) it."
keywords: "jwt, json web token, authentication, authorization, web security, stateless authentication, token based authentication, jwt signature, jwt security, oauth, api authentication"
tags: [security]
comments: true
---

Your app just hit production. 10,000 users are logged in. Your server stores session data for each one in memory. Traffic doubles. Then triples. The server runs out of memory. Users get logged out randomly. You add more servers, but now sessions don't sync across them.

This was the authentication nightmare of 2010. Facebook, Twitter, Google - they all faced the same problem: **how do you authenticate millions of users without storing state on your servers?**

The answer: a simple token with three parts separated by dots. A token that carries its own verification. A token that lets servers stay stateless.

They called it JWT - JSON Web Token.

Here's what makes it interesting: **JWT doesn't store anything on the server**. The client carries the proof. The server just verifies it. Like showing your passport at airport security - they don't call your home country, they just check if the passport itself is authentic.

## The Problem: Why Sessions Don't Scale

Traditional sessions work like a parking valet service. You give them your car, they give you a ticket with a number, and they park your car in spot #47. When you return, you show the ticket, and they fetch your car from storage.

This works for one parking location. But what if you have 100 parking garages across the city and want to retrieve your car from any location? Now you need a central tracking system, network calls to find where the car is stored, and if that central system goes down, nobody can get their cars.

```mermaid
sequenceDiagram
    participant U as User
    participant S1 as Server 1
    participant Redis as Session Store
    participant S2 as Server 2
    
    U->>S1: Login with credentials
    S1->>Redis: Store session
    Redis->>S1: Return session_id
    S1->>U: Set cookie: session_id
    
    Note over U,S2: Next request hits different server
    
    U->>S2: Request with cookie
    S2->>Redis: Fetch session
    Redis->>S2: Return user data
    S2->>U: Response
    
    Note over Redis: If Redis crashes?<br/>Everyone logs out!
```

**Problems with sessions**:
- Memory overhead for every logged-in user
- Need shared session storage (Redis, database)
- Single point of failure
- Doesn't work well across domains or in mobile apps

## The Insight: Authentication That Travels with the Request

Instead of the server storing "who you are", what if you carried proof of identity?

- **Sessions** (hotel key cards): Hotel knows you're in room 403 because they have records
- **JWT** (passports): You prove who you are by showing a verified document

With JWT, the server doesn't remember you. You show up with a token that proves you're authenticated, and the server verifies it.

**The key innovation**: the proof can be verified without checking a database.

## JWT Structure: Three Parts

A JWT looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Three parts: **Header.Payload.Signature**

### Part 1: Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Specifies the signing algorithm and token type. Base64URL encoded.

### Part 2: Payload (Claims)

```json
{
  "user_id": 1234567890,
  "email": "john@example.com",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516242622
}
```

Contains user data and metadata. Also Base64URL encoded.

**Critical**: The payload is NOT encrypted. Anyone can decode it. Never put passwords or sensitive data here.

### Part 3: Signature

```javascript
signature = HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)
```

The signature proves:
- Token was created by someone with the secret key
- Data hasn't been tampered with

Change even one character in the payload? Signature verification fails.

```mermaid
graph TB
    subgraph "Creating JWT"
        H[Header] --> E1[Encode]
        P[Payload] --> E2[Encode]
        E1 --> Concat[Combine]
        E2 --> Concat
        Concat --> Sign[Sign with Secret]
        Secret[Secret Key] --> Sign
        Sign --> Sig[Signature]
    end
    
    E1 --> Final[header.payload.signature]
    E2 --> Final
    Sig --> Final
    
    style Secret fill:#ff6b6b
    style Sig fill:#4caf50
```

## How JWT Authentication Works

### Step 1: User Logs In

```mermaid
sequenceDiagram
    participant User
    participant Server
    participant DB
    
    User->>Server: POST /login {email, password}
    Server->>DB: Verify credentials
    DB->>Server: Valid user
    Server->>Server: Generate JWT
    Server->>User: Return JWT
    Note over User: Store JWT
```

**Code example**:

```javascript
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await db.findUser(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { user_id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token });
});
```

### Step 2: Accessing Protected Resources

```mermaid
sequenceDiagram
    participant User
    participant Server
    
    User->>Server: GET /api/profile<br/>Authorization: Bearer JWT
    Server->>Server: Verify signature
    Server->>Server: Check expiration
    
    alt Valid & Not Expired
        Server->>User: Return data
    else Invalid/Expired
        Server->>User: 401 Unauthorized
    end
```

**Code example**:

```javascript
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

app.get('/api/profile', authenticateJWT, (req, res) => {
  res.json({ user_id: req.user.user_id, email: req.user.email });
});
```

## Symmetric vs Asymmetric Signing

**HS256 (Symmetric)**: Same secret for signing and verifying
- Simpler to use
- All servers need the same secret
- If compromised, attacker can create tokens

**RS256 (Asymmetric)**: Private key signs, public key verifies
- One auth server has private key
- All services verify with public key
- Even if a service is compromised, can't create tokens
- Best for microservices

```mermaid
graph TB
    subgraph "Asymmetric (RS256)"
        Auth[Auth Service<br/>Private Key] -->|Signs| Token[JWT]
        Token --> Service1[Service 1<br/>Public Key]
        Token --> Service2[Service 2<br/>Public Key]
        Token --> Service3[Service 3<br/>Public Key]
    end
    
    style Auth fill:#4caf50
```

## JWT Security: Common Vulnerabilities

### 1. None Algorithm Attack

**Attack**: Attacker changes algorithm to "none" and removes signature.

```json
{"alg": "none", "typ": "JWT"}
```

**Protection**:
```javascript
jwt.verify(token, secret, { algorithms: ['HS256'] });  // Specify allowed algorithms
```

### 2. Algorithm Confusion

**Attack**: Server uses RS256, attacker changes to HS256 and signs with public key.

**Protection**:
```javascript
jwt.verify(token, publicKey, { algorithms: ['RS256'] });  // Enforce algorithm
```

### 3. Weak Secrets

**Bad**:
```javascript
const secret = 'secret';  // Brute-forceable
```

**Good**:
```javascript
const secret = crypto.randomBytes(64).toString('hex');
```

### 4. Sensitive Data in Payload

JWT payload is readable by anyone!

**Bad**:
```javascript
jwt.sign({ user_id: 123, credit_card: '4532-...' }, secret);  // Visible!
```

**Good**:
```javascript
jwt.sign({ user_id: 123, email: 'user@example.com' }, secret);  // Only IDs
```

### 5. No Expiration

**Bad**:
```javascript
jwt.sign({ user_id: 123 }, secret);  // Valid forever
```

**Good**:
```javascript
jwt.sign({ user_id: 123 }, secret, { expiresIn: '1h' });
```

### 6. Can't Revoke Tokens

When user logs out, JWT is still valid until expiration.

**Solutions**:
- **Token blacklist**: Store revoked tokens in Redis
- **Short-lived tokens**: 15-min access token + refresh token
- **Token versioning**: Increment version on password change

## Best Practices

### 1. Storage Location

**Options**:
- `localStorage`: Easy but vulnerable to XSS
- **HttpOnly cookies**: Can't be accessed by JavaScript (safer)

```javascript
res.cookie('token', jwt, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 3600000
});
```

### 2. Short Expiration

```javascript
const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' });
const refreshToken = jwt.sign(payload, secret, { expiresIn: '7d' });
```

### 3. Always Use HTTPS

JWT in HTTP = anyone on network can intercept it.

### 4. Validate Everything

```javascript
jwt.verify(token, secret, {
  algorithms: ['HS256'],
  issuer: 'myapp.com',
  audience: 'myapp-api'
});
```

## When NOT to Use JWT

1. **Need instant revocation** - Banking, healthcare where immediate logout is critical
2. **Large data storage** - JWT sent with every request, increases bandwidth
3. **Traditional server-rendered apps** - Sessions are simpler
4. **Payload must be secret** - JWT payload is readable

## JWT vs Sessions: Quick Comparison

| Feature | JWT | Sessions |
|---------|-----|----------|
| **State** | Stateless | Server stores state |
| **Scaling** | Easy horizontal scaling | Needs shared storage |
| **Revocation** | Difficult | Easy |
| **Size** | Larger (sent with each request) | Small (just session ID) |
| **Use case** | APIs, microservices, mobile | Server-rendered apps |

## Complete Example: Login and Protected Route

```javascript
// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await db.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Access token (short-lived)
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  // Refresh token (long-lived, stored in DB)
  const refreshToken = jwt.sign(
    { sub: user.id },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  
  await db.saveRefreshToken(user.id, refreshToken);
  
  res.json({ accessToken, refreshToken });
});

// Protected route
app.get('/api/profile', authenticateJWT, async (req, res) => {
  const user = await db.findUserById(req.user.sub);
  res.json({ id: user.id, email: user.email, role: user.role });
});

// Refresh token
app.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }
  
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const valid = await db.checkRefreshToken(decoded.sub, refreshToken);
    
    if (!valid) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    
    const user = await db.findUserById(decoded.sub);
    const accessToken = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    
    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
});

// Logout
app.post('/logout', authenticateJWT, async (req, res) => {
  await db.deleteRefreshToken(req.user.sub);
  res.json({ message: 'Logged out' });
});
```

## JWT in Microservices

JWT shines in distributed architectures:

```mermaid
sequenceDiagram
    participant Client as Client App
    participant Auth as Auth Service
    participant User as User Service
    participant Order as Order Service
    participant Payment as Payment Service
    
    Client->>Auth: 1. Login (email/password)
    Auth->>Client: 2. Return JWT
    
    Note over Client: Store JWT
    
    Client->>User: 3. API Request + JWT
    User->>User: Verify JWT locally
    User->>Client: Response
    
    Client->>Order: 4. API Request + JWT
    Order->>Order: Verify JWT locally
    Order->>Client: Response
    
    Client->>Payment: 5. API Request + JWT
    Payment->>Payment: Verify JWT locally
    Payment->>Client: Response
    
    Note over User,Payment: Each service verifies<br/>JWT independently
```

**Why it works**:
- One auth service issues tokens
- All services verify independently (no inter-service auth calls)
- Client includes JWT in every request
- Scales horizontally without coordination

## Getting Started

**1. Install**:
```bash
npm install jsonwebtoken bcryptjs
```

**2. Generate secret**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**3. Create your first JWT**:
```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { user_id: 123, email: 'test@example.com' },
  'your-secret-key',
  { expiresIn: '1h' }
);

console.log('JWT:', token);

const decoded = jwt.verify(token, 'your-secret-key');
console.log('Decoded:', decoded);
```

**4. Test**:
```bash
# Login
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "pass123"}'

# Use token
curl http://localhost:3000/api/profile \
  -H "Authorization: Bearer <token>"
```

## Debugging JWT

Use [jwt.io](https://jwt.io) to decode and inspect tokens visually.

Or in code:
```javascript
const decoded = jwt.decode(token, { complete: true });
console.log('Header:', decoded.header);
console.log('Payload:', decoded.payload);
```

**Common errors**:
- `jwt expired`: Token's exp claim has passed, implement refresh
- `invalid signature`: Secret key mismatch or tampering
- `jwt malformed`: Wrong format, check token extraction
- `invalid algorithm`: Algorithm mismatch, possible attack

## Conclusion

JWT solved a fundamental problem: **how to authenticate millions of users without server-side state**.

What started as RFC 7519 became the foundation of modern API authentication. Companies like Netflix, Spotify, and Uber use JWT to authenticate billions of requests daily.

---

*For more on distributed systems, check out our posts on [Kafka for event streaming](/distributed-systems/how-kafka-works/), [Paxos consensus algorithm](/distributed-systems/paxos/), and [Distributed counter architecture](/distributed-systems/distributed-counter/).*
