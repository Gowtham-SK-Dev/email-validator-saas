import type { Request, Response } from "express"
import { getUserByApiKey } from "../models/user.model"
import { verifyEmail } from "../services/email-verification.service"
import { updateUserClickCount } from "../models/user.model"
import { logClickHistory } from "../models/click-history.model"

export const authenticateApiKey = async (req: Request, res: Response, next: Function): Promise<void> => {
  try {
    const apiKey = req.headers["x-api-key"] as string

    if (!apiKey) {
      res.status(401).json({ success: false, message: "API key is required" })
      return
    }

    const user = await getUserByApiKey(apiKey)
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid API key" })
      return
    }

    if (!user.is_active) {
      res.status(401).json({ success: false, message: "Account is inactive" })
      return
    }

    if (user.balance_click_count <= 0) {
      res.status(403).json({
        success: false,
        message: "Insufficient click balance. Please upgrade your plan.",
      })
      return
    }

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

export const verifyEmailEndpoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email address is required",
      })
      return
    }

    if (!req.user || !req.user.id) {
      res.status(401).json({
        success: false,
        message: "Authentication failed",
      })
      return
    }

    const userId = req.user.id

    const result = await verifyEmail(email)

    const newClickCount = await updateUserClickCount(userId, -1)

    await logClickHistory(userId, newClickCount + 1, newClickCount, 1)

    res.status(200).json({
      success: true,
      result,
      remaining_credits: newClickCount,
    })
  } catch (error) {
    console.error("Email verification API error:", error)

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message || "Email verification failed",
      })
      return
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export const getApiUsage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ success: false, message: "Authentication failed" })
      return
    }

    const userId = req.user.id
    const user = await getUserByApiKey(req.headers["x-api-key"] as string)

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" })
      return
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
