"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"
import { PageLoader } from "@/components/ui/page-loader"
import { usePathname, useSearchParams } from "next/navigation"

interface SimpleNavigationContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const SimpleNavigationContext = createContext<SimpleNavigationContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
})

export function SimpleNavigationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null)
  const previousPath = useRef<string>("")

  useEffect(() => {
    setMounted(true)
    previousPath.current = pathname
  }, [pathname])

  // Auto-detect navigation changes
  useEffect(() => {
    if (!mounted) return

    const currentPath = pathname + searchParams.toString()

    // Only trigger loading if the path actually changed
    if (previousPath.current !== currentPath && previousPath.current !== "") {
      console.log("🚀 Navigation detected, starting loader...")
      setIsLoading(true)

      // Auto-stop loading after a reasonable time
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current)
      }

      loadingTimeout.current = setTimeout(() => {
        console.log("⏹️ Auto-stopping loader...")
        setIsLoading(false)
      }, 800)
    }

    previousPath.current = currentPath
  }, [pathname, searchParams, mounted])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current)
      }
    }
  }, [])

  const startLoading = () => {
    if (!mounted) return

    console.log("🚀 Manually starting page loading...")
    setIsLoading(true)

    // Clear any existing timeout
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current)
    }

    // Auto-stop after timeout as fallback
    loadingTimeout.current = setTimeout(() => {
      console.log("⏹️ Auto-stopping manual loader...")
      setIsLoading(false)
    }, 3000)
  }

  const stopLoading = () => {
    if (!mounted) return

    console.log("⏹️ Manually stopping page loading...")
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current)
      loadingTimeout.current = null
    }
    setIsLoading(false)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <SimpleNavigationContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
      <PageLoader isLoading={isLoading} />
    </SimpleNavigationContext.Provider>
  )
}

export function useNavigation() {
  return useContext(SimpleNavigationContext)
}
