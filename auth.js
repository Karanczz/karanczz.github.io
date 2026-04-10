// 1. Import Firebase from the official Google servers
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// 2. REPLACE THIS WITH YOUR EXACT CONFIG FROM FIREBASE (Step 3)
 const firebaseConfig = {
    apiKey: "AIzaSyDMOHAmLOK3vuNTh-Qul_jB6Wb0QDFKFww",
    authDomain: "portfolio-auth-c87f7.firebaseapp.com",
    projectId: "portfolio-auth-c87f7",
    storageBucket: "portfolio-auth-c87f7.firebasestorage.app",
    messagingSenderId: "329981786463",
    appId: "1:329981786463:web:ea8da845628ee034071eea"
  };

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. Get the HTML elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const statusMessage = document.getElementById('statusMessage');

// 5. SIGN UP LOGIC
signupBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            statusMessage.innerText = "Account Created Successfully! You are logged in.";
            statusMessage.style.color = "#00ffee";
        })
        .catch((error) => {
            statusMessage.innerText = "Error: " + error.message;
            statusMessage.style.color = "red";
        });
});

// 6. LOGIN LOGIC
loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // This line teleports the user to the portfolio!
            window.location.href = "portfolio.html"; 
        })
        .catch((error) => {
            statusMessage.innerText = "Error: " + error.message;
            statusMessage.style.color = "red";
        });
});