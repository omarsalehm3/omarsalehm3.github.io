import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-DBlNO7_zDscN9bN_FjaQfSSqsdkF8xw",
  authDomain: "oguard-hub.firebaseapp.com",
  projectId: "oguard-hub",
  storageBucket: "oguard-hub.firebasestorage.app",
  messagingSenderId: "716243448619",
  appId: "1:716243448619:web:7d0af721f85b630ac04b6e",
  measurementId: "G-K5QFZLWHH0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    const userEl = document.getElementById("navUser");
    if (userEl) {
      const name = user.displayName || user.email.split("@")[0];
      const photo = user.photoURL;
      userEl.innerHTML = (photo ? '<img src="' + photo + '" style="width:28px;height:28px;border-radius:50%;vertical-align:middle;margin-right:6px">' : '<i class="fas fa-user-circle" style="margin-right:6px"></i>') + name;
      userEl.style.display = "flex";
      userEl.style.alignItems = "center";
    }
  }
});

window.logoutUser = async function() {
  if (confirm("Sign out of OGuard Hub?")) {
    await signOut(auth);
    window.location.href = "login.html";
  }
};

export { auth, firebaseConfig };
