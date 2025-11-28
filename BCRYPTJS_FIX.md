# 🔧 bcryptjs Fix Applied

## Issue: ERR_CONNECTION_REFUSED

You were getting `net::ERR_CONNECTION_REFUSED` because the backend wasn't starting due to `bcrypt` compilation issues on Windows.

## Solution: Switch to bcryptjs

`bcryptjs` is a pure JavaScript implementation that works better across platforms (especially Windows).

---

## ✅ Changes Applied

### 1. Updated package.json
```json
"dependencies": {
  "bcryptjs": "^3.0.3",  // Changed from bcrypt
  "cors": "^2.8.5",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.0",
  "mongoose": "^7.0.0"
}
```

### 2. Updated backend/app.js
```javascript
const bcrypt = require("bcryptjs");  // Changed from "bcrypt"
```

**Note:** The API remains the same! `bcryptjs` has the same methods as `bcrypt`:
- `bcrypt.hash(password, 10)`
- `bcrypt.compare(password, hash)`

---

## 🚀 How to Apply

### Step 1: Stop Containers
```bash
docker-compose down
```

### Step 2: Clean Up (Optional but Recommended)
```bash
# Remove old node_modules if it exists locally
rm -rf backend/node_modules
```

### Step 3: Start Fresh
```bash
docker-compose up -d
```

### Step 4: Watch Backend Logs
```bash
docker-compose logs -f backend
```

You should see:
```
npm install
added packages...
MongoDB Connected
Default admin created: username=warden, password=warden123
Backend running on port 5000
```

### Step 5: Test
Open http://localhost:3000

---

## 🔍 Verify Backend is Running

### Check Container Status
```bash
docker-compose ps
```

Should show:
```
NAME              STATUS
backend           Up
frontend          Up
mongo             Up
mongo-express     Up
```

### Check Backend Logs
```bash
docker-compose logs backend --tail=20
```

Should NOT see:
- ❌ "Cannot find module 'bcrypt'"
- ❌ "Error: Module did not self-register"

Should see:
- ✅ "MongoDB Connected"
- ✅ "Backend running on port 5000"

### Test Backend API
```bash
curl http://localhost:5000
```

Should get a response (not connection refused)

---

## 🐛 Still Getting ERR_CONNECTION_REFUSED?

### Check 1: Is Backend Running?
```bash
docker-compose ps backend
```

If it says "Restarting" or "Exited":
```bash
docker-compose logs backend
```

Look for errors.

### Check 2: Is Backend Listening?
```bash
docker exec -it backend sh
netstat -tuln | grep 5000
```

Should show port 5000 listening.

### Check 3: Can Frontend Reach Backend?
```bash
docker exec -it frontend sh
wget -O- http://backend:5000
```

Should work!

### Check 4: Can Your Browser Reach Backend?
Open: http://localhost:5000

Should NOT get "Connection refused"

---

## 🎯 Why bcryptjs is Better

| Feature | bcrypt | bcryptjs |
|---------|--------|----------|
| **Platform** | Needs C++ compiler | Pure JavaScript |
| **Windows** | Often fails | Always works ✅ |
| **Docker** | Can have issues | No issues ✅ |
| **Speed** | Faster | Slightly slower |
| **API** | Same | Same ✅ |
| **Security** | Excellent | Excellent ✅ |

For development and cross-platform compatibility, `bcryptjs` is the better choice!

---

## 📝 Complete Restart Commands

If you want to start completely fresh:

```bash
# Stop everything
docker-compose down

# Remove volumes (WARNING: Deletes database data)
docker-compose down -v

# Remove local node_modules
rm -rf backend/node_modules

# Start fresh
docker-compose up -d

# Wait 30 seconds for npm install
timeout 30

# Check logs
docker-compose logs backend

# Test
curl http://localhost:5000
```

---

## ✅ Success Indicators

After running `docker-compose up -d`, you should see:

### In Backend Logs:
```
✅ npm install
✅ added 150 packages
✅ MongoDB Connected
✅ Default admin created
✅ Backend running on port 5000
```

### In Browser Console (F12):
```
✅ No ERR_CONNECTION_REFUSED
✅ API calls work
✅ Can signup/login
```

### In Docker:
```bash
docker-compose ps
# All containers show "Up"
```

---

## 🎉 You're All Set!

The backend should now start properly with `bcryptjs` and you won't get connection refused errors anymore!

**Test it:**
1. Open http://localhost:3000
2. Click "Student Signup"
3. Fill the form
4. Submit
5. Should see "Signup successful!" (not connection error)

---

## 📞 Still Having Issues?

Run this diagnostic:

```bash
echo "=== Container Status ==="
docker-compose ps

echo "=== Backend Logs ==="
docker-compose logs backend --tail=30

echo "=== Test Backend ==="
curl http://localhost:5000

echo "=== Test from Frontend Container ==="
docker exec -it frontend wget -O- http://backend:5000
```

Share the output if you need more help!
