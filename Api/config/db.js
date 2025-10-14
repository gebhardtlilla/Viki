//  # adatbázis kapcsolat konfiguráció

const mysql = require("mysql2");

// Adatbázis kapcsolat létrehozása
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",        // a te MySQL felhasználód
  password: "",        // a jelszavad
  database: "Vizsgaremek"
});

connection.connect((err) => {
  if (err) {
    console.error("Adatbázis kapcsolat hiba:", err);
  } else {
    console.log("Sikeresen csatlakoztunk az adatbázishoz!");
  }
});

module.exports = connection;
