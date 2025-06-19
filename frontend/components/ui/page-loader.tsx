"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface PageLoaderProps {
  isLoading: boolean
  variant?: "default" | "minimal" | "modern"
  message?: string
}

export function PageLoader({ isLoading, variant = "default", message = "Loading..." }: PageLoaderProps) {
  const [show, setShow] = useState(isLoading) // Start with isLoading state
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

  // Always show if loading, even on initial render
  if (!show && !isLoading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm",
        "transition-all duration-300 ease-in-out",
        animationClass,
      )}
    >
      <div className="flex flex-col items-center space-y-4 p-8">
        {variant === "modern" && <ModernSpinner />}
        {variant === "minimal" && <MinimalSpinner />}
        {variant === "default" && <DefaultSpinner />}

        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{message}</p>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DefaultSpinner() {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
    </div>
  )
}

function ModernSpinner() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-700" />
      <div
        className="absolute inset-2 rounded-full border-2 border-slate-300 dark:border-slate-600 animate-spin"
        style={{ animationDirection: "reverse" }}
      />
      <div className="absolute inset-4 rounded-full border-2 border-blue-500 animate-spin" />
      <div className="absolute inset-6 rounded-full bg-blue-500 animate-pulse" />
    </div>
  )
}

function MinimalSpinner() {
  return (
    <div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-600 border-t-blue-500 rounded-full animate-spin" />
  )
}
