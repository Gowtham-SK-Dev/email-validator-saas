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
        // Store user data in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user_data", JSON.stringify(response.data.user))
          localStorage.setItem("refresh_token", response.data.refreshToken)
        }
        return response.data
      }

      throw new Error(response.message || "Login failed")
    } catch (error: any) {
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
            localStorage.setItem("user_data", JSON.stringify(response.data.user))
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
      // Always clear local storage
      apiClient.logout()
    }
  }

  // Get current user from localStorage
  static getCurrentUser(): any | null {
    if (typeof window === "undefined") return null

    try {
      const userData = localStorage.getItem("user_data")
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error("Error parsing user data:", error)
      return null
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return apiClient.isAuthenticated()
  }
}
