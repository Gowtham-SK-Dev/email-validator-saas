"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { PageLoader } from "@/components/ui/page-loader"

interface NavigationContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Stop loading when pathname changes
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Small delay to show the loader

    return () => clearTimeout(timer)
  }, [pathname, mounted])

  const startLoading = () => {
    if (mounted) {
      setIsLoading(true)
    }
  }

  const stopLoading = () => {
    if (mounted) {
      setIsLoading(false)
    }
  }

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NavigationContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      <PageLoader isLoading={isLoading} />
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
