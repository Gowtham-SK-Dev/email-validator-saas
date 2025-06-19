import type { RowDataPacket, ResultSetHeader } from "mysql2/promise"
import pool from "../config/database"

interface Role {
  id: number
  role_name: string
  description: string
  created_at: Date
  updated_at: Date
}

// Get role by name
export const getRoleByName = async (roleName: string): Promise<Role | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM roles WHERE role_name = ?", [roleName])

    return rows.length ? (rows[0] as Role) : null
  } catch (error) {
    console.error("Error getting role by name:", error)
    throw error
  }
}

// Get role by ID
export const getRoleById = async (id: number): Promise<Role | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM roles WHERE id = ?", [id])

    return rows.length ? (rows[0] as Role) : null
  } catch (error) {
    console.error("Error getting role by ID:", error)
    throw error
  }
}

// Get all roles
export const getAllRoles = async (): Promise<Role[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM roles ORDER BY role_name ASC")

    return rows as Role[]
  } catch (error) {
    console.error("Error getting all roles:", error)
    throw error
  }
}

// Create role
export const createRole = async (roleName: string, description: string): Promise<number> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO roles (role_name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
      [roleName, description]
    )

    return result.insertId
  } catch (error) {
    console.error("Error creating role:", error)
    throw error
  }
}
