const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();


app.use(cors()); // <<< ezzel engedélyezed minden origin-nek
app.use(express.json());

app.use(cors()); // <<< ezzel engedélyezed minden origin-nek
app.use(express.json());
// <<< A Web mappa statikus kiszolgálása, hogy a frontend oldalakat is a szerver szolgálja ki.
app.use(express.static(path.join(__dirname, "../Web")));
// Route-ok importálása
const userRoutes = require("./api/routes/userRoutes");
const alkalomRoutes = require("./api/routes/alkalomRoutes");
const stilusRoutes = require("./api/routes/stilusRoutes");
const celcsoportRoutes = require("./api/routes/celcsoportRoutes");
const gyujtemenyRoutes = require("./api/routes/gyujtemenyRoutes");
const kategoriaRoutes = require("./api/routes/kategoriaRoutes");
const kuponRoutes = require("./api/routes/kuponRoutes");
const ajandekRoutes = require("./api/routes/ajandekRoutes");

// Route-ok regisztrálása
app.use("/users", userRoutes);
app.use("/alkalmak", alkalomRoutes);
app.use("/stilusok", stilusRoutes);
app.use("/celcsoportok", celcsoportRoutes);
app.use("/gyujtemenyek", gyujtemenyRoutes);
app.use("/kategoriak", kategoriaRoutes);
app.use("/kuponok", kuponRoutes);
app.use("/ajandekok", ajandekRoutes);


// Hiba kezelő middleware (opcionális)
const errorHandler = require("./api/middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
