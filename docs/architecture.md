# Q# QuickNotes Architecture

## Requirements
- **Functional:** create, read, update, delete notes; tagging; user accounts.
- **Non-functional:** scale to 1M users, high availability, low latency, resilience against traffic spikes.

## Load Estimates (1M users)
- 10% active daily → 100k active users.
- Each uploads 1 note/day → ~1.2 writes/sec average, ~6/sec peak.
- Each views 50 feeds/day → ~58 reads/sec average, ~290/sec peak.
- Storage: 100k × 365 × avg 2 KB metadata ≈ 73 MB/year (excluding attachments).

## Architecture Diagram
![Architecture Screenshot](../screenshots/architecture.png)  
![Architecture Screenshot 2](../screenshots/architecture-2.png)

## Component Explanations
- **Client:** Browser or mobile app sending requests.
- **DNS:** Resolves domain names to IP addresses.
- **CDN:** Serves static assets (HTML, CSS, JS) close to users for speed.
- **Load Balancer:** Distributes traffic across app servers.
- **App Servers:** Stateless logic handling API requests.
- **Cache (Redis):** Speeds up frequent queries (e.g., feed of notes).
- **Primary Database:** Stores notes, users, tags, relationships.
- **Read Replica:** Handles heavy read traffic to reduce load on primary DB.
- **Queue + Worker:** Offloads background jobs (e.g., sending notifications, exports).

## Request Flows
- **GET /notes:** Client → DNS → CDN → Load Balancer → App Server → Cache → DB/Replica → Response.
- **POST /notes:** Client → DNS → Load Balancer → App Server → Primary DB → Queue → Worker (background tasks).

## Trade-offs
- **Consistency vs Performance:** Strong transactions prevent double-booking but add latency. Trade-off: accept slight delay for correctness.
- **Cache vs Freshness:** Caching improves speed but risks stale data. Trade-off: short TTLs and invalidation strategies.
- **Avoiding Single Points of Failure:** Multiple app servers, redundant load balancers, DB replicas, and distributed queues ensure resilience.

## Surviving Big Sale
Horizontal scaling of app servers, aggressive caching of seat maps, and strict DB constraints/transactions prevent overload and ensure fairness when thousands of users compete for tickets.