const API_URL = "http://localhost:5000";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const roll = document.getElementById("roll").value;
  const password = document.getElementById("password").value;
  
  try {
    const res = await fetch(`${API_URL}/student/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roll, password })
    });
    
    const data = await res.json();
    
    if (res.ok) {
      localStorage.setItem("studentToken", data.token);
      localStorage.setItem("studentData", JSON.stringify(data.student));
      window.location.href = "student_dashboard.html";
    } else {
      document.getElementById("message").innerHTML = 
        `<div class="alert alert-danger">${data.message}</div>`;
    }
  } catch (err) {
    document.getElementById("message").innerHTML = 
      `<div class="alert alert-danger">Error connecting to server</div>`;
  }
});
