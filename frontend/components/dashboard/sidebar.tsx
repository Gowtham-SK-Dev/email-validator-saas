"use client"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, CreditCard, FileText, HelpCircle, Home, Key, Settings, User, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigation } from "@/components/navigation/simple-navigation-provider"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { name: "Usage", href: "/dashboard/usage", icon: BarChart3 },
  { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
]

const accountNavigation = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { startLoading, stopLoading } = useNavigation()

  const handleNavigation = async (href: string) => {
    if (pathname === href) return

    startLoading()

    // Small delay to show the loader
    setTimeout(() => {
      router.push(href)
      // Stop loading after navigation
      setTimeout(() => {
        stopLoading()
      }, 500)
    }, 100)
  }

  return (
    <div className="flex h-full w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">EmailVerify</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Professional API</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {/* Main Menu */}
        <div className="space-y-1">
          <h3 className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Main Menu
          </h3>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400",
                  )}
                />
                {item.name}
              </button>
            )
          })}
        </div>

        {/* Account */}
        <div className="space-y-1 pt-6">
          <h3 className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Account
          </h3>
          {accountNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400",
                  )}
                />
                {item.name}
              </button>
            )
          })}
        </div>
      </nav>

      {/* User Info */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
