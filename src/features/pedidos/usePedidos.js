import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { registrarPedidoApi } from "./pedidosApi";

export function usePedidos() {
  const { usuario } = useAuth();

  const obtenerEmailUsuario = () => {
    if (!usuario) return null;
    return usuario.email || usuario.sub || null;
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const [data, setData] = useState(null);

  async function registrarPedido(items) {
    console.log("registrarPedido ejecutado con items:", items);
    setLoading(true);
    setError(null);
    setExito(false);
    setData(null);

    try {
      const emailUsuario = obtenerEmailUsuario();
      if (!emailUsuario) {
        throw new Error("No se pudo identificar al usuario. Por favor inicia sesión.");
      }
      if (!items || items.length === 0) {
        throw new Error("El carrito está vacío. Agrega productos antes de confirmar el pedido.");
      }

      const pedido = {
        usuarioEmail: emailUsuario,
        items,
      };
      console.log("ANTES DE LLAMAR registrarPedidoApi", pedido);

      const respuesta = await registrarPedidoApi(pedido);

      console.log("DESPUÉS DE LLAMAR registrarPedidoApi, respuesta:", respuesta);
      setData(respuesta);
      setExito(true);
    } catch (err) {
      setError(err.message || "Error al registrar el pedido");
      console.error("Error en registrarPedido:", err);
    } finally {
      setLoading(false);
    }
  }

  return {
    registrarPedido,
    loading,
    error,
    exito,
    data,
  };
}
