import type { RowDataPacket, ResultSetHeader } from "mysql2/promise"
import pool from "../config/database"

interface Warranty {
  id: number
  user_id: number
  initial_click_count: number
  current_click_count: number
  used_click_count: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

interface NewWarranty {
  user_id: number
  initial_click_count: number
  current_click_count: number
  used_click_count: number
  is_active: boolean
}

// Create warranty
export const createWarranty = async (warranty: NewWarranty): Promise<number> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO warranties (
        user_id, initial_click_count, current_click_count, used_click_count, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        warranty.user_id,
        warranty.initial_click_count,
        warranty.current_click_count,
        warranty.used_click_count,
        warranty.is_active,
      ]
    )

    return result.insertId
  } catch (error) {
    console.error("Error creating warranty:", error)
    throw error
  }
}

// Get warranty by user ID
export const getWarrantyByUserId = async (userId: number): Promise<Warranty | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM warranties WHERE user_id = ? AND is_active = true ORDER BY created_at DESC LIMIT 1",
      [userId]
    )

    return rows.length ? (rows[0] as Warranty) : null
  } catch (error) {
    console.error("Error getting warranty by user ID:", error)
    throw error
  }
}

// Update warranty
export const updateWarranty = async (id: number, updateData: Partial<Warranty>): Promise<void> => {
  try {
    const keys = Object.keys(updateData).filter(key => key !== 'id' && key !== 'created_at')

    if (keys.length === 0) {
      return
    }

    const setClause = keys.map(key => `${key} = ?`).join(", ")
    const values = keys.map(key => updateData[key as keyof Warranty])

    await pool.query(
      `UPDATE warranties SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      [...values, id]
    )
  } catch (error) {
    console.error("Error updating warranty:", error)
    throw error
  }
}

// Update warranty click count
export const updateWarrantyClickCount = async (userId: number, usedClicks: number): Promise<void> => {
  try {
    await pool.query(
      `UPDATE warranties 
       SET current_click_count = current_click_count - ?, 
           used_click_count = used_click_count + ?,
           updated_at = NOW()
       WHERE user_id = ? AND is_active = true`,
      [usedClicks, usedClicks, userId]
    )
  } catch (error) {
    console.error("Error updating warranty click count:", error)
    throw error
  }
}
