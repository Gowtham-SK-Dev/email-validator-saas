"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Activity,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { UsageStats } from "@/components/dashboard/usage-stats"
import { useState } from "react"

const usageData = [
  { period: "Today", requests: 1247, verified: 1198, invalid: 49, success_rate: 96.1 },
  { period: "Yesterday", requests: 2156, verified: 2089, invalid: 67, success_rate: 96.9 },
  { period: "This Week", requests: 8934, verified: 8621, invalid: 313, success_rate: 96.5 },
  { period: "This Month", requests: 34567, verified: 33234, invalid: 1333, success_rate: 96.1 },
]

const recentRequests = [
  { id: 1, email: "user@example.com", status: "verified", timestamp: "2 min ago", response_time: "120ms" },
  { id: 2, email: "test@invalid-domain.xyz", status: "invalid", timestamp: "3 min ago", response_time: "95ms" },
  { id: 3, email: "contact@business.org", status: "verified", timestamp: "5 min ago", response_time: "110ms" },
  { id: 4, email: "info@startup.io", status: "pending", timestamp: "7 min ago", response_time: "200ms" },
  { id: 5, email: "admin@company.net", status: "verified", timestamp: "12 min ago", response_time: "85ms" },
]

export default function UsagePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      case "invalid":
        return <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/60">
            Verified
          </Badge>
        )
      case "invalid":
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/60">
            Invalid
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/60">
            Pending
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="dark:bg-slate-800 dark:text-slate-300">
            Unknown
          </Badge>
        )
    }
  }

  const currentData = usageData.find((data) => data.period === selectedPeriod) || usageData[3]

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl"
          animate={{
            x: [0, 30, -10, 20, 0],
            y: [0, -40, 10, -20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-[60%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl"
          animate={{
            x: [0, -20, 10, -30, 0],
            y: [0, 30, -20, 10, 0],
            scale: [1, 0.9, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[20%] w-[30rem] h-[30rem] rounded-full bg-cyan-400/20 dark:bg-cyan-600/10 blur-3xl"
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -20, 40, -10, 0],
            scale: [1, 1.05, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                Usage Statistics
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">Monitor your API usage and performance metrics.</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                  <SelectItem value="Today" className="dark:text-slate-200 dark:focus:bg-slate-800">
                    Today
                  </SelectItem>
                  <SelectItem value="Yesterday" className="dark:text-slate-200 dark:focus:bg-slate-800">
                    Yesterday
                  </SelectItem>
                  <SelectItem value="This Week" className="dark:text-slate-200 dark:focus:bg-slate-800">
                    This Week
                  </SelectItem>
                  <SelectItem value="This Month" className="dark:text-slate-200 dark:focus:bg-slate-800">
                    This Month
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Requests</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {currentData.requests.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                      <ArrowUpRight className="h-3 w-3" />
                      +12.5%
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30">
                    <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Verified Emails</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {currentData.verified.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                      <ArrowUpRight className="h-3 w-3" />
                      +8.2%
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30">
                    <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Invalid Emails</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {currentData.invalid.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-red-500 dark:text-red-400">
                      <ArrowDownRight className="h-3 w-3" />
                      -2.1%
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-900/30">
                    <XCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Success Rate</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentData.success_rate}%</p>
                    <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                      <ArrowUpRight className="h-3 w-3" />
                      +0.3%
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/30">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Usage Trends</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    API usage over the last 30 days
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 w-fit dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Export Chart
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <UsageStats />
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Recent Requests</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Latest email verification requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800">
                        {getStatusIcon(request.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white truncate">{request.email}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {request.timestamp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            {request.response_time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">{getStatusBadge(request.status)}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
