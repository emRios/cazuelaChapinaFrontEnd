// src/features/combos/useCombos.js
import { useEffect, useState } from "react";
import { obtenerCombosPublicos } from "./combosApi";

export const useCombos = () => {
  const [combos, setCombos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await obtenerCombosPublicos();
        setCombos(datos);
      } catch (err) {
        setError(true);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  return { combos, cargando, error };
};
