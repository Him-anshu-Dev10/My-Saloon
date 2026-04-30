# System Architecture Document: Glowup (Salon Aggregator Platform)

This document outlines the production-grade, scalable system architecture for **Glowup**, a real-time platform connecting customers with multi-branch salons.

## 1. High-Level Architecture Overview

The platform uses a microservices architecture to ensure independent scaling of high-traffic domains (like Search and Booking). 

```mermaid
graph TD
    %% Clients
    Mobile[Customer Mobile App\nReact Native]
    WebSalon[Salon Dashboard\nReact/Next.js]
    WebAdmin[Admin Panel\nReact/Next.js]

    %% Edge
    CDN[CDN / CloudFront\nImages & Static Assets]
    LB[Load Balancer]
    WAF[Web Application Firewall]

    %% Gateway
    Gateway[API Gateway\nRate Limiting, Auth, Routing]

    %% Message Broker
    Kafka[{Apache Kafka / RabbitMQ\nEvent Bus}]

    %% Databases
    Postgres[(PostgreSQL\nPrimary DB)]
    Mongo[(MongoDB\nLogs/Reviews)]
    Redis[(Redis\nCache, Rate Limits, Slot Locks)]
    Elastic[(Elasticsearch\nSearch & Discovery)]
    S3[(S3 Object Storage\nMedia/Images)]

    %% Connections
    Mobile -.-> CDN
    Mobile -.-> WAF
    WebSalon -.-> WAF
    WebAdmin -.-> WAF
    CDN -.-> S3
    
    WAF --> LB
    LB --> Gateway
    Gateway --> Microservices((Microservices\nCluster))
    
    Microservices --> Postgres
    Microservices --> Mongo
    Microservices --> Redis
    Microservices --> Elastic
    Microservices --> Kafka
```

---

## 2. Service-Level Architecture

The Backend is decomposed into modular microservices. Initially deployed as containerized apps via Docker, coordinated with Kubernetes (EKS/GKE) for auto-scaling.

```mermaid
graph LR
    Gateway[API Gateway]
    
    subgraph Core Services
        Auth[Auth Service\nJWT, OTP]
        User[User Service]
        Salon[Salon Service]
        Admin[Admin Service]
    end
    
    subgraph Transactional Services
        Booking[Booking Service]
        Schedule[Scheduling Engine]
        Payment[Payment Service]
    end
    
    subgraph Async/Support Services
        Notif[Notification Service]
        Search[Search & Discovery]
        Chat[Chat Service\nWebSockets]
        Review[Review & Rating]
        Analytics[Analytics Service]
    end

    Gateway --> Core
    Gateway --> Transactional
    Gateway --> AsyncSupport
```

**Service Communication:**
- **Synchronous:** gRPC or REST for direct requests (e.g., Booking -> User Service to validate user).
- **Asynchronous:** Kafka for decoupled, non-blocking workflows (e.g., Booking Service -> Notification Service).

---

## 3. Booking System & Sequence Flow (CRITICAL)

The booking engine ensures highly concurrent slot assignment without double-bookings using **Distributed Locking (Redis)**.

### Slot Management Strategy
1. **Fetch:** Get available slots from PostgreSQL (joined with `Staff` and `Bookings`).
2. **Lock:** When a user selects a slot, acquire a lock in Redis with a TTL of 5-10 minutes. 
3. **Commit/Release:** If payment succeeds, write transaction to Postgres and release the lock. If payment fails or TTL expires, the lock is automatically released.

### Booking State Machine
`PENDING (Locked)` → `CONFIRMED (Paid)` → `IN-PROGRESS (At Salon)` → `COMPLETED` OR `CANCELLED`

### Booking Flow Sequence Diagram

```mermaid
sequenceDiagram
    participant C as Customer App
    participant G as API Gateway
    participant B as Booking Service
    participant R as Redis (Locking)
    participant P as Payment Service
    participant DB as PostgreSQL
    participant K as Kafka (Events)
    participant N as Notification Service

    C->>G: Request Slot (Time, Salon, Service)
    G->>B: Route Booking Request
    B->>R: SETNX lock:slot:{salonId}:{staffId}:{time} expiration 10m
    alt Lock Failed (Double Booking)
        R-->>B: False
        B-->>C: Error: "Slot just taken"
    else Lock Acquired
        R-->>B: True
        B->>DB: Create Booking (State: PENDING)
        B-->>C: Booking Pending, Proceed to Payment
        
        C->>G: Submit Payment (Token)
        G->>P: Process Payment Request
        alt Payment Fails
            P-->>B: Payment Failure
            B->>DB: Update Booking (State: CANCELLED)
            B->>R: Release slot lock immediately
            B-->>C: Payment Failed, Try Again
        else Payment Succeeds
            P-->>B: Payment Success Confirmation
            B->>DB: Update Booking (State: CONFIRMED)
            B->>R: Release slot lock
            B->>K: Publish event `booking_confirmed`
            B-->>C: Booking Confirmed!
            
            K->>N: Consume `booking_confirmed`
            N->>C: Push Notification / SMS
        end
    end
```

