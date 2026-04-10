import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const msg = document.getElementById("statusMessage");

// Signup
signupBtn.onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => msg.innerText = "Account created!")
    .catch(e => msg.innerText = e.message);
};

// Login
loginBtn.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => window.location.href = "portfolio.html")
    .catch(e => msg.innerText = e.message);
};