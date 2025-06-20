// Authentication Types
export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
  user: User
  expiresIn: number
}

export interface RegisterRequest {
  username: string
  password: string
  email: string
  mobile_number: number
}

export interface RegisterResponse {
  message: string
  user: Partial<User>
}

export interface VerifyOtpRequest {
  email: string
  otp: string
}

export interface VerifyOtpResponse {
  message: string
  token?: string
  user?: User
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface ResetPasswordRequest {
  email: string
  otp: string
  newPassword: string
}

export interface ResetPasswordResponse {
  message: string
}

// User Types
export interface User {
  id: string
  username: string
  email: string
  mobile_number: number
  isVerified: boolean
  plan: string
  createdAt: string
  updatedAt: string
  profile?: UserProfile
}

export interface UserProfile {
  firstName?: string
  lastName?: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
}

// Profile API Types (matching your API response)
export interface ApiUserProfile {
  id: number
  username: string
  mobile_number: string
  email: string
  api_key: string
  balance_click_count: number
  is_active: boolean
  role_id: number
  created_at: string
  updated_at: string
  role: {
    id: number
    role_name: string
    created_at: string
    updated_at: string
  }
}

// Dashboard Types
export interface DashboardStats {
  totalEmails: number
  verifiedEmails: number
  bounceRate: number
  apiCalls: number
  monthlyUsage: number
  planLimit: number
}

export interface UsageData {
  date: string
  emails: number
  apiCalls: number
}

// API Key Types
export interface ApiKey {
  id: string
  name: string
  key: string
  isActive: boolean
  lastUsed?: string
  createdAt: string
  permissions: string[]
}

// Subscription Types
export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  features: string[]
  emailLimit: number
  apiCallLimit: number
  isPopular?: boolean
}

export interface CurrentSubscription {
  plan: SubscriptionPlan
  status: "active" | "cancelled" | "expired"
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

// Payment Types
export interface PaymentOrder {
  orderId: string
  amount: number
  currency: string
  planId: string
}

export interface PaymentVerification {
  orderId: string
  paymentId: string
  signature: string
}

// Common Types
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SelectOption {
  value: string
  label: string
}
