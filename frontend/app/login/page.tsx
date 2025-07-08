"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Zap } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return !newErrors.username && !newErrors.password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check your input and try again.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {

      // Call the real login API
      const response = await login(formData.username, formData.password)

      // Show success message
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting to dashboard...",
      })

      // Small delay for better UX, then redirect
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (error: any) {

      // Handle different types of errors
      let errorMessage = "Login failed. Please try again."

      if (error.message) {
        errorMessage = error.message
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.status === 401) {
        errorMessage = "Invalid username or password"
      } else if (error.status === 429) {
        errorMessage = "Too many login attempts. Please try again later."
      } else if (error.status >= 500) {
        errorMessage = "Server error. Please try again later."
      }

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormLoading = isLoading || authLoading

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-4 top-4 md:left-8 md:top-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button variant="ghost" className="group" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </Button>
      </motion.div>

      <div className="w-full max-w-md relative">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mr-3">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EmailVerify
            </span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to your account to continue</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-8 pb-6 px-8">
                <div className="space-y-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Username
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className={`pl-10 h-12 border-2 focus:border-blue-500 transition-all duration-300 ${
                          errors.username ? "border-red-500 focus:border-red-500" : ""
                        }`}
                        disabled={isFormLoading}
                      />
                    </div>
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </Label>
                      <Button
                        variant="link"
                        className="px-0 font-normal text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        type="button"
                        onClick={() => router.push("/forgot-password")}
                        disabled={isFormLoading}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-all duration-300 ${
                          errors.password ? "border-red-500 focus:border-red-500" : ""
                        }`}
                        disabled={isFormLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isFormLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                  </motion.div>
                </div>
              </CardContent>

              <CardFooter className="px-8 pb-8">
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ scale: isFormLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isFormLoading ? 1 : 0.98 }}
                >
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isFormLoading}
                  >
                    {isFormLoading ? (
                      <div className="flex items-center">
                        <motion.div
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        Signing In...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>

        <motion.div
          className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline underline-offset-4"
          >
            Create one now
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
