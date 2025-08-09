// Import Dependencies
import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import NavbarTailux from "../components/NavbarTailux";

// ----------------------------------------------------------------------

export default function TailuxNavbarAdapter({ links }) {
  const { tienePermiso, logout } = useAuth();

  // Filtrar los links según los permisos del usuario
  const filteredLinks = links.filter((link) => tienePermiso(link.modulo));

  return <NavbarTailux links={filteredLinks} onLogout={logout} />;
}

TailuxNavbarAdapter.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      modulo: PropTypes.string.isRequired,
    })
  ).isRequired,
};
