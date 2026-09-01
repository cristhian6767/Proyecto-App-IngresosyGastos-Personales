import { deleteTransaction } from "../firebase/services";

export default function TransactionList({ transactions, onTransactionDeleted }) {
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas borrar este registro?")) {
      await deleteTransaction(id);
      if (onTransactionDeleted) onTransactionDeleted();
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="card" style={{ textAlign: "center", color: "#6b7280" }}>
        No hay registros aún. Revisa tus movimientos guardados o agrega uno nuevo.
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: "16px" }}>Historial de Movimientos</h3>
      <div>
        {transactions.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f3f4f6"
            }}
          >
            <div>
              <strong>{item.description || item.category}</strong>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
                {item.category} • {item.date}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span className={item.type === "income" ? "text-income" : "text-expense"}>
                {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px"
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}