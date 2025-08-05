// src/features/combos/combosApi.js
const API_URL = "http://localhost:14679/api/combos";

export const obtenerCombosPublicos = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener combos públicos");
  return res.json();
};
