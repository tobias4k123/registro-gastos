// Módulo de datos (no se ejecuta solo: lo importa rutas.js).
// Ahora los gastos se guardan en MongoDB mediante el modelo Gasto (models/gasto.js).
const { Gasto, CATEGORIAS } = require('./models/gasto');

// Devuelve todos los gastos, del más reciente al más antiguo.
// lean() devuelve objetos planos (más liviano); toJSON no se aplica, así que
// convertimos _id a id a mano.
async function leerGastos() {
  const gastos = await Gasto.find().sort({ fecha: -1, createdAt: -1 }).lean();
  return gastos.map((g) => ({
    id: g._id.toString(),
    descripcion: g.descripcion,
    monto: g.monto,
    categoria: g.categoria,
    fecha: g.fecha,
  }));
}

// Crea un gasto nuevo en la base. Si los datos no cumplen el esquema, Mongoose lanza un error.
async function agregarGasto(datos) {
  const gasto = await Gasto.create(datos);
  return gasto;
}

// Revisa los datos del formulario. Devuelve un mensaje de error, o null si están bien.
function validarGasto(descripcion, monto, categoria) {
  // 1) La descripción no puede estar vacía (ni tener solo espacios).
  if (!descripcion || descripcion.trim() === '') {
    return 'La descripción es obligatoria.';
  }
  // 2) El monto tiene que ser un número finito mayor que 0.
  if (!Number.isFinite(monto) || monto <= 0) {
    return 'El monto tiene que ser un número mayor que 0.';
  }
  // 3) La categoría tiene que ser una de las permitidas.
  if (!categoria) {
    return 'Tenés que elegir una categoría.';
  }
  if (!CATEGORIAS.includes(categoria)) {
    return 'La categoría elegida no es válida.';
  }
  return null; // todo bien
}

module.exports = { leerGastos, agregarGasto, validarGasto, CATEGORIAS };
