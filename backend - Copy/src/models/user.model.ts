import type { RowDataPacket, ResultSetHeader } from "mysql2/promise"
import pool from "../config/database"

interface User {
  id: number
  username: string
  password: string
  mobile_number: string
  email: string
  api_key: string
  api_secret: string
  otp: string | null
  balance_click_count: number
  is_active: boolean
  role_id: number
  created_at: Date
  updated_at: Date
}

interface NewUser {
  username: string
  password: string
  mobile_number: string
  email: string
  api_key: string
  api_secret: string
  otp: string | null
  balance_click_count: number
  is_active: boolean
  role_id: number
}

interface UpdateUser {
  username?: string
  password?: string
  mobile_number?: string
  email?: string
  api_key?: string
  api_secret?: string
  otp?: string | null
  balance_click_count?: number
  is_active?: boolean
  role_id?: number
}

// Get user by ID
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [id])

    return rows.length ? (rows[0] as User) : null
  } catch (error) {
    console.error("Error getting user by ID:", error)
    throw error
  }
}

// Get user by username
export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE username = ?", [username])

    return rows.length ? (rows[0] as User) : null
  } catch (error) {
    console.error("Error getting user by username:", error)
    throw error
  }
}

// Get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email])

    return rows.length ? (rows[0] as User) : null
  } catch (error) {
    console.error("Error getting user by email:", error)
    throw error
  }
}

// Get user by API key
export const getUserByApiKey = async (apiKey: string): Promise<User | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE api_key = ?", [apiKey])

    return rows.length ? (rows[0] as User) : null
  } catch (error) {
    console.error("Error getting user by API key:", error)
    throw error
  }
}

