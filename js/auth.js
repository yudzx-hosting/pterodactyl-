document.getElementById("loginBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in as:", user.uid);
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
});
