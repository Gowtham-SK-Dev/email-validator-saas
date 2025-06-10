"use client"

import { useState, useEffect } from "react"
import { AuthService } from "@/lib/api/auth"
import type { User } from "@/lib/api/types"

interface UseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => void
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state
  useEffect(() => {
    const initAuth = () => {
      const currentUser = AuthService.getCurrentUser()
      setUser(currentUser)
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await AuthService.login({ username, password })
      setUser(response.user)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (userData: any) => {
    setIsLoading(true)
    try {
      await AuthService.register(userData)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)
    try {
      await AuthService.logout()
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      // Still clear user state even if API call fails
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Refresh user data
  const refreshUser = () => {
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
  }

  return {
    user,
    isAuthenticated: !!user && AuthService.isAuthenticated(),
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  }
}
