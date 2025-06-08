"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Bell, Menu, User, Search, Settings } from "lucide-react"
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

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 dark:border-slate-800/60">
      <div className="flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Mobile Menu */}
        <div className="flex items-center gap-4">
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

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 max-w-sm">
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

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </motion.div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                className="flex items-center gap-2 rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">John Doe</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">john@example.com</p>
                </div>
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 dark:bg-slate-900 dark:border-slate-800">
              <DropdownMenuLabel className="dark:text-slate-300">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-slate-800" />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 cursor-pointer dark:text-slate-300 dark:focus:bg-slate-800 dark:focus:text-slate-200"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 cursor-pointer dark:text-slate-300 dark:focus:bg-slate-800 dark:focus:text-slate-200"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-slate-800" />
              <DropdownMenuItem asChild>
                <Link
                  href="/login"
                  className="text-red-600 dark:text-red-400 cursor-pointer dark:focus:bg-slate-800 dark:focus:text-red-300"
                >
                  Sign out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
