import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Colores para cada categoría
const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#6b7280"];

export default function CategoryChart({ transactions }) {
  // 1. Filtrar solo los gastos
  const expenses = transactions.filter((t) => t.type === "expense");

  // 2. Agrupar la suma total por categoría
  const categoryData = expenses.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  if (categoryData.length === 0) {
    return (
      <div className="card" style={{ textAlign: "center", color: "#6b7280" }}>
        No hay gastos registrados para mostrar en el gráfico.
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: "16px" }}>Gastos por Categoría</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}