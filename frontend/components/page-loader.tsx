"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  // Handle initial page load
  useEffect(() => {
    // Show loader on initial load
    const initialTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Show for 1 second on initial load

    return () => clearTimeout(initialTimer)
  }, [])

  // Handle route changes
  useEffect(() => {
    setIsLoading(true)

    const routeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 300) // Quick flash for navigation

    return () => clearTimeout(routeTimer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
      </div>
    </div>
  )
}
