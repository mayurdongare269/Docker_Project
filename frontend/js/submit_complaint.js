const API_URL = "http://localhost:5000";

// Check authentication
const token = localStorage.getItem("studentToken");
if (!token) {
  window.location.href = "login.html";
}

// Display student info
const studentData = JSON.parse(localStorage.getItem("studentData"));
document.getElementById("studentInfo").textContent = 
  `${studentData?.name} (${studentData?.roll})`;

// Pre-fill room number
document.getElementById("room").value = studentData?.room || "";

// Logout function
function logout() {
  localStorage.removeItem("studentToken");
  localStorage.removeItem("studentData");
  window.location.href = "login.html";
}

// Submit complaint
document.getElementById("complaintForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const room = document.getElementById("room").value;
  
  try {
    const res = await fetch(`${API_URL}/complaints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        student_roll: studentData.roll,
        title,
        description,
        room
      })
    });
    
    const data = await res.json();
    
    if (res.ok) {
      document.getElementById("message").innerHTML = 
        `<div class="alert alert-success">${data.message}</div>`;
      document.getElementById("complaintForm").reset();
      document.getElementById("room").value = studentData?.room || "";
      
      setTimeout(() => {
        window.location.href = "student_dashboard.html";
      }, 2000);
    } else {
      document.getElementById("message").innerHTML = 
        `<div class="alert alert-danger">${data.message}</div>`;
    }
  } catch (err) {
    document.getElementById("message").innerHTML = 
      `<div class="alert alert-danger">Error submitting complaint</div>`;
  }
});
