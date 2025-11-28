const API_URL = "http://localhost:5000";

// Check authentication
const token = localStorage.getItem("adminToken");
if (!token) {
  window.location.href = "admin_login.html";
}

// Display admin username
const adminData = JSON.parse(localStorage.getItem("adminData"));
document.getElementById("adminUsername").textContent = adminData?.username || "Admin";

// Logout function
function logout() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");
  window.location.href = "admin_login.html";
}

// Load statistics
async function loadStats() {
  try {
    const res = await fetch(`${API_URL}/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (res.status === 401) {
      logout();
      return;
    }
    
    const data = await res.json();
    document.getElementById("totalCount").textContent = data.total;
    document.getElementById("pendingCount").textContent = data.pending;
    document.getElementById("inprogressCount").textContent = data.inprogress;
    document.getElementById("resolvedCount").textContent = data.resolved;
  } catch (err) {
    console.error("Error loading stats:", err);
  }
}

// Load all complaints
async function loadComplaints() {
  try {
    const res = await fetch(`${API_URL}/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (res.status === 401) {
      logout();
      return;
    }
    
    const complaints = await res.json();
    const tbody = document.getElementById("complaintsTable");
    
    if (complaints.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center">No complaints found</td></tr>';
      return;
    }
    
    tbody.innerHTML = complaints.map(c => `
      <tr>
        <td>${c.date}</td>
        <td>${c.student_roll}</td>
        <td>${c.room}</td>
        <td>${c.title}</td>
        <td>${c.description}</td>
        <td>
          <select class="form-select form-select-sm" onchange="updateStatus('${c._id}', this.value)">
            <option value="Pending" ${c.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In-progress" ${c.status === "In-progress" ? "selected" : ""}>In-progress</option>
            <option value="Resolved" ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
          </select>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteComplaint('${c._id}')">Delete</button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    console.error("Error loading complaints:", err);
  }
}

// Update complaint status
async function updateStatus(id, status) {
  try {
    const res = await fetch(`${API_URL}/complaints/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    
    const data = await res.json();
    alert(data.message);
    loadStats();
    loadComplaints();
  } catch (err) {
    alert("Error updating status");
  }
}

// Delete complaint
async function deleteComplaint(id) {
  if (!confirm("Are you sure you want to delete this complaint?")) return;
  
  try {
    const res = await fetch(`${API_URL}/complaints/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const data = await res.json();
    alert(data.message);
    loadStats();
    loadComplaints();
  } catch (err) {
    alert("Error deleting complaint");
  }
}

// Initialize
loadStats();
loadComplaints();
