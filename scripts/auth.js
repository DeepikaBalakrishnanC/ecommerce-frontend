// SIGNUP
const signupForm = document.getElementById("signupForm");

if (signupForm) {
signupForm.addEventListener("submit", function (e) {
e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be 8+ chars with uppercase, lowercase, and number");
        return;
    }

    const user = { name, email, password };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful!");
    window.location.href = "login.html";
});

}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
loginForm.addEventListener("submit", function (e) {
e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        alert("No account found. Please sign up.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials");
    }
});

}

// PASSWORD VALIDATION
function validatePassword(password) {
const regex = /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/;
return regex.test(password);
}