# 💸 Registro de Gastos

## Integrantes

- Jeremías Velasco
- Dante Nicolás Mercado
- Tobías Piflacs

## Descripción

Aplicación web hecha con Node.js y Express para anotar gastos. Desde un formulario se carga la descripción, el monto y la categoría de cada gasto. La página principal muestra todos los gastos en una tabla y el total gastado.

Los gastos se guardan en **MongoDB** (base de datos documental). La conexión se hace con **Mongoose**, que modela los datos con un esquema.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior.
- **MongoDB** corriendo. Puede ser local (`mongodb://127.0.0.1:27017`) o un cluster de [MongoDB Atlas](https://www.mongodb.com/atlas).

## Instalación y ejecución

```bash
npm install
npm start
```

Después abrir **http://localhost:3000** en el navegador.

Para desarrollo, con reinicio automático al guardar cambios:

```bash
npm run dev
```

### Variables de entorno

| Variable | Para qué sirve | Valor por defecto |
|---|---|---|
| `PORT` | Puerto del servidor | `3000` |
| `MONGODB_URI` | Dirección de la base de datos | `mongodb://127.0.0.1:27017/registro_gastos` |

Ejemplo con MongoDB Atlas (PowerShell):

```powershell
$env:MONGODB_URI="mongodb+srv://usuario:clave@cluster.mongodb.net/registro_gastos"
npm start
```


## MongoDB: cómo funciona

- **Conexión** (`db.js`): al iniciar, `index.js` llama a `conectarDB()` con `mongoose.connect(MONGODB_URI)`. Si MongoDB no responde, la app muestra el error y se cierra. El servidor recién empieza a escuchar pedidos cuando la conexión está lista.
- **Modelo** (`models/gasto.js`): define el esquema de la colección `gastos`. Cada documento tiene:
  - `descripcion` (texto, obligatorio)
  - `monto` (número, mayor que 0)
  - `categoria` (solo valores de la lista permitida)
  - `fecha` (texto `AAAA-MM-DD`)
  - `createdAt` y `updatedAt`, que Mongoose agrega solo.
- **Operaciones**:
  - **Crear**: `Gasto.create(...)` desde `agregarGasto()` cuando llega un POST válido a `/gastos`.
  - **Listar**: `Gasto.find().sort(...)` desde `leerGastos()` cuando el navegador pide `/api/gastos`.
- **Documentación oficial consultada**: [MongoDB Manual](https://www.mongodb.com/docs/manual/) y [Mongoose Docs](https://mongoosejs.com/docs/guide.html).

Ejemplo de un documento guardado:

```json
{
  "_id": "6af25e670f765753b5742e8d",
  "descripcion": "Apunte de Programación",
  "monto": 4500,
  "categoria": "Estudio",
  "fecha": "2026-11-03",
  "createdAt": "2026-11-09T23:59:35.817Z",
  "updatedAt": "2026-11-09T23:59:35.817Z"
}
```

Al enviarse al navegador, `_id` se convierte en `id`.

## Rutas

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/` | Muestra la página principal con la tabla de gastos y el total. |
| GET | `/nuevo` | Muestra el formulario para cargar un gasto. |
| GET | `/api/gastos` | Devuelve todos los gastos de MongoDB en formato **JSON**. La página principal lo pide con `fetch`. |
| POST | `/gastos` | Recibe el formulario y valida los datos. Si están bien, guarda el gasto en MongoDB y **redirige** a `/`. Si hay un error, **redirige** a `/nuevo` con el mensaje. |
| GET | `/listado` | Ruta vieja: **redirige** a `/`. |
| — | Cualquier otra | Muestra la página **404** personalizada. |

## Validación

Al recibir el formulario, el servidor revisa que:

- la descripción no esté vacía,
- el monto sea un número mayor que 0,
- se haya elegido una categoría y que sea una de las permitidas (Comida, Transporte, Estudio, Servicios u Otros).

Además, el esquema de Mongoose vuelve a validar los datos antes de guardarlos.

Si ocurre un error en el servidor (por ejemplo, MongoDB caído), la página principal muestra un mensaje en lugar de una tabla vacía, y la API responde con código **500** y un JSON con el error.

## Estructura

```
registro-gastos/
├── index.js          # Servidor: conecta a MongoDB, configura Express, rutas, 404 y errores
├── rutas.js          # Módulo propio con todas las rutas
├── datos.js          # Módulo propio: leer, guardar y validar gastos (usa el modelo)
├── db.js             # Módulo propio: conexión a MongoDB
├── models/
│   └── gasto.js      # Esquema y modelo Gasto (colección "gastos")
├── vistas/           # Páginas HTML que envía el servidor
│   ├── index.html
│   ├── nuevo.html
│   └── 404.html
└── public/           # Archivos del cliente
    ├── estilos.css
    ├── app.js        # Pide los gastos con fetch y arma la tabla
    └── nuevo.js      # Muestra el error de validación en el formulario
```
