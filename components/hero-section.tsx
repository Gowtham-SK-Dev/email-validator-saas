"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Zap, Shield, Globe, Star, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-950 dark:via-indigo-950/30 dark:to-purple-950/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center">
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900 transition-all duration-300 rounded-xl px-4 py-2"
              >
                <Zap className="w-4 h-4 mr-2" />
                99.9% Accuracy Rate
              </Badge>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl font-dm-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Verify Emails
                </span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Instantly
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="max-w-[600px] text-slate-600 dark:text-slate-300 md:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Reduce bounce rates by 95% with our AI-powered email verification API. Real-time validation, bulk
                processing, and enterprise-grade security for modern businesses.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out rounded-2xl px-8 py-6 text-base"
                asChild
              >
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out rounded-2xl px-8 py-6 text-base"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { icon: CheckCircle, text: "No credit card required", color: "text-green-500" },
                { icon: Shield, text: "GDPR Compliant", color: "text-indigo-500" },
                { icon: Globe, text: "Global Coverage", color: "text-purple-500" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                >
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <span className="hidden sm:inline">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-xl"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-xl"
                animate={{
                  y: [0, 20, 0],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Main Dashboard Mockup */}
              <motion.div
                className="relative h-[400px] w-[400px] md:h-[500px] md:w-[500px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xl p-6 overflow-hidden"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="space-y-6 w-full h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl"></div>
                    <div className="flex gap-2">
                      <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
                      <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.6 }}
                    >
                      <div className="h-4 w-16 bg-indigo-300 dark:bg-indigo-600 rounded-lg mb-2"></div>
                      <div className="h-6 w-20 bg-indigo-500 rounded-lg"></div>
                    </motion.div>
                    <motion.div
                      className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-2xl border border-purple-200/50 dark:border-purple-800/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.7, duration: 0.6 }}
                    >
                      <div className="h-4 w-16 bg-purple-300 dark:bg-purple-600 rounded-lg mb-2"></div>
                      <div className="h-6 w-20 bg-purple-500 rounded-lg"></div>
                    </motion.div>
                  </div>

                  {/* Chart Area */}
                  <motion.div
                    className="h-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-4 flex items-end justify-between border border-slate-200/50 dark:border-slate-700/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.9, duration: 0.6 }}
                  >
                    {[40, 70, 45, 80, 60, 90, 75].map((height, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg"
                        style={{ width: "12px" }}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 2.1 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                      />
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.div
                      className="h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.5, duration: 0.6 }}
                    >
                      <div className="h-4 w-24 bg-white/30 rounded-lg"></div>
                    </motion.div>
                    <motion.div
                      className="h-10 bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.7, duration: 0.6 }}
                    >
                      <div className="h-3 w-20 bg-slate-400 dark:bg-slate-500 rounded-lg"></div>
                    </motion.div>
                  </div>
                </div>

                {/* Floating Success Indicators */}
                <motion.div
                  className="absolute top-20 right-6 bg-green-500 text-white text-xs px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3, duration: 0.6 }}
                >
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </motion.div>
                <motion.div
                  className="absolute bottom-20 left-6 bg-indigo-500 text-white text-xs px-3 py-2 rounded-xl shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.2, duration: 0.6 }}
                >
                  <Star className="h-3 w-3 inline mr-1" />
                  99.9% Accuracy
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {[
            { number: "99.9%", label: "Accuracy Rate", icon: TrendingUp },
            { number: "10K+", label: "Happy Customers", icon: Star },
            { number: "50M+", label: "Emails Verified", icon: CheckCircle },
            { number: "24/7", label: "Support", icon: Shield },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 1.4, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center mb-2">
                <stat.icon className="h-6 w-6 text-indigo-500 mr-2" />
                <div className="text-3xl md:text-4xl font-bold font-dm-sans bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
