import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

const clientDetails = document.getElementById("client-details");

// This is the "guard": every protected page starts with this same check.
// - If nobody is logged in, kick them back to the login page.
// - If somebody is logged in, load their data.
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("user-email").innerText = user.email;

  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      clientDetails.innerHTML = `
        <p><strong>Committee:</strong> ${data.committee || "N/A"}</p>
        <p><strong>Play:</strong> ${data.play || "N/A"}</p>
        <p><strong>BITT:</strong> ${data.bit_ || "N/A"}</p>
        <p><strong>Last Updated:</strong> ${data.updatedAt?.toDate().toLocaleString() || "N/A"}</p>
      `;
    } else {
      clientDetails.innerText = "No profile details found in Firestore.";
    }
  } catch (error) {
    clientDetails.innerText = "Error loading details: " + error.message;
  }
});

document.getElementById("logout-btn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
