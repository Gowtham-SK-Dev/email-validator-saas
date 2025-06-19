"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

interface LoaderContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
})

export function SimpleLoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true) // Start with loading on initialization
  const pathname = usePathname()
  const isInitialMount = useRef(true)
  const loadingTimeoutRef = useRef<NodeJS.Timeout>()

  // Handle initial page load
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false

      // Hide loader after initial page is ready
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800) // Show for 800ms on initial load

      return () => clearTimeout(timer)
    }
  }, [])

  // Handle route changes - hide loader immediately when navigation starts
  useEffect(() => {
    if (!isInitialMount.current) {
      // Show loader briefly when navigation starts
      setIsLoading(true)

      // Clear any existing timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }

      // Hide loader immediately to not interfere with page animations
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false)
      }, 50) // Very quick - just a flash to indicate navigation started

      return () => {
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current)
        }
      }
    }
  }, [pathname])

  const startLoading = () => {
    setIsLoading(true)
    // Auto-hide quickly to not interfere with animations
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current)
    }
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false)
    }, 50)
  }

  const stopLoading = () => {
    setIsLoading(false)
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current)
    }
  }

  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
      {isLoading && <InitialPageLoader />}
    </LoaderContext.Provider>
  )
}

export function useSimpleLoader() {
  return useContext(LoaderContext)
}

function InitialPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950 transition-opacity duration-200">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-3 border-slate-200 dark:border-slate-700"></div>
          <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-blue-500 animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Initializing...</p>
      </div>
    </div>
  )
}
