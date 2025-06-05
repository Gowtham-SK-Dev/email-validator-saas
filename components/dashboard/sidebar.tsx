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
    <div className="flex flex-col h-full bg-white border-r border-slate-200/60 w-64">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/60">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Zap className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h2 className="font-bold text-lg text-slate-900">EmailVerify</h2>
            <p className="text-xs text-slate-500">Professional API</p>
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
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200",
                        isActive ? route.bgColor : "group-hover:bg-slate-100",
                      )}
                    >
                      <IconComponent
                        className={cn(
                          "h-4 w-4 transition-colors duration-200",
                          isActive ? route.color : "text-slate-500 group-hover:text-slate-700",
                        )}
                      />
                    </div>
                    <span className="flex-1">{route.label}</span>
                    {route.badge && (
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                        {route.badge}
                      </Badge>
                    )}
                    {isActive && <ChevronRight className="h-4 w-4 text-blue-600" />}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-slate-200/60">
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
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200",
                        isActive ? "bg-slate-200" : "group-hover:bg-slate-100",
                      )}
                    >
                      <IconComponent className="h-4 w-4 text-slate-600" />
                    </div>
                    <span className="flex-1">{route.label}</span>
                    {isActive && <ChevronRight className="h-4 w-4 text-slate-600" />}
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
