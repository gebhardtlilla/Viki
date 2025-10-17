const db = require('../../../../Viki/Api/config/db');

exports.getAjandekok = (req,res)=>{ db.query('SELECT * FROM Ajandek',(err,results)=>{ if(err) return res.status(500).json({ error: err }); res.json(results); }); };
exports.getAjandekById = (req,res)=>{ const {id}=req.params; db.query('SELECT * FROM Ajandek WHERE id=?',[id],(err,results)=>{ if(err) return res.status(500).json({ error: err }); if(results.length===0) return res.status(404).json({ message:"Ajándék nem található" }); res.json(results[0]); }); };
exports.createAjandek = (req,res)=>{ const { nev, leiras }=req.body; db.query('INSERT INTO Ajandek (nev, leiras) VALUES (?,?)',[nev, leiras],(err,results)=>{ if(err) return res.status(500).json({ error: err }); res.status(201).json({ message:"Ajándék létrehozva", id:results.insertId }); }); };
exports.updateAjandek = (req,res)=>{ const {id}=req.params; const { nev, leiras }=req.body; db.query('UPDATE Ajandek SET nev=?, leiras=? WHERE id=?',[nev, leiras, id],(err)=>{ if(err) return res.status(500).json({ error: err }); res.json({ message:"Ajándék frissítve" }); }); };
exports.deleteAjandek = (req,res)=>{ const {id}=req.params; db.query('DELETE FROM Ajandek WHERE id=?',[id],(err)=>{ if(err) return res.status(500).json({ error: err }); res.json({ message:"Ajándék törölve" }); }); };

// Új: Ajándékok lekérése alkalom név alapján
exports.getAjandekokByAlkalom = (req, res) => {
  const alkalomNev = req.params.alkalomNev;
  const sql = `
    SELECT a.* FROM Ajandek a
    JOIN Ajandek_Alkalom aa ON a.id = aa.ajandek_id
    JOIN Alkalom al ON aa.alkalom_id = al.id
    WHERE LOWER(al.nev) = LOWER(?)
  `;
  db.query(sql, [alkalomNev], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
