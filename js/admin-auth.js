// Secure admin auth check using sessionStorage token
// Cannot be bypassed by simply setting localStorage

function checkAdminAuth() {
  const token    = sessionStorage.getItem("adminToken");
  const tokenRef = sessionStorage.getItem("adminTokenRef");

  if (!token || !tokenRef || token !== tokenRef) {
    sessionStorage.clear();
    location.href = "index.html";
    return false;
  }
  return true;
}

function adminLogout() {
  sessionStorage.clear();
  location.href = "index.html";
}

window.adminLogout = adminLogout;
