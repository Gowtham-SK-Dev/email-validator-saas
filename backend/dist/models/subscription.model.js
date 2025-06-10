"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveSubscription = exports.updateSubscriptionStatus = exports.getSubscriptionsByUserId = exports.getSubscriptionById = exports.createSubscription = void 0;
const database_1 = __importDefault(require("../config/database"));
const createSubscription = async (subscription) => {
    try {
        const [result] = await database_1.default.query(`INSERT INTO subscriptions (
        user_id, payment_type_id, subscription_type_id, transaction_id,
        amount, start_date, end_date, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, [
            subscription.user_id,
            subscription.payment_type_id,
            subscription.subscription_type_id,
            subscription.transaction_id,
            subscription.amount,
            subscription.start_date,
            subscription.end_date,
            subscription.status,
        ]);
        return result.insertId;
    }
    catch (error) {
        console.error("Error creating subscription:", error);
        throw error;
    }
};
exports.createSubscription = createSubscription;
const getSubscriptionById = async (id) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM subscriptions WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting subscription by ID:", error);
        throw error;
    }
};
exports.getSubscriptionById = getSubscriptionById;
const getSubscriptionsByUserId = async (userId) => {
    try {
        const [rows] = await database_1.default.query(`SELECT 
        s.*, 
        st.plan_name, 
        st.hit_limit,
        pt.payment_type_name
      FROM subscriptions s
      JOIN subscription_types st ON s.subscription_type_id = st.id
      JOIN payment_types pt ON s.payment_type_id = pt.id
      WHERE s.user_id = ?
      ORDER BY s.created_at DESC`, [userId]);
        return rows;
    }
    catch (error) {
        console.error("Error getting subscriptions by user ID:", error);
        throw error;
    }
};
exports.getSubscriptionsByUserId = getSubscriptionsByUserId;
const updateSubscriptionStatus = async (id, status) => {
    try {
        await database_1.default.query("UPDATE subscriptions SET status = ?, updated_at = NOW() WHERE id = ?", [status, id]);
    }
    catch (error) {
        console.error("Error updating subscription status:", error);
        throw error;
    }
};
exports.updateSubscriptionStatus = updateSubscriptionStatus;
const getActiveSubscription = async (userId) => {
    try {
        const [rows] = await database_1.default.query(`SELECT 
        s.*, 
        st.plan_name, 
        st.hit_limit,
        st.validity
      FROM subscriptions s
      JOIN subscription_types st ON s.subscription_type_id = st.id
      WHERE s.user_id = ? AND s.status = 'active'
      AND (s.end_date IS NULL OR s.end_date > NOW())
      ORDER BY s.created_at DESC
      LIMIT 1`, [userId]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting active subscription:", error);
        throw error;
    }
};
exports.getActiveSubscription = getActiveSubscription;
//# sourceMappingURL=subscription.model.js.map