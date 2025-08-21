
import { clasificarEdad } from '../saludador/edad.js';
import { saludos } from '../saludador/idiomas.js';
import { obtenerUbicacion } from '../saludador/ubicacion.js';
import { saludar } from '../saludador/index.js';

jest.mock('../saludador/ubicacion.js', () => ({
  obtenerUbicacion: jest.fn((idioma) => {
    if (idioma === "es") return Promise.resolve("Estás en Cochabamba, Bolivia.");
    if (idioma === "de") return Promise.resolve("Du bist in Cochabamba, Bolivien.");
    if (idioma === "fr") return Promise.resolve("Vous êtes à Cochabamba, Bolivie.");
    return Promise.resolve("You are in Cochabamba, Bolivia.");
  })
}));

//1. Saludo por la tarde en francés
test('Saludo por la tarde en francés', () => {
  const hora = new Date('2025-08-21T15:00:00');
  const saludo = hora.getHours() < 12
    ? saludos.fr.mañana
    : hora.getHours() < 18
    ? saludos.fr.tarde
    : saludos.fr.noche;

  expect(saludo).toBe("Bon après-midi");
});

//2. Clasificación de edad como señor en español
test('Clasifica como señor en español', () => {
  const resultado = clasificarEdad(30, "masculino", "es", saludos);
  expect(resultado).toBe("señor");
});

//3. Ubicación en inglés
test('Ubicación en inglés', async () => {
  const resultado = await obtenerUbicacion("en");
  expect(resultado).toBe("You are in Cochabamba, Bolivia.");
});

//4. Saludo completo en alemán
test('Saludo completo en alemán', async () => {
  const resultado = await saludar({
    nombre: "Caleb",
    edad: 65,
    genero: "masculino",
    idioma: "de",
    hora: new Date('2025-08-21T10:30:00')
  });

  expect(resultado).toBe("Guten Morgen, älterer Herr Caleb. Du bist in Cochabamba, Bolivien.");
});

//5. Saludo completo en inglés
test('Saludo completo en inglés', async () => {
  const resultado = await saludar({
    nombre: "Caleb",
    edad: 21,
    genero: "masculino",
    idioma: "en",
    hora: new Date('2025-08-21T13:17:00')
  });

  expect(resultado).toBe("Good afternoon, sir Caleb. You are in Cochabamba, Bolivia.");
});

//6. Saludo completo en español para joven mujer
test('Saludo completo en español para joven mujer', async () => {
  const resultado = await saludar({
    nombre: "Lucía",
    edad: 19,
    genero: "femenino",
    idioma: "es",
    hora: new Date('2025-08-21T13:19:00')
  });

  expect(resultado).toBe("Buenas tardes, señora Lucía. Estás en Cochabamba, Bolivia.");
});