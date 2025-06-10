"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelpRequestById = exports.updateHelpRequest = exports.getAllHelpRequests = exports.getHelpRequestsByUserId = exports.createHelpRequest = void 0;
const database_1 = __importDefault(require("../config/database"));
const createHelpRequest = async (help) => {
    try {
        const [result] = await database_1.default.query(`INSERT INTO help (
        user_id, message, status, created_at, updated_at
      ) VALUES (?, ?, 'pending', NOW(), NOW())`, [help.user_id, help.message]);
        return result.insertId;
    }
    catch (error) {
        console.error("Error creating help request:", error);
        throw error;
    }
};
exports.createHelpRequest = createHelpRequest;
const getHelpRequestsByUserId = async (userId) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM help WHERE user_id = ? ORDER BY created_at DESC", [
            userId,
        ]);
        return rows;
    }
    catch (error) {
        console.error("Error getting help requests by user ID:", error);
        throw error;
    }
};
exports.getHelpRequestsByUserId = getHelpRequestsByUserId;
const getAllHelpRequests = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const [rows] = await database_1.default.query(`SELECT 
        h.*, 
        u.username, 
        u.email
      FROM help h
      JOIN users u ON h.user_id = u.id
      ORDER BY h.created_at DESC
      LIMIT ? OFFSET ?`, [limit, offset]);
        const [countResult] = await database_1.default.query("SELECT COUNT(*) as total FROM help");
        const total = countResult[0]?.["total"] || 0;
        return { helpRequests: rows, total };
    }
    catch (error) {
        console.error("Error getting all help requests:", error);
        throw error;
    }
};
exports.getAllHelpRequests = getAllHelpRequests;
const updateHelpRequest = async (id, updateData) => {
    try {
        const keys = Object.keys(updateData);
        if (keys.length === 0) {
            return;
        }
        const setClause = keys.map((key) => `${key} = ?`).join(", ");
        const values = keys.map((key) => updateData[key]);
        await database_1.default.query(`UPDATE help SET ${setClause}, updated_at = NOW() WHERE id = ?`, [...values, id]);
    }
    catch (error) {
        console.error("Error updating help request:", error);
        throw error;
    }
};
exports.updateHelpRequest = updateHelpRequest;
const getHelpRequestById = async (id) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM help WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting help request by ID:", error);
        throw error;
    }
};
exports.getHelpRequestById = getHelpRequestById;
//# sourceMappingURL=help.model.js.map