import React, { useState } from "react";

export default function Settings() {
  const [currency, setCurrency] = useState("COL$");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="card">
      <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>Ajustes de la Aplicación</h2>
      <p style={{ color: "#6b7280", marginBottom: "20px", fontSize: "14px" }}>
        Configura tus preferencias generales de usuario.
      </p>

      {/* Selector de Moneda */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "14px" }}>
          Moneda Principal:
        </label>
        <select
          className="input-field"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="COL$">Peso Colombiano (COL$)</option>
          <option value="USD">Dólar Estadounidense (USD $)</option>
          <option value="EUR">Euro (€)</option>
        </select>
      </div>

      {/* Interruptor de Notificaciones */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "10px 0",
          borderTop: "1px solid #f3f4f6",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <div>
          <strong style={{ fontSize: "14px", display: "block" }}>Notificaciones y Alertas</strong>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>
            Recibir avisos de pagos pendientes y recordatorios
          </span>
        </div>
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />
      </div>

      {/* Botón de Limpieza / Reset */}
      <div style={{ marginTop: "30px" }}>
        <button
          className="btn"
          style={{ backgroundColor: "#ef4444", color: "white", width: "100%" }}
          onClick={() => alert("Restablecimiento de demostración completado.")}
        >
          Limpiar Datos de Prueba
        </button>
      </div>
    </div>
  );
}
