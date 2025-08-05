import { createContext, useContext, useState } from "react";


const AuthContext = createContext();


function decodeJWT(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = atob(payloadBase64);
    return JSON.parse(decodedJson);
  } catch (e) {
    console.error("Error al decodificar JWT:", e);
    return null;
  }
}


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(() => {
    try {
      return token ? decodeJWT(token) : null;
    } catch {
      return null;
    }
  });

  const login = (nuevoToken) => {
    localStorage.setItem("token", nuevoToken);
    setToken(nuevoToken);
    setUsuario(decodeJWT(nuevoToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsuario(null);
  };

  const tienePermiso = (modulo) => {
    if (!usuario?.modulos) return false;
    return usuario.modulos.includes(modulo);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout, tienePermiso }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
