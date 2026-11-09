// Servidor principal de la aplicación.
const express = require('express');
const path = require('path');
const rutas = require('./rutas'); // módulo propio con las rutas

const app = express();
const PORT = process.env.PORT || 3000; // puerto configurable

// Permite leer los datos que manda el formulario (req.body).
app.use(express.urlencoded({ extended: false }));

// Sirve los archivos de la carpeta public (CSS y JavaScript del cliente).
app.use(express.static(path.join(__dirname, 'public')));

// Todas nuestras rutas están en rutas.js.
app.use(rutas);

// Si ninguna ruta respondió, mostramos la página 404 personalizada.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'vistas', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
