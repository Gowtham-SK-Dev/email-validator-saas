import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import { getUserById, updateUser, getUserApiUsage } from "../models/user.model"
import { getSubscriptionsByUserId } from "../models/subscription.model"
import { getClickHistoryByUserId } from "../models/click-history.model"

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ success:false, message: "Not authenticated" })
      return
    }

    const userId = req.user.id
    const user = await getUserById(userId)

    if (!user) {
      res.status(404).json({ success:false, message: "User not found" })
      return
    }

    const { password, api_secret, otp, ...userData } = user

    res.status(200).json({ success:true, user: userData })
  } catch (error) {
    console.error("Get current user error:", error)
    res.status(500).json({ success:false, message: "Internal server error" })
  }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({success:false, message: "Not authenticated" })
      return
    }

    const userId = req.user.id
    const { username, mobile_number } = req.body

    await updateUser(userId, { username, mobile_number })

    res.status(200).json({success:true, message: "Profile updated successfully" })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({success:false, message: "Internal server error" })
  }
}

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({success:false, message: "Not authenticated" })
      return
    }

    const userId = req.user.id
    const { currentPassword, newPassword } = req.body

    const user = await getUserById(userId)

    if (!user) {
      res.status(404).json({success:false, message: "User not found" })
      return
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordValid) {
      res.status(401).json({success:false, message: "Current password is incorrect" })
      return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await updateUser(userId, { password: hashedPassword })

    res.status(200).json({success:true, message: "Password changed successfully" })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({success:false, message: "Internal server error" })
  }
}

export const getApiUsageStats = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({success:false, message: "Not authenticated" })
      return
    }

    const userId = req.user.id

    const usageStats = await getUserApiUsage(userId)

    res.status(200).json({ success:true,usageStats })
  } catch (error) {
    console.error("Get API usage stats error:", error)
    res.status(500).json({ success:false, message: "Internal server error" })
  }
}

export const getUserSubscriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({success:false, message: "Not authenticated" })
      return
    }

    const userId = req.user.id

    const subscriptions = await getSubscriptionsByUserId(userId)

    res.status(200).json({success:true, subscriptions })
  } catch (error) {
    console.error("Get user subscriptions error:", error)
    res.status(500).json({success:false, message: "Internal server error" })
  }
}

// Get user click history
export const getClickHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ success:false, message: "Not authenticated" })
      return
    }

    const userId = req.user.id
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10

    const clickHistory = await getClickHistoryByUserId(userId, page, limit)

    res.status(200).json({ success:true,clickHistory })
  } catch (error) {
    console.error("Get click history error:", error)
    res.status(500).json({ success:false,message: "Internal server error" })
  }
}
