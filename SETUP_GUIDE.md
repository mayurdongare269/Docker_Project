# 🚀 Quick Setup Guide

## Step-by-Step Instructions

### 1️⃣ Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

This will install:
- express
- mongoose
- cors
- bcrypt
- jsonwebtoken

### 2️⃣ Start Docker Containers

```bash
docker-compose up -d
```

This starts:
- MongoDB (port 27017)
- Mongo Express (port 8081)
- Backend API (port 5000)
- Frontend Nginx (port 3000)

### 3️⃣ Verify Everything is Running

```bash
docker-compose ps
```

You should see all 4 containers running.

### 4️⃣ Access the Application

Open your browser and go to:
**http://localhost:3000**

---

## 🎯 Testing the System

### Test Student Flow:

1. **Signup:**
   - Click "Student Signup"
   - Fill in:
     - Roll: `21CE100`
     - Name: `Mayur Dongare`
     - Email: `mayur@gmail.com`
     - Room: `B-204`
     - Password: `test123`
   - Click "Sign Up"

2. **Login:**
   - Use roll: `21CE100`
   - Password: `test123`

3. **Submit Complaint:**
   - Click "Submit Complaint"
   - Fill in title and description
   - Submit

4. **View History:**
   - Click "My Complaints"
   - See all your complaints

### Test Admin Flow:

1. **Login:**
   - Click "Admin Login"
   - Username: `warden`
   - Password: `warden123`

2. **View Dashboard:**
   - See statistics (total, pending, in-progress, resolved)
   - View all complaints in table

3. **Manage Complaints:**
   - Change status using dropdown
   - Delete complaints using delete button

---

## 🔍 Checking Logs

### View all logs:
```bash
docker-compose logs -f
```

### View specific service logs:
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongo
```

---

## 🛑 Stopping the System

```bash
docker-compose down
```

---

## 🔄 Restarting After Code Changes

```bash
docker-compose restart backend
```

Or rebuild everything:
```bash
docker-compose down
docker-compose up -d --build
```

---

## 📊 Access MongoDB

### Using Mongo Express (Web UI):
http://localhost:8081

### Using MongoDB Compass:
- Connection String: `mongodb://root:root@localhost:27017/?authSource=admin`

---

## ✅ Verification Checklist

- [ ] Backend dependencies installed
- [ ] All 4 containers running
- [ ] Frontend accessible at http://localhost:3000
- [ ] Backend API responding at http://localhost:5000
- [ ] Student signup works
- [ ] Student login works
- [ ] Admin login works (warden/warden123)
- [ ] Complaint submission works
- [ ] Admin can view all complaints
- [ ] Admin can update status
- [ ] Admin can delete complaints

---

## 🎉 You're All Set!

Your Hostel Management System is now running with:
- ✅ Student authentication
- ✅ Admin panel
- ✅ Complaint tracking
- ✅ Modern UI with Bootstrap
- ✅ JWT security
- ✅ Docker deployment

Enjoy! 🚀
