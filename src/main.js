import { saludar } from './saludador/index.js';

document.getElementById('formulario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const edad = parseInt(document.getElementById('edad').value, 10);
  const genero = document.getElementById('genero').value;
  const idioma = document.getElementById('idioma').value;
  const hora = new Date();

  const mensaje = await saludar({ nombre, edad, genero, idioma, hora });
  document.getElementById('saludo').textContent = mensaje;
});