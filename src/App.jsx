import { useState, useEffect } from "react";
import BalanceSummary from "./components/BalanceSummary";
import CategoryChart from "./components/CategoryChart";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Sidebar from "./components/Sidebar";

// Módulos
import Accounts from "./components/Accounts";
import Categories from "./components/Categories";
import RecurringPayments from "./components/RecurringPayments";
import Reminders from "./components/Reminders";
import Settings from "./components/Settings";

import { getTransactions } from "./firebase/services";

// Categorías iniciales por defecto
const DEFAULT_CATEGORIES = [
  { id: "1", name: "Alimentación", icon: "🍔", type: "expense" },
  { id: "2", name: "Transporte", icon: "🚌", type: "expense" },
  { id: "3", name: "Vivienda", icon: "🏠", type: "expense" },
  { id: "4", name: "Entretenimiento", icon: "🎬", type: "expense" },
  { id: "5", name: "Salario", icon: "💼", type: "income" },
  { id: "6", name: "Ventas / Negocio", icon: "📈", type: "income" },
];

export default function App() {
  const GUEST_USER_ID = "invitado_demo";

  // Persistencia de Pestaña activa en localStorage
  const [currentTab, setCurrentTab] = useState(() => {
    return localStorage.getItem("app_current_tab") || "inicio";
  });

  // Persistencia de Categorías en localStorage
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("app_categories");
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Guardar pestaña actual al cambiar
  useEffect(() => {
    localStorage.setItem("app_current_tab", currentTab);
  }, [currentTab]);

  // Guardar lista de categorías al actualizar
  useEffect(() => {
    localStorage.setItem("app_categories", JSON.stringify(categories));
  }, [categories]);

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

  // Agregar nueva categoría personalizada
  const handleAddCategory = (newCat) => {
    setCategories((prev) => [...prev, newCat]);
  };

  // Cálculo del saldo total
  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

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
        </header>

        {currentTab === "inicio" && (
          <>
            <BalanceSummary transactions={transactions} />
            <TransactionForm
              userId={GUEST_USER_ID}
              onTransactionAdded={fetchTransactions}
              categories={categories}
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
        {currentTab === "categorias" && (
          <Categories categories={categories} onAddCategory={handleAddCategory} />
        )}
        {currentTab === "pagos" && <RecurringPayments />}
        {currentTab === "recordatorios" && <Reminders />}
        {currentTab === "ajustes" && <Settings />}
      </main>
    </div>
  );
}
