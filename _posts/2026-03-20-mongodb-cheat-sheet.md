---
layout: post
seo: true
title: "MongoDB Cheat Sheet: 100+ Commands with Real Examples"
subtitle: "The practical guide to mongosh commands, queries, aggregation, and database management you will actually use"
date: 2026-03-20
categories: database
thumbnail-img: /assets/img/posts/database/mongodb-cheat-sheet.png
share-img: /assets/img/posts/database/mongodb-cheat-sheet.png
permalink: /mongodb-cheat-sheet/
description: "Master MongoDB with this practical cheat sheet. Covers mongosh commands, CRUD operations, query operators, aggregation pipeline, indexes, schema validation, replication, sharding, backup and restore, and performance tuning. Real examples for software developers."
keywords: "mongodb cheat sheet, mongodb commands, mongosh commands, mongodb tutorial, mongodb find, mongodb insert, mongodb update, mongodb delete, mongodb aggregate, mongodb aggregation pipeline, mongodb index, mongodb create database, mongodb create collection, mongodb backup, mongodump, mongorestore, mongoexport, mongoimport, mongodb atlas, mongodb schema design, mongodb data types, mongodb sort, mongodb limit, mongodb lookup, mongodb group by, mongodb distinct, mongodb upsert, mongodb bulk operations, mongodb explain, mongodb performance, mongodb sharding, mongodb replication, mongodb CRUD, mongodb query operators, mongodb projection, mongodb text search, mongodb TTL index, mongodb compound index, mongodb schema validation, mongodb connection string"
tags: ["database", "mongodb", "nosql"]
comments: true
social-share: true

quick-answer: "Essential mongosh: `show dbs` (list databases), `show collections` (list collections), `db.coll.find()` (query documents), `db.coll.insertOne()` (insert). Key operations: `db.coll.createIndex()` (speed up queries), `db.coll.aggregate()` (data processing), `mongodump` (backup), `mongorestore` (restore). Always create indexes on fields you query often. Use the aggregation pipeline for anything more complex than a simple find."

key-takeaways:
  - "mongosh is the modern MongoDB shell. Use it instead of the legacy mongo shell"
  - "Always create indexes on fields you filter, sort, or join on. Without them, MongoDB scans every document"
  - "The aggregation pipeline is MongoDB's most powerful feature. Learn $match, $group, $lookup, and $project first"
  - "Use mongodump and mongorestore for backups. Automate them with cron"
  - "Schema validation exists in MongoDB. Use it from day one to prevent document drift"
  - "Use explain('executionStats') to understand why a query is slow before adding indexes"

faq:
  - question: "How do I connect to a MongoDB database from the command line?"
    answer: "Use mongosh to connect: mongosh 'mongodb://localhost:27017/mydb' for a local instance, or mongosh 'mongodb+srv://user:password@cluster.mongodb.net/mydb' for MongoDB Atlas. The default port is 27017. You can also connect without arguments to use the default localhost connection."
  - question: "How do I list all collections in MongoDB?"
    answer: "In mongosh, use the show collections command to list all collections in the current database. You can also use db.getCollectionNames() which returns an array of collection names, useful in scripts. To see collection details including size and document count, use db.getCollectionInfos()."
  - question: "How do I insert documents in MongoDB?"
    answer: "Use db.collection.insertOne({field: 'value'}) for a single document, or db.collection.insertMany([{doc1}, {doc2}]) for multiple documents. MongoDB automatically creates the collection if it does not exist and generates an _id field if you do not provide one. insertMany is significantly faster than calling insertOne in a loop."
  - question: "How do I query documents in MongoDB?"
    answer: "Use db.collection.find({field: 'value'}) to query documents matching a condition. Use db.collection.findOne() to return a single document. Add query operators like $gt, $lt, $in, $regex for complex filters. Chain .sort(), .limit(), and .skip() for pagination. Use .projection() or pass a second argument to find() to return only specific fields."
  - question: "What is the MongoDB aggregation pipeline?"
    answer: "The aggregation pipeline is a framework for processing and transforming documents through a sequence of stages. Each stage transforms the documents as they pass through. Common stages include $match (filter), $group (aggregate), $project (reshape), $sort (order), $lookup (join collections), and $unwind (flatten arrays). It is the MongoDB equivalent of SQL GROUP BY, JOIN, and subqueries combined."
  - question: "How do I create an index in MongoDB?"
    answer: "Use db.collection.createIndex({field: 1}) for ascending index or {field: -1} for descending. For compound indexes, use db.collection.createIndex({field1: 1, field2: -1}). Create text indexes with db.collection.createIndex({field: 'text'}) for full-text search. Use db.collection.getIndexes() to list existing indexes and db.collection.dropIndex('indexName') to remove one."
  - question: "How do I backup and restore a MongoDB database?"
    answer: "Use mongodump to create a backup: mongodump --db=mydb --out=/backups/ creates a BSON dump. Restore with mongorestore --db=mydb /backups/mydb/. For JSON format, use mongoexport and mongoimport. For MongoDB Atlas, use the built-in backup and point-in-time recovery features instead of manual dumps."
  - question: "How do I update documents in MongoDB?"
    answer: "Use db.collection.updateOne({filter}, {$set: {field: 'newValue'}}) to update one document, or updateMany for multiple. The $set operator changes specific fields without replacing the entire document. Use $inc to increment numbers, $push to add to arrays, $pull to remove from arrays, and $unset to remove fields. Use replaceOne if you want to replace the entire document."
  - question: "What is the difference between MongoDB find and aggregate?"
    answer: "find() is for simple queries with filtering, sorting, and projection. aggregate() is for complex data processing involving grouping, joining collections, computing new fields, and multi-stage transformations. Use find() when you need to retrieve documents with simple conditions. Use aggregate() when you need to reshape data, compute totals, join collections with $lookup, or do anything that resembles SQL GROUP BY or JOIN operations."
  - question: "How do I check MongoDB query performance?"
    answer: "Use explain() after your query: db.collection.find({field: 'value'}).explain('executionStats'). This shows whether the query used an index or did a full collection scan (COLLSCAN), how many documents were examined versus returned, and execution time. Look for COLLSCAN on large collections as a sign that you need an index. For aggregation pipelines, use db.collection.explain('executionStats').aggregate([...])."

