"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
    bgGradient: "from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50",
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
    bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50",
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
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-800/50",
  },
  {
    name: "Enterprise",
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
    bgGradient: "from-amber-50 to-orange-50 dark:from-amber-900/50 dark:to-orange-800/50",
  },
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-950 dark:via-indigo-950/30 dark:to-purple-950/30"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge
                variant="secondary"
                className="mb-6 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900 transition-all duration-300 rounded-xl px-4 py-2"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Choose Your Plan
              </Badge>
            </motion.div>
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-5xl font-dm-sans bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-slate-600 dark:text-slate-300 md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Choose the perfect plan for your email verification needs. Start free, scale as you grow.
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative"
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 shadow-xl rounded-xl">
                      Most Popular
                    </Badge>
                  </motion.div>
                )}

                <Card
                  className={cn(
                    "flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-2xl border-2 rounded-2xl overflow-hidden",
                    plan.popular
                      ? "border-purple-200 dark:border-purple-800 shadow-xl scale-105 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/50 dark:to-pink-950/50"
                      : "border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white/50 dark:bg-slate-900/50",
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
                    <CardTitle className="text-2xl font-bold font-dm-sans">{plan.name}</CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                      {plan.suitableFor}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 text-center px-6">
                    <motion.div className="mb-8" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <span className="text-4xl font-bold font-dm-sans bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 ml-1 text-sm">
                        {plan.validity !== "One-time" ? `/ ${plan.validity}` : ""}
                      </span>
                    </motion.div>

                    <div className={cn("mb-8 p-4 rounded-2xl bg-gradient-to-r", plan.bgGradient)}>
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
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + featureIndex * 0.05 + 1, duration: 0.4 }}
                          viewport={{ once: true }}
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
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white",
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

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-300 ease-in-out rounded-2xl px-8 py-6 text-base"
            asChild
          >
            <Link href="/pricing">View All Plans & Features</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
