// Pide los gastos al servidor con fetch y los muestra en la tabla.
async function cargarGastos() {
  const respuesta = await fetch('/api/gastos');
  const gastos = await respuesta.json();

  const lista = document.getElementById('lista');
  let total = 0;

  for (const gasto of gastos) {
    // Una fila (tr) por gasto, con una celda (td) por dato.
    const fila = document.createElement('tr');
    const datos = [gasto.fecha, gasto.descripcion, gasto.categoria, '$ ' + gasto.monto];

    for (const dato of datos) {
      const celda = document.createElement('td');
      celda.textContent = dato; // textContent: el texto se muestra tal cual, no como HTML
      fila.appendChild(celda);
    }

    lista.appendChild(fila);
    total = total + gasto.monto;
  }

  document.getElementById('total').textContent = '$ ' + total;
}

cargarGastos();
