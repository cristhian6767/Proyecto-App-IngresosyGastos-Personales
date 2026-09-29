import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, onClose, currentTab, setCurrentTab, balance }) {
  const { user, logout } = useAuth();

  // Obtener la inicial del usuario o email
  const initial = user?.email ? user.email.charAt(0).toUpperCase() : "U";
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Usuario";

  // Formatear el balance a pesos colombianos
  const formattedBalance = new Intl.NumberFormat("es-CO").format(balance || 0);

  const menuItems = [
    { id: "inicio", label: "Inicio", icon: "🔄" },
    { id: "cuentas", label: "Cuentas", icon: "💰" },
    { id: "graficos", label: "Gráficos", icon: "📊" },
    { id: "categorias", label: "Categorías", icon: "📋" },
    { id: "pagos", label: "Pagos habituales", icon: "💸" },
    { id: "recordatorios", label: "Recordatorios", icon: "🔔" },
    { id: "ajustes", label: "Ajustes", icon: "⚙️" },
  ];

  return (
    <>
      {/* Fondo oscuro traslúcido para cerrar al hacer clic afuera */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Cabecera del Usuario */}
        <div className="sidebar-header">
          <div className="avatar">{initial}</div>
          <div className="user-info">
            <h3>{displayName}</h3>
            <p className="user-balance">Balance: {formattedBalance} COL$</p>
          </div>
        </div>

        {/* Opciones del Menú */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentTab === item.id ? "active" : ""}`}
              onClick={() => {
                setCurrentTab(item.id);
                onClose();
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}

          <hr className="sidebar-divider" />

          <button className="nav-item" onClick={logout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Cerrar Sesión</span>
          </button>
        </nav>
      </aside>
    </>
  );
}