"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateClickHistoryReport = exports.getAllClickHistory = exports.getClickHistoryByUserId = exports.logClickHistory = void 0;
const database_1 = __importDefault(require("../config/database"));
const logClickHistory = async (userId, initialClickCount, currentClickCount, usedClickCount) => {
    try {
        const [result] = await database_1.default.query(`INSERT INTO click_history (
        user_id, initial_click_count, current_click_count, used_click_count, created_at, updated_at
      ) VALUES (?, ?, ?, ?, NOW(), NOW())`, [userId, initialClickCount, currentClickCount, usedClickCount]);
        return result.insertId;
    }
    catch (error) {
        console.error("Error logging click history:", error);
        throw error;
    }
};
exports.logClickHistory = logClickHistory;
const getClickHistoryByUserId = async (userId, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const [rows] = await database_1.default.query(`SELECT * FROM click_history 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`, [userId, limit, offset]);
        const [countResult] = await database_1.default.query("SELECT COUNT(*) as total FROM click_history WHERE user_id = ?", [userId]);
        const total = countResult[0]?.["total"] || 0;
        return { clickHistory: rows, total };
    }
    catch (error) {
        console.error("Error getting click history by user ID:", error);
        throw error;
    }
};
exports.getClickHistoryByUserId = getClickHistoryByUserId;
const getAllClickHistory = async (page = 1, limit = 10, userId = 0) => {
    try {
        const offset = (page - 1) * limit;
        let queryString = `
      SELECT 
        ch.*, 
        u.username, 
        u.email
      FROM click_history ch
      JOIN users u ON ch.user_id = u.id
    `;
        const queryParams = [];
        if (userId > 0) {
            queryString += " WHERE ch.user_id = ?";
            queryParams.push(userId);
        }
        queryString += " ORDER BY ch.created_at DESC LIMIT ? OFFSET ?";
        queryParams.push(limit, offset);
        const [rows] = await database_1.default.query(queryString, queryParams);
        const [countResult] = await database_1.default.query(`SELECT COUNT(*) as total FROM click_history ${userId > 0 ? "WHERE user_id = ?" : ""}`, userId > 0 ? [userId] : []);
        const total = countResult[0]?.["total"] || 0;
        return { clickHistory: rows, total };
    }
    catch (error) {
        console.error("Error getting all click history:", error);
        throw error;
    }
};
exports.getAllClickHistory = getAllClickHistory;
const generateClickHistoryReport = async (startDate, endDate, userId = 0) => {
    try {
        let queryString = `
      SELECT 
        ch.id,
        u.username,
        u.email,
        ch.initial_click_count,
        ch.current_click_count,
        ch.used_click_count,
        ch.created_at
      FROM click_history ch
      JOIN users u ON ch.user_id = u.id
      WHERE 1=1
    `;
        const queryParams = [];
        if (startDate && endDate) {
            queryString += " AND DATE(ch.created_at) BETWEEN ? AND ?";
            queryParams.push(startDate, endDate);
        }
        if (userId > 0) {
            queryString += " AND ch.user_id = ?";
            queryParams.push(userId);
        }
        queryString += " ORDER BY ch.created_at DESC";
        const [rows] = await database_1.default.query(queryString, queryParams);
        return rows;
    }
    catch (error) {
        console.error("Error generating click history report:", error);
        throw error;
    }
};
exports.generateClickHistoryReport = generateClickHistoryReport;
//# sourceMappingURL=click-history.model.js.map