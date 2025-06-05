import type { Request, Response } from "express"
import { getAllUsers, getUserById, updateUser, getUserStats } from "../models/user.model"
import { getAllPayments, getPaymentsByDateRange } from "../models/payment.model"
import { getAllClickHistory, generateClickHistoryReport } from "../models/click-history.model"
import { getAllHelpRequests, updateHelpRequest } from "../models/help.model"
import { generateCsv } from "../utils/csvGenerator"

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const search = (req.query.search as string) || ""

    const users = await getAllUsers(page, limit, search)

    res.status(200).json({ users })
  } catch (error) {
    console.error("Get all users error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get user by ID
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = Number.parseInt(req.params.id)

    const user = await getUserById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Remove sensitive data
    const { password, api_secret, otp, ...userData } = user

    res.status(200).json({ user: userData })
  } catch (error) {
    console.error("Get user profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Update user
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = Number.parseInt(req.params.id)
    const { username, email, mobile_number, is_active, balance_click_count, role_id } = req.body

    const updatedUser = await updateUser(userId, {
      username,
      email,
      mobile_number,
      is_active,
      balance_click_count,
      role_id,
    })

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Update user profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get all payments
export const getPayments = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const startDate = (req.query.startDate as string) || ""
    const endDate = (req.query.endDate as string) || ""

    let payments
    if (startDate && endDate) {
      payments = await getPaymentsByDateRange(startDate, endDate, page, limit)
    } else {
      payments = await getAllPayments(page, limit)
    }

    res.status(200).json({ payments })
  } catch (error) {
    console.error("Get payments error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get click history
export const getClickHistories = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const userId = Number.parseInt(req.query.userId as string) || 0

    const clickHistories = await getAllClickHistory(page, limit, userId)

    res.status(200).json({ clickHistories })
  } catch (error) {
    console.error("Get click histories error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get all help requests
export const getHelpRequests = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10

    const helpRequests = await getAllHelpRequests(page, limit)

    res.status(200).json({ helpRequests })
  } catch (error) {
    console.error("Get help requests error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Update help request
export const respondToHelpRequest = async (req: Request, res: Response) => {
  try {
    const helpId = Number.parseInt(req.params.id)
    const { response, status } = req.body

    await updateHelpRequest(helpId, { response, status })

    res.status(200).json({ message: "Help request updated successfully" })
  } catch (error) {
    console.error("Respond to help request error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get user statistics
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await getUserStats()

    res.status(200).json({ stats })
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Export click history as CSV
export const exportClickHistory = async (req: Request, res: Response) => {
  try {
    const startDate = (req.query.startDate as string) || ""
    const endDate = (req.query.endDate as string) || ""
    const userId = Number.parseInt(req.query.userId as string) || 0

    // Generate report data
    const reportData = await generateClickHistoryReport(startDate, endDate, userId)

    // Generate CSV
    const csv = generateCsv(reportData, [
      "id",
      "username",
      "email",
      "initial_click_count",
      "current_click_count",
      "used_click_count",
      "created_at",
    ])

    // Set headers for file download
    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", "attachment; filename=click-history-report.csv")

    res.status(200).send(csv)
  } catch (error) {
    console.error("Export click history error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
