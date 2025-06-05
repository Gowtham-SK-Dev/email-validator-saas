"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12000,
  },
  {
    name: "Feb",
    total: 21000,
  },
  {
    name: "Mar",
    total: 18000,
  },
  {
    name: "Apr",
    total: 24000,
  },
  {
    name: "May",
    total: 27000,
  },
  {
    name: "Jun",
    total: 17000,
  },
]

export function AdminUsageStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="currentColor" strokeWidth={2} className="stroke-primary" />
      </LineChart>
    </ResponsiveContainer>
  )
}
