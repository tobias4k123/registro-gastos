// Módulo propio para manejar los datos: leer, guardar y validar gastos.
const fs = require('fs');
const path = require('path');

const ARCHIVO = path.join(__dirname, 'data', 'gastos.json');

// Lee el archivo JSON y devuelve el array de gastos.
function leerGastos() {
  const texto = fs.readFileSync(ARCHIVO, 'utf-8');
  return JSON.parse(texto);
}

// Agrega un gasto nuevo al archivo JSON.
function agregarGasto(gasto) {
  const gastos = leerGastos();
  gasto.id = Date.now(); // id único a partir de la fecha y hora actual
  gastos.push(gasto);
  fs.writeFileSync(ARCHIVO, JSON.stringify(gastos, null, 2));
}

// Revisa los datos del formulario. Devuelve un mensaje de error, o null si están bien.
function validarGasto(descripcion, monto, categoria) {
  if (!descripcion || descripcion.trim() === '') {
    return 'La descripción es obligatoria.';
  }
  if (isNaN(monto) || monto <= 0) {
    return 'El monto tiene que ser un número mayor que 0.';
  }
  if (!categoria) {
    return 'Tenés que elegir una categoría.';
  }
  return null;
}

module.exports = { leerGastos, agregarGasto, validarGasto };
