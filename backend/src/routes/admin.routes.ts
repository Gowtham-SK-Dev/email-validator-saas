import { Router } from "express"
import {
  getUsers,
  getUserProfile,
  updateUserProfile,
  getPayments,
  getClickHistories,
  getHelpRequests,
  respondToHelpRequest,
  getDashboardStats,
  exportClickHistory,
} from "../controllers/admin.controller"
import { authenticateToken, requireAdmin } from "../middlewares/auth.middleware"

const router = Router()

// Admin routes (protected)
router.use(authenticateToken)
router.use(requireAdmin)

router.get("/users", getUsers)
router.get("/users/:id", getUserProfile)
router.put("/users/:id", updateUserProfile)
router.get("/payments", getPayments)
router.get("/click-history", getClickHistories)
router.get("/help-requests", getHelpRequests)
router.put("/help-requests/:id", respondToHelpRequest)
router.get("/dashboard-stats", getDashboardStats)
router.get("/export/click-history", exportClickHistory)

export default router
