import React, { useState } from "react";
import { addTransaction } from "../firebase/services";

export default function TransactionForm({ userId, onTransactionAdded }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Alimentación");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      userId,
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString(),
    };

    try {
      await addTransaction(newTransaction);
      setDescription("");
      setAmount("");
      onTransactionAdded();
    } catch (error) {
      console.error("Error al guardar transacción:", error);
    }
  };

  return (
    <div className="card">
      <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Registrar Movimiento</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <button
            type="button"
            className={`btn ${type === "expense" ? "btn-primary" : "btn-inactive"}`}
            style={{
              backgroundColor: type === "expense" ? "var(--accent-rose)" : "#374151",
              color: "white",
            }}
            onClick={() => setType("expense")}
          >
            Gasto
          </button>
          <button
            type="button"
            className={`btn ${type === "income" ? "btn-primary" : "btn-inactive"}`}
            style={{
              backgroundColor: type === "income" ? "var(--accent-emerald)" : "#374151",
              color: type === "income" ? "#022c22" : "white",
            }}
            onClick={() => setType("income")}
          >
            Ingreso
          </button>
        </div>

        <input
          type="text"
          className="input-field"
          placeholder="Descripción (ej. Mercado, Transporte, Sueldo)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          className="input-field"
          placeholder="Monto ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="input-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Alimentación">🍔 Alimentación</option>
          <option value="Transporte">🚌 Transporte</option>
          <option value="Vivienda">🏠 Vivienda</option>
          <option value="Entretenimiento">🎬 Entretenimiento</option>
          <option value="Salario">💼 Salario</option>
          <option value="Otros">📦 Otros</option>
        </select>

        <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
          Guardar Transacción
        </button>
      </form>
    </div>
  );
}
