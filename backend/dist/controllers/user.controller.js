"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClickHistory = exports.getUserSubscriptions = exports.getApiUsageStats = exports.changePassword = exports.updateProfile = exports.getCurrentUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const subscription_model_1 = require("../models/subscription.model");
const click_history_model_1 = require("../models/click-history.model");
const getCurrentUser = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ success: false, message: "Not authenticated" });
            return;
        }
        const userId = req.user.id;
        const user = await (0, user_model_1.getUserById)(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const { password, api_secret, otp, ...userData } = user;
        res.status(200).json({ success: true, user: userData });
    }
    catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.getCurrentUser = getCurrentUser;
const updateProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ success: false, message: "Not authenticated" });
            return;
        }
        const userId = req.user.id;
        const { username, mobile_number } = req.body;
        await (0, user_model_1.updateUser)(userId, { username, mobile_number });
        res.status(200).json({ success: true, message: "Profile updated successfully" });
    }
    catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ success: false, message: "Not authenticated" });
            return;
        }
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        const user = await (0, user_model_1.getUserById)(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ success: false, message: "Current password is incorrect" });
            return;
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        await (0, user_model_1.updateUser)(userId, { password: hashedPassword });
        res.status(200).json({ success: true, message: "Password changed successfully" });
    }
    catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.changePassword = changePassword;
const getApiUsageStats = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ success: false, message: "Not authenticated" });
            return;
        }
        const userId = req.user.id;
        const usageStats = await (0, user_model_1.getUserApiUsage)(userId);
        res.status(200).json({ success: true, usageStats });
    }
    catch (error) {
        console.error("Get API usage stats error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.getApiUsageStats = getApiUsageStats;
const getUserSubscriptions = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ success: false, message: "Not authenticated" });
            return;
        }
        const userId = req.user.id;
        const subscriptions = await (0, subscription_model_1.getSubscriptionsByUserId)(userId);
        res.status(200).json({ success: true, subscriptions });
    }
    catch (error) {
        console.error("Get user subscriptions error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.getUserSubscriptions = getUserSubscriptions;
const getClickHistory = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ success: false, message: "Not authenticated" });
            return;
        }
        const userId = req.user.id;
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const clickHistory = await (0, click_history_model_1.getClickHistoryByUserId)(userId, page, limit);
        res.status(200).json({ success: true, clickHistory });
    }
    catch (error) {
        console.error("Get click history error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.getClickHistory = getClickHistory;
//# sourceMappingURL=user.controller.js.map