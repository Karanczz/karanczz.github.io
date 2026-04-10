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
    userEmail.innerText = "👋 " + user.email;
  }
});

// logout
logoutBtn.onclick = () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};