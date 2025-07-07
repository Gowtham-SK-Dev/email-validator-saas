"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/components/navigation/unified-navigation-provider"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  CreditCard,
  HelpCircle,
  Home,
  Key,
  Settings,
  User,
  Zap,
  FileText,
  ChevronRight,
  Activity,
} from "lucide-react"
import { useState, useEffect } from "react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "API Keys",
    href: "/dashboard/api-keys",
    icon: Key,
  },
  {
    title: "Usage",
    href: "/dashboard/usage",
    icon: Activity,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Payment",
    href: "/dashboard/payment",
    icon: CreditCard,
  },
  {
    title: "Subscription",
    href: "/dashboard/subscription",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { startLoading, isLoading } = useNavigation()
  const [mounted, setMounted] = useState(false)
  const [clickedRoute, setClickedRoute] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavigation = (href: string, label: string) => {
    // Don't navigate if already on the same page
    if (pathname === href) {
      console.log(`Already on ${label} page, skipping navigation`)
      return
    }

    // Don't navigate if already loading
    if (isLoading) {
      console.log(`Navigation already in progress, skipping ${label}`)
      return
    }

    console.log(`🎯 Sidebar menu clicked: ${label} (${pathname} → ${href})`)

    // Set visual feedback immediately
    setClickedRoute(href)
    

    // Navigate immediately
    router.push(href)

    // Clear clicked state after navigation
    setTimeout(() => {
      setClickedRoute(null)
    }, 1500)
  }

  if (!mounted) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60 w-64">
        <div className="p-6 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm">
              <div className="h-5 w-5 bg-white rounded-sm" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">EmailVerify</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Professional API</p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {[...sidebarItems].map((route) => {
              const Icon = route.icon
              return (
                <div
                  key={route.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="flex-1">{route.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl dark:bg-slate-900/95 border-r border-slate-200/60 dark:border-slate-800/60 w-64 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/20" />
      <div className="absolute top-20 right-4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-2xl" />

      {/* Logo */}
      <div className="p-6 border-b border-slate-200/60 dark:border-slate-800/60 relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Zap className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h2 className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              EmailVerify
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Professional API</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 relative z-10">
        <nav className="space-y-2">
          {sidebarItems.map((route, index) => {
            const isActive = pathname === route.href
            const isClicked = clickedRoute === route.href
            const IconComponent = route.icon

            return (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => {
                    startLoading(`sidebar-${route.title.toLowerCase().replace(/\s+/g, "-")}`);
                    handleNavigation(route.href, route.title);
                  }}                  
                  disabled={isActive || isLoading} // Disable if active or loading
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out w-full relative",
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-lg dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 cursor-default"
                      : isClicked || isLoading
                        ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 dark:from-blue-800/40 dark:to-purple-800/40 dark:text-blue-400 scale-95"
                        : "text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:from-slate-800/60 dark:hover:to-slate-700/60 dark:hover:text-slate-200 cursor-pointer",
                  )}
                >
                  {/* Loading pulse effect for clicked item */}
                  {(isClicked || (isLoading && !isActive)) && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
                  )}

                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 shadow-sm relative z-10",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/40 shadow-md"
                        : isClicked || (isLoading && !isActive)
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "h-4 w-4 transition-colors duration-200",
                        isActive
                          ? "text-blue-600 dark:text-blue-300"
                          : isClicked || (isLoading && !isActive)
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300",
                      )}
                    />
                  </div>
                  <span className="flex-1 text-left relative z-10">{route.title}</span>
                  {route.badge && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 dark:border-blue-800/60 shadow-sm relative z-10"
                    >
                      {route.badge}
                    </Badge>
                  )}
                  {isActive && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                      <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400 relative z-10" />
                    </motion.div>
                  )}
                </button>
              </motion.div>
            )
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60 relative z-10">
        <nav className="space-y-2">
          {sidebarItems.slice(6).map((route, index) => {
            const isActive = pathname === route.href
            const isClicked = clickedRoute === route.href
            const IconComponent = route.icon

            return (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (sidebarItems.length + index) * 0.05 }}
              >
                <button
                  onClick={() => {
                    startLoading(`sidebar-${route.title.toLowerCase().replace(/\s+/g, "-")}`);
                    handleNavigation(route.href, route.title);
                  }}                  
                  disabled={isActive || isLoading}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out w-full relative",
                    isActive
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 shadow-md cursor-default"
                      : isClicked || (isLoading && !isActive)
                        ? "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 scale-95"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 cursor-pointer",
                  )}
                >
                  {/* Loading pulse effect for clicked item */}
                  {(isClicked || (isLoading && !isActive)) && (
                    <div className="absolute inset-0 rounded-xl bg-slate-500/10 animate-pulse" />
                  )}

                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 relative z-10",
                      isActive
                        ? "bg-slate-200 dark:bg-slate-700 shadow-sm"
                        : isClicked || (isLoading && !isActive)
                          ? "bg-slate-300 dark:bg-slate-600"
                          : "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "h-4 w-4 transition-colors duration-200",
                        isActive
                          ? "text-slate-600 dark:text-slate-300"
                          : isClicked || (isLoading && !isActive)
                            ? "text-slate-700 dark:text-slate-300"
                            : "text-slate-500 dark:text-slate-400",
                      )}
                    />
                  </div>
                  <span className="flex-1 text-left relative z-10">{route.title}</span>
                  {isActive && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                      <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400 relative z-10" />
                    </motion.div>
                  )}
                </button>
              </motion.div>
            )
          })}
        </nav>

        {/* Usage Progress */}
        <motion.div
          className="mt-4 p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl shadow-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-400 font-medium">API Usage</span>
            <span className="font-bold text-slate-900 dark:text-slate-200">2,847 / 3,500</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "81%" }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">81% used this month</p>
        </motion.div>
      </div>
    </div>
  )
}
