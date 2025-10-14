// !!!!Auth és nav már a nav.js-ben kezelve, azért nincs kód





// window.addEventListener('DOMContentLoaded', () => {
//   const nav = document.getElementById('main-nav');
//   const username = localStorage.getItem('username');

//   // Védelem: csak bejelentkezve érhető el
//   if (!username) {
//     alert('Bejelentkezés szükséges a Tovább oldal megnyitásához.');
//     window.location.replace('bejelentkezes.html');
//     return;
//   }

//   if (nav) {
//     nav.innerHTML = `<span class="user-name">${username}</span>`;
//   }
// });