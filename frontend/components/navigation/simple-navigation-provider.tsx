"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
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
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Auto-detect navigation changes
  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  const startLoading = () => {
    setIsLoading(true)
  }

  const stopLoading = () => {
    setIsLoading(false)
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
