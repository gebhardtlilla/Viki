function renderSubcategories(cats, mode) {
  const div = document.getElementById("subcategories");
  div.innerHTML = `
    <div class="subcat-list">
      ${cats.map(cat => `<div class="subcat-item">${cat}</div>`).join('')}
    </div>
  `;
  document.querySelectorAll('.subcat-item').forEach(item => {
    item.addEventListener('click', () => {
      if (mode === 'stilus') {
        fetch(`/ajandekok/stilus/${encodeURIComponent(item.textContent)}`)
          .then(res => res.json())
          .then(ajandekok => {
            if (ajandekok.length === 0) {
              div.innerHTML = `<p>Nincs ilyen stílushoz ajándék.</p>`;
            } else {
              div.innerHTML = `<div style=\"display:grid;grid-template-columns:repeat(4,1fr);gap:24px;justify-items:center;background:rgba(255,255,255,0.8);border-radius:14px;padding:18px 0;margin-bottom:24px;\">` +
                ajandekok.map(a => a.image_url ?
                  `<div style=\"display:flex;flex-direction:column;align-items:center;margin:10px;\">
                    <img src=\"Képek/${a.image_url}\" alt=\"${a.nev}\" style=\"max-width:160px;max-height:160px;border-radius:10px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;\">
                    <span style=\"font-size:16px;\">${a.nev}</span>
                  </div>` :
                  `<div style=\"display:flex;flex-direction:column;align-items:center;margin:10px;\">
                    <div style=\"width:160px;height:160px;display:flex;align-items:center;justify-content:center;background:#fff4fa;border-radius:10px;color:#8d465d;font-size:15px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;\">Nincs hozzátartozó kép.</div>
                    <span style=\"font-size:16px;\">${a.nev}</span>
                  </div>`
                ).join('') + `</div>`;
            }
          });
      } else if (mode === 'celcsoport') {
        fetch(`/ajandekok/celcsoport/${encodeURIComponent(item.textContent)}`)
          .then(res => res.json())
          .then(ajandekok => {
            if (ajandekok.length === 0) {
              div.innerHTML = `<p>Nincs ilyen célcsoporthoz ajándék.</p>`;
            } else {
              div.innerHTML = `<div style=\"display:grid;grid-template-columns:repeat(4,1fr);gap:24px;justify-items:center;background:rgba(255,255,255,0.8);border-radius:14px;padding:18px 0;margin-bottom:24px;\">` +
                ajandekok.map(a => a.image_url ?
                  `<div style=\"display:flex;flex-direction:column;align-items:center;margin:10px;\">
                    <img src=\"Képek/${a.image_url}\" alt=\"${a.nev}\" style=\"max-width:160px;max-height:160px;border-radius:10px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;\">
                    <span style=\"font-size:16px;\">${a.nev}</span>
                  </div>` :
                  `<div style=\"display:flex;flex-direction:column;align-items:center;margin:10px;\">
                    <div style=\"width:160px;height:160px;display:flex;align-items:center;justify-content:center;background:#fff4fa;border-radius:10px;color:#8d465d;font-size:15px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;\">Nincs hozzátartozó kép.</div>
                    <span style=\"font-size:16px;\">${a.nev}</span>
                  </div>`
                ).join('') + `</div>`;
            }
          });
      } else {
        fetch(`/ajandekok/alkalom/${encodeURIComponent(item.textContent)}`)
          .then(res => res.json())
          .then(ajandekok => {
            if (ajandekok.length === 0) {
              div.innerHTML = `<p>Nincs ilyen alkalomhoz ajándék.</p>`;
            } else {
              div.innerHTML = `<div style=\"display:grid;grid-template-columns:repeat(4,1fr);gap:24px;justify-items:center;background:rgba(255,255,255,0.8);border-radius:14px;padding:18px 0;margin-bottom:24px;\">` +
                ajandekok.map(a => a.image_url ?
                  `<div style=\"display:flex;flex-direction:column;align-items:center;margin:10px;\">
                    <img src=\"Képek/${a.image_url}\" alt=\"${a.nev}\" style=\"max-width:160px;max-height:160px;border-radius:10px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;\">
                    <span style=\"font-size:16px;\">${a.nev}</span>
                  </div>` :
                  `<div style=\"display:flex;flex-direction:column;align-items:center;margin:10px;\">
                    <div style=\"width:160px;height:160px;display:flex;align-items:center;justify-content:center;background:#fff4fa;border-radius:10px;color:#8d465d;font-size:15px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;\">Nincs hozzátartozó kép.</div>
                    <span style=\"font-size:16px;\">${a.nev}</span>
                  </div>`
                ).join('') + `</div>`;
            }
          });
      }
    });
  });
}

document.getElementById("alkalomBtn").addEventListener("click", () => {
  fetch("/alkalmak")
    .then(response => response.json())
    .then(cats => renderSubcategories(cats, 'alkalom'))
    .catch(error => console.error('Hiba az alkalmak lekérésekor:', error));
});

document.getElementById("stilusBtn").addEventListener("click", () => {
  fetch("/stilusok")
    .then(response => response.json())
    .then(cats => renderSubcategories(cats, 'stilus'))
    .catch(error => console.error('Hiba a stílusok lekérésekor:', error));
});

document.getElementById("celcsoportBtn").addEventListener("click", () => {
  fetch("/celcsoportok")
    .then(response => response.json())
    .then(cats => renderSubcategories(cats, 'celcsoport'))
    .catch(error => console.error('Hiba a célcsoportok lekérésekor:', error));
});