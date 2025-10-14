window.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  const welcomeMessage = document.getElementById('welcome-message');
  if (welcomeMessage) {
    welcomeMessage.textContent = username ? `Üdvözöllek, ${username}!` : 'Üdvözöllek az oldalon!';
  }

  const tovabbGomb = document.getElementById('tovabb_gomb');
  if (tovabbGomb) {
    tovabbGomb.addEventListener('click', () => {
      window.location.href = 'tovabb.html';
    });
  }
});
