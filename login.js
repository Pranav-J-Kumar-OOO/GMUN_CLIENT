import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

const statusEl = document.getElementById("status");

// If the user is ALREADY logged in (e.g. they navigated back to index.html,
// or their session persisted from a previous visit), skip the login form
// entirely and send them straight to the dashboard.
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});

document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  statusEl.textContent = "";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // No need to manually redirect here — onAuthStateChanged above will
    // fire immediately once sign-in succeeds and handle the redirect.
  } catch (error) {
    statusEl.textContent = "Login failed: " + error.message;
  }
});
