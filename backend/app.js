const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Mongo Connection
mongoose.connect("mongodb://root:root@mongo:27017/hostel_management?authSource=admin")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Complaint Schema
const Complaint = mongoose.model("Complaint", {
  student_roll: String,
  title: String,
  description: String,
  room: String,
  status: String,
  date: String
});

// Add Complaint
app.post("/complaints", async (req, res) => {
  const data = new Complaint(req.body);
  await data.save();
  res.send({ message: "Complaint submitted!" });
});

// Get All Complaints
app.get("/complaints", async (req, res) => {
  const data = await Complaint.find();
  res.send(data);
});

// Update Status
app.put("/complaints/:id", async (req, res) => {
  await Complaint.findByIdAndUpdate(req.params.id, req.body);
  res.send({ message: "Updated!" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
