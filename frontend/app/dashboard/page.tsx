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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Welcome back! Here's what's happening with your account.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 dark:border-slate-700 dark:text-slate-300"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-slate-200 dark:hover:to-slate-400 transition-all duration-300"
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
                <Card className="relative overflow-hidden border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 transition-all duration-300 ease-in-out group dark:border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex items-center gap-1 text-sm ${
                              stat.trend === "up"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-500 dark:text-red-400"
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
                        className={`p-3 rounded-2xl ${stat.bgColor} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className={`h-6 w-6 ${stat.color}`} />
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
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    API Credentials
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Your API keys for integration
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800 w-fit"
                >
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">API Key</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-w-0">
                      <code className="text-sm font-mono text-slate-600 dark:text-slate-400 break-all">
                        sk_test_51HG4rDKs9Xj8qM6O3gJ5v2vM
                      </code>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">API Secret</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-w-0">
                      <code className="text-sm font-mono text-slate-600 dark:text-slate-400">
                        •••••••••••••••••••••••••••••••
                      </code>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
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
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Usage Analytics
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Your API usage over the last 30 days
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 w-fit dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
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
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Latest verification requests
                </CardDescription>
              </CardHeader>
              <CardContent>
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
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Current Plan
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Manage your subscription
                    </CardDescription>
                  </div>
                  <Badge className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 w-fit">
                    Pro Plan
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg flex-shrink-0">
                      <CreditCard className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">Pro Plan</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Valid until June 30, 2025</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">₹500/month</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">3,500 clicks</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-slate-200 dark:hover:to-slate-400">
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
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
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 dark:border-slate-700 dark:text-slate-300"
                >
                  <div className="p-1 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg flex-shrink-0">
                    <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="flex-1 text-left">Recharge Balance</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 dark:border-slate-700 dark:text-slate-300"
                >
                  <div className="p-1 bg-purple-100 dark:bg-purple-950/50 rounded-lg flex-shrink-0">
                    <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="flex-1 text-left">Contact Support</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 dark:border-slate-700 dark:text-slate-300"
                >
                  <div className="p-1 bg-amber-100 dark:bg-amber-950/50 rounded-lg flex-shrink-0">
                    <Download className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="flex-1 text-left">Download Reports</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
