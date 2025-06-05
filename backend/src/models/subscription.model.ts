import type { RowDataPacket, ResultSetHeader } from "mysql2/promise"
import pool from "../config/database"

interface Subscription {
  id: number
  user_id: number
  payment_type_id: number
  subscription_type_id: number
  transaction_id: string
  amount: number
  start_date: Date
  end_date: Date | null
  status: string
  created_at: Date
  updated_at: Date
}

interface NewSubscription {
  user_id: number
  payment_type_id: number
  subscription_type_id: number
  transaction_id: string
  amount: number
  start_date: Date
  end_date: Date | null
  status: string
}

// Create subscription
export const createSubscription = async (subscription: NewSubscription): Promise<number> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO subscriptions (
        user_id, payment_type_id, subscription_type_id, transaction_id,
        amount, start_date, end_date, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        subscription.user_id,
        subscription.payment_type_id,
        subscription.subscription_type_id,
        subscription.transaction_id,
        subscription.amount,
        subscription.start_date,
        subscription.end_date,
        subscription.status,
      ],
    )

    return result.insertId
  } catch (error) {
    console.error("Error creating subscription:", error)
    throw error
  }
}

// Get subscription by ID
export const getSubscriptionById = async (id: number): Promise<Subscription | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM subscriptions WHERE id = ?", [id])

    return rows.length ? (rows[0] as Subscription) : null
  } catch (error) {
    console.error("Error getting subscription by ID:", error)
    throw error
  }
}

// Get subscriptions by user ID
export const getSubscriptionsByUserId = async (userId: number): Promise<any[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        s.*, 
        st.plan_name, 
        st.hit_limit,
        pt.payment_type_name
      FROM subscriptions s
      JOIN subscription_types st ON s.subscription_type_id = st.id
      JOIN payment_types pt ON s.payment_type_id = pt.id
      WHERE s.user_id = ?
      ORDER BY s.created_at DESC`,
      [userId],
    )

    return rows
  } catch (error) {
    console.error("Error getting subscriptions by user ID:", error)
    throw error
  }
}

// Update subscription status
export const updateSubscriptionStatus = async (id: number, status: string): Promise<void> => {
  try {
    await pool.query("UPDATE subscriptions SET status = ?, updated_at = NOW() WHERE id = ?", [status, id])
  } catch (error) {
    console.error("Error updating subscription status:", error)
    throw error
  }
}

// Get active user subscription
export const getActiveSubscription = async (userId: number): Promise<any | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        s.*, 
        st.plan_name, 
        st.hit_limit,
        st.validity
      FROM subscriptions s
      JOIN subscription_types st ON s.subscription_type_id = st.id
      WHERE s.user_id = ? AND s.status = 'active'
      AND (s.end_date IS NULL OR s.end_date > NOW())
      ORDER BY s.created_at DESC
      LIMIT 1`,
      [userId],
    )

    return rows.length ? rows[0] : null
  } catch (error) {
    console.error("Error getting active subscription:", error)
    throw error
  }
}
