"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiUsage = exports.verifyEmailEndpoint = exports.authenticateApiKey = void 0;
const user_model_1 = require("../models/user.model");
const email_verification_service_1 = require("../services/email-verification.service");
const user_model_2 = require("../models/user.model");
const click_history_model_1 = require("../models/click-history.model");
const authenticateApiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            res.status(401).json({ success: false, message: "API key is required" });
            return;
        }
        const user = await (0, user_model_1.getUserByApiKey)(apiKey);
        if (!user) {
            res.status(401).json({ success: false, message: "Invalid API key" });
            return;
        }
        if (!user.is_active) {
            res.status(401).json({ success: false, message: "Account is inactive" });
            return;
        }
        if (user.balance_click_count <= 0) {
            res.status(403).json({
                success: false,
                message: "Insufficient click balance. Please upgrade your plan.",
            });
            return;
        }
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: "user",
        };
        next();
    }
    catch (error) {
        console.error("API authentication error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.authenticateApiKey = authenticateApiKey;
const verifyEmailEndpoint = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({
                success: false,
                message: "Email address is required",
            });
            return;
        }
        if (!req.user || !req.user.id) {
            res.status(401).json({
                success: false,
                message: "Authentication failed",
            });
            return;
        }
        const userId = req.user.id;
        const result = await (0, email_verification_service_1.verifyEmail)(email);
        const newClickCount = await (0, user_model_2.updateUserClickCount)(userId, -1);
        await (0, click_history_model_1.logClickHistory)(userId, newClickCount + 1, newClickCount, 1);
        res.status(200).json({
            success: true,
            result,
            remaining_credits: newClickCount,
        });
    }
    catch (error) {
        console.error("Email verification API error:", error);
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message || "Email verification failed",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.verifyEmailEndpoint = verifyEmailEndpoint;
const getApiUsage = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ success: false, message: "Authentication failed" });
            return;
        }
        const userId = req.user.id;
        const user = await (0, user_model_1.getUserByApiKey)(req.headers["x-api-key"]);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({
            success: true,
            usage: {
                balance_click_count: user.balance_click_count,
                api_key: user.api_key,
            },
        });
    }
    catch (error) {
        console.error("Get API usage error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.getApiUsage = getApiUsage;
//# sourceMappingURL=api.controller.js.map