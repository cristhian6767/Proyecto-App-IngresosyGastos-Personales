import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#10b981", // Emerald
  "#f43f5e", // Rose
  "#f59e0b", // Amber
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#64748b", // Slate
];

export default function CategoryChart({ transactions = [] }) {
  const [chartType, setChartType] = useState("pie"); // 'pie' o 'bar'

  // Filtrar solo gastos para el desglose por categorías
  const expenses = transactions.filter((t) => t.type === "expense");

  // Agrupar y sumar montos por categoría
  const categoryDataMap = expenses.reduce((acc, curr) => {
    const cat = curr.category || "Otros";
    const amount = Number(curr.amount) || 0;
    acc[cat] = (acc[cat] || 0) + amount;
    return acc;
  }, {});

  const totalExpense = Object.values(categoryDataMap).reduce(
    (acc, val) => acc + val,
    0
  );

  // Formatear datos para Recharts incluyendo el cálculo de porcentaje
  const data = Object.keys(categoryDataMap).map((cat) => {
    const value = categoryDataMap[cat];
    const percentage = totalExpense > 0 ? ((value / totalExpense) * 100).toFixed(1) : 0;
    return {
      name: cat,
      value: value,
      percentage: Number(percentage),
    };
  });

  // Renderizar la etiqueta con porcentaje sobre cada tajada del pastel
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // No mostrar si es muy pequeño para evitar solapamiento

    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "12px", fontWeight: "bold" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "18px", margin: 0, color: "var(--text-primary)" }}>
            📊 Distribución de Gastos
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "13px",
              margin: "4px 0 0 0",
            }}
          >
            Análisis visual de tus salidas financieras por categoría.
          </p>
        </div>

        {/* Selector de Tipo de Gráfico */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            className="btn"
            onClick={() => setChartType("pie")}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              backgroundColor:
                chartType === "pie" ? "var(--accent-emerald)" : "var(--bg-input)",
              color: chartType === "pie" ? "#022c22" : "var(--text-primary)",
              border: "1px solid var(--border-color)",
              width: "auto",
            }}
          >
            🍩 Circular
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setChartType("bar")}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              backgroundColor:
                chartType === "bar" ? "var(--accent-emerald)" : "var(--bg-input)",
              color: chartType === "bar" ? "#022c22" : "var(--text-primary)",
              border: "1px solid var(--border-color)",
              width: "auto",
            }}
          >
            📊 Barras
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 0",
            color: "var(--text-secondary)",
            fontSize: "14px",
          }}
        >
          No hay registros de gastos para generar la visualización.
        </div>
      ) : (
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "pie" ? (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, item) => [
                    `$${Number(value).toLocaleString()} (${item.payload.percentage}%)`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                    borderRadius: "8px",
                  }}
                />
                <Legend
                  formatter={(value, entry) => (
                    <span style={{ color: "var(--text-primary)", fontSize: "13px" }}>
                      {value} ({entry.payload.percentage}%)
                    </span>
                  )}
                />
              </PieChart>
            ) : (
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip
                  formatter={(value, name, item) => [
                    `$${Number(value).toLocaleString()} (${item.payload.percentage}%)`,
                    "Monto",
                  ]}
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`bar-cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
