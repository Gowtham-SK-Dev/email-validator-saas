"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"
import { PageLoader } from "@/components/ui/page-loader"

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function RouteGuard({ children, requireAuth = true, redirectTo = "/login" }: RouteGuardProps) {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for auth to finish loading
      if (authLoading) return

      if (requireAuth && !user) {
        console.log("🔒 Route Guard: Redirecting to login - no user found")
        router.replace(redirectTo)
        return
      }

      if (!requireAuth && user) {
        console.log("🔒 Route Guard: User already authenticated, redirecting to dashboard")
        router.replace("/dashboard")
        return
      }

      setIsChecking(false)
    }

    checkAuth()
  }, [user, authLoading, requireAuth, redirectTo, router])

  // Show loading while checking authentication
  if (authLoading || isChecking) {
    return <PageLoader isLoading={true} />
  }

  // If we need auth but don't have a user, don't render children
  if (requireAuth && !user) {
    return <PageLoader isLoading={true} />
  }

  // If we don't need auth but have a user (like login page), don't render children
  if (!requireAuth && user) {
    return <PageLoader isLoading={true} />
  }

  return <>{children}</>
}
