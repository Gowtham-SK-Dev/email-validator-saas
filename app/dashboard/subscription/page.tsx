"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  Calendar,
  Zap,
  TrendingUp,
  Download,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Star,
  Crown,
} from "lucide-react"
import { SubscriptionHistory } from "@/components/dashboard/subscription-history"

const currentPlan = {
  name: "Pro Plan",
  price: "₹500",
  billing: "monthly",
  features: [
    "3,500 API calls per month",
    "Priority support",
    "Advanced analytics",
    "Custom integrations",
    "99.9% uptime SLA",
  ],
  usage: {
    current: 2847,
    limit: 3500,
    percentage: 81.3,
  },
  nextBilling: "June 30, 2025",
  status: "active",
}

const availablePlans = [
  {
    name: "Basic",
    price: "₹100",
    billing: "monthly",
    calls: "650 calls",
    features: ["Basic support", "Standard analytics"],
    popular: false,
    current: false,
  },
  {
    name: "Pro",
    price: "₹500",
    billing: "monthly",
    calls: "3,500 calls",
    features: ["Priority support", "Advanced analytics", "Custom integrations"],
    popular: true,
    current: true,
  },
  {
    name: "Enterprise",
    price: "₹1,500",
    billing: "monthly",
    calls: "Unlimited calls",
    features: ["24/7 dedicated support", "Custom SLA", "White-label options"],
    popular: false,
    current: false,
  },
]

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-blue-600" />
                Subscription
              </h1>
              <p className="text-slate-600 mt-1">Manage your subscription and billing information.</p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 w-fit">
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
          </div>
        </motion.div>

        {/* Current Plan Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Star className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{currentPlan.name}</h3>
                      <p className="text-slate-600">
                        {currentPlan.price}/{currentPlan.billing} • Next billing: {currentPlan.nextBilling}
                      </p>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">{currentPlan.status}</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">API Usage this month</span>
                      <span className="font-medium text-slate-900">
                        {currentPlan.usage.current.toLocaleString()} / {currentPlan.usage.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={currentPlan.usage.percentage} className="h-2" />
                    <p className="text-xs text-slate-500">
                      {currentPlan.usage.percentage}% used • {currentPlan.usage.limit - currentPlan.usage.current} calls
                      remaining
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Manage Billing
                  </Button>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <ArrowUpRight className="h-4 w-4" />
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Calls Used</p>
                    <p className="text-2xl font-bold text-slate-900">{currentPlan.usage.current.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">This month</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-blue-50">
                    <Zap className="h-6 w-6 text-blue-600" />
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
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Calls Remaining</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {(currentPlan.usage.limit - currentPlan.usage.current).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">Until reset</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
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
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Days Until Reset</p>
                    <p className="text-2xl font-bold text-slate-900">12</p>
                    <p className="text-xs text-slate-500">June 30, 2025</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">Success Rate</p>
                    <p className="text-2xl font-bold text-slate-900">99.2%</p>
                    <p className="text-xs text-slate-500">This month</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-50">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Available Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Available Plans</CardTitle>
              <CardDescription className="text-slate-600">Choose the plan that best fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {availablePlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                      plan.current
                        ? "border-blue-200 bg-blue-50"
                        : plan.popular
                          ? "border-purple-200 bg-purple-50"
                          : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {plan.popular && !plan.current && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                        Most Popular
                      </Badge>
                    )}
                    {plan.current && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                        Current Plan
                      </Badge>
                    )}

                    <div className="text-center space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          {plan.name === "Enterprise" ? (
                            <Crown className="h-8 w-8 text-amber-500" />
                          ) : (
                            <Star className="h-8 w-8 text-blue-500" />
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                        <div>
                          <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                          <span className="text-slate-600">/{plan.billing}</span>
                        </div>
                        <p className="text-sm text-slate-600">{plan.calls}</p>
                      </div>

                      <ul className="space-y-2 text-sm text-slate-600">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full ${
                          plan.current ? "bg-slate-600 hover:bg-slate-700" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        disabled={plan.current}
                      >
                        {plan.current ? "Current Plan" : "Upgrade to " + plan.name}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscription History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Subscription History</CardTitle>
              <CardDescription className="text-slate-600">Your past subscriptions and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionHistory />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
