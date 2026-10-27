"use client";

// Budget Wise chart wrappers (recharts 3.x) — the reference's two
// dashboard visuals:
//   SpendingDonut   the "Spending by Category" donut (innerRadius hole,
//                   per-slice category colors, legend row beneath —
//                   recharts' stock Legend list form)
//   WeeklyBars      the "Spend Summary" Mon–Sun bar pair chart (spent
//                   rose bars + earned emerald bars, dashed grid)
//
// accessibilityLayer stays false (the parity doctrine carried from the
// CRM scaffold's recharts posture — the wrapper DOM stays the stock 2.x
// genus).

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { categoryMeta } from "@/lib/categories";
import { money } from "@/lib/budget-math";

export function SpendingDonut({
  data,
}: {
  data: Array<{ category: string; amount: number }>;
}) {
  const rows = data.map((d) => ({
    name: categoryMeta(d.category).label,
    value: d.amount,
    fill: categoryMeta(d.category).color,
  }));
  const total = rows.reduce((acc, r) => acc + r.value, 0);

  if (total <= 0) {
    return (
      <div className="flex h-[220px] items-center justify-center text-sm text-slate-400">
        No spending this month
      </div>
    );
  }

  return (
    <div className="h-[220px] w-full" role="img" aria-label="Spending by category donut chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart accessibilityLayer={false}>
          <Tooltip formatter={(value) => money(Number(value))} />
          <Pie
            data={rows}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
            strokeWidth={0}
          >
            {rows.map((row) => (
              <Cell key={row.name} fill={row.fill} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WeeklyBars({
  buckets,
}: {
  buckets: Array<{ day: string; spent: number; earned: number }>;
}) {
  return (
    <div className="h-[192px] w-full" role="img" aria-label="Weekly spending bar chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={buckets} barGap={4} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={40}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickFormatter={(v: number) => (v >= 1000 ? `$${Math.round(v / 100) / 10}k` : `$${v}`)}
          />
          <Tooltip
            formatter={(value, name) => [money(Number(value)), name === "spent" ? "Spent" : "Earned"]}
          />
          <Bar dataKey="spent" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={16} />
          <Bar dataKey="earned" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
