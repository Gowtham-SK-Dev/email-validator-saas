import { apiClient } from "./client"
import { API_ENDPOINTS } from "./config"
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "./types"

export class AuthService {
  // Login user
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {

      const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials, {
        requireAuth: false,
      })


      if (response.success && response.data) {

        // Store user data in localStorage and cookies
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", response.data.token)
          localStorage.setItem("user-data", JSON.stringify(response.data.user))

          // Also set cookie for middleware
          document.cookie = `auth-token=${response.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`

          console.log("💾 Data stored in localStorage and cookies")
        }

        return response.data
      }

      throw new Error(response.message || "Login failed")
    } catch (error: any) {
      console.error("❌ AuthService.login error:", error)
      throw new Error(error.message || "Login failed")
    }
  }

  // Register user
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, userData, {
        requireAuth: false,
      })

      if (response.success && response.data) {
        return response.data
      }

      throw new Error(response.message || "Registration failed")
    } catch (error: any) {
      throw new Error(error.message || "Registration failed")
    }
  }

  // Verify OTP
  static async verifyOtp(otpData: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    try {
      const response = await apiClient.post<VerifyOtpResponse>(API_ENDPOINTS.AUTH.VERIFY_OTP, otpData, {
        requireAuth: false,
      })

      if (response.success && response.data) {
        // Store user data if verification includes login
        if (response.data.token && response.data.user) {
          if (typeof window !== "undefined") {
            localStorage.setItem("auth-token", response.data.token)
            localStorage.setItem("user-data", JSON.stringify(response.data.user))

            // Also set cookie for middleware
            document.cookie = `auth-token=${response.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
          }
        }
        return response.data
      }

      throw new Error(response.message || "OTP verification failed")
    } catch (error: any) {
      throw new Error(error.message || "OTP verification failed")
    }
  }

  // Forgot password
  static async forgotPassword(emailData: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      const response = await apiClient.post<ForgotPasswordResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, emailData, {
        requireAuth: false,
      })

      if (response.success && response.data) {
        return response.data
      }

      throw new Error(response.message || "Failed to send reset email")
    } catch (error: any) {
      throw new Error(error.message || "Failed to send reset email")
    }
  }

  // Reset password
  static async resetPassword(resetData: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      const response = await apiClient.post<ResetPasswordResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData, {
        requireAuth: false,
      })

      if (response.success && response.data) {
        return response.data
      }

      throw new Error(response.message || "Password reset failed")
    } catch (error: any) {
      throw new Error(error.message || "Password reset failed")
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn("Logout API call failed:", error)
    } finally {
      // Always clear local storage and cookies
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")

        // Clear cookie
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
    }
  }

  // Get current user from localStorage
  static getCurrentUser(): any | null {
    if (typeof window === "undefined") return null

    try {
      const userData = localStorage.getItem("user-data")
      const token = localStorage.getItem("auth-token")

      return userData ? JSON.parse(userData) : null
    } catch (error) {
      return null
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    if (typeof window === "undefined") return false

    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    const isAuth = !!(token && userData)

    return isAuth
  }
}
