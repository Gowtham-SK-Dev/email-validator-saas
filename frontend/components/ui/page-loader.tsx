"use client"

import { cn } from "@/lib/utils"

interface PageLoaderProps {
  isLoading: boolean
  variant?: "default" | "minimal" | "dots" | "pulse"
  message?: string
}

export function PageLoader({ isLoading, variant = "default", message = "Loading..." }: PageLoaderProps) {
  if (!isLoading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        "transition-all duration-300 ease-in-out",
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Loader Animation */}
        {variant === "default" && <DefaultLoader />}
        {variant === "minimal" && <MinimalLoader />}
        {variant === "dots" && <DotsLoader />}
        {variant === "pulse" && <PulseLoader />}

        {/* Loading Message */}
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground animate-pulse">{message}</p>
        </div>
      </div>
    </div>
  )
}

function DefaultLoader() {
  return (
    <div className="relative">
      {/* Outer ring */}
      <div className="w-12 h-12 rounded-full border-4 border-muted animate-spin">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
      </div>

      {/* Inner ring */}
      <div className="absolute inset-2 w-8 h-8 rounded-full border-2 border-muted animate-spin-reverse">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-b-primary/60 animate-spin-reverse"></div>
      </div>
    </div>
  )
}

function MinimalLoader() {
  return <div className="w-8 h-8 border-2 border-muted border-t-primary rounded-full animate-spin"></div>
}

function DotsLoader() {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "w-3 h-3 bg-primary rounded-full animate-bounce",
            i === 1 && "animation-delay-150",
            i === 2 && "animation-delay-300",
          )}
        ></div>
      ))}
    </div>
  )
}

function PulseLoader() {
  return (
    <div className="relative">
      <div className="w-12 h-12 bg-primary/20 rounded-full animate-ping"></div>
      <div className="absolute inset-0 w-12 h-12 bg-primary/40 rounded-full animate-pulse"></div>
      <div className="absolute inset-2 w-8 h-8 bg-primary rounded-full"></div>
    </div>
  )
}
