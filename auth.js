import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// Notice we added updateProfile here
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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

// Toggle elements
const loginBox = document.getElementById('loginBox');
const signupBox = document.getElementById('signupBox');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

// Login elements
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const loginStatusMessage = document.getElementById('loginStatusMessage');

// Signup elements
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupBtn = document.getElementById('signupBtn');
const signupStatusMessage = document.getElementById('signupStatusMessage');

// Switch between Login and Signup views
showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginBox.style.display = 'none';
  signupBox.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupBox.style.display = 'none';
  loginBox.style.display = 'block';
});

// Press Enter to Login/Signup
loginPassword.addEventListener("keypress", (e) => {
  if (e.key === "Enter") { e.preventDefault(); loginBtn.click(); }
});
signupPassword.addEventListener("keypress", (e) => {
  if (e.key === "Enter") { e.preventDefault(); signupBtn.click(); }
});

// SIGNUP LOGIC
signupBtn.addEventListener('click', () => {
  const name = signupName.value;
  const email = signupEmail.value;
  const password = signupPassword.value;

  if (!name || !email || !password) {
    signupStatusMessage.innerText = "Please fill all fields.";
    signupStatusMessage.style.color = "red";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // 🔥 SAVE NAME TO FIREBASE AUTH
      await updateProfile(user, { displayName: name });

      // 🔥 SAVE USER TO FIRESTORE
      await setDoc(doc(db, "users", email), {
        email: email,
        name: name
      });

      signupStatusMessage.innerText = "Account Created! Redirecting...";
      signupStatusMessage.style.color = "#00ffee";
      
      // Auto-redirect to portfolio after 1 second
      setTimeout(() => { window.location.href = "portfolio.html"; }, 1000);
    })
    .catch((error) => {
      signupStatusMessage.innerText = error.message;
      signupStatusMessage.style.color = "red";
    });
});

// LOGIN LOGIC
loginBtn.addEventListener('click', () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "portfolio.html";
    })
    .catch((error) => {
      loginStatusMessage.innerText = error.message;
      loginStatusMessage.style.color = "red";
    });
});