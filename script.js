// Keep your original function for toggling forms
function showForm(formId) {
    document.querySelectorAll('.form-box').forEach(form =>
        form.classList.remove("active")
    );

    const selectedForm = document.getElementById(formId);
    if (selectedForm) {
        selectedForm.classList.add("active");
    }
}

// -------------------
// Client-side "database"
// -------------------
let users = JSON.parse(localStorage.getItem('users')) || [];

// -------------------
// Register form handling
// -------------------
const registerForm = document.getElementById('register-form').querySelector('form');
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = this.username.value.trim();
    const email = this.email.value.trim();
    const password = this.password.value;
    const confirm = this.confirm_password.value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    if (users.find(u => u.username === username)) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful!");
    showForm('login-form');
    this.reset();
});

// -------------------
// Login form handling
// -------------------
const loginForm = document.getElementById('login-form').querySelector('form');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = this.username.value.trim();
    const password = this.password.value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert(`Login successful! Welcome ${username}`);
        this.reset();

        // Redirect to main.html
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }
});

