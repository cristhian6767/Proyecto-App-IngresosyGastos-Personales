import React, { useState } from "react";

export default function RecurringPayments() {
  const [payments, setPayments] = useState([
    { id: 1, name: "Servicio de Internet", amount: 75000, frequency: "Mensual", status: "Pendiente" },
    { id: 2, name: "Suscripción Digital", amount: 18000, frequency: "Mensual", status: "Pagado" },
  ]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    setPayments([
      ...payments,
      { id: Date.now(), name, amount: parseFloat(amount), frequency: "Mensual", status: "Pendiente" },
    ]);
    setName("");
    setAmount("");
  };

  const toggleStatus = (id) => {
    setPayments(
      payments.map((p) =>
        p.id === id ? { ...p, status: p.status === "Pagado" ? "Pendiente" : "Pagado" } : p
      )
    );
  };

  return (
    <div>
      {/* Lista de Pagos Fijos */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>Pagos Fijos y Habituales</h2>
        <p style={{ color: "#6b7280", marginBottom: "16px", fontSize: "14px" }}>
          Controla tus suscripciones y gastos periódicos.
        </p>

        {payments.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <div>
              <strong style={{ fontSize: "15px", display: "block" }}>{p.name}</strong>
              <span style={{ fontSize: "12px", color: "#6b7280" }}>
                {p.frequency} •{" "}
                <button
                  onClick={() => toggleStatus(p.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontWeight: "bold",
                    color: p.status === "Pagado" ? "#10b981" : "#f59e0b",
                  }}
                >
                  {p.status} (cambiar)
                </button>
              </span>
            </div>
            <strong style={{ fontSize: "15px" }}>
              ${new Intl.NumberFormat("es-CO").format(p.amount)} COL$
            </strong>
          </div>
        ))}
      </div>

      {/* Formulario para agregar nuevo pago habitual */}
      <div className="card">
        <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Programar Pago Fijo</h3>
        <form onSubmit={handleAddPayment}>
          <input
            type="text"
            className="input-field"
            placeholder="Concepto (ej. Arriendo, Energía, Gimnasio)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="input-field"
            placeholder="Valor aproximado en COL$"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Añadir Pago Habitual
          </button>
        </form>
      </div>
    </div>
  );
}