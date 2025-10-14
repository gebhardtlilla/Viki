const db = require('../../config/db');

exports.getCelcsoportok = (req, res) => {
  db.query('SELECT nev FROM Celcsoport', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results.map(row => row.nev));
  });
};
