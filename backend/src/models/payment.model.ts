import type { RowDataPacket, ResultSetHeader } from "mysql2/promise"
import pool from "../config/database"

interface Payment {
  id: number
  user_id: number
  amount: number
  payment_type_id: number
  subscription_id: number
  transaction_id: string
  status: string
  created_at: Date
  updated_at: Date
}

interface NewPayment {
  user_id: number
  amount: number
  payment_type_id: number
  subscription_id: number
  transaction_id: string
  status: string
}

// Create payment
export const createPayment = async (payment: NewPayment): Promise<number> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO payments (
        user_id, amount, payment_type_id, subscription_id,
        transaction_id, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        payment.user_id,
        payment.amount,
        payment.payment_type_id,
        payment.subscription_id,
        payment.transaction_id,
        payment.status,
      ],
    )

    return result.insertId
  } catch (error) {
    console.error("Error creating payment:", error)
    throw error
  }
}

// Get payment by ID
export const getPaymentById = async (id: number): Promise<Payment | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM payments WHERE id = ?", [id])

    return rows.length ? (rows[0] as Payment) : null
  } catch (error) {
    console.error("Error getting payment by ID:", error)
    throw error
  }
}

// Get all payments (for admin)
export const getAllPayments = async (page = 1, limit = 10): Promise<{ payments: any[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        p.*, 
        u.username, 
        u.email,
        pt.payment_type_name,
        st.plan_name
      FROM payments p
      JOIN users u ON p.user_id = u.id
      JOIN payment_types pt ON p.payment_type_id = pt.id
      JOIN subscriptions s ON p.subscription_id = s.id
      JOIN subscription_types st ON s.subscription_type_id = st.id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?`,
      [limit, offset],
    )

    const [countResult] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as total FROM payments")
    const total = (countResult[0]?.["total"] as number) || 0

    return { payments: rows, total }
  } catch (error) {
    console.error("Error getting all payments:", error)
    throw error
  }
}

// Get payments by date range
export const getPaymentsByDateRange = async (
  startDate: string,
  endDate: string,
  page = 1,
  limit = 10,
): Promise<{ payments: any[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        p.*, 
        u.username, 
        u.email,
        pt.payment_type_name,
        st.plan_name
      FROM payments p
      JOIN users u ON p.user_id = u.id
      JOIN payment_types pt ON p.payment_type_id = pt.id
      JOIN subscriptions s ON p.subscription_id = s.id
      JOIN subscription_types st ON s.subscription_type_id = st.id
      WHERE DATE(p.created_at) BETWEEN ? AND ?
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?`,
      [startDate, endDate, limit, offset],
    )

    const [countResult] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM payments WHERE DATE(created_at) BETWEEN ? AND ?",
      [startDate, endDate],
    )
    const total = (countResult[0]?.["total"] as number) || 0

    return { payments: rows, total }
  } catch (error) {
    console.error("Error getting payments by date range:", error)
    throw error
  }
}

// Update payment status
export const updatePaymentStatus = async (id: number, status: string): Promise<void> => {
  try {
    await pool.query("UPDATE payments SET status = ?, updated_at = NOW() WHERE id = ?", [status, id])
  } catch (error) {
    console.error("Error updating payment status:", error)
    throw error
  }
}
