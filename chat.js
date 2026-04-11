import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
let unsubscribeMessages = null;

// Firebase config
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

// elements
const userList = document.getElementById("userList");
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatHeader = document.getElementById("chatHeader");

let currentUser = null;
let selectedUser = null;
let typingTimeout;

// 🔐 AUTH + ONLINE STATUS
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;

    await updateDoc(doc(db, "users", user.email), {
      online: true
    });

    loadUsers();
  }
});

// 👥 LOAD USERS
async function loadUsers() {
  const snapshot = await getDocs(collection(db, "users"));

  userList.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const email = data.email;
    const isOnline = data.online;

    if (email === currentUser.email) return;

    const div = document.createElement("div");
    div.classList.add("user");
    div.innerText = email + (isOnline ? " 🟢" : " ⚫");

    div.onclick = () => {
      selectedUser = email;
       // highlight active
  document.querySelectorAll(".user").forEach(u => u.classList.remove("active"));
  div.classList.add("active");
      chatHeader.innerText = email;
      loadMessages();
      listenTyping();
    };

    userList.appendChild(div);
  });
}

// 🧠 CREATE CHAT ID
function getChatId(user1, user2) {
  return [user1, user2].sort().join("_");
}

// ⌨️ TYPING DETECTION
input.addEventListener("input", async () => {
  if (!selectedUser || !currentUser) return;

  const chatId = getChatId(currentUser.email, selectedUser);

  await setDoc(doc(db, "chats", chatId, "typing", currentUser.email), {
    typing: true
  });

  clearTimeout(typingTimeout);

  typingTimeout = setTimeout(async () => {
    await setDoc(doc(db, "chats", chatId, "typing", currentUser.email), {
      typing: false
    });
  }, 1500);
});

// 👀 LISTEN TYPING
function listenTyping() {
  const chatId = getChatId(currentUser.email, selectedUser);
  const typingRef = collection(db, "chats", chatId, "typing");

  onSnapshot(typingRef, (snapshot) => {
    let typingUser = null;

    snapshot.forEach(docSnap => {
      const data = docSnap.data();

      if (docSnap.id !== currentUser.email && data.typing) {
        typingUser = docSnap.id;
      }
    });

    if (typingUser) {
      chatHeader.innerText = typingUser + " is typing...";
    } else {
      chatHeader.innerText = selectedUser;
    }
  });
}

// 💬 SEND MESSAGE
sendBtn.addEventListener("click", async () => {
  if (!selectedUser) return alert("Select a user first");

  const text = input.value;
  if (!text) return;

  const chatId = getChatId(currentUser.email, selectedUser);

  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    sender: currentUser.email,
    createdAt: serverTimestamp(),
    status: "sent"
  });

  input.value = "";
});

// 📡 LOAD MESSAGES
function loadMessages() { 
  const chatId = getChatId(currentUser.email, selectedUser);

  // 🔥 STOP OLD LISTENER
  if (unsubscribeMessages) {
    unsubscribeMessages();
  }

  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt")
  );

  // 🔥 SAVE NEW LISTENER
  unsubscribeMessages = onSnapshot(q, async (snapshot) => {
    chatBox.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const msg = docSnap.data();

      const div = document.createElement("div");
      div.classList.add("message");

      if (msg.sender === currentUser.email) {
        div.classList.add("sent");
      } else {
        div.classList.add("received");
      }

      let ticks = "";

      if (msg.sender === currentUser.email) {
        if (msg.status === "sent") ticks = " ✔";
        else if (msg.status === "delivered") ticks = " ✔✔";
        else if (msg.status === "seen") ticks = " ✔✔";
      }

      div.innerHTML = msg.text + "<span class='ticks'>" + ticks + "</span>";
      chatBox.appendChild(div);
    });

    // ✅ Update status safely
    for (const docSnap of snapshot.docs) {
      const msg = docSnap.data();

      if (msg.sender !== currentUser.email) {
        if (msg.status === "sent") {
          await updateDoc(docSnap.ref, { status: "delivered" });
        } else if (msg.status === "delivered") {
          await updateDoc(docSnap.ref, { status: "seen" });
        }
      }
    }

    chatBox.scrollTo({
      top: chatBox.scrollHeight,
      behavior: "smooth"
    });
  });
}

// 🔴 OFFLINE WHEN LEAVE
window.addEventListener("beforeunload", async () => {
  if (currentUser) {
    await updateDoc(doc(db, "users", currentUser.email), {
      online: false
    });
  }
});