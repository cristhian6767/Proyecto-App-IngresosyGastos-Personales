import React from "react";

export default function BalanceSummary({ transactions }) {
  // Calcular Ingresos y Gastos
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // Formateador sin decimales y con puntos de miles (es-CO)
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="card">
      {/* Balance Total */}
      <div style={{ marginBottom: "16px" }}>
        <span style={{ fontSize: "14px", color: "var(--text-secondary)", display: "block" }}>
          Balance Total
        </span>
        <strong
          style={{
            fontSize: "28px",
            color: totalBalance >= 0 ? "var(--accent-emerald)" : "var(--accent-rose)",
            letterSpacing: "-0.5px",
          }}
        >
          {formatMoney(totalBalance)}
        </strong>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingTop: "12px", borderTop: "1px solid var(--border-color)" }}>
        {/* Total Ingresos */}
        <div>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block" }}>
            Total Ingresos
          </span>
          <strong style={{ fontSize: "18px", color: "var(--accent-emerald)" }}>
            +{formatMoney(totalIncome)}
          </strong>
        </div>

        {/* Total Gastos */}
        <div>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block" }}>
            Total Gastos
          </span>
          <strong style={{ fontSize: "18px", color: "var(--text-primary)" }}>
            -{formatMoney(totalExpense)}
          </strong>
        </div>
      </div>
    </div>
  );
}