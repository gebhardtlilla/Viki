const db = require('../../config/db');

exports.getAlkalmak = (req, res) => {
  db.query('SELECT nev FROM Alkalom', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results.map(row => row.nev));
  });
};
