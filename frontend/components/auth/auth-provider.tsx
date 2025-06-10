"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/api/auth"
import type { User } from "@/lib/api/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<any>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user && AuthService.isAuthenticated()

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 AuthProvider: Checking authentication...")

      try {
        const currentUser = AuthService.getCurrentUser()
        const isAuth = AuthService.isAuthenticated()

        console.log("🔍 AuthProvider: currentUser:", currentUser)
        console.log("🔍 AuthProvider: isAuthenticated:", isAuth)

        if (currentUser && isAuth) {
          setUser(currentUser)
          console.log("✅ AuthProvider: User authenticated")
        } else {
          console.log("❌ AuthProvider: User not authenticated")
        }
      } catch (error) {
        console.error("❌ AuthProvider: Auth check failed:", error)
        // Clear invalid data
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      } finally {
        setIsLoading(false)
        console.log("🔍 AuthProvider: Loading complete")
      }
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      console.log("🔐 AuthProvider.login called")
      setIsLoading(true)

      const response = await AuthService.login({ username, password })
      console.log("📡 AuthProvider: Login response:", response)

      if (response && response.user) {
        console.log("✅ AuthProvider: Setting user data")
        setUser(response.user)

        // Force a page reload to trigger middleware with new cookie
        console.log("🔄 AuthProvider: Forcing page reload to update middleware")
        window.location.href = "/dashboard"

        return response
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("❌ AuthProvider: Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      console.log("🚪 AuthProvider: Logging out...")

      // Call logout API
      await AuthService.logout()

      // Clear user state
      setUser(null)

      console.log("✅ AuthProvider: Logout complete")

      // Force page reload to clear middleware state
      window.location.href = "/login"
    } catch (error) {
      console.error("❌ AuthProvider: Logout error:", error)
      // Even if API fails, clear local data
      localStorage.removeItem("auth-token")
      localStorage.removeItem("user-data")
      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      setUser(null)
      window.location.href = "/login"
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    setUser,
  }

  console.log("🔍 AuthProvider: Current state:", {
    user: user?.username || "null",
    isLoading,
    isAuthenticated,
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
