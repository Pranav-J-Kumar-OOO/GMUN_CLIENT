import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Your GMUN project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhQ-gK1DDLHoxplAgJ8azmPP1avUiOupo",
  authDomain: "gmun-16524.firebaseapp.com",
  projectId: "gmun-16524",
  storageBucket: "gmun-16524.firebasestorage.app",
  messagingSenderId: "953312071097",
  appId: "1:953312071097:web:249f89c59e98022829ba68"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginForm = document.getElementById("login-form");
const userProfile = document.getElementById("user-profile");
const clientDetails = document.getElementById("client-details");

// Login action
document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// Logout action
document.getElementById("logout-btn").addEventListener("click", () => signOut(auth));

// Monitor auth state to fetch and show client details
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Show profile UI
    loginForm.style.display = "none";
    userProfile.style.display = "block";
    document.getElementById("user-email").innerText = user.email;

    // Fetch the logged-in user's document from Firestore
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        clientDetails.innerHTML = `
          <p><strong>Committee:</strong> ${data.committee || "N/A"}</p>
          <p><strong>Play:</strong> ${data.play || "N/A"}</p>
          <p><strong>Last Updated:</strong> ${data.updatedAt?.toDate().toLocaleString() || "N/A"}</p>
        `;
      } else {
        clientDetails.innerText = "No profile details found in Firestore.";
      }
    } catch (error) {
      clientDetails.innerText = "Error loading details: " + error.message;
    }
  } else {
    // Show login UI
    loginForm.style.display = "block";
    userProfile.style.display = "none";
  }
});
