const db = require('../../config/db');

exports.getStilusok = (req, res) => {
  db.query('SELECT nev FROM Stilusok', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results.map(row => row.nev));
  });
};
