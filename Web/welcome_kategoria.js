// welcome_kategoria.js
window.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  const welcomeMsg = document.getElementById('welcome-message');
  if (username && welcomeMsg) {
    welcomeMsg.textContent = `${username}`;
  }
  const tovabbGomb = document.getElementById('tovabb_gomb');
  if (tovabbGomb) {
    tovabbGomb.addEventListener('click', () => {
      window.location.href = 'tovabb.html';
    });
  }
});
