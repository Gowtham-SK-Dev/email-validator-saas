import { API_CONFIG } from "./config"

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  errors?: Record<string, string[]>
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

// Request Options
export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  body?: any
  timeout?: number
  requireAuth?: boolean
}

class ApiClient {
  private baseUrl: string
  private timeout: number

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
  }

  // Get auth token from localStorage
  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("auth_token")
  }

  // Set auth token in localStorage
  private setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  // Remove auth token from localStorage
  private removeAuthToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user_data")
    }
  }

  // Build request headers
  private buildHeaders(options: RequestOptions): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    // Add auth token if required
    if (options.requireAuth !== false) {
      const token = this.getAuthToken()
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    return headers
  }

  // Handle API errors
  private handleError(error: any, status: number): ApiError {
    if (status === 401) {
      // Unauthorized - clear auth data
      this.removeAuthToken()
      // Redirect to login if not already there
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login"
      }
    }

    return {
      message: error.message || "An unexpected error occurred",
      status,
      errors: error.errors,
    }
  }

  // Main request method
  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { method = "GET", body, timeout = this.timeout, requireAuth = true } = options

    const url = `${this.baseUrl}${endpoint}`
    const headers = this.buildHeaders(options)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw this.handleError(data, response.status)
      }

      // Store auth token if present in response
      if (data.token) {
        this.setAuthToken(data.token)
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error: any) {
      clearTimeout(timeoutId)

      if (error.name === "AbortError") {
        throw {
          message: "Request timeout",
          status: 408,
        }
      }

      if (error.status) {
        throw error
      }

      throw {
        message: "Network error. Please check your connection.",
        status: 0,
      }
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, options?: Omit<RequestOptions, "method">): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  async post<T = any>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, "method" | "body">,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "POST", body })
  }

  async put<T = any>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, "method" | "body">,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "PUT", body })
  }

  async delete<T = any>(endpoint: string, options?: Omit<RequestOptions, "method">): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }

  // Auth helper methods
  isAuthenticated(): boolean {
    return !!this.getAuthToken()
  }

  logout(): void {
    this.removeAuthToken()
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
