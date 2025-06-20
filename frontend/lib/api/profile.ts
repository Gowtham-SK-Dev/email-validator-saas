import { apiClient } from "./client"
import type { ApiResponse } from "./types"

// Profile API Types
export interface UserProfile {
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

export interface ProfileResponse {
  success: boolean
  user: UserProfile
}

export interface UpdateProfileRequest {
  username?: string
  mobile_number?: string
  email?: string
}

export class ProfileService {
  // Get user profile
  static async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.get<ProfileResponse>("/api/user/profile")
      return {
        success: true,
        data: response.data?.user,
        message: response.message,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to fetch profile",
      }
    }
  }

  // Update user profile
  static async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.put<ProfileResponse>("/api/user/profile", data)
      return {
        success: true,
        data: response.data?.user,
        message: response.message || "Profile updated successfully",
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to update profile",
      }
    }
  }

  // Change password
  static async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post("/api/user/change-password", {
        currentPassword,
        newPassword,
      })
      return {
        success: true,
        message: response.message || "Password changed successfully",
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to change password",
      }
    }
  }
}
