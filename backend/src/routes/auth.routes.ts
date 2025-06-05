import { Router } from "express"
import { register, verifyOtp, login, forgotPassword, resetPassword, sendOtp } from "../controllers/auth.controller"

const router = Router()

// Authentication routes
router.post("/register", register)
router.post("/verify-otp", verifyOtp)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.post("/send-otp", sendOtp)

export default router
