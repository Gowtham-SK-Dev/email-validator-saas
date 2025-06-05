import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"

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
const PORT = process.env['PORT'] || 5000

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: process.env['FRONTEND_URL'] || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later."
  }
})

app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging middleware
app.use(morgan('combined'))

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/subscription', subscriptionRoutes)
app.use('/api/verify', apiRoutes)
app.use('/api/help', helpRoutes)
app.use('/api/admin', adminRoutes)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  })
})

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Global error handler:', err)
  
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env['NODE_ENV'] === 'development' && { stack: err.stack })
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  process.exit(0)
})

export default app
