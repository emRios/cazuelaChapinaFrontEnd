// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import TamalSelector from "./components/TamalSelector";
import BebidaSelector from "./components/BebidaSelector";
import Cart from "./components/Cart";
import Dashboard from "./features/dashboard/Dashboard";
import Inventario from "./features/inventario/Inventario";
import Login from "./features/auth/Login";
import Combos from "./features/combos/Combos"; 
import { AppLayout } from "./ui/tailux/layouts/AppLayout";
import MainLayout from "./ui/tailux/layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import { usePedidos } from "./features/pedidos/usePedidos"; 

function App() {
  const [carrito, setCarrito] = useState([]);

  // 🛒 Lógica de pedidos
  const { registrarPedido, loading, error, exito } = usePedidos();

  const agregarAlCarrito = (item) => {
    setCarrito((prev) => [...prev, item]);
  };

  const removerItem = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const confirmarPedido = async () => {
    console.log("Función confirmarPedido ejecutada");
    if (carrito.length === 0) return;
    await registrarPedido(carrito);
    // Limpia carrito solo si éxito
     if (exito) setCarrito([]);
  };

  useEffect(() => { if (exito) setCarrito([]); }, [exito]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800 pt-[180px]">
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <div className="flex items-center justify-center min-h-[calc(100vh-180px)] px-4">
                <div className="max-w-xl text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Tamales y bebidas guatemaltecas, personalízalos a tu gusto o elige un combo.
                  </h2>
                </div>
              </div>
            }
          />

          <Route
            path="/personalizar"
            element={
              <MainLayout>
                <div className="flex items-center justify-center min-h-[calc(100vh-180px)] px-4">
                  <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
                    <TamalSelector onAdd={agregarAlCarrito} />
                    <BebidaSelector onAdd={agregarAlCarrito} />
                  </div>
                </div>
              </MainLayout>
            }
          />

          <Route
            path="/combos"
            element={
              <MainLayout>
                <Combos onAdd={agregarAlCarrito} />
              </MainLayout>
            }
          />

          <Route
            path="/carrito"
            element={
              <MainLayout>
                <div className="max-w-xl mx-auto p-6">
                  <Cart
                    items={carrito}
                    onRemove={removerItem}
                    onConfirm={confirmarPedido}
                  />

                  {/* Feedback de registro de pedido */}
                  {loading && <p className="text-blue-600 mt-2">Registrando pedido...</p>}
                  {error && <p className="text-red-600 mt-2">{error}</p>}
                  {exito && (
                    <p className="text-green-600 mt-2">
                      ¡Pedido registrado con éxito!
                    </p>
                  )}
                </div>
              </MainLayout>
            }
          />

          <Route
            path="/inventario"
            element={
              <ProtectedRoute
                modulo="inventario"
                element={
                  <MainLayout>
                    <Inventario />
                  </MainLayout>
                }
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                modulo="dashboard"
                element={
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                }
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

