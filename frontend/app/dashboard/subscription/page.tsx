"use client"

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
import { useRouter } from "next/navigation"
import { useState } from "react"

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
    id: "basic",
    name: "Basic",
    price: "₹100",
    billing: "monthly",
    calls: "650 calls",
    features: ["Basic support", "Standard analytics"],
    popular: false,
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹500",
    billing: "monthly",
    calls: "3,500 calls",
    features: ["Priority support", "Advanced analytics", "Custom integrations"],
    popular: true,
    current: true,
  },
  {
    id: "enterprise",
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
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId)

    // Find the selected plan details
    const plan = availablePlans.find((p) => p.id === planId)

    if (plan) {
      // Navigate to payment page with plan details
      router.push(
        `/dashboard/payment?plan=${planId}&price=${plan.price.replace("₹", "")}&name=${plan.name}&calls=${plan.calls}`,
      )
    }
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                Subscription
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Manage your subscription and billing information.
              </p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white w-fit">
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
          </div>
        </div>

        {/* Current Plan Overview */}
        <div>
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-900/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{currentPlan.name}</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {currentPlan.price}/{currentPlan.billing} • Next billing: {currentPlan.nextBilling}
                      </p>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50">
                      {currentPlan.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">API Usage this month</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {currentPlan.usage.current.toLocaleString()} / {currentPlan.usage.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={currentPlan.usage.percentage} className="h-2 dark:bg-slate-700" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {currentPlan.usage.percentage}% used • {currentPlan.usage.limit - currentPlan.usage.current} calls
                      remaining
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Calendar className="h-4 w-4" />
                    Manage Billing
                  </Button>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Calls Used</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {currentPlan.usage.current.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">This month</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Calls Remaining</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {(currentPlan.usage.limit - currentPlan.usage.current).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Until reset</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30">
                    <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Days Until Reset</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">June 30, 2025</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/30">
                    <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Success Rate</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">99.2%</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">This month</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/30">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Plans */}
        <div>
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Available Plans</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Choose the plan that best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {availablePlans.map((plan, index) => (
                  <div
                    key={plan.name}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                      plan.current
                        ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
                        : plan.popular
                          ? "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20"
                          : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                    }`}
                  >
                    {plan.popular && !plan.current && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white dark:bg-purple-500">
                        Most Popular
                      </Badge>
                    )}
                    {plan.current && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white dark:bg-blue-500">
                        Current Plan
                      </Badge>
                    )}

                    <div className="text-center space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          {plan.name === "Enterprise" ? (
                            <Crown className="h-8 w-8 text-amber-500 dark:text-amber-400" />
                          ) : (
                            <Star className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
                        <div>
                          <span className="text-3xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                          <span className="text-slate-600 dark:text-slate-300">/{plan.billing}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{plan.calls}</p>
                      </div>

                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full ${
                          plan.current
                            ? "bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                            : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                        }`}
                        disabled={plan.current}
                        onClick={() => handleUpgrade(plan.id)}
                      >
                        {plan.current ? "Current Plan" : "Upgrade to " + plan.name}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription History */}
        <div>
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900/70 dark:border-slate-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                Subscription History
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Your past subscriptions and payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionHistory />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
