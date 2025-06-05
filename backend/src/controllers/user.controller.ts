import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import { getUserById, updateUser, getUserApiUsage } from "../models/user.model"
import { getSubscriptionsByUserId } from "../models/subscription.model"
import { getClickHistoryByUserId } from "../models/click-history.model"

// Get current user profile
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    const userId = req.user.id
    const user = await getUserById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Don't send password or sensitive data
    const { password, api_secret, otp, ...userData } = user

    res.status(200).json({ user: userData })
  } catch (error) {
    console.error("Get current user error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    const userId = req.user.id
    const { username, mobile_number } = req.body

    // Update user
    await updateUser(userId, { username, mobile_number })

    res.status(200).json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Change password
export const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    const userId = req.user.id
    const { currentPassword, newPassword } = req.body

    // Get user
    const user = await getUserById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update password
    await updateUser(userId, { password: hashedPassword })

    res.status(200).json({ message: "Password changed successfully" })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get user API usage statistics
export const getApiUsageStats = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    const userId = req.user.id

    // Get usage stats
    const usageStats = await getUserApiUsage(userId)

    res.status(200).json({ usageStats })
  } catch (error) {
    console.error("Get API usage stats error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get user subscriptions
export const getUserSubscriptions = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    const userId = req.user.id

    // Get subscriptions
    const subscriptions = await getSubscriptionsByUserId(userId)

    res.status(200).json({ subscriptions })
  } catch (error) {
    console.error("Get user subscriptions error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get user click history
export const getClickHistory = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    const userId = req.user.id
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10

    // Get click history
    const clickHistory = await getClickHistoryByUserId(userId, page, limit)

    res.status(200).json({ clickHistory })
  } catch (error) {
    console.error("Get click history error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
