// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    VERIFY_OTP: "/api/auth/verify-otp",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
    REFRESH_TOKEN: "/api/auth/refresh-token",
  },
  USER: {
    PROFILE: "/api/user/profile",
    UPDATE_PROFILE: "/api/user/update-profile",
    CHANGE_PASSWORD: "/api/user/change-password",
  },
  DASHBOARD: {
    STATS: "/api/dashboard/stats",
    USAGE: "/api/dashboard/usage",
    REPORTS: "/api/dashboard/reports",
  },
  API_KEYS: {
    LIST: "/api/keys",
    CREATE: "/api/keys/create",
    DELETE: "/api/keys/delete",
    REGENERATE: "/api/keys/regenerate",
  },
  SUBSCRIPTION: {
    PLANS: "/api/subscription/plans",
    CURRENT: "/api/subscription/current",
    UPGRADE: "/api/subscription/upgrade",
    CANCEL: "/api/subscription/cancel",
  },
  PAYMENT: {
    CREATE_ORDER: "/api/payment/create-order",
    VERIFY_PAYMENT: "/api/payment/verify",
    HISTORY: "/api/payment/history",
  },
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const

// Request Headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as const
