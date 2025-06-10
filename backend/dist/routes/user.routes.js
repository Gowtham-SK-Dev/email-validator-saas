"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.get("/profile", user_controller_1.getCurrentUser);
router.put("/profile", user_controller_1.updateProfile);
router.put("/change-password", user_controller_1.changePassword);
router.get("/api-usage", user_controller_1.getApiUsageStats);
router.get("/subscriptions", user_controller_1.getUserSubscriptions);
router.get("/click-history", user_controller_1.getClickHistory);
exports.default = router;
//# sourceMappingURL=user.routes.js.map