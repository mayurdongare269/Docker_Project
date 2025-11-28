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
document.getElementById("studentName").textContent = studentData?.name || "Student";
document.getElementById("studentRoll").textContent = studentData?.roll || "";
document.getElementById("studentRoom").textContent = studentData?.room || "";

// Logout function
function logout() {
  localStorage.removeItem("studentToken");
  localStorage.removeItem("studentData");
  window.location.href = "login.html";
}

// Load recent complaints
async function loadRecentComplaints() {
  try {
    const res = await fetch(`${API_URL}/my-complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (res.status === 401) {
      logout();
      return;
    }
    
    const complaints = await res.json();
    const container = document.getElementById("recentComplaints");
    
    if (complaints.length === 0) {
      container.innerHTML = '<div class="alert alert-info">No complaints yet. Submit your first complaint!</div>';
      return;
    }
    
    // Show only last 3 complaints
    const recent = complaints.slice(0, 3);
    
    container.innerHTML = recent.map(c => {
      let statusClass = "warning";
      if (c.status === "Resolved") statusClass = "success";
      if (c.status === "In-progress") statusClass = "info";
      
      return `
        <div class="card mb-2">
          <div class="card-body">
            <h6 class="card-title">${c.title}</h6>
            <p class="card-text small">${c.description}</p>
            <span class="badge bg-${statusClass}">${c.status}</span>
            <small class="text-muted ms-2">${c.date}</small>
          </div>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error("Error loading complaints:", err);
  }
}

loadRecentComplaints();
