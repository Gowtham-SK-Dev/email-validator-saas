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
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Zap } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    email: "",
    otp: "",
    captcha: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendOTP = async () => {
    // Validate email
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically send a request to your backend to send an OTP
    toast({
      title: "OTP sent!",
      description: "Please check your email for the verification code.",
    })
  }

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setStep(2)
    toast({
      title: "Step 1 completed",
      description: "Please complete your registration details.",
    })
  }

  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would typically send the registration data to your backend
      console.log("Registration submitted:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Registration successful!",
        description: "Your account has been created. Redirecting to login...",
      })

      // Redirect to login page
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign up to get started with EmailVerify</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
            {step === 1 ? (
              <form onSubmit={handleSubmitStep1}>
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
                          placeholder="Choose a username"
                          required
                          value={formData.username}
                          onChange={handleChange}
                          className="pl-10 h-12 border-2 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10 pr-10 h-12 border-2 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
                <CardFooter className="px-8 pb-8">
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                      type="submit"
                    >
                      Continue
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            ) : (
              <form onSubmit={handleSubmitStep2}>
                <CardContent className="pt-8 pb-6 px-8">
                  <div className="space-y-6">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Label htmlFor="mobileNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mobile Number
                      </Label>
                      <div className="relative">
                        <Input
                          id="mobileNumber"
                          name="mobileNumber"
                          placeholder="Enter your mobile number"
                          required
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          className="h-12 border-2 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 h-12 border-2 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={handleSendOTP}
                          className="bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                        >
                          Send OTP
                        </Button>
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <Label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        OTP Verification
                      </Label>
                      <Input
                        id="otp"
                        name="otp"
                        placeholder="Enter OTP sent to your email"
                        required
                        value={formData.otp}
                        onChange={handleChange}
                        className="h-12 border-2 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      <Label htmlFor="captcha" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        CAPTCHA Verification
                      </Label>
                      <div className="flex flex-col space-y-2">
                        <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                          <span className="text-gray-600 dark:text-gray-400">CAPTCHA Challenge</span>
                        </div>
                        <Input
                          id="captcha"
                          name="captcha"
                          placeholder="Enter the CAPTCHA text"
                          required
                          value={formData.captcha}
                          onChange={handleChange}
                          className="h-12 border-2 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3 px-8 pb-8">
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      Back to Previous Step
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            )}
          </Card>
        </motion.div>

        <motion.div
          className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline underline-offset-4"
          >
            Sign in
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
