window.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  const username = localStorage.getItem('username');
  if (nav && username) {
    nav.innerHTML = `<span class="user-name">${username}</span>`;
  }
});
