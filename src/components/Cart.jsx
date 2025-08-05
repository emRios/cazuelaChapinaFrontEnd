
const Cart = ({ items, onRemove, onConfirm }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Carrito</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No hay productos en el carrito.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-3 border rounded flex justify-between items-start"
            >
              <div className="flex-1 pr-4">
                {item.tipo === "tamal" ? (
                  <>
                    <p className="font-semibold">{item.cantidad} tamal(es)</p>
                    <p className="text-sm text-gray-600">
                      Masa: {item.masa}, Relleno: {item.relleno}, Envoltura:{" "}
                      {item.envoltura}, Picante: {item.picante}
                    </p>
                  </>
                ) : item.tipo === "bebida" ? (
                  <>
                    <p className="font-semibold">{item.cantidad} bebida(s)</p>
                    <p className="text-sm text-gray-600">
                      Tamaño: {item.tamanio}, Tipo: {item.bebida}, Endulzante: {item.endulzante}, Topping: {item.topping}
                    </p>
                  </>
                ) : item.tipo === "combo" ? (
                  <>
                    <p className="font-semibold">{item.cantidad} combo(s): {item.nombre}</p>
                    <p className="text-sm text-gray-600">{item.descripcion}</p>
                  </>
                ) : (
                  <p className="text-sm text-red-500">Tipo desconocido</p>
                )}
              </div>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:underline text-sm"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              console.log("Botón Confirmar pedido presionado");
              onConfirm && onConfirm();
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirmar pedido
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;