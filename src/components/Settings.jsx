import React, { useState } from "react";

export default function Settings() {
  const [userName, setUserName] = useState("Cristhian Alvarez");
  const [currency, setCurrency] = useState("COP");
  const [monthlyBudget, setMonthlyBudget] = useState("1500000");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [theme, setTheme] = useState("emerald");
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Preferencias guardadas correctamente.");
  };

  const handleExportData = (format) => {
    alert(`Exportando datos en formato ${format.toUpperCase()}...`);
  };

  const handleResetCategories = () => {
    if (window.confirm("¿Seguro que deseas restablecer las categorías a las predeterminadas?")) {
      localStorage.removeItem("app_categories");
      window.location.reload();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. Perfil del Usuario */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px", color: "var(--text-primary)" }}>
          👤 Perfil del Usuario
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "14px" }}>
          Información básica de tu cuenta ejecutiva.
        </p>

        <form onSubmit={handleSaveProfile}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
              Nombre Comercial / Usuario
            </label>
            <input
              type="text"
              className="input-field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                Moneda Principal
              </label>
              <select className="input-field" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="COP">Peso Colombiano (COL$)</option>
                <option value="USD">Dólar Estadounidense ($ USD)</option>
                <option value="EUR">Euro (€ EUR)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                Formato de Fecha
              </label>
              <select className="input-field" value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
                <option value="DD/MM/YYYY">DD / MM / AAAA</option>
                <option value="YYYY-MM-DD">AAAA - MM - DD</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* 2. Control de Presupuesto */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px", color: "var(--text-primary)" }}>
          🎯 Meta y Presupuesto Mensual
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "14px" }}>
          Establece un tope de gastos sugerido para control financiero.
        </p>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
            Límite de Gasto Mensual (COL$)
          </label>
          <input
            type="number"
            className="input-field"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            placeholder="Ej. 2000000"
          />
        </div>
      </div>

      {/* 3. Notificaciones y Alertas */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px", color: "var(--text-primary)" }}>
          🔔 Notificaciones y Sistema
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "14px" }}>
          Configura tus avisos de pagos fijos y recordatorios.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong style={{ fontSize: "14px", display: "block", color: "var(--text-primary)" }}>
                Alertas de Vencimiento
              </strong>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Notificar sobre pagos recurrentes y recordatorios próximos
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "12px",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            <div>
              <strong style={{ fontSize: "14px", display: "block", color: "var(--text-primary)" }}>
                Resumen Semanal por Correo
              </strong>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Enviar informe de balance al correo registrado
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* 4. Exportación y Respaldo de Datos */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px", color: "var(--text-primary)" }}>
          💾 Copia de Seguridad y Datos
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "14px" }}>
          Descarga o restablece la configuración de tu aplicación.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <button
            type="button"
            className="btn btn-inactive"
            onClick={() => handleExportData("csv")}
          >
            📄 Exportar a CSV
          </button>
          <button
            type="button"
            className="btn btn-inactive"
            onClick={() => handleExportData("json")}
          >
            📦 Exportar a JSON
          </button>
        </div>

        <button
          type="button"
          className="btn"
          style={{ backgroundColor: "rgba(244, 63, 94, 0.2)", color: "#f43f5e", border: "1px solid #f43f5e" }}
          onClick={handleResetCategories}
        >
          ⚠️ Restablecer Categorías Predeterminadas
        </button>
      </div>
    </div>
  );
}
