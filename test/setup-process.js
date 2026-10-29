// Se carga antes que las pruebas (ver karma.conf.cjs).
// Algunas librerías leen "process.env" y en el navegador no existe.
window.process = window.process || { env: {}, versions: {} }
