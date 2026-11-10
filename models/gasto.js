// Modelo de Gasto: define cómo es un documento de la colección "gastos".
// Un esquema (Schema) describe los campos y sus reglas; el modelo (model)
// es la clase con la que se hacen las operaciones CRUD sobre la colección.
const mongoose = require('mongoose');

// Categorías permitidas. Deben coincidir con las opciones de vistas/nuevo.html.
const CATEGORIAS = ['Comida', 'Transporte', 'Estudio', 'Servicios', 'Otros'];

const gastoSchema = new mongoose.Schema(
  {
    descripcion: { type: String, required: true, trim: true },
    monto: { type: Number, required: true, min: 0.01 },
    categoria: { type: String, required: true, enum: CATEGORIAS },
    fecha: { type: String, required: true }, // formato AAAA-MM-DD
  },
  {
    // timestamps: Mongoose agrega createdAt y updatedAt automáticamente.
    timestamps: true,
    // toJSON: al enviar al cliente, _id pasa a llamarse "id" y se quitan campos internos.
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// La colección se llamará "gastos" en MongoDB.
const Gasto = mongoose.model('Gasto', gastoSchema, 'gastos');

module.exports = { Gasto, CATEGORIAS };
