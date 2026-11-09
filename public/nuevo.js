// Si el servidor nos redirigió con un error (/nuevo?error=...), lo mostramos.
const parametros = new URLSearchParams(window.location.search);
const error = parametros.get('error');

if (error) {
  document.getElementById('error').textContent = error;
}
