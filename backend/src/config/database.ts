import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

// Database configuration
const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || "vpstbteck_stagingcargo",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4",
    ssl: {
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // logging: process.env.NODE_ENV === "development" ? console.log : false,
  logging: false, // Disable logging in production
})

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log("✅ Database connected successfully with Sequelize")
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    if (process.env.NODE_ENV === "production") {
      process.exit(1)
    }
  }
}

// Initialize database connection
testConnection()

export default sequelize
