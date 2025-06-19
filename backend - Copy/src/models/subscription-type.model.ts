import type { RowDataPacket, ResultSetHeader } from "mysql2/promise"
import pool from "../config/database"

interface SubscriptionType {
  id: number
  plan_name: string
  price: number
  hit_limit: number
  validity: number | null
  description: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

interface NewSubscriptionType {
  plan_name: string
  price: number
  hit_limit: number
  validity: number | null
  description: string
  is_active: boolean
}

// Get all subscription types
export const getAllSubscriptionTypes = async (): Promise<SubscriptionType[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM subscription_types WHERE is_active = true ORDER BY price ASC"
    )

    return rows as SubscriptionType[]
  } catch (error) {
    console.error("Error getting all subscription types:", error)
    throw error
  }
}

// Get subscription type by ID
export const getSubscriptionTypeById = async (id: number): Promise<SubscriptionType | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM subscription_types WHERE id = ?", [id])

    return rows.length ? (rows[0] as SubscriptionType) : null
  } catch (error) {
    console.error("Error getting subscription type by ID:", error)
    throw error
  }
}

// Create subscription type
export const createSubscriptionType = async (subscriptionType: NewSubscriptionType): Promise<number> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO subscription_types (
        plan_name, price, hit_limit, validity, description, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        subscriptionType.plan_name,
        subscriptionType.price,
        subscriptionType.hit_limit,
        subscriptionType.validity,
        subscriptionType.description,
        subscriptionType.is_active,
      ]
    )

    return result.insertId
  } catch (error) {
    console.error("Error creating subscription type:", error)
    throw error
  }
}

// Update subscription type
export const updateSubscriptionType = async (id: number, updateData: Partial<SubscriptionType>): Promise<void> => {
  try {
    const keys = Object.keys(updateData).filter(key => key !== 'id' && key !== 'created_at')

    if (keys.length === 0) {
      return
    }

    const setClause = keys.map(key => `${key} = ?`).join(", ")
    const values = keys.map(key => updateData[key as keyof SubscriptionType])

    await pool.query(
      `UPDATE subscription_types SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      [...values, id]
    )
  } catch (error) {
    console.error("Error updating subscription type:", error)
    throw error
  }
}
