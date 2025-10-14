(function(){
  function renderNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    const username = localStorage.getItem('username');
    if (username) {
      nav.innerHTML = `<span class="user-name">${username}</span> <a href="#" id="logoutLink">Kijelentkezés</a>`;
      const logoutLink = document.getElementById('logoutLink');
      if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('username');
          if (document.body && document.body.dataset && document.body.dataset.requiresAuth === 'true') {
            window.location.replace('bejelentkezes.html');
          } else {
            window.location.reload();
          }
        });
      }
    } else {
      nav.innerHTML = '<a href="bejelentkezes.html">Bejelentkezés</a> <a href="regisztracio.html">Regisztráció</a>';
    }
  }

  function guardAuth() {
    const requiresAuth = document.body && document.body.dataset && document.body.dataset.requiresAuth === 'true';
    if (!requiresAuth) return;
    const username = localStorage.getItem('username');
    if (!username) {
      alert('Bejelentkezés szükséges az oldal megnyitásához.');
      window.location.replace('bejelentkezes.html');
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    guardAuth();
    renderNav();
  });
})();
