const API_URL = "http://localhost:5000";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const roll = document.getElementById("roll").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const room = document.getElementById("room").value;
  const password = document.getElementById("password").value;
  
  try {
    const res = await fetch(`${API_URL}/student/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roll, name, email, room, password })
    });
    
    const data = await res.json();
    
    if (res.ok) {
      document.getElementById("message").innerHTML = 
        `<div class="alert alert-success">${data.message} Redirecting to login...</div>`;
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      document.getElementById("message").innerHTML = 
        `<div class="alert alert-danger">${data.message}</div>`;
    }
  } catch (err) {
    document.getElementById("message").innerHTML = 
      `<div class="alert alert-danger">Error connecting to server</div>`;
  }
});
