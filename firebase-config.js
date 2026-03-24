// =============================================
// FIREBASE CONFIGURATION
// Replace these values with your Firebase project config
// Get them from: https://console.firebase.google.com
// =============================================
export const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};

// =============================================
// AUTH GUARD - protects all pages
// Import this in every HTML page to require login
// =============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Redirect to login if not authenticated
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    // Show user info in navbar
    const userEl = document.getElementById("navUser");
    if (userEl) {
      const name = user.displayName || user.email.split("@")[0];
      const photo = user.photoURL;
      userEl.innerHTML = (photo ? '<img src="'+photo+'" style="width:28px;height:28px;border-radius:50%;vertical-align:middle;margin-right:6px">' : '<i class="fas fa-user-circle" style="margin-right:6px"></i>') + name;
      userEl.style.display = "flex";
      userEl.style.alignItems = "center";
    }
  }
});

// Logout function available globally
window.logoutUser = async function() {
  if (confirm("Sign out of Omars Toolkit?")) {
    await signOut(auth);
    window.location.href = "login.html";
  }
};

export { auth };
