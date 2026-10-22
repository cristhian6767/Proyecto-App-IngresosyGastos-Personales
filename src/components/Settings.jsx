import React, { useState } from "react";

export default function Settings() {
  const [currency, setCurrency] = useState("COP");
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Perfil del Usuario */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px", color: "var(--text-primary)" }}>
          👤 Perfil del Usuario
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginBottom: "16px" }}>
          Información de la sesión activa en el sistema.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "var(--accent-emerald)",
              color: "#022c22",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            CD
          </div>
          <div>
            <span style={{ display: "block", color: "var(--text-primary)", fontWeight: "600", fontSize: "15px" }}>
              Usuario Demo (Invitado)
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              ID: invitado_demo
            </span>
          </div>
        </div>
      </div>

      {/* Preferencias Generales */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px", color: "var(--text-primary)" }}>
          ⚙️ Preferencias del Sistema
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginBottom: "16px" }}>
          Personaliza la visualización y comportamiento de la aplicación.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>
              Moneda Principal
            </label>
            <select
              className="input-field"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="COP">Peso Colombiano ($ COP)</option>
              <option value="USD">Dólar Estadounidense ($ USD)</option>
              <option value="EUR">Euro (€ EUR)</option>
              <option value="MXN">Peso Mexicano ($ MXN)</option>
            </select>
          </div>

          {/* Tema Visual Desplegable */}
          <div>
            <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>
              Tema Visual
            </label>
            <select
              className="input-field"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="dark">Dark Emerald & Slate (Predeterminado)</option>
              <option value="midnight">Midnight Blue (Oscuro Profesional)</option>
              <option value="light">Light Minimalist (Claro Ejecutivo)</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px" }}>
            <div>
              <span style={{ display: "block", fontSize: "14px", color: "var(--text-primary)" }}>
                Notificaciones de Recordatorios
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Alertas en pantalla sobre pagos pendientes
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px" }}>
            <div>
              <span style={{ display: "block", fontSize: "14px", color: "var(--text-primary)" }}>
                Efectos de Sonido
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Sonido de confirmación al registrar movimientos
              </span>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* Información del Proyecto */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px", color: "var(--text-primary)" }}>
          ℹ️ Información de la App
        </h2>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
          <p style={{ margin: 0 }}><strong>Proyecto:</strong> Gestor de Gastos y Finanzas Personales</p>
          <p style={{ margin: 0 }}><strong>Versión:</strong> 1.0.0 (Release Candidate)</p>
          <p style={{ margin: 0 }}><strong>Estado Firestore:</strong> Conectado y Sincronizado</p>
        </div>
      </div>
    </div>
  );
}
