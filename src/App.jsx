import { useState, useEffect } from "react";
import BalanceSummary from "./components/BalanceSummary";
import CategoryChart from "./components/CategoryChart";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Sidebar from "./components/Sidebar";
import { getTransactions } from "./firebase/services";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("inicio");

  // Usuario invitado fijo sin autenticación
  const GUEST_USER_ID = "invitado_demo";

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions(GUEST_USER_ID);
      setTransactions(data);
    } catch (error) {
      console.error("Error al cargar transacciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calcular balance total
  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  return (
    <div className="app-layout">
      {/* Menú Lateral (Sidebar) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        balance={totalBalance}
      />

      <div className="container">
        {/* Encabezado Superior */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
              ☰
            </button>
            <h1 style={{ fontSize: "20px", margin: 0 }}>Gestor de Gastos</h1>
          </div>
        </header>

        {/* Vistas dinámicas */}
        {currentTab === "inicio" && (
          <>
            <BalanceSummary transactions={transactions} />
            <TransactionForm userId={GUEST_USER_ID} onTransactionAdded={fetchTransactions} />
            {loading ? (
              <div className="card" style={{ textAlign: "center", color: "#6b7280" }}>
                Cargando movimientos...
              </div>
            ) : (
              <TransactionList transactions={transactions} onTransactionDeleted={fetchTransactions} />
            )}
          </>
        )}

        {currentTab === "graficos" && (
          <CategoryChart transactions={transactions} />
        )}

        {currentTab !== "inicio" && currentTab !== "graficos" && (
          <div className="card" style={{ textAlign: "center", padding: "40px" }}>
            <h2>Sección de {currentTab.toUpperCase()}</h2>
            <p style={{ color: "#6b7280", marginTop: "8px" }}>Módulo en desarrollo...</p>
          </div>
        )}
      </div>
    </div>
  );
}