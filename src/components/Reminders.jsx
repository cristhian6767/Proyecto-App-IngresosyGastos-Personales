import React, { useState, useEffect } from "react";

export default function Reminders() {
  const DEFAULT_REMINDERS = [
    { id: "1", title: "Revisión de gastos del mes", date: "Fin de mes" },
  ];

  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("app_reminders");
    return saved ? JSON.parse(saved) : DEFAULT_REMINDERS;
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    localStorage.setItem("app_reminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newReminder = {
      id: Date.now().toString(),
      title: title.trim(),
      date: date.trim() || "Pendiente",
    };

    setReminders([...reminders, newReminder]);
    setTitle("");
    setDate("");
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>🔔 Recordatorios</h2>
        <p style={{ fontSize: "14px", marginBottom: "16px" }}>
          Alertas e hitos financieros personales.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {reminders.length === 0 ? (
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>No hay recordatorios pendientes.</p>
          ) : (
            reminders.map((r) => (
              <div
                key={r.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  backgroundColor: "var(--bg-input)",
                  borderRadius: "8px",
                  borderLeft: "4px solid var(--accent-amber)",
                }}
              >
                <div>
                  <span style={{ fontWeight: "600", display: "block" }}>{r.title}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                    Fecha límite: {r.date}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteReminder(r.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--accent-rose)",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Crear Recordatorio</h3>
        <form onSubmit={handleAddReminder}>
          <input
            type="text"
            className="input-field"
            placeholder="Descripción del recordatorio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-field"
            placeholder="Fecha u hora objetivo"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
            Guardar Recordatorio
          </button>
        </form>
      </div>
    </div>
  );
}
