import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useDashboard } from "./useDashboard";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const Card = ({ title, value, color = "gray" }) => (
  <div className={`flex-1 p-4 rounded-xl shadow-md border-t-4 border-${color}-500 bg-white text-center`}>
    <h3 className="text-sm text-gray-500 mb-2 font-medium">{title}</h3>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
  </div>
);

const Dashboard = () => {
  const { token, tienePermiso } = useAuth();
  const { data, error, loading } = useDashboard(token);

  if (!tienePermiso("dashboard")) return <Navigate to="/" replace />;
  if (error) return <p className="text-red-500 text-center mt-10">Error al cargar datos del dashboard.</p>;
  if (loading || !data) return <p className="text-center mt-10 text-gray-500">Cargando datos...</p>;

  const COLORS = ["#EF4444", "#10B981"];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-700 mb-8 text-center">📊 Análisis de Rentabilidad</h2>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card title="Eventos realizados" value={data.eventosRealizados ?? 0} />
        <Card title="Ingresos totales" value={`Q${(data.ingresosTotales ?? 0).toLocaleString()}`} color="blue" />
        <Card title="Gastos totales" value={`Q${(data.gastosTotales ?? 0).toLocaleString()}`} color="red" />
        <Card title="Margen de beneficio" value={`Q${(data.margenBeneficio ?? 0).toLocaleString()}`} color="green" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Distribución de costos */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribución total de los costos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.distribucionCostos || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Relación gasto / beneficio */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Relación gastos / beneficio</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.relacionGastoUtilidad || []}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
              >
                {(data.relacionGastoUtilidad || []).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-gray-600 italic">
        Utiliza esta vista para analizar fácilmente el beneficio de tus productos y optimizar tu operación.
      </p>
    </div>
  );
};

export default Dashboard;
