// register.js
const firebaseConfig = {
  apiKey: "AIzaSyAmBmcMCcfEEOF-qnNUIdR7RWM-LJmUBVQ",
  authDomain: "sopantfy.firebaseapp.com",
  projectId: "sopantfy",
  storageBucket: "sopantfy.firebasestorage.app",
  messagingSenderId: "782013037912",
  appId: "1:782013037912:web:e6be4e3debf4700c7b792d"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Simpan ke localStorage
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('email', user.email);

    // Redirect ke halaman ke2
    window.location.href = 'ke2.html';

  } catch (error) {
    alert("Gagal daftar: " + error.message);
  }
});
