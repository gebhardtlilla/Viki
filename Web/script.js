document.getElementById("startBtn").addEventListener("click", function() {
  window.location.href = "kategoria_oldal1.html";
});

// Nav frissítése bejelentkezett felhasználóra
window.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  const username = localStorage.getItem('username');
  if (!nav) return;
  if (username) {
    nav.innerHTML = `<span class="user-name">${username}</span>`;
  } else {
    nav.innerHTML = '<a href="bejelentkezes.html">Bejelentkezés</a> <a href="regisztracio.html">Regisztráció</a>';
  }
});

fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(users => {
    console.log("Felhasználók az adatbázisból:", users);
  })
  .catch(err => {
    console.error("Hiba történt a lekérés közben:", err);
  });