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

export async function loginUsuario(email, password) {
  const response = await fetch("http://localhost:9000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  const data = await response.json();
  return {
    email: data.email,
    rol: data.rol,
    modulos: data.modulos,
    token: data.token
  };
}
