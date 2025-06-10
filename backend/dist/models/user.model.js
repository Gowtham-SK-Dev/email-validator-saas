"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.getUserApiUsage = exports.getAllUsers = exports.updateUserClickCount = exports.updateUserOtp = exports.updateUser = exports.createUser = exports.getUserByApiKey = exports.getUserByEmail = exports.getUserByUsername = exports.getUserById = void 0;
const database_1 = __importDefault(require("../config/database"));
const getUserById = async (id) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting user by ID:", error);
        throw error;
    }
};
exports.getUserById = getUserById;
const getUserByUsername = async (username) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM users WHERE username = ?", [username]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting user by username:", error);
        throw error;
    }
};
exports.getUserByUsername = getUserByUsername;
const getUserByEmail = async (email) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting user by email:", error);
        throw error;
    }
};
exports.getUserByEmail = getUserByEmail;
const getUserByApiKey = async (apiKey) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM users WHERE api_key = ?", [apiKey]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting user by API key:", error);
        throw error;
    }
};
exports.getUserByApiKey = getUserByApiKey;
const createUser = async (user) => {
    try {
        const [result] = await database_1.default.query(`INSERT INTO users (
        username, password, mobile_number, email, api_key, api_secret,
        otp, balance_click_count, is_active, role_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, [
            user.username,
            user.password,
            user.mobile_number,
            user.email,
            user.api_key,
            user.api_secret,
            user.otp,
            user.balance_click_count,
            user.is_active,
            user.role_id,
        ]);
        return result.insertId;
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};
exports.createUser = createUser;
const updateUser = async (id, updateData) => {
    try {
        const keys = Object.keys(updateData);
        if (keys.length === 0) {
            return;
        }
        const setClause = keys.map((key) => `${key} = ?`).join(", ");
        const values = keys.map((key) => updateData[key]);
        await database_1.default.query(`UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = ?`, [...values, id]);
    }
    catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};
exports.updateUser = updateUser;
const updateUserOtp = async (id, otp) => {
    try {
        await database_1.default.query("UPDATE users SET otp = ?, updated_at = NOW() WHERE id = ?", [otp, id]);
    }
    catch (error) {
        console.error("Error updating user OTP:", error);
        throw error;
    }
};
exports.updateUserOtp = updateUserOtp;
const updateUserClickCount = async (id, amount) => {
    try {
        const [rows] = await database_1.default.query("SELECT balance_click_count FROM users WHERE id = ?", [id]);
        if (!rows.length) {
            throw new Error("User not found");
        }
        if (!rows[0]) {
            throw new Error("User not found");
        }
        const currentClickCount = rows[0]["balance_click_count"];
        const newClickCount = Math.max(0, currentClickCount + amount);
        await database_1.default.query("UPDATE users SET balance_click_count = ?, updated_at = NOW() WHERE id = ?", [newClickCount, id]);
        return newClickCount;
    }
    catch (error) {
        console.error("Error updating user click count:", error);
        throw error;
    }
};
exports.updateUserClickCount = updateUserClickCount;
const getAllUsers = async (page = 1, limit = 10, search = "") => {
    try {
        const offset = (page - 1) * limit;
        let queryString = `
      SELECT u.*, r.role_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
    `;
        const queryParams = [];
        if (search) {
            queryString += `
        WHERE u.username LIKE ? 
        OR u.email LIKE ? 
        OR u.mobile_number LIKE ?
      `;
            const searchPattern = `%${search}%`;
            queryParams.push(searchPattern, searchPattern, searchPattern);
        }
        queryString += `
      ORDER BY u.created_at DESC
      LIMIT ? OFFSET ?
    `;
        queryParams.push(limit, offset);
        const [rows] = await database_1.default.query(queryString, queryParams);
        const [countResult] = await database_1.default.query(`SELECT COUNT(*) as total FROM users ${search ? "WHERE username LIKE ? OR email LIKE ? OR mobile_number LIKE ?" : ""}`, search ? [`%${search}%`, `%${search}%`, `%${search}%`] : []);
        const total = countResult[0]?.["total"] || 0;
        return { users: rows, total };
    }
    catch (error) {
        console.error("Error getting all users:", error);
        throw error;
    }
};
exports.getAllUsers = getAllUsers;
const getUserApiUsage = async (id) => {
    try {
        const [monthlyUsage] = await database_1.default.query(`SELECT 
        DATE_FORMAT(created_at, '%b') as name,
        SUM(used_click_count) as total,
        SUM(used_click_count) as verified,
        0 as invalid
      FROM click_history
      WHERE user_id = ?
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY created_at ASC
      LIMIT 6`, [id]);
        const [subscription] = await database_1.default.query(`SELECT 
        s.*, 
        st.plan_name, 
        st.hit_limit,
        st.validity 
      FROM subscriptions s
      JOIN subscription_types st ON s.subscription_type_id = st.id
      WHERE s.user_id = ? AND s.status = 'active'
      ORDER BY s.end_date DESC
      LIMIT 1`, [id]);
        const [user] = await database_1.default.query("SELECT balance_click_count FROM users WHERE id = ?", [id]);
        return {
            monthlyUsage,
            subscription: subscription.length ? subscription[0] : null,
            balance_click_count: user[0]?.["balance_click_count"] || 0,
        };
    }
    catch (error) {
        console.error("Error getting user API usage:", error);
        throw error;
    }
};
exports.getUserApiUsage = getUserApiUsage;
const getUserStats = async () => {
    try {
        const [totalUsers] = await database_1.default.query("SELECT COUNT(*) as total FROM users");
        const [activeUsers] = await database_1.default.query("SELECT COUNT(*) as total FROM users WHERE is_active = true");
        const [totalRevenue] = await database_1.default.query('SELECT SUM(amount) as total FROM payments WHERE status = "completed"');
        const [totalClicks] = await database_1.default.query("SELECT SUM(used_click_count) as total FROM click_history");
        const [monthlyRevenue] = await database_1.default.query(`SELECT 
        DATE_FORMAT(created_at, '%b') as month,
        SUM(amount) as total
      FROM payments
      WHERE status = "completed"
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY created_at ASC
      LIMIT 6`);
        const [recentUsers] = await database_1.default.query(`SELECT 
        u.id, 
        u.username, 
        u.email, 
        u.created_at,
        s.plan_name
      FROM users u
      LEFT JOIN (
        SELECT 
          s.user_id, 
          st.plan_name
        FROM subscriptions s
        JOIN subscription_types st ON s.subscription_type_id = st.id
        WHERE s.status = 'active'
      ) as s ON u.id = s.user_id
      ORDER BY u.created_at DESC
      LIMIT 5`);
        return {
            totalUsers: totalUsers[0]?.["total"] || 0,
            activeUsers: activeUsers[0]?.["total"] || 0,
            totalRevenue: totalRevenue[0]?.["total"] || 0,
            totalClicks: totalClicks[0]?.["total"] || 0,
            monthlyRevenue,
            recentUsers,
        };
    }
    catch (error) {
        console.error("Error getting user stats:", error);
        throw error;
    }
};
exports.getUserStats = getUserStats;
//# sourceMappingURL=user.model.js.map