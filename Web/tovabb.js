// !!!!Auth és nav már a nav.js-ben kezelve, azért nincs kód

window.addEventListener('DOMContentLoaded', () => {
  const elmenyBtn = document.getElementById('elmenyBtn');
  const targyBtn = document.getElementById('targyBtn');
  const listaDiv = document.getElementById('ajandekLista');

  function kiirAjandekok(kategoria) {
    fetch('http://localhost:3000/ajandekok')
      .then(res => res.json())
      .then(ajandekok => {
        const szurt = ajandekok.filter(a => a.kategoria === kategoria);
        if (szurt.length === 0) {
          listaDiv.innerHTML = `<p>Nincs ilyen kategóriájú ajándék.</p>`;
        } else if (kategoria === 'tárgy') {
          listaDiv.innerHTML = `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;justify-items:center;">` +
            szurt.map(a => a.image_url ?
              `<div style="display:flex;flex-direction:column;align-items:center;margin:10px;">
                <img src="Képek/${a.image_url}" alt="${a.nev}" style="max-width:160px;max-height:160px;border-radius:10px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;">
                <span style="font-size:16px;">${a.nev}</span>
              </div>` :
              `<div style="display:flex;flex-direction:column;align-items:center;margin:10px;">
                <div style="width:160px;height:160px;display:flex;align-items:center;justify-content:center;background:#fff4fa;border-radius:10px;color:#8d465d;font-size:15px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;">Nincs hozzátartozó kép.</div>
                <span style="font-size:16px;">${a.nev}</span>
              </div>`
            ).join('') + `</div>`;
        } else if (kategoria === 'élmény') {
          listaDiv.innerHTML = `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;justify-items:center;">` +
            szurt.map(a => a.image_url ?
              `<div style="display:flex;flex-direction:column;align-items:center;margin:10px;">
                <img src="Képek/${a.image_url}" alt="${a.nev}" style="max-width:160px;max-height:160px;border-radius:10px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;">
                <span style="font-size:16px;">${a.nev}</span>
              </div>` :
              `<div style="display:flex;flex-direction:column;align-items:center;margin:10px;">
                <div style="width:160px;height:160px;display:flex;align-items:center;justify-content:center;background:#fff4fa;border-radius:10px;color:#8d465d;font-size:15px;box-shadow:0 1px 5px rgba(200,50,70,0.07);margin-bottom:8px;">Nincs hozzátartozó kép.</div>
                <span style="font-size:16px;">${a.nev}</span>
              </div>`
            ).join('') + `</div>`;
        } else {
          listaDiv.innerHTML = `<ul>` + szurt.map(a => `<li>${a.nev}</li>`).join('') + `</ul>`;
        }
      })
      .catch(err => {
        listaDiv.innerHTML = `<p>Hiba történt az ajándékok lekérésekor.</p>`;
      });
  }

  elmenyBtn.addEventListener('click', () => kiirAjandekok('élmény'));
  targyBtn.addEventListener('click', () => kiirAjandekok('tárgy'));
});