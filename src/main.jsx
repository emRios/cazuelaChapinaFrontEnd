// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./styles/main.css";
import "./styles/tailux.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import './index.css'; // o como hayas llamado tu archivo de estilos


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
