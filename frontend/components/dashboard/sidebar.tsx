"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { BarChart, CreditCard, Download, HelpCircle, Home, Key, Settings, User, ChevronRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "API Keys",
    icon: Key,
    href: "/dashboard/api-keys",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    label: "Usage Stats",
    icon: BarChart,
    href: "/dashboard/usage",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Subscription",
    icon: CreditCard,
    href: "/dashboard/subscription",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    badge: "Pro",
  },
  {
    label: "Payment",
    icon: CreditCard,
    href: "/dashboard/payment",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    label: "Reports",
    icon: Download,
    href: "/dashboard/reports",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    label: "Support",
    icon: HelpCircle,
    href: "/dashboard/support",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
]

const bottomRoutes = [
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60 w-64">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Zap className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">EmailVerify</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Professional API</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {routes.map((route, index) => {
            const isActive = pathname === route.href
            const IconComponent = route.icon

            return (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={route.href}>
                  <div
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-900/20 dark:text-blue-300"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200",
                        isActive
                          ? route.bgColor + " dark:bg-blue-900/30"
                          : "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
                      )}
                    >
                      <IconComponent
                        className={cn(
                          "h-4 w-4 transition-colors duration-200",
                          isActive
                            ? route.color + " dark:text-blue-300"
                            : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300",
                        )}
                      />
                    </div>
                    <span className="flex-1">{route.label}</span>
                    {route.badge && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/60"
                      >
                        {route.badge}
                      </Badge>
                    )}
                    {isActive && <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60">
        <nav className="space-y-2">
          {bottomRoutes.map((route, index) => {
            const isActive = pathname === route.href
            const IconComponent = route.icon

            return (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (routes.length + index) * 0.05 }}
              >
                <Link href={route.href}>
                  <div
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                      isActive
                        ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200",
                        isActive
                          ? "bg-slate-200 dark:bg-slate-700"
                          : "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
                      )}
                    >
                      <IconComponent
                        className={cn(
                          "h-4 w-4",
                          isActive ? "text-slate-600 dark:text-slate-300" : "text-slate-500 dark:text-slate-400",
                        )}
                      />
                    </div>
                    <span className="flex-1">{route.label}</span>
                    {isActive && <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
