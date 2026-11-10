// Servidor principal de la aplicación Registro de Gastos.
// Comando para ejecutarlo (desde la carpeta registro-gastos-main):
//   npm start        (equivale a: node index.js)
// Para desarrollo con reinicio automático al guardar cambios:
//   npm run dev
// Requiere MongoDB corriendo. Por defecto usa mongodb://127.0.0.1:27017/registro_gastos;
// para otra base, definí la variable MONGODB_URI antes de iniciar.
const express = require('express');
const path = require('path');
const rutas = require('./rutas'); // módulo propio con las rutas
const { conectarDB } = require('./db'); // módulo propio de conexión a MongoDB

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

// Middleware de errores (tiene 4 parámetros). Atrapa fallas, por ejemplo,
// si MongoDB no responde. Para la API devolvemos JSON; para el resto, texto.
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err.message);
  if (req.path.startsWith('/api')) {
    return res.status(500).json({ error: 'No se pudieron obtener los datos.' });
  }
  res.status(500).send('Error interno del servidor');
});

// require.main === module es true solo cuando este archivo se ejecuta
// directamente con node. Si se importa desde otro archivo (por ejemplo, para
// hacer pruebas), no se conecta ni se levanta el servidor: solo se usa la app exportada.
if (require.main === module) {
  // Primero conectamos a MongoDB y recién después ponemos el servidor a escuchar.
  conectarDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Servidor funcionando en http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('No se pudo conectar a MongoDB:', err.message);
      process.exit(1);
    });
}

module.exports = app;
