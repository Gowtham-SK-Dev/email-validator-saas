"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_controller_1 = require("../controllers/subscription.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/plans", subscription_controller_1.getSubscriptionPlans);
router.use(auth_middleware_1.authenticateToken);
router.post("/create-order", subscription_controller_1.createSubscriptionOrder);
router.post("/verify-payment", subscription_controller_1.verifySubscriptionPayment);
exports.default = router;
//# sourceMappingURL=subscription.routes.js.map