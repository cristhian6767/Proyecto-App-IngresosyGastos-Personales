import React, { useState } from "react";

export default function Accounts({ balance }) {
  // Cuentas por defecto
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Efectivo", type: "Efectivo", icon: "💵", amount: balance * 0.4 },
    { id: 2, name: "Cuenta de Ahorros / Nequi", type: "Banco", icon: "🏦", amount: balance * 0.6 },
  ]);

  const [name, setName] = useState("");
  const [type, setType] = useState("Banco");
  const [amount, setAmount] = useState("");

  const handleAddAccount = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    const newAccount = {
      id: Date.now(),
      name,
      type,
      icon: type === "Banco" ? "🏦" : type === "Tarjeta" ? "💳" : "💵",
      amount: parseFloat(amount),
    };

    setAccounts([...accounts, newAccount]);
    setName("");
    setAmount("");
  };

  return (
    <div>
      {/* Resumen de Cuentas */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>Mis Cuentas</h2>
        <p style={{ color: "#6b7280", marginBottom: "16px", fontSize: "14px" }}>
          Administra de dónde proviene tu dinero.
        </p>

        {accounts.map((acc) => (
          <div
            key={acc.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "24px" }}>{acc.icon}</span>
              <div>
                <strong style={{ fontSize: "15px", display: "block" }}>{acc.name}</strong>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>{acc.type}</span>
              </div>
            </div>
            <strong style={{ color: "#10b981", fontSize: "15px" }}>
              ${new Intl.NumberFormat("es-CO").format(acc.amount)} COL$
            </strong>
          </div>
        ))}
      </div>

      {/* Formulario para agregar nuevas cuentas */}
      <div className="card">
        <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Agregar Nueva Cuenta</h3>
        <form onSubmit={handleAddAccount}>
          <input
            type="text"
            className="input-field"
            placeholder="Nombre de la cuenta (ej. Nequi, Billetera)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="input-field"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Banco">Banco / Billetera Digital</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta de Crédito</option>
          </select>
          <input
            type="number"
            className="input-field"
            placeholder="Saldo inicial en COL$"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Guardar Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}