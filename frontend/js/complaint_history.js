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

// Logout function
function logout() {
  localStorage.removeItem("studentToken");
  localStorage.removeItem("studentData");
  window.location.href = "login.html";
}

// Load complaints
async function loadComplaints() {
  try {
    const res = await fetch(`${API_URL}/my-complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (res.status === 401) {
      logout();
      return;
    }
    
    const complaints = await res.json();
    const container = document.getElementById("complaintsContainer");
    
    if (complaints.length === 0) {
      container.innerHTML = '<div class="alert alert-info">No complaints found</div>';
      return;
    }
    
    container.innerHTML = complaints.map(c => {
      let statusClass = "warning";
      if (c.status === "Resolved") statusClass = "success";
      if (c.status === "In-progress") statusClass = "info";
      
      return `
        <div class="card mb-3">
          <div class="card-header bg-${statusClass} text-white">
            <strong>${c.title}</strong>
            <span class="badge bg-light text-dark float-end">${c.status}</span>
          </div>
          <div class="card-body">
            <p><strong>Description:</strong> ${c.description}</p>
            <p class="mb-0">
              <small class="text-muted">
                Room: ${c.room} | Date: ${c.date}
              </small>
            </p>
          </div>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error("Error loading complaints:", err);
  }
}

loadComplaints();
