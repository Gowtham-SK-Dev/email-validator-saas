import type { RowDataPacket, ResultSetHeader } from "mysql2/promise"
import pool from "../config/database"

interface Help {
  id: number
  user_id: number
  message: string
  response: string | null
  status: string
  created_at: Date
  updated_at: Date
}

interface NewHelp {
  user_id: number
  message: string
}

interface UpdateHelp {
  response?: string
  status?: string
}

// Create help request
export const createHelpRequest = async (help: NewHelp): Promise<number> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO help (
        user_id, message, status, created_at, updated_at
      ) VALUES (?, ?, 'pending', NOW(), NOW())`,
      [help.user_id, help.message],
    )

    return result.insertId
  } catch (error) {
    console.error("Error creating help request:", error)
    throw error
  }
}

// Get help requests by user ID
export const getHelpRequestsByUserId = async (userId: number): Promise<Help[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM help WHERE user_id = ? ORDER BY created_at DESC", [
      userId,
    ])

    return rows as Help[]
  } catch (error) {
    console.error("Error getting help requests by user ID:", error)
    throw error
  }
}

// Get all help requests (for admin)
export const getAllHelpRequests = async (page = 1, limit = 10): Promise<{ helpRequests: any[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        h.*, 
        u.username, 
        u.email
      FROM help h
      JOIN users u ON h.user_id = u.id
      ORDER BY h.created_at DESC
      LIMIT ? OFFSET ?`,
      [limit, offset],
    )

    const [countResult] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as total FROM help")
    const total = countResult[0].total

    return { helpRequests: rows, total }
  } catch (error) {
    console.error("Error getting all help requests:", error)
    throw error
  }
}

// Update help request
export const updateHelpRequest = async (id: number, updateData: UpdateHelp): Promise<void> => {
  try {
    const keys = Object.keys(updateData) as Array<keyof UpdateHelp>

    if (keys.length === 0) {
      return
    }

    const setClause = keys.map((key) => `${key} = ?`).join(", ")
    const values = keys.map((key) => updateData[key])

    await pool.query(`UPDATE help SET ${setClause}, updated_at = NOW() WHERE id = ?`, [...values, id])
  } catch (error) {
    console.error("Error updating help request:", error)
    throw error
  }
}

// Get help request by ID
export const getHelpRequestById = async (id: number): Promise<Help | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM help WHERE id = ?", [id])

    return rows.length ? (rows[0] as Help) : null
  } catch (error) {
    console.error("Error getting help request by ID:", error)
    throw error
  }
}