// Create user
export const createUser = async (user: NewUser): Promise<number> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO users (
        username, password, mobile_number, email, api_key, api_secret,
        otp, balance_click_count, is_active, role_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        user.username,
        user.password,
        user.mobile_number,
        user.email,
        user.api_key,
        user.api_secret,
        user.otp,
        user.balance_click_count,
        user.is_active,
        user.role_id,
      ],
    )

    return result.insertId
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Update user
export const updateUser = async (id: number, updateData: UpdateUser): Promise<void> => {
  try {
    // Build the query dynamically based on updateData
    const keys = Object.keys(updateData) as Array<keyof UpdateUser>

    if (keys.length === 0) {
      return
    }

    const setClause = keys.map((key) => `${key} = ?`).join(", ")
    const values = keys.map((key) => updateData[key])

    await pool.query(`UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = ?`, [...values, id])
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

// Update user OTP
export const updateUserOtp = async (id: number, otp: string): Promise<void> => {
  try {
    await pool.query("UPDATE users SET otp = ?, updated_at = NOW() WHERE id = ?", [otp, id])
  } catch (error) {
    console.error("Error updating user OTP:", error)
    throw error
  }
}

// Update user click count
export const updateUserClickCount = async (id: number, amount: number): Promise<number> => {
  try {
    // First get current click count
    const [rows] = await pool.query<RowDataPacket[]>("SELECT balance_click_count FROM users WHERE id = ?", [id])

    if (!rows.length) {
      throw new Error("User not found")
    }

    if (!rows[0]) {
      throw new Error("User not found")
    }
    const currentClickCount = rows[0]["balance_click_count"] as number

    const newClickCount = Math.max(0, currentClickCount + amount) // Ensure not negative

    // Update click count
    await pool.query("UPDATE users SET balance_click_count = ?, updated_at = NOW() WHERE id = ?", [newClickCount, id])

    return newClickCount
  } catch (error) {
    console.error("Error updating user click count:", error)
    throw error
  }
}

// Get all users (for admin)
export const getAllUsers = async (page = 1, limit = 10, search = ""): Promise<{ users: User[]; total: number }> => {
  try {
    const offset = (page - 1) * limit

    let queryString = `
      SELECT u.*, r.role_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
    `

    const queryParams: any[] = []

    if (search) {
      queryString += `
        WHERE u.username LIKE ? 
        OR u.email LIKE ? 
        OR u.mobile_number LIKE ?
      `
      const searchPattern = `%${search}%`
      queryParams.push(searchPattern, searchPattern, searchPattern)
    }

    queryString += `
      ORDER BY u.created_at DESC
      LIMIT ? OFFSET ?
    `
    queryParams.push(limit, offset)

    // Get users
    const [rows] = await pool.query<RowDataPacket[]>(queryString, queryParams)

    // Get total count for pagination
    const [countResult] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM users ${search ? "WHERE username LIKE ? OR email LIKE ? OR mobile_number LIKE ?" : ""}`,
      search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [],
    )

    const total = (countResult[0]?.["total"] as number) || 0

    return { users: rows as User[], total }
  } catch (error) {
    console.error("Error getting all users:", error)
    throw error
  }
}

// Get user API usage statistics
export const getUserApiUsage = async (id: number): Promise<any> => {
  try {
    // Get monthly usage
    const [monthlyUsage] = await pool.query<RowDataPacket[]>(
      `SELECT 
        DATE_FORMAT(created_at, '%b') as name,
        SUM(used_click_count) as total,
        SUM(used_click_count) as verified,
        0 as invalid
      FROM click_history
      WHERE user_id = ?
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY created_at ASC
      LIMIT 6`,
      [id],
    )

    // Get subscription status
    const [subscription] = await pool.query<RowDataPacket[]>(
      `SELECT 
        s.*, 
        st.plan_name, 
        st.hit_limit,
        st.validity 
      FROM subscriptions s
      JOIN subscription_types st ON s.subscription_type_id = st.id
      WHERE s.user_id = ? AND s.status = 'active'
      ORDER BY s.end_date DESC
      LIMIT 1`,
      [id],
    )

    // Get user click count
    const [user] = await pool.query<RowDataPacket[]>("SELECT balance_click_count FROM users WHERE id = ?", [id])

    return {
      monthlyUsage,
      subscription: subscription.length ? subscription[0] : null,
      balance_click_count: user[0]?.["balance_click_count"] || 0,
    }
  } catch (error) {
    console.error("Error getting user API usage:", error)
    throw error
  }
}

// Get user statistics (for admin dashboard)
export const getUserStats = async (): Promise<any> => {
  try {
    // Get total users
    const [totalUsers] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as total FROM users")

    // Get active users
    const [activeUsers] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM users WHERE is_active = true",
    )

    // Get total revenue
    const [totalRevenue] = await pool.query<RowDataPacket[]>(
      'SELECT SUM(amount) as total FROM payments WHERE status = "completed"',
    )

    // Get total clicks used
    const [totalClicks] = await pool.query<RowDataPacket[]>("SELECT SUM(used_click_count) as total FROM click_history")

    // Get monthly revenue
    const [monthlyRevenue] = await pool.query<RowDataPacket[]>(
      `SELECT 
        DATE_FORMAT(created_at, '%b') as month,
        SUM(amount) as total
      FROM payments
      WHERE status = "completed"
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY created_at ASC
      LIMIT 6`,
    )

    // Get recent users
    const [recentUsers] = await pool.query<RowDataPacket[]>(
      `SELECT 
        u.id, 
        u.username, 
        u.email, 
        u.created_at,
        s.plan_name
      FROM users u
      LEFT JOIN (
        SELECT 
          s.user_id, 
          st.plan_name
        FROM subscriptions s
        JOIN subscription_types st ON s.subscription_type_id = st.id
        WHERE s.status = 'active'
      ) as s ON u.id = s.user_id
      ORDER BY u.created_at DESC
      LIMIT 5`,
    )

    return {
      totalUsers: (totalUsers[0]?.["total"] as number) || 0,
      activeUsers: (activeUsers[0]?.["total"] as number) || 0,
      totalRevenue: (totalRevenue[0]?.["total"] as number) || 0,
      totalClicks: (totalClicks[0]?.["total"] as number) || 0,
      monthlyRevenue,
      recentUsers,
    }
  } catch (error) {
    console.error("Error getting user stats:", error)
    throw error
  }
}
