"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatus = exports.getPaymentsByDateRange = exports.getAllPayments = exports.getPaymentById = exports.createPayment = void 0;
const database_1 = __importDefault(require("../config/database"));
const createPayment = async (payment) => {
    try {
        const [result] = await database_1.default.query(`INSERT INTO payments (
        user_id, amount, payment_type_id, subscription_id,
        transaction_id, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`, [
            payment.user_id,
            payment.amount,
            payment.payment_type_id,
            payment.subscription_id,
            payment.transaction_id,
            payment.status,
        ]);
        return result.insertId;
    }
    catch (error) {
        console.error("Error creating payment:", error);
        throw error;
    }
};
exports.createPayment = createPayment;
const getPaymentById = async (id) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM payments WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting payment by ID:", error);
        throw error;
    }
};
exports.getPaymentById = getPaymentById;
const getAllPayments = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const [rows] = await database_1.default.query(`SELECT 
        p.*, 
        u.username, 
        u.email,
        pt.payment_type_name,
        st.plan_name
      FROM payments p
      JOIN users u ON p.user_id = u.id
      JOIN payment_types pt ON p.payment_type_id = pt.id
      JOIN subscriptions s ON p.subscription_id = s.id
      JOIN subscription_types st ON s.subscription_type_id = st.id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?`, [limit, offset]);
        const [countResult] = await database_1.default.query("SELECT COUNT(*) as total FROM payments");
        const total = countResult[0]?.["total"] || 0;
        return { payments: rows, total };
    }
    catch (error) {
        console.error("Error getting all payments:", error);
        throw error;
    }
};
exports.getAllPayments = getAllPayments;
const getPaymentsByDateRange = async (startDate, endDate, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const [rows] = await database_1.default.query(`SELECT 
        p.*, 
        u.username, 
        u.email,
        pt.payment_type_name,
        st.plan_name
      FROM payments p
      JOIN users u ON p.user_id = u.id
      JOIN payment_types pt ON p.payment_type_id = pt.id
      JOIN subscriptions s ON p.subscription_id = s.id
      JOIN subscription_types st ON s.subscription_type_id = st.id
      WHERE DATE(p.created_at) BETWEEN ? AND ?
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?`, [startDate, endDate, limit, offset]);
        const [countResult] = await database_1.default.query("SELECT COUNT(*) as total FROM payments WHERE DATE(created_at) BETWEEN ? AND ?", [startDate, endDate]);
        const total = countResult[0]?.["total"] || 0;
        return { payments: rows, total };
    }
    catch (error) {
        console.error("Error getting payments by date range:", error);
        throw error;
    }
};
exports.getPaymentsByDateRange = getPaymentsByDateRange;
const updatePaymentStatus = async (id, status) => {
    try {
        await database_1.default.query("UPDATE payments SET status = ?, updated_at = NOW() WHERE id = ?", [status, id]);
    }
    catch (error) {
        console.error("Error updating payment status:", error);
        throw error;
    }
};
exports.updatePaymentStatus = updatePaymentStatus;
//# sourceMappingURL=payment.model.js.map