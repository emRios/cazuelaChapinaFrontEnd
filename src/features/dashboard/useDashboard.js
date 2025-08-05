import { useState, useEffect } from "react";
import { obtenerMetricasDashboard } from "./dashboardApi";

export const useDashboard = (token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const resultado = await obtenerMetricasDashboard(token);
        setData(resultado);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [token]);

  return { data, error, loading };
};
