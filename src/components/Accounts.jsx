import React, { useState, useEffect } from "react";

export default function Accounts({ balance = 0 }) {
  const DEFAULT_ACCOUNTS = [
    { id: "1", name: "Cuenta Principal / Banco", type: "Debito", color: "#10b981" },
    { id: "2", name: "Efectivo", type: "Efectivo", color: "#f59e0b" },
  ];

  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem("app_accounts");
    return saved ? JSON.parse(saved) : DEFAULT_ACCOUNTS;
  });

  const [name, setName] = useState("");
  const [type, setType] = useState("Debito");

  useEffect(() => {
    localStorage.setItem("app_accounts", JSON.stringify(accounts));
  }, [accounts]);

  const handleAddAccount = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAcc = {
      id: Date.now().toString(),
      name: name.trim(),
      type,
      color: type === "Debito" ? "#10b981" : "#f59e0b",
    };

    setAccounts([...accounts, newAcc]);
    setName("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>💳 Mis Cuentas</h2>
        <p style={{ fontSize: "14px", marginBottom: "16px" }}>
          Saldo global acumulado: <strong>${balance.toLocaleString()}</strong>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
          {accounts.map((acc) => (
            <div
              key={acc.id}
              style={{
                padding: "16px",
                backgroundColor: "var(--bg-input)",
                borderRadius: "8px",
                borderLeft: `5px solid ${acc.color}`,
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: "bold", display: "block" }}>
                {acc.name}
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Tipo: {acc.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Añadir Nueva Cuenta</h3>
        <form onSubmit={handleAddAccount}>
          <input
            type="text"
            className="input-field"
            placeholder="Nombre de la cuenta (ej. Nequi, Ahorros)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            className="input-field"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Debito">Débito / Banco</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Credito">Tarjeta de Crédito</option>
          </select>
          <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
            Guardar Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
