export default function BalanceSummary({ transactions }) {
  // Calculamos los totales sumando los datos acumulados
  const totals = transactions.reduce(
    (acc, item) => {
      if (item.type === "income") acc.income += item.amount;
      if (item.type === "expense") acc.expense += item.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income - totals.expense;

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <p style={{ color: "#6b7280", fontSize: "14px" }}>Balance Total</p>
        <h2 style={{ color: balance >= 0 ? "#2563eb" : "#ef4444", marginTop: "4px" }}>
          ${balance.toFixed(2)}
        </h2>
      </div>

      <div className="summary-card">
        <p style={{ color: "#6b7280", fontSize: "14px" }}>Total Ingresos</p>
        <h2 className="text-income" style={{ marginTop: "4px" }}>
          +${totals.income.toFixed(2)}
        </h2>
      </div>

      <div className="summary-card">
        <p style={{ color: "#6b7280", fontSize: "14px" }}>Total Gastos</p>
        <h2 className="text-expense" style={{ marginTop: "4px" }}>
          -${totals.expense.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}