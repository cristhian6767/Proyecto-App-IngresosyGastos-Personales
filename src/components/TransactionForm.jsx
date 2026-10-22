import React, { useState } from "react";
import { addTransaction } from "../firebase/services";

export default function TransactionForm({ userId = "invitado_demo", onTransactionAdded, categories = [] }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Filtrar categorías según tipo
  const availableCategories = categories.filter((c) => c.type === type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim() || !amount) {
      alert("Por favor completa la descripción y el monto.");
      return;
    }

    setLoading(true);

    // Asignar categoría o valor por defecto
    const selectedCategory = category || (availableCategories[0]?.name || "General");

    const newTransaction = {
      userId: userId || "invitado_demo",
      description: description.trim(),
      amount: Number(amount),
      type: type,
      category: selectedCategory,
      date: new Date().toISOString(),
    };

    try {
      await addTransaction(newTransaction);
      setDescription("");
      setAmount("");
      setCategory("");
      if (onTransactionAdded) {
        await onTransactionAdded();
      }
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      alert("Error al conectar con la base de datos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 style={{ fontSize: "16px", marginBottom: "12px", color: "var(--text-primary)" }}>
        Registrar Movimiento
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: type === "expense" ? "var(--accent-rose)" : "#374151",
              color: "white",
            }}
            onClick={() => {
              setType("expense");
              setCategory("");
            }}
          >
            💸 Gasto
          </button>
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: type === "income" ? "var(--accent-emerald)" : "#374151",
              color: type === "income" ? "#022c22" : "white",
            }}
            onClick={() => {
              setType("income");
              setCategory("");
            }}
          >
            💰 Ingreso
          </button>
        </div>

        <input
          type="text"
          className="input-field"
          placeholder="Descripción (ej. Mercado, Sueldo, Transporte)"
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
          <option value="">
            {availableCategories.length > 0
              ? "-- Seleccionar Categoría (Opcional) --"
              : "Sin categorías específicas"}
          </option>
          {availableCategories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "8px" }}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Transacción"}
        </button>
      </form>
    </div>
  );
}
