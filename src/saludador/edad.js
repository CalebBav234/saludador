export function clasificarEdad(edad, genero, idioma, diccionario) {
  if (edad < 18) return diccionario[idioma].joven;
  if (edad < 40) return genero === "femenino" ? diccionario[idioma].adulta : diccionario[idioma].adulto;
  return genero === "femenino" ? diccionario[idioma].mayor_f : diccionario[idioma].mayor;
}