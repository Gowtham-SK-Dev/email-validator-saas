"use client"

import { useRouter } from "next/navigation"
import { Bell, Menu, User, Moon, Sun, Search, Settings, LogOut, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useAuth } from "@/lib/hooks/use-auth"
import { useNavigation } from "@/components/navigation/unified-navigation-provider"
import { toast } from "sonner"
import { useState, useTransition } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

export function Navbar() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { startLoading, isLoading } = useNavigation()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isPending, startTransition] = useTransition()

  const handleSignOut = async () => {
    if (isLoggingOut || isLoading) return

    setIsLoggingOut(true)
    startLoading("navbar-logout")

    try {
      await logout()
      toast.success("Logged out successfully")
      startTransition(() => {
        router.push("/login")
      })
    } catch (error: any) {
      console.error("Logout error:", error)
      toast.error(error.message || "Failed to logout. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleNavigation = (path: string) => {
    if (isLoading) {
      console.log("Navigation already in progress, skipping...")
      return
    }

    startLoading("navbar-navigation")
    startTransition(() => {
      router.push(path)
    })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 dark:border-slate-800/60 relative overflow-hidden">
      {/* Background Circles for Navbar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-5 left-1/4 w-20 h-20 rounded-full bg-blue-400/8 dark:bg-blue-600/4 blur-xl" />
        <div className="absolute -top-5 right-1/4 w-16 h-16 rounded-full bg-purple-400/8 dark:bg-purple-600/4 blur-xl" />
      </div>

      <div className="relative z-10 flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Left Side - Mobile Menu + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800">
                <Menu className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>

          {/* Logo for Mobile */}
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">EmailVerify</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 max-w-sm ml-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-slate-100 dark:hover:bg-slate-800">
            <Search className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </Button>

          {/* Dark Mode Toggle - Enhanced */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600">
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus:outline-none">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                    {user?.username || "John Doe"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {user?.email || "john@example.com"}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 dark:bg-slate-900 dark:border-slate-800">
              <DropdownMenuLabel className="dark:text-slate-300 font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-slate-800" />
              <DropdownMenuItem
                onClick={() => handleNavigation("/dashboard/profile")}
                className="font-medium"
                disabled={isPending || isLoading}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleNavigation("/dashboard/settings")}
                className="font-medium"
                disabled={isPending || isLoading}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-slate-800" />
              <DropdownMenuItem
                onClick={handleSignOut}
                disabled={isLoggingOut || isPending || isLoading}
                className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-300 font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoggingOut ? "Signing out..." : "Sign out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
