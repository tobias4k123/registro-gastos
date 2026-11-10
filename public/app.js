// Script del cliente (se carga desde vistas/index.html).
// No se ejecuta con node: la app se abre en el navegador en http://localhost:3000 (npm start).
// Pide los gastos al servidor con fetch y los muestra en la tabla.
async function cargarGastos() {
  const mensajeError = document.getElementById('error');

  try {
    const respuesta = await fetch('/api/gastos');
    // fetch no falla solo por un error del servidor (500, 404): hay que revisar response.ok.
    if (!respuesta.ok) {
      throw new Error('El servidor respondió con el código ' + respuesta.status);
    }
    const gastos = await respuesta.json();
    mostrarGastos(gastos);
  } catch (error) {
    console.error(error);
    // Mostramos un mensaje entendible en la pantalla en lugar de una tabla vacía.
    mensajeError.textContent = 'No se pudieron cargar los gastos. Revisá que MongoDB esté funcionando.';
  }
}

// Arma la tabla con una fila por gasto y calcula el total.
function mostrarGastos(gastos) {
  const lista = document.getElementById('lista');
  lista.innerHTML = ''; // vacío la tabla antes de dibujarla
  let total = 0;

  for (const gasto of gastos) {
    // Una fila (tr) por gasto, con una celda (td) por dato.
    const fila = document.createElement('tr');
    // Formato de pesos: separador de miles con punto y decimales con coma (es-AR).
    const datos = [gasto.fecha, gasto.descripcion, gasto.categoria, '$ ' + formatearMonto(gasto.monto)];

    for (const dato of datos) {
      const celda = document.createElement('td');
      celda.textContent = dato; // textContent: el texto se muestra tal cual, no como HTML
      fila.appendChild(celda);
    }

    lista.appendChild(fila);
    total = total + gasto.monto;
  }

  document.getElementById('total').textContent = '$ ' + formatearMonto(total);
}

// Convierte un número en texto con formato argentino: 20000 -> 20.000
function formatearMonto(numero) {
  return numero.toLocaleString('es-AR', { maximumFractionDigits: 2 });
}

cargarGastos();
