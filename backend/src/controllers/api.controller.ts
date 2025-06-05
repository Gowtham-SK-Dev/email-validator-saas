import type { Request, Response } from "express"
import { getUserByApiKey } from "../models/user.model"
import { verifyEmail } from "../services/email-verification.service"
import { updateUserClickCount } from "../models/user.model"
import { logClickHistory } from "../models/click-history.model"

// Middleware to authenticate API keys
export const authenticateApiKey = async (req: Request, res: Response, next: Function) => {
  try {
    const apiKey = req.headers["x-api-key"] as string

    if (!apiKey) {
      return res.status(401).json({ success: false, message: "API key is required" })
    }

    const user = await getUserByApiKey(apiKey)
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid API key" })
    }

    if (!user.is_active) {
      return res.status(401).json({ success: false, message: "Account is inactive" })
    }

    if (user.balance_click_count <= 0) {
      return res.status(403).json({
        success: false,
        message: "Insufficient click balance. Please upgrade your plan.",
      })
    }

    // Attach user to request
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: "user",
    }

    next()
  } catch (error) {
    console.error("API authentication error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

// Email verification API endpoint
export const verifyEmailEndpoint = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required",
      })
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      })
    }

    const userId = req.user.id

    // Verify email address
    const result = await verifyEmail(email)

    // Deduct click count
    const newClickCount = await updateUserClickCount(userId, -1)

    // Log click history
    await logClickHistory(userId, newClickCount + 1, newClickCount, 1)

    res.status(200).json({
      success: true,
      result,
      remaining_credits: newClickCount,
    })
  } catch (error) {
    console.error("Email verification API error:", error)

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Email verification failed",
      })
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

// Get user API usage
export const getApiUsage = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Authentication failed" })
    }

    const userId = req.user.id
    const user = await getUserByApiKey(req.headers["x-api-key"] as string)

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({
      success: true,
      usage: {
        balance_click_count: user.balance_click_count,
        api_key: user.api_key,
      },
    })
  } catch (error) {
    console.error("Get API usage error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}
