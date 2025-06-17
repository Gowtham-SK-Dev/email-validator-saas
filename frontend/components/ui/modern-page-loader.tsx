"use client"

import { useEffect, useState } from "react"

interface ModernPageLoaderProps {
  isLoading: boolean
  variant?: "default" | "minimal" | "dots" | "pulse"
}

export function ModernPageLoader({ isLoading, variant = "default" }: ModernPageLoaderProps) {
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isLoading) {
      setShow(true)
    } else {
      const timer = setTimeout(() => setShow(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!mounted || !show) {
    return null
  }

  const renderLoader = () => {
    switch (variant) {
      case "minimal":
        return (
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-slate-300 dark:border-slate-600 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Loading...</span>
          </div>
        )

      case "dots":
        return (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Loading content...</p>
          </div>
        )

      case "pulse":
        return (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-full animate-ping absolute"></div>
              <div className="w-12 h-12 bg-blue-700 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Preparing your experience...</p>
          </div>
        )

      default:
        return (
          <div className="flex flex-col items-center gap-6">
            {/* Sophisticated loader */}
            <div className="relative w-20 h-20">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>

              {/* Animated gradient ring */}
              <div className="absolute inset-0 border-4 border-transparent rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-smooth mask-ring"></div>

              {/* Inner glow */}
              <div className="absolute inset-2 border-2 border-blue-400/30 rounded-full animate-pulse"></div>

              {/* Center icon */}
              <div className="absolute inset-6 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced text */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Loading
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                We're preparing something amazing for you
              </p>
            </div>

            {/* Animated progress indicator */}
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        isLoading
          ? "opacity-100 backdrop-blur-lg bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-950/90 dark:to-slate-900/90"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`transform transition-all duration-300 ${isLoading ? "scale-100" : "scale-95"}`}>
        {renderLoader()}
      </div>
    </div>
  )
}
