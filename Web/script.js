document.getElementById("startBtn").addEventListener("click", function() {
  window.location.href = "kategoria_oldal1.html";
});

fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(users => {
    console.log("Felhasználók az adatbázisból:", users);
  })
  .catch(err => {
    console.error("Hiba történt a lekérés közben:", err);
  });