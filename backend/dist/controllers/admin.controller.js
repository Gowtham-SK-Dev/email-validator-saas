"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportClickHistory = exports.getDashboardStats = exports.respondToHelpRequest = exports.getHelpRequests = exports.getClickHistories = exports.getPayments = exports.updateUserProfile = exports.getUserProfile = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const payment_model_1 = require("../models/payment.model");
const click_history_model_1 = require("../models/click-history.model");
const help_model_1 = require("../models/help.model");
const csvGenerator_1 = require("../utils/csvGenerator");
const getUsers = async (req, res) => {
    console.log("Fetching all users...");
    try {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const users = await (0, user_model_1.getAllUsers)(page, limit, search);
        res.status(200).json({ users });
    }
    catch (error) {
        console.error("Get all users error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUsers = getUsers;
const getUserProfile = async (req, res) => {
    try {
        const userId = Number.parseInt(req.params.id);
        const user = await (0, user_model_1.getUserById)(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const { password, api_secret, otp, ...userData } = user;
        res.status(200).json({ user: userData });
    }
    catch (error) {
        console.error("Get user profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (req, res) => {
    try {
        const userId = Number.parseInt(req.params.id);
        const { username, email, mobile_number, is_active, balance_click_count, role_id } = req.body;
        const updatedUser = await (0, user_model_1.updateUser)(userId, {
            username,
            email,
            mobile_number,
            is_active,
            balance_click_count,
            role_id,
        });
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Update user profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateUserProfile = updateUserProfile;
const getPayments = async (req, res) => {
    try {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const startDate = req.query.startDate || "";
        const endDate = req.query.endDate || "";
        let payments;
        if (startDate && endDate) {
            payments = await (0, payment_model_1.getPaymentsByDateRange)(startDate, endDate, page, limit);
        }
        else {
            payments = await (0, payment_model_1.getAllPayments)(page, limit);
        }
        res.status(200).json({ payments });
    }
    catch (error) {
        console.error("Get payments error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getPayments = getPayments;
const getClickHistories = async (req, res) => {
    try {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const userId = Number.parseInt(req.query.userId) || 0;
        const clickHistories = await (0, click_history_model_1.getAllClickHistory)(page, limit, userId);
        res.status(200).json({ clickHistories });
    }
    catch (error) {
        console.error("Get click histories error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getClickHistories = getClickHistories;
const getHelpRequests = async (req, res) => {
    try {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const helpRequests = await (0, help_model_1.getAllHelpRequests)(page, limit);
        res.status(200).json({ helpRequests });
    }
    catch (error) {
        console.error("Get help requests error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getHelpRequests = getHelpRequests;
const respondToHelpRequest = async (req, res) => {
    try {
        const helpId = Number.parseInt(req.params.id);
        const { response, status } = req.body;
        await (0, help_model_1.updateHelpRequest)(helpId, { response, status });
        res.status(200).json({ message: "Help request updated successfully" });
    }
    catch (error) {
        console.error("Respond to help request error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.respondToHelpRequest = respondToHelpRequest;
const getDashboardStats = async (req, res) => {
    try {
        const stats = await (0, user_model_1.getUserStats)();
        res.status(200).json({ stats });
    }
    catch (error) {
        console.error("Get dashboard stats error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getDashboardStats = getDashboardStats;
const exportClickHistory = async (req, res) => {
    try {
        const startDate = req.query.startDate || "";
        const endDate = req.query.endDate || "";
        const userId = Number.parseInt(req.query.userId) || 0;
        const reportData = await (0, click_history_model_1.generateClickHistoryReport)(startDate, endDate, userId);
        const csv = (0, csvGenerator_1.generateCsv)(reportData, [
            "id",
            "username",
            "email",
            "initial_click_count",
            "current_click_count",
            "used_click_count",
            "created_at",
        ]);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=click-history-report.csv");
        res.status(200).send(csv);
    }
    catch (error) {
        console.error("Export click history error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.exportClickHistory = exportClickHistory;
//# sourceMappingURL=admin.controller.js.map