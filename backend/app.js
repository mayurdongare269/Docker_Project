const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "hostel_secret_key_2024";

// Mongo Connection
mongoose.connect("mongodb://root:root@mongo:27017/hostel_management?authSource=admin")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ========== SCHEMAS ==========

// Student Schema
const Student = mongoose.model("Student", {
  roll: { type: String, unique: true, required: true },
  name: String,
  password: String,
  room: String,
  email: String
});

// Admin Schema
const Admin = mongoose.model("Admin", {
  username: { type: String, unique: true, required: true },
  password: String
});

// Complaint Schema
const Complaint = mongoose.model("Complaint", {
  student_roll: String,
  title: String,
  description: String,
  room: String,
  status: String,
  date: String
});

// ========== MIDDLEWARE ==========

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "No token provided" });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
};

// ========== STUDENT ROUTES ==========

// Student Signup
app.post("/student/signup", async (req, res) => {
  try {
    const { roll, name, password, room, email } = req.body;
    
    const existing = await Student.findOne({ roll });
    if (existing) return res.status(400).send({ message: "Student already exists" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const student = new Student({
      roll,
      name,
      password: hashedPassword,
      room,
      email
    });
    
    await student.save();
    res.send({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).send({ message: "Error during signup", error: err.message });
  }
});

// Student Login
app.post("/student/login", async (req, res) => {
  try {
    const { roll, password } = req.body;
    
    const student = await Student.findOne({ roll });
    if (!student) return res.status(404).send({ message: "Student not found" });
    
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).send({ message: "Invalid password" });
    
    const token = jwt.sign({ roll: student.roll, type: "student" }, JWT_SECRET, { expiresIn: "24h" });
    
    res.send({
      message: "Login successful",
      token,
      student: {
        roll: student.roll,
        name: student.name,
        room: student.room,
        email: student.email
      }
    });
  } catch (err) {
    res.status(500).send({ message: "Error during login", error: err.message });
  }
});

// ========== ADMIN ROUTES ==========

// Admin Login
app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).send({ message: "Admin not found" });
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).send({ message: "Invalid password" });
    
    const token = jwt.sign({ username: admin.username, type: "admin" }, JWT_SECRET, { expiresIn: "24h" });
    
    res.send({
      message: "Login successful",
      token,
      admin: { username: admin.username }
    });
  } catch (err) {
    res.status(500).send({ message: "Error during login", error: err.message });
  }
});

// ========== COMPLAINT ROUTES ==========

// Submit Complaint (Student)
app.post("/complaints", verifyToken, async (req, res) => {
  try {
    const data = new Complaint({
      ...req.body,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10)
    });
    await data.save();
    res.send({ message: "Complaint submitted!" });
  } catch (err) {
    res.status(500).send({ message: "Error submitting complaint", error: err.message });
  }
});

// Get All Complaints (Admin)
app.get("/complaints", verifyToken, async (req, res) => {
  try {
    if (req.user.type !== "admin") {
      return res.status(403).send({ message: "Access denied" });
    }
    const data = await Complaint.find().sort({ date: -1 });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error fetching complaints", error: err.message });
  }
});

// Get My Complaints (Student)
app.get("/my-complaints", verifyToken, async (req, res) => {
  try {
    if (req.user.type !== "student") {
      return res.status(403).send({ message: "Access denied" });
    }
    const data = await Complaint.find({ student_roll: req.user.roll }).sort({ date: -1 });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error fetching complaints", error: err.message });
  }
});

// Update Complaint Status (Admin)
app.put("/complaints/:id/status", verifyToken, async (req, res) => {
  try {
    if (req.user.type !== "admin") {
      return res.status(403).send({ message: "Access denied" });
    }
    await Complaint.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.send({ message: "Status updated!" });
  } catch (err) {
    res.status(500).send({ message: "Error updating status", error: err.message });
  }
});

// Delete Complaint (Admin)
app.delete("/complaints/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.type !== "admin") {
      return res.status(403).send({ message: "Access denied" });
    }
    await Complaint.findByIdAndDelete(req.params.id);
    res.send({ message: "Complaint deleted!" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting complaint", error: err.message });
  }
});

// Get Statistics (Admin)
app.get("/stats", verifyToken, async (req, res) => {
  try {
    if (req.user.type !== "admin") {
      return res.status(403).send({ message: "Access denied" });
    }
    
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inprogress = await Complaint.countDocuments({ status: "In-progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    
    res.send({ total, pending, inprogress, resolved });
  } catch (err) {
    res.status(500).send({ message: "Error fetching stats", error: err.message });
  }
});

// ========== INIT DEFAULT ADMIN ==========
async function initAdmin() {
  try {
    const existing = await Admin.findOne({ username: "warden" });
    if (!existing) {
      const hashedPassword = await bcrypt.hash("warden123", 10);
      const admin = new Admin({ username: "warden", password: hashedPassword });
      await admin.save();
      console.log("Default admin created: username=warden, password=warden123");
    }
  } catch (err) {
    console.log("Error creating default admin:", err);
  }
}

mongoose.connection.once("open", () => {
  initAdmin();
});

app.listen(5000, () => console.log("Backend running on port 5000"));