citations:
  - name: "MongoDB Documentation"
    url: "https://www.mongodb.com/docs/manual/"
    author: "MongoDB Inc."
  - name: "mongosh Shell Reference"
    url: "https://www.mongodb.com/docs/mongodb-shell/"
    author: "MongoDB Inc."
  - name: "MongoDB 8.0 Release Notes"
    url: "https://www.mongodb.com/docs/manual/release-notes/8.0/"
    author: "MongoDB Inc."
---

I have been using MongoDB across different projects for years. Content management systems, product catalogs, event tracking pipelines, user profile stores. Every time I spin up a new collection, debug a slow query, or help someone get started, I end up looking up the same commands.

This cheat sheet is everything I keep coming back to. It covers the MongoDB commands and patterns you will actually use as a developer, with real examples. Not a documentation dump. Just the practical stuff.

Bookmark this page. You will come back to it.

---

## Table of Contents

- [Connecting to MongoDB](#connecting-to-mongodb)
- [Database and Collection Management](#database-and-collection-management)
- [Inserting Documents](#inserting-documents)
- [Querying Documents](#querying-documents)
- [Query Operators](#query-operators)
- [Projection and Sorting](#projection-and-sorting)
- [Updating Documents](#updating-documents)
- [Deleting Documents](#deleting-documents)
- [Array Operations](#array-operations)
- [Aggregation Pipeline](#aggregation-pipeline)
- [Indexes](#indexes)
- [Schema Validation](#schema-validation)
- [Data Types](#data-types)
- [Backup and Restore](#backup-and-restore)
- [Import and Export](#import-and-export)
- [Users, Roles, and Authentication](#users-roles-and-authentication)
- [Replication](#replication)
- [Sharding](#sharding)
- [Performance and Troubleshooting](#performance-and-troubleshooting)
- [Useful Monitoring Commands](#useful-monitoring-commands)
- [Quick Reference Table](#quick-reference-table)

---

## Connecting to MongoDB

The `mongosh` shell is the modern way to interact with MongoDB. It became the default shell in MongoDB 6.0, and the legacy `mongo` shell was removed entirely. If you are still using the old shell, switch now.

```bash
# Connect to local MongoDB (default localhost:27017)
mongosh

# Connect to a specific database
mongosh "mongodb://localhost:27017/mydb"

# Connect with username and password
mongosh "mongodb://username:password@localhost:27017/mydb"

# Connect to MongoDB Atlas
mongosh "mongodb+srv://username:password@cluster0.abc123.mongodb.net/mydb"

# Connect with authentication database
mongosh --host localhost --port 27017 -u admin -p password --authenticationDatabase admin

# Connect with TLS/SSL
mongosh "mongodb://localhost:27017/mydb" --tls --tlsCertificateKeyFile /path/to/cert.pem
```

If you are using MongoDB Atlas, the connection string is on your cluster dashboard under "Connect". It looks like `mongodb+srv://...`. The `+srv` part handles DNS-based discovery so you do not need to list every node manually.

**Quick environment setup for repeated connections:**

```bash
# Set as environment variable
export MONGODB_URI="mongodb+srv://user:pass@cluster0.abc123.mongodb.net/mydb"

# Then just run
mongosh $MONGODB_URI
```

---

## Database and Collection Management

MongoDB creates databases and collections on the fly when you first write data to them. There is no `CREATE DATABASE` or `CREATE TABLE` like in SQL. But you can still manage them explicitly.

### Database Commands

```javascript
// Show all databases (only shows databases with data)
show dbs

// Switch to a database (creates it on first write if it does not exist)
use mydb

// Show current database
db

// Drop the current database (careful, this is permanent)
db.dropDatabase()

// Get database stats
db.stats()
```

### Collection Commands

```javascript
// Show all collections in current database
show collections

// Create a collection explicitly
db.createCollection("users")

// Create a collection with options
db.createCollection("logs", {
  capped: true,
  size: 104857600,  // 100 MB max size
  max: 100000       // 100k documents max
})

// Get collection stats
db.users.stats()

// Rename a collection
db.users.renameCollection("customers")

// Drop a collection
db.users.drop()

// List collections with details
db.getCollectionInfos()
```

Capped collections are worth knowing about. They are fixed-size collections that automatically overwrite the oldest documents when they hit the size limit. They are useful for logs, metrics, and any data where you only care about the most recent entries.

<i class="fas fa-info-circle" style="color: #1565c0;"></i> **Note**: Unlike relational databases like [PostgreSQL](/postgresql-cheat-sheet/) where you explicitly define tables and schemas upfront, MongoDB creates collections implicitly on first insert. This is convenient for development but can lead to typo-based collection names in production. Use schema validation to enforce structure.

---

## Inserting Documents

MongoDB stores data as documents (JSON-like objects called BSON internally). Every document gets a unique `_id` field automatically if you do not provide one.

### insertOne

```javascript
// Insert a single document
db.users.insertOne({
  name: "Ajit Singh",
  email: "ajit@example.com",
  age: 30,
  role: "developer",
  createdAt: new Date()
})

// The response includes the generated _id
// { acknowledged: true, insertedId: ObjectId("...") }
```

### insertMany

```javascript
// Insert multiple documents at once
db.users.insertMany([
  { name: "Alice", email: "alice@example.com", age: 28, role: "designer" },
  { name: "Bob", email: "bob@example.com", age: 35, role: "developer" },
  { name: "Charlie", email: "charlie@example.com", age: 42, role: "manager" }
])

// With ordered: false, MongoDB continues inserting even if one fails
db.users.insertMany(
  [
    { _id: 1, name: "Alice" },
    { _id: 1, name: "Duplicate" },  // This will fail
    { _id: 2, name: "Bob" }          // This still gets inserted
  ],
  { ordered: false }
)
```

`insertMany` is significantly faster than calling `insertOne` in a loop. MongoDB batches the writes internally. For bulk loading thousands of documents, always use `insertMany` or the bulk write API.

---

## Querying Documents

The `find` method is what you will use most. It is the equivalent of `SELECT` in SQL.

### Basic Queries

```javascript
// Find all documents
db.users.find()

// Find with a condition (WHERE equivalent)
db.users.find({ role: "developer" })

// Find one document
db.users.findOne({ email: "ajit@example.com" })

// Find by _id
db.users.findOne({ _id: ObjectId("507f1f77bcf86cd799439011") })

// Count documents
db.users.countDocuments({ role: "developer" })

// Count all documents (faster, uses metadata)
db.users.estimatedDocumentCount()

// Check if any document matches
db.users.findOne({ email: "ajit@example.com" }) !== null

// Get distinct values
db.users.distinct("role")
// Returns: ["developer", "designer", "manager"]
```

### Pretty Print and Formatting

```javascript
// Format output for readability
db.users.find().pretty()

// Limit output
db.users.find().limit(5)

// Skip documents (pagination)
db.users.find().skip(10).limit(5)

// Sort results (1 = ascending, -1 = descending)
db.users.find().sort({ createdAt: -1 })

// Chain them together for pagination
db.users.find({ role: "developer" })
  .sort({ name: 1 })
  .skip(20)
  .limit(10)
```

---

## Query Operators

MongoDB query operators let you build complex filters. These are the ones you will use every day.

### Comparison Operators

```javascript
// Greater than
db.users.find({ age: { $gt: 30 } })

// Greater than or equal
db.users.find({ age: { $gte: 30 } })

// Less than
db.users.find({ age: { $lt: 30 } })

// Less than or equal
db.users.find({ age: { $lte: 30 } })

// Not equal
db.users.find({ role: { $ne: "admin" } })

// In a set of values
db.users.find({ role: { $in: ["developer", "designer"] } })

// Not in a set
db.users.find({ role: { $nin: ["admin", "banned"] } })
```

### Logical Operators

```javascript
// AND (implicit, just add fields)
db.users.find({ role: "developer", age: { $gt: 25 } })

// AND (explicit)
db.users.find({
  $and: [
    { role: "developer" },
    { age: { $gt: 25 } }
  ]
})

// OR
db.users.find({
  $or: [
    { role: "admin" },
    { role: "moderator" }
  ]
})

// NOT
db.users.find({ age: { $not: { $gt: 30 } } })

// NOR (none of the conditions match)
db.users.find({
  $nor: [
    { role: "banned" },
    { age: { $lt: 18 } }
  ]
})
```

### Element Operators

```javascript
// Field exists
db.users.find({ phone: { $exists: true } })

// Field does not exist
db.users.find({ phone: { $exists: false } })

// Field is a specific BSON type
db.users.find({ age: { $type: "int" } })
```

### String Matching

```javascript
// Regex match
db.users.find({ email: { $regex: /@gmail\.com$/ } })

// Case-insensitive regex
db.users.find({ name: { $regex: /^ajit/i } })

// Text search (requires text index)
db.articles.find({ $text: { $search: "mongodb tutorial" } })

// Text search with score
db.articles.find(
  { $text: { $search: "mongodb aggregation" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

### Query Operators Quick Reference

| Operator | Description | Example |
|----------|-------------|---------|
| `$eq` | Equals | `{ age: { $eq: 30 } }` |
| `$ne` | Not equals | `{ role: { $ne: "admin" } }` |
| `$gt` / `$gte` | Greater than (or equal) | `{ age: { $gt: 25 } }` |
| `$lt` / `$lte` | Less than (or equal) | `{ age: { $lt: 50 } }` |
| `$in` | Matches any in array | `{ role: { $in: ["a", "b"] } }` |
| `$nin` | Matches none in array | `{ role: { $nin: ["x"] } }` |
| `$and` | All conditions match | `{ $and: [{...}, {...}] }` |
| `$or` | Any condition matches | `{ $or: [{...}, {...}] }` |
| `$not` | Negates a condition | `{ age: { $not: { $gt: 30 } } }` |
| `$exists` | Field exists | `{ phone: { $exists: true } }` |
| `$regex` | Pattern match | `{ name: { $regex: /^A/ } }` |
| `$text` | Full text search | `{ $text: { $search: "term" } }` |
| `$elemMatch` | Array element match | `{ scores: { $elemMatch: { $gt: 80 } } }` |

---

## Projection and Sorting

Projection controls which fields come back in your query results. This is like `SELECT column1, column2` in SQL instead of `SELECT *`.

```javascript
// Return only name and email (1 = include)
db.users.find({}, { name: 1, email: 1 })

// Exclude specific fields (0 = exclude)
db.users.find({}, { password: 0, internalNotes: 0 })

// You cannot mix include and exclude (except for _id)
// This is valid: include fields but exclude _id
db.users.find({}, { name: 1, email: 1, _id: 0 })

// Sort ascending by name
db.users.find().sort({ name: 1 })

// Sort descending by creation date
db.users.find().sort({ createdAt: -1 })

// Multi-field sort
db.users.find().sort({ role: 1, name: 1 })

// Combine projection, sort, skip, limit
db.users.find(
  { role: "developer" },
  { name: 1, email: 1, _id: 0 }
).sort({ name: 1 }).skip(0).limit(10)
```

<i class="fas fa-exclamation-triangle" style="color: #e65100;"></i> **Warning**: Using `skip` for pagination gets slow on large collections because MongoDB still has to scan through the skipped documents. For large datasets, use range-based pagination with a cursor:

```javascript
// Instead of skip-based pagination
db.users.find().sort({ _id: 1 }).skip(100000).limit(10)  // Slow

// Use cursor-based pagination
db.users.find({ _id: { $gt: lastSeenId } }).sort({ _id: 1 }).limit(10)  // Fast
```

---

## Updating Documents

MongoDB gives you fine-grained control over updates. You can modify specific fields without replacing the entire document.

### updateOne and updateMany

```javascript
// Update a single field
db.users.updateOne(
  { email: "ajit@example.com" },
  { $set: { role: "admin" } }
)

// Update multiple fields
db.users.updateOne(
  { email: "ajit@example.com" },
  { $set: { role: "admin", updatedAt: new Date() } }
)

// Update all matching documents
db.users.updateMany(
  { role: "intern" },
  { $set: { role: "junior_developer" } }
)

// Increment a numeric field
db.products.updateOne(
  { _id: productId },
  { $inc: { views: 1 } }
)

// Multiply a field
db.products.updateOne(
  { _id: productId },
  { $mul: { price: 1.10 } }  // 10% price increase
)

// Set field only if the new value is less than current (useful for tracking minimums)
db.scores.updateOne(
  { playerId: 1 },
  { $min: { bestTime: 45.2 } }
)

// Set field only if the new value is greater (useful for tracking maximums)
db.scores.updateOne(
  { playerId: 1 },
  { $max: { highScore: 9500 } }
)

// Remove a field
db.users.updateOne(
  { email: "ajit@example.com" },
  { $unset: { temporaryField: "" } }
)

// Rename a field
db.users.updateMany(
  {},
  { $rename: { "name": "fullName" } }
)
```

### Upsert

Upsert inserts a document if no match is found, or updates it if a match exists. This is one of the most useful operations in MongoDB.

```javascript
// Upsert: update if exists, insert if not
db.users.updateOne(
  { email: "newuser@example.com" },
  {
    $set: { name: "New User", role: "developer" },
    $setOnInsert: { createdAt: new Date() }
  },
  { upsert: true }
)
```

The `$setOnInsert` operator only applies when a new document is inserted, not on updates. This is useful for setting creation timestamps.

### replaceOne

```javascript
// Replace entire document (except _id)
db.users.replaceOne(
  { email: "ajit@example.com" },
  {
    name: "Ajit Singh",
    email: "ajit@example.com",
    role: "admin",
    updatedAt: new Date()
  }
)
```

<i class="fas fa-exclamation-triangle" style="color: #e65100;"></i> **Careful**: `replaceOne` replaces the entire document. Any fields not in the replacement document are gone. Use `updateOne` with `$set` when you only want to change specific fields.

### findOneAndUpdate

```javascript
// Update and return the modified document in one operation
db.users.findOneAndUpdate(
  { email: "ajit@example.com" },
  { $set: { lastLogin: new Date() } },
  { returnDocument: "after" }  // Returns the document AFTER the update
)
```

This is the MongoDB equivalent of PostgreSQL's `UPDATE ... RETURNING *`. It is atomic, so no other operation can modify the document between the find and the update.

---

## Deleting Documents

```javascript
// Delete one document
db.users.deleteOne({ email: "old@example.com" })

// Delete all matching documents
db.users.deleteMany({ role: "banned" })

// Delete all documents in a collection (keeps the collection and indexes)
db.users.deleteMany({})

// Drop the entire collection (faster than deleteMany for clearing everything)
db.users.drop()

// Find and delete in one atomic operation
db.queue.findOneAndDelete(
  { status: "pending" },
  { sort: { createdAt: 1 } }  // Delete the oldest pending item
)
```

`findOneAndDelete` is useful for implementing job queues. You atomically grab and remove the next item, so no two workers process the same job.

---

## Array Operations

Arrays are a first-class feature in MongoDB. You can query inside them, update individual elements, and use them in aggregations without any extra setup.

### Querying Arrays

```javascript
// Match if array contains a value
db.users.find({ tags: "javascript" })

// Match if array contains ALL of these values
db.users.find({ tags: { $all: ["javascript", "mongodb"] } })

// Match by array size
db.users.find({ tags: { $size: 3 } })

// Match array element by condition
db.users.find({
  scores: { $elemMatch: { $gt: 80, $lt: 100 } }
})

// Query nested documents in arrays
db.orders.find({
  "items.productId": "prod123"
})
```

### Modifying Arrays

```javascript
// Add to array
db.users.updateOne(
  { _id: userId },
  { $push: { tags: "python" } }
)

// Add multiple values
db.users.updateOne(
  { _id: userId },
  { $push: { tags: { $each: ["python", "rust", "go"] } } }
)

// Add to array only if value does not already exist
db.users.updateOne(
  { _id: userId },
  { $addToSet: { tags: "javascript" } }
)

// Remove from array by value
db.users.updateOne(
  { _id: userId },
  { $pull: { tags: "php" } }
)

// Remove from array by condition
db.users.updateOne(
  { _id: userId },
  { $pull: { scores: { $lt: 50 } } }
)

// Remove last element from array
db.users.updateOne(
  { _id: userId },
  { $pop: { tags: 1 } }   // 1 = last, -1 = first
)

// Update a specific array element by position
db.users.updateOne(
  { _id: userId },
  { $set: { "tags.0": "typescript" } }  // Update first element
)

// Update first matching array element
db.users.updateOne(
  { _id: userId, "scores.subject": "math" },
  { $set: { "scores.$.grade": "A" } }
)
```

---

## Aggregation Pipeline

The aggregation pipeline is the most powerful feature in MongoDB. It lets you process documents through a sequence of stages, transforming and computing results step by step. Think of it as piping data through a series of functions.

```mermaid
flowchart LR
    A["fa:fa-database Collection"] --> B["$match\nFilter docs"]
    B --> C["$group\nAggregate"]
    C --> D["$sort\nOrder results"]
    D --> E["$project\nReshape output"]
    E --> F["fa:fa-file-alt Results"]

    style A fill:#dbeafe,stroke:#3b82f6,color:#1e3a5f
    style B fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e
    style C fill:#dcfce7,stroke:#16a34a,color:#14532d
    style D fill:#fef3c7,stroke:#d97706,color:#78350f
    style E fill:#fce7f3,stroke:#db2777,color:#831843
    style F fill:#dbeafe,stroke:#3b82f6,color:#1e3a5f
```

### $match (Filter)

Always put `$match` as early as possible. It reduces the number of documents flowing through the rest of the pipeline.

```javascript
// Filter orders from 2025
db.orders.aggregate([
  { $match: { createdAt: { $gte: ISODate("2025-01-01") } } }
])
```

### $group (Aggregate)

```javascript
// Total revenue by status
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      totalRevenue: { $sum: "$total" },
      orderCount: { $count: {} },
      avgOrder: { $avg: "$total" },
      maxOrder: { $max: "$total" }
    }
  }
])

// Group by month
db.orders.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      revenue: { $sum: "$total" },
      orders: { $count: {} }
    }
  },
  { $sort: { "_id.year": -1, "_id.month": -1 } }
])
```

### $project (Reshape)

```javascript
// Reshape output with computed fields
db.users.aggregate([
  {
    $project: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      email: 1,
      ageInMonths: { $multiply: ["$age", 12] },
      _id: 0
    }
  }
])
```

### $lookup (Join Collections)

`$lookup` is the MongoDB equivalent of a SQL JOIN. Use it to pull in data from another collection.

```javascript
// Join orders with user details
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },  // Flatten the array to a single object
  {
    $project: {
      total: 1,
      status: 1,
      "user.name": 1,
      "user.email": 1
    }
  }
])
```

### $unwind (Flatten Arrays)

```javascript
// Flatten an array field to create one document per array element
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      totalSold: { $sum: "$items.quantity" },
      revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
    }
  },
  { $sort: { revenue: -1 } }
])
```

### $facet (Multiple Pipelines)

Run multiple aggregation pipelines on the same input in a single pass. Great for dashboards.

```javascript
// Get stats and top items in one query
db.orders.aggregate([
  {
    $facet: {
      summary: [
        {
          $group: {
            _id: null,
            totalOrders: { $count: {} },
            totalRevenue: { $sum: "$total" },
            avgOrder: { $avg: "$total" }
          }
        }
      ],
      byStatus: [
        { $group: { _id: "$status", count: { $count: {} } } },
        { $sort: { count: -1 } }
      ],
      recentOrders: [
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
        { $project: { total: 1, status: 1, createdAt: 1 } }
      ]
    }
  }
])
```

### Full Pipeline Example

Here is a real-world aggregation that computes monthly revenue breakdown:

```javascript
db.orders.aggregate([
  // Stage 1: Filter completed orders
  { $match: { status: "completed" } },

  // Stage 2: Group by month
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      revenue: { $sum: "$total" },
      orders: { $count: {} },
      avgOrderValue: { $avg: "$total" }
    }
  },

  // Stage 3: Sort chronologically
  { $sort: { "_id.year": 1, "_id.month": 1 } },

  // Stage 4: Reshape for readability
  {
    $project: {
      _id: 0,
      year: "$_id.year",
      month: "$_id.month",
      revenue: { $round: ["$revenue", 2] },
      orders: 1,
      avgOrderValue: { $round: ["$avgOrderValue", 2] }
    }
  }
])
```

### Aggregation Pipeline Best Practices

1. **$match first.** Filter early to reduce the number of documents flowing through the pipeline. This is the single biggest performance win
2. **$project early.** Drop fields you do not need before expensive stages like `$group` and `$lookup`
3. **$lookup late.** Join collections after grouping and filtering, not before. Joining 10,000 documents before filtering is wasteful
4. **Index your $match fields.** Only `$match` at the beginning of a pipeline (or immediately after `$sort`) can use indexes
5. **Watch memory.** Aggregation stages that accumulate data ($group, $sort on large datasets) have a 100MB memory limit by default. Use `{ allowDiskUse: true }` for large pipelines

```javascript
// Allow disk use for large aggregations
db.orders.aggregate([...], { allowDiskUse: true })
```

---

## Indexes

Indexes are the difference between a query that takes 5ms and one that takes 5 seconds. Without an index, MongoDB does a **collection scan** (reads every document). With an index, it jumps directly to matching documents.

For a deeper dive into how indexes work at the data structure level, see [How Database Indexing Works](/database-indexing-explained/).

```mermaid
flowchart LR
    subgraph Without["Without Index"]
        direction TB
        W1["Query: find age > 30"] --> W2["Scan all 1M documents"]
        W2 --> W3["Return 50k matches"]
        W4["Time: 800ms"]
    end

    subgraph With["With Index"]
        direction TB
        I1["Query: find age > 30"] --> I2["B-tree lookup"]
        I2 --> I3["Return 50k matches"]
        I4["Time: 12ms"]
    end

    style Without fill:#fee2e2,stroke:#dc2626,color:#7f1d1d
    style With fill:#dcfce7,stroke:#16a34a,color:#14532d
```

### Creating Indexes

```javascript
// Single field index (ascending)
db.users.createIndex({ email: 1 })

// Single field index (descending)
db.users.createIndex({ createdAt: -1 })

// Unique index (enforces uniqueness like a SQL UNIQUE constraint)
db.users.createIndex({ email: 1 }, { unique: true })

// Compound index (multi-field)
db.orders.createIndex({ userId: 1, createdAt: -1 })

// Text index (for full-text search)
db.articles.createIndex({ title: "text", body: "text" })

// TTL index (auto-delete documents after a time period)
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }  // Delete after 1 hour
)

// Partial index (only index documents matching a condition)
db.orders.createIndex(
  { createdAt: -1 },
  { partialFilterExpression: { status: "pending" } }
)

// Sparse index (only index documents that have the field)
db.users.createIndex(
  { phone: 1 },
  { sparse: true }
)

// Hashed index (for hash-based sharding)
db.users.createIndex({ userId: "hashed" })

// Wildcard index (index all fields in a subdocument)
db.products.createIndex({ "attributes.$**": 1 })
```

### Managing Indexes

```javascript
// List all indexes on a collection
db.users.getIndexes()

// Get index usage statistics
db.users.aggregate([{ $indexStats: {} }])

// Drop an index by name
db.users.dropIndex("email_1")

// Drop all indexes except _id
db.users.dropIndexes()

// Hide an index (MongoDB 4.4+, test impact without dropping)
db.users.hideIndex("email_1")

// Unhide it
db.users.unhideIndex("email_1")
```

### Index Design Rules

- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Index fields you query on.** If a field appears in `find()`, `$match`, or `sort()`, it likely needs an index
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Compound index order matters.** For `{ userId: 1, createdAt: -1 }`, queries on `userId` alone use the index. Queries on only `createdAt` do not. This is the [leftmost prefix rule](/database-indexing-explained/)
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Use TTL indexes for expiring data.** Sessions, OTPs, temporary tokens. Let MongoDB clean them up automatically
- <i class="fas fa-times-circle" style="color: #d32f2f;"></i> **Do not over-index.** Every index slows down writes because MongoDB updates all indexes on every insert, update, and delete
- <i class="fas fa-times-circle" style="color: #d32f2f;"></i> **Do not index low-cardinality fields alone.** A boolean field like `isActive` has only two values. An index on it barely helps

Audit your indexes regularly. If `$indexStats` shows an index with zero usage, drop it. It is just slowing down writes and wasting memory.

---

## Schema Validation

MongoDB is schema-flexible, not schema-less. In production, you should enforce structure using JSON Schema validation. Without it, different parts of your application will write different shapes of documents and you will spend months cleaning up the mess.

```javascript
// Create a collection with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "role"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a valid email"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 150,
          description: "must be an integer between 0 and 150"
        },
        role: {
          bsonType: "string",
          enum: ["developer", "designer", "manager", "admin"],
          description: "must be one of the allowed roles"
        }
      }
    }
  },
  validationLevel: "strict",       // strict or moderate
  validationAction: "error"        // error or warn
})

