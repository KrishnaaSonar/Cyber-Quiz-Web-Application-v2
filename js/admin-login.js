function login() {
  const username = document.getElementById("adminUser").value.trim();
  const password = document.getElementById("adminPass").value;
  const errorEl  = document.getElementById("error");

  if (username === "admin" && password === "Cyberquiz@1307") {
    const token = "cyber-quiz-admin-" + new Date().toDateString();
    sessionStorage.setItem("adminToken", token);
    sessionStorage.setItem("adminTokenRef", token);
    location.href = "admin.html";
  } else {
    errorEl.innerText = "Invalid credentials";
  }
}

window.login = login;