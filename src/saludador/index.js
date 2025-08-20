import { saludos } from './idiomas.js';
import { clasificarEdad } from './edad.js';
import { obtenerUbicacion } from './ubicacion.js';

export async function saludar({ nombre, edad, genero, idioma, hora }) {
  const dic = saludos[idioma] || saludos["es"];
  const saludoHora = hora.getHours() < 12
    ? dic.mañana
    : hora.getHours() < 18
    ? dic.tarde
    : dic.noche;

  const tituloEdad = clasificarEdad(edad, genero, idioma, saludos);
  const ubicacion = await obtenerUbicacion(idioma);

  return `${saludoHora}, ${tituloEdad} ${nombre}. ${ubicacion}`;
}
