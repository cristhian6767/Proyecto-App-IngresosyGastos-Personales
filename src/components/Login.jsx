import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Generar un ID basado en el correo o un usuario estándar
    const userId = email.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    onLogin({ email, userId });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-main)",
        padding: "16px",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "32px 24px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>💼</div>
          <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Gestor de Gastos</h2>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px" }}>
            Ingresa a tu panel de control financiero
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "6px",
                color: "var(--text-secondary)",
              }}
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "6px",
                color: "var(--text-secondary)",
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: "14px" }}>
            Iniciar Sesión
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Acceso demo habilitado para cualquier correo
          </span>
        </div>
      </div>
    </div>
  );
}