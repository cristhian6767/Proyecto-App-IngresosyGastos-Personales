import React, { useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Alimentación", icon: "🍔", type: "expense" },
    { id: 2, name: "Transporte", icon: "🚌", type: "expense" },
    { id: 3, name: "Vivienda", icon: "🏠", type: "expense" },
    { id: 4, name: "Entretenimiento", icon: "🎬", type: "expense" },
    { id: 5, name: "Salario", icon: "💼", type: "income" },
    { id: 6, name: "Ventas / Negocio", icon: "📈", type: "income" },
  ]);

  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("🏷️");
  const [catType, setCatType] = useState("expense");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;

    setCategories([
      ...categories,
      { id: Date.now(), name: newCatName, icon: newCatIcon, type: catType },
    ]);
    setNewCatName("");
    setNewCatIcon("🏷️");
  };

  return (
    <div>
      {/* Listado de Categorías */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>Categorías Configuradas</h2>
        <p style={{ color: "#6b7280", marginBottom: "16px", fontSize: "14px" }}>
          Organiza tus transacciones según su tipo.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                borderLeft: cat.type === "income" ? "4px solid #10b981" : "4px solid #ef4444",
              }}
            >
              <span style={{ fontSize: "20px" }}>{cat.icon}</span>
              <div>
                <span style={{ fontSize: "14px", fontWeight: "500", display: "block" }}>{cat.name}</span>
                <span style={{ fontSize: "11px", color: "#6b7280" }}>
                  {cat.type === "income" ? "Ingreso" : "Gasto"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulario para agregar nueva categoría */}
      <div className="card">
        <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Crear Categoría Personalizada</h3>
        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            className="input-field"
            placeholder="Nombre de la categoría (ej. Mascotas, Ropa)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              className="input-field"
              placeholder="Emoji (ej. 🐶)"
              value={newCatIcon}
              onChange={(e) => setNewCatIcon(e.target.value)}
              style={{ width: "100px" }}
            />
            <select
              className="input-field"
              value={catType}
              onChange={(e) => setCatType(e.target.value)}
            >
              <option value="expense">Gasto</option>
              <option value="income">Ingreso</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Añadir Categoría
          </button>
        </form>
      </div>
    </div>
  );
}
