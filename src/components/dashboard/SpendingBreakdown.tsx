import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../../context/AppContext";
import { getCategoryColor, formatCurrency } from "../../utils/helpers";

export default function SpendingBreakdown() {
  const { state } = useApp();
  const expenses = state.transactions.filter(t => t.type === "expense");
  const grouped = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const data = Object.entries(grouped).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  return (
    <div className="card p-5">
      <div className="mb-4">
        <p className="text-xs font-mono text-slate-muted uppercase tracking-wider">Spending</p>
        <p className="text-white font-display font-700 text-lg mt-0.5">By Category</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
              {data.map((entry) => (
                <Cell key={entry.name} fill={getCategoryColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.[0] ? (
                  <div className="bg-ink-800 border border-ink-600 rounded-xl p-2 text-xs font-mono">
                    <p style={{ color: getCategoryColor(payload[0].name) }}>{payload[0].name}</p>
                    <p className="text-white">{formatCurrency(payload[0].value)}</p>
                  </div>
                ) : null
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 w-full space-y-2">
          {data.map(({ name, value }) => (
            <div key={name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getCategoryColor(name) }} />
                <span className="text-slate-muted font-mono">{name}</span>
              </div>
              <span className="text-white font-mono">{formatCurrency(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}