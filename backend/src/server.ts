import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"
import os from "os"

// Import routes
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import subscriptionRoutes from "./routes/subscription.routes"
import apiRoutes from "./routes/api.routes"
import helpRoutes from "./routes/help.routes"
import adminRoutes from "./routes/admin.routes"

// Load environment variables
dotenv.config()

const app = express()
const PORT = Number(process.env["PORT"]) || 5000
const HOST = "0.0.0.0" // Listen on all interfaces for public IP access

// Security middleware
app.use(helmet())

// CORS configuration
app.use(
  cors({
    origin: process.env["FRONTEND_URL"] || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
})

app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Logging middleware
app.use(morgan("combined"))

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: "Email Verification SaaS API is running",
  })
})

// Root endpoint with API documentation
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Email Verification SaaS API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        verifyOtp: "POST /api/auth/verify-otp",
        forgotPassword: "POST /api/auth/forgot-password",
        resetPassword: "POST /api/auth/reset-password",
      },
      user: {
        profile: "GET /api/user/profile",
        updateProfile: "PUT /api/user/profile",
        changePassword: "PUT /api/user/change-password",
        subscriptions: "GET /api/user/subscriptions",
        clickHistory: "GET /api/user/click-history",
      },
      admin: {
        users: "GET /api/admin/users",
        payments: "GET /api/admin/payments",
        dashboard: "GET /api/admin/dashboard-stats",
      },
      api: {
        verifyEmail: "POST /api/verify/verify-email",
        usage: "GET /api/verify/usage",
      },
      subscription: {
        plans: "GET /api/subscription/plans",
        createOrder: "POST /api/subscription/create-order",
        verifyPayment: "POST /api/subscription/verify-payment",
      },
    },
  })
})

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/subscription", subscriptionRoutes)
app.use("/api/verify", apiRoutes)
app.use("/api/help", helpRoutes)
app.use("/api/admin", adminRoutes)

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    availableEndpoints: "Visit GET / for available endpoints",
  })
})

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Global error handler:", err)

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env["NODE_ENV"] === "development" && { stack: err.stack }),
  })
})

// Start server
app.listen(PORT, HOST, () => {
  const interfaces = os.networkInterfaces()
  let publicIp = ""
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      if (iface.family === "IPv4" && !iface.internal) {
        publicIp = iface.address
        break
      }
    }
    if (publicIp) break
  }
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  if (publicIp) {
    console.log(`📊 Health check (Public): http://${publicIp}:${PORT}/health`)
    console.log(`📖 API Documentation (Public): http://${publicIp}:${PORT}/`)
  }
  console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`)
  console.log(`📖 API Documentation: http://localhost:${PORT}/`)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully")
  process.exit(0)
})

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully")
  process.exit(0)
})

export default app
