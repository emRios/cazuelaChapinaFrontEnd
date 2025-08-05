// src/features/auth/Login.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "./authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const user = await loginUsuario(email, password);

      login(user.token); 

      if (user.modulos.includes("dashboard")) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas o error de conexión.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-700">
          Iniciar Sesión
        </h2>

        <label className="block mb-2 text-sm font-medium">Correo:</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@cazuela.com"
          required
        />

        <label className="block mb-2 text-sm font-medium">Contraseña:</label>
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;

