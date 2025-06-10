"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWarrantyClickCount = exports.updateWarranty = exports.getWarrantyByUserId = exports.createWarranty = void 0;
const database_1 = __importDefault(require("../config/database"));
const createWarranty = async (warranty) => {
    try {
        const [result] = await database_1.default.query(`INSERT INTO warranties (
        user_id, initial_click_count, current_click_count, used_click_count, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`, [
            warranty.user_id,
            warranty.initial_click_count,
            warranty.current_click_count,
            warranty.used_click_count,
            warranty.is_active,
        ]);
        return result.insertId;
    }
    catch (error) {
        console.error("Error creating warranty:", error);
        throw error;
    }
};
exports.createWarranty = createWarranty;
const getWarrantyByUserId = async (userId) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM warranties WHERE user_id = ? AND is_active = true ORDER BY created_at DESC LIMIT 1", [userId]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting warranty by user ID:", error);
        throw error;
    }
};
exports.getWarrantyByUserId = getWarrantyByUserId;
const updateWarranty = async (id, updateData) => {
    try {
        const keys = Object.keys(updateData).filter(key => key !== 'id' && key !== 'created_at');
        if (keys.length === 0) {
            return;
        }
        const setClause = keys.map(key => `${key} = ?`).join(", ");
        const values = keys.map(key => updateData[key]);
        await database_1.default.query(`UPDATE warranties SET ${setClause}, updated_at = NOW() WHERE id = ?`, [...values, id]);
    }
    catch (error) {
        console.error("Error updating warranty:", error);
        throw error;
    }
};
exports.updateWarranty = updateWarranty;
const updateWarrantyClickCount = async (userId, usedClicks) => {
    try {
        await database_1.default.query(`UPDATE warranties 
       SET current_click_count = current_click_count - ?, 
           used_click_count = used_click_count + ?,
           updated_at = NOW()
       WHERE user_id = ? AND is_active = true`, [usedClicks, usedClicks, userId]);
    }
    catch (error) {
        console.error("Error updating warranty click count:", error);
        throw error;
    }
};
exports.updateWarrantyClickCount = updateWarrantyClickCount;
//# sourceMappingURL=warranty.model.js.map