// Add validation to an existing collection
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string" },
        email: { bsonType: "string" }
      }
    }
  },
  validationLevel: "moderate"  // Only validates new inserts and updates to valid docs
})
```

**validationLevel options:**
- `strict`: validates all inserts and updates
- `moderate`: only validates inserts and updates to documents that already match the schema. Existing invalid documents are left alone

**validationAction options:**
- `error`: rejects writes that violate the schema
- `warn`: allows the write but logs a warning

If you are coming from PostgreSQL where the schema is enforced by `CREATE TABLE`, think of MongoDB schema validation as the equivalent. It is opt-in, but in production, you should always opt in.

---

## Data Types

MongoDB uses BSON (Binary JSON), which supports more types than plain JSON.

| Type | Usage | Example |
|------|-------|---------|
| `String` | Text data | `"hello"` |
| `Int32` | 32-bit integer | `NumberInt(42)` |
| `Int64` / `Long` | 64-bit integer | `NumberLong(9007199254740993)` |
| `Double` | Floating point | `3.14` |
| `Decimal128` | High-precision decimal | `NumberDecimal("19.99")` |
| `Boolean` | True/false | `true` |
| `Date` | UTC datetime | `new Date()` or `ISODate()` |
| `ObjectId` | 12-byte unique ID | `ObjectId("507f1f77bcf86cd799439011")` |
| `Array` | Ordered list | `[1, 2, 3]` |
| `Object` | Embedded document | `{ key: "value" }` |
| `Null` | Null value | `null` |
| `Binary` | Binary data | `BinData(0, "base64data")` |
| `Regex` | Regular expression | `/pattern/i` |
| `Timestamp` | Internal MongoDB type | `Timestamp(1234567890, 1)` |

**Practical advice from experience:**

- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Use `NumberDecimal` for money.** Just like in [PostgreSQL where you use NUMERIC](/postgresql-cheat-sheet/), never use floating point for financial data. `0.1 + 0.2 !== 0.3` in floating point
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Use `ISODate()` for dates**, not strings. Dates stored as strings cannot be sorted or compared correctly and cannot use date operators in aggregation
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Let MongoDB generate `_id` unless you have a reason not to.** ObjectId gives you uniqueness, a timestamp (embedded in the first 4 bytes), and natural chronological ordering
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Use `NumberLong` for large integers.** JavaScript numbers lose precision beyond 2^53. If your IDs or counters are large, use `NumberLong` explicitly

For a deeper look at how databases store these types on disk, see [How Databases Store Data Internally](/how-databases-store-data-internally/).

---

## Backup and Restore

Regular backups are not optional. Here is how to do them properly with MongoDB tools.

### mongodump (Binary Backup)

```bash
# Dump entire server
mongodump --out=/backups/full_backup/

