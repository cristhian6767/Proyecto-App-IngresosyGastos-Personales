import React, { useState, useEffect } from "react";

export default function RecurringPayments() {
  const DEFAULT_PAYMENTS = [
    { id: "1", name: "Servicio de Internet", amount: 80000, day: "05 de cada mes" },
    { id: "2", name: "Suscripción Streaming", amount: 35000, day: "15 de cada mes" },
  ];

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem("app_recurring_payments");
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENTS;
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    localStorage.setItem("app_recurring_payments", JSON.stringify(payments));
  }, [payments]);

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;

    const newPayment = {
      id: Date.now().toString(),
      name: name.trim(),
      amount: Number(amount),
      day: day.trim() || "Mensual",
    };

    setPayments([...payments, newPayment]);
    setName("");
    setAmount("");
    setDay("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>🔄 Pagos Recurrentes</h2>
        <p style={{ fontSize: "14px", marginBottom: "16px" }}>
          Control de compromisos fijos programados.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {payments.map((p) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                backgroundColor: "var(--bg-input)",
                borderRadius: "8px",
              }}
            >
              <div>
                <span style={{ fontWeight: "600", display: "block" }}>{p.name}</span>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                  Frecuencia: {p.day}
                </span>
              </div>
              <span style={{ fontWeight: "bold", color: "var(--accent-rose)" }}>
                ${p.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Programar Pago Recurrente</h3>
        <form onSubmit={handleAddPayment}>
          <input
            type="text"
            className="input-field"
            placeholder="Concepto (ej. Arriendo, Energía)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            className="input-field"
            placeholder="Monto estimado ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-field"
            placeholder="Día límite de pago (ej. 10 de cada mes)"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
            Registrar Pago
          </button>
        </form>
      </div>
    </div>
  );
}
