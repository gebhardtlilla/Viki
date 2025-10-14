function renderSubcategories(cats) {
  const div = document.getElementById("subcategories");
  div.innerHTML = `
    <div class="subcat-list">
      ${cats.map(cat => `<div class="subcat-item">${cat}</div>`).join('')}
    </div>
  `;
}

document.getElementById("alkalomBtn").addEventListener("click", () => {
  fetch("/alkalmak")
    .then(response => response.json())
    .then(renderSubcategories)
    .catch(error => console.error('Hiba az alkalmak lekérésekor:', error));
});

document.getElementById("stilusBtn").addEventListener("click", () => {
  fetch("/stilusok")
    .then(response => response.json())
    .then(renderSubcategories)
    .catch(error => console.error('Hiba a stílusok lekérésekor:', error));
});

document.getElementById("celcsoportBtn").addEventListener("click", () => {
  fetch("/celcsoportok")
    .then(response => response.json())
    .then(renderSubcategories)
    .catch(error => console.error('Hiba a célcsoportok lekérésekor:', error));
});