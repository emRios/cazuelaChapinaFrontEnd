// src/api/usuarioApi.js
// src/api/usuarioApi.js

export async function obtenerUsuarioPorEmail(email) {
  const response = await fetch("http://localhost:9000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return {
    email: data.email,
    rol: data.rol,
    modulos: data.modulos,
    token: data.token
  };
}
