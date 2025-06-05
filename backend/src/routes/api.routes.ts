import { Router } from "express"
import { authenticateApiKey, verifyEmailEndpoint, getApiUsage } from "../controllers/api.controller"

const router = Router()

// API routes (protected with API key)
router.use(authenticateApiKey)

router.post("/verify-email", verifyEmailEndpoint)
router.get("/usage", getApiUsage)

export default router
