const API_URL = "http://localhost:5000";

document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  try {
    const res = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    
    if (res.ok) {
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminData", JSON.stringify(data.admin));
      window.location.href = "admin_dashboard.html";
    } else {
      document.getElementById("message").innerHTML = 
        `<div class="alert alert-danger">${data.message}</div>`;
    }
  } catch (err) {
    document.getElementById("message").innerHTML = 
      `<div class="alert alert-danger">Error connecting to server</div>`;
  }
});
