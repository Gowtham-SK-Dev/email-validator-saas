"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Globe, Users, Award, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Real-time Verification",
    description:
      "Verify emails in milliseconds with our powerful API that checks syntax, domain validity, and mailbox existence.",
    gradient: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
  },
  {
    icon: Shield,
    title: "99.9% Accuracy",
    description:
      "Our advanced AI algorithms provide industry-leading accuracy rates to ensure your email lists are pristine.",
    gradient: "from-green-400 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Verify emails from any country with our worldwide infrastructure and comprehensive domain database.",
    gradient: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
  },
  {
    icon: Users,
    title: "Trusted by 10,000+",
    description: "Join thousands of businesses that trust our platform for their email verification needs.",
    gradient: "from-blue-400 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
  },
  {
    icon: Award,
    title: "GDPR Compliant",
    description: "Fully compliant with data protection regulations, ensuring your data and your users' privacy.",
    gradient: "from-red-400 to-pink-500",
    bgGradient: "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "From startups to enterprises, our infrastructure scales seamlessly with your growing needs.",
    gradient: "from-teal-400 to-cyan-500",
    bgGradient: "from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container relative mx-auto px-4 lg:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-5xl font-dm-sans bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Choose EmailVerify?
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-slate-600 dark:text-slate-300 md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              We provide a reliable email verification service to help businesses improve their email deliverability and
              reduce bounce rates with cutting-edge technology.
            </motion.p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 ease-in-out rounded-2xl overflow-hidden group-hover:border-indigo-200 dark:group-hover:border-indigo-800">
                  <CardContent className="p-8 text-center space-y-6">
                    <motion.div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-xl mx-auto`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </motion.div>

                    <motion.h3
                      className="text-xl font-semibold text-slate-900 dark:text-white font-dm-sans"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {feature.title}
                    </motion.h3>

                    <motion.p
                      className="text-slate-600 dark:text-slate-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {feature.description}
                    </motion.p>

                    {/* Hover Effect Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10`}
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { number: "99.9%", label: "Accuracy Rate" },
            { number: "10K+", label: "Happy Customers" },
            { number: "50M+", label: "Emails Verified" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 1.4, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold font-dm-sans bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 1.6, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <motion.div
                className="text-sm text-slate-600 dark:text-slate-400 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 1.8, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
