// src/features/pedidos/pedidosApi.js

/**
 * Realiza el POST para registrar un pedido en el backend vía API Gateway.
 * Recupera el token JWT directamente desde localStorage.
 * @param {Object} pedido 
 * @returns {Promise<Object>} 
 * @throws {Error} 
 */
export async function registrarPedidoApi(pedido) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Sesión no válida. Por favor inicia sesión.");
  }

  const response = await fetch("http://localhost:9000/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(pedido),
  });

  if (!response.ok) {
    let errorMsg = "Error desconocido al registrar pedido";
    if (response.status === 401) errorMsg = "No autorizado. Tu sesión ha expirado.";
    if (response.status === 403) errorMsg = "No tienes permisos para registrar pedidos.";
    if (response.status === 500) errorMsg = "Error interno del servidor.";
    try {
      const errorData = await response.json();
      if (errorData.message) errorMsg = errorData.message;
    } catch {}
    throw new Error(errorMsg);
  }

  return await response.json();
}
