import React from "react";

export default function Settings() {
  return (
    <div className="card">
      <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>Ajustes de la Cuenta</h2>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "16px" }}>
        Gestiona la configuración general de tu panel.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>
            Moneda Principal
          </label>
          <select className="input-field" defaultValue="COP">
            <option value="COP">Peso Colombiano (COL$)</option>
            <option value="USD">Dólar Estadounidense ($ USD)</option>
            <option value="EUR">Euro (€ EUR)</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>
            Modo Oscuro
          </label>
          <input type="text" className="input-field" value="Dark Emerald / Slate (Activado)" disabled />
        </div>
      </div>
    </div>
  );
}
