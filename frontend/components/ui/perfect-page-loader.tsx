"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface PerfectPageLoaderProps {
  isLoading: boolean
  progress?: number
  source?: string
  variant?: "modern" | "minimal" | "elegant" | "playful"
}

export function PerfectPageLoader({
  isLoading,
  progress = 0,
  source = "",
  variant = "modern",
}: PerfectPageLoaderProps) {
  const [show, setShow] = useState(false)
  const [animationClass, setAnimationClass] = useState("")

  useEffect(() => {
    if (isLoading) {
      setShow(true)
      setAnimationClass("animate-in fade-in duration-200")
    } else {
      setAnimationClass("animate-out fade-out duration-300")
      const timer = setTimeout(() => {
        setShow(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!show) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md",
        "transition-all duration-300 ease-in-out",
        animationClass,
      )}
    >
      {/* Progress Bar at Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Main Loader Content */}
      <div className="flex flex-col items-center space-y-6 p-8">
        {variant === "modern" && <ModernLoader progress={progress} />}
        {variant === "minimal" && <MinimalLoader />}
        {variant === "elegant" && <ElegantLoader />}
        {variant === "playful" && <PlayfulLoader />}

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Loading
            <span className="inline-block animate-bounce ml-1">.</span>
            <span className="inline-block animate-bounce ml-0.5" style={{ animationDelay: "0.1s" }}>
              .
            </span>
            <span className="inline-block animate-bounce ml-0.5" style={{ animationDelay: "0.2s" }}>
              .
            </span>
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{getLoadingMessage(source, progress)}</p>
          {progress > 0 && (
            <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">{Math.round(progress)}%</p>
          )}
        </div>
      </div>
    </div>
  )
}

function ModernLoader({ progress }: { progress: number }) {
  return (
    <div className="relative w-20 h-20">
      {/* Background Circle */}
      <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />

      {/* Progress Circle */}
      <svg className="absolute inset-0 w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 36}`}
          strokeDashoffset={`${2 * Math.PI * 36 * (1 - Math.min(progress, 100) / 100)}`}
          className="transition-all duration-500 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center Spinner */}
      <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />

      {/* Inner Dot */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
    </div>
  )
}

function MinimalLoader() {
  return (
    <div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-600 border-t-blue-500 rounded-full animate-spin" />
  )
}

function ElegantLoader() {
  return (
    <div className="relative">
      <div className="w-16 h-16 border border-slate-200 dark:border-slate-700 rounded-full animate-spin">
        <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>
      <div
        className="absolute inset-2 border border-slate-300 dark:border-slate-600 rounded-full animate-spin"
        style={{ animationDirection: "reverse" }}
      >
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
      </div>
    </div>
  )
}

function PlayfulLoader() {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "w-3 h-3 rounded-full animate-bounce",
            i === 0 && "bg-red-500",
            i === 1 && "bg-yellow-500",
            i === 2 && "bg-green-500",
            i === 3 && "bg-blue-500",
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}

function getLoadingMessage(source: string, progress: number): string {
  if (progress < 20) return "Initializing..."
  if (progress < 40) return "Loading resources..."
  if (progress < 60) return "Processing data..."
  if (progress < 80) return "Almost ready..."
  if (progress < 100) return "Finishing up..."

  switch (source) {
    case "route-change":
      return "Navigating to new page..."
    case "browser-navigation":
      return "Loading previous page..."
    case "page-unload":
      return "Preparing to leave..."
    default:
      return "Please wait a moment..."
  }
}
