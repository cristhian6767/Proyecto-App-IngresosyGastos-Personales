import { useState, useEffect } from "react";
import BalanceSummary from "./components/BalanceSummary";
import CategoryChart from "./components/CategoryChart";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";

// Módulos
import Accounts from "./components/Accounts";
import Categories from "./components/Categories";
import RecurringPayments from "./components/RecurringPayments";
import Reminders from "./components/Reminders";
import Settings from "./components/Settings";

import { getTransactions } from "./firebase/services";

export default function App() {
  const [user, setUser] = useState(null); // Guardará el usuario autenticado
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("inicio");

  const userId = user ? user.userId : "invitado_demo";

  const fetchTransactions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getTransactions(userId);
      setTransactions(data);
    } catch (error) {
      console.error("Error al cargar transacciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setTransactions([]);
    setCurrentTab("inicio");
  };

  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  // Si no hay usuario logueado, se muestra únicamente la pantalla de Login
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      {/* Barra Lateral */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        balance={totalBalance}
      />

      {/* Contenido Principal */}
      <main className="main-content">
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
              ☰
            </button>
            <h1 style={{ margin: 0 }}>Gestor de Gastos</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn"
              style={{
                width: "auto",
                padding: "6px 12px",
                fontSize: "12px",
                backgroundColor: "#374151",
                color: "var(--text-primary)",
              }}
            >
              Salir
            </button>
          </div>
        </header>

        {currentTab === "inicio" && (
          <>
            <BalanceSummary transactions={transactions} />
            <TransactionForm userId={userId} onTransactionAdded={fetchTransactions} />
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
        {currentTab === "categorias" && <Categories />}
        {currentTab === "pagos" && <RecurringPayments />}
        {currentTab === "recordatorios" && <Reminders />}
        {currentTab === "ajustes" && <Settings />}
      </main>
    </div>
  );
}