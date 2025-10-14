(function(){
  function renderNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    const username = localStorage.getItem('username');
    if (username) {
      nav.innerHTML = `<span class="user-name">${username}</span> <button id="logoutBtn" class="logout-btn">Kijelentkezés</button>`;
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('username');
          // Ha az oldal auth-ot igényel, dobjuk vissza bejelentkezésre, különben frissítés
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
