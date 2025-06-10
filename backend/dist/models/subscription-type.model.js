"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubscriptionType = exports.createSubscriptionType = exports.getSubscriptionTypeById = exports.getAllSubscriptionTypes = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllSubscriptionTypes = async () => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM subscription_types WHERE is_active = true ORDER BY price ASC");
        return rows;
    }
    catch (error) {
        console.error("Error getting all subscription types:", error);
        throw error;
    }
};
exports.getAllSubscriptionTypes = getAllSubscriptionTypes;
const getSubscriptionTypeById = async (id) => {
    try {
        const [rows] = await database_1.default.query("SELECT * FROM subscription_types WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error("Error getting subscription type by ID:", error);
        throw error;
    }
};
exports.getSubscriptionTypeById = getSubscriptionTypeById;
const createSubscriptionType = async (subscriptionType) => {
    try {
        const [result] = await database_1.default.query(`INSERT INTO subscription_types (
        plan_name, price, hit_limit, validity, description, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`, [
            subscriptionType.plan_name,
            subscriptionType.price,
            subscriptionType.hit_limit,
            subscriptionType.validity,
            subscriptionType.description,
            subscriptionType.is_active,
        ]);
        return result.insertId;
    }
    catch (error) {
        console.error("Error creating subscription type:", error);
        throw error;
    }
};
exports.createSubscriptionType = createSubscriptionType;
const updateSubscriptionType = async (id, updateData) => {
    try {
        const keys = Object.keys(updateData).filter(key => key !== 'id' && key !== 'created_at');
        if (keys.length === 0) {
            return;
        }
        const setClause = keys.map(key => `${key} = ?`).join(", ");
        const values = keys.map(key => updateData[key]);
        await database_1.default.query(`UPDATE subscription_types SET ${setClause}, updated_at = NOW() WHERE id = ?`, [...values, id]);
    }
    catch (error) {
        console.error("Error updating subscription type:", error);
        throw error;
    }
};
exports.updateSubscriptionType = updateSubscriptionType;
//# sourceMappingURL=subscription-type.model.js.map