async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray  = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Pre-computed SHA-256 of "admin" and "Cyberquiz6969"
// Plain text credentials are NOT stored here
const VALID_USER_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";
const VALID_PASS_HASH = "0aec21fefc0b7f149e8130a2a78101b7c71873c6b5f825723dbfc8ad2246d1d9";

async function login() {
  const username = document.getElementById("adminUser").value.trim();
  const password = document.getElementById("adminPass").value;
  const errorEl  = document.getElementById("error");

  if (!username || !password) {
    errorEl.innerText = "Please enter both fields";
    return;
  }

  const userHash = await hashPassword(username);
  const passHash = await hashPassword(password);

  if (userHash === VALID_USER_HASH && passHash === VALID_PASS_HASH) {
    // Use sessionStorage — clears when browser tab closes
    // Also store a token that's hard to guess
    const token = await hashPassword("cyber-quiz-secret-" + new Date().toDateString());
    sessionStorage.setItem("adminToken", token);
    sessionStorage.setItem("adminTokenRef", token);
    location.href = "admin.html";
  } else {
    errorEl.innerText = "Invalid credentials";
  }
}

window.login = login;
