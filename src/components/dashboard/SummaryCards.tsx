import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/helpers";

export default function SummaryCards() {
  const { state } = useApp();
  const income = state.transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = state.transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;

  const cards = [
    { label: "Total Balance", value: balance, icon: Wallet, color: "text-acid", bg: "bg-acid/10 border-acid/20" },
    { label: "Total Income", value: income, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    { label: "Total Expenses", value: expenses, icon: TrendingDown, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className={`card p-5 border ${bg}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-mono text-slate-muted uppercase tracking-wider">{label}</p>
            <Icon size={16} className={color} />
          </div>
          <p className={`text-2xl font-display font-700 ${color}`}>{formatCurrency(value)}</p>
        </div>
      ))}
    </div>
  );
}