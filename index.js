// Llamado a express
const express = require("express");

require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Crear server de express
const app = express();

// Conexión con la base de datos
dbConnection();

// Habilitar cors
app.use(cors());

// Directorio público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/deadlines", require("./routes/deadlines"));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor en puerto ${process.env.PORT}`);
});
