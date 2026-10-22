import React, { useState, useEffect } from "react";

export default function Settings() {
  const [currency, setCurrency] = useState("COP");
  
  // Leer tema guardado o usar 'dark' por defecto
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app_theme") || "dark";
  });

  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Cambiar las variables CSS en tiempo real al seleccionar un tema
  useEffect(() => {
    localStorage.setItem("app_theme", theme);
    const root = document.documentElement;

    if (theme === "midnight") {
      // Midnight Blue (Azul Profundo)
      root.style.setProperty("--bg-main", "#0f172a");
      root.style.setProperty("--bg-sidebar", "#1e293b");
      root.style.setProperty("--bg-card", "#1e293b");
      root.style.setProperty("--bg-input", "#0f172a");
      root.style.setProperty("--text-primary", "#f8fafc");
      root.style.setProperty("--text-secondary", "#94a3b8");
    } else if (theme === "light") {
      // Light Minimalist (Claro Ejecutivo)
      root.style.setProperty("--bg-main", "#f8fafc");
      root.style.setProperty("--bg-sidebar", "#ffffff");
      root.style.setProperty("--bg-card", "#ffffff");
      root.style.setProperty("--bg-input", "#f1f5f9");
      root.style.setProperty("--text-primary", "#0f172a");
      root.style.setProperty("--text-secondary", "#64748b");
    } else {
      // Dark Emerald & Slate (Predeterminado)
      root.style.setProperty("--bg-main", "#0b0f19");
      root.style.setProperty("--bg-sidebar", "#111827");
      root.style.setProperty("--bg-card", "#1f2937");
      root.style.setProperty("--bg-input", "#111827");
      root.style.setProperty("--text-primary", "#f9fafb");
      root.style.setProperty("--text-secondary", "#9ca3af");
    }
  }, [theme]);

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

          {/* Selector de Tema Visual interactivo */}
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
