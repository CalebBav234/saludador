const frasesPorIdioma = {
  es: ({ ciudad, pais }) => `Estás en ${ciudad}, ${pais}.`,
  en: ({ ciudad, pais }) => `You are in ${ciudad}, ${pais}.`,
  fr: ({ ciudad, pais }) => `Vous êtes à ${ciudad}, ${pais}.`,
  de: ({ ciudad, pais }) => `Du bist in ${ciudad}, ${pais}.`,
  pt: ({ ciudad, pais }) => `Você está em ${ciudad}, ${pais}.`,
  it: ({ ciudad, pais }) => `Sei a ${ciudad}, ${pais}.`
};

const fallbackPorIdioma = {
  es: "Ubicación desconocida.",
  en: "Unknown location.",
  fr: "Emplacement inconnu.",
  de: "Unbekannter Ort.",
  pt: "Localização desconhecida.",
  it: "Posizione sconosciuta."
};

async function fetchFromIpapi() {
  const res = await fetch("https://ipapi.co/json/");
  if (!res.ok) throw new Error("ipapi failed");
  return res.json();
}

async function fetchFromIpwhois() {
  const res = await fetch("https://ipwho.is/");
  if (!res.ok) throw new Error("ipwho.is failed");
  return res.json();
}

export async function obtenerUbicacion(idioma = "es") {
  try {
    
    let data;
    try {
      data = await fetchFromIpapi();
    } catch {

      data = await fetchFromIpwhois();
    }

    const ciudad = data.city?.trim() || "—";
    const paisCodigo = data.country_code?.trim() || data.country?.trim();


    let pais;
    if (paisCodigo) {
      const countryDisplay = new Intl.DisplayNames([idioma], { type: "region" });
      pais = countryDisplay.of(paisCodigo);
    } else {
      pais = "—";
    }

    const fraseFn = frasesPorIdioma[idioma] || frasesPorIdioma["es"];
    return fraseFn({ ciudad, pais });
  } catch {
    return fallbackPorIdioma[idioma] || fallbackPorIdioma["es"];
  }
}

