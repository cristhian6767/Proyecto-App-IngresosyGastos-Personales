import React from "react";

export default function Sidebar({ isOpen, onClose, currentTab, setCurrentTab, balance }) {
  const navItems = [
    { id: "inicio", label: "Inicio", icon: "📊" },
    { id: "cuentas", label: "Cuentas", icon: "💳" },
    { id: "graficos", label: "Gráficos", icon: "📈" },
    { id: "pagos", label: "Pagos Habituales", icon: "🔄" },
    { id: "recordatorios", label: "Recordatorios", icon: "🔔" },
    { id: "ajustes", label: "Ajustes", icon: "⚙️" },
  ];

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      {/* Fondo oscuro al abrir menú en móviles */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 40,
          }}
        />
      )}

      <aside
        style={{
          width: "260px",
          backgroundColor: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          minHeight: "100vh",
          zIndex: 50,
          /* Mostrar siempre en pantallas medianas/grandes, en móvil dependerá de isOpen */
          position: window.innerWidth <= 768 ? "fixed" : "sticky",
          top: 0,
          left: 0,
          transform: window.innerWidth <= 768 && !isOpen ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.3s ease",
        }}
      >
        <div style={{ marginBottom: "32px", paddingLeft: "8px" }}>
          <h2 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: "700" }}>
            FINANZAS DEMO
          </h2>
          <span style={{ fontSize: "12px", color: "var(--accent-emerald)", fontWeight: "600" }}>
            Balance: {formatMoney(balance)}
          </span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: isActive ? "var(--bg-card)" : "transparent",
                  color: isActive ? "var(--accent-emerald)" : "var(--text-secondary)",
                  fontWeight: isActive ? "600" : "400",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  borderLeft: isActive ? "3px solid var(--accent-emerald)" : "3px solid transparent",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
