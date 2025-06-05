import type { RowDataPacket, ResultSetHeader } from "mysql2/promise"
import pool from "../config/database"

interface ClickHistory {
  id: number
  user_id: number
  initial_click_count: number
  current_click_count: number
  used_click_count: number
  created_at: Date
  updated_at: Date
}

interface NewClickHistory {
  user_id: number
  initial_click_count: number
  current_click_count: number
  used_click_count: number
}

// Log click history
export const logClickHistory = async (
  userId: number,
  initialClickCount: number,
  currentClickCount: number,
  usedClickCount: number,
): Promise<number> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO click_history (
        user_id, initial_click_count, current_click_count, used_click_count, created_at, updated_at
      ) VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [userId, initialClickCount, currentClickCount, usedClickCount],
    )

    return result.insertId
  } catch (error) {
    console.error("Error logging click history:", error)
    throw error
  }
}

// Get click history by user ID
export const getClickHistoryByUserId = async (
  userId: number,
  page = 1,
  limit = 10,
): Promise<{ clickHistory: ClickHistory[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM click_history 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset],
    )

    const [countResult] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM click_history WHERE user_id = ?",
      [userId],
    )
    const total = countResult[0].total

    return { clickHistory: rows as ClickHistory[], total }
  } catch (error) {
    console.error("Error getting click history by user ID:", error)
    throw error
  }
}

// Get all click history (for admin)
export const getAllClickHistory = async (
  page = 1,
  limit = 10,
  userId = 0,
): Promise<{ clickHistory: any[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    let queryString = `
      SELECT 
        ch.*, 
        u.username, 
        u.email
      FROM click_history ch
      JOIN users u ON ch.user_id = u.id
    `

    const queryParams: any[] = []

    if (userId > 0) {
      queryString += " WHERE ch.user_id = ?"
      queryParams.push(userId)
    }

    queryString += " ORDER BY ch.created_at DESC LIMIT ? OFFSET ?"
    queryParams.push(limit, offset)

    const [rows] = await pool.query<RowDataPacket[]>(queryString, queryParams)

    // Get total count
    const [countResult] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM click_history ${userId > 0 ? "WHERE user_id = ?" : ""}`,
      userId > 0 ? [userId] : [],
    )
    const total = countResult[0].total

    return { clickHistory: rows, total }
  } catch (error) {
    console.error("Error getting all click history:", error)
    throw error
  }
}

// Generate click history report
export const generateClickHistoryReport = async (startDate: string, endDate: string, userId = 0): Promise<any[]> => {
  try {
    let queryString = `
      SELECT 
        ch.id,
        u.username,
        u.email,
        ch.initial_click_count,
        ch.current_click_count,
        ch.used_click_count,
        ch.created_at
      FROM click_history ch
      JOIN users u ON ch.user_id = u.id
      WHERE 1=1
    `

    const queryParams: any[] = []

    if (startDate && endDate) {
      queryString += " AND DATE(ch.created_at) BETWEEN ? AND ?"
      queryParams.push(startDate, endDate)
    }

    if (userId > 0) {
      queryString += " AND ch.user_id = ?"
      queryParams.push(userId)
    }

    queryString += " ORDER BY ch.created_at DESC"

    const [rows] = await pool.query<RowDataPacket[]>(queryString, queryParams)

    return rows
  } catch (error) {
    console.error("Error generating click history report:", error)
    throw error
  }
}
