"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const os_1 = __importDefault(require("os"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const subscription_routes_1 = __importDefault(require("./routes/subscription.routes"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const help_routes_1 = __importDefault(require("./routes/help.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env["PORT"]) || 5000;
const HOST = "0.0.0.0";
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env["FRONTEND_URL"] || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: "Too many requests from this IP, please try again later.",
    },
});
app.use(limiter);
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, morgan_1.default)("combined"));
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        message: "Email Verification SaaS API is running",
    });
});
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
    });
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/subscription", subscription_routes_1.default);
app.use("/api/verify", api_routes_1.default);
app.use("/api/help", help_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl,
        availableEndpoints: "Visit GET / for available endpoints",
    });
});
app.use((err, _req, res, _next) => {
    console.error("Global error handler:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
        ...(process.env["NODE_ENV"] === "development" && { stack: err.stack }),
    });
});
app.listen(PORT, HOST, () => {
    const interfaces = os_1.default.networkInterfaces();
    let publicIp = "";
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === "IPv4" && !iface.internal) {
                publicIp = iface.address;
                break;
            }
        }
        if (publicIp)
            break;
    }
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    if (publicIp) {
        console.log(`📊 Health check (Public): http://${publicIp}:${PORT}/health`);
        console.log(`📖 API Documentation (Public): http://${publicIp}:${PORT}/`);
    }
    console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/`);
});
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    process.exit(0);
});
process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
    process.exit(0);
});
exports.default = app;
//# sourceMappingURL=server.js.map