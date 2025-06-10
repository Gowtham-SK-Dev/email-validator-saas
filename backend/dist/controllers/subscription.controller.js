"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySubscriptionPayment = exports.createSubscriptionOrder = exports.getSubscriptionPlans = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const subscription_type_model_1 = require("../models/subscription-type.model");
const subscription_model_1 = require("../models/subscription.model");
const user_model_1 = require("../models/user.model");
const payment_model_1 = require("../models/payment.model");
const warranty_model_1 = require("../models/warranty.model");
const razorpay = new razorpay_1.default({
    key_id: process.env["RAZORPAY_KEY_ID"] || "",
    key_secret: process.env["RAZORPAY_KEY_SECRET"] || "",
});
const getSubscriptionPlans = async (req, res) => {
    try {
        const subscriptionPlans = await (0, subscription_type_model_1.getAllSubscriptionTypes)();
        res.status(200).json({ subscriptionPlans });
    }
    catch (error) {
        console.error("Get subscription plans error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSubscriptionPlans = getSubscriptionPlans;
const createSubscriptionOrder = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }
        const { subscription_type_id, payment_type_id } = req.body;
        const subscriptionType = await (0, subscription_type_model_1.getSubscriptionTypeById)(subscription_type_id);
        if (!subscriptionType) {
            res.status(404).json({ message: "Subscription plan not found" });
            return;
        }
        const user = await (0, user_model_1.getUserById)(req.user.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (payment_type_id === 1) {
            const options = {
                amount: subscriptionType.price * 100,
                currency: "INR",
                receipt: `receipt_${req.user.id}_${Date.now()}`,
                notes: {
                    user_id: req.user.id.toString(),
                    subscription_type_id: subscription_type_id.toString(),
                },
            };
            const order = await razorpay.orders.create(options);
            res.status(200).json({
                order_id: order.id,
                amount: Number(order.amount) / 100,
                currency: order.currency,
                subscription_details: subscriptionType,
            });
            return;
        }
        res.status(400).json({ message: "Unsupported payment type" });
    }
    catch (error) {
        console.error("Create subscription order error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createSubscriptionOrder = createSubscriptionOrder;
const verifySubscriptionPayment = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, subscription_type_id, payment_type_id } = req.body;
        const userId = req.user.id;
        const subscriptionType = await (0, subscription_type_model_1.getSubscriptionTypeById)(subscription_type_id);
        if (!subscriptionType) {
            res.status(404).json({ message: "Subscription plan not found" });
            return;
        }
        const startDate = new Date();
        let endDate = null;
        if (subscriptionType.validity) {
            endDate = new Date();
            endDate.setDate(endDate.getDate() + subscriptionType.validity);
        }
        const subscriptionId = await (0, subscription_model_1.createSubscription)({
            user_id: userId,
            payment_type_id,
            subscription_type_id,
            transaction_id: razorpay_payment_id,
            amount: subscriptionType.price,
            start_date: startDate,
            end_date: endDate,
            status: "active",
        });
        await (0, payment_model_1.createPayment)({
            user_id: userId,
            amount: subscriptionType.price,
            payment_type_id,
            subscription_id: subscriptionId,
            transaction_id: razorpay_payment_id,
            status: "completed",
        });
        if (subscriptionType.hit_limit > 0) {
            await (0, warranty_model_1.createWarranty)({
                user_id: userId,
                initial_click_count: subscriptionType.hit_limit,
                current_click_count: subscriptionType.hit_limit,
                used_click_count: 0,
                is_active: true,
            });
            const user = await (0, user_model_1.getUserById)(userId);
            if (user) {
                const newBalance = user.balance_click_count + subscriptionType.hit_limit;
                await (0, user_model_1.updateUser)(userId, { balance_click_count: newBalance });
            }
        }
        res.status(200).json({
            message: "Payment verified and subscription activated",
            subscription_id: subscriptionId,
        });
    }
    catch (error) {
        console.error("Verify subscription payment error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.verifySubscriptionPayment = verifySubscriptionPayment;
//# sourceMappingURL=subscription.controller.js.map