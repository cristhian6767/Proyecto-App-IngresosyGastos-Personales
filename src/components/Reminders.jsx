import React, { useState } from "react";

export default function Reminders() {
  const [reminders, setReminders] = useState([
    { id: 1, text: "Pagar factura de servicio eléctrico", date: "2026-10-25" },
    { id: 2, text: "Revisar saldo de tarjeta de crédito", date: "2026-10-30" },
  ]);

  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!text || !date) return;

    setReminders([...reminders, { id: Date.now(), text, date }]);
    setText("");
    setDate("");
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div>
      {/* Lista de Recordatorios */}
      <div className="card">
        <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>Recordatorios Financieros</h2>
        <p style={{ color: "#6b7280", marginBottom: "16px", fontSize: "14px" }}>
          Alertas de vencimientos y fechas clave.
        </p>

        {reminders.length === 0 ? (
          <p style={{ color: "#9ca3af", textAlign: "center", padding: "12px 0" }}>
            No tienes recordatorios pendientes.
          </p>
        ) : (
          reminders.map((r) => (
            <div
              key={r.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                backgroundColor: "#fffbe3",
                borderLeft: "4px solid #f59e0b",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            >
              <div>
                <strong style={{ fontSize: "14px", display: "block", color: "#92400e" }}>
                  🔔 {r.text}
                </strong>
                <span style={{ fontSize: "12px", color: "#b45309" }}>
                  Fecha límite: {r.date}
                </span>
              </div>
              <button
                onClick={() => handleDeleteReminder(r.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                title="Eliminar recordatorio"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Formulario para agregar recordatorio */}
      <div className="card">
        <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Nuevo Recordatorio</h3>
        <form onSubmit={handleAddReminder}>
          <input
            type="text"
            className="input-field"
            placeholder="Descripción (ej. Pagar Internet)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="date"
            className="input-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Crear Recordatorio
          </button>
        </form>
      </div>
    </div>
  );
}