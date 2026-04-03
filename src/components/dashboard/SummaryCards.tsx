import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/utils/helpers";
import { Card } from "@/components/ui/Card";

// ✅ Card type
type CardData = {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
};

export default function SummaryCards() {
  const transactions = useAppSelector((state) => state.finance.transactions);

  // ✅ Typed reduce
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  // ✅ Typed cards
  const cards: CardData[] = [
    {
      label: "Total Balance",
      value: balance,
      icon: Wallet,
      color: "text-acid",
      bg: "bg-acid/10 border-acid/20",
    },
    {
      label: "Total Income",
      value: income,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/20",
    },
    {
      label: "Total Expenses",
      value: expenses,
      icon: TrendingDown,
      color: "text-red-400",
      bg: "bg-red-400/10 border-red-400/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <Card key={label} className={`border ${bg}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-mono text-slate-muted uppercase tracking-wider">
              {label}
            </p>
            <Icon size={16} className={color} />
          </div>

          <p className={`text-2xl font-display font-bold ${color}`}>
            {formatCurrency(value)}
          </p>
        </Card>
      ))}
    </div>
  );
}