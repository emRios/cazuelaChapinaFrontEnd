export const obtenerInventario = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("/inventario", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("No se pudo cargar el inventario");
  return await response.json();
};
