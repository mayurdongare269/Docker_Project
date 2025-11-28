# ⚡ Quick Start Guide

## 🚀 Start the Application (3 Commands)

```bash
# 1. Stop any running containers
docker-compose down

# 2. Start all containers
docker-compose up -d

# 3. Wait 30 seconds, then open browser
# http://localhost:3000
```

That's it! 🎉

---

## 📊 Check Status

```bash
# See all containers
docker-compose ps

# Watch backend logs
docker-compose logs -f backend

# Check if backend is ready
curl http://localhost:5000
```

---

## 🔄 Restart Backend Only

```bash
docker-compose restart backend
```

---

## 🛑 Stop Everything

```bash
docker-compose down
```

---

## 🧹 Complete Clean Restart

```bash
# Stop and remove everything
docker-compose down -v

# Start fresh
docker-compose up -d

# Wait 30 seconds
timeout 30

# Open browser
start http://localhost:3000
```

---

## ✅ Verify Everything Works

### 1. Check Containers
```bash
docker-compose ps
```

All should show "Up":
- ✅ backend
- ✅ frontend  
- ✅ mongo
- ✅ mongo-express

### 2. Check Backend
```bash
docker-compose logs backend --tail=10
```

Should see:
- ✅ "MongoDB Connected"
- ✅ "Backend running on port 5000"

### 3. Test in Browser
Open http://localhost:3000

Should see:
- ✅ Landing page loads
- ✅ Can click "Student Signup"
- ✅ Can fill form and submit
- ✅ No "Connection Refused" errors

---

## 🎯 Access URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:5000 |
| **Mongo Express** | http://localhost:8081 |

---

## 🔑 Default Credentials

### Admin Login
- Username: `warden`
- Password: `warden123`

### Student
Create account via signup first!

---

## 🐛 Quick Troubleshooting

### Backend Not Starting?
```bash
docker-compose logs backend
```

### Connection Refused?
```bash
# Wait 30 seconds after starting
docker-compose up -d
timeout 30
curl http://localhost:5000
```

### Need Fresh Start?
```bash
docker-compose down -v
docker-compose up -d
```

---

## 📝 Common Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Restart
docker-compose restart

# View logs
docker-compose logs -f

# Check status
docker-compose ps

# Clean restart
docker-compose down -v && docker-compose up -d
```

---

## 🎉 That's All You Need!

Just run:
```bash
docker-compose up -d
```

Wait 30 seconds, then open http://localhost:3000

Enjoy your Hostel Management System! 🏠
