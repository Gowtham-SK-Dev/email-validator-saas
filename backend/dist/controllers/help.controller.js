"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHelpRequests = exports.submitHelpRequest = void 0;
const help_model_1 = require("../models/help.model");
const submitHelpRequest = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }
        const { message } = req.body;
        const userId = req.user.id;
        const helpId = await (0, help_model_1.createHelpRequest)({
            user_id: userId,
            message,
        });
        res.status(201).json({
            message: "Help request submitted successfully",
            helpId,
        });
    }
    catch (error) {
        console.error("Submit help request error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.submitHelpRequest = submitHelpRequest;
const getUserHelpRequests = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }
        const userId = req.user.id;
        const helpRequests = await (0, help_model_1.getHelpRequestsByUserId)(userId);
        res.status(200).json({ helpRequests });
    }
    catch (error) {
        console.error("Get user help requests error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserHelpRequests = getUserHelpRequests;
//# sourceMappingURL=help.controller.js.map