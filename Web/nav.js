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
            // Ha a jelenlegi oldal a tovabb.html, akkor kategoria_oldal1.html-re dobjon vissza
            if (window.location.pathname.includes('tovabb.html')) {
              window.location.replace('kategoria_oldal1.html');
            } else {
              window.location.replace('kategoria_oldal1.html');
            }
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
    // Modal HTML betöltése, ha van nav
    if (document.getElementById('main-nav')) {
      fetch('auth-modal.html').then(r=>r.text()).then(html=>{
        document.body.insertAdjacentHTML('beforeend', html);
        const modal = document.getElementById('auth-modal');
        // Modal bezárás: csak háttérre kattintva zárható be
        window.onclick = (e) => { 
          const modal = document.getElementById('auth-modal');
          if (e.target === modal) modal.style.display = 'none'; 
        };
        // Váltás login/regisztráció között
        document.getElementById('switchToRegister').onclick = (e) => { e.preventDefault(); showRegister(); };
        document.getElementById('switchToLogin').onclick = (e) => { e.preventDefault(); showLogin(); };
        function showLogin() {
          document.getElementById('modal-login-form').style.display = '';
          document.getElementById('modal-register-form').style.display = 'none';
        }
        function showRegister() {
          document.getElementById('modal-login-form').style.display = 'none';
          document.getElementById('modal-register-form').style.display = '';
        }
        // Nav linkek módosítása
        const nav = document.getElementById('main-nav');
        if (nav) {
          nav.querySelectorAll('a').forEach(a => {
            if (a.textContent.includes('Bejelentkezés')) {
              a.onclick = (e) => { e.preventDefault(); showLogin(); modal.style.display = 'block'; };
            }
            if (a.textContent.includes('Regisztráció')) {
              a.onclick = (e) => { e.preventDefault(); showRegister(); modal.style.display = 'block'; };
            }
          });
        }
        // Login submit
        document.getElementById('modal-login-form').onsubmit = async function(e) {
          e.preventDefault();
          const username = document.getElementById('modal-username').value;
          const password = document.getElementById('modal-password').value;
          const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          const data = await response.json();
          if (response.ok && data.username) {
            localStorage.setItem('username', data.username);
            modal.style.display = 'none';
            window.location.reload();
          } else {
            alert('Hibás felhasználónév vagy jelszó!');
          }
        };
        // Regisztráció submit
        document.getElementById('modal-register-form').onsubmit = async function(e) {
          e.preventDefault();
          const email = document.getElementById('modal-email').value;
          const username = document.getElementById('modal-reg-username').value;
          const password = document.getElementById('modal-reg-password').value;
          const confirmPwd = document.getElementById('modal-confirm-password').value;
          const messageBox = document.getElementById('modal-message');
          messageBox.textContent = "";
          if (password !== confirmPwd) {
            messageBox.textContent = "A jelszavak nem egyeznek!";
            messageBox.style.color = "red";
            return;
          }
          try {
            const response = await fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: username, email: email, password: password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Hiba történt a regisztráció során.');
            messageBox.style.color = "green";
            messageBox.textContent = "Sikeres regisztráció! Most már bejelentkezhetsz.";
            setTimeout(() => {
              showLogin();
              messageBox.textContent = "";
            }, 1500);
          } catch (err) {
            messageBox.style.color = "red";
            messageBox.textContent = err.message;
          }
        };
      });
    }
  });
})();