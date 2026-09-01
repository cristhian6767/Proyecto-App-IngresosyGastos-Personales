import { useState, useEffect } from "react";
import BalanceSummary from "./components/BalanceSummary";
import CategoryChart from "./components/CategoryChart"; // 1. Importación agregada
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Auth from "./components/Auth";
import { useAuth } from "./context/AuthContext";
import { getTransactions } from "./firebase/services";

export default function App() {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getTransactions(user.uid);
      setTransactions(data);
    } catch (error) {
      console.error("Error al cargar transacciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1>Gestor de Gastos</h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>{user.email}</p>
        </div>
        <button onClick={logout} className="btn btn-inactive">
          Cerrar Sesión
        </button>
      </header>

      {/* Resumen de Balance */}
      <BalanceSummary transactions={transactions} />

      {/* 2. AQUÍ SE INSERTA EL GRÁFICO */}
      <CategoryChart transactions={transactions} />

      {/* Formulario */}
      <TransactionForm 
        userId={user.uid} 
        onTransactionAdded={fetchTransactions} 
      />

      {/* Lista de Movimientos */}
      {loading ? (
        <div className="card" style={{ textAlign: "center", color: "#6b7280" }}>
          Cargando movimientos...
        </div>
      ) : (
        <TransactionList 
          transactions={transactions} 
          onTransactionDeleted={fetchTransactions} 
        />
      )}
    </div>
  );
}