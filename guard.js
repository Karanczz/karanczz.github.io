import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMOHAmLOK3vuNTh-Qul_jB6Wb0QDFKFww",
    authDomain: "portfolio-auth-c87f7.firebaseapp.com",
    projectId: "portfolio-auth-c87f7",
    storageBucket: "portfolio-auth-c87f7.firebasestorage.app",
    messagingSenderId: "329981786463",
    appId: "1:329981786463:web:ea8da845628ee034071eea"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    // Check if the user has a display name set
    if (user.displayName) {
      // Split the full name by space and grab the first word
      const firstName = user.displayName.split(' ')[0];
      userEmail.innerText = "👋 " + firstName;
    } else {
      // Fallback for older users who signed up before we added the Name field
      const prefix = user.email.split('@')[0];
      userEmail.innerText = "👋 " + prefix;
    }
  }
});


// logout
if (logoutBtn) {
  logoutBtn.onclick = () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  };
}