# Dump a specific database
mongodump --db=mydb --out=/backups/

# Dump a specific collection
mongodump --db=mydb --collection=users --out=/backups/

# Dump with compression (much smaller files)
mongodump --db=mydb --gzip --out=/backups/

# Dump from a remote server
mongodump --uri="mongodb+srv://user:pass@cluster0.abc123.mongodb.net/mydb" --out=/backups/

# Dump with query filter
mongodump --db=mydb --collection=orders --query='{"createdAt":{"$gte":{"$date":"2025-01-01T00:00:00Z"}}}'
```

### mongorestore (Restore from Backup)

```bash
# Restore entire backup
mongorestore /backups/full_backup/

# Restore a specific database
mongorestore --db=mydb /backups/mydb/

# Restore a specific collection
mongorestore --db=mydb --collection=users /backups/mydb/users.bson

# Restore compressed backup
mongorestore --gzip /backups/

# Drop existing data before restoring
mongorestore --drop --db=mydb /backups/mydb/

# Restore to a different database
mongorestore --db=mydb_restored /backups/mydb/
```

**Automate backups with cron:**

```bash
# Add to crontab: crontab -e
# Run nightly at 2 AM
0 2 * * * mongodump --db=mydb --gzip --out=/backups/$(date +\%Y\%m\%d)/
```

For MongoDB Atlas, you get automatic backups and point-in-time recovery built into the managed service. Use the Atlas UI or API to configure backup schedules and retention policies.

---

## Import and Export

`mongoexport` and `mongoimport` work with JSON and CSV files. Use them for moving data in and out of MongoDB in human-readable formats.

### Export

```bash
# Export collection to JSON
mongoexport --db=mydb --collection=users --out=users.json

