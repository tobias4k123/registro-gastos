// Módulo de conexión a MongoDB (no se ejecuta solo: lo importa index.js).
// Usa Mongoose, una capa de abstracción sobre el driver oficial de MongoDB.
// La dirección de la base se toma de la variable de entorno MONGODB_URI.
// Si no está definida, se usa una base local llamada registro_gastos.
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/registro_gastos';

// Abre la conexión con la base de datos. Devuelve una promesa que se resuelve
// cuando la conexión está lista. Si falla, la promesa se rechaza con el error.
async function conectarDB() {
  // strictQuery: evita que Mongoose ignore filtros desconocidos en las consultas.
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGODB_URI);
  console.log(`Conectado a MongoDB: ${mongoose.connection.name}`);
}

// Cierra la conexión (lo usan los scripts y las pruebas para terminar el proceso).
async function desconectarDB() {
  await mongoose.disconnect();
}

module.exports = { conectarDB, desconectarDB, MONGODB_URI };
