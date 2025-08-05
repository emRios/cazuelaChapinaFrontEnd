// src/features/auth/authApi.js
import axios from "axios";

const API_URL = "http://localhost:9000/login";

export const loginUsuario = async (email, password) => {
  const response = await axios.post(API_URL, {
    email,
    password,
  });

  return response.data; 
};
