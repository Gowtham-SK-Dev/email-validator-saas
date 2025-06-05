"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Zap, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const routes = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/about", label: "About", active: pathname === "/about" },
    { href: "/pricing", label: "Pricing", active: pathname === "/pricing" },
    { href: "/contact", label: "Contact", active: pathname === "/contact" },
  ]

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg"
          : "bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        <motion.div className="flex items-center gap-8" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-xl shadow-lg"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Zap className="h-5 w-5 text-white" />
            </motion.div>
            <span className="font-dm-sans font-bold text-xl bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
              EmailVerify
            </span>
          </Link>

          <nav className="hidden md:flex gap-8">
            {routes.map((route, index) => (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
              >
                <Link
                  href={route.href}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-300 ease-in-out hover:text-indigo-600 dark:hover:text-indigo-400",
                    route.active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300",
                  )}
                >
                  {route.label}
                  {route.active && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                      layoutId="activeTab"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        <motion.div
          className="hidden md:flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="ghost"
            className="rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-300"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>

          <Button
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            asChild
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </motion.div>

        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-slate-200/60 dark:border-slate-800/60"
            >
              <nav className="flex flex-col gap-6 mt-8">
                {routes.map((route, index) => (
                  <motion.div
                    key={route.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={route.href}
                      className={cn(
                        "text-base font-medium transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 block py-3 px-4 rounded-xl",
                        route.active
                          ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50"
                          : "text-slate-600 dark:text-slate-300",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {route.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="flex flex-col gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Button variant="outline" className="rounded-xl" asChild>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    asChild
                  >
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
