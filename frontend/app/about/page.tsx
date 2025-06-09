"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Globe, Users, Award, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Real-time Verification",
    description:
      "Verify emails instantly with our powerful API that checks syntax, domain validity, and mailbox existence.",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "High Accuracy",
    description:
      "Our advanced algorithms provide industry-leading accuracy rates to ensure your email lists are clean.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Globe,
    title: "Easy Integration",
    description:
      "Simple REST API with comprehensive documentation for quick and easy integration into your applications.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Users,
    title: "Scalable Solutions",
    description: "From small businesses to enterprise solutions, our plans scale with your needs.",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Award,
    title: "GDPR Compliant",
    description: "Fully compliant with data protection regulations, ensuring your data and your users' privacy.",
    gradient: "from-red-400 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to help you with any questions.",
    gradient: "from-teal-400 to-cyan-500",
  },
]

const stats = [
  { number: "99.9%", label: "Accuracy Rate" },
  { number: "10K+", label: "Happy Customers" },
  { number: "50M+", label: "Emails Verified" },
  { number: "24/7", label: "Support" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black relative overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 dark:bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-purple-300/20 dark:bg-purple-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-300/20 dark:bg-pink-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 60, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 right-10 w-64 h-64 bg-cyan-300/20 dark:bg-cyan-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
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
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  About EmailVerify
                </motion.h1>
                <motion.p
                  className="max-w-[900px] text-slate-600 dark:text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  We provide reliable email verification services to help businesses improve their email deliverability
                  and reduce bounce rates with cutting-edge technology.
                </motion.p>
              </div>
            </motion.div>

            {/* Mission Section */}
            <motion.div
              className="mx-auto max-w-4xl py-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 shadow-xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <motion.h2
                      className="text-2xl font-bold text-slate-900 dark:text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      Our Mission
                    </motion.h2>
                    <motion.p
                      className="text-slate-600 dark:text-slate-300 leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      At EmailVerify, we're committed to helping businesses maintain clean, accurate email lists. Our
                      advanced email verification technology ensures that your marketing campaigns reach real, engaged
                      recipients while protecting your sender reputation and maximizing your ROI.
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              className="mx-auto max-w-6xl py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl font-bold text-center mb-12 text-slate-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                Why Choose Us?
              </motion.h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6 text-center space-y-4">
                          <motion.div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg mx-auto`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <IconComponent className="h-6 w-6 text-white" />
                          </motion.div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="mx-auto max-w-4xl py-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.4 + index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                          {stat.number}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Technology Section */}
            <motion.div
              className="mx-auto max-w-4xl py-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
            >
              <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 shadow-xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <motion.h2
                      className="text-2xl font-bold text-slate-900 dark:text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3, duration: 0.6 }}
                    >
                      Our Technology
                    </motion.h2>
                    <motion.p
                      className="text-slate-600 dark:text-slate-300 leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.2, duration: 0.6 }}
                    >
                      We use cutting-edge technology to provide the most accurate email verification results. Our system
                      performs multiple checks including syntax validation, domain verification, MX record checking, and
                      SMTP verification to ensure the highest quality results. Our infrastructure is built for scale,
                      handling millions of verifications daily with lightning-fast response times.
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
