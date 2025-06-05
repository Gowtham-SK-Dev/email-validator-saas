import { Router } from "express"
import { submitHelpRequest, getUserHelpRequests } from "../controllers/help.controller"
import { authenticateToken } from "../middlewares/auth.middleware"

const router = Router()

// Protected routes
router.use(authenticateToken)

router.post("/submit", submitHelpRequest)
router.get("/my-requests", getUserHelpRequests)

export default router
