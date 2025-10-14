//a felhasználókkal kapcsolatos logika

// Bejelentkezés
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM Felhasznalo WHERE name = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) {
        return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó!" });
      }
      // Sikeres bejelentkezés, visszaadjuk a felhasználónevet
      res.json({ username: results[0].name });
    }
  );
};
const db = require("../../config/db");

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
exports.createUser = (req, res) => {
  const { name, email, password } = req.body;

  // Ellenőrzés, hogy a felhasználó létezik-e már
  db.query("SELECT * FROM Felhasznalo WHERE name = ?", [name], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(400).json({ message: "Ez a felhasználónév már foglalt." });
    }

    // Ha nem létezik, akkor mentjük
    db.query(
      "INSERT INTO Felhasznalo (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Felhasználó létrehozva!", userId: results.insertId });
      }
    );
  });
};