# Export to CSV
mongoexport --db=mydb --collection=users --type=csv --fields=name,email,role --out=users.csv

# Export with a query filter
mongoexport --db=mydb --collection=orders --query='{"status":"completed"}' --out=completed_orders.json

# Export pretty-printed JSON
mongoexport --db=mydb --collection=users --out=users.json --pretty
```

### Import

```bash
# Import from JSON
mongoimport --db=mydb --collection=users --file=users.json

# Import from CSV with header row
mongoimport --db=mydb --collection=users --type=csv --headerline --file=users.csv

# Import and drop existing collection first
mongoimport --db=mydb --collection=users --drop --file=users.json

# Import JSON array
mongoimport --db=mydb --collection=users --jsonArray --file=users_array.json

# Upsert during import (update if exists, insert if not)
mongoimport --db=mydb --collection=users --mode=upsert --upsertFields=email --file=users.json
```

**When to use what:**
- `mongodump` / `mongorestore`: for full backups and restores. Binary format, preserves all BSON types
- `mongoexport` / `mongoimport`: for moving data between systems, sharing with other tools, or loading CSV data

---

## Users, Roles, and Authentication

MongoDB uses a role-based access control system. Enable authentication in production. Running MongoDB without auth is one of the most common security mistakes.

### Managing Users

```javascript
// Create an admin user
use admin
db.createUser({
  user: "admin",
  pwd: "secure_password",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})

// Create an application user with specific database access
use mydb
db.createUser({
  user: "appuser",
  pwd: "app_password",
  roles: [{ role: "readWrite", db: "mydb" }]
})

// Create a read-only user
db.createUser({
  user: "analyst",
  pwd: "analyst_password",
  roles: [{ role: "read", db: "mydb" }]
})

// View all users in current database
db.getUsers()

// Change a user's password
db.changeUserPassword("appuser", "new_secure_password")

// Grant additional roles
db.grantRolesToUser("appuser", [{ role: "read", db: "analytics" }])

// Revoke roles
db.revokeRolesFromUser("appuser", [{ role: "read", db: "analytics" }])

// Drop a user
db.dropUser("olduser")
```

### Built-in Roles

| Role | Access | Use Case |
|------|--------|----------|
| `read` | Read-only on a database | Analytics, reporting |
| `readWrite` | Read and write on a database | Application user |
| `dbAdmin` | Schema and index management | DBA tasks |
| `userAdmin` | Manage users on a database | User management |
| `clusterAdmin` | Manage replica sets and shards | Cluster operations |
| `readAnyDatabase` | Read on all databases | Cross-database analytics |
| `readWriteAnyDatabase` | Read/write on all databases | Super app user |
| `userAdminAnyDatabase` | Manage users on all databases | Admin |
| `root` | Full access to everything | Superuser (use sparingly) |

**A practical setup for a web application:**

```javascript
// Application user: can read/write data but cannot manage schema
use mydb
db.createUser({
  user: "webapp",
  pwd: "app_password",
  roles: [{ role: "readWrite", db: "mydb" }]
})

