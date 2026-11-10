// Script del cliente (se carga desde vistas/nuevo.html).
// No se ejecuta con node: la app se abre en el navegador en http://localhost:3000/nuevo (npm start).
// Si el servidor nos redirigió con un error (/nuevo?error=...), lo mostramos.
const parametros = new URLSearchParams(window.location.search);
const error = parametros.get('error');

if (error) {
  document.getElementById('error').textContent = error;
}