---

## 4. Data Architecture & Schema

We adopt database-per-service (logical or physical) to prevent tightly-coupled schemas. 

```mermaid
erDiagram
    USERS ||--o{ BOOKINGS : "makes"
    USERS {
        uuid id PK
        string phone_number
        string email
        string password_hash
        enum role "CUSTOMER, SALON_OWNER, ADMIN"
    }

    SALONS ||--o{ STAFF : "employs"
    SALONS ||--o{ SERVICES : "offers"
    SALONS {
        uuid id PK
        uuid owner_id FK
        string name
        jsonb location
        boolean is_active
    }

    SERVICES {
        uuid id PK
        uuid salon_id FK
        string name
        int duration_minutes
        decimal price
    }

    STAFF ||--o{ BOOKINGS : " assigned to"
    STAFF {
        uuid id PK
        uuid salon_id FK
        string name
        jsonb working_hours
    }

    BOOKINGS ||--|| PAYMENTS : "has"
    BOOKINGS {
        uuid id PK
        uuid user_id FK
        uuid service_id FK
        uuid staff_id FK
        timestamp start_time
        timestamp end_time
        enum status "PENDING, CONFIRMED, COMPLETED, CANCELLED"
    }

    PAYMENTS {
        uuid id PK
        uuid booking_id FK
        decimal amount
        string transaction_id
        enum status "SUCCESS, FAILED, REFUNDED"
    }
```

**Database Polyglot:**
- **PostgreSQL:** Relational integrity for Financials, Users, Salons, and Bookings.
- **MongoDB:** Highly unstructured data logs, Review/Rating documents.
- **Elasticsearch:** Synced via Change Data Capture (Debezium + Kafka) from Postgres for geo-spatial spatial searches (e.g., "Find haircuts near me").

---

## 5. Event-Driven System

Asynchronous workflows decouple core transactional systems from auxiliary tasks.

```mermaid
graph TD
    Booking[Booking Service]
    Payment[Payment Service]
    Review[Review Service]

    Kafka{{Apache Kafka Event Bus}}

    Booking -- "booking_created" --> Kafka
    Booking -- "booking_cancelled" --> Kafka
    Payment -- "payment_success" --> Kafka
    Payment -- "payment_failed" --> Kafka
    Review -- "review_submitted" --> Kafka

    Kafka -- Consumes Event --> Notif[Notification Service]
    Kafka -- Consumes Event --> Analytics[Analytics Service]
    Kafka -- Consumes Event --> SalonDashboard[Salon WebSocket Gateway]
    Kafka -- Consumes CDC --> SearchSync[Elasticsearch Sink Connector]

    Notif --> SMS[Twilio / SMS]
    Notif --> Push[FCM / APNs]
```

---

## 6. Security Infrastructure

1. **API Security:** All requests run through API Gateway. Bearer JWT validation. Rate-limited by IP and UserID via Redis token-bucket algorithm to prevent DDoS.
2. **Data Security:** At-rest encryption (AES-256 for DB instances on AWS RDS). In-transit TLS 1.3. PII (Passwords) hashed via bcrypt.
3. **Payments:** Fully PCI-DSS compliant by offloading credit card capture to a payment provider (e.g., Stripe/Razorpay) via Drop-in UI. Backend only stores token references, never PAN data.
4. **RBAC:** Scoped permissions. Customers can only read/mutate their own `user_id` records.

---

## 7. Failure Scenarios & Mitigation Strategies

| Scenario | Mitigation Architecture |
| :--- | :--- |
| **Double Booking Attempt** | Redis `SETNX` lock handles instantaneous request races. Postgres Unique Constraints (`staff_id`, `start_time` overlap trigger) act as ultimate fallback barrier. |
| **Payment Failure** | Synchronous webhook response from Payment Gateway marks booking `CANCELLED` and triggers Kafka event to release the lock immediately to free up inventory. |
| **Server Crash during Booking** | Distributed Transactions utilize the Saga Pattern. If the pod dies mid-booking, the Redis lock TTL (10m) automatically expires, returning the slot to the system. |
| **Notification Provider Outage** | Kafka implements a Dead Letter Queue (DLQ). If Twilio/FCM is down, events are shifted to DLQ with exponential backoff and retries. |
| **Primary Database Downtime** | RDS Multi-AZ Deployment with automated failover. The Standby acts as Primary within 60-120 seconds. Redis cache serves read-heavy endpoints (like Search) to degrade gracefully. |