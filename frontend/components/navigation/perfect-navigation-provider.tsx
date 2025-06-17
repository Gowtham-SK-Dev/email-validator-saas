"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { PerfectPageLoader } from "@/components/ui/perfect-page-loader"

interface NavigationContextType {
  isLoading: boolean
  startLoading: (source?: string) => void
  stopLoading: (source?: string) => void
  loadingProgress: number
}

const NavigationContext = createContext<NavigationContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
  loadingProgress: 0,
})

export function PerfectNavigationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pageLoadCheckRef = useRef<NodeJS.Timeout | null>(null)
  const previousPathRef = useRef<string>("")
  const loadingSourceRef = useRef<string>("")
  const startTimeRef = useRef<number>(0)
  const isNavigatingRef = useRef<boolean>(false)
  const maxWaitTimeRef = useRef<number>(3000) // Reduced to 3 seconds

  // Initialize
  useEffect(() => {
    setMounted(true)
    const initialPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    previousPathRef.current = initialPath
    console.log(`🏁 Navigation provider initialized with path: ${initialPath}`)

    // Listen for browser navigation events
    const handlePopState = () => {
      console.log("🔄 Browser back/forward navigation detected")
      startLoading("browser-navigation")
    }

    const handleBeforeUnload = () => {
      console.log("🔄 Page unload detected")
      startLoading("page-unload")
    }

    // Listen for programmatic navigation
    const handleRouteChangeStart = () => {
      console.log("🚀 Route change started")
      startLoading("route-change")
    }

    window.addEventListener("popstate", handlePopState)
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Custom event for manual navigation triggers
    window.addEventListener("navigation-start", handleRouteChangeStart)

    return () => {
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("navigation-start", handleRouteChangeStart)
    }
  }, [])

  // Route change detection - IMPROVED
  useEffect(() => {
    if (!mounted) return

    const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    const previousPath = previousPathRef.current

    // If path changed and we have a previous path (not initial load)
    if (previousPath !== currentPath && previousPath !== "") {
      console.log(`🚀 Route changed: ${previousPath} → ${currentPath}`)

      // If we're not already loading from a manual trigger, start loading
      if (!isNavigatingRef.current) {
        console.log("🔄 Auto-starting loader for route change")
        startLoading("route-change")
      }

      // Check if page is fully loaded after a short delay
      setTimeout(() => {
        checkPageFullyLoaded()
      }, 100)
    }

    previousPathRef.current = currentPath
  }, [pathname, searchParams, mounted])

  // Check if page is fully loaded - IMPROVED
  const checkPageFullyLoaded = useCallback(() => {
    console.log("🔍 Checking if page is fully loaded...")

    let checkCount = 0
    const maxChecks = 30 // Maximum 3 seconds of checking (30 * 100ms)

    const checkConditions = () => {
      checkCount++

      // Multiple conditions to ensure page is truly ready
      const documentReady = document.readyState === "complete"
      const hasContent = document.body.children.length > 0
      const noLoadingSpinners = document.querySelectorAll('[data-loading="true"]').length === 0

      // Check if React has finished rendering by looking for common indicators
      const hasMainContent =
        document.querySelector("main") !== null ||
        document.querySelector('[role="main"]') !== null ||
        document.querySelector(".dashboard") !== null ||
        document.querySelector("h1, h2") !== null ||
        document.querySelector("[data-page-loaded]") !== null

      console.log(`📊 Page load check #${checkCount}:`, {
        documentReady,
        hasContent,
        noLoadingSpinners,
        hasMainContent,
        readyState: document.readyState,
      })

      if (documentReady && hasContent && hasMainContent) {
        console.log("✅ Page is fully loaded!")
        isNavigatingRef.current = false
        stopLoading("page-fully-loaded")
        return true
      }

      // Stop checking after max attempts
      if (checkCount >= maxChecks) {
        console.log("⏰ Max check attempts reached, stopping loader")
        isNavigatingRef.current = false
        stopLoading("max-checks-reached")
        return true
      }

      return false
    }

    // Clear any existing check
    if (pageLoadCheckRef.current) {
      clearTimeout(pageLoadCheckRef.current)
    }

    // Check immediately
    if (!checkConditions()) {
      // If not ready, keep checking every 100ms
      const checkInterval = setInterval(() => {
        if (checkConditions()) {
          clearInterval(checkInterval)
        }
      }, 100)

      // Cleanup interval after max time
      setTimeout(() => {
        clearInterval(checkInterval)
        if (isLoading) {
          console.log("⏰ Force stopping loader after max wait time")
          stopLoading("max-wait-time")
        }
      }, maxWaitTimeRef.current)
    }
  }, [isLoading])

  // Progress simulation - FASTER and SMOOTHER
  const simulateProgress = useCallback(() => {
    setLoadingProgress(0)

    const progressSteps = [
      { progress: 20, delay: 50 }, // Start quickly
      { progress: 40, delay: 100 }, // Loading resources
      { progress: 60, delay: 150 }, // Processing
      { progress: 80, delay: 100 }, // Rendering
      { progress: 95, delay: 50 }, // Almost done
    ]

    let currentStep = 0

    const runNextStep = () => {
      if (currentStep < progressSteps.length && isLoading) {
        const step = progressSteps[currentStep]

        setTimeout(() => {
          if (isLoading) {
            setLoadingProgress(step.progress)
            currentStep++
            runNextStep()
          }
        }, step.delay)
      }
    }

    runNextStep()
  }, [isLoading])

  const startLoading = useCallback(
    (source = "manual") => {
      if (!mounted) return

      console.log(`🚀 STARTING LOADER from: ${source}`)
      loadingSourceRef.current = source
      startTimeRef.current = Date.now()
      isNavigatingRef.current = true

      // Show loader immediately
      setIsLoading(true)
      simulateProgress()

      // Clear any existing timeouts
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current)
      if (pageLoadCheckRef.current) clearTimeout(pageLoadCheckRef.current)

      // Fallback timeout - force stop after max wait time
      loadingTimeoutRef.current = setTimeout(() => {
        console.log("⏰ FALLBACK TIMEOUT - Force stopping loader")
        isNavigatingRef.current = false
        stopLoading("fallback-timeout")
      }, maxWaitTimeRef.current)
    },
    [mounted, simulateProgress, isLoading],
  )

  const stopLoading = useCallback(
    (source = "manual") => {
      if (!mounted) return

      const duration = Date.now() - startTimeRef.current
      console.log(`⏹️ STOPPING LOADER from: ${source} (duration: ${duration}ms)`)

      // Clear all timeouts
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
        loadingTimeoutRef.current = null
      }
      if (progressIntervalRef.current) {
        clearTimeout(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
      if (pageLoadCheckRef.current) {
        clearTimeout(pageLoadCheckRef.current)
        pageLoadCheckRef.current = null
      }

      // Reset navigation state
      isNavigatingRef.current = false

      // Complete progress and hide loader
      setLoadingProgress(100)

      // Small delay for smooth exit animation
      setTimeout(() => {
        setIsLoading(false)
        setLoadingProgress(0)
        loadingSourceRef.current = ""
      }, 150) // Reduced delay
    },
    [mounted],
  )

  // Listen for document ready state changes
  useEffect(() => {
    if (!mounted) return

    const handleReadyStateChange = () => {
      if (isLoading && document.readyState === "complete") {
        console.log("📄 Document ready state changed to complete")
        setTimeout(() => {
          if (isLoading) {
            checkPageFullyLoaded()
          }
        }, 50)
      }
    }

    document.addEventListener("readystatechange", handleReadyStateChange)

    // Also check immediately if document is already complete
    if (document.readyState === "complete" && isLoading) {
      setTimeout(() => {
        if (isLoading) {
          checkPageFullyLoaded()
        }
      }, 50)
    }

    return () => {
      document.removeEventListener("readystatechange", handleReadyStateChange)
    }
  }, [isLoading, mounted, checkPageFullyLoaded])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current)
      if (progressIntervalRef.current) clearTimeout(progressIntervalRef.current)
      if (pageLoadCheckRef.current) clearTimeout(pageLoadCheckRef.current)
    }
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NavigationContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
        loadingProgress,
      }}
    >
      {children}
      <PerfectPageLoader
        isLoading={isLoading}
        progress={loadingProgress}
        source={loadingSourceRef.current}
        variant="modern"
      />
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a PerfectNavigationProvider")
  }
  return context
}
