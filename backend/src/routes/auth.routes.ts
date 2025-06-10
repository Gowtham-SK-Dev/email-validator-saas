import { Router } from "express"
import {
  register,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
  sendOtp,
  refreshToken,
  logout,
  logoutAll,
} from "../controllers/auth.controller"
import { authenticateToken } from "../middlewares/auth.middleware"

const router = Router()

// Authentication routes
router.post("/register", register)
router.post("/verify-otp", verifyOtp)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.post("/send-otp", sendOtp)
router.post("/refresh-token", refreshToken)

// Logout routes (require authentication)
router.post("/logout", logout)
router.post("/logout-all", authenticateToken, logoutAll)

export default router