// Read-only user for analytics dashboards
db.createUser({
  user: "dashboard",
  pwd: "dashboard_password",
  roles: [{ role: "read", db: "mydb" }]
})

// Admin for database management
use admin
db.createUser({
  user: "dba",
  pwd: "dba_password",
  roles: [
    { role: "dbAdmin", db: "mydb" },
    { role: "userAdmin", db: "mydb" }
  ]
})
```

---

## Replication

Replication gives you high availability and data redundancy. A MongoDB replica set is a group of nodes that maintain the same data. One node is the primary (handles writes), and the others are secondaries (replicate data and handle reads if configured).

```mermaid
flowchart TB
    App["fa:fa-desktop Application"] --> Primary["fa:fa-server Primary\nReads + Writes"]
    Primary -->|"replication"| S1["fa:fa-server Secondary 1\nReads"]
    Primary -->|"replication"| S2["fa:fa-server Secondary 2\nReads"]

    Primary -.->|"if primary fails"| Election["fa:fa-vote-yea Election"]
    Election -.->|"promotes one\nsecondary"| Primary

    style Primary fill:#dbeafe,stroke:#3b82f6,color:#1e3a5f
    style S1 fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e
    style S2 fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e
    style App fill:#f8fafc,stroke:#64748b,color:#1e293b
    style Election fill:#fef3c7,stroke:#d97706,color:#78350f
```

### Replica Set Commands

```javascript
// Check replica set status
rs.status()

// Check who is primary (MongoDB 5.0+)
db.hello()

// Legacy equivalent (deprecated in 5.0)
// rs.isMaster()

// Initiate a replica set
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
})

// Add a new member
rs.add("mongo4:27017")

// Remove a member
rs.remove("mongo4:27017")

// Add an arbiter (votes in elections but holds no data)
rs.addArb("arbiter:27017")

// Get replica set configuration
rs.conf()

// Step down primary (triggers election)
rs.stepDown()

// Set read preference to read from secondaries
db.getMongo().setReadPref("secondaryPreferred")
```

**Read preferences:**
- `primary`: all reads go to primary (default)
- `primaryPreferred`: read from primary, fall back to secondary
- `secondary`: all reads go to secondaries
- `secondaryPreferred`: read from secondary, fall back to primary
- `nearest`: read from the node with the lowest network latency

Always use an odd number of voting members (3, 5, 7) to avoid split-brain scenarios during elections. For more on why odd numbers matter in distributed systems, see [Majority Quorum in Distributed Systems](/distributed-systems/majority-quorum/).

---

## Sharding

Sharding distributes data across multiple servers. Use it when a single replica set cannot handle your data volume or throughput.

```mermaid
flowchart TB
    App["fa:fa-desktop Application"] --> Router["fa:fa-random mongos\nQuery Router"]
    Router --> S1["fa:fa-database Shard 1\nUsers A-M"]
    Router --> S2["fa:fa-database Shard 2\nUsers N-Z"]

    Config["fa:fa-cog Config Servers\nMetadata"]
    Router --> Config

    style Router fill:#fef3c7,stroke:#d97706,color:#78350f
    style S1 fill:#dbeafe,stroke:#3b82f6,color:#1e3a5f
    style S2 fill:#dbeafe,stroke:#3b82f6,color:#1e3a5f
    style Config fill:#f1f5f9,stroke:#64748b,color:#1e293b
    style App fill:#f8fafc,stroke:#64748b,color:#1e293b
```

### Sharding Commands

```javascript
// Enable sharding on a database
sh.enableSharding("mydb")

// Shard a collection with a hashed shard key
sh.shardCollection("mydb.users", { userId: "hashed" })

// Shard a collection with a range-based shard key
sh.shardCollection("mydb.orders", { createdAt: 1 })

// Check sharding status
sh.status()

// Check data distribution
db.users.getShardDistribution()
```

### Choosing a Shard Key

The shard key determines how MongoDB distributes documents across shards. Getting it wrong is expensive to fix because you cannot change it without migrating data.

- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **High cardinality.** The key should have many distinct values. A boolean field is a terrible shard key
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Even distribution.** Data should spread evenly across shards. Monotonically increasing keys (like timestamps) create hot spots
- <i class="fas fa-check-circle" style="color: #388e3c;"></i> **Query isolation.** Queries should be able to target a single shard using the shard key. Scatter-gather queries (hitting all shards) are slow
- <i class="fas fa-times-circle" style="color: #d32f2f;"></i> **Avoid monotonically increasing keys.** Using `_id` (ObjectId) or `createdAt` as a shard key sends all new writes to the same shard

For a deeper look at how data gets distributed evenly, see [Consistent Hashing Explained](/consistent-hashing-explained/).

---

## Performance and Troubleshooting

Knowing how to diagnose slow queries is one of the most valuable MongoDB skills you can have. The process is similar to what you would do in [PostgreSQL with EXPLAIN ANALYZE](/postgresql-cheat-sheet/#performance-and-troubleshooting), but the tools are different.

### explain()

`explain()` shows you what MongoDB is doing with your query. Always use it when debugging performance.

```javascript
// Basic execution stats
db.users.find({ email: "ajit@example.com" }).explain("executionStats")

// Key things to look for in the output:
// - queryPlanner.winningPlan.stage: "COLLSCAN" = bad (no index), "IXSCAN" = good
// - executionStats.nReturned: how many documents were returned
// - executionStats.totalDocsExamined: how many documents MongoDB read
// - executionStats.executionTimeMillis: how long the query took

// Explain an aggregation pipeline
db.orders.explain("executionStats").aggregate([
  { $match: { status: "pending" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } }
])
```

**Red flags in explain output:**

| What You See | What It Means | What To Do |
|---|---|---|
| `stage: "COLLSCAN"` | No index used, scanning every document | Add an index on the query fields |
| `totalDocsExamined >> nReturned` | MongoDB reads way more docs than it returns | Refine your index or query |
| `executionTimeMillis > 100` | Query is slow for most use cases | Check indexing, reduce data scanned |
| `stage: "SORT"` with no `SORT_KEY_GENERATOR` | In-memory sort, not using an index | Add an index that covers the sort |

### Profiler

The profiler captures slow queries so you can find bottlenecks.

```javascript
// Enable profiler for queries slower than 100ms
db.setProfilingLevel(1, { slowms: 100 })

