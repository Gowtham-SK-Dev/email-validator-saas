import { Router } from "express"
import {
  getSubscriptionPlans,
  createSubscriptionOrder,
  verifySubscriptionPayment,
} from "../controllers/subscription.controller"
import { authenticateToken } from "../middlewares/auth.middleware"

const router = Router()

// Public routes
router.get("/plans", getSubscriptionPlans)

// Protected routes
router.use(authenticateToken)
router.post("/create-order", createSubscriptionOrder)
router.post("/verify-payment", verifySubscriptionPayment)

export default router
