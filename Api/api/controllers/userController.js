const bcrypt = require('bcrypt');
const db = require("../../config/db");

// Bejelentkezés
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM Felhasznalo WHERE name = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) {
        return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó!" });
      }
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó!" });
      }
      res.json({ username: user.name });
    }
  );
};

// Összes felhasználó lekérése
exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM Felhasznalo", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Egy felhasználó lekérése ID alapján
exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Felhasznalo WHERE user_id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Felhasználó nem található" });
    res.json(results[0]);
  });
};

// Új felhasználó hozzáadása
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  db.query("SELECT * FROM Felhasznalo WHERE name = ?", [name], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(400).json({ message: "Ez a felhasználónév már foglalt." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO Felhasznalo (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Felhasználó létrehozva!", userId: results.insertId });
      }
    );
  });
};