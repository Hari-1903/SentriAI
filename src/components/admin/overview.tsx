"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: 2800,
  },
  {
    name: "Feb",
    total: 3200,
  },
  {
    name: "Mar",
    total: 2400,
  },
  {
    name: "Apr",
    total: 2800,
  },
  {
    name: "May",
    total: 2600,
  },
  {
    name: "Jun",
    total: 3800,
  },
  {
    name: "Jul",
    total: 2600,
  },
  {
    name: "Aug",
    total: 2400,
  },
  {
    name: "Sep",
    total: 3800,
  },
  {
    name: "Oct",
    total: 3600,
  },
  {
    name: "Nov",
    total: 2800,
  },
  {
    name: "Dec",
    total: 3600,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
