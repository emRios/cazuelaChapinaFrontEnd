import { useInventario } from "./useInventario";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const Inventario = () => {
  const { tienePermiso } = useAuth();
  const { insumos, error, loading } = useInventario();

  if (!tienePermiso("inventario")) return <Navigate to="/" replace />;
  if (error) return <p className="text-red-500 text-center mt-10">Error cargando inventario.</p>;
  if (loading) return <p className="text-center mt-10 text-gray-500">Cargando...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-orange-700 mb-6">📦 Inventario de Insumos</h2>

      <table className="w-full text-sm text-left bg-white shadow rounded">
        <thead className="bg-orange-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Mínimo</th>
            <th className="px-4 py-2">Merma</th>
            <th className="px-4 py-2">Unidad</th>
            <th className="px-4 py-2">Costo</th>
            <th className="px-4 py-2">⚠</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map((item) => (
            <tr key={item.id} className="border-t hover:bg-orange-50">
              <td className="px-4 py-2">{item.nombre}</td>
              <td className="px-4 py-2">{item.tipo}</td>
              <td className="px-4 py-2">{item.stock}</td>
              <td className="px-4 py-2">{item.minimo}</td>
              <td className="px-4 py-2">{item.merma}</td>
              <td className="px-4 py-2">{item.unidad}</td>
              <td className="px-4 py-2"> Q{(item.costo_unitario ?? 0).toFixed(2)}</td>
              <td className="px-4 py-2 text-red-500 font-bold">
                {item.stock <= item.minimo ? "🔒" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventario;
