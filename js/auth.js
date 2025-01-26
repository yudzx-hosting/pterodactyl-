// auth.js

// Mendapatkan elemen-elemen form dari HTML
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Fungsi login
loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Mencegah form untuk submit secara default

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Cek username dan password
  if (username === "Yudzx" && password === "admin1") {
    // Simpan status login di localStorage
    localStorage.setItem("user", "Yudzx");
    
    // Alihkan ke dashboard setelah login sukses
    window.location.href = "dashboard.html";
  } else {
    alert("Username atau password salah");
  }
});