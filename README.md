# Currency Rate Ingestion & Analytics Service

A backend service that ingests foreign exchange rates from an external API, stores historical data, and exposes analytics endpoints such as latest rates and time-window averages.

---

# 🚀 Features

* Periodic ingestion of exchange rates
* Historical storage for analytics
* Latest rate snapshot API
* Average rate calculation API
* Cron-based automation
* PostgreSQL persistence
* Dockerized deployment
* Health monitoring endpoint
* Request validation with DTOs

---

# 🏗️ Tech Stack

* **Framework:** NestJS (Node.js)
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Scheduler:** @nestjs/schedule
* **Validation:** class-validator
* **Containerization:** Docker & Docker Compose

---

# 📐 Architecture Overview

External API → Ingestion Service → Transformation → PostgreSQL → Analytics APIs

### Flow

1. Fetch rates from Frankfurter API
2. Transform JSON → relational rows
3. Store with timestamp
4. Run periodic ingestion via cron
5. Expose analytics endpoints

---

# ⚙️ Environment Variables

Create `.env` file:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=currency_service
```

Inside Docker, DB_HOST is automatically set to `db`.

---

# 🛠️ Local Development Setup

## 1️⃣ Install dependencies

```
npm install
```

## 2️⃣ Start PostgreSQL

Ensure local Postgres is running.

## 3️⃣ Run service

```
npm run start:dev
```

---

# 🐳 Docker Setup

## Build & start containers

```
docker compose up --build
```

## Stop containers

```
docker compose down
```

---

# 🔄 Cron Job

Exchange rates are automatically fetched:

```
Every 3 hours
```

Implementation uses:

```
@Cron(CronExpression.EVERY_3_HOURS)
```

Manual trigger also available via API.

---

# 📡 API Documentation

---

## 1️⃣ Fetch & Store Rates

**POST**

```
/rates/fetch
```

Fetches latest exchange rates and stores them.

---

## 2️⃣ Get Latest Rates

**GET**

```
/rates/latest?base=USD
```

### Response

```json
{
  "base": "USD",
  "timestamp": "2026-02-19T16:55:38.675Z",
  "rates": {
    "INR": 91.19,
    "EUR": 0.85
  }
}
```

---

## 3️⃣ Get Average Rate

**GET**

```
/rates/average?base=USD&target=INR&period=24h
```

### Response

```json
{
  "base": "USD",
  "target": "INR",
  "period": "24h",
  "average_rate": 91.18
}
```

---

## 4️⃣ Health Check

**GET**

```
/health
```

### Response

```json
{
  "status": "ok",
  "timestamp": "2026-02-19T17:00:00Z"
}
```

---

# 🧾 Database Schema

### Table: exchange_rates

| Column          | Type          |
| --------------- | ------------- |
| id              | Primary Key   |
| base_currency   | VARCHAR       |
| target_currency | VARCHAR       |
| rate            | DECIMAL(20,6) |
| fetched_at      | TIMESTAMP     |
| created_at      | TIMESTAMP     |

Composite unique index ensures no duplicate snapshots.

---

# 📊 Data Ingestion Logic

Each API response:

```json
USD → { INR: 91.19, EUR: 0.85 }
```

Is transformed into rows:

| base | target | rate  |
| ---- | ------ | ----- |
| USD  | INR    | 91.19 |
| USD  | EUR    | 0.85  |

This enables historical analytics.

---

# 🔒 Validation

DTO validation ensures:

* Valid currency codes
* Proper period format (e.g., 24h)
* Required query parameters

---

# 🧠 Design Decisions

* Historical storage enables time analytics
* Composite indexing improves query speed
* Cron ensures automation
* Docker ensures portability
* DTOs enforce API contracts

---

# ⚠️ Trade-offs & Limitations

* No caching layer implemented
* No API rate-limit handling
* No circuit breaker for external API
* Synchronize enabled (dev only)

---

# 🚀 Future Improvements

* Redis caching
* Circuit breaker pattern
* API authentication
* Kubernetes deployment
* Metrics & monitoring
* Rate change alerts

---

# 📦 Deployment Readiness

Service is containerized and can be deployed on:

* AWS EC2
* AWS ECS / Fargate
* Kubernetes
* DigitalOcean
* Any Docker-compatible infra

---
