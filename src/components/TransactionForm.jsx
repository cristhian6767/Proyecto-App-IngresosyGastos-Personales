import { useState } from "react";
import { addTransaction } from "../firebase/services";

export default function TransactionForm({ userId, onTransactionAdded }) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "Alimentación",
    description: "",
    date: new Date().toISOString().split("T")[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || formData.amount <= 0) return;

    await addTransaction(userId, formData);
    
    // Limpiamos los campos
    setFormData({
      type: "expense",
      amount: "",
      category: "Alimentación",
      description: "",
      date: new Date().toISOString().split("T")[0]
    });

    if (onTransactionAdded) onTransactionAdded();
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: "16px" }}>Registrar Movimiento</h3>
      <form onSubmit={handleSubmit}>
        
        {/* Selector de Ingreso o Gasto */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <button
            type="button"
            className={`btn ${formData.type === "income" ? "btn-income" : "btn-inactive"}`}
            style={{ flex: 1 }}
            onClick={() => setFormData({ ...formData, type: "income" })}
          >
            Ingreso
          </button>
          <button
            type="button"
            className={`btn ${formData.type === "expense" ? "btn-expense" : "btn-inactive"}`}
            style={{ flex: 1 }}
            onClick={() => setFormData({ ...formData, type: "expense" })}
          >
            Gasto
          </button>
        </div>

        {/* Campo de Monto */}
        <input
          type="number"
          step="0.01"
          placeholder="Monto ($)"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="input-field"
          required
        />

        {/* Categoría */}
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="input-field"
        >
          <option value="Salario">Salario</option>
          <option value="Alimentación">Alimentación</option>
          <option value="Transporte">Transporte</option>
          <option value="Servicios">Servicios</option>
          <option value="Entretenimiento">Entretenimiento</option>
          <option value="Otros">Otros</option>
        </select>

        {/* Descripción */}
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-field"
        />

        {/* Fecha */}
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="input-field"
        />

        <button type="submit" className="btn btn-primary">
          Guardar Transacción
        </button>
      </form>
    </div>
  );
}