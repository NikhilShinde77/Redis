# 🚀 Redis Learning Journey - Part 2
## Docker Setup, Redis & MongoDB Connection

<div align="center">

# 🔥 180 DAYS TO 40 LPA CHALLENGE 🔥

### Day 2 Complete ✅

Learning Redis • Backend Development • System Design

</div>

---

## 📸 Project Preview

Add your screenshots here:

![Redis Setup](images/redis-setup.png)

---

## 🎯 Project Objective

This project demonstrates how to:

- Run Redis using Docker
- Run MongoDB using Docker
- Connect Redis with Node.js
- Connect MongoDB with Node.js
- Create APIs to test both connections
- Learn backend infrastructure setup

---

# 🏗️ Architecture

```text
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Express API │
└──────┬──────┘
       │
 ┌─────┴─────┐
 ▼           ▼

Redis      MongoDB

6379       27017
```

---

# 🛠️ Tech Stack

- Redis 7
- MongoDB 7
- Node.js
- Express.js
- Docker
- Docker Compose
- ioredis
- mongoose

---

# 📂 Project Structure

```bash
02-setup-redis
│
├── node_modules/
├── src/
├── index.js
├── package.json
├── package-lock.json
└── docker-compose.yml
```

---

# ⚙️ Docker Configuration

### Redis Container

```yaml
redis:
  image: redis:7-alpine
  container_name: nikhil-code1-redis
```

### MongoDB Container

```yaml
mongo:
  image: mongo:7
  container_name: nikhil-code1-mongo
```

---

# 🔗 Redis Connection

```javascript
const redis = new Redis(
  process.env.REDIS_URL ||
  "redis://localhost:6379"
);
```

### Test Endpoint

```javascript
app.get("/redis", async (req, res) => {
  const reply = await redis.ping();

  res.json({
    redis: reply
  });
});
```

---

# 🍃 MongoDB Connection

```javascript
const url =
process.env.MONGO_URL ||
"mongodb://localhost:27017/nikhil_code1_redis";
```

### Test Endpoint

```javascript
app.get("/mongo", async (req, res) => {
  await mongoose.connect(url);

  res.json({
    mongo: "connected"
  });
});
```

---

# 🚀 Run Project

## Install Dependencies

```bash
npm install
```

## Start Docker Containers

```bash
docker compose up -d
```

## Run Server

```bash
npm run dev
```

---

# 📡 API Endpoints

## Redis

```http
GET /redis
```

Response

```json
{
  "redis": "PONG"
}
```

---

## MongoDB

```http
GET /mongo
```

Response

```json
{
  "mongo": "connected"
}
```

---

# 📚 Key Learnings

✅ Docker Compose

✅ Redis Installation

✅ MongoDB Installation

✅ Node.js Backend Setup

✅ Redis Integration

✅ MongoDB Integration

✅ Environment Variables

✅ API Testing

---

# 🎯 180 Days Challenge Progress

| Day | Topic | Status |
|------|--------|--------|
| Day 1 | Redis Fundamentals | ✅ |
| Day 2 | Redis Setup & Connection | ✅ |
| Day 3 | Coming Soon | 🚀 |

---

# 🌟 3D GitHub Profile Section

Add this to your GitHub Profile README:

## 📊 GitHub Stats

```md
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true)

![GitHub Streak](https://streak-stats.demolab.com?user=YOUR_USERNAME)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_USERNAME&layout=compact)
```

## 🐍 Contribution Snake

```md
![Snake animation](https://github.com/YOUR_USERNAME/YOUR_USERNAME/blob/output/github-contribution-grid-snake.svg)
```

## 🚀 3D Contribution Graph

```md
![3D Graph](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=YOUR_USERNAME&theme=github_dark)
```

---

# 👨‍💻 Author

**Shinde Nikhil**

🎓 Integrated M.Sc. IT Student

🚀 180 Days Challenge

🎯 Goal: 40+ LPA Software Engineer

⭐ Learning Every Day
