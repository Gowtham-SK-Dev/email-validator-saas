import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { getUserById } from "../models/user.model"

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        username: string
        email: string
        role: string
      }
    }
  }
}

// Authenticate JWT token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

    if (!token) {
      res.status(401).json({ message: "Access token is required" })
      return
    }

    // Verify token
    const decoded = jwt.verify(token, process.env["JWT_SECRET"] as string) as any

    // Get user details
    const user = await getUserById(decoded.id)
    if (!user) {
      res.status(401).json({ message: "Invalid token" })
      return
    }

    if (!user.is_active) {
      res.status(401).json({ message: "Account is inactive" })
      return
    }

    // Attach user to request
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: decoded.role || "user",
    }

    next()
  } catch (error) {
    console.error("Token authentication error:", error)
    res.status(403).json({ message: "Invalid or expired token" })
  }
}

// Require admin role
export const requireAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" })
      return
    }

    if (req.user.role !== "admin") {
      res.status(403).json({ message: "Admin access required" })
      return
    }

    next()
  } catch (error) {
    console.error("Admin authorization error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Rate limiting middleware
export const rateLimiter = (windowMs: number, maxRequests: number) => {
  const requests = new Map()

  return (req: Request, res: Response, next: NextFunction): void => {
    const clientId = req.ip || req.connection.remoteAddress
    const now = Date.now()
    const windowStart = now - windowMs

    // Clean old requests
    if (requests.has(clientId)) {
      const clientRequests = requests.get(clientId).filter((time: number) => time > windowStart)
      requests.set(clientId, clientRequests)
    }

    // Check rate limit
    const clientRequests = requests.get(clientId) || []
    if (clientRequests.length >= maxRequests) {
      res.status(429).json({
        message: "Too many requests, please try again later",
        retryAfter: Math.ceil(windowMs / 1000),
      })
      return
    }

    // Add current request
    clientRequests.push(now)
    requests.set(clientId, clientRequests)

    next()
  }
}

// Validate request body
export const validateRequest = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missingFields = requiredFields.filter((field) => !req.body[field])

    if (missingFields.length > 0) {
      res.status(400).json({
        message: "Missing required fields",
        missingFields,
      })
      return
    }

    next()
  }
}
