// Import Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// Import Auth (IMPORTANT)
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your config (keep yours)
const firebaseConfig = {
apiKey: "AIzaSyBycVAVoEP22McEUtMw54Vb0xe-QIv1Sug",
authDomain: "ecommerce-app-b655a.firebaseapp.com",
projectId: "ecommerce-app-b655a",
storageBucket: "ecommerce-app-b655a.firebasestorage.app",
messagingSenderId: "616985098135",
appId: "1:616985098135:web",
measurementId: "G-WXNETFDPMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ================= SIGNUP =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
signupForm.addEventListener("submit", async (e) => {
e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try {
  await createUserWithEmailAndPassword(auth, email, password);
  alert("Signup successful!");
  window.location.href = "login.html";
} catch (error) {
  alert(error.message);
}

});
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
loginForm.addEventListener("submit", async (e) => {
e.preventDefault();

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

try {
  await signInWithEmailAndPassword(auth, email, password);
  alert("Login successful!");
  window.location.href = "index.html";
} catch (error) {
  alert(error.message);
}

});
}

// ================= AUTH STATE =================
onAuthStateChanged(auth, (user) => {
if (user) {
console.log("Logged in:", user.email);
} else {
console.log("No user logged in");
}
});

// ================= LOGOUT =================
window.logout = async function () {
await signOut(auth);
alert("Logged out");
window.location.href = "login.html";
};