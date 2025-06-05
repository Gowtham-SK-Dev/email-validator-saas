"use client"

import { Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, ComposedChart, Legend } from "recharts"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

const data = [
  { name: "Jan", verified: 1150, invalid: 50, growth: 12, total: 1200 },
  { name: "Feb", verified: 2020, invalid: 80, growth: 75, total: 2100 },
  { name: "Mar", verified: 1750, invalid: 50, growth: -14, total: 1800 },
  { name: "Apr", verified: 2350, invalid: 50, growth: 33, total: 2400 },
  { name: "May", verified: 2650, invalid: 50, growth: 13, total: 2700 },
  { name: "Jun", verified: 1680, invalid: 20, growth: -37, total: 1700 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 shadow-2xl"
      >
        <p className="font-semibold text-slate-900 mb-2">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color || entry.stroke || entry.fill }}
              />
              <span className="text-sm text-slate-600 capitalize">{entry.dataKey}:</span>
              <span className="font-semibold text-slate-900">
                {entry.dataKey === "growth"
                  ? `${entry.value > 0 ? "+" : ""}${entry.value}%`
                  : entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }
  return null
}

export function UsageStats() {
  const totalVerified = data.reduce((sum, item) => sum + item.verified, 0)
  const totalInvalid = data.reduce((sum, item) => sum + item.invalid, 0)
  const successRate = ((totalVerified / (totalVerified + totalInvalid)) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200/60"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-emerald-500 rounded-lg">
              <Activity className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-medium text-emerald-700">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-emerald-900">{successRate}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200/60"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-500 rounded-lg">
              <TrendingUp className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-medium text-blue-700">Total Verified</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{totalVerified.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-4 border border-red-200/60"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-red-500 rounded-lg">
              <TrendingDown className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-medium text-red-700">Invalid</span>
          </div>
          <p className="text-2xl font-bold text-red-900">{totalInvalid.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Single Unified Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-2xl opacity-60" />

        {/* Chart Container */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  {/* Gradient definitions for bars */}
                  <linearGradient id="verifiedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="invalidGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
                  </linearGradient>

                  {/* Glow filters */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} vertical={false} />

                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontWeight: 500 }}
                />

                <YAxis
                  yAxisId="left"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontWeight: 500 }}
                  tickFormatter={(value) => `${value}`}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#8b5cf6"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#8b5cf6", fontWeight: 500 }}
                  tickFormatter={(value) => `${value}%`}
                  domain={[-50, 100]}
                />

                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: "10px" }}
                />

                <Bar
                  yAxisId="left"
                  dataKey="verified"
                  fill="url(#verifiedGradient)"
                  radius={[6, 6, 0, 0]}
                  name="Verified"
                  filter="url(#glow)"
                  barSize={30}
                />

                <Bar
                  yAxisId="left"
                  dataKey="invalid"
                  fill="url(#invalidGradient)"
                  radius={[6, 6, 0, 0]}
                  name="Invalid"
                  filter="url(#glow)"
                  barSize={30}
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growth"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 8, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
                  name="Growth %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full blur-sm"
        />

        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-emerald-400 rounded-full blur-sm"
        />
      </motion.div>
    </div>
  )
}
