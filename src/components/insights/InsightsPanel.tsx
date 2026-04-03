import { useAppSelector } from "@/store/hooks";
import { formatCurrency, getCategoryColor } from "@/utils/helpers";
import { Card } from "@/components/ui/Card";
import type { ChartMonth, MonthData } from "@/types";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function InsightsPanel() {
  const txns = useAppSelector(state => state.finance.transactions);

  // ✅ By month (typed)
  const byMonth = txns.reduce<Record<string, MonthData>>((acc, t) => {
    const m = t.date.slice(0, 7);

    if (!acc[m]) acc[m] = { income: 0, expenses: 0 };

    if (t.type === "income") acc[m].income += t.amount;
    else acc[m].expenses += t.amount;

    return acc;
  }, {});

  const monthData: ChartMonth[] = Object.entries(byMonth)
    .map(([m, v]) => ({
      month: m,
      income: v.income,
      expenses: v.expenses,
      net: v.income - v.expenses,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // ✅ Category spend
  const catSpend = txns
    .filter((t) => t.type === "expense")
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const topCat = Object.entries(catSpend).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // ✅ Savings rate
  const savingsRate = (() => {
    const inc = txns
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);

    const exp = txns
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);

    return inc > 0 ? (((inc - exp) / inc) * 100).toFixed(1) : "0";
  })();

  // ✅ Avg monthly expense
  const avgMonthlyExpense = Object.keys(byMonth).length
    ? Object.values(byMonth).reduce((s, m) => s + m.expenses, 0) /
      Object.keys(byMonth).length
    : 0;

  const insights = [
    {
      label: "Top Spending Category",
      value: topCat?.[0] ?? "—",
      sub: formatCurrency(topCat?.[1] ?? 0),
      color: getCategoryColor(topCat?.[0] ?? ""),
    },
    {
      label: "Savings Rate",
      value: `${savingsRate}%`,
      sub: "of total income saved",
      color: "#c6f135",
    },
    {
      label: "Avg Monthly Expense",
      value: formatCurrency(avgMonthlyExpense),
      sub: "across all months",
      color: "#38bdf8",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-white text-xl">
        Insights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {insights.map(({ label, value, sub, color }) => (
          <Card key={label}>
            <p className="text-xs font-mono text-slate-muted uppercase tracking-wider mb-2">
              {label}
            </p>
            <p
              className="text-2xl font-display font-bold"
              style={{ color }}
            >
              {value}
            </p>
            <p className="text-xs text-slate-muted mt-1 font-body">
              {sub}
            </p>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <div className="mb-4">
          <p className="text-xs font-mono text-slate-muted uppercase tracking-wider">
            Monthly Comparison
          </p>
          <p className="text-white font-display font-bold text-lg mt-0.5">
            Income vs Expenses
          </p>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2030" />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#8892a4",
                fontSize: 10,
                fontFamily: "JetBrains Mono",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#8892a4",
                fontSize: 10,
                fontFamily: "JetBrains Mono",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) =>
                `₹${(v / 1000).toFixed(0)}k`
              }
            />

            <Tooltip />

            <Bar
              dataKey="income"
              fill="#c6f135"
              radius={[4, 4, 0, 0]}
              name="Income"
            />

            <Bar
              dataKey="expenses"
              fill="#f87171"
              radius={[4, 4, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Category breakdown */}
      <Card>
        <p className="text-xs font-mono text-slate-muted uppercase tracking-wider mb-4">
          Spending Distribution
        </p>

        {Object.entries(catSpend)
          .sort((a, b) => b[1] - a[1])
          .map(([cat, val]) => {
            const total = Object.values(catSpend).reduce(
              (s, v) => s + v,
              0
            );

            const pct = total
              ? ((val / total) * 100).toFixed(1)
              : "0";

            return (
              <div key={cat} className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span style={{ color: getCategoryColor(cat) }}>
                    {cat}
                  </span>
                  <span className="text-slate-muted">
                    {formatCurrency(val)} · {pct}%
                  </span>
                </div>

                <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: getCategoryColor(cat),
                    }}
                  />
                </div>
              </div>
            );
          })}
      </Card>
    </div>
  );
}