# 🏠 Hostel Management + Complaint Tracking System

A complete Docker-based hostel management system with student login, complaint tracking, and admin panel.

## 🎯 Features

### Student Features
- ✅ Student signup and login (JWT authentication)
- ✅ Submit complaints
- ✅ View complaint history
- ✅ Track complaint status (Pending/In-progress/Resolved)
- ✅ Personal dashboard

### Admin Features
- ✅ Admin login (JWT authentication)
- ✅ View all complaints
- ✅ Update complaint status
- ✅ Delete complaints
- ✅ View statistics dashboard
- ✅ Real-time complaint management

## 📁 Project Structure

```
.
├── backend/
│   ├── app.js              # Main backend server with all APIs
│   ├── package.json        # Backend dependencies
│   └── node_modules/
├── frontend/
│   ├── index.html          # Redirect to pages/index.html
│   ├── pages/              # All HTML pages
│   │   ├── index.html              # Landing page
│   │   ├── login.html              # Student login
│   │   ├── signup.html             # Student signup
│   │   ├── student_dashboard.html  # Student dashboard
│   │   ├── submit_complaint.html   # Submit complaint form
│   │   ├── complaint_history.html  # View all complaints
│   │   ├── admin_login.html        # Admin login
│   │   └── admin_dashboard.html    # Admin panel
│   └── js/                 # JavaScript files
│       ├── login.js
│       ├── signup.js
│       ├── student_dashboard.js
│       ├── submit_complaint.js
│       ├── complaint_history.js
│       ├── admin_login.js
│       └── admin_dashboard.js
└── docker-compose.yml      # Docker configuration
```

## 🚀 Getting Started

### Prerequisites
- Docker
- Docker Compose

### Installation & Running

1. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

2. **Start all containers:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000
   - **MongoDB:** localhost:27017
   - **Mongo Express:** http://localhost:8081

## 🔐 Default Credentials

### Admin Login
- **Username:** `warden`
- **Password:** `warden123`

### Student Login
Students need to signup first. Example:
- **Roll:** `21CE100`
- **Name:** `Mayur Dongare`
- **Email:** `mayur@gmail.com`
- **Room:** `B-204`
- **Password:** (your choice)

## 📡 API Endpoints

### Student APIs
- `POST /student/signup` - Register new student
- `POST /student/login` - Student login

### Admin APIs
- `POST /admin/login` - Admin login

### Complaint APIs (Protected)
- `POST /complaints` - Submit complaint (Student)
- `GET /complaints` - Get all complaints (Admin)
- `GET /my-complaints` - Get student's complaints (Student)
- `PUT /complaints/:id/status` - Update status (Admin)
- `DELETE /complaints/:id` - Delete complaint (Admin)
- `GET /stats` - Get statistics (Admin)

## 🛠️ Technology Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- CORS

### Frontend
- HTML5
- Bootstrap 5
- Vanilla JavaScript
- Fetch API

### DevOps
- Docker
- Docker Compose
- Nginx (frontend server)

## 📊 Database Schema

### Students Collection
```javascript
{
  roll: String (unique),
  name: String,
  password: String (hashed),
  room: String,
  email: String
}
```

### Admins Collection
```javascript
{
  username: String (unique),
  password: String (hashed)
}
```

### Complaints Collection
```javascript
{
  student_roll: String,
  title: String,
  description: String,
  room: String,
  status: String, // Pending, In-progress, Resolved
  date: String
}
```

## 🎨 UI Features

- Modern, clean Bootstrap 5 design
- Responsive layout
- Card-based interface
- Color-coded status badges
- Gradient backgrounds
- Intuitive navigation

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Token verification middleware
- Secure localStorage for tokens

## 📝 Usage Flow

### For Students:
1. Visit http://localhost:3000
2. Click "Student Signup"
3. Fill in details and create account
4. Login with roll number and password
5. Access dashboard to submit/view complaints

### For Admin:
1. Visit http://localhost:3000
2. Click "Admin Login"
3. Login with default credentials
4. View all complaints and statistics
5. Update status or delete complaints

## 🛑 Stopping the Application

```bash
docker-compose down
```

## 🔄 Rebuilding After Changes

```bash
docker-compose down
docker-compose up -d --build
```

## 📌 Notes

- Backend runs on port 5000
- Frontend runs on port 3000 (nginx)
- MongoDB runs on port 27017
- Mongo Express runs on port 8081
- All API calls use `http://localhost:5000`
- JWT tokens expire after 24 hours
- Default admin is created automatically on first run

## 🐛 Troubleshooting

**Backend not connecting to MongoDB:**
- Wait a few seconds for MongoDB to initialize
- Check logs: `docker-compose logs backend`

**Frontend not loading:**
- Clear browser cache
- Check nginx logs: `docker-compose logs frontend`

**API errors:**
- Verify backend is running: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`

## 📧 Support

For issues or questions, check the logs:
```bash
docker-compose logs -f
```

---

**Built with ❤️ for Hostel Management**
