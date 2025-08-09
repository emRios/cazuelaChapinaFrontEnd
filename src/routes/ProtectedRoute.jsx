// Import Dependencies
import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ----------------------------------------------------------------------

export default function ProtectedRoute({ modulo, element }) {
  const { token, tienePermiso } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!tienePermiso(modulo)) {
    return <Navigate to="/" replace />;
  }

  return element;
}

ProtectedRoute.propTypes = {
  modulo: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired,
};
