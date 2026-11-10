// Módulo de rutas (no se ejecuta solo: lo importa index.js).
// Para correr la aplicación: npm start (desde la carpeta registro-gastos-main).
// Módulo propio con todas las rutas de la aplicación.
const express = require('express');
const path = require('path');
const { leerGastos, agregarGasto, validarGasto } = require('./datos');

const router = express.Router();

// Envolvemos los handlers async: si una promesa falla (por ejemplo, MongoDB
// caído), el error se pasa a next() y lo atrapa el middleware de errores de index.js.
const asincrono = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// 1) GET / → página principal con la lista de gastos.
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'vistas', 'index.html'));
});

// 2) GET /nuevo → página con el formulario.
router.get('/nuevo', (req, res) => {
  res.sendFile(path.join(__dirname, 'vistas', 'nuevo.html'));
});

// 3) GET /api/gastos → devuelve los gastos de MongoDB en formato JSON (lo usa fetch).
router.get(
  '/api/gastos',
  asincrono(async (req, res) => {
    const gastos = await leerGastos();
    res.json(gastos);
  })
);

// 4) POST /gastos → recibe el formulario, valida y guarda en MongoDB.
router.post(
  '/gastos',
  asincrono(async (req, res) => {
    const descripcion = req.body.descripcion;
    const monto = Number(req.body.monto);
    const categoria = req.body.categoria;

    const error = validarGasto(descripcion, monto, categoria);
    if (error) {
      // Redirección 1: si hay un error, vuelve al formulario con el mensaje.
      return res.redirect('/nuevo?error=' + encodeURIComponent(error));
    }

    await agregarGasto({
      descripcion: descripcion.trim(),
      monto: monto,
      categoria: categoria,
      fecha: new Date().toISOString().slice(0, 10), // fecha de hoy: AAAA-MM-DD
    });

    // Redirección 2: si salió todo bien, vuelve a la página principal.
    res.redirect('/');
  })
);

// 5) GET /listado → ruta vieja.
// Redirección 3: lleva a la ruta nueva.
router.get('/listado', (req, res) => {
  res.redirect('/');
});

module.exports = router;
