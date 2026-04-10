// Import Firebase tools
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// COPY AND PASTE YOUR FIREBASE CONFIG HERE AGAIN
const firebaseConfig = {
    apiKey: "AIzaSyDMOHAmLOK3vuNTh-Qul_jB6Wb0QDFKFww",
    authDomain: "portfolio-auth-c87f7.firebaseapp.com",
    projectId: "portfolio-auth-c87f7",
    storageBucket: "portfolio-auth-c87f7.firebasestorage.app",
    messagingSenderId: "329981786463",
    appId: "1:329981786463:web:ea8da845628ee034071eea"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// The "Bouncer" Logic
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user is logged in, kick them back to the login page
    window.location.href = "index.html";
  }
});