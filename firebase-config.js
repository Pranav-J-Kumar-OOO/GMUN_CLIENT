// firebase-config.js
// Import this ONE file from every page instead of re-initializing Firebase
// each time. Add new pages? Just: import { auth, db } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhQ-gK1DDLHoxplAgJ8azmPP1avUiOupo",
  authDomain: "gmun-16524.firebaseapp.com",
  projectId: "gmun-16524",
  storageBucket: "gmun-16524.firebasestorage.app",
  messagingSenderId: "953312071097",
  appId: "1:953312071097:web:249f89c59e98022829ba68"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
