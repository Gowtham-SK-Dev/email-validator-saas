import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "email_verification_saas",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
  port: 3306, // Default MySQL port
  ssl: {
    rejectUnauthorized: false,
  },
}

console.log("Connecting to database with config:", {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
})

// Create connection pool
const pool = mysql.createPool(dbConfig)

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection()
    console.log("✅ Database connected successfully")
    connection.release()
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    // Don't exit process in development to allow fixing connection issues
    if (process.env.NODE_ENV === "production") {
      process.exit(1)
    }
  }
}

// Initialize database connection
testConnection()

export default pool
