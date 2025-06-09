"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free Trial",
    price: "₹0",
    hits: "100 hits",
    validity: "7 days",
    suitableFor: "Testing",
    features: ["API Access", "Email Validation", "Basic Support"],
    popular: false,
    icon: Zap,
    gradient: "from-slate-500 to-slate-600",
  },
  {
    name: "Starter",
    price: "₹50",
    hits: "300 hits",
    validity: "One-time",
    suitableFor: "Small projects",
    features: ["API Access", "Email Validation", "Standard Support", "Syntax Checking"],
    popular: false,
    icon: Zap,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Basic",
    price: "₹100",
    hits: "650 hits",
    validity: "One-time",
    suitableFor: "Freelancers",
    features: ["API Access", "Email Validation", "Priority Support", "Syntax Checking", "Domain Validation"],
    popular: false,
    icon: Star,
    gradient: "from-green-500 to-green-600",
  },
  {
    name: "Standard",
    price: "₹200",
    hits: "1400 hits",
    validity: "One-time",
    suitableFor: "Startups",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
    ],
    popular: false,
    icon: Star,
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    name: "Pro",
    price: "₹500",
    hits: "3500 hits",
    validity: "One-time",
    suitableFor: "Businesses",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
    ],
    popular: true,
    icon: Star,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Unlimited (1M)",
    price: "₹1000",
    hits: "Unlimited",
    validity: "1 Month",
    suitableFor: "API Startups",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
      "Disposable Email Detection",
    ],
    popular: false,
    icon: Crown,
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Unlimited (3M)",
    price: "₹2500",
    hits: "Unlimited",
    validity: "3 Months",
    suitableFor: "Agencies",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
      "Disposable Email Detection",
      "Catch-All Detection",
    ],
    popular: false,
    icon: Crown,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    name: "Unlimited (6M)",
    price: "₹4500",
    hits: "Unlimited",
    validity: "6 Months",
    suitableFor: "SaaS",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
      "Disposable Email Detection",
      "Catch-All Detection",
      "Role Account Detection",
    ],
    popular: false,
    icon: Crown,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Unlimited (1Y)",
    price: "₹7000",
    hits: "Unlimited",
    validity: "1 Year",
    suitableFor: "Enterprises",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
      "Disposable Email Detection",
      "Catch-All Detection",
      "Role Account Detection",
      "Dedicated Support",
    ],
    popular: false,
    icon: Crown,
    gradient: "from-amber-500 to-orange-500",
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black relative overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-10 left-20 w-80 h-80 bg-blue-300/20 dark:bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-60 right-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 28,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-72 h-72 bg-pink-300/20 dark:bg-pink-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 70, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-60 right-1/4 w-64 h-64 bg-cyan-300/20 dark:bg-cyan-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <Navbar />

      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {/* Hero Section */}
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Badge
                    variant="secondary"
                    className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all duration-300 rounded-xl px-4 py-2"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Choose Your Plan
                  </Badge>
                </motion.div>
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Pricing Plans
                </motion.h1>
                <motion.p
                  className="max-w-[900px] text-slate-600 dark:text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Choose the perfect plan for your email verification needs. Start free, scale as you grow.
                </motion.p>
              </div>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, index) => {
                const IconComponent = plan.icon
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <motion.div
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                      >
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 shadow-xl rounded-xl">
                          Most Popular
                        </Badge>
                      </motion.div>
                    )}

                    <Card
                      className={cn(
                        "flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-2xl border-2 rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm",
                        plan.popular
                          ? "border-purple-200 dark:border-purple-800 shadow-xl scale-105"
                          : "border-slate-200/60 dark:border-slate-800/60 hover:border-blue-200 dark:hover:border-blue-800",
                      )}
                    >
                      <CardHeader className="text-center pb-8 pt-8">
                        <motion.div
                          className={cn(
                            "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r shadow-xl",
                            plan.gradient,
                          )}
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </motion.div>
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</CardTitle>
                        <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                          {plan.suitableFor}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex-1 text-center px-6">
                        <motion.div className="mb-8" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                          <span className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                            {plan.price}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 ml-1 text-sm">
                            {plan.validity !== "One-time" ? `/ ${plan.validity}` : ""}
                          </span>
                        </motion.div>

                        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {plan.hits} • {plan.validity}
                          </p>
                        </div>

                        <ul className="space-y-4 text-left">
                          {plan.features.map((feature, featureIndex) => (
                            <motion.li
                              key={feature}
                              className="flex items-center text-sm"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1 + index * 0.1 + featureIndex * 0.05, duration: 0.4 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                                className="mr-3 flex-shrink-0"
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </motion.div>
                              <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>

                      <CardFooter className="pt-8 px-6 pb-6">
                        <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            className={cn(
                              "w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl rounded-2xl py-6 text-base font-medium",
                              plan.popular
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white",
                            )}
                            asChild
                          >
                            <Link href="/register">{plan.price === "₹0" ? "Start Free Trial" : "Get Started"}</Link>
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
