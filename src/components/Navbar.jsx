import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { tienePermiso, logout, usuario } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <h1 className="navbar-title">
          La Cazuela Chapina
        </h1>
        <div className="navbar-row">
          <nav className="navbar-nav">
            {tienePermiso("inicio") && (
              <Link to="/" className="navbar-link">🏠 Inicio</Link>
            )}
            {tienePermiso("personalizar") && (
              <Link to="/personalizar" className="navbar-link">🛠️ Personalizar</Link>
            )}
            {tienePermiso("combos") && (
              <Link to="/combos" className="navbar-link">🎁 Combos</Link>
            )}
            {tienePermiso("carrito") && (
              <Link to="/carrito" className="navbar-link">🛒 Carrito</Link>
            )}
            {tienePermiso("inventario") && (
              <Link to="/inventario" className="navbar-link">📦 Inventario</Link>
            )}
            {tienePermiso("dashboard") && (
              <Link to="/dashboard" className="navbar-link">📊 Dashboard</Link>
            )}
            {tienePermiso("pedidos") && (
              <Link to="/pedidos" className="navbar-link">🧾 Pedidos</Link>
            )}
          </nav>
          {usuario && (
            <button
              onClick={handleLogout}
              className="navbar-logout"
            >
              🚪 Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
