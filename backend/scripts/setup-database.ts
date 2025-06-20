import sequelize from "../src/config/database"
import { initializeModels } from "../src/models"

const setupDatabase = async () => {
  try {
    console.log("🔄 Setting up database...")

    // Initialize models and sync
    await initializeModels()

    // Force sync to recreate tables (use with caution in production)
    await sequelize.sync({ force: false, alter: true })

    console.log("✅ Database setup completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  }
}

setupDatabase()
