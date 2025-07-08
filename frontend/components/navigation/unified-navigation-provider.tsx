"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { PageLoader } from "@/components/ui/page-loader"

interface NavigationContextType {
  isLoading: boolean
  startLoading: (source?: string) => void
  stopLoading: (source?: string) => void
}

const NavigationContext = createContext<NavigationContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
})

export function UnifiedNavigationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true) // Start with loading true
  const [mounted, setMounted] = useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const previousPathRef = useRef<string>("")
  const isManualLoadingRef = useRef<boolean>(false)
  const loadingSourceRef = useRef<string>("initial-load")
  const initialLoadCompleteRef = useRef<boolean>(false)

  // Initialize and handle initial page load
  useEffect(() => {

    const initialPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    previousPathRef.current = initialPath

    // Start initial loading
    setIsLoading(true)
    loadingSourceRef.current = "initial-load"

    // Mark as mounted
    setMounted(true)

    // Stop initial loading after a short delay to allow page to render
    const initialLoadTimer = setTimeout(() => {
      setIsLoading(false)
      loadingSourceRef.current = ""
      initialLoadCompleteRef.current = true
    }, 800) // Show loader for 800ms on initial load

    return () => {
      clearTimeout(initialLoadTimer)
    }
  }, []) // Empty dependency array - only run once on mount

  // Handle route changes (after initial load)
  useEffect(() => {
    if (!mounted || !initialLoadCompleteRef.current) return

    const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    const previousPath = previousPathRef.current

    // Only trigger auto-loading if:
    // 1. Path actually changed
    // 2. We have a previous path
    // 3. No manual loading is in progress
    // 4. Initial load is complete
    if (previousPath !== currentPath && previousPath !== "" && !isManualLoadingRef.current) {
      startLoading("auto-route-change")
    }

    previousPathRef.current = currentPath
  }, [pathname, searchParams, mounted])

  // Handle browser navigation events
  useEffect(() => {
    if (!mounted) return

    const handleBeforeUnload = () => {
      setIsLoading(true)
      loadingSourceRef.current = "page-unload"
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && initialLoadCompleteRef.current) {
        // Small delay to check if we need to show loading
        setTimeout(() => {
          if (!isLoading) {
            startLoading("visibility-change")
            setTimeout(() => stopLoading("visibility-complete"), 500)
          }
        }, 100)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [mounted, isLoading])

  const startLoading = useCallback(
    (source = "manual") => {
      if (!mounted && source !== "initial-load") return

      // Prevent double loading from same source
      if (isLoading && loadingSourceRef.current === source) {
        console.log(`⚠️ Loading already in progress from ${source}, skipping...`)
        return
      }


      // Clear any existing timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }

      // Set loading state
      setIsLoading(true)
      loadingSourceRef.current = source

      // Mark as manual loading if triggered manually
      if (source.includes("manual") || source.includes("sidebar") || source.includes("navbar")) {
        isManualLoadingRef.current = true
      }

      // Auto-stop loading after a reasonable time
      const timeoutDuration = source === "initial-load" ? 1000 : 2000
      loadingTimeoutRef.current = setTimeout(() => {
        stopLoading("timeout")
      }, timeoutDuration)
    },
    [mounted, isLoading],
  )

  const stopLoading = useCallback(
    (source = "manual") => {
      if (!mounted && source !== "timeout") return

      // Clear timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
        loadingTimeoutRef.current = null
      }

      // Reset states
      setIsLoading(false)
      loadingSourceRef.current = ""
      isManualLoadingRef.current = false
    },
    [mounted],
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <NavigationContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
      <PageLoader isLoading={isLoading} variant="default" message={getLoadingMessage(loadingSourceRef.current)} />
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a UnifiedNavigationProvider")
  }
  return context
}

function getLoadingMessage(source: string): string {
  switch (source) {
    case "initial-load":
      return "Initializing application..."
    case "auto-route-change":
      return "Navigating to page..."
    case "sidebar":
    case "navbar":
      return "Loading page..."
    case "page-unload":
      return "Preparing to leave..."
    case "visibility-change":
      return "Refreshing page..."
    default:
      return "Loading..."
  }
}
