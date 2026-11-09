// Módulo propio con todas las rutas de la aplicación.
const express = require('express');
const path = require('path');
const { leerGastos, agregarGasto, validarGasto } = require('./datos');

const router = express.Router();

// 1) GET / → página principal con la lista de gastos.
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'vistas', 'index.html'));
});

// 2) GET /nuevo → página con el formulario.
router.get('/nuevo', (req, res) => {
  res.sendFile(path.join(__dirname, 'vistas', 'nuevo.html'));
});

// 3) GET /api/gastos → devuelve los gastos en formato JSON (lo usa fetch).
router.get('/api/gastos', (req, res) => {
  res.json(leerGastos());
});

// 4) POST /gastos → recibe el formulario, valida y guarda.
router.post('/gastos', (req, res) => {
  const descripcion = req.body.descripcion;
  const monto = Number(req.body.monto);
  const categoria = req.body.categoria;

  const error = validarGasto(descripcion, monto, categoria);
  if (error) {
    // Redirección 1: si hay un error, vuelve al formulario con el mensaje.
    return res.redirect('/nuevo?error=' + encodeURIComponent(error));
  }

  agregarGasto({
    descripcion: descripcion.trim(),
    monto: monto,
    categoria: categoria,
    fecha: new Date().toISOString().slice(0, 10), // fecha de hoy: AAAA-MM-DD
  });

  // Redirección 2: si salió todo bien, vuelve a la página principal.
  res.redirect('/');
});

// 5) GET /listado → ruta vieja.
// Redirección 3: lleva a la ruta nueva.
router.get('/listado', (req, res) => {
  res.redirect('/');
});

module.exports = router;
