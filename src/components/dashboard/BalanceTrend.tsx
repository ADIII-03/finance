import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  
} from "recharts";
import type { TooltipProps } from "recharts";
import { trendData } from "../../data/mockData";

// ✅ Define proper tooltip types
type CustomTooltipProps = TooltipProps<number, string>;

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-ink-800 border border-ink-600 rounded-xl p-3 text-xs font-mono">
      <p className="text-white mb-1 font-semibold">{label}</p>

      {payload.map((p, index) => (
        <p key={index} style={{ color: p.color }}>
          {p.name}: ₹{Number(p.value).toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

export default function BalanceTrend() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-mono text-slate-muted uppercase tracking-wider">
            Balance Trend
          </p>
          <p className="text-white font-display font-bold text-lg mt-0.5">
            6-Month Overview
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={trendData}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c6f135" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#c6f135" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1c2030" />

          <XAxis
            dataKey="month"
            tick={{ fill: "#8892a4", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#8892a4", fontSize: 10, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{
              fontSize: 11,
              fontFamily: "JetBrains Mono",
              color: "#8892a4",
            }}
          />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#c6f135"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            name="Income"
          />

          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#f87171"
            strokeWidth={2}
            fill="url(#expGrad)"
            name="Expenses"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}