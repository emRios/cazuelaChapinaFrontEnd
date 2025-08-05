
// src/features/combos/Combos.jsx
import { useCombos } from "./useCombos";

const Combos = ({ onAdd }) => {
  const { combos, cargando, error } = useCombos();

  const handleAdd = (combo) => {
    const item = {
      tipo: "combo",
      nombre: combo.nombre,
      cantidad: 1,
      descripcion: combo.descripcion,
      tamales: combo.tamales,
      bebidas: combo.bebidas,
      regalo: combo.regalo || null,
    };
    onAdd(item);
  };

  if (cargando) return <p className="text-center mt-10 text-gray-500">Cargando combos...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error al cargar combos</p>;

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Combos disponibles</h2>
      <ul className="space-y-4">
        {combos.map((combo) => (
          <li key={combo.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-bold text-orange-700">{combo.nombre}</h3>
            <p className="text-sm text-gray-700 mb-2">{combo.descripcion}</p>
            <button
              onClick={() => handleAdd(combo)}
              className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded text-sm"
            >
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Combos;

