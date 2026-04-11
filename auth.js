import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const db = getFirestore(app);

// 🔥 WAIT UNTIL HTML LOADS
document.addEventListener("DOMContentLoaded", () => {

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const statusMessage = document.getElementById('statusMessage');

  // SIGNUP
  signupBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {

        // 🔥 SAVE USER
        await setDoc(doc(db, "users", email), {
          email: email
        });

        statusMessage.innerText = "Account Created!";
        statusMessage.style.color = "#00ffee";
      })
      .catch((error) => {
        statusMessage.innerText = error.message;
        statusMessage.style.color = "red";
      });
  });

  // LOGIN
  loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "portfolio.html";
      })
      .catch((error) => {
        statusMessage.innerText = error.message;
        statusMessage.style.color = "red";
      });
  });

});