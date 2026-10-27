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
      <div className="flex h-48 items-center justify-center">
        <p className="text-slate-400">No spending this month</p>
      </div>
    );
  }

  // Session-194: the reference's restyled donut (live-probed): the
  // ResponsiveContainer sits DIRECTLY in the card's p-6 pt-0 content at
  // height 280 (no wrapper div), outerRadius 100 / innerRadius 60, the
  // white 1px sector strokes, and recharts' DEFAULT legend (the rect
  // icon at the default 14px — the iconType/iconSize props retired).
  // Our kept a11y superset: the role/aria ride the container div.
  return (
    <div role="img" aria-label="Spending by category donut chart">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart accessibilityLayer={false}>
          <Tooltip formatter={(value) => money(Number(value))} />
          <Pie
            data={rows}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
          >
            {rows.map((row) => (
              <Cell key={row.name} fill={row.fill} />
            ))}
          </Pie>
          <Legend
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
  // Session-194: the reference's restyled weekly chart (live-probed):
  // the container rides the tabpanel directly at height 200, the grid
  // dashes BOTH ways (5 horizontal + 9 vertical lines), the ticks are
  // 12px, and the plot's left rail sits at ~55px (the default axis
  // width — our explicit width={40} retired).
  return (
    <div role="img" aria-label="Weekly spending bar chart">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={buckets} barGap={4} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
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
