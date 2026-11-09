# 💸 Registro de Gastos

## Integrantes

- Jeremías Velasco
- Dante Nicolás Mercado
- Tobías Piflacs

## Descripción

Aplicación web hecha con Node.js y Express para anotar gastos. Desde un formulario se carga la descripción, el monto y la categoría de cada gasto. La página principal muestra todos los gastos en una tabla y el total gastado.

Los gastos se guardan en el archivo `data/gastos.json`.

## Instalación y ejecución

Se necesita tener instalado [Node.js](https://nodejs.org/).

```bash
npm install
npm start
```

Después abrir **http://localhost:3000** en el navegador.

Para desarrollo, con reinicio automático al guardar cambios:

```bash
npm run dev
```

El puerto se puede cambiar con la variable de entorno `PORT` (por defecto es 3000).

## Rutas

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/` | Muestra la página principal con la tabla de gastos y el total. |
| GET | `/nuevo` | Muestra el formulario para cargar un gasto. |
| GET | `/api/gastos` | Devuelve todos los gastos en formato **JSON**. La página principal lo pide con `fetch`. |
| POST | `/gastos` | Recibe el formulario y valida los datos. Si están bien, guarda el gasto y **redirige** a `/`. Si hay un error, **redirige** a `/nuevo` con el mensaje. |
| GET | `/listado` | Ruta vieja: **redirige** a `/`. |
| — | Cualquier otra | Muestra la página **404** personalizada. |

## Validación

Al recibir el formulario, el servidor revisa que:

- la descripción no esté vacía,
- el monto sea un número mayor que 0,
- se haya elegido una categoría.

## Estructura

```
registro-gastos/
├── index.js        # Servidor: configura Express, las rutas y la página 404
├── rutas.js        # Módulo propio con todas las rutas
├── datos.js        # Módulo propio: leer, guardar y validar gastos
├── data/
│   └── gastos.json # Donde se guardan los gastos
├── vistas/         # Páginas HTML que envía el servidor
│   ├── index.html
│   ├── nuevo.html
│   └── 404.html
└── public/         # Archivos del cliente
    ├── estilos.css
    ├── app.js      # Pide los gastos con fetch y arma la tabla
    └── nuevo.js    # Muestra el error de validación en el formulario
```