// Enable profiler for all queries (careful in production)
db.setProfilingLevel(2)

// Check current profiling level
db.getProfilingStatus()

// View slow queries
db.system.profile.find().sort({ ts: -1 }).limit(5).pretty()

// Find the slowest queries
db.system.profile.find().sort({ millis: -1 }).limit(10)

// Disable profiler
db.setProfilingLevel(0)
```

### Current Operations

```javascript
// See all running operations
db.currentOp()

// Find long-running operations
db.currentOp({
  "active": true,
  "secs_running": { $gt: 5 }
})

// Kill a specific operation
db.killOp(opId)
```

---

## Useful Monitoring Commands

These are the commands I run first when something seems off with the database.

### Server Status

```javascript
// Overall server status
db.serverStatus()

// Connection count
db.serverStatus().connections

// Memory usage
db.serverStatus().mem

// Operation counters
db.serverStatus().opcounters
```

### Collection and Index Sizes

```javascript
// Collection stats including size and index details
db.users.stats()

// Total data size for a collection (in bytes)
db.users.totalSize()

// Total index size
db.users.totalIndexSize()

// Quick overview of all collections with sizes
db.getCollectionNames().forEach(function(coll) {
  var stats = db[coll].stats();
  print(coll + ": " + (stats.size / 1024 / 1024).toFixed(2) + " MB, " +
        stats.count + " documents, " +
        Object.keys(stats.indexSizes || {}).length + " indexes");
})
```

### Index Usage

```javascript
// Check which indexes are being used and how often
db.users.aggregate([{ $indexStats: {} }])

// Find collections with the most documents
db.getCollectionNames().map(function(coll) {
  return { collection: coll, count: db[coll].estimatedDocumentCount() };
}).sort(function(a, b) { return b.count - a.count; })
```

If an index shows zero queries since the last server restart, it is just overhead. Drop it. For a deeper understanding of why unused indexes hurt write performance, see [How Database Indexing Works](/database-indexing-explained/).

---

## Quick Reference Table

| Task | Command |
|------|---------|
| Connect to MongoDB | `mongosh "mongodb://host:27017/db"` |
| List databases | `show dbs` |
| Switch database | `use dbname` |
| List collections | `show collections` |
| Create collection | `db.createCollection("name")` |
| Drop collection | `db.coll.drop()` |
| Drop database | `db.dropDatabase()` |
| Insert one | `db.coll.insertOne({...})` |
| Insert many | `db.coll.insertMany([{...}, {...}])` |
| Find all | `db.coll.find()` |
| Find with filter | `db.coll.find({ field: "value" })` |
| Find one | `db.coll.findOne({ field: "value" })` |
| Count documents | `db.coll.countDocuments({ filter })` |
| Update one | `db.coll.updateOne({ filter }, { $set: {...} })` |
| Update many | `db.coll.updateMany({ filter }, { $set: {...} })` |
| Upsert | `db.coll.updateOne({...}, {$set:{...}}, {upsert:true})` |
| Delete one | `db.coll.deleteOne({ filter })` |
| Delete many | `db.coll.deleteMany({ filter })` |
| Sort | `db.coll.find().sort({ field: -1 })` |
| Limit | `db.coll.find().limit(10)` |
| Skip (offset) | `db.coll.find().skip(20).limit(10)` |
| Distinct values | `db.coll.distinct("field")` |
| Create index | `db.coll.createIndex({ field: 1 })` |
| List indexes | `db.coll.getIndexes()` |
| Drop index | `db.coll.dropIndex("indexName")` |
| Aggregate | `db.coll.aggregate([{ $match: {...} }])` |
| Explain query | `db.coll.find({...}).explain("executionStats")` |
| Backup database | `mongodump --db=dbname --out=/path/` |
| Restore database | `mongorestore --db=dbname /path/dbname/` |
| Export JSON | `mongoexport --db=db --collection=c --out=f.json` |
| Import JSON | `mongoimport --db=db --collection=c --file=f.json` |
| Create user | `db.createUser({user:"u",pwd:"p",roles:[...]})` |
| Replica set status | `rs.status()` |
| Shard status | `sh.status()` |
| Current operations | `db.currentOp()` |
| Kill operation | `db.killOp(opId)` |
| Server status | `db.serverStatus()` |

---

## Related Posts

These posts go deeper into specific database topics:

**Database Deep Dives**:
- [PostgreSQL vs MongoDB vs DynamoDB: Which Should You Use?](/postgresql-vs-mongodb-vs-dynamodb/)
- [How Database Indexing Works](/database-indexing-explained/)
- [How Databases Store Data Internally](/how-databases-store-data-internally/)
- [How OpenAI Scales PostgreSQL to 800 Million Users](/how-openai-scales-postgresql/)

**System Design**:
- [Consistent Hashing Explained](/consistent-hashing-explained/)
- [Caching Strategies Explained](/caching-strategies-explained/)
- [System Design Cheat Sheet](/system-design-cheat-sheet/)

**Related Cheat Sheets**:
- [PostgreSQL Cheat Sheet](/postgresql-cheat-sheet/)
- [Docker Cheat Sheet](/devops/docker-cheat-sheet/) - Run MongoDB in containers
- [Linux Commands Cheat Sheet](/linux-commands-cheat-sheet/)
- [Kubernetes Cheat Sheet](/kubernetes-cheat-sheet/)

---

## External Resources

- [MongoDB Documentation](https://www.mongodb.com/docs/manual/) - the official reference
- [mongosh Reference](https://www.mongodb.com/docs/mongodb-shell/) - the modern shell documentation
- [MongoDB University](https://learn.mongodb.com/) - free official courses
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI tool for exploring and querying your data
- [MongoDB Atlas](https://www.mongodb.com/atlas) - managed cloud hosting

---

Every developer working with NoSQL databases will use MongoDB at some point. The commands in this cheat sheet cover 90% of what you will do day to day. Start with the CRUD basics, learn the aggregation pipeline for anything complex, and always use `explain()` when things are slow.

*What MongoDB commands or patterns do you use most? Drop them in the comments below.*
