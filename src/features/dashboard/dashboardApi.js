// src/api/dashboardApi.js

export const obtenerMetricasDashboard = async () => {
  const response = await fetch("/data/dashboardMock.json");

  if (!response.ok) {
    throw new Error("No se pudo cargar el archivo de métricas");
  }

  return await response.json();
};
