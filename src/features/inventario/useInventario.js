import { useEffect, useState } from "react";
import { obtenerInventario } from "./inventarioApi";

export const useInventario = () => {
  const [insumos, setInsumos] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await obtenerInventario();
        setInsumos(datos);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  return { insumos, error, loading };
};
