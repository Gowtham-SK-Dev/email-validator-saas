"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  TrendingUp,
  Activity,
  Users,
  CreditCard,
  Zap,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Copy,
  RefreshCw,
} from "lucide-react"
import { UsageStats } from "@/components/dashboard/usage-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"

const statsCards = [
  {
    title: "Today's Clicks",
    value: "1,247",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
    description: "vs yesterday",
  },
  {
    title: "Monthly Clicks",
    value: "24,891",
    change: "+8.2%",
    trend: "up",
    icon: BarChart3,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
    description: "vs last month",
  },
  {
    title: "Balance Click Count",
    value: "3,245",
    change: "-156",
    trend: "down",
    icon: Zap,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/50",
    description: "clicks remaining",
  },
  {
    title: "Success Rate",
    value: "99.2%",
    change: "+0.3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
    description: "verification accuracy",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-32 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                Welcome back! Here's what's happening with your account.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 dark:border-slate-700 dark:text-slate-300 shadow-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-xl hover:shadow-xl hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-900 transition-all duration-300 ease-in-out group dark:border-slate-800/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-slate-800/20" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                          {stat.value}
                        </p>
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                              stat.trend === "up"
                                ? "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/50"
                                : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-950/50"
                            }`}
                          >
                            {stat.trend === "up" ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {stat.change}
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{stat.description}</span>
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-2xl ${stat.bgColor} flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className={`h-7 w-7 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* API Keys Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-xl dark:bg-slate-900/90 dark:border-slate-800/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-slate-800/10" />
            <CardHeader className="pb-4 relative">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    API Credentials
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Your API keys for integration
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800 w-fit shadow-sm"
                >
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">API Key</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 min-w-0 shadow-inner">
                      <code className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all">
                        sk_test_51HG4rDKs9Xj8qM6O3gJ5v2vM
                      </code>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">API Secret</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 min-w-0 shadow-inner">
                      <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                        •••••••••••••••••••••••••••••••
                      </code>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts and Activity */}
        <div className="grid gap-6 xl:grid-cols-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="xl:col-span-4"
          >
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-xl dark:bg-slate-900/90 dark:border-slate-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-slate-800/10" />
              <CardHeader className="pb-4 relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      Usage Analytics
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Your API usage over the last 30 days
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 w-fit dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-2 relative">
                <UsageStats />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="xl:col-span-3"
          >
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-xl dark:bg-slate-900/90 dark:border-slate-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-slate-800/10" />
              <CardHeader className="pb-4 relative">
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Latest verification requests
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <RecentActivity />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Subscription and Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-xl dark:bg-slate-900/90 dark:border-slate-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-slate-800/10" />
              <CardHeader className="pb-4 relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      Current Plan
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Manage your subscription
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 dark:from-blue-950/50 dark:to-purple-950/50 dark:text-blue-300 dark:border-blue-800 w-fit shadow-sm">
                    Pro Plan
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex-shrink-0 shadow-lg">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Pro Plan</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Valid until June 30, 2025</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-xl bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      ₹500/month
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">3,500 clicks</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    View Billing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-xl dark:bg-slate-900/90 dark:border-slate-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-slate-800/10" />
              <CardHeader className="pb-4 relative">
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 relative">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-14 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 dark:hover:from-emerald-950/50 dark:hover:to-emerald-900/50 transition-all duration-300 dark:border-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md"
                >
                  <div className="p-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex-shrink-0 shadow-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="flex-1 text-left font-medium">Recharge Balance</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-14 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-950/50 dark:hover:to-purple-900/50 transition-all duration-300 dark:border-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md"
                >
                  <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex-shrink-0 shadow-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span className="flex-1 text-left font-medium">Contact Support</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-14 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 dark:hover:from-amber-950/50 dark:hover:to-amber-900/50 transition-all duration-300 dark:border-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md"
                >
                  <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex-shrink-0 shadow-lg">
                    <Download className="h-5 w-5 text-white" />
                  </div>
                  <span className="flex-1 text-left font-medium">Download Reports</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
