import { useState, useEffect } from "react";
import BalanceSummary from "./components/BalanceSummary";
import CategoryChart from "./components/CategoryChart";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Sidebar from "./components/Sidebar";

// Módulos activos
import Accounts from "./components/Accounts";
import RecurringPayments from "./components/RecurringPayments";
import Reminders from "./components/Reminders";
import Settings from "./components/Settings";

import { getTransactions } from "./firebase/services";

export default function App() {
  const GUEST_USER_ID = "invitado_demo";

  const [currentTab, setCurrentTab] = useState("inicio");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Obtener movimientos de Firebase
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

  // Cálculo del saldo total
  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  // Función de cierre de sesión simulada para la demo
  const handleLogout = () => {
    alert("Sesión finalizada");
    window.location.reload();
  };

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        balance={totalBalance}
      />

      <main className="main-content">
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
              ☰
            </button>
            <h1 style={{ margin: 0 }}>Gestor de Gastos</h1>
          </div>
          
          {/* Información de usuario y botón Salir restaurados */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              cris@gmail.com
            </span>
            <button
              onClick={handleLogout}
              className="btn"
              style={{
                padding: "6px 14px",
                fontSize: "13px",
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                width: "auto",
                cursor: "pointer",
              }}
            >
              Salir
            </button>
          </div>
        </header>

        {currentTab === "inicio" && (
          <>
            <BalanceSummary transactions={transactions} />
            <TransactionForm
              userId={GUEST_USER_ID}
              onTransactionAdded={fetchTransactions}
            />
            {loading ? (
              <div className="card" style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                Cargando movimientos...
              </div>
            ) : (
              <TransactionList transactions={transactions} onTransactionDeleted={fetchTransactions} />
            )}
          </>
        )}

        {currentTab === "cuentas" && <Accounts balance={totalBalance} />}
        {currentTab === "graficos" && <CategoryChart transactions={transactions} />}
        {currentTab === "pagos" && <RecurringPayments />}
        {currentTab === "recordatorios" && <Reminders />}
        {currentTab === "ajustes" && <Settings />}
      </main>
    </div>
  );
}
