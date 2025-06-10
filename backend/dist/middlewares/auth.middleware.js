"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.rateLimiter = exports.requireAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Access token is required" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env["JWT_SECRET"]);
        const user = await (0, user_model_1.getUserById)(decoded.id);
        if (!user) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        if (!user.is_active) {
            res.status(401).json({ message: "Account is inactive" });
            return;
        }
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: decoded.role || "user",
        };
        next();
    }
    catch (error) {
        console.error("Token authentication error:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateToken = authenticateToken;
const requireAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" });
            return;
        }
        if (req.user.role !== "admin") {
            res.status(403).json({ message: "Admin access required" });
            return;
        }
        next();
    }
    catch (error) {
        console.error("Admin authorization error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.requireAdmin = requireAdmin;
const rateLimiter = (windowMs, maxRequests) => {
    const requests = new Map();
    return (req, res, next) => {
        const clientId = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowStart = now - windowMs;
        if (requests.has(clientId)) {
            const clientRequests = requests.get(clientId).filter((time) => time > windowStart);
            requests.set(clientId, clientRequests);
        }
        const clientRequests = requests.get(clientId) || [];
        if (clientRequests.length >= maxRequests) {
            res.status(429).json({
                message: "Too many requests, please try again later",
                retryAfter: Math.ceil(windowMs / 1000),
            });
            return;
        }
        clientRequests.push(now);
        requests.set(clientId, clientRequests);
        next();
    };
};
exports.rateLimiter = rateLimiter;
const validateRequest = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            res.status(400).json({
                message: "Missing required fields",
                missingFields,
            });
            return;
        }
        next();
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=auth.middleware.js.map