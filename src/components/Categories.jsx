import React, { useState } from "react";

export default function Categories({ categories, onAddCategory }) {
  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("🏷️");
  const [catType, setCatType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    onAddCategory({
      id: Date.now().toString(),
      name: newCatName.trim(),
      icon: newCatIcon.trim() || "🏷️",
      type: catType,
    });

    setNewCatName("");
    setNewCatIcon("🏷️");
  };

  return (
    <div>
      {/* Listado de Categorías */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>Categorías Configuradas</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "14px" }}>
          Organiza tus transacciones según su tipo.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                backgroundColor: "var(--bg-input)",
                borderRadius: "8px",
                borderLeft: cat.type === "income" ? "4px solid var(--accent-emerald)" : "4px solid var(--accent-rose)",
              }}
            >
              <span style={{ fontSize: "20px" }}>{cat.icon}</span>
              <div>
                <span style={{ fontSize: "14px", fontWeight: "500", display: "block" }}>{cat.name}</span>
                <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                  {cat.type === "income" ? "Ingreso" : "Gasto"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulario de nueva categoría */}
      <div className="card">
        <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Crear Categoría Personalizada</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Nombre de la categoría (ej. Mascotas, Universidad)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            required
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
