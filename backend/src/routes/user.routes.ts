import { Router } from "express"
import {
  getCurrentUser,
  updateProfile,
  changePassword,
  getApiUsageStats,
  getUserSubscriptions,
  getClickHistory,
} from "../controllers/user.controller"
import { authenticateToken } from "../middlewares/auth.middleware"

const router = Router()

// User routes (protected)
router.use(authenticateToken)

router.get("/profile", getCurrentUser)
router.put("/profile", updateProfile)
router.put("/change-password", changePassword)
router.get("/api-usage", getApiUsageStats)
router.get("/subscriptions", getUserSubscriptions)
router.get("/click-history", getClickHistory)

export default